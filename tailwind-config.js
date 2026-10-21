window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)'
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        tajawal: ['Tajawal', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
        quran: ['"Amiri Quran"', 'Amiri', 'serif'],
      }
    }
  }
};
