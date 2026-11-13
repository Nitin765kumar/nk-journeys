# NK Journeys

A static travel website (HTML, CSS and JavaScript) built as a learning and portfolio project.
Bookings and payments are simulated in the browser. No real money or personal data is processed.

## Folder structure

```
nk-journeys/
├── index.html            Home
├── destinations.html     Destinations with search and style filters
├── packages.html         Packages with search, filters and sorting
├── package.html          Package detail (?id=kerala-6d)
├── booking.html          Traveller details, coupon, pay in full or 30%
├── payment.html          Demo payment: UPI, card, net banking, wallet
├── confirmation.html     Booking voucher (printable)
├── about.html            About us, process, team
├── support.html          Booking guide, checklist, FAQs, booking tracker
├── contact.html          Enquiry form
├── privacy.html  terms.html  cancellation.html  payment-policy.html
├── 404.html
├── sitemap.xml           Page list for Google Search Console
├── favicon.svg           Tab icon
├── css/nkj.css           All styles
├── js/
│   ├── data.js           Destinations and packages (edit prices and trips here)
│   ├── utils.js          Helpers, cards, price calculation
│   ├── layout.js         Shared header, navigation and footer
│   └── pages.js          Logic for each page
└── img/                  Compressed photos
```

## Demo test values

| Item | Value |
| --- | --- |
| Coupon | `NKJ10` (10% off trip fare) |
| Card that succeeds | `4111 1111 1111 1111`, any future expiry, any 3-digit CVV |
| Card that fails | `4000 0000 0000 0002` |
| UPI that fails | `fail@upi` (any other `name@bank` succeeds) |

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder.

## Deploy on GitHub Pages

1. Copy everything in this folder to the root of your repository.
2. Commit and push.
3. In the repository, open Settings, then Pages, and choose the main branch and the root folder.

## Add a package

Add one object to `PACKAGES` in `js/data.js` (id, name, dest, days, nights, price, cats, img, itinerary).
Every page reads from that list, so the price stays the same everywhere.
