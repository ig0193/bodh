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
                url: 'images/temples/minakshi_temple/interior.jpg',
                alt: 'Thousand pillar hall',
                caption: 'Thousand pillar hall'
            },
            {
                url: 'images/temples/minakshi_temple/exterior.jpg',
                alt: 'Meenakshi Temple exterior',
                caption: 'Colorful gopuram towers'
            }
            
        ],
        primaryImage: 'images/temples/minakshi_temple/interior.jpg'
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
                url: 'images/temples/neasden/central.jpg',
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
        id: 'hindu-temple-toronto',
        name: 'BAPS Shri Swaminarayan Mandir',
        deity: 'vishnu',
        deityName: 'Swaminarayan',
        location: 'Toronto, Ontario, Canada',
        significance: 'Traditional Hindu temple in Canada',
        description: 'The BAPS Shri Swaminarayan Mandir in Toronto is a magnificent traditional Hindu temple made of Turkish limestone and Italian marble, hand-carved in India and assembled in Canada. Opened in 2007, it serves as a major spiritual and cultural center for the Hindu community in Canada.',
        images: [
            {
                url: 'images/temples/toronto/central.jpg',
                alt: 'BAPS Toronto Temple',
                caption: 'Traditional Hindu temple in Canada'
            }
        ],
        primaryImage: 'images/temples/toronto/central.jpg'
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
    {
        id: 'pashupatinath-nepal',
        name: 'Pashupatinath Temple',
        deity: 'shiva',
        deityName: 'Lord Shiva',
        location: 'Kathmandu, Nepal',
        significance: 'UNESCO World Heritage Site and major Shiva temple',
        description: 'Pashupatinath Temple is one of the most sacred Hindu temples dedicated to Lord Shiva. Located on the banks of the Bagmati River, it is a UNESCO World Heritage Site and serves as the seat of the national deity, Lord Pashupatinath. The temple is an important destination for pilgrims from across the world.',
        images: [
            {
                url: 'images/temples/pashupatinath/central.jpg',
                alt: 'Pashupatinath Temple Nepal',
                caption: 'Sacred Shiva temple in Nepal'
            }
        ],
        primaryImage: 'images/temples/pashupatinath/central.jpg'
    },
    {
        id: 'hindu-temple-sydney',
        name: 'Murugan Temple',
        deity: 'murugan',
        deityName: 'Lord Murugan',
        location: 'Mays Hill, Sydney, Australia',
        significance: 'Major Hindu temple in Australia',
        description: 'The Sri Mandir (Murugan Temple) in Sydney is one of the largest and most visited Hindu temples in Australia. It serves the growing Hindu community in Australia and is known for its traditional South Indian architecture and vibrant festivals.',
        images: [
            {
                url: 'images/temples/sydney/central.jpg',
                alt: 'Murugan Temple Sydney',
                caption: 'Major Hindu temple in Australia'
            }
        ],
        primaryImage: 'images/temples/sydney/central.jpg'
    },
    {
        id: 'tanah-lot-bali',
        name: 'Tanah Lot Temple',
        deity: 'other',
        deityName: 'Dewa Baruna (Sea God)',
        location: 'Tabanan, Bali, Indonesia',
        significance: 'Iconic ocean temple and major pilgrimage site',
        description: 'Tanah Lot is one of Bali\'s most iconic temples, perched on a rock formation in the ocean. Built in the 16th century, it is dedicated to the sea gods (Dewa Baruna) and is part of a chain of sea temples around Bali. The temple is famous for its stunning sunset views and unique offshore setting.',
        images: [
            {
                url: 'images/temples/tanah_lot/central.jpg',
                alt: 'Tanah Lot Temple Bali',
                caption: 'Iconic ocean temple'
            }
        ],
        primaryImage: 'images/temples/tanah_lot/central.jpg'
    },
    {
        id: 'besakih-temple-bali',
        name: 'Pura Besakih (Mother Temple)',
        deity: 'other',
        deityName: 'Trimurti (Brahma, Vishnu, Shiva)',
        location: 'Mount Agung, Bali, Indonesia',
        significance: 'Largest and holiest Hindu temple in Bali',
        description: 'Pura Besakih, known as the "Mother Temple of Bali", is the largest and holiest temple complex on the island. Located on the slopes of Mount Agung, it comprises 23 separate but related temples dedicated to the Trimurti (Brahma, Vishnu, Shiva). The temple has been a pilgrimage site for over 1,000 years and is central to Balinese Hindu worship.',
        images: [
            {
                url: 'images/temples/besakih/central.jpg',
                alt: 'Pura Besakih Bali',
                caption: 'Mother Temple of Bali'
            }
        ],
        primaryImage: 'images/temples/besakih/central.jpg'
    },
    {
        id: 'tirta-empul-bali',
        name: 'Tirta Empul Temple',
        deity: 'vishnu',
        deityName: 'Vishnu',
        location: 'Tampaksiring, Bali, Indonesia',
        significance: 'Holy spring water temple for purification rituals',
        description: 'Tirta Empul is a water temple famous for its sacred spring water, where Balinese Hindus go for ritual purification. Founded in 962 AD, the temple features holy spring pools used for traditional Melukat (purification) ceremonies. The crystal-clear water is believed to have magical powers and visitors can participate in the cleansing rituals.',
        images: [
            {
                url: 'images/temples/tirta_empul/central.jpg',
                alt: 'Tirta Empul Temple Bali',
                caption: 'Sacred water purification temple'
            }
        ],
        primaryImage: 'images/temples/tirta_empul/central.jpg'
    },
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TEMPLES_DATA;
} else {
    window.TEMPLES_DATA = TEMPLES_DATA;
}
