/* ==========================================================================
   Filistin'e Özgürlük Platformu - Main Interactivity JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Theme Toggle (Dark / Light Mode)
       -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElem = document.documentElement;

    const savedTheme = localStorage.getItem('fo_theme') || 'dark';
    htmlElem.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElem.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElem.setAttribute('data-theme', newTheme);
            localStorage.setItem('fo_theme', newTheme);
            updateThemeIcon(newTheme);
            showToast(`Tema ${newTheme === 'dark' ? 'Karanlık' : 'Aydınlık'} moda değiştirildi.`);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'light') {
            icon.className = 'fa-solid fa-sun';
            themeToggleBtn.title = 'Karanlık Moda Geç';
        } else {
            icon.className = 'fa-solid fa-moon';
            themeToggleBtn.title = 'Aydınlık Moda Geç';
        }
    }

    /* --------------------------------------------------------------------------
       2. Scroll Progress & Back to Top
       -------------------------------------------------------------------------- */
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;

        if (scrollProgress) scrollProgress.style.width = `${scrolled}%`;

        if (backToTopBtn) {
            if (scrollTop > 400) backToTopBtn.classList.add('visible');
            else backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* --------------------------------------------------------------------------
       3. Mobile Drawer Navigation
       -------------------------------------------------------------------------- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerClose = document.getElementById('drawer-close');
    const drawerBackdrop = document.getElementById('drawer-backdrop');

    function openDrawer() {
        mobileDrawer?.classList.add('active');
        drawerBackdrop?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        mobileDrawer?.classList.remove('active');
        drawerBackdrop?.classList.remove('active');
        document.body.style.overflow = '';
    }

    mobileToggle?.addEventListener('click', openDrawer);
    drawerClose?.addEventListener('click', closeDrawer);
    drawerBackdrop?.addEventListener('click', closeDrawer);

    document.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    /* --------------------------------------------------------------------------
       4. Animated Impact Counters
       -------------------------------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedStats) {
                animatedStats = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target') || '0', 10);
                    animateCounter(stat, target);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) statsObserver.observe(statsSection);

    function animateCounter(elem, target) {
        let current = 0;
        const duration = 2000;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            elem.innerText = Math.floor(current).toLocaleString('tr-TR');
        }, stepTime);
    }

    /* --------------------------------------------------------------------------
       5. Filistin Güncesi Category Filter
       -------------------------------------------------------------------------- */
    const newsFilterBtns = document.querySelectorAll('.filter-bar .filter-btn');
    const newsCards = document.querySelectorAll('#news-grid .news-card');

    newsFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            newsFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            newsCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').split(/\s+/);
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = card.classList.contains('feature-card') ? 'grid' : 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* --------------------------------------------------------------------------
       6. Timeline Interactive Data Switcher
       -------------------------------------------------------------------------- */
    const timelineData = {
        '1917': {
            title: "Balfour Deklarasyonu ve Mandat Dönemi",
            desc: "İngiltere Dışişleri Bakanı Arthur Balfour'un deklarasyonu ile Filistin coğrafyasında yerli halkın mülkiyet haklarını görmezden gelen sürecin başlangıcı yaşandı.",
            tags: ["Tarihsel Belgeler", "Uluslararası Politika"]
        },
        '1948': {
            title: "Nakba (Büyük Felaket)",
            desc: "750 binin üzerinde Filistinli yurtlarından sürüldü, yüzlerce köy boşaltıldı ve uluslararası mülteci krizi doğdu.",
            tags: ["Nakba", "Mülteci Hakları", "1948"]
        },
        '1967': {
            title: "Naksa ve İşgalin Genişlemesi",
            desc: "6 Gün Savaşı ile Batı Şeria, Doğu Kudüs ve Gazze işgal altına girdi. BM 242 sayılı karar ile çekilme çağrısı yaptı.",
            tags: ["BM 242", "Kudüs", "1967"]
        },
        '1987': {
            title: "Birinci İntifada (Taşların Direnişi)",
            desc: "Halkın sivil itaatsizlik ve kitle eylemleriyle başlayan barışçıl direniş hareketi uluslararası farkındalığı zirveye taşıdı.",
            tags: ["Sivil Direniş", "İntifada"]
        },
        '2005': {
            title: "BDS (Boykot, Tecrit ve Yaptırımlar) Çağrısı",
            desc: "170'ten fazla Filistinli sivil toplum örgütünün çağrısıyla küresel boykot ve akademik/kültürel yaptırım hareketi başladı.",
            tags: ["BDS", "Küresel Boykot"]
        },
        '2024': {
            title: "UAD Soykırım Davası ve Küresel Adalet Adımları",
            desc: "Güney Afrika'nın başvurusuyla Uluslararası Adalet Divanı geçici tedbir kararları aldı ve Lahey süreçleri tarihi ivme kazandı.",
            tags: ["Lahey", "UAD", "Uluslararası Hukuk"]
        }
    };

    const timelineTabBtns = document.querySelectorAll('.timeline-tab-btn');
    const tlBadge = document.getElementById('tl-badge');
    const tlTitle = document.getElementById('tl-title');
    const tlDesc = document.getElementById('tl-desc');
    const tlTags = document.getElementById('tl-tags');

    timelineTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            timelineTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const year = btn.getAttribute('data-year');
            const data = timelineData[year];

            if (data) {
                if (tlBadge) tlBadge.innerText = year;
                if (tlTitle) tlTitle.innerText = data.title;
                if (tlDesc) tlDesc.innerText = data.desc;
                if (tlTags) {
                    tlTags.innerHTML = data.tags.map(t => `<span class="tag-item">${t}</span>`).join('');
                }
            }
        });
    });

    /* --------------------------------------------------------------------------
       7. Article Reader Modal
       -------------------------------------------------------------------------- */
    const articleModal = document.getElementById('article-modal');
    const articleModalBody = document.getElementById('article-modal-body');
    const closeArticleModalBtn = document.getElementById('close-article-modal');

    const authorArticles = {
        'un-guterres-statement': {
            author: "Filistin Güncesi • Haberler",
            title: "30 Ekim’de Liman Eylemleri",
            content: `
                <p class='lead-text' style='font-size: 1.12rem; font-weight: 600; color: var(--text-primary); line-height: 1.8; margin-bottom: 1.1rem;'>
                    Küresel Sumud Filosu da 30 Ekim’de Filistin Ulusal BDS Komitesi (BNC) ve Filistinli sendikaların çağrıcısı olduğu yapılması planlanan uluslararası liman işçileri grevini desteklediğini açıkladı.
                </p>
                <div style='display: flex; flex-direction: column; gap: 0.65rem; margin: 1.1rem 0; padding: 1rem 1.25rem; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--border-color); border-radius: var(--radius-md);'>
                    <a href='https://x.com/gbsumudflotilla/status/2113191353442058615?s=20' target='_blank' rel='noopener noreferrer' style='color: var(--palestine-gold); font-weight: 700; text-decoration: underline; text-underline-offset: 3px; display: inline-flex; align-items: center; gap: 0.45rem; width: fit-content; overflow-wrap: anywhere;'>
                        <i class='fa-solid fa-up-right-from-square' style='font-size: 0.82rem; flex-shrink: 0;'></i> Küresel Sumud Filosu’nun açıklaması
                    </a>
                    <a href='https://bdsmovement.net/news/PTUC-Endorse-Dockworkers-Unions-Call-30-Oct' target='_blank' rel='noopener noreferrer' style='color: var(--palestine-gold); font-weight: 700; text-decoration: underline; text-underline-offset: 3px; display: inline-flex; align-items: center; gap: 0.45rem; width: fit-content; overflow-wrap: anywhere;'>
                        <i class='fa-solid fa-up-right-from-square' style='font-size: 0.82rem; flex-shrink: 0;'></i> BDS Hareketi — 30 Ekim liman işçileri çağrısı
                    </a>
                </div>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-primary); font-weight: 600; margin-top: 1rem;'>
                    Türkiye'de de çeşitli illerde eylemlere destek olmalıyız.
                </p>
            `
        }
    };

    document.querySelectorAll('.btn-read-more').forEach(btn => {
        if (btn.classList.contains('open-world-voices-trigger') || btn.classList.contains('external-read-more-link') || btn.tagName === 'A') return;
        btn.addEventListener('click', () => {
            const writerId = btn.getAttribute('data-writer');
            const data = authorArticles[writerId] || {
                author: "Filistin'e Özgürlük Platformu",
                title: "Analiz Makalesi",
                content: "<p class='lead-text'>Bu makale Filistin'e Özgürlük Platformu kütüphanesinde yer almaktadır.</p>"
            };

            if (articleModalBody) {
                articleModalBody.innerHTML = `
                    <span class="section-tag green-tag"><i class="fa-solid fa-pen-nib"></i> ${data.author}</span>
                    <h2 class="section-title" style="margin-top: 0.5rem;">${data.title}</h2>
                    <div style="color: var(--text-secondary); line-height: 1.8; margin-top: 1.5rem;">${data.content}</div>
                `;
            }
            articleModal?.showModal();
        });
    });

    closeArticleModalBtn?.addEventListener('click', () => articleModal?.close());

    /* --------------------------------------------------------------------------
       9. Custom Audio Player
       -------------------------------------------------------------------------- */
    const audioElem = document.getElementById('main-audio-element');
    const playPauseBtn = document.getElementById('audio-play-pause');

    if (playPauseBtn && audioElem) {
        playPauseBtn.addEventListener('click', () => {
            if (audioElem.paused) {
                audioElem.play().catch(() => showToast('Ses oynatma simülasyonu başlatıldı.'));
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                showToast('Podcast oynatılıyor...');
            } else {
                audioElem.pause();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        });
    }

    /* --------------------------------------------------------------------------
       11. Event & Online Meeting Modal Controls
       -------------------------------------------------------------------------- */
    const rsvpModal = document.getElementById('rsvp-modal');
    const closeRsvpModalBtn = document.getElementById('close-rsvp-modal');

    document.querySelectorAll('.rsvp-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (rsvpModal && !rsvpModal.open) rsvpModal.showModal();
        });
    });

    closeRsvpModalBtn?.addEventListener('click', () => rsvpModal?.close());
    rsvpModal?.addEventListener('click', (e) => {
        if (e.target === rsvpModal) rsvpModal.close();
    });

    /* --------------------------------------------------------------------------
       12. UN Report Download Modal Controls
       -------------------------------------------------------------------------- */
    const unReportModal = document.getElementById('un-report-modal');
    const closeUnReportModalBtn = document.getElementById('close-un-report-modal');

    closeUnReportModalBtn?.addEventListener('click', () => unReportModal?.close());
    unReportModal?.addEventListener('click', (e) => {
        if (e.target === unReportModal) unReportModal.close();
    });

    /* --------------------------------------------------------------------------
       13. Vicdan Mahkemesi Files Link List Modal Controls
       -------------------------------------------------------------------------- */
    const vicdanFilesModal = document.getElementById('vicdan-files-modal');
    const openVicdanFilesBtn = document.getElementById('open-vicdan-files-btn');
    const closeVicdanFilesModalBtn = document.getElementById('close-vicdan-files-modal');

    openVicdanFilesBtn?.addEventListener('click', () => {
        if (vicdanFilesModal && !vicdanFilesModal.open) vicdanFilesModal.showModal();
    });

    closeVicdanFilesModalBtn?.addEventListener('click', () => vicdanFilesModal?.close());
    vicdanFilesModal?.addEventListener('click', (e) => {
        if (e.target === vicdanFilesModal) vicdanFilesModal.close();
    });

    /* --------------------------------------------------------------------------
       14. FÖP Actions & Events Document Modal Controls
       -------------------------------------------------------------------------- */
    const fopActionsModal = document.getElementById('fop-actions-modal');
    const openFopActionsBtn = document.getElementById('open-fop-actions-btn');
    const closeFopActionsModalBtn = document.getElementById('close-fop-actions-modal');

    openFopActionsBtn?.addEventListener('click', () => {
        if (fopActionsModal && !fopActionsModal.open) fopActionsModal.showModal();
    });

    closeFopActionsModalBtn?.addEventListener('click', () => fopActionsModal?.close());
    fopActionsModal?.addEventListener('click', (e) => {
        if (e.target === fopActionsModal) fopActionsModal.close();
    });

    /* --------------------------------------------------------------------------
       15. Yemen Tezkeresi Basın Açıklaması Modal Controls
       -------------------------------------------------------------------------- */
    const yemenStatementModal = document.getElementById('yemen-statement-modal');
    const openYemenStatementBtn = document.getElementById('open-yemen-statement-btn');
    const closeYemenStatementModalBtn = document.getElementById('close-yemen-statement-modal');

    openYemenStatementBtn?.addEventListener('click', () => {
        if (yemenStatementModal && !yemenStatementModal.open) yemenStatementModal.showModal();
    });

    closeYemenStatementModalBtn?.addEventListener('click', () => yemenStatementModal?.close());
    yemenStatementModal?.addEventListener('click', (e) => {
        if (e.target === yemenStatementModal) yemenStatementModal.close();
    });

    /* --------------------------------------------------------------------------
       16. Books & Articles Modal Controls
       -------------------------------------------------------------------------- */
    const booksArticlesModal = document.getElementById('books-articles-modal');
    const openBooksArticlesBtn = document.getElementById('open-books-articles-btn');
    const closeBooksArticlesModalBtn = document.getElementById('close-books-articles-modal');

    openBooksArticlesBtn?.addEventListener('click', () => {
        if (booksArticlesModal && !booksArticlesModal.open) booksArticlesModal.showModal();
    });

    closeBooksArticlesModalBtn?.addEventListener('click', () => booksArticlesModal?.close());
    booksArticlesModal?.addEventListener('click', (e) => {
        if (e.target === booksArticlesModal) booksArticlesModal.close();
    });

    /* --------------------------------------------------------------------------
       17. World Voices (Dünyadan Sesler) Shared Link Archive & Modal Controls
       -------------------------------------------------------------------------- */
    // ORTAK BAĞLANTI LİSTESİ (ARŞİV):
    // Yeni bağlantı eklemek için yalnızca bu listeye { title: "Başlık", url: "https://..." } eklemeniz yeterlidir.
    // Yeni eklenen bağlantılar pencerede otomatik olarak en üstte görünür, eski bağlantılar silinmeden aşağıya kayar.
    const worldVoicesLinks = [
        {
            title: "Filistin’e Özgürlük — Instagram",
            url: "https://www.instagram.com/filistin.ozgurluk/"
        },
        {
            title: "Eye on Palestine — Instagram",
            url: "https://www.instagram.com/eye.on.palestine/"
        },
        {
            title: "Socialist Worker — Filistin",
            url: "https://socialistworker.co.uk/palestine-2023/"
        },
        {
            title: "Küresel Sumud Filosu — Vikipedi",
            url: "https://tr.wikipedia.org/wiki/K%C3%BCresel_Sumud_Filosu"
        }
    ];

    const worldVoicesModal = document.getElementById('world-voices-modal');
    const worldVoicesListEl = document.getElementById('world-voices-list');
    const openWorldVoicesBtn = document.getElementById('open-world-voices-btn');
    const closeWorldVoicesModalBtn = document.getElementById('close-world-voices-modal');

    function getWorldVoiceIconHtml(url) {
        const lower = (url || '').toLowerCase();
        if (lower.includes('instagram.com')) {
            return '<i class="fa-brands fa-instagram" style="font-size: 1.7rem; color: #E1306C; flex-shrink: 0;"></i>';
        }
        if (lower.includes('wikipedia.org')) {
            return '<i class="fa-brands fa-wikipedia-w" style="font-size: 1.7rem; color: #10B981; flex-shrink: 0;"></i>';
        }
        if (lower.includes('socialistworker')) {
            return '<i class="fa-regular fa-newspaper" style="font-size: 1.7rem; color: var(--palestine-red); flex-shrink: 0;"></i>';
        }
        return '<i class="fa-solid fa-link" style="font-size: 1.6rem; color: var(--palestine-red); flex-shrink: 0;"></i>';
    }

    function getOrderedWorldVoicesLinks() {
        const baseArchiveLastUrl = "https://tr.wikipedia.org/wiki/K%C3%BCresel_Sumud_Filosu";
        const baseEndIndex = worldVoicesLinks.findIndex(item => item && item.url === baseArchiveLastUrl);
        if (baseEndIndex !== -1 && baseEndIndex < worldVoicesLinks.length - 1) {
            const initialAndPrepended = worldVoicesLinks.slice(0, baseEndIndex + 1);
            const appendedNewLinks = worldVoicesLinks.slice(baseEndIndex + 1).reverse();
            return [...appendedNewLinks, ...initialAndPrepended];
        }
        return [...worldVoicesLinks];
    }

    function renderWorldVoicesList() {
        if (!worldVoicesListEl) return;
        const orderedLinks = getOrderedWorldVoicesLinks();
        worldVoicesListEl.innerHTML = orderedLinks.map(item => `
            <div class="glass-card vicdan-modal-item">
                <div class="vicdan-modal-item-info">
                    ${getWorldVoiceIconHtml(item.url)}
                    <div style="min-width: 0; flex: 1;">
                        <h4 class="vicdan-modal-item-title">
                            <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>
                        </h4>
                        <p class="vicdan-modal-item-desc">${item.url}</p>
                    </div>
                </div>
                <div class="vicdan-modal-item-actions">
                    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-primary"><i class="fa-solid fa-up-right-from-square"></i> Bağlantıyı Aç</a>
                </div>
            </div>
        `).join('');
    }

    function openWorldVoicesModal() {
        renderWorldVoicesList();
        if (worldVoicesModal && !worldVoicesModal.open) {
            worldVoicesModal.showModal();
        }
    }

    window.worldVoicesLinks = worldVoicesLinks;
    window.renderWorldVoicesList = renderWorldVoicesList;
    window.openWorldVoicesModal = openWorldVoicesModal;

    renderWorldVoicesList();

    openWorldVoicesBtn?.addEventListener('click', openWorldVoicesModal);

    document.querySelectorAll('.open-world-voices-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openWorldVoicesModal();
        });
    });

    closeWorldVoicesModalBtn?.addEventListener('click', () => worldVoicesModal?.close());
    worldVoicesModal?.addEventListener('click', (e) => {
        if (e.target === worldVoicesModal) worldVoicesModal.close();
    });

    /* --------------------------------------------------------------------------
       18. Sokağın ve Sahanın Sesi & Öne Çıkan Kitlesel Eylem Modals
       -------------------------------------------------------------------------- */
    const sokaginSesiModal = document.getElementById('sokagin-sesi-modal');
    const openSokaginSesiBtn = document.getElementById('open-sokagin-sesi-btn');
    const closeSokaginSesiModalBtn = document.getElementById('close-sokagin-sesi-modal');

    openSokaginSesiBtn?.addEventListener('click', () => {
        if (sokaginSesiModal && !sokaginSesiModal.open) sokaginSesiModal.showModal();
    });
    closeSokaginSesiModalBtn?.addEventListener('click', () => sokaginSesiModal?.close());
    sokaginSesiModal?.addEventListener('click', (e) => {
        if (e.target === sokaginSesiModal) sokaginSesiModal.close();
    });

    const featuredActionModal = document.getElementById('featured-action-modal');
    const openFeaturedActionBtn = document.getElementById('open-featured-action-btn');
    const closeFeaturedActionModalBtn = document.getElementById('close-featured-action-modal');

    openFeaturedActionBtn?.addEventListener('click', () => {
        if (featuredActionModal && !featuredActionModal.open) featuredActionModal.showModal();
    });
    closeFeaturedActionModalBtn?.addEventListener('click', () => featuredActionModal?.close());
    featuredActionModal?.addEventListener('click', (e) => {
        if (e.target === featuredActionModal) featuredActionModal.close();
    });

    /* --------------------------------------------------------------------------
       19. Eyleme Katıl (Filistin Föyü Çağrısı) Modal Controls
       -------------------------------------------------------------------------- */
    const eylemeKatilModal = document.getElementById('eyleme-katil-modal');
    const eylemeKatilModalBody = eylemeKatilModal?.querySelector('.eyleme-katil-modal-body');
    const closeEylemeKatilModalBtn = document.getElementById('close-eyleme-katil-modal');

    function resetEylemeKatilModalScroll() {
        if (eylemeKatilModal) eylemeKatilModal.scrollTop = 0;
        if (eylemeKatilModalBody) eylemeKatilModalBody.scrollTop = 0;
    }

    document.querySelectorAll('.open-eyleme-katil-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeDrawer();
            if (eylemeKatilModal) {
                if (!eylemeKatilModal.open) {
                    eylemeKatilModal.showModal();
                }
                resetEylemeKatilModalScroll();
                requestAnimationFrame(resetEylemeKatilModalScroll);
            }
        });
    });

    closeEylemeKatilModalBtn?.addEventListener('click', () => eylemeKatilModal?.close());
    eylemeKatilModal?.addEventListener('click', (e) => {
        if (e.target === eylemeKatilModal) eylemeKatilModal.close();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (vicdanFilesModal?.open) vicdanFilesModal.close();
            if (fopActionsModal?.open) fopActionsModal.close();
            if (yemenStatementModal?.open) yemenStatementModal.close();
            if (booksArticlesModal?.open) booksArticlesModal.close();
            if (worldVoicesModal?.open) worldVoicesModal.close();
            if (sokaginSesiModal?.open) sokaginSesiModal.close();
            if (featuredActionModal?.open) featuredActionModal.close();
            if (eylemeKatilModal?.open) eylemeKatilModal.close();
        }
    });

    // Helper Toast
    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-check green-text"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(50px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
});
