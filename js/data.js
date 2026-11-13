/* NK Journeys: destinations and packages. Single source of truth for every page.
   Prices are sample values in INR, per adult. */

const DESTS = [
  {
    id: "kerala",
    name: "Kerala",
    state: "South India",
    cats: [
      "beaches",
      "family",
      "honeymoon"
    ],
    img: "kerala.jpg",
    g: "#7FB7A4,#0F5C5A",
    blurb: "Houseboats, tea hills and Ayurveda in the green south.",
    best: "Sep to Mar"
  },
  {
    id: "ladakh",
    name: "Ladakh",
    state: "Jammu & Kashmir (UT)",
    cats: [
      "mountains"
    ],
    img: "ladakh.avif",
    g: "#9DB4D9,#3B4F7A",
    blurb: "High passes, monasteries and turquoise lakes.",
    best: "May to Sep"
  },
  {
    id: "rajasthan",
    name: "Rajasthan & Agra",
    state: "North India",
    cats: [
      "heritage",
      "family"
    ],
    img: "agra.jpg",
    g: "#F6C177,#C8553D",
    blurb: "Forts, palaces and the Taj Mahal on one route.",
    best: "Oct to Mar"
  },
  {
    id: "goa",
    name: "Goa",
    state: "West Coast",
    cats: [
      "beaches",
      "honeymoon"
    ],
    img: "goa.avif",
    g: "#F9C784,#E26D5C",
    blurb: "Easy beaches, old churches and sunset cafes.",
    best: "Nov to Feb"
  },
  {
    id: "kashmir",
    name: "Kashmir",
    state: "Jammu & Kashmir (UT)",
    cats: [
      "mountains",
      "honeymoon"
    ],
    img: "kashmir.jpg",
    g: "#A8D5BA,#2F6F5E",
    blurb: "Shikara rides, meadows and snow in Gulmarg.",
    best: "Apr to Oct"
  },
  {
    id: "rishikesh",
    name: "Rishikesh & Haridwar",
    state: "Uttarakhand",
    cats: [
      "spiritual",
      "mountains"
    ],
    img: "rishikesh.jpg",
    g: "#9CC5E8,#2C6E9B",
    blurb: "Ganga aarti, yoga and river rafting.",
    best: "Sep to Jun"
  },
  {
    id: "ayodhya",
    name: "Ayodhya",
    state: "Uttar Pradesh",
    cats: [
      "spiritual",
      "family"
    ],
    img: "ayodhya.jpg",
    g: "#F2C48D,#B5651D",
    blurb: "A calm pilgrimage with evening aarti on the Sarayu.",
    best: "Oct to Mar"
  },
  {
    id: "darjeeling",
    name: "Darjeeling & Gangtok",
    state: "East Himalaya",
    cats: [
      "mountains",
      "family"
    ],
    img: "darjeeling.avif",
    g: "#B7C9E2,#4B5D8A",
    blurb: "Toy train, tea gardens and Kanchenjunga views.",
    best: "Mar to May, Oct to Dec"
  }
];

const CATS = [
  [
    "all",
    "All trips"
  ],
  [
    "mountains",
    "Mountains"
  ],
  [
    "beaches",
    "Beaches"
  ],
  [
    "heritage",
    "Heritage"
  ],
  [
    "spiritual",
    "Spiritual"
  ],
  [
    "honeymoon",
    "Honeymoon"
  ],
  [
    "family",
    "Family"
  ]
];

const INC = [
  "Hotel stays on twin sharing with breakfast",
  "Private AC vehicle for transfers and sightseeing",
  "Airport or station pickup and drop",
  "Local guide where mentioned in the itinerary",
  "Driver charges, tolls and parking"
];

const EXC = [
  "Flights or train tickets to the starting city",
  "Lunch and dinner unless mentioned",
  "Entry tickets and personal expenses",
  "Travel insurance",
  "Anything not listed under inclusions"
];

