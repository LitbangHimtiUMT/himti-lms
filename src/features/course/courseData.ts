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
  }
};
