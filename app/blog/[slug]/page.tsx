"use client"

import { useParams, notFound } from "next/navigation"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"

// Copy array blogPosts dari page.tsx agar bisa digunakan di sini
const blogPosts = [
  {
    slug: "build-erp-system",
    titleKey: "blog.erp.title",
    summaryKey: "blog.erp.summary",
    date: "2025-02-01",
    thumbnail: "/img/blog1.png",
    category: "Project Experience",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-blue-600",
    contentEn: (
      <>
        <p>
          Building a web-based ERP (Enterprise Resource Planning) system for real business use is a challenging yet rewarding journey. In this article, I’ll share my experience designing, developing, and deploying an ERP system that helps companies manage their operations efficiently.
        </p>
        <br />
        <h2>Key Steps in Building the ERP System</h2>
        <br />
        <ol>
          <li>
            <b>1. Understanding Business Needs</b>
            <p>
              The first step was to deeply understand the client’s business processes—inventory, sales, HR, finance, and reporting. I conducted interviews and mapped workflows to ensure the system would solve real problems.
            </p>
          </li>
          <br />
          <li>
            <b>2. Designing the Architecture</b>
            <p>
              I chose a modular architecture using React for the frontend and Node.js for the backend. This allowed for scalable development and easy integration of new modules as the business grew.
            </p>
          </li>
          <br />
          <li>
            <b>3. Building Core Modules</b>
            <p>
              The ERP included modules for inventory management, sales tracking, HR, and financial reporting. Each module was designed with user-friendly interfaces and robust validation to minimize errors.
            </p>
          </li>
          <br />
          <li>
            <b>4. Implementing Security & Access Control</b>
            <p>
              Security was a top priority. I implemented role-based access, encrypted sensitive data, and ensured secure authentication for all users.
            </p>
          </li>
          <br />
          <li>
            <b>5. Testing & Deployment</b>
            <p>
              After thorough testing, the system was deployed to a cloud server with automated backups and monitoring. Training sessions were held to onboard users and gather feedback for future improvements.
            </p>
          </li>
        </ol>
        <br />
        <h3>Lessons Learned</h3>
        <p>
          Building a real ERP system taught me the importance of clear communication, agile development, and continuous feedback. The project not only improved my technical skills but also deepened my understanding of business operations.
        </p>
        <br />
        <p>
          If you’re planning to build an ERP system, start with the business needs, keep the user in mind, and iterate based on real feedback.
        </p>
      </>
    ),
    contentId: (
      <>
        <p>
          Membangun sistem ERP (Enterprise Resource Planning) berbasis web untuk kebutuhan bisnis nyata adalah perjalanan yang menantang sekaligus memuaskan. Di artikel ini, saya akan berbagi pengalaman merancang, mengembangkan, dan menerapkan sistem ERP yang membantu perusahaan mengelola operasional secara efisien.
        </p>
        <br />
        <h2>Langkah Kunci Membangun Sistem ERP</h2>
        <br />
        <ol>
          <li>
            <b>1. Memahami Kebutuhan Bisnis</b>
            <p>
              Langkah pertama adalah benar-benar memahami proses bisnis klien—inventory, penjualan, HR, keuangan, dan pelaporan. Saya melakukan wawancara dan memetakan workflow agar sistem benar-benar menyelesaikan masalah nyata.
            </p>
          </li>
          <br />
          <li>
            <b>2. Mendesain Arsitektur</b>
            <p>
              Saya memilih arsitektur modular dengan React untuk frontend dan Node.js untuk backend. Ini membuat pengembangan scalable dan integrasi modul baru jadi mudah seiring bisnis berkembang.
            </p>
          </li>
          <br />
          <li>
            <b>3. Membangun Modul Inti</b>
            <p>
              ERP ini mencakup modul manajemen inventory, penjualan, HR, dan pelaporan keuangan. Setiap modul didesain dengan UI ramah pengguna dan validasi ketat untuk meminimalisir error.
            </p>
          </li>
          <br />
          <li>
            <b>4. Implementasi Keamanan & Akses</b>
            <p>
              Keamanan jadi prioritas utama. Saya menerapkan role-based access, enkripsi data sensitif, dan autentikasi aman untuk semua user.
            </p>
          </li>
          <br />
          <li>
            <b>5. Testing & Deployment</b>
            <p>
              Setelah testing menyeluruh, sistem di-deploy ke cloud server dengan backup otomatis dan monitoring. Sesi training diadakan untuk onboarding user dan mengumpulkan feedback untuk pengembangan selanjutnya.
            </p>
          </li>
        </ol>
        <br />
        <h3>Pelajaran yang Didapat</h3>
        <p>
          Membangun ERP nyata mengajarkan pentingnya komunikasi jelas, pengembangan agile, dan feedback berkelanjutan. Proyek ini tidak hanya meningkatkan skill teknis saya, tapi juga pemahaman tentang operasional bisnis.
        </p>
        <br />
        <p>
          Jika kamu ingin membangun ERP, mulai dari kebutuhan bisnis, utamakan user, dan iterasi berdasarkan feedback nyata.
        </p>
      </>
    ),
    contentJp: (
      <>
        <p>
          実際のビジネスで使われるWebベースのERP（基幹業務システム）を構築するのは、挑戦的でありながら非常にやりがいのある経験です。この記事では、企業の業務を効率化するERPシステムを設計・開発・導入した体験を紹介します。
        </p>
        <br />
        <h2>ERPシステム構築の主なステップ</h2>
        <br />
        <ol>
          <li>
            <b>1. ビジネスニーズの把握</b>
            <p>
              まずはクライアントの業務プロセス（在庫、販売、人事、会計、レポート）を深く理解することから始めました。インタビューや業務フローの可視化を通じて、本当に役立つシステムを目指しました。
            </p>
          </li>
          <br />
          <li>
            <b>2. アーキテクチャ設計</b>
            <p>
              フロントエンドはReact、バックエンドはNode.jsのモジュール構成を採用。これにより、拡張性が高く、新しいモジュールの追加も容易になりました。
            </p>
          </li>
          <br />
          <li>
            <b>3. コアモジュールの開発</b>
            <p>
              在庫管理、販売管理、人事、会計レポートなどのモジュールを実装。ユーザーフレンドリーなUIと厳格なバリデーションでミスを最小限に抑えました。
            </p>
          </li>
          <br />
          <li>
            <b>4. セキュリティとアクセス制御の実装</b>
            <p>
              セキュリティは最優先事項。ロールベースのアクセス、機密データの暗号化、安全な認証を徹底しました。
            </p>
          </li>
          <br />
          <li>
            <b>5. テストと導入</b>
            <p>
              徹底的なテストの後、クラウドサーバーにデプロイし、自動バックアップと監視を実装。ユーザー向けトレーニングも行い、今後の改善のためのフィードバックも収集しました。
            </p>
          </li>
        </ol>
        <br />
        <h3>得られた学び</h3>
        <p>
          実際のERP構築を通じて、明確なコミュニケーション、アジャイル開発、継続的なフィードバックの重要性を学びました。技術力だけでなく、ビジネス理解も深まりました。
        </p>
        <br />
        <p>
          ERPを作るなら、まずビジネスニーズを把握し、ユーザー目線を大切にし、実際の声をもとに改善を重ねましょう。
        </p>
      </>
    ),
  },
  {
    slug: "building-ciptalife",
    titleKey: "blog.ciptalife.title",
    summaryKey: "blog.ciptalife.summary",
    date: "2025-05-30",
    thumbnail: "/img/blog2.png",
    category: "Project Experience",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-teal-600",
    contentEn: (
      <>
        <p>
          Building CiptaLife, a healthcare platform for Depok, was one of the most impactful projects in my journey as a developer. The goal was to digitize health services, making them more accessible and efficient for both patients and healthcare providers.
        </p>
        <br />
        <h2>How We Built CiptaLife</h2>
        <br />
        <ol>
          <li>
            <b>1. Identifying the Problem</b>
            <p>
              We started by interviewing doctors, nurses, and patients to understand the pain points in the existing manual system. Issues like lost records, long queues, and lack of transparency were common.
            </p>
          </li>
          <br />
          <li>
            <b>2. Designing the Solution</b>
            <p>
              We designed a web-based platform with modules for patient registration, appointment scheduling, medical records, and analytics. The UI was made simple and mobile-friendly to ensure everyone could use it easily.
            </p>
          </li>
          <br />
          <li>
            <b>3. Development & Integration</b>
            <p>
              Using React and Next.js, we built the frontend, while the backend was powered by Node.js and a secure database. We integrated with existing hospital systems and ensured data privacy and security.
            </p>
          </li>
          <br />
          <li>
            <b>4. User Training & Feedback</b>
            <p>
              We conducted training sessions for healthcare staff and collected feedback to improve usability. Iterative updates were made based on real user input.
            </p>
          </li>
          <br />
          <li>
            <b>5. Launch & Impact</b>
            <p>
              After launch, CiptaLife reduced paperwork, improved patient experience, and enabled better data-driven decisions for the health department.
            </p>
          </li>
        </ol>
        <br />
        <h3>What I Learned</h3>
        <p>
          This project taught me the value of user-centered design, collaboration, and the real-world impact of technology. Seeing CiptaLife in use was incredibly rewarding.
        </p>
        <br />
        <p>
          If you want to build digital solutions for public services, start with empathy and keep iterating based on user needs.
        </p>
      </>
    ),
    contentId: (
      <>
        <p>
          Membangun CiptaLife, platform kesehatan untuk Depok, adalah salah satu proyek paling berdampak dalam perjalanan saya sebagai developer. Tujuannya adalah mendigitalkan layanan kesehatan agar lebih mudah diakses dan efisien untuk pasien maupun tenaga medis.
        </p>
        <br />
        <h2>Bagaimana Kami Membangun CiptaLife</h2>
        <br />
        <ol>
          <li>
            <b>1. Identifikasi Masalah</b>
            <p>
              Kami mulai dengan mewawancarai dokter, perawat, dan pasien untuk memahami masalah di sistem manual. Masalah seperti data hilang, antrian panjang, dan kurangnya transparansi sering terjadi.
            </p>
          </li>
          <br />
          <li>
            <b>2. Mendesain Solusi</b>
            <p>
              Kami merancang platform web dengan modul pendaftaran pasien, penjadwalan, rekam medis, dan analitik. UI dibuat simpel dan mobile-friendly agar semua orang mudah menggunakannya.
            </p>
          </li>
          <br />
          <li>
            <b>3. Pengembangan & Integrasi</b>
            <p>
              Frontend dibangun dengan React dan Next.js, backend dengan Node.js dan database aman. Kami integrasikan dengan sistem rumah sakit yang sudah ada dan pastikan privasi serta keamanan data.
            </p>
          </li>
          <br />
          <li>
            <b>4. Pelatihan & Feedback</b>
            <p>
              Kami mengadakan pelatihan untuk tenaga medis dan mengumpulkan feedback untuk meningkatkan usability. Update dilakukan secara iteratif berdasarkan masukan user.
            </p>
          </li>
          <br />
          <li>
            <b>5. Launch & Dampak</b>
            <p>
              Setelah launching, CiptaLife mengurangi pekerjaan manual, meningkatkan pengalaman pasien, dan membantu pengambilan keputusan berbasis data di dinas kesehatan.
            </p>
          </li>
        </ol>
        <br />
        <h3>Pelajaran yang Didapat</h3>
        <p>
          Proyek ini mengajarkan pentingnya desain berpusat pada user, kolaborasi, dan dampak nyata teknologi. Melihat CiptaLife dipakai langsung sangat memuaskan.
        </p>
        <br />
        <p>
          Jika ingin membangun solusi digital untuk layanan publik, mulai dari empati dan terus iterasi sesuai kebutuhan user.
        </p>
      </>
    ),
    contentJp: (
      <>
        <p>
          Depok向けのヘルスケアプラットフォーム「CiptaLife」を構築したことは、私の開発者人生で最も影響力のあるプロジェクトの一つでした。目的は、医療サービスをデジタル化し、患者と医療従事者の両方にとってよりアクセスしやすく効率的にすることでした。
        </p>
        <br />
        <h2>CiptaLifeをどう作ったか</h2>
        <br />
        <ol>
          <li>
            <b>1. 課題の特定</b>
            <p>
              まず、医師・看護師・患者にインタビューし、従来の手作業システムの課題を洗い出しました。記録紛失、長い待ち時間、透明性の欠如などが共通の問題でした。
            </p>
          </li>
          <br />
          <li>
            <b>2. ソリューション設計</b>
            <p>
              患者登録、予約、医療記録、分析などのモジュールを備えたWebプラットフォームを設計。UIはシンプルかつモバイル対応で、誰でも使いやすいようにしました。
            </p>
          </li>
          <br />
          <li>
            <b>3. 開発と統合</b>
            <p>
              フロントエンドはReactとNext.js、バックエンドはNode.jsとセキュアなDBで構築。既存の病院システムと連携し、データのプライバシーとセキュリティも確保しました。
            </p>
          </li>
          <br />
          <li>
            <b>4. ユーザートレーニングとフィードバック</b>
            <p>
              医療スタッフ向けにトレーニングを実施し、使い勝手向上のためのフィードバックを収集。ユーザーの声をもとに継続的に改善しました。
            </p>
          </li>
          <br />
          <li>
            <b>5. ローンチとインパクト</b>
            <p>
              ローンチ後、CiptaLifeは事務作業を削減し、患者体験を向上させ、保健局のデータ活用を促進しました。
            </p>
          </li>
        </ol>
        <br />
        <h3>学びと気づき</h3>
        <p>
          このプロジェクトを通じて、ユーザー中心設計、協働、テクノロジーの社会的インパクトの大切さを学びました。CiptaLifeが実際に使われているのを見るのは本当に嬉しかったです。
        </p>
        <br />
        <p>
          公共サービスのデジタル化を目指すなら、まず共感から始め、ユーザーのニーズに合わせて改善を重ねましょう。
        </p>
      </>
    ),
  },
  {
    slug: "why-nextjs-portfolio",
    titleKey: "blog.whyNextjs.title",
    summaryKey: "blog.whyNextjs.summary",
    date: "2025-08-28",
    thumbnail: "/img/blog4.png",
    category: "Tech Stack",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-gray-700",
    contentEn: (
      <>
        <p>
          Building a personal portfolio is more than just creating an online resume—it's about crafting a digital presence that reflects your skills, personality, and ambitions. In 2025, the web is more competitive than ever, and choosing the right technology stack is crucial.
        </p>
        <br />
        <p>
          Here’s why I chose Next.js for my portfolio, and how it helped me deliver a fast, scalable, and beautiful website.
        </p>
        <br />
        <h2>Why I Chose Next.js for My Portfolio</h2>
        <br />
        <ol>
          <li>
            <b>1. Lightning-Fast Performance with Static & Server Rendering</b>
            <p>
              Next.js combines the best of static site generation (SSG) and server-side rendering (SSR). My homepage and blog list are statically generated for instant load, while dynamic pages like blog details use SSR for up-to-date content. This hybrid approach means users always get a fast, SEO-friendly experience.
            </p>
          </li>
          <br />
          <li>
            <b>2. Seamless Routing & Dynamic Pages</b>
            <p>
              With file-based routing, adding new pages or blog posts is as simple as creating a new file. Dynamic routes (like <code>/blog/[slug]</code>) make it easy to scale my content without complex configuration.
            </p>
          </li>
          <br />
          <li>
            <b>3. Built-in Image & Asset Optimization</b>
            <p>
              Next.js automatically optimizes images and static assets. My portfolio images are crisp and load quickly, even on slow connections, thanks to Next.js’s <code>next/image</code> component.
            </p>
          </li>
          <br />
          <li>
            <b>4. API Routes for Contact Forms & More</b>
            <p>
              I use Next.js API routes to handle contact form submissions securely, without needing a separate backend. This keeps my stack simple and my data safe.
            </p>
          </li>
          <br />
          <li>
            <b>5. Effortless Multilanguage Support</b>
            <p>
              My site supports English, Indonesian, and Japanese. Next.js makes it easy to serve the right content based on user preference, helping me reach a global audience.
            </p>
          </li>
          <br />
          <li>
            <b>6. Developer Experience & Ecosystem</b>
            <p>
              The Next.js ecosystem is huge—integrations with Tailwind CSS, TypeScript, and Vercel make development smooth and enjoyable. Hot reloading, fast builds, and great documentation mean I spend less time debugging and more time building.
            </p>
          </li>
        </ol>
        <br />
        <h3>Lessons Learned</h3>
        <p>
          Through building this portfolio, I learned the importance of performance, accessibility, and maintainability. Next.js empowered me to focus on content and design, not boilerplate or configuration.
        </p>
        <br />
        <p>
          If you’re considering a modern React framework for your next project, I highly recommend giving Next.js a try.
        </p>
        <br />
        <h3>Ready to Build Your Own?</h3>
        <p>
          Whether you’re a developer, designer, or student, a Next.js portfolio is a great way to showcase your work. Start simple, iterate, and let your site grow with you!
        </p>
      </>
    ),
    contentId: (
      <>
        <p>
          Membangun portfolio pribadi bukan sekadar membuat CV online—ini tentang membangun identitas digital yang mencerminkan skill, kepribadian, dan ambisi kamu. Di tahun 2025, web makin kompetitif, jadi memilih stack yang tepat itu penting.
        </p>
        <br />
        <p>
          Berikut alasan saya memilih Next.js untuk portfolio ini, dan bagaimana hasilnya jadi cepat, scalable, dan modern.
        </p>
        <br />
        <h2>Mengapa Saya Memilih Next.js untuk Portfolio?</h2>
        <br />
        <ol>
          <li>
            <b>1. Performa Super Cepat dengan Static & Server Rendering</b>
            <p>
              Next.js menggabungkan keunggulan static site generation (SSG) dan server-side rendering (SSR). Homepage dan daftar blog saya di-generate statis untuk loading instan, sedangkan halaman dinamis seperti detail blog pakai SSR agar konten selalu up-to-date. Hasilnya, user selalu dapat pengalaman cepat dan SEO-friendly.
            </p>
          </li>
          <br />
          <li>
            <b>2. Routing Mudah & Halaman Dinamis</b>
            <p>
              Dengan file-based routing, menambah halaman atau blog baru cukup buat file baru. Dynamic route (<code>/blog/[slug]</code>) bikin konten gampang di-scale tanpa konfigurasi ribet.
            </p>
          </li>
          <br />
          <li>
            <b>3. Optimasi Gambar & Asset Otomatis</b>
            <p>
              Next.js otomatis optimasi gambar dan asset statis. Semua gambar portfolio saya tajam dan cepat dimuat, bahkan di koneksi lambat, berkat komponen <code>next/image</code>.
            </p>
          </li>
          <br />
          <li>
            <b>4. API Route untuk Form Kontak & Lainnya</b>
            <p>
              Saya pakai API route Next.js untuk handle form kontak secara aman, tanpa backend terpisah. Stack jadi simpel, data tetap aman.
            </p>
          </li>
          <br />
          <li>
            <b>5. Dukungan Multibahasa Mudah</b>
            <p>
              Situs ini support Inggris, Indonesia, dan Jepang. Next.js memudahkan menampilkan konten sesuai preferensi user, jadi bisa menjangkau audiens global.
            </p>
          </li>
          <br />
          <li>
            <b>6. Pengalaman Developer & Ekosistem</b>
            <p>
              Ekosistem Next.js luas—integrasi dengan Tailwind CSS, TypeScript, dan Vercel bikin development lancar. Hot reload, build cepat, dan dokumentasi lengkap bikin saya lebih fokus ngoding daripada debugging.
            </p>
          </li>
        </ol>
        <br />
        <h3>Pelajaran yang Didapat</h3>
        <p>
          Dari membangun portfolio ini, saya belajar pentingnya performa, aksesibilitas, dan maintainability. Next.js bikin saya bisa fokus ke konten dan desain, bukan ribet konfigurasi.
        </p>
        <br />
        <p>
          Kalau kamu cari framework React modern untuk project berikutnya, wajib coba Next.js!
        </p>
        <br />
        <h3>Siap Bangun Portfolio Sendiri?</h3>
        <p>
          Baik kamu developer, desainer, atau pelajar, portfolio Next.js adalah cara keren untuk pamer karya. Mulai sederhana, terus kembangkan, dan biarkan situsmu tumbuh bareng kamu!
        </p>
      </>
    ),
    contentJp: (
      <>
        <p>
          個人ポートフォリオを作ることは、単なるオンライン履歴書ではありません。自分のスキルや個性、目標を表現するデジタルな名刺です。2025年のウェブは競争が激しく、最適な技術選択が重要です。
        </p>
        <br />
        <p>
          ここでは、私がNext.jsを選んだ理由と、そのおかげでどのように速くて美しいサイトを作れたかを紹介します。
        </p>
        <br />
        <h2>なぜポートフォリオにNext.jsを選んだのか</h2>
        <br />
        <ol>
          <li>
            <b>1. 静的＆サーバーレンダリングで超高速</b>
            <p>
              Next.jsは静的サイト生成（SSG）とサーバーサイドレンダリング（SSR）の良いとこ取り。トップページやブログ一覧はSSGで瞬時に表示、ブログ詳細など動的ページはSSRで常に最新。ハイブリッド構成でSEOもパフォーマンスも抜群です。
            </p>
          </li>
          <br />
          <li>
            <b>2. シームレスなルーティングと動的ページ</b>
            <p>
              ファイルベースルーティングで新しいページや記事の追加が簡単。動的ルート（<code>/blog/[slug]</code>）でコンテンツ拡張も楽々です。
            </p>
          </li>
          <br />
          <li>
            <b>3. 画像＆アセット最適化が標準</b>
            <p>
              Next.jsは画像や静的アセットを自動最適化。<code>next/image</code>コンポーネントで、どんな回線でも画像が美しく高速に表示されます。
            </p>
          </li>
          <br />
          <li>
            <b>4. APIルートで問い合わせフォームも簡単</b>
            <p>
              Next.jsのAPIルートで問い合わせフォームの処理も安全に実装。別サーバー不要で、シンプルかつ安全です。
            </p>
          </li>
          <br />
          <li>
            <b>5. 多言語対応が簡単</b>
            <p>
              このサイトは英語・インドネシア語・日本語対応。Next.jsならユーザーの言語に合わせて最適なコンテンツを表示できます。
            </p>
          </li>
          <br />
          <li>
            <b>6. 開発体験とエコシステム</b>
            <p>
              Next.jsのエコシステムは巨大。Tailwind CSSやTypeScript、Vercelとの連携で開発が快適。ホットリロードや高速ビルド、充実のドキュメントで、開発に集中できます。
            </p>
          </li>
        </ol>
        <br />
        <h3>得られた学び</h3>
        <p>
          このポートフォリオ制作を通じて、パフォーマンス・アクセシビリティ・保守性の大切さを実感しました。Next.jsのおかげで、設定に悩まずコンテンツとデザインに集中できました。
        </p>
        <br />
        <p>
          次のプロジェクトにモダンなReactフレームワークを探しているなら、ぜひNext.jsを試してみてください！
        </p>
        <br />
        <h3>あなたも作ってみませんか？</h3>
        <p>
          開発者・デザイナー・学生問わず、Next.jsポートフォリオは自分をアピールする最高の方法です。まずはシンプルに始めて、成長とともにサイトも進化させましょう！
        </p>
      </>
    ),
  },
  {
    slug: "role-based-access-nextjs",
    titleKey: "blog.roleBasedAccess.title",
    summaryKey: "blog.roleBasedAccess.summary",
    date: "2024-04-15",
    thumbnail: "/img/blog5.png",
    category: "Tech Stack",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-purple-700",
    contentEn: (
      <>
        <p>
          Integrating role-based access control (RBAC) in a Next.js admin panel is essential for building secure, scalable web applications. In this article, I’ll share how I implemented RBAC in my admin dashboard, ensuring only authorized users can access sensitive features.
        </p>
        <br />
        <h2>How I Implemented Role-Based Access</h2>
        <br />
        <ol>
          <li>
            <b>1. Defining User Roles</b>
            <p>
              I started by defining roles such as Admin, Editor, and Viewer. Each role had specific permissions, like managing users, editing content, or viewing reports.
            </p>
          </li>
          <br />
          <li>
            <b>2. Setting Up Authentication</b>
            <p>
              I used JWT-based authentication to securely identify users. Upon login, the user’s role was included in the token payload.
            </p>
          </li>
          <br />
          <li>
            <b>3. Protecting Routes & Components</b>
            <p>
              In Next.js, I created higher-order components (HOCs) and middleware to check user roles before rendering protected pages or components. Unauthorized users were redirected or shown an error message.
            </p>
          </li>
          <br />
          <li>
            <b>4. Managing Permissions in the UI</b>
            <p>
              The UI dynamically showed or hid features based on the user’s role. For example, only Admins could see the “Manage Users” section.
            </p>
          </li>
          <br />
          <li>
            <b>5. Testing & Auditing</b>
            <p>
              I thoroughly tested each role to ensure permissions were enforced correctly and added logging for security audits.
            </p>
          </li>
        </ol>
        <br />
        <h3>Takeaways</h3>
        <p>
          Implementing RBAC in Next.js improved both security and user experience. It’s a must-have for any serious admin panel.
        </p>
        <br />
        <p>
          If you’re building an admin dashboard, plan your roles and permissions early, and use Next.js’s flexibility to enforce them throughout your app.
        </p>
      </>
    ),
    contentId: (
      <>
        <p>
          Mengintegrasikan role-based access control (RBAC) di admin panel Next.js sangat penting untuk membangun aplikasi web yang aman dan scalable. Di artikel ini, saya akan berbagi cara saya mengimplementasikan RBAC di dashboard admin agar hanya user berwenang yang bisa mengakses fitur sensitif.
        </p>
        <br />
        <h2>Cara Saya Mengimplementasikan Role-Based Access</h2>
        <br />
        <ol>
          <li>
            <b>1. Mendefinisikan Role User</b>
            <p>
              Saya mulai dengan mendefinisikan role seperti Admin, Editor, dan Viewer. Setiap role punya izin spesifik, misal mengelola user, edit konten, atau hanya melihat laporan.
            </p>
          </li>
          <br />
          <li>
            <b>2. Setup Autentikasi</b>
            <p>
              Saya pakai autentikasi berbasis JWT untuk identifikasi user secara aman. Saat login, role user disimpan di payload token.
            </p>
          </li>
          <br />
          <li>
            <b>3. Proteksi Route & Komponen</b>
            <p>
              Di Next.js, saya buat higher-order component (HOC) dan middleware untuk cek role user sebelum render halaman/komponen yang dilindungi. User tak berwenang akan diarahkan atau ditampilkan pesan error.
            </p>
          </li>
          <br />
          <li>
            <b>4. Manajemen Izin di UI</b>
            <p>
              UI secara dinamis menampilkan atau menyembunyikan fitur sesuai role user. Contoh, hanya Admin yang bisa melihat menu “Kelola User”.
            </p>
          </li>
          <br />
          <li>
            <b>5. Testing & Audit</b>
            <p>
              Saya melakukan testing menyeluruh untuk memastikan izin berjalan benar dan menambah logging untuk audit keamanan.
            </p>
          </li>
        </ol>
        <br />
        <h3>Kesimpulan</h3>
        <p>
          Implementasi RBAC di Next.js meningkatkan keamanan dan user experience. Ini wajib untuk admin panel profesional.
        </p>
        <br />
        <p>
          Kalau kamu membangun dashboard admin, rencanakan role dan izin sejak awal, lalu enforce di seluruh aplikasi dengan fitur Next.js.
        </p>
      </>
    ),
    contentJp: (
      <>
        <p>
          Next.jsの管理画面でロールベース認可（RBAC）を導入することは、安全で拡張性の高いWebアプリを作る上で不可欠です。この記事では、私が管理ダッシュボードにRBACを実装し、権限のあるユーザーだけが機密機能にアクセスできるようにした方法を紹介します。
        </p>
        <br />
        <h2>ロールベース認可の実装方法</h2>
        <br />
        <ol>
          <li>
            <b>1. ユーザーロールの定義</b>
            <p>
              まず、Admin・Editor・Viewerなどのロールを定義。それぞれにユーザー管理、コンテンツ編集、レポート閲覧などの権限を割り当てました。
            </p>
          </li>
          <br />
          <li>
            <b>2. 認証のセットアップ</b>
            <p>
              JWTベースの認証でユーザーを安全に識別。ログイン時にロール情報をトークンに含めました。
            </p>
          </li>
          <br />
          <li>
            <b>3. ルート・コンポーネントの保護</b>
            <p>
              Next.jsではHOCやミドルウェアでユーザーロールをチェックし、保護されたページや機能を制御。権限がない場合はリダイレクトやエラーメッセージを表示しました。
            </p>
          </li>
          <br />
          <li>
            <b>4. UIでの権限管理</b>
            <p>
              UIはユーザーロールに応じて機能を動的に表示・非表示。例えば「ユーザー管理」はAdminだけが見られるようにしました。
            </p>
          </li>
          <br />
          <li>
            <b>5. テストと監査</b>
            <p>
              すべてのロールで権限が正しく機能するか徹底的にテストし、セキュリティ監査用のログも追加しました。
            </p>
          </li>
        </ol>
        <br />
        <h3>まとめ</h3>
        <p>
          Next.jsでRBACを実装することで、セキュリティとユーザー体験が大幅に向上しました。本格的な管理画面には必須の仕組みです。
        </p>
        <br />
        <p>
          管理ダッシュボードを作るなら、ロールと権限設計を最初に決め、Next.jsの柔軟性を活かして全体で徹底しましょう。
        </p>
      </>
    ),
  },
  {
    slug: "tailwind-dashboard-ui",
    titleKey: "blog.tailwindDashboard.title",
    summaryKey: "blog.tailwindDashboard.summary",
    date: "2024-04-01",
    thumbnail: "/img/blog6.png",
    category: "Tech Stack",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-pink-600",
    contentEn: (
      <>
        <p>
          Building a dashboard UI with Tailwind CSS is a great way to create a modern, responsive, and customizable interface. In this article, I’ll share how I designed and implemented a dashboard that uses Tailwind CSS for styling and includes various components for data visualization and user interaction.
        </p>
        <br />
        <h2>Designing the Dashboard UI</h2>
        <br />
        <ol>
          <li>
            <b>1. Planning the Layout</b>
            <p>
              I designed a clean, two-column layout for the dashboard. The left column contains navigation and user information, while the right column displays the main content area.
            </p>
          </li>
          <br />
          <li>
            <b>2. Using Tailwind CSS Classes</b>
            <p>
              I used Tailwind CSS classes for styling, including grid layouts, flexbox, and utility classes. This allowed for quick and efficient styling of components.
            </p>
          </li>
          <br />
          <li>
            <b>3. Building Reusable Components</b>
            <p>
              I created reusable components like buttons, cards, and tables using Tailwind CSS. This helped maintain consistency and reduced development time.
            </p>
          </li>
          <br />
          <li>
            <b>4. Responsive Design</b>
            <p>
              I ensured the dashboard was fully responsive, adapting to different screen sizes. This included mobile-first design and breakpoints for larger screens.
            </p>
          </li>
          <br />
          <li>
            <b>5. Dark Mode Support</b>
            <p>
              I implemented a dark mode toggle for the dashboard, allowing users to switch between light and dark themes. This improves readability and reduces eye strain.
            </p>
          </li>
        </ol>
        <br />
        <h3>Implementation Details</h3>
        <p>
          The dashboard uses Tailwind CSS classes for styling. For example, a button is styled with <code>bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md</code>. Grid layouts are achieved with <code>grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6</code>.
        </p>
        <br />
        <p>
          The dashboard includes several components:
        </p>
        <ul>
          <li>Header with user info and search bar</li>
          <li>Sidebar for navigation</li>
          <li>Main content area for different sections (e.g., Overview, Analytics, Settings)</li>
          <li>Footer with quick links</li>
        </ul>
        <br />
        <p>
          The UI is fully responsive and includes a dark mode toggle.
        </p>
      </>
    ),
    contentId: (
      <>
        <p>
          Membangun UI dashboard dengan Tailwind CSS adalah cara yang bagus untuk membuat antarmuka modern, responsif, dan dapat disesuaikan. Di artikel ini, saya akan berbagi cara saya merancang dan mengimplementasikan dashboard yang menggunakan Tailwind CSS untuk styling dan mencakup berbagai komponen untuk visualisasi data dan interaksi pengguna.
        </p>
        <br />
        <h2>Merancang UI Dashboard</h2>
        <br />
        <ol>
          <li>
            <b>1. Merencanakan Layout</b>
            <p>
              Saya merancang layout bersih, dua kolom untuk dashboard. Kolom kiri berisi navigasi dan informasi pengguna, sementara kolom kanan menampilkan area konten utama.
            </p>
          </li>
          <br />
          <li>
            <b>2. Menggunakan Klas Tailwind CSS</b>
            <p>
              Saya menggunakan klas Tailwind CSS untuk styling, termasuk grid layouts, flexbox, dan klas utilitas. Ini memungkinkan styling yang cepat dan efisien.
            </p>
          </li>
          <br />
          <li>
            <b>3. Membangun Komponen Reusable</b>
            <p>
              Saya membuat komponen reusable seperti tombol, kartu, dan tabel menggunakan Tailwind CSS. Ini membantu menjaga konsistensi dan mengurangi waktu pengembangan.
            </p>
          </li>
          <br />
          <li>
            <b>4. Desain Responsif</b>
            <p>
              Saya memastikan dashboard responsif, menyesuaikan ukuran layar. Ini mencakup desain mobile-first dan breakpoints untuk layar yang lebih besar.
            </p>
          </li>
          <br />
          <li>
            <b>5. Dukungan Mode Gelap</b>
            <p>
              Saya mengimplementasikan toggle mode gelap untuk dashboard, memungkinkan pengguna untuk beralih antara tema terang dan gelap. Ini meningkatkan keterbacaan dan mengurangi pengaruh buruk pada mata.
            </p>
          </li>
        </ol>
        <br />
        <h3>Detail Implementasi</h3>
        <p>
          Dashboard menggunakan klas Tailwind CSS untuk styling. Misalnya, tombol di-style dengan <code>bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md</code>. Grid layouts di-achieve dengan <code>grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6</code>.
        </p>
        <br />
        <p>
          Dashboard mencakup beberapa komponen:
        </p>
        <ul>
          <li>Header dengan info pengguna dan pencarian</li>
          <li>Sidebar untuk navigasi</li>
          <li>Area konten utama untuk berbagai bagian (misalnya, Overview, Analytics, Settings)</li>
          <li>Footer dengan tautan cepat</li>
        </ul>
        <br />
        <p>
          UI responsif dan mencakup toggle mode gelap.
        </p>
      </>
    ),
    contentJp: (
      <>
        <p>
          Tailwind CSSでダッシュボードUIを構築するのは、現代的でレスポンシブでカスタマイズ可能なインターフェースを作るための素晴らしい方法です。この記事では、Tailwind CSSをスタイリングに使用し、データ可視化やユーザーインタラクションのためのさまざまなコンポーネントを含むダッシュボードを設計および実装する方法を共有します。
        </p>
        <br />
        <h2>ダッシュボードUIの設計</h2>
        <br />
        <ol>
          <li>
            <b>1. レイアウトの計画</b>
            <p>
              ダッシュボードのために、クリーンで2カラムレイアウトを設計しました。左側の列にはナビゲーションとユーザー情報、右側の列にはメインコンテンツエリアが含まれています。
            </p>
          </li>
          <br />
          <li>
            <b>2. Tailwind CSSクラスの使用</b>
            <p>
              Tailwind CSSクラスを使用してスタイリングを行い、コンポーネントのスタイリングを迅速かつ効率的に行いました。
            </p>
          </li>
          <br />
          <li>
            <b>3. 再利用可能なコンポーネントの構築</b>
            <p>
              Tailwind CSSを使用して、ボタン、カード、テーブルなどの再利用可能なコンポーネントを作成しました。これにより、一貫性を保ち、開発時間を短縮できました。
            </p>
          </li>
          <br />
          <li>
            <b>4. レスポンシブデザイン</b>
            <p>
              ダッシュボードは全ての画面サイズに対応しています。これにはモバイルファーストデザインと大きな画面のためのブレークポイントも含まれています。
            </p>
          </li>
          <br />
          <li>
            <b>5. ダークモードサポート</b>
            <p>
              ダッシュボードにダークモード切り替えを実装し、ユーザーがライトテーマとダークテーマを切り替えることができるようにしました。これにより、読みやすさが向上し、目の疲労が軽減されます。
            </p>
          </li>
        </ol>
        <br />
        <h3>実装の詳細</h3>
        <p>
          ダッシュボードはTailwind CSSクラスを使用してスタイリングを行います。例えば、ボタンは<code>bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md</code>でスタイリングされます。グリッドレイアウトは<code>grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6</code>で実現されます。
        </p>
        <br />
        <p>
          ダッシュボードには以下のコンポーネントが含まれています：
        </p>
        <ul>
          <li>ユーザー情報と検索バーを含むヘッダー</li>
          <li>ナビゲーション用のサイドバー</li>
          <li>異なるセクション（例：Overview、Analytics、Settings）のためのメインコンテンツエリア</li>
          <li>クイックリンクを含むフッター</li>
        </ul>
        <br />
        <p>
          ダッシュボードは全てレスポンシブ対応であり、ダークモード切り替えも含まれています。
        </p>
      </>
    ),
  },
  {
    slug: "learning-journey-student",
    titleKey: "blog.learningJourney.title",
    summaryKey: "blog.learningJourney.summary",
    date: "2024-03-20",
    thumbnail: "/img/blog7.png",
    category: "Learning",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-yellow-600",
    contentEn: (
      <>
        <p>
          My journey from a self-taught developer to a professional developer has been a rollercoaster of ups and downs. In this article, I’ll share my experiences, challenges, and lessons learned along the way.
        </p>
        <br />
        <h2>Early Days: Self-Taught Learning</h2>
        <br />
        <p>
          I started learning programming on my own in 2019. I was fascinated by the power of code and the endless possibilities it offered. I taught myself HTML, CSS, and JavaScript through online tutorials and free resources.
        </p>
        <br />
        <p>
          I was eager to learn more, so I started building small projects like a personal blog and a to-do list app. This was my first exposure to backend development (Node.js) and databases (MongoDB).
        </p>
        <br />
        <p>
          I quickly realized that self-taught learning had its limitations. I lacked a structured curriculum, and I often found myself stuck on complex topics.
        </p>
        <br />
        <h2>Finding a Mentor & Community</h2>
        <br />
        <p>
          In 2020, I joined a local developer community and started participating in meetups. This was a game-changer for me. I met other developers who shared similar struggles and experiences.
        </p>
        <br />
        <p>
          I also found a mentor who guided me through advanced topics like React, Node.js, and databases. This was crucial for my growth as a developer.
        </p>
        <br />
        <p>
          The community also helped me find my first job as a junior developer. This was a significant milestone in my journey.
        </p>
        <br />
        <h2>Challenges & Lessons</h2>
        <br />
        <p>
          One of the biggest challenges was staying motivated and consistent. Self-taught learning can be lonely and isolating.
        </p>
        <br />
        <p>
          I struggled with imposter syndrome and often doubted my abilities. This was a common feeling for many self-taught developers.
        </p>
        <br />
        <p>
          The key to overcoming this was to find a community, set clear goals, and continuously challenge myself.
        </p>
        <br />
        <p>
          I also learned the importance of building a portfolio. It’s not just a resume; it’s a showcase of your skills and projects.
        </p>
        <br />
        <p>
          Finally, I realized that learning is a lifelong journey. There’s always something new to learn, and it’s okay to take breaks or seek help when needed.
        </p>
      </>
    ),
    contentId: (
      <>
        <p>
          Perjalanan saya dari developer yang belajar mandiri ke developer profesional adalah rollercoaster dari keuntungan dan kerugian. Di artikel ini, saya akan berbagi pengalaman, tantangan, dan pelajaran yang saya dapat sepanjang perjalanan.
        </p>
        <br />
        <h2>Hari-hari Awal: Belajar Mandiri</h2>
        <br />
        <p>
          Saya mulai belajar pemrograman sendiri pada tahun 2019. Saya terpesona dengan kekuatan kode dan kemungkinan-kemungkinan yang ditawarkannya. Saya mengajari diri sendiri HTML, CSS, dan JavaScript melalui tutorial online dan sumber daya gratis.
        </p>
        <br />
        <p>
          Saya sangat antusias untuk belajar lebih lanjut, jadi saya mulai membangun proyek kecil seperti blog pribadi dan aplikasi daftar tugas. Ini adalah pengalaman pertama saya dengan pengembangan backend (Node.js) dan basis data (MongoDB).
        </p>
        <br />
        <p>
          Saya cepat menyadari batasan belajar mandiri. Saya mengalami kesulitan dengan kurikulum yang terstruktur, dan sering merasa tersesat pada topik yang kompleks.
        </p>
        <br />
        <h2>Mencari Mentor & Komunitas</h2>
        <br />
        <p>
          Pada tahun 2020, saya bergabung dengan komunitas developer lokal dan mulai berpartisipasi dalam meetup. Ini adalah perubahan besar bagi saya. Saya bertemu dengan developer lain yang mengalami kesulitan yang sama dan pengalaman yang serupa.
        </p>
        <br />
        <p>
          Saya juga menemukan mentor yang mengarahkan saya melalui topik-topik lanjutan seperti React, Node.js, dan basis data. Ini sangat penting untuk pertumbuhan saya sebagai developer.
        </p>
        <br />
        <p>
          Komunitas juga membantu saya menemukan pekerjaan pertama saya sebagai junior developer. Ini adalah titik penting dalam perjalanan saya.
        </p>
        <br />
        <h2>Tantangan & Pelajaran</h2>
        <br />
        <p>
          Salah satu tantangan terbesar adalah tetap termotivasi dan konsisten. Belajar mandiri bisa jadi membosankan dan mengisolasi.
        </p>
        <br />
        <p>
          Saya mengalami sikap imposter syndrome dan sering meragukan kemampuan saya. Ini adalah perasaan umum bagi banyak developer yang belajar mandiri.
        </p>
        <br />
        <p>
          Kunci untuk mengatasi ini adalah menemukan komunitas, menetapkan tujuan yang jelas, dan terus-menerus menantang diri sendiri.
        </p>
        <br />
        <p>
          Saya juga belajar pentingnya membangun portfolio. Bukan hanya resume; ini adalah pameran kemampuan dan proyek Anda.
        </p>
        <br />
        <p>
          Akhirnya, saya menyadari bahwa belajar adalah perjalanan hidup. Selalu ada sesuatu yang baru untuk dipelajari, dan baiklah untuk mengambil istirahat atau mencari bantuan jika diperlukan.
        </p>
      </>
    ),
    contentJp: (
      <>
        <p>
          私の開発者人生で最も影響力のあるプロジェクトの一つでした。目的は、医療サービスをデジタル化し、患者と医療従事者の両方にとってよりアクセスしやすく効率的にすることでした。
        </p>
        <br />
        <h2>CiptaLifeをどう作ったか</h2>
        <br />
        <ol>
          <li>
            <b>1. 課題の特定</b>
            <p>
              まず、医師・看護師・患者にインタビューし、従来の手作業システムの課題を洗い出しました。記録紛失、長い待ち時間、透明性の欠如などが共通の問題でした。
            </p>
          </li>
          <br />
          <li>
            <b>2. ソリューション設計</b>
            <p>
              患者登録、予約、医療記録、分析などのモジュールを備えたWebプラットフォームを設計。UIはシンプルかつモバイル対応で、誰でも使いやすいようにしました。
            </p>
          </li>
          <br />
          <li>
            <b>3. 開発と統合</b>
            <p>
              フロントエンドはReactとNext.js、バックエンドはNode.jsとセキュアなDBで構築。既存の病院システムと連携し、データのプライバシーとセキュリティも確保しました。
            </p>
          </li>
          <br />
          <li>
            <b>4. ユーザートレーニングとフィードバック</b>
            <p>
              医療スタッフ向けにトレーニングを実施し、使い勝手向上のためのフィードバックを収集。ユーザーの声をもとに継続的に改善しました。
            </p>
          </li>
          <br />
          <li>
            <b>5. ローンチとインパクト</b>
            <p>
              ローンチ後、CiptaLifeは事務作業を削減し、患者体験を向上させ、保健局のデータ活用を促進しました。
            </p>
          </li>
        </ol>
        <br />
        <h3>学びと気づき</h3>
        <p>
          このプロジェクトを通じて、ユーザー中心設計、協働、テクノロジーの社会的インパクトの大切さを学びました。CiptaLifeが実際に使われているのを見るのは本当に嬉しかったです。
        </p>
        <br />
        <p>
          公共サービスのデジタル化を目指すなら、まず共感から始め、ユーザーのニーズに合わせて改善を重ねましょう。
        </p>
      </>
    ),
  },
  {
    slug: "real-projects-vs-tutorials",
    titleKey: "blog.realProjects.title",
    summaryKey: "blog.realProjects.summary",
    date: "2024-10-10",
    thumbnail: "/img/blog8.png",
    category: "Learning",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-orange-600",
    contentEn: (
      <>
        <p>
          Learning from tutorials is a great way to get started, but building real projects is where the magic happens. In this article, I’ll share my experiences building projects from scratch and the benefits of doing so.
        </p>
        <br />
        <h2>Why Build Real Projects?</h2>
        <br />
        <p>
          Building projects from scratch forces you to learn the fundamentals deeply. When you start with a tutorial, you might get the code to work, but you don’t understand why it works.
        </p>
        <br />
        <p>
          For example, if you’re learning React, you might copy a component from a tutorial, but you won’t understand the state management, props, or hooks.
        </p>
        <br />
        <p>
          When you build a real project, you have to think about:
        </p>
        <ul>
          <li>What data needs to be fetched?</li>
          <li>How will the data be managed?</li>
          <li>How will the user interact with the application?</li>
          <li>How will the application handle errors?</li>
        </ul>
        <br />
        <p>
          This forces you to learn the underlying concepts and apply them.
        </p>
        <br />
        <p>
          The second benefit is that building projects gives you a portfolio. It’s not just about writing code; it’s about solving real problems and demonstrating your skills.
        </p>
        <br />
        <p>
          Finally, building projects is fun! It’s a great way to apply your knowledge and create something that people can use.
        </p>
      </>
    ),
    contentId: (
      <>
        <p>
          Belajar dari tutorial adalah cara yang bagus untuk memulai, tapi membangun proyek nyata adalah saat keajaiban terjadi. Di artikel ini, saya akan berbagi pengalaman saya membangun proyek dari awal dan keuntungan dari hal itu.
        </p>
        <br />
        <h2>Mengapa Membangun Proyek Nyata?</h2>
        <br />
        <p>
          Membangun proyek dari awal memaksa Anda untuk memahami dasar-dasar secara mendalam. Ketika Anda mulai dengan tutorial, Anda mungkin mendapatkan kode untuk berfungsi, tapi Anda tidak memahami mengapa kodenya berfungsi.
        </p>
        <br />
        <p>
          Misalnya, jika Anda sedang belajar React, Anda mungkin menyalin komponen dari tutorial, tapi Anda tidak akan memahami manajemen state, props, atau hooks.
        </p>
        <br />
        <p>
          Ketika Anda membangun proyek nyata, Anda harus memikirkan:
        </p>
        <ul>
          <li>Data apa yang perlu diambil?</li>
          <li>Bagaimana data akan dikelola?</li>
          <li>Bagaimana pengguna akan berinteraksi dengan aplikasi?</li>
          <li>Bagaimana aplikasi akan menangani error?</li>
        </ul>
        <br />
        <p>
          Ini memaksa Anda untuk mempelajari konsep dasar dan menerapkannya.
        </p>
        <br />
        <p>
          Manfaat kedua adalah membangun proyek memberikan portfolio. Bukan hanya tentang menulis kode; ini tentang memecahkan masalah nyata dan menunjukkan kemampuan Anda.
        </p>
        <br />
        <p>
          Akhirnya, membangun proyek itu menyenangkan! Ini adalah cara yang bagus untuk menerapkan pengetahuan Anda dan membuat sesuatu yang dapat digunakan oleh orang lain.
        </p>
      </>
    ),
    contentJp: (
      <>
        <p>
          チュートリアルから学ぶことは、良い出発点ですが、実際のプロジェクトを作ることで、魔法が起こります。この記事では、私の経験と、これを行う利点について共有します。
        </p>
        <br />
        <h2>なぜ実際のプロジェクトを作るのか？</h2>
        <br />
        <p>
          実際のプロジェクトを作ることは、基礎を深く理解することを強制します。チュートリアルから始めると、コードが動作することを学びますが、なぜ動作するのかを理解しません。
        </p>
        <br />
        <p>
          Reactを学ぶとき、チュートリアルからコンポーネントをコピーしても、状態管理、props、hooksについて理解しません。
        </p>
        <br />
        <p>
          実際のプロジェクトを作るとき、考える必要があります：
        </p>
        <ul>
          <li>データはどのように取得する必要がありますか？</li>
          <li>データはどのように管理されますか？</li>
          <li>アプリケーションとどのようにユーザーがやり取りしますか？</li>
          <li>アプリケーションはエラーをどのように処理しますか？</li>
        </ul>
        <br />
        <p>
          これにより、基礎的な概念を学び、それらを適用することが強制されます。
        </p>
        <br />
        <p>
          2番目の利点は、実際のプロジェクトを作ることでポートフォリオを作ることです。これはコードを書くことだけではありません。実際の問題を解決し、スキルを示すことです。
        </p>
        <br />
        <p>
          最後に、実際のプロジェクトは楽しいです！知識を適用し、誰かが使えるものを作る方法です。
        </p>
      </>
    ),
  },
  {
    slug: "self-taught-motivation",
    titleKey: "blog.selfTaughtMotivation.title",
    summaryKey: "blog.selfTaughtMotivation.summary",
    date: "2024-02-25",
    thumbnail: "/img/blog9.png",
    category: "Personal Growth",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-cyan-700",
    contentEn: (
      <>
        <p>
          Self-taught developers face unique challenges and often struggle with motivation. In this article, I’ll share my experiences and tips for staying motivated and overcoming common self-taught developer struggles.
        </p>
        <br />
        <h2>Common Self-Taught Developer Struggles</h2>
        <br />
        <p>
          One of the most significant challenges is imposter syndrome. Many self-taught developers feel like they don’t deserve the skills they’ve acquired or the opportunities they’ve achieved.
        </p>
        <br />
        <p>
          I’ve felt this many times. It’s a natural feeling, but it’s important to recognize that you’ve put in the work and effort to learn.
        </p>
        <br />
        <p>
          Another struggle is finding a community. It’s hard to find people who understand your struggles and can relate to your journey.
        </p>
        <br />
        <p>
          I found my community through meetups and online forums. It’s crucial to find a group of people who inspire and motivate you.
        </p>
        <br />
        <p>
          The third challenge is staying consistent. Self-taught learning can be lonely and isolating. You might feel like giving up or doubting your abilities.
        </p>
        <br />
        <p>
          I’ve experienced this many times. It’s normal to feel overwhelmed or discouraged. The key is to find a community, set clear goals, and continuously challenge yourself.
        </p>
        <br />
        <p>
          Finally, building a portfolio is crucial. It’s not just about writing code; it’s about solving real problems and demonstrating your skills.
        </p>
        <br />
        <p>
          I’ve learned that learning is a lifelong journey. There’s always something new to learn, and it’s okay to take breaks or seek help when needed.
        </p>
      </>
    ),
    contentId: (
      <>
        <p>
          Self-taught developers face unique challenges and often struggle with motivation. In this article, I’ll share my experiences and tips for staying motivated and overcoming common self-taught developer struggles.
        </p>
        <br />
        <h2>Common Self-Taught Developer Struggles</h2>
        <br />
        <p>
          One of the most significant challenges is imposter syndrome. Many self-taught developers feel like they don’t deserve the skills they’ve acquired or the opportunities they’ve achieved.
        </p>
        <br />
        <p>
          I’ve felt this many times. It’s a natural feeling, but it’s important to recognize that you’ve put in the work and effort to learn.
        </p>
        <br />
        <p>
          Another struggle is finding a community. It’s hard to find people who understand your struggles and can relate to your journey.
        </p>
        <br />
        <p>
          I found my community through meetups and online forums. It’s crucial to find a group of people who inspire and motivate you.
        </p>
        <br />
        <p>
          The third challenge is staying consistent. Self-taught learning can be lonely and isolating. You might feel like giving up or doubting your abilities.
        </p>
        <br />
        <p>
          I’ve experienced this many times. It’s normal to feel overwhelmed or discouraged. The key is to find a community, set clear goals, and continuously challenge yourself.
        </p>
        <br />
        <p>
          Finally, building a portfolio is crucial. It’s not just about writing code; it’s about solving real problems and demonstrating your skills.
        </p>
        <br />
        <p>
          I’ve learned that learning is a lifelong journey. There’s always something new to learn, and it’s okay to take breaks or seek help when needed.
        </p>
      </>
    ),
    contentJp: (
      <>
        <p>
          Self-taught developers face unique challenges and often struggle with motivation. In this article, I’ll share my experiences and tips for staying motivated and overcoming common self-taught developer struggles.
        </p>
        <br />
        <h2>Common Self-Taught Developer Struggles</h2>
        <br />
        <p>
          One of the most significant challenges is imposter syndrome. Many self-taught developers feel like they don’t deserve the skills they’ve acquired or the opportunities they’ve achieved.
        </p>
        <br />
        <p>
          I’ve felt this many times. It’s a natural feeling, but it’s important to recognize that you’ve put in the work and effort to learn.
        </p>
        <br />
        <p>
          Another struggle is finding a community. It’s hard to find people who understand your struggles and can relate to your journey.
        </p>
        <br />
        <p>
          I found my community through meetups and online forums. It’s crucial to find a group of people who inspire and motivate you.
        </p>
        <br />
        <p>
          The third challenge is staying consistent. Self-taught learning can be lonely and isolating. You might feel like giving up or doubting your abilities.
        </p>
        <br />
        <p>
          I’ve experienced this many times. It’s normal to feel overwhelmed or discouraged. The key is to find a community, set clear goals, and continuously challenge yourself.
        </p>
        <br />
        <p>
          Finally, building a portfolio is crucial. It’s not just about writing code; it’s about solving real problems and demonstrating your skills.
        </p>
        <br />
        <p>
          I’ve learned that learning is a lifelong journey. There’s always something new to learn, and it’s okay to take breaks or seek help when needed.
        </p>
      </>
    ),
  },
  {
    slug: "soft-skills-in-tech",
    titleKey: "blog.softSkills.title",
    summaryKey: "blog.softSkills.summary",
    date: "2025-02-10",
    thumbnail: "/img/blog10.png",
    category: "Personal Growth",
    author: "Hilmi",
    avatar: "/img/avatar.png",
    badgeColor: "bg-lime-700",
    contentEn: (
      <>
        <p>
          Soft skills are just as important as technical skills in the tech industry. In this article, I’ll share my experiences and tips for developing soft skills.
        </p>
        <br />
        <h2>Why Soft Skills Matter</h2>
        <br />
        <p>
          Soft skills are the interpersonal and communication skills that enable you to work effectively with others. They are crucial for success in any career, not just tech.
        </p>
        <br />
        <p>
          For example, if you’re a developer, you might be able to write code, but if you can’t communicate your ideas clearly or collaborate effectively with others, your work might suffer.
        </p>
        <br />
        <p>
          I’ve learned that soft skills are not just about being polite or friendly; they are about understanding others, empathy, and effective communication.
        </p>
        <br />
        <p>
          I’ve also learned that soft skills are not fixed; they can be developed and improved over time.
        </p>
        <br />
        <p>
          The key to developing soft skills is to be aware of them, seek feedback, and practice regularly.
        </p>
        <br />
        <p>
          I’ve found that soft skills are essential for career growth and success. They help you build better relationships, communicate more effectively, and ultimately achieve your goals.
        </p>
      </>
    ),
    contentId: (
      <>
        <p>
          Soft skills are just as important as technical skills in the tech industry. In this article, I’ll share my experiences and tips for developing soft skills.
        </p>
        <br />
        <h2>Why Soft Skills Matter</h2>
        <br />
        <p>
          Soft skills are the interpersonal and communication skills that enable you to work effectively with others. They are crucial for success in any career, not just tech.
        </p>
        <br />
        <p>
          For example, if you’re a developer, you might be able to write code, but if you can’t communicate your ideas clearly or collaborate effectively with others, your work might suffer.
        </p>
        <br />
        <p>
          I’ve learned that soft skills are not just about being polite or friendly; they are about understanding others, empathy, and effective communication.
        </p>
        <br />
        <p>
          I’ve also learned that soft skills are not fixed; they can be developed and improved over time.
        </p>
        <br />
        <p>
          The key to developing soft skills is to be aware of them, seek feedback, and practice regularly.
        </p>
        <br />
        <p>
          I’ve found that soft skills are essential for career growth and success. They help you build better relationships, communicate more effectively, and ultimately achieve your goals.
        </p>
      </>
    ),
    contentJp: (
      <>
        <p>
          Soft skills are just as important as technical skills in the tech industry. In this article, I’ll share my experiences and tips for developing soft skills.
        </p>
        <br />
        <h2>Why Soft Skills Matter</h2>
        <br />
        <p>
          Soft skills are the interpersonal and communication skills that enable you to work effectively with others. They are crucial for success in any career, not just tech.
        </p>
        <br />
        <p>
          For example, if you’re a developer, you might be able to write code, but if you can’t communicate your ideas clearly or collaborate effectively with others, your work might suffer.
        </p>
        <br />
        <p>
          I’ve learned that soft skills are not just about being polite or friendly; they are about understanding others, empathy, and effective communication.
        </p>
        <br />
        <p>
          I’ve also learned that soft skills are not fixed; they can be developed and improved over time.
        </p>
        <br />
        <p>
          The key to developing soft skills is to be aware of them, seek feedback, and practice regularly.
        </p>
        <br />
        <p>
          I’ve found that soft skills are essential for career growth and success. They help you build better relationships, communicate more effectively, and ultimately achieve your goals.
        </p>
      </>
    ),
  },
]

