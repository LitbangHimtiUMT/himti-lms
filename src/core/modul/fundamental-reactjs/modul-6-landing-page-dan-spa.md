# MODUL 6: Projek Landing Page & Cara Kerja SPA

Halo rekan-rekan mahasiswa! Selamat datang di **Modul 6**.

Setelah memahami dasar komponen, menulis JSX, mengalirkan data melalui Props, dan menggunakan Tailwind CSS untuk styling, sekarang adalah saat yang ditunggu-tunggu! Kita akan menantang diri untuk menyatukan semua potongan ilmu tersebut menjadi sebuah proyek nyata: membangun halaman pendaratan (**Landing Page**) resmi untuk organisasi **HIMTI UMT**.

Selain mempraktikkan coding komponennya, kita juga akan membedah teori penting mengenai cara kerja React di balik layar, yaitu konsep **Single Page Application (SPA)** dan keajaiban **Virtual DOM** yang membuatnya bekerja super cepat.

Mari kita langsung mulai koding!

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Merencanakan arsitektur komponen UI untuk sebuah halaman web dinamis.
2. Membangun komponen-komponen mandiri (`Navbar`, `Hero`, `About`, `Program`, `Footer`) dan mengintegrasikannya ke file induk `App.jsx`.
3. Menampilkan daftar data dinamis berbasis array menggunakan perulangan `.map()` dan atribut `key` unik di React.
4. Menjelaskan perbedaan mendasar cara kerja *Single Page Application* (SPA) dibanding *Multi-Page Application* (MPA).
5. Menjelaskan proses *Diffing* dan *Reconciliation* pada sistem Virtual DOM React.

---

## 9.1 Merancang Arsitektur Komponen

Sebelum menulis baris kode pertama, biasakan untuk merancang tata letak halaman web kalian terlebih dahulu. Untuk Landing Page HIMTI ini, kita akan memecah halaman menjadi 5 komponen mandiri:

```text
App.jsx (Komponen Utama)
├── Navbar.jsx  (Menu navigasi responsif di atas)
├── Hero.jsx    (Judul utama, deskripsi, dan tombol CTA)
├── About.jsx   (Informasi singkat & keunggulan organisasi)
├── Program.jsx (Daftar mata kuliah/kurikulum belajar)
└── Footer.jsx  (Informasi hak cipta, menu, & media sosial)
```

---

## 9.2 Membuat Komponen-Komponen Landing Page

Sebelum membuat komponen di bawah ini, pastikan kalian telah membuat folder **`components`** di dalam folder **`src`** proyek kalian. Berikut adalah peta penempatan file agar kalian tidak kebingungan:
```text
himti-landing-page/
├── 📁 src/
│   ├── 📁 components/     <-- FOLDER UTAMA KOMPONEN!
│   │   ├── 📄 Navbar.jsx  <-- Buat file baru di sini
│   │   ├── 📄 Hero.jsx    <-- Buat file baru di sini
│   │   ├── 📄 About.jsx   <-- Buat file baru di sini
│   │   ├── 📄 Program.jsx <-- Buat file baru di sini
│   │   └── 📄 Footer.jsx  <-- Buat file baru di sini
│   ├── 📄 App.jsx
│   └── ...
```

### 1. Komponen Navigasi (`src/components/Navbar.jsx`)
Komponen ini bertugas menampilkan logo organisasi dan tautan navigasi ke berbagai bagian halaman.

```jsx
import React from 'react';

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-wider text-indigo-400">🏠 HIMTI UMT</span>
        </div>
        
        {/* Menu Navigasi Layar Lebar */}
        <div className="hidden md:flex space-x-6 font-medium">
          <a href="#about" className="hover:text-indigo-400 transition duration-300">Tentang</a>
          <a href="#program" className="hover:text-indigo-400 transition duration-300">Program</a>
          <a href="#contact" className="hover:text-indigo-400 transition duration-300">Kontak</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

#### 🔍 Penjelasan Baris Kode Navbar:
* **`sticky top-0 z-50`**: Membuat bilah navigasi menempel tetap di bagian atas layar saat di-scroll ke bawah. Nilai `z-50` memastikan menu berada di atas tumpukan elemen halaman lainnya.
* **`container mx-auto px-4`**: Mengatur konten agar berada di tengah halaman dengan batas margin kiri-kanan otomatis, serta memberikan ruang kosong (*padding*) di pinggir layar sebesar 16px.
* **`flex justify-between items-center`**: Mengaktifkan Flexbox untuk membagi logo ke sudut kiri dan menu link ke sudut kanan secara otomatis, serta meratakannya secara vertikal agar sejajar.
* **`hidden md:flex`**: Menyembunyikan menu tautan navigasi di layar HP (*hidden*) dan menampilkannya sebagai Flexbox (`flex`) hanya pada ukuran layar tablet/laptop ke atas (`md:`).

---

### 2. Komponen Banner Utama (`src/components/Hero.jsx`)
Bagian utama web yang bertugas menarik perhatian pengunjung. Kita gunakan latar belakang gradasi warna ungu-indigo khas teknologi modern.

```jsx
import React from 'react';

