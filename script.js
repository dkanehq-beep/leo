// -1. ✨ 토스트 알림 (alert() 대체용 세련된 알림)
function showToast(title, message, type = "success", duration = 3800) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    const icon = type === "error" ? "⚠️" : "✦";
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span>
            <span class="toast-title">${title}</span>
            ${message}
        </span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("hide");
        setTimeout(() => toast.remove(), 380);
    }, duration);
}
window.showToast = showToast;

// -0.5 ✨ 모바일 햄버거 메뉴
const hamburgerBtn = document.getElementById("hamburger-btn");
const navLinksEl = document.getElementById("nav-links");
const navOverlayEl = document.getElementById("nav-menu-overlay");

function closeNavMenu() {
    if (hamburgerBtn) hamburgerBtn.classList.remove("open");
    if (navLinksEl) navLinksEl.classList.remove("open");
    if (navOverlayEl) navOverlayEl.classList.remove("show");
    if (hamburgerBtn) hamburgerBtn.setAttribute("aria-expanded", "false");
}

function closeNavAnd(callback) {
    closeNavMenu();
    if (typeof callback === "function") callback();
}
window.closeNavAnd = closeNavAnd;

if (hamburgerBtn && navLinksEl && navOverlayEl) {
    hamburgerBtn.addEventListener("click", function() {
        const isOpen = navLinksEl.classList.toggle("open");
        hamburgerBtn.classList.toggle("open", isOpen);
        navOverlayEl.classList.toggle("show", isOpen);
        hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    });
    navOverlayEl.addEventListener("click", closeNavMenu);
}

// -0.25 ✨ 스크롤 진행률 바 & 맨 위로 버튼
const scrollProgressEl = document.getElementById("scroll-progress");
const scrollTopBtn = document.getElementById("scroll-top-btn");

function handleScrollUI() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressEl) scrollProgressEl.style.width = progress + "%";
    if (scrollTopBtn) scrollTopBtn.classList.toggle("show", scrollTop > 500);
}
window.addEventListener("scroll", handleScrollUI, { passive: true });
handleScrollUI();

if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// 0. ✨ 다크 모드 토글 및 로컬 스토리지 저장 기능
const themeToggleBtn = document.getElementById("theme-toggle");

if (themeToggleBtn) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggleBtn.textContent = "☀️";
    } else {
        themeToggleBtn.textContent = "🌙";
    }

    themeToggleBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggleBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeToggleBtn.textContent = "🌙";
        }
    });
}

// 상태 관리 객체 (마케팅 및 UI 연동 목적)
function loadWishlistFromStorage() {
    try {
        const saved = JSON.parse(localStorage.getItem("leo_wishlist") || "[]");
        return new Set(saved);
    } catch (e) {
        return new Set();
    }
}
function saveWishlistToStorage() {
    localStorage.setItem("leo_wishlist", JSON.stringify(Array.from(state.wishlist)));
}

const state = {
    wishlist: loadWishlistFromStorage(),
    products: {
        p1: { name: "일본 3박 4일", price: "15,000,000원" },
        p2: { name: "유럽 15박 17일", price: "100,000,000원" },
        p3: { name: "제주도 24박 25일", price: "300,000,000원" },
        p4: { name: "스위스 융프라우 7박 8일", price: "450,000,000원" }
    }
};

