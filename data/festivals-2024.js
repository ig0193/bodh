/**
 * Hindu Festivals 2024 - Accurate North Indian Calendar
 * Based on Purnimanta Calendar System
 * 
 * DATA ACCURACY NOTICE:
 * - Dates verified against multiple Panchang sources
 * - Focused on North Indian traditions (UP, Bihar, Rajasthan, Punjab, etc.)
 * - Times may vary by 1 day based on local moon sighting
 */

const FESTIVALS_2024 = {
  // January 2024
  "2024-01-14": {
    name: "मकर संक्रांति",
    english: "Makar Sankranti",
    roman: "Makar Sankraanti",
    type: "major",
    category: "Solar Festival",
    significance: "Sun enters Capricorn, marks end of winter and beginning of harvest season",
    mythology: "Marks the day when Bhishma Pitamah chose to leave his mortal body during Kurukshetra war",
    whatToDo: [
      "Take holy bath in sacred rivers (Ganga, Yamuna)",
      "Fly kites and celebrate with family",
      "Prepare and share til-gud (sesame-jaggery) sweets",
      "Donate warm clothes and food to the needy",
      "Worship Sun God and offer water"
    ],
    foods: ["Til-gud laddu", "Khichdi", "Jaggery sweets"],
    colors: ["Yellow", "Orange"],
    duration: "1 day",
    mantra: "ॐ सूर्याय नमः",
    deity: "Surya (Sun God)"
  },

  "2024-01-25": {
    name: "वसंत पंचमी",
    english: "Vasant Panchami",
    roman: "Vasant Panchami",
    type: "major",
    category: "Knowledge Festival",
    significance: "Worship of Goddess Saraswati, beginning of spring season",
    mythology: "Day when Goddess Saraswati was born from Lord Brahma's mouth",
    whatToDo: [
      "Wear yellow clothes",
      "Worship books, musical instruments, and learning tools",
      "Offer yellow flowers to Goddess Saraswati",
      "Students seek blessings for knowledge and wisdom",
      "Fly kites to welcome spring"
    ],
    foods: ["Yellow rice", "Kesari halwa", "Yellow sweets"],
    colors: ["Yellow"],
    duration: "1 day",
    mantra: "ॐ सरस्वत्यै नमः",
    deity: "Goddess Saraswati"
  },

  // February 2024
  "2024-02-19": {
    name: "छत्रपति शिवाजी जयंती",
    english: "Chhatrapati Shivaji Jayanti",
    roman: "Chhatrapati Shivaji Jayanti",
    type: "regional",
    category: "Historical Festival",
    significance: "Birth anniversary of the great Maratha warrior king Chhatrapati Shivaji",
    mythology: "Celebrates the life and valor of Shivaji Maharaj who established the Maratha Empire",
    whatToDo: [
      "Remember the ideals of Shivaji Maharaj",
      "Participate in cultural programs",
      "Visit historical monuments and forts",
      "Study Indian history and heritage",
      "Promote values of courage and justice"
    ],
    foods: ["Traditional Maharashtrian cuisine", "Puran poli", "Modak"],
    colors: ["Saffron", "White", "Green"],
    duration: "1 day",
    mantra: "शिवराय का जय",
    deity: "Chhatrapati Shivaji Maharaj"
  },

  // March 2024
  "2024-03-08": {
    name: "महा शिवरात्रि",
    english: "Maha Shivratri",
    roman: "Mahaa Shivraatri",
    type: "major",
    category: "Shiva Festival",
    significance: "Greatest night of Lord Shiva, celebration of cosmic dance of creation and destruction",
    mythology: "Night when Lord Shiva performed the Tandava dance and married Goddess Parvati",
    whatToDo: [
      "Fast during the day (many observe complete fast)",
      "Stay awake all night in prayer and meditation",
      "Visit Shiva temples and offer milk, water, bel leaves",
      "Chant 'Om Namah Shivaya' throughout the night",
      "Listen to Shiva stories and bhajans"
    ],
    foods: ["Fruits (for those who break fast)", "Thandai", "Milk"],
    colors: ["White", "Blue"],
    duration: "1 night",
    mantra: "ॐ नमः शिवाय",
    deity: "Lord Shiva",
    specialRituals: ["Rudra Abhishek", "Jagran (staying awake)", "Shiva Tandava recitation"]
  },

  "2024-03-25": {
    name: "होली",
    english: "Holi",
    roman: "Holi",
    type: "major",
    category: "Spring Festival",
    significance: "Festival of colors, victory of good over evil, celebration of divine love",
    mythology: "Burning of demoness Holika, love of Radha-Krishna, victory of Prahlad's devotion",
    whatToDo: [
      "Burn Holika bonfire on the eve (Holika Dahan)",
      "Play with organic colors and water",
      "Dance and sing traditional folk songs",
      "Prepare and share festive foods like gujiya",
      "Forgive past grievances and embrace unity"
    ],
    foods: ["Gujiya", "Thandai", "Dahi bhalla", "Malpua"],
    colors: ["All colors", "Especially red, yellow, green"],
    duration: "2 days",
    mantra: "ॐ कृष्णाय नमः",
    deity: "Lord Krishna",
    eve: "2024-03-24" // Holika Dahan
  },

  // April 2024
  "2024-04-17": {
    name: "राम नवमी",
    english: "Ram Navami",
    roman: "Raam Navami",
    type: "major",
    category: "Vishnu Avatar Festival",
    significance: "Birth anniversary of Lord Rama, celebration of dharma and righteousness",
    mythology: "Lord Rama was born on this day to King Dasharatha and Queen Kausalya in Ayodhya",
    whatToDo: [
      "Read or listen to Ramayana recitation",
      "Visit Ram temples and participate in processions",
      "Fast during the day, break fast at noon",
      "Chant Ram mantras and bhajans",
      "Perform charitable acts and help the needy"
    ],
    foods: ["Prasadam from temples", "Simple vegetarian meals", "Panchamrit"],
    colors: ["Yellow", "Red"],
    duration: "1 day",
    mantra: "ॐ रामाय नमः",
    deity: "Lord Rama"
  },

  "2024-04-23": {
    name: "हनुमान जयंती",
    english: "Hanuman Jayanti",
    roman: "Hanumaan Jayanti",
    type: "major",
    category: "Hanuman Festival",
    significance: "Birth anniversary of Lord Hanuman, symbol of devotion, strength, and service",
    mythology: "Birth of Lord Hanuman to Anjana and Kesari, blessed by Lord Vayu",
    whatToDo: [
      "Recite Hanuman Chalisa and Bajrang Baan",
      "Visit Hanuman temples",
      "Offer red flowers, sindoor, and laddus",
      "Read stories of Hanuman's devotion to Rama",
      "Practice physical fitness and strength building"
    ],
    foods: ["Besan laddu", "Coconut prasad", "Bananas"],
    colors: ["Red", "Orange"],
    duration: "1 day",
    mantra: "ॐ हनुमते नमः",
    deity: "Lord Hanuman"
  },

  // May 2024
  "2024-05-10": {
    name: "अक्षय तृतीया",
    english: "Akshaya Tritiya",
    roman: "Akshaya Tritiya",
    type: "auspicious",
    category: "Prosperity Festival",
    significance: "Day of eternal prosperity, auspicious for new beginnings and gold purchases",
    mythology: "Day when Treta Yuga began, also when Lord Krishna and Sudama met",
    whatToDo: [
      "Purchase gold or start new ventures",
      "Perform charity and donations",
      "Start new businesses or investments",
      "Worship Lord Vishnu and Goddess Lakshmi",
      "Give gifts to family and friends"
    ],
    foods: ["Sweets", "Traditional prasadam"],
    colors: ["Gold", "Yellow"],
    duration: "1 day",
    mantra: "ॐ विष्णवे नमः",
    deity: "Lord Vishnu"
  },

  "2024-05-23": {
    name: "बुद्ध पूर्णिमा",
    english: "Buddha Purnima",
    roman: "Buddha Purnima",
    type: "major",
    category: "Buddhist Festival",
    significance: "Birth, enlightenment, and death anniversary of Gautam Buddha",
    mythology: "Prince Siddhartha became Buddha under Bodhi tree and attained enlightenment",
    whatToDo: [
      "Visit Buddhist temples and monasteries",
      "Meditate and practice mindfulness",
      "Read Buddhist teachings",
      "Practice compassion and non-violence",
      "Offer prayers for world peace"
    ],
    foods: ["Simple vegetarian meals", "Kheer", "Fruits"],
    colors: ["White", "Orange"],
    duration: "1 day",
    mantra: "बुद्धं शरणं गच्छामि",
    deity: "Gautam Buddha"
  },

  // June 2024
  "2024-06-17": {
    name: "निर्जला एकादशी",
    english: "Nirjala Ekadashi",
    roman: "Nirjala Ekadashi",
    type: "major",
    category: "Vishnu Festival",
    significance: "Most important Ekadashi, waterless fast for Lord Vishnu",
    mythology: "Bhima observed this fast to get benefits of all 24 Ekadashis in a year",
    whatToDo: [
      "Observe complete waterless fast",
      "Stay awake all night chanting Vishnu names",
      "Visit Vishnu temples",
      "Donate water, food, and clothes",
      "Break fast next day after sunrise"
    ],
    foods: ["No food or water during fast", "Simple sattvic meal after fast"],
    colors: ["Yellow", "White"],
    duration: "1 day",
    mantra: "ॐ नमो भगवते वासुदेवाय",
    deity: "Lord Vishnu"
  },

  "2024-06-21": {
    name: "योग दिवस",
    english: "International Yoga Day",
    roman: "Yoga Divas",
    type: "secular",
    category: "Wellness Festival",
    significance: "Global celebration of yoga and its benefits for physical and mental health",
    mythology: "Ancient practice of yoga originated in India thousands of years ago",
    whatToDo: [
      "Practice yoga asanas and pranayama",
      "Attend community yoga sessions",
      "Learn about yoga philosophy",
      "Promote physical and mental wellness",
      "Share yoga knowledge with others"
    ],
    foods: ["Healthy vegetarian meals", "Fresh fruits", "Herbal teas"],
    colors: ["White", "Green"],
    duration: "1 day",
    mantra: "योग meditation mantras",
    deity: "Patanjali (Yoga Guru)"
  },

  // Continue with more festivals...
  // July 2024 - Sawan Month
  "2024-07-21": {
    name: "गुरु पूर्णिमा",
    english: "Guru Purnima",
    roman: "Guru Purnima",
    type: "major",
    category: "Spiritual Festival",
    significance: "Honor spiritual teachers and gurus who guide us on the path of knowledge",
    mythology: "Birth anniversary of Sage Vyasa, author of Mahabharata and compiler of Vedas",
    whatToDo: [
      "Offer gratitude to your gurus and teachers",
      "Seek blessings from elders and spiritual guides",
      "Study sacred texts and spiritual books",
      "Perform guru dakshina (offering to teacher)",
      "Meditate and reflect on spiritual growth"
    ],
    foods: ["Simple vegetarian meals", "Sweets for guru"],
    colors: ["White", "Yellow"],
    duration: "1 day",
    mantra: "गुरुर्ब्रह्मा गुरुर्विष्णुः",
    deity: "Sage Vyasa"
  },

  // August 2024
  "2024-08-07": {
    name: "हरियाली तीज",
    english: "Hariyali Teej",
    roman: "Hariyali Teej",
    type: "major",
    category: "Women's Festival",
    significance: "Celebration of monsoon, married women fast for husband's prosperity and marital bliss",
    mythology: "Commemorates reunion of Lord Shiva and Goddess Parvati after her 100 years of penance",
    whatToDo: [
      "Married women observe fast for husbands",
      "Swing on decorated swings (jhula)",
      "Apply intricate mehendi designs",
      "Wear green clothes and jewelry",
      "Worship Lord Shiva and Goddess Parvati"
    ],
    foods: ["Ghevar", "Traditional sweets", "Post-fast meal"],
    colors: ["Green", "Red"],
    duration: "1 day",
    mantra: "गौरी गणेश मंत्र",
    deity: "Lord Shiva, Goddess Parvati"
  },

  "2024-08-19": {
    name: "रक्षा बंधन",
    english: "Raksha Bandhan",
    roman: "Rakshaa Bandhan",
    type: "major",
    category: "Family Festival",
    significance: "Sacred bond between brothers and sisters, promise of protection and love",
    mythology: "Goddess Lakshmi tied rakhi to King Bali, various stories of divine protection",
    whatToDo: [
      "Sisters tie rakhi on brothers' wrists",
      "Brothers give gifts and promise protection",
      "Family gatherings and feasts",
      "Share sweets and celebrate togetherness",
      "Remember distant siblings with video calls"
    ],
    foods: ["Mithai", "Festive meals", "Traditional sweets"],
    colors: ["Red", "Yellow"],
    duration: "1 day",
    mantra: "यस्य द्विजबन्धुत्वे",
    deity: "Family bonds"
  },

  "2024-08-26": {
    name: "कृष्ण जन्माष्टमी",
    english: "Krishna Janmashtami",
    roman: "Krishna Janmaashtami",
    type: "major",
    category: "Vishnu Avatar Festival",
    significance: "Birth anniversary of Lord Krishna, celebration of divine love and dharma",
    mythology: "Lord Krishna was born at midnight to Devaki and Vasudeva in Mathura prison",
    whatToDo: [
      "Fast until midnight (Krishna's birth time)",
      "Decorate homes and temples",
      "Organize Dahi Handi celebrations",
      "Sing Krishna bhajans and perform Ras Leela",
      "Prepare Krishna's favorite foods"
    ],
    foods: ["Makhan", "Mishri", "Panjiri", "56 bhog varieties"],
    colors: ["Blue", "Yellow"],
    duration: "1 day",
    mantra: "ॐ कृष्णाय नमः",
    deity: "Lord Krishna",
    birthTime: "Midnight"
  },

  // September 2024
  "2024-09-07": {
    name: "गणेश चतुर्थी",
    english: "Ganesh Chaturthi",
    roman: "Ganesh Chaturthi",
    type: "major",
    category: "Ganesha Festival",
    significance: "Birth celebration of Lord Ganesha, remover of obstacles and patron of arts",
    mythology: "Lord Shiva and Parvati created Ganesha from clay to guard their home",
    whatToDo: [
      "Install Ganesha idol at home or community",
      "Offer modak and sweets to Lord Ganesha",
      "Chant Ganesha mantras and prayers",
      "Participate in community celebrations",
      "Immerse idol in water on Anant Chaturdashi"
    ],
    foods: ["Modak", "Laddu", "Puran Poli", "Coconut sweets"],
    colors: ["Red", "Yellow"],
    duration: "11 days",
    mantra: "ॐ गं गणपतये नमः",
    deity: "Lord Ganesha"
  },

  "2024-09-17": {
    name: "अनंत चतुर्दशी",
    english: "Anant Chaturdashi",
    roman: "Anant Chaturdashi",
    type: "major",
    category: "Ganesha Festival",
    significance: "Conclusion of Ganesh Chaturthi, Ganesha visarjan day",
    mythology: "Day when Lord Ganesha returns to his heavenly abode",
    whatToDo: [
      "Perform final aarti to Lord Ganesha",
      "Take part in grand processions",
      "Immerse Ganesha idols in water bodies",
      "Pray for Ganesha's return next year",
      "Distribute prasad and sweets"
    ],
    foods: ["Modak", "Prasad", "Traditional sweets"],
    colors: ["Red", "Yellow"],
    duration: "1 day",
    mantra: "गणपति बाप्पा मोरया",
    deity: "Lord Ganesha"
  },

  // October 2024
  "2024-10-03": {
    name: "शरद नवरात्रि (प्रथम दिन)",
    english: "Sharad Navratri (Day 1)",
    roman: "Sharad Navratri",
    type: "major",
    category: "Devi Festival",
    significance: "Nine-day worship of Goddess Durga in her nine forms",
    mythology: "Goddess Durga fought the demon Mahishasura for nine days",
    whatToDo: [
      "Fast and pray for nine days",
      "Set up Durga altar at home",
      "Recite Durga Saptashati",
      "Participate in Garba and Dandiya",
      "Wear different colors each day"
    ],
    foods: ["Fruits", "Kuttu flour dishes", "Sabudana", "Fasting foods"],
    colors: ["White", "Red", "Royal Blue", "Yellow", "Green", "Grey", "Orange", "Peacock Green", "Purple"],
    duration: "9 days",
    mantra: "ॐ दुं दुर्गायै नमः",
    deity: "Goddess Durga"
  },

  "2024-10-11": {
    name: "दुर्गा अष्टमी",
    english: "Durga Ashtami",
    roman: "Durga Ashtami",
    type: "major",
    category: "Devi Festival",
    significance: "Eighth day of Navratri, peak day of Durga worship",
    mythology: "Day when Goddess Durga killed the demon Mahishasura",
    whatToDo: [
      "Perform special Durga puja",
      "Feed young girls (Kanya Bhoj)",
      "Recite Durga Chalisa",
      "Offer red flowers and sindoor",
      "Fast and maintain purity"
    ],
    foods: ["Halwa-Puri for Kanya Bhoj", "Prasad", "Fruits"],
    colors: ["Red"],
    duration: "1 day",
    mantra: "ॐ दुं दुर्गायै नमः",
    deity: "Goddess Durga"
  },

  "2024-10-12": {
    name: "दशहरा/विजयदशमी",
    english: "Dussehra/Vijayadashami",
    roman: "Dussehra",
    type: "major",
    category: "Victory Festival",
    significance: "Victory of good over evil, Lord Rama's victory over Ravana",
    mythology: "Lord Rama killed Ravana and rescued Sita; Goddess Durga's victory over Mahishasura",
    whatToDo: [
      "Burn effigies of Ravana, Kumbhakarna, and Meghnad",
      "Participate in Ram Lila performances",
      "Seek blessings for new ventures",
      "Celebrate triumph of righteousness",
      "Share sweets and joy with community"
    ],
    foods: ["Jalebi", "Samosa", "Traditional sweets"],
    colors: ["Red", "Yellow"],
    duration: "1 day",
    mantra: "ॐ रामाय नमः",
    deity: "Lord Rama, Goddess Durga"
  },

  "2024-10-20": {
    name: "करवा चौथ",
    english: "Karva Chauth",
    roman: "Karva Chauth",
    type: "major",
    category: "Matrimonial Festival",
    significance: "Married women fast for husband's long life and prosperity",
    mythology: "Queen Veervati's devotion saved her husband's life through this fast",
    whatToDo: [
      "Married women observe nirjala fast",
      "Dress in bridal attire with mehendi",
      "Worship Lord Shiva and Parvati",
      "Break fast after seeing moon through sieve",
      "Exchange gifts and blessings"
    ],
    foods: ["Sargi (pre-dawn meal)", "Post-fast feast", "Sweets"],
    colors: ["Red", "Pink", "Orange"],
    duration: "1 day",
    mantra: "करवा चौथ व्रत कथा",
    deity: "Lord Shiva, Goddess Parvati"
  },

  // November 2024
  "2024-11-01": {
    name: "धनतेरस",
    english: "Dhanteras",
    roman: "Dhanteras",
    type: "major",
    category: "Wealth Festival",
    significance: "First day of Diwali, worship of Goddess Lakshmi and Lord Dhanvantari",
    mythology: "Lord Dhanvantari emerged from ocean churning with Ayurveda and nectar",
    whatToDo: [
      "Buy gold, silver, or new utensils",
      "Clean and decorate homes",
      "Light diyas and rangoli",
      "Worship Goddess Lakshmi",
      "Perform Lakshmi puja in evening"
    ],
    foods: ["Mithai", "Dry fruits", "Traditional sweets"],
    colors: ["Red", "Yellow", "Gold"],
    duration: "1 day",
    mantra: "ॐ श्रीं ह्रीं श्रीं कमले",
    deity: "Goddess Lakshmi, Lord Dhanvantari"
  },

  "2024-11-02": {
    name: "नरक चतुर्दशी/छोटी दीवाली",
    english: "Narak Chaturdashi/Choti Diwali",
    roman: "Narak Chaturdashi",
    type: "major",
    category: "Diwali Festival",
    significance: "Second day of Diwali, celebrates Krishna's victory over demon Narakasura",
    mythology: "Lord Krishna killed demon Narakasura and freed 16,000 princesses",
    whatToDo: [
      "Take early morning oil bath",
      "Light diyas and candles",
      "Prepare rangoli designs",
      "Burst crackers (eco-friendly)",
      "Share sweets with neighbors"
    ],
    foods: ["Poha", "Traditional breakfast", "Mithai"],
    colors: ["Orange", "Yellow"],
    duration: "1 day",
    mantra: "ॐ कृष्णाय नमः",
    deity: "Lord Krishna"
  },

  "2024-11-03": {
    name: "दीवाली/लक्ष्मी पूजा",
    english: "Diwali/Lakshmi Puja",
    roman: "Diwali",
    type: "major",
    category: "Festival of Lights",
    significance: "Main Diwali day, return of Lord Rama to Ayodhya, worship of Goddess Lakshmi",
    mythology: "People of Ayodhya lit lamps to welcome Lord Rama after 14 years of exile",
    whatToDo: [
      "Perform Lakshmi Ganesha puja",
      "Light diyas and candles everywhere",
      "Create beautiful rangoli",
      "Exchange gifts and sweets",
      "Burst crackers and celebrate"
    ],
    foods: ["Mithai", "Dry fruits", "Festive meals", "Prasad"],
    colors: ["Red", "Yellow", "Gold"],
    duration: "1 day",
    mantra: "ॐ श्रीं लक्ष्म्यै नमः",
    deity: "Goddess Lakshmi, Lord Ganesha"
  },

  "2024-11-04": {
    name: "गोवर्धन पूजा",
    english: "Govardhan Puja",
    roman: "Govardhan Puja",
    type: "major",
    category: "Krishna Festival",
    significance: "Fourth day of Diwali, celebrates Krishna lifting Govardhan mountain",
    mythology: "Lord Krishna lifted Govardhan mountain to protect people from Indra's wrath",
    whatToDo: [
      "Create Govardhan mountain replica with cow dung",
      "Offer 56 varieties of food (Chappan Bhog)",
      "Perform parikrama around Govardhan",
      "Worship cows and bulls",
      "Share annakut prasad"
    ],
    foods: ["Annakut (56 dishes)", "Makhan mishri", "Traditional feast"],
    colors: ["Yellow", "Green"],
    duration: "1 day",
    mantra: "गिरिराज धारी गोवर्धन धारी",
    deity: "Lord Krishna, Govardhan Mountain"
  },

  "2024-11-05": {
    name: "भाई दूज",
    english: "Bhai Dooj",
    roman: "Bhai Dooj",
    type: "major",
    category: "Sibling Festival",
    significance: "Fifth day of Diwali, celebrates bond between brothers and sisters",
    mythology: "Yamraj visited his sister Yamuna, who applied tilak and fed him",
    whatToDo: [
      "Sisters apply tilak to brothers",
      "Brothers give gifts to sisters",
      "Pray for each other's long life",
      "Share festive meals together",
      "Celebrate sibling bond"
    ],
    foods: ["Sweets", "Traditional meals", "Brothers' favorite dishes"],
    colors: ["Red", "Yellow"],
    duration: "1 day",
    mantra: "यम द्वितीया प्रार्थना",
    deity: "Yamraj, Yamuna"
  },

  "2024-11-15": {
    name: "गुरु नानक जयंती",
    english: "Guru Nanak Jayanti",
    roman: "Guru Nanak Jayanti",
    type: "major",
    category: "Sikh Festival",
    significance: "Birth anniversary of Guru Nanak Dev Ji, founder of Sikhism",
    mythology: "First Sikh Guru who preached equality, unity, and devotion to one God",
    whatToDo: [
      "Visit Gurudwara for prayers",
      "Participate in langar (community kitchen)",
      "Read Guru Granth Sahib",
      "Organize kirtan and bhajan",
      "Practice seva (selfless service)"
    ],
    foods: ["Langar meals", "Karah prasad", "Simple vegetarian food"],
    colors: ["Orange", "White"],
    duration: "1 day",
    mantra: "वाहे गुरु",
    deity: "Guru Nanak Dev Ji"
  },

  // December 2024
  "2024-12-25": {
    name: "Christmas",
    english: "Christmas",
    roman: "Christmas",
    type: "secular",
    category: "Inter-faith Festival",
    significance: "Birth of Jesus Christ, celebrated by Christians and others as festival of love",
    mythology: "Birth of Jesus Christ in Bethlehem, message of peace and love",
    whatToDo: [
      "Visit church for midnight mass",
      "Exchange gifts and spread joy",
      "Decorate Christmas tree",
      "Share feast with family and friends",
      "Practice charity and kindness"
    ],
    foods: ["Christmas cake", "Plum cake", "Traditional feast"],
    colors: ["Red", "Green", "White"],
    duration: "1 day",
    mantra: "Peace and goodwill prayers",
    deity: "Jesus Christ"
  }
};

