const cars = [
  {id:1,brand:'Dacia',model:'Sandero III',category:'Economy',transmission:'Manual',fuel:'Petrol',seats:5,price:260,image:'assets/images/cars/dacia-sandero-iii.jpg',alt:'Dacia Sandero III viewed from the front in France',source:'https://commons.wikimedia.org/wiki/File:Dacia_Sandero_III_(France)_front_view.jpg',credit:'crash71100',license:'CC0 1.0',description:'A third-generation Sandero: a practical, comfortable city car for everyday routes around Béni Mellal and beyond.'},
  {id:2,brand:'Renault',model:'Clio V TCe 90',category:'Economy',transmission:'Automatic',fuel:'Petrol',seats:5,price:290,image:'assets/images/cars/renault-clio-v-tce-90.jpg',alt:'2020 Renault Clio V TCe 90 in a left-side view',source:'https://commons.wikimedia.org/wiki/File:Renault_Clio_V_TCe_90_(2020)_(52186046781).jpg',credit:'Charles / usf1fan2',license:'CC BY 2.0',description:'A fifth-generation Clio TCe 90 with a petrol engine and CVT, suited to city driving and relaxed road trips.'},
  {id:3,brand:'Peugeot',model:'208 II GT Line',category:'Compact',transmission:'Automatic',fuel:'Petrol',seats:5,price:340,image:'assets/images/cars/peugeot-208-ii-gt-line.jpg',alt:'2019 Peugeot 208 II GT Line PureTech Automatic viewed from the front',source:'https://commons.wikimedia.org/wiki/File:2019_Peugeot_208_GT_Line_PureTech_Automatic_1.2_Front.jpg',credit:'Vauxford',license:'CC BY-SA 4.0',description:'A second-generation Peugeot 208 GT Line with a 1.2 PureTech petrol engine and automatic transmission.'},
  {id:4,brand:'Volkswagen',model:'Golf 8 R',category:'Compact',transmission:'Automatic',fuel:'Petrol',seats:5,price:390,image:'assets/images/cars/volkswagen-golf-viii-r.jpg',alt:'2022 Volkswagen Golf VIII R viewed from the front',source:'https://commons.wikimedia.org/wiki/File:Golf_VIII_R_2022_front.jpg',credit:'Autojaam',license:'CC BY-SA 4.0',description:'A real eighth-generation Volkswagen Golf R, photographed in 2022.'},
  {id:5,brand:'Toyota',model:'Corolla Hybrid E210',category:'Sedan',transmission:'Automatic',fuel:'Hybrid',seats:5,price:430,image:'assets/images/cars/toyota-corolla-e210-hybrid.jpg',alt:'Toyota Corolla Hybrid S E210 sedan viewed from the front',source:'https://commons.wikimedia.org/wiki/File:Toyota_COROLLA_HYBRID_S_2WD_(6AA-ZWE211-AEXEB)_front.jpg',credit:'Tokumeigakarinoaoshima',license:'CC BY-SA 4.0',description:'A twelfth-generation Corolla Hybrid S sedan with the E210 platform and 2WD hybrid powertrain.'},
  {id:6,brand:'Škoda',model:'Octavia IV SE L TDI Estate',category:'Estate',transmission:'Automatic',fuel:'Diesel',seats:5,price:460,image:'assets/images/cars/skoda-octavia-iv-tdi.jpg',alt:'2020 Škoda Octavia IV SE L First Edition TDI Estate viewed from the front',source:'https://commons.wikimedia.org/wiki/File:2020_Skoda_Octavia_SE_L_First_Edition_TDi_Estate_2.0_Front.jpg',credit:'Vauxford',license:'CC BY-SA 4.0',description:'A fourth-generation Octavia SE L First Edition estate with a 2.0 TDI diesel engine and generous luggage space.'},
  {id:7,brand:'Dacia',model:'Duster III',category:'SUV',transmission:'Manual',fuel:'Petrol',seats:5,price:450,image:'assets/images/cars/dacia-duster-iii.jpg',alt:'2024 Dacia Duster III viewed from the front',source:'https://commons.wikimedia.org/wiki/File:2024_Dacia_Duster_front.jpg',credit:'Corvettec6r',license:'CC BY 4.0',description:'A real third-generation Dacia Duster, introduced for 2024, for family travel and changing terrain.'},
  {id:8,brand:'Peugeot',model:'3008 II GT Premium',category:'SUV',transmission:'Automatic',fuel:'Petrol',seats:5,price:560,image:'assets/images/cars/peugeot-3008-ii-gt.jpg',alt:'2020 Peugeot 3008 II GT Premium PureTech Automatic facelift viewed from the front',source:'https://commons.wikimedia.org/wiki/File:2020_Peugeot_3008_GT_Premium_PureTech_Automatic_1.6_facelift.jpg',credit:'Vauxford',license:'CC BY-SA 4.0',description:'A facelifted second-generation Peugeot 3008 GT Premium with a 1.6 PureTech petrol engine and automatic transmission.'},
  {id:9,brand:'Mercedes-Benz',model:'C 200 Avantgarde (W206)',category:'Premium',transmission:'Automatic',fuel:'Petrol',seats:5,price:850,image:'assets/images/cars/mercedes-c200-w206.jpg',alt:'Mercedes-Benz C 200 Avantgarde W206 viewed from the front',source:'https://commons.wikimedia.org/wiki/File:Mercedes-Benz_C200_AVANTGARDE_(W206)_front.jpg',credit:'Tokumeigakarinoaoshima',license:'CC BY-SA 4.0',description:'A Mercedes-Benz C 200 Avantgarde from the W206 generation, presented as a premium sedan option.'},
  {id:10,brand:'BMW',model:'320i M Sport (G20)',category:'Premium',transmission:'Automatic',fuel:'Petrol',seats:5,price:920,image:'assets/images/cars/bmw-320i-g20.jpg',alt:'BMW 320i M Sport G20 sedan viewed from the front',source:'https://commons.wikimedia.org/wiki/File:BMW_320i_M_Sport_(G20)_front.jpg',credit:'Tokumeigakarinoaoshima',license:'CC BY-SA 4.0',description:'A BMW 320i M Sport from the G20 3 Series generation for a composed premium drive.'}
];

