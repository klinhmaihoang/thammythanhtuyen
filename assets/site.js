/* ================================================================
   site.js — CODE HIỂN THỊ DÙNG CHUNG CHO CẢ 4 TRANG.
   Không cần chỉnh sửa file này. Muốn đổi nội dung, sửa trong
   assets/clinic-data.js
================================================================= */

function iconSvg(name){
  const icons = {
    phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    zalo: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>',
    fb: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12"/></svg>',
    pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>',
    play: '<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'
  };
  return icons[name] || '';
}

/* basePath: '' khi ở trang gốc (index.html), '../' khi ở trong thư mục con */
function renderHeader(activeId, basePath){
  basePath = basePath || '';
  /* Tạm thời chỉ hiện chữ (đỏ toàn bộ) — thay bằng logo ảnh thật khi có, xem ghi chú cuối file. */
  document.getElementById('logoText').innerHTML =
    `<a href="${basePath}index.html" style="color:var(--accent-wine);">${CLINIC_DATA.clinicName}</a>`;
  const nav = document.getElementById('navLinks');
  CLINIC_DATA.nav.forEach(item=>{
    const li = document.createElement('li');
    const isActive = item.id === activeId ? 'active' : '';
    li.innerHTML = `<a class="${isActive}" href="${basePath}${item.path}">${item.label}</a>`;
    nav.appendChild(li);
  });
  const cta = document.getElementById('navCta');
  if(cta) cta.href = `${basePath}contact/index.html#booking`;
}

function renderFooter(basePath){
  basePath = basePath || '';
  const c = CLINIC_DATA.contact;
  document.getElementById('footerClinicName').textContent = CLINIC_DATA.clinicName;
  document.getElementById('footerTagline').textContent = CLINIC_DATA.tagline;

  document.getElementById('socialRow').innerHTML = `
    <a class="social-btn" href="${c.facebookUrl}" target="_blank" rel="noopener" aria-label="Facebook">${iconSvg('fb')}</a>
    <a class="social-btn" href="${c.zaloUrl}" target="_blank" rel="noopener" aria-label="Zalo">${iconSvg('zalo')}</a>
    <a class="social-btn" href="${c.phoneHref}" aria-label="Gọi điện">${iconSvg('phone')}</a>`;

  const wh = CLINIC_DATA.workingHours;
  document.getElementById('footerAddresses').innerHTML = CLINIC_DATA.addresses
    .map(a=>`<li>${iconSvg('pin')} <strong>${a.branch}</strong> — ${a.address}</li>`).join('') +
    `<li style="margin-top:8px;">${wh.weekdayOpen} – ${wh.weekdayClose} (Thứ 2 – Thứ 7)<br>${wh.sundayOpen} – ${wh.sundayClose} (Chủ nhật)</li>`;

  document.getElementById('footerContact').innerHTML = `
    <li>${iconSvg('phone')} Hotline: <a href="${c.hotlineHref}">${c.hotline}</a></li>
    <li>${iconSvg('phone')} Zalo/SĐT: <a href="${c.zaloUrl}" target="_blank" rel="noopener">${c.phone}</a></li>
    <li>${iconSvg('mail')} <a href="mailto:${c.email}">${c.email}</a></li>
    <li style="margin-top:6px;"><a href="${basePath}contact/index.html">Xem trang Liên hệ & Đặt lịch →</a></li>`;

  document.getElementById('legalLine').innerHTML = CLINIC_DATA.legal.join('<br><br>');
}

/* ===== HERO SLIDER — animation chuyển ảnh (crossfade) ===== */
function initHeroSlider(){
  const wrap = document.getElementById('heroSlider');
  const dotsWrap = document.getElementById('heroDots');
  if(!wrap) return;
  CLINIC_DATA.images.heroSlides.forEach((src,i)=>{
    const slide = document.createElement('div');
    slide.className = 'hero-slide' + (i===0 ? ' active' : '');
    slide.style.backgroundImage = `url('${src}')`;
    wrap.appendChild(slide);
    const dot = document.createElement('div');
    dot.className = 'hero-dot' + (i===0 ? ' active' : '');
    dotsWrap.appendChild(dot);
  });
  let current = 0;
  const slides = wrap.querySelectorAll('.hero-slide');
  const dots = dotsWrap.querySelectorAll('.hero-dot');
  setInterval(()=>{
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }, 5000);
}

