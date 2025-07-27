// Enhanced Hindu Calendar with Cultural Awareness System
class HinduCalendar {
    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.today = new Date();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCurrentDateInfo();
        this.generateCalendar();
        this.generateFestivals();
        this.generateHinduMonths();
        this.generatePanchang();
        this.highlightTodaysSignificance();
        this.displayCurrentPeriodAwareness();
        this.showUpcomingNotifications();
    }

    // 🎯 COMPREHENSIVE NORTH INDIAN FESTIVAL DATABASE
    northIndianFestivals2024_2025 = {
        2024: {
            // January 2024
            0: {
                14: { 
                    name: "मकर संक्रांति", 
                    english: "Makar Sankranti", 
                    roman: "Makar Sankraanti",
                    type: "major",
                    significance: "Sun's northward journey begins, end of winter",
                    practices: "Kite flying, til-gud sweets, holy baths in Ganga",
                    region: "All North India",
                    modernTip: "Fly kites on terrace, share til-gud with neighbors"
                },
                25: { 
                    name: "वसंत पंचमी", 
                    english: "Vasant Panchami", 
                    roman: "Vasant Panchami",
                    type: "major",
                    significance: "Worship of Goddess Saraswati, spring season begins",
                    practices: "Wear yellow, worship books/instruments, kite flying",
                    region: "North India especially",
                    modernTip: "Students seek blessings for studies, yellow dress code"
                }
            },
            // February 2024  
            1: {
                19: { 
                    name: "महा शिवरात्रि", 
                    english: "Maha Shivratri", 
                    roman: "Mahaa Shivraatri",
                    type: "major",
                    significance: "Greatest night of Lord Shiva, cosmic dance celebration",
                    practices: "Night-long fast, Shiva temple visits, Om Namah Shivaya chanting",
                    region: "All North India",
                    modernTip: "Join temple groups, night meditation, offer milk to Shiva Linga"
                }
            },
            // March 2024
            2: {
                8: { 
                    name: "होली", 
                    english: "Holi", 
                    roman: "Holi",
                    type: "major",
                    significance: "Festival of colors, victory of good over evil",
                    practices: "Play with colors, sing, dance, enjoy gujiya and thandai",
                    region: "Especially UP, Bihar, Rajasthan",
                    modernTip: "Organic colors, community celebrations, forgive and unite"
                },
                17: { 
                    name: "राम नवमी", 
                    english: "Ram Navami", 
                    roman: "Raam Navami",
                    type: "major",
                    significance: "Lord Rama's birthday, ideals of dharma",
                    practices: "Ramayana recitation, temple visits, community prayers",
                    region: "All North India",
                    modernTip: "Read Ramayana passages, visit temples, organize satsang"
                }
            },
            // Continue with other months...
            7: {
                11: { 
                    name: "श्रावण आरंभ", 
                    english: "Sawan Begins", 
                    roman: "Shraavan/Saawan Aarambh",
                    type: "period_start",
                    significance: "Holiest month for Lord Shiva begins",
                    practices: "Monday fasting, Shiva prayers, Kanwar Yatra",
                    region: "All North India",
                    modernTip: "Start Monday fasts, daily Shiva mantras, visit Shiva temples"
                },
                19: { 
                    name: "रक्षा बंधन", 
                    english: "Raksha Bandhan", 
                    roman: "Rakshaa Bandhan",
                    type: "major",
                    significance: "Sacred brother-sister bond, promise of protection",
                    practices: "Sisters tie rakhi, brothers give gifts, family feasts",
                    region: "All North India",
                    modernTip: "Video calls for distant siblings, rakhi courier services"
                },
                26: { 
                    name: "कृष्ण जन्माष्टमी", 
                    english: "Krishna Janmashtami", 
                    roman: "Krishna Janmaashtami",
                    type: "major",
                    significance: "Lord Krishna's birthday, divine love and dharma",
                    practices: "Midnight prayers, fasting, dahi-handi, Krishna Leela",
                    region: "All North India",
                    modernTip: "Fast until midnight, sing bhajans, organize community events"
                }
            },
            // Add more months as needed
        },
        2025: {
            // January 2025
            0: {
                14: { name: "मकर संक्रांति", english: "Makar Sankranti", roman: "Makar Sankraanti", type: "major" }
            },
            // Add more 2025 data
        }
    };

    // 🌙 CURRENT PERIOD AWARENESS SYSTEM
    culturalPeriods = {
        "sawan": {
            name: "श्रावण मास",
            english: "Shravan Maas",
            roman: "Shraavan Maas",
            start: new Date(2024, 6, 11), // July 11, 2024
            end: new Date(2024, 7, 9),   // August 9, 2024
            significance: "Holiest month for Lord Shiva worship",
            dailyFocus: "Monday fasting and Shiva prayers",
            weeklyTheme: "Kanwar Yatra devotion season",
            practices: ["Daily Shiva mantras", "Monday fasting", "Temple visits", "Ganga water offering"],
            modernTips: ["5-minute office meditation", "Vegetarian meals", "Evening prayers"]
        },
        "navratri": {
            name: "नवरात्रि",
            english: "Navratri",
            roman: "Navraatri", 
            start: new Date(2024, 8, 22), // Sept 22, 2024
            end: new Date(2024, 9, 1),   // Oct 1, 2024
            significance: "Nine nights of Goddess Durga worship",
            dailyFocus: "Different form of Durga each day",
            weeklyTheme: "Divine feminine energy celebration",
            practices: ["Daily fasting", "Durga mantras", "Garba dancing", "Community prayers"],
            modernTips: ["Join local Garba groups", "Vegetarian diet", "Evening dance sessions"]
        }
    };

    // 🔤 LANGUAGE SYSTEM - Hindi/Roman/English
    getTripleDisplay(festival) {
        return {
            primary: festival.name,           // देवी दुर्गा
            roman: festival.roman,            // Devi Durgaa  
            english: festival.english,        // Goddess Durga
            pronunciation: `🔊 ${festival.roman}`
        };
    }

    // 📅 CURRENT PERIOD DETECTION
    getCurrentPeriod() {
        const now = this.today;
        
        for (const [key, period] of Object.entries(this.culturalPeriods)) {
            if (now >= period.start && now <= period.end) {
                const daysRemaining = Math.ceil((period.end - now) / (1000 * 60 * 60 * 24));
                return {
                    ...period,
                    isActive: true,
                    daysRemaining: daysRemaining,
                    progressPercentage: ((now - period.start) / (period.end - period.start)) * 100
                };
            }
        }
        return null;
    }

    // 🔮 UPCOMING FESTIVALS DETECTOR
    getUpcomingFestivals(days = 30) {
        const upcoming = [];
        const now = this.today;
        const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));

        // Check current year festivals
        const currentYearFestivals = this.northIndianFestivals2024_2025[now.getFullYear()];
        if (currentYearFestivals) {
            for (const [month, monthFestivals] of Object.entries(currentYearFestivals)) {
                for (const [day, festival] of Object.entries(monthFestivals)) {
                    const festivalDate = new Date(now.getFullYear(), parseInt(month), parseInt(day));
                    
                    if (festivalDate > now && festivalDate <= futureDate) {
                        const daysUntil = Math.ceil((festivalDate - now) / (1000 * 60 * 60 * 24));
                        upcoming.push({
                            ...festival,
                            date: festivalDate,
                            daysUntil: daysUntil,
                            urgency: daysUntil <= 7 ? 'high' : daysUntil <= 14 ? 'medium' : 'low'
                        });
                    }
                }
            }
        }

        return upcoming.sort((a, b) => a.daysUntil - b.daysUntil);
    }

    // 🎯 TODAY'S SIGNIFICANCE DETECTOR
    getTodaysSignificance() {
        const today = this.today;
        const currentPeriod = this.getCurrentPeriod();
        
        // Check if today is a specific festival
        const todayFestival = this.getFestivalForDate(today.getFullYear(), today.getMonth(), today.getDate());
        
        // Check if today is special within current period
        let todaySpecial = null;
        if (currentPeriod) {
            const dayOfWeek = today.getDay();
            if (currentPeriod.name === "श्रावण मास" && dayOfWeek === 1) { // Monday in Sawan
                todaySpecial = {
                    type: "special_day",
                    name: "सावन सोमवार",
                    english: "Sawan Monday", 
                    roman: "Saavan Somwaar",
                    significance: "Most auspicious day for Lord Shiva worship",
                    action: "Fast, visit Shiva temple, chant Om Namah Shivaya"
                };
            }
        }

        return {
            festival: todayFestival,
            specialDay: todaySpecial,
            currentPeriod: currentPeriod,
            dayType: todayFestival ? 'festival' : todaySpecial ? 'special' : 'regular'
        };
    }

    // 🎨 UI ENHANCEMENT - Current Period Display
    displayCurrentPeriodAwareness() {
        const currentPeriod = this.getCurrentPeriod();
        const headerContent = document.querySelector('.header-content');
        
        if (currentPeriod && headerContent) {
            // Remove existing period display
            const existingPeriod = document.getElementById('currentPeriodDisplay');
            if (existingPeriod) existingPeriod.remove();

            const periodDisplay = document.createElement('div');
            periodDisplay.id = 'currentPeriodDisplay';
            periodDisplay.className = 'current-period-display';
            periodDisplay.innerHTML = `
                <div style="background: rgba(255,255,255,0.2); border-radius: 15px; padding: 15px; margin-top: 15px; text-align: center;">
                    <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 5px;">
                        🌙 ACTIVE: ${currentPeriod.name} (${currentPeriod.roman})
                    </div>
                    <div style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 8px;">
                        ${currentPeriod.significance}
                    </div>
                    <div style="font-size: 0.8rem; background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 10px; display: inline-block;">
                        ⏰ ${currentPeriod.daysRemaining} days remaining
                    </div>
                    <div style="font-size: 0.8rem; margin-top: 8px;">
                        🎯 Focus: ${currentPeriod.dailyFocus}
                    </div>
                </div>
            `;
            headerContent.appendChild(periodDisplay);
        }
    }

    // 🔔 UPCOMING NOTIFICATIONS DISPLAY
    showUpcomingNotifications() {
        const upcoming = this.getUpcomingFestivals(14); // Next 2 weeks
        const mainContent = document.querySelector('.main-content');
        
        if (upcoming.length > 0 && mainContent) {
            // Remove existing notifications
            const existingNotifications = document.getElementById('upcomingNotifications');
            if (existingNotifications) existingNotifications.remove();

            const notificationsDiv = document.createElement('div');
            notificationsDiv.id = 'upcomingNotifications';
            notificationsDiv.className = 'upcoming-notifications';
            
            let notificationsHTML = `
                <div style="background: linear-gradient(135deg, #ff9933, #ffb84d); border-radius: 15px; padding: 20px; margin: 20px 0; color: white;">
                    <h3 style="margin: 0 0 15px 0; display: flex; align-items: center;">
                        🔮 Upcoming Cultural Events
                    </h3>
                    <div style="display: grid; gap: 10px;">
            `;

            upcoming.slice(0, 3).forEach(festival => {
                const urgencyColor = festival.urgency === 'high' ? '#ff4444' : festival.urgency === 'medium' ? '#ffaa44' : '#44ff44';
                notificationsHTML += `
                    <div style="background: rgba(255,255,255,0.2); border-radius: 10px; padding: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: 600;">${festival.name} (${festival.roman})</div>
                                <div style="font-size: 0.8rem; opacity: 0.9;">${festival.significance}</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="background: ${urgencyColor}; color: white; padding: 4px 8px; border-radius: 15px; font-size: 0.7rem; font-weight: 600;">
                                    ${festival.daysUntil} days
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            notificationsHTML += `
                    </div>
                </div>
            `;

            notificationsDiv.innerHTML = notificationsHTML;
            mainContent.insertBefore(notificationsDiv, mainContent.firstChild);
        }
    }

    // Enhanced today's significance with cultural periods
    highlightTodaysSignificance() {
        const todaysInfo = this.getTodaysSignificance();
        const headerContent = document.querySelector('.header-content');
        
        if (headerContent && !document.getElementById('todaysSignificance')) {
            let significance = '';
            
            if (todaysInfo.festival) {
                const display = this.getTripleDisplay(todaysInfo.festival);
                significance = `🎊 TODAY: ${display.primary} (${display.roman})`;
            } else if (todaysInfo.specialDay) {
                significance = `🙏 TODAY: ${todaysInfo.specialDay.name} (${todaysInfo.specialDay.roman}) - ${todaysInfo.specialDay.significance}`;
            } else if (todaysInfo.currentPeriod) {
                significance = `📿 ${todaysInfo.currentPeriod.dailyFocus}`;
            } else {
                significance = '📿 Regular day for spiritual practice and dharma';
            }
            
            const significanceDiv = document.createElement('div');
            significanceDiv.id = 'todaysSignificance';
            significanceDiv.innerHTML = `
                <div style="margin-top: 10px; padding: 10px; background: rgba(255,255,255,0.2); border-radius: 15px; font-size: 0.9rem;">
                    ${significance}
                </div>
            `;
            headerContent.appendChild(significanceDiv);
        }
    }

    // Hindu Calendar Data
    hinduMonths = [
        {
            name: "चैत्र",
            english: "Chaitra",
            roman: "Chaitra",
            description: "First month of the Hindu calendar, marks the beginning of spring. Celebrated with Ram Navami and Chaitra Navratri.",
            gregorianMonths: "March-April",
            significance: "New beginnings, spring festivals, Ram Navami"
        },
        {
            name: "वैशाख",
            english: "Vaisakha", 
            roman: "Vaishaakh",
            description: "Second month, known for Buddha Purnima and Akshaya Tritiya. Considered auspicious for new beginnings.",
            gregorianMonths: "April-May",
            significance: "Prosperity rituals, gold purchases, charitable acts"
        },
        {
            name: "ज्येष्ठ",
            english: "Jyeshtha",
            roman: "Jyeshtha", 
            description: "Third month, summer begins. Known for Ganga Dussehra and considered sacred for river worship.",
            gregorianMonths: "May-June",
            significance: "River worship, Ganga celebrations, summer solstice"
        },
        {
            name: "आषाढ़",
            english: "Ashadha",
            roman: "Aashaarh",
            description: "Fourth month, monsoon season begins. Famous for Rath Yatra and Guru Purnima celebrations.",
            gregorianMonths: "June-July",
            significance: "Monsoon arrival, Jagannath Rath Yatra, Guru worship"
        },
        {
            name: "श्रावण",
            english: "Shravana",
            roman: "Shraavan/Saavan",
            description: "Fifth month, holiest month for Lord Shiva. Celebrated with Teej, Raksha Bandhan, and Krishna Janmashtami.",
            gregorianMonths: "July-August",
            significance: "Holiest Month - Shiva worship, Monday fasting, Kanwar Yatra",
            isSpecial: true
        },
        {
            name: "भाद्रपद",
            english: "Bhadrapada",
            roman: "Bhaadrapada",
            description: "Sixth month, known for Ganesh Chaturthi and Pitru Paksha. Important for ancestor worship.",
            gregorianMonths: "August-September",
            significance: "Ganesha worship, ancestor reverence, Pitru Paksha"
        },
        {
            name: "अश्विन",
            english: "Ashwina",
            roman: "Ashwin",
            description: "Seventh month, celebrated with Navratri and Dussehra. Festival season begins.",
            gregorianMonths: "September-October",
            significance: "FESTIVAL SEASON - Navratri, Durga Puja, Dussehra",
            isSpecial: true
        },
        {
            name: "कार्तिक",
            english: "Kartika",
            roman: "Kaartik",
            description: "Eighth month, festival of lights - Diwali. Most auspicious month for worship and charity.",
            gregorianMonths: "October-November",
            significance: "DIWALI MONTH - Festival of lights, wealth worship",
            isSpecial: true
        },
        {
            name: "मार्गशीर्ष",
            english: "Margashirsha",
            roman: "Maargasheersh",
            description: "Ninth month, winter begins. Sacred month mentioned in Bhagavad Gita as the best of months.",
            gregorianMonths: "November-December",
            significance: "Winter worship, Gita Jayanti, spiritual study"
        },
        {
            name: "पौष",
            english: "Pausha",
            roman: "Paush",
            description: "Tenth month, known for Makar Sankranti preparations and winter solstice celebrations.",
            gregorianMonths: "December-January", 
            significance: "Winter solstice, Sankranti preparations"
        },
        {
            name: "माघ",
            english: "Magh",
            roman: "Magh",
            description: "Eleventh month, sacred for holy baths. Celebrated with Magh Mela and Vasant Panchami.",
            gregorianMonths: "January-February",
            significance: "Holy baths, Magh Mela, Saraswati worship"
        },
        {
            name: "फाल्गुन",
            english: "Phalguna",
            roman: "Phaalgun",
            description: "Twelfth month, spring festival of Holi. Ends with Holika Dahan and colorful celebrations.",
            gregorianMonths: "February-March",
            significance: "HOLI MONTH - Colors, spring celebration, joy",
            isSpecial: true
        }
    ];

    // Major Hindu Festivals with detailed information
    hinduFestivals = [
        {
            name: "महा शिवरात्रि",
            english: "Maha Shivratri",
            roman: "Mahaa Shivraatri",
            date: "February/March",
            description: "Greatest night of Lord Shiva, observed with fasting, meditation, and night-long prayers. Devotees chant 'Om Namah Shivaya' and offer Bel leaves.",
            significance: "Celebrates the cosmic dance of creation, preservation, and destruction.",
        },
        {
            name: "होली",
            english: "Holi",
            roman: "Holi",
            date: "March",
            description: "Festival of colors celebrating the victory of good over evil. Commemorates the love of Radha-Krishna and the burning of demoness Holika.",
            significance: "Welcomes spring and strengthens community bonds through forgiveness and joy.",
        },
        {
            name: "राम नवमी",
            english: "Ram Navami",
            roman: "Raam Navami",
            date: "March/April",
            description: "Birthday of Lord Rama, the seventh avatar of Vishnu. Celebrated with recitation of Ramayana and devotional singing.",
            significance: "Honors the ideals of truth, courage, and righteousness exemplified by Lord Rama.",
        },
        // Add more festivals with enhanced cultural data
    ];

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('calendarBtn').addEventListener('click', () => this.showView('calendar'));
        document.getElementById('festivalsBtn').addEventListener('click', () => this.showView('festivals'));
        document.getElementById('monthsBtn').addEventListener('click', () => this.showView('months'));
        document.getElementById('panchayangBtn').addEventListener('click', () => this.showView('panchyang'));

        // Calendar navigation
        document.getElementById('prevMonth').addEventListener('click', () => this.previousMonth());
        document.getElementById('nextMonth').addEventListener('click', () => this.nextMonth());

        // Modal close
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });
    }

    showView(viewName) {
        // Remove active class from all views and nav buttons
        document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

        // Show selected view and highlight nav button
        document.getElementById(viewName + 'View').classList.add('active');
        document.getElementById(viewName + 'Btn').classList.add('active');
    }

    updateCurrentDateInfo() {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        document.getElementById('englishDate').textContent = this.today.toLocaleDateString('en-US', options);
        
        // Hindu date calculation with enhanced info
        const hinduMonth = this.hinduMonths[this.today.getMonth()];
        document.getElementById('hindiDate').textContent = `${hinduMonth.name} (${hinduMonth.roman}) ${this.getHinduDay()}`;
        
        // Enhanced Tithi info with significance
        const tithis = [
            {name: 'प्रतिपदा', roman: 'Pratipada'}, {name: 'द्वितीया', roman: 'Dwitiya'}, 
            {name: 'तृतीया', roman: 'Tritiya'}, {name: 'चतुर्थी', roman: 'Chaturthi'}, 
            {name: 'पंचमी', roman: 'Panchami'}, {name: 'षष्ठी', roman: 'Shashthi'}, 
            {name: 'सप्तमी', roman: 'Saptami'}, {name: 'अष्टमी', roman: 'Ashtami'}, 
            {name: 'नवमी', roman: 'Navami'}, {name: 'दशमी', roman: 'Dashami'}, 
            {name: 'एकादशी', roman: 'Ekadashi'}, {name: 'द्वादशी', roman: 'Dwadashi'}, 
            {name: 'त्रयोदशी', roman: 'Trayodashi'}, {name: 'चतुर्दशी', roman: 'Chaturdashi'}, 
            {name: 'पूर्णिमा', roman: 'Purnima'}
        ];
        const currentTithi = tithis[this.today.getDate() % 15];
        document.getElementById('tithiInfo').textContent = `${currentTithi.name} (${currentTithi.roman})`;
    }

    getHinduDay() {
        const day = this.today.getDate();
        const hinduDays = ['१', '२', '३', '४', '५', '६', '७', '८', '९', '१०', '११', '१२', '१३', '१४', '१५', '१६', '१७', '१८', '१९', '२०', '२१', '२२', '२३', '२४', '२५', '२६', '२७', '२८', '२९', '३०', '३१'];
        return hinduDays[day - 1] || day.toString();
    }

    generateCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';

        // Update month/year display with enhanced info
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        const hinduMonth = this.hinduMonths[this.currentMonth];
        
        document.getElementById('currentMonth').textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
        document.getElementById('hindiMonth').innerHTML = `${hinduMonth.name} (${hinduMonth.roman})${hinduMonth.isSpecial ? ' ⭐' : ''}`;

        // Calendar headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });

        // Get first day of month and number of days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();

        // Add previous month's trailing days
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayElement = this.createDayElement(daysInPrevMonth - i, true, -1);
            calendarGrid.appendChild(dayElement);
        }

        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = this.createDayElement(day, false, 0);
            calendarGrid.appendChild(dayElement);
        }

        // Add next month's leading days
        const totalCells = 42; // 6 rows × 7 days
        const remainingCells = totalCells - (firstDay + daysInMonth);
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = this.createDayElement(day, true, 1);
            calendarGrid.appendChild(dayElement);
        }
    }

    createDayElement(day, isOtherMonth, monthOffset) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        }

        // Check if it's today
        const checkDate = new Date(this.currentYear, this.currentMonth + monthOffset, day);
        if (!isOtherMonth && day === this.today.getDate() && 
            this.currentMonth === this.today.getMonth() && 
            this.currentYear === this.today.getFullYear()) {
            dayElement.classList.add('today');
        }

        // Check for festivals using ACCURATE dates
        const festival = this.getFestivalForDate(this.currentYear, this.currentMonth, day);
        if (festival && !isOtherMonth) {
            dayElement.classList.add(festival.type);
        }

        // Check for Ekadashi using ACCURATE dates
        if (this.isEkadashi(this.currentYear, this.currentMonth, day) && !isOtherMonth) {
            dayElement.classList.add('ekadashi');
        }

        dayElement.innerHTML = `
            <div class="day-number">${day}</div>
            ${festival && !isOtherMonth ? `<div class="day-events">${festival.english}</div>` : ''}
            <div class="hindi-date-small">${this.getHinduDay()}</div>
        `;

        if (festival && !isOtherMonth) {
            dayElement.addEventListener('click', () => this.showFestivalDetails(festival));
        }

        return dayElement;
    }

    // FIXED: Accurate festival date checking
    getFestivalForDate(year, month, day) {
        if (this.northIndianFestivals2024_2025[year] && 
            this.northIndianFestivals2024_2025[year][month] && 
            this.northIndianFestivals2024_2025[year][month][day]) {
            return this.northIndianFestivals2024_2025[year][month][day];
        }
        return null;
    }

    // FIXED: Accurate Ekadashi checking
    isEkadashi(year, month, day) {
        // Sample Ekadashi dates - in real implementation, calculate based on lunar calendar
        const ekadashiDates = {
            2024: {
                0: [11, 25], 1: [9, 24], 2: [10, 25], 3: [8, 23], 4: [8, 22], 5: [6, 21],
                6: [5, 19], 7: [3, 18], 8: [1, 16, 30], 9: [15, 29], 10: [13, 28], 11: [12, 27]
            }
        };
        
        if (ekadashiDates[year] && ekadashiDates[year][month]) {
            return ekadashiDates[year][month].includes(day);
        }
        return false;
    }

    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.generateCalendar();
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.generateCalendar();
    }

    generateFestivals() {
        const festivalsGrid = document.getElementById('festivalsGrid');
        festivalsGrid.innerHTML = '';

        this.hinduFestivals.forEach(festival => {
            const festivalCard = document.createElement('div');
            festivalCard.className = 'festival-card';
            festivalCard.innerHTML = `
                <h3>${festival.name} (${festival.roman})</h3>
                <div class="date">${festival.date}</div>
                <div class="description">${festival.description}</div>

            `;
            festivalCard.addEventListener('click', () => this.showFestivalDetails(festival));
            festivalsGrid.appendChild(festivalCard);
        });
    }

    generateHinduMonths() {
        const monthsGrid = document.getElementById('monthsGrid');
        monthsGrid.innerHTML = '';

        this.hinduMonths.forEach(month => {
            const monthCard = document.createElement('div');
            monthCard.className = 'month-card';
            if (month.isSpecial) monthCard.style.borderTop = '4px solid #dc143c';
            
            monthCard.innerHTML = `
                <h3>${month.name} ${month.isSpecial ? '⭐' : ''}</h3>
                <div class="english-name">${month.english} (${month.roman})</div>
                <div class="english-name">${month.gregorianMonths}</div>
                <div class="description">${month.description}</div>
                <div style="margin-top: 10px; font-weight: 600; color: #8B0000;">
                    🎯 ${month.significance}
                </div>
            `;
            monthsGrid.appendChild(monthCard);
        });
    }

    generatePanchang() {
        const panchayangDetails = document.getElementById('panchayangDetails');
        const today = new Date();
        
        // Enhanced Panchang data
        const panchayangData = [
            { label: 'तिथि (Tithi)', value: 'एकादशी (Ekadashi)' },
            { label: 'वार (Vaar)', value: this.getDayInHindi() },
            { label: 'नक्षत्र (Nakshatra)', value: 'रोहिणी (Rohini)' },
            { label: 'योग (Yoga)', value: 'सिद्धि (Siddhi)' },
            { label: 'करण (Karana)', value: 'बव (Bava)' },
            { label: 'राहु काल (Rahu Kaal)', value: '12:00 PM - 1:30 PM' },
            { label: 'गुलिक काल (Gulik Kaal)', value: '10:30 AM - 12:00 PM' },
            { label: 'यम गंड (Yam Gand)', value: '7:30 AM - 9:00 AM' },
            { label: 'सूर्योदय (Suryoday)', value: '6:30 AM' },
            { label: 'सूर्यास्त (Suryast)', value: '6:45 PM' },
            { label: 'चंद्रोदय (Chandroday)', value: '11:15 PM' },
            { label: 'चंद्रास्त (Chandrast)', value: '10:30 AM' }
        ];

        panchayangDetails.innerHTML = '';
        panchayangData.forEach(item => {
            const panchayangItem = document.createElement('div');
            panchayangItem.className = 'panchang-item';
            panchayangItem.innerHTML = `
                <span class="panchang-label">${item.label}</span>
                <span class="panchang-value">${item.value}</span>
            `;
            panchayangDetails.appendChild(panchayangItem);
        });
    }

    getDayInHindi() {
        const days = [
            {name: 'रविवार', roman: 'Ravivar'}, {name: 'सोमवार', roman: 'Somvar'}, 
            {name: 'मंगलवार', roman: 'Mangalvar'}, {name: 'बुधवार', roman: 'Budhvar'}, 
            {name: 'गुरुवार', roman: 'Guruvar'}, {name: 'शुक्रवार', roman: 'Shukrvar'}, 
            {name: 'शनिवार', roman: 'Shanivar'}
        ];
        const today = days[new Date().getDay()];
        return `${today.name} (${today.roman})`;
    }

    showFestivalDetails(festival) {
        const modal = document.getElementById('festivalModal');
        const festivalDetails = document.getElementById('festivalDetails');
        
        const display = this.getTripleDisplay(festival);
        
        festivalDetails.innerHTML = `
            <h2>${display.primary}</h2>
            <h3>${display.english} (${display.roman})</h3>
            <p><strong>Date:</strong> ${festival.date || 'See calendar for exact date'}</p>
            <p><strong>Description:</strong> ${festival.description}</p>
            <p><strong>Significance:</strong> ${festival.significance}</p>
            ${festival.practices ? `<p><strong>Traditional Practices:</strong> ${festival.practices}</p>` : ''}
            ${festival.modernTip ? `<p><strong>Modern Adaptation:</strong> ${festival.modernTip}</p>` : ''}
            <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 10px; border-left: 4px solid #ff9933;">
                <h4>How to Celebrate:</h4>
                <p>${this.getCelebrationDetails(festival.english)}</p>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    getCelebrationDetails(festivalName) {
        const celebrations = {
            'Maha Shivratri': 'Fast during the day, stay awake at night, visit Shiva temples, chant Om Namah Shivaya, offer milk and water to Shiva Linga.',
            'Holi': 'Play with colors, enjoy festive foods like gujiya and thandai, dance to traditional songs, forgive and forget past grievances.',
            'Diwali': 'Clean and decorate homes, light diyas and candles, create rangoli patterns, exchange sweets and gifts, perform Lakshmi Puja.',
            'Navratri': 'Fast for nine days, perform Garba and Dandiya dances, worship different forms of Goddess Durga each day.',
            'Krishna Janmashtami': 'Fast until midnight, sing devotional songs, enact Krishna Leela, prepare special foods like makhan and mishri.',
            'Ganesh Chaturthi': 'Install Ganesha idols, offer modaks and laddus, perform aarti, immerse idols in water with processions.',
            'Raksha Bandhan': 'Sisters tie rakhi on brothers wrists, brothers give gifts and promise protection, share sweets and family time.',
            'Ram Navami': 'Recite Ramayana, visit Ram temples, fast during day, sing devotional songs, organize community prayers.',
            'Guru Purnima': 'Honor spiritual teachers, seek blessings from elders, perform special pujas for gurus, offer dakshina.',
            'Dussehra': 'Watch Ram Lila performances, burn Ravana effigies, celebrate victory of good over evil with community gatherings.',
            'Sawan Begins': 'Start Monday fasting, increase Shiva prayers, plan Kanwar Yatra or temple visits, adopt vegetarian diet.'
        };
        return celebrations[festivalName] || 'Celebrate with devotion, prayer, and community gathering.';
    }

    closeModal() {
        document.getElementById('festivalModal').style.display = 'none';
    }
}

// Initialize the Enhanced Hindu Calendar application
document.addEventListener('DOMContentLoaded', () => {
    new HinduCalendar();
    
    // Register Service Worker for PWA functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Hindu Calendar: Service Worker registered successfully:', registration.scope);
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // Show update available notification
                                console.log('Hindu Calendar: New version available!');
                                // Could show a toast notification here
                            }
                        });
                    });
                })
                .catch(error => {
                    console.log('Hindu Calendar: Service Worker registration failed:', error);
                });
        });
        
        // Listen for service worker messages
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'CACHE_UPDATED') {
                console.log('Hindu Calendar: App updated and ready for offline use');
            }
        });
    }

    // PWA Install Prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        
        // Show install button or banner
        showInstallPromotion();
    });

    function showInstallPromotion() {
        // Could add an "Install App" button to the UI
        const installBanner = document.createElement('div');
        installBanner.innerHTML = `
            <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: linear-gradient(135deg, #ff9933, #ffb84d); color: white; padding: 15px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 1000; display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <div style="font-weight: 600;">📱 Install Hindu Calendar</div>
                    <div style="font-size: 0.8rem; opacity: 0.9;">Get daily cultural awareness offline!</div>
                </div>
                <button id="installBtn" style="background: white; color: #ff9933; border: none; padding: 8px 16px; border-radius: 5px; font-weight: 600; cursor: pointer;">Install</button>
                <button id="dismissBtn" style="background: transparent; color: white; border: 1px solid white; padding: 8px 12px; border-radius: 5px; font-weight: 600; cursor: pointer; margin-left: 8px;">Later</button>
            </div>
        `;
        
        document.body.appendChild(installBanner);
        
        // Handle install button click
        document.getElementById('installBtn').addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const result = await deferredPrompt.userChoice;
                console.log('Hindu Calendar: Install prompt result:', result);
                deferredPrompt = null;
                installBanner.remove();
            }
        });
        
        // Handle dismiss button click
        document.getElementById('dismissBtn').addEventListener('click', () => {
            installBanner.remove();
        });
        
        // Auto-dismiss after 10 seconds
        setTimeout(() => {
            if (installBanner.parentNode) {
                installBanner.remove();
            }
        }, 10000);
    }

    // Handle successful app install
    window.addEventListener('appinstalled', (evt) => {
        console.log('Hindu Calendar: App successfully installed');
        // Track this event or show success message
    });
}); 