const money = value => `${Number(value).toLocaleString('en-US')} MAD`;
const carName = car => `${car.brand} ${car.model}`;
const normalizeSearch = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const licenseUrls = {'CC0 1.0':'https://creativecommons.org/publicdomain/zero/1.0/','CC BY 2.0':'https://creativecommons.org/licenses/by/2.0/','CC BY 4.0':'https://creativecommons.org/licenses/by/4.0/','CC BY-SA 4.0':'https://creativecommons.org/licenses/by-sa/4.0/'};
const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
const mainPage = document.body.dataset.page === 'main';
const mainLink = hash => mainPage ? hash : `index.html${hash}`;

function header() {
  const root = document.getElementById('site-header');
  if (!root) return;
  const nav = [['#home','Home'],['#cars','Cars'],['#about','About us'],['#booking','Booking'],['#contact','Contact']];
  root.innerHTML = `<div class="topbar"><div class="container topbar-inner"><span>⌖ RABAT · Morocco</span><span>◇ Demo inventory · requests confirmed manually</span></div></div><header class="site-header"><div class="container nav-inner"><a class="brand" href="${mainLink('#home')}"><span class="brand-mark">▣</span><span class="brand-name">AFLALOU<small>CARS RENTAL</small></span></a><nav class="nav-links" aria-label="Primary navigation">${nav.map(([href,label]) => `<a data-nav="${href}" href="${mainLink(href)}">${label}</a>`).join('')}</nav><div class="nav-legal"><a href="privacy-policy.html">Privacy</a><a href="${mainLink('#terms')}">Terms</a><a class="button button-ink" href="${mainLink('#booking')}">Book now <span>→</span></a></div><button class="menu-button" id="menu-button" aria-label="Open menu" aria-expanded="false">☰</button></div><nav class="mobile-menu" id="mobile-menu" aria-label="Mobile navigation">${nav.map(([href,label]) => `<a href="${mainLink(href)}">${label}</a>`).join('')}<a href="privacy-policy.html">Privacy policy</a><a href="${mainLink('#terms')}">Terms &amp; conditions</a></nav></header>`;
  const menuButton = document.getElementById('menu-button');
  const menu = document.getElementById('mobile-menu');
  menuButton?.addEventListener('click', () => { const open = menu.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.textContent = open ? '×' : '☰'; });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.textContent = '☰'; }));
  const setActive = () => { const hash = location.hash || '#home'; document.querySelectorAll('[data-nav]').forEach(link => link.classList.toggle('active', mainPage && link.dataset.nav === hash)); };
  addEventListener('hashchange', setActive); setActive();
}

