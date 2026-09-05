/* ================================================================
   site.js — CODE HIỂN THỊ DÙNG CHUNG CHO TOÀN BỘ WEBSITE.
   Không cần chỉnh sửa file này. Muốn đổi nội dung, sửa trong
   assets/clinic-data.js hoặc qua trang /admin/
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
  document.getElementById('logoText').innerHTML =
    `<a href="${basePath}index.html" style="display:inline-flex; align-items:center;">
       <img src="${basePath}assets/images/logo.png" alt="${CLINIC_DATA.clinicName}" style="height:52px; width:auto; border-radius:14px; display:block;">
     </a>`;
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

/* ===== SLIDER TRƯỚC / SAU (kéo qua kéo lại) ===== */
function renderBASlider(beforeSrc, afterSrc, altText, extraClass){
  return `
    <div class="ba-slider ${extraClass||''}">
      <img class="ba-after" src="${afterSrc}" alt="${altText} - sau">
      <div class="ba-before-wrap"><img class="ba-before" src="${beforeSrc}" alt="${altText} - trước"></div>
      <div class="ba-handle">↔</div>
      <span class="ba-label ba-label-before">Trước</span>
      <span class="ba-label ba-label-after">Sau</span>
    </div>`;
}

function initOneBASlider(el){
  const wrap = el.querySelector('.ba-before-wrap');
  const beforeImg = el.querySelector('.ba-before');
  const handle = el.querySelector('.ba-handle');
  if(!wrap || !beforeImg || !handle) return;

  function syncWidth(){ beforeImg.style.width = el.offsetWidth + 'px'; }
  function setPct(pct){
    pct = Math.max(0, Math.min(100, pct));
    wrap.style.width = pct + '%';
    handle.style.left = pct + '%';
  }
  syncWidth();
  setPct(50);
  window.addEventListener('resize', syncWidth);

  let dragging = false;
  function moveTo(clientX){
    const rect = el.getBoundingClientRect();
    setPct(((clientX - rect.left) / rect.width) * 100);
  }
  handle.addEventListener('pointerdown', (e)=>{ dragging = true; handle.setPointerCapture(e.pointerId); e.preventDefault(); });
  el.addEventListener('pointermove', (e)=>{ if(dragging) moveTo(e.clientX); });
  window.addEventListener('pointerup', ()=> dragging = false);
  el.addEventListener('pointerdown', (e)=>{ if(e.target === handle) return; moveTo(e.clientX); });
}

function initAllBASliders(){
  document.querySelectorAll('.ba-slider:not([data-ba-init])').forEach(el=>{
    el.setAttribute('data-ba-init','1');
    initOneBASlider(el);
  });
}

/* ===== DỊCH VỤ ===== */
function renderTreatmentCard(t, opts){
  opts = opts || {};
  const basePath = opts.basePath || '';
  const idealHtml = (opts.showIdeal && t.idealFor) ?
    `<ul class="ideal-list">${t.idealFor.map(x=>`<li>${x}</li>`).join('')}</ul>` : '';
  const desc = opts.long ? t.longDescription : t.description;
  const detailHref = `${basePath}treatments/detail.html?slug=${encodeURIComponent(t.slug)}`;
  const bookHref = `${basePath}contact/index.html?service=${encodeURIComponent(t.name)}#booking`;
  return `
    <div class="treatment-card reveal">
      <div class="img-wrap">
        ${renderBASlider(t.beforeImage, t.afterImage, t.name)}
      </div>
      <div class="treatment-body">
        <span class="tag">${t.subtitle}</span>
        <a href="${detailHref}"><h3>${t.name}</h3></a>
        <p>${desc}</p>
        ${idealHtml}
        <p style="font-size:13px;color:var(--accent-terra);">${t.technology}</p>
        <div class="spec-row">
          <div class="spec-item">
            <span class="spec-icon">⏱</span>
            <span class="spec-value">${t.duration}</span>
            <span class="spec-label">Thời gian</span>
          </div>
          <div class="spec-item">
            <span class="spec-icon">₫</span>
            <span class="spec-value price">${t.price}</span>
            <span class="spec-label">Chi phí</span>
          </div>
        </div>
        <a href="${detailHref}" class="btn btn-outline" style="margin-top:14px; justify-content:center;">Xem chi tiết</a>
        ${opts.showCta ? `<a href="${bookHref}" class="btn btn-primary" style="margin-top:8px; justify-content:center;">Tư vấn liệu trình này</a>` : ''}
      </div>
    </div>`;
}

