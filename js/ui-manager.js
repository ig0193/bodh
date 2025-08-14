/**
 * UI Manager - Handles all user interface interactions and rendering
 * Modern aesthetics with traditional Hindu values
 */

class HinduCalendarUI {
  constructor(calendarEngine) {
    this.engine = calendarEngine;
    this.currentView = 'calendar';
    this.elements = {};
    
    // Handlers will be initialized after elements are cached
    this.mobileMenuHandler = null;
    this.modalManager = null;
    this.calendarRenderer = null;
    this.upcomingEventsHandler = null;
    this.festivalsManager = null;
    
    this.init();
  }

  /**
   * Initialize UI components and event listeners
   */
  init() {
    this.cacheElements();
    this.initializeMobileMenuHandler();
    this.initializeModalManager();
    this.initializeCalendarRenderer();
    this.initializeUpcomingEventsHandler();
    this.initializeFestivalsManager();
    this.setupEventListeners();
    this.setupSidebarToggle();
    this.render();
  }

  /**
   * Cache frequently used DOM elements
   */
  cacheElements() {
    this.elements = {
      // New header elements
      currentDateDisplay: document.getElementById('currentDateDisplay'),
      todayBtn: document.getElementById('todayBtn'),

      // Mobile menu elements
      mobileMenuToggle: document.getElementById('mobileMenuToggle'),
      mobileMenuOverlay: document.getElementById('mobileMenuOverlay'),
      mobileMenuClose: document.getElementById('mobileMenuClose'),
      mobileMenuItems: document.querySelectorAll('.mobile-menu-item'),

      // Today's popup elements
      popupBackdrop: document.getElementById('popupBackdrop'),
      todayPopup: document.getElementById('todayPopup'),
      popupDateTitle: document.getElementById('popupDateTitle'),
      popupSubtitle: document.getElementById('popupSubtitle'),
      popupSignificance: document.getElementById('popupSignificance'),
      popupInspiration: document.getElementById('popupInspiration'),

      // Sidebar elements
      occasionsSidebar: document.getElementById('occasionsSidebar'),
      sidebarToggle: document.getElementById('sidebarToggle'),
      occasionsList: document.getElementById('occasionsList'),
      
      // Calendar elements
      currentMonth: document.getElementById('currentMonth'),
      hinduMonths: document.getElementById('hinduMonths'),
      calendarGrid: document.getElementById('calendarGrid'),
      prevButton: document.getElementById('prevMonth'),
      nextButton: document.getElementById('nextMonth'),
      
      // Navigation
      navButtons: document.querySelectorAll('.nav-btn'),
      views: document.querySelectorAll('.view'),
      
      // Content areas
      upcomingEvents: document.getElementById('upcomingEvents'),
      monthsGrid: document.getElementById('monthsGrid'),
      detailsModal: document.getElementById('detailsModal'),
      modalContent: document.getElementById('modalContent'),
      modalClose: document.querySelector('.modal-close')
    };
  }

  /**
   * Set up sidebar toggle functionality
   */
  setupSidebarToggle() {
    if (this.elements.sidebarToggle) {
      this.elements.sidebarToggle.addEventListener('click', () => {
        if (this.elements.occasionsSidebar) {
          this.elements.occasionsSidebar.classList.toggle('collapsed');
        }
      });
    }
  }

  /**
   * Initialize mobile menu handler
   */
  initializeMobileMenuHandler() {
    this.mobileMenuHandler = new MobileMenuHandler(this.elements, this);
  }

  /**
   * Initialize modal manager
   */
  initializeModalManager() {
    this.modalManager = new ModalManager(this);
  }

  /**
   * Initialize calendar renderer
   */
  initializeCalendarRenderer() {
    this.calendarRenderer = new CalendarRenderer(this.elements, this);
  }

