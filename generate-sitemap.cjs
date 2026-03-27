const fs = require('fs');
const path = require('path');

const localities = [
    "Adyar", "Alandur", "Alwarpet", "Ambattur", "Aminjikarai", "Anna Nagar", "Arumbakkam",
    "Ashok Nagar", "Avadi", "Chetpet", "Chrompet", "Ekkatuthangal", "Gerugambakkam",
    "Guindy", "Kattupakkam", "Koyambedu", "Mangadu", "Medavakkam", "Nanganallur",
    "Nungambakkam", "OMR", "Palavanthangal", "Pallavaram", "Perungudi", "Poonamallee",
    "Porur", "Ramapuram", "Saidapet", "Sembakkam", "Shenoy Nagar", "T Nagar",
    "Tambaram", "Thirumudivakkam", "Tidel Park", "Velachery", "Kil Ayanambakkam",
    "Ayanambakkam", "Mel Ayanambakkam", "Padi", "Mogappair", "Vanagaram", "Maduravoyal",
    "Valasaravakkam", "Virugambakkam", "Saligramam", "Vadapalani", "Kodambakkam",
    "West Mambalam", "Mylapore", "Mandaveli", "RA Puram", "Thiruvanmiyur", "Kottivakkam",
    "Palavakkam", "Neelankarai", "Akkarai", "Injambakkam", "Sholinganallur", "Karapakkam",
    "Thoraipakkam", "Navalur", "Siruseri", "Kelambakkam", "Kovilambakkam", "Nanmangalam",
    "Madipakkam", "Keelkattalai", "Gowrivakkam", "Selaiyur", "Perungalathur", "Vandalur",
    "Urapakkam", "Guduvanchery", "Pammal", "Anakaputhur", "Kundrathur", "Thiruneermalai",
    "Kadaperi", "Peerkankaranai", "Mudichur", "Manapakkam", "Mugalivakkam", "Thiruvottiyur",
    "Ennore", "Manali", "Madhavaram", "Puzhal", "Red Hills", "Kolathur", "Perambur",
    "Vyasarpadi", "Tondiarpet", "Royapuram", "Sowcarpet", "Parrys", "Choolai", "Purasaiwakkam"
];

const services = [
    'laser-cutting-services',
    'sheet-metal-laser-cutting-services',
    'fabrication-services',
    'steel-gates',
    'metal-safety-doors',
    'decorative-metal-panels'
];

const today = new Date().toISOString().split('T')[0];

const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/gallery', changefreq: 'weekly', priority: '0.8' },
    { url: '/blog', changefreq: 'weekly', priority: '0.8' },
    ...services.map(s => ({ url: `/chennai/${s}`, changefreq: 'weekly', priority: '0.8' }))
];

const locationPages = [];
localities.forEach(loc => {
    const slug = loc.toLowerCase().replace(/\s+/g, '-');
    services.forEach(ser => {
        locationPages.push({
            url: `/chennai/${ser}-in-${slug}`,
            changefreq: 'monthly',
            priority: '0.6'
        });
    });
});

const allPages = [...staticPages, ...locationPages];

const baseUrl = 'https://www.rgtechengineeringworks.com';

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), xmlContent);
fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.txt'), allPages.map(p => baseUrl + p.url).join('\n'));

console.log(`Sitemap generated with ${allPages.length} URLs!`);
