/**
 * Festivals Manager - Handles festivals view with integrated search
 * Provides comprehensive festival and Ekadashi management for the Hindu Calendar
 */

class FestivalsManager {
  constructor(uiManager) {
    this.ui = uiManager;
    this.allFestivals = [];
    this.filteredFestivals = [];
    this.elements = {};
    
    // Bind methods to preserve context
    this.initializeFestivalsSearch = this.initializeFestivalsSearch.bind(this);
    this.loadAllFestivals = this.loadAllFestivals.bind(this);
    this.filterFestivals = this.filterFestivals.bind(this);
    this.renderFestivalsList = this.renderFestivalsList.bind(this);
    this.showFestivalDetails = this.showFestivalDetails.bind(this);
  }

  /**
   * Initialize festivals view
   */
  init() {
    this.cacheElements();
    this.initializeFestivalsSearch();
    this.loadAllFestivals();
  }

  /**
   * Cache DOM elements for festivals view
   */
  cacheElements() {
    this.elements = {
      searchInput: document.getElementById('festivalsSearchInput'),
      clearBtn: document.getElementById('clearSearchBtn'),
      monthFilter: document.getElementById('monthFilter'),
      typeFilter: document.getElementById('typeFilter'),
      resetBtn: document.getElementById('resetFiltersBtn'),
      festivalsContainer: document.getElementById('festivalsContent'),
      summaryContainer: document.getElementById('festivalsSummary')
    };
  }

