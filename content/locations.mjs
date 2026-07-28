/**
 * Raw locality lists for the secondary cities.
 *
 * Kept as a plain .mjs module, separate from lib/cities.js, so the release
 * script can import it under bare Node. lib/cities.js imports a JSON file,
 * which Node ESM will not load without an import assertion that the Next
 * bundler does not need — splitting the data avoids that mismatch entirely.
 */

export const MADURAI_LOCALITIES = [
    'Anna Nagar', 'K K Nagar', 'Villapuram', 'Thirunagar', 'Goripalayam',
    'Tallakulam', 'Simmakkal', 'Mattuthavani', 'Avaniyapuram', 'Sellur',
    'Ellis Nagar', 'Pasumalai', 'Vilangudi', 'Othakadai', 'Samayanallur',
    'Kochadai', 'Arappalayam', 'Chokkikulam', 'Narimedu', 'Melur',
    'Thiruparankundram', 'Palanganatham', 'Jaihindpuram', 'Kalavasal',
    'Arasaradi', 'Koodal Nagar', 'Yanaikkal', 'Nelpettai', 'East Gate',
    'South Gate', 'Bethaniapuram', 'Thathaneri', 'Madakulam', 'Karuppayurani',
    'Kadachanendhal', 'Nagamalai Puthukottai', 'Sundarajan Patti',
    'Sathamangalam', 'Iyer Bungalow', 'Thiruppalai', 'S S Colony',
    'Vaanamamalai Nagar', 'Anaiyur', 'Ponmeni', 'Uthangudi', 'Paravai',
    'Vadapalanji', 'Surveyor Colony', 'Alanganallur', 'Thirumangalam',
]

export const COIMBATORE_LOCALITIES = [
    'R S Puram', 'Gandhipuram', 'Peelamedu', 'Saibaba Colony', 'Singanallur',
    'Ganapathy', 'Ramanathapuram', 'Kuniyamuthur', 'Vadavalli', 'Thudiyalur',
    'Sundarapuram', 'Podanur', 'Ondipudur', 'Kalapatti', 'Saravanampatti',
    'Hopes College', 'Race Course', 'Ukkadam', 'Sitra', 'Kavundampalayam',
    'Koundampalayam', 'Vellakinar', 'G N Mills', 'Narasimhanaickenpalayam',
    'Sulur', 'Kovaipudur', 'Thondamuthur', 'Maniyakarampalayam',
    'Avarampalayam', 'Selvapuram', 'Kurichi', 'Chinniyampalayam', 'Neelambur',
    'Irugur', 'Vilankurichi', 'Thaneerpandal', 'Nava India', 'Town Hall',
    'Sivananda Colony', 'Tatabad', 'Ganeshapuram', 'Edayarpalayam', 'Perur',
    'Madukkarai', 'Karamadai', 'Annur', 'Kinathukadavu', 'Othakalmandapam',
    'Chettipalayam', 'Malumichampatti',
]