function renderTreatments(containerId, opts){
  const grid = document.getElementById(containerId);
  if(!grid) return;
  const list = opts && opts.limit ? CLINIC_DATA.treatments.slice(0, opts.limit) : CLINIC_DATA.treatments;
  grid.innerHTML = list.map(t=>renderTreatmentCard(t, opts)).join('');
  initAllBASliders();
}

/* Trang chi tiết 1 dịch vụ — đọc ?slug= trên URL */
function initTreatmentDetailPage(basePath){
  basePath = basePath || '../';
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const t = CLINIC_DATA.treatments.find(x=>x.slug === slug);
  const root = document.getElementById('detailRoot');
  if(!t){
    root.innerHTML = `<div class="container section"><p>Không tìm thấy dịch vụ này. <a href="${basePath}treatments/index.html" style="color:var(--accent-wine); text-decoration:underline;">Quay lại danh sách liệu trình</a>.</p></div>`;
    return;
  }
  document.title = `${t.name} — ${CLINIC_DATA.clinicName}`;
  document.getElementById('pageHero').style.backgroundImage = `url('${CLINIC_DATA.images.treatmentsHero}')`;
  document.getElementById('pageHeroTag').textContent = t.subtitle;
  document.getElementById('pageHeroTitle').textContent = t.name;

  const idealHtml = t.idealFor ? `
    <h3 style="font-size:19px; margin:28px 0 10px;">Phù hợp với</h3>
    <ul class="ideal-list">${t.idealFor.map(x=>`<li>${x}</li>`).join('')}</ul>` : '';

  const processHtml = t.process ? `
    <h3 style="font-size:19px; margin:28px 0 10px;">Quy trình thực hiện</h3>
    <ul class="process-list">${t.process.map(step=>`<li><span>${step}</span></li>`).join('')}</ul>` : '';

  root.innerHTML = `
    <div class="container section">
      <div class="reveal">${renderBASlider(t.beforeImage, t.afterImage, t.name, 'ba-slider-lg')}</div>
      <div class="reveal detail-meta-grid">
        <div><span class="label">⚙ Công nghệ</span><span class="value" style="font-size:14px;">${t.technology}</span></div>
        <div><span class="label">⏱ Thời gian</span><span class="value">${t.duration}</span></div>
        <div><span class="label">₫ Chi phí</span><span class="value">${t.price}</span></div>
      </div>
      <div class="reveal" style="max-width:720px;">
        <p style="font-size:17px; color:#4a382c;">${t.longDescription}</p>
        ${processHtml}
        ${idealHtml}
      </div>
      <div class="reveal" style="margin-top:36px;">
        <a href="${basePath}contact/index.html?service=${encodeURIComponent(t.name)}#booking" class="btn btn-primary">Đặt hẹn tư vấn liệu trình này</a>
      </div>
    </div>`;
  initAllBASliders();
  initReveal();
}

/* ===== DẢI THỐNG KÊ TIN CẬY ===== */
function renderTrustBar(containerId){
  const el = document.getElementById(containerId);
  if(!el || !CLINIC_DATA.stats) return;
  el.innerHTML = CLINIC_DATA.stats.map(s=>`
    <div class="trust-item reveal">
      <span class="value">${s.value}</span>
      <span class="label">${s.label}</span>
    </div>`).join('');
}

/* ===== VÌ SAO CHỌN CHÚNG TÔI ===== */
function renderWhyChooseUs(containerId){
  const grid = document.getElementById(containerId);
  if(!grid) return;
  grid.innerHTML = CLINIC_DATA.whyChooseUs.map((r,i)=>`
    <div class="why-card reveal">
      <div class="cred-dot">${i+1}</div>
      <h4>${r.title}</h4>
      <p>${r.desc}</p>
    </div>`).join('');
}

/* Bản gọn — dạng icon 4 cột, dùng thay cho các đoạn "kể chuyện" ảnh-chữ */
function renderIconChecklist(containerId, limit){
  const grid = document.getElementById(containerId);
  if(!grid) return;
  const icons = ['✓','⚕','🛡','✦'];
  const list = limit ? CLINIC_DATA.whyChooseUs.slice(0, limit) : CLINIC_DATA.whyChooseUs;
  grid.innerHTML = list.map((r,i)=>`
    <div class="icon-check-item reveal">
      <div class="ic-circle">${icons[i % icons.length]}</div>
      <h4>${r.title}</h4>
      <p>${r.desc}</p>
    </div>`).join('');
}