  /**
   * Initialize upcoming events handler
   */
  initializeUpcomingEventsHandler() {
    this.upcomingEventsHandler = new UpcomingEventsHandler(this.elements, this);
  }

  /**
   * Initialize festivals manager
   */
  initializeFestivalsManager() {
    this.festivalsManager = new FestivalsManager(this);
  }

  /**
   * Close mobile menu (delegated to handler)
   */
  closeMobileMenu() {
    if (this.mobileMenuHandler) {
      this.mobileMenuHandler.closeMobileMenu();
    }
  }

  /**
   * Setup event listeners for user interactions
   */
  setupEventListeners() {
    // Mobile menu is now handled by MobileMenuHandler
    
    // Today button
    if (this.elements.todayBtn) {
      this.elements.todayBtn.addEventListener('click', () => this.goToToday());
    }

    // Interactive date display
    if (this.elements.currentDateDisplay) {
      this.elements.currentDateDisplay.addEventListener('click', () => this.toggleTodayPopup());
    }

    // Calendar navigation
    if (this.elements.prevButton) {
      this.elements.prevButton.addEventListener('click', () => this.previousMonth());
    }
    
    if (this.elements.nextButton) {
      this.elements.nextButton.addEventListener('click', () => this.nextMonth());
    }

    // Tab functionality for months view
    this.setupMonthsTabs();

    // View navigation
    this.elements.navButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const viewName = e.target.dataset.view || e.target.closest('[data-view]')?.dataset.view;
        if (viewName) this.showView(viewName);
      });
    });

    // Modal events
    if (this.elements.modalClose) {
      this.elements.modalClose.addEventListener('click', () => this.modalManager.closeModal());
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.modalManager.closeModal();
      }
    });

    // Close today popup on backdrop click
    if (this.elements.popupBackdrop) {
      this.elements.popupBackdrop.addEventListener('click', () => this.hideTodayPopup());
    }

    // ESC key to close popup
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.elements.todayPopup.classList.contains('show')) {
        this.hideTodayPopup();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboard(e));
  }

  /**
   * Main render function
   */
  render() {
    this.renderHeader();
    this.calendarRenderer.renderCalendar();
    this.upcomingEventsHandler.renderUpcomingEvents();
    this.calendarRenderer.updateTodayHighlight();
  }

  /**
   * Render header with current date information (updated for new clean design)
   */
  renderHeader() {
    const todayInfo = this.engine.getTodaysInformation();
    const { date, dayData, hinduMonth } = todayInfo;

    // Prepare date formatting variables
    const englishOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const dayOptions = { weekday: 'long' };
    
    const englishDate = date.toLocaleDateString('en-US', englishOptions);
    const dayName = date.toLocaleDateString('en-US', dayOptions);
    const hinduDate = hinduMonth ? `${hinduMonth.name}, विक्रम संवत् 2081` : '';
    const hindyDayName = this.getHindiDayName(dayName);

    // Update the date display - simplified and clickable
    if (this.elements.currentDateDisplay) {
      this.elements.currentDateDisplay.textContent = `${englishDate} | ${dayName}`;
    }

    // Update Today's Popup content with enhanced information
    if (this.elements.popupDateTitle) {
      this.elements.popupDateTitle.textContent = `${dayName}, ${englishDate}`;
    }

    if (this.elements.popupSubtitle) {
      this.elements.popupSubtitle.textContent = `${hinduDate} • ${hindyDayName}`;
    }

    if (this.elements.popupSignificance && dayData.significance) {
      this.elements.popupSignificance.textContent = dayData.significance;
    }

    if (this.elements.popupInspiration && dayData.recommendations && dayData.recommendations.length > 0) {
      this.elements.popupInspiration.textContent = dayData.recommendations[0];
    }
  }

  /**
   * Get Hindi day name from English day name
   */
  getHindiDayName(englishDay) {
    const dayMap = {
      'Sunday': 'रविवार',
      'Monday': 'सोमवार', 
      'Tuesday': 'मंगलवार',
      'Wednesday': 'बुधवार',
      'Thursday': 'गुरुवार',
      'Friday': 'शुक्रवार',
      'Saturday': 'शनिवार'
    };
    return dayMap[englishDay] || englishDay;
  }

  /**
   * Render main calendar view (delegated to calendar renderer)
   */
  renderCalendar() {
    if (this.calendarRenderer) {
      this.calendarRenderer.renderCalendar();
    }
  }

  /**
   * Render occasions list for a specific container (delegated to calendar renderer)
   */
  renderOccasionsList(calendarData, containerId) {
    if (this.calendarRenderer) {
      this.calendarRenderer.renderOccasionsList(calendarData, containerId);
    }
  }

  /**
   * Show detailed information for a day (delegated to modal manager)
   */
  showDayDetails(dayData) {
    this.modalManager.showDayDetails(dayData);
  }

  /**
   * Render upcoming sacred occasions section (delegated to upcoming events handler)
   */
  renderUpcomingEvents() {
    if (this.upcomingEventsHandler) {
      this.upcomingEventsHandler.renderUpcomingEvents();
    }
  }

  /**
   * Render months view with all Hindu months
   */
  renderMonthsView() {
    if (!this.elements.monthsGrid) return;

    const currentYearData = this.engine.getCurrentYearData();
    const hinduMonthsData = currentYearData.hinduMonths || {};
    
    if (Object.keys(hinduMonthsData).length === 0) {
      this.elements.monthsGrid.innerHTML = '<div class="loading-months">Hindu months data not available</div>';
      return;
    }

    const monthsHTML = Object.entries(hinduMonthsData).map(([key, monthData]) => {
      const cardClasses = ['month-card'];
      const headerClasses = ['month-header'];
      
      if (monthData.isHoliest) {
        cardClasses.push('holiest');
        headerClasses.push('holiest');
      }
      if (monthData.isFestivalMonth) {
        cardClasses.push('festival-month');
        headerClasses.push('festival-month');
      }

      return `
        <div class="${cardClasses.join(' ')}" data-month="${key}">
          ${monthData.isHoliest ? '<div class="month-special-badge">पवित्रतम</div>' : ''}
          ${monthData.isFestivalMonth ? '<div class="month-special-badge">त्योहार</div>' : ''}
          
          <div class="${headerClasses.join(' ')}">
            <div class="month-name-hindi">${monthData.name}</div>
            <div class="month-name-roman">${monthData.roman}</div>
          </div>
          
          <div class="month-body">
            ${this.getMonthSignificance(monthData)}
            
            <div class="month-details">
              <div class="month-detail-item">
                <div class="month-detail-icon">🌸</div>
                <div class="month-detail-content">
                  <div class="month-detail-label">Season (मौसम)</div>
                  <div class="month-detail-value">${monthData.season}</div>
                </div>
              </div>
              
              <div class="month-detail-item">
                <div class="month-detail-icon">🛕</div>
                <div class="month-detail-content">
                  <div class="month-detail-label">Primary Deity (मुख्य देवता)</div>
                  <div class="month-detail-value">${monthData.deity}</div>
                </div>
              </div>
              
                              <div class="month-detail-item">
                <div class="month-detail-icon">📅</div>
                <div class="month-detail-content">
                  <div class="month-detail-label">Gregorian Months</div>
                  <div class="month-detail-value">${Array.isArray(monthData.gregorianMonths) ? monthData.gregorianMonths.join(', ') : 'Data loading...'}</div>
                </div>
              </div>
              
              ${monthData.specialPractices && Array.isArray(monthData.specialPractices) ? `
                <div class="month-detail-item">
                  <div class="month-detail-icon">🙏</div>
                  <div class="month-detail-content">
                    <div class="month-detail-label">Special Practices</div>
                    <div class="month-detail-value">${monthData.specialPractices.join(', ')}</div>
                  </div>
                </div>
              ` : ''}
            </div>
            
            ${monthData.festivals && monthData.festivals.length > 0 ? `
              <div class="month-festivals">
                <h4>🎉 Major Festivals</h4>
                <div class="festivals-list">
                  ${monthData.festivals.map(festival => `
                    <span class="festival-tag">${festival}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    this.elements.monthsGrid.innerHTML = monthsHTML;

    // Add click events for month cards
    this.elements.monthsGrid.querySelectorAll('.month-card').forEach(card => {
      card.addEventListener('click', () => {
        const monthKey = card.dataset.month;
        const monthData = hinduMonthsData[monthKey];
        if (monthData) {
          this.showMonthDetails(monthKey, monthData);
        }
      });
    });
  }

  /**
   * Setup tab functionality for months view
   */
  setupMonthsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to clicked button and corresponding panel
        button.classList.add('active');
        const targetPanel = document.getElementById(`${targetTab}-tab`);
        if (targetPanel) {
          targetPanel.classList.add('active');
        }
        
        // Render content based on active tab
        if (targetTab === 'interactive') {
          this.renderInteractiveMonthsView();
        }
      });
    });
  }

  /**
   * Render interactive months view
   */
  renderInteractiveMonthsView() {
    this.renderCurrentMonthHighlight();
    this.renderMonthsEncyclopedia();
  }

  /**
   * Render current month highlight
   */
  renderCurrentMonthHighlight() {
    const currentMonthName = document.getElementById('currentMonthName');
    const currentMonthDetails = document.getElementById('currentMonthDetails');
    
    if (!currentMonthName || !currentMonthDetails) return;
    
    // Get current Hindu month using current date
    const today = new Date();
    const currentHinduMonth = this.engine.getHinduMonthForDate(today);
    
    if (!currentHinduMonth) {
      currentMonthName.textContent = 'Loading...';
      currentMonthDetails.innerHTML = '<p>Loading current month details...</p>';
      return;
    }
    
    currentMonthName.textContent = `${currentHinduMonth.name} (${currentHinduMonth.roman})`;
    
    currentMonthDetails.innerHTML = `
      <div class="current-month-detail">
        <strong>Season:</strong> ${currentHinduMonth.season || 'Loading...'}
      </div>
      <div class="current-month-detail">
        <strong>Primary Deity:</strong> ${currentHinduMonth.deity || 'Loading...'}
      </div>
      <div class="current-month-detail">
        <strong>Significance:</strong> ${currentHinduMonth.significance || 'Loading...'}
      </div>
      <div class="current-month-detail">
        <strong>Gregorian Period:</strong> ${currentHinduMonth.gregorianMonths ? currentHinduMonth.gregorianMonths.join(', ') : 'Loading...'}
      </div>
    `;
  }

  /**
   * Render months encyclopedia
   */
  renderMonthsEncyclopedia() {
    if (!this.elements.monthsGrid) return;
    
    const currentYearData = this.engine.getCurrentYearData();
    const hinduMonthsData = currentYearData.hinduMonths || {};
    
    if (Object.keys(hinduMonthsData).length === 0) {
      this.elements.monthsGrid.innerHTML = '<div class="loading-months">Loading month encyclopedia...</div>';
      return;
    }
    
    const monthsHTML = Object.entries(hinduMonthsData).map(([key, monthData]) => {
      const cardClasses = ['month-card'];
      const headerClasses = ['month-header'];
      
      // Check if this is the current month
      const today = new Date();
      const currentHinduMonth = this.engine.getHinduMonthForDate(today);
      const isCurrentMonth = currentHinduMonth && currentHinduMonth.key === key;
      
      if (isCurrentMonth) {
        cardClasses.push('current-month');
        headerClasses.push('current-month');
      }
      if (monthData.isHoliest) {
        cardClasses.push('holiest');
        headerClasses.push('holiest');
      }
      if (monthData.isFestivalMonth) {
        cardClasses.push('festival-month');
        headerClasses.push('festival-month');
      }

      return `
        <div class="${cardClasses.join(' ')}" data-month="${key}">
          ${monthData.isHoliest ? '<div class="month-special-badge">पवित्रतम</div>' : ''}
          ${monthData.isFestivalMonth ? '<div class="month-special-badge">त्योहार</div>' : ''}
          
          <div class="${headerClasses.join(' ')}">
            <div class="month-name-hindi">${monthData.name}</div>
            <div class="month-name-roman">${monthData.roman}</div>
          </div>
          
          <div class="month-body">
            ${this.getMonthSignificance(monthData)}
            
            <div class="month-details">
              <div class="month-detail-item">
                <div class="month-detail-icon">🌸</div>
                <div class="month-detail-content">
                  <div class="month-detail-label">Season (मौसम)</div>
                  <div class="month-detail-value">${monthData.season}</div>
                </div>
              </div>
              
              <div class="month-detail-item">
                <div class="month-detail-icon">🛕</div>
                <div class="month-detail-content">
                  <div class="month-detail-label">Primary Deity (मुख्य देवता)</div>
                  <div class="month-detail-value">${monthData.deity}</div>
                </div>
              </div>
              
              <div class="month-detail-item">
                <div class="month-detail-icon">📅</div>
                <div class="month-detail-content">
                  <div class="month-detail-label">Gregorian Months</div>
                  <div class="month-detail-value">${Array.isArray(monthData.gregorianMonths) ? monthData.gregorianMonths.join(', ') : 'Data loading...'}</div>
                </div>
              </div>
              
              ${monthData.specialPractices && Array.isArray(monthData.specialPractices) ? `
                <div class="month-detail-item">
                  <div class="month-detail-icon">🙏</div>
                  <div class="month-detail-content">
                    <div class="month-detail-label">Special Practices</div>
                    <div class="month-detail-value">${monthData.specialPractices.join(', ')}</div>
                  </div>
                </div>
              ` : ''}
            </div>
            
            ${monthData.festivals && monthData.festivals.length > 0 ? `
              <div class="month-festivals">
                <h4>🎉 Major Festivals</h4>
                <div class="festivals-list">
                  ${monthData.festivals.map(festival => `
                    <span class="festival-tag">${festival}</span>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    this.elements.monthsGrid.innerHTML = monthsHTML;

    // Add click events for month cards
    this.elements.monthsGrid.querySelectorAll('.month-card').forEach(card => {
      card.addEventListener('click', () => {
        const monthKey = card.dataset.month;
        const monthData = hinduMonthsData[monthKey];
        if (monthData) {
          this.showMonthDetails(monthKey, monthData);
        }
      });
    });
  }

  /**
   * Get filtered month significance (removes festival names that are already shown in festivals section)
   */
  getMonthSignificance(monthData) {
    if (!monthData.significance) return '';
    
    // Remove festival names that are already listed in the festivals section
    let significance = monthData.significance;
    
    if (monthData.festivals && Array.isArray(monthData.festivals)) {
      monthData.festivals.forEach(festival => {
        significance = significance.replace(festival, '').replace(/,\s*,/g, ',').replace(/^,\s*/, '').replace(/,\s*$/, '');
      });
    }
    
    // Clean up any remaining commas and extra spaces
    significance = significance.replace(/,\s*,/g, ',').replace(/^,\s*/, '').replace(/,\s*$/, '').trim();
    
    // Only show if there's meaningful content left
    if (significance && significance.length > 0) {
      return `<div class="month-significance">${significance}</div>`;
    }
    
    return '';
  }

  /**
   * Show detailed information for a month
   */
  showMonthDetails(monthKey, monthData) {
    const content = `
              <div class="month-details-modal">
          <div class="month-modal-header">
            <div class="month-name-large">${monthData.name} (${monthData.roman})</div>
          </div>
        
        <div class="month-modal-body">
          <div class="month-significance-section">
            <h3>महत्व (Significance)</h3>
            <p>${monthData.significance}</p>
          </div>
          
          <div class="month-info-grid">
            <div class="month-info-item">
              <strong>Season (मौसम):</strong> ${monthData.season}
            </div>
            <div class="month-info-item">
              <strong>Primary Deity:</strong> ${monthData.deity}
            </div>
            <div class="month-info-item">
              <strong>Gregorian Months:</strong> ${Array.isArray(monthData.gregorianMonths) ? monthData.gregorianMonths.join(', ') : 'Data loading...'}
            </div>
            ${monthData.color ? `
              <div class="month-info-item">
                <strong>Associated Color:</strong> <span style="color: ${monthData.color}">●</span> ${monthData.color}
              </div>
            ` : ''}
          </div>
          
          ${monthData.festivals && Array.isArray(monthData.festivals) && monthData.festivals.length > 0 ? `
            <div class="month-festivals-section">
              <h3>🎉 Major Festivals</h3>
              <ul>
                ${monthData.festivals.map(festival => `<li>${festival}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${monthData.specialPractices && Array.isArray(monthData.specialPractices) && monthData.specialPractices.length > 0 ? `
            <div class="month-practices-section">
              <h3>🙏 Special Practices</h3>
              <ul>
                ${monthData.specialPractices.map(practice => `<li>${practice}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${monthData.isHoliest ? `
            <div class="month-special-note holiest">
              <h4>⭐ Most Sacred Month</h4>
              <p>This is considered the holiest month in the Hindu calendar. Special observances and spiritual practices are highly recommended during this period.</p>
            </div>
          ` : ''}
          
          ${monthData.isFestivalMonth ? `
            <div class="month-special-note festival">
              <h4>🎊 Festival Month</h4>
              <p>This month is renowned for its numerous festivals and celebrations, making it one of the most joyous periods in the Hindu calendar.</p>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.modalManager.showModal(`${monthData.name} (${monthData.roman})`, content);
  }

  /**
   * Navigation functions
   */
  previousMonth() {
    this.engine.previousMonth();
    this.renderCalendar();
  }

  nextMonth() {
    this.engine.nextMonth();
    this.renderCalendar();
  }

  goToToday() {
    this.engine.setToday();
    // Switch to calendar view and re-render
    this.showView('calendar');
    // Close mobile menu if open
    this.closeMobileMenu();
  }

  /**
   * Today popup management
   */
  toggleTodayPopup() {
    if (this.elements.todayPopup.classList.contains('show')) {
      this.hideTodayPopup();
    } else {
      this.showTodayPopup();
    }
  }

  showTodayPopup() {
    this.elements.popupBackdrop.classList.add('show');
    this.elements.todayPopup.classList.add('show');
    
    // Focus management
    this.elements.todayPopup.focus();
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  hideTodayPopup() {
    this.elements.popupBackdrop.classList.remove('show');
    this.elements.todayPopup.classList.remove('show');
    
    // Restore focus and scroll
    document.body.style.overflow = '';
    this.elements.currentDateDisplay.focus();
  }

  /**
   * Show a specific view
   */
  showView(viewName) {
    // Hide all views
    this.elements.views.forEach(view => view.classList.remove('active'));
    
    // Remove active class from all nav buttons (desktop and mobile)
    this.elements.navButtons.forEach(btn => btn.classList.remove('active'));
    this.elements.mobileMenuItems.forEach(item => item.classList.remove('active'));
    
    // Show selected view
    let viewId = `${viewName}View`;
    if (viewName === 'this-month') viewId = 'thisMonthView';
    const selectedView = document.getElementById(viewId);
    if (selectedView) {
      selectedView.classList.add('active');
      this.currentView = viewName;
    }
    
    // Add active class to nav button (desktop)
    document.querySelector(`[data-view="${viewName}"]`)?.classList.add('active');
    
    // Add active class to mobile menu item
    const mobileMenuItem = document.querySelector(`.mobile-menu-item[data-view="${viewName}"]`);
    if (mobileMenuItem) {
      mobileMenuItem.classList.add('active');
    }
    
    // Render view-specific content
    switch (viewName) {
      case 'calendar':
        this.renderCalendar();
        break;
      case 'upcoming':
        this.upcomingEventsHandler.renderUpcomingEvents();
        break;
      case 'temples':
        this.renderTemplesView();
        break;
      case 'months':
        this.renderMonthsView();
        break;
      case 'this-month':
        this.renderThisMonthView();
        break;
      case 'festivals':
        this.renderFestivalsView();
        break;
      case 'about':
        // About view is static HTML
        break;
      case 'donate':
        // Donate view is static HTML
        break;
    }
  }

  /**
   * Render This Month view
   */
  renderThisMonthView() {
    const calendarData = this.engine.generateCalendarData();
    if (this.calendarRenderer) {
      this.calendarRenderer.renderOccasionsList(calendarData, 'thisMonthOccasionsList');
    }
  }

  /**
   * Render Festivals view
   */
  renderFestivalsView() {
    if (this.festivalsManager) {
      this.festivalsManager.init();
    }
  }

  /**
   * Render Temples view
   */
  renderTemplesView() {
    if (window.templesManager) {
      window.templesManager.loadTemples();
    }
  }


  /**
   * Modal functions (delegated to modal manager)
   */
  showModal(title, content) {
    this.modalManager.showModal(title, content);
  }

  closeModal() {
    this.modalManager.closeModal();
  }

  /**
   * Utility functions
   */
  createElement(tag, className = '', content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
  }

  updateTodayHighlight() {
    if (this.calendarRenderer) {
      this.calendarRenderer.updateTodayHighlight();
    }
  }

  handleKeyboard(e) {
    switch(e.key) {
      case 'ArrowLeft':
        this.previousMonth();
        break;
      case 'ArrowRight':
        this.nextMonth();
        break;
      case 'Escape':
        this.modalManager.closeModal();
        break;
    }
  }

  /**
   * Responsive and accessibility features
   */
  handleResize() {
    if (this.calendarRenderer) {
      this.calendarRenderer.handleResize();
    }
  }

  /**
   * Initialize responsive handler
   */
  initResponsive() {
    window.addEventListener('resize', () => this.handleResize());
    this.handleResize(); // Initial check
  }

  /**
   * Cleanup method for proper resource management
   */
  destroy() {
    // Cleanup festivals manager
    if (this.festivalsManager && typeof this.festivalsManager.destroy === 'function') {
      this.festivalsManager.destroy();
    }

    // Cleanup other handlers
    if (this.upcomingEventsHandler && typeof this.upcomingEventsHandler.destroy === 'function') {
      this.upcomingEventsHandler.destroy();
    }
    
    if (this.calendarRenderer && typeof this.calendarRenderer.destroy === 'function') {
      this.calendarRenderer.destroy();
    }
    
    if (this.modalManager && typeof this.modalManager.destroy === 'function') {
      this.modalManager.destroy();
    }
    
    if (this.mobileMenuHandler && typeof this.mobileMenuHandler.destroy === 'function') {
      this.mobileMenuHandler.destroy();
    }

    // Clear references
    this.engine = null;
    this.elements = {};
    this.mobileMenuHandler = null;
    this.modalManager = null;
    this.calendarRenderer = null;
    this.upcomingEventsHandler = null;
    this.festivalsManager = null;
  }

}

// ===== GLOBAL EXPOSURE =====
// Make sure HinduCalendarUI is available globally
window.HinduCalendarUI = HinduCalendarUI;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HinduCalendarUI;
} 