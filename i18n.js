/* ============================================================
 * i18n.js — اللغات: العربية (الأصل) / English / Français
 * المبدأ: النصوص الأصلية في الكود عربية، ويقوم هذا الملف بترجمتها
 * أثناء العرض (عقد النص + الخصائص title/placeholder) مع مراقبة
 * أي تحديث ديناميكي. لا يُترجم القرآن والأذكار ونصوص التدبّر.
 * ============================================================ */
(function () {
  'use strict';

  const KEY = 'tv_lang';
  const LANGS = {
    ar: { dir: 'rtl', locale: 'ar-EG', hijri: 'ar-SA', label: 'العربية' },
    en: { dir: 'ltr', locale: 'en-GB', hijri: 'en', label: 'English' },
    fr: { dir: 'ltr', locale: 'fr-FR', hijri: 'fr', label: 'Français' }
  };

  let lang = 'ar';
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && LANGS[saved]) lang = saved;
  } catch (e) { /* التخزين غير متاح */ }

  // ---------- القاموس: [عربي, English, Français] ----------
  const D = [
    // ----- عام -----
    ['إغلاق', 'Close', 'Fermer'],
    ['تم', 'Done', 'OK'],
    ['تفعيل', 'Enable', 'Activer'],
    ['إزالة', 'Remove', 'Supprimer'],
    ['إعادة ضبط', 'Reset', 'Réinitialiser'],
    ['بحث', 'Search', 'Rechercher'],
    ['ملف', 'File', 'Fichier'],
    ['تجربة', 'Test', 'Tester'],
    ['الآن', 'Now', 'Maintenant'],
    ['اليوم', 'Today', 'Aujourd’hui'],
    ['غداً', 'Tomorrow', 'Demain'],
    ['أمس', 'Yesterday', 'Hier'],
    ['ثانية', 'sec', 'sec'],
    ['جارٍ التحميل...', 'Loading...', 'Chargement...'],
    ['مفعّل', 'On', 'Activé'],
    ['مُفعّل', 'On', 'Activé'],
    ['مفعّل ✓', 'On ✓', 'Activé ✓'],
    ['مفعّل افتراضياً', 'On by default', 'Activé par défaut'],
    ['متوقف افتراضياً', 'Off by default', 'Désactivé par défaut'],
    ['محجوب', 'Blocked', 'Bloqué'],
    ['غير مدعوم', 'Unsupported', 'Non pris en charge'],
    ['غير متاح', 'Unavailable', 'Indisponible'],
    ['ظاهر', 'Visible', 'Visible'],
    ['مخفي', 'Hidden', 'Masqué'],
    ['مستمر', 'Continuous', 'Continu'],
    ['ص', 'AM', 'AM'],
    ['م', 'PM', 'PM'],
    ['صباحاً (ص)', 'Morning (AM)', 'Matin (AM)'],
    ['مساءً (م)', 'Evening (PM)', 'Soir (PM)'],
    ['كم/س', 'km/h', 'km/h'],
    ['مدينة', 'City', 'Ville'],
    ['بدون تفاصيل', 'No details', 'Sans détails'],
    ['بدون ملف', 'No file', 'Aucun fichier'],
    ['صوت مخصص', 'Custom sound', 'Son personnalisé'],
    ['أشكال.', 'styles.', 'styles.'],
    ['-- يوماً', '-- days', '-- jours'],

    // ----- الأيام والصلوات -----
    ['الأحد', 'Sunday', 'Dimanche'],
    ['الإثنين', 'Monday', 'Lundi'],
    ['الثلاثاء', 'Tuesday', 'Mardi'],
    ['الأربعاء', 'Wednesday', 'Mercredi'],
    ['الخميس', 'Thursday', 'Jeudi'],
    ['الجمعة', 'Friday', 'Vendredi'],
    ['السبت', 'Saturday', 'Samedi'],
    ['الفجر', 'Fajr', 'Fajr'],
    ['الشروق', 'Sunrise', 'Lever du soleil'],
    ['الظهر', 'Dhuhr', 'Dhuhr'],
    ['العصر', 'Asr', 'Asr'],
    ['المغرب', 'Maghrib', 'Maghrib'],
    ['العشاء', 'Isha', 'Isha'],
    ['الغروب', 'Sunset', 'Coucher du soleil'],
    ['القادمة', 'Next', 'Prochaine'],
    ['الصلاة القادمة', 'Next prayer', 'Prochaine prière'],
    ['الصلاة السابقة', 'Previous prayer', 'Prière précédente'],
    ['الصلاة القادمة والسابقة', 'Next & previous prayer', 'Prochaine et précédente prière'],
    ['المتبقي للأذان', 'Time to adhan', 'Avant l’adhan'],
    ['مضى عليها', 'Elapsed', 'Écoulé'],
    ['الوقت الآن', 'Time now', 'Heure actuelle'],
    ['شريط مواقيت الصلاة', 'Prayer times bar', 'Barre des horaires de prière'],
    ['الساعة الرقمية', 'Digital clock', 'Horloge numérique'],
    ['الساعة التناظرية', 'Analog clock', 'Horloge analogique'],
    ['التاريخ واليوم', 'Date & day', 'Date et jour'],
    ['الموافق:', 'Corresponding to:', 'Correspond à :'],
    ['الهجري', 'Hijri', 'Hégirien'],
    ['الميلادي', 'Gregorian', 'Grégorien'],
    ['تقويم أم القرى', 'Umm al-Qura calendar', 'Calendrier Umm al-Qura'],
    ['عدّاد رمضان', 'Ramadan countdown', 'Compte à rebours du Ramadan'],
    ['متبقي على شهر رمضان المبارك', 'Until the blessed month of Ramadan', 'Avant le mois béni du Ramadan'],
    ['بطاقة المدينة', 'City card', 'Carte de la ville'],

    // ----- الأقسام والبطاقات -----
    ['تدبّر آية', 'Verse reflection', 'Méditation d’un verset'],
    ['تَدَبُّرُ آيَة', 'Verse reflection', 'Méditation d’un verset'],
    ['ذكر الساعة', 'Dhikr of the hour', 'Dhikr de l’heure'],
    ['ذِكرُ السَّاعَة', 'Dhikr of the hour', 'Dhikr de l’heure'],
    ['توقعات الطقس', 'Weather forecast', 'Prévisions météo'],
    ['توقعات الطقس الأسبوعية عبر الأقمار الاصطناعية', 'Weekly weather forecast via satellite', 'Prévisions météo hebdomadaires par satellite'],
    ['الطقس المباشر', 'Live weather', 'Météo en direct'],
    ['الطقس غير متاح حالياً', 'Weather is currently unavailable', 'Météo actuellement indisponible'],
    ['مرّر للمزيد: الرطوبة والرياح والشروق/الغروب', 'Scroll for more: humidity, wind, sunrise/sunset', 'Faites défiler : humidité, vent, lever/coucher du soleil'],
    ['مرّر المؤشر لعرض التفاصيل', 'Hover to see details', 'Survolez pour voir les détails'],
    ['آية أخرى', 'Another verse', 'Autre verset'],
    ['سماع الآية بصوت المنشاوي مرتّلاً', 'Listen to the verse recited by Al-Minshawi', 'Écouter le verset récité par Al-Minshawi'],
    ['قراءة ورد القرآن اليومي وتدبر آياته', 'Read your daily Quran portion and reflect on its verses', 'Lire votre portion quotidienne du Coran et méditer ses versets'],
    ['لَطِيفَةٌ وَتَدَبُّر:', 'A gem & reflection:', 'Une perle et une méditation :'],
    ['تتجدد تلقائياً', 'Refreshes automatically', 'Se renouvelle automatiquement'],
    ['تغيير الذكر', 'Change dhikr', 'Changer le dhikr'],
    ['تسبيح (+1)', 'Tasbih (+1)', 'Tasbih (+1)'],
    ['وِرد اليوم', 'Today’s goal', 'Objectif du jour'],
    ['سَبِّح الآن', 'Glorify now', 'Glorifiez maintenant'],
    ['سبحان الله وبحمده', 'SubhanAllah wa bi-hamdih', 'SubhanAllah wa bi-hamdih'],
    ['لا حول ولا قوة إلا بالله', 'La hawla wa la quwwata illa Allah', 'La hawla wa la quwwata illa Allah'],
    ['الاستغفار', 'Seeking forgiveness', 'Demande de pardon'],
    ['دعوة ذي النون', 'Dua of Dhoo-Noon', 'Doua de Dhoo-Noun'],
    ['التسبيح الأربع', 'The four glorifications', 'Les quatre glorifications'],
    ['عدّاد التسبيح', 'Tasbih counter', 'Compteur de tasbih'],
    ['عدّاد الفترة الحالية:', 'Current period counter:', 'Compteur de la période en cours :'],
    ['عدد التسبيحات في الفترة الحالية', 'Tasbih count in the current period', 'Nombre de tasbih dans la période en cours'],
    ['تصفير العداد', 'Reset counter', 'Réinitialiser le compteur'],
    ['المسبحة الإلكترونية والأذكار', 'Digital tasbih & adhkar', 'Chapelet numérique et adhkar'],
    ['فتح المسبحة والأذكار', 'Open tasbih & adhkar', 'Ouvrir le chapelet et les adhkar'],
    ['من أذكار اليوم والليلة:', 'From the daily adhkar:', 'Des adhkar du jour et de la nuit :'],
    ['سبحان الله', 'SubhanAllah', 'SubhanAllah'],
    ['الحمد لله', 'Alhamdulillah', 'Alhamdulillah'],
    ['الله أكبر', 'Allahu Akbar', 'Allahu Akbar'],
    ['لا إله إلا الله', 'La ilaha illa Allah', 'La ilaha illa Allah'],
    ['أستغفر الله', 'Astaghfirullah', 'Astaghfirullah'],
    ['الصلاة على النبي', 'Salawat on the Prophet ﷺ', 'Salutations sur le Prophète ﷺ'],
    ['سبحان الله وبحمده سبحان الله العظيم', 'SubhanAllah wa bihamdih, SubhanAllah al-Azim', 'SubhanAllah wa bihamdih, SubhanAllah al-Azim'],
    ['اللهم بلغنا رمضان', 'O Allah, let us reach Ramadan', 'Ô Allah, fais-nous atteindre le Ramadan'],
    ['الحفظ من كل سوء:', 'Protection from all harm:', 'Protection contre tout mal :'],
    ['سيد الاستغفار:', 'Sayyid al-Istighfar:', 'Sayyid al-Istighfar :'],
    ['دعاء الرضا والأمان:', 'Supplication for contentment and safety:', 'Invocation de satisfaction et de sécurité :'],
    ['كلمتان خفيفتان على اللسان ثقيلتان في الميزان', 'Two light words on the tongue, heavy on the scale', 'Deux mots légers sur la langue, lourds dans la balance'],
    ['كلمتان خفيفتان على اللسان ثقيلتان في الميزان حبيبتان إلى الرحمن', 'Two light words on the tongue, heavy on the scale, beloved to the Most Merciful', 'Deux mots légers sur la langue, lourds dans la balance, chers au Très Miséricordieux'],
    ['كنزٌ من كنوز الجنة وبابٌ عظيمٌ لتفريج الهموم ورفع البلاء', 'A treasure of Paradise and a great door to relieving worries and lifting hardship', 'Un trésor du Paradis et une grande porte pour apaiser les soucis et écarter l’épreuve'],
    ['غُفرت ذنوبه وإن كان فرّ من الزحف، وأمانٌ باقٍ في الأرض', 'His sins are forgiven even if he fled the battlefield — a lasting safeguard on earth', 'Ses péchés sont pardonnés même s’il a fui le combat — une sécurité durable sur terre'],
    ['من صلى عليّ صلاة صلى الله عليه بها عشراً وحُطت عنه عشر خطيئات', 'Whoever sends one blessing upon me, God sends ten upon him and erases ten of his sins', 'Quiconque prie une fois sur moi, Dieu prie dix fois sur lui et efface dix de ses fautes'],
    ['دعوة ذي النون؛ ما دعا بها مكروبٌ إلا فرّج الله عنه كربه', 'The supplication of Dhun-Nun; no distressed person calls upon it except God relieves his distress', 'L’invocation de Dhun-Nun ; nul affligé ne l’invoque sans que Dieu ne le délivre de sa peine'],
    ['أحبّ الكلام إلى الله، وغراس الجنة، وأفضل ما طلعت عليه الشمس', 'The most beloved words to God, the seeds of Paradise, and the best thing the sun has risen upon', 'Les paroles les plus aimées de Dieu, les semences du Paradis, et le meilleur de ce sur quoi le soleil se lève'],

    // ----- الأزرار والعناصر العلوية -----
    ['الإعدادات', 'Settings', 'Paramètres'],
    ['الإعدادات وتخصيص الواجهة', 'Settings & customization', 'Paramètres et personnalisation'],
    ['إعدادات الشاشة وتخصيص الواجهة', 'Display settings & customization', 'Paramètres d’affichage et personnalisation'],
    ['الحساب', 'Account', 'Compte'],
    ['الثيم', 'Theme', 'Thème'],
    ['الأخبار', 'News', 'Actualités'],
    ['الكتب', 'Books', 'Livres'],
    ['التمويل', 'Finance', 'Finance'],
    ['جهات الاتصال', 'Contacts', 'Contacts'],
    ['التخزين السحابي', 'Cloud', 'Cloud'],
    ['عدسة قوقل', 'Google Lens', 'Google Lens'],
    ['تغيير الثيم واللون المخصص', 'Change theme and custom color', 'Changer le thème et la couleur personnalisée'],
    ['اختر نمط الثيم المفضل:', 'Choose your preferred theme:', 'Choisissez votre thème préféré :'],
    ['لون الإضاءة المخصص:', 'Custom glow color:', 'Couleur d’éclat personnalisée :'],
    ['الملكي الذهبي', 'Royal Gold', 'Or royal'],
    ['الزمردي', 'Emerald', 'Émeraude'],
    ['الأزرق الليلي', 'Night Blue', 'Bleu nuit'],
    ['البنفسجي', 'Purple', 'Violet'],
    ['الأسود الفخم', 'Luxe Black', 'Noir luxe'],
    ['الفاتح الصباحي', 'Morning Light', 'Clair du matin'],
    ['البيج الدافئ الصحراوي', 'Warm Desert Beige', 'Beige désert chaleureux'],
    ['بحث قوقل', 'Google search', 'Recherche Google'],
    ['بحث في قوقل', 'Search Google', 'Rechercher sur Google'],
    ['ابحث في قوقل أو اكتب سؤالك...', 'Search Google or type your question...', 'Rechercher sur Google ou poser une question...'],
    ['قائمة المهام', 'Task list', 'Liste de tâches'],
    ['قائمة المهام اليومية', 'Daily task list', 'Liste de tâches quotidiennes'],
    ['أضف مهمة جديدة...', 'Add a new task...', 'Ajouter une tâche...'],
    ['حذف المهمة', 'Delete task', 'Supprimer la tâche'],
    ['اسحب لأعلى لتوسيع قائمة المهام', 'Drag up to expand the task list', 'Faites glisser vers le haut pour agrandir la liste'],
    ['توسيع القائمة لأعلى الشاشة', 'Expand list to the top of the screen', 'Étendre la liste vers le haut de l’écran'],
    ['إرجاع القائمة لحجمها الطبيعي', 'Restore list to normal size', 'Rétablir la taille normale de la liste'],
    ['مفكرة', 'Notepad', 'Bloc-notes'],
    ['مفكرة سريعة', 'Quick notepad', 'Bloc-notes rapide'],
    ['المفكرة السريعة', 'Quick notepad', 'Bloc-notes rapide'],
    ['مفكرة سريعة: تدوين أرقام وملاحظات عابرة (تُحفظ تلقائياً)', 'Quick notepad: jot down numbers and quick notes (saved automatically)', 'Bloc-notes rapide : notez chiffres et remarques (enregistré automatiquement)'],
    ['دوّن أرقاماً أو ملاحظات عابرة دون مغادرة الصفحة...', 'Jot down numbers or quick notes without leaving the page...', 'Notez des chiffres ou des remarques sans quitter la page...'],
    ['تُحفظ تلقائياً أثناء الكتابة في هذا الجهاز.', 'Saved automatically as you type on this device.', 'Enregistré automatiquement pendant la saisie sur cet appareil.'],
    ['مسح المفكرة', 'Clear notepad', 'Effacer le bloc-notes'],
    ['تم مسح المفكرة.', 'Notepad cleared.', 'Bloc-notes effacé.'],
    ['حفظ وإغلاق', 'Save & close', 'Enregistrer et fermer'],
    ['ملء الشاشة', 'Fullscreen', 'Plein écran'],
    ['الخرائط', 'Maps', 'Cartes'],
    ['الصور', 'Images', 'Images'],
    ['الترجمة', 'Translation', 'Traduction'],
    ['التقويم', 'Calendar', 'Calendrier'],
    ['أدوات', 'Tools', 'Outils'],
    ['تواصل', 'Social', 'Réseaux'],
    ['أدوات الذكاء الاصطناعي', 'AI tools', 'Outils d’IA'],
    ['أدوات قوقل', 'Google tools', 'Outils Google'],
    ['أدوات قوقل (Google Workspace)', 'Google tools (Google Workspace)', 'Outils Google (Google Workspace)'],
    ['رموز التواصل الاجتماعي', 'Social media icons', 'Icônes de réseaux sociaux'],
    ['شرائط الأدوات السفلية', 'Bottom toolbars', 'Barres d’outils du bas'],
    ['عرض شريط الأدوات', 'Toolbar width', 'Largeur de la barre d’outils'],
    ['تبديل المواقع', 'Swap positions', 'Inverser les positions'],

    // ----- المدينة والموقع -----
    ['تغيير المدينة', 'Change city', 'Changer de ville'],
    ['تغيير المدينة وتحديد موقعك', 'Change city & set your location', 'Changer de ville et définir votre position'],
    ['اختيار المدينة وتحديد موقعك', 'Choose a city and set your location', 'Choisir une ville et définir votre position'],
    ['تحديد موقعي الحالي تلقائياً (GPS)', 'Detect my location automatically (GPS)', 'Détecter ma position automatiquement (GPS)'],
    ['البحث عن المدينة بالاسم عبر الإنترنت', 'Search for a city by name online', 'Rechercher une ville par nom en ligne'],
    ['اكتب اسم أي مدينة في العالم...', 'Type any city in the world...', 'Saisissez n’importe quelle ville du monde...'],
    ['اكتب الاسم ثم اضغط «تعرّف» للبحث عن أي مدينة في العالم، أو اختر من القائمة أدناه.', 'Type a name and press “Find” to search any city in the world, or pick one from the list below.', 'Saisissez un nom puis appuyez sur « Trouver » pour chercher une ville du monde, ou choisissez dans la liste ci-dessous.'],
    ['تعرّف', 'Find', 'Trouver'],
    ['موقعي الحالي', 'My current location', 'Ma position actuelle'],
    ['مدينة مخصصة', 'Custom city', 'Ville personnalisée'],
    ['يتم تحديث مواقيت الصلاة والطقس المباشر آلياً وفق إحداثيات المدينة المختارة', 'Prayer times and live weather update automatically for the selected city’s coordinates', 'Les horaires de prière et la météo se mettent à jour automatiquement selon les coordonnées de la ville choisie'],
    ['جاري تحديد إحداثياتك...', 'Detecting your coordinates...', 'Détermination de vos coordonnées...'],
    ['جارٍ البحث في قاعدة مدن العالم...', 'Searching the world cities database...', 'Recherche dans la base des villes du monde...'],
    ['تعذر تحديد الموقع. يرجى تفعيل إذن الموقع.', 'Could not determine your location. Please allow location access.', 'Impossible de déterminer votre position. Veuillez autoriser la localisation.'],
    ['متصفحك لا يدعم تحديد الموقع الجغرافي.', 'Your browser does not support geolocation.', 'Votre navigateur ne prend pas en charge la géolocalisation.'],
    ['تعذر البحث الآن. تحقق من اتصال الإنترنت، أو اختر مدينة من القائمة أدناه.', 'Search is unavailable right now. Check your connection or pick a city from the list below.', 'Recherche indisponible. Vérifiez votre connexion ou choisissez une ville dans la liste ci-dessous.'],
    ['اكتب حرفين على الأقل من اسم المدينة ثم اضغط «تعرّف».', 'Type at least two letters of the city name, then press “Find”.', 'Saisissez au moins deux lettres du nom de la ville, puis appuyez sur « Trouver ».'],
    ['لم يتم العثور على مدينة مطابقة في القائمة.', 'No matching city found in the list.', 'Aucune ville correspondante dans la liste.'],
    ['تحديد موقعي الحالي تلقائياً', 'Detect my location automatically', 'Détecter ma position automatiquement'],
    ['بريدة', 'Buraydah', 'Buraydah'],
    ['عنيزة', 'Unaizah', 'Unaizah'],
    ['الرياض', 'Riyadh', 'Riyad'],
    ['مكة المكرمة', 'Makkah', 'La Mecque'],
    ['المدينة المنورة', 'Madinah', 'Médine'],
    ['جدة', 'Jeddah', 'Djeddah'],
    ['الدمام والخبر', 'Dammam & Khobar', 'Dammam et Khobar'],
    ['الأحساء والمنامة', 'Al-Ahsa & Manama', 'Al-Ahsa et Manama'],
    ['الطائف', 'Taif', 'Taëf'],
    ['تبوك', 'Tabuk', 'Tabouk'],
    ['أبها وعسير', 'Abha & Asir', 'Abha et Asir'],
    ['حائل', 'Hail', 'Haïl'],
    ['جازان', 'Jazan', 'Jizan'],
    ['نجران', 'Najran', 'Najran'],
    ['سكاكا والجوف', 'Sakaka & Al-Jouf', 'Sakaka et Al-Jouf'],
    ['ينبع البحر', 'Yanbu Al-Bahr', 'Yanbu Al-Bahr'],
    ['دبي وأبوظبي', 'Dubai & Abu Dhabi', 'Dubaï et Abou Dhabi'],
    ['مدينة الكويت', 'Kuwait City', 'Koweït'],
    ['الدوحة', 'Doha', 'Doha'],
    ['مسقط', 'Muscat', 'Mascate'],
    ['القاهرة', 'Cairo', 'Le Caire'],
    ['عمّان', 'Amman', 'Amman'],
    ['بغداد', 'Baghdad', 'Bagdad'],
    ['القدس الشريف', 'Jerusalem', 'Jérusalem'],
    ['منطقة القصيم • توقيت أم القرى', 'Al-Qassim Region • Umm al-Qura time', 'Région d’Al-Qassim • Heure d’Umm al-Qura'],
    ['العاصمة • توقيت أم القرى', 'Capital • Umm al-Qura time', 'Capitale • Heure d’Umm al-Qura'],
    ['البلد الحرام • توقيت أم القرى', 'The Sacred City • Umm al-Qura time', 'La Ville Sainte • Heure d’Umm al-Qura'],
    ['طيبة الطيبة • توقيت أم القرى', 'Taybah • Umm al-Qura time', 'Taybah • Heure d’Umm al-Qura'],
    ['عروس البحر الأحمر', 'Bride of the Red Sea', 'Fiancée de la mer Rouge'],
    ['المنطقة الشرقية', 'Eastern Province', 'Province de l’Est'],
    ['واحة النخيل • الشرقية', 'Palm oasis • Eastern Province', 'Oasis de palmiers • Province de l’Est'],
    ['عروس المصايف', 'Bride of the summer resorts', 'Fiancée des stations d’été'],
    ['منطقة تبوك الشمالية', 'Northern Tabuk Region', 'Région nord de Tabouk'],
    ['منطقة عسير الجنوبية', 'Southern Asir Region', 'Région sud d’Asir'],
    ['عروس الشمال', 'Bride of the North', 'Fiancée du Nord'],
    ['لؤلؤة الجنوب', 'Pearl of the South', 'Perle du Sud'],
    ['جنوب المملكة', 'Southern Kingdom', 'Sud du Royaume'],
    ['منطقة الجوف', 'Al-Jouf Region', 'Région d’Al-Jouf'],
    ['الساحل الغربي', 'Western coast', 'Côte ouest'],
    ['دولة الإمارات العربية', 'United Arab Emirates', 'Émirats arabes unis'],
    ['دولة الكويت الشقيقة', 'State of Kuwait', 'État du Koweït'],
    ['دولة قطر', 'State of Qatar', 'État du Qatar'],
    ['سلطنة عُمان', 'Sultanate of Oman', 'Sultanat d’Oman'],
    ['جمهورية مصر العربية', 'Arab Republic of Egypt', 'République arabe d’Égypte'],
    ['المملكة الأردنية الهاشمية', 'Hashemite Kingdom of Jordan', 'Royaume hachémite de Jordanie'],
    ['جمهورية العراق', 'Republic of Iraq', 'République d’Irak'],
    ['فلسطين المحتلة', 'Occupied Palestine', 'Palestine occupée'],

    // ----- الطقس -----
    ['صافٍ ومشمس', 'Clear and sunny', 'Dégagé et ensoleillé'],
    ['غائم جزئياً', 'Partly cloudy', 'Partiellement nuageux'],
    ['غائم غالباً', 'Mostly cloudy', 'Plutôt nuageux'],
    ['ضباب خفيف', 'Light fog', 'Brouillard léger'],
    ['رذاذ خفيف', 'Light drizzle', 'Bruine légère'],
    ['زخات مطر', 'Rain showers', 'Averses'],
    ['أمطار', 'Rain', 'Pluie'],
    ['ثلوج', 'Snow', 'Neige'],
    ['عواصف رعدية', 'Thunderstorms', 'Orages'],
    ['معتدل ولطيف', 'Mild and pleasant', 'Doux et agréable'],

    // ----- شكل الساعة -----
    ['كلاسيكي', 'Classic', 'Classique'],
    ['أرقام هندية', 'Hindi numerals', 'Chiffres hindi'],
    ['أرقام لاتينية', 'Latin numerals', 'Chiffres latins'],
    ['أرقام رومانية', 'Roman numerals', 'Chiffres romains'],
    ['نقاط بسيطة', 'Simple dots', 'Points simples'],
    ['فخم مملوء', 'Bold filled', 'Plein et luxueux'],
    ['إطار مزدوج', 'Double frame', 'Cadre double'],
    ['مربع', 'Square', 'Carré'],
    ['مينيمال', 'Minimal', 'Minimaliste'],
    ['زجاجي', 'Glass', 'Verre'],
    ['شكل الساعة التناظرية', 'Analog clock style', 'Style de l’horloge analogique'],
    ['أرقام الساعة', 'Clock numerals', 'Chiffres de l’horloge'],
    ['حسب الشكل', 'By style', 'Selon le style'],
    ['بدون أرقام', 'No numerals', 'Sans chiffres'],
    ['1 2 3 (لاتينية)', '1 2 3 (Latin)', '1 2 3 (latins)'],
    ['١ ٢ ٣ (هندية)', '١ ٢ ٣ (Hindi)', '١ ٢ ٣ (hindi)'],
    ['I II III (رومانية)', 'I II III (Roman)', 'I II III (romains)'],
    ['نصيحة: انقر على الساعة التناظرية نفسها لتبديل شكلها فوراً بين', 'Tip: click the analog clock itself to switch its style instantly among', 'Astuce : cliquez sur l’horloge analogique pour changer de style instantanément parmi'],
    ['الساعة والتاريخ', 'Clock & date', 'Horloge et date'],
    ['التاريخ المكبّر', 'Enlarged date', 'Date agrandie'],
    ['نظام 24 ساعة', '24-hour format', 'Format 24 heures'],
    ['للساعة الرقمية ومواقيت الصلاة', 'For the digital clock and prayer times', 'Pour l’horloge numérique et les horaires de prière'],

    // ----- الإعدادات: التبويبات والتخطيط -----
    ['المظهر', 'Appearance', 'Apparence'],
    ['العناصر', 'Items', 'Éléments'],
    ['التخطيط', 'Layout', 'Disposition'],
    ['الأذان', 'Adhan', 'Adhan'],
    ['بطاقات اللوحة', 'Dashboard cards', 'Cartes du tableau'],
    ['تخطيط البطاقات', 'Card layout', 'Disposition des cartes'],
    ['لكل بطاقة: صحّ للإظهار، مقبض للسحب في وضع التخصيص، وشريطان مستقلان لحجم البطاقة وحجم الخط.', 'For each card: a check to show it, a handle to drag it in customize mode, and two independent sliders for card size and font size.', 'Pour chaque carte : une case pour l’afficher, une poignée pour la déplacer en mode personnalisation, et deux curseurs indépendants pour la taille de la carte et de la police.'],
    ['افتح وضع التخصيص، ثم اسحب أي بطاقة من مقبضها العلوي وغيّر حجمها من الزاوية اليسرى السفلية. تُحفظ كل التغييرات تلقائياً.', 'Open customize mode, then drag any card by its top handle and resize it from the bottom-left corner. All changes are saved automatically.', 'Ouvrez le mode personnalisation, puis déplacez une carte par sa poignée supérieure et redimensionnez-la depuis le coin inférieur gauche. Tout est enregistré automatiquement.'],
    ['التخصيص الحر متاح على الشاشات الكبيرة (عرض 1024 بكسل فأكثر) حفاظاً على ترتيب البطاقات المتجاوب على الجوال.', 'Free customization is available on large screens (1024 px wide or more) to keep the responsive card order on phones.', 'La personnalisation libre est disponible sur grand écran (1024 px ou plus) afin de conserver l’ordre adaptatif des cartes sur mobile.'],
    ['بدء وضع التخصيص (سحب وتغيير الحجم)', 'Start customize mode (drag & resize)', 'Démarrer la personnalisation (déplacer et redimensionner)'],
    ['وضع التخصيص مفعّل', 'Customize mode is on', 'Mode personnalisation activé'],
    ['وضع التخصيص: اسحب البطاقة من المقبض، وغيّر حجمها من الزاوية اليسرى السفلية', 'Customize mode: drag a card by its handle and resize it from the bottom-left corner', 'Mode personnalisation : déplacez la carte par la poignée et redimensionnez-la depuis le coin inférieur gauche'],
    ['تقسيمات جاهزة:', 'Preset layouts:', 'Dispositions prédéfinies :'],
    ['كلاسيكي', 'Classic', 'Classique'],
    ['مركّز', 'Focused', 'Concentré'],
    ['شبكي', 'Grid', 'Grille'],
    ['التقسيمات تغيّر أماكن البطاقات فقط، بينما تبقى أحجام الخطوط وإعداداتها كما هي.', 'Presets only change card positions; font sizes and their settings stay the same.', 'Les dispositions ne changent que la position des cartes ; les tailles de police et leurs réglages restent inchangés.'],
    ['إعادة البطاقات لترتيبها الأصلي', 'Restore cards to their original order', 'Remettre les cartes dans leur ordre d’origine'],
    ['إعادة ضبط التخطيط الأصلي', 'Reset original layout', 'Réinitialiser la disposition d’origine'],
    ['الحجم الافتراضي.', 'Default size.', 'Taille par défaut.'],
    ['حجم الواجهة العام', 'Global interface size', 'Taille globale de l’interface'],
    ['تكبير الواجهة', 'Enlarge interface', 'Agrandir l’interface'],
    ['تصغير الواجهة', 'Shrink interface', 'Réduire l’interface'],
    ['تكبير محتوى كل البطاقات مع الحفاظ على أماكنها', 'Enlarge the content of all cards while keeping their positions', 'Agrandir le contenu de toutes les cartes en conservant leur position'],
    ['كبّر خط الشرائط لتكبير الأيقونات والنصوص، وغيّر عرض شريط الأدوات أو بدّل موضع الشريطين.', 'Increase the toolbar font to enlarge icons and text, change the toolbar width, or swap the two bars.', 'Augmentez la police des barres pour agrandir icônes et textes, changez la largeur de la barre d’outils ou inversez les deux barres.'],
    ['إخفاء عناصر الشرائط', 'Hide toolbar items', 'Masquer des éléments des barres'],
    ['إظهار الكل', 'Show all', 'Tout afficher'],
    ['انقر بالزر الأيمن على أي أيقونة في الشريط لإخفائها فوراً، أو استخدم القائمة أدناه لاستعادتها.', 'Right-click any icon in the bar to hide it instantly, or use the list below to restore it.', 'Faites un clic droit sur une icône de la barre pour la masquer, ou utilisez la liste ci-dessous pour la restaurer.'],
    ['✓ إظهار • ⠿ سحب • ↔ حجم • Aa خط', '✓ Show • ⠿ Drag • ↔ Size • Aa Font', '✓ Afficher • ⠿ Glisser • ↔ Taille • Aa Police'],
    ['اسحب لتحريك البطاقة', 'Drag to move the card', 'Glissez pour déplacer la carte'],
    ['اسحب من الزاوية لتكبير أو تصغير البطاقة', 'Drag the corner to resize the card', 'Glissez le coin pour redimensionner la carte'],
    ['تحريك البطاقة', 'Move card', 'Déplacer la carte'],
    ['تغيير حجم البطاقة', 'Resize card', 'Redimensionner la carte'],
    ['تحريك طفيف للبكسلات (Burn-in)', 'Slight pixel shifting (burn-in)', 'Léger décalage des pixels (burn-in)'],
    ['لحماية شاشات OLED والتلفزيونات', 'Protects OLED screens and TVs', 'Protège les écrans OLED et les téléviseurs'],
    ['إرجاع كل الإعدادات الافتراضية', 'Restore all default settings', 'Rétablir tous les paramètres par défaut'],
    ['يمسح الإعدادات والتخطيط والعدادات والمهام ويعيد الصفحة لوضعها الأصلي (بعد تأكيد).', 'Clears settings, layout, counters and tasks and restores the page to its original state (after confirmation).', 'Efface paramètres, disposition, compteurs et tâches et rétablit la page à son état d’origine (après confirmation).'],
    ['اضغط مرة أخرى للتأكيد', 'Press again to confirm', 'Appuyez à nouveau pour confirmer'],
    ['أُرجعت كل الإعدادات الافتراضية، جارٍ إعادة تحميل الصفحة...', 'All settings restored to defaults, reloading the page...', 'Tous les paramètres ont été rétablis, rechargement de la page...'],
    ['حفظ واستعادة التخطيط والإعدادات:', 'Back up & restore layout and settings:', 'Sauvegarde et restauration de la disposition et des paramètres :'],
    ['حفظ التخطيط في ملف', 'Save layout to file', 'Enregistrer la disposition dans un fichier'],
    ['حفظ في ملف', 'Save to file', 'Enregistrer dans un fichier'],
    ['استعادة من ملف', 'Restore from file', 'Restaurer depuis un fichier'],
    ['يشمل الملف التخطيط والثيم وأحجام الخطوط وإعدادات الساعة والتاريخ والأذان والمدينة، ولا يشمل المهام ولا عدّادات التسبيح.', 'The file includes layout, theme, font sizes, clock/date and adhan settings and the city — not tasks or tasbih counters.', 'Le fichier inclut disposition, thème, tailles de police, réglages d’horloge/date, d’adhan et la ville — pas les tâches ni les compteurs de tasbih.'],
    ['تم حفظ ملف التخطيط والإعدادات في مجلد التنزيلات.', 'Layout and settings file saved to your Downloads folder.', 'Fichier de disposition et de paramètres enregistré dans le dossier Téléchargements.'],
    ['تمت الاستعادة بنجاح، جارٍ إعادة تحميل الصفحة...', 'Restored successfully, reloading the page...', 'Restauration réussie, rechargement de la page...'],
    ['عن الإضافة والمطوّر', 'About the extension & developer', 'À propos de l’extension et du développeur'],
    ['مطوّر «اللوحة الذكية - تاب جديد المتصفح»', 'Developer of “Smart Dashboard – Browser New Tab”', 'Développeur de « Tableau de bord intelligent – Nouvel onglet »'],
    ['م/ عامر الحلحلي', 'Eng. Amer Al-Halhali', 'Ing. Amer Al-Halhali'],
    ['الموقع الشخصي:', 'Personal website:', 'Site personnel :'],
    ['مشروع الإضافة على GitHub:', 'Extension project on GitHub:', 'Projet de l’extension sur GitHub :'],
    ['فتحها عند تشغيل المتصفح:', 'Open it when the browser starts:', 'L’ouvrir au démarrage du navigateur :'],
    ['هذه الإضافة تحلّ محل صفحة التبويب الجديد تلقائياً.', 'This extension automatically replaces the new tab page.', 'Cette extension remplace automatiquement la page du nouvel onglet.'],
    ['ولتظهر عند تشغيل المتصفح: من الإعدادات اختر «عند بدء التشغيل» ثم «فتح صفحة التبويب الجديد».', 'To show it at browser startup: in the browser settings choose “On startup”, then “Open the New Tab page”.', 'Pour l’afficher au démarrage : dans les paramètres du navigateur, choisissez « Au démarrage » puis « Ouvrir la page Nouvel onglet ».'],
    ['فتح المواقع والأدوات', 'Open sites & tools', 'Ouverture des sites et outils'],
    ['طريقة فتح الروابط', 'How links open', 'Ouverture des liens'],
    ['صفحة جديدة', 'New tab', 'Nouvel onglet'],
    ['صفحة جديدة أم نفس التبويب', 'New tab or same tab', 'Nouvel onglet ou même onglet'],
    ['نفس التبويب', 'Same tab', 'Même onglet'],
    ['ستُفتح المواقع والأدوات في صفحة جديدة.', 'Sites and tools will open in a new tab.', 'Les sites et outils s’ouvriront dans un nouvel onglet.'],
    ['ستُفتح المواقع والأدوات في نفس التبويب.', 'Sites and tools will open in the same tab.', 'Les sites et outils s’ouvriront dans le même onglet.'],
    ['اللغة', 'Language', 'Langue'],
    ['لغة الواجهة', 'Interface language', 'Langue de l’interface'],
    ['العربية', 'العربية', 'العربية'],
    ['تتجدد تلقائياً', 'Refreshes automatically', 'Se renouvelle automatiquement'],
    ['تم إخفاء عنصر الشريط', 'Toolbar item hidden', 'Élément de la barre masqué'],
    ['أُعيدت جميع عناصر الشرائط إلى الظهور.', 'All toolbar items are visible again.', 'Tous les éléments des barres sont de nouveau visibles.'],
    ['تم التحديد بنجاح', 'Selected successfully', 'Sélectionné avec succès'],

    // ----- التسبيح -----
    ['تصفير العدّاد تلقائياً', 'Auto-reset counter', 'Réinitialisation automatique du compteur'],
    ['كل يوم', 'Every day', 'Chaque jour'],
    ['كل أسبوع', 'Every week', 'Chaque semaine'],
    ['كل شهر', 'Every month', 'Chaque mois'],
    ['مستمر (بدون تصفير)', 'Continuous (no reset)', 'Continu (sans réinitialisation)'],
    ['يُصفَّر العدّاد تلقائياً في بداية كل يوم.', 'The counter resets automatically at the start of each day.', 'Le compteur se réinitialise automatiquement au début de chaque jour.'],
    ['يُصفَّر العدّاد تلقائياً في بداية كل أسبوع (الأحد).', 'The counter resets automatically at the start of each week (Sunday).', 'Le compteur se réinitialise automatiquement au début de chaque semaine (dimanche).'],
    ['يُصفَّر العدّاد تلقائياً في أول كل شهر ميلادي.', 'The counter resets automatically on the 1st of each Gregorian month.', 'Le compteur se réinitialise automatiquement le 1er de chaque mois grégorien.'],
    ['لا يُصفَّر العدّاد تلقائياً، ويستمر في العد دون توقف.', 'The counter never resets and keeps counting.', 'Le compteur ne se réinitialise jamais et continue de compter.'],
    ['مستمر بدون تصفير تلقائي', 'Continuous, no auto-reset', 'Continu, sans réinitialisation automatique'],
    ['يُصفَّر تلقائياً كل يوم', 'Resets automatically every day', 'Réinitialisation automatique chaque jour'],
    ['وِرد التسبيح اليومي', 'Daily tasbih goal', 'Objectif de tasbih quotidien'],
    ['هِدف شريط التقدّم في بطاقة ذكر الساعة', 'Goal for the progress bar in the hourly dhikr card', 'Objectif de la barre de progression de la carte dhikr de l’heure'],
    ['33 تسبيحة', '33 repetitions', '33 répétitions'],
    ['عدّاد التسبيح', 'Tasbih counter', 'Compteur de tasbih'],
    ['عدّاد الفترة (يومي / أسبوعي / شهري / مستمر)', 'Period counter (daily / weekly / monthly / continuous)', 'Compteur de période (quotidien / hebdomadaire / mensuel / continu)'],

    // ----- الأذان والتنبيهات -----
    ['إشعارات المتصفح', 'Browser notifications', 'Notifications du navigateur'],
    ['تنبيه قبل الصلاة بـ 5 دقائق حتى لو كان التبويب غير نشط', 'Alert 5 minutes before prayer even if the tab is inactive', 'Alerte 5 minutes avant la prière même si l’onglet est inactif'],
    ['تم تفعيل إشعارات الصلاة', 'Prayer notifications enabled', 'Notifications de prière activées'],
    ['أُوقفت إشعارات الصلاة.', 'Prayer notifications turned off.', 'Notifications de prière désactivées.'],
    ['الإشعارات موقوفة.', 'Notifications are off.', 'Notifications désactivées.'],
    ['الإشعارات مفعّلة: تنبيه قبل كل صلاة بـ 5 دقائق.', 'Notifications on: alert 5 minutes before every prayer.', 'Notifications activées : alerte 5 minutes avant chaque prière.'],
    ['التنبيهات مغلقة.', 'Alerts are off.', 'Alertes désactivées.'],
    ['سنُنبّهك قبل كل صلاة بـ 5 دقائق بإذن الله.', 'We’ll alert you 5 minutes before every prayer, God willing.', 'Nous vous alerterons 5 minutes avant chaque prière, si Dieu le veut.'],
    ['سنُنبّهك قبل كل صلاة بـ 5 دقائق (الشروق مسنثنى).', 'We’ll alert you 5 minutes before every prayer (sunrise excluded).', 'Nous vous alerterons 5 minutes avant chaque prière (lever du soleil exclu).'],
    ['لم تُمنح صلاحية الإشعارات — المستخدم رفض الطلب.', 'Notification permission not granted — the request was declined.', 'Autorisation de notification refusée — la demande a été rejetée.'],
    ['المتصفح لا يدعم إشعارات النظام (استخدم تنبيه ربع الساعة بالبدل).', 'This browser does not support system notifications (use the quarter-hour alert instead).', 'Ce navigateur ne prend pas en charge les notifications système (utilisez plutôt l’alerte du quart d’heure).'],
    ['الحُجب من إعدادات الموقع في المتصفح — فعّله من أيقونة القفل في شريط العنوان.', 'Blocked in the browser’s site settings — enable it from the lock icon in the address bar.', 'Bloqué dans les paramètres du site du navigateur — activez-le via l’icône de cadenas dans la barre d’adresse.'],
    ['تنبيه ربع الساعة قبْل الأذان وبعدْه', 'Quarter-hour alert before and after adhan', 'Alerte du quart d’heure avant et après l’adhan'],
    ['تنبيهٌ هادئ قبل دخول كل صلاة بربع ساعة، وتنبيهٌ بعد مضيّ ربع ساعة من الأذان، مع اختيار نغمة أو ملف مخصّص (عدا الشروق).', 'A gentle alert 15 minutes before each prayer and another 15 minutes after the adhan, with a choice of tone or a custom file (except sunrise).', 'Une alerte discrète 15 minutes avant chaque prière et une autre 15 minutes après l’adhan, avec choix de sonnerie ou fichier personnalisé (sauf lever du soleil).'],
    ['قبل الأذان', 'Before adhan', 'Avant l’adhan'],
    ['بعد الأذان', 'After adhan', 'Après l’adhan'],
    ['قبل الأذان بربع ساعة', '15 minutes before adhan', '15 minutes avant l’adhan'],
    ['بعد الأذان بربع ساعة', '15 minutes after adhan', '15 minutes après l’adhan'],
    ['نغمة التنبيه', 'Alert tone', 'Sonnerie d’alerte'],
    ['مستوى صوت التنبيه', 'Alert volume', 'Volume de l’alerte'],
    ['نغمة 1 (هادئة)', 'Tone 1 (calm)', 'Sonnerie 1 (calme)'],
    ['نغمة 2 (تنبيه)', 'Tone 2 (alert)', 'Sonnerie 2 (alerte)'],
    ['نغمة 3 (أجراس)', 'Tone 3 (bells)', 'Sonnerie 3 (cloches)'],
    ['نغمة تنبيه الساعة', 'Hourly tone', 'Sonnerie horaire'],
    ['ملف مخصّص', 'Custom file', 'Fichier personnalisé'],
    ['نغمة مولّدة', 'Generated tone', 'Sonnerie générée'],
    ['تنبيه كل ساعة', 'Hourly chime', 'Carillon horaire'],
    ['نبرة كل ساعة', 'Hourly chime', 'Carillon horaire'],
    ['نبرة تقويم بسيطة عند تمام الساعة — متوقف افتراضياً', 'A simple chime on the hour — off by default', 'Un carillon simple à l’heure pile — désactivé par défaut'],
    ['نبرة الساعة محجوبة من المتصفح — اضغط «تجربة» لتفعيل الصوت.', 'The hourly chime is blocked by the browser — press “Test” to enable sound.', 'Le carillon horaire est bloqué par le navigateur — appuyez sur « Tester » pour activer le son.'],
    ['وقت التنبيه حان لكن الصوت محجوب، اضغط «تجربة» لتفعيل الصوت.', 'It’s alert time but sound is blocked — press “Test” to enable sound.', 'C’est l’heure de l’alerte mais le son est bloqué — appuyez sur « Tester » pour l’activer.'],
    ['نوع صوت الأذان', 'Adhan sound type', 'Type de son de l’adhan'],
    ['مقاطع مختصرة (4 جاهزة)', 'Short clips (4 ready)', 'Courts extraits (4 prêts)'],
    ['مقاطع الأذان المختصرة', 'Short adhan clips', 'Courts extraits d’adhan'],
    ['أذان كامل (TVQuran)', 'Full adhan (TVQuran)', 'Adhan complet (TVQuran)'],
    ['الأذان الكامل من TVQuran (يُختار قارئ عشوائياً من القائمة تلقائياً).', 'Full adhan from TVQuran (a random muezzin is picked from the list automatically).', 'Adhan complet de TVQuran (un muezzin est choisi au hasard dans la liste).'],
    ['المصادر الجاهزة: تُشغَّل مقاطعةُ أذانٍ مختصرة (أحد 4 مقاطع) تلقائياً عند كل أذان.', 'Ready sources: a short adhan clip (one of 4) plays automatically at each adhan.', 'Sources prêtes : un court extrait d’adhan (parmi 4) est joué automatiquement à chaque adhan.'],
    ['تشغيل التكبير عند الأذان', 'Play takbir at adhan', 'Jouer le takbir à l’adhan'],
    ['صوت التكبير عند الأذان', 'Takbir sound at adhan', 'Son du takbir à l’adhan'],
    ['مستوى صوت التكبير', 'Takbir volume', 'Volume du takbir'],
    ['مستوى الصوت', 'Volume', 'Volume'],
    ['اختيار ملف', 'Choose file', 'Choisir un fichier'],
    ['لم يتم اختيار ملف صوتي بعد.', 'No audio file chosen yet.', 'Aucun fichier audio choisi pour l’instant.'],
    ['يُشغَّل الصوت المختار تلقائياً عند دخول وقت كل صلاة (عدا الشروق). اختر ملفاً صوتياً قصيراً للتكبير من جهازك، ويُحفظ داخل المتصفح دون رفعه لأي موقع.', 'The chosen sound plays automatically at each prayer time (except sunrise). Pick a short takbir audio file from your device; it is stored inside the browser and never uploaded to any site.', 'Le son choisi est joué automatiquement à chaque heure de prière (sauf lever du soleil). Choisissez un court fichier audio de takbir sur votre appareil ; il est conservé dans le navigateur et n’est envoyé à aucun site.'],
    ['في وضع «ملف مخصّص»: الحد الأقصى 3 ميجابايت ويُحفظ داخل المتصفح. في وضعَي «مختصرة» و«كامل» يُشغَّل الصوت تلقائياً من الإنترنت دون ملف. قد يمنع المتصفح التشغيل التلقائي قبل أي تفاعل مع الصفحة، فاضغط «تجربة» مرة واحدة لتفعيله، ويُشترط بقاء تبويب مفتوحاً وقت الأذان.', 'In “Custom file” mode: max 3 MB, stored inside the browser. In “Short” and “Full” modes the sound streams automatically from the internet, no file needed. The browser may block autoplay before any interaction, so press “Test” once to enable it; a tab must remain open at adhan time.', 'En mode « Fichier personnalisé » : 3 Mo maximum, conservé dans le navigateur. En modes « Court » et « Complet », le son est diffusé automatiquement depuis Internet, sans fichier. Le navigateur peut bloquer la lecture automatique avant toute interaction : appuyez une fois sur « Tester » ; un onglet doit rester ouvert à l’heure de l’adhan.'],
    [' — اضغط «تجربة» مرة واحدة لتفعيل الصوت.', ' — press “Test” once to enable sound.', ' — appuyez une fois sur « Tester » pour activer le son.'],
    [' — منع المتصفح التشغيل التلقائي، اضغط «تجربة» مرة واحدة لتفعيله.', ' — the browser blocked autoplay, press “Test” once to enable it.', ' — le navigateur a bloqué la lecture automatique, appuyez une fois sur « Tester » pour l’activer.'],
    ['اضغط «تجربة» مرة واحدة لتفعيل الصوت.', 'Press “Test” once to enable sound.', 'Appuyez une fois sur « Tester » pour activer le son.'],
    ['منع المتصفح التشغيل التلقائي، اضغط «تجربة» مرة واحدة لتفعيله.', 'The browser blocked autoplay, press “Test” once to enable it.', 'Le navigateur a bloqué la lecture automatique, appuyez une fois sur « Tester » pour l’activer.'],
    ['منع المتصفح التشغيل الأول، انقر زر التلاوة مرة أخرى.', 'The browser blocked the first playback, click the recitation button again.', 'Le navigateur a bloqué la première lecture, cliquez à nouveau sur le bouton de récitation.'],
    ['تعذّر التشغيل؛ اضغط «تجربة» مرة أخرى أو تحقق من الملف/الاتصال.', 'Playback failed; press “Test” again or check the file/connection.', 'Échec de la lecture ; appuyez à nouveau sur « Tester » ou vérifiez le fichier/la connexion.'],
    ['تعذّر التشغيل؛ تأكد من الاتصال بالإنترنت أو من صحة الملف.', 'Playback failed; check your internet connection or the file.', 'Échec de la lecture ; vérifiez votre connexion Internet ou le fichier.'],
    ['تعذّر التعرّف على رقم السورة والآية.', 'Could not identify the surah and verse number.', 'Impossible d’identifier le numéro de la sourate et du verset.'],
    ['تعذّر تحميل تلاوة الآية، تأكد من الاتصال بالإنترنت.', 'Could not load the verse recitation, check your internet connection.', 'Impossible de charger la récitation du verset, vérifiez votre connexion Internet.'],
    ['تمّت قراءة الآية كاملة.', 'The full verse has been recited.', 'Le verset a été récité en entier.'],
    ['تعذّر حفظ الملف داخل المتصفح.', 'Could not save the file inside the browser.', 'Impossible d’enregistrer le fichier dans le navigateur.'],
    ['حجم الملف أكبر من 3 ميجابايت، اختر مقطعاً أقصر.', 'The file is larger than 3 MB, choose a shorter clip.', 'Le fichier dépasse 3 Mo, choisissez un extrait plus court.'],
    ['الملف المختار ليس ملفاً صوتياً.', 'The chosen file is not an audio file.', 'Le fichier choisi n’est pas un fichier audio.'],
    ['الملف غير صالح، اختر ملفاً تم حفظه من هذه اللوحة.', 'Invalid file, choose a file saved from this dashboard.', 'Fichier invalide, choisissez un fichier enregistré depuis ce tableau de bord.'],
    ['وضع «ملف مخصّص»: اختر ملفاً أولاً ثم جرّبه.', 'In “Custom file” mode: choose a file first, then test it.', 'En mode « Fichier personnalisé » : choisissez d’abord un fichier, puis testez-le.'],
    ['وضع «ملف مخصّص»: لم يتم اختيار ملف بعد — اختر ملفاً أو انتقل لنوع «مختصرة/كامل».', 'In “Custom file” mode: no file chosen yet — choose a file or switch to “Short/Full”.', 'En mode « Fichier personnalisé » : aucun fichier choisi — choisissez un fichier ou passez à « Court/Complet ».'],

    // ----- الشاشة والتأثيرات -----
    ['حجم الخط', 'Font size', 'Taille de police'],
    ['حجم البطاقة', 'Card size', 'Taille de la carte'],
    ['حجم خط', 'Font size', 'Taille de police'],
    ['حجم بطاقة', 'Card size', 'Taille de la carte'],

    // ----- مؤقت التركيز (الجديد) -----
    ['تركيز', 'Focus', 'Concentration'],
    ['استراحة', 'Break', 'Pause'],
    ['استراحة قصيرة', 'Short break', 'Pause courte'],
    ['استراحة طويلة', 'Long break', 'Pause longue'],
    ['مؤقت التركيز', 'Focus timer', 'Minuteur de concentration'],
    ['مؤقت التركيز (بومودورو)', 'Focus timer (Pomodoro)', 'Minuteur de concentration (Pomodoro)'],
    ['ابدأ', 'Start', 'Démarrer'],
    ['إيقاف مؤقت', 'Pause', 'Pause'],
    ['استئناف', 'Resume', 'Reprendre'],
    ['إعادة', 'Reset', 'Réinitialiser'],
    ['تخطّي', 'Skip', 'Passer'],
    ['توسيع المؤقت', 'Expand timer', 'Agrandir le minuteur'],
    ['إغلاق المؤقت', 'Close timer', 'Fermer le minuteur'],
    ['مدة التركيز (دقيقة)', 'Focus length (min)', 'Durée de concentration (min)'],
    ['الاستراحة القصيرة (دقيقة)', 'Short break (min)', 'Pause courte (min)'],
    ['الاستراحة الطويلة (دقيقة)', 'Long break (min)', 'Pause longue (min)'],
    ['جلسات قبل الاستراحة الطويلة', 'Sessions before long break', 'Sessions avant la pause longue'],
    ['بدء الجلسة التالية تلقائياً', 'Auto-start next session', 'Démarrer automatiquement la session suivante'],
    ['صوت عند انتهاء الجلسة', 'Sound when a session ends', 'Son à la fin d’une session'],
    ['إظهار الوقت في عنوان التبويب', 'Show time in the tab title', 'Afficher l’heure dans le titre de l’onglet'],
    ['جلسات اليوم', 'Sessions today', 'Sessions aujourd’hui'],
    ['الجلسة', 'Session', 'Session'],
    ['زيادة دقيقة', 'Add a minute', 'Ajouter une minute'],
    ['إنقاص دقيقة', 'Remove a minute', 'Retirer une minute'],
    ['إعدادات المؤقت', 'Timer settings', 'Réglages du minuteur'],
    ['وضع التركيز الكامل', 'Full focus mode', 'Mode concentration totale'],
    ['اختصارات: مسافة = بدء/إيقاف • R = إعادة • S = تخطّي • F = ملء الشاشة • Esc = إغلاق', 'Shortcuts: Space = start/pause • R = reset • S = skip • F = fullscreen • Esc = close', 'Raccourcis : Espace = démarrer/pause • R = réinitialiser • S = passer • F = plein écran • Échap = fermer'],
    ['انتهت جلسة التركيز — استرح الآن.', 'Focus session finished — take a break now.', 'Session de concentration terminée — faites une pause.'],
    ['انتهت الاستراحة — هيا نعود لجلسة تركيز جديدة!', 'Break over — let’s start a new focus session!', 'Pause terminée — reprenons une nouvelle session !'],
    ['مؤقت التركيز الكامل', 'Full focus timer', 'Minuteur de concentration totale'],
    ['وقت التركيز', 'Focus time', 'Temps de concentration'],
    ['إجمالي دقائق اليوم', 'Total minutes today', 'Total de minutes aujourd’hui'],
    ['أذكار الصباح والمساء والاستغفار', 'Morning & evening adhkar and istighfar', 'Adhkar du matin et du soir et istighfar'],
    ['صلاة الوتر وركعتي الضحى', 'Witr prayer and the two Duha rak‘ahs', 'Prière du Witr et les deux rak‘at de Duha'],
    ['الحجم والخط يتبعان بطاقة الساعة الرقمية.', 'Size and font follow the digital clock card.', 'La taille et la police suivent la carte de l’horloge numérique.'],
    // ----- الصلاة المتقدمة والمدن (v1.4) -----
    ['الصلاة', 'Prayer', 'Prière'],
    ['إعدادات الصلاة المتقدمة', 'Advanced prayer settings', 'Paramètres de prière avancés'],
    ['المدينة الحالية:', 'Current city:', 'Ville actuelle :'],
    ['طريقة الحساب الفعّالة:', 'Effective calculation method:', 'Méthode de calcul effective :'],
    ['طريقة الحساب', 'Calculation method', 'Méthode de calcul'],
    ['تلقائي حسب المدينة', 'Automatic by city', 'Automatique selon la ville'],
    ['أم القرى (مكة المكرمة)', 'Umm al-Qura (Makkah)', 'Umm al-Qura (La Mecque)'],
    ['رابطة العالم الإسلامي', 'Muslim World League', 'Ligue islamique mondiale'],
    ['الهيئة المصرية العامة للمساحة', 'Egyptian General Authority of Survey', 'Autorité générale égyptienne d’arpentage'],
    ['جامعة العلوم الإسلامية – كراتشي', 'University of Islamic Sciences, Karachi', 'Université des sciences islamiques de Karachi'],
    ['أمريكا الشمالية (ISNA)', 'North America (ISNA)', 'Amérique du Nord (ISNA)'],
    ['الكويت', 'Kuwait', 'Koweït'],
    ['قطر', 'Qatar', 'Qatar'],
    ['الإمارات', 'UAE', 'Émirats'],
    ['رئاسة الشؤون الدينية (تركيا)', 'Diyanet (Turkey)', 'Diyanet (Turquie)'],
    ['سنغافورة وماليزيا', 'Singapore & Malaysia', 'Singapour et Malaisie'],
    ['مخصص (زوايا يدوية)', 'Custom (manual angles)', 'Personnalisée (angles manuels)'],
    ['زاوية الفجر (درجة)', 'Fajr angle (degrees)', 'Angle du Fajr (degrés)'],
    ['زاوية العشاء (درجة)', 'Isha angle (degrees)', 'Angle de l’Isha (degrés)'],
    ['العشاء بعد المغرب (دقيقة، 0 = الزاوية)', 'Isha after Maghrib (min, 0 = angle)', 'Isha après Maghrib (min, 0 = angle)'],
    ['حساب العصر', 'Asr calculation', 'Calcul de l’Asr'],
    ['قياسي (ظل المثل — الجمهور)', 'Standard (shadow = object — majority)', 'Standard (ombre = objet — majorité)'],
    ['حنفي (ظل المثلين)', 'Hanafi (shadow = 2× object)', 'Hanafite (ombre = 2× l’objet)'],
    ['قاعدة خطوط العرض العالية', 'High-latitude rule', 'Règle des hautes latitudes'],
    ['تلقائي (عند الحاجة فقط)', 'Automatic (only when needed)', 'Automatique (si nécessaire)'],
    ['بدون', 'None', 'Aucune'],
    ['منتصف الليل', 'Middle of the night', 'Milieu de la nuit'],
    ['سُبع الليل', 'One-seventh of the night', 'Septième de la nuit'],
    ['نسبة الزاوية', 'Angle-based', 'Selon l’angle'],
    ['تعديل يدوي بالدقائق', 'Manual adjustment (minutes)', 'Ajustement manuel (minutes)'],
    ['للتقديم (+) أو التأخير (−) ليوافق التقويم المحلي، من −30 إلى +30 دقيقة.', 'Advance (+) or delay (−) to match your local calendar, from −30 to +30 minutes.', 'Avancer (+) ou retarder (−) pour suivre votre calendrier local, de −30 à +30 minutes.'],
    ['أوقات اليوم بعد التعديل', 'Today’s times after adjustment', 'Horaires du jour après ajustement'],
    ['إعادة إعدادات الصلاة الافتراضية', 'Restore default prayer settings', 'Rétablir les paramètres de prière par défaut'],
    ['أي تغيير يعيد حساب أوقات الصلوات والعدّ التنازلي فوراً، ولا يُشغَّل الأذان بسببه.', 'Any change recalculates prayer times and the countdown immediately, and does not trigger the adhan.', 'Toute modification recalcule immédiatement les horaires et le compte à rebours, sans déclencher l’adhan.'],
    ['الأحساء (الهفوف)', 'Al-Ahsa (Hofuf)', 'Al-Ahsa (Hofuf)'],
    ['دبي', 'Dubai', 'Dubaï'],
    ['أبوظبي', 'Abu Dhabi', 'Abou Dhabi'],
    ['المنامة', 'Manama', 'Manama'],
    ['مملكة البحرين', 'Kingdom of Bahrain', 'Royaume de Bahreïn'],
    ['تعتيم بقية اللوحة أثناء التركيز', 'Dim the rest of the board while focusing', 'Estomper le reste du tableau pendant la concentration'],
    ['تُعتَّم بقية اللوحة تلقائياً عند بدء المؤقت وتعود عند إيقافه. يمكنك أيضاً الضغط على حلقة المؤقت لتبديل التعتيم، أو Esc للإلغاء. عند إيقاف الخيار تفتح الحلقة لوحة التركيز الكاملة.', 'The rest of the board dims automatically when the timer starts and returns when it stops. You can also press the timer ring to toggle dimming, or Esc to cancel. With the option off, the ring opens the full focus panel.', 'Le reste du tableau s’estompe automatiquement au démarrage du minuteur et revient à l’arrêt. Vous pouvez aussi appuyer sur l’anneau pour basculer l’estompage, ou sur Échap pour annuler. Option désactivée : l’anneau ouvre le panneau complet.'],
    ['بداية رمضان / التاريخ الهجري', 'Ramadan start / Hijri date', 'Début du Ramadan / date hégirienne'],
    ['تقديم أو تأخير التاريخ الهجري بمقدار يوم ليوافق إعلان رؤية الهلال. يُطبَّق على التاريخ الهجري وعدّاد رمضان وعشاء رمضان.', 'Shift the Hijri date by one day to match the moon-sighting announcement. Applies to the Hijri date, the Ramadan countdown and Ramadan Isha.', 'Décalez la date hégirienne d’un jour selon l’annonce de l’observation de la lune. S’applique à la date hégirienne, au compte à rebours du Ramadan et à l’Isha du Ramadan.'],
    ['رمضان أبكر بيوم', 'Ramadan 1 day earlier', 'Ramadan 1 jour plus tôt'],
    ['حسب أم القرى', 'Per Umm al-Qura', 'Selon Umm al-Qura'],
    ['رمضان أبعد بيوم', 'Ramadan 1 day later', 'Ramadan 1 jour plus tard'],
    ['يوم الجمعة', 'Friday', 'Vendredi'],
    ['إظهار تشغيل سورة الكهف يوم الجمعة', 'Show Surat Al-Kahf playback on Fridays', 'Afficher la lecture de la sourate Al-Kahf le vendredi'],
    ['إظهار الزر في كل الأيام (للتجربة)', 'Show the button every day (for testing)', 'Afficher le bouton tous les jours (pour tester)'],
    ['إعدادات المسبحة', 'Tasbih settings', 'Paramètres du chapelet'],
    ['تنبيه عند الوصول لرقم', 'Alert when a number is reached', 'Alerte à l’atteinte d’un nombre'],
    ['تفعيل التنبيه عند الوصول للرقم', 'Alert when the number is reached', 'Activer l’alerte à l’atteinte du nombre'],
    ['الرقم المطلوب', 'Target number', 'Nombre cible'],
    ['العدّاد المراقَب', 'Monitored counter', 'Compteur surveillé'],
    ['عدّاد الفترة (وِرد اليوم)', 'Period counter (daily goal)', 'Compteur de période (objectif du jour)'],
    ['عدّاد الذكر الحالي', 'Current dhikr counter', 'Compteur du dhikr actuel'],
    ['كرّر التنبيه عند كل مضاعف للرقم', 'Repeat the alert at every multiple of the number', 'Répéter l’alerte à chaque multiple du nombre'],
    ['مع صوت تنبيه', 'With alert sound', 'Avec son d’alerte'],
    ['سورة الكهف — يوم الجمعة', 'Surat Al-Kahf — Friday', 'Sourate Al-Kahf — vendredi'],
    ['يُستحب قراءة سورة الكهف يوم الجمعة. اختر القارئ لتبدأ التلاوة، وتستمر حتى لو أغلقت هذه النافذة.', 'Reciting Surat Al-Kahf on Friday is recommended. Pick a reciter to start; playback continues even if you close this window.', 'Il est recommandé de réciter la sourate Al-Kahf le vendredi. Choisissez un récitateur ; la lecture continue même si vous fermez cette fenêtre.'],
    ['اختر قارئاً', 'Choose a reciter', 'Choisissez un récitateur'],
    ['تشغيل', 'Play', 'Lecture'],
    ['موضع التلاوة', 'Playback position', 'Position de lecture'],
    ['تمّت تلاوة سورة الكهف. تقبّل الله منك.', 'Surat Al-Kahf has finished. May Allah accept it from you.', 'La sourate Al-Kahf est terminée. Qu’Allah l’accepte de vous.'],
    ['تعذّر تحميل هذا القارئ، جرّب قارئاً آخر أو تحقق من الاتصال.', 'Could not load this reciter — try another one or check your connection.', 'Impossible de charger ce récitateur — essayez-en un autre ou vérifiez la connexion.'],
    ['تعذّر التشغيل التلقائي، اضغط زر التشغيل.', 'Autoplay failed — press the play button.', 'Lecture automatique impossible — appuyez sur le bouton de lecture.'],
    ['تعذّر التشغيل، تحقق من الاتصال.', 'Playback failed — check your connection.', 'Échec de la lecture — vérifiez la connexion.'],
    ['تم إيقاف التلاوة مؤقتاً لتشغيل صوت آخر.', 'Recitation paused to play another sound.', 'Récitation mise en pause pour jouer un autre son.'],
    ['يوم الجمعة — يُستحب قراءة سورة الكهف. اضغط «سورة الكهف» للاستماع.', 'It’s Friday — reciting Surat Al-Kahf is recommended. Press “Surat Al-Kahf” to listen.', 'C’est vendredi — la récitation de la sourate Al-Kahf est recommandée. Appuyez sur « Sourate Al-Kahf » pour écouter.'],
    ['مشاري العفاسي', 'Mishary Alafasy', 'Mishary Alafasy'],
    ['عبد الرحمن السديس', 'Abdurrahman As-Sudais', 'Abdurrahman As-Sudais'],
    ['سعود الشريم', 'Saud Ash-Shuraim', 'Saoud Ash-Shuraim'],
    ['سعد الغامدي', 'Saad Al-Ghamdi', 'Saad Al-Ghamdi'],
    ['ماهر المعيقلي', 'Maher Al-Muaiqly', 'Maher Al-Muaiqly'],
    ['ياسر الدوسري', 'Yasser Ad-Dosari', 'Yasser Ad-Dosari'],
    ['ناصر القطامي', 'Nasser Al-Qatami', 'Nasser Al-Qatami'],
    ['علي الحذيفي', 'Ali Al-Hudhaify', 'Ali Al-Hudhaify'],
    ['أحمد العجمي', 'Ahmed Al-Ajmi', 'Ahmed Al-Ajmi'],
    ['محمود خليل الحصري', 'Mahmoud Khalil Al-Husary', 'Mahmoud Khalil Al-Husary'],
    ['إعادة تعيين', 'Reset', 'Réinitialiser'],
    ['ما شاء الله — أتممتَ وردك اليوم', 'MashaAllah — you completed today’s goal', 'MashaAllah — vous avez atteint votre objectif du jour'],
    ['تعتيم بقية اللوحة عند الضغط على مؤقت التركيز', 'Dim the rest of the board when the focus timer is pressed', 'Estomper le reste du tableau quand on appuie sur le minuteur'],
    ['اضغط على حلقة المؤقت لتعتيم بقية اللوحة وإبراز التركيز، واضغط عليها مجدداً (أو Esc) للإلغاء. عند إيقاف الخيار تفتح الحلقة لوحة التركيز الكاملة.', 'Press the timer ring to dim the rest of the board and highlight your focus; press it again (or Esc) to undo. With the option off, the ring opens the full focus panel.', 'Appuyez sur l’anneau du minuteur pour estomper le reste du tableau ; appuyez à nouveau (ou Échap) pour annuler. Option désactivée : l’anneau ouvre le panneau de concentration complet.'],
    ['اضغط لتعتيم بقية اللوحة', 'Press to dim the rest of the board', 'Appuyez pour estomper le reste du tableau'],
    ['اضغط لإلغاء التعتيم', 'Press to remove the dimming', 'Appuyez pour retirer l’estompage'],
    ['يأخذ المساحة المتبقية تلقائياً', 'Takes the remaining space automatically', 'Occupe automatiquement l’espace restant'],
    ['جارٍ...', 'Working...', 'En cours...'],
    ['الانشراح', 'Al-Inshirah', 'Al-Inshirah'],
    ['(داخل الساعة)', '(inside the clock)', '(dans l’horloge)'],
    ['إعدادات بداية رمضان', 'Ramadan start adjustment', 'Ajustement du début du Ramadan'],
    ['تعديل بداية شهر رمضان والعدّ التنازلي بالأيام', 'Adjust the start of Ramadan and the countdown in days', 'Ajuster le début du Ramadan et le compte à rebours en jours'],
    ['مطابق لتقويم أم القرى (0).', 'Matches Umm al-Qura calendar (0).', 'Conforme au calendrier Umm al-Qura (0).'],
    ['تأخير بداية رمضان يوماً واحداً (+1).', 'Delay Ramadan start by 1 day (+1).', 'Retarder le début du Ramadan d’un jour (+1).'],
    ['تقديم بداية رمضان يوماً واحداً (-1).', 'Advance Ramadan start by 1 day (-1).', 'Avancer le début du Ramadan d’un jour (-1).'],
    ['إعدادات المسبحة', 'Tasbih settings', 'Paramètres du chapelet'],
    ['وِرد التسبيح اليومي (الهدف)', 'Daily tasbih goal (target)', 'Objectif de tasbih quotidien (cible)'],
    ['هدف شريط التقدّم في بطاقة المسبحة', 'Progress bar target in the tasbih card', 'Objectif de la barre de progression de la carte de tasbih'],
    ['هل تريد إصدار تنبيه عند الوصول للرقم؟', 'Alert when reaching the target number?', 'Émettre une alerte en atteignant le nombre cible ?'],
    ['إصدار تنبيه صوتي وإشعار عند بلوغ الرقم المستهدف', 'Play a sound alert and notification when reaching the target number', 'Jouer un son et une notification lorsque le nombre cible est atteint'],
    ['الصلاة على النبي ﷺ', 'Salawat upon the Prophet ﷺ', 'Salutations sur le Prophète ﷺ'],
    ['تشغيل التنبيه المختار (كالصلاة على النبي ﷺ) عند تمام كل ساعة', 'Play the chosen alert (such as Salawat upon the Prophet ﷺ) on every hour', 'Jouer l’alerte choisie (comme la prière sur le Prophète ﷺ) à chaque heure'],
    ['عند كل ساعة', 'Every hour', 'Chaque heure'],
    ['نبرة تقويم خفيفة', 'Light hourly chime', 'Carillon léger'],
    ['سورة الكهف', 'Surah Al-Kahf', 'Sourate Al-Kahf'],
    ['سورة الكهف • يوم الجمعة', 'Surah Al-Kahf • Friday', 'Sourate Al-Kahf • Vendredi'],
    ['نورٌ ما بين الجمعتين — 10 مشائخ', 'Light between the two Fridays — 10 reciters', 'Lumière entre les deux vendredis — 10 récitateurs'],
    ['اختر قارئ سورة الكهف', 'Choose Surah Al-Kahf reciter', 'Choisir le récitateur de Sourate Al-Kahf'],
    ['تشغيل', 'Play', 'Lire'],
    ['إيقاف', 'Stop', 'Arrêter'],
    ['الشيخ ماهر المعيقلي', 'Sheikh Maher Al-Muaiqly', 'Cheikh Maher Al-Muaiqly'],
    ['الشيخ مشاري راشد العفاسي', 'Sheikh Mishary Rashid Alafasy', 'Cheikh Mishary Rashid Alafasy'],
    ['الشيخ عبدالرحمن السديس', 'Sheikh Abdulrahman Al-Sudais', 'Cheikh Abdulrahman Al-Sudais'],
    ['الشيخ عبدالباسط عبدالصمد', 'Sheikh Abdulbasit Abdulsamad', 'Cheikh Abdulbasit Abdulsamad'],
    ['الشيخ محمد صديق المنشاوي', 'Sheikh Mohamed Siddiq Al-Minshawi', 'Cheikh Mohamed Siddiq Al-Minshawi'],
    ['الشيخ سعد الغامدي', 'Sheikh Saad Al-Ghamdi', 'Cheikh Saad Al-Ghamdi'],
    ['الشيخ ناصر القطامي', 'Sheikh Nasser Al-Qatami', 'Cheikh Nasser Al-Qatami'],
    ['الشيخ أبو بكر الشاطري', 'Sheikh Abu Bakr Al-Shatri', 'Cheikh Abu Bakr Al-Shatri'],
    ['الشيخ إدريس أبكر', 'Sheikh Idris Abkar', 'Cheikh Idris Abkar'],
    ['الشيخ فارس عباد', 'Sheikh Fares Abbad', 'Cheikh Fares Abbad'],
    ['تقبّل الله — اكتملت تلاوة سورة الكهف.', 'May Allah accept — Surah Al-Kahf recitation completed.', 'Qu’Allah accepte — récitation de Sourate Al-Kahf terminée.'],
    ['تعذّر تحميل تلاوة سورة الكهف، تأكد من الاتصال بالإنترنت.', 'Could not load Surah Al-Kahf recitation, check your internet connection.', 'Impossible de charger la récitation de Sourate Al-Kahf, vérifiez votre connexion Internet.'],
    ['منع المتصفح التشغيل التلقائي، اضغط زر تشغيل سورة الكهف مرة أخرى.', 'The browser blocked autoplay, click the Surah Al-Kahf play button again.', 'Le navigateur a bloqué la lecture automatique, cliquez à nouveau sur le bouton de lecture.'],
    ['الاختصارات', 'Shortcuts', 'Raccourcis'],
    ['تلميحات اختصارات لوحة المفاتيح', 'Keyboard shortcut hints', 'Astuces des raccourcis clavier'],
    ['تلميحات اختصارات لوحة المفاتيح (اختصار: ?)', 'Keyboard shortcut hints (shortcut: ?)', 'Astuces des raccourcis clavier (raccourci : ?)'],
    ['إظهار تلميحات الاختصارات', 'Show shortcut hints', 'Afficher les astuces de raccourcis'],
    ['عرض شارات مفاتيح الاختصار السريعة على الأزرار', 'Show quick keyboard shortcut badges on buttons', 'Afficher les badges de raccourcis clavier sur les boutons'],
    ['عرض قائمة اختصارات لوحة المفاتيح', 'Show keyboard shortcuts list', 'Afficher la liste des raccourcis clavier'],
    ['استخدم هذه الاختصارات للتحكم السريع باللوحة في أي وقت (أثناء عدم الكتابة في حقول الإدخال):', 'Use these shortcuts to control the dashboard quickly at any time (when not typing in input fields):', 'Utilisez ces raccourcis pour contrôler rapidement le tableau de bord à tout moment (hors champs de saisie) :'],
    ['تسبيح فوري (+1)', 'Instant tasbih (+1)', 'Tasbih instantané (+1)'],
    ['فتح / إغلاق قائمة المهام', 'Open / close task list', 'Ouvrir / fermer la liste de tâches'],
    ['فتح / إغلاق المفكرة السريعة', 'Open / close quick notepad', 'Ouvrir / fermer le bloc-notes rapide'],
    ['فتح / إغلاق الإعدادات', 'Open / close settings', 'Ouvrir / fermer les paramètres'],
    ['فتح / إغلاق المسبحة والأذكار', 'Open / close tasbih & adhkar', 'Ouvrir / fermer le chapelet et les adhkar'],
    ['فتح / إغلاق أدوات قوقل', 'Open / close Google tools', 'Ouvrir / fermer les outils Google'],
    ['تغيير المدينة والموقع', 'Change city & location', 'Changer de ville et de position'],
    ['تغيير الثيم والألوان', 'Change theme & colors', 'Changer le thème et les couleurs'],
    ['التركيز على شريط بحث قوقل', 'Focus Google search bar', 'Cibler la barre de recherche Google'],
    ['عرض آية وتدبّر جديد', 'Show another verse & reflection', 'Afficher un autre verset et méditation'],
    ['تشغيل / إيقاف تلاوة الآية', 'Play / stop verse recitation', 'Lire / arrêter la récitation du verset'],
    ['تشغيل / إيقاف سورة الكهف (يوم الجمعة)', 'Play / stop Surah Al-Kahf (Friday)', 'Lire / arrêter Sourate Al-Kahf (vendredi)'],
    ['وضع ملء الشاشة', 'Fullscreen mode', 'Mode plein écran'],
    ['فتح أدوات الذكاء الاصطناعي (1 إلى 9)', 'Open AI tools (1 to 9)', 'Ouvrir les outils d’IA (1 à 9)'],
    ['إغلاق النوافذ أو وضع التخصيص', 'Close popovers or customize mode', 'Fermer les fenêtres ou le mode personnalisation'],
    ['مسافة', 'Space', 'Espace'],
    ['اللهم صلِّ وسلِّم على نبينا محمد ﷺ', 'O Allah, send peace and blessings upon our Prophet Muhammad ﷺ', 'Ô Allah, accorde paix et bénédictions à notre Prophète Muhammad ﷺ'],
    ['تقليل عناصر الساعة التناظرية', 'Reduce analog clock elements', 'Réduire les éléments de l’horloge analogique'],
    ['عرض 12 علامة للساعات بدلاً من 60 لتخفيف استهلاك الموارد', 'Show 12 hour marks instead of 60 to reduce resource usage', 'Afficher 12 repères d’heures au lieu de 60 pour économiser les ressources']
  ];

  // ---------- أسماء السور (تُستخدم في «سورة X : n») ----------
  const SURAH = {
    'آل عمران': 'Ali ʿImran', 'إبراهيم': 'Ibrahim', 'الأعراف': 'Al-Aʿraf', 'الأنبياء': 'Al-Anbiya',
    'الأنعام': 'Al-Anʿam', 'الأنفال': 'Al-Anfal', 'الإسراء': 'Al-Isra', 'الإنسان': 'Al-Insan',
    'البقرة': 'Al-Baqarah', 'التحريم': 'At-Tahrim', 'التوبة': 'At-Tawbah', 'الحج': 'Al-Hajj',
    'الحجر': 'Al-Hijr', 'الحديد': 'Al-Hadid', 'الرحمن': 'Ar-Rahman', 'الرعد': 'Ar-Raʿd',
    'الزمر': 'Az-Zumar', 'الشرح': 'Ash-Sharh', 'الشعراء': 'Ash-Shuʿara', 'الضحى': 'Ad-Duha',
    'الطلاق': 'At-Talaq', 'الطور': 'At-Tur', 'العصر': 'Al-ʿAsr', 'العلق': 'Al-ʿAlaq',
    'العنكبوت': 'Al-ʿAnkabut', 'الفرقان': 'Al-Furqan', 'القصص': 'Al-Qasas', 'القلم': 'Al-Qalam',
    'الكهف': 'Al-Kahf', 'المعارج': 'Al-Maʿarij', 'النحل': 'An-Nahl', 'النساء': 'An-Nisa',
    'النمل': 'An-Naml', 'النور': 'An-Nur', 'سبأ': 'Saba', 'طه': 'Ta-Ha', 'غافر': 'Ghafir',
    'فصلت': 'Fussilat', 'محمد': 'Muhammad', 'مريم': 'Maryam', 'هود': 'Hud', 'يس': 'Ya-Sin',
    'يوسف': 'Yusuf', 'يونس': 'Yunus', 'الفاتحة': 'Al-Fatihah', 'المائدة': 'Al-Ma’idah',
    'الأحزاب': 'Al-Ahzab', 'الملك': 'Al-Mulk', 'الإخلاص': 'Al-Ikhlas', 'الفلق': 'Al-Falaq', 'الناس': 'An-Nas'
  };

  // ---------- قواعد النصوص الديناميكية: [regex, en, fr] مع {1} {2} ----------
  const R = [
    [/^سورة (.+?) : (.+)$/, 'Surah {s1} : {2}', 'Sourate {s1} : {2}'],
    [/^(\d+) يوماً$/, '{1} days', '{1} jours'],
    [/^رمضان مبارك! \(اليوم (\d+)\)$/, 'Ramadan Mubarak! (Day {1})', 'Ramadan Moubarak ! (Jour {1})'],
    [/^الرياح: (.+) كم\/س$/, 'Wind: {1} km/h', 'Vent : {1} km/h'],
    [/^الرطوبة: (.+)$/, 'Humidity: {1}', 'Humidité : {1}'],
    [/^الحرارة: (.+)$/, 'Temp: {1}', 'Temp. : {1}'],
    [/^الشروق: (.+) • الغروب: (.+)$/, 'Sunrise: {1} • Sunset: {2}', 'Lever : {1} • Coucher : {2}'],
    [/^(.+) • GPS مباشر$/, '{1} • Live GPS', '{1} • GPS en direct'],
    [/^إحداثيات: (.+)$/, 'Coordinates: {1}', 'Coordonnées : {1}'],
    [/^(\d{1,2}:\d{2}) م$/, '{1} PM', '{1} PM'],
    [/^(\d{1,2}:\d{2}) ص$/, '{1} AM', '{1} AM'],
    [/^اقترب وقت صلاة (.+) — بقيت ربع ساعة\.?$/, '{t1} prayer is near — 15 minutes left.', 'La prière de {t1} approche — 15 minutes restantes.'],
    [/^بقيت 5 دقائق لصلاة (.+)\.?$/, '5 minutes left until {t1} prayer.', 'Plus que 5 minutes avant la prière de {t1}.'],
    [/^حان الآن وقت صلاة (.+) \(لم يعمل صوت الأذان\)\.?$/, 'It is now time for {t1} prayer (the adhan sound did not play).', 'C’est l’heure de la prière de {t1} (le son de l’adhan n’a pas fonctionné).'],
    [/^مرّت ربع ساعة على أذان صلاة (.+)\.?$/, '15 minutes have passed since the {t1} adhan.', '15 minutes se sont écoulées depuis l’adhan de {t1}.'],
    [/^الأذان عند (.+) — استعد للصلاة\.?$/, 'Adhan at {1} — get ready for prayer.', 'Adhan à {1} — préparez-vous à prier.'],
    [/^مرّت الساعة — الآن (.+)\.?$/, 'An hour has passed — it is now {1}.', 'Une heure s’est écoulée — il est {1}.'],
    [/^تم إخفاء «(.+)»، استعدها من الإعدادات › العناصر\.?$/, '“{1}” hidden — restore it from Settings › Items.', '« {1} » masqué — restaurez-le dans Paramètres › Éléments.'],
    [/^تم اختيار (.+) بنجاح\. اكتب اسم مدينة آخر في أي وقت\.?$/, '{1} selected. Type another city name any time.', '{1} sélectionnée. Saisissez une autre ville à tout moment.'],
    [/^تم التحديد بنجاح: (.+)$/, 'Selected successfully: {1}', 'Sélection réussie : {1}'],
    [/^اختر المدينة المطابقة \((\d+) نتيجة\):$/, 'Pick the matching city ({1} results):', 'Choisissez la ville correspondante ({1} résultats) :'],
    [/^لم يتم العثور على مدينة باسم «(.+)»\. جرّب كتابة الاسم بطريقة أخرى\.?$/, 'No city found named “{1}”. Try spelling it differently.', 'Aucune ville nommée « {1} ». Essayez une autre orthographe.'],
    [/^تتجدد تلقائياً \((\d+) آية وتدبر\)$/, 'Refreshes automatically ({1} verses & reflections)', 'Se renouvelle automatiquement ({1} versets et méditations)'],
    [/^شكل الساعة: (.+) — انقر لتغييره$/, 'Clock style: {1} — click to change', 'Style d’horloge : {1} — cliquez pour changer'],
    [/^الملف المخصّص الحالي: (.+)$/, 'Current custom file: {1}', 'Fichier personnalisé actuel : {1}'],
    [/^ملف مخصّص \((.+)\)$/, 'Custom file ({1})', 'Fichier personnalisé ({1})'],
    [/^مُفعّل: (.+) — النغمة: (.+)$/, 'On: {1} — Tone: {2}', 'Activé : {1} — Sonnerie : {2}'],
    [/^يُصفَّر تلقائياً (.+)$/, 'Resets automatically {1}', 'Réinitialisation automatique {1}'],
    [/^محتوى البطاقات مُصغَّر إلى (\d+)% — يمنح مساحة أوسع\.?$/, 'Card content scaled down to {1}% — gives more room.', 'Contenu des cartes réduit à {1} % — plus d’espace.'],
    [/^محتوى البطاقات مُكبَّر إلى (\d+)% مع بقاء أماكنها — وإن امتلأ اللوح يمكن تمريره\.?$/, 'Card content scaled up to {1}% in place — scroll the board if it fills up.', 'Contenu des cartes agrandi à {1} % sur place — faites défiler le tableau s’il est plein.'],
    [/^تم الانتقال إلى وضع «(.+)» \((\d+) د\)\.?$/, 'Switched to “{1}” mode ({2} min).', 'Passage en mode « {1} » ({2} min).'],
    [/^الجلسة (\d+) من (\d+)$/, 'Session {1} of {2}', 'Session {1} sur {2}'],
    [/^وصلتَ إلى الرقم (\d+)$/, 'You reached {1}', 'Vous avez atteint {1}'],
    [/^(\d+) د بعد المغرب$/, '{1} min after Maghrib', '{1} min après le Maghrib'],
    [/^(.+) \((\d+(?:\.\d+)?)° \/ (.+)\)$/, '{t1} ({2}° / {t3})', '{t1} ({2}° / {t3})'],
    [/^(\d+) د$/, '{1} min', '{1} min'],
    [/^(\d+) جلسات? اليوم$/, '{1} session(s) today', '{1} session(s) aujourd’hui'],
    [/^(\d+)%$/, '{1}%', '{1} %'],
    [/^— (.+)$/, '— {t1}', '— {t1}'],
    [/^تلاوة سورة الكهف بصوت (.+)$/, 'Surah Al-Kahf recited by {t1}', 'Sourate Al-Kahf récitée par {t1}'],
    [/^ما شاء الله! وصلتَ إلى الرقم المستهدف في التسبيح \((\d+)\)$/, 'MashaAllah! You reached your tasbih target ({1})', 'MashaAllah ! Vous avez atteint votre objectif de tasbih ({1})'],
    [/^مرّت الساعة \((.+)\) — اللهم صلِّ وسلِّم على نبينا محمد ﷺ$/, 'An hour has passed ({1}) — Salawat upon our Prophet Muhammad ﷺ', 'Une heure s’est écoulée ({1}) — Prière sur notre Prophète Muhammad ﷺ'],
    [/^(.+) \(اختصار: (.+)\)$/, '{t1} (Shortcut: {2})', '{t1} (Raccourci : {2})']
  ];

  // ---------- بناء الفهرس ----------
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const MAP = new Map();
  D.forEach((row) => {
    const key = norm(row[0]);
    if (!MAP.has(key)) MAP.set(key, { en: row[1], fr: row[2] });
  });
  const AR = /[\u0600-\u06FF]/;

  function lookup(core) {
    const hit = MAP.get(core);
    if (hit) return hit[lang];
    // نفس الجملة دون نقطة النهاية
    if (/[.…]$/.test(core)) {
      const h2 = MAP.get(core.replace(/[.…]+$/, ''));
      if (h2) return h2[lang] + '.';
    } else {
      const h3 = MAP.get(core + '.');
      if (h3) return h3[lang].replace(/\.$/, '');
    }
    return null;
  }

  function fill(template, groups, valueOf) {
    return template.replace(/\{(s|t)?(\d)\}/g, (m, kind, i) => {
      const g = groups[Number(i)] || '';
      if (kind === 's') {
        const key = norm(g);
        return SURAH[key] || key;
      }
      return valueOf(g, kind === 't');
    });
  }

  // الترجمة الرئيسية لنص (بعد التقليم). تعيد null إن لم تتعرف عليه.
  function translateCore(core, depth) {
    if (!core || lang === 'ar' || !AR.test(core)) return null;
    depth = depth || 0;
    const direct = lookup(core);
    if (direct !== null) return direct;
    if (depth > 3) return null;
    for (let i = 0; i < R.length; i++) {
      const m = core.match(R[i][0]);
      if (m) {
        const tpl = R[i][lang === 'en' ? 1 : 2];
        return fill(tpl, m, (g, translate) => {
          if (!translate && !AR.test(g)) return g;
          const sub = translateCore(norm(g), depth + 1);
          return sub === null ? g : sub;
        });
      }
    }
    // جمل مركّبة تفصلها « — » أو «. »
    const seps = [' — ', '. '];
    for (let s = 0; s < seps.length; s++) {
      if (core.indexOf(seps[s]) > 0) {
        const parts = core.split(seps[s]);
        const out = parts.map((p) => {
          const pr = norm(p);
          return AR.test(pr) ? translateCore(pr, depth + 1) : pr;
        });
        if (out.every((x) => x !== null)) return out.join(seps[s]);
      }
    }
    return null;
  }

  function t(str) {
    if (lang === 'ar' || typeof str !== 'string') return str;
    const lead = str.match(/^\s*/)[0];
    const trail = str.match(/\s*$/)[0];
    const core = norm(str);
    const out = translateCore(core);
    return out === null ? str : lead + out + trail;
  }

  // ---------- تطبيق على DOM ----------
  const SKIP_IDS = new Set([
    'ayahQuranicText', 'ayahTadabburText', 'quickDhikrText', 'newTaskInput', 'scratchArea',
    'digitalHours', 'digitalMinutes', 'digitalSeconds', 'nextPrayerCountdown', 'prevPrayerElapsed',
    'pomodoroDisplay', 'focusBig', 'kahfTimeBadge', 'quickDhikrCount', 'bigTasbihDisplay',
    'dailyTasbihCounterBadge', 'tasbihProgressCount', 'tasbihPct', 'tasbihTargetText',
    'currentTemp', 'humidityVal', 'pendingTasksBadge'
  ]);
  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'NOSCRIPT', 'CODE']);
  const ATTRS = ['title', 'placeholder', 'aria-label'];
  const textRec = new WeakMap();   // Text -> {src, out}
  const attrRec = new WeakMap();   // Element -> {attr: {src, out}}
  let observer = null;

  function skipped(el) {
    for (let n = el; n && n.nodeType === 1; n = n.parentNode) {
      if (SKIP_TAGS.has(n.tagName) || n.hasAttribute('data-no-i18n') || SKIP_IDS.has(n.id)) return true;
    }
    return false;
  }

  function processText(node) {
    const parent = node.parentNode;
    if (!parent || skipped(parent)) return;
    const rec = textRec.get(node);
    const src = rec && node.data === rec.out ? rec.src : node.data;
    if (!AR.test(src)) {
      if (rec) textRec.delete(node);
      return;
    }
    const out = lang === 'ar' ? src : t(src);
    if (out !== node.data) node.data = out;
    textRec.set(node, { src, out });
  }

  function processAttrs(el) {
    if (el.nodeType !== 1 || skipped(el)) return;
    let recs = attrRec.get(el);
    for (let i = 0; i < ATTRS.length; i++) {
      const a = ATTRS[i];
      if (!el.hasAttribute(a)) continue;
      const cur = el.getAttribute(a);
      const rec = recs && recs[a];
      const src = rec && cur === rec.out ? rec.src : cur;
      if (!AR.test(src)) { if (rec) delete recs[a]; continue; }
      const out = lang === 'ar' ? src : t(src);
      if (out !== cur) el.setAttribute(a, out);
      if (!recs) { recs = {}; attrRec.set(el, recs); }
      recs[a] = { src, out };
    }
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { processText(root); return; }
    if (root.nodeType !== 1) return;
    processAttrs(root);
    if (skipped(root)) return;
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null);
    let n = tw.nextNode();
    while (n) {
      if (n.nodeType === 3) processText(n);
      else processAttrs(n);
      n = tw.nextNode();
    }
  }

  function observe() {
    if (!observer || !document.body) return;
    if (lang === 'ar') {
      observer.disconnect();
      return;
    }
    observer.observe(document.body, {
      childList: true, subtree: true, characterData: true,
      attributes: true, attributeFilter: ATTRS
    });
  }

  function onMutations(records) {
    observer.disconnect();
    try {
      for (let i = 0; i < records.length; i++) {
        const r = records[i];
        if (r.type === 'characterData') processText(r.target);
        else if (r.type === 'attributes') processAttrs(r.target);
        else r.addedNodes.forEach(walk);
      }
    } finally { observe(); }
  }

  function applyAll(forceWalk = false) {
    if (!document.body) return;
    if (observer) observer.disconnect();
    try {
      if (lang !== 'ar' || forceWalk) {
        walk(document.body);
      }
      const titleEl = document.querySelector('title');
      if (titleEl) {
        if (!titleEl.dataset.src) titleEl.dataset.src = titleEl.textContent;
      }
    } finally { observe(); }
  }

  function applyDocumentAttrs() {
    const cfg = LANGS[lang];
    const root = document.documentElement;
    root.lang = lang;
    root.dir = cfg.dir;
    if (document.body) {
      document.body.classList.remove('lang-ar', 'lang-en', 'lang-fr');
      document.body.classList.add('lang-' + lang);
    }
  }

  function setLang(next) {
    if (!LANGS[next] || next === lang) { syncPicker(); return; }
    lang = next;
    try { localStorage.setItem(KEY, lang); } catch (e) { /* التخزين غير متاح */ }
    applyDocumentAttrs();
    applyAll(true);
    syncPicker();
    document.dispatchEvent(new CustomEvent('tv-lang-change', { detail: { lang } }));
  }

  function syncPicker() {
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      const on = btn.dataset.langBtn === lang;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  // ---------- تهيئة ----------
  // نضبط الاتجاه فوراً قبل الرسم لتفادي وميض الاتجاه الخاطئ
  document.documentElement.lang = lang;
  document.documentElement.dir = LANGS[lang].dir;

  function start() {
    observer = new MutationObserver(onMutations);
    applyDocumentAttrs();
    applyAll();
    syncPicker();
    document.addEventListener('click', (e) => {
      const btn = e.target.closest && e.target.closest('[data-lang-btn]');
      if (btn) setLang(btn.dataset.langBtn);
    });
    window.addEventListener('storage', (e) => {
      if (e.key === KEY && e.newValue && LANGS[e.newValue] && e.newValue !== lang) setLang(e.newValue);
    });
  }

  window.I18N = {
    t,
    lang: () => lang,
    dir: () => LANGS[lang].dir,
    locale: () => LANGS[lang].locale,
    hijriLocale: () => LANGS[lang].hijri,
    apiLang: () => lang,
    setLang,
    refresh: applyAll,
    langs: LANGS
  };

  // نبدأ عند اكتمال بناء DOM (يعمل app.js قبل هذا الحدث لأنه آخر سكربت في الصفحة)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