function renderTreatmentCard(t, opts){
  opts = opts || {};
  const idealHtml = (opts.showIdeal && t.idealFor) ?
    `<ul class="ideal-list">${t.idealFor.map(x=>`<li>${x}</li>`).join('')}</ul>` : '';
  const desc = opts.long ? t.longDescription : t.description;
  const bookHref = `${opts.basePath||''}contact/index.html?service=${encodeURIComponent(t.name)}#booking`;
  return `
    <div class="treatment-card reveal">
      <div class="img-wrap"><img src="${t.image}" alt="${t.name}"></div>
      <div class="treatment-body">
        <span class="tag">${t.subtitle}</span>
        <h3>${t.name}</h3>
        <p>${desc}</p>
        ${idealHtml}
        <p style="font-size:13px;color:var(--accent-terra);">${t.technology}</p>
        <div class="meta-row">
          <span>${t.duration}</span>
          <span class="price">${t.price}</span>
        </div>
        ${opts.showCta ? `<a href="${bookHref}" class="btn btn-outline" style="margin-top:14px; justify-content:center;">Tư vấn liệu trình này</a>` : ''}
      </div>
    </div>`;
}

function renderTreatments(containerId, opts){
  const grid = document.getElementById(containerId);
  if(!grid) return;
  const list = opts && opts.limit ? CLINIC_DATA.treatments.slice(0, opts.limit) : CLINIC_DATA.treatments;
  grid.innerHTML = list.map(t=>renderTreatmentCard(t, opts)).join('');
}

function renderDoctorCredentials(containerId){
  const list = document.getElementById(containerId);
  if(!list) return;
  CLINIC_DATA.doctor.credentials.forEach((c,i)=>{
    const li = document.createElement('li');
    li.innerHTML = `<div class="cred-dot">${i+1}</div><div><h4>${c.title}</h4><p>${c.desc}</p></div>`;
    list.appendChild(li);
  });
}

function renderTestimonials(containerId){
  const grid = document.getElementById(containerId);
  if(!grid) return;
  grid.innerHTML = CLINIC_DATA.testimonials.map(t=>`
    <div class="testi-card reveal">
      <p class="testi-quote">"${t.quote}"</p>
      <div class="testi-who">
        <img class="testi-avatar" src="${t.avatar}" alt="${t.name}">
        <div><div class="testi-name">${t.name}</div><div class="testi-result">${t.result}</div></div>
      </div>
    </div>`).join('');
}

/* ===== VIDEO YOUTUBE — hiện placeholder nếu chưa dán ID thật ===== */
function renderYoutube(containerId){
  const grid = document.getElementById(containerId);
  if(!grid) return;
  grid.innerHTML = CLINIC_DATA.youtube.videos.map(v=>{
    const isPlaceholder = !v.videoId || v.videoId.indexOf('DÁN_ID') !== -1;
    const frame = isPlaceholder
      ? `<div class="video-placeholder">${iconSvg('play')}<span>Chưa gắn video thật —<br>dán YouTube video ID vào clinic-data.js</span></div>`
      : `<iframe src="https://www.youtube.com/embed/${v.videoId}" title="${v.title}" allowfullscreen></iframe>`;
    return `<div class="video-card reveal">
      <div class="video-frame-wrap">${frame}</div>
      <div class="video-title">${v.title}</div>
    </div>`;
  }).join('') + `<div class="reveal" style="grid-column:1/-1; text-align:center; margin-top:8px;">
      <a href="${CLINIC_DATA.youtube.channelUrl}" target="_blank" rel="noopener" class="btn btn-outline">Xem thêm trên kênh Youtube</a>
    </div>`;
}

/* ===== ĐẶT LỊCH — nối Google Sheet ===== */
let selectedTime = null;

/* Chuyển "08:00" -> 480 phút; ngược lại ở hàm bên dưới */
function timeStrToMinutes(str){ const [h,m] = str.split(':').map(Number); return h*60+m; }
function minutesToTimeStr(mins){ const h = Math.floor(mins/60), m = mins%60; return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; }

/* Lấy giờ mở/đóng cửa theo đúng ngày được chọn (Chủ nhật khác ngày thường) */
function getHoursForDate(dateStr){
  const d = new Date(dateStr + 'T00:00:00');
  const isSunday = d.getDay() === 0;
  const wh = CLINIC_DATA.workingHours;
  return isSunday
    ? { open: wh.sundayOpen, close: wh.sundayClose }
    : { open: wh.weekdayOpen, close: wh.weekdayClose };
}