  /**
   * Initialize festivals search functionality
   */
  initializeFestivalsSearch() {
    const { searchInput, clearBtn, monthFilter, typeFilter, resetBtn } = this.elements;
    if (!searchInput) return;

    // Search functionality
    const performSearch = () => {
      const query = searchInput.value.toLowerCase().trim();
      const month = monthFilter.value;
      const type = typeFilter.value;
      this.filterFestivals(query, month, type);
    };

    // Real-time search
    searchInput.addEventListener('input', performSearch);
    monthFilter.addEventListener('change', performSearch);
    typeFilter.addEventListener('change', performSearch);

    // Clear search
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      monthFilter.value = '';
      typeFilter.value = '';
      clearBtn.style.display = 'none';
      this.loadAllFestivals();
    });

    // Reset all filters
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        searchInput.value = '';
        monthFilter.value = '';
        typeFilter.value = '';
        clearBtn.style.display = 'none';
        this.loadAllFestivals();
      });
    }

    // Show/hide clear button
    searchInput.addEventListener('input', () => {
      clearBtn.style.display = searchInput.value.trim() ? 'inline-block' : 'none';
    });
  }

  /**
   * Load all festivals for 2025
   */
  loadAllFestivals() {
    const { festivalsContainer, summaryContainer } = this.elements;
    if (!festivalsContainer) return;

    // Get current year (2025)
    const currentYear = new Date().getFullYear();
    const isCurrentYear = currentYear === 2025;

    // Combine festivals and ekadashi data
    this.allFestivals = this.getAllFestivalsData();
    
    if (this.allFestivals.length === 0) {
      festivalsContainer.innerHTML = `
        <div class="no-festivals">
          <i class="fas fa-calendar-times"></i>
          <h3>No festivals data available</h3>
          <p>Festival data for ${currentYear} is not available yet.</p>
        </div>
      `;
      return;
    }

    // Store filtered festivals and render
    this.filteredFestivals = [...this.allFestivals];
    this.renderFestivalsList(this.filteredFestivals, festivalsContainer);
  }

  /**
   * Get all festivals data from different sources
   */
  getAllFestivalsData() {
    const festivals = [];
    
    // Add festivals from FESTIVALS_2025
    if (window.FESTIVALS_2025) {
      for (const [date, festivalData] of Object.entries(window.FESTIVALS_2025)) {
        if (Array.isArray(festivalData)) {
          festivalData.forEach(festival => {
            festivals.push({
              date: date,
              dateObj: new Date(date),
              source: 'festivals',
              ...festival
            });
          });
        } else {
          festivals.push({
            date: date,
            dateObj: new Date(date),
            source: 'festivals',
            ...festivalData
          });
        }
      }
    }

    // Add Ekadashi from EKADASHI_2025
    if (window.EKADASHI_2025) {
      for (const [date, ekadashiData] of Object.entries(window.EKADASHI_2025)) {
        festivals.push({
          date: date,
          dateObj: new Date(date),
          source: 'ekadashi',
          type: 'ekadashi',
          category: 'Ekadashi',
          ...ekadashiData
        });
      }
    }

    // Sort by date
    return festivals.sort((a, b) => a.dateObj - b.dateObj);
  }

  /**
   * Filter festivals based on search query and filters
   */
  filterFestivals(query, month, type) {
    let filtered = [...this.allFestivals];

    // Apply text search
    if (query) {
      filtered = filtered.filter(festival => {
        return (
          festival.name.toLowerCase().includes(query) ||
          (festival.english && festival.english.toLowerCase().includes(query)) ||
          (festival.roman && festival.roman.toLowerCase().includes(query)) ||
          (festival.significance && festival.significance.toLowerCase().includes(query)) ||
          (festival.category && festival.category.toLowerCase().includes(query))
        );
      });
    }

    // Apply month filter
    if (month) {
      filtered = filtered.filter(festival => {
        return festival.dateObj.getMonth() + 1 === parseInt(month);
      });
    }

    // Apply type filter
    if (type) {
      filtered = filtered.filter(festival => {
        return festival.type === type || festival.source === type;
      });
    }

    // Store filtered results
    this.filteredFestivals = filtered;

    // Update UI
    const { festivalsContainer, summaryContainer } = this.elements;
    
    if (summaryContainer) {
      const totalCount = this.allFestivals.length;
      const filteredCount = filtered.length;
      summaryContainer.innerHTML = `
        <span class="results-count">
          ${filteredCount} of ${totalCount} festivals
          ${query ? `matching "${query}"` : ''}
        </span>
      `;
    }

    if (filtered.length === 0) {
      festivalsContainer.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <h3>No festivals found</h3>
          <p>Try adjusting your search terms or filters.</p>
        </div>
      `;
    } else {
      this.renderFestivalsList(filtered, festivalsContainer);
    }
  }

  /**
   * Render festivals list
   */
  renderFestivalsList(festivals, container) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Group festivals by month
    const groupedFestivals = {};
    festivals.forEach(festival => {
      const month = festival.dateObj.getMonth();
      const monthName = monthNames[month];
      if (!groupedFestivals[monthName]) {
        groupedFestivals[monthName] = [];
      }
      groupedFestivals[monthName].push(festival);
    });

    let html = '';
    for (const [monthName, monthFestivals] of Object.entries(groupedFestivals)) {
      const monthId = monthName.toLowerCase().replace(' ', '-');
      html += `
        <div class="month-section">
          <h3 class="month-header collapsible" data-month="${monthId}">
            <div class="month-header-content">
              <i class="fas fa-calendar-alt"></i>
              <span class="month-title">${monthName} 2025</span>
              <span class="month-count">(${monthFestivals.length})</span>
            </div>
            <i class="fas fa-chevron-down collapse-arrow"></i>
          </h3>
          <div class="festivals-grid" id="festivals-${monthId}">
            ${monthFestivals.map(festival => this.renderFestivalCard(festival)).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;

    // Add click events for festival cards
    container.querySelectorAll('.festival-card').forEach(card => {
      card.addEventListener('click', () => {
        const festivalData = JSON.parse(card.dataset.festival);
        this.showFestivalDetails(festivalData);
      });
    });

    // Add click events for collapsible month headers
    container.querySelectorAll('.month-header.collapsible').forEach(header => {
      header.addEventListener('click', () => {
        const monthId = header.dataset.month;
        const festivalsGrid = document.getElementById(`festivals-${monthId}`);
        const arrow = header.querySelector('.collapse-arrow');
        
        if (festivalsGrid.style.display === 'none') {
          festivalsGrid.style.display = 'grid';
          arrow.classList.remove('fa-chevron-right');
          arrow.classList.add('fa-chevron-down');
          header.classList.remove('collapsed');
        } else {
          festivalsGrid.style.display = 'none';
          arrow.classList.remove('fa-chevron-down');
          arrow.classList.add('fa-chevron-right');
          header.classList.add('collapsed');
        }
      });
    });
  }

  /**
   * Render individual festival card
   */
  renderFestivalCard(festival) {
    const dayName = festival.dateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const date = festival.dateObj.getDate();
    
    const typeClass = festival.source === 'ekadashi' ? 'ekadashi' : festival.type || 'festival';
    const cardClass = `festival-card ${typeClass}`;

    return `
      <div class="${cardClass}" data-festival='${JSON.stringify(festival)}'>
        <div class="festival-date">
          <div class="date-day">${date}</div>
          <div class="date-weekday">${dayName}</div>
        </div>
        <div class="festival-info">
          <h4 class="festival-name">${festival.name}</h4>
          <p class="festival-english">${festival.english || festival.roman || ''}</p>
        </div>
      </div>
    `;
  }

  /**
   * Get category icon
   */
  getCategoryIcon(category) {
    const iconMap = {
      'ekadashi': 'fa-moon',
      'Ekadashi': 'fa-moon',
      'Solar Festival': 'fa-sun',
      'Knowledge Festival': 'fa-book',
      'Shiva Festival': 'fa-om',
      'Spring Festival': 'fa-seedling',
      'New Year Festival': 'fa-calendar-plus',
      'Vishnu Avatar Festival': 'fa-hands-praying',
      'Hanuman Festival': 'fa-mountain',
      'Prosperity Festival': 'fa-coins',
      'Buddhist Festival': 'fa-dharmachakra',
      'Spiritual Festival': 'fa-praying-hands',
      'Snake Festival': 'fa-snake',
      'Family Festival': 'fa-users',
      'Victory Festival': 'fa-trophy',
      'Light Festival': 'fa-lightbulb',
      'Sikh Festival': 'fa-book-open',
      'Scripture Festival': 'fa-scroll',
      default: 'fa-star'
    };
    return iconMap[category] || iconMap.default;
  }

  /**
   * Show festival details in modal
   */
  showFestivalDetails(festival) {
    const dateStr = festival.dateObj.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    let content = `
      <div class="festival-details-modal">
        <div class="festival-modal-header">
          <div class="festival-date-badge">${dateStr}</div>
          <h2 class="festival-title">${festival.name}</h2>
          <p class="festival-subtitle">${festival.english || festival.roman || ''}</p>
        </div>
        
        <div class="festival-modal-body">
          ${festival.significance ? `
            <div class="detail-section">
              <h3><i class="fas fa-star"></i> Significance</h3>
              <p>${festival.significance}</p>
            </div>
          ` : ''}
          
          ${festival.mythology ? `
            <div class="detail-section">
              <h3><i class="fas fa-book-open"></i> Mythology</h3>
              <p>${festival.mythology}</p>
            </div>
          ` : ''}
          
          ${festival.whatToDo && festival.whatToDo.length > 0 ? `
            <div class="detail-section">
              <h3><i class="fas fa-tasks"></i> What to Do</h3>
              <ul>
                ${festival.whatToDo.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${festival.foods && festival.foods.length > 0 ? `
            <div class="detail-section">
              <h3><i class="fas fa-utensils"></i> Traditional Foods</h3>
              <div class="foods-list">
                ${festival.foods.map(food => `<span class="food-tag">${food}</span>`).join('')}
              </div>
            </div>
          ` : ''}
          
          ${festival.colors && festival.colors.length > 0 ? `
            <div class="detail-section">
              <h3><i class="fas fa-palette"></i> Colors</h3>
              <div class="colors-list">
                ${festival.colors.map(color => `<span class="color-tag">${color}</span>`).join('')}
              </div>
            </div>
          ` : ''}
          
          ${festival.mantra ? `
            <div class="detail-section">
              <h3><i class="fas fa-om"></i> Mantra</h3>
              <p class="mantra-text">${festival.mantra}</p>
            </div>
          ` : ''}
          
          ${festival.deity ? `
            <div class="detail-section">
              <h3><i class="fas fa-hands-praying"></i> Deity</h3>
              <p>${festival.deity}</p>
            </div>
          ` : ''}
          
          ${festival.duration ? `
            <div class="detail-section">
              <h3><i class="fas fa-clock"></i> Duration</h3>
              <p>${festival.duration}</p>
            </div>
          ` : ''}

          ${festival.source === 'ekadashi' ? `
            <div class="detail-section ekadashi-specific">
              <h3><i class="fas fa-moon"></i> Ekadashi Details</h3>
              <div class="ekadashi-info">
                ${festival.paksha ? `<p><strong>Paksha:</strong> ${festival.paksha}</p>` : ''}
                ${festival.month ? `<p><strong>Hindu Month:</strong> ${festival.month}</p>` : ''}
                ${festival.startTime ? `<p><strong>Start Time:</strong> ${festival.startTime}</p>` : ''}
                ${festival.endTime ? `<p><strong>End Time:</strong> ${festival.endTime}</p>` : ''}
                ${festival.fasting ? `<p><strong>Fasting:</strong> ${festival.fasting}</p>` : ''}
                ${festival.benefits ? `<p><strong>Benefits:</strong> ${festival.benefits}</p>` : ''}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    if (this.ui && this.ui.modalManager) {
      this.ui.modalManager.showModal(festival.name, content);
    }
  }

  /**
   * Check if date is today
   */
  isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  /**
   * Truncate text to specified length
   */
  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  /**
   * Get filtered festivals (for external access)
   */
  getFilteredFestivals() {
    return this.filteredFestivals;
  }

  /**
   * Get all festivals (for external access)
   */
  getAllFestivals() {
    return this.allFestivals;
  }

  /**
   * Refresh festivals data
   */
  refresh() {
    this.loadAllFestivals();
  }

  /**
   * Cleanup method
   */
  destroy() {
    // Remove event listeners if needed
    const { searchInput, searchBtn, clearBtn, monthFilter, typeFilter } = this.elements;
    
    if (searchInput) {
      searchInput.removeEventListener('input', this.filterFestivals);
      searchInput.removeEventListener('keypress', this.filterFestivals);
    }
    if (searchBtn) searchBtn.removeEventListener('click', this.filterFestivals);
    if (clearBtn) clearBtn.removeEventListener('click', this.loadAllFestivals);
    if (monthFilter) monthFilter.removeEventListener('change', this.filterFestivals);
    if (typeFilter) typeFilter.removeEventListener('change', this.filterFestivals);

    // Clear references
    this.ui = null;
    this.allFestivals = [];
    this.filteredFestivals = [];
    this.elements = {};
  }
}

// ===== GLOBAL EXPOSURE =====
window.FestivalsManager = FestivalsManager;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FestivalsManager;
}