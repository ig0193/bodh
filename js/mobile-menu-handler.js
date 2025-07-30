/**
 * Mobile Menu Handler - Manages mobile menu interactions
 * Extracted from ui-manager.js for better code organization
 */

class MobileMenuHandler {
  constructor(elements, uiManager) {
    this.elements = elements;
    this.uiManager = uiManager;
    this.init();
  }

  /**
   * Initialize mobile menu functionality
   */
  init() {
    this.setupMobileMenu();
  }

  /**
   * Set up mobile menu functionality
   */
  setupMobileMenu() {
    // Mobile menu toggle
    if (this.elements.mobileMenuToggle) {
      this.elements.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Mobile menu close
    if (this.elements.mobileMenuClose) {
      this.elements.mobileMenuClose.addEventListener('click', () => this.closeMobileMenu());
    }

    // Mobile menu items
    this.elements.mobileMenuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const view = item.getAttribute('data-view');
        this.uiManager.showView(view);
        this.closeMobileMenu();
      });
    });

    // Close menu when clicking overlay
    if (this.elements.mobileMenuOverlay) {
      this.elements.mobileMenuOverlay.addEventListener('click', (e) => {
        if (e.target === this.elements.mobileMenuOverlay) {
          this.closeMobileMenu();
        }
      });
    }
  }

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu() {
    if (this.elements.mobileMenuOverlay) {
      this.elements.mobileMenuOverlay.classList.toggle('show');
    }
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    if (this.elements.mobileMenuOverlay) {
      this.elements.mobileMenuOverlay.classList.remove('show');
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobileMenuHandler;
}

// Make available globally
window.MobileMenuHandler = MobileMenuHandler;