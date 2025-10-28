/**
 * Hindu Festivals Data Manager - Unified loader with prefetch
 * Dynamically loads festival data from JSON files for supported years
 */

class FestivalsDataManager {
  constructor() {
    this.data = {}; // { 2024: {...}, 2025: {...} }
    this.dataReady = false;
    this.prefetchPromise = null;
    this.supportedYears = [];
    
    // Start prefetching immediately
    this.prefetchData();
  }
  
  /**
   * Prefetch festival data for current and next year
   */
  async prefetchData() {
    if (this.prefetchPromise) return this.prefetchPromise;
    
    this.prefetchPromise = (async () => {
      try {
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        const lastYear = currentYear - 1;
        
        // Try to load manifest to know which years are supported
        const yearsToLoad = [currentYear, nextYear, lastYear];
        
        // Load data for each year
        await Promise.all(
          yearsToLoad.map(year => this.loadYearData(year))
        );
        
        this.dataReady = true;
        console.log(`Festivals data ready for years: ${this.supportedYears.join(', ')}`);
        
      } catch (error) {
        console.error('Error prefetching festivals data:', error);
        this.dataReady = true; // Mark as ready even on error to prevent infinite waiting
      }
    })();
    
    return this.prefetchPromise;
  }
  
  /**
   * Load festival data for a specific year
   */
  async loadYearData(year) {
    try {
      // Try loading from local JSON file
      const response = await fetch(`data/festivals-${year}.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const yearData = await response.json();
      this.data[year] = yearData;
      this.supportedYears.push(year);
      
      console.log(`✓ Festivals loaded for ${year}: ${Object.keys(yearData).length} dates`);
      
    } catch (error) {
      console.warn(`Could not load festivals for ${year}:`, error.message);
      
      // Fallback: check if data exists in window (old format)
      if (window[`FESTIVALS_${year}`]) {
        this.data[year] = window[`FESTIVALS_${year}`];
        this.supportedYears.push(year);
        console.log(`✓ Using fallback festivals data for ${year}`);
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
   * Get festival data for any supported year
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @returns {Object|Array|null} Festival data (single object or array) or null if not found
   */
  getFestivalData(dateString) {
    const year = parseInt(dateString.substring(0, 4));
    const festivalsData = this.data[year];
    return festivalsData ? (festivalsData[dateString] || null) : null;
  }
  
  /**
   * Get all festivals for a specific date as an array
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @returns {Array} Array of festival objects (empty if none found)
   */
  getFestivalsData(dateString) {
    const data = this.getFestivalData(dateString);
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
  }
  
  /**
   * Get primary (first) festival for a specific date
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @returns {Object|null} Primary festival data or null if not found
   */
  getPrimaryFestivalData(dateString) {
    const data = this.getFestivalData(dateString);
    if (!data) return null;
    return Array.isArray(data) ? data[0] : data;
  }
  
  /**
   * Get all festivals for a specific year (raw data object)
   * @param {number} year - Year (e.g., 2024, 2025)
   * @returns {Object} Festivals data object for the year
   */
  getFestivalsForYear(year) {
    return this.data[year] || {};
  }
  
  /**
   * Get all festivals for a specific month and year
   * @param {number} month - Month (1-12)
   * @param {number} year - Year (e.g., 2024, 2025, 2026, etc.)
   * @returns {Array} Array of festivals with dates
   */
  getFestivalsForMonth(month, year) {
    const festivalsData = this.data[year] || {};
    
    const festivals = [];
    for (const [date, festivalData] of Object.entries(festivalsData)) {
      const festivalDate = new Date(date);
      if (festivalDate.getMonth() + 1 === month) {
        if (Array.isArray(festivalData)) {
          // Multiple festivals on same date
          festivalData.forEach(festival => {
            festivals.push({
              date: date,
              day: festivalDate.getDate(),
              ...festival
            });
          });
        } else {
          // Single festival on this date
          festivals.push({
            date: date,
            day: festivalDate.getDate(),
            ...festivalData
          });
        }
      }
    }
    
    return festivals.sort((a, b) => a.day - b.day);
  }
  
  /**
   * Get upcoming festivals from current date across multiple years
   * @param {Date} fromDate - Starting date
   * @param {number} daysAhead - Number of days to look ahead
   * @returns {Array} Array of upcoming festivals
   */
  getUpcomingFestivals(fromDate = new Date(), daysAhead = 30) {
    const startYear = fromDate.getFullYear();
    const endDate = new Date(fromDate.getTime() + (daysAhead * 24 * 60 * 60 * 1000));
    const endYear = endDate.getFullYear();
    
    const upcoming = [];
    
    // Check festivals from start year to end year
    for (let year = startYear; year <= endYear; year++) {
      const festivalsData = this.data[year];
      
      if (festivalsData) {
        for (const [date, festivalData] of Object.entries(festivalsData)) {
          const festivalDate = new Date(date);
          if (festivalDate >= fromDate && festivalDate <= endDate) {
            const daysUntil = Math.ceil((festivalDate - fromDate) / (1000 * 60 * 60 * 24));
            
            if (Array.isArray(festivalData)) {
              // Multiple festivals on same date
              festivalData.forEach(festival => {
                upcoming.push({
                  date: date,
                  daysUntil: daysUntil,
                  ...festival
                });
              });
            } else {
              // Single festival on this date
              upcoming.push({
                date: date,
                daysUntil: daysUntil,
                ...festivalData
              });
            }
          }
        }
      }
    }
    
    return upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
  }
}

// Create a single instance
const festivalsManager = new FestivalsDataManager();

// ===== GLOBAL EXPOSURE =====
// Expose the manager instance
window.festivalsData = festivalsManager;

// Expose methods as simple functions for backward compatibility
window.getFestivalData = (dateString) => festivalsManager.getFestivalData(dateString);
window.getFestivalsData = (dateString) => festivalsManager.getFestivalsData(dateString);
window.getPrimaryFestivalData = (dateString) => festivalsManager.getPrimaryFestivalData(dateString);
window.getFestivalsForMonth = (month, year) => festivalsManager.getFestivalsForMonth(month, year);
window.getUpcomingFestivals = (fromDate, daysAhead) => festivalsManager.getUpcomingFestivals(fromDate, daysAhead);

// Maintain backward compatibility with year-specific functions
window.getFestivalsForMonth2024 = (month) => festivalsManager.getFestivalsForMonth(month, 2024);
window.getUpcomingFestivals2024 = (fromDate, daysAhead) => {
  const year = fromDate ? fromDate.getFullYear() : new Date().getFullYear();
  if (year === 2024) return festivalsManager.getUpcomingFestivals(fromDate, daysAhead);
  return [];
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    festivalsManager,
    getFestivalData: (dateString) => festivalsManager.getFestivalData(dateString),
    getFestivalsData: (dateString) => festivalsManager.getFestivalsData(dateString),
    getPrimaryFestivalData: (dateString) => festivalsManager.getPrimaryFestivalData(dateString),
    getFestivalsForMonth: (month, year) => festivalsManager.getFestivalsForMonth(month, year),
    getUpcomingFestivals: (fromDate, daysAhead) => festivalsManager.getUpcomingFestivals(fromDate, daysAhead)
  };
}
