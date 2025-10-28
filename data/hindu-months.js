/**
 * Hindu Months Data Manager - Unified loader with prefetch
 * Dynamically loads Hindu month data from JSON files for supported years
 * Based on North Indian Purnimanta Calendar System
 */

class HinduMonthsDataManager {
  constructor() {
    this.data = {}; // { 2024: {...}, 2025: {...} }
    this.dataReady = false;
    this.prefetchPromise = null;
    this.supportedYears = [];
    
    // Start prefetching immediately
    this.prefetchData();
  }
  
  /**
   * Prefetch Hindu months data for current and next year
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
        console.log(`Hindu months data ready for years: ${this.supportedYears.join(', ')}`);
        
      } catch (error) {
        console.error('Error prefetching Hindu months data:', error);
        this.dataReady = true; // Mark as ready even on error
      }
    })();
    
    return this.prefetchPromise;
  }
  
  /**
   * Load Hindu months data for a specific year
   */
  async loadYearData(year) {
    try {
      const response = await fetch(`data/hindu-months-${year}.json?t=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const yearData = await response.json();
      this.data[year] = yearData;
      this.supportedYears.push(year);
      
      console.log(`✓ Hindu months loaded for ${year}: ${Object.keys(yearData).length} months`);
      
    } catch (error) {
      console.warn(`Could not load Hindu months for ${year}:`, error.message);
      
      // Fallback: check if data exists in window (old format)
      if (window.HINDU_MONTHS_2024_2025 && window.HINDU_MONTHS_2024_2025[year]) {
        this.data[year] = window.HINDU_MONTHS_2024_2025[year];
        this.supportedYears.push(year);
        console.log(`✓ Using fallback Hindu months data for ${year}`);
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
   * Get Hindu month for a given Gregorian date
   * @param {Date} gregorianDate 
   * @returns {Object|null} Hindu month data or null
   */
  getHinduMonthForDate(gregorianDate) {
    const year = gregorianDate.getFullYear();
    const dateStr = gregorianDate.toISOString().split('T')[0];
    
    const yearData = this.data[year];
    if (!yearData) return null;
    
    for (const [monthKey, monthData] of Object.entries(yearData)) {
      if (dateStr >= monthData.startDate && dateStr <= monthData.endDate) {
        return {
          key: monthKey,
          ...monthData
        };
      }
    }
    
    return null;
  }
  
  /**
   * Get all Hindu months that overlap with a Gregorian month
   * @param {number} gregorianMonth (0-11)
   * @param {number} year 
   * @returns {Array} Array of Hindu months
   */
  getHinduMonthsForGregorianMonth(gregorianMonth, year) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const targetMonth = monthNames[gregorianMonth];
    const overlappingMonths = [];
    
    const yearData = this.data[year];
    if (!yearData) return overlappingMonths;
    
    for (const [monthKey, monthData] of Object.entries(yearData)) {
      if (monthData.gregorianMonths.includes(targetMonth)) {
        overlappingMonths.push({
          key: monthKey,
          ...monthData
        });
      }
    }
    
    return overlappingMonths;
  }
  
  /**
   * Get a specific Hindu month by key and year
   * @param {string} monthKey - e.g., "chaitra", "vaisakha"
   * @param {number} year
   * @returns {Object|null} Hindu month data or null
   */
  getMonthByKey(monthKey, year) {
    const yearData = this.data[year];
    if (!yearData || !yearData[monthKey]) return null;
    
    return {
      key: monthKey,
      ...yearData[monthKey]
    };
  }
  
  /**
   * Get all Hindu months for a specific year
   * @param {number} year
   * @returns {Array} Array of Hindu months
   */
  getAllMonthsForYear(year) {
    const yearData = this.data[year];
    if (!yearData) return [];
    
    return Object.entries(yearData).map(([key, data]) => ({
      key,
      ...data
    }));
  }
}

// Create a single instance
const hinduMonthsManager = new HinduMonthsDataManager();

// ===== GLOBAL EXPOSURE =====
// Expose the manager instance
window.hinduMonthsData = hinduMonthsManager;

// Expose methods as simple functions for backward compatibility
window.getHinduMonthForDate = (gregorianDate) => hinduMonthsManager.getHinduMonthForDate(gregorianDate);
window.getHinduMonthsForGregorianMonth = (gregorianMonth, year) => hinduMonthsManager.getHinduMonthsForGregorianMonth(gregorianMonth, year);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    hinduMonthsManager,
    getHinduMonthForDate: (gregorianDate) => hinduMonthsManager.getHinduMonthForDate(gregorianDate),
    getHinduMonthsForGregorianMonth: (gregorianMonth, year) => hinduMonthsManager.getHinduMonthsForGregorianMonth(gregorianMonth, year)
  };
}
