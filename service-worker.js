/**
 * New Tab Smart v2.0.0 — Background Service Worker (Manifest V3)
 * ---------------------------------------------------------------
 * يعالج العيب القاتل الأول في الإصدارات السابقة:
 * 1) جدولة مواقيت الصلاة فلكياً في الخلفية عبر chrome.alarms حتى عند إغلاق جميع تبويبات الصفحة الجديدة.
 * 2) إرسال إشعارات سطح المكتب الرسمية (chrome.notifications) عند الأذان وقبله بـ 5 دقائق وعند انتهاء جلسة بومودورو.
 * 3) تشغيل صوت الأذان والتنبيهات في الخلفية عبر Offscreen Document API مع منع التكرار إذا كان التبويب مفتوحاً.
 * 4) تحديث شارة أيقونة الإضافة (Extension Badge) بالوقت المتبقي للصلاة القادمة في شريط المتصفح.
 */

const SAUDI_TZ = 'Asia/Riyadh';
const DEFAULT_CITY = 'buraidah';

const BASE_CITIES = {
  buraidah: { name: 'بريدة', lat: 26.3592, lon: 43.9818, tz: SAUDI_TZ, method: 'ummalqura' },
  unaizah: { name: 'عنيزة', lat: 26.0843, lon: 43.9936, tz: SAUDI_TZ, method: 'ummalqura' },
  riyadh: { name: 'الرياض', lat: 24.7136, lon: 46.6753, tz: SAUDI_TZ, method: 'ummalqura' },
  makkah: { name: 'مكة المكرمة', lat: 21.3891, lon: 39.8579, tz: SAUDI_TZ, method: 'ummalqura' },
  madinah: { name: 'المدينة المنورة', lat: 24.5247, lon: 39.5692, tz: SAUDI_TZ, method: 'ummalqura' },
  jeddah: { name: 'جدة', lat: 21.5433, lon: 39.1728, tz: SAUDI_TZ, method: 'ummalqura' },
  dammam: { name: 'الدمام والخبر', lat: 26.4207, lon: 50.0888, tz: SAUDI_TZ, method: 'ummalqura' },
  ahsa: { name: 'الأحساء (الهفوف)', lat: 25.3648, lon: 49.5876, tz: SAUDI_TZ, method: 'ummalqura' },
  taif: { name: 'الطائف', lat: 21.2854, lon: 40.4222, tz: SAUDI_TZ, method: 'ummalqura' },
  tabuk: { name: 'تبوك', lat: 28.3835, lon: 36.5662, tz: SAUDI_TZ, method: 'ummalqura' },
  abha: { name: 'أبها وعسير', lat: 18.2164, lon: 42.5053, tz: SAUDI_TZ, method: 'ummalqura' },
  hail: { name: 'حائل', lat: 27.5114, lon: 41.7208, tz: SAUDI_TZ, method: 'ummalqura' },
  jazan: { name: 'جازان', lat: 16.8892, lon: 42.5511, tz: SAUDI_TZ, method: 'ummalqura' },
  najran: { name: 'نجران', lat: 17.4924, lon: 44.1277, tz: SAUDI_TZ, method: 'ummalqura' },
  jouf: { name: 'سكاكا والجوف', lat: 29.9697, lon: 40.2064, tz: SAUDI_TZ, method: 'ummalqura' },
  yanbu: { name: 'ينبع البحر', lat: 24.0900, lon: 38.0600, tz: SAUDI_TZ, method: 'ummalqura' },
  dubai: { name: 'دبي', lat: 25.2048, lon: 55.2708, tz: 'Asia/Dubai', method: 'uae' },
  abudhabi: { name: 'أبوظبي', lat: 24.4539, lon: 54.3773, tz: 'Asia/Dubai', method: 'uae' },
  manama: { name: 'المنامة', lat: 26.2285, lon: 50.5860, tz: 'Asia/Bahrain', method: 'mwl' },
  kuwait: { name: 'مدينة الكويت', lat: 29.3759, lon: 47.9774, tz: 'Asia/Kuwait', method: 'kuwait' },
  doha: { name: 'الدوحة', lat: 25.2854, lon: 51.5310, tz: 'Asia/Qatar', method: 'qatar' },
  muscat: { name: 'مسقط', lat: 23.5880, lon: 58.3829, tz: 'Asia/Muscat', method: 'mwl' },
  cairo: { name: 'القاهرة', lat: 30.0444, lon: 31.2357, tz: 'Africa/Cairo', method: 'egypt' },
  amman: { name: 'عمّان', lat: 31.9454, lon: 35.9284, tz: 'Asia/Amman', method: 'mwl' },
  baghdad: { name: 'بغداد', lat: 33.3152, lon: 44.3661, tz: 'Asia/Baghdad', method: 'mwl' },
  jerusalem: { name: 'القدس الشريف', lat: 31.7683, lon: 35.2137, tz: 'Asia/Jerusalem', method: 'mwl' }
};

