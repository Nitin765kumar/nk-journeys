/* Page logic. Each page sets <body data-page="..."> and runs the matching function. */
const pages = {
    home() {
        $('#feat').innerHTML = PACKAGES.filter(p => p.top).map(pkgCard).join('');
        $('#dests').innerHTML = DESTS.slice(0, 4).map(destCard).join('');
        $('#hs').onsubmit = e => { e.preventDefault(); const q = $('#hq').value.trim(), c = $('#hc').value, u = new URLSearchParams(); if (q)
            u.set('q', q); if (c !== 'all')
            u.set('cat', c); location.href = 'packages.html' + (u.toString() ? '?' + u : ''); };
    },
    destinations() {
        let cat = 'all', q = '';
        const chips = $('#chips'), out = $('#out');
        chips.innerHTML = CATS.map(([k, t]) => `<button class="chip" data-k="${k}" aria-pressed="${k === 'all'}">${t}</button>`).join('');
        const draw = () => { const l = DESTS.filter(d => (cat === 'all' || d.cats.includes(cat)) && (!q || (d.name + d.state + d.blurb).toLowerCase().includes(q))); out.innerHTML = l.length ? l.map(destCard).join('') : '<div class="empty" style="grid-column:1/-1"><h3>No destination matches that</h3><p>Try a different style or clear the search.</p></div>'; };
        chips.onclick = e => { const b = e.target.closest('.chip'); if (!b)
            return; cat = b.dataset.k; $$('.chip', chips).forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); };
        $('#dq').oninput = e => { q = e.target.value.trim().toLowerCase(); draw(); };
        draw();
    },
    packages() {
        let cat = Q.get('cat') || 'all', q = (Q.get('q') || '').toLowerCase(), sort = 'pop';
        const dd = dest(Q.get('dest') || ''), chips = $('#chips'), out = $('#out');
        if (dd) {
            $('#ttl').textContent = 'Trips in ' + dd.name;
            $('#sub').textContent = dd.blurb;
        }
        $('#pq').value = Q.get('q') || '';
        chips.innerHTML = CATS.map(([k, t]) => `<button class="chip" data-k="${k}" aria-pressed="${k === cat}">${t}</button>`).join('');
        const draw = () => {
            let l = PACKAGES.filter(p => (!dd || p.dest === dd.id) && (cat === 'all' || p.cats.includes(cat)) && (!q || (p.name + p.sum + dest(p.dest).name).toLowerCase().includes(q)));
            if (sort === 'lo')
                l.sort((a, b) => a.price - b.price);
            if (sort === 'hi')
                l.sort((a, b) => b.price - a.price);
            if (sort === 'dur')
                l.sort((a, b) => a.days - b.days);
            $('#count').textContent = l.length + (l.length === 1 ? ' trip' : ' trips');
            out.innerHTML = l.length ? l.map(pkgCard).join('') : '<div class="empty" style="grid-column:1/-1"><h3>No trips match these filters</h3><p>Clear a filter or <a href="contact.html"><u>ask us for a custom plan</u></a>.</p></div>';
        };
        chips.onclick = e => { const b = e.target.closest('.chip'); if (!b)
            return; cat = b.dataset.k; $$('.chip', chips).forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); };
        $('#pq').oninput = e => { q = e.target.value.trim().toLowerCase(); draw(); };
        $('#ps').onchange = e => { sort = e.target.value; draw(); };
        draw();
    },
    package() {
        const p = pkg(Q.get('id')), r = $('#app');
        if (!p) {
            r.innerHTML = notFound("We couldn't find that trip.");
            return;
        }
        document.title = p.name + ' | NK Journeys';
        const d = dest(p.dest);
        r.innerHTML = `<div class="wrap"><div class="page-h"><p class="meta"><a href="packages.html?dest=${d.id}"><u>${esc(d.name)}</u></a></p><h1 style="font-size:clamp(32px,4vw,48px)">${esc(p.name)}</h1><p>${p.days} days and ${p.nights} nights. ${esc(p.sum)}</p></div>
 <div class="two"><div>${photo(p.img, p.g, 'cover')}
 <section class="panel"><h2>Trip highlights</h2><ul class="lst tick">${p.hi.map(h => `<li>${esc(h)}</li>`).join('')}</ul></section>
 <section class="panel"><h2>Day-by-day plan</h2>${p.it.map((s, i) => { const [t, x] = s.split('|'); return `<details${i === 0 ? ' open' : ''}><summary>Day ${i + 1}: ${esc(t)}</summary><p>${esc(x)}</p></details>`; }).join('')}</section>
 <section class="panel"><div class="row"><div><h3>What's included</h3><ul class="lst tick">${(p.inc || INC).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div><div><h3>What's not included</h3><ul class="lst cross">${(p.exc || EXC).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></div></section>
 <section class="panel"><h2>Good to know</h2><ul class="lst"><li>Best time to visit ${esc(d.name)}: ${esc(d.best)}.</li><li>Free date change up to 15 days before departure. See the <a href="cancellation.html"><u>cancellation policy</u></a>.</li><li>Need a different hotel category or fewer days? <a href="contact.html"><u>Ask for a custom plan</u></a>.</li></ul></section></div>
 <aside class="panel sticky"><p class="mut" style="margin:0">From</p><h2 style="margin:0 0 4px">${inr(p.price)}</h2><p class="mut" style="margin:0 0 18px">per adult, GST extra (5%)</p>
 <div class="f"><label for="dt">Travel date</label><input id="dt" type="date" min="${iso(7)}" value="${esc(Q.get('date') || iso(21))}"></div>
 <div class="f"><label for="ad">Adults</label><select id="ad">${[1, 2, 3, 4, 5, 6, 7, 8].map(n => `<option${n === 2 ? ' selected' : ''}>${n}</option>`).join('')}</select></div>
 <div id="e" class="err" role="alert" hidden></div><button id="go" class="btn btn-gold btn-block">Book this trip</button><p class="mut" style="font-size:14px;margin:14px 0 0">No payment yet. You review everything on the next page. <a href="contact.html"><u>Have a question?</u></a></p></aside></div></div>`;
        $('#go').onclick = () => { const dt = $('#dt').value, e = $('#e'); if (!dt || dt < iso(7)) {
            e.hidden = false;
            e.textContent = 'Pick a travel date at least 7 days from today.';
            return;
        } location.href = `booking.html?id=${p.id}&date=${dt}&a=${$('#ad').value}`; };
    },
    booking() {
        const p = pkg(Q.get('id')), r = $('#app');
        if (!p) {
            r.innerHTML = notFound('Choose a trip before booking.');
            return;
        }
        const a0 = Math.min(8, Math.max(1, +Q.get('a') || 2)), dt0 = Q.get('date') || iso(21);
        let others = [], applied = false;
        r.innerHTML = `<div class="wrap"><div class="page-h"><h1 style="font-size:clamp(30px,4vw,44px)">Book: ${esc(p.name)}</h1><p>Step 1 of 3. Your details, then payment, then confirmation.</p></div>
 <div class="two"><form id="bf" novalidate><section class="panel"><h2>Lead traveller</h2><div class="row"><div class="f"><label for="nm">Full name (as on ID)</label><input id="nm" autocomplete="name"></div><div class="f"><label for="ph">Mobile number</label><input id="ph" inputmode="numeric" maxlength="10" autocomplete="tel" placeholder="10-digit number"></div></div><div class="row"><div class="f"><label for="em">Email</label><input id="em" type="email" autocomplete="email"></div><div class="f"><label for="ct">Travelling from</label><input id="ct" placeholder="City"></div></div></section>
 <section class="panel"><h2>Trip details</h2><div class="row"><div class="f"><label for="dt">Travel date</label><input id="dt" type="date" min="${iso(7)}" value="${esc(dt0)}"></div><div class="f"><label for="ad">Adults</label><select id="ad">${[1, 2, 3, 4, 5, 6, 7, 8].map(n => `<option${n === a0 ? ' selected' : ''}>${n}</option>`).join('')}</select></div></div><div class="f"><label for="kd">Children (5 to 11 years, half fare)</label><select id="kd">${[0, 1, 2, 3, 4].map(n => `<option>${n}</option>`).join('')}</select></div><div id="oth"></div></section>
 <section class="panel"><h2>Coupon</h2><div class="row"><input id="cp" aria-label="Coupon code" placeholder="Try NKJ10"><button type="button" id="ca" class="btn btn-line">Apply</button></div><div id="cm" aria-live="polite"></div></section>
 <section class="panel"><h2>How would you like to pay?</h2><label class="radio"><input type="radio" name="md" value="full" checked><div><b>Pay in full now</b><span>Nothing left to pay later.</span></div></label><label class="radio"><input type="radio" name="md" value="advance"><div><b>Pay 30% now</b><span>The balance is due 7 days before departure.</span></div></label></section>
 <div id="er" class="err" role="alert" hidden></div><button class="btn btn-gold btn-block" style="padding:16px">Continue to payment</button></form>
 <aside class="sticky"><section class="panel"><h3>${esc(p.name)}</h3><p class="mut" style="margin:0 0 12px">${p.days} days and ${p.nights} nights</p><div id="sm"></div></section>
 <section class="panel"><h3>Need help booking?</h3><ol class="lst"><li>Check the plan and what's included.</li><li>Enter names exactly as on ID. Hotels and permits need this.</li><li>Use a mobile number and email you check, as confirmations go there.</li><li>Review the total, then pay in full or 30%.</li><li>Save your voucher after payment.</li></ol><p style="margin:12px 0 0"><a href="support.html"><u>Read the full booking guide</u></a> or <a href="contact.html"><u>contact us</u></a>.</p></section></aside></div></div>`;
        const g = id => $('#' + id).value, mode = () => $('input[name=md]:checked').value;
        const upd = () => {
            const a = +g('ad'), k = +g('kd'), c = calc(p, a, k, applied ? 'NKJ10' : '', mode());
            $('#sm').innerHTML = sumHtml(c, a, k) + `<div class="sum"><div class="tot"><span>Pay now</span><span>${inr(c.pay)}</span></div></div>`;
            const n = a + k - 1, box = $('#oth');
            box.innerHTML = n > 0 ? `<h3 style="margin-top:6px">Other travellers</h3><div class="row">${Array.from({ length: n }, (_, i) => `<div class="f"><label for="o${i}">Traveller ${i + 2} full name</label><input id="o${i}" value="${esc(others[i] || '')}"></div>`).join('')}</div>` : '';
            $$('#oth input').forEach((x, i) => x.oninput = () => others[i] = x.value);
        };
        ['ad', 'kd'].forEach(i => $('#' + i).onchange = upd);
        $$('input[name=md]').forEach(x => x.onchange = upd);
        $('#ca').onclick = () => { const v = g('cp').trim().toUpperCase(); applied = v === 'NKJ10'; $('#cm').innerHTML = applied ? '<div class="ok">Coupon applied: 10% off the trip fare.</div>' : '<div class="err">That code is not valid. Try NKJ10 in this demo.</div>'; upd(); };
        $('#bf').onsubmit = e => {
            e.preventDefault();
            const er = [], a = +g('ad'), k = +g('kd'), n = a + k - 1;
            if (g('nm').trim().length < 2)
                er.push('Enter the lead traveller\'s full name.');
            if (!/^[6-9]\d{9}$/.test(g('ph')))
                er.push('Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9.');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g('em')))
                er.push('Enter a valid email address.');
            if (!g('dt') || g('dt') < iso(7))
                er.push('Pick a travel date at least 7 days from today.');
            for (let i = 0; i < n; i++)
                if ((others[i] || '').trim().length < 2) {
                    er.push('Enter the name of every traveller.');
                    break;
                }
            const box = $('#er');
            if (er.length) {
                box.hidden = false;
                box.innerHTML = er.map(x => esc(x)).join('<br>');
                box.scrollIntoView({ block: 'center' });
                return;
            }
            box.hidden = true;
            const c = calc(p, a, k, applied ? 'NKJ10' : '', mode());
            store.set('nkj_draft', { pid: p.id, name: g('nm').trim(), phone: g('ph'), email: g('em').trim(), city: g('ct').trim(), date: g('dt'), a, k, others: others.slice(0, n).map(x => x.trim()), coupon: applied ? 'NKJ10' : '', mode: mode(), calc: c });
            location.href = 'payment.html';
        };
        upd();
    },
    payment() {
        const d = store.get('nkj_draft'), r = $('#app');
        if (!d) {
            r.innerHTML = notFound('No booking in progress.');
            return;
        }
        const p = pkg(d.pid), c = d.calc;
        r.innerHTML = `<div class="wrap"><div class="page-h"><h1 style="font-size:clamp(30px,4vw,44px)">Payment</h1><p>Step 2 of 3. Choose how to pay ${inr(c.pay)}.</p></div><div class="two"><div class="panel">
 <div class="hint"><b>Demo payment, nothing is charged.</b> Test card 4111 1111 1111 1111 succeeds and 4000 0000 0000 0002 fails. For UPI, any name@bank succeeds and fail@upi fails. Do not enter real card details.</div>
 <div class="tabs" role="tablist">${[['upi', 'UPI'], ['card', 'Card'], ['nb', 'Net banking'], ['wl', 'Wallet']].map(([k, t], i) => `<button type="button" class="tab" role="tab" data-t="${k}" aria-selected="${i === 0}">${t}</button>`).join('')}</div>
 <div id="fail" class="err" role="alert" hidden></div>
 <form data-m="upi" class="pane"><div class="f"><label for="u">UPI ID</label><input id="u" placeholder="name@bank" autocomplete="off"></div><button class="btn btn-gold btn-block">Pay ${inr(c.pay)}</button></form>
 <form data-m="card" class="pane" hidden><div class="f"><label for="cn">Card number</label><input id="cn" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000" autocomplete="off"></div><div class="f"><label for="cc">Name on card</label><input id="cc" autocomplete="off"></div><div class="row"><div class="f"><label for="ce">Expiry (MM/YY)</label><input id="ce" maxlength="5" placeholder="MM/YY" autocomplete="off"></div><div class="f"><label for="cv">CVV</label><input id="cv" type="password" inputmode="numeric" maxlength="3" autocomplete="off"></div></div><button class="btn btn-gold btn-block">Pay ${inr(c.pay)}</button></form>
 <form data-m="nb" class="pane" hidden><div class="f"><label for="bk">Choose your bank</label><select id="bk"><option value="">Select a bank</option><option>State Bank of India</option><option>HDFC Bank</option><option>ICICI Bank</option><option>Axis Bank</option><option value="fail">Test bank (payment fails)</option></select></div><button class="btn btn-gold btn-block">Continue to bank</button></form>
 <form data-m="wl" class="pane" hidden><div class="f"><label for="wa">Choose a wallet</label><select id="wa"><option value="">Select a wallet</option><option>Paytm</option><option>PhonePe</option><option>Amazon Pay</option></select></div><button class="btn btn-gold btn-block">Pay ${inr(c.pay)}</button></form></div>
 <aside class="sticky"><section class="panel"><h3>${esc(p.name)}</h3><p class="mut" style="margin:0 0 12px">${fmtDate(d.date)}, ${d.a} adult${d.a > 1 ? 's' : ''}${d.k ? `, ${d.k} child${d.k > 1 ? 'ren' : ''}` : ''}</p>${sumHtml(c, d.a, d.k)}<div class="sum"><div class="tot"><span>Pay now</span><span>${inr(c.pay)}</span></div></div>${d.mode === 'advance' ? `<p class="mut" style="font-size:14px">Balance ${inr(c.total - c.pay)} is due 7 days before departure.</p>` : ''}<p style="margin:8px 0 0"><a href="booking.html?id=${p.id}&date=${d.date}&a=${d.a}"><u>Edit booking details</u></a></p></section></aside></div></div>
 <div class="ov" id="ov" role="status"><div><div class="spin"></div><h2>Processing your payment</h2><p>Please do not refresh or close this page.</p></div></div>`;
        const fail = $('#fail');
        $('.tabs').onclick = e => { const b = e.target.closest('.tab'); if (!b)
            return; fail.hidden = true; $$('.tab').forEach(x => x.setAttribute('aria-selected', x === b)); $$('.pane').forEach(f => f.hidden = f.dataset.m !== b.dataset.t); };
        $('#cn').oninput = e => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
        $('#ce').oninput = e => { let v = e.target.value.replace(/\D/g, '').slice(0, 4); e.target.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v; };
        const luhn = n => { let s = 0, alt = false; for (let i = n.length - 1; i >= 0; i--) {
            let x = +n[i];
            if (alt) {
                x *= 2;
                if (x > 9)
                    x -= 9;
            }
            s += x;
            alt = !alt;
        } return n.length >= 13 && s % 10 === 0; };
        const bad = m => { fail.hidden = false; fail.textContent = m; fail.scrollIntoView({ block: 'center' }); };
        const run = (method, last4, ok, why) => {
            fail.hidden = true;
            $('#ov').classList.add('on');
            setTimeout(() => {
                $('#ov').classList.remove('on');
                if (!ok) {
                    bad(why + ' You have not been charged. Try again or choose another method.');
                    return;
                }
                const b = { id: 'NKJ' + rid(6), payId: 'pay_demo_' + rid(10, 'abcdefghijklmnopqrstuvwxyz0123456789'), paidAt: new Date().toISOString(), method, last4, ...d };
                const all = store.get('nkj_bookings', []);
                all.push(b);
                store.set('nkj_bookings', all);
                store.del('nkj_draft');
                location.href = 'confirmation.html?id=' + b.id;
            }, 2400);
        };
        $$('.pane').forEach(f => f.onsubmit = e => {
            e.preventDefault();
            const m = f.dataset.m;
            if (m === 'upi') {
                const v = $('#u').value.trim();
                if (!/^[\w.\-]{2,}@[a-z]{2,}$/i.test(v))
                    return bad('Enter a valid UPI ID like name@bank.');
                run('UPI', null, v.toLowerCase() !== 'fail@upi', 'The UPI payment was declined (demo).');
            }
            if (m === 'card') {
                const n = $('#cn').value.replace(/\s/g, ''), ex = $('#ce').value.match(/^(\d\d)\/(\d\d)$/), cv = $('#cv').value;
                if (!luhn(n))
                    return bad('That card number is not valid.');
                if ($('#cc').value.trim().length < 2)
                    return bad('Enter the name on the card.');
                if (!ex || +ex[1] < 1 || +ex[1] > 12 || new Date(2000 + +ex[2], +ex[1], 0, 23, 59) < new Date())
                    return bad('Enter a valid expiry date that has not passed.');
                if (!/^\d{3}$/.test(cv))
                    return bad('Enter the 3-digit CVV.');
                run('Card', n.slice(-4), n !== '4000000000000002', 'The card was declined by the bank (demo).');
            }
            if (m === 'nb') {
                const v = $('#bk').value;
                if (!v)
                    return bad('Choose a bank to continue.');
                run('Net banking', null, v !== 'fail', 'The bank could not complete the payment (demo).');
            }
            if (m === 'wl') {
                if (!$('#wa').value)
                    return bad('Choose a wallet to continue.');
                run('Wallet', null, true, '');
            }
        });
    },
    confirmation() {
        const b = store.get('nkj_bookings', []).find(x => x.id === Q.get('id')), r = $('#app');
        if (!b) {
            r.innerHTML = notFound('We could not find that booking on this device.');
            return;
        }
        const p = pkg(b.pid), c = b.calc, bal = c.total - c.pay, due = new Date(b.date + 'T00:00:00');
        due.setDate(due.getDate() - 7);
        r.innerHTML = `<div class="wrap"><div class="page-h"><h1 style="font-size:clamp(30px,4vw,44px)">Booking confirmed</h1><p>Step 3 of 3. Your booking ID is <b>${esc(b.id)}</b>. Save this voucher.</p></div><div class="two"><div class="voucher"><h2>${esc(p.name)}</h2><p class="mut" style="margin:4px 0 0">${p.days} days and ${p.nights} nights in ${esc(dest(p.dest).name)}</p>
 <dl><dt>Booking ID</dt><dd>${esc(b.id)}</dd><dt>Payment ID</dt><dd>${esc(b.payId)}</dd><dt>Travel date</dt><dd>${fmtDate(b.date)}</dd><dt>Lead traveller</dt><dd>${esc(b.name)}, ${esc(b.phone)}</dd><dt>Travellers</dt><dd>${[b.name, ...b.others].map(esc).join(', ')}</dd><dt>Paid</dt><dd>${inr(c.pay)} by ${esc(b.method)}${b.last4 ? ' ending ' + esc(b.last4) : ''} on ${fmtDate(b.paidAt.slice(0, 10))}</dd><dt>Balance</dt><dd>${bal > 0 ? inr(bal) + ' due by ' + due.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Nil, paid in full'}</dd></dl></div>
 <aside><section class="panel"><h3>What happens next</h3><ul class="tl"><li><b>Now:</b> keep this voucher. In a real booking you would also get it by email and SMS. This demo sends nothing.</li><li><b>${bal > 0 ? '7 days before' : '3 days before'}:</b> ${bal > 0 ? 'pay the balance and receive pickup details.' : 'receive pickup and hotel details.'}</li><li><b>Day of travel:</b> carry a valid photo ID for every traveller.</li></ul><div class="noprint"><button class="btn btn-ink btn-block" onclick="print()">Print voucher</button><p style="margin:12px 0 0"><a href="packages.html"><u>Explore more trips</u></a> or <a href="support.html"><u>get help</u></a>.</p></div></section></aside></div></div>`;
    },
    support() {
        $('#tf').onsubmit = e => {
            e.preventDefault();
            const id = $('#tid').value.trim().toUpperCase(), out = $('#tr'), b = store.get('nkj_bookings', []).find(x => x.id === id);
            if (!b) {
                out.innerHTML = '<div class="err">No booking with that ID was found on this device. Booking IDs look like NKJ123456, and demo bookings are saved only in the browser where you made them.</div>';
                return;
            }
            const p = pkg(b.pid), bal = b.calc.total - b.calc.pay;
            out.innerHTML = `<div class="ok"><b>${esc(b.id)}</b>: ${esc(p.name)} on ${fmtDate(b.date)}.<br>Status: ${bal > 0 ? 'Confirmed, balance ' + inr(bal) + ' pending' : 'Confirmed, paid in full'}.<br><a href="confirmation.html?id=${esc(b.id)}"><u>Open your voucher</u></a></div>`;
        };
    },
    contact() {
        const sel = $('#ci');
        sel.innerHTML = '<option value="Custom trip">A custom trip</option>' + PACKAGES.map(p => `<option value="${esc(p.name)}">${esc(p.name)}</option>`).join('');
        const t = pkg(Q.get('trip') || '');
        if (t)
            sel.value = t.name;
        $('#cf').onsubmit = e => {
            e.preventDefault();
            const g = id => $('#' + id).value.trim(), er = [], box = $('#ce');
            if (g('cn').length < 2)
                er.push('Enter your name.');
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g('cm')))
                er.push('Enter a valid email address.');
            if (g('cp') && !/^[6-9]\d{9}$/.test(g('cp')))
                er.push('Enter a 10-digit mobile number, or leave it empty.');
            if (g('cg').length < 10)
                er.push('Tell us a little more in your message (at least 10 characters).');
            if (er.length) {
                box.hidden = false;
                box.innerHTML = er.map(esc).join('<br>');
                return;
            }
            box.hidden = true;
            const id = 'ENQ' + rid(5), all = store.get('nkj_enquiries', []);
            all.push({ id, name: g('cn'), email: g('cm'), phone: g('cp'), trip: sel.value, when: g('cw'), message: g('cg'), at: new Date().toISOString() });
            store.set('nkj_enquiries', all);
            $('#cr').innerHTML = `<div class="ok"><b>Thanks, ${esc(g('cn'))}.</b> Your enquiry ID is ${id}. In this demo the message is saved only in this browser and is not sent anywhere. A real agency would reply within one working day.</div>`;
            $('#cf').reset();
            sel.value = t ? t.name : 'Custom trip';
        };
    }
};

document.addEventListener('DOMContentLoaded', () => { chrome(); const f = pages[document.body.dataset.page]; if (f)
    f(); });
