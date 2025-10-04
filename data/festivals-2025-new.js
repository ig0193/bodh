/**
 * Hindu Festivals 2025 - Accurate North Indian Calendar
 * Based on Purnimanta Calendar System
 * 
 * DATA ACCURACY NOTICE:
 * - Dates verified against multiple Panchang sources
 * - Focused on North Indian traditions (UP, Bihar, Rajasthan, Punjab, etc.)
 * - Times may vary by 1 day based on local moon sighting
 */

const FESTIVALS_2025 = {
  // January 2025
  "2025-01-14": {
    name: "मकर संक्रांति",
    english: "Makar Sankranti",
    roman: "Makar Sankraanti",
    type: "major",
    significance: "Sun enters Capricorn, marks end of winter and beginning of harvest season",
    mythology: "Marks the day when Bhishma Pitamah chose to leave his mortal body during Kurukshetra war",
    whatToDo: [
      "Take holy bath in sacred rivers (Ganga, Yamuna)",
      "Fly kites and celebrate with family",
      "Prepare and share til-gud (sesame-jaggery) sweets",
      "Donate warm clothes and food to the needy",
      "Worship Sun God and offer water"
    ],
    additionalInfo: [
      { label: "Mantra", value: "ॐ सूर्याय नमः", type: "mantra" },
      { label: "Deity", value: "Surya (Sun God)" },
      { label: "Category", value: "Solar Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Til-gud laddu", "Khichdi", "Jaggery sweets"], type: "tags" },
      { label: "Colors", value: ["Yellow", "Orange"], type: "tags" }
    ]
  },

  // February 2025
  "2025-02-02": {
    name: "वसंत पंचमी",
    english: "Vasant Panchami",
    roman: "Vasant Panchami",
    type: "major",
    significance: "Worship of Goddess Saraswati, beginning of spring season",
    mythology: "Day when Goddess Saraswati was born from Lord Brahma's mouth",
    whatToDo: [
      "Wear yellow clothes",
      "Worship books, musical instruments, and learning tools",
      "Offer yellow flowers to Goddess Saraswati",
      "Students seek blessings for knowledge and wisdom",
      "Fly kites to welcome spring"
    ],
    additionalInfo: [
      { label: "Mantra", value: "ॐ सरस्वत्यै नमः", type: "mantra" },
      { label: "Deity", value: "Goddess Saraswati" },
      { label: "Category", value: "Knowledge Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Yellow rice", "Kesari halwa", "Yellow sweets"], type: "tags" },
      { label: "Colors", value: ["Yellow"], type: "tags" }
    ]
  },

  "2025-02-26": {
    name: "महा शिवरात्रि",
    english: "Maha Shivratri",
    roman: "Mahaa Shivraatri",
    type: "major",
    significance: "Greatest night of Lord Shiva, celebration of cosmic dance of creation and destruction",
    mythology: "Night when Lord Shiva performed the Tandava dance and married Goddess Parvati",
    whatToDo: [
      "Fast during the day (many observe complete fast)",
      "Stay awake all night in prayer and meditation",
      "Visit Shiva temples and offer milk, water, bel leaves",
      "Chant 'Om Namah Shivaya' throughout the night",
      "Listen to Shiva stories and bhajans"
    ],
    specialRituals: ["Rudra Abhishek", "Jagran (staying awake)", "Shiva Tandava recitation"],
    image: "images/festivals/shiv.jpg",
    additionalInfo: [
      { label: "Mantra", value: "ॐ नमः शिवाय", type: "mantra" },
      { label: "Deity", value: "Lord Shiva" },
      { label: "Category", value: "Shiva Festival" },
      { label: "Duration", value: "1 night" },
      { label: "Traditional Foods", value: ["Fruits (for those who break fast)", "Thandai", "Milk"], type: "tags" },
      { label: "Colors", value: ["White", "Blue"], type: "tags" }
    ]
  },

  // March 2025
  "2025-03-13": {
    name: "होलिका दहन",
    english: "Holika Dahan",
    roman: "Holika Dahan",
    type: "major",
    significance: "Burning of evil forces, victory of good over evil",
    mythology: "Burning of demoness Holika who tried to kill Prahlad",
    whatToDo: [
      "Light bonfire in the evening",
      "Circle around the fire and pray",
      "Offer coconut, jaggery, and wheat to fire",
      "Sing Holi songs and celebrate",
      "Prepare for next day's color celebration"
    ],
    additionalInfo: [
      { label: "Mantra", value: "ॐ कृष्णाय नमः", type: "mantra" },
      { label: "Deity", value: "Lord Krishna" },
      { label: "Category", value: "Spring Festival" },
      { label: "Duration", value: "1 evening" },
      { label: "Traditional Foods", value: ["Gujiya", "Traditional sweets"], type: "tags" },
      { label: "Colors", value: ["Yellow", "Orange"], type: "tags" }
    ]
  },

  "2025-03-14": [
    {
      name: "होली",
      english: "Holi",
      roman: "Holi",
      type: "major",
      significance: "Festival of colors, victory of good over evil, celebration of divine love",
      mythology: "Celebration of divine love between Radha and Krishna",
      whatToDo: [
        "Play with organic colors and water",
        "Dance and sing traditional folk songs",
        "Prepare and share festive foods like gujiya",
        "Visit family and friends",
        "Forgive past grievances and embrace unity"
      ],
      additionalInfo: [
        { label: "Mantra", value: "ॐ कृष्णाय नमः", type: "mantra" },
        { label: "Deity", value: "Lord Krishna" },
        { label: "Category", value: "Spring Festival" },
        { label: "Duration", value: "1 day" },
        { label: "Traditional Foods", value: ["Gujiya", "Thandai", "Dahi bhalla", "Malpua"], type: "tags" },
        { label: "Colors", value: ["All colors", "Especially red, yellow, green"], type: "tags" }
      ]
    },
    {
      name: "धूलि वंदन",
      english: "Dhuli Vandan",
      roman: "Dhuli Vandan",
      type: "auspicious",
      significance: "Second day of Holi celebrations, known as Dhuleti in some regions",
      mythology: "Continuation of Holi festivities with color play and social bonding",
      whatToDo: [
        "Continue playing with colors in morning",
        "Visit friends and neighbors",
        "Apply colors with love and respect",
        "Share sweets and festive foods",
        "Enjoy community celebrations"
      ],
      additionalInfo: [
        { label: "Mantra", value: "ॐ कृष्णाय नमः", type: "mantra" },
        { label: "Deity", value: "Lord Krishna" },
        { label: "Category", value: "Spring Festival" },
        { label: "Duration", value: "Half day" },
        { label: "Traditional Foods", value: ["Gujiya", "Festive sweets", "Thandai"], type: "tags" },
        { label: "Colors", value: ["Bright colors", "Yellow", "Red"], type: "tags" }
      ]
    }
  ],

  "2025-03-30": {
    name: "उगादि/गुड़ी पाडवा",
    english: "Ugadi/Gudi Padwa",
    roman: "Ugadi/Gudi Padwa",
    type: "major",
    significance: "Hindu New Year, beginning of Chaitra month",
    mythology: "Day when Lord Brahma created the universe",
    whatToDo: [
      "Clean and decorate homes",
      "Prepare traditional foods with six tastes",
      "Worship with new clothes",
      "Read panchang predictions for new year",
      "Visit temples and seek blessings"
    ],
    additionalInfo: [
      { label: "Mantra", value: "ॐ ब्रह्मणे नमः", type: "mantra" },
      { label: "Deity", value: "Lord Brahma" },
      { label: "Category", value: "New Year Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Ugadi pachadi", "Puran poli", "Traditional sweets"], type: "tags" },
      { label: "Colors", value: ["Yellow", "Green"], type: "tags" }
    ]
  },

  // April 2025
  "2025-04-06": {
    name: "राम नवमी",
    english: "Ram Navami",
    roman: "Raam Navami",
    type: "major",
    significance: "Birth anniversary of Lord Rama, celebration of dharma and righteousness",
    mythology: "Lord Rama was born on this day to King Dasharatha and Queen Kausalya in Ayodhya",
    whatToDo: [
      "Read or listen to Ramayana recitation",
      "Visit Ram temples and participate in processions",
      "Fast during the day, break fast at noon",
      "Chant Ram mantras and bhajans",
      "Perform charitable acts and help the needy"
    ],
    additionalInfo: [
      { label: "Mantra", value: "ॐ रामाय नमः", type: "mantra" },
      { label: "Deity", value: "Lord Rama" },
      { label: "Category", value: "Vishnu Avatar Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Prasadam from temples", "Simple vegetarian meals", "Panchamrit"], type: "tags" },
      { label: "Colors", value: ["Yellow", "Red"], type: "tags" }
    ]
  },

  "2025-04-12": {
    name: "हनुमान जयंती",
    english: "Hanuman Jayanti",
    roman: "Hanumaan Jayanti",
    type: "major",
    significance: "Birth anniversary of Lord Hanuman, symbol of devotion, strength, and service",
    mythology: "Birth of Lord Hanuman to Anjana and Kesari, blessed by Lord Vayu",
    whatToDo: [
      "Recite Hanuman Chalisa and Bajrang Baan",
      "Visit Hanuman temples",
      "Offer red flowers, sindoor, and laddus",
      "Read stories of Hanuman's devotion to Rama",
      "Practice physical fitness and strength building"
    ],
    additionalInfo: [
      { label: "Mantra", value: "ॐ हनुमते नमः", type: "mantra" },
      { label: "Deity", value: "Lord Hanuman" },
      { label: "Category", value: "Hanuman Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Besan laddu", "Coconut prasad", "Bananas"], type: "tags" },
      { label: "Colors", value: ["Red", "Orange"], type: "tags" }
    ]
  },

  // May 2025
  "2025-04-30": {
    name: "अक्षय तृतीया",
    english: "Akshaya Tritiya",
    roman: "Akshaya Tritiya",
    type: "auspicious",
    significance: "Day of eternal prosperity, auspicious for new beginnings and gold purchases",
    mythology: "Day when Treta Yuga began, also when Lord Krishna and Sudama met",
    whatToDo: [
      "Purchase gold or start new ventures",
      "Perform charity and donations",
      "Start new businesses or investments",
      "Worship Lord Vishnu and Goddess Lakshmi",
      "Give gifts to family and friends"
    ],
    additionalInfo: [
      { label: "Mantra", value: "ॐ विष्णवे नमः", type: "mantra" },
      { label: "Deity", value: "Lord Vishnu" },
      { label: "Category", value: "Prosperity Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Sweets", "Traditional prasadam"], type: "tags" },
      { label: "Colors", value: ["Gold", "Yellow"], type: "tags" }
    ]
  },

  "2025-05-12": {
    name: "बुद्ध पूर्णिमा",
    english: "Buddha Purnima",
    roman: "Buddha Purnima",
    type: "major",
    significance: "Birth, enlightenment, and death anniversary of Gautam Buddha",
    mythology: "Triple blessing day when Buddha was born, attained enlightenment, and attained nirvana",
    whatToDo: [
      "Visit Buddhist temples and monasteries",
      "Meditate and practice mindfulness",
      "Read Buddhist teachings and scriptures",
      "Practice compassion and non-violence",
      "Donate to charity and help the needy"
    ],
    additionalInfo: [
      { label: "Mantra", value: "बुद्धं शरणं गच्छामि", type: "mantra" },
      { label: "Deity", value: "Gautam Buddha" },
      { label: "Category", value: "Buddhist Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Simple vegetarian meals", "Kheer", "Fruits"], type: "tags" },
      { label: "Colors", value: ["White", "Yellow"], type: "tags" }
    ]
  },

  // June 2025
  "2025-06-27": {
    name: "जगन्नाथ रथ यात्रा",
    english: "Jagannath Rath Yatra",
    roman: "Jagannath Rath Yatra",
    type: "major",
    significance: "Lord Jagannath's journey to aunt's house, celebration of divine love",
    mythology: "Lord Krishna visits his aunt's house with siblings Balabhadra and Subhadra",
    whatToDo: [
      "Participate in chariot procession",
      "Pull the holy chariot ropes",
      "Chant 'Jai Jagannath' with devotion",
      "Offer prayers and seek darshan",
      "Distribute prasadam to all"
    ],
    additionalInfo: [
      { label: "Mantra", value: "ॐ जगन्नाथाय नमः", type: "mantra" },
      { label: "Deity", value: "Lord Jagannath" },
      { label: "Category", value: "Vishnu Festival" },
      { label: "Duration", value: "9 days" },
      { label: "Traditional Foods", value: ["Mahaprasadam", "Kheer", "Traditional sweets"], type: "tags" },
      { label: "Colors", value: ["Yellow", "Red"], type: "tags" }
    ]
  },

  // July 2025
  "2025-07-10": {
    name: "गुरु पूर्णिमा",
    english: "Guru Purnima",
    roman: "Guru Purnima",
    type: "major",
    significance: "Honor spiritual teachers and gurus who guide us on the path of knowledge",
    mythology: "Birth anniversary of Sage Vyasa, author of Mahabharata and compiler of Vedas",
    whatToDo: [
      "Offer gratitude to your gurus and teachers",
      "Seek blessings from elders and spiritual guides",
      "Study sacred texts and spiritual books",
      "Perform guru dakshina (offering to teacher)",
      "Meditate and reflect on spiritual growth"
    ],
    additionalInfo: [
      { label: "Mantra", value: "गुरुर्ब्रह्मा गुरुर्विष्णुः", type: "mantra" },
      { label: "Deity", value: "Sage Vyasa" },
      { label: "Category", value: "Spiritual Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Simple vegetarian meals", "Sweets for guru"], type: "tags" },
      { label: "Colors", value: ["White", "Yellow"], type: "tags" }
    ]
  },

  "2025-07-29": {
    name: "नाग पंचमी",
    english: "Nag Panchami",
    roman: "Nag Panchami",
    type: "major",
    significance: "Worship of serpent gods, protection from snake bites and evil",
    mythology: "Worship of divine serpents like Sheshnag, Vasuki, and Takshak",
    whatToDo: [
      "Offer milk and flowers to snake idols",
      "Visit temples dedicated to Nag devatas",
      "Draw snake designs with rangoli",
      "Avoid digging earth on this day",
      "Pray for protection from snake bites"
    ],
    additionalInfo: [
      { label: "Mantra", value: "ॐ नागाय नमः", type: "mantra" },
      { label: "Deity", value: "Nag Devatas" },
      { label: "Category", value: "Snake Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Milk sweets", "Traditional prasadam"], type: "tags" },
      { label: "Colors", value: ["White", "Yellow"], type: "tags" }
    ]
  },

  // August 2025
  "2025-08-09": [
    {
      name: "रक्षा बंधन",
      english: "Raksha Bandhan",
      roman: "Rakshaa Bandhan",
      type: "major",
      significance: "Sacred bond between brothers and sisters, promise of protection and love",
      mythology: "Goddess Lakshmi tied rakhi to King Bali, various stories of divine protection",
      whatToDo: [
        "Sisters tie rakhi on brothers' wrists",
        "Brothers give gifts and promise protection",
        "Family gatherings and feasts",
        "Share sweets and celebrate togetherness",
        "Remember distant siblings with video calls"
      ],
      image: "images/festivals/rakhi.jpg",
      additionalInfo: [
        { label: "Mantra", value: "यस्य द्विजबन्धुत्वे", type: "mantra" },
        { label: "Deity", value: "Family bonds" },
        { label: "Category", value: "Family Festival" },
        { label: "Duration", value: "1 day" },
        { label: "Traditional Foods", value: ["Mithai", "Festive meals", "Traditional sweets"], type: "tags" },
        { label: "Colors", value: ["Red", "Yellow"], type: "tags" }
      ]
    },
    {
      name: "नारियली पूर्णिमा",
      english: "Nariyali Purnima",
      roman: "Nariyali Purnima",
      type: "auspicious",
      significance: "Offering coconuts to the sea, prayers for safe sea voyages",
      mythology: "Coastal communities offer prayers to Varuna (sea god) for protection",
      whatToDo: [
        "Offer coconuts to the sea or river",
        "Pray for safety of fishermen and sailors",
        "Celebrate with coastal communities",
        "Prepare coconut-based dishes",
        "Thank the ocean for its bounty"
      ],
      additionalInfo: [
        { label: "Mantra", value: "ॐ वरुणाय नमः", type: "mantra" },
        { label: "Deity", value: "Lord Varuna" },
        { label: "Category", value: "Coastal Festival" },
        { label: "Duration", value: "1 day" },
        { label: "Traditional Foods", value: ["Coconut sweets", "Fish curry", "Coastal delicacies"], type: "tags" },
        { label: "Colors", value: ["White", "Blue"], type: "tags" }
      ]
    }
  ],

  "2025-08-16": {
    name: "कृष्ण जन्माष्टमी",
    english: "Krishna Janmashtami",
    roman: "Krishna Janmaashtami",
    type: "major",
    significance: "Birth anniversary of Lord Krishna, celebration of divine love and dharma",
    mythology: "Lord Krishna was born at midnight to Devaki and Vasudeva in Mathura prison",
    whatToDo: [
      "Fast until midnight (Krishna's birth time)",
      "Decorate homes and temples",
      "Organize Dahi Handi celebrations",
      "Sing Krishna bhajans and perform Ras Leela",
      "Prepare Krishna's favorite foods"
    ],
    birthTime: "Midnight",
    image: "images/festivals/krishna.jpg",
    additionalInfo: [
      { label: "Mantra", value: "ॐ कृष्णाय नमः", type: "mantra" },
      { label: "Deity", value: "Lord Krishna" },
      { label: "Category", value: "Vishnu Avatar Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Makhan", "Mishri", "Panjiri", "56 bhog varieties"], type: "tags" },
      { label: "Colors", value: ["Blue", "Yellow"], type: "tags" }
    ]
  },

  "2025-08-27": {
    name: "गणेश चतुर्थी",
    english: "Ganesh Chaturthi",
    roman: "Ganesh Chaturthi",
    type: "major",
    significance: "Birth anniversary of Lord Ganesha, remover of obstacles",
    mythology: "Day when Lord Ganesha was created by Goddess Parvati",
    whatToDo: [
      "Install Ganesha idols at home and community",
      "Offer modak and laddu to Lord Ganesha",
      "Chant Ganesha mantras and bhajans",
      "Organize cultural programs and processions",
      "Immerse idols in water bodies on Anant Chaturdashi"
    ],
    image: "images/festivals/ganesh_chathurti.jpg",
    additionalInfo: [
      { label: "Mantra", value: "ॐ गं गणपतये नमः", type: "mantra" },
      { label: "Deity", value: "Lord Ganesha" },
      { label: "Category", value: "Ganesha Festival" },
      { label: "Duration", value: "11 days" },
      { label: "Traditional Foods", value: ["Modak", "Laddu", "Coconut sweets"], type: "tags" },
      { label: "Colors", value: ["Red", "Yellow"], type: "tags" }
    ]
  },

  // September 2025
  "2025-09-22": {
    name: "शारदीय नवरात्रि प्रारंभ",
    english: "Navratri Begins",
    roman: "Navratri Shuru",
    type: "major",
    significance: "Nine nights of Goddess Durga worship, victory of good over evil",
    mythology: "Nine forms of Goddess Durga worshipped for nine nights",
    whatToDo: [
      "Fast for nine days (optional)",
      "Worship different forms of Goddess Durga each day",
      "Perform Garba and Dandiya dances",
      "Maintain cleanliness and purity",
      "Read Durga Saptashati"
    ],
    image: "images/temples/vaishnodevi/vaishno_devi_shrin.jpg",
    additionalInfo: [
      { label: "Mantra", value: "ॐ दुर्गायै नमः", type: "mantra" },
      { label: "Deity", value: "Goddess Durga" },
      { label: "Category", value: "Goddess Festival" },
      { label: "Duration", value: "9 days" },
      { label: "Traditional Foods", value: ["Vrat foods", "Fruits", "Dairy products"], type: "tags" },
      { label: "Colors", value: ["Nine different colors for nine days"], type: "tags" }
    ]
  },

  "2025-10-02": {
    name: "दशहरा/विजयदशमी",
    english: "Dussehra/Vijayadashami",
    roman: "Dussehra/Vijayadashami",
    type: "major",
    category: "Victory Festival",
    significance: "Victory of Lord Rama over Ravana, triumph of good over evil",
    mythology: "Day when Lord Rama killed ten-headed demon king Ravana",
    whatToDo: [
      "Burn effigies of Ravana, Meghnad, and Kumbhakarna",
      "Watch Ram Lila performances",
      "Worship weapons and tools (Ayudh Puja)",
      "Seek blessings for new ventures",
      "Celebrate victory of righteousness"
    ],
    image: "images/festivals/dusherra.jpg",
    additionalInfo: [
      { label: "Mantra", value: "ॐ रामाय नमः", type: "mantra" },
      { label: "Deity", value: "Lord Rama" },
      { label: "Category", value: "Victory Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Traditional sweets", "Festive meals"], type: "tags" },
      { label: "Colors", value: ["Red", "Yellow"], type: "tags" }
    ]
  },

  // October 2025
  "2025-10-20": {
    name: "दीपावली/दिवाली",
    english: "Diwali/Deepavali",
    roman: "Diwali/Deepavali",
    type: "major",
    significance: "Festival of lights, return of Lord Rama to Ayodhya, worship of Goddess Lakshmi",
    mythology: "People of Ayodhya lit lamps to welcome Lord Rama after 14 years of exile",
    whatToDo: [
      "Clean and decorate homes with lights and rangoli",
      "Worship Goddess Lakshmi and Lord Ganesha",
      "Light diyas and candles",
      "Burst crackers (eco-friendly)",
      "Exchange gifts and sweets with family and friends"
    ],
    additionalInfo: [
      { label: "Mantra", value: "ॐ श्री लक्ष्म्यै नमः", type: "mantra" },
      { label: "Deity", value: "Goddess Lakshmi" },
      { label: "Category", value: "Light Festival" },
      { label: "Duration", value: "5 days" },
      { label: "Traditional Foods", value: ["Mithai", "Dry fruits", "Festive delicacies"], type: "tags" },
      { label: "Colors", value: ["Golden", "Red", "Yellow"], type: "tags" }
    ]
  },

  // November 2025
  "2025-11-05": {
    name: "गुरु नानक जयंती",
    english: "Guru Nanak Jayanti",
    roman: "Guru Nanak Jayanti",
    type: "major",
    significance: "Birth anniversary of Guru Nanak Dev Ji, founder of Sikhism",
    mythology: "Birth of the first Sikh Guru who spread message of unity and devotion",
    whatToDo: [
      "Visit Gurudwaras and participate in prayers",
      "Listen to kirtan and religious discourses",
      "Participate in community service (seva)",
      "Share langar (community meal) with all",
      "Read Guru Granth Sahib"
    ],
    image: "images/festivals/gurunanak_jayanti.jpg",
    additionalInfo: [
      { label: "Mantra", value: "वाहे गुरु", type: "mantra" },
      { label: "Deity", value: "Guru Nanak Dev Ji" },
      { label: "Category", value: "Sikh Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Langar prasadam", "Simple vegetarian meals"], type: "tags" },
      { label: "Colors", value: ["Orange", "Blue"], type: "tags" }
    ]
  },

  // December 2025
  "2025-12-01": {
    name: "गीता जयंती",
    english: "Gita Jayanti",
    roman: "Gita Jayanti",
    type: "auspicious",
    significance: "Day when Lord Krishna delivered Bhagavad Gita to Arjuna",
    mythology: "On battlefield of Kurukshetra, Krishna gave divine knowledge to Arjuna",
    whatToDo: [
      "Read and recite Bhagavad Gita",
      "Attend Gita discourses and discussions",
      "Reflect on Krishna's teachings",
      "Practice meditation and dharma",
      "Share Gita's wisdom with others"
    ],
    image: "images/festivals/gita_jayanti.jpg",
    additionalInfo: [
      { label: "Mantra", value: "ॐ कृष्णाय नमः", type: "mantra" },
      { label: "Deity", value: "Lord Krishna" },
      { label: "Category", value: "Scripture Festival" },
      { label: "Duration", value: "1 day" },
      { label: "Traditional Foods", value: ["Simple vegetarian meals", "Kheer"], type: "tags" },
      { label: "Colors", value: ["Yellow", "Blue"], type: "tags" }
    ]
  }
};

