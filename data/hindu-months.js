/**
 * Hindu Months Data - Accurate Gregorian Mapping for 2024-2025
 * Based on North Indian Purnimanta Calendar System
 * 
 * IMPORTANT: These dates are calculated based on lunar calendar
 * and may vary by 1-2 days depending on location and astronomical calculations
 */

const HINDU_MONTHS_2024_2025 = {
  2024: {
    // Chaitra - March/April 2024
    chaitra: {
      name: "चैत्र",
      english: "Chaitra",
      roman: "Chaitra",
      startDate: "2024-03-12", // Chaitra Shukla Pratipada
      endDate: "2024-04-10",   // Chaitra Purnima
      gregorianMonths: ["March", "April"],
      season: "Spring",
      significance: "New Year month, Ram Navami, Chaitra Navratri",
      deity: "Lord Rama",
      color: "#FF6B6B",
      festivals: ["Chaitra Navratri", "Ram Navami", "Hanuman Jayanti"]
    },
    
    // Vaisakha - April/May 2024
    vaisakha: {
      name: "वैशाख",
      english: "Vaisakha", 
      roman: "Vaisakha",
      startDate: "2024-04-11",
      endDate: "2024-05-09",
      gregorianMonths: ["April", "May"],
      season: "Summer",
      significance: "Buddha Purnima, Akshaya Tritiya",
      deity: "Lord Vishnu",
      color: "#4ECDC4",
      festivals: ["Buddha Purnima", "Akshaya Tritiya", "Parashurama Jayanti"]
    },
    
    // Jyeshtha - May/June 2024
    jyeshtha: {
      name: "ज्येष्ठ",
      english: "Jyeshtha",
      roman: "Jyeshtha",
      startDate: "2024-05-10",
      endDate: "2024-06-07",
      gregorianMonths: ["May", "June"],
      season: "Summer",
      significance: "Ganga Dussehra, Vat Savitri",
      deity: "Goddess Ganga",
      color: "#45B7D1",
      festivals: ["Ganga Dussehra", "Vat Savitri", "Nirjala Ekadashi"]
    },
    
    // Ashadha - June/July 2024
    ashadha: {
      name: "आषाढ़",
      english: "Ashadha",
      roman: "Ashadha",
      startDate: "2024-06-08",
      endDate: "2024-07-06",
      gregorianMonths: ["June", "July"],
      season: "Monsoon",
      significance: "Rath Yatra, Guru Purnima",
      deity: "Lord Jagannath",
      color: "#96CEB4",
      festivals: ["Rath Yatra", "Guru Purnima", "Devshayani Ekadashi"]
    },
    
    // Shravana - July/August 2024 (MOST IMPORTANT)
    shravana: {
      name: "श्रावण",
      english: "Shravana",
      roman: "Shravana/Sawan",
      startDate: "2024-07-07",
      endDate: "2024-08-04",
      gregorianMonths: ["July", "August"],
      season: "Monsoon",
      significance: "Holiest Month- Lord Shiva worship, Monday fasting",
      deity: "Lord Shiva",
      color: "#8B4A9C",
      festivals: ["Teej", "Nag Panchami", "Raksha Bandhan"],
      isHoliest: true,
      // specialPractices: ["Monday fasting", "Kanwar Yatra", "Shiva prayers"]
    },
    
    // Bhadrapada - August/September 2024
    bhadrapada: {
      name: "भाद्रपद",
      english: "Bhadrapada",
      roman: "Bhadrapada",
      startDate: "2024-08-05",
      endDate: "2024-09-02",
      gregorianMonths: ["August", "September"],
      season: "Monsoon",
      significance: "Krishna Janmashtami, Ganesh Chaturthi",
      deity: "Lord Krishna & Lord Ganesha",
      color: "#FECA57",
      festivals: ["Krishna Janmashtami", "Ganesh Chaturthi", "Radha Ashtami"]
    },
    
    // Ashwina - September/October 2024
    ashwina: {
      name: "अश्विन",
      english: "Ashwina",
      roman: "Ashwin",
      startDate: "2024-09-03",
      endDate: "2024-10-01",
      gregorianMonths: ["September", "October"],
      season: "Autumn",
      significance: "Navratri, Dussehra - Festival season begins",
      deity: "Goddess Durga",
      color: "#FF9F43",
      festivals: ["Navratri", "Dussehra", "Pitru Paksha"],
      isFestivalMonth: true
    },
    
    // Kartika - October/November 2024
    kartika: {
      name: "कार्तिक",
      english: "Kartika",
      roman: "Kartik",
      startDate: "2024-10-02",
      endDate: "2024-10-30",
      gregorianMonths: ["October", "November"],
      season: "Autumn",
      significance: "Diwali, Karva Chauth - Festival of lights",
      deity: "Goddess Lakshmi",
      color: "#FF6348",
      festivals: ["Karva Chauth", "Diwali", "Govardhan Puja", "Bhai Dooj"],
      isFestivalMonth: true
    },
    
    // Margashirsha - November/December 2024
    margashirsha: {
      name: "मार्गशीर्ष",
      english: "Margashirsha",
      roman: "Margashirsha",
      startDate: "2024-10-31",
      endDate: "2024-11-29",
      gregorianMonths: ["November", "December"],
      season: "Winter",
      significance: "Gita Jayanti, Sacred month in Bhagavad Gita",
      deity: "Lord Krishna",
      color: "#5A5A5A",
      festivals: ["Gita Jayanti", "Kartik Purnima", "Tulsi Vivah"]
    },
    
    // Pausha - December 2024/January 2025
    pausha: {
      name: "पौष",
      english: "Pausha",
      roman: "Pausha",
      startDate: "2024-11-30",
      endDate: "2024-12-29",
      gregorianMonths: ["December", "January"],
      season: "Winter",
      significance: "Mokshada Ekadashi, preparation for Makar Sankranti",
      deity: "Lord Vishnu",
      color: "#2C2C54",
      festivals: ["Mokshada Ekadashi", "Gita Jayanti"]
    },
    
    // Magh - December 2024/January 2025
    magh: {
      name: "माघ",
      english: "Magh",
      roman: "Magh",
      startDate: "2024-12-30",
      endDate: "2025-01-27",
      gregorianMonths: ["January", "February"],
      season: "Winter",
      significance: "Makar Sankranti, Vasant Panchami - Spring preparation",
      deity: "Lord Surya (Sun God)",
      color: "#FFD700",
      festivals: ["Makar Sankranti", "Vasant Panchami", "Shattila Ekadashi"]
    },
    
    // Phalguna - January/February 2025
    phalguna: {
      name: "फाल्गुन",
      english: "Phalguna",
      roman: "Phalguna",
      startDate: "2025-01-28",
      endDate: "2025-02-25",
      gregorianMonths: ["February", "March"],
      season: "Spring",
      significance: "Holi, Mahashivratri - Festival of colors and devotion",
      deity: "Lord Shiva & Lord Krishna",
      color: "#FF69B4",
      festivals: ["Mahashivratri", "Holi", "Rang Panchami"],
      isFestivalMonth: true
    }
  },
  
  // 2025 data with accurate lunar calculations
  2025: {
    // Chaitra - March/April 2025
    chaitra: {
      name: "चैत्र",
      english: "Chaitra",
      roman: "Chaitra",
      startDate: "2025-03-29", // Chaitra Shukla Pratipada (Ugadi/Gudi Padwa)
      endDate: "2025-04-27",   // Chaitra Purnima
      gregorianMonths: ["March", "April"],
      season: "Spring",
      significance: "Hindu New Year, Ram Navami, Chaitra Navratri",
      deity: "Lord Rama",
      color: "#FF6B6B",
      festivals: ["Chaitra Navratri", "Ram Navami", "Hanuman Jayanti"]
    },
    
    // Vaisakha - April/May 2025
    vaisakha: {
      name: "वैशाख",
      english: "Vaisakha", 
      roman: "Vaisakha",
      startDate: "2025-04-28",
      endDate: "2025-05-26",
      gregorianMonths: ["April", "May"],
      season: "Summer",
      significance: "Buddha Purnima, Akshaya Tritiya, Solar New Year",
      deity: "Lord Vishnu",
      color: "#4ECDC4",
      festivals: ["Buddha Purnima", "Akshaya Tritiya", "Parashurama Jayanti"]
    },
    
    // Jyeshtha - May/June 2025
    jyeshtha: {
      name: "ज्येष्ठ",
      english: "Jyeshtha",
      roman: "Jyeshtha",
      startDate: "2025-05-27",
      endDate: "2025-06-25",
      gregorianMonths: ["May", "June"],
      season: "Summer",
      significance: "Ganga Dussehra, Vat Savitri, Nirjala Ekadashi",
      deity: "Goddess Ganga",
      color: "#45B7D1",
      festivals: ["Ganga Dussehra", "Vat Savitri", "Nirjala Ekadashi"]
    },
    
    // Ashadha - June/July 2025
    ashadha: {
      name: "आषाढ़",
      english: "Ashadha",
      roman: "Ashadha",
      startDate: "2025-06-26",
      endDate: "2025-07-24",
      gregorianMonths: ["June", "July"],
      season: "Monsoon",
      significance: "Rath Yatra, Guru Purnima, Devshayani Ekadashi",
      deity: "Lord Jagannath",
      color: "#96CEB4",
      festivals: ["Rath Yatra", "Guru Purnima", "Devshayani Ekadashi"]
    },
    
    // Shravana - July/August 2025 (MOST IMPORTANT)
    shravana: {
      name: "श्रावण",
      english: "Shravana",
      roman: "Shravana/Sawan",
      startDate: "2025-07-25",
      endDate: "2025-08-23",
      gregorianMonths: ["July", "August"],
      season: "Monsoon",
      significance: "Holiest Month - Lord Shiva worship, Monday fasting",
      deity: "Lord Shiva",
      color: "#8B4A9C",
      festivals: ["Hariyali Teej", "Nag Panchami", "Raksha Bandhan"],
      isHoliest: true,
      // specialPractices: ["Monday fasting", "Kanwar Yatra", "Shiva prayers"]
    },
    
    // Bhadrapada - August/September 2025
    bhadrapada: {
      name: "भाद्रपद",
      english: "Bhadrapada",
      roman: "Bhadrapada",
      startDate: "2025-08-24",
      endDate: "2025-09-21",
      gregorianMonths: ["August", "September"],
      season: "Monsoon",
      significance: "Krishna Janmashtami, Ganesh Chaturthi",
      deity: "Lord Krishna & Lord Ganesha",
      color: "#FECA57",
      festivals: ["Krishna Janmashtami", "Ganesh Chaturthi", "Radha Ashtami"]
    },
    
    // Ashwina - September/October 2025
    ashwina: {
      name: "अश्विन",
      english: "Ashwina",
      roman: "Ashwin",
      startDate: "2025-09-22",
      endDate: "2025-10-21",
      gregorianMonths: ["September", "October"],
      season: "Autumn",
      significance: "Navratri, Dussehra - Festival season begins",
      deity: "Goddess Durga",
      color: "#FF9F43",
      festivals: ["Navratri", "Dussehra", "Pitru Paksha"],
      isFestivalMonth: true
    },
    
    // Kartika - October/November 2025
    kartika: {
      name: "कार्तिक",
      english: "Kartika",
      roman: "Kartik",
      startDate: "2025-10-22",
      endDate: "2025-11-20",
      gregorianMonths: ["October", "November"],
      season: "Autumn",
      significance: "Diwali, Karva Chauth - Festival of lights",
      deity: "Goddess Lakshmi",
      color: "#FF6348",
      festivals: ["Karva Chauth", "Diwali", "Govardhan Puja", "Bhai Dooj"],
      isFestivalMonth: true
    },
    
    // Margashirsha - November/December 2025
    margashirsha: {
      name: "मार्गशीर्ष",
      english: "Margashirsha",
      roman: "Margashirsha",
      startDate: "2025-11-21",
      endDate: "2025-12-20",
      gregorianMonths: ["November", "December"],
      season: "Winter",
      significance: "Gita Jayanti, Sacred month in Bhagavad Gita",
      deity: "Lord Krishna",
      color: "#5A5A5A",
      festivals: ["Gita Jayanti", "Kartik Purnima", "Tulsi Vivah"]
    },
    
    // Pausha - December 2025/January 2026
    pausha: {
      name: "पौष",
      english: "Pausha",
      roman: "Pausha",
      startDate: "2025-12-21",
      endDate: "2026-01-18",
      gregorianMonths: ["December", "January"],
      season: "Winter",
      significance: "Mokshada Ekadashi, preparation for Makar Sankranti",
      deity: "Lord Vishnu",
      color: "#2C2C54",
      festivals: ["Mokshada Ekadashi", "Gita Jayanti"]
    },
    
    // Magh - January/February 2026
    magh: {
      name: "माघ",
      english: "Magh",
      roman: "Magh",
      startDate: "2026-01-19",
      endDate: "2026-02-17",
      gregorianMonths: ["January", "February"],
      season: "Winter",
      significance: "Makar Sankranti, Vasant Panchami - Spring preparation",
      deity: "Lord Surya (Sun God)",
      color: "#FFD700",
      festivals: ["Makar Sankranti", "Vasant Panchami", "Shattila Ekadashi"]
    },
    
    // Phalguna - February/March 2026
    phalguna: {
      name: "फाल्गुन",
      english: "Phalguna",
      roman: "Phalguna",
      startDate: "2026-02-18",
      endDate: "2026-03-18",
      gregorianMonths: ["February", "March"],
      season: "Spring",
      significance: "Holi, Mahashivratri - Festival of colors and devotion",
      deity: "Lord Shiva & Lord Krishna",
      color: "#FF69B4",
      festivals: ["Mahashivratri", "Holi", "Rang Panchami"],
      isFestivalMonth: true
    }
  }
};