const PRAYERS = [
  { key: 'fajr', name: 'الفجر' },
  { key: 'sunrise', name: 'الشروق' },
  { key: 'dhuhr', name: 'الظهر' },
  { key: 'asr', name: 'العصر' },
  { key: 'maghrib', name: 'المغرب' },
  { key: 'isha', name: 'العشاء' }
];

const PRAYER_METHODS = {
  ummalqura: { fajr: 18.5, ishaMinutes: 90, ramadanIshaMinutes: 120 },
  mwl:       { fajr: 18,   isha: 17 },
  egypt:     { fajr: 19.5, isha: 17.5 },
  karachi:   { fajr: 18,   isha: 18 },
  isna:      { fajr: 15,   isha: 15 },
  tehran:    { fajr: 17.7, isha: 14 },
  uae:       { fajr: 18.2, isha: 18.2 },
  kuwait:    { fajr: 18,   isha: 17.5 },
  qatar:     { fajr: 18,   ishaMinutes: 90 }
};

const PRAYER_ADV_DEFAULTS = {
  method: 'auto', fajrAngle: 18.5, ishaMode: 'angle', ishaAngle: 17, ishaMinutes: 90,
  asr: 'standard', highLat: 'auto', ramadanOffset: 0,
  adj: { fajr: 0, sunrise: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0 }
};

const DEG = Math.PI / 180;
const sinDeg = (a) => Math.sin(a * DEG);
const cosDeg = (a) => Math.cos(a * DEG);
const SUN_HORIZON_ANGLE = -0.833;
const REMIND_LEAD_MS = 15 * 60 * 1000;

const hijriNumericFormatter = (() => {
  try {
    const fmt = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', { day: 'numeric', month: 'numeric', year: 'numeric' });
    return fmt.resolvedOptions().calendar === 'islamic-umalqura' ? fmt : null;
  } catch (e) { return null; }
})();

function isRamadanDay(timestamp, ramadanOffset = 0) {
  if (!hijriNumericFormatter) return false;
  const shiftMs = ramadanOffset ? -Number(ramadanOffset) * 86400000 : 0;
  const parts = {};
  hijriNumericFormatter.formatToParts(new Date(timestamp + shiftMs)).forEach((p) => { parts[p.type] = Number(p.value); });
  return parts.month === 9;
}

function solarPosition(julianDay) {
  const d = julianDay - 2451545.0;
  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (((280.459 + 0.98564736 * d) % 360) + 360) % 360;
  const L = q + 1.915 * sinDeg(g) + 0.020 * sinDeg(2 * g);
  const e = 23.439 - 0.00000036 * d;
  const rightAscension = ((Math.atan2(cosDeg(e) * sinDeg(L), cosDeg(L)) / DEG / 15) % 24 + 24) % 24;
  const declination = Math.asin(sinDeg(e) * sinDeg(L)) / DEG;
  const equationOfTime = ((q / 15 - rightAscension + 12) % 24 + 24) % 24 - 12;
  return { declination, equationOfTime };
}

function prayerMethodParams(city, adv) {
  const a = adv || PRAYER_ADV_DEFAULTS;
  if (a.method === 'custom') {
    return a.ishaMode === 'interval'
      ? { fajr: a.fajrAngle, ishaMinutes: a.ishaMinutes }
      : { fajr: a.fajrAngle, isha: a.ishaAngle };
  }
  const key = a.method === 'auto' ? city.method : a.method;
  return PRAYER_METHODS[key] || PRAYER_METHODS.mwl;
}

