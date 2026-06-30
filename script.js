/* ===== 구글 폼 주소: 아래 값을 실제 신청 폼 URL로 교체하세요 ===== */
var GOOGLE_FORM_URL = "https://forms.gle/REPLACE_WITH_YOUR_FORM";
document.querySelectorAll('.js-apply').forEach(function(a){ a.href = GOOGLE_FORM_URL; });

/* ===== nav scroll state ===== */
var nav = document.getElementById('nav');
function onScroll(){ nav.classList.toggle('scrolled', window.scrollY > 40); }
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

/* ===== mobile menu ===== */
var toggle = document.getElementById('menu-toggle');
var navLinks = document.getElementById('nav-links');
toggle.addEventListener('click', function(){ navLinks.classList.toggle('show'); });
navLinks.addEventListener('click', function(e){ if(e.target.tagName === 'A') navLinks.classList.remove('show'); });

/* ===== gallery + lightbox ===== */
var galleryItems = [
  {src:'uploads/kensington/kensigton_hanlim.jpg',   cap:'제주 켄싱턴리조트 한림 전경',   cls:'g-wide g-tall'},
  {src:'uploads/kensington/kensington_sea_view.jpg', cap:'한림 해안 바다뷰',             cls:'g-wide'},
  {src:'uploads/kensington/kensington_view.jpg',     cap:'리조트 & 한림 해안 항공뷰',     cls:''},
  {src:'uploads/kensington/kensington_cafe.jpg',     cap:'바다뷰 카페',                  cls:''},
  {src:'uploads/kensington/ara_hall_01.jpg',         cap:'강의장, 아라홀(ARA HALL)',      cls:'g-wide'},
  {src:'uploads/kensington/kensington_lvingroom.jpg',cap:'객실 거실',            cls:''},
  {src:'uploads/kensington/kensington_kitchen.jpg',  cap:'객실 주방',                   cls:''},
  {src:'uploads/kensington/kensington_room.jpeg',            cap:'4인 1실 침실',                cls:''},
  {src:'uploads/kensington/bathroom.jpg',            cap:'객실 욕실',                   cls:''},
  {src:'uploads/kensington/kensington_hanlim_map.jpeg', cap:'제주 켄싱턴리조트 한림 위치', cls:'g-wide'}
];
var gallery = document.getElementById('gallery');
gallery.innerHTML = galleryItems.map(function(g,i){
  return '<div class="g-item '+g.cls+'" data-i="'+i+'">'
    + '<img src="'+g.src+'" alt="'+g.cap+'" loading="lazy">'
    + '<div class="zoom">⤢</div>'
    + '<div class="cap">📍 '+g.cap+'</div></div>';
}).join('');

var lb = document.getElementById('lightbox'),
    lbImg = document.getElementById('lb-img'),
    lbCap = document.getElementById('lb-cap'),
    lbCount = document.getElementById('lb-count'),
    cur = 0;