// ✨ 상품 상세 모달용 데이터 (실제 이미지·문구는 추후 실사진/투어 기획서에 맞춰 교체 권장)
const PRODUCT_DETAILS = {
    p1: {
        title: "프라이빗 에디션 · 일본 3박 4일",
        price: "15,000,000원",
        image: "images/japan.avif",
        tag: "ASIA · PRIVATE EDITION",
        select: "일본 3박 4일",
        highlights: [
            "나리타/하네다 프라이빗 픽업 및 전담 기사 배정",
            "미슐랭 스타 셰프 오마카세 프라이빗 다이닝 1회",
            "전통 료칸 최상급 객실 2박 · 온천 프라이빗 이용",
            "현지 전담 통역 가이드 상시 동행"
        ],
        included: ["왕복 항공권 (비즈니스)", "전 일정 전용 차량", "료칸 조식·석식", "여행자 보험"],
        excluded: ["개인 쇼핑 비용", "선택 관광 액티비티", "기내 유료 서비스"]
    },
    p2: {
        title: "그랜드 투어 · 유럽 15박 17일",
        price: "100,000,000원",
        image: "images/europe.avif",
        tag: "EUROPE · LIMITED (잔여 2석)",
        select: "유럽 15박 17일",
        highlights: [
            "파리 · 로마 · 스위스 3개국 프라이빗 크루즈 연계",
            "5성급 부티크 호텔 스위트룸 전 일정 배정",
            "현지 미술관·유적지 프라이빗 도슨트 투어",
            "전용기 매칭 및 국가 간 이동 라운지 이용"
        ],
        included: ["왕복 퍼스트 클래스 항공권", "전 일정 5성급 호텔", "전담 컨시어지 동행", "여행자 보험"],
        excluded: ["개인 쇼핑·기념품 비용", "일부 선택 미슐랭 다이닝", "비자 발급 수수료"]
    },
    p3: {
        title: "헤리티지 이스케이프 · 제주 24박 25일",
        price: "300,000,000원",
        image: "images/jeju.avif",
        tag: "DOMESTIC · HERITAGE",
        select: "제주도 24박 25일",
        highlights: [
            "독채 풀빌라 리조트 전용 배정 (25박)",
            "전용 헬기 셔틀로 주요 명소 이동",
            "제주 로컬 셰프 초청 프라이빗 다이닝",
            "요트·승마 등 프라이빗 액티비티 프로그램"
        ],
        included: ["독채 풀빌라 전 일정", "전용 헬기 셔틀", "전담 매니저 상주", "여행자 보험"],
        excluded: ["개인 액티비티 추가 옵션", "제주 왕복 항공권", "개인 쇼핑 비용"]
    },
    p4: {
        title: "스위스 융프라우 샬레 7박 8일",
        price: "450,000,000원",
        image: "images/swiss.avif",
        tag: "EUROPE · CHALET EXCLUSIVE",
        select: "스위스 융프라우 7박 8일",
        highlights: [
            "융프라우 프라이빗 샬레 통째 대여",
            "알프스 전용 전세기로 취리히 직행",
            "미쉐린 셰프 상주 · 매일 프라이빗 코스 다이닝",
            "스키·헬리스키 전담 강사 프로그램"
        ],
        included: ["왕복 전용기", "샬레 전체 임대 7박", "상주 셰프·집사 서비스", "여행자 보험"],
        excluded: ["개인 장비 구매", "일부 헬리스키 옵션", "개인 쇼핑 비용"]
    }
};

// ✨ 상품 상세 모달 열기/닫기
const productModalEl = document.getElementById("product-modal");
let lastFocusedBeforeModal = null;

function openProductModal(id) {
    const data = PRODUCT_DETAILS[id];
    if (!data || !productModalEl) return;

    document.getElementById("pm-img").src = data.image;
    document.getElementById("pm-img").alt = data.title;
    document.getElementById("pm-tag").textContent = data.tag;
    document.getElementById("pm-title").textContent = data.title;
    document.getElementById("pm-price").textContent = data.price;

    document.getElementById("pm-highlights").innerHTML =
        data.highlights.map(h => `<li>${h}</li>`).join("");
    document.getElementById("pm-included").innerHTML =
        data.included.map(h => `<li>${h}</li>`).join("");
    document.getElementById("pm-excluded").innerHTML =
        data.excluded.map(h => `<li>${h}</li>`).join("");

    const ctaBtn = document.getElementById("pm-cta");
    ctaBtn.onclick = function() {
        window.location.href = "contact.html?product=" + encodeURIComponent(data.select);
    };

    lastFocusedBeforeModal = document.activeElement;
    productModalEl.classList.add("open");
    productModalEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeProductModal() {
    if (!productModalEl) return;
    productModalEl.classList.remove("open");
    productModalEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedBeforeModal) lastFocusedBeforeModal.focus();
}
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && productModalEl && productModalEl.classList.contains("open")) {
        closeProductModal();
    }
});

