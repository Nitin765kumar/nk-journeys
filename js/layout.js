/* Shared header, navigation and footer, injected on every page.
   Edit the links here once and every page updates. */

const NAV_LINKS = [
  ['index.html', 'Home'],
  ['destinations.html', 'Destinations'],
  ['packages.html', 'Packages'],
  ['about.html', 'About'],
  ['support.html', 'Support'],
  ['contact.html', 'Contact'],
];

function chrome() {
  const current = document.body.dataset.nav;

  const links = NAV_LINKS.map(([href, label]) => {
    const active = current === href ? ' aria-current="page"' : '';
    return `<a href="${href}"${active}>${label}</a>`;
  }).join('');

  $('#site-header').innerHTML = `
    <div class="demo-bar">
      Demo project: bookings and payments here are simulated.
      No real money or personal data is processed.
    </div>
    <header class="nav">
      <div class="wrap nav-in">
        <a class="logo" href="index.html">NK Journeys<i></i></a>
        <button class="nav-btn" aria-expanded="false" aria-controls="navl">Menu</button>
        <nav class="nav-links" id="navl" aria-label="Main">
          ${links}
          <a class="btn btn-gold" href="packages.html">Plan my trip</a>
        </nav>
      </div>
    </header>`;

  $('#site-footer').innerHTML = `
    <footer class="foot">
      <div class="wrap">
        <div class="foot-g">
          <div>
            <div class="logo">NK Journeys<i></i></div>
            <p>Stories of India, trip by trip. A portfolio project by Nitin Kumar.</p>
          </div>
          <div>
            <h3>Trips</h3>
            <a href="packages.html">All packages</a>
            <a href="destinations.html">Destinations</a>
            <a href="contact.html">Custom trip</a>
          </div>
          <div>
            <h3>Company</h3>
            <a href="about.html">About us</a>
            <a href="support.html">Help and support</a>
            <a href="contact.html">Contact</a>
          </div>
          <div>
            <h3>Policies</h3>
            <a href="privacy.html">Privacy policy</a>
            <a href="terms.html">Terms and conditions</a>
            <a href="cancellation.html">Cancellation and refund</a>
            <a href="payment-policy.html">Payment policy</a>
          </div>
        </div>
        <small>
          © 2026 NK Journeys. Demo project: no real bookings, payments
          or travel services are offered.
        </small>
      </div>
    </footer>`;

  const menuButton = $('.nav-btn');
  menuButton.onclick = () => {
    const open = $('#navl').classList.toggle('open');
    menuButton.setAttribute('aria-expanded', open);
  };
}