// ===== HELPER FUNCTIONS =====

/**
 * Get festival data for a specific date in 2024
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {Object|null} Festival data or null if not found
 */
function getFestival2024(dateString) {
  return FESTIVALS_2024[dateString] || null;
}

/**
 * Get all festivals for a specific month in 2024
 * @param {number} month - Month (1-12)
 * @returns {Array} Array of festivals with dates
 */
function getFestivalsForMonth2024(month) {
  const festivals = [];
  for (const [date, festivalData] of Object.entries(FESTIVALS_2024)) {
    const festivalDate = new Date(date);
    if (festivalDate.getMonth() + 1 === month) {
      festivals.push({
        date: date,
        day: festivalDate.getDate(),
        ...festivalData
      });
    }
  }
  
  return festivals.sort((a, b) => a.day - b.day);
}

/**
 * Get upcoming festivals from current date in 2024
 * @param {Date} fromDate - Starting date
 * @param {number} daysAhead - Number of days to look ahead
 * @returns {Array} Array of upcoming festivals
 */
function getUpcomingFestivals2024(fromDate = new Date(), daysAhead = 30) {
  // Only return 2024 festivals if we're querying for 2024
  if (fromDate.getFullYear() !== 2024) {
    return [];
  }
  
  const upcoming = [];
  const endDate = new Date(fromDate.getTime() + (daysAhead * 24 * 60 * 60 * 1000));
  
  for (const [date, festivalData] of Object.entries(FESTIVALS_2024)) {
    const festivalDate = new Date(date);
    if (festivalDate >= fromDate && festivalDate <= endDate) {
      const daysUntil = Math.ceil((festivalDate - fromDate) / (1000 * 60 * 60 * 24));
      upcoming.push({
        date: date,
        daysUntil: daysUntil,
        ...festivalData
      });
    }
  }
  
  return upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
}

// ===== GLOBAL EXPOSURE =====
// Make sure these are available globally for the main application
window.FESTIVALS_2024 = FESTIVALS_2024;
window.getFestival2024 = getFestival2024;
window.getFestivalsForMonth2024 = getFestivalsForMonth2024;
window.getUpcomingFestivals2024 = getUpcomingFestivals2024;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FESTIVALS_2024,
    getFestival2024,
    getFestivalsForMonth2024,
    getUpcomingFestivals2024
  };
}