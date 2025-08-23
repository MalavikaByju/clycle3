// Accessibility Features Implementation
class AccessibilityManager {
    constructor() {
        this.currentFontSize = 100;
        this.init();
    }

    init() {
        this.loadSavedSettings();
        this.bindEvents();
        this.setupKeyboardNavigation();
    }

    bindEvents() {
        // Toggle accessibility menu
        document.getElementById('accessibility-toggle').addEventListener('click', () => {
            this.toggleMenu();
        });

        // Language selection
        document.getElementById('language-select').addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Font size controls
        document.getElementById('increase-font').addEventListener('click', () => {
            this.changeFontSize(10);
        });

        document.getElementById('decrease-font').addEventListener('click', () => {
            this.changeFontSize(-10);
        });

        document.getElementById('reset-font').addEventListener('click', () => {
            this.resetFontSize();
        });

        // Accessibility features
        document.getElementById('high-contrast').addEventListener('change', (e) => {
            this.toggleHighContrast(e.target.checked);
        });

        document.getElementById('focus-outline').addEventListener('change', (e) => {
            this.toggleEnhancedFocus(e.target.checked);
        });

        document.getElementById('reduce-motion').addEventListener('change', (e) => {
            this.toggleReduceMotion(e.target.checked);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.accessibility-panel')) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        const menu = document.getElementById('accessibility-menu');
        menu.classList.toggle('hidden');
    }

    closeMenu() {
        const menu = document.getElementById('accessibility-menu');
        menu.classList.add('hidden');
    }

    changeLanguage(lang) {
        if (typeof translatePage === 'function') {
            translatePage(lang);
        }
        localStorage.setItem('selectedLanguage', lang);
    }

    toggleTheme() {
        const body = document.body;
        const themeButton = document.getElementById('theme-toggle');
        
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            themeButton.textContent = '🌙 Dark Mode';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-theme');
            themeButton.textContent = '☀️ Light Mode';
            localStorage.setItem('theme', 'dark');
        }
    }

    changeFontSize(change) {
        this.currentFontSize = Math.max(60, Math.min(200, this.currentFontSize + change));
        document.body.style.fontSize = this.currentFontSize + '%';
        document.getElementById('font-size-display').textContent = this.currentFontSize + '%';
        localStorage.setItem('fontSize', this.currentFontSize);
    }

    resetFontSize() {
        this.currentFontSize = 100;
        document.body.style.fontSize = '100%';
        document.getElementById('font-size-display').textContent = '100%';
        localStorage.setItem('fontSize', 100);
    }

    toggleHighContrast(enabled) {
        if (enabled) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
        localStorage.setItem('highContrast', enabled);
    }

    toggleEnhancedFocus(enabled) {
        if (enabled) {
            document.body.classList.add('enhanced-focus');
        } else {
            document.body.classList.remove('enhanced-focus');
        }
        localStorage.setItem('enhancedFocus', enabled);
    }

    toggleReduceMotion(enabled) {
        if (enabled) {
            document.body.classList.add('reduce-motion');
        } else {
            document.body.classList.remove('reduce-motion');
        }
        localStorage.setItem('reduceMotion', enabled);
    }

    setupKeyboardNavigation() {
        // ESC key to close accessibility menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
            
            // Alt + A to toggle accessibility menu
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                this.toggleMenu();
            }
        });
    }

    loadSavedSettings() {
        // Load saved language
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang) {
            document.getElementById('language-select').value = savedLang;
            this.changeLanguage(savedLang);
        }

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.getElementById('theme-toggle').textContent = '☀️ Light Mode';
        }

        // Load saved font size
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            this.currentFontSize = parseInt(savedFontSize);
            document.body.style.fontSize = this.currentFontSize + '%';
            document.getElementById('font-size-display').textContent = this.currentFontSize + '%';
        }

        // Load other accessibility settings
        if (localStorage.getItem('highContrast') === 'true') {
            document.getElementById('high-contrast').checked = true;
            this.toggleHighContrast(true);
        }

        if (localStorage.getItem('enhancedFocus') === 'true') {
            document.getElementById('focus-outline').checked = true;
            this.toggleEnhancedFocus(true);
        }

        if (localStorage.getItem('reduceMotion') === 'true') {
            document.getElementById('reduce-motion').checked = true;
            this.toggleReduceMotion(true);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityManager();
});