function computePrayerTimes(year, month, day, city, adv) {
  const { lat, lon } = city;
  const a = adv || PRAYER_ADV_DEFAULTS;
  const method = prayerMethodParams(city, a);
  const dayStartUtc = Date.UTC(year, month - 1, day);
  const julianDay = (dayStartUtc + 12 * 3600000) / 86400000 + 2440587.5 - lon / 360;
  const { declination, equationOfTime } = solarPosition(julianDay);
  const noon = 12 - lon / 15 - equationOfTime;

  const hoursFromNoon = (altitude, strict = false) => {
    const cosH = (sinDeg(altitude) - sinDeg(lat) * sinDeg(declination)) / (cosDeg(lat) * cosDeg(declination));
    if (strict && (cosH < -1 || cosH > 1)) return NaN;
    return Math.acos(Math.min(1, Math.max(-1, cosH))) / DEG / 15;
  };

  const asrFactor = a.asr === 'hanafi' ? 2 : 1;
  const asrAltitude = Math.atan(1 / (asrFactor + Math.tan(Math.abs(lat - declination) * DEG))) / DEG;
  const sunrise = noon - hoursFromNoon(SUN_HORIZON_ANGLE);
  const sunset = noon + hoursFromNoon(SUN_HORIZON_ANGLE);

  const rule = a.highLat === 'auto' ? (Math.abs(lat) > 48.5 ? 'angle' : 'none') : a.highLat;
  const night = sunrise + 24 - sunset;
  const portion = (angle) => (rule === 'middle' ? 0.5 : rule === 'seventh' ? 1 / 7 : angle / 60);

  let fajr = noon - hoursFromNoon(-method.fajr, rule !== 'none');
  if (Number.isNaN(fajr) || (rule !== 'none' && sunrise - fajr > portion(method.fajr) * night)) {
    fajr = sunrise - portion(method.fajr) * night;
  }

  let isha;
  const ishaMinutes = isRamadanDay(dayStartUtc + 12 * 3600000, a.ramadanOffset) && method.ramadanIshaMinutes
    ? method.ramadanIshaMinutes
    : method.ishaMinutes;
  if (ishaMinutes !== undefined) {
    isha = sunset + ishaMinutes / 60;
  } else {
    isha = noon + hoursFromNoon(-method.isha, rule !== 'none');
    if (Number.isNaN(isha) || (rule !== 'none' && isha - sunset > portion(method.isha) * night)) {
      isha = sunset + portion(method.isha) * night;
    }
  }

  const hours = {
    fajr,
    sunrise,
    dhuhr: noon + 2 / 60,
    asr: noon + hoursFromNoon(asrAltitude),
    maghrib: sunset,
    isha
  };

  const result = {};
  for (const p of PRAYERS) {
    const shift = (a.adj && Number(a.adj[p.key])) || 0;
    result[p.key] = Math.round(dayStartUtc + (hours[p.key] * 60 + shift) * 60000);
  }
  return result;
}

function zonedDate(timeZone, timestamp) {
  try {
    const fmt = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' });
    const parts = fmt.formatToParts(timestamp);
    const get = (type) => Number(parts.find((p) => p.type === type).value);
    return { year: get('year'), month: get('month'), day: get('day') };
  } catch (e) {
    const d = new Date(timestamp);
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
  }
}

function formatClockTime(timestamp, timeZone) {
  try {
    const fmt = new Intl.DateTimeFormat('ar-SA', { timeZone, hour: '2-digit', minute: '2-digit' });
    return fmt.format(new Date(timestamp));
  } catch (e) {
    const d = new Date(timestamp);
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
}

async function getStateFromStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(null, (data) => {
      resolve(data || {});
    });
  });
}

function parseJsonSafe(raw, fallback) {
  if (!raw) return fallback;
  if (typeof raw === 'object') return raw;
  try { return JSON.parse(raw); } catch (e) { return fallback; }
}

