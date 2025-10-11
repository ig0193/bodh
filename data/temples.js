/**
 * Hindu Calendar - Temples Data
 * Sample temple data structure for the temples view
 */

// Sample temples data - replace with actual temple data
const TEMPLES_DATA = [
    {
        id: 'kedarnath-temple',
        name: 'Kedarnath Temple',
        deity: 'shiva',
        deityName: 'Lord Shiva',
        location: 'Kedarnath, Uttarakhand',
        significance: 'One of 12 Jyotirlingas',
        type: 'jyotirlinga',
        description: 'Ancient temple dedicated to Lord Shiva, located in the Garhwal Himalayas at an altitude of 3,583 meters. It is one of the most sacred pilgrimage sites for Hindus and is part of the Char Dham Yatra. The temple is believed to have been built by the Pandavas and later reconstructed by Adi Shankaracharya.',
        images: [
            {
                url: 'images/temples/kedarnath/kedarnath_aerial.jpg',
                alt: 'Kedarnath front',
                caption: 'Kedarnath front'
            },
            {
                url: 'images/temples/kedarnath/kedarnath_ling.jpg',
                alt: 'Kedarnath Temple interior',
                caption: 'Sacred sanctum with Shiva lingam'
            },
            {
                url: 'images/temples/kedarnath/kedarnath.jpg',
                alt: 'Aerial view of Kedarnath',
                caption: 'Aerial view showing temple location'
            }
        ],
        primaryImage: 'images/temples/kedarnath/kedarnath.jpg'
    },
    {
        id: 'vaishno-devi',
        name: 'Vaishno Devi',
        deity: 'devi',
        deityName: 'Goddess Vaishno Devi',
        location: 'Jammu & Kashmir',
        significance: 'Sacred cave shrine of Goddess Vaishno Devi',
        description: 'One of the most revered shrines of Goddess Vaishno Devi, located in the Trikuta Mountains. The temple is situated in a cave and is accessible by a 13-kilometer trek from Katra. It is believed that the goddess grants the wishes of all her devotees who visit her with pure devotion.',
        images: [
            {
                url: 'images/temples/vaishnodevi/vaishno_devi_aerial.jpg',
                alt: 'Vaishno Devi aerial',
                caption: 'Vaishno Devi aerial'
            },
            {
                url: 'images/temples/vaishnodevi/vaishno_devi_shrin.jpg',
                alt: 'Vaishno Devi shrine interior',
                caption: 'Inner sanctum of the cave'
            }
        ],
        primaryImage: 'images/temples/vaishnodevi/vaishno_devi_aerial.jpg'
    },
    {
        id: 'tirupati-balaji',
        name: 'Tirumala Temple',
        deity: 'vishnu',
        deityName: 'Lord Venkateswara',
        location: 'Tirupati, Andhra Pradesh',
        significance: 'Most visited temple in the world',
        description: 'The Tirumala Venkateswara Temple is one of the most visited religious sites in the world, with millions of devotees visiting annually. The temple is dedicated to Lord Venkateswara, an incarnation of Lord Vishnu. The temple is known for its magnificent architecture and the sacred Tirumala hills.',
        images: [
            {
                url: 'images/temples/Tirumala/central.jpg',
                alt: 'Tirupati Temple interior',
                caption: 'Sacred sanctum'
            },
            {
                url: 'images/temples/Tirumala/exterior.jpg',
                alt: 'Tirupati Temple exterior',
                caption: 'Magnificent temple exterior'
            }
        ],
        primaryImage: 'images/temples/Tirumala/central.jpg'
    },
    {
        id: 'meenakshi-temple',
        name: 'Meenakshi Temple',
        deity: 'devi',
        deityName: 'Goddess Meenakshi',
        location: 'Madurai, Tamil Nadu',
        significance: 'Ancient temple complex with stunning architecture',
        description: 'The Meenakshi Amman Temple is a historic Hindu temple located in Madurai. The temple is dedicated to Goddess Meenakshi and her consort Lord Sundareswarar. The temple complex is famous for its stunning architecture, colorful gopurams (towers), and the thousand-pillar hall.',
        images: [
            {
                url: 'images/temples/minakshi_temple/exterior.jpg',
                alt: 'Meenakshi Temple exterior',
                caption: 'Colorful gopuram towers'
            },
            {
                url: 'images/temples/minakshi_temple/interior.jpg',
                alt: 'Thousand pillar hall',
                caption: 'Thousand pillar hall'
            }
            
        ],
        primaryImage: 'images/temples/minakshi_temple/exterior.jpg'
    },
    {
        id: 'somnath-temple',
        name: 'Somnath Temple',
        deity: 'shiva',
        deityName: 'Lord Shiva',
        location: 'Gujarat',
        significance: 'First Jyotirlinga',
        description: 'The Somnath Temple is one of the most sacred temples dedicated to Lord Shiva and is considered the first among the twelve Jyotirlingas. The temple has been destroyed and rebuilt several times throughout history, symbolizing the resilience of Hindu faith.',
        images: [
            {
                url: 'images/temples/somnath/central.jpg',
                alt: 'Somnath Temple',
                caption: 'First Jyotirlinga temple'
            },
            {
                url: 'images/temples/somnath/exterior.jpg',
                alt: 'Somnath Temple',
                caption: 'Exterior of Somnath Temple'
            },
        ],
        primaryImage: 'images/temples/somnath/central.jpg'
    },
    {
        id: 'ganesh-temple-mumbai',
        name: 'Siddhivinayak Temple',
        deity: 'ganesha',
        deityName: 'Lord Ganesha',
        location: 'Mumbai, Maharashtra',
        significance: 'Famous Ganesha temple',
        description: 'The Siddhivinayak Temple is one of the most famous and richest temples in Mumbai. It is dedicated to Lord Ganesha and is visited by thousands of devotees daily. The temple is known for fulfilling the wishes of its devotees.',
        images: [
            {
                url: 'images/temples/siddhivinayak/central.jpg',
                alt: 'Siddhivinayak Temple',
                caption: 'Famous Ganesha temple'
            },
            {
                url: 'images/temples/siddhivinayak/interior.jpg',
                alt: 'Siddhivinayak Temple',
                caption: 'Interior of Siddhivinayak Temple'
            }
        ],
        primaryImage: 'images/temples/siddhivinayak/central.jpg'
    },
    {
        id: 'ashtavinayak-ganesh',
        name: 'Ashtavinayak Temples',
        deity: 'ganesha',
        deityName: 'Lord Ganesha',
        location: 'Maharashtra',
        significance: '8 sacred Ganesha temples pilgrimage circuit',
        description: 'The Ashtavinayak refers to eight revered Ganesha temples in Maharashtra, forming one of the most sacred pilgrimage circuits for Ganesha devotees. Each temple has a unique Swayambhu (self-originated) idol and its own legend. The circuit includes Moreshwar, Siddhivinayak, Ballaleshwar, Varadavinayak, Chintamani, Girijatmaj, Vighnahar, and Mahaganapati temples.',
        images: [
            {
                url: 'images/temples/ashtavinayak/central.jpg',
                alt: 'Ashtavinayak Temple',
                caption: 'Sacred Ganesha pilgrimage circuit'
            },
            {
                url: 'images/temples/ashtavinayak/outer.jpg',
                alt: 'Ashtavinayak Temple',
                caption: 'Sacred Ganesha pilgrimage circuit'
            }
        ],
        primaryImage: 'images/temples/ashtavinayak/central.jpg'
    },
    {
        id: 'dwarka-temple',
        name: 'Dwarkadhish Temple',
        deity: 'krishna',
        deityName: 'Lord Krishna',
        location: 'Dwarka, Gujarat',
        significance: 'One of Char Dham pilgrimage sites',
        description: 'The Dwarkadhish Temple, also known as Jagat Mandir, is one of the most sacred Krishna temples and part of the Char Dham pilgrimage. Built over 2,500 years ago, it stands on the site where Lord Krishna established his kingdom. The 5-story temple structure is supported by 72 pillars and features intricate architecture. It is believed to be the ancient kingdom of Lord Krishna.',
        images: [
            {
                url: 'images/temples/dwarkadhish/central.jpg',
                alt: 'Dwarkadhish Temple',
                caption: 'Ancient Krishna temple and Char Dham site'
            },
            {
                url: 'images/temples/dwarkadhish/outer.jpg',
                alt: 'Dwarkadhish Temple',
                caption: 'Ancient Krishna temple and Char Dham site'
            }
        ],
        primaryImage: 'images/temples/dwarka/central.jpg'
    },
    {
        id: 'hanuman-temple-connaught',
        name: 'Hanuman Temple (Connaught Place)',
        deity: 'hanuman',
        deityName: 'Lord Hanuman',
        location: 'New Delhi',
        significance: 'Ancient temple predating Delhi city',
        description: 'The Hanuman Temple in Connaught Place is one of the five temples of Mahabharata fame in Delhi. This ancient temple is believed to be over 1,000 years old, predating the construction of New Delhi. It is said that the Pandavas built this temple and the idol is self-manifested (Swayambhu). The temple is famous for its continuous chanting of "Shri Ram Jai Ram Jai Jai Ram" since August 1, 1964.',
        images: [
            {
                url: 'images/temples/hanuman_cp/central.jpg',
                alt: 'Hanuman Temple Delhi',
                caption: 'Ancient Hanuman temple in Delhi'
            },{
                url: 'images/temples/hanuman_cp/central2.jpg',
                alt: 'Hanuman Temple Delhi',
                caption: 'Ancient Hanuman temple in Delhi'
            }
        ],
        primaryImage: 'images/temples/hanuman_cp/central.jpg'
    },
    {
        id: 'khatu-shyam-temple',
        name: 'Khatu Shyam Ji Temple',
        deity: 'krishna',
        deityName: 'Shyam Baba (Barbarik)',
        location: 'Rajasthan',
        significance: 'Sacred temple of Barbarik (grandson of Bhima)',
        description: 'The Khatu Shyam Ji Temple is dedicated to Barbarik (also known as Shyam Baba), the grandson of Bhima and son of Ghatotkacha. According to legend, Barbarik was the most powerful warrior who wanted to participate in the Mahabharata war. Lord Krishna asked for his head as a sacrifice, and Barbarik obliged. Krishna blessed him that he would be worshipped in Kali Yuga by the name of Shyam. The temple houses the deity\'s head, believed to have been discovered in the current location. The temple is especially crowded during the Phalguna Mela.',
        images: [
            {
                url: 'images/temples/khatu-shyam/central.jpg',
                alt: 'Khatu Shyam Ji Temple',
                caption: 'Sacred temple of Shyam Baba'
            },
            {
                url: 'images/temples/khatu-shyam/outer.jpg',
                alt: 'Khatu Shyam Ji Temple',
                caption: 'Sacred temple of Shyam Baba'
            }
        ],
        primaryImage: 'images/temples/khatu_shyam/central.jpg'
    },
    // International Temples
    {
        id: 'swaminarayan-akshardham-usa',
        name: 'BAPS Swaminarayan Akshardham',
        deity: 'vishnu',
        deityName: 'Swaminarayan',
        location: 'Robbinsville, New Jersey, USA',
        significance: 'Largest Hindu temple in the United States',
        description: 'The BAPS Swaminarayan Akshardham in New Jersey is the largest Hindu temple in the United States and the second-largest in the world. Built with stunning traditional Indian architecture using over 2 million cubic feet of stone, it features intricate carvings and serves as a spiritual and cultural center for the Hindu community in North America.',
        images: [
            {
                url: 'images/temples/akshardham_nj/central.jpg',
                alt: 'Akshardham New Jersey',
                caption: 'Largest Hindu temple in USA'
            },
            {
                url: 'images/temples/akshardham_nj/outside.jpg',
                alt: 'Akshardham New Jersey',
                caption: 'Outside of Akshardham New Jersey'
            }
        ],
        primaryImage: 'images/temples/akshardham_nj/central.jpg'
    },
    {
        id: 'uluwatu-temple-bali',
        name: 'Pura Luhur Uluwatu',
        deity: 'shiva',
        deityName: 'Rudra (Shiva)',
        location: 'Uluwatu, Bali, Indonesia',
        significance: 'Clifftop temple with spiritual guardians',
        description: 'Pura Luhur Uluwatu is one of Bali\'s six key spiritual temples, built on a steep cliff approximately 70 meters above sea level. Dating back to the 11th century, it is dedicated to Sang Hyang Widhi Wasa in his manifestation as Rudra. The temple is famous for its magnificent clifftop location, sunset Kecak dance performances, and resident monkeys.',
        images: [
            {
                url: 'images/temples/uluwatu/central.jpg',
                alt: 'Uluwatu Temple Bali',
                caption: 'Clifftop ocean temple'
            },
            {
                url: 'images/temples/uluwatu/dance.jpg',
                alt: 'Uluwatu Temple Bali',
                caption: 'Clifftop ocean temple'
            },
            {
                url: 'images/temples/uluwatu/aerial.jpg',
                alt: 'Uluwatu Temple Bali',
                caption: 'Clifftop ocean temple'
            }
        ],
        primaryImage: 'images/temples/uluwatu/central.jpg'
    },
    {
        id: 'neasden-temple-london',
        name: 'BAPS Shri Swaminarayan Mandir',
        deity: 'vishnu',
        deityName: 'Swaminarayan',
        location: 'Neasden, London, UK',
        significance: 'First traditional stone Hindu temple in Europe',
        description: 'The Neasden Temple in London, inaugurated in 1995, was the first traditional Hindu stone temple built in Europe. Made entirely of Bulgarian limestone and Italian Carrara marble, with no structural steel, it showcases traditional Indian craftsmanship and serves as a landmark of Hindu culture in the UK.',
        images: [
            {
                url: 'images/temples/neasden-temple-london/outer.jpg',
                alt: 'Neasden Temple London',
                caption: 'First stone Hindu temple in Europe'
            },
            {
                url: 'images/temples/neasden-temple-london/central.jpg',
                alt: 'Neasden Temple London',
                caption: 'First stone Hindu temple in Europe'
            },
            {
                url: 'images/temples/neasden-temple-london/interior.jpg',
                alt: 'Neasden Temple London',
                caption: 'First stone Hindu temple in Europe'
            }
        ],
        primaryImage: 'images/temples/neasden/central.jpg'
    },
    {
        id: 'batu-caves-malaysia',
        name: 'Batu Caves Temple',
        deity: 'murugan',
        deityName: 'Lord Murugan',
        location: 'Selangor, Malaysia',
        significance: 'Largest Murugan statue and famous cave temple',
        description: 'The Batu Caves is a limestone hill with a series of caves and cave temples dedicated to Lord Murugan. The site is one of the most popular Hindu shrines outside of India, famous for its massive golden statue of Lord Murugan (42.7 meters tall) and 272 colorful steps. It is the focal point of the annual Thaipusam festival.',
        images: [
            {
                url: 'images/temples/batu_caves/outer.jpg',
                alt: 'Batu Caves Malaysia',
                caption: 'Largest Murugan statue in the world'
            },
            {
                url: 'images/temples/batu_caves/central.jpg',
                alt: 'Batu Caves Malaysia',
                caption: 'Inside the Batu Caves'
            },
            {
                url: 'images/temples/batu_caves/interior.jpg',
                alt: 'Batu Caves Malaysia',
                caption: 'Inside the Batu Caves'
            }
        ],
        primaryImage: 'images/temples/batu_caves/outer.jpg'
    },
    {
        id: 'hindu-temple-dubai',
        name: 'BAPS Hindu Mandir',
        deity: 'vishnu',
        deityName: 'Swaminarayan',
        location: 'Dubai, UAE',
        significance: 'First traditional stone temple in Middle East',
        description: 'The BAPS Hindu Mandir in Dubai, inaugurated in 2024, is the first traditional stone Hindu temple in the Middle East. This architectural marvel showcases traditional Indian craftsmanship and serves as a symbol of cultural harmony in the UAE, welcoming people of all faiths.',
        images: [
            {
                url: 'images/temples/baps-temple-dubai/outer.jpg',
                alt: 'BAPS Hindu Mandir Dubai',
                caption: 'First stone temple in Middle East'
            },
            {
                url: 'images/temples/baps-temple-dubai/central.jpg',
                alt: 'BAPS Hindu Mandir Dubai',
                caption: 'First stone temple in Middle East'
            }
        ],
        primaryImage: 'images/temples/dubai/central.jpg'
    },
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TEMPLES_DATA;
} else {
    window.TEMPLES_DATA = TEMPLES_DATA;
}