function footer() {
  const root = document.getElementById('site-footer');
  if (!root) return;
  const credits = cars.map(car => `<li><a href="${car.source}" target="_blank" rel="noopener noreferrer">${carName(car)}</a> — ${car.credit}, <a href="${licenseUrls[car.license]}" target="_blank" rel="license noopener noreferrer">${car.license}</a></li>`).join('');
  root.innerHTML = `<footer class="site-footer"><div class="container footer-grid"><div><a class="brand" href="${mainLink('#home')}"><span class="brand-mark">▣</span><span class="brand-name">AFLALOU<small>CARS RENTAL</small></span></a><p class="footer-copy">A local-first rental experience for journeys that begin in RABAT. Fleet, contact and legal details shown here are editable demo content.</p></div><div><p class="footer-title">Company</p><div class="footer-links"><a href="${mainLink('#about')}">About us</a><a href="${mainLink('#cars')}">Cars</a><a href="${mainLink('#booking')}">Booking</a><a href="${mainLink('#contact')}">Contact</a></div></div><div><p class="footer-title">Legal</p><div class="footer-links"><a href="privacy-policy.html">Privacy policy</a><a href="${mainLink('#terms')}">Terms &amp; conditions</a><a href="${mainLink('#contact')}">Questions</a></div></div><div><p class="footer-title">Follow along</p><div class="social-links"><a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Fb</a><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Ig</a><a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">Tk</a><a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">Yt</a><a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">In</a></div></div></div><div class="container image-credits"><details><summary>Vehicle image credits and licenses</summary><ul>${credits}</ul><p>Images are locally resized copies from Wikimedia Commons. No endorsement by the photographers is implied.</p></details></div><div class="container footer-bottom"><span>© <span id="current-year"></span> AFLALOU CARS RENTAL. All rights reserved.</span><span>Demo website · final details to be confirmed</span></div></footer>`;
  document.getElementById('current-year').textContent = new Date().getFullYear();
}

function imageMarkup(car, className = '') {
  return `<img${className ? ` class="${className}"` : ''} src="${car.image}" alt="${car.alt}" loading="lazy" width="1200" height="800" onerror="this.closest('.car-image, .modal')?.classList.add('image-unavailable');this.remove()">`;
}

function carCard(car) {
  return `<article class="car-card"><div class="car-image">${imageMarkup(car)}<span class="car-tag">${car.category}</span></div><div class="car-body"><h3>${carName(car)}</h3><p class="car-category">${car.category}</p><div class="car-specs"><span>${car.transmission}</span><span>${car.fuel}</span><span>${car.seats} seats</span><span>A/C</span></div><div class="car-footer"><div class="price"><strong>${money(car.price)}</strong><small>per day · demo estimate</small></div><div class="card-actions"><button type="button" data-details="${car.id}">Details</button><a class="book-link" href="#booking" data-book-car="${car.id}">Book</a></div></div></div></article>`;
}

function renderCars(target, list) {
  const element = document.getElementById(target); if (!element) return;
  element.innerHTML = list.length ? list.map(carCard).join('') : '<div class="empty-state">No vehicles match those filters. Try a different search.</div>';
  element.querySelectorAll('[data-details]').forEach(button => button.addEventListener('click', () => openModal(Number(button.dataset.details))));
}

function openModal(id) {
  const car = cars.find(item => item.id === id), root = document.getElementById('modal-root'); if (!car || !root) return;
  root.innerHTML = `<div class="modal-backdrop" id="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">${imageMarkup(car,'modal-image')}<div class="modal-body"><button class="modal-close" id="modal-close" aria-label="Close details">×</button><p class="eyebrow">${car.category}</p><h2 id="modal-title">${carName(car)}</h2><div class="modal-meta"><span>${car.transmission}</span><span>${car.fuel}</span><span>${car.seats} seats</span><span>Air conditioning</span><span>${money(car.price)} / day</span></div><p>${car.description}</p><p class="photo-credit">Photo: <a href="${car.source}" target="_blank" rel="noopener noreferrer">${car.credit}</a> · <a href="${licenseUrls[car.license]}" target="_blank" rel="license noopener noreferrer">${car.license}</a></p><a class="button button-gold" href="#booking" data-book-car="${car.id}">Book this car <span>→</span></a></div></div></div>`;
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-backdrop').addEventListener('click', event => { if (event.target.id === 'modal-backdrop') closeModal(); });
  document.addEventListener('keydown', closeModalOnEscape); document.getElementById('modal-close').focus();
}
function closeModalOnEscape(event) { if (event.key === 'Escape') closeModal(); }
function closeModal() { const root = document.getElementById('modal-root'); if (root) root.innerHTML = ''; document.removeEventListener('keydown', closeModalOnEscape); }

