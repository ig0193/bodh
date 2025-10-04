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
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TEMPLES_DATA;
} else {
    window.TEMPLES_DATA = TEMPLES_DATA;
}
