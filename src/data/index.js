export const venues = [
    {
        id: "onnut", num: "01", region: "BANGKOK", name: "ONNUT", loc: "Sukhumvit 77",
        courts: 6,
        bg: "linear-gradient(135deg,#0d3320,#1a4d28)",
        bg1: "linear-gradient(135deg,#0d3320,#1a4d28)",
        status: "Open", hours: "07:00 – 22:00", phone: "+66 2 123 4567",
        address: "101/5 Sukhumvit 77, Watthana, Bangkok 10110",
        intro: "KROSS Onnut is our flagship venue — a full-scale padel destination built from the ground up for serious players and beginners alike.",
        features: [{ num: "6", label: "Padel Courts" }, { num: "1", label: "Fitness Zone" }, { num: "300+", label: "Members" }, { num: "7am", label: "Opens Daily" }]
    },
    {
        id: "asoke", num: "02", region: "BANGKOK", name: "ASOKE", loc: "Sukhumvit 21",
        courts: 4,
        bg: "linear-gradient(160deg, #ba7520, #2a230a)",
        bg1: "linear-gradient(160deg, #ba7520, #2a230a)",
        status: "Open", hours: "07:00 – 22:00", phone: "+66 2 234 5678",
        address: "88/2 Sukhumvit 21, Klongtoey-Nua, Bangkok 10110",
        intro: "Located in the heart of Bangkok's CBD, KROSS Asoke brings padel to the city's most connected district.",
        features: [{ num: "4", label: "Padel Courts" }, { num: "Indoor", label: "Climate Controlled" }, { num: "150+", label: "Members" }, { num: "BTS", label: "Asoke Access" }]
    },
    {
        id: "thonglor", num: "03", region: "BANGKOK", name: "THONGLOR", loc: "Sukhumvit 55",
        courts: 0,
        bg: "linear-gradient(160deg, #444444,#0a0a0a)",
        bg1: "linear-gradient(160deg, #444444,#0a0a0a)",
        status: "Coming Soon", hours: "TBA", phone: "TBA",
        address: "Sukhumvit 55, Watthana, Bangkok 10110",
        intro: "KROSS Thonglor is our most design-forward venue yet — opening late 2025 with 5 courts, rooftop dining, and a social club atmosphere.",
        features: [{ num: "5", label: "Padel Courts" }, { num: "Rooftop", label: "Restaurant Bar" }, { num: "2025", label: "Opening Year" }, { num: "VIP", label: "Founding Members" }]
    },
    {
        id: "ramaiv", num: "04", region: "BANGKOK", name: "RAMA IV", loc: "Rama IV Road",
        courts: 0,
        bg: "linear-gradient(160deg, #24416a,#050d1a)",
        bg1: "linear-gradient(160deg, #24416a,#050d1a)",
        status: "Coming Soon", hours: "TBA", phone: "TBA",
        address: "Rama IV Road, Klong Toey, Bangkok 10110",
        intro: "Our south Bangkok outpost — KROSS Rama IV will serve the growing padel community south of the river.",
        features: [{ num: "4", label: "Padel Courts" }, { num: "2", label: "Practice Walls" }, { num: "2025", label: "Opening Year" }, { num: "South", label: "Bangkok" }]
    },
];

export const activities = [
    { num: "01", name: "Padel", icon: "🎾", text: "Court hire, group sessions, beginner clinics, and weekly competitive leagues." },
    { num: "02", name: "Coaching", icon: "🎓", text: "Private and group lessons from certified pro coaches. Every skill level welcome." },
    { num: "03", name: "Fitness", icon: "🏋️", text: "Performance training and conditioning built around court sports." },
    { num: "04", name: "Tournaments", icon: "🏆", text: "Monthly open tournaments and seasonal leagues. Compete and climb the rankings." },
];

export const plans = [
    { name: "Explorer", price: "฿2,900", perks: "4 hrs/month · 1 venue · 1 guest pass/month", featured: false },
    { name: "Athlete", price: "฿5,500", perks: "10 hrs/month · All venues · 3 guest passes · 10% coaching", featured: true },
    { name: "Elite", price: "฿9,800", perks: "Unlimited courts · All venues · Unlimited guests · 25% coaching · Locker", featured: false },
];
