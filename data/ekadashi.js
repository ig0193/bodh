/**
 * Ekadashi Data Manager - Unified loader with prefetch
 * Dynamically loads Ekadashi data from JSON files for supported years
 */

class EkadashiDataManager {
  constructor() {
    this.data = {}; // { 2024: {...}, 2025: {...} }
    this.dataReady = false;
    this.prefetchPromise = null;
    this.supportedYears = [];
    
    // Start prefetching immediately
    this.prefetchData();
  }
  
  /**
   * Prefetch Ekadashi data for current and next year
   */
  async prefetchData() {
    if (this.prefetchPromise) return this.prefetchPromise;
    
    this.prefetchPromise = (async () => {
      try {
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        const lastYear = currentYear - 1;
        
        // Load data for current and next year
        const yearsToLoad = [currentYear, nextYear, lastYear];
        
        await Promise.all(
          yearsToLoad.map(year => this.loadYearData(year))
        );
        
        this.dataReady = true;
        console.log(`Ekadashi data ready for years: ${this.supportedYears.join(', ')}`);
        
      } catch (error) {
        console.error('Error prefetching Ekadashi data:', error);
        this.dataReady = true; // Mark as ready even on error
      }
    })();
    
    return this.prefetchPromise;
  }
  
  /**
   * Load Ekadashi data for a specific year
   */
  async loadYearData(year) {
    try {
      const response = await fetch(`data/ekadashi-${year}.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const yearData = await response.json();
      this.data[year] = yearData;
      this.supportedYears.push(year);
      
      console.log(`✓ Ekadashi loaded for ${year}: ${Object.keys(yearData).length} dates`);
      
    } catch (error) {
      console.warn(`Could not load Ekadashi for ${year}:`, error.message);
      
      // Fallback: check if data exists in window (old format)
      if (window[`EKADASHI_${year}`]) {
        this.data[year] = window[`EKADASHI_${year}`];
        this.supportedYears.push(year);
        console.log(`✓ Using fallback Ekadashi data for ${year}`);
      }
    }
  }
  
  /**
   * Ensure data is loaded before accessing
   */
  async ensureDataReady() {
    if (!this.dataReady) {
      await this.prefetchPromise;
    }
  }
  
  /**
   * Get Ekadashi data for any supported year
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @returns {Object|null} Ekadashi data or null
   */
  getEkadashiData(dateString) {
    const year = parseInt(dateString.substring(0, 4));
    const ekadashiData = this.data[year];
    return ekadashiData ? (ekadashiData[dateString] || null) : null;
  }
  
  /**
   * Check if a given date is an Ekadashi for any supported year
   * @param {string} dateString - Date in YYYY-MM-DD format 
   * @returns {boolean} True if the date is Ekadashi
   */
  isEkadashi(dateString) {
    return this.getEkadashiData(dateString) !== null;
  }
  
  /**
   * Get all Ekadashi for a specific year (raw data object)
   * @param {number} year - Year (e.g., 2024, 2025)
   * @returns {Object} Ekadashi data object for the year
   */
  getEkadashiForYear(year) {
    return this.data[year] || {};
  }
  
  /**
   * Get all Ekadashi dates for a specific month and year
   * @param {number} month - Month (1-12)
   * @param {number} year - Year
   * @returns {Array} Array of Ekadashi dates for the month
   */
  getEkadashiForMonth(month, year) {
    const ekadashiData = this.data[year] || {};
    
    const ekadashis = [];
    for (const [date, ekadashiInfo] of Object.entries(ekadashiData)) {
      const ekadashiDate = new Date(date);
      if (ekadashiDate.getMonth() + 1 === month) {
        ekadashis.push({
          date: date,
          day: ekadashiDate.getDate(),
          ...ekadashiInfo
        });
      }
    }
    
    return ekadashis.sort((a, b) => a.day - b.day);
  }
  
  /**
   * Get next upcoming Ekadashi from a given date for any supported year
   * @param {Date} fromDate - Starting date
   * @returns {Object|null} Next Ekadashi data or null
   */
  getNextEkadashi(fromDate = new Date()) {
    const year = fromDate.getFullYear();
    const dateStr = fromDate.toISOString().split('T')[0];
    
    // Try current year first
    let nextEkadashi = null;
    const ekadashiData = this.data[year];
    
    if (ekadashiData) {
      for (const [date, ekadashiInfo] of Object.entries(ekadashiData)) {
        if (date > dateStr) {
          const ekadashiDate = new Date(date);
          const daysUntil = Math.ceil((ekadashiDate - fromDate) / (1000 * 60 * 60 * 24));
          nextEkadashi = {
            date: date,
            daysUntil: daysUntil,
            ...ekadashiInfo
          };
          break;
        }
      }
    }
    
    // If no result in current year, try next year
    if (!nextEkadashi) {
      const nextYear = year + 1;
      const nextYearData = this.data[nextYear];
      
      if (nextYearData) {
        for (const [date, ekadashiInfo] of Object.entries(nextYearData)) {
          const ekadashiDate = new Date(date);
          const daysUntil = Math.ceil((ekadashiDate - fromDate) / (1000 * 60 * 60 * 24));
          nextEkadashi = {
            date: date,
            daysUntil: daysUntil,
            ...ekadashiInfo
          };
          break;
        }
      }
    }
    
    return nextEkadashi;
  }
  
  /**
   * Get upcoming Ekadashis for a specified number of days ahead
   * @param {Date} fromDate - Starting date
   * @param {number} daysAhead - Number of days to look ahead
   * @returns {Array} Array of upcoming Ekadashi dates
   */
  getUpcomingEkadashis(fromDate = new Date(), daysAhead = 30) {
    const endDate = new Date(fromDate.getTime() + (daysAhead * 24 * 60 * 60 * 1000));
    const upcoming = [];
    
    let currentDate = new Date(fromDate);
    let nextEkadashi = this.getNextEkadashi(currentDate);
    
    while (nextEkadashi && new Date(nextEkadashi.date) <= endDate) {
      upcoming.push(nextEkadashi);
      currentDate = new Date(nextEkadashi.date);
      currentDate.setDate(currentDate.getDate() + 1);
      nextEkadashi = this.getNextEkadashi(currentDate);
    }
    
    return upcoming;
  }
}

// Create a single instance
const ekadashiManager = new EkadashiDataManager();

// ===== GLOBAL EXPOSURE =====
// Expose the manager instance
window.ekadashiData = ekadashiManager;

// Expose methods as simple functions for backward compatibility
window.getEkadashiData = (dateString) => ekadashiManager.getEkadashiData(dateString);
window.isEkadashi = (dateString) => ekadashiManager.isEkadashi(dateString);
window.getEkadashiForMonth = (month, year) => ekadashiManager.getEkadashiForMonth(month, year);
window.getNextEkadashi = (fromDate) => ekadashiManager.getNextEkadashi(fromDate);
window.getUpcomingEkadashis = (fromDate, daysAhead) => ekadashiManager.getUpcomingEkadashis(fromDate, daysAhead);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ekadashiManager,
    getEkadashiData: (dateString) => ekadashiManager.getEkadashiData(dateString),
    isEkadashi: (dateString) => ekadashiManager.isEkadashi(dateString),
    getEkadashiForMonth: (month, year) => ekadashiManager.getEkadashiForMonth(month, year),
    getNextEkadashi: (fromDate) => ekadashiManager.getNextEkadashi(fromDate),
    getUpcomingEkadashis: (fromDate, daysAhead) => ekadashiManager.getUpcomingEkadashis(fromDate, daysAhead)
  };
}

