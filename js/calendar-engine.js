/**
 * Hindu Calendar Engine - Core Logic for 2024-2025
 * Handles calendar generation, date mapping, and cultural data integration
 * Supports both 2024 and 2025 with automatic year detection
 */

class HinduCalendarEngine {
  constructor() {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.hinduMonths = window.HINDU_MONTHS_2024_2025 || {};
    this.festivals = {
      2024: window.FESTIVALS_2024 || {},
      2025: window.FESTIVALS_2025 || {}
    };
    this.ekadashi = {
      2024: window.EKADASHI_2024 || {},
      2025: window.EKADASHI_2025 || {}
    };
    
    // Auto-detect supported years
    this.supportedYears = [2024, 2025];
    this.isValidYear = this.supportedYears.includes(this.currentYear);
    
    if (!this.isValidYear) {
      console.warn(`Year ${this.currentYear} not fully supported. Using 2025 data as fallback.`);
      this.currentYear = 2025; // Fallback to latest supported year
    }
  }

  /**
   * Get current year's data automatically
   */
  getCurrentYearData() {
    return {
      hinduMonths: this.hinduMonths[this.currentYear] || this.hinduMonths[2025],
      festivals: this.festivals[this.currentYear] || this.festivals[2025],
      ekadashi: this.ekadashi[this.currentYear] || this.ekadashi[2025]
    };
  }

  /**
   * Navigate to specific month and year
   */
  navigateToMonth(month, year) {
    if (this.supportedYears.includes(year)) {
      this.currentMonth = month;
      this.currentYear = year;
      return this.generateCalendarData();
    } else {
      throw new Error(`Year ${year} is not supported. Supported years: ${this.supportedYears.join(', ')}`);
    }
  }