function initCookie() {
  const banner = document.getElementById('cookie-banner'); if (!banner) return;
  try { if (localStorage.getItem('lawat-cookie-choice')) return; } catch { /* Storage may be blocked by browser settings. */ }
  banner.hidden = false;
  banner.querySelectorAll('[data-cookie]').forEach(button => button.addEventListener('click', () => { try { localStorage.setItem('lawat-cookie-choice', button.dataset.cookie); } catch { /* Consent still applies for this page view. */ } banner.hidden = true; }));
}

function initQuickSearch() {
  const form = document.getElementById('quick-search'); if (!form) return;
  const today = new Date().toISOString().slice(0,10); form.elements.pickupDate.min = today; form.elements.returnDate.min = today;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form), pickup = data.get('pickupDate'), returned = data.get('returnDate');
    const message = document.getElementById('quick-search-message');
    if (!pickup || !returned || new Date(returned) < new Date(pickup)) {
      message.textContent = 'Please choose a return date on or after your pick-up date.';
      return;
    }
    message.textContent = '';
    const filters = document.getElementById('car-filters');
    filters.reset();
    filters.elements.category.value = data.get('category');
    filters.dispatchEvent(new Event('change'));
    const booking = document.getElementById('booking-form');
    if (!document.getElementById('booking-vehicle')) resetBooking();
    for (const field of ['pickup', 'dropoff', 'pickupDate', 'returnDate']) booking.elements[field].value = data.get(field);
    booking.dispatchEvent(new Event('change', {bubbles:true}));
    const url = new URL(location.href);
    if (data.get('category')) url.searchParams.set('category', data.get('category'));
    else url.searchParams.delete('category');
    url.hash = 'cars';
    history.pushState(null, '', url);
    dispatchEvent(new HashChangeEvent('hashchange'));
    document.getElementById('cars').scrollIntoView({behavior:'smooth'});
  });
}

function initCars() {
  const form = document.getElementById('car-filters'); if (!form) return;
  const update = () => { const data = new FormData(form), search = normalizeSearch(data.get('search') || ''), category = data.get('category'), transmission = data.get('transmission'), fuel = data.get('fuel'), sort = data.get('sort'); let filtered = cars.filter(car => normalizeSearch(carName(car)).includes(search) && (!category || car.category === category) && (!transmission || car.transmission === transmission) && (!fuel || car.fuel === fuel)); if (sort === 'low') filtered.sort((a,b) => a.price - b.price); if (sort === 'high') filtered.sort((a,b) => b.price - a.price); if (sort === 'az') filtered.sort((a,b) => carName(a).localeCompare(carName(b))); if (sort === 'za') filtered.sort((a,b) => carName(b).localeCompare(carName(a))); document.getElementById('results-count').textContent = `${filtered.length} vehicle${filtered.length === 1 ? '' : 's'} shown · prices are demo estimates`; renderCars('all-cars', filtered); };
  const categoryFromUrl = new URLSearchParams(location.search).get('category'); if (categoryFromUrl && [...form.elements.category.options].some(option => option.value === categoryFromUrl)) form.elements.category.value = categoryFromUrl;
  form.addEventListener('input', update); form.addEventListener('change', update); update();
}

