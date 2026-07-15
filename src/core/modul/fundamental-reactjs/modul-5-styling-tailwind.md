# MODUL 5: React Styling dengan Tailwind CSS

Halo teman-teman semua! Selamat datang di **Modul 5**.

Di modul sebelumnya, kita sudah bisa mengalirkan data dinamis menggunakan Props. Tapi kalau dilihat-lihat, tampilan web kita masih sangat polos dan kurang menarik secara visual. 

Hari ini kita akan mempelajari cara menghias aplikasi React kita agar terlihat premium dan profesional. Kita akan berfokus pada salah satu kerangka kerja CSS paling populer dan banyak digunakan di industri saat ini, yaitu **Tailwind CSS**. Kita akan belajar cara mengintegrasikannya, mengonfigurasi tema khusus, dan menulis kelas utilitas secara instan.

Mari kita bongkar materinya!

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Memahami berbagai metode styling pada React beserta kelebihan dan kekurangannya.
2. Melakukan instalasi dan konfigurasi Tailwind CSS di proyek React-Vite dari nol.
3. Menjelaskan konsep kerja *Utility-First CSS*.
4. Menerapkan kelas-kelas Tailwind untuk tata letak (*layout*), jarak (*spacing*), warna, tipografi, dan status *hover*.
5. Membuat komponen yang responsif (*mobile-friendly*) menggunakan sistem *breakpoint* Tailwind.

---

## 8.1 Pilihan Metode Styling di React

Di dalam ekosistem React, ada banyak sekali jalan untuk mewarnai komponen kalian. Berikut perbandingan beberapa metode yang paling sering digunakan:

| Metode | Kelebihan | Kekurangan |
| :--- | :--- | :--- |
| **CSS Biasa** (`.css`) | Sangat familiar bagi pemula. | Bersifat global, rawan tabrakan nama kelas antar file. |
| **CSS Modules** | Nama kelas dienkapsulasi aman khusus untuk satu file saja. | Membutuhkan nama file khusus (`.module.css`) dan cara import yang berbeda. |
| **Inline Styles** (`style={{}}`) | Mudah ditulis langsung di dalam file JSX. | Tidak mendukung fitur lengkap CSS seperti *media queries* atau status *hover*. |
| **Tailwind CSS** | Koding cepat, desain konsisten, dan ukuran file akhir kecil. | Kode JSX akan terlihat penuh dengan daftar nama kelas yang panjang. |

Di modul ini, kita memilih **Tailwind CSS** karena ia adalah standar industri saat ini yang mempercepat proses pembuatan UI berkualitas tinggi tanpa perlu berpindah-pindah file CSS.

---

## 8.2 Masalah CSS Tradisional vs Solusi Tailwind CSS

### Masalah CSS Tradisional:
Kalian pasti pernah kebingungan memikirkan nama kelas baru di CSS, contohnya: `.button-blue-large-rounded-shadow`. Belum lagi jika nama kelas tersebut tidak sengaja bertumpukan dengan nama kelas di file lain, sehingga tampilan tombol di halaman lain ikut rusak.

### Solusi Utility-First dari Tailwind CSS:
Dibanding menulis file CSS terpisah, Tailwind menyediakan ratusan kelas kecil (*utility classes*) siap pakai yang langsung kalian ketikkan pada properti `className` di JSX.

```jsx
// Tanpa Tailwind (Menulis CSS manual)
<button className="btn-primary">Daftar</button>

// Dengan Tailwind (Utility-First)
<button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl transition duration-300">
  Daftar
</button>
```

---

## 8.3 Langkah Instalasi Tailwind CSS di React-Vite

Silakan matikan server lokal kalian di terminal (tekan **Ctrl + C**), lalu ikuti 4 langkah instalasi berikut:

### Langkah 1: Instal Library Utama
Ketik perintah ini di terminal untuk mengunduh paket Tailwind CSS, PostCSS, dan Autoprefixer sebagai *devDependencies*:
```bash
npm install -D tailwindcss@3 postcss autoprefixer

npx tailwindcss init -p
```
Perintah kedua akan menghasilkan dua file konfigurasi di root proyek kalian: `tailwind.config.js` dan `postcss.config.js`.

