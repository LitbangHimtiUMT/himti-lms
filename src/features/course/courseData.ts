import jsModul1 from "../../core/modul/fundamental-js/modul-1-dasar-javascript.md?raw";
import jsModul2 from "../../core/modul/fundamental-js/modul-2-pengambilan-keputusan.md?raw";
import jsModul3 from "../../core/modul/fundamental-js/modul-3-function-dan-loop.md?raw";
import jsModul4 from "../../core/modul/fundamental-js/modul-4-array-dan-object.md?raw";
import jsModul5 from "../../core/modul/fundamental-js/modul-5-dom-dan-event.md?raw";
import jsModul6 from "../../core/modul/fundamental-js/modul-6-dom-lanjutan.md?raw";
import jsModul7 from "../../core/modul/fundamental-js/modul-7-proyek-akhir.md?raw";

import reactModul1 from "../../core/modul/fundamental-reactjs/modul-1-pengenalan-react.md?raw";
import reactModul2 from "../../core/modul/fundamental-reactjs/modul-2-instalasi-dan-struktur.md?raw";
import reactModul3 from "../../core/modul/fundamental-reactjs/modul-3-component-dan-jsx.md?raw";
import reactModul4 from "../../core/modul/fundamental-reactjs/modul-4-props.md?raw";
import reactModul5 from "../../core/modul/fundamental-reactjs/modul-5-styling-tailwind.md?raw";
import reactModul6 from "../../core/modul/fundamental-reactjs/modul-6-landing-page-dan-spa.md?raw";
import reactModul7 from "../../core/modul/fundamental-reactjs/modul-7-praktik-dan-troubleshooting.md?raw";

import modernReactModul1 from "../../core/modul/modern-react-app/modul-1-modern-react-overview.md?raw";
import modernReactModul2 from "../../core/modul/modern-react-app/modul-2-react-hooks.md?raw";
import modernReactModul3 from "../../core/modul/modern-react-app/modul-3-react-router.md?raw";
import modernReactModul4 from "../../core/modul/modern-react-app/modul-4-component-library.md?raw";
import modernReactModul5 from "../../core/modul/modern-react-app/modul-5-public-api-integration.md?raw";
import modernReactModul6 from "../../core/modul/modern-react-app/modul-6-gemini-ai-integration.md?raw";
import modernReactModul7 from "../../core/modul/modern-react-app/modul-7-mini-project.md?raw";

import modernWebModul1 from "../../core/modul/modern-web-toko-online/modul-1-struktur-semantik.md?raw";
import modernWebModul2 from "../../core/modul/modern-web-toko-online/modul-2-design-tokens.md?raw";
import modernWebModul3 from "../../core/modul/modern-web-toko-online/modul-3-layout-flexbox-grid.md?raw";
import modernWebModul4 from "../../core/modul/modern-web-toko-online/modul-4-komponen-micro-interaction.md?raw";
import modernWebModul5 from "../../core/modul/modern-web-toko-online/modul-5-responsive-dark-mode.md?raw";
import modernWebModul6 from "../../core/modul/modern-web-toko-online/modul-6-proyek-akhir-publish.md?raw";

export interface ModuleData {
  id: string;
  title: string;
  order: number;
  markdown: string;
  question: string;
  criteria: string;
}