export default function BlogDetailPage() {
  const { slug } = useParams()
  const { t, language } = useLanguage()
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return notFound()

  // Ambil 3 artikel terbaru selain yang sedang dibuka
  const latestPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3)
  const categories = [
    { label: t("blog.category.project"), value: "project-experience" },
    { label: t("blog.category.tech"), value: "tech-stack" },
    { label: t("blog.category.learning"), value: "learning" },
    { label: t("blog.category.growth"), value: "personal-growth" },
  ]
  const tags = ["#Nextjs", "#WebDev", "#Portfolio", "#Tips", "#Motivation"]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar tetap pakai komponen yang sama */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-lg sm:text-xl font-bold text-white">HILMI PORTFOLIO</div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link href="/" className="hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">
                {t("nav.home")}
              </Link>
              <Link href="/projects" className="hover:text-gray-300 transition-colors text-sm uppercase tracking-wider">
                {t("nav.project")}
              </Link>
              <Link href="/blog" className="hover:text-gray-300 transition-colors text-sm uppercase tracking-wider font-bold">
                {t("nav.blog")}
              </Link>
              <LanguageSwitcher />
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm" className="text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div className="pt-24"> {/* Tambahkan padding top agar konten tidak ketutup navbar */}
        <div className="min-h-screen bg-black text-white px-2 sm:px-4 py-8 flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <div className="bg-gray-900 rounded-2xl shadow-xl px-6 sm:px-10 py-8 mb-8">
              <div className="mb-6">
                <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold mb-4">
                  <ArrowLeft className="w-4 h-4" /> {t("blog.backToList")}
                </Link>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black mb-4">{t(post.titleKey)}</h1>
              <div className="flex items-center gap-3 text-gray-400 text-sm mb-6">
                <img src={post.avatar} alt={post.author} className="w-7 h-7 rounded-full border border-gray-700" />
                <span>{post.author}</span>
                <span>&bull;</span>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="rounded-xl overflow-hidden mb-8">
                <img src={post.thumbnail} alt={t(post.titleKey)} className="w-full h-64 object-cover" />
              </div>
              <div className="text-lg text-gray-300 mb-8">
                {t(post.summaryKey)}
              </div>
              <div className="prose prose-invert max-w-none text-gray-200">
                {(post as any)[`content${language.charAt(0).toUpperCase() + language.slice(1)}`]}
              </div>
            </div>
          </article>
          {/* Sidebar */}
          <aside className="hidden lg:block w-full max-w-xs flex-shrink-0">
            <div className="bg-gray-900 rounded-2xl shadow-lg p-6 sticky top-24 flex flex-col gap-8 max-h-[90vh] overflow-y-auto">
              <div>
                <h3 className="text-lg font-bold mb-4">{t("blog.latestPosts")}</h3>
                <ul className="space-y-4">
                  {latestPosts.map(p => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="flex items-center gap-3 group">
                        <img src={p.thumbnail} alt={t(p.titleKey)} className="w-14 h-14 rounded-lg object-cover border border-gray-800" />
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:underline line-clamp-2">{t(p.titleKey)}</div>
                          <div className="text-xs text-gray-400">{new Date(p.date).toLocaleDateString()}</div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">{t("blog.categories")}</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <span key={cat.value} className="px-3 py-1 rounded-full bg-gray-800 text-gray-200 text-xs font-semibold">
                      {cat.label}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">{t("blog.popularTags")}</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-gray-800 text-gray-200 text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
} 