/**
 * Get Hindu month for a given Gregorian date
 * @param {Date} gregorianDate 
 * @returns {Object|null} Hindu month data or null
 */
function getHinduMonthForDate(gregorianDate) {
  const year = gregorianDate.getFullYear();
  const dateStr = gregorianDate.toISOString().split('T')[0];
  
  if (!HINDU_MONTHS_2024_2025[year]) return null;
  
  for (const [monthKey, monthData] of Object.entries(HINDU_MONTHS_2024_2025[year])) {
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
function getHinduMonthsForGregorianMonth(gregorianMonth, year) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const targetMonth = monthNames[gregorianMonth];
  const overlappingMonths = [];
  
  if (!HINDU_MONTHS_2024_2025[year]) return overlappingMonths;
  
  for (const [monthKey, monthData] of Object.entries(HINDU_MONTHS_2024_2025[year])) {
    if (monthData.gregorianMonths.includes(targetMonth)) {
      overlappingMonths.push({
        key: monthKey,
        ...monthData
      });
    }
  }
  
  return overlappingMonths;
}

// ===== GLOBAL EXPOSURE =====
// Make sure these are available globally for the main application
window.HINDU_MONTHS_2024_2025 = HINDU_MONTHS_2024_2025;
window.getHinduMonthForDate = getHinduMonthForDate;
window.getHinduMonthsForGregorianMonth = getHinduMonthsForGregorianMonth;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HINDU_MONTHS_2024_2025,
    getHinduMonthForDate,
    getHinduMonthsForGregorianMonth
  };
} 