### Langkah 2: Konfigurasi File Scanning
Buka file **`tailwind.config.js`** dan sesuaikan bagian `content` agar Tailwind mendeteksi kelas-kelas yang kalian tulis di file JSX:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan semua file JS/JSX di dalam folder src
  ],
  theme: {
    extend: {
      // Kita bisa buat kustomisasi warna khusus almamater HIMTI di sini!
      colors: {
        'himti': {
          50: '#f5f3ff',
          500: '#8b5cf6',
          900: '#4c1d95',
        }
      }
    },
  },
  plugins: [],
}
```

### Langkah 3: Impor Directives Tailwind
Buka file **`src/index.css`**, hapus seluruh kode bawaan di dalamnya, lalu ganti dengan 3 baris direktori ini:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
*(Kosongkan juga file `src/App.css` agar tidak menimpa gaya baru kita).*

### Langkah 4: Nyalakan Kembali Server
```bash
npm run dev
```

---

## 8.4 Contekan Kelas Utilitas yang Sering Digunakan

Berikut adalah kelas-kelas dasar yang akan sangat sering kalian pakai dalam menghias halaman:

1. **Layout / Tata Letak:**
   - `flex`: Mengaktifkan Flexbox.
   - `justify-between`, `items-center`: Mengatur perataan elemen anak di dalam flexbox.
   - `grid`, `grid-cols-2`, `gap-4`: Membuat tata letak kolom berbasis grid dengan jarak renggang.
2. **Jarak (Spacing):**
   - `p-4`: Padding (jarak dalam) sebesar 1rem (16px) di semua sisi.
   - `mt-6`, `mb-2`: Margin (jarak luar) atas atau bawah.
   - `px-4`, `py-2`: Padding khusus arah horizontal atau vertikal.
3. **Warna & Latar Belakang:**
   - `bg-slate-900`, `bg-indigo-600`: Mengubah warna latar.
   - `text-white`, `text-slate-400`: Mengubah warna tulisan.
4. **Tipografi (Font):**
   - `text-lg`, `text-2xl`: Mengatur ukuran teks.
   - `font-bold`, `font-semibold`: Mengatur ketebalan huruf.
5. **Responsif (Breakpoint):**
   - Secara bawaan, Tailwind mendesain tampilan untuk layar HP (*Mobile-First*). 
   - Gunakan prefix **`md:`** untuk layar tablet/laptop ke atas (misal: `w-full md:w-1/2` artinya lebar penuh di HP, tapi hanya setengah lebar di laptop).
6. **Interaksi (Hover & Focus):**
   - Gunakan prefix **`hover:`** untuk merubah tampilan saat kursor mouse melintas (misal: `bg-blue-500 hover:bg-blue-600`).

---

## 📝 Kesimpulan Modul 5

Mari kita rangkum poin-poin saripati penting yang telah kita bahas di Modul 5 ini:
1. **Utility-First Concept:** Tailwind CSS menggunakan pendekatan penulisan kelas utilitas siap pakai langsung pada atribut `className` di JSX, menghindari kerumitan memikirkan nama kelas baru.
2. **Keuntungan Tailwind:** Menghasilkan file CSS akhir yang super kecil (*tree-shaking*), menjamin konsistensi ukuran dan warna, serta mempercepat pengerjaan UI tanpa pindah file.
3. **Instalasi & Setup:** Dilakukan menggunakan `npm install -D tailwindcss postcss autoprefixer`, diikuti inisialisasi file konfigurasi `tailwind.config.js`.
4. **Tema Kustom:** Bagian `theme.extend` di konfigurasi memudahkan kita mendaftarkan warna almamater (seperti warna kustom `himti`) atau font kustom agar bisa diakses langsung via kelas utility.
5. **Responsive & Hover:** Tailwind memudahkan integrasi status interaktif menggunakan prefix `hover:` dan susunan desain yang responsif (mobile-first) menggunakan breakpoint seperti `md:` atau `lg:`.

Hebat sekali! Kalian sekarang sudah bisa mempercantik tampilan aplikasi React kalian secara kilat menggunakan Tailwind CSS.

Di **Modul 6** nanti, kita akan menantang diri untuk menyatukan semua materi yang telah dipelajari dengan membangun halaman pendaratan (*Landing Page*) resmi organisasi HIMTI UMT serta memahami konsep cara kerja Single Page Application (SPA)! Tetap semangat dan sampai jumpa di modul selanjutnya! 🚀
