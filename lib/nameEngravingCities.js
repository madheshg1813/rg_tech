/*
 * Name engraving - the city-specific content for Madurai, Coimbatore and Salem.
 *
 * Each page is written for its own city, not the Chennai page with the name
 * swapped: its own lead, local section, localities, applications, materials
 * advice, production step and FAQs. Shared material (plate types, finishes,
 * customisation, the generic FAQs) comes from NAME_ENGRAVING in
 * lib/nameEngraving.js and is merged in by nameEngravingFor().
 *
 * Honesty rules for this file, because none of these cities has a workshop:
 *   - every plate is made at the Ayanambakkam unit in Chennai and delivered;
 *     never imply a local unit, a showroom or on-site fitting;
 *   - no prices, turnaround times or delivery-day promises;
 *   - local facts are kept to well-known, checkable ones (an industrial
 *     estate's name, what a city is known for), never figures.
 *
 * `releaseAt` is when the page goes live, in IST. Before that moment the
 * resolver returns nothing, so the URL 404s, and it is left out of the
 * sitemap and every cross-link. It is checked on each request, so a page
 * goes live at its time with no deploy and no scheduled job.
 */

export const NAME_ENGRAVING_CITY_CONTENT = {
    madurai: {
        releaseAt: '2026-10-16T17:00:00+05:30',

        // 48 characters, 58 with the " | RG Tech" suffix.
        metaTitle: 'Name Engraving Services in Madurai | Name Plates',
        metaDescription:
            'Custom name plates for Madurai homes, shops and temples: Tamil and English lettering, engraved or laser-cut in stainless steel, brass and powder-coated steel.',

        lead:
            'Custom metal name plates for Madurai homes, shops, temples and factories, in Tamil, English or both. Share the name, size and finish on WhatsApp and get a tailored quotation from RG Tech Engineering Works.',

        local: {
            eyebrow: 'Name Plates For Madurai',
            title: 'Lettering made for',
            accent: 'the temple city',
            paragraphs: [
                'In Madurai a name plate is often in Tamil first. House names, family names and blessings over the door, shop boards near the temple streets, and plates for mandapams and trusts all lean on Tamil lettering, and the shape of each letter matters as much as the spelling. We set Tamil and English on the same plate, in the font you choose, and you approve the layout before anything is made.',
                'Industrial buyers in and around the Kappalur industrial estate need the opposite: plain, durable identification plates for machines, panels and equipment, with serial numbers and ratings that stay readable for years. Both kinds of plate are engraved or laser-cut at our unit in Ayanambakkam, Chennai, and delivered to Madurai packed flat.',
            ],
        },

        localitiesTitle: 'Delivering name plates across Madurai',
        localities: [
            'Anna Nagar', 'K K Nagar', 'Tallakulam', 'Simmakkal', 'Goripalayam', 'Thirunagar',
            'Villapuram', 'Ellis Nagar', 'Pasumalai', 'Thiruparankundram', 'Kappalur', 'Thirumangalam',
        ],
        localitiesNote:
            'Plates are delivered to homes and businesses across the city and its suburbs. Share the delivery pincode with your enquiry and freight is quoted with the plate.',

        materialsLead:
            'Madurai is hot and dry for most of the year, so sun and dust matter more than salt air. Stainless steel 304 and powder-coated metal both hold up outdoors; brass suits pooja rooms and entrances where its warm tone is wanted.',

        applications: [
            { name: 'Homes and apartments', desc: 'Gate plates, house names and door numbers in Anna Nagar, K K Nagar and across the city.' },
            { name: 'Temples, mandapams and trusts', desc: 'Donor plates, name boards and Tamil inscriptions for religious and community buildings.' },
            { name: 'Shops and offices', desc: 'Shop name boards, clinic and office door plates, and reception plaques.' },
            { name: 'Factories and workshops', desc: 'Machine plates and panel labels for units in Kappalur and other industrial areas.' },
        ],

        productionDesc:
            'The plate is engraved or cut at our unit in Ayanambakkam, Chennai, finished, checked and packed flat for delivery to Madurai.',

        faqs: [
            ['Do you make name plates for customers in Madurai?',
                'Yes. Plates for Madurai are engraved or laser-cut at our own unit in Ayanambakkam, Chennai, and delivered to you packed flat with edge protection. Everything from the enquiry to the layout approval happens on WhatsApp, so you do not need to visit.'],
            ['Can you make a name plate in Tamil?',
                'Yes, and in Madurai most of our plates are. Tamil alone, English alone, or both on one plate. Send the exact spelling, or a photo of lettering you like, and you approve the layout before it is made.'],
            ['Do you make plates for temples and mandapams?',
                'Yes. Donor plates, name boards and inscriptions for temples, mandapams and trusts, with Tamil text and decorative borders or deity motifs if you want them.'],
            ['Which metal lasts best in the Madurai heat?',
                'Stainless steel 304 and powder-coated mild steel or aluminium all suit outdoor plates in Madurai. Brass looks warm on entrances and pooja rooms but darkens over time unless it is polished. Tell us where the plate is going and we will recommend one.'],
            ['Do you make machine identification plates for industrial units?',
                'Yes. Equipment tags, panel labels and asset plates with serial numbers or ratings, for units in Kappalur and elsewhere around Madurai, in single pieces or sets.'],
            ['How is the plate delivered to Madurai?',
                'Packed flat with edge protection and sent to your address. Share the delivery pincode with your enquiry and freight is quoted along with the plate.'],
        ],
    },

    coimbatore: {
        releaseAt: '2026-10-16T17:00:00+05:30',

        // 50 characters, 60 with the " | RG Tech" suffix.
        metaTitle: 'Name Engraving Services in Coimbatore | Nameplates',
        metaDescription:
            'Engraved name plates and machine rating plates for Coimbatore homes, offices and pump, motor and textile machinery makers, in stainless steel and aluminium.',

        lead:
            'Engraved and laser-cut metal name plates for Coimbatore offices, homes and manufacturers, from a single house plate to sets of machine identification plates. Share your requirements for a tailored quotation from RG Tech Engineering Works.',

        local: {
            eyebrow: 'Name Plates For Coimbatore',
            title: 'Plates for a city',
            accent: 'that builds machines',
            paragraphs: [
                'Coimbatore makes pumps, motors and textile machinery, and every machine that leaves a factory here carries a plate. We engrave identification, serial and rating plates to the text and layout you supply, in stainless steel or aluminium, so the details stay legible through years on a shop floor. Batches are run from one approved layout, so plate 50 matches plate 1.',
                'The same work suits the offices and homes across the city: company name plates and cabin plates for IT and corporate offices around Saravanampatti and Peelamedu, and house name plates for R S Puram, Saibaba Colony and Vadavalli. Every plate is made at our unit in Ayanambakkam, Chennai, and delivered to Coimbatore.',
            ],
        },

        localitiesTitle: 'Delivering name plates across Coimbatore',
        localities: [
            'R S Puram', 'Gandhipuram', 'Peelamedu', 'Saibaba Colony', 'Saravanampatti', 'Ganapathy',
            'Singanallur', 'Vadavalli', 'Kurichi', 'Thudiyalur', 'Sulur', 'Kalapatti',
        ],
        localitiesNote:
            'Plates go to offices, factories and homes across the city and its industrial belts. Share the delivery pincode with your enquiry and freight is quoted with the plates.',

        materialsLead:
            'For machine plates, stainless steel resists oil, coolant and cleaning, and aluminium keeps weight down on smaller equipment. For offices and homes, brushed or PVD-finished stainless and powder-coated metal give a clean, lasting finish.',

        applications: [
            { name: 'Pump and motor manufacturers', desc: 'Identification, serial and rating plates engraved to the details you supply.' },
            { name: 'Textile machinery and engineering units', desc: 'Machine plates and panel labels for units in Ganapathy, Kurichi and the industrial belts.' },
            { name: 'IT and corporate offices', desc: 'Company name plates, cabin and conference room plates, reception plaques with your logo.' },
            { name: 'Homes and apartments', desc: 'House names and door numbers for R S Puram, Saibaba Colony, Vadavalli and beyond.' },
        ],

        productionDesc:
            'Plates are engraved or cut at our unit in Ayanambakkam, Chennai, checked against the approved layout and packed for delivery to Coimbatore.',

        faqs: [
            ['Do you make name plates for customers in Coimbatore?',
                'Yes. Plates for Coimbatore are engraved or laser-cut at our own unit in Ayanambakkam, Chennai, and delivered to you packed flat. The enquiry, quotation and layout approval all happen on WhatsApp or email.'],
            ['Can you engrave rating and serial plates for pumps and motors?',
                'Yes. Send the text and layout - model, serial number, ratings, logo - and we engrave it to match. We engrave the details you supply; the technical content of a rating plate stays your responsibility.'],
            ['Can you make the same plate in batches with different serial numbers?',
                'Yes. The layout is approved once and each plate in the batch carries its own number or text from a list you send, so the set is consistent.'],
            ['Which material is best for machine identification plates?',
                'Stainless steel for anything exposed to oil, coolant, heat or regular cleaning; aluminium where weight matters on smaller equipment. We will suggest one once we know the machine and where the plate is fixed.'],
            ['Do you make office name plates with our company logo?',
                'Yes. Company name plates, cabin and conference room plates and reception plaques. A vector logo (AI, SVG, PDF or DXF) gives the cleanest result; an image can be traced for you to approve.'],
            ['How are plates delivered to Coimbatore?',
                'Packed flat with edge protection and sent to your office, factory or home. Share the delivery pincode with your enquiry and freight is quoted along with the plates.'],
        ],
    },

    salem: {
        releaseAt: '2026-10-17T07:00:00+05:30',

        // 46 characters, 56 with the " | RG Tech" suffix.
        metaTitle: 'Name Engraving Services in Salem | Name Plates',
        metaDescription:
            'Custom name plates for Salem homes, shops, mills and Yercaud cottages, engraved or laser-cut in stainless steel, brass or powder-coated steel, Tamil or English.',

        lead:
            'Custom metal name plates for Salem homes, shops, mills and Yercaud getaways, engraved or laser-cut in Tamil and English. Share the name, size and finish on WhatsApp for a tailored quotation from RG Tech Engineering Works.',

        local: {
            eyebrow: 'Name Plates For Salem',
            title: 'Name plates for the',
            accent: 'steel city',
            paragraphs: [
                'Salem is home to SAIL\'s Salem Steel Plant, so it is a city that knows stainless steel, and stainless is what most of our Salem plates are made in: brushed for offices, mirror or PVD gold for entrances, plain 304 for anything fixed outdoors. House name plates for Fairlands, Alagapuram and Hasthampatti, and shop boards around the market streets, are the everyday work.',
                'Beyond the city, sago units, textile and handloom businesses and mills around Attur, Omalur and Mettur need name boards and machine plates, and cottages and resorts up in Yercaud want a name plate that suits the hills. Every plate is made at our unit in Ayanambakkam, Chennai, and delivered to Salem.',
            ],
        },

        localitiesTitle: 'Delivering name plates across Salem',
        localities: [
            'Fairlands', 'Hasthampatti', 'Alagapuram', 'Suramangalam', 'Ammapet', 'Shevapet',
            'Swarnapuri', 'Omalur', 'Attur', 'Mettur', 'Edappadi', 'Yercaud',
        ],
        localitiesNote:
            'Plates are delivered across Salem and the towns around it, Yercaud included. Share the delivery pincode with your enquiry and freight is quoted with the plate.',

        materialsLead:
            'Stainless steel 304 is the dependable outdoor choice in Salem, and in the damp, misty air of Yercaud it is the one to pick. Powder-coated metal suits colourful shop and house boards, and brass adds a warm finish indoors.',

        applications: [
            { name: 'Homes and villas', desc: 'House names and door numbers for Fairlands, Alagapuram, Hasthampatti and beyond.' },
            { name: 'Shops and showrooms', desc: 'Entrance name boards, brand logos and welcome plates for retail and trade.' },
            { name: 'Mills and sago units', desc: 'Name boards, machine plates and panel labels for textile, handloom and sago businesses.' },
            { name: 'Yercaud cottages and resorts', desc: 'Property name plates and room or cottage numbers that suit a hill setting.' },
        ],

        productionDesc:
            'The plate is engraved or cut at our unit in Ayanambakkam, Chennai, finished, checked and packed flat for delivery to Salem.',

        faqs: [
            ['Do you make name plates for customers in Salem?',
                'Yes. Plates for Salem are engraved or laser-cut at our own unit in Ayanambakkam, Chennai, and delivered to you packed flat with edge protection. The enquiry and layout approval happen on WhatsApp, so there is no need to visit.'],
            ['Can you deliver name plates to Yercaud?',
                'Yes. Plates go to Yercaud as well as Salem city and nearby towns such as Omalur, Attur and Mettur. Share the delivery pincode and freight is quoted with the plate.'],
            ['Which metal suits a name plate in Yercaud?',
                'Stainless steel 304. It copes with the damp and mist far better than uncoated mild steel, and needs little more than a wipe to keep clean.'],
            ['Do you make name boards for mills and sago units?',
                'Yes. Name boards for the entrance, plus machine plates and panel labels inside, in stainless steel, aluminium or powder-coated mild steel.'],
            ['Can I have a name plate in Tamil and English together?',
                'Yes. Tamil, English, or both on one plate, in the font you choose. Send the exact spelling and you approve the layout before it is made.'],
            ['How is the plate delivered to Salem?',
                'It travels packed flat, with the edges and face protected, to your home, shop or mill. Freight depends on the pincode, so include it when you enquire and it is added to the quotation.'],
        ],
    },
}

/* Links to each city's existing pages, all already routed in every city. */
export function relatedFor(citySlug) {
    return [
        { href: `/${citySlug}/stainless-steel-laser-cutting`, title: 'Stainless Steel Laser Cutting', desc: 'SS 304, 316 and 430 sheet and plate.' },
        { href: `/${citySlug}/laser-cutting-services`, title: 'Laser Cutting Services', desc: 'CNC fiber laser cutting in all metals.' },
        { href: `/${citySlug}/decorative-metal-panels`, title: 'Decorative Metal Panels', desc: 'Jali, screens and wall panels.' },
        { href: `/${citySlug}/steel-gates`, title: 'Steel Gates', desc: 'Laser-cut gate panels and designs.' },
        { href: `/${citySlug}/fabrication-services`, title: 'Fabrication Services', desc: 'Bending, welding and finishing.' },
        { href: `/${citySlug}/aluminum-laser-cutting-services`, title: 'Aluminium Laser Cutting', desc: 'Lightweight sheet and plate parts.' },
    ]
}
