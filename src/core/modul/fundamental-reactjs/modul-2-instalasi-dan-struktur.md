# MODUL 2: Instalasi React & Struktur Project

Halo rekan-rekan mahasiswa sekalian! Selamat datang di **Modul 2**.

Di Modul 1 kemarin kita sudah mempersiapkan perlengkapan tempur kita, mulai dari Node.js, VS Code, hingga memahami apa itu npm. Hari ini, kita akan langsung terjun mempraktikkan cara menginstal React menggunakan build tool modern bernama **Vite** dan membedah isi di dalam folder proyek tersebut. 

Mari kita mulai langkah demi langkah!

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Memahami apa itu build tool Vite dan keunggulannya dibanding alternatif lain.
2. Membuat proyek React baru menggunakan perintah `npm create vite@latest`.
3. Menginstal seluruh pustaka dependensi proyek menggunakan `npm install`.
4. Menjalankan server lokal (*development server*) via terminal menggunakan `npm run dev`.
5. Menjelaskan fungsi dari setiap file dan folder bawaan proyek React-Vite.

---

## 3.1 Mengapa Kita Menggunakan Vite?

Saat mendevelop aplikasi React, kita membutuhkan alat bantu untuk menyatukan baris-baris kode kita (*bundling*), menjalankan server di browser, dan mengoptimalkan aplikasi saat dideploy. Alat ini disebut **Build Tool**.

Ada beberapa pilihan populer untuk React:
1. **Create React App (CRA):** Build tool klasik bawaan Facebook terdahulu. Sangat stabil namun terkenal lambat dan berat karena menggunakan Webpack.
2. **Next.js:** Framework lengkap berbasis React. Cocok untuk aplikasi skala produksi besar, tetapi terlalu kompleks untuk kalian yang baru belajar dasar React.
3. **Vite:** Build tool modern yang super cepat, ringan, dan konfigurasi minimal. Inilah alasan utama kita memilih Vite!

### Mengapa Vite Sangat Cepat?
Vite memanfaatkan teknologi modern browser bernama **ES Modules (ESM)**. Vite tidak perlu memproses ulang seluruh kode aplikasi kalian saat dijalankan, melainkan hanya memproses file yang sedang aktif diubah. Fitur ini disebut **Hot Module Replacement (HMR)** yang bekerja secara instan tanpa perlu reload halaman web.

