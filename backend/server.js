const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.JWT_SECRET || 'ayaka_secret_key_2026';

app.use(cors());
app.use(express.json());

// Database Initialization
const db = new sqlite3.Database('./ayaka.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to the Ayaka database.');
});

const initDb = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Users Table
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT,
                role TEXT
            )`);

            // Content Table
            db.run(`CREATE TABLE IF NOT EXISTS content (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                section_name TEXT UNIQUE,
                content_data TEXT,
                is_visible INTEGER DEFAULT 1,
                sort_order INTEGER DEFAULT 0
            )`, (err) => {
                if (err) return reject(err);

                // Default Sections to match the 9-section structure
                const sections = [
                    ['home', JSON.stringify({
                        title: 'AYAKA JOSEI CENTER',
                        subtitle: 'Lembaga Pelatihan Kerja Jepang Spesialis Putri',
                        description: 'Memberdayakan perempuan Indonesia melalui pelatihan profesional dan penempatan kerja aman di Jepang.',
                        buttonText: 'Pelajari Selengkapnya',
                        isVisible: true
                    })],
                    ['profil', JSON.stringify({
                        title: 'Profil Perusahaan',
                        tagline: 'Membangun Karir, Meraih Masa Depan',
                        text: 'Ayaka Josei Center hadir sebagai jembatan bagi putri Indonesia untuk meraih impian berkarir di Jepang. Fokus kami adalah pendampingan intensif mulai dari bahasa, budaya, hingga kesiapan fisik dan mental.',
                        objective: 'Menjadi partner terpercaya dalam penempatan tenaga kerja perempuan yang kompeten dan bermartabat.',
                        isVisible: true
                    })],
                    ['program', JSON.stringify({
                        title: 'Program & Peluang Kerja',
                        items: [
                            { name: 'Nursing Care (Kaigo)', desc: 'Pendampingan lansia di fasilitas modern Jepang. Bidang paling stabil dengan prospek karir panjang.' },
                            { name: 'Food & Beverage', desc: 'Pengolahan makanan dan pelayanan restoran dengan standar kebersihan dan keramahan Jepang.' },
                            { name: 'Industri Manufaktur', desc: 'Kesempatan bekerja di lini produksi industri terkemuka dengan teknologi mutakhir.' },
                            { name: 'Hospitality', desc: 'Layanan perhotelan dan pariwisata untuk Anda yang senang berinteraksi secara internasional.' }
                        ],
                        isVisible: true
                    })],
                    ['manfaat', JSON.stringify({
                        title: 'Manfaat Mengikuti Program',
                        items: [
                            { title: 'Penghasilan Standar Jepang', desc: 'Gaji kompetitif yang memungkinkan Anda untuk menabung dan membantu keluarga.' },
                            { title: 'Fasilitas & Asuransi', desc: 'Jaminan kesehatan, asuransi kecelakaan kerja, dan tempat tinggal yang layak.' },
                            { title: 'Pengalaman Global', desc: 'Membangun etos kerja dan kemandirian di salah satu negara termahal di dunia.' },
                            { title: 'Cuti & Waktu Istirahat', desc: 'Sistem kerja yang teratur dengan hak cuti tahunan sesuai regulasi Jepang.' }
                        ],
                        isVisible: true
                    })],
                    ['alur', JSON.stringify({
                        title: 'Alur Program Kami',
                        steps: [
                            { title: 'Pendaftaran', desc: 'Seleksi berkas dan administrasi awal.' },
                            { title: 'Pelatihan', desc: 'Belajar bahasa Jepang (N4/N3) dan skill teknis.' },
                            { title: 'Seleksi User', desc: 'Wawancara langsung dengan perusahaan dari Jepang.' },
                            { title: 'Pemberangkatan', desc: 'Pengurusan visa dan keberangkatan ke Jepang.' },
                            { title: 'Pendampingan', desc: 'Kami tetap memantau kondisi Anda selama di Jepang.' }
                        ],
                        isVisible: true
                    })],
                    ['alumni', JSON.stringify({
                        title: 'Alumni & Cerita Sukses',
                        items: [
                            { name: 'Siti Aminah', quote: 'Sangat terbantu sejak pendaftaran hingga terbang ke Tokyo. Sekarang saya bekerja di fasilitas lansia Prefektur Chiba.' },
                            { name: 'Lani Wijaya', quote: 'Materi pelatihannya sangat relevan. Saya merasa lebih siap menghadapi budaya kerja Jepang yang disiplin.' }
                        ],
                        isVisible: true
                    })],
                    ['blog', JSON.stringify({
                        title: 'Informasi & Edukasi',
                        posts: [
                            { title: 'Pentingnya Sertifikat JLPT untuk Karir', date: '2026-02-07' },
                            { title: 'Mengenal Budaya Omotenashi di Jepang', date: '2026-02-06' },
                            { title: 'Langkah Awal Menabung untuk Kerja ke Jepang', date: '2026-02-05' }
                        ],
                        isVisible: true
                    })],
                    ['cta', JSON.stringify({
                        title: 'Siap Memulai Langkah Anda?',
                        subtitle: 'Dapatkan konsultasi gratis dan bimbingan langsung dari tim ahli kami.',
                        buttonPrimary: 'Daftar Sekarang',
                        buttonSecondary: 'Konsultasi WhatsApp',
                        isVisible: true
                    })],
                    ['kontak', JSON.stringify({
                        email: 'official@ayakacenter.id',
                        phone: '0815 4200 7626',
                        address: 'Remame, Jl. Magelang - Yogyakarta, Jl. Remame No.km 19.5, RT.002/RW.13, Jumoyo, Kec. Salam, Kabupaten Magelang, Jawa Tengah 56172',
                        legal: 'PT Ayaka Global Indonesia • Izin SO No. 123/2026',
                        isVisible: true
                    })],
                    ['profil_halaman', JSON.stringify({
                        pengantar: {
                            title: 'Pengantar Profil',
                            content: 'Ayaka Josei Center (AJC) adalah lembaga pelatihan kerja (LPK) yang berdedikasi khusus untuk mempersiapkan dan memberdayakan perempuan Indonesia dalam meraih karir profesional di Jepang. Melalui pendekatan yang humanis dan terstandarisasi, kami berkomitmen menjadi jembatan yang aman bagi mereka yang ingin memperluas pengalaman kerja di tingkat internasional.'
                        },
                        latarBelakang: {
                            title: 'Latar Belakang',
                            content: 'Didirikan atas dasar kesadaran akan tingginya permintaan tenaga kerja profesional di Jepang serta pentingnya perlindungan dan kesiapan mental bagi Pekerja Migran Indonesia (PMI), khususnya perempuan. Kami percaya bahwa dengan pembekalan yang tepat, perempuan Indonesia mampu bersaing secara global sambil tetap terlindungi hak dan martabatnya.'
                        },
                        visi: {
                            title: 'Visi Kami',
                            content: 'Menjadi lembaga pelatihan kerja perempuan yang paling terpercaya, profesional, dan berkualitas dalam mencetak tenaga kerja handal yang siap berkontribusi di pasar kerja Jepang.'
                        },
                        misi: {
                            title: 'Misi Kami',
                            items: [
                                'Menyelenggarakan pelatihan bahasa dan budaya Jepang secara intensif dan efektif.',
                                'Membekali keterampilan teknis sesuai dengan standar permintaan industri di Jepang.',
                                'Membangun karakter pekerja yang disiplin, mandiri, dan berintegritas.',
                                'Memberikan pendampingan menyeluruh mulai dari pendaftaran hingga pasca-penempatan.'
                            ]
                        },
                        nilai: {
                            title: 'Nilai & Prinsip',
                            items: [
                                { label: 'Profesional', desc: 'Menjalankan standar pelatihan dan manajemen yang tinggi.' },
                                { label: 'Aman', desc: 'Menjamin proses legalitas dan keselamatan seluruh administrasi.' },
                                { label: 'Bertanggung Jawab', desc: 'Berkomitmen pada hasil pelatihan dan kesejahteraan peserta.' },
                                { label: 'Pendampingan', desc: 'Memberikan dukungan berkelanjutan bagi peserta dan keluarga.' }
                            ]
                        },
                        fokus: {
                            title: 'Fokus Program',
                            content: 'Fokus utama Ayaka Josei Center adalah pada pemberdayaan perempuan dalam program Specified Skilled Worker (SSW/Tokutei Ginou) dan Technical Intern Training Program (TITP) untuk berbagai sektor strategis di Jepang.'
                        },
                        legalitas: {
                            title: 'Legalitas & Afiliasi',
                            content: 'Ayaka Josei Center dikelola secara profesional di bawah naungan PT Ayaka Global Indonesia dan telah memiliki izin resmi sebagai Lembaga Pelatihan Kerja dengan fokus penempatan luar negeri sesuai regulasi yang berlaku.'
                        },
                        penutup: {
                            title: 'Komitmen Kami',
                            content: 'Kami percaya setiap perempuan memiliki potensi besar untuk sukses di panggung global. Ayaka Josei Center hadir untuk memastikan potensi tersebut tersalurkan dengan cara yang benar, aman, dan bermartabat. Mari melangkah menuju masa depan yang lebih cerah bersama kami.'
                        },
                        isVisible: true
                    })],
                    ['program_halaman', JSON.stringify({
                        pengantar: {
                            title: 'Pengantar Program',
                            content: 'Ayaka Josei Center menyediakan berbagai pilihan bidang program kerja ke Jepang yang dirancang khusus untuk memberdayakan perempuan Indonesia. Setiap program melalui proses seleksi yang ketat dan pelatihan komprehensif untuk memastikan setiap peserta siap secara profesional, mental, dan kultural sebelum diberangkatkan.',
                        },
                        daftarProgram: {
                            title: 'Bidang Program Utama',
                            items: [
                                {
                                    id: 'kaigo',
                                    name: 'Program Kaigo (Perawatan Lansia)',
                                    desc: 'Pekerjaan mulia yang berfokus pada pelayanan dan perawatan lansia di fasilitas kesehatan atau rumah perawatan (panti werda).',
                                    tasks: 'Membantu aktivitas harian (makan, mandi, mobilisasi), pemantauan kesehatan dasar, dan interaksi sosial dengan lansia.',
                                    qualifications: 'Memiliki empati tinggi, sabar, latar belakang pendidikan kesehatan (lebih diutamakan), dan lulus sertifikasi bahasa Jepang & skill Kaigo.'
                                },
                                {
                                    id: 'industri',
                                    name: 'Program Industri',
                                    desc: 'Pekerjaan di sektor manufaktur dan produksi yang membutuhkan ketelitian dan kedisiplinan tinggi.',
                                    tasks: 'Perakitan komponen elektronik, pengemasan produk, kontrol kualitas (QC), dan manajemen operasional mesin produksi.',
                                    conditions: 'Bekerja dalam sistem shift, lingkungan kerja bersih dan terstandarisasi, dengan penekanan pada keselamatan kerja (Anzen).'
                                },
                                {
                                    id: 'hospitality',
                                    name: 'Program Hospitality',
                                    desc: 'Bekerja di industri perhotelan dan layanan yang mengedepankan budaya Omotenashi (pelayanan sepenuh hati).',
                                    tasks: 'Front office, pelayanan tamu, housekeeping, dan manajemen operasional hotel atau penginapan tradisional Jepang (Ryokan).',
                                    focus: 'Sangat menekankan pada penguasaan bahasa Jepang yang halus (Keigo) dan pemahaman budaya pelayanan Jepang.'
                                },
                                {
                                    id: 'fb',
                                    name: 'Program Food & Beverage (F&B)',
                                    desc: 'Berkarier di sektor kuliner, mulai dari persiapan makanan hingga pelayanan pelanggan di restoran berstandar internasional.',
                                    tasks: 'Pengolahan makanan (cooking helper), penyajian makanan (serving), kasir, dan manajemen kebersihan dapur serta area restoran.',
                                    focus: 'Membutuhkan stamina yang baik dan kemampuan bekerja sama dalam tim di lingkungan yang dinamis.'
                                }
                            ],
                            disclaimer: 'Semua program bersifat informatif dan tidak menjanjikan kepastian penempatan otomatis.'
                        },
                        persyaratan: {
                            title: 'Persyaratan Umum Peserta',
                            items: [
                                'Jenis Kelamin: Perempuan',
                                'Usia: 18 - 30 tahun (sesuai ketentuan program spesifik)',
                                'Pendidikan Minimal: SMK/SMA sederajat atau Diploma/Sarjana (tergantung bidang)',
                                'Kesehatan: Sehat jasmani dan rohani, tidak memiliki riwayat penyakit kronis',
                                'Komitmen: Bersedia mengikuti pelatihan intensif bahasa dan budaya selama 4-6 bulan'
                            ]
                        },
                        fasilitas: {
                            title: 'Fasilitas & Pembekalan',
                            items: [
                                { label: 'Pelatihan Intensif', desc: 'Kelas bahasa Jepang tingkat dasar hingga standar kerja (N4/N3).' },
                                { label: 'Budaya Kerja', desc: 'Pembekalan etika kerja Jepang (Aisatsu, Hourensou, 5S).' },
                                { label: 'Persiapan Mental', desc: 'Pelatihan karakter dan kemandirian untuk hidup di luar negeri.' },
                                { label: 'Pendampingan', desc: 'Bantuan pengurusan dokumen, kontrak, hingga keberangkatan.' }
                            ]
                        },
                        sistemSeleksi: {
                            title: 'Sistem Seleksi Peserta',
                            content: 'Setiap calon peserta akan melalui tahapan seleksi transparan yang meliputi tes kesehatan awal, tes akademik/bahasa, wawancara internal, hingga wawancara akhir dengan pihak pengguna (User) di Jepang. Seleksi ini bertujuan untuk menjamin kualitas dan kecocokan peserta dengan standar industri Jepang.',
                            note: 'Tidak semua peserta yang mendaftar otomatis lolos; kelulusan didasarkan pada kompetensi dan hasil seleksi.'
                        },
                        alurSingkat: {
                            title: 'Alur Cepat Program',
                            steps: [
                                { num: '01', title: 'Pendaftaran', desc: 'Registrasi dan verifikasi dokumen awal.' },
                                { num: '02', title: 'Pelatihan', desc: 'Program bahasa dan pembekalan skill.' },
                                { num: '03', title: 'Seleksi', desc: 'Wawancara dengan User / Perusahaan Jepang.' },
                                { num: '04', title: 'Pemberangkatan', desc: 'Proses Visa dan terbang ke Jepang.' },
                                { num: '05', title: 'Pendampingan', desc: 'Monitoring dan dukungan selama di Jepang.' }
                            ]
                        },
                        disclaimerLegal: {
                            title: 'Catatan & Disclaimer',
                            content: 'Ayaka Josei Center beroperasi sesuai dengan regulasi penempatan tenaga kerja luar negeri yang berlaku. Kami berperan sebagai lembaga pelatihan dan pendampingan resmi. Hasil akhir seleksi sepenuhnya bergantung pada kesiapan peserta, hasil wawancara user, dan kuota regulatif yang tersedia.',
                            importance: 'Keamanan dan legalitas adalah prioritas utama kami.'
                        },
                        ajakanKonsultasi: {
                            title: 'Konsultasi Program Gratis',
                            content: 'Ingin tahu program mana yang paling cocok dengan impian Anda? Jangan ragu untuk berdiskusi dengan tim ahli kami.',
                            cta: 'Tanya Konsultan Ayaka'
                        },
                        isVisible: true
                    })],
                    ['galeri_halaman', JSON.stringify({
                        pengantar: {
                            title: 'Dokumentasi & Galeri Kegiatan',
                            content: 'Halaman ini merupakan jendela transparan yang menampilkan bukti nyata aktivitas di Ayaka Josei Center. Kami percaya bahwa dokumentasi bukan sekadar promosi, melainkan jejak dedikasi kami dalam membina dan mempersiapkan masa depan perempuan Indonesia.'
                        },
                        kategori: [
                            { id: 'all', label: 'Semua Dokumentasi' },
                            { id: 'pelatihan', label: 'Pelatihan Skill' },
                            { id: 'bahasa', label: 'Kelas Bahasa Jepang' },
                            { id: 'pembinaan', label: 'Pembinaan Karakter' },
                            { id: 'persiapan', label: 'Persiapan Keberangkatan' }
                        ],
                        foto: [
                            { id: 1, category: 'bahasa', title: 'Belajar Hiragana & Katakana', desc: 'Sesi intensif pemahaman aksara dasar bagi calon peserta program Kaigo.', url: '/assets/hero-bg.png' },
                            { id: 2, category: 'pelatihan', title: 'Simulasi Perawatan Lansia', desc: 'Praktek penggunaan alat bantu medis sesuai standar fasilitas kesehatan Jepang.', url: '/assets/hero-bg.png' },
                            { id: 3, category: 'pembinaan', title: 'Sesi Orientasi Budaya', desc: 'Pembekalan etika kerja dan pengenalan budaya Omotenashi.', url: '/assets/hero-bg.png' },
                            { id: 4, category: 'persiapan', title: 'Pelepasan Batch Ke-12', desc: 'Momen penuh haru pelepasan putri-putri Indonesia menuju Jepang.', url: '/assets/hero-bg.png' },
                            { id: 5, category: 'pelatihan', title: 'Work-Based Discipline', desc: 'Latihan kedisiplinan dan manajemen waktu standar industri manufaktur.', url: '/assets/hero-bg.png' },
                            { id: 6, category: 'bahasa', title: 'Ujian JLPT N4', desc: 'Sesi simulasi ujian kemampuan bahasa Jepang rutin setiap bulan.', url: '/assets/hero-bg.png' }
                        ],
                        video: {
                            title: 'Dokumentasi Visual',
                            items: [
                                { id: 'v1', title: 'A Day in Ayaka Center', desc: 'Melihat lebih dekat keseharian para siswi di pusat pelatihan kami.', url: '#' },
                                { id: 'v2', title: 'Testimoni Alumni', desc: 'Cerita sukses dari mereka yang kini telah berkarir di Jepang.', url: '#' }
                            ]
                        },
                        etika: {
                            title: 'Penegasan Etika & Keamanan',
                            points: [
                                'Seluruh dokumentasi diambil dalam kegiatan resmi lembaga.',
                                'Penggunaan wajah dan identitas peserta telah melalui persetujuan (consent) yang berlaku.',
                                'Foto dan video merupakan hak cipta eksklusif Ayaka Josei Center.',
                                'Tujuan publikasi adalah sebagai bentuk transparansi informasi publik.'
                            ]
                        },
                        penutup: {
                            content: 'Kegiatan pembinaan dan pelatihan dilakukan secara berkelanjutan demi menjaga standar kualitas lulusan Ayaka.'
                        },
                        isVisible: true
                    })],
                    ['blog_halaman', JSON.stringify({
                        pengantar: {
                            title: 'Ayaka Literacy & Journal',
                            content: 'Edukasi dan informasi resmi mengenai program kerja Jepang, bahasa, dan budaya untuk mempersiapkan masa depan yang lebih matang.'
                        },
                        kategori: [
                            { id: 'all', label: 'Semua Artikel' },
                            { id: 'program', label: 'Informasi Program' },
                            { id: 'bahasa', label: 'Edukasi Bahasa' },
                            { id: 'budaya', label: 'Budaya & Etika' },
                            { id: 'umum', label: 'Informasi Umum' }
                        ],
                        artikel: [
                            {
                                id: 1,
                                slug: 'mengenal-program-kaigo-tokutei-ginou',
                                category: 'program',
                                title: 'Mengenal Program Kaigo di Jalur Tokutei Ginou',
                                date: '07 Feb 2026',
                                summary: 'Panduan lengkap mengenai tugas dan tanggung jawab perawat lansia di Jepang serta persyaratannya.',
                                content: '<p>Program Kaigo (Perawatan Lansia) merupakan salah satu bidang yang paling dibutuhkan di Jepang saat ini. Melalui jalur Tokutei Ginou (Specified Skilled Worker), peserta memiliki kesempatan untuk berkarir dengan standar gaji yang kompetitif dan perlindungan hukum yang sangat baik.</p><p>Tugas utama meliputi pendampingan aktivitas harian lansia, komunikasi empati, dan pemantauan kondisi kesehatan dasar. Di Ayaka, kami memastikan setiap calon peserta mendapatkan pelatihan fisik dan mental yang sesuai standar Jepang sebelum keberangkatan.</p>',
                                image: '/assets/hero-bg.png'
                            },
                            {
                                id: 2,
                                slug: 'tips-cepat-hafal-kanji-dasar',
                                category: 'bahasa',
                                title: 'Tips Cepat Menghafal Kanji Dasar untuk Pemula',
                                date: '05 Feb 2026',
                                summary: 'Menghafal kanji tidak harus sulit. Gunakan metode visual dan pengulangan berjarak untuk hasil maksimal.',
                                content: '<p>Kanji seringkali dianggap sebagai hambatan terbesar bagi pembelajar bahasa Jepang. Namun, dengan metode yang tepat, Anda bisa menguasai 100 kanji dasar dalam waktu singkat. </p><p>Gunakanlah teknik mnemonik (cerita visual) dan tuliskan kanji tersebut setiap hari dalam konteks kalimat nyata. Ayaka menyediakan materi eksklusif yang menyederhanakan kanji JLPT N5 dan N4 khusus untuk konten kerja profesional.</p>',
                                image: '/assets/hero-bg.png'
                            },
                            {
                                id: 3,
                                slug: 'etika-omotenashi-di-dunia-kerja',
                                category: 'budaya',
                                title: 'Memahami Konsep Omotenashi dalam Pelayanan di Jepang',
                                date: '01 Feb 2026',
                                summary: 'Filosofi pelayanan setulus hati yang menjadi standar emas industri hospitality di Negeri Sakura.',
                                content: '<p>Omotenashi adalah kunci kesuksesan bekerja di sektor hospitality dan layanan di Jepang. Berbeda dengan sekadar "service", Omotenashi berarti mengantisipasi kebutuhan tamu bahkan sebelum mereka memintanya.</p><p>Pelatihan di Ayaka menekankan pada detail-detail kecil seperti cara membungkuk (ojigi), intonasi bicara, dan ketulusan dalam melayani, yang akan menjadi nilai tambah luar biasa saat Anda bekerja di hotel atau restoran di Jepang.</p>',
                                image: '/assets/hero-bg.png'
                            },
                            {
                                id: 4,
                                slug: 'standar-kesehatan-peserta-ayaka',
                                category: 'umum',
                                title: 'Standar Kesehatan yang Harus Dipenuhi Peserta Program',
                                date: '28 Jan 2026',
                                summary: 'Transparansi mengenai kondisi fisik dan kesehatan yang dibutuhkan untuk lolos seleksi program.',
                                content: '<p>Kesehatan adalah aset utama saat bekerja di luar negeri. Jepang memiliki standar MCU (Medical Check-Up) yang ketat untuk memastikan peserta dapat bekerja secara produktif dan aman.</p><p>Ayaka bekerja sama dengan klinik resmi untuk membantu peserta mempersiapkan kondisi fisik mereka, mulai dari kesehatan mata, paru-paru, hingga kekuatan fisik umum yang dibutuhkan sesuai bidang kerjanya.</p>',
                                image: '/assets/hero-bg.png'
                            }
                        ],
                        disclaimer: 'Seluruh isi artikel bersifat edukatif dan informatif. Ketentuan resmi mengenai program mengikuti kebijakan terbaru dari pemerintah Jepang dan Ayaka Josei Center. Artikel ini bukan merupakan dokumen kontrak legal.',
                        penutup: 'Mari persiapkan diri dengan literasi yang tepat untuk masa depan yang lebih terencana.',
                        isVisible: true
                    })],
                    ['alumni_halaman', JSON.stringify({
                        pengantar: {
                            title: 'Ayaka Alumni & Success Circle',
                            content: 'Halaman ini merupakan ruang apresiasi bagi para putri Indonesia yang telah menempuh jalur pembinaan di Ayaka. Setiap profil di sini adalah bukti nyata dari proses, dedikasi, dan transparansi yang kami junjung tinggi.'
                        },
                        filter: [
                            { id: 'all', label: 'Semua Profil' },
                            { id: 'alumni', label: 'Alumni (Di Jepang)' },
                            { id: 'proses', label: 'Proses Pelatihan' }
                        ],
                        daftarAlumni: [
                            { id: 1, name: 'Siti Aminah', program: 'Kaigo (Perawatan)', year: '2024', status: 'alumni', location: 'Tokyo, Japan', image: '/assets/hero-bg.png' },
                            { id: 2, name: 'Dewi Sartika', program: 'Hospitality', year: '2025', status: 'alumni', location: 'Kyoto, Japan', image: '/assets/hero-bg.png' },
                            { id: 3, name: 'Rina Wijaya', program: 'Industri', year: '2023', status: 'alumni', location: 'Nagoya, Japan', image: '/assets/hero-bg.png' },
                            { id: 4, name: 'Lani Rahayu', program: 'F&B Service', year: '2026', status: 'proses', location: 'Ayaka Center', image: '/assets/hero-bg.png' },
                            { id: 5, name: 'Mega Utami', program: 'Kaigo (Perawatan)', year: '2026', status: 'proses', location: 'Ayaka Center', image: '/assets/hero-bg.png' }
                        ],
                        testimoni: [
                            {
                                id: 1,
                                name: 'Siti Aminah',
                                program: 'Kaigo Batch 8',
                                quote: 'Ayaka bukan hanya melatih bahasa, tapi juga mental. Saat sampai di Tokyo, saya merasa siap karena pembekalan etika kerja yang sangat detail.'
                            },
                            {
                                id: 2,
                                name: 'Rina Wijaya',
                                program: 'Industri Batch 5',
                                quote: 'Proses seleksi di Ayaka sangat transparan. Saya tahu apa yang harus saya kejar dan tim pendamping selalu ada membantu setiap kendala dokumen.'
                            }
                        ],
                        ceritaAlumni: [
                            {
                                id: 1,
                                title: 'Perjalanan Menuju Kyoto',
                                author: 'Dewi Sartika',
                                story: 'Membangun karir di luar negeri awalnya terasa menakutkan bagi saya. Namun, di Ayaka, saya bertemu dengan teman-teman yang memiliki impian serupa. Tantangan terbesar adalah bahasa, tapi dengan simulasi harian, saya akhirnya bisa lolos interview user sekali jalan.'
                            }
                        ],
                        transparansi: {
                            title: 'Penegasan Transparansi',
                            content: 'Penting untuk dipahami bahwa setiap alumni memiliki hasil dan pengalaman yang berbeda. Keberhasilan penempatan dan karir di Jepang bergantung pada kesiapan individu, hasil proses seleksi oleh pihak user, serta kepatuhan terhadap regulasi yang berlaku.'
                        },
                        penutup: {
                            content: 'Jadilah bagian dari lingkaran keberhasilan berikutnya. Persiapkan diri Anda dengan matang bersama Ayaka.'
                        },
                        isVisible: true
                    })],
                    ['kontak_halaman', JSON.stringify({
                        pengantar: {
                            title: 'Hubungi Ayaka Josei Center',
                            content: 'Kami siap mendampingi perjalanan Anda. Gunakan jalur komunikasi resmi di bawah ini untuk konsultasi, pertanyaan program, atau informasi umum lainnya.'
                        },
                        infoUtama: {
                            namaLembaga: 'Ayaka Josei Center',
                            alamat: 'Remame, Jl. Magelang - Yogyakarta, Jl. Remame No.km 19.5, RT.002/RW.13, Jumoyo, Kec. Salam, Kabupaten Magelang, Jawa Tengah 56172',
                            whatsapp: '0815 4200 7626 (Admin 1), 0877 7905 9544 (Admin 2)',
                            email: 'official@ayakacenter.id',
                            jamOperasional: 'Senin - Jumat: 08.00 - 17.00 WIB'
                        },
                        tujuanPesan: {
                            title: 'Tujuan Komunikasi',
                            content: 'Setiap pesan yang masuk akan kami gunakan untuk menjawab pertanyaan Anda secara profesional, memberikan informasi detail terkait program pelatihan, serta pendampingan administrasi yang diperlukan.'
                        },
                        privasi: {
                            title: 'Komitmen Privasi',
                            content: 'Data yang Anda kirimkan melalui formulir ini dijamin kerahasiaannya dan hanya akan digunakan untuk kepentingan komunikasi internal antara Anda dan tim Ayaka.'
                        },
                        sosialMedia: [
                            { platform: 'Instagram', link: 'https://instagram.com/ayakajoseicenter', handle: 'Ayaka Josei Center' },
                            { platform: 'Instagram 2', link: 'https://instagram.com/ayakadailypractise', handle: 'Ayaka Daily Practise' },
                            { platform: 'TikTok', link: 'https://tiktok.com/@ayakajoseicenter', handle: 'Ayaka Josei Center' },
                            { platform: 'TikTok 2', link: 'https://tiktok.com/@ayakajapanese', handle: 'Ayaka Japanese Daily Practice' }
                        ],
                        penutup: {
                            content: 'Terima kasih telah mempercayai Ayaka Josei Center sebagai mitra pembinaan masa depan Anda.'
                        },
                        isVisible: true
                    })]
                ];

                const stmt = db.prepare("INSERT OR IGNORE INTO content (section_name, content_data) VALUES (?, ?)");
                sections.forEach(s => stmt.run(s));
                stmt.finalize();
                resolve();
            });
        });
    });
};

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes
app.get('/api/content', (req, res) => {
    db.all("SELECT * FROM content ORDER BY sort_order ASC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const data = {};
        rows.forEach(row => {
            data[row.section_name] = JSON.parse(row.content_data);
            data[row.section_name].isVisible = row.is_visible;
        });
        res.json(data);
    });
});

app.put('/api/content/:section', authenticateToken, (req, res) => {
    const { section } = req.params;
    const { content_data, is_visible, sort_order } = req.body;

    db.run(`UPDATE content SET content_data = ?, is_visible = ?, sort_order = ? WHERE section_name = ?`,
        [JSON.stringify(content_data), is_visible, sort_order, section],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Content updated successfully' });
        }
    );
});

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(401).json({ error: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY);
        res.json({ token, role: user.role });
    });
});

initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