const PACKAGES = [
  {
    id: "kerala-6d",
    name: "Backwaters and Ayurveda",
    dest: "kerala",
    days: 6,
    nights: 5,
    price: 24500,
    cats: [
      "beaches",
      "family",
      "honeymoon"
    ],
    img: "kerala.jpg",
    g: "#7FB7A4,#0F5C5A",
    top: true,
    sum: "Houseboat night, Munnar tea hills and an Ayurvedic massage.",
    hi: [
      "Private houseboat night in Alleppey",
      "Tea estates and spice walks in Munnar",
      "One Ayurvedic massage session"
    ],
    it: [
      "Arrive in Kochi|Airport pickup, hotel check-in and an evening walk by the Chinese fishing nets.",
      "Kochi to Munnar|Drive through the hills with a waterfall stop, then settle into your resort.",
      "Munnar tea country|Visit a tea estate, Mattupetty Dam and a sunset viewpoint.",
      "Munnar to Alleppey|Scenic drive and boarding your houseboat in the afternoon.",
      "Backwater day|Cruise the canals, have a home-style Kerala lunch and an Ayurvedic massage.",
      "Departure|Breakfast and transfer to Kochi airport."
    ]
  },
  {
    id: "ladakh-7d",
    name: "Leh, Nubra and Pangong",
    dest: "ladakh",
    days: 7,
    nights: 6,
    price: 32000,
    cats: [
      "mountains"
    ],
    img: "ladakh.avif",
    g: "#9DB4D9,#3B4F7A",
    top: true,
    sum: "High passes, Hunder dunes and a night by Pangong lake.",
    hi: [
      "Khardung La pass",
      "Camel ride in Hunder dunes",
      "Night by Pangong lake"
    ],
    it: [
      "Arrive in Leh|Rest day to adjust to the altitude. Short walk to Leh market.",
      "Leh sightseeing|Shey Palace, Thiksey Monastery and Hemis in the afternoon.",
      "Leh to Nubra|Cross Khardung La and reach Hunder by evening.",
      "Nubra Valley|Camel ride in the dunes and a visit to Diskit Monastery.",
      "Nubra to Pangong|Drive via Shyok to the lake and stay in camps.",
      "Pangong to Leh|Sunrise at the lake, then a long drive back to Leh.",
      "Departure|Transfer to Leh airport."
    ]
  },
  {
    id: "golden-triangle-6d",
    name: "Golden Triangle",
    dest: "rajasthan",
    days: 6,
    nights: 5,
    price: 21999,
    cats: [
      "heritage",
      "family"
    ],
    img: "agra.jpg",
    g: "#F6C177,#C8553D",
    top: true,
    sum: "Delhi, Agra and Jaipur with private guides.",
    hi: [
      "Taj Mahal at sunrise",
      "Amber Fort with a local guide",
      "Old Delhi food walk"
    ],
    it: [
      "Arrive in Delhi|Pickup, hotel check-in and an evening at India Gate.",
      "Delhi sightseeing|Red Fort, Jama Masjid and a food walk in Old Delhi.",
      "Delhi to Agra|Drive to Agra, visit Agra Fort and see the sunset at Mehtab Bagh.",
      "Agra to Jaipur|Taj Mahal at sunrise, then drive to Jaipur via Fatehpur Sikri.",
      "Jaipur|Amber Fort, City Palace, Hawa Mahal and the bazaars.",
      "Departure|Transfer to Jaipur airport or station."
    ]
  },
  {
    id: "goa-4d",
    name: "Goa Beach Break",
    dest: "goa",
    days: 4,
    nights: 3,
    price: 14999,
    cats: [
      "beaches",
      "honeymoon"
    ],
    img: "goa.avif",
    g: "#F9C784,#E26D5C",
    sum: "Beaches, old Goa churches and sunset cafes.",
    hi: [
      "North Goa beach hopping",
      "Old Goa churches",
      "Sunset at Chapora Fort"
    ],
    it: [
      "Arrive in Goa|Pickup and hotel check-in. Evening at Calangute beach.",
      "North Goa|Baga, Anjuna and Vagator beaches, Chapora Fort at sunset.",
      "Old Goa and Panjim|Basilica of Bom Jesus, Fontainhas walk and a river dinner.",
      "Departure|Breakfast and airport drop."
    ]
  },
  {
    id: "kashmir-5d",
    name: "Kashmir Valley",
    dest: "kashmir",
    days: 5,
    nights: 4,
    price: 28000,
    cats: [
      "mountains",
      "honeymoon"
    ],
    img: "kashmir.jpg",
    g: "#A8D5BA,#2F6F5E",
    sum: "Shikara ride on Dal Lake and the meadows of Gulmarg.",
    hi: [
      "Shikara ride on Dal Lake",
      "Gondola ride in Gulmarg",
      "Mughal gardens in Srinagar"
    ],
    it: [
      "Arrive in Srinagar|Pickup, houseboat check-in and an evening Shikara ride.",
      "Srinagar|Mughal gardens, Shankaracharya Temple and old city market.",
      "Gulmarg|Day trip with the gondola ride and snow or meadow walks.",
      "Pahalgam|Betaab Valley and Aru Valley with a riverside lunch.",
      "Departure|Transfer to Srinagar airport."
    ]
  },
  {
    id: "rishikesh-4d",
    name: "Rishikesh and Haridwar",
    dest: "rishikesh",
    days: 4,
    nights: 3,
    price: 12999,
    cats: [
      "spiritual",
      "mountains"
    ],
    img: "rishikesh.jpg",
    g: "#9CC5E8,#2C6E9B",
    sum: "Ganga aarti, a yoga session and optional river rafting.",
    hi: [
      "Ganga aarti at Har Ki Pauri",
      "Morning yoga session",
      "Optional river rafting"
    ],
    it: [
      "Arrive in Haridwar|Check-in and Ganga aarti at Har Ki Pauri.",
      "Haridwar to Rishikesh|Mansa Devi temple, then Laxman Jhula and Ram Jhula.",
      "Rishikesh|Morning yoga, optional rafting and the evening aarti at Triveni Ghat.",
      "Departure|Breakfast and drop to Haridwar station or Dehradun airport."
    ]
  },
  {
    id: "ayodhya-2d",
    name: "Ayodhya Darshan",
    dest: "ayodhya",
    days: 2,
    nights: 1,
    price: 7499,
    cats: [
      "spiritual",
      "family"
    ],
    img: "ayodhya.jpg",
    g: "#F2C48D,#B5651D",
    sum: "Temple darshan and the evening aarti on the Sarayu.",
    hi: [
      "Ram Janmabhoomi darshan",
      "Hanuman Garhi",
      "Sarayu aarti"
    ],
    it: [
      "Arrive in Ayodhya|Check-in, Hanuman Garhi and Kanak Bhawan. Evening Sarayu aarti.",
      "Ayodhya darshan|Ram temple darshan in the morning, then drop to the station."
    ]
  },
  {
    id: "darjeeling-5d",
    name: "Darjeeling and Gangtok",
    dest: "darjeeling",
    days: 5,
    nights: 4,
    price: 19500,
    cats: [
      "mountains",
      "family"
    ],
    img: "darjeeling.avif",
    g: "#B7C9E2,#4B5D8A",
    sum: "Toy train, tea gardens and Kanchenjunga views.",
    hi: [
      "Toy train ride",
      "Tiger Hill sunrise",
      "Tsomgo Lake near Gangtok"
    ],
    it: [
      "Arrive in Bagdogra|Drive to Darjeeling and check in.",
      "Darjeeling|Tiger Hill sunrise, tea garden visit and a toy train ride.",
      "Darjeeling to Gangtok|Scenic drive and an evening at MG Marg.",
      "Gangtok|Tsomgo Lake and Baba Mandir day trip.",
      "Departure|Drive to Bagdogra airport or NJP station."
    ]
  }
];
