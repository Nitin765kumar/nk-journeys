/* Shared helpers: formatting, storage, cards and price calculation. */
/* NK Journeys – shared logic. Demo project: everything is simulated in the browser. */

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

const Q = new URLSearchParams(location.search);

const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const store = { get(k, d) { try {
        const v = JSON.parse(localStorage.getItem(k));
        return v ?? d;
    }
    catch (e) {
        return d;
    } }, set(k, v) { try {
        localStorage.setItem(k, JSON.stringify(v));
    }
    catch (e) { } }, del(k) { try {
        localStorage.removeItem(k);
    }
    catch (e) { } } };

const pkg = id => PACKAGES.find(p => p.id === id), dest = id => DESTS.find(d => d.id === id);

const iso = (off = 0) => { const d = new Date(); d.setDate(d.getDate() + off); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

const fmtDate = s => new Date(s + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const rid = (n, al = '0123456789') => Array.from({ length: n }, () => al[Math.floor(Math.random() * al.length)]).join('');

const photo = (src, g, cls = 'ph') => { const [a, b] = g.split(','); return `<div class="${cls}" style="background:linear-gradient(160deg,${a},${b})"><img src="img/${src}" alt="" loading="lazy" onerror="this.remove()"></div>`; };

const pkgCard = p => `<article class="card">${photo(p.img, p.g)}<div class="card-b"><p class="meta">${esc(dest(p.dest).name)}, ${p.days} days and ${p.nights} nights</p><h3>${esc(p.name)}</h3><p class="mut">${esc(p.sum)}</p><div class="card-f"><span><small>From</small> <b>${inr(p.price)}</b><small> per adult</small></span><a class="btn btn-ink" href="package.html?id=${p.id}">View trip</a></div></div></article>`;

const destCard = d => `<article class="card">${photo(d.img, d.g)}<div class="card-b"><p class="meta">${esc(d.state)}</p><h3>${esc(d.name)}</h3><p class="mut">${esc(d.blurb)}</p><div class="card-f"><small>Best time: ${esc(d.best)}</small><a class="btn btn-ink" href="packages.html?dest=${d.id}">See trips</a></div></div></article>`;

const notFound = m => `<div class="wrap empty"><h2>${m}</h2><p>Pick a trip to get started.</p><a class="btn btn-gold" href="packages.html">Browse packages</a></div>`;

function calc(p, a, k, coupon, mode) { const base = p.price * a + p.price * 0.5 * k, disc = coupon === 'NKJ10' ? base * 0.1 : 0, gst = (base - disc) * 0.05, total = base - disc + gst; return { base, disc, gst, total, pay: Math.round(mode === 'advance' ? total * 0.3 : total) }; }

const sumHtml = (c, a, k) => `<div class="sum"><div><span>Trip fare (${a} adult${a > 1 ? 's' : ''}${k ? `, ${k} child${k > 1 ? 'ren' : ''}` : ''})</span><span>${inr(c.base)}</span></div>${c.disc ? `<div><span>Coupon NKJ10</span><span>− ${inr(c.disc)}</span></div>` : ''}<div><span>GST (5%)</span><span>${inr(c.gst)}</span></div><div class="tot"><span>Total</span><span>${inr(c.total)}</span></div></div>`;