function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-24 border-b border-indigo-900/30">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Membangun Masa Depan Bersama <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">HIMTI Web Development</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto font-light">
          Belajar pemrograman React JS dan ekosistem modern dari nol didampingi oleh mentor berpengalaman.
        </p>
        <div className="flex justify-center gap-4">
          <a href="#program" className="bg-indigo-600 hover:bg-indigo-750 text-white font-bold py-3 px-8 rounded-xl transition duration-300 shadow-lg shadow-indigo-600/20">
            Mulai Belajar
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
```

#### 🔍 Penjelasan Baris Kode Hero:
* **`bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900`**: Membuat latar belakang berupa gradasi warna horizontal yang halus dari abu-abu gelap (`slate-900`), ungu-indigo pekat (`indigo-955`), hingga kembali ke abu-abu gelap.
* **`bg-clip-text text-transparent`**: Trik CSS modern untuk memotong latar belakang gradasi warna agar masuk ke dalam bentuk tulisan teks, lalu mengubah teks aslinya menjadi transparan agar gradasi warna tersebut terlihat pada huruf-huruf teks.
* **`text-4xl md:text-6xl`**: Mengatur ukuran teks judul menjadi 36px di layar ponsel, dan otomatis membesar menjadi 60px saat diakses via layar komputer.
* **`rounded-xl transition duration-300 shadow-lg shadow-indigo-600/20`**: Membuat tombol "Mulai Belajar" memiliki sudut melengkung modern, efek animasi halus selama 300ms saat disentuh, serta memberikan efek bayangan bercahaya warna indigo di bawahnya.

---

### 3. Komponen Tentang HIMTI (`src/components/About.jsx`)
Menyediakan informasi keunggulan organisasi dengan sistem layout grid 3 kolom pada laptop.

```jsx
import React from 'react';

