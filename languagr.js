const translations = {
    en: {
        welcome: "Welcome",
        home: "Home",
        about: "About",
        contact: "Contact",
        // Add more translations
    },
    hi: {
        welcome: "स्वागत है",
        home: "होम",
        about: "हमारे बारे में",
        contact: "संपर्क",
    },
    es: {
        welcome: "Bienvenido",
        home: "Inicio",
        about: "Acerca de",
        contact: "Contacto",
    }
    // Add more languages as needed
};

function translatePage(lang) {
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
}