// 1. 하단 메인 '예약 문의하기' 기능 (달력 및 선택 상품 연동)
const mainReserveBtn = document.getElementById("reserve-btn");
if (mainReserveBtn) {
    mainReserveBtn.addEventListener("click", function() {
        const nameInput = document.getElementById("name-input");
        const productSelect = document.getElementById("product-select");
        const dateInput = document.getElementById("date-input");
        const nameGroup = document.getElementById("name-group");
        const productGroup = document.getElementById("product-group");
        const dateGroup = document.getElementById("date-group");

        const name = nameInput ? nameInput.value.trim() : "";
        const selectedProduct = productSelect ? productSelect.value : "";
        const selectedDate = dateInput ? dateInput.value : "";

        // 이전 오류 상태 초기화
        [nameGroup, productGroup, dateGroup].forEach(g => g && g.classList.remove("error"));

        let firstInvalid = null;
        if (name === "") { nameGroup.classList.add("error"); firstInvalid = firstInvalid || nameInput; }
        if (selectedProduct === "") { productGroup.classList.add("error"); firstInvalid = firstInvalid || productSelect; }
        if (selectedDate === "") { dateGroup.classList.add("error"); firstInvalid = firstInvalid || dateInput; }

        if (firstInvalid) {
            firstInvalid.focus();
            showToast("입력을 확인해 주세요", "표시된 항목을 채워주시면 상담을 도와드릴게요.", "error");
            return;
        }

        showToast(
            `${name}님, 문의가 접수되었습니다`,
            `${selectedProduct} · 출발 희망일 ${selectedDate}<br>담당 컨시어지가 곧 연락드리겠습니다.`,
            "success",
            5000
        );

        nameInput.value = "";
        productSelect.value = "";
    });
}

// 입력 시 실시간으로 오류 상태 해제
["name-input", "product-select", "date-input"].forEach(function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const eventName = el.tagName === "SELECT" ? "change" : "input";
    el.addEventListener(eventName, function() {
        const group = el.closest(".input-group");
        if (group) group.classList.remove("error");
    });
});

// 달력의 선택 최소 날짜를 오늘로 제한
const dateInput = document.getElementById("date-input");
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// ✨ 상품 상세에서 넘어온 경우 관심 컬렉션 자동 선택 (contact.html?product=...)
const urlParams = new URLSearchParams(window.location.search);
const productParam = urlParams.get("product");
if (productParam) {
    const productSelectEl = document.getElementById("product-select");
    if (productSelectEl) {
        productSelectEl.value = productParam;
        const nameInputEl = document.getElementById("name-input");
        if (nameInputEl) setTimeout(function() { nameInputEl.focus(); }, 300);
    }
}

// 2. 각 여행 상품 카드 내 '자세히 보기' 클릭 시 상세 모달 오픈
function bindReserveButtons() {
    document.querySelectorAll(".card .reserve-btn").forEach(function(btn) {
        btn.replaceWith(btn.cloneNode(true));
    });

    document.querySelectorAll(".card .reserve-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
            const card = this.closest(".card");
            const id = this.dataset.id || (card && card.dataset.id);
            if (id) openProductModal(id);
        });
    });
}
bindReserveButtons();

// 3. ✨ 찜하기(Wishlist) 기능 구현
function toggleWish(event, productId) {
    event.stopPropagation(); 
    const targetBtn = event.currentTarget;

    if (state.wishlist.has(productId)) {
        state.wishlist.delete(productId);
        targetBtn.classList.remove("active");
    } else {
        state.wishlist.add(productId);
        targetBtn.classList.add("active");
        console.log(`[마케팅 데이터 수집] 유저 선호 여행 상품: ${state.products[productId].name}`);
    }
    saveWishlistToStorage();

    targetBtn.classList.remove("pulse");
    void targetBtn.offsetWidth; // 애니메이션 재실행을 위한 리플로우
    targetBtn.classList.add("pulse");

    updateWishlistUI();
}

function updateWishlistUI() {
    // 1) 네비게이션 카운트 갱신
    const countEl = document.getElementById("wish-count");
    if (countEl) countEl.textContent = state.wishlist.size;

    // 2) 사이드 드로어 리스트 갱신
    const container = document.getElementById("wishlist-items-container");
    if (!container) return;

    if (state.wishlist.size === 0) {
        container.innerHTML = '<p class="empty-msg">찜한 상품이 없습니다.</p>';
        return;
    }

    container.innerHTML = "";
    state.wishlist.forEach(id => {
        const item = state.products[id];
        const div = document.createElement("div");
        div.className = "wish-item";
        div.innerHTML = `
            <span class="wish-item-title">${item.name}</span>
            <button class="remove-wish-btn" onclick="removeWishFromDrawer('${id}')">삭제</button>
        `;
        container.appendChild(div);
    });
}

function removeWishFromDrawer(productId) {
    state.wishlist.delete(productId);
    saveWishlistToStorage();

    const card = document.querySelector(`.card[data-id="${productId}"]`);
    if (card) {
        const btn = card.querySelector(".wish-btn");
        if (btn) btn.classList.remove("active");
    }
    
    updateWishlistUI();
}

function toggleWishlistDrawer() {
    const drawer = document.getElementById("wishlist-drawer");
    const overlay = document.getElementById("drawer-overlay");
    if (drawer && overlay) {
        drawer.classList.toggle("open");
        overlay.classList.toggle("show");
    }
}
window.toggleWishlistDrawer = toggleWishlistDrawer;
window.toggleWish = toggleWish;
window.removeWishFromDrawer = removeWishFromDrawer;