function resolveActiveCity(state) {
  const cities = Object.assign({}, BASE_CITIES);
  const custom = parseJsonSafe(state.tv_custom_city, null);
  if (custom && typeof custom.lat === 'number' && typeof custom.lon === 'number') {
    cities.user_custom = custom;
  }
  const activeKey = state.tv_active_city && cities[state.tv_active_city] ? state.tv_active_city : DEFAULT_CITY;
  return { key: activeKey, city: cities[activeKey] };
}

function buildTimeline(city, adv, nowTs) {
  const { year, month, day } = zonedDate(city.tz, nowTs);
  const timeline = [];
  for (let offset = -1; offset <= 1; offset++) {
    const times = computePrayerTimes(year, month, day + offset, city, adv);
    PRAYERS.forEach((p, index) => {
      timeline.push({ index, key: p.key, name: p.name, ts: times[p.key] });
    });
  }
  return timeline;
}

// فحص ما إذا كان هناك تبويب New Tab مرئي ونشط حالياً لتجنب تشغيل الصوت مرتين
async function hasVisibleNewTabClient() {
  try {
    const clientList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const extOrigin = chrome.runtime.getURL('');
    return clientList.some((c) => c.url.startsWith(extOrigin) && c.url.includes('index.html') && c.visibilityState === 'visible');
  } catch (e) {
    return false;
  }
}

async function playViaOffscreen(payload) {
  try {
    const existing = await chrome.runtime.getContexts({ contextTypes: ['OFFSCREEN_DOCUMENT'] });
    if (existing.length === 0) {
      await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'تشغيل صوت الأذان والتنبيهات ومؤقت التركيز في الخلفية'
      });
    }
    await chrome.runtime.sendMessage({ target: 'offscreen-audio', payload });
  } catch (e) {
    // في حال تعذر إنشاء مستند خفي في بعض المتصفحات الفرعية
  }
}

function showSystemNotification(id, title, message) {
  try {
    chrome.notifications.create(id, {
      type: 'basic',
      iconUrl: 'icons/icon-128.png',
      title,
      message,
      priority: 2
    });
  } catch (e) {}
}

// تحديث شارة الأيقونة في شريط المتصفح بالوقت المتبقي للصلاة القادمة
async function updateExtensionBadge(stateInput) {
  try {
    const state = stateInput || await getStateFromStorage();
    const { city } = resolveActiveCity(state);
    const adv = Object.assign({}, PRAYER_ADV_DEFAULTS, parseJsonSafe(state.tv_prayer_adv, {}));
    const nowTs = Date.now();
    const timeline = buildTimeline(city, adv, nowTs);
    // البحث عن الصلاة القادمة (مع استثناء الشروق من العد التنازلي للصلوات المفروضة إن لزم، أو إظهار الأقرب)
    const next = timeline.find((p) => p.ts > nowTs);
    if (!next) {
      chrome.action.setBadgeText({ text: '' });
      return;
    }
    const diffMins = Math.max(1, Math.ceil((next.ts - nowTs) / 60000));
    const badgeText = diffMins >= 60 ? `${Math.floor(diffMins / 60)}h` : `${diffMins}m`;
    chrome.action.setBadgeBackgroundColor({ color: '#d97706' });
    chrome.action.setBadgeText({ text: badgeText });
    chrome.action.setTitle({
      title: `القادمة: ${next.name} (${formatClockTime(next.ts, city.tz)}) — بعد ${diffMins} دقيقة`
    });
  } catch (e) {}
}