function showLb(i){
  cur = (i + galleryItems.length) % galleryItems.length;
  lbImg.src = galleryItems[cur].src;
  lbImg.alt = galleryItems[cur].cap;
  lbCap.textContent = galleryItems[cur].cap;
  lbCount.textContent = (cur+1) + ' / ' + galleryItems.length;
}
function openLb(i){ showLb(i); lb.classList.add('open'); lb.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeLb(){ lb.classList.remove('open'); lb.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
gallery.addEventListener('click', function(e){
  var item = e.target.closest('.g-item');
  if(item) openLb(parseInt(item.dataset.i,10));
});
document.getElementById('lb-close').addEventListener('click', closeLb);
document.getElementById('lb-prev').addEventListener('click', function(){ showLb(cur-1); });
document.getElementById('lb-next').addEventListener('click', function(){ showLb(cur+1); });
lb.addEventListener('click', function(e){ if(e.target === lb) closeLb(); });
document.addEventListener('keydown', function(e){
  if(!lb.classList.contains('open')) return;
  if(e.key === 'Escape') closeLb();
  else if(e.key === 'ArrowLeft') showLb(cur-1);
  else if(e.key === 'ArrowRight') showLb(cur+1);
});

/* ===== accordion builder ===== */
function buildAccordion(wrap, items){
  wrap.innerHTML = items.map(function(f){
    return '<div class="acc-item">'
      + '<button type="button"><span class="q">'+f.q+'</span><span class="sign">+</span></button>'
      + '<div class="acc-body"><p>'+f.a+'</p></div></div>';
  }).join('');
  wrap.addEventListener('click', function(e){
    var item = e.target.closest('.acc-item');
    if(!item) return;
    var wasOpen = item.classList.contains('open');
    wrap.querySelectorAll('.acc-item').forEach(function(el){ el.classList.remove('open'); });
    if(!wasOpen) item.classList.add('open');
  });
}

var faqs = [
  {q:'숙박비·교육비가 드나요?', a:'아니요. 교육비는 고용노동부 지원으로 전액 무료이며, 3개월간 숙박·평일 점심 식사가 제공됩니다. 출석 및 성실 수강 시 훈련수당도 월 최대 50만 원 지급됩니다.'},
  {q:'정말 3개월 내내 제주에 사나요?', a:'네. 제주 켄싱턴리조트 한림에 거주하며 런케이션으로 진행됩니다. 일과 후·주말엔 제주를 즐길 수 있어요. (도내 거주자는 숙박 제외, 필요 시 개별 숙박 가능)'},
  {q:'무엇을 배우나요?', a:'로컬관광 이해와 데이터 기획부터 생성형 AI를 활용한 멀티모달 콘텐츠 제작, 반응형 웹진 구현, Meta·구글·네이버 글로벌 광고 최적화, 그리고 제주 현장취재 기반 LX-GTM 실전 프로젝트까지 현장 중심으로 배웁니다.'},
  {q:'어떤 AI 도구를 다루나요?', a:'Claude·ChatGPT·Gemini 등 생성형 AI를 비교 활용하고, 미드저니·Veo3·Suno 등으로 이미지·영상·음악 멀티모달 콘텐츠를 제작합니다. 유료 AI 서비스 라이선스도 제공됩니다.'},
  {q:'수료 후 취업 혜택이 있나요?', a:'수료생 전원은 이랜드파크 서비스인턴십 지원 시 서류전형이 면제됩니다. 또한 수료 후 6개월간 ‘한경-잇다’ 플랫폼을 통한 현업 멘토 1:1 맞춤 관리도 지원됩니다.'},
  {q:'지원 자격이 어떻게 되나요?', a:'신청일 기준 만 18~34세의 미취업 청년 구직자가 기본 요건입니다(군필자는 의무복무기간만큼 상향, 최대 만 39세). 전공 제한은 없습니다. 자세한 내용은 아래 ‘지원자격 Q&A’를 확인하세요.'}
];
buildAccordion(document.getElementById('faqs'), faqs);

var eligQnas = [
  {q:'현재 일을 하고 있어도 지원할 수 있나요?', a:'원칙적으로 고용보험에 가입된 취업자는 참여가 제한됩니다. 다만 주 30시간 미만 단시간 근로자, 고용보험 가입 대상 플랫폼 노동자·노무제공자, 건설·일반 일용근로자는 훈련시간 외 근로임을 객관적 증빙으로 입증하면 참여가 가능할 수 있습니다.'},
  {q:'사업자등록이 되어 있으면 안 되나요?', a:'원칙적으로 사업자등록 중인 사람은 제한됩니다. 다만 휴업신고 등으로 실제 사업을 하지 않고 있음을 증명할 수 있으면 참여가 가능할 수 있습니다.'},
  {q:'지금은 취업 중인데, 시작 전까지 정리하면 되나요?', a:'가능합니다. 신청 당시 제한 사유가 있어도 프로그램 개시일 전까지 사유가 해소(고용보험 상실, 퇴사 확인, 휴업신고 등)되고 이를 증빙으로 제출하면 참여할 수 있습니다.'},
  {q:'대학생·대학원생도 지원할 수 있나요?', a:'재학생은 원칙적으로 제한됩니다. 다만 졸업예정자, 4학년 2학기 이상(마지막 학기) 등록자, 신청일 현재 휴학 중인 사람, 졸업에 필요한 이수학점을 모두 취득해 참여에 지장이 없음을 증명할 수 있는 경우는 가능합니다.'},
  {q:'구직등록을 꼭 해야 하나요?', a:'네. 「직업안정법」에 따른 직업안정기관에 구직등록을 하지 않은 경우 참여가 제한됩니다. 신청 전 또는 안내받은 기한 내에 구직등록을 완료해야 합니다.'},
  {q:'다른 정부지원 직업훈련을 듣고 있어요.', a:'국가·지자체가 실시하거나 비용을 지원하는 직업능력개발훈련을 수강 중이면 원칙적으로 참여할 수 없습니다. 다만 국민취업지원제도에 참여 중인 경우는 가능하니, 본인의 제도와 훈련 유형을 별도로 확인하세요.'},
  {q:'외국 국적자도 가능한가요?', a:'아니요. 대한민국 국적을 보유하지 않은 사람은 참여가 제한됩니다.'},
  {q:'우대(우선 선발) 대상이 있나요?', a:'장기 미취업(연속 4개월 이상), 최근 2년 내 고용보험 상실 이력 3회 이상의 고용불안정 반복군, 최근 1년 내 국민취업지원제도·직업훈련 등 정책 참여 이력자, 그리고 기초생활수급자·차상위·자립준비청년·북한이탈청년·장애인·고졸 이하 미취업자 등 사회적 배려군이 우선 선발 권고 대상으로 고려될 수 있습니다.'},
  {q:'국민취업지원제도에 참여 중이어도 되나요?', a:'가능합니다. 다만 다른 직업능력개발훈련과의 중복 여부, 수당 지급 기준 등은 개별 상황에 따라 확인이 필요합니다.'},
  {q:'어떤 증빙자료가 필요한가요?', a:'상황에 따라 신분증·연령 확인 자료, 병적증명서, 고용보험 자격이력 내역서, 퇴사·상실 증빙, 사업자등록증·휴업사실증명, 졸업예정/재학/휴학 증명서, 이수학점 확인 자료, 구직등록 확인 자료 등을 요청받을 수 있습니다.'}
];
buildAccordion(document.getElementById('eligqnas'), eligQnas);