function About() {
  return (
    <section id="about" className="py-20 bg-slate-950 text-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tentang HIMTI</h2>
          <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="text-3xl mb-4">👨‍💻</div>
            <h3 className="font-bold text-lg mb-2">Mentor Handal</h3>
            <p className="text-slate-400 text-sm">Didampingi senior berpengalaman di industri tech.</p>
          </div>
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="font-bold text-lg mb-2">Kurikulum Terkini</h3>
            <p className="text-slate-400 text-sm">Materi yang relevan dengan perkembangan industri global.</p>
          </div>
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="font-bold text-lg mb-2">Komunitas Solid</h3>
            <p className="text-slate-400 text-sm">Tempat berdiskusi, berkolaborasi, dan berbagi informasi.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
```

#### 🔍 Penjelasan Baris Kode About:
* **`id="about"`**: Menyematkan ID HTML untuk mempermudah navigasi pintasan (*anchor link*) dari Navbar agar saat menu "Tentang" diklik, halaman akan bergeser mulus ke arah section ini.
* **`grid grid-cols-1 md:grid-cols-3 gap-8`**: Mengaktifkan sistem layout Grid. Pada layar HP kecil, kartu informasi akan tersusun berurutan ke bawah (1 kolom), sedangkan pada layar laptop (`md:`), kartu otomatis tersusun mendatar ke samping (3 kolom) dengan jarak antar kartu sebesar 32px (`gap-8`).
* **`p-6 bg-slate-900 rounded-2xl border border-slate-800`**: Setiap kartu diberikan warna latar belakang yang sedikit lebih terang dibanding latar dasar halaman, sudut melengkung tebal (`rounded-2xl`), serta batas tepi tipis (`border-slate-800`) agar terkesan timbul dan premium.

---

### 4. Komponen Program Kurikulum (`src/components/Program.jsx`)
Komponen ini menggunakan perulangan array data untuk merender daftar kelas secara bersih menggunakan fungsi `.map()`.

```jsx
import React from 'react';

function Program() {
  const kurikulum = [
    { id: 1, title: 'HTML & CSS Dasar', level: 'Pemula', icon: '🎨' },
    { id: 2, title: 'JavaScript Dasar', level: 'Pemula', icon: '⚡' },
    { id: 3, title: 'React JS Fundamental', level: 'Menengah', icon: '⚛️' },
    { id: 4, title: 'Database & Backend API', level: 'Lanjutan', icon: '🔌' },
  ];

  return (
    <section id="program" className="py-20 bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Program Kami</h2>
          <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kurikulum.map((item) => (
            <div key={item.id} className="p-6 bg-slate-950 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition duration-300">
              <span className="text-4xl block mb-4">{item.icon}</span>
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/50 border border-indigo-900 px-2 py-0.5 rounded-md inline-block">
                {item.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Program;
```

#### 🔍 Penjelasan Baris Kode Program:
* **`kurikulum.map((item) => ( ... ))`**: Fungsi bawaan JavaScript untuk melakukan perulangan array objek `kurikulum` dan otomatis mengembalikan elemen JSX baru untuk setiap item data di dalamnya.
* **`key={item.id}`**: **Wajib dipasang!** Kunci identitas unik yang diberikan pada baris terluar elemen perulangan agar Virtual DOM React dapat mendeteksi perubahan baris data secara instan tanpa perlu merender ulang seluruh baris list.
* **`hover:border-indigo-500/50`**: Memberikan efek visual interaktif berupa perubahan warna garis tepi (*border*) menjadi ungu-indigo transparan saat kursor mouse menyentuh area kartu.

---

### 5. Komponen Kaki Halaman (`src/components/Footer.jsx`)
```jsx
import React from 'react';

function Footer() {
  return (
    <footer id="contact" className="py-12 bg-slate-950 border-t border-slate-900 text-slate-400 text-sm">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">© {new Date().getFullYear()} HIMTI UMT. All rights reserved.</p>
        <p className="text-slate-600">Dibuat dengan cinta menggunakan React JS & Tailwind CSS.</p>
      </div>
    </footer>
  );
}

export default Footer;
```

#### 🔍 Penjelasan Baris Kode Footer:
* **`new Date().getFullYear()`**: Kode JavaScript dinamis di dalam kurung kurawal `{}` untuk mendeteksi dan menampilkan angka tahun saat ini secara otomatis pada browser, sehingga tahun hak cipta selalu *up-to-date* tanpa perlu kita ubah secara manual setiap tahunnya.
* **`border-t border-slate-900`**: Memberikan garis pembatas atas tipis berwarna abu-abu gelap di atas footer sebagai batas pemisah visual yang halus dengan konten program.

---

## 9.3 Menggabungkan Komponen di `App.jsx`

Buka file `src/App.jsx` kalian, impor kelima komponen yang baru saja dibuat, lalu panggil berurutan seperti ini:

```jsx
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Program from './components/Program';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Program />
      <Footer />
    </div>
  );
}

export default App;
```

---

## 10.1 Teori: Cara Kerja Single Page Application (SPA)

Kalian pasti menyadari bahwa saat mengklik menu Navigasi, perpindahan bagian halaman terasa sangat mulus tanpa ada reload browser (layar berkedip putih) sama sekali. Inilah esensi dari **Single Page Application (SPA)**.

Di balik layar, browser sebenarnya hanya memuat satu file HTML tunggal (`index.html`) di awal loading. Ketika kalian mengklik tombol navigasi atau memicu aksi tertentu, React menggunakan JavaScript untuk membongkar-pasang komponen UI di dalam wadah `<div id="root">` secara instan tanpa perlu meminta file HTML baru ke server web.

---

## 10.2 Keajaiban Virtual DOM React

Mengapa proses bongkar-pasang komponen di React bisa berjalan super cepat dibanding JavaScript biasa? Jawabannya adalah **Virtual DOM**.

Di JavaScript biasa, merubah elemen teks mewajibkan browser membongkar dan menggambar ulang elemen DOM fisik browser secara langsung (*Real DOM*), yang mana prosesnya memakan waktu dan resource komputer yang besar.

React mengatasi ini dengan membuat **Virtual DOM** (representasi DOM asli di memori ram komputer berupa object JavaScript ringan).

### Alur Update Virtual DOM:
1. Data (*State*) dalam aplikasi berubah.
2. React otomatis membuat Virtual DOM baru yang mencerminkan perubahan tersebut.
3. React membandingkan Virtual DOM baru dengan Virtual DOM lama (proses perbandingan ini disebut **Diffing**).
4. React menghitung bagian mana saja yang berbeda, lalu hanya memperbarui elemen DOM asli browser yang berbeda tersebut saja (proses pembaruan hemat ini disebut **Reconciliation**).

![Virtual DOM Diagram](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80)
*Ilustrasi: Komputasi data memori yang efisien memicu performa aplikasi yang optimal.*

---

## 📝 Kesimpulan Modul 6

Berikut rangkuman saripati penting yang telah kita selesaikan di Modul 6 ini:
1. **Arsitektur Komponen Dinamis:** Projek Landing Page HIMTI disusun secara modular ke dalam 5 sub-komponen utama (`Navbar`, `Hero`, `About`, `Program`, `Footer`) yang disatukan di berkas `App.jsx`.
2. **Looping dengan Key:** Fungsi `.map()` digunakan untuk merender data list program secara otomatis dengan mewajibkan atribut `key` unik demi mempermudah React melacak perubahan baris elemen.
3. **Single Page Application (SPA):** Menghemat bandwidth dan performa karena hanya mengunduh 1 file HTML, lalu menangani perpindahan rute secara instan tanpa reload visual pada browser.
4. **Virtual DOM:** Menyimpan representasi visual dalam RAM berupa objek JS ringan, menyaring perubahan melalui proses perbandingan (*Diffing*), dan memperbarui elemen DOM asli seminimal mungkin (*Reconciliation*).

Selamat! Kalian telah berhasil membangun proyek Landing Page pertama kalian menggunakan gabungan seluruh materi dasar React JS. 

Di **Modul 7** (Modul Terakhir) nanti, kita akan mempelajari panduan pemecahan masalah (*Troubleshooting*) jika menemukan error saat koding React, serta ringkasan kuis penutup materi! Tetap semangat dan sampai jumpa di modul terakhir! 🚀
