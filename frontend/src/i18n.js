import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    id: {
        translation: {
            // Navbar
            "nav.home": "HOME",
            "nav.profil": "PROFIL",
            "nav.program": "PROGRAM",
            "nav.galeri": "GALERI",
            "nav.blog": "BLOG",
            "nav.ebook": "E-BOOK",
            "nav.alumni": "ALUMNI",
            "nav.kontak": "KONTAK",
            "nav.masuk": "MASUK",
            "nav.daftar": "DAFTAR",

            // Hero Section
            "hero.tagline": "SOLUSI KARIR JEPANG TERPERCAYA",
            "hero.title": "AYAKA JOSEI CENTER",
            "hero.subtitle": "Lembaga Pelatihan Kerja Jepang Spesialis Putri",
            "hero.cta": "Pelajari Selengkapnya",
            "hero.playVideo": "PLAY VIDEO",

            // Sections
            "section.siapa_kami": "SIAPA KAMI",
            "section.tujuan_kami": "TUJUAN KAMI:",
            "section.program_kami": "PROGRAM KAMI",
            "section.mengapa_jepang": "MENGAPA JEPANG?",
            "section.transparansi": "TRANSPARANSI PROSES",
            "section.cerita_mereka": "CERITA MEREKA",
            "section.edukasi_berita": "EDUKASI & BERITA",
            "section.konsultasi_gratis": "KONSULTASI GRATIS",

            // Buttons & Links
            "btn.detail_program": "Detail Program",
            "btn.baca_selengkapnya": "Baca Selengkapnya",
            "btn.lihat_semua": "Lihat Semua Berita",
            "btn.kirim": "KIRIM KE AYAKA",
            "btn.terkirim": "PESAN TERKIRIM",
            "btn.jelajahi": "JELAJAHI PROGRAM",

            // Program Page Specific
            "program.hero_edition": "PROGRAM EDISI 2026",
            "program.hero_title": "KARIR MASA DEPAN DI JEPANG",
            "program.hero_desc": "Memberdayakan putri Indonesia melalui pelatihan vokasi spesialis dan penempatan langsung di sektor strategis Jepang.",
            "program.placement_rate": "Tingkat Penempatan",
            "program.specializations": "SPESIALISASI KAMI",
            "program.interaction_hint": "Arahkan kursor atau klik untuk detail program",
            "program.explore": "JELAJAHI",
            "program.tasks_label": "LINGKUP TUGAS",
            "program.qual_label": "KUALIFIKASI UTAMA",
            "program.min_req": "PERSYARATAN MINIMUM",

            // Profil Page
            "profil.hero.label": "PROFIL LEMBAGA",
            "profil.hero.title": "Menemani Langkah Menuju Masa Depan Global",
            "profil.hero.lead": "LPK Ayaka Global Indonesia adalah mitra strategis dalam pengembangan kompetensi dan pemberdayaan wanita Indonesia untuk berkarir di kancah internasional.",
            "profil.vision.title": "Visi & Misi Strategis",
            "profil.vision.visi_label": "Visi Kami",
            "profil.vision.misi_label": "Misi Utama",
            "profil.values.title": "Pilar Nilai & Prinsip",
            "profil.values.desc": "Landasan integritas kami dalam mendidik dan membina tunas bangsa.",

            // Alumni Page
            "alumni.hero.badge": "ARSIP KESUKSESAN RESMI",
            "alumni.hero.title": "LINGKARAN HASIL NYATA",
            "alumni.hero.cta": "JELAJAHI CERITA",
            "alumni.hero.join_count": "Gabung 500+ Alumni",
            "alumni.marquee.title": "SUARA DARI REVOLUSI",
            "alumni.bento.tag": "NARASI MENDALAM",
            "alumni.bento.title": "CERITA YANG MEMBENTUK KAMI",
            "alumni.bento.item_tag": "PERJALANAN FITUR",
            "alumni.bento.placeholder_title": "Cerita Anda Bisa Jadi Berikutnya",
            "alumni.bento.placeholder_desc": "Bergabunglah dengan lingkaran dan mulai perjalanan Anda sendiri ke Jepang.",
            "alumni.directory.title": "ARSIP",
            "alumni.footer.archive_series": "SERI ARSIP ALUMNI",

            // Galeri Page
            "galeri.hero.tag": "ARSIP DOKUMENTASI",
            "galeri.hero.title": "CATATAN HIDUP",
            "galeri.filter.label": "FILTER BERDASARKAN KONTEKS",
            "galeri.video.tag": "NARASI VISUAL",
            "galeri.footer.archive_date": "ARSIP AYAKA 2026",

            // Blog Page
            "blog.hero.tag": "PUSAT INTELIJEN RESMI",
            "blog.hero.title": "JURNAL AYAKA",
            "blog.search.placeholder": "Cari topik edukasi...",
            "blog.card.member_only": "KHUSUS MEMBER",
            "blog.empty": "Tidak ada artikel yang ditemukan.",
            "blog.footer.mark": "PROYEK LITERASI AYAKA 2026",

            // New Buttons
            "btn.hubungi_kami": "HUBUNGI KAMI SEKARANG",
            "btn.read_full_story": "BACA CERITA LENGKAP",
            "btn.watch_film": "TONTON FILM",
            "btn.read_article": "BACA ARTIKEL",
            "btn.member_access": "AKSES MEMBER",

            // Program Names & Desc (for Landing)
            "program.kaigo.name": "Nursing Care (Kaigo)",
            "program.nursing.name": "Nursing Care (Kaigo)",
            "program.kaigo.desc": "Pendampingan lansia di fasilitas modern Jepang. Bidang paling stabil dengan prospek karir panjang.",
            "program.fb.name": "Food & Beverage",
            "program.food.name": "Food & Beverage",
            "program.fb.desc": "Pengolahan makanan dan pelayanan restoran dengan standar kebersihan dan keramahan Jepang.",
            "program.industri.name": "Industri Manufaktur",
            "program.manufacturing.name": "Industri Manufaktur",
            "program.industri.desc": "Kesempatan bekerja di lini produksi industri terkemuka dengan teknologi mutakhir.",
            "program.hospitality.name": "Hospitality",
            "program.hospitality.desc": "Layanan perhotelan dan pariwisata untuk Anda yang senang berinteraksi secara internasional.",

            // Footer
            "footer.tagline": "Membantu mewujudkan karir profesional putri Indonesia di Jepang dengan aman, bermartabat, dan terpercaya.",
            "footer.nav": "Navigasi",
            "footer.contact_legal": "Kontak & Legal",
            "footer.all_rights": "Semua hak dilindungi.",

            // Contact Page
            "contact.channel": "CHANNEL KOMUNIKASI RESMI",
            "contact.partnership": "KEMITRAAN & KONSULTASI",
            "contact.info_lembaga": "Informasi Lembaga",
            "contact.alamat": "Alamat Kantor",
            "contact.wa": "WhatsApp Resmi",
            "contact.email": "Email Korespondensi",
            "contact.jam": "Jam Operasional",
            "contact.kirim_pesan": "Kirim Pesan",
            "contact.respon_time": "Tim kami akan merespon dalam 1-2 hari kerja.",
            "contact.nama_lengkap": "Nama Lengkap",
            "contact.placeholder_nama": "Masukkan nama Anda",
            "contact.email_kontak": "Email / Kontak",
            "contact.placeholder_email": "Email atau No. HP",
            "contact.subjek": "Subjek",
            "contact.pilih_subjek": "Pilih Subjek",
            "contact.subjek_konsul": "Konsultasi Program",
            "contact.subjek_daftar": "Pendaftaran",
            "contact.subjek_umum": "Informasi Umum",
            "contact.pesan": "Pesan",
            "contact.placeholder_pesan": "Bagaimana kami bisa membantu Anda?",

            // Blog & Blog Detail
            "blog.back": "KEMBALI KE JOURNAL",
            "blog.official": "OFFICIAL AYAKA",
            "blog.views": "Views",
            "blog.member_content": "Konten Terbatas",
            "blog.member_desc": "Artikel ini khusus untuk Member Active Ayaka Josei Center. Silakan login untuk membaca konten lengkap.",
            "blog.share": "BAGIKAN ARTIKEL:",
            "blog.simak_lain": "SIMAK ARTIKEL LAINNYA",
            "blog.info_resmi": "INFORMASI RESMI",
            "blog.retrieving": "Retrieving Records...",

            "splash.status": "Mempersiapkan Masa Depan Anda...",
            // Floating Badge
            "badge.trusted": "AYAKA JOSEI CENTER • TRUSTED LPK JAPAN •"
        }
    },
    en: {
        translation: {
            "nav.home": "HOME",
            "nav.profil": "PROFILE",
            "nav.program": "PROGRAM",
            "nav.galeri": "GALLERY",
            "nav.blog": "BLOG",
            "nav.ebook": "E-BOOK",
            "nav.alumni": "ALUMNI",
            "nav.kontak": "CONTACT",
            "nav.masuk": "LOGIN",
            "nav.daftar": "REGISTER",

            "hero.tagline": "TRUSTED JAPAN CAREER SOLUTION",
            "hero.title": "AYAKA JOSEI CENTER",
            "hero.subtitle": "Japanese Work Training Institute for Women",
            "hero.cta": "Learn More",
            "hero.playVideo": "PLAY VIDEO",

            "section.siapa_kami": "WHO WE ARE",
            "section.tujuan_kami": "OUR GOAL:",
            "section.program_kami": "OUR PROGRAMS",
            "section.mengapa_jepang": "WHY JAPAN?",
            "section.transparansi": "PROCESS TRANSPARENCY",
            "section.cerita_mereka": "THEIR STORIES",
            "section.edukasi_berita": "EDUCATION & NEWS",
            "section.konsultasi_gratis": "FREE CONSULTATION",

            "btn.detail_program": "Program Details",
            "btn.baca_selengkapnya": "Read More",
            "btn.lihat_semua": "View All News",
            "btn.kirim": "SEND TO AYAKA",
            "btn.terkirim": "MESSAGE SENT",
            "btn.jelajahi": "EXPLORE PROGRAMS",

            // Program Page Specific
            "program.hero_edition": "PROGRAM 2026 EDITION",
            "program.hero_title": "FUTURE CAREERS IN JAPAN",
            "program.hero_desc": "Empowering Indonesian women through specialized vocational training and direct placement in Japan's most strategic sectors.",
            "program.placement_rate": "Placement Rate",
            "program.specializations": "OUR SPECIALIZATIONS",
            "program.interaction_hint": "Hover or click for program details",
            "program.explore": "EXPLORE",
            "program.tasks_label": "SCOPE OF WORK",
            "program.qual_label": "KEY QUALIFICATIONS",
            "program.min_req": "MINIMUM REQUIREMENTS",

            // Profil Page
            "profil.hero.label": "INSTITUTIONAL PROFILE",
            "profil.hero.title": "Accompanying Steps Towards a Global Future",
            "profil.hero.lead": "LPK Ayaka Global Indonesia is a strategic partner in competence development and empowerment of Indonesian women for international careers.",
            "profil.vision.title": "Strategic Vision & Mission",
            "profil.vision.visi_label": "Our Vision",
            "profil.vision.misi_label": "Main Mission",
            "profil.values.title": "Value Pillars & Principles",
            "profil.values.desc": "Our foundation of integrity in educating and nurturing the nation's youth.",

            // Alumni Page
            "alumni.hero.badge": "OFFICIAL SUCCESS ARCHIVE",
            "alumni.hero.title": "THE CIRCLE OF RESULTS",
            "alumni.hero.cta": "EXPLORE STORIES",
            "alumni.hero.join_count": "Join 500+ Alumni",
            "alumni.marquee.title": "VOICES OF THE REVOLUTION",
            "alumni.bento.tag": "DEEP NARRATIVES",
            "alumni.bento.title": "STORIES THAT DEFINED US",
            "alumni.bento.item_tag": "FEATURE JOURNEY",
            "alumni.bento.placeholder_title": "Your Story Could Be Next",
            "alumni.bento.placeholder_desc": "Join the circle and start your own journey to Japan.",
            "alumni.directory.title": "THE ARCHIVE",
            "alumni.footer.archive_series": "ALUMNI ARCHIVE SERIES",

            // Galeri Page
            "galeri.hero.tag": "DOCUMENTATION ARCHIVE",
            "galeri.hero.title": "THE LIVING RECORD",
            "galeri.filter.label": "FILTER BY CONTEXT",
            "galeri.video.tag": "VISUAL NARRATIVE",
            "galeri.footer.archive_date": "AYAKA ARCHIVE 2026",

            // Blog Page
            "blog.hero.tag": "OFFICIAL INTELLIGENCE HUB",
            "blog.hero.title": "AYAKA JOURNAL",
            "blog.search.placeholder": "Search education topics...",
            "blog.card.member_only": "MEMBER ONLY",
            "blog.empty": "No articles found.",
            "blog.footer.mark": "AYAKA LITERACY PROJECT 2026",

            // New Buttons
            "btn.hubungi_kami": "CONTACT US NOW",
            "btn.read_full_story": "READ FULL STORY",
            "btn.watch_film": "WATCH FILM",
            "btn.read_article": "READ ARTICLE",
            "btn.member_access": "MEMBER ACCESS",

            "program.kaigo.name": "Nursing Care (Kaigo)",
            "program.nursing.name": "Nursing Care (Kaigo)",
            "program.kaigo.desc": "Elderly care in modern Japanese facilities. Most stable field with long-term career prospects.",
            "program.fb.name": "Food & Beverage",
            "program.food.name": "Food & Beverage",
            "program.fb.desc": "Food processing and restaurant services with Japanese standards of cleanliness and hospitality.",
            "program.industri.name": "Industrial Manufacturing",
            "program.manufacturing.name": "Industrial Manufacturing",
            "program.industri.desc": "Opportunities to work on leading industrial production lines with cutting-edge technology.",
            "program.hospitality.name": "Hospitality",
            "program.hospitality.desc": "Hotel and tourism services for those who enjoy international interaction.",

            "footer.tagline": "Helping empower Indonesian women careers in Japan safely, with dignity, and trust.",
            "footer.nav": "Navigation",
            "footer.contact_legal": "Contact & Legal",
            "footer.all_rights": "All rights reserved.",

            "contact.channel": "OFFICIAL COMMUNICATION CHANNEL",
            "contact.partnership": "PARTNERSHIP & CONSULTANCY",
            "contact.info_lembaga": "Institute Information",
            "contact.alamat": "Office Address",
            "contact.wa": "Official WhatsApp",
            "contact.email": "Correspondence Email",
            "contact.jam": "Operational Hours",
            "contact.kirim_pesan": "Send Message",
            "contact.respon_time": "Our team will respond within 1-2 business days.",
            "contact.nama_lengkap": "Full Name",
            "contact.placeholder_nama": "Enter your name",
            "contact.email_kontak": "Email / Contact",
            "contact.placeholder_email": "Email or Phone Number",
            "contact.subjek": "Subject",
            "contact.pilih_subjek": "Select Subject",
            "contact.subjek_konsul": "Program Consultation",
            "contact.subjek_daftar": "Registration",
            "contact.subjek_umum": "General Information",
            "contact.pesan": "Message",
            "contact.placeholder_pesan": "How can we help you?",

            "badge.trusted": "AYAKA JOSEI CENTER • TRUSTED LPK JAPAN •"
        }
    },
    ar: {
        translation: {
            "nav.home": "الرئيسية",
            "nav.profil": "الملف الشخصي",
            "nav.program": "البرنامج",
            "nav.galeri": "المعرض",
            "nav.blog": "المدونة",
            "nav.ebook": "كتاب إلكتروني",
            "nav.alumni": "الخريجون",
            "nav.kontak": "اتصل",
            "nav.masuk": "تسجيل الدخول",
            "nav.daftar": "يسجل",

            "hero.tagline": "حل موثوق للعمل في اليابان",
            "hero.title": "مركز أياكا جوسي",
            "hero.subtitle": "معهد تدريب العمل الياباني للنساء",
            "hero.cta": "اعرف المزيد",
            "hero.playVideo": "تشغيل الفيديو",

            "section.siapa_kami": "من نحن",
            "section.tujuan_kami": "هدفنا:",
            "section.program_kami": "برامجنا",
            "section.mengapa_jepang": "لماذا اليابان؟",
            "section.transparansi": "شفافية العملية",
            "section.cerita_mereka": "قصصهم",
            "section.edukasi_berita": "التعليم والأخبار",
            "section.konsultasi_gratis": "استشارة مجانية",

            "btn.detail_program": "تفاصيل البرنامج",
            "btn.baca_selengkapnya": "اقرأ أكثر",
            "btn.lihat_semua": "عرض جميع الأخبار",
            "btn.kirim": "إرسال إلى أياكا",
            "btn.terkirim": "تم إرسال الرسالة",
            "btn.jelajahi": "استكشاف البرامج",

            // Program Page Specific
            "program.hero_edition": "إصدار برنامج 2026",
            "program.hero_title": "وظائف المستقبل في اليابان",
            "program.hero_desc": "تمكين المرأة الإندونيسية من خلال التدريب المهني المتخصص والتوظيف المباشر في القطاعات الأكثر استراتيجية في اليابان.",
            "program.placement_rate": "معدل التوظيف",
            "program.specializations": "تخصصاتنا",
            "program.interaction_hint": "مرر الماوس أو انقر للحصول على تفاصيل البرنامج",
            "program.explore": "استكشف",
            "program.tasks_label": "نطاق العمل",
            "program.qual_label": "المؤهلات الرئيسية",
            "program.min_req": "الحد الأدنى من المتطلبات",

            // Profil Page
            "profil.hero.label": "ملف تعريف المعهد",
            "profil.hero.title": "مرافق الخطوات نحو مستقبل عالمي",
            "profil.hero.lead": "LPK Ayaka Global Indonesia شريك استراتيجي في تطوير الكفاءات وتمكين المرأة الإندونيسية للعمل دولياً.",
            "profil.vision.title": "الرؤية والرسالة الاستراتيجية",
            "profil.vision.visi_label": "رؤيتنا",
            "profil.vision.misi_label": "المهمة الرئيسية",
            "profil.values.title": "ركائز القيم والمبادئ",
            "profil.values.desc": "أساس نزاهتنا في تعليم وتنشئة شباب الأمة.",

            // Alumni Page
            "alumni.hero.badge": "أرشيف النجاح الرسمي",
            "alumni.hero.title": "دائرة النتائج الحقيقية",
            "alumni.hero.cta": "استكشاف القصص",
            "alumni.hero.join_count": "انضم إلى 500+ خريج",
            "alumni.marquee.title": "أصوات الثورة",
            "alumni.bento.tag": "روايات عميقة",
            "alumni.bento.title": "القصص التي حددت من نحن",
            "alumni.bento.item_tag": "رحلة المميزة",
            "alumni.bento.placeholder_title": "قصتك يمكن أن تكون التالية",
            "alumni.bento.placeholder_desc": "انضم إلى الدائرة وابدأ رحلتك الخاصة إلى اليابان.",
            "alumni.directory.title": "الأرشيف",
            "alumni.footer.archive_series": "سلسلة أرشيف الخريجين",

            // Galeri Page
            "galeri.hero.tag": "أرشيف التوثيق",
            "galeri.hero.title": "السجل الحي",
            "galeri.filter.label": "تصفية حسب السياق",
            "galeri.video.tag": "رواية بصرية",
            "galeri.footer.archive_date": "أرشيف أياكا 2026",

            // Blog Page
            "blog.hero.tag": "مركز الاستخبارات الرسمي",
            "blog.hero.title": "مجلة أياكا",
            "blog.search.placeholder": "البحث عن مواضيع تعليمية...",
            "blog.card.member_only": "للأعضاء فقط",
            "blog.empty": "لم يتم العثور على مقالات.",
            "blog.footer.mark": "مشروع أياكا لمحو الأمية 2026",

            // New Buttons
            "btn.hubungi_kami": "اتصل بنا الآن",
            "btn.read_full_story": "اقرأ القصة كاملة",
            "btn.watch_film": "شاهد الفيلم",
            "btn.read_article": "اقرأ المقال",
            "btn.member_access": "دخول الأعضاء",

            "program.kaigo.name": "الرعاية التمريضية (كايغو)",
            "program.nursing.name": "الرعاية التمريضية (كايغو)",
            "program.kaigo.desc": "رعاية المسنين في المرافق اليابانية الحديثة. المجال الأكثر استقراراً مع آفاق وظيفية طويلة المدى.",
            "program.fb.name": "الأغذية والمشروبات",
            "program.food.name": "الأغذية والمشروبات",
            "program.fb.desc": "تجهيز الأغذية وخدمات المطاعم بمعايير يابانية من النظافة والضيافة.",
            "program.industri.name": "التصنيع الصناعي",
            "program.manufacturing.name": "التصنيع الصناعي",
            "program.industri.desc": "فرص للعمل في خطوط الإنتاج الصناعية الرائدة بتقنيات متطورة.",
            "program.hospitality.name": "الضيافة",
            "program.hospitality.desc": "خدمات فندقية وسياحية لمن يحبون التفاعل الدولي.",

            "footer.tagline": "نساعد في تمكين المسيرة المهنية للمرأة الإندونيسية في اليابان بأمان وكرامة وثقة.",
            "footer.nav": "الملاحة",
            "footer.contact_legal": "الاتصال والقانوني",
            "footer.all_rights": "كل الحقوق محفوظة.",

            "contact.channel": "قناة الاتصال الرسمية",
            "contact.partnership": "الشراكة والاستشارات",
            "contact.info_lembaga": "معلومات المعهد",
            "contact.alamat": "عنوان المكتب",
            "contact.wa": "واتساب الرسمي",
            "contact.email": "البريد الإلكتروني للمراسلات",
            "contact.jam": "ساعات العمل",
            "contact.kirim_pesan": "إرسال رسالة",
            "contact.respon_time": "سيرد فريقنا في غضون 1-2 أيام عمل.",
            "contact.nama_lengkap": "الاسم الكامل",
            "contact.placeholder_nama": "أدخل اسمك",
            "contact.email_kontak": "البريد / الاتصال",
            "contact.placeholder_email": "البريد الإلكتروني أو رقم الهاتف",
            "contact.subjek": "الموضوع",
            "contact.pilih_subjek": "اختر الموضوع",
            "contact.subjek_konsul": "استشارة البرامج",
            "contact.subjek_daftar": "التسجيل",
            "contact.subjek_umum": "معلومات عامة",
            "contact.pesan": "الرسالة",
            "contact.placeholder_pesan": "كيف يمكننا مساعدتك؟",

            // Blog & Blog Detail
            "blog.back": "العودة إلى المجلة",
            "blog.official": "أياكا الرسمي",
            "blog.views": "المشاهدات",
            "blog.member_content": "محتوى مقيد",
            "blog.member_desc": "هذا المقال حصري لأعضاء مركز أياكا جوسي النشطين. يرجى تسجيل الدخول لقراءة المحتوى الكامل.",
            "blog.share": "شارك المقال:",
            "blog.simak_lain": "اقرأ مقالات أخرى",
            "blog.info_resmi": "معلومات رسمية",
            "blog.retrieving": "جاري استرداد السجلات...",

            "splash.status": "تجهيز مستقبلك...",
            "badge.trusted": "مركز أياكا جوسي • معهد موثوق •"
        }
    },
    zh: {
        translation: {
            "nav.home": "首页",
            "nav.profil": "简介",
            "nav.program": "项目",
            "nav.galeri": "画廊",
            "nav.blog": "博客",
            "nav.ebook": "电子书",
            "nav.alumni": "校友",
            "nav.kontak": "联系",
            "nav.masuk": "登录",
            "nav.daftar": "注册",

            "hero.tagline": "值得信赖的日本职业解决方案",
            "hero.title": "AYAKA JOSEI CENTER",
            "hero.subtitle": "日本女性工作培训机构",
            "hero.cta": "了解更多",
            "hero.playVideo": "播放视频",

            "badge.trusted": "AYAKA JOSEI CENTER • 值得信赖的日本培训机构 •"
        }
    },
    fr: {
        translation: {
            "nav.home": "ACCUEIL",
            "nav.profil": "PROFIL",
            "nav.program": "PROGRAMME",
            "nav.galeri": "GALERIE",
            "nav.blog": "BLOG",
            "nav.ebook": "E-BOOK",
            "nav.alumni": "ANCIENS",
            "nav.kontak": "CONTACT",
            "nav.masuk": "CONNEXION",
            "nav.daftar": "S'INSCRIRE",

            "hero.tagline": "SOLUTION DE CARRIÈRE JAPONAISE DE CONFIANCE",
            "hero.title": "AYAKA JOSEI CENTER",
            "hero.subtitle": "Institut de Formation au Travail Japonais pour Femmes",
            "hero.cta": "En Savoir Plus",
            "hero.playVideo": "LIRE LA VIDÉO",

            "badge.trusted": "AYAKA JOSEI CENTER • INSTITUT DE CONFIANCE •"
        }
    },
    de: {
        translation: {
            "nav.home": "STARTSEITE",
            "nav.profil": "PROFIL",
            "nav.program": "PROGRAMM",
            "nav.galeri": "GALERIE",
            "nav.blog": "BLOG",
            "nav.ebook": "E-BOOK",
            "nav.alumni": "ALUMNI",
            "nav.kontak": "KONTAKT",
            "nav.masuk": "ANMELDEN",
            "nav.daftar": "REGISTRIEREN",

            "hero.tagline": "VERTRAUENSWÜRDIGE JAPAN-KARRIERELÖSUNG",
            "hero.title": "AYAKA JOSEI CENTER",
            "hero.subtitle": "Japanisches Arbeitstrainingsinstitut für Frauen",
            "hero.cta": "Mehr Erfahren",
            "hero.playVideo": "VIDEO ABSPIELEN",

            "badge.trusted": "AYAKA JOSEI CENTER • VERTRAUENSWÜRDIGES INSTITUT •"
        }
    },
    ko: {
        translation: {
            "nav.home": "홈",
            "nav.profil": "프로필",
            "nav.program": "프로그램",
            "nav.galeri": "갤러리",
            "nav.blog": "블로그",
            "nav.ebook": "전자책",
            "nav.alumni": "동문",
            "nav.kontak": "연락처",
            "nav.masuk": "로그인",
            "nav.daftar": "등록",

            "hero.tagline": "신뢰할 수 있는 일본 취업 솔루션",
            "hero.title": "아야카 조세이 센터",
            "hero.subtitle": "여성을 위한 일본 직업 훈련 기관",
            "hero.cta": "더 알아보기",
            "hero.playVideo": "비디오 재생",

            "badge.trusted": "아야카 조세이 센터 • 신뢰할 수 있는 기관 •"
        }
    },
    es: {
        translation: {
            "nav.home": "INICIO",
            "nav.profil": "PERFIL",
            "nav.program": "PROGRAMA",
            "nav.galeri": "GALERÍA",
            "nav.blog": "BLOG",
            "nav.ebook": "E-BOOK",
            "nav.alumni": "ALUMNI",
            "nav.kontak": "CONTACTO",
            "nav.masuk": "INICIAR SESIÓN",
            "nav.daftar": "REGISTRARSE",

            "hero.tagline": "SOLUCIÓN DE CARRERA JAPONESA DE CONFIANZA",
            "hero.title": "AYAKA JOSEI CENTER",
            "hero.subtitle": "Instituto de Formación Laboral Japonés para Mujeres",
            "hero.cta": "Saber Más",
            "hero.playVideo": "REPRODUCIR VIDEO",

            "badge.trusted": "AYAKA JOSEI CENTER • INSTITUTO DE CONFIANZA •"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'id',
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'preferred_language',
            caches: ['localStorage']
        }
    });

export default i18n;