// ===== HELPER FUNCTIONS =====

/**
 * Get festival data for a specific date in 2025
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {Object|Array|null} Festival data (single object or array) or null if not found
 */
function getFestival2025(dateString) {
  return FESTIVALS_2025[dateString] || null;
}

/**
 * Get all festivals for a specific date in 2025 as an array
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {Array} Array of festival objects (empty if none found)
 */
function getFestivals2025(dateString) {
  const data = FESTIVALS_2025[dateString];
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}

/**
 * Get primary (first) festival for a specific date in 2025
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {Object|null} Primary festival data or null if not found
 */
function getPrimaryFestival2025(dateString) {
  const data = FESTIVALS_2025[dateString];
  if (!data) return null;
  return Array.isArray(data) ? data[0] : data;
}

/**
 * Get all festivals for a specific month in 2025
 * @param {number} month - Month (1-12)
 * @returns {Array} Array of festivals with dates
 */
function getFestivalsForMonth2025(month) {
  const festivals = [];
  for (const [date, festivalData] of Object.entries(FESTIVALS_2025)) {
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
 * Get upcoming festivals from current date in 2025
 * @param {Date} fromDate - Starting date
 * @param {number} daysAhead - Number of days to look ahead
 * @returns {Array} Array of upcoming festivals
 */
function getUpcomingFestivals2025(fromDate = new Date(), daysAhead = 30) {
  // Only return 2025 festivals if we're querying for 2025
  if (fromDate.getFullYear() !== 2025) {
    return [];
  }
  
  const upcoming = [];
  const endDate = new Date(fromDate.getTime() + (daysAhead * 24 * 60 * 60 * 1000));
  
  for (const [date, festivalData] of Object.entries(FESTIVALS_2025)) {
    const festivalDate = new Date(date);
    if (festivalDate >= fromDate && festivalDate <= endDate) {
      const daysUntil = Math.ceil((festivalDate - fromDate) / (1000 * 60 * 60 * 1000));
      
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
  
  return upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
}

// ===== GLOBAL EXPOSURE =====
// Make sure these are available globally for the main application
window.FESTIVALS_2025 = FESTIVALS_2025;
window.getFestival2025 = getFestival2025;
window.getFestivals2025 = getFestivals2025;
window.getPrimaryFestival2025 = getPrimaryFestival2025;
window.getFestivalsForMonth2025 = getFestivalsForMonth2025;
window.getUpcomingFestivals2025 = getUpcomingFestivals2025;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FESTIVALS_2025,
    getFestival2025,
    getFestivals2025,
    getPrimaryFestival2025,
    getFestivalsForMonth2025,
    getUpcomingFestivals2025
  };
}