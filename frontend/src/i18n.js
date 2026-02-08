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
        lng: localStorage.getItem('preferred_language') || 'id',
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        }
    });

export default i18n;