/* ===== ĐỘI NGŨ BÁC SĨ ===== */
function renderDoctors(containerId){
  const grid = document.getElementById(containerId);
  if(!grid) return;
  grid.innerHTML = CLINIC_DATA.doctors.map(d=>`
    <div class="doctor-card reveal">
      <div class="doc-img"><img src="${d.image}" alt="${d.name}"></div>
      <div class="doc-body">
        <h3>${d.name}</h3>
        <span class="doc-title">${d.title}</span>
        <p>${d.bio}</p>
        ${d.highlights ? `<ul class="doc-highlights">${d.highlights.map(h=>`<li>${h}</li>`).join('')}</ul>` : ''}
      </div>
    </div>`).join('');
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
      ? `<div class="video-placeholder">${iconSvg('play')}<span>Chưa gắn video thật —<br>dán YouTube video ID trong Admin</span></div>`
      : `<iframe src="https://www.youtube.com/embed/${v.videoId}" title="${v.title}" allowfullscreen></iframe>`;
    return `<div class="video-card reveal">
      <div class="video-frame-wrap">${frame}</div>
      <div class="video-title">${v.title}</div>
    </div>`;
  }).join('') + `<div class="reveal" style="grid-column:1/-1; text-align:center; margin-top:8px;">
      <a href="${CLINIC_DATA.youtube.channelUrl}" target="_blank" rel="noopener" class="btn btn-outline">Xem thêm trên kênh Youtube</a>
    </div>`;
}

/* ===== BLOG / TIN TỨC ===== */
function renderBlogList(containerId, opts){
  const grid = document.getElementById(containerId);
  if(!grid) return;
  const basePath = (opts && opts.basePath) || '';
  const sorted = [...CLINIC_DATA.blogPosts].sort((a,b)=> new Date(b.date) - new Date(a.date));
  grid.innerHTML = sorted.map(p=>`
    <a href="${basePath}blog/post.html?slug=${encodeURIComponent(p.slug)}" class="blog-card reveal">
      <div class="blog-img"><img src="${p.coverImage}" alt="${p.title}"></div>
      <div class="blog-body">
        <span class="blog-date">${formatDateVN(p.date)}</span>
        <h3>${p.title}</h3>
        <p>${p.excerpt}</p>
      </div>
    </a>`).join('');
}

function formatDateVN(dateStr){
  const d = new Date(dateStr + 'T00:00:00');
  if(isNaN(d)) return dateStr;
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}

function initBlogPostPage(basePath){
  basePath = basePath || '../';
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const p = CLINIC_DATA.blogPosts.find(x=>x.slug === slug);
  const root = document.getElementById('postRoot');
  if(!p){
    root.innerHTML = `<div class="container section"><p>Không tìm thấy bài viết này. <a href="${basePath}blog/index.html" style="color:var(--accent-wine); text-decoration:underline;">Quay lại Blog</a>.</p></div>`;
    return;
  }
  document.title = `${p.title} — ${CLINIC_DATA.clinicName}`;
  document.getElementById('pageHero').style.backgroundImage = `url('${p.coverImage}')`;
  document.getElementById('pageHeroTag').textContent = formatDateVN(p.date);
  document.getElementById('pageHeroTitle').textContent = p.title;
  const paragraphs = p.content.split(/\n\s*\n/).map(para=>`<p>${para.replace(/\n/g,'<br>')}</p>`).join('');
  root.innerHTML = `<div class="container section"><div class="blog-post-content reveal">${paragraphs}</div></div>`;
  initReveal();
}

/* ===== ĐẶT LỊCH — nối Google Sheet ===== */
let selectedTime = null;

function timeStrToMinutes(str){ const [h,m] = str.split(':').map(Number); return h*60+m; }
function minutesToTimeStr(mins){ const h = Math.floor(mins/60), m = mins%60; return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; }

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

  const branchInput = document.querySelector('input[name="fBranch"]:checked');
  const payload = {
    name: document.getElementById('fName').value,
    phone: document.getElementById('fPhone').value,
    service: document.getElementById('fService').value,
    branch: branchInput ? branchInput.value : '',
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

/* Danh sách chi nhánh để khách chọn nơi đặt lịch — lấy trực tiếp từ CLINIC_DATA.addresses */
function populateBranchSelect(){
  const wrap = document.getElementById('branchGroup');
  if(!wrap) return;
  wrap.innerHTML = CLINIC_DATA.addresses.map((a,i)=>`
    <label class="branch-radio">
      <input type="radio" name="fBranch" value="${a.branch}" ${i===0?'checked':''}>
      <span><span class="b-name">${a.branch}</span><br><span class="b-addr">${a.address}</span></span>
    </label>`).join('');
}

function initBookingForm(){
  const dateInput = document.getElementById('fDate');
  if(!dateInput) return;
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
  dateInput.addEventListener('change', onDateChange);
  document.getElementById('bookingForm').addEventListener('submit', onSubmitBooking);
  populateServiceSelect();
  populateBranchSelect();
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
  const items = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  items.forEach(i=>observer.observe(i));
}
