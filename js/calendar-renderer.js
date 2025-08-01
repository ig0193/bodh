/**
 * Calendar Renderer - Handles calendar grid rendering and day elements
 * Extracted from ui-manager.js for better code organization
 */

class CalendarRenderer {
  constructor(elements, uiManager) {
    this.elements = elements;
    this.uiManager = uiManager;
    this.engine = uiManager.engine;
  }

  /**
   * Render main calendar view
   */
  renderCalendar() {
    const calendarData = this.engine.generateCalendarData();
    
    this.renderCalendarHeader(calendarData);
    this.renderCalendarGrid();
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
  renderCalendarGrid() {
    const calendarGrid = this.elements.calendarGrid;
    calendarGrid.innerHTML = '';

    const isMobile = window.innerWidth <= 768;
    calendarGrid.classList.toggle('mobile-grid', isMobile);

    const calendarData = this.engine.generateCalendarData();
    if (!calendarData || !calendarData.days) {
      console.error("Failed to generate calendar data. Aborting render.");
      return;
    }

    let daysToRender = calendarData.days;

    if (isMobile) {
      const currentMonthDays = calendarData.days.filter(d => d.isCurrentMonth);

      const lastDayOfMonth = currentMonthDays.length > 0 ? currentMonthDays[currentMonthDays.length - 1].date : new Date(this.engine.currentYear, this.engine.currentMonth + 1, 0);
      const nextMonthDate = new Date(lastDayOfMonth);
      nextMonthDate.setDate(nextMonthDate.getDate() + 1);
      const nextMonth = nextMonthDate.getMonth();
      const nextYear = nextMonthDate.getFullYear();

      const paddingNeeded = 32 - currentMonthDays.length;
      
      const paddingDays = [];
      if (paddingNeeded > 0) {
        for (let i = 1; i <= paddingNeeded; i++) {
          const dayData = this.engine.createDayData(nextYear, nextMonth, i);
          dayData.isCurrentMonth = false;
          dayData.isOtherMonth = true;
          paddingDays.push(dayData);
        }
      }
      
      daysToRender = [...currentMonthDays, ...paddingDays];

    } else {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      dayNames.forEach(day => {
        const headerCell = document.createElement('div');
        headerCell.className = 'day-header';
        headerCell.textContent = day;
        calendarGrid.appendChild(headerCell);
      });
    }

    daysToRender.forEach((dayData, index) => {
      if (dayData) {
        const dayElement = this.createDayElement(dayData);
        calendarGrid.appendChild(dayElement);
      }
    });
  }

  /**
   * Create a day element for the calendar grid
   */
  createDayElement(dayData) {
    const dayElement = document.createElement('div');

    if (!dayData || dayData.isEmpty) {
      dayElement.className = 'day empty';
      return dayElement;
    }

    const { date, day, isCurrentMonth, isToday, occasion, occasionType, events } = dayData;
    
    dayElement.className = 'day';
    dayElement.setAttribute('data-date', dayData.dateString);
    dayElement.setAttribute('role', 'gridcell');
    dayElement.setAttribute('tabindex', '0');
    
    // Add classes based on day properties
    if (!isCurrentMonth) dayElement.classList.add('other-month');
    if (isToday) dayElement.classList.add('today');
    
    // Multiple events styling
    if (events && events.length > 0) {
      dayElement.classList.add('has-occasion');
      
      // Add classes for all event types present
      const hasFestival = events.some(e => e.type === 'festival');
      const hasEkadashi = events.some(e => e.type === 'ekadashi');
      
      if (hasFestival) dayElement.classList.add('festival-day');
      if (hasEkadashi) dayElement.classList.add('ekadashi-day');
      
      // Add major festival class if any festival is major
      if (events.some(e => e.type === 'festival' && e.importance === 'major')) {
        dayElement.classList.add('festival-major');
      }
      
      // Add multi-event class for styling
      if (events.length > 1) {
        dayElement.classList.add('has-multiple-events');
      }
    }
    
    // Get day name for mobile layout
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = dayNames[date.getDay()];
    
    // Create day content
    const dayContent = document.createElement('div');
    dayContent.className = 'day-content';
    
    // Add day name (always visible on mobile)
    const dayNameElement = document.createElement('div');
    dayNameElement.className = 'day-name';
    dayNameElement.textContent = dayName;
    dayContent.appendChild(dayNameElement);
    
    // Add day number
    const dayNumberElement = document.createElement('div');
    dayNumberElement.className = 'day-number';
    dayNumberElement.textContent = day;
    dayContent.appendChild(dayNumberElement);
    
    // Add multiple event indicators
    if (events && events.length > 0) {
      const eventsContainer = document.createElement('div');
      eventsContainer.className = 'events-container';
      
      // Show up to 2-3 events, with overflow indicator
      const maxVisible = 4;
      const visibleEvents = events.slice(0, maxVisible);
      
      visibleEvents.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = `occasion-indicator ${event.type === 'festival' ? 'festival-major' : 'ekadashi-indicator'}`;
        eventElement.textContent = this.getShortDisplayName(event, event.type);
        eventsContainer.appendChild(eventElement);
      });
      
      // Add overflow indicator if more events exist
      if (events.length > maxVisible) {
        const overflowElement = document.createElement('div');
        overflowElement.className = 'occasion-indicator overflow-indicator';
        overflowElement.textContent = `+${events.length - maxVisible}`;
        eventsContainer.appendChild(overflowElement);
      }
      
      dayContent.appendChild(eventsContainer);
    }
    