// ✨ 다른 페이지에서 저장된 찜 목록을 카드/네비게이션에 반영
function initWishlistButtonStates() {
    document.querySelectorAll(".wish-btn").forEach(function(btn) {
        const card = btn.closest(".card");
        const id = card && card.dataset.id;
        if (id && state.wishlist.has(id)) btn.classList.add("active");
    });
}
initWishlistButtonStates();
updateWishlistUI();

// 4. 스크롤 시 페이드인 애니메이션
const faders = document.querySelectorAll(".fade-in, .reveal");
const appearOnScroll = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            appearOnScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });

faders.forEach(function(fader) {
    appearOnScroll.observe(fader);
});

// 5. 배너 이미지 자동 전환 슬라이더 (dot 연동 + hover 일시정지)
const slides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const heroSection = document.querySelector(".hero");
let currentSlide = 0;
let heroTimer = null;

function goToSlide(index) {
    if (!slides.length) return;
    slides[currentSlide].classList.remove("active");
    heroDots[currentSlide] && heroDots[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    heroDots[currentSlide] && heroDots[currentSlide].classList.add("active");
}

function startHeroTimer() {
    stopHeroTimer();
    heroTimer = setInterval(function() {
        goToSlide(currentSlide + 1);
    }, 4500);
}
function stopHeroTimer() {
    if (heroTimer) clearInterval(heroTimer);
}

if (slides.length > 0) {
    startHeroTimer();
    heroDots.forEach(function(dot) {
        dot.addEventListener("click", function() {
            goToSlide(Number(dot.dataset.index));
            startHeroTimer();
        });
    });
    if (heroSection) {
        heroSection.addEventListener("mouseenter", stopHeroTimer);
        heroSection.addEventListener("mouseleave", startHeroTimer);
    }
}

// 5-1. ✨ 신뢰 지표 숫자 카운트업 애니메이션
const trustBar = document.getElementById("trust-bar");
if (trustBar) {
    const trustObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll(".trust-num").forEach(function(numEl) {
                const target = parseFloat(numEl.dataset.target);
                const suffix = numEl.dataset.suffix || "";
                const decimal = Number(numEl.dataset.decimal || 0);
                const duration = 1400;
                const start = performance.now();

                function tick(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const value = target * eased;
                    numEl.textContent = value.toFixed(decimal) + suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            });
            trustObserver.unobserve(entry.target);
        });
    }, { threshold: 0.4 });
    trustObserver.observe(trustBar);
}

// 6. 계좌번호 복사
function copyAccount() {
    navigator.clipboard.writeText("카카오뱅크 3333112233377")
        .then(function() { showToast("계좌번호 복사 완료", "카카오뱅크 3333112233377이 복사되었습니다.", "success", 2800); })
        .catch(function() { showToast("복사 실패", "계좌번호를 직접 선택해 복사해 주세요.", "error"); });
}
window.copyAccount = copyAccount;

// 7. 실시간 날씨 및 환율 연동
async function loadWeather(card) {
    const lat = card.dataset.lat;
    const lon = card.dataset.lon;
    const tempEl = card.querySelector(".weather-temp");
    const iconEl = card.querySelector(".weather-icon");

    tempEl.classList.add("is-loading");
    iconEl.classList.add("is-loading");

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const data = await res.json();
        const temp = Math.round(data.current.temperature_2m);
        
        const code = data.current.weather_code;
        let icon = "☀️";
        if (code >= 1 && code <= 3) icon = "⛅";
        else if (code >= 45 && code <= 48) icon = "🌫️";
        else if (code >= 51 && code <= 65) icon = "🌧️";
        else if (code >= 71 && code <= 75) icon = "❄️";
        else if (code >= 80) icon = "⛈️";

        tempEl.textContent = temp + "°C";
        iconEl.textContent = icon;
    } catch (err) {
        tempEl.textContent = "--°C";
        iconEl.textContent = "⚠️";
    } finally {
        tempEl.classList.remove("is-loading");
        iconEl.classList.remove("is-loading");
    }
}

async function loadExchange(card) {
    const currency = card.dataset.currency;
    const unit = card.dataset.unit;
    const valueEl = card.querySelector(".exchange-value");

    if (!currency) return;

    valueEl.classList.add("is-loading");

    try {
        const url = `https://api.frankfurter.app/latest?amount=${unit}&from=${currency}&to=KRW`;
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const data = await res.json();
        const krw = Math.round(data.rates.KRW);
        valueEl.textContent = krw.toLocaleString("ko-KR") + "원";
    } catch (err) {
        valueEl.textContent = "환율 실패";
    } finally {
        valueEl.classList.remove("is-loading");
    }
}

