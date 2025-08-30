/**
 * Hindu Calendar - Home Manager
 * Manages the home page navigation cards and interactions
 */

class HomeManager {
  constructor() {
    this.cardsGrid = null;
    this.navigationCards = [
        {
            id: 'bytes',
            title: 'Bytes',
            description: 'Cultural wisdom & teachings',
            icon: 'fas fa-bolt',
            iconClass: 'bytes',
            view: 'bytes'
        },
        {
            id: 'calendar',
            title: 'Calendar',
            description: 'View sacred dates & festivals',
            icon: 'fas fa-calendar-alt',
            iconClass: 'calendar',
            view: 'calendar'
        },
        {
            id: 'upcoming',
            title: 'Upcoming',
            description: 'Events & festivals ahead',
            icon: 'fas fa-star',
            iconClass: 'upcoming',
            view: 'upcoming'
        },
        {
            id: 'temples',
            title: 'Temples',
            description: 'Discover ancient temples',
            icon: 'fas fa-landmark',
            iconClass: 'temples',
            view: 'temples'
        },
        {
            id: 'months',
            title: 'Months',
            description: 'Hindu calendar system',
            icon: 'fas fa-moon',
            iconClass: 'months',
            view: 'months'
        },
        {
            id: 'about',
            title: 'About',
            description: 'Learn about our mission',
            icon: 'fas fa-info-circle',
            iconClass: 'about',
            view: 'about'
        },
        {
            id: 'festivals',
            title: 'Festivals',
            description: 'Complete festival guide',
            icon: 'fas fa-calendar-day',
            iconClass: 'festivals',
            view: 'festivals'
        },
        {
            id: 'donate',
            title: 'Donate',
            description: 'Support our mission',
            icon: 'fas fa-heart',
            iconClass: 'donate',
            view: 'donate'
        }
    ];
    
    this.init();
  }

  /**
   * Initialize the home manager
   */
  init() {
    this.cardsGrid = document.getElementById('homeCardsGrid');
    if (this.cardsGrid) {
      this.renderCards();
      this.setupEventListeners();
    }
  }

  /**
   * Render all navigation cards
   */
  renderCards() {
    if (!this.cardsGrid) return;

    this.cardsGrid.innerHTML = '';
    
    this.navigationCards.forEach(card => {
      const cardElement = this.createCardElement(card);
      this.cardsGrid.appendChild(cardElement);
    });
  }

  /**
   * Create a single navigation card element
   */
  createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'nav-card';
    cardElement.setAttribute('data-view', card.view);
    cardElement.setAttribute('role', 'button');
    cardElement.setAttribute('tabindex', '0');
    cardElement.setAttribute('aria-label', `Navigate to ${card.title}`);
    
    cardElement.innerHTML = `
      <div class="nav-card-content">
        <div class="nav-card-icon ${card.iconClass}">
          <i class="${card.icon}" aria-hidden="true"></i>
        </div>
        <h3 class="nav-card-title">${card.title}</h3>
        <p class="nav-card-description">${card.description}</p>
      </div>
    `;
    
    return cardElement;
  }

  /**
   * Setup event listeners for card interactions
   */
  setupEventListeners() {
    if (!this.cardsGrid) return;

    // Click events
    this.cardsGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.nav-card');
      if (card) {
        this.handleCardClick(card);
      }
    });

    // Keyboard events
    this.cardsGrid.addEventListener('keydown', (e) => {
      const card = e.target.closest('.nav-card');
      if (card && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        this.handleCardClick(card);
      }
    });

    // Touch events for mobile
    this.cardsGrid.addEventListener('touchstart', (e) => {
      const card = e.target.closest('.nav-card');
      if (card) {
        card.style.transform = 'translateY(-4px)';
      }
    }, { passive: true });

    this.cardsGrid.addEventListener('touchend', (e) => {
      const card = e.target.closest('.nav-card');
      if (card) {
        card.style.transform = '';
      }
    }, { passive: true });
  }

  /**
   * Handle card click navigation
   */
  handleCardClick(card) {
    const viewName = card.getAttribute('data-view');
    if (viewName) {
      // Trigger view change through the UI manager
      this.navigateToView(viewName);
    }
  }

  /**
   * Navigate to a specific view
   */
  navigateToView(viewName) {
    // Find and click the corresponding navigation button
    const navButton = document.querySelector(`[data-view="${viewName}"]`);
    if (navButton) {
      navButton.click();
    }
  }

  /**
   * Update card descriptions or content dynamically
   */
  updateCardContent(cardId, updates) {
    const card = this.navigationCards.find(c => c.id === cardId);
    if (card) {
      Object.assign(card, updates);
      this.renderCards();
    }
  }

  /**
   * Add a new navigation card
   */
  addCard(cardData) {
    this.navigationCards.push(cardData);
    this.renderCards();
  }

  /**
   * Remove a navigation card
   */
  removeCard(cardId) {
    this.navigationCards = this.navigationCards.filter(c => c.id !== cardId);
    this.renderCards();
  }

  /**
   * Get current cards configuration
   */
  getCards() {
    return [...this.navigationCards];
  }

  /**
   * Refresh the home page
   */
  refresh() {
    this.renderCards();
  }

  /**
   * Force complete refresh of home cards
   */
  forceRefresh() {
    if (this.cardsGrid) {
      this.cardsGrid.innerHTML = '';
      this.renderCards();
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HomeManager;
}

// Initialize HomeManager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.homeManager = new HomeManager();
  });
} else {
  window.homeManager = new HomeManager();
}

// Force refresh when home view is shown
document.addEventListener('DOMContentLoaded', () => {
  // Refresh home manager when home view is activated
  const homeView = document.getElementById('homeView');
  if (homeView) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (homeView.classList.contains('active') && window.homeManager) {
            window.homeManager.refresh();
          }
        }
      });
    });
    
    observer.observe(homeView, { attributes: true });
  }
});
