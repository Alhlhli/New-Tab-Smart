/**
 * New Tab Smart v2.0.0 — Offscreen Audio Engine (Manifest V3)
 * يشغّل الأذان والتنبيهات ومؤقت التركيز في الخلفية حتى عند إغلاق جميع تبويبات الصفحة الجديدة.
 * يدعم:
 * 1) الملفات الصوتية المخصصة المحفوظة محلياً في IndexedDB (adhan-audio / remind-audio)
 * 2) النغمات المولّدة محلياً عبر WebAudio API (تعمل 100% بدون إنترنت)
 * 3) المقاطع الصوتية الجاهزة مع fallback تلقائي للنغمات المحلية عند انقطاع الإنترنت
 */

const ADHAN_SHORT_TRACKS = [
  'https://file.garden/an5JdIrGtwwEoiH6/tab/adhan1.mp3',
  'https://file.garden/an5JdIrGtwwEoiH6/tab/adhan2.mp3',
  'https://file.garden/an5JdIrGtwwEoiH6/tab/adhan3.mp3',
  'https://file.garden/an5JdIrGtwwEoiH6/tab/adhan4.mp3'
];

const ADHAN_FULL_TRACKS = [
  'https://download.tvquran.com/download/TvQuran.com__Athan/TvQuran.com__08.athan.mp3',
  'https://download.tvquran.com/download/TvQuran.com__Athan/TvQuran.com__05.athan.mp3'
];

const SALAWAT_AUDIO_URL = 'https://file.garden/an5JdIrGtwwEoiH6/tab/sly.m4a';

let activeAudio = null;
let audioCtx = null;

function getAudioCtx() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    try { audioCtx = new Ctx(); } catch (e) { return null; }
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function stopActiveAudio() {
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch (e) {}
    activeAudio = null;
  }
}

// قراءة الملف المخصص من قاعدة IndexedDB المشتركة مع صفحة التبويب
function getCustomBlobFromIndexedDB(fileId) {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open('smart-newtab', 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains('files')) {
          request.result.createObjectStore('files');
        }
      };
      request.onsuccess = () => {
        const db = request.result;
        try {
          const tx = db.transaction('files', 'readonly');
          const req = tx.objectStore('files').get(fileId);
          tx.oncomplete = () => { db.close(); resolve(req.result || null); };
          tx.onerror = tx.onabort = () => { db.close(); resolve(null); };
        } catch (err) {
          db.close();
          resolve(null);
        }
      };
      request.onerror = () => resolve(null);
    } catch (e) {
      resolve(null);
    }
  });
}

// نغمات مولّدة محلياً عبر WebAudio API (100% أوفلاين)
function playToneChime(variant = 1, volume = 80) {
  const ctx = getAudioCtx();
  if (!ctx) return false;
  const master = ctx.createGain();
  master.gain.value = Math.min(1, Math.max(0.01, volume / 100));
  master.connect(ctx.destination);
  const t0 = ctx.currentTime;

  const note = (freq, start, duration, type, level) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t0 + start);
    gain.gain.exponentialRampToValueAtTime(level, t0 + start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + start + duration);
    osc.connect(gain).connect(master);
    osc.start(t0 + start);
    osc.stop(t0 + start + duration + 0.05);
  };

  if (variant === 2) {
    note(494, 0.0, 0.22, 'triangle', 0.9);
    note(622, 0.3, 0.22, 'triangle', 0.9);
    note(494, 0.6, 0.3, 'triangle', 0.9);
  } else if (variant === 3) {
    note(880, 0.0, 1.1, 'sine', 0.8);
    note(1318, 0.0, 0.8, 'sine', 0.35);
    note(1760, 0.12, 0.6, 'sine', 0.2);
    note(988, 0.45, 1.0, 'sine', 0.6);
  } else if (variant === 4) {
    // نغمة روحانية هادئة خاصة بالأذان عند انقطاع الإنترنت
    note(440, 0.0, 0.9, 'sine', 0.75);
    note(554.37, 0.4, 0.9, 'sine', 0.65);
    note(659.25, 0.8, 1.4, 'sine', 0.8);
    note(880, 1.5, 1.8, 'sine', 0.7);
  } else {
    note(659, 0.0, 0.5, 'sine', 0.7);
    note(880, 0.35, 0.7, 'sine', 0.6);
  }
  return true;
}

