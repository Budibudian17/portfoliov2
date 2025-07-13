"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "id" | "jp"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.education": "Education",
    "nav.home": "Home",
    "nav.project": "Project",
    "nav.blog": "Blog",

    // Hero Section
    "hero.title1": "CREATIVE",
    "hero.title2": "DEVELOPER",
    "hero.subtitle": "I craft digital experiences that push boundaries.",
    "hero.subtitle2": "Where code meets creativity, magic happens.",
    "hero.cta.work": "View My Work",
    "hero.cta.cv": "Download CV",

    // About Section
    "about.title": "ABOUT",
    "about.title2": "ME",
    "about.description1":
      "Hi! I'm Hilmi Farrel Firjatullah, a fresh graduate from SMKN 01 Depok, majoring in Software and Game Development. I love building web apps and making 3D games.",
    "about.description2":
      "I've worked on projects like CiptaLife for the Depok Health Department, which helped me grow my web dev and teamwork skills.",
    "about.location": "Depok, IDN",
    "about.stats.projects": "Projects Completed",
    "about.stats.experience": "Years Experience",
    "about.stats.clients": "People Collaborated",
    "about.stats.satisfaction": "Satisfaction",

    // Experience Section
    "experience.title": "WORK",
    "experience.title2": "EXPERIENCE",
    "experience.subtitle": "My professional journey and the companies I've worked with",
    "experience.present": "Present",
    "experience.ciptalifeintern.title": "Frontend Developer Intern",
    "experience.ciptalifeintern.company": "PT. Ciptadra SoftIndo",
    "experience.ciptalifeintern.period": "January 2025 - April 2025",
    "experience.ciptalifeintern.description":
      "I developed the CiptaLife healthcare platform by building a responsive user interface using React and Next.js, while also fixing bugs and implementing new features to enhance functionality.",
    "experience.ciptalife.title": "Frontend Developer",
    "experience.ciptalife.company": "PT. Ciptadra SoftIndo",
    "experience.ciptalife.period": "May 2025 - Present",
    "experience.ciptalife.description":
      "I am responsible for developing and maintaining web applications using React and Next.js, collaborating with the team to implement new features and improvements, while ensuring responsive design and an optimal user experience.",
    "experience.frontend.title": "Frontend Developer",
    "experience.frontend.company": "Digital Creative Agency",
    "experience.frontend.period": "2020 - 2022",
    "experience.frontend.description":
      "Developed responsive web interfaces and mobile applications. Worked closely with designers to implement pixel-perfect UI/UX designs using modern frontend frameworks.",
    "experience.junior.title": "Junior Web Developer",
    "experience.junior.company": "StartUp Hub Indonesia",
    "experience.junior.period": "2019 - 2020",
    "experience.junior.description":
      "Built and maintained company websites and web applications. Gained experience in full-stack development and agile development methodologies.",

    // GitHub Section
    "github.title": "GITHUB",
    "github.title2": "ACTIVITY",
    "github.subtitle": "My coding journey and contribution patterns",
    "github.contributions": "Contributions in the last year",
    "github.streak": "Current streak",
    "github.repos": "Public repositories",
    "github.stars": "Stars earned",
    "github.commits": "Total commits",
    "github.prs": "Pull requests",
    "github.issues": "Issues resolved",
    "github.days": "days",
    "github.reposLabel": "Repos",
    "github.followersLabel": "Followers",
    "github.usernameLabel": "Username",
    "github.profileLabel": "Profile",
    "github.contributionsIn": "Contributions in",
    "github.contributionsCount": "contributions in",

    // Projects Section
    "projects.title": "FEATURED",
    "projects.title2": "PROJECTS",
    "projects.subtitle": "Here are some of my recent projects that showcase my skills and creativity",
    "projects.demo": "Website",
    "projects.code": "View Code",
    "projects.viewMore": "View More",

    // Updated Projects
    "projects.ciptalife.title": "CiptaLife Healthcare Platform",
    "projects.ciptalife.description":
      "A comprehensive web-based healthcare platform that digitizes services at Depok's Health Department. Features include patient management, appointment scheduling, medical records, and health analytics dashboard.",
    "projects.erp.title": "Enterprise Resource Planning System",
    "projects.erp.description":
      "A robust ERP system designed to streamline business operations for companies. Includes modules for inventory management, financial tracking, human resources, and comprehensive reporting tools.",
    "projects.portfolio.title": "Personal Portfolio Website",
    "projects.portfolio.description":
      "A modern, responsive portfolio website showcasing my skills, projects, and passion in web development and digital design. Built with cutting-edge technologies and optimized for performance.",

    // Skills Section
    "skills.title": "MY",
    "skills.title2": "EXPERTISE",
    "skills.frontend.title": "Frontend Development",
    "skills.frontend.description": "Creating stunning user interfaces with modern frameworks",
    "skills.backend.title": "Backend Development",
    "skills.backend.description": "Building robust and scalable server solutions",
    "skills.design.title": "UI/UX Design",
    "skills.design.description": "Designing beautiful and intuitive user experiences",
    "skills.backend.nodejs": "Node.js",
    "skills.backend.mysql": "MySQL",
    "skills.backend.golang": "Golang",
    "skills.design.figma": "Figma",
    "skills.design.balsamiq": "Balsamiq",

    // Contact Section
    "contact.title": "LET'S",
    "contact.title2": "WORK TOGETHER",
    "contact.subtitle": "Have a project in mind? I'd love to hear about it and help bring your vision to life.",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.cta": "Get In Touch",

    // Footer
    "footer.copyright": "© 2025 HILMI PORTFOLIO. Crafted with passion.",

    // Add to English translations
    "404.title": "PAGE NOT FOUND",
    "404.subtitle": "The page you're looking for seems to have vanished into the digital void.",
    "404.subtitle2": "But don't worry, let's get you back on track.",
    "404.home": "Back to Home",
    "404.back": "Go Back",
    "404.about": "About Me",
    "404.about.desc": "Learn more about my background",
    "404.work": "My Work",
    "404.work.desc": "Check out my latest projects",
    "404.contact": "Contact",
    "404.contact.desc": "Get in touch with me",
    "404.stats": "While you're here, here are some fun stats:",
    "404.error": "Error Code",
    "404.possibilities": "Possibilities",
    "404.way": "Way Home",

    // Education Section
    "education.title": "MY",
    "education.title2": "EDUCATION",
    "education.subtitle": "My academic journey and continuous learning path",

    "education.university.degree": "SMKN 01 DEPOK",
    "education.university.school": "Software and Game Development (PPLG)",
    "education.university.period": "2022 - 2025",
    "education.university.description":
      "Studied fundamentals to advanced topics in web, mobile, and game development. Used technologies like HTML, CSS, JavaScript, PHP. Participated in various projects and Industry Class programs for real-world IT experience.",
    "education.university.gpa": "",
    "education.university.achievement1": "",
    "education.university.achievement2": "",

    "education.highschool.degree": "SMPN 03 DEPOK",
    "education.highschool.school": "Junior High School",
    "education.highschool.period": "2019 - 2022",
    "education.highschool.description":
      "Completed junior high school education and actively participated in school activities, while starting to learn the basics of technology and computers as an early interest in IT.",
    "education.highschool.achievement1": "",
    "education.highschool.achievement2": "",

    "education.certifications.title": "Professional Certifications",
    "education.certifications.subtitle": "Industry-recognized credentials",
    "education.certifications.period": "2024 - Present",
    "education.certifications.description":
      "Continuously updating skills through professional certifications and online courses to stay current with industry trends and best practices.",
    // Certificate Section
    "certificates.competence.title": "Certificate of Competence",
    "certificates.competence.desc": "BNSP (Badan Nasional Sertifikasi Profesi)",
    "certificates.toeic.title": "TOEIC Certificate",
    "certificates.toeic.desc": "WELTS (World English Language Testing Services)",
    "certificates.internship.title": "Internship Certificate",
    "certificates.internship.desc": "PT. Ciptadra Softindo",
    "certificates.gamedev.title": "Game Development Fundamentals",
    "certificates.gamedev.desc": "LPK CIPTA PESONA KHARISINDO",
    "certificates.publicspeaking.title": "Basic Public Speaking Certificate",
    "certificates.publicspeaking.desc": "Galeria Potensi Indonesia",
    "certificates.industryclass.title": "Industry Class Certificate",
    "certificates.industryclass.desc": "PT. Ciptadra SoftIndo",

    // Blog Section
    "blog.title": "Blog",
    "blog.subtitle": "Thoughts, tutorials, and stories from my journey in tech and beyond.",
    "blog.readMore": "Read more",
    "blog.buildPortfolio.title": "How I Built My Portfolio Website",
    "blog.buildPortfolio.summary": "A behind-the-scenes look at the process, tools, and design decisions that went into building my personal portfolio.",
    "blog.tipsJunior.title": "Tips for Junior Developers",
    "blog.tipsJunior.summary": "Advice and practical tips for those starting out in web development, based on my own experience and learning journey.",
    "blog.hero.title": "Blog",
    "blog.hero.subtitle": "Latest articles, tips, and coding notes",
    // 🔧 Tentang Proyek & Pengalaman
    "blog.erp.title": "How I Built a Web-Based ERP System for Real Business Use",
    "blog.erp.summary": "Step-by-step story of building an ERP system for real business needs, from planning to deployment.",
    "blog.ciptalife.title": "Building CiptaLife: A Healthcare Platform for Depok",
    "blog.ciptalife.summary": "Sharing my process and experience in developing a digital health service app for Depok.",
    // 💻 Tentang Koding dan Stack
    "blog.whyNextjs.title": "Why I Chose Next.js for My Portfolio Website",
    "blog.whyNextjs.summary": "The reasons and benefits behind choosing Next.js for my personal portfolio.",
    "blog.roleBasedAccess.title": "Integrating Role-Based Access in a Next.js Admin Panel",
    "blog.roleBasedAccess.summary": "How I implemented authentication and role-based access in a Next.js admin dashboard.",
    "blog.tailwindDashboard.title": "Using Tailwind CSS to Design a Clean Dashboard UI",
    "blog.tailwindDashboard.summary": "Styling tips and tricks for building a modern dashboard UI with Tailwind CSS.",
    // 🧠 Tentang Journey & Belajar
    "blog.learningJourney.title": "My Learning Journey in Web Development (as a Student)",
    "blog.learningJourney.summary": "My story of learning web development from scratch as a student, and what kept me motivated.",
    "blog.realProjects.title": "What I Learned from Building Real Projects (Not Just Tutorials)",
    "blog.realProjects.summary": "The difference between learning theory and actually coding real projects.",
    // 🗺️ Tentang Proyek Lokal
    "blog.digitizingPublic.title": "Digitizing Public Services: Building for Depok",
    "blog.digitizingPublic.summary": "How I contributed to digital transformation for public services in my city.",
    "blog.localProjects.title": "Why Local Projects Matter for Junior Developers",
    "blog.localProjects.summary": "Why working on local projects can help you grow your career faster.",
    "blog.selfTaughtMotivation.title": "How to Stay Motivated as a Self-Taught Developer",
    "blog.selfTaughtMotivation.summary": "Tips and mindset for keeping your motivation high when learning to code on your own.",
    "blog.softSkills.title": "The Importance of Soft Skills in Tech Careers",
    "blog.softSkills.summary": "Why communication, teamwork, and problem-solving are just as important as coding skills.",
    "blog.pinned": "Pinned",
    "blog.allArticles": "All Articles",
    "blog.category.all": "All",
    "blog.category.project": "Project Experience",
    "blog.category.tech": "Tech Stack",
    "blog.category.learning": "Learning",
    "blog.category.growth": "Personal Growth",
    "blog.backToList": "Back to Blog",
    "blog.latestPosts": "Latest Posts",
    "blog.categories": "Categories",
    "blog.popularTags": "Popular Tags",
  },

  id: {
    // Navigation
    "nav.about": "Tentang",
    "nav.projects": "Proyek",
    "nav.skills": "Keahlian",
    "nav.experience": "Pengalaman",
    "nav.contact": "Kontak",
    "nav.education": "Pendidikan",
    "nav.home": "Beranda",
    "nav.project": "Proyek",
    "nav.blog": "Blog",

    // Hero Section
    "hero.title1": "DEVELOPER",
    "hero.title2": "KREATIF",
    "hero.subtitle": "Saya menciptakan pengalaman digital yang melampaui batas.",
    "hero.subtitle2": "Di mana kode bertemu kreativitas, keajaiban terjadi.",
    "hero.cta.work": "Lihat Karya Saya",
    "hero.cta.cv": "Unduh CV",

    // About Section
    "about.title": "TENTANG",
    "about.title2": "SAYA",
    "about.description1":
      "Halo! Saya Hilmi Farrel Firjatullah, fresh graduate dari SMKN 01 Depok, jurusan Pengembangan Perangkat Lunak dan Gim. Saya suka membangun web app dan membuat game 3D.",
    "about.description2":
      "Saya pernah mengerjakan proyek seperti CiptaLife untuk Dinas Kesehatan Depok, yang sangat mengasah skill web dev dan kerja tim saya.",
    "about.location": "Depok, IDN",
    "about.stats.projects": "Proyek Selesai",
    "about.stats.experience": "Tahun Pengalaman",
    "about.stats.clients": "Orang Pernah Kerja Sama",
    "about.stats.satisfaction": "Kepuasan",

    // Experience Section
    "experience.title": "PENGALAMAN",
    "experience.title2": "KERJA",
    "experience.subtitle": "Perjalanan profesional saya dan perusahaan tempat saya bekerja",
    "experience.present": "Sekarang",
    "experience.ciptalifeintern.title": "Frontend Developer Intern",
    "experience.ciptalifeintern.company": "PT. Ciptadra SoftIndo",
    "experience.ciptalifeintern.period": "Januari 2025 - April 2025",
    "experience.ciptalifeintern.description":
      "Saya mengembangkan platform kesehatan CiptaLife dengan membangun antarmuka pengguna responsif menggunakan React dan Next.js, serta memperbaiki bug dan menambahkan fitur baru untuk meningkatkan fungsionalitas.",
    "experience.ciptalife.title": "Frontend Developer",
    "experience.ciptalife.company": "PT. Ciptadra SoftIndo",
    "experience.ciptalife.period": "Mei 2025 - Saat Ini",
    "experience.ciptalife.description":
      "Saya bertanggung jawab mengembangkan dan memelihara aplikasi web menggunakan React dan Next.js, berkolaborasi dengan tim untuk menambah fitur dan perbaikan baru, serta memastikan desain responsif dan pengalaman pengguna yang optimal.",
    "experience.frontend.title": "Frontend Developer",
    "experience.frontend.company": "Digital Creative Agency",
    "experience.frontend.period": "2020 - 2022",
    "experience.frontend.description":
      "Mengembangkan antarmuka web responsif dan aplikasi mobile. Bekerja sama dengan desainer untuk mengimplementasikan desain UI/UX yang pixel-perfect menggunakan framework frontend modern.",
    "experience.junior.title": "Junior Web Developer",
    "experience.junior.company": "StartUp Hub Indonesia",
    "experience.junior.period": "2019 - 2020",
    "experience.junior.description":
      "Membangun dan memelihara website perusahaan dan aplikasi web. Mendapatkan pengalaman dalam pengembangan full-stack dan metodologi pengembangan agile.",

    // GitHub Section
    "github.title": "AKTIVITAS",
    "github.title2": "GITHUB",
    "github.subtitle": "Perjalanan coding saya dan pola kontribusi",
    "github.contributions": "Kontribusi dalam setahun terakhir",
    "github.streak": "Streak saat ini",
    "github.repos": "Repository publik",
    "github.stars": "Stars yang diperoleh",
    "github.commits": "Total commits",
    "github.prs": "Pull requests",
    "github.issues": "Issues diselesaikan",
    "github.days": "hari",
    "github.reposLabel": "Repositori",
    "github.followersLabel": "Pengikut",
    "github.usernameLabel": "Username",
    "github.profileLabel": "Profil",
    "github.contributionsIn": "Kontribusi di",
    "github.contributionsCount": "kontribusi di",

    // Projects Section
    "projects.title": "PROYEK",
    "projects.title2": "UNGGULAN",
    "projects.subtitle": "Berikut adalah beberapa proyek terbaru saya yang menunjukkan keahlian dan kreativitas",
    "projects.demo": "Website",
    "projects.code": "Lihat Kode",
    "projects.viewMore": "Lihat Selengkapnya",

    // Updated Projects
    "projects.ciptalife.title": "Platform Kesehatan CiptaLife",
    "projects.ciptalife.description":
      "Platform kesehatan berbasis web yang komprehensif untuk digitalisasi layanan di Dinas Kesehatan Depok. Fitur meliputi manajemen pasien, penjadwalan janji temu, rekam medis, dan dashboard analitik kesehatan.",
    "projects.erp.title": "Sistem Enterprise Resource Planning",
    "projects.erp.description":
      "Sistem ERP yang robust dirancang untuk merampingkan operasi bisnis perusahaan. Termasuk modul manajemen inventori, pelacakan keuangan, sumber daya manusia, dan alat pelaporan komprehensif.",
    "projects.portfolio.title": "Website Portfolio Pribadi",
    "projects.portfolio.description":
      "Website portfolio modern dan responsif yang menampilkan keahlian, proyek, dan passion saya dalam pengembangan web dan desain digital. Dibangun dengan teknologi terdepan dan dioptimalkan untuk performa.",

    // Skills Section
    "skills.title": "KEAHLIAN",
    "skills.title2": "SAYA",
    "skills.frontend.title": "Pengembangan Frontend",
    "skills.frontend.description": "Menciptakan antarmuka pengguna yang menakjubkan dengan framework modern",
    "skills.backend.title": "Pengembangan Backend",
    "skills.backend.description": "Membangun solusi server yang robust dan scalable",
    "skills.design.title": "Desain UI/UX",
    "skills.design.description": "Mendesain pengalaman pengguna yang indah dan intuitif",
    "skills.backend.nodejs": "Node.js",
    "skills.backend.mysql": "MySQL",
    "skills.backend.golang": "Golang",
    "skills.design.figma": "Figma",
    "skills.design.balsamiq": "Balsamiq",

    // Contact Section
    "contact.title": "MARI",
    "contact.title2": "BEKERJA SAMA",
    "contact.subtitle": "Punya proyek dalam pikiran? Saya ingin mendengarnya dan membantu mewujudkan visi Anda.",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.cta": "Hubungi Saya",

    // Footer
    "footer.copyright": "© 2025 HILMI PORTFOLIO. Dibuat dengan passion.",

    // Add to Indonesian translations
    "404.title": "HALAMAN TIDAK DITEMUKAN",
    "404.subtitle": "Halaman yang Anda cari sepertinya telah menghilang ke dalam kehampaan digital.",
    "404.subtitle2": "Tapi jangan khawatir, mari kita bawa Anda kembali ke jalur yang benar.",
    "404.home": "Kembali ke Beranda",
    "404.back": "Kembali",
    "404.about": "Tentang Saya",
    "404.about.desc": "Pelajari lebih lanjut tentang latar belakang saya",
    "404.work": "Karya Saya",
    "404.work.desc": "Lihat proyek-proyek terbaru saya",
    "404.contact": "Kontak",
    "404.contact.desc": "Hubungi saya",
    "404.stats": "Sementara Anda di sini, berikut beberapa statistik menarik:",
    "404.error": "Kode Error",
    "404.possibilities": "Kemungkinan",
    "404.way": "Jalan Pulang",

    // Education Section
    "education.title": "PENDIDIKAN",
    "education.title2": "SAYA",
    "education.subtitle": "Perjalanan akademis dan jalur pembelajaran berkelanjutan saya",

    "education.university.degree": "SMKN 01 DEPOK",
    "education.university.school": "Pengembangan Perangkat Lunak dan Gim (PPLG)",
    "education.university.period": "2022 - 2025",
    "education.university.description":
      "Mempelajari dasar hingga lanjutan dalam pengembangan aplikasi web, mobile, dan game. Menggunakan teknologi seperti HTML, CSS, JavaScript, PHP. Terlibat dalam berbagai proyek serta program Kelas Industri untuk pengalaman kerja nyata di bidang IT.",
    "education.university.gpa": "",
    "education.university.achievement1": "",
    "education.university.achievement2": "",
    "education.highschool.degree": "SMPN 03 DEPOK",
    "education.highschool.school": "Sekolah Menengah Pertama",
    "education.highschool.period": "2019 - 2022",
    "education.highschool.description":
      "Menempuh pendidikan tingkat menengah pertama dan aktif dalam kegiatan sekolah, sekaligus mulai mengenal dasar-dasar teknologi dan komputer sebagai minat awal di bidang IT.",
    "education.highschool.achievement1": "",
    "education.highschool.achievement2": "",

    "education.certifications.title": "Sertifikasi Profesional",
    "education.certifications.subtitle": "Kredensial yang diakui industri",
    "education.certifications.period": "2024 - Sekarang",
    "education.certifications.description":
      "Terus memperbarui keterampilan melalui sertifikasi profesional dan kursus online untuk tetap mengikuti tren industri dan praktik terbaik.",
    // Certificate Section
    "certificates.competence.title": "Sertifikat Kompetensi",
    "certificates.competence.desc": "BNSP (Badan Nasional Sertifikasi Profesi)",
    "certificates.toeic.title": "Sertifikat TOEIC",
    "certificates.toeic.desc": "WELTS (World English Language Testing Services)",
    "certificates.internship.title": "Sertifikat PKL",
    "certificates.internship.desc": "PT. Ciptadra Softindo",
    "certificates.gamedev.title": "Dasar Pengembangan Game",
    "certificates.gamedev.desc": "LPK CIPTA PESONA KHARISINDO",
    "certificates.publicspeaking.title": "Sertifikat Public Speaking Dasar",
    "certificates.publicspeaking.desc": "Galeria Potensi Indonesia",
    "certificates.industryclass.title": "Sertifikat Kelas Industri",
    "certificates.industryclass.desc": "PT. Ciptadra SoftIndo",

    // Blog Section
    "blog.title": "Blog",
    "blog.subtitle": "Catatan, tutorial, dan cerita dari perjalanan saya di dunia teknologi.",
    "blog.readMore": "Baca selengkapnya",
    "blog.buildPortfolio.title": "Bagaimana Saya Membangun Website Portfolio Ini",
    "blog.buildPortfolio.summary": "Kisah di balik layar proses, tools, dan keputusan desain saat membangun portfolio pribadi.",
    "blog.tipsJunior.title": "Tips untuk Developer Junior",
    "blog.tipsJunior.summary": "Saran dan tips praktis untuk pemula di web development, berdasarkan pengalaman dan pembelajaran saya sendiri.",
    "blog.hero.title": "Blog",
    "blog.hero.subtitle": "Artikel, tips, dan catatan coding terbaru",
    // 🔧 Tentang Proyek & Pengalaman
    "blog.erp.title": "Bagaimana Saya Membangun Sistem ERP Berbasis Web untuk Bisnis Nyata",
    "blog.erp.summary": "Step-by-step cerita membangun sistem ERP untuk kebutuhan bisnis nyata, dari perencanaan sampai deployment.",
    "blog.ciptalife.title": "Membangun CiptaLife: Platform Kesehatan untuk Depok",
    "blog.ciptalife.summary": "Sharing proses dan pengalaman membangun aplikasi layanan kesehatan digital untuk Depok.",
    // 💻 Tentang Koding dan Stack
    "blog.whyNextjs.title": "Kenapa Saya Memilih Next.js untuk Website Portfolio Saya",
    "blog.whyNextjs.summary": "Alasan dan manfaat memilih Next.js untuk portfolio pribadi.",
    "blog.roleBasedAccess.title": "Integrasi Role-Based Access di Next.js Admin Panel",
    "blog.roleBasedAccess.summary": "Cara saya mengimplementasikan autentikasi dan role-based access di dashboard admin Next.js.",
    "blog.tailwindDashboard.title": "Menggunakan Tailwind CSS untuk Desain Dashboard UI yang Clean",
    "blog.tailwindDashboard.summary": "Tips styling dan trik membangun dashboard modern dengan Tailwind CSS.",
    // 🧠 Tentang Journey & Belajar
    "blog.learningJourney.title": "Perjalanan Belajar Web Development (sebagai Siswa)",
    "blog.learningJourney.summary": "Cerita saya belajar web development dari nol sebagai pelajar, dan apa yang bikin tetap semangat.",
    "blog.realProjects.title": "Apa yang Saya Pelajari dari Membangun Proyek Nyata (Bukan Hanya Tutorial)",
    "blog.realProjects.summary": "Bedanya belajar teori dengan langsung ngoding proyek nyata.",
    // 🗺️ Tentang Proyek Lokal
    "blog.digitizingPublic.title": "Digitalisasi Layanan Publik: Membangun untuk Depok",
    "blog.digitizingPublic.summary": "Bagaimana saya berkontribusi dalam transformasi digital layanan publik di kota saya.",
    "blog.localProjects.title": "Kenapa Proyek Lokal Penting untuk Developer Junior",
    "blog.localProjects.summary": "Kenapa bikin proyek lokal bisa bantu karier berkembang lebih cepat.",
    "blog.selfTaughtMotivation.title": "Cara Tetap Termotivasi sebagai Developer Otodidak",
    "blog.selfTaughtMotivation.summary": "Tips dan mindset agar tetap semangat belajar ngoding secara mandiri.",
    "blog.softSkills.title": "Pentingnya Soft Skill di Karier Teknologi",
    "blog.softSkills.summary": "Kenapa komunikasi, teamwork, dan problem solving sama pentingnya dengan skill coding.",
    "blog.pinned": "Di-pin",
    "blog.allArticles": "Semua Artikel",
    "blog.category.all": "Semua",
    "blog.category.project": "Pengalaman Proyek",
    "blog.category.tech": "Tech Stack",
    "blog.category.learning": "Belajar",
    "blog.category.growth": "Pengembangan Diri",
    "blog.backToList": "Kembali ke Blog",
    "blog.latestPosts": "Artikel Terbaru",
    "blog.categories": "Kategori",
    "blog.popularTags": "Tag Populer",
  },

  jp: {
    // Navigation
    "nav.about": "について",
    "nav.projects": "プロジェクト",
    "nav.skills": "スキル",
    "nav.experience": "経験",
    "nav.contact": "お問い合わせ",
    "nav.education": "教育",
    "nav.home": "ホーム",
    "nav.project": "プロジェクト",
    "nav.blog": "ブログ",

    // Hero Section
    "hero.title1": "クリエイティブ",
    "hero.title2": "デベロッパー",
    "hero.subtitle": "境界を押し広げるデジタル体験を創造します。",
    "hero.subtitle2": "コードと創造性が出会う場所で、魔法が起こります。",
    "hero.cta.work": "作品を見る",
    "hero.cta.cv": "履歴書をダウンロード",

    // About Section
    "about.title": "私に",
    "about.title2": "ついて",
    "about.description1":
      "こんにちは！私はHilmi Farrel Firjatullahです。SMKN 01 Depokのソフトウェア＆ゲーム開発専攻を卒業したばかりです。Webアプリの構築や3Dゲーム制作が大好きです。",
    "about.description2":
      "Depok保健局向けのCiptaLifeなどのプロジェクトに携わり、Web開発やチームワークのスキルを磨きました。",
    "about.location": "Depok, IDN",
    "about.stats.projects": "完了プロジェクト",
    "about.stats.experience": "年の経験",
    "about.stats.clients": "協力した人々",
    "about.stats.satisfaction": "満足度",

    // Experience Section
    "experience.title": "職歴",
    "experience.title2": "経験",
    "experience.subtitle": "私の専門的な歩みと働いた会社",
    "experience.present": "現在",
    "experience.ciptalifeintern.title": "フロントエンド開発インターン",
    "experience.ciptalifeintern.company": "PT. Ciptadra SoftIndo",
    "experience.ciptalifeintern.period": "2025年1月 - 2025年4月",
    "experience.ciptalifeintern.description":
      "ReactとNext.jsを使ってレスポンシブなUIを構築し、バグ修正や新機能の実装を通じてCiptaLifeヘルスケアプラットフォームの開発に携わりました。",
    "experience.ciptalife.title": "フロントエンド開発者",
    "experience.ciptalife.company": "PT. Ciptadra SoftIndo",
    "experience.ciptalife.period": "2025年5月 - 現在",
    "experience.ciptalife.description":
      "ReactとNext.jsを用いてWebアプリケーションの開発・保守を担当し、チームと協力して新機能や改善を実装しながら、レスポンシブデザインと最適なユーザー体験を追求しています。",
    "experience.frontend.title": "フロントエンド開発者",
    "experience.frontend.company": "Digital Creative Agency",
    "experience.frontend.period": "2020年 - 2022年",
    "experience.frontend.description":
      "レスポンシブWebインターフェースとモバイルアプリケーションを開発。モダンなフロントエンドフレームワークを使用して、ピクセルパーフェクトなUI/UXデザインを実装するためデザイナーと密接に協力。",
    "experience.junior.title": "ジュニアWeb開発者",
    "experience.junior.company": "StartUp Hub Indonesia",
    "experience.junior.period": "2019年 - 2020年",
    "experience.junior.description":
      "会社のWebサイトとWebアプリケーションの構築と保守。フルスタック開発とアジャイル開発手法の経験を積む。",

    // GitHub Section
    "github.title": "GITHUB",
    "github.title2": "アクティビティ",
    "github.subtitle": "私のコーディングの歩みと貢献パターン",
    "github.contributions": "過去1年間の貢献",
    "github.streak": "現在のストリーク",
    "github.repos": "パブリックリポジトリ",
    "github.stars": "獲得したスター",
    "github.commits": "総コミット数",
    "github.prs": "プルリクエスト",
    "github.issues": "解決したイシュー",
    "github.days": "日",
    "github.reposLabel": "リポジトリ",
    "github.followersLabel": "フォロワー",
    "github.usernameLabel": "ユーザー名",
    "github.profileLabel": "プロフィール",
    "github.contributionsIn": "の貢献",
    "github.contributionsCount": "の貢献数",

    // Projects Section
    "projects.title": "注目の",
    "projects.title2": "プロジェクト",
    "projects.subtitle": "私のスキルと創造性を示す最近のプロジェクトをご紹介します",
    "projects.demo": "ウェブサイト",
    "projects.code": "コードを見る",
    "projects.viewMore": "もっと見る",

    // Updated Projects
    "projects.ciptalife.title": "CiptaLifeヘルスケアプラットフォーム",
    "projects.ciptalife.description":
      "デポック保健局のサービスをデジタル化する包括的なWebベースのヘルスケアプラットフォーム。患者管理、予約スケジューリング、医療記録、健康分析ダッシュボードなどの機能を含みます。",
    "projects.erp.title": "企業資源計画システム",
    "projects.erp.description":
      "企業の業務運営を合理化するために設計された堅牢なERPシステム。在庫管理、財務追跡、人事、包括的なレポートツールのモジュールが含まれています。",
    "projects.portfolio.title": "個人ポートフォリオウェブサイト",
    "projects.portfolio.description":
      "Web開発とデジタルデザインにおける私のスキル、プロジェクト、情熱を紹介するモダンでレスポンシブなポートフォリオウェブサイト。最先端技術で構築され、パフォーマンスが最適化されています。",

    // Skills Section
    "skills.title": "私の",
    "skills.title2": "専門分野",
    "skills.frontend.title": "フロントエンド開発",
    "skills.frontend.description": "モダンなフレームワークで素晴らしいユーザーインターフェースを作成",
    "skills.backend.title": "バックエンド開発",
    "skills.backend.description": "堅牢でスケーラブルなサーバーソリューションの構築",
    "skills.design.title": "UI/UXデザイン",
    "skills.design.description": "美しく直感的なユーザー体験のデザイン",
    "skills.backend.nodejs": "Node.js",
    "skills.backend.mysql": "MySQL",
    "skills.backend.golang": "Golang",
    "skills.design.figma": "Figma",
    "skills.design.balsamiq": "Balsamiq",

    // Contact Section
    "contact.title": "一緒に",
    "contact.title2": "働きましょう",
    "contact.subtitle":
      "プロジェクトのアイデアはありますか？ぜひお聞かせください。あなたのビジョンの実現をお手伝いします。",
    "contact.email": "メール",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.cta": "お問い合わせ",

    // Footer
    "footer.copyright": "© 2025 HILMI PORTFOLIO. 情熱を込めて作成。",

    // Add to Japanese translations
    "404.title": "ページが見つかりません",
    "404.subtitle": "お探しのページはデジタルの虚空に消えてしまったようです。",
    "404.subtitle2": "でも心配しないでください、正しい道に戻りましょう。",
    "404.home": "ホームに戻る",
    "404.back": "戻る",
    "404.about": "私について",
    "404.about.desc": "私の経歴について詳しく知る",
    "404.work": "私の作品",
    "404.work.desc": "最新のプロジェクトをチェック",
    "404.contact": "お問い合わせ",
    "404.contact.desc": "私に連絡する",
    "404.stats": "ここにいる間に、いくつかの楽しい統計をどうぞ：",
    "404.error": "エラーコード",
    "404.possibilities": "可能性",
    "404.way": "帰り道",

    // Education Section
    "education.title": "私の",
    "education.title2": "教育",
    "education.subtitle": "私の学術的な歩みと継続的な学習の道のり",

    "education.university.degree": "SMKN 01 DEPOK",
    "education.university.school": "ソフトウェア＆ゲーム開発 (PPLG)",
    "education.university.period": "2022年 - 2025年",
    "education.university.description":
      "Web、モバイル、ゲーム開発の基礎から応用までを学びました。HTML、CSS、JavaScript、PHPなどの技術を使用。さまざまなプロジェクトやインダストリークラスプログラムに参加し、IT分野での実務経験を積みました。",
    "education.university.gpa": "",
    "education.university.achievement1": "",
    "education.university.achievement2": "",
    "education.highschool.degree": "SMPN 03 DEPOK",
    "education.highschool.school": "中学校",
    "education.highschool.period": "2019年 - 2022年",
    "education.highschool.description":
      "中等教育を修了し、学校活動に積極的に参加。IT分野への初期の関心として、テクノロジーやコンピュータの基礎を学び始めました。",
    "education.highschool.achievement1": "",
    "education.highschool.achievement2": "",

    "education.certifications.title": "専門資格",
    "education.certifications.subtitle": "業界認定の資格",
    "education.certifications.period": "2024年 - 現在",
    "education.certifications.description":
      "業界のトレンドとベストプラクティスに遅れないよう、専門資格とオンラインコースを通じて継続的にスキルを更新しています。",
    // Certificate Section
    "certificates.competence.title": "能力認定証明書",
    "certificates.competence.desc": "BNSP（インドネシア国家職業認定機関）",
    "certificates.toeic.title": "TOEIC証明書",
    "certificates.toeic.desc": "WELTS（世界英語能力テストサービス）",
    "certificates.internship.title": "インターンシップ証明書",
    "certificates.internship.desc": "PT. Ciptadra Softindo",
    "certificates.gamedev.title": "ゲーム開発基礎証明書",
    "certificates.gamedev.desc": "LPK CIPTA PESONA KHARISINDO",
    "certificates.publicspeaking.title": "基礎パブリックスピーキング証明書",
    "certificates.publicspeaking.desc": "Galeria Potensi Indonesia",
    "certificates.industryclass.title": "インダストリークラス証明書",
    "certificates.industryclass.desc": "PT. Ciptadra SoftIndo",

    // Blog Section
    "blog.title": "ブログ",
    "blog.subtitle": "技術の旅で得た考え、チュートリアル、ストーリーを共有します。",
    "blog.readMore": "続きを読む",
    "blog.buildPortfolio.title": "ポートフォリオサイトを作った方法",
    "blog.buildPortfolio.summary": "個人ポートフォリオを作る過程、ツール、デザインの裏側を紹介します。",
    "blog.tipsJunior.title": "ジュニア開発者へのヒント",
    "blog.tipsJunior.summary": "自分の経験と学びから、Web開発を始める人へのアドバイスと実践的なヒント。",
    "blog.hero.title": "ブログ",
    "blog.hero.subtitle": "最新の技術記事、ヒント、コーディングノート",
    // 🔧 Tentang Proyek & Pengalaman
    "blog.erp.title": "実ビジネス向けWebベースERPシステムの構築方法",
    "blog.erp.summary": "企画からリリースまで、実際のビジネスニーズに応えるERPシステムを構築したステップバイステップの記録。",
    "blog.ciptalife.title": "CiptaLife構築記：デポックのためのヘルスケアプラットフォーム",
    "blog.ciptalife.summary": "デポック向けデジタル健康サービスアプリ開発のプロセスと経験をシェア。",
    // 💻 Tentang Koding dan Stack
    "blog.whyNextjs.title": "ポートフォリオサイトにNext.jsを選んだ理由",
    "blog.whyNextjs.summary": "個人ポートフォリオにNext.jsを選んだ理由とそのメリット。",
    "blog.roleBasedAccess.title": "Next.js管理画面でのロールベース認可の実装",
    "blog.roleBasedAccess.summary": "Next.js管理ダッシュボードで認証とロールベースアクセスを実装した方法。",
    "blog.tailwindDashboard.title": "Tailwind CSSでクリーンなダッシュボードUIをデザインする方法",
    "blog.tailwindDashboard.summary": "Tailwind CSSでモダンなダッシュボードUIを作るためのスタイリングTips。",
    // 🧠 Tentang Journey & Belajar
    "blog.learningJourney.title": "学生としてのWeb開発学習の歩み",
    "blog.learningJourney.summary": "学生としてゼロからWeb開発を学んだ体験談とモチベーションの源。",
    "blog.realProjects.title": "実プロジェクト構築で学んだこと（チュートリアルだけじゃない）",
    "blog.realProjects.summary": "理論学習と実際のプロジェクト開発の違いについて。",
    // 🗺️ Tentang Proyek Lokal
    "blog.digitizingPublic.title": "公共サービスのデジタル化：デポックのために作る",
    "blog.digitizingPublic.summary": "地元の公共サービスのデジタル変革にどう貢献したか。",
    "blog.localProjects.title": "ローカルプロジェクトがジュニア開発者に重要な理由",
    "blog.localProjects.summary": "ローカルプロジェクトに取り組むことでキャリアが早く成長する理由。",
    "blog.selfTaughtMotivation.title": "独学エンジニアとしてモチベーションを保つ方法",
    "blog.selfTaughtMotivation.summary": "独学でプログラミングを学ぶときにモチベーションを高く保つコツと考え方。",
    "blog.softSkills.title": "テック業界でソフトスキルが重要な理由",
    "blog.softSkills.summary": "コミュニケーション・チームワーク・課題解決力がコーディングスキルと同じくらい大切な理由。",
    "blog.pinned": "ピン留め",
    "blog.allArticles": "すべての記事",
    "blog.category.all": "すべて",
    "blog.category.project": "プロジェクト経験",
    "blog.category.tech": "技術スタック",
    "blog.category.learning": "学び",
    "blog.category.growth": "自己成長",
    "blog.backToList": "ブログ一覧へ戻る",
    "blog.latestPosts": "最新記事",
    "blog.categories": "カテゴリー",
    "blog.popularTags": "人気タグ",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language") as Language
    if (savedLanguage && ["en", "id", "jp"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("portfolio-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
