# NK Journeys

A multi-page travel booking website built with HTML, CSS and vanilla JavaScript as a learning and portfolio project.
Browse destinations, pick a package, book a trip, pay through a simulated checkout and get a printable voucher.

> **Demo project.** Bookings and payments are simulated in the browser. No real money or personal data is processed.

## Live demo

<!-- Live link goes here. Update it if the repository or username changes. -->
**[https://nitin765kumar.github.io/nk-journeys/](https://nitin765kumar.github.io/nk-journeys/)**

## Screenshots

### Home
<img width="1760" height="766" alt="home" src="https://github.com/user-attachments/assets/2af36fac-1a52-4671-97e3-08f32e71311b" />


### Destinations
<img width="1617" height="902" alt="destination" src="https://github.com/user-attachments/assets/6a01cb0b-f8cc-4bcb-b89d-6d55e1668fa7" />


### Packages
<img width="1727" height="917" alt="package" src="https://github.com/user-attachments/assets/8fd7b134-7b60-4cc7-b23b-afa5099c29fb" />


### About
<img width="1682" height="902" alt="about" src="https://github.com/user-attachments/assets/6f8bd828-4c3f-44e6-a1e3-0706a7e93732" />


### Support
<img width="1667" height="881" alt="support" src="https://github.com/user-attachments/assets/eb34c15d-58dd-4019-b0b3-4412e040e6f8" />


### Contact
<img width="1625" height="906" alt="contact" src="https://github.com/user-attachments/assets/263feb51-2cf4-4653-9cf0-028c5a5e9c51" />


## Features

- **Browse and filter:** destinations and packages with search, trip-style filters and sorting by price or duration.
- **Package details:** highlights, day-by-day itinerary, inclusions and exclusions, and date and traveller selection.
- **Booking flow:** traveller details with validation, children at half fare, coupon code, and a choice to pay in full or 30% now.
- **Demo checkout:** UPI, card, net banking and wallet, with a processing screen, success and failure states, and retry.
- **Voucher:** booking ID, payment ID, traveller list and balance due date, with a print option.
- **Help pages:** booking guide, travel checklist, FAQs and a booking tracker.
- **Contact form** with validation.
- **Policies:** privacy, terms, cancellation and refund, and payment policy.
- **Search-friendly:** sitemap, canonical links, favicon and social share tags.
- **Accessible and responsive:** skip link, labelled forms, keyboard-friendly navigation and a mobile layout.

## Tech

- HTML5, CSS3 (custom properties, grid and flexbox) and vanilla JavaScript (no frameworks)
- Data kept in one file (`js/data.js`) so prices stay the same on every page
- Browser `localStorage` for the booking draft, confirmed bookings and enquiries
- Hosted on GitHub Pages

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
├── img/                  Compressed photos
└── screenshots/          README screenshots
```

## Demo test values

| Item | Value |
| --- | --- |
| Coupon | `NKJ10` (10% off trip fare) |
| Card that succeeds | `4111 1111 1111 1111`, any future expiry, any 3-digit CVV |
| Card that fails | `4000 0000 0000 0002` |
| UPI that fails | `fail@upi` (any other `name@bank` succeeds) |

## Run locally

Open `index.html` in a browser, or run this in the project folder and visit `http://localhost:8000`:

```
python -m http.server 8000
```

## Deploy on GitHub Pages

1. Copy everything in this folder to the root of your repository.
2. Commit and push.
3. In the repository, open Settings, then Pages, and choose the main branch and the root folder.

## Add a package

Add one object to `PACKAGES` in `js/data.js` (id, name, dest, days, nights, price, cats, img, itinerary).
Every page reads from that list, so the price stays the same everywhere.

## What I learned

<!-- Edit this section in your own words. It is the part recruiters read most. -->
- Planning a multi-page flow (browse, book, pay, confirm) and passing data between pages with URL parameters and `localStorage`.
- Keeping one source of truth for data so prices never disagree between pages.
- Form validation, accessible labels and error messages.
- Basic SEO: sitemap, canonical links, Open Graph tags and Google Search Console.

## Next steps

- Add a Flask backend with a database so bookings are saved on a server.
- Add an admin page to manage bookings.
- Integrate a payment gateway in test mode.
- Create a separate page for each package.

## License

See the [LICENSE](LICENSE) file.