// جدولة جميع المنبهات في الخلفية
async function scheduleAllAlarms() {
  const state = await getStateFromStorage();
  const { key: cityKey, city } = resolveActiveCity(state);
  const adv = Object.assign({}, PRAYER_ADV_DEFAULTS, parseJsonSafe(state.tv_prayer_adv, {}));
  const nowTs = Date.now();
  const timeline = buildTimeline(city, adv, nowTs);

  await chrome.alarms.clearAll();

  const adhanEnabled = (state.tv_adhan_enabled ?? '1') === '1';
  const notify5mEnabled = state.tv_adhan_notify === '1';
  const remindBeforeEnabled = (state.tv_remind_before ?? '1') === '1';
  const remindAfterEnabled = state.tv_remind_after === '1';
  const remindHourlyEnabled = state.tv_remind_hourly === '1';

  for (const item of timeline) {
    if (item.key === 'sunrise') continue;

    // 1. منبه وقت الأذان نفسه
    if (item.ts > nowTs && (adhanEnabled || notify5mEnabled)) {
      chrome.alarms.create(`PRAYER|${cityKey}|${item.key}|${item.ts}`, { when: item.ts });
    }

    // 2. منبه قبل الصلاة بـ 5 دقائق
    const pre5Ts = item.ts - 5 * 60 * 1000;
    if (notify5mEnabled && pre5Ts > nowTs) {
      chrome.alarms.create(`PRE5|${cityKey}|${item.key}|${item.ts}`, { when: pre5Ts });
    }

    // 3. منبه قبل الصلاة بـ 15 دقيقة
    const before15Ts = item.ts - REMIND_LEAD_MS;
    if (remindBeforeEnabled && before15Ts > nowTs) {
      chrome.alarms.create(`REMIND_BEFORE|${cityKey}|${item.key}|${item.ts}`, { when: before15Ts });
    }

    // 4. منبه بعد الصلاة بـ 15 دقيقة
    const after15Ts = item.ts + REMIND_LEAD_MS;
    if (remindAfterEnabled && after15Ts > nowTs) {
      chrome.alarms.create(`REMIND_AFTER|${cityKey}|${item.key}|${item.ts}`, { when: after15Ts });
    }
  }

  // 5. منبه رأس الساعة
  if (remindHourlyEnabled) {
    const nextHour = new Date(nowTs);
    nextHour.setMinutes(0, 2, 0);
    nextHour.setHours(nextHour.getHours() + 1);
    chrome.alarms.create('HOURLY_REMIND', {
      when: nextHour.getTime(),
      periodInMinutes: 60
    });
  }

  // 6. منبه جلسة التركيز (Pomodoro) إذا كانت قيد التشغيل
  const focusData = parseJsonSafe(state.tv_focus_v2, null);
  if (focusData && focusData.run && focusData.run.status === 'running' && focusData.run.endTs > nowTs) {
    chrome.alarms.create(`POMODORO_DONE|${focusData.run.mode}|${focusData.run.endTs}`, {
      when: focusData.run.endTs
    });
  }

  // 7. منبه دوري كل دقيقة لتحديث شارة الأيقونة وإعادة الجدولة اليومية
  chrome.alarms.create('BADGE_TICK', { periodInMinutes: 1 });

  await updateExtensionBadge(state);
}

