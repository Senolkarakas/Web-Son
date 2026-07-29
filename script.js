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
    const newsCards = document.querySelectorAll('.news-card');

    newsFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            newsFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            newsCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
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
       7. Article Reader Modal (Populated for Specified Writers & Articles)
       -------------------------------------------------------------------------- */
    const articleModal = document.getElementById('article-modal');
    const articleModalBody = document.getElementById('article-modal-body');
    const closeArticleModalBtn = document.getElementById('close-article-modal');

    const authorArticles = {
        'fatma-akdokur': {
            author: "Fatma Akdokur",
            title: "Toplumsal Vicdan ve İnsani Dayanışma Kaleleri",
            content: "<p class='lead-text'>Toplumsal hafızamızı canlı tutmak, adalet arayışımızın sarsılmaz temelidir.</p><p>Filistin direnişinin kazanması için yürütülen insani ve fikri mücadele, evrensel vicdan kalelerini güçlendiriyor.</p>"
        },
        'umit-aktas': {
            author: "Ümit Aktaş",
            title: "Direniş Ahlakı ve Küresel Özgürlük Felsefesi",
            content: "<p class='lead-text'>Özgürlük, teslim olmayan fikirlerin eyleme dönüşmüş halidir.</p><p>Sömürgeci mantığa karşı ahlaki ve felsefi duruş, insanlığın ortak hürriyet davasıdır.</p>"
        },
        'melek-ulagay': {
            author: "Melek Ulagay",
            title: "Kamera Merceğinden Filistin'in Görsel Tanıklığı",
            content: "<p class='lead-text'>Görsel tarih ve tanıklıklar, unutturulmak istenen hakikatin mühürleridir.</p><p>Sinema ve belgesel dili, engelleri aşarak hakikatin gür sesini kitlelere ulaştırıyor.</p>"
        },
        'senol-karakas': {
            author: "Şenol Karakaş",
            title: "Sokak Hareketleri ve BDS Boykotunun Birleşik Gücü",
            content: "<p class='lead-text'>Meydanlardaki kitlesel sesimiz, uluslararası yaptırım taleplerimizin motorudur.</p><p>Eylemler, stant nöbetleri ve ekonomik boykot birbirini tamamlayan eylem araçlarımızdır.</p>"
        },
        'fatma-orgel': {
            author: "Fatma Örgel",
            title: "Filistinli Kadınların Tarihsel ve Toplumsal Mücadelesi",
            content: "<p class='lead-text'>Kadınların dayanışma örgütlülüğü direnişin en güçlü damarıdır.</p><p>Evde, sokakta ve akademide sürdürülen mücadele geleceğin özgür Filistin'ini inşa ediyor.</p>"
        },
        'kamile-batur': {
            author: "Kamile Batur",
            title: "Gençlik ve Akademik Alanda Hakikat Mücadelesi",
            content: "<p class='lead-text'>Gelecek nesillere aktarılan her doğru bilgi bir özgürlük tohumudur.</p><p>Kampüslerde ve sivil alanda kurulan bilgilendirme stantları bilinci diri tutmaktadır.</p>"
        },
        'nimet-yallialtin': {
            author: "Nimet Yallıaltın",
            title: "Sivil Toplumun Evrensel İnsan Hakları Sınavı",
            content: "<p class='lead-text'>Küresel kamuoyu bilinci, sınırları aşan kardeşliğimizle büyüyor.</p><p>İnsan hakları savunuculuğu somut sorumluluk almayı gerektirir.</p>"
        },
        'sebnem-sozer': {
            author: "Şebnem Sözer",
            title: "Uluslararası Sözleşmeler ve Yaptırım Hukuku",
            content: "<p class='lead-text'>Hukuk işgalin suçlarını belgeleyen en keskin evrensel araçtır.</p><p>Lahey kararları ve uluslararası mahkeme süreçleri cezasızlık zırhını delmektedir.</p>"
        },
        'mehmet-ali-devecioglu': {
            author: "Mehmet Ali Devecioğlu",
            title: "Bölgesel Dengeler ve Filistin'in Geleceği",
            content: "<p class='lead-text'>Orta Doğu'da kalıcı barış ancak tam adalet sağlandığında kurulabilir.</p><p>Politik dengeler halkların haklı iradesi karşısında şekillenmek zorundadır.</p>"
        },
        'hakan-tahmaz': {
            author: "Hakan Tahmaz",
            title: "Adil Bir Barış İçin Dayanışma İradesi",
            content: "<p class='lead-text'>Barış, işgalin bittiği ve hakkın sahibine teslim edildiği yerde başlar.</p><p>Filistin halkının meşru direnişi kazanana kadar meydanlarda ve masada dayanışmayı büyüteceğiz.</p>"
        },
        'un-guterres-statement': {
            author: "Birleşmiş Milletler Genel Sekreterliği",
            title: "BM, İsrail’in Batı Şeria’da yasadışı yerleşim yerlerini genişletmesini sert bir dille kınadı",
            content: "<p class='lead-text' style='font-size: 1.15rem; font-weight: 700; color: var(--text-primary); line-height: 1.8; margin-bottom: 1rem;'>Birleşmiş Milletler Genel Sekreteri Antonio Guterres, işgal altındaki Batı Şeria’da yerleşim yerlerinin geliştirilmesini hızlandırmaya yönelik İsrail planlarını kınadı.</p><p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary);'>Guterres, Pazartesi günü yayınlanan bir açıklamada, Filistin topraklarındaki İsrail yerleşim yerlerinin “hiçbir hukuki geçerliliği olmadığını” ve uluslararası hukukun “bariz bir ihlali” teşkil ettiğini belirtti. Guterres’in bu eleştirisi, Batı Şeria’da İsrail şiddetinin tırmanışa geçmesi ve İsrail’in mevcut yerleşim noktalarını önce gasp edip ardından bu gapsı yasallaştırma ve yenilerini kurma planları sürerken geldi.</p>"
        },
        'westbank-settler-attacks': {
            author: "İşgal Altındaki Batı Şeria - Saha Raporu",
            title: "Filistinliler, İsrailli yerleşimcilerin Batı Şeria'da camileri, arabaları ve tarım arazilerini ateşe verdiğini anlatıyor",
            content: `
                <div style="margin-bottom: 1.5rem; border-radius: var(--radius-md); overflow: hidden; max-height: 380px;">
                    <img src="assets/gunce_yerlesimci_saldirilari.jpg" alt="İsrailli Yerleşimci Saldırıları" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                </div>
                <p class='lead-text' style='font-size: 1.1rem; font-weight: 700; color: var(--text-primary); line-height: 1.8; margin-bottom: 1rem;'>
                    Filistinli yetkililer, İsrailli yerleşimcilerin işgal altındaki Batı Şeria'da iki camiyi, ayrıca arabaları ve tarım arazilerini ateşe verdiğini, bölgedeki gerilimin tırmanmaya devam ettiğini söylüyor.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    Filistin kaynaklarından gelen bilgilere göre, işgal altındaki Batı Şeria'da iki köy, yerleşimciler tarafından gece saatlerinde saldırıya uğradı; arabalar tahrip edildi, mallar çalındı ve duvarlara nefret içerikli yazılar yazıldı.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    Kusra belediye başkanı, yerleşimcilerin yapım aşamasında olan bir camiyi ateşe verdiğini söyledi.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    Abdul Azim Wadi, yerleşimcilerin caminin duvarlarına "intikam" kelimesini de içeren grafitiler yazdığını söyledi.
                </p>
            `
        },
        'israil-ateskes-analizi': {
            author: "Politik Analiz",
            title: "İsrail Ateşkes Günlerinde 1200 Filistinliyi Öldürdü",
            content: `
                <div style="margin-bottom: 1.5rem; border-radius: var(--radius-md); overflow: hidden; max-height: 380px;">
                    <img src="assets/gunce_politik_analiz_ateskes.jpg" alt="İsrail Ateşkes Günlerinde 1200 Filistinliyi Öldürdü" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                </div>
                <p class='lead-text' style='font-size: 1.1rem; font-weight: 700; color: var(--text-primary); line-height: 1.8; margin-bottom: 1.2rem;'>
                    İran'la olan ateşkesin bozulması ve ABD’nin saldırılara devam etmesi beraberinde bölgesel tansiyonun yükselmesini ve Yemen'e kadar uzanmasını getirdi. İran bölgedeki ABD askeri üslerine karşı eylemler gerçekleştirirken bölge halklarını ABD ordusuna karşı eylemler yapmaya ve onu bölgeden kovmaya çağırdı.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    Ürdün’de yüzlerce politikacı, aydın ve aşiret önderi ABD üslerinin kapatılması ve ABD askerlerinin çıkarılması için bildirge yayınladı. Bu aşamada savaş halinin durması beklenmiyor fakat Katar ve Pakistan'ın girişimleri sürüyor.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    İran’a yapılan saldırıyla bağlantılı olarak Yemen'e yapılan Suudi Arabistan saldırısının ardından Yemen Suudi Arabistan’a deniz ve hava ablukası uygulayacağını duyurdu.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    Lübnan’da yapılan ateşkes sürüyor. ABD bugün işgal ordusunun kimi bölgelerden çekileceğini ve yerine Lübnan ordusunun gireceğini duyurdu. İşgal devleti bu bölgelere deneysel bölgeler adını verdi. Lübnan ordusunun o bölgelerde direnişi elimine etmesi halinde diğer bölgeler aşamalı olarak teslim edilecek. Bu anlaşma Lübnan halkı ve politik güçlerinin çoğunun tepkisi ile karşılandı.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    İşgal Ordusunun Suriye’de ilerlemesi ve operasyonları sürüyor, dün (20 Temmuz) yaptığı saldırılarda iki Suriyeli yaralandı.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    İran, Ürdün’de bulunan ABD üslerine yaptığı füzeli saldırı akabinde Ürdün halkına bu saldırıyı gerçekleştirmek ve sonrasında isabetli olduğunu teyit etmek için sağladığı bilgiler dolayısıyla teşekkür etti.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    Gazze'de işgal ordusunun ateşkes ihlalleri sürüyor ve saldırıları giderek yoğunlaşıyor. Ateşkesten bu yana hayatını kaybeden Filistinlilerin sayısı 1.200'e yaklaştı. Öte yandan tıbbi malzemelerin, kullanım ve içme suyunun, enerji ve gıdanın hâlâ kısıtlı kalması nedeniyle insani durum ağırlığını koruyor.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    Müzakerelerde herhangi bir gelişme sağlanmadığı görülüyor, işgal ordusu birinci aşamayı tamamlamadan direnişin silahını teslim etmesi için yapılan basınç hâlâ devam ediyor.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    Batı Şeria’da bir değişiklik gözlemlenmedi. Filistin Yönetimi Başkanı Abbas Filistin ulusal meclis ve yasama meclisi seçimlerinin Kasım ayında yapılacağını duyurdu. Tek taraflı alınan bu kararlar Filistin fraksiyonları tarafından eleştirildi.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    Hamas başkanlık seçimini tamamladı ve Halil el-Hayye’yi seçti. Direniş kanadının hâlâ ağırlıkta olduğunu gösteren bu seçim sonucu direniş güçleri tarafından kutlandı.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    Hamas Gazze hükümeti, yapılan ateşkes anlaşması gereği gelmesi beklenen Filistin Yönetim Heyeti’ne sorumlulukların devredilmek üzere istifa ettiğini bildirdi. Bu istifanın, Filistin Yönetim Heyeti’nin Gazze’ye girmesini ve işe başlamasını engelleyen işgal devletinin elindeki bir kozu ya da bahaneyi ortadan kaldırırmaya hizmet ettiği yorum yapıldı. Bu yapılırken yine silahsızlandırma konusunun ancak Filistinlilerden oluşan bir yönetim kurulduktan sonra ve ona devredilmek üzere olacağı teyit edilmiş oldu.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    Belçika ve İrlanda yerleşim bölgeleri üretimi olan ürünlerin boykot edilmesi yasalarını onayladı.
                </p>
                <p style='font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;'>
                    AB parlamentosunda İsrail’e ekonomik yaptırımlar uygulanması yönündeki tavsiye kararının geçmesi Almanya tarafından engellendi.
                </p>
            `
        }
    };

    document.querySelectorAll('.read-author-btn, .btn-read-more, .read-article-link').forEach(btn => {
        btn.addEventListener('click', () => {
            const writerId = btn.getAttribute('data-writer');
            const data = authorArticles[writerId] || {
                author: "Köşe Yazarı",
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
       7. Dijital Filistin Arşivi Search & Tag Filtering
       -------------------------------------------------------------------------- */
    const archiveSearchInput = document.getElementById('archive-search');
    const archiveTagBtns = document.querySelectorAll('.archive-tags .tag-btn');
    const archiveCards = document.querySelectorAll('.archive-card');

    let currentArchiveTag = 'all';

    archiveTagBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            archiveTagBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentArchiveTag = btn.getAttribute('data-archive-tag') || 'all';
            filterArchive();
        });
    });

    archiveSearchInput?.addEventListener('input', filterArchive);

    function filterArchive() {
        const query = (archiveSearchInput?.value || '').toLowerCase().trim();
        archiveCards.forEach(card => {
            const tags = (card.getAttribute('data-tags') || '').split(' ');
            const text = card.innerText.toLowerCase();
            const matchesTag = (currentArchiveTag === 'all' || tags.includes(currentArchiveTag));
            const matchesQuery = (query === '' || text.includes(query));

            if (matchesTag && matchesQuery) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    /* --------------------------------------------------------------------------
       8. BDS Boycott Search Filter
       -------------------------------------------------------------------------- */
    const boycottInput = document.getElementById('boycott-search-input');
    const boycottCards = document.querySelectorAll('.boycott-card');

    boycottInput?.addEventListener('input', () => {
        const query = boycottInput.value.toLowerCase().trim();
        boycottCards.forEach(card => {
            const text = card.innerText.toLowerCase();
            if (query === '' || text.includes(query)) card.style.display = 'flex';
            else card.style.display = 'none';
        });
    });

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
       10. Countdown Timer for Rally
       -------------------------------------------------------------------------- */
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 6);
    targetDate.setHours(14, 0, 0, 0);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        if (distance < 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dElem = document.getElementById('cd-days');
        const hElem = document.getElementById('cd-hours');
        const mElem = document.getElementById('cd-mins');
        const sElem = document.getElementById('cd-secs');

        if (dElem) dElem.innerText = String(days).padStart(2, '0');
        if (hElem) hElem.innerText = String(hours).padStart(2, '0');
        if (mElem) mElem.innerText = String(minutes).padStart(2, '0');
        if (sElem) sElem.innerText = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    /* --------------------------------------------------------------------------
       11. Event & Stand RSVP Form
       -------------------------------------------------------------------------- */
    const rsvpModal = document.getElementById('rsvp-modal');
    const closeRsvpModalBtn = document.getElementById('close-rsvp-modal');
    const rsvpForm = document.getElementById('rsvp-form');

    document.querySelectorAll('.rsvp-btn').forEach(btn => {
        btn.addEventListener('click', () => rsvpModal?.showModal());
    });

    closeRsvpModalBtn?.addEventListener('click', () => rsvpModal?.close());

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
    const closeVicdanFilesModalBtn = document.getElementById('close-vicdan-files-modal');

    closeVicdanFilesModalBtn?.addEventListener('click', () => vicdanFilesModal?.close());
    vicdanFilesModal?.addEventListener('click', (e) => {
        if (e.target === vicdanFilesModal) vicdanFilesModal.close();
    });

    rsvpForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        rsvpModal?.close();
        showToast('Etkinlik / Stant gönüllülük kaydınız başarıyla alındı.');
        rsvpForm.reset();
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
