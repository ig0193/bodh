/**
 * UI Manager - Handles all user interface interactions and rendering
 * Modern aesthetics with traditional Hindu values
 */

class HinduCalendarUI {
  constructor(calendarEngine) {
    this.engine = calendarEngine;
    this.modal = null;
    this.currentView = 'calendar';
    this.elements = {};
    
    this.init();
  }

  /**
   * Initialize UI components and event listeners
   */
  init() {
    this.cacheElements();
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
   * Setup event listeners for user interactions
   */
  setupEventListeners() {
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
      this.elements.modalClose.addEventListener('click', () => this.closeModal());
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.closeModal();
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
    this.renderCalendar();
    this.renderUpcomingEvents();
    this.updateTodayHighlight();
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
   * Render main calendar view
   */
  renderCalendar() {
    const calendarData = this.engine.generateCalendarData();
    
    this.renderCalendarHeader(calendarData);
    this.renderCalendarGrid(calendarData);
    this.renderOccasionsSidebar(calendarData);
  }

  /**
   * Render calendar header with month/year info
   */
  renderCalendarHeader(calendarData) {
    const { year, monthName, hinduMonths } = calendarData;

    // Gregorian month/year
    if (this.elements.currentMonth) {
      this.elements.currentMonth.textContent = `${monthName} ${year}`;
    }

    // Hindu months (simplified - no descriptions)
    if (this.elements.hinduMonths) {
      if (Array.isArray(hinduMonths) && hinduMonths.length > 1) {
        // Multiple Hindu months in this Gregorian month
        this.elements.hinduMonths.innerHTML = `
          <div class="multiple-hindu-months">
            ${hinduMonths.map(month => `
              <span class="hindu-month-name">${month.name} (${month.roman})</span>
            `).join(' • ')}
          </div>
        `;
      } else if (Array.isArray(hinduMonths) && hinduMonths.length === 1) {
        // Single Hindu month
        const month = hinduMonths[0];
        this.elements.hinduMonths.innerHTML = `
          <div class="single-hindu-month">
            <span class="hindu-month-name">${month.name} (${month.roman})</span>
          </div>
        `;
      } else {
        // Fallback when no Hindu months data is available
        this.elements.hinduMonths.innerHTML = `
          <div class="hindu-months-loading">
            Loading Hindu calendar data...
          </div>
        `;
      }
    }
  }

  /**
   * Render calendar grid with days
   */
  renderCalendarGrid(calendarData) {
    if (!this.elements.calendarGrid) return;

    const { days } = calendarData;
    
    // Clear existing content
    this.elements.calendarGrid.innerHTML = '';

    // Create day headers first
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(dayName => {
      const headerElement = document.createElement('div');
      headerElement.className = 'day-header';
      headerElement.textContent = dayName;
      this.elements.calendarGrid.appendChild(headerElement);
    });

    // Ensure exactly 42 days are rendered (6 weeks × 7 days)
    const daysToRender = days.slice(0, 42);
    console.log(`Rendering ${daysToRender.length} days in calendar grid`);

    // Calendar days
    daysToRender.forEach(dayData => {
      const dayElement = this.createDayElement(dayData);
      this.elements.calendarGrid.appendChild(dayElement);
    });
  }

  /**
   * Render occasions sidebar with current month's festivals and events
   */
  renderOccasionsSidebar(calendarData) {
    if (!this.elements.occasionsList) return;

    // Get current month's occasions
    const occasions = [];
    
    calendarData.days.forEach(dayData => {
      if (dayData.occasion && dayData.isCurrentMonth) {
        occasions.push({
          name: dayData.occasion.name || dayData.occasion.roman || 'Festival',
          date: dayData.date,
          dateString: dayData.dateString,
          type: dayData.occasionType,
          data: dayData
        });
      }
    });

    // Sort occasions by date
    occasions.sort((a, b) => new Date(a.dateString) - new Date(b.dateString));

    // Render occasions
    if (occasions.length === 0) {
      this.elements.occasionsList.innerHTML = `
        <div class="loading-occasions">
          No special occasions this month
        </div>
      `;
      return;
    }

    this.elements.occasionsList.innerHTML = occasions.map((occasion, index) => {
      const dateObj = new Date(occasion.dateString);
      const formattedDate = dateObj.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });

      // Get both Hindi and Roman names
      const hindiName = occasion.data.occasion.name || '';
      const romanName = occasion.data.occasion.roman || occasion.data.occasion.english || '';
      
      return `
        <div class="occasion-item ${occasion.type}" data-occasion-index="${index}">
          <div class="occasion-name">${hindiName}</div>
          <div class="occasion-roman">${romanName}</div>
          <div class="occasion-date">${formattedDate}</div>
        </div>
      `;
    }).join('');

    // Add click event listeners for occasion items
    this.elements.occasionsList.querySelectorAll('.occasion-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        const occasionData = occasions[index];
        if (occasionData && occasionData.data) {
          this.showDayDetails(occasionData.data);
        }
      });
    });
  }

  /**
   * Get shortened display name for festivals
   */
  getShortDisplayName(occasion, occasionType) {
    if (occasionType === 'ekadashi') {
      return 'Ekadashi';
    }
    
    if (!occasion) return '';
    
    // Festival name mappings for shorter display
    const shortNames = {
      'Dussehra/Vijayadashami': 'Dussehra',
      'Krishna Janmashtami': 'Janmashtami',
      'Ganesh Chaturthi': 'Ganesh',
      'Raksha Bandhan': 'Rakhi',
      'Guru Purnima': 'Guru Purnima',
      'Makar Sankranti': 'Sankranti',
      'Vasant Panchami': 'Saraswati',
      'Maha Shivratri': 'Shivratri',
      'Ram Navami': 'Ram Navami',
      'Hanuman Jayanti': 'Hanuman',
      'Buddha Purnima': 'Buddha',
      'Akshaya Tritiya': 'Akshaya',
      'Dhanteras': 'Dhanteras',
      'Diwali/Deepavali': 'Diwali',
      'Govardhan Puja': 'Govardhan',
      'Bhai Dooj': 'Bhai Dooj',
      'Karva Chauth': 'Karva Chauth',
      'Navratri Shuru': 'Navratri'
    };
    
    // Try different name sources
    const possibleNames = [
      occasion.english,
      occasion.roman, 
      occasion.name
    ].filter(name => name);
    
    // Find the shortest mapped name or use roman/english
    for (const name of possibleNames) {
      if (shortNames[name]) {
        return shortNames[name];
      }
    }
    
    // Fallback: use roman or english name, truncated if too long
    const fallbackName = occasion.roman || occasion.english || occasion.name || '';
    return fallbackName.length > 12 ? fallbackName.substring(0, 10) + '...' : fallbackName;
  }

  /**
   * Create individual day element
   */
  createDayElement(dayData) {
    const { day, occasion, occasionType, isToday, isAuspicious, isOtherMonth } = dayData;
    
    // Generate CSS classes for the day
    const cssClasses = ['day'];
    if (isToday) cssClasses.push('today');
    if (isOtherMonth) cssClasses.push('other-month');
    if (occasion && !isOtherMonth) {
      cssClasses.push('has-occasion');
      if (occasionType === 'festival') cssClasses.push('festival-day');
      if (occasionType === 'ekadashi') cssClasses.push('ekadashi-day');
    }
    if (isAuspicious && !isOtherMonth) cssClasses.push('auspicious');
    
    const dayElement = this.createElement('div', cssClasses.join(' '));
    dayElement.dataset.date = dayData.dateString;
    
    // Day number
    const dayNumber = this.createElement('div', 'day-number', day.toString());
    dayElement.appendChild(dayNumber);

    // Occasion indicator (only for current month)
    if (occasion && !isOtherMonth) {
      const indicator = this.createElement('div', 'occasion-indicator');
      
      // Use shortened display name
      const displayName = this.getShortDisplayName(occasion, occasionType);
      indicator.textContent = displayName;
      
      // Add tooltip with full name
      const fullName = occasion.name || occasion.roman || occasion.english || displayName;
      indicator.title = fullName;
      
      if (occasionType === 'festival') {
        indicator.classList.add(`festival-${occasion.type || 'major'}`);
      } else if (occasionType === 'ekadashi') {
        indicator.classList.add('ekadashi-indicator');
      }
      
      dayElement.appendChild(indicator);
    }

    // Click event for details (only for current month)
    if (occasion && !isOtherMonth) {
      dayElement.addEventListener('click', () => this.showDayDetails(dayData));
      dayElement.style.cursor = 'pointer';
      dayElement.title = dayData.significance || occasion.significance || '';
    }

    return dayElement;
  }

  /**
   * Show detailed information for a day
   */
  showDayDetails(dayData) {
    const { date, occasion, occasionType, significance, recommendations, hinduMonth } = dayData;
    
    const content = this.createDetailContent(dayData);
    this.showModal('Day Details', content);
  }

  /**
   * Create detailed content for modal
   */
  createDetailContent(dayData) {
    const { date, occasion, occasionType, significance, recommendations, hinduMonth } = dayData;
    
    let content = `
      <div class="day-details">
        <div class="date-header">
          <div class="gregorian-date">${date.toLocaleDateString('en-US', { 
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
          })}</div>
          ${hinduMonth ? `
            <div class="hindu-date">
              ${hinduMonth.name} (${hinduMonth.roman}) मास
            </div>
          ` : ''}
        </div>
        
        <div class="significance-section">
          <h3>Significance (महत्व)</h3>
          <p>${significance}</p>
        </div>
    `;

    // Occasion details
    if (occasion && occasionType === 'festival') {
      content += `
        <div class="festival-section">
          <h3>${occasion.roman} (${occasion.name})</h3>
          <div class="festival-info">
            <p><strong>Category:</strong> ${occasion.category}</p>
            <p><strong>Mythology:</strong> ${occasion.mythology}</p>
            ${occasion.deity ? `<p><strong>Deity:</strong> ${occasion.deity}</p>` : ''}
            ${occasion.mantra ? `<p><strong>Mantra:</strong> ${occasion.mantra}</p>` : ''}
          </div>
          
          <div class="what-to-do">
            <h4>What to Do (क्या करें)</h4>
            <ul>
              ${occasion.whatToDo && Array.isArray(occasion.whatToDo) ? occasion.whatToDo.map(item => `<li>${item}</li>`).join('') : '<li>Loading recommendations...</li>'}
            </ul>
          </div>
          

          
          ${occasion.foods && Array.isArray(occasion.foods) ? `
            <div class="festival-foods">
              <h4>Traditional Foods</h4>
              <p>${occasion.foods.join(', ')}</p>
            </div>
          ` : ''}
        </div>
      `;
    }

    // Ekadashi details
    if (occasion && occasionType === 'ekadashi') {
      content += `
        <div class="ekadashi-section">
          <h3>${occasion.roman} (${occasion.name})</h3>
          <div class="ekadashi-info">
            <p><strong>Type:</strong> ${occasion.type}</p>
            <p><strong>Month:</strong> ${occasion.month}</p>
            <p><strong>Benefits:</strong> ${occasion.benefits}</p>
            ${occasion.warning ? `<p class="warning"><strong>⚠️ Note:</strong> ${occasion.warning}</p>` : ''}
          </div>
          
          <div class="fasting-rules">
            <h4>Fasting Rules (व्रत नियम)</h4>
            <p>${occasion.fastingRules}</p>
          </div>
          
          <div class="prayer-time">
            <h4>Prayer Time</h4>
            <p>${occasion.prayerTime}</p>
          </div>
          
          ${occasion.storyBrief ? `
            <div class="story-brief">
              <h4>Brief Story</h4>
              <p>${occasion.storyBrief}</p>
            </div>
          ` : ''}
        </div>
      `;
    }

    // General recommendations
    if (Array.isArray(recommendations) && recommendations.length > 0) {
      content += `
        <div class="recommendations-section">
          <h3>Today's Recommendations (आज की सिफारिशें)</h3>
          <ul>
            ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    content += '</div>';
    return content;
  }

  /**
   * Render upcoming sacred occasions section
   */
  renderUpcomingEvents() {
    if (!this.elements.upcomingEvents) return;

    const upcoming = this.engine.getUpcomingOccasions(30);
    
    if (upcoming.length === 0) {
      this.elements.upcomingEvents.innerHTML = `
        <div class="upcoming-events-container">
          <div class="upcoming-header">
            <h3>Sacred Days Ahead</h3>
            <div class="period-info">Next 30 days</div>
          </div>
          <div class="no-events">
            <p>No sacred occasions in the next 30 days.</p>
          </div>
        </div>
      `;
      return;
    }

    // Group by time periods
    const today = new Date();
    const thisWeek = [];
    const thisMonth = [];
    const beyond = [];

    upcoming.forEach(event => {
      if (event.daysUntil <= 7) {
        thisWeek.push(event);
      } else if (event.daysUntil <= 30) {
        thisMonth.push(event);
      } else {
        beyond.push(event);
      }
    });

    const eventsHTML = `
      <div class="upcoming-events-container">
        <div class="upcoming-header">
          <h3>Sacred Days Ahead</h3>
          <div class="period-info">Next 30 days • ${upcoming.length} occasions</div>
        </div>
        
        <div class="view-options">
          <button class="filter-btn active" data-filter="all">All</button>
          <button class="filter-btn" data-filter="festival">Festivals</button>
          <button class="filter-btn" data-filter="ekadashi">Ekadashi</button>
        </div>
        
        <div class="events-section">
          <h4 class="section-title">This Week</h4>
          <div class="events-list">
            ${thisWeek.length > 0 ? 
              thisWeek.map(event => this.createEventItemHTML(event)).join('') :
              '<div class="empty-state">No sacred occasions this week</div>'
            }
          </div>
        </div>
        
        <div class="events-section">
          <h4 class="section-title">This Month</h4>
          <div class="events-list">
            ${thisMonth.length > 0 ? 
              thisMonth.map(event => this.createEventItemHTML(event)).join('') :
              '<div class="empty-state">No additional occasions this month</div>'
            }
          </div>
        </div>
      </div>
    `;

    this.elements.upcomingEvents.innerHTML = eventsHTML;

    // Add click events for upcoming events
    this.elements.upcomingEvents.querySelectorAll('.event-item').forEach(item => {
      item.addEventListener('click', () => {
        const date = item.dataset.date;
        const event = upcoming.find(e => e.date === date);
        if (event) {
          this.showEventDetails(event);
        }
      });
    });

    // Add filter functionality
    this.elements.upcomingEvents.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        this.filterUpcomingEvents(filter);
        
        // Update active state
        this.elements.upcomingEvents.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  /**
   * Create HTML for a single event item
   */
  createEventItemHTML(event) {
    const eventDate = new Date(event.date);
    const dayName = eventDate.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = eventDate.toLocaleDateString('en-US', { month: 'short' });
    
    return `
      <div class="event-item ${event.type}" data-date="${event.date}" data-type="${event.type}">
        <div class="event-date">
          <div class="countdown-badge">${event.daysUntil === 0 ? 'Today' : event.daysUntil === 1 ? 'Tomorrow' : `${event.daysUntil} days`}</div>
          <div class="date-details">
            <div class="event-day">${eventDate.getDate()}</div>
            <div class="date-meta">${dayName}, ${monthName}</div>
          </div>
        </div>
        <div class="event-info">
          <div class="event-name">${event.name}</div>
          <div class="event-roman">${event.roman}</div>
          <div class="event-significance">${event.significance}</div>
        </div>
      </div>
    `;
  }

  /**
   * Filter upcoming events by type
   */
  filterUpcomingEvents(filter) {
    const eventItems = this.elements.upcomingEvents.querySelectorAll('.event-item');
    
    eventItems.forEach(item => {
      const itemType = item.dataset.type;
      if (filter === 'all' || itemType === filter) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  /**
   * Show event details in modal
   */
  showEventDetails(event) {
    const content = this.createEventDetailContent(event);
    this.showModal(`${event.name} (${event.roman})`, content);
  }

  /**
   * Create event detail content
   */
  createEventDetailContent(event) {
    return `
      <div class="event-details">
        <div class="event-header">
          <div class="event-date">${new Date(event.date).toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
          })}</div>
          <div class="days-until">${event.daysUntil} days from today</div>
        </div>
        
        <div class="event-significance">
          <h3>Significance</h3>
          <p>${event.significance}</p>
        </div>
        
        ${event.whatToDo && Array.isArray(event.whatToDo) ? `
          <div class="event-actions">
            <h3>How to Observe</h3>
            <ul>
              ${event.whatToDo.map(action => `<li>${action}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        

      </div>
    `;
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

    this.showModal(`${monthData.name} (${monthData.roman})`, content);
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
    this.renderCalendar();
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

  showView(viewName) {
    // Update navigation buttons
    this.elements.navButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-view="${viewName}"]`)?.classList.add('active');

    // Update views
    this.elements.views.forEach(view => view.classList.remove('active'));
    document.getElementById(`${viewName}View`)?.classList.add('active');

    this.currentView = viewName;

    // Render specific view content
    if (viewName === 'calendar') {
      this.renderCalendar();
    } else if (viewName === 'upcoming') {
      this.renderUpcomingEvents();
    } else if (viewName === 'months') {
      this.renderMonthsView();
    }
  }

  /**
   * Modal functions
   */
  showModal(title, content) {
    // Create modal if it doesn't exist
    if (!this.modal) {
      this.createModal();
    }

    const modalTitle = this.modal.querySelector('.modal-title');
    const modalBody = this.modal.querySelector('.modal-body');

    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = content;

    this.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (this.modal) {
      this.modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }

  createModal() {
    this.modal = this.createElement('div', 'modal');
    this.modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title"></h2>
          <span class="modal-close">&times;</span>
        </div>
        <div class="modal-body"></div>
      </div>
    `;

    document.body.appendChild(this.modal);

    // Add close event
    this.modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
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
    // Remove existing today highlights
    document.querySelectorAll('.calendar-day.today').forEach(day => {
      day.classList.remove('today');
    });

    // Add today highlight
    const today = new Date().toISOString().split('T')[0];
    const todayElement = document.querySelector(`[data-date="${today}"]`);
    if (todayElement) {
      todayElement.classList.add('today');
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
        this.closeModal();
        break;
    }
  }

  /**
   * Responsive and accessibility features
   */
  handleResize() {
    // Adjust layout for mobile
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('mobile-layout', isMobile);
  }

  /**
   * Initialize responsive handler
   */
  initResponsive() {
    window.addEventListener('resize', () => this.handleResize());
    this.handleResize(); // Initial check
  }
}

// ===== GLOBAL EXPOSURE =====
// Make sure HinduCalendarUI is available globally
window.HinduCalendarUI = HinduCalendarUI;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HinduCalendarUI;
} 