// الاستماع لانطلاق المنبهات في الخلفية
chrome.alarms.onAlarm.addListener(async (alarm) => {
  const name = alarm.name || '';
  const state = await getStateFromStorage();

  if (name === 'BADGE_TICK') {
    await updateExtensionBadge(state);
    return;
  }

  const visibleTab = await hasVisibleNewTabClient();
  const { city } = resolveActiveCity(state);

  // أذان الصلاة
  if (name.startsWith('PRAYER|')) {
    const [, , prayerKey, tsStr] = name.split('|');
    const prayerObj = PRAYERS.find((p) => p.key === prayerKey);
    const prayerName = prayerObj ? prayerObj.name : prayerKey;

    if (state.tv_adhan_last !== tsStr) {
      await chrome.storage.local.set({ tv_adhan_last: tsStr });
      showSystemNotification(
        `adhan-${tsStr}`,
        `حان الآن وقت صلاة ${prayerName} 🕋`,
        `حي على الصلاة — توقيت ${city.name} (${formatClockTime(Number(tsStr), city.tz)})`
      );
      if (!visibleTab && (state.tv_adhan_enabled ?? '1') === '1') {
        await playViaOffscreen({
          kind: 'ADHAN',
          source: state.tv_adhan_source || 'short',
          volume: Number(state.tv_adhan_volume ?? 80)
        });
      }
    }
    await updateExtensionBadge(state);
    return;
  }

  // تنبيه قبل الأذان بـ 5 دقائق
  if (name.startsWith('PRE5|')) {
    const [, cityKey, prayerKey, tsStr] = name.split('|');
    const marker = `${cityKey}|n5|${tsStr}`;
    const prayerObj = PRAYERS.find((p) => p.key === prayerKey);
    const prayerName = prayerObj ? prayerObj.name : prayerKey;

    if (state.tv_notify_before_5m_last !== marker) {
      await chrome.storage.local.set({ tv_notify_before_5m_last: marker });
      showSystemNotification(
        `pre5-${tsStr}`,
        `بقيت 5 دقائق لصلاة ${prayerName}`,
        `الأذان عند ${formatClockTime(Number(tsStr), city.tz)} — استعد للصلاة.`
      );
    }
    return;
  }

  // تنبيه قبل أو بعد الأذان بـ 15 دقيقة
  if (name.startsWith('REMIND_BEFORE|') || name.startsWith('REMIND_AFTER|')) {
    const isBefore = name.startsWith('REMIND_BEFORE|');
    const [, cityKey, prayerKey, tsStr] = name.split('|');
    const marker = `${cityKey}|${tsStr}`;
    const storageKey = isBefore ? 'tv_remind_before_last' : 'tv_remind_after_last';
    const prayerObj = PRAYERS.find((p) => p.key === prayerKey);
    const prayerName = prayerObj ? prayerObj.name : prayerKey;

    if (state[storageKey] !== marker) {
      await chrome.storage.local.set({ [storageKey]: marker });
      const title = isBefore
        ? `اقترب وقت صلاة ${prayerName} (ربع ساعة)`
        : `مرّت ربع ساعة على أذان ${prayerName}`;
      showSystemNotification(`rem-${name}`, title, 'اللهم صلِّ وسلِّم على نبينا محمد ﷺ');

      if (!visibleTab) {
        await playViaOffscreen({
          kind: 'REMIND',
          tone: state.tv_remind_tone || 'salawat',
          volume: Number(state.tv_remind_volume ?? 70)
        });
      }
    }
    return;
  }

  // تنبيه رأس الساعة
  if (name === 'HOURLY_REMIND') {
    if (state.tv_remind_hourly === '1' && !visibleTab) {
      const now = new Date();
      const marker = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}T${String(now.getHours()).padStart(2, '0')}`;
      if (state.tv_remind_hourly_last !== marker) {
        await chrome.storage.local.set({ tv_remind_hourly_last: marker });
        await playViaOffscreen({
          kind: 'HOURLY',
          tone: state.tv_remind_hourly_tone || 'salawat',
          volume: Number(state.tv_remind_volume ?? 70)
        });
      }
    }
    return;
  }

  // انتهاء جلسة بومودورو في الخلفية
  if (name.startsWith('POMODORO_DONE|')) {
    const [, mode] = name.split('|');
    const isFocus = mode === 'focus';
    showSystemNotification(
      `pomo-${Date.now()}`,
      isFocus ? 'انتهت جلسة التركيز بنجاح! 🎯' : 'انتهت فترة الاستراحة ⏱️',
      isFocus ? 'أحسنت الإنجاز! خذ قسطاً من الراحة الآن.' : 'استعد لبدء جلسة تركيز جديدة.'
    );
    if (!visibleTab) {
      const focusData = parseJsonSafe(state.tv_focus_v2, null);
      const soundOn = !focusData || !focusData.cfg || focusData.cfg.sound !== false;
      if (soundOn) {
        await playViaOffscreen({ kind: 'POMODORO', volume: 80 });
      }
    }
  }
});

// إعادة الجدولة تلقائياً عند التثبيت أو بدء المتصفح أو تغيّر بيانات التخزين المهمة
chrome.runtime.onInstalled.addListener(() => { scheduleAllAlarms(); });
chrome.runtime.onStartup.addListener(() => { scheduleAllAlarms(); });

const ALARM_TRIGGER_KEYS = new Set([
  'tv_active_city', 'tv_custom_city', 'tv_prayer_adv',
  'tv_adhan_enabled', 'tv_adhan_notify',
  'tv_remind_before', 'tv_remind_after', 'tv_remind_hourly',
  'tv_focus_v2'
]);

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    const shouldReschedule = Object.keys(changes).some((k) => ALARM_TRIGGER_KEYS.has(k));
    if (shouldReschedule) {
      scheduleAllAlarms();
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.action === 'SYNC_ALARMS') {
    scheduleAllAlarms().then(() => sendResponse({ ok: true }));
    return true;
  }
});
