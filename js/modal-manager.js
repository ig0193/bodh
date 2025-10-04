/**
 * Modal Manager - Handles all modal interactions and content generation
 * Extracted from ui-manager.js for better code organization
 */

class ModalManager {
  constructor(uiManager) {
    this.uiManager = uiManager;
    this.modal = null;
    
    // Multi-event modal state
    this.currentEventIndex = 0;
    this.dayEvents = [];
    this.modalDayData = null;
  }

  /**
   * Show a modal with title and content
   */
  showModal(title, content) {
    // Create modal if it doesn't exist
    if (!this.modal) {
      this.createModal();
    }

    const modalHeader = this.modal.querySelector('.modal-header');
    const modalTitle = modalHeader.querySelector('.modal-title');
    const modalBody = this.modal.querySelector('.modal-body');

    // Clear previous dynamic content from header (like nav dots)
    const oldNav = modalHeader.querySelector('.modal-header-dots');
    if (oldNav) {
      oldNav.remove();
    }

    if (modalTitle) modalTitle.textContent = title;
    if (modalBody) modalBody.innerHTML = content;

    this.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close modal
   */
  closeModal() {
    if (this.modal) {
      this.modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }

  /**
   * Create modal DOM structure
   */
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
   * Show detailed information for a day
   */
  
  showDayDetails(dayData) {
    const { date, events } = dayData;
    
    if (!events || events.length === 0) {
      // No events - show basic day info (keep old format for regular days)
      const content = this.createDetailContent(dayData);
      this.showModal('Day Details', content);
      return;
    }
    
    if (events.length === 1) {
      // Single event - use unified modal
      const event = events[0];
      const eventData = {
        ...event,
        date: date,
        dateObj: date
      };
      const content = this.createUnifiedEventModal(eventData);
      const modalTitle = `${event.roman || event.english || event.name || 'Event Details'}`;
      this.showModal(modalTitle, content);
      return;
    }
    
    // Multiple events - use swipe modal
    this.showMultiEventModal(dayData);
  }

  /**
   * Show multi-event swipe modal for multiple events on same day
   */
  showMultiEventModal(dayData) {
    const { date, events } = dayData;
    
    // Create modal if it doesn't exist
    if (!this.modal) {
      this.createModal();
    }
    
    // Set up multi-event modal
    this.currentEventIndex = 0;
    this.dayEvents = events;
    this.modalDayData = dayData;
    
    // Create swipe modal content
    const content = this.createMultiEventContent();
    
    // Show modal with date as title
    const dateStr = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    this.showModal(dateStr, content);
    
    // Add navigation dots to modal header
    this.addDotsToModalHeader();
    
    // Set up swipe gestures
    this.setupSwipeGestures();
    
    // Ensure initial state is properly displayed
    this.updateMultiEventModal();
  }

  /**
   * Add navigation dots to modal header
   */
  addDotsToModalHeader() {
    const modalHeader = document.querySelector('.modal-header');
    if (!modalHeader) return;
    
    // Clear any existing dots and reset header state
    const existingDots = modalHeader.querySelector('.modal-header-dots');
    if (existingDots) {
      existingDots.remove();
    }
    modalHeader.classList.remove('multi-event-header');
    
    // Only show dots if there are multiple events (2 or more)
    if (!this.dayEvents || this.dayEvents.length <= 1) return;
    
    // Create dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'modal-header-dots';
    
    // Create dots
    const dotsHTML = this.dayEvents.map((_, index) => 
      `<div class="dot ${index === this.currentEventIndex ? 'active' : ''}" data-index="${index}"></div>`
    ).join('');
    
    dotsContainer.innerHTML = `<div class="event-dots">${dotsHTML}</div>`;
    
    // Add dots as a separate element in the header, not inside the title
    modalHeader.appendChild(dotsContainer);
    
    // Add class to modal header to identify multi-event modal
    modalHeader.classList.add('multi-event-header');
  }

  /**
   * Create content for multi-event modal with swipe functionality
   */
  createMultiEventContent() {
    const currentEvent = this.dayEvents[this.currentEventIndex];
    const totalEvents = this.dayEvents.length;
    
    // Create slider container
    const content = `
      <div class="multi-event-modal">
        <!-- Swipeable content area -->
        <div class="swipe-container" id="swipeContainer">
          <div class="swipe-wrapper" id="swipeWrapper" style="transform: translateX(-${this.currentEventIndex * 100}%)">
            ${this.dayEvents.map((event, index) => `
              <div class="swipe-slide">
                ${this.createSingleEventContent(event, this.modalDayData)}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    
    return content;
  }

  /**
   * Create content for a single event (similar to existing createDetailContent but for one event)
   */
  createSingleEventContent(event, dayData) {
    const { date } = dayData;
    
    // Use the unified modal content for consistency
    const eventData = {
      ...event,
      date: date,
      dateObj: date
    };
    
    return this.createUnifiedEventModal(eventData);
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
            <h4>Usual Practices (प्रथाएँ)</h4>
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
          
          ${occasion.fasting ? `
            <div class="fasting-rules">
              <h4>Fasting Rules (व्रत नियम)</h4>
              <p>${occasion.fasting}</p>
            </div>
          ` : ''}
          
          ${occasion.storyBrief ? `
            <div class="story-brief">
              <h4>Brief Story</h4>
              <p>${occasion.storyBrief}</p>
            </div>
          ` : ''}
        </div>
      `;
    }

    content += '</div>';
    return content;
  }

  /**
   * Create festival content for single event modal
   */
  createFestivalContent(festival) {
    return `
      <div class="festival-content">
        <div class="festival-meta">
          <div class="festival-type">${festival.type || 'Festival'}</div>
          ${festival.fasting ? '<div class="fasting-indicator">🚫 Fasting Day</div>' : ''}
        </div>
        
        ${festival.whatToDo && Array.isArray(festival.whatToDo) ? `
          <div class="what-to-do">
            <h4>How to Observe (क्या करें)</h4>
            <ul>
              ${festival.whatToDo.map(action => `<li>${action}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Create ekadashi content for single event modal
   */
  createEkadashiContent(ekadashi) {
    return `
      <div class="ekadashi-content">
        <div class="ekadashi-meta">
          <div class="ekadashi-type">${ekadashi.type || 'Ekadashi'}</div>
          <div class="fasting-indicator">🚫 Fasting Day</div>
        </div>
        
        ${ekadashi.whatToDo && Array.isArray(ekadashi.whatToDo) ? `
          <div class="what-to-do">
            <h4>How to Observe (क्या करें)</h4>
            <ul>
              ${ekadashi.whatToDo.map(action => `<li>${action}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${ekadashi.significance ? `
          <div class="ekadashi-significance">
            <h4>Spiritual Benefits</h4>
            <p>${ekadashi.significance}</p>
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Create additional information section from event data
   * Data-driven approach - automatically adapts to new fields
   */
  createAdditionalInfoSection(eventData) {
    const { additionalInfo } = eventData;
    
    // If no additionalInfo array, return empty string
    if (!additionalInfo || !Array.isArray(additionalInfo) || additionalInfo.length === 0) {
      return '';
    }
    
    // Generate HTML for info items
    const itemsHtml = additionalInfo.map(item => {
      const { label, value, type = "text" } = item;
      
      // Handle different value types
      if (type === "mantra") {
        return `
          <div class="info-item mantra-item">
            <strong>${label}:</strong>
            <span class="mantra-text-inline">${value}</span>
          </div>
        `;
      } else if (type === "tags" && Array.isArray(value)) {
        return `
          <div class="info-item info-item-full">
            <strong>${label}:</strong>
            <div class="tags-list-inline">
              ${value.map(tag => `<span class="info-tag">${tag}</span>`).join('')}
            </div>
          </div>
        `;
      } else {
        // Regular text item
        return `<div class="info-item"><strong>${label}:</strong> ${value}</div>`;
      }
    }).join('');
    
    return `
      <div class="detail-section additional-info">
        <h3><i class="fas fa-info-circle"></i> Additional Information</h3>
        <div class="info-grid">
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  /**
   * Create unified event modal content with image support
   * Works for festivals, ekadashi, and calendar events
   */
  createUnifiedEventModal(eventData) {
    const { 
      date, 
      dateObj,
      name, 
      english, 
      roman, 
      image,
      type,
      significance,
      mythology,
      whatToDo,
      foods,
      colors,
      mantra,
      deity,
      duration,
      category,
      // Ekadashi-specific
      paksha,
      month,
      startTime,
      endTime,
      fasting,
      benefits,
      storyBrief,
      warning,
      source
    } = eventData;

    // Determine date string
    let dateStr;
    if (dateObj) {
      const dateObject = dateObj instanceof Date ? dateObj : new Date(dateObj);
      dateStr = dateObject.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else if (date) {
      const dateObject = date instanceof Date ? date : new Date(date);
      dateStr = dateObject.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } else {
      dateStr = 'Date not available';
    }

    // Determine if this is an Ekadashi
    const isEkadashi = type === 'ekadashi' || source === 'ekadashi';

    return `
      <div class="unified-event-modal">
        ${image ? `
          <div class="event-hero-image-modal">
            <img src="${image}" alt="${name || english || roman}" onerror="this.parentElement.style.display='none'">
          </div>
        ` : ''}
        
        <div class="event-modal-header">
          <div class="event-date-badge">${dateStr}</div>
          <h2 class="event-title">${name || roman || english || 'Event Details'}</h2>
          ${(english || roman) && name !== (english || roman) ? `
            <p class="event-subtitle">${english || roman || ''}</p>
          ` : ''}
        </div>
        
        <div class="event-modal-body">
          ${significance ? `
            <div class="detail-section">
              <h3><i class="fas fa-star"></i> Significance</h3>
              <p>${significance}</p>
            </div>
          ` : ''}
          
          ${mythology ? `
            <div class="detail-section">
              <h3><i class="fas fa-book-open"></i> Mythology</h3>
              <p>${mythology}</p>
            </div>
          ` : ''}
          
          ${whatToDo && whatToDo.length > 0 ? `
            <div class="detail-section">
              <h3><i class="fas fa-tasks"></i> What to Do</h3>
              <ul>
                ${whatToDo.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${this.createAdditionalInfoSection(eventData)}

          ${isEkadashi ? `
            <div class="detail-section ekadashi-specific">
              <h3><i class="fas fa-moon"></i> Ekadashi Details</h3>
              <div class="ekadashi-info">
                ${paksha ? `<p><strong>Paksha:</strong> ${paksha}</p>` : ''}
                ${month ? `<p><strong>Hindu Month:</strong> ${month}</p>` : ''}
                ${startTime ? `<p><strong>Start Time:</strong> ${startTime}</p>` : ''}
                ${endTime ? `<p><strong>End Time:</strong> ${endTime}</p>` : ''}
                ${fasting ? `<p><strong>Fasting:</strong> ${fasting}</p>` : ''}
                ${benefits ? `<p><strong>Benefits:</strong> ${benefits}</p>` : ''}
                ${storyBrief ? `<p><strong>Story:</strong> ${storyBrief}</p>` : ''}
                ${warning ? `<p class="warning"><strong>⚠️ Note:</strong> ${warning}</p>` : ''}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  /**
   * Setup swipe gestures for multi-event modal
   */
  setupSwipeGestures() {
    const swipeContainer = document.getElementById('swipeContainer');
    const dots = document.querySelectorAll('.dot');
    
    if (!swipeContainer) return;
    
    // Touch event variables
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    let isSwipe = false;
    
    // Touch start
    swipeContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      currentX = startX;
      currentY = startY;
      isDragging = true;
      isSwipe = false;
    });
    
    // Touch move
    swipeContainer.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      
      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;
      
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      
      // Determine if this is a horizontal swipe
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        isSwipe = true;
        e.preventDefault(); // Prevent scrolling
      }
    });
    
    // Touch end
    swipeContainer.addEventListener('touchend', (e) => {
      if (!isDragging || !isSwipe) {
        isDragging = false;
        return;
      }
      
      const deltaX = currentX - startX;
      const threshold = 50; // Minimum swipe distance
      
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          // Swipe right - go to previous event
          this.prevEvent();
        } else {
          // Swipe left - go to next event
          this.nextEvent();
        }
      }
      
      isDragging = false;
      isSwipe = false;
    });
    
    // Click handlers for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToEvent(index);
      });
    });
  }

  /**
   * Navigate to previous event
   */
  prevEvent() {
    if (this.currentEventIndex > 0) {
      this.currentEventIndex--;
      this.updateMultiEventModal();
    }
  }

  /**
   * Navigate to next event
   */
  nextEvent() {
    if (this.currentEventIndex < this.dayEvents.length - 1) {
      this.currentEventIndex++;
      this.updateMultiEventModal();
    }
  }

  /**
   * Navigate to specific event by index
   */
  goToEvent(index) {
    if (index >= 0 && index < this.dayEvents.length) {
      this.currentEventIndex = index;
      this.updateMultiEventModal();
    }
  }

  /**
   * Update multi-event modal content and indicators
   */
  updateMultiEventModal() {
    const swipeWrapper = document.getElementById('swipeWrapper');
    const dots = document.querySelectorAll('.dot');
    
    if (swipeWrapper) {
      // Update transform to show current event
      swipeWrapper.style.transform = `translateX(-${this.currentEventIndex * 100}%)`;
    }
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentEventIndex);
    });
  }

  /**
   * Utility function to create DOM elements
   */
  createElement(tag, className = '', content = '') {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ModalManager;
}

// Make available globally
window.ModalManager = ModalManager;