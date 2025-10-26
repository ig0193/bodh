/**
 * Unified Ekadashi Handler - Bridge between year-specific files
 * Provides backward compatibility for existing code
 */

/**
 * Get Ekadashi data for any supported year
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {Object|null} Ekadashi data or null
 */
function getEkadashiData(dateString) {
  const year = dateString.substring(0, 4);
  const yearSpecificFunction = window[`getEkadashi${year}`];
  const ekadashiData = window[`EKADASHI_${year}`];
  
  if (yearSpecificFunction) {
    return yearSpecificFunction(dateString);
  } else if (ekadashiData) {
    return ekadashiData[dateString] || null;
  }
  
  return null;
}

/**
 * Check if a given date is an Ekadashi for any supported year
 * @param {string} dateString - Date in YYYY-MM-DD format 
 * @returns {boolean} True if the date is Ekadashi
 */
function isEkadashi(dateString) {
  const year = dateString.substring(0, 4);
  const yearSpecificFunction = window[`isEkadashi${year}`];
  
  if (yearSpecificFunction) {
    return yearSpecificFunction(dateString);
  }
  
  return false;
}

/**
 * Get all Ekadashi dates for a specific month and year
 * @param {number} month - Month (1-12)
 * @param {number} year - Year
 * @returns {Array} Array of Ekadashi dates for the month
 */
function getEkadashiForMonth(month, year) {
  const yearSpecificFunction = window[`getEkadashiForMonth${year}`];
  
  if (yearSpecificFunction) {
    return yearSpecificFunction(month);
  }
  
  return [];
}

/**
 * Get next upcoming Ekadashi from a given date for any supported year
 * @param {Date} fromDate - Starting date
 * @returns {Object|null} Next Ekadashi data or null
 */
function getNextEkadashi(fromDate = new Date()) {
  const year = fromDate.getFullYear();
  const dateStr = fromDate.toISOString().split('T')[0];
  
  // Try current year first using dynamically accessed functions
  let nextEkadashi = null;
  const yearSpecificFunction = window[`getNextEkadashi${year}`];
  if (yearSpecificFunction) {
    nextEkadashi = yearSpecificFunction(fromDate);
  }
  
  // Fallback to direct data access if functions not available
  if (!nextEkadashi) {
    const ekadashiData = window[`EKADASHI_${year}`];
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
  }
  
  // If no result in current year, try next year
  if (!nextEkadashi) {
    const nextYear = year + 1;
    const nextYearStart = new Date(nextYear, 0, 1);
    const nextYearFunction = window[`getNextEkadashi${nextYear}`];
    
    if (nextYearFunction) {
      nextEkadashi = nextYearFunction(nextYearStart);
    } else {
      // Direct access fallback for next year
      const nextYearData = window[`EKADASHI_${nextYear}`];
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
  }
  
  return nextEkadashi;
}

/**
 * Get upcoming Ekadashis for a specified number of days ahead
 * @param {Date} fromDate - Starting date
 * @param {number} daysAhead - Number of days to look ahead
 * @returns {Array} Array of upcoming Ekadashi dates
 */
function getUpcomingEkadashis(fromDate = new Date(), daysAhead = 30) {
  const endDate = new Date(fromDate.getTime() + (daysAhead * 24 * 60 * 60 * 1000));
  const upcoming = [];
  
  let currentDate = new Date(fromDate);
  let nextEkadashi = getNextEkadashi(currentDate);
  
  while (nextEkadashi && new Date(nextEkadashi.date) <= endDate) {
    upcoming.push(nextEkadashi);
    currentDate = new Date(nextEkadashi.date);
    currentDate.setDate(currentDate.getDate() + 1);
    nextEkadashi = getNextEkadashi(currentDate);
  }
  
  return upcoming;
}

// ===== GLOBAL EXPOSURE =====
window.getEkadashiData = getEkadashiData;
window.isEkadashi = isEkadashi;
window.getEkadashiForMonth = getEkadashiForMonth;
window.getNextEkadashi = getNextEkadashi;
window.getUpcomingEkadashis = getUpcomingEkadashis;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getEkadashiData,
    isEkadashi,
    getEkadashiForMonth,
    getNextEkadashi,
    getUpcomingEkadashis
  };
}