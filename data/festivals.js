/**
 * Hindu Festivals - Unified loader for all years
 * Combines festivals data from multiple years
 */

/**
 * Get festival data for any supported year
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {Object|Array|null} Festival data (single object or array) or null if not found
 */
function getFestivalData(dateString) {
  const year = dateString.substring(0, 4);
  if (year === "2024" && window.FESTIVALS_2024) {
    return window.FESTIVALS_2024[dateString] || null;
  } else if (year === "2025" && window.FESTIVALS_2025) {
    return window.FESTIVALS_2025[dateString] || null;
  }
  return null;
}

/**
 * Get all festivals for a specific date as an array
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {Array} Array of festival objects (empty if none found)
 */
function getFestivalsData(dateString) {
  const data = getFestivalData(dateString);
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

/**
 * Get primary (first) festival for a specific date
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {Object|null} Primary festival data or null if not found
 */
function getPrimaryFestivalData(dateString) {
  const data = getFestivalData(dateString);
  if (!data) return null;
  return Array.isArray(data) ? data[0] : data;
}

/**
 * Get all festivals for a specific month and year
 * @param {number} month - Month (1-12)
 * @param {number} year - Year (2024, 2025, etc.)
 * @returns {Array} Array of festivals with dates
 */
function getFestivalsForMonth(month, year) {
  let festivalsData = {};
  
  if (year === 2024 && window.FESTIVALS_2024) {
    festivalsData = window.FESTIVALS_2024;
  } else if (year === 2025 && window.FESTIVALS_2025) {
    festivalsData = window.FESTIVALS_2025;
  }
  
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
function getUpcomingFestivals(fromDate = new Date(), daysAhead = 30) {
  const startYear = fromDate.getFullYear();
  const endDate = new Date(fromDate.getTime() + (daysAhead * 24 * 60 * 60 * 1000));
  const endYear = endDate.getFullYear();
  
  const upcoming = [];
  
  // Check festivals from start year to end year
  for (let year = startYear; year <= endYear; year++) {
    let festivalsData = {};
    
    if (year === 2024 && window.FESTIVALS_2024) {
      festivalsData = window.FESTIVALS_2024;
    } else if (year === 2025 && window.FESTIVALS_2025) {
      festivalsData = window.FESTIVALS_2025;
    }
    
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
  
  return upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
}

// ===== GLOBAL EXPOSURE =====
// Make unified functions available globally
window.getFestivalData = getFestivalData;
window.getFestivalsData = getFestivalsData;
window.getPrimaryFestivalData = getPrimaryFestivalData;
window.getFestivalsForMonth = getFestivalsForMonth;
window.getUpcomingFestivals = getUpcomingFestivals;

// Maintain backward compatibility with year-specific functions
window.getFestivalsForMonth2024 = (month) => getFestivalsForMonth(month, 2024);
window.getUpcomingFestivals2024 = (fromDate, daysAhead) => {
  const year = fromDate ? fromDate.getFullYear() : new Date().getFullYear();
  if (year === 2024) return getUpcomingFestivals(fromDate, daysAhead);
  return [];
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getFestivalData,
    getFestivalsData,
    getPrimaryFestivalData,
    getFestivalsForMonth,
    getUpcomingFestivals
  };
}