function buildSlotsForHours(dateStr, bookedTimes){
  const wrap = document.getElementById('timeSlots');
  if(!wrap) return;
  wrap.innerHTML = '';
  selectedTime = null;
  const { open, close } = getHoursForDate(dateStr);
  const step = CLINIC_DATA.booking.slotStepMinutes || 90;
  const openMin = timeStrToMinutes(open);
  const closeMin = timeStrToMinutes(close);

  for(let t = openMin; t <= closeMin; t += step){
    const label = minutesToTimeStr(t);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'slot-btn';
    btn.textContent = label;
    if(bookedTimes.includes(label)){
      btn.classList.add('disabled');
      btn.disabled = true;
    } else {
      btn.onclick = ()=>{
        document.querySelectorAll('.slot-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        selectedTime = label;
      };
    }
    wrap.appendChild(btn);
  }
  if(wrap.children.length === 0){
    wrap.innerHTML = '<span style="font-size:13px;color:var(--accent-wine);">Ngày này phòng khám không có khung giờ nào — vui lòng chọn ngày khác.</span>';
  }
}

async function onDateChange(){
  const date = document.getElementById('fDate').value;
  const wrap = document.getElementById('timeSlots');
  if(!date || !wrap) return;
  const apiUrl = CLINIC_DATA.booking.apiUrl;
  if(!apiUrl || apiUrl.indexOf('DÁN_WEB_APP_URL') !== -1){
    wrap.innerHTML = '<span style="font-size:13px;color:var(--accent-wine);">Chưa kết nối Google Sheet — dán Web App URL vào CLINIC_DATA.booking.apiUrl</span>';
    buildSlotsForHours(date, []);
    return;
  }
  wrap.innerHTML = '<span style="font-size:13px;opacity:.6;">Đang kiểm tra lịch trống...</span>';
  try{
    const res = await fetch(`${apiUrl}?date=${date}`);
    const data = await res.json();
    buildSlotsForHours(date, data.bookedTimes || []);
  }catch(err){
    wrap.innerHTML = '<span style="font-size:13px;color:var(--accent-wine);">Không tải được lịch trống, vui lòng thử lại.</span>';
  }
}

async function onSubmitBooking(e){
  e.preventDefault();
  const status = document.getElementById('bookingStatus');
  const date = document.getElementById('fDate').value;
  if(!selectedTime){ status.textContent = 'Vui lòng chọn một khung giờ.'; status.style.color = 'var(--accent-wine)'; return; }

  const payload = {
    name: document.getElementById('fName').value,
    phone: document.getElementById('fPhone').value,
    service: document.getElementById('fService').value,
    date: date,
    time: selectedTime,
    note: document.getElementById('fNote').value
  };

  const apiUrl = CLINIC_DATA.booking.apiUrl;
  if(!apiUrl || apiUrl.indexOf('DÁN_WEB_APP_URL') !== -1){
    status.textContent = 'Chưa kết nối Google Sheet — xem hướng dẫn Apps Script để hoàn tất.';
    status.style.color = 'var(--accent-wine)';
    return;
  }

  const btn = document.getElementById('submitBtn');
  btn.disabled = true; btn.textContent = 'Đang gửi...';
  try{
    await fetch(apiUrl, { method:'POST', body: JSON.stringify(payload) });
    status.textContent = 'Đặt lịch thành công! Đội ngũ sẽ gọi xác nhận sớm nhất.';
    status.style.color = 'green';
    document.getElementById('bookingForm').reset();
    document.getElementById('timeSlots').innerHTML = '<span style="font-size:13px;opacity:.6;">Chọn ngày để xem giờ trống</span>';
  }catch(err){
    status.textContent = 'Có lỗi khi gửi, vui lòng gọi hotline để được hỗ trợ.';
    status.style.color = 'var(--accent-wine)';
  }finally{
    btn.disabled = false; btn.textContent = 'Xác nhận đặt lịch';
  }
}

function populateServiceSelect(){
  const sel = document.getElementById('fService');
  if(!sel) return;
  CLINIC_DATA.treatments.forEach(t=>{
    const opt = document.createElement('option');
    opt.value = t.name; opt.textContent = `${t.name} — ${t.subtitle}`;
    sel.appendChild(opt);
  });
  const params = new URLSearchParams(window.location.search);
  const preselect = params.get('service');
  if(preselect) sel.value = preselect;
}

function initBookingForm(){
  const dateInput = document.getElementById('fDate');
  if(!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  dateInput.addEventListener('change', onDateChange);
  document.getElementById('bookingForm').addEventListener('submit', onSubmitBooking);
  populateServiceSelect();
}

function renderMap(containerId){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = `<iframe src="${CLINIC_DATA.contact.mapEmbedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
}

function renderBookingSidebar(containerId){
  const el = document.getElementById(containerId);
  if(!el) return;
  const c = CLINIC_DATA.contact;
  el.innerHTML = `
    <div class="booking-contact-row"><span class="icon-circle">${iconSvg('phone')}</span> Hotline ${c.hotline}</div>
    <div class="booking-contact-row"><span class="icon-circle">${iconSvg('zalo')}</span> Zalo ${c.phone}</div>
    <div class="booking-contact-row"><span class="icon-circle">${iconSvg('pin')}</span> ${CLINIC_DATA.addresses[0].address}</div>`;
}

/* ===== FADE-UP KHI CUỘN TRANG ===== */
function initReveal(){
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  items.forEach(i=>observer.observe(i));
}
