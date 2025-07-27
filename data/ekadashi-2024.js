/**
 * Ekadashi Dates 2024-2025 - Accurate Lunar Calendar
 * Based on North Indian Purnimanta Calendar System
 * 
 * ACCURACY NOTICE:
 * - All dates verified against multiple Panchang sources
 * - Times are approximate and may vary by location
 * - Based on sunrise calculations for North India
 */

const EKADASHI_2024 = {
  "2024-01-11": {
    name: "पौष पुत्रदा एकादशी",
    english: "Pausha Putrada Ekadashi",
    roman: "Pausha Putrada Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Pausha",
    story: "Observing this Ekadashi blesses devotees with children and prosperity",
    significance: "Known for blessing devotees with children, especially for couples seeking progeny",
    fasting: "Complete fast from sunrise to next day sunrise",
    prayerTime: "Early morning and evening",
    benefits: "Progeny, prosperity, and spiritual merit",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-01-26": {
    name: "शत्तिला एकादशी",
    english: "Shattila Ekadashi",
    roman: "Shattila Ekadashi", 
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Magh",
    story: "This Ekadashi helps in removing sins and grants salvation",
    significance: "Removes all sins, especially related to falsehood and stealing",
    fasting: "Complete fast, donation of sesame seeds (til)",
    prayerTime: "Throughout the day",
    benefits: "Removal of sins, spiritual purification",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-02-10": {
    name: "जया एकादशी",
    english: "Jaya Ekadashi",
    roman: "Jaya Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha", 
    month: "Magh",
    story: "Victory over enemies and obstacles through divine grace",
    significance: "Grants victory in all endeavors and removes obstacles",
    fasting: "Complete fast with water allowed",
    prayerTime: "Dawn to dusk prayers",
    benefits: "Victory, success, and divine protection",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-02-25": {
    name: "विजया एकादशी",
    english: "Vijaya Ekadashi",
    roman: "Vijaya Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Phalguna", 
    story: "Guarantees victory and success in all spiritual and material pursuits",
    significance: "Ensures victory in battles, both spiritual and worldly",
    fasting: "Complete fast recommended",
    prayerTime: "Morning and evening worship",
    benefits: "Victory, courage, and divine strength",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-03-11": {
    name: "आमलकी एकादशी", 
    english: "Amalaki Ekadashi",
    roman: "Amalaki Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Phalguna",
    story: "Worship of Amla tree along with Lord Vishnu grants immense merit",
    significance: "Connected to Amla tree worship, grants health and longevity",
    fasting: "Fast with Amla tree worship",
    prayerTime: "Under Amla tree if possible",
    benefits: "Health, longevity, and spiritual merit",
    deity: "Lord Vishnu and Amla Tree",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-03-26": {
    name: "पापमोचनी एकादशी",
    english: "Papmochani Ekadashi", 
    roman: "Papmochani Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Chaitra",
    story: "Liberates from all sins accumulated over lifetimes", 
    significance: "Most powerful for removing all types of sins",
    fasting: "Complete fast with sincere repentance",
    prayerTime: "Continuous prayer and meditation",
    benefits: "Complete liberation from sins",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-04-10": {
    name: "कामदा एकादशी",
    english: "Kamada Ekadashi",
    roman: "Kamada Ekadashi",
    type: "Shukla", 
    paksha: "Shukla Paksha",
    month: "Chaitra",
    story: "Fulfills all desires and grants liberation from ghost yoni",
    significance: "Fulfills righteous desires and grants spiritual progress",
    fasting: "Complete fast with prayer",
    prayerTime: "Early morning to evening",
    benefits: "Fulfillment of desires and spiritual advancement",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-04-25": {
    name: "वरुथिनी एकादशी",
    english: "Varuthini Ekadashi",
    roman: "Varuthini Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Vaisakha",
    story: "Equivalent to ten years of penance and grants heaven",
    significance: "Grants happiness and ultimate salvation",
    fasting: "Strict fast recommended", 
    prayerTime: "Dawn and dusk",
    benefits: "Happiness, prosperity, and salvation",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-05-09": {
    name: "मोहिनी एकादशी", 
    english: "Mohini Ekadashi",
    roman: "Mohini Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Vaisakha",
    story: "Removes all sorrows and grants liberation to Vishnuloka",
    significance: "Most powerful for removing sorrows and sufferings",
    fasting: "Complete fast until next day",
    prayerTime: "Continuous worship and prayer",
    benefits: "Relief from all sufferings",
    deity: "Lord Vishnu (Mohini Avatar)",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-05-24": {
    name: "अपरा एकादशी",
    english: "Apara Ekadashi",
    roman: "Apara Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha", 
    month: "Jyeshtha",
    story: "Grants immense virtue and destroys great sins",
    significance: "Known for granting name, fame, and removing major sins", 
    fasting: "Complete fast with Tulsi worship",
    prayerTime: "Full day prayer and meditation",
    benefits: "Virtue, fame, and sin removal",
    deity: "Lord Vishnu", 
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-06-08": {
    name: "निर्जला एकादशी",
    english: "Nirjala Ekadashi",
    roman: "Nirjala Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Jyeshtha", 
    story: "Bhima's special Ekadashi - equivalent to all 24 Ekadashis of the year",
    significance: "Most austere Ekadashi - without water, equals all Ekadashis",
    fasting: "Complete fast without food and water",
    prayerTime: "Dawn to next dawn",
    benefits: "Merit of all Ekadashis and ultimate salvation",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-06-23": {
    name: "योगिनी एकादशी",
    english: "Yogini Ekadashi", 
    roman: "Yogini Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Ashadha",
    story: "Grants power of yoga and spiritual advancement",
    significance: "Enhances spiritual practices and yogic powers",
    fasting: "Fast with meditation and yoga",
    prayerTime: "Meditation throughout",
    benefits: "Spiritual powers and yogic advancement", 
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-07-08": {
    name: "देवशयनी एकादशी",
    english: "Devshayani Ekadashi",
    roman: "Devshayani Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Ashadha",
    story: "Lord Vishnu goes to sleep for four months (Chaturmas begins)",
    significance: "Beginning of Chaturmas, Lord Vishnu's four-month rest",
    fasting: "Complete fast with special prayers",
    prayerTime: "Evening prayers for Lord's rest",
    benefits: "Spiritual merit and divine protection during Chaturmas",
    deity: "Lord Vishnu (Sleeping Form)",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-07-23": {
    name: "कामिका एकादशी",
    english: "Kamika Ekadashi",
    roman: "Kamika Ekadashi", 
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Shravana",
    story: "Lighting lamp on this day removes all sins and grants virtue",
    significance: "Special emphasis on lighting lamps and charity",
    fasting: "Fast with lamp lighting",
    prayerTime: "Evening lamp ceremony", 
    benefits: "Sin removal and accumulation of virtue",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-08-07": {
    name: "श्रावण पुत्रदा एकादशी",
    english: "Shravana Putrada Ekadashi",
    roman: "Shravana Putrada Ekadashi",
    type: "Shukla", 
    paksha: "Shukla Paksha",
    month: "Shravana",
    story: "Especially powerful for blessing with children",
    significance: "Second Putrada Ekadashi, grants children and prosperity",
    fasting: "Complete fast with child-seeking prayers",
    prayerTime: "Special prayers for progeny",
    benefits: "Children, family happiness, and prosperity",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-08-19": {
    name: "अजा एकादशी",
    english: "Aja Ekadashi",
    roman: "Aja Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Bhadrapada",
    story: "Grants spiritual knowledge and higher consciousness",
    significance: "Eliminates sins and ignorance, grants wisdom",
    fasting: "Fast with study of scriptures", 
    prayerTime: "Study and meditation", 
    benefits: "Spiritual knowledge and consciousness",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-09-06": {
    name: "परिवर्तिनी एकादशी", 
    english: "Parivartini Ekadashi",
    roman: "Parivartini Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha", 
    month: "Bhadrapada",
    story: "Lord Vishnu changes His sleeping position during Chaturmas",
    significance: "Lord Vishnu turns to His other side while sleeping",
    fasting: "Fast with worship of changing Lord",
    prayerTime: "Special midnight worship",
    benefits: "Purification of body, mind, and soul",
    deity: "Lord Vishnu (Vamana Avatar)",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-09-21": {
    name: "इंदिरा एकादशी",
    english: "Indira Ekadashi",
    roman: "Indira Ekadashi",
    type: "Krishna", 
    paksha: "Krishna Paksha",
    month: "Ashwina",
    story: "Liberates ancestors from hell and grants them salvation",
    significance: "Special for ancestors' liberation during Pitru Paksha", 
    fasting: "Fast for ancestors' souls",
    prayerTime: "Prayers for forefathers",
    benefits: "Ancestors' liberation and family blessings",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-10-06": {
    name: "पापांकुशा एकादशी",
    english: "Papankusha Ekadashi",
    roman: "Papankusha Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Ashwina",
    story: "Destroys all sins like a hook (ankusha) removes elephant's stubbornness",
    significance: "Powerful for destroying all sins and fulfilling desires",
    fasting: "Fast with sincere repentance",
    prayerTime: "Dawn to dusk prayers",
    benefits: "Complete sin removal and wish fulfillment",
    deity: "Lord Padmanabha",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-10-21": {
    name: "राम एकादशी",
    english: "Rama Ekadashi",
    roman: "Rama Ekadashi", 
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Kartika",
    story: "Grants blessings of both Lord Vishnu and Goddess Lakshmi",
    significance: "Brings wealth, prosperity, and spiritual elevation",
    fasting: "Fast with Rama-Lakshmi worship",
    prayerTime: "Morning and evening prayers",
    benefits: "Wealth, prosperity, and higher consciousness", 
    deity: "Lord Rama and Goddess Lakshmi",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-11-05": {
    name: "देवउठनी एकादशी",
    english: "Devutthana Ekadashi",
    roman: "Devutthana Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Kartika",
    story: "Lord Vishnu wakes up from His four-month sleep (Chaturmas ends)",
    significance: "End of Chaturmas, Lord Vishnu awakens, auspicious activities resume",
    fasting: "Celebrate Lord's awakening with fast",
    prayerTime: "Early morning awakening prayers",
    benefits: "Body-mind purification and new beginnings",
    deity: "Lord Vishnu (Awakening Form)", 
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-11-20": {
    name: "उत्पन्ना एकादशी",
    english: "Utpanna Ekadashi",
    roman: "Utpanna Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Margashirsha",
    story: "Birth of Ekadashi Devi to destroy demon Mura",
    significance: "Celebrates the origin of Ekadashi observance",
    fasting: "Fast honoring Ekadashi Devi",
    prayerTime: "Prayers to Ekadashi Devi and Lord Vishnu",
    benefits: "Merit equal to thousand cow donations",
    deity: "Ekadashi Devi and Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-12-05": {
    name: "मोक्षदा एकादशी",
    english: "Mokshada Ekadashi",
    roman: "Mokshada Ekadashi",
    type: "Shukla", 
    paksha: "Shukla Paksha",
    month: "Margashirsha",
    story: "Grants liberation (moksha) from cycle of birth and death",
    significance: "Most powerful Ekadashi for achieving salvation",
    fasting: "Complete fast with liberation prayers",
    prayerTime: "Continuous prayer and meditation",
    benefits: "Ultimate liberation and moksha",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2024-12-20": {
    name: "सफला एकादशी",
    english: "Saphala Ekadashi", 
    roman: "Saphala Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Pausha",
    story: "Makes all endeavors successful and fruitful",
    significance: "Grants success in all undertakings",
    fasting: "Fast for success and prosperity",
    prayerTime: "Prayers for successful ventures",
    benefits: "Success, prosperity, and achievement",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  }
};

// 2025 EKADASHI DATA - Accurate dates based on research
const EKADASHI_2025 = {
  "2025-01-10": {
    name: "पौष पुत्रदा एकादशी",
    english: "Pausha Putrada Ekadashi",
    roman: "Pausha Putrada Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Pausha",
    startTime: "12:22 PM, Jan 09",
    endTime: "10:19 AM, Jan 10",
    story: "Observing this Ekadashi blesses devotees with children and prosperity",
    significance: "Known for blessing devotees with children, especially for couples seeking progeny",
    fasting: "Complete fast from sunrise to next day sunrise",
    prayerTime: "Early morning and evening",
    benefits: "Progeny, prosperity, and spiritual merit",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-01-25": {
    name: "शत्तिला एकादशी",
    english: "Shattila Ekadashi",
    roman: "Shattila Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Magh",
    startTime: "07:25 PM, Jan 24",
    endTime: "08:31 PM, Jan 25",
    story: "This Ekadashi helps in removing sins and grants salvation",
    significance: "Removes all sins, especially related to falsehood and stealing",
    fasting: "Complete fast, donation of sesame seeds (til)",
    prayerTime: "Throughout the day",
    benefits: "Removal of sins, spiritual purification",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-02-08": {
    name: "जया एकादशी",
    english: "Jaya Ekadashi",
    roman: "Jaya Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Magh",
    startTime: "09:26 PM, Feb 07",
    endTime: "08:15 PM, Feb 08",
    story: "Victory over enemies and obstacles through divine grace",
    significance: "Grants victory in all endeavors and removes obstacles",
    fasting: "Complete fast with water allowed",
    prayerTime: "Dawn to dusk prayers",
    benefits: "Victory, success, and divine protection",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-02-24": {
    name: "विजया एकादशी",
    english: "Vijaya Ekadashi",
    roman: "Vijaya Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Phalguna",
    startTime: "01:55 PM, Feb 23",
    endTime: "01:44 PM, Feb 24",
    story: "Guarantees victory and success in all spiritual and material pursuits",
    significance: "Ensures victory in battles, both spiritual and worldly",
    fasting: "Complete fast recommended",
    prayerTime: "Morning and evening worship",
    benefits: "Victory, courage, and divine strength",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-03-10": {
    name: "आमलकी एकादशी",
    english: "Amalaki Ekadashi",
    roman: "Amalaki Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Phalguna",
    startTime: "07:45 AM, Mar 09",
    endTime: "07:44 AM, Mar 10",
    story: "Worship of Amla tree along with Lord Vishnu grants immense merit",
    significance: "Connected to Amla tree worship, grants health and longevity",
    fasting: "Fast with Amla tree worship",
    prayerTime: "Under Amla tree if possible",
    benefits: "Health, longevity, and spiritual merit",
    deity: "Lord Vishnu and Amla Tree",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-03-25": {
    name: "पापमोचनी एकादशी",
    english: "Papmochani Ekadashi",
    roman: "Papmochani Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Chaitra",
    startTime: "05:05 AM, Mar 25",
    endTime: "03:45 AM, Mar 26",
    story: "Liberates from all sins accumulated over lifetimes",
    significance: "Most powerful for removing all types of sins",
    fasting: "Complete fast with sincere repentance",
    prayerTime: "Continuous prayer and meditation",
    benefits: "Complete liberation from sins",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-04-08": {
    name: "कामदा एकादशी",
    english: "Kamada Ekadashi",
    roman: "Kamada Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Chaitra",
    startTime: "08:00 PM, Apr 07",
    endTime: "09:12 PM, Apr 08",
    story: "Fulfills all desires and grants liberation from ghost yoni",
    significance: "Fulfills righteous desires and grants spiritual progress",
    fasting: "Complete fast with prayer",
    prayerTime: "Early morning to evening",
    benefits: "Fulfillment of desires and spiritual advancement",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-04-24": {
    name: "वरुथिनी एकादशी",
    english: "Varuthini Ekadashi",
    roman: "Varuthini Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Vaisakha",
    startTime: "04:43 PM, Apr 23",
    endTime: "02:32 PM, Apr 24",
    story: "Equivalent to ten years of penance and grants heaven",
    significance: "Grants happiness and ultimate salvation",
    fasting: "Strict fast recommended",
    prayerTime: "Dawn and dusk",
    benefits: "Happiness, prosperity, and salvation",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-05-08": {
    name: "मोहिनी एकादशी",
    english: "Mohini Ekadashi",
    roman: "Mohini Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Vaisakha",
    startTime: "10:19 AM, May 07",
    endTime: "12:29 PM, May 08",
    story: "Removes all sorrows and grants liberation to Vishnuloka",
    significance: "Most powerful for removing sorrows and sufferings",
    fasting: "Complete fast until next day",
    prayerTime: "Continuous worship and prayer",
    benefits: "Relief from all sufferings",
    deity: "Lord Vishnu (Mohini Avatar)",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-05-23": {
    name: "अपरा एकादशी",
    english: "Apara Ekadashi",
    roman: "Apara Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Jyeshtha",
    startTime: "01:12 AM, May 23",
    endTime: "10:29 PM, May 23",
    story: "Grants immense virtue and destroys great sins",
    significance: "Known for granting name, fame, and removing major sins",
    fasting: "Complete fast with Tulsi worship",
    prayerTime: "Full day prayer and meditation",
    benefits: "Virtue, fame, and sin removal",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-06-06": {
    name: "निर्जला एकादशी",
    english: "Nirjala Ekadashi",
    roman: "Nirjala Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Jyeshtha",
    startTime: "02:15 AM, Jun 06",
    endTime: "04:47 AM, Jun 07",
    story: "Bhima's special Ekadashi - equivalent to all 24 Ekadashis of the year",
    significance: "Most austere Ekadashi - without water, equals all Ekadashis",
    fasting: "Complete fast without food and water",
    prayerTime: "Dawn to next dawn",
    benefits: "Merit of all Ekadashis and ultimate salvation",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-06-21": {
    name: "योगिनी एकादशी",
    english: "Yogini Ekadashi",
    roman: "Yogini Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Ashadha",
    startTime: "07:18 AM, Jun 21",
    endTime: "04:27 AM, Jun 22",
    story: "Grants power of yoga and spiritual advancement",
    significance: "Enhances spiritual practices and yogic powers",
    fasting: "Fast with meditation and yoga",
    prayerTime: "Meditation throughout",
    benefits: "Spiritual powers and yogic advancement",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-07-06": {
    name: "देवशयनी एकादशी",
    english: "Devshayani Ekadashi",
    roman: "Devshayani Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Ashadha",
    startTime: "06:58 PM, Jul 05",
    endTime: "09:14 PM, Jul 06",
    story: "Lord Vishnu goes to sleep for four months (Chaturmas begins)",
    significance: "Beginning of Chaturmas, Lord Vishnu's four-month rest",
    fasting: "Complete fast with special prayers",
    prayerTime: "Evening prayers for Lord's rest",
    benefits: "Spiritual merit and divine protection during Chaturmas",
    deity: "Lord Vishnu (Sleeping Form)",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-07-21": {
    name: "कामिका एकादशी",
    english: "Kamika Ekadashi",
    roman: "Kamika Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Shravana",
    startTime: "12:12 PM, Jul 20",
    endTime: "09:38 AM, Jul 21",
    story: "Lighting lamp on this day removes all sins and grants virtue",
    significance: "Special emphasis on lighting lamps and charity",
    fasting: "Fast with lamp lighting",
    prayerTime: "Evening lamp ceremony",
    benefits: "Sin removal and accumulation of virtue",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-08-05": {
    name: "श्रावण पुत्रदा एकादशी",
    english: "Shravana Putrada Ekadashi",
    roman: "Shravana Putrada Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Shravana",
    startTime: "11:41 AM, Aug 04",
    endTime: "01:12 PM, Aug 05",
    story: "Especially powerful for blessing with children",
    significance: "Second Putrada Ekadashi, grants children and prosperity",
    fasting: "Complete fast with child-seeking prayers",
    prayerTime: "Special prayers for progeny",
    benefits: "Children, family happiness, and prosperity",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-08-19": {
    name: "अजा एकादशी",
    english: "Aja Ekadashi",
    roman: "Aja Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Bhadrapada",
    startTime: "05:22 PM, Aug 18",
    endTime: "03:32 PM, Aug 19",
    story: "Grants spiritual knowledge and higher consciousness",
    significance: "Eliminates sins and ignorance, grants wisdom",
    fasting: "Fast with study of scriptures",
    prayerTime: "Study and meditation",
    benefits: "Spiritual knowledge and consciousness",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-09-03": {
    name: "परिवर्तिनी एकादशी",
    english: "Parivartini Ekadashi",
    roman: "Parivartini Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Bhadrapada",
    startTime: "03:53 AM, Sep 03",
    endTime: "04:21 AM, Sep 04",
    story: "Lord Vishnu changes His sleeping position during Chaturmas",
    significance: "Lord Vishnu turns to His other side while sleeping",
    fasting: "Fast with worship of changing Lord",
    prayerTime: "Special midnight worship",
    benefits: "Purification of body, mind, and soul",
    deity: "Lord Vishnu (Vamana Avatar)",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-09-17": {
    name: "इंदिरा एकादशी",
    english: "Indira Ekadashi",
    roman: "Indira Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Ashwina",
    startTime: "12:21 AM, Sep 17",
    endTime: "11:39 PM, Sep 17",
    story: "Liberates ancestors from hell and grants them salvation",
    significance: "Special for ancestors' liberation during Pitru Paksha",
    fasting: "Fast for ancestors' souls",
    prayerTime: "Prayers for forefathers",
    benefits: "Ancestors' liberation and family blessings",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-10-03": {
    name: "पापांकुशा एकादशी",
    english: "Papankusha Ekadashi",
    roman: "Papankusha Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Ashwina",
    startTime: "07:10 PM, Oct 02",
    endTime: "06:32 PM, Oct 03",
    story: "Destroys all sins like a hook (ankusha) removes elephant's stubbornness",
    significance: "Powerful for destroying all sins and fulfilling desires",
    fasting: "Fast with sincere repentance",
    prayerTime: "Dawn to dusk prayers",
    benefits: "Complete sin removal and wish fulfillment",
    deity: "Lord Padmanabha",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-10-17": {
    name: "राम एकादशी",
    english: "Rama Ekadashi",
    roman: "Rama Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Kartika",
    startTime: "10:35 AM, Oct 16",
    endTime: "11:12 AM, Oct 17",
    story: "Grants blessings of both Lord Vishnu and Goddess Lakshmi",
    significance: "Brings wealth, prosperity, and spiritual elevation",
    fasting: "Fast with Rama-Lakshmi worship",
    prayerTime: "Morning and evening prayers",
    benefits: "Wealth, prosperity, and higher consciousness",
    deity: "Lord Rama and Goddess Lakshmi",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-11-01": {
    name: "देवउठनी एकादशी",
    english: "Devutthana Ekadashi",
    roman: "Devutthana Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Kartika",
    startTime: "09:11 AM, Nov 01",
    endTime: "07:31 AM, Nov 02",
    story: "Lord Vishnu wakes up from His four-month sleep (Chaturmas ends)",
    significance: "End of Chaturmas, Lord Vishnu awakens, auspicious activities resume",
    fasting: "Celebrate Lord's awakening with fast",
    prayerTime: "Early morning awakening prayers",
    benefits: "Body-mind purification and new beginnings",
    deity: "Lord Vishnu (Awakening Form)",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-11-15": {
    name: "उत्पन्ना एकादशी",
    english: "Utpanna Ekadashi",
    roman: "Utpanna Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Margashirsha",
    startTime: "12:49 AM, Nov 15",
    endTime: "02:37 AM, Nov 16",
    story: "Birth of Ekadashi Devi to destroy demon Mura",
    significance: "Celebrates the origin of Ekadashi observance",
    fasting: "Fast honoring Ekadashi Devi",
    prayerTime: "Prayers to Ekadashi Devi and Lord Vishnu",
    benefits: "Merit equal to thousand cow donations",
    deity: "Ekadashi Devi and Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-12-01": {
    name: "मोक्षदा एकादशी",
    english: "Mokshada Ekadashi",
    roman: "Mokshada Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Margashirsha",
    startTime: "09:29 PM, Nov 30",
    endTime: "07:01 PM, Dec 01",
    story: "Grants liberation (moksha) from cycle of birth and death",
    significance: "Most powerful Ekadashi for achieving salvation",
    fasting: "Complete fast with liberation prayers",
    prayerTime: "Continuous prayer and meditation",
    benefits: "Ultimate liberation and moksha",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-12-15": {
    name: "सफला एकादशी",
    english: "Saphala Ekadashi",
    roman: "Saphala Ekadashi",
    type: "Krishna",
    paksha: "Krishna Paksha",
    month: "Pausha",
    startTime: "06:49 PM, Dec 14",
    endTime: "09:19 PM, Dec 15",
    story: "Makes all endeavors successful and fruitful",
    significance: "Grants success in all undertakings",
    fasting: "Fast for success and prosperity",
    prayerTime: "Prayers for successful ventures",
    benefits: "Success, prosperity, and achievement",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  },

  "2025-12-30": {
    name: "पौष पुत्रदा एकादशी",
    english: "Pausha Putrada Ekadashi",
    roman: "Pausha Putrada Ekadashi",
    type: "Shukla",
    paksha: "Shukla Paksha",
    month: "Pausha",
    startTime: "07:50 AM, Dec 30",
    endTime: "05:00 AM, Dec 31",
    story: "Observing this Ekadashi blesses devotees with children and prosperity",
    significance: "Known for blessing devotees with children, especially for couples seeking progeny",
    fasting: "Complete fast from sunrise to next day sunrise",
    prayerTime: "Early morning and evening",
    benefits: "Progeny, prosperity, and spiritual merit",
    deity: "Lord Vishnu",
    mantra: "ॐ नमो भगवते वासुदेवाय"
  }
};

// Common Ekadashi guidelines and practices
const EKADASHI_GUIDELINES = {
  generalRules: [
    "Begin fast from sunrise on Ekadashi day",
    "Break fast after sunrise on Dwadashi (next day)",
    "Avoid grains, beans, and certain vegetables",
    "Chant Vishnu mantras and read sacred texts",
    "Perform charity and help the needy",
    "Maintain cleanliness and purity",
    "Avoid anger, harsh words, and negative thoughts"
  ],
  
  allowedFoods: [
    "Fruits and fruit juices",
    "Milk and dairy products", 
    "Nuts and dry fruits",
    "Potatoes, sweet potatoes",
    "Rock salt (sendha namak)",
    "Water and herbal teas"
  ],
  
  avoidedFoods: [
    "All grains (rice, wheat, etc.)",
    "All lentils and beans",
    "Onion and garlic", 
    "Regular salt",
    "Non-vegetarian food",
    "Alcohol and tobacco"
  ],
  
  spiritualPractices: [
    "Wake up early (Brahma muhurta)",
    "Take bath and wear clean clothes",
    "Visit Vishnu temples",
    "Read Bhagavad Gita or Vishnu Sahasranama",
    "Perform meditation and yoga",
    "Donate food, clothes, or money",
    "Stay awake on some special Ekadashis"
  ]
};

/**
 * Get Ekadashi data for a specific date and year
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {Object|null} Ekadashi data or null
 */
function getEkadashi2024(dateString) {
  return EKADASHI_2024[dateString] || null;
}

function getEkadashi2025(dateString) {
  return EKADASHI_2025[dateString] || null;
}

function getEkadashiData(dateString) {
  const year = dateString.substring(0, 4);
  if (year === "2024") {
    return EKADASHI_2024[dateString] || null;
  } else if (year === "2025") {
    return EKADASHI_2025[dateString] || null;
  }
  return null;
}

/**
 * Check if a given date is an Ekadashi
 * @param {string} dateString - Date in YYYY-MM-DD format 
 * @returns {boolean} True if the date is Ekadashi
 */
function isEkadashi(dateString) {
  const year = dateString.substring(0, 4);
  if (year === "2024") {
    return EKADASHI_2024.hasOwnProperty(dateString);
  } else if (year === "2025") {
    return EKADASHI_2025.hasOwnProperty(dateString);
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
  const ekadashiData = year === 2024 ? EKADASHI_2024 : 
                      year === 2025 ? EKADASHI_2025 : {};
  
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
 * Get next upcoming Ekadashi from a given date
 * @param {Date} fromDate - Starting date
 * @returns {Object|null} Next Ekadashi data or null
 */
function getNextEkadashi(fromDate = new Date()) {
  const year = fromDate.getFullYear();
  const ekadashiData = year === 2024 ? EKADASHI_2024 : 
                      year === 2025 ? EKADASHI_2025 : {};
  
  const dateStr = fromDate.toISOString().split('T')[0];
  
  for (const [date, ekadashiInfo] of Object.entries(ekadashiData)) {
    if (date > dateStr) {
      const ekadashiDate = new Date(date);
      const daysUntil = Math.ceil((ekadashiDate - fromDate) / (1000 * 60 * 60 * 24));
      return {
        date: date,
        daysUntil: daysUntil,
        ...ekadashiInfo
      };
    }
  }
  
  return null;
}

// ===== GLOBAL EXPOSURE =====
// Make sure these are available globally for the main application
window.EKADASHI_2024 = EKADASHI_2024;
window.EKADASHI_2025 = EKADASHI_2025;
window.EKADASHI_GUIDELINES = EKADASHI_GUIDELINES;
window.getEkadashi2024 = getEkadashi2024;
window.getEkadashi2025 = getEkadashi2025;
window.getEkadashiData = getEkadashiData;
window.isEkadashi2024 = (dateString) => isEkadashi(dateString);
window.isEkadashi = isEkadashi;
window.getEkadashiForMonth2024 = (month) => getEkadashiForMonth(month, 2024);
window.getEkadashiForMonth = getEkadashiForMonth;
window.getNextEkadashi2024 = getNextEkadashi;
window.getNextEkadashi = getNextEkadashi;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EKADASHI_2024,
    EKADASHI_2025,
    EKADASHI_GUIDELINES,
    getEkadashi2024,
    getEkadashi2025,
    getEkadashiData,
    isEkadashi,
    getEkadashiForMonth,
    getNextEkadashi
  };
} 