![Vite Logo](https://media.licdn.com/dms/image/v2/D4D12AQGSS7va8n6cVA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1723198193349?e=2147483647&v=beta&t=otvlBB6zElmC-ght20_D4n6ODNOmPugFIAUaAEshBUY)
*Ilustrasi: Memilih build tool modern yang cepat untuk menunjang produktivitas coding.*

---

## 3.2 Membuat Proyek React Pertama dengan Vite

Silakan buka terminal di VS Code kalian (tekan `Ctrl + \``) lalu ikuti langkah pembuatan proyek di bawah ini:

### Langkah 1: Jalankan Perintah Vite
Ketik perintah ini di terminal untuk mengaktifkan pembuat proyek Vite versi terbaru:
```bash
npm create vite@latest
```

### Langkah 2: Beri Nama Proyek Kalian
Ketik nama folder proyek yang diinginkan (misal: `himti-landing-page`):
```text
? Project name: › himti-landing-page
```

### Langkah 3: Pilih Framework
Gunakan tombol panah bawah di keyboard kalian untuk memilih **React**, lalu tekan **Enter**.
```text
? Select a framework: ›
    Vanilla
    Vue
  > React
    Svelte
```

### Langkah 4: Pilih Varian Bahasa
Pilih **JavaScript** karena kita akan berfokus memahami dasar-dasar komponen tanpa komplikasi tipe data terlebih dahulu. Tekan **Enter**.
```text
? Select a variant: ›
    TypeScript
  > JavaScript
    JavaScript + SWC
```

### Langkah 5: Selesai!
Vite akan menyiapkan folder proyek kalian dalam waktu kurang dari satu detik.

---

## 3.3 Menginstal Dependensi (`npm install`)

Setelah folder proyek terbentuk, jalankan perintah perpindahan folder masuk ke proyek kalian:
```bash
cd himti-landing-page
```
Jika kalian membuka foldernya, kalian belum akan menemukan folder bernama `node_modules`. Folder ini menyimpan semua kode mesin React yang dibutuhkan. Kita harus menginstalnya secara terpisah menggunakan npm.

Ketik perintah berikut di terminal:
```bash
npm install
```
Perintah ini akan membaca daftar kebutuhan paket di dalam file `package.json`, mendownloadnya dari internet, dan menyimpannya di folder baru bernama `node_modules`.

---

## 3.4 Menjalankan Server Lokal (`npm run dev`)

Sekarang, proyek kalian sudah siap dinyalakan! Jalankan perintah berikut:
```bash
npm run dev
```
Terminal kalian akan menampilkan tautan server lokal seperti ini:
```text
  VITE v5.x.x  ready in 250 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```
Silakan tahan tombol **Ctrl** dan klik tautan `http://localhost:5173` di terminal, atau buka browser kalian secara manual dan ketik alamat tersebut. Selamat! Halaman bawaan React-Vite kalian sudah berhasil berjalan di browser.

---

## 4.1 Bedah Struktur Folder Proyek React

Mari kita buka folder `himti-landing-page` di VS Code kalian. Struktur folder yang kalian lihat akan tampak seperti ini:

```text
himti-landing-page/
├── 📁 node_modules/          (Berisi seluruh library/dependency hasil instalasi)
├── 📁 src/                   (Folder utama tempat kita menulis kode aplikasi)
│   ├── 📁 assets/            (Penyimpanan aset statis seperti gambar logo)
│   ├── 📄 App.css            (File style CSS khusus untuk komponen App)
│   ├── 📄 App.jsx            (Komponen utama/induk aplikasi kita)
│   ├── 📄 index.css          (File style CSS global untuk seluruh website)
│   └── 📄 main.jsx           (Pintu masuk utama penghubung React ke HTML)
├── 📄 index.html             (Satu-satunya file HTML di aplikasi kita)
├── 📄 package.json           (Daftar konfigurasi proyek & versi library)
├── 📄 vite.config.js         (File konfigurasi sistem kerja Vite)
└── 📄 .gitignore             (Daftar file/folder yang diabaikan oleh Git)
```

### Memahami Alur Pemanggilan File React:
Mungkin kalian bertanya-tanya, bagaimana React bisa muncul di halaman browser padahal file HTML-nya kosong?

1. Browser pertama kali membaca **`index.html`** yang memiliki kontainer kosong `<div id="root"></div>` dan tag script yang merujuk ke `/src/main.jsx`.
2. File **`main.jsx`** bertindak sebagai *Entry Point*. Dia bertugas menangkap `<div id="root">` dari HTML lalu menempelkan komponen utama **`App.jsx`** ke dalamnya secara paksa.
3. Di dalam **`App.jsx`**, barulah kita menulis kode tampilan antarmuka web kita.

---

## 📝 Kesimpulan Modul 2

Mari kita ingat kembali poin-poin saripati yang telah kita praktikkkan di Modul 2 ini:
1. **Keunggulan Vite:** Vite adalah build tool modern yang cepat dan efisien karena memanfaatkan teknologi *ES Modules* (ESM) asli browser serta menyediakan rendering instan via *Hot Module Replacement* (HMR).
2. **Pembuatan Proyek:** Perintah `npm create vite@latest` mempermudah penginstalan kerangka kerja awal proyek dengan konfigurasi minimal.
3. **Instalasi Paket:** Menjalankan `npm install` wajib dilakukan untuk menarik seluruh kode mesin dependensi ke dalam folder `node_modules` berdasarkan isi catatan `package.json`.
4. **Development Server:** Perintah `npm run dev` menjalankan aplikasi di server lokal, secara bawaan berjalan pada tautan port `http://localhost:5173`.
5. **Alur Render React:** Browser memanggil `index.html` -> mengeksekusi entry point `/src/main.jsx` -> me-render root component induk `/src/App.jsx` ke dalam `<div id="root">`.

Bagus sekali! Kita sudah berhasil menginstal dan memahami struktur dasar proyek React. 

Di **Modul 3** nanti, kita akan belajar menulis komponen visual pertama kita dan memahami bahasa khusus React bernama **JSX**! Tetap semangat dan sampai jumpa di modul selanjutnya! 🚀