function playHourlyDing(volume = 70) {
  const ctx = getAudioCtx();
  if (!ctx) return false;
  const master = ctx.createGain();
  master.gain.value = Math.min(1, Math.max(0.01, (volume / 100) * 0.7));
  master.connect(ctx.destination);
  const t0 = ctx.currentTime;
  const stroke = (freq, start, duration, type, level) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t0 + start);
    gain.gain.exponentialRampToValueAtTime(level, t0 + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + start + duration);
    osc.connect(gain).connect(master);
    osc.start(t0 + start);
    osc.stop(t0 + start + duration + 0.05);
  };
  stroke(523, 0.0, 0.28, 'sine', 0.9);
  stroke(392, 0.32, 0.65, 'sine', 0.8);
  return true;
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

async function playUrlWithFallback(url, volume, fallbackVariant = 4) {
  stopActiveAudio();
  return new Promise((resolve) => {
    try {
      const audio = new Audio(url);
      audio.volume = Math.min(1, Math.max(0, volume / 100));
      activeAudio = audio;
      audio.play().then(() => resolve(true)).catch(() => {
        activeAudio = null;
        resolve(playToneChime(fallbackVariant, volume));
      });
    } catch (e) {
      resolve(playToneChime(fallbackVariant, volume));
    }
  });
}

async function playBlobWithFallback(blob, volume, fallbackVariant = 4) {
  if (!blob) return playToneChime(fallbackVariant, volume);
  stopActiveAudio();
  const objUrl = URL.createObjectURL(blob);
  return new Promise((resolve) => {
    const audio = new Audio(objUrl);
    audio.volume = Math.min(1, Math.max(0, volume / 100));
    activeAudio = audio;
    const cleanup = () => URL.revokeObjectURL(objUrl);
    audio.addEventListener('ended', cleanup, { once: true });
    audio.addEventListener('error', cleanup, { once: true });
    audio.play().then(() => resolve(true)).catch(() => {
      cleanup();
      activeAudio = null;
      resolve(playToneChime(fallbackVariant, volume));
    });
  });
}

async function handleAudioCommand(payload) {
  const { kind, source, tone, volume = 80 } = payload || {};

  if (kind === 'STOP') {
    stopActiveAudio();
    return { ok: true };
  }

  if (kind === 'ADHAN') {
    if (source === 'custom') {
      const blob = await getCustomBlobFromIndexedDB('adhan-audio');
      await playBlobWithFallback(blob, volume, 4);
    } else if (source === 'full') {
      await playUrlWithFallback(randomItem(ADHAN_FULL_TRACKS), volume, 4);
    } else {
      await playUrlWithFallback(randomItem(ADHAN_SHORT_TRACKS), volume, 4);
    }
    return { ok: true };
  }

  if (kind === 'REMIND' || kind === 'HOURLY') {
    if (tone === 'custom') {
      const blob = await getCustomBlobFromIndexedDB('remind-audio');
      await playBlobWithFallback(blob, volume, 1);
    } else if (tone === 'salawat') {
      await playUrlWithFallback(SALAWAT_AUDIO_URL, volume, 1);
    } else if (tone === 'adhan-short') {
      await playUrlWithFallback(randomItem(ADHAN_SHORT_TRACKS), volume, 1);
    } else if (tone === 'hourly-ding') {
      playHourlyDing(volume);
    } else if (tone === 'chime2') {
      playToneChime(2, volume);
    } else if (tone === 'chime3') {
      playToneChime(3, volume);
    } else {
      playToneChime(1, volume);
    }
    return { ok: true };
  }

  if (kind === 'POMODORO') {
    playToneChime(3, volume);
    return { ok: true };
  }

  return { ok: false };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.target === 'offscreen-audio') {
    handleAudioCommand(message.payload).then(sendResponse);
    return true;
  }
});