function initLiveInfo() {
    document.querySelectorAll(".info-card").forEach(function(card) {
        loadWeather(card);
        loadExchange(card);
    });
}
initLiveInfo();
if (document.querySelector(".info-card")) {
    setInterval(initLiveInfo, 10 * 60 * 1000);
}

// 8. 여행 상품 필터 & 정렬
const cardContainer = document.getElementById("card-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const sortSelect = document.getElementById("sort-select");

let currentFilter = "all";
let currentSort = "default";

function applyFilterAndSort() {
    if (!cardContainer) return;
    const cards = Array.from(cardContainer.querySelectorAll(".card"));

    cards.forEach(function(card) {
        const region = card.dataset.region;
        const matches = (currentFilter === "all" || region === currentFilter);
        card.classList.toggle("hidden", !matches);
    });

    const visibleCards = cards.filter(card => !card.classList.contains("hidden"));

    if (currentSort === "price-asc") {
        visibleCards.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    } else if (currentSort === "price-desc") {
        visibleCards.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    }

    if (currentSort !== "default") {
        visibleCards.forEach(card => cardContainer.appendChild(card));
    }

    let noResultsEl = document.getElementById("no-results-msg");
    if (!noResultsEl) {
        noResultsEl = document.createElement("div");
        noResultsEl.id = "no-results-msg";
        noResultsEl.className = "no-results";
        noResultsEl.textContent = "조건에 맞는 여행 상품이 없습니다.";
        cardContainer.insertAdjacentElement("afterend", noResultsEl);
    }
    noResultsEl.classList.toggle("visible", visibleCards.length === 0);

    bindReserveButtons();
}

filterButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
        filterButtons.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        currentFilter = this.dataset.filter;
        applyFilterAndSort();
    });
});

if (sortSelect) {
    sortSelect.addEventListener("change", function() {
        currentSort = this.value;
        applyFilterAndSort();
    });
}

// 9. ✨ 마그네틱 버튼 (포인터 정밀 기기 전용, 은은하게)
if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".magnetic").forEach(function(el) {
        el.addEventListener("mousemove", function(e) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const max = 6;
            const moveX = Math.max(-max, Math.min(max, x * 0.15));
            const moveY = Math.max(-max, Math.min(max, y * 0.15));
            el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        el.addEventListener("mouseleave", function() {
            el.style.transform = "translate(0, 0)";
        });
    });
}

// 10. ✨ 후기 캐러셀 (화살표 + 인디케이터)
const reviewsTrack = document.getElementById("reviews-track");
const reviewDotsContainer = document.getElementById("review-dots");

function scrollReviews(direction) {
    if (!reviewsTrack) return;
    const card = reviewsTrack.querySelector(".review");
    if (!card) return;
    const gap = 20;
    const scrollAmount = card.getBoundingClientRect().width + gap;
    reviewsTrack.scrollBy({ left: scrollAmount * direction, behavior: "smooth" });
}
window.scrollReviews = scrollReviews;

if (reviewsTrack && reviewDotsContainer) {
    const reviewCards = Array.from(reviewsTrack.querySelectorAll(".review"));

    reviewCards.forEach(function(card, i) {
        const dot = document.createElement("button");
        dot.className = "review-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", (i + 1) + "번 후기로 이동");
        dot.addEventListener("click", function() {
            reviewsTrack.scrollTo({ left: card.offsetLeft - reviewsTrack.offsetLeft, behavior: "smooth" });
        });
        reviewDotsContainer.appendChild(dot);
    });

    const dotEls = reviewDotsContainer.querySelectorAll(".review-dot");
    let reviewScrollTimeout = null;
    reviewsTrack.addEventListener("scroll", function() {
        clearTimeout(reviewScrollTimeout);
        reviewScrollTimeout = setTimeout(function() {
            let closestIndex = 0;
            let closestDist = Infinity;
            reviewCards.forEach(function(card, i) {
                const dist = Math.abs(card.offsetLeft - reviewsTrack.scrollLeft - reviewsTrack.offsetLeft);
                if (dist < closestDist) { closestDist = dist; closestIndex = i; }
            });
            dotEls.forEach(function(d) { d.classList.remove("active"); });
            if (dotEls[closestIndex]) dotEls[closestIndex].classList.add("active");
        }, 100);
    }, { passive: true });
}