    dayElement.appendChild(dayContent);
    
    // Add click event
    dayElement.addEventListener('click', () => this.uiManager.modalManager.showDayDetails(dayData));
    dayElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.uiManager.modalManager.showDayDetails(dayData);
      }
    });
    
    return dayElement;
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
   * Render occasions list for a specific container
   */
  renderOccasionsList(calendarData, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Get current month's occasions
    const occasions = [];
    
    calendarData.days.forEach(dayData => {
      if (dayData.occasion && dayData.isCurrentMonth) {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = dayNames[dayData.date.getDay()];
        
        occasions.push({
          ...dayData.occasion,
          date: dayData.dateString,
          dayNumber: dayData.day,
          dayName: dayName,
          type: dayData.occasionType
        });
      }
    });

    if (occasions.length === 0) {
      container.innerHTML = `
        <div class="no-occasions">
          <p>No occasions this month</p>
        </div>
      `;
      return;
    }

    // Sort occasions by date
    occasions.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Create occasions HTML
    const occasionsHTML = occasions.map(occasion => `
      <div class="occasion-item ${occasion.type === 'festival' ? 'festival' : 'ekadashi'}">
        <div class="occasion-info">
          <div class="occasion-name">${occasion.name || occasion.hindi || occasion.roman}</div>
          <div class="occasion-roman">${occasion.roman || occasion.english || ''}</div>
          <div class="occasion-date">${occasion.dayName} ${occasion.dayNumber}</div>
        </div>
        <div class="occasion-type-badge ${occasion.type === 'festival' ? 'festival' : 'ekadashi'}">
          ${occasion.type === 'festival' ? '🎉' : '🙏'}
        </div>
      </div>
    `).join('');

    container.innerHTML = occasionsHTML;
  }

  /**
   * Render occasions sidebar with current month's festivals and events
   */
  renderOccasionsSidebar(calendarData) {
    this.renderOccasionsList(calendarData, 'occasionsList');
  }

  /**
   * Update today highlight
   */
  updateTodayHighlight() {
    // Remove existing today highlights
    document.querySelectorAll('.day.today').forEach(day => {
      day.classList.remove('today');
    });

    // Add today highlight
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
    const todayElement = document.querySelector(`.day[data-date="${today}"]`);
    if (todayElement) {
      todayElement.classList.add('today');
    }
  }

  /**
   * Handle responsive calendar grid
   */
  handleResize() {
    // Adjust layout for mobile
    const isMobile = window.innerWidth < 768;
    document.body.classList.toggle('mobile-layout', isMobile);
    
    // Update calendar grid for mobile
    if (this.elements.calendarGrid) {
      const wasMobile = this.elements.calendarGrid.classList.contains('mobile-grid');
      if (isMobile && !wasMobile) {
        // Switching to mobile - re-render grid
        this.renderCalendar();
      } else if (!isMobile && wasMobile) {
        // Switching to desktop - re-render grid
        this.renderCalendar();
      } else if (isMobile) {
        this.elements.calendarGrid.classList.add('mobile-grid');
      } else {
        this.elements.calendarGrid.classList.remove('mobile-grid');
      }
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CalendarRenderer;
}

// Make available globally
window.CalendarRenderer = CalendarRenderer;