function initBooking() {
  const form = document.getElementById('booking-form'), vehicle = document.getElementById('booking-vehicle'); if (!form || !vehicle) return;
  cars.forEach(car => vehicle.insertAdjacentHTML('beforeend', `<option value="${car.id}">${carName(car)} — ${money(car.price)} / day</option>`));
  const urlCar = Number(new URLSearchParams(location.search).get('car')); if (cars.some(car => car.id === urlCar)) vehicle.value = String(urlCar);
  const today = new Date().toISOString().slice(0,10), pickupDate = document.getElementById('pickup-date'), returnDate = document.getElementById('return-date'); pickupDate.min = today; returnDate.min = today;
  function estimate() { const car = cars.find(item => item.id === Number(vehicle.value)), start = pickupDate.value, end = returnDate.value; document.getElementById('estimate-vehicle').textContent = car ? carName(car) : 'Not selected'; document.getElementById('estimate-daily').textContent = car ? money(car.price) : '—'; if (!car || !start || !end || new Date(end) < new Date(start)) { document.getElementById('estimate-days').textContent = '—'; document.getElementById('estimate-total').textContent = '— MAD'; return; } const days = Math.max(1, Math.ceil((new Date(end) - new Date(start)) / 86400000)); document.getElementById('estimate-days').textContent = `${days} day${days === 1 ? '' : 's'}`; document.getElementById('estimate-total').textContent = money(days * car.price); }
  form.oninput = estimate; form.onchange = estimate; estimate();
  form.onsubmit = event => { event.preventDefault(); const error = document.getElementById('booking-error'), data = new FormData(form), start = `${data.get('pickupDate')}T${data.get('pickupTime')}`, end = `${data.get('returnDate')}T${data.get('returnTime')}`; if (!form.checkValidity()) { error.textContent = 'Please complete the required fields before submitting.'; form.reportValidity(); return; } if (new Date(end) <= new Date(start)) { error.textContent = 'Return date and time must be after pick-up date and time.'; return; } const car = cars.find(item => item.id === Number(data.get('vehicle'))), days = Math.max(1, Math.ceil((new Date(data.get('returnDate')) - new Date(data.get('pickupDate'))) / 86400000)), ref = `CR-${Math.floor(100000 + Math.random() * 899999)}`; form.innerHTML = `<div class="success-panel"><p class="eyebrow">Request submitted</p><h2>Booking request received.</h2><p>Thank you, ${escapeHtml(data.get('name'))}. Our team will contact you to confirm availability and final pricing.</p><div class="estimate-row"><span>Reference</span><strong>${ref}</strong></div><div class="estimate-row"><span>Vehicle</span><strong>${carName(car)}</strong></div><div class="estimate-row"><span>Estimated total</span><strong>${money(days * car.price)}</strong></div><p class="fine-print">This is a frontend/demo booking system. No information was sent to a server.</p><a class="button button-gold" href="#home">Back to home <span>→</span></a></div>`; };
}

function initContact() {
  document.getElementById('contact-form')?.addEventListener('submit', event => { event.preventDefault(); const form = event.currentTarget; if (!form.checkValidity()) { form.reportValidity(); return; } form.innerHTML = '<div class="success-panel"><p class="eyebrow">Message prepared</p><h2>Thanks for reaching out.</h2><p>This demo captured the form interaction locally. A real sending channel must be connected before launch.</p><a class="button button-gold" href="#home">Back to home <span>→</span></a></div>'; });
}

const bookingTemplate = document.getElementById('booking-form')?.innerHTML;
function resetBooking() {
  if (!bookingTemplate) return;
  document.getElementById('booking-form').innerHTML = bookingTemplate;
  initBooking();
}

function initBookingLinks() {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-book-car]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const car = cars.find(item => item.id === Number(link.dataset.bookCar));
    if (!car) return;
    if (!document.getElementById('booking-vehicle')) resetBooking();
    const vehicle = document.getElementById('booking-vehicle');
    vehicle.value = String(car.id);
    vehicle.dispatchEvent(new Event('change', {bubbles:true}));
    closeModal();
    const url = new URL(location.href);
    url.searchParams.set('car', car.id);
    url.hash = 'booking';
    history.pushState(null, '', url);
    dispatchEvent(new HashChangeEvent('hashchange'));
    document.getElementById('booking').scrollIntoView({behavior:'smooth'});
  });
  addEventListener('popstate', () => {
    const vehicle = document.getElementById('booking-vehicle');
    const car = cars.find(item => item.id === Number(new URLSearchParams(location.search).get('car')));
    if (vehicle && car) { vehicle.value = String(car.id); vehicle.dispatchEvent(new Event('change', {bubbles:true})); }
  });
}

function restoreDeepLink() {
  if (!mainPage || !location.hash) return;
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({behavior:'instant', block:'start'});
}

header(); footer(); initCookie();
renderCars('featured-cars', cars.slice(0, 3));
initQuickSearch(); initCars(); initBooking(); initContact(); initBookingLinks();
if (document.readyState === 'complete') restoreDeepLink();
else addEventListener('load', restoreDeepLink, {once:true});