export const jsCourseModules: ModuleData[] = [
  {
    id: "modul-1",
    title: "Modul 1: Dasar-Dasar JavaScript",
    order: 1,
    markdown: jsModul1,
    question: "Tuliskan kode JavaScript untuk mendeklarasikan variabel nama mahasiswa menggunakan const, variabel umur menggunakan let, dan tampilkan keduanya dalam bentuk kalimat perkenalan menggunakan template literals!",
    criteria: "Harus menggunakan const untuk nama, let untuk umur, dan menggabungkannya memakai template literals (backticks dengan ${nama} dan ${umur})."
  },
  {
    id: "modul-2",
    title: "Modul 2: Pengambilan Keputusan",
    order: 2,
    markdown: jsModul2,
    question: "Buatlah pengondisian menggunakan ternary operator untuk menentukan apakah total belanja mahasiswa mendapatkan diskon. Jika total belanja lebih besar dari 100000, maka diskon = true, jika tidak maka diskon = false.",
    criteria: "Harus menggunakan ternary operator (kondisi ? true : false) dan menyimpannya ke dalam variabel diskon."
  },
  {
    id: "modul-3",
    title: "Modul 3: Function dan Loop",
    order: 3,
    markdown: jsModul3,
    question: "Buatlah sebuah arrow function bernama cetakGanjil yang menerima satu parameter angka N, lalu menggunakan for loop untuk mencetak angka ganjil saja dari 1 sampai N menggunakan console.log!",
    criteria: "Menggunakan arrow function (const cetakGanjil = (N) => { ... }), perulangan for loop, dan kondisi (i % 2 !== 0) untuk menyaring angka ganjil."
  },
  {
    id: "modul-4",
    title: "Modul 4: Array dan Object",
    order: 4,
    markdown: jsModul4,
    question: "Tuliskan kode menggunakan method .filter() untuk menyaring nilai array [45, 60, 75, 80, 55] agar hanya tersisa angka yang bernilai >= 60!",
    criteria: "Harus menggunakan method filter() bawaan array Javascript dan function callback (e.g. .filter(n => n >= 60))."
  },
  {
    id: "modul-5",
    title: "Modul 5: DOM dan Event",
    order: 5,
    markdown: jsModul5,
    question: "Tuliskan baris kode JavaScript untuk mengambil tombol dengan ID 'ganti-tema' lalu pasangkan event listener klik yang jika diklik akan menambahkan class 'dark-theme' ke element document.body!",
    criteria: "Menggunakan document.querySelector('#ganti-tema'), addEventListener('click', ...), dan document.body.classList.add('dark-theme') atau classList.toggle()."
  },
  {
    id: "modul-6",
    title: "Modul 6: DOM Lanjutan",
    order: 6,
    markdown: jsModul6,
    question: "Bagaimana cara menyimpan object data { nama: 'Budi', nim: '123' } ke dalam localStorage dengan key 'mahasiswa_aktif' agar tipenya tetap tersimpan sebagai string JSON?",
    criteria: "Harus menggunakan localStorage.setItem('mahasiswa_aktif', JSON.stringify(object))."
  },
  {
    id: "modul-7",
    title: "Modul 7: Proyek Akhir",
    order: 7,
    markdown: jsModul7,
    question: "Sebutkan tema proyek akhir yang ingin Anda bangun, serta tuliskan rancangan struktur data (Array of Objects) minimal 3 properti yang akan Anda simpan di localStorage untuk mengelola aplikasi tersebut!",
    criteria: "Menyebutkan tema aplikasi secara jelas, dan menuliskan skema array of objects dengan properti kunci seperti id, title/name, dan status/kategori."
  }
];

export const reactCourseModules: ModuleData[] = [
  {
    id: "modul-1",
    title: "Modul 1: Pengenalan React & Persiapan Environment",
    order: 1,
    markdown: reactModul1,
    question: "Sebutkan 2 masalah utama dari manipulasi DOM secara manual menggunakan JavaScript biasa (Vanilla JS) pada website berskala besar!",
    criteria: "Menyebutkan performa lambat (reflow/repaint), kode berantakan/sulit dikelola, atau state/data yang sulit disinkronisasi."
  },
  {
    id: "modul-2",
    title: "Modul 2: Instalasi React & Struktur Project",
    order: 2,
    markdown: reactModul2,
    question: "Sebutkan 3 file/folder utama bawaan proyek React-Vite beserta fungsinya masing-masing secara singkat!",
    criteria: "Menyebutkan folder src (tempat kode), node_modules (dependensi), package.json (konfigurasi), index.html (halaman utama), main.jsx (entry point), atau App.jsx (komponen induk)."
  },
  {
    id: "modul-3",
    title: "Modul 3: React Component & JSX",
    order: 3,
    markdown: reactModul3,
    question: "Sebutkan 3 perbedaan utama penulisan sintaks HTML biasa jika dibandingkan dengan penulisan JSX di React!",
    criteria: "Menyebutkan class menjadi className, wajib ditutup (self-closing tag), style menggunakan objek JavaScript {{}}, onclick menjadi onClick (camelCase), atau for menjadi htmlFor."
  },
  {
    id: "modul-4",
    title: "Modul 4: Mengirim Data dengan Props",
    order: 4,
    markdown: reactModul4,
    question: "Bolehkah kita mengubah nilai data Props secara langsung di dalam komponen anak (penerima)? Jelaskan singkat alasannya!",
    criteria: "Menjawab tidak boleh, karena props bersifat Read-Only (immutable) untuk menjaga aliran data satu arah."
  },
  {
    id: "modul-5",
    title: "Modul 5: React Styling dengan Tailwind CSS",
    order: 5,
    markdown: reactModul5,
    question: "Sebutkan nama kelas utilitas (utility class) Tailwind CSS yang digunakan untuk mengatur: (1) Tata letak Flexbox, (2) Padding horizontal, (3) Sudut melengkung besar!",
    criteria: "Menyebutkan kelas 'flex', 'px-...', dan 'rounded-xl' atau 'rounded-2xl'."
  },
  {
    id: "modul-6",
    title: "Modul 6: Projek Landing Page & Cara Kerja SPA",
    order: 6,
    markdown: reactModul6,
    question: "Jelaskan dengan bahasa sederhana apa yang dimaksud dengan Single Page Application (SPA) dan mengapa website SPA tidak perlu reload penuh saat berpindah halaman!",
    criteria: "Menjelaskan bahwa SPA hanya memuat 1 file HTML di awal, dan perpindahan halaman diganti secara instan lewat JavaScript tanpa perlu reload browser."
  },
  {
    id: "modul-7",
    title: "Modul 7: Panduan Troubleshooting & Evaluasi Akhir",
    order: 7,
    markdown: reactModul7,
    question: "Sebutkan 2 jenis error umum yang sering dihadapi saat menulis kode React dan bagaimana solusi singkat untuk menyelesaikannya!",
    criteria: "Menyebutkan error Module not found (cek path impor), tag JSX tidak ditutup (tambah tag /), npm command not found (install Node.js), atau Tailwind tidak berfungsi (restart server / cek config)."
  }
];

