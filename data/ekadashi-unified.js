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
  if (year === "2024") {
    if (window.getEkadashi2024) {
      return window.getEkadashi2024(dateString);
    } else if (window.EKADASHI_2024) {
      return window.EKADASHI_2024[dateString] || null;
    }
  } else if (year === "2025") {
    if (window.getEkadashi2025) {
      return window.getEkadashi2025(dateString);
    } else if (window.EKADASHI_2025) {
      return window.EKADASHI_2025[dateString] || null;
    }
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
  if (year === "2024" && window.isEkadashi2024) {
    return window.isEkadashi2024(dateString);
  } else if (year === "2025" && window.isEkadashi2025) {
    return window.isEkadashi2025(dateString);
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
  if (year === 2024 && window.getEkadashiForMonth2024) {
    return window.getEkadashiForMonth2024(month);
  } else if (year === 2025 && window.getEkadashiForMonth2025) {
    return window.getEkadashiForMonth2025(month);
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
  
  // Try current year first using individual functions
  let nextEkadashi = null;
  if (year === 2024 && window.getNextEkadashi2024) {
    nextEkadashi = window.getNextEkadashi2024(fromDate);
  } else if (year === 2025 && window.getNextEkadashi2025) {
    nextEkadashi = window.getNextEkadashi2025(fromDate);
  }
  
  // Fallback to direct data access if functions not available
  if (!nextEkadashi) {
    const ekadashiData = year === 2024 ? window.EKADASHI_2024 : window.EKADASHI_2025;
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
  
  // If no result in current year, try next supported year
  if (!nextEkadashi) {
    if (year === 2024) {
      const nextYearStart = new Date(2025, 0, 1);
      if (window.getNextEkadashi2025) {
        nextEkadashi = window.getNextEkadashi2025(nextYearStart);
      } else if (window.EKADASHI_2025) {
        // Direct access fallback for 2025
        for (const [date, ekadashiInfo] of Object.entries(window.EKADASHI_2025)) {
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