  /**
   * Navigate to previous month
   */
  previousMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
      if (!this.supportedYears.includes(this.currentYear)) {
        this.currentYear = this.supportedYears[0]; // Go to earliest supported year
        this.currentMonth = 0;
      }
    }
    return this.generateCalendarData();
  }

  /**
   * Navigate to next month
   */
  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
      if (!this.supportedYears.includes(this.currentYear)) {
        this.currentYear = this.supportedYears[this.supportedYears.length - 1]; // Go to latest supported year
        this.currentMonth = 11;
      }
    }
    return this.generateCalendarData();
  }

  /**
   * Navigate to current month (today)
   */
  setToday() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    
    // If current year is not supported, use fallback
    if (!this.supportedYears.includes(this.currentYear)) {
      this.currentYear = this.supportedYears[this.supportedYears.length - 1];
    }
    
    return this.generateCalendarData();
  }

  /**
   * Generate complete calendar data for current month
   */
  generateCalendarData() {
    const year = this.currentYear;
    const month = this.currentMonth;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Get Hindi months for this Gregorian month
    let hinduMonths = [];
    try {
      if (typeof window.getHinduMonthsForGregorianMonth === 'function') {
        hinduMonths = window.getHinduMonthsForGregorianMonth(month, year) || [];
      }
    } catch (error) {
      console.warn('Hindu months data not available:', error);
      hinduMonths = [];
    }

    const calendar = {
      year: year,
      month: month,
      monthName: firstDay.toLocaleDateString('en-US', { month: 'long' }),
      daysInMonth: daysInMonth,
      startingDayOfWeek: startingDayOfWeek,
      hinduMonths: hinduMonths,
      days: []
    };

    // Generate full 42-day grid (6 weeks × 7 days)
    const days = [];
    
    // Calculate previous month info
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    
    // Calculate next month info
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;

    // Add trailing days from previous month
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const dayData = this.createDayData(prevYear, prevMonth, day);
      dayData.isCurrentMonth = false;
      dayData.isOtherMonth = true;
      days.push(dayData);
    }

    // Add current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayData = this.createDayData(year, month, day);
      dayData.isCurrentMonth = true;
      dayData.isOtherMonth = false;
      days.push(dayData);
    }

    // Add leading days from next month to complete the 42-day grid
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const dayData = this.createDayData(nextYear, nextMonth, day);
      dayData.isCurrentMonth = false;
      dayData.isOtherMonth = true;
      days.push(dayData);
    }

    // Ensure exactly 42 days (6 weeks × 7 days)
    if (days.length > 42) {
      days.splice(42);
    }
    
    console.log(`Calendar generated for ${year}-${month+1}: ${days.length} days`);
    calendar.days = days;
    return calendar;
  }

  /**
   * Create comprehensive data for a specific day
   */
  createDayData(year, month, day) {
    const date = new Date(year, month, day);
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Get occasions for this date
    const festival = this.getFestivalForDate(dateString);
    const ekadashi = this.getEkadashiForDate(dateString);
    const hinduMonth = this.getHinduMonthForDate(date);

    // Collect all events for this date
    const events = [];
    
    if (festival) {
      events.push({
        ...festival,
        type: 'festival',
        priority: 1
      });
    }
    
    if (ekadashi) {
      events.push({
        ...ekadashi,
        type: 'ekadashi',
        priority: 2
      });
    }
    
    // ===== TEST DATA: Multiple Events for Testing ===== 
    // Add fake multiple events for testing (remove in production)
    const today = new Date();
    const testDates = [
      // Today
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
      // Tomorrow
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 1).padStart(2, '0')}`,
      // Day after tomorrow
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 2).padStart(2, '0')}`
    ];
    
    if (testDates.includes(dateString)) {
      // Add multiple test events
      const testEvents = [
        {
          name: 'Diwali',
          roman: 'Diwali',
          hindi: 'दीवाली',
          type: 'festival',
          significance: 'Festival of lights celebrating the victory of light over darkness',
          whatToDo: ['Light diyas and candles', 'Perform Lakshmi Puja', 'Share sweets with family'],
          fasting: false,
          priority: 1
        },
        {
          name: 'Kartik Ekadashi',
          roman: 'Kartik Ekadashi',
          hindi: 'कार्तिक एकादशी',
          type: 'ekadashi',
          significance: 'Sacred fasting day dedicated to Lord Vishnu for spiritual purification',
          whatToDo: ['Observe complete fast', 'Chant Vishnu mantras', 'Read Bhagavad Gita'],
          fasting: true,
          priority: 2
        },
        
        {
          name: 'Diwali2',
          roman: 'Diwali',
          hindi: 'दीवाली',
          type: 'festival',
          significance: 'Festival of lights celebrating the victory of light over darkness',
          whatToDo: ['Light diyas and candles', 'Perform Lakshmi Puja', 'Share sweets with family'],
          fasting: false,
          priority: 1
        },
      ];
      
      // Add test events only if we don't already have real events for this date
      if (events.length === 0) {
        events.push(...testEvents);
      } else {
        // Add additional test events to existing real events
        events.push(...testEvents.slice(0, 2)); // Add 2 extra events
      }
    }
    
    // Sort events alphabetically by name for consistent ordering
    events.sort((a, b) => {
      const nameA = a.roman || a.name || a.hindi || '';
      const nameB = b.roman || b.name || b.hindi || '';
      return nameA.localeCompare(nameB);
    });

    // Legacy support - keep primary occasion as first event
    let occasion = null;
    let occasionType = null;
    
    if (events.length > 0) {
      occasion = events[0];
      occasionType = events[0].type;
    }

    return {
      date: date,
      day: day,
      month: month,
      year: year,
      dateString: dateString,
      isToday: this.isToday(date),
      isCurrentMonth: true,
      hinduMonth: hinduMonth,
      occasion: occasion, // Legacy - primary occasion
      occasionType: occasionType, // Legacy - primary occasion type
      events: events, // New - all events for this date
      significance: this.getDaySignificance(date, occasion, hinduMonth),
      recommendations: this.getDayRecommendations(date, occasion, hinduMonth),
      isAuspicious: this.isAuspiciousDay(date, occasion),
      lunarPhase: this.getLunarPhase(date) // Approximate
    };
  }

  /**
   * Get festival for a specific date with year support
   */
  getFestivalForDate(dateString) {
    const year = parseInt(dateString.substring(0, 4));
    const festivalsData = this.festivals[year] || this.festivals[2025];
    return festivalsData[dateString] || null;
  }

  /**
   * Get Ekadashi for a specific date with year support
   */
  getEkadashiForDate(dateString) {
    const year = parseInt(dateString.substring(0, 4));
    const ekadashiData = this.ekadashi[year] || this.ekadashi[2025];
    return ekadashiData[dateString] || null;
  }

  /**
   * Get Hindu month for Gregorian date
   */
  getHinduMonthForDate(gregorianDate) {
    if (window.getHinduMonthForDate) {
      return window.getHinduMonthForDate(gregorianDate);
    }
    return null;
  }

  /**
   * Get Hindu months for Gregorian month
   */
  getHinduMonthsForGregorianMonth(gregorianMonth, year) {
    if (window.getHinduMonthsForGregorianMonth) {
      return window.getHinduMonthsForGregorianMonth(gregorianMonth, year);
    }
    return [];
  }

  /**
   * Get spiritual significance for a day
   */
  getDaySignificance(date, occasion, hinduMonth) {
    if (occasion) {
      return occasion.significance || "Special spiritual observance day";
    }

    // Check for special periods
    const currentPeriods = this.getCurrentSpiritualPeriods(date);
    if (currentPeriods.length > 0) {
      return currentPeriods[0].description;
    }

    // Regular day significance based on Hindu month
    if (hinduMonth) {
      if (hinduMonth.isHoliest) {
        return `${hinduMonth.significance} - Most sacred time for spiritual practices`;
      }
      if (hinduMonth.isFestivalMonth) {
        return `${hinduMonth.significance} - Auspicious time for celebrations`;
      }
      return hinduMonth.significance || "Regular day for spiritual practice and dharma";
    }

    return "Regular day for spiritual practice and dharma";
  }

  /**
   * Get recommendations for a specific day
   */
  getDayRecommendations(date, occasion, hinduMonth) {
    const recommendations = [];

    if (occasion) {
      if (occasion.whatToDo) {
        recommendations.push(...occasion.whatToDo.slice(0, 3));
      } else if (occasion.fasting) {
        recommendations.push("Observe fast according to tradition");
        recommendations.push("Chant mantras and read scriptures");
        recommendations.push("Perform charity and help others");
      }
    } else {
      // General recommendations based on context
      const dayOfWeek = date.getDay();
      const weeklyPractices = {
        0: ["Sunday - Surya worship", "Donate to the needy", "Family time and rest"],
        1: ["Monday - Shiva worship", "Practice meditation", "Avoid non-vegetarian food"],
        2: ["Tuesday - Hanuman worship", "Physical exercise", "Help others in need"],
        3: ["Wednesday - Ganesha worship", "Learn something new", "Practice gratitude"],
        4: ["Thursday - Guru/Jupiter worship", "Seek knowledge", "Respect elders"],
        5: ["Friday - Lakshmi worship", "Cleanliness and beauty", "Cultural activities"],
        6: ["Saturday - Shani worship", "Serve the poor", "Practice patience"]
      };

      recommendations.push(...(weeklyPractices[dayOfWeek] || ["Morning prayer and meditation", "Practice gratitude and kindness", "Read spiritual texts"]));
    }

    // Add month-specific recommendations
    if (hinduMonth && hinduMonth.specialPractices) {
      recommendations.push(`${hinduMonth.roman} month special: ${hinduMonth.specialPractices[0]}`);
    }

    return recommendations.slice(0, 3); // Limit to 3 recommendations
  }

  /**
   * Check if a day is considered auspicious
   */
  isAuspiciousDay(date, occasion) {
    if (occasion) {
      return occasion.type === 'major' || occasion.type === 'auspicious' || occasion.type === 'Shukla';
    }

    // General auspicious day logic
    const dayOfWeek = date.getDay();
    const auspiciousDays = [1, 3, 4, 5]; // Monday, Wednesday, Thursday, Friday
    
    return auspiciousDays.includes(dayOfWeek);
  }

  /**
   * Get current spiritual periods (like Sawan, Navratri, etc.)
   */
  getCurrentSpiritualPeriods(date) {
    const periods = [];
    const hinduMonth = this.getHinduMonthForDate(date);

    if (hinduMonth) {
      if (hinduMonth.key === 'shravana') {
        periods.push({
          name: "Sawan Maas",
          description: "Sacred month of Lord Shiva - time for devotion and spiritual purification",
          recommendations: ["Monday fasting", "Shiva temple visits", "Kanwar Yatra"]
        });
      } else if (hinduMonth.key === 'kartika') {
        periods.push({
          name: "Kartik Maas",
          description: "Month of lights and prosperity - time for Lakshmi worship",
          recommendations: ["Light diyas daily", "Tulsi worship", "Charitable activities"]
        });
      }
    }

    // Check for festival periods (like Navratri)
    const monthStr = date.getMonth() + 1;
    if (monthStr === 9 || monthStr === 10) { // September-October
      const dayStr = date.getDate();
      if ((monthStr === 9 && dayStr >= 22) || (monthStr === 10 && dayStr <= 2)) {
        periods.push({
          name: "Shardiya Navratri",
          description: "Nine nights of Goddess Durga worship - victory of good over evil",
          recommendations: ["Daily Durga worship", "Garba and Dandiya", "Fasting (optional)"]
        });
      }
    }

    return periods;
  }

  /**
   * Get approximate lunar phase (simplified calculation)
   */
  getLunarPhase(date) {
    // Simplified lunar phase calculation
    // This is approximate and for display purposes only
    const knownNewMoon = new Date('2024-01-11'); // Known new moon date
    const daysSinceKnown = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
    const lunarCycle = 29.53; // Average lunar cycle
    const phasePosition = (daysSinceKnown % lunarCycle) / lunarCycle;

    if (phasePosition < 0.03 || phasePosition > 0.97) return "New Moon";
    if (phasePosition < 0.25) return "Waxing Crescent";
    if (phasePosition < 0.53) return "Full Moon";
    if (phasePosition < 0.75) return "Waning Crescent";
    return "Waning Gibbous";
  }

  /**
   * Check if date is today
   */
  isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  /**
   * Get today's complete information
   */
  getTodaysInformation() {
    const today = new Date();
    const dayData = this.createDayData(today.getFullYear(), today.getMonth(), today.getDate());
    
    return {
      date: today,
      dayData: dayData,
      hinduMonth: dayData.hinduMonth,
      occasion: dayData.occasion,
      significance: dayData.significance,
      recommendations: dayData.recommendations
    };
  }

  /**
   * Get upcoming occasions (festivals and Ekadashis)
   */
  getUpcomingOccasions(daysAhead = 30) {
    const today = new Date();
    const endDate = new Date(today.getTime() + (daysAhead * 24 * 60 * 60 * 1000));
    const upcoming = [];

    // Get upcoming festivals
    if (window.getUpcomingFestivals) {
      const upcomingFestivals = window.getUpcomingFestivals(today, daysAhead);
      upcoming.push(...upcomingFestivals.map(f => ({...f, type: 'festival'})));
    }

    // Get upcoming Ekadashis
    if (window.getNextEkadashi) {
      let nextEkadashi = window.getNextEkadashi(today);
      let checkDate = new Date(today);
      
      while (nextEkadashi && new Date(nextEkadashi.date) <= endDate) {
        upcoming.push({...nextEkadashi, type: 'ekadashi'});
        checkDate = new Date(nextEkadashi.date);
        checkDate.setDate(checkDate.getDate() + 1);
        nextEkadashi = window.getNextEkadashi(checkDate);
      }
    }

    // Sort by date and return
    return upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  /**
   * Get supported years
   */
  getSupportedYears() {
    return this.supportedYears;
  }

  /**
   * Check if year is supported
   */
  isYearSupported(year) {
    return this.supportedYears.includes(year);
  }

  /**
   * Get year-specific statistics
   */
  getYearStatistics(year = this.currentYear) {
    if (!this.isYearSupported(year)) {
      return null;
    }

    const festivalsData = this.festivals[year] || {};
    const ekadashiData = this.ekadashi[year] || {};

    return {
      year: year,
      totalFestivals: Object.keys(festivalsData).length,
      totalEkadashis: Object.keys(ekadashiData).length,
      majorFestivals: Object.values(festivalsData).filter(f => f.type === 'major').length,
      supportedMonths: 12,
      dataVersion: '2.0',
      lastUpdated: year === 2025 ? '2025' : '2024'
    };
  }

  /**
   * Backward compatibility method - alias for generateCalendarData()
   */
  getCurrentCalendarData() {
    return this.generateCalendarData();
  }

  /**
   * Get current month and year
   */
  getCurrentMonthYear() {
    return {
      month: this.currentMonth,
      year: this.currentYear
    };
  }
}

// ===== GLOBAL EXPOSURE =====
// Make sure HinduCalendarEngine is available globally
window.HinduCalendarEngine = HinduCalendarEngine;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HinduCalendarEngine;
} 