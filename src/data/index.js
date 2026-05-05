export const venues = [
    {
        id: "onnut", num: "01", region: "BANGKOK", name: "ONNUT", loc: "Sukhumvit 77",
        courts: "6 Courts",
        bg: "url('src/assets/onnut_hero.png') center bottom / cover no-repeat",
        bg1: "url('src/assets/onnut_hero.png') center bottom / cover no-repeat",

        status: "Open", hours: "07:00 – 22:00", phone: "+66 2 123 4567",
        address: "101/5 Sukhumvit 77, Watthana, Bangkok 10110",
        intro: "KROSS Onnut is our flagship venue — a full-scale padel destination built from the ground up for serious players and beginners alike. Six premium courts, a dedicated fitness zone, and a restaurant bar make it the most complete padel club in Bangkok.",
        courtCount: 6, imgBg1: "linear-gradient(135deg,#0d3320,#1a4d28)", imgBg2: "linear-gradient(135deg,#0a2a18, #0f3d20)",
        features: [{ num: "6", label: "Padel Courts" }, { num: "1", label: "Fitness Zone" }, { num: "300+", label: "Members" }, { num: "7am", label: "Opens Daily" }]
    },
    {
        id: "asoke", num: "02", region: "BANGKOK", name: "ASOKE", loc: "Sukhumvit 21",
        courts: "4 Courts",
        bg: "linear-gradient(160deg, #ba7520, #2a230a)",
        bg1: "url('src/assets/onnut_hero.png') center bottom / cover no-repeat",
        status: "Open", hours: "07:00 – 22:00", phone: "+66 2 234 5678",
        address: "88/2 Sukhumvit 21, Klongtoey-Nua, Bangkok 10110",
        intro: "Located in the heart of Bangkok's CBD, KROSS Asoke brings padel to the city's most connected district. Four indoor courts with climate control — built for those who play before or after work.",
        courtCount: 4, imgBg1: "linear-gradient(135deg,  #ba7520,#2a230a)", imgBg2: "linear-gradient(135deg, #ba7520, #2a230a)",
        features: [{ num: "4", label: "Padel Courts" }, { num: "Indoor", label: "Climate Controlled" }, { num: "150+", label: "Members" }, { num: "BTS", label: "Asoke Access" }]
    },
    {
        id: "thonglor", num: "03", region: "BANGKOK", name: "THONGLOR", loc: "Sukhumvit 55",
        courts: "Coming 2025", bg: "linear-gradient(160deg, #444444,#0a0a0a)",
        status: "Coming Soon", hours: "TBA", phone: "TBA",
        address: "Sukhumvit 55, Watthana, Bangkok 10110",
        intro: "KROSS Thonglor is our most design-forward venue yet — set in the heart of Bangkok's most vibrant neighbourhood. Opening late 2025 with 5 courts, rooftop dining, and a social club atmosphere.",
        courtCount: 5, imgBg1: "linear-gradient(135deg,#1a1a1a,#2a2a2a)", imgBg2: "linear-gradient(135deg,#111,#1e1e1e)",
        features: [{ num: "5", label: "Padel Courts" }, { num: "Rooftop", label: "Restaurant Bar" }, { num: "2025", label: "Opening Year" }, { num: "VIP", label: "Founding Members" }]
    },
    {
        id: "ramaiv", num: "04", region: "BANGKOK", name: "RAMA IV", loc: "Rama IV Road",
        courts: "Coming 2025", bg: "linear-gradient(160deg, #24416a,#050d1a)",
        status: "Coming Soon", hours: "TBA", phone: "TBA",
        address: "Rama IV Road, Klong Toey, Bangkok 10110",
        intro: "Our south Bangkok outpost — KROSS Rama IV will serve the growing padel community south of the river with 4 world-class courts and direct access from the Lumpini area.",
        courtCount: 4, imgBg1: "linear-gradient(135deg,#081a30,#0d2a48)", imgBg2: "linear-gradient(135deg,#050d1a,#081a30)",
        features: [{ num: "4", label: "Padel Courts" }, { num: "2", label: "Practice Walls" }, { num: "2025", label: "Opening Year" }, { num: "South", label: "Bangkok" }]
    },
];

export const stories = [
    { cat: "Tournament", title: "KROSS Open — Season 3", excerpt: "120+ players, 3 days, one champion.", date: "March 2025", bg: "linear-gradient(135deg,#0d3320,#1a4d28)" },
    { cat: "Venue", title: "Asoke Now Open", excerpt: "Our CBD court is here. Walk in from BTS.", date: "February 2025", bg: "linear-gradient(135deg,#1a2a0a,#253d10)" },
    { cat: "Coaching", title: "New Coaching Program", excerpt: "From beginner to podium — find your level.", date: "January 2025", bg: "linear-gradient(135deg,#0f1a08,#1a2d0a)" },
    { cat: "Community", title: "The KROSS Social League", excerpt: "Friday nights. All levels. Just show up.", date: "December 2024", bg: "linear-gradient(135deg,#0a1a20,#0d2530)" },
];

export const activities = [
    { num: "01", name: "Padel", text: "Court hire, group sessions, beginner clinics, and weekly competitive leagues." },
    { num: "02", name: "Coaching", text: "Private and group lessons from certified pro coaches. Every skill level welcome." },
    { num: "03", name: "Fitness", text: "Performance training and conditioning built around court sports." },
    { num: "04", name: "Tournaments", text: "Monthly open tournaments and seasonal leagues. Compete and climb the rankings." },
];

export const plans = [
    { name: "Explorer", price: "฿2,900", perks: "4 hrs/month · 1 venue · 1 guest pass/month", featured: false },
    { name: "Athlete", price: "฿5,500", perks: "10 hrs/month · All venues · 3 guest passes · 10% coaching", featured: true },
    { name: "Elite", price: "฿9,800", perks: "Unlimited courts · All venues · Unlimited guests · 25% coaching · Locker", featured: false },
];