export const modernReactCourseModules: ModuleData[] = [
  {
    id: "modul-1",
    title: "Modul 1: Modern React Application Overview",
    order: 1,
    markdown: modernReactModul1,
    question: "Sebutkan 3 komponen utama dalam arsitektur aplikasi React modern selain komponen UI visual biasa!",
    criteria: "Menyebutkan Routing (React Router), API Integration (Fetch API), Component Library (shadcn/ui), atau AI Integration (Gemini API)."
  },
  {
    id: "modul-2",
    title: "Modul 2: React Hooks (useState & useEffect)",
    order: 2,
    markdown: modernReactModul2,
    question: "Jelaskan kegunaan utama useState dan kegunaan array dependensi kosong [] di useEffect!",
    criteria: "Menyebutkan useState untuk mengelola data state dinamis, dan array kosong [] agar efek samping/fetch hanya dipicu sekali di awal."
  },
  {
    id: "modul-3",
    title: "Modul 3: React Router",
    order: 3,
    markdown: modernReactModul3,
    question: "Jelaskan perbedaan kegunaan antara komponen Link dan NavLink pada React Router v7!",
    criteria: "Menjelaskan bahwa Link digunakan untuk navigasi biasa, sedangkan NavLink memiliki kemampuan deteksi status aktif/style aktif secara otomatis."
  },
  {
    id: "modul-4",
    title: "Modul 4: Component Library (shadcn/ui)",
    order: 4,
    markdown: modernReactModul4,
    question: "Mengapa industri modern lebih memilih menggunakan Component Library (seperti shadcn/ui) dibanding menulis CSS dari awal?",
    criteria: "Menyebutkan faktor kecepatan/efisiensi pengerjaan, konsistensi desain, aksesibilitas, responsivitas, atau kemudahan kustomisasi."
  },
  {
    id: "modul-5",
    title: "Modul 5: Public API Integration",
    order: 5,
    markdown: modernReactModul5,
    question: "Sebutkan token autentikasi Bearer dan parameter query limit & q yang digunakan untuk mencari negara di REST Countries API v5!",
    criteria: "Menyebutkan token 'rc_live_11b0d9a0acf547ebb9533897f54cacfa' dan parameter query 'limit=...' dan 'q=...'."
  },
  {
    id: "modul-6",
    title: "Modul 6: Gemini AI Integration",
    order: 6,
    markdown: modernReactModul6,
    question: "Sebutkan nama package SDK resmi yang digunakan untuk integrasi Gemini AI di aplikasi React modern dan bagaimana cara menyimpan API Key secara aman di environment variables!",
    criteria: "Menyebutkan package '@google/genai' dan penyimpanan menggunakan file '.env' dengan prefix 'VITE_GEMINI_API_KEY' atau sejenisnya."
  },
  {
    id: "modul-7",
    title: "Modul 7: Mini Project (AI Country Explorer)",
    order: 7,
    markdown: modernReactModul7,
    question: "Sebutkan tema mini project Modern React App yang ingin Anda bangun, serta tuliskan minimal 3 kriteria wajib fitur yang akan diimplementasikan!",
    criteria: "Menyebutkan tema aplikasi (seperti Country Explorer, AI Study Assistant, dll) dan fitur wajib (seperti multi-page routing, component library, API integration, atau AI)."
  }
];

export const modernWebCourseModules: ModuleData[] = [
  {
    id: "modul-1",
    title: "Modul 1: Struktur Semantik & Persiapan Proyek",
    order: 1,
    markdown: modernWebModul1,
    question: "Sebutkan 4 tag semantik HTML5 yang dipakai untuk menyusun kerangka toko online beserta fungsi singkatnya masing-masing, dan sebutkan tag yang cocok untuk membungkus satu kartu produk!",
    criteria: "Menyebutkan minimal 4 dari header, nav, main, section, article, footer beserta fungsi yang benar (misalnya header = bagian atas halaman, nav = menu navigasi, main = isi utama, section = bagian bertema, footer = bagian bawah), dan menyebut article sebagai pembungkus satu kartu produk."
  },
  {
    id: "modul-2",
    title: "Modul 2: Design Tokens & Tipografi",
    order: 2,
    markdown: modernWebModul2,
    question: "Tuliskan CSS untuk mendefinisikan variabel warna --utama dengan nilai #C2410C di :root, lalu gunakan variabel itu sebagai warna teks class .eyebrow!",
    criteria: "Harus memakai :root { --utama: #C2410C; } dan .eyebrow { color: var(--utama); }, yaitu selector :root, nama variabel berawalan dua tanda hubung (--), dan fungsi var()."
  },
  {
    id: "modul-3",
    title: "Modul 3: Layout Modern dengan Flexbox & Grid",
    order: 3,
    markdown: modernWebModul3,
    question: "Tuliskan CSS Grid agar deretan kartu produk otomatis menyesuaikan jumlah kolom tanpa media query (lebar minimal tiap kolom 260px) dengan jarak antar kartu 24px!",
    criteria: "Harus memakai display: grid, gap: 24px, dan grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))."
  },
  {
    id: "modul-4",
    title: "Modul 4: Komponen & Micro-interaction",
    order: 4,
    markdown: modernWebModul4,
    question: "Tuliskan CSS agar foto produk di dalam .thumb membesar 5% saat kartu .product di-hover, dengan perubahan halus 0.3 detik dan foto tidak keluar dari bingkainya!",
    criteria: "Harus memakai .thumb { overflow: hidden; }, .thumb img { transition: transform 0.3s; }, dan .product:hover .thumb img { transform: scale(1.05); }."
  },
  {
    id: "modul-5",
    title: "Modul 5: Responsive & Dark Mode",
    order: 5,
    markdown: modernWebModul5,
    question: "Tuliskan media query agar variabel --bg berubah menjadi #14110F saat perangkat memakai mode gelap, lalu jelaskan mengapa CSS variables membuat dark mode lebih mudah dibuat!",
    criteria: "Harus memakai @media (prefers-color-scheme: dark) { :root { --bg: #14110F; } } dan menjelaskan bahwa cukup mengganti nilai variabel di satu tempat sehingga semua elemen yang memakai var(--bg) ikut berubah."
  },
  {
    id: "modul-6",
    title: "Modul 6: Proyek Akhir & Publish",
    order: 6,
    markdown: modernWebModul6,
    question: "Sebutkan 3 hal yang harus diperiksa sebelum toko online dipublikasikan dan 1 cara mempublikasikan website statis secara gratis!",
    criteria: "Menyebutkan minimal 3 pemeriksaan (tampil rapi di HP/responsive, link WhatsApp dan gambar berfungsi, tidak ada error di Console, title dan meta description terisi, teks terbaca di dark mode, atau atribut alt pada gambar) dan 1 layanan publikasi gratis seperti Netlify Drop, GitHub Pages, atau Vercel."
  }
];

export const coursesCatalogData: Record<string, { title: string; category: string; modules: ModuleData[] }> = {
  javascript: {
    title: "Fundamental JavaScript",
    category: "Web Development Course",
    modules: jsCourseModules,
  },
  react: {
    title: "React Fundamentals",
    category: "Web Development Course",
    modules: reactCourseModules,
  },
  "modern-react": {
    title: "Modern React Application",
    category: "Web Development Course",
    modules: modernReactCourseModules,
  },
  "modern-web": {
    title: "Modern Web: Toko Online",
    category: "Web Development Course",
    modules: modernWebCourseModules,
  }
};
