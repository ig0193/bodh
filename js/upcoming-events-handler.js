/**
 * Upcoming Events Handler - Manages upcoming events view and interactions
 * Extracted from ui-manager.js for better code organization
 */

class UpcomingEventsHandler {
  constructor(elements, uiManager) {
    this.elements = elements;
    this.uiManager = uiManager;
    this.engine = uiManager.engine;
    this.modalManager = uiManager.modalManager;
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
          <h4 class="section-title">Within Week</h4>
          <div class="events-list">
            ${thisWeek.length > 0 ? 
              thisWeek.map(event => this.createEventItemHTML(event)).join('') :
              '<div class="empty-state">No sacred occasions this week</div>'
            }
          </div>
        </div>
        
        <div class="events-section">
          <h4 class="section-title">Within Month</h4>
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
        const eventType = item.dataset.type;
        // Find the specific event that matches both date and type
        const event = upcoming.find(e => e.date === date && e.type === eventType);
        if (event) {
          this.showEventDetailsAsDay(event);
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
    
    // Check if event has an image
    const hasImage = event.image && event.image.trim() !== '';
    
    return `
      <div class="event-wrapper ${hasImage ? 'with-image' : ''}">
        ${hasImage ? `
          <div class="event-hero-image">
            <img src="${event.image}" alt="${event.name}" onerror="this.style.display='none'">
          </div>
        ` : ''}
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
      </div>
    `;
  }

  /**
   * Filter upcoming events by type
   */
  filterUpcomingEvents(filter) {
    const eventWrappers = this.elements.upcomingEvents.querySelectorAll('.event-wrapper');
    
    eventWrappers.forEach(wrapper => {
      const eventItem = wrapper.querySelector('.event-item');
      if (eventItem) {
        const itemType = eventItem.dataset.type;
        if (filter === 'all' || itemType === filter) {
          wrapper.style.display = 'flex';
        } else {
          wrapper.style.display = 'none';
        }
      }
    });
  }

  /**
   * Show event details using the same modal format as calendar day details
   */
  showEventDetailsAsDay(event) {
    // Create dayData structure that matches calendar format for single event
    const eventDate = new Date(event.date);
    const convertedEvent = this.convertEventToCalendarFormat(event);
    
    const dayData = {
      date: eventDate,
      day: eventDate.getDate(),
      dateString: event.date,
      isCurrentMonth: true,
      isToday: this.isToday(eventDate),
      // New format (events array)
      events: [convertedEvent],
      // Legacy format (for createDetailContent method compatibility)
      occasion: convertedEvent,
      occasionType: convertedEvent.type,
      significance: event.significance || 'A sacred day in the Hindu calendar.',
      hinduMonth: this.getHinduMonthForDate(eventDate)
    };

    // Use the modal manager's showDayDetails method for consistency
    this.modalManager.showDayDetails(dayData);
  }

  /**
   * Convert upcoming event format to calendar event format
   */
  convertEventToCalendarFormat(event) {
    return {
      // Basic identification
      type: event.type,
      name: event.name,
      roman: event.roman,
      hindi: event.hindi || event.name,
      english: event.english,
      
      // Core information
      significance: event.significance,
      whatToDo: event.whatToDo,
      importance: event.importance || 'major',
      
      // Festival-specific fields
      category: event.category,
      mythology: event.mythology,
      deity: event.deity,
      mantra: event.mantra,
      foods: event.foods,
      colors: event.colors,
      duration: event.duration,
      
      // Ekadashi-specific fields  
      paksha: event.paksha,
      month: event.month,
      story: event.story,
      storyBrief: event.storyBrief || event.story,
      fasting: event.fasting,
      benefits: event.benefits,
      warning: event.warning
    };
  }


  /**
   * Check if a date is today
   */
  isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  /**
   * Get Hindu month for a date (simplified version)
   */
  getHinduMonthForDate(date) {
    // Use the engine to get Hindu month if available
    if (this.engine && this.engine.getHinduMonthForDate) {
      return this.engine.getHinduMonthForDate(date);
    }
    
    // Fallback to basic month info
    return {
      name: 'माह',
      roman: 'Month'
    };
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UpcomingEventsHandler;
}

// Make available globally
window.UpcomingEventsHandler = UpcomingEventsHandler;