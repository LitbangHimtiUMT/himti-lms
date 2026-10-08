# MODUL 6: Proyek Akhir & Publish

Selamat, teman-teman! Kalian sudah sampai di **modul terakhir** dari course Modern Web: Toko Online. Hari ini kita menyelesaikan proyek, memeriksa kualitasnya seperti developer profesional, lalu **mempublikasikannya** agar siapa pun di dunia bisa membukanya.

---

## 🎯 Apa Saja yang Akan Kita Capai Hari Ini?

Setelah menyelesaikan modul ini, saya harap teman-teman bisa:
1. Memeriksa proyek dengan checklist kualitas.
2. Memakai **Lighthouse** untuk mengukur performa dan aksesibilitas.
3. Mempublikasikan website statis secara gratis.
4. Mengubah toko contoh menjadi toko kalian sendiri.
5. Merencanakan langkah belajar berikutnya.
6. **Goal Akhir:** Toko kalian tayang online dengan link yang bisa dibagikan.

---

## 📚 Pembahasan Materi

### 6.1 Personalisasi: Jadikan Tokomu

Sampai sekarang kita membuat toko thrift "ThriftKita". Sekarang ganti dengan **ide kalian sendiri**. Contohnya:

| Ide toko | Yang diganti |
|---|---|
| Merchandise sekolah atau komunitas | Kaos, stiker, botol minum, tote bag |
| Jajanan atau kue rumahan | Foto dan harga tiap menu |
| Kerajinan tangan | Gelang, lukisan, hiasan |
| Jasa (desain, les, foto) | Paket layanan dan harganya |

Aturannya sederhana: **struktur dan CSS tetap**, ganti nama toko, foto, harga, dan pesan WhatsApp. Cukup mengubah `--utama` dan `--aksen` di `:root` untuk membuat identitas warna yang berbeda.

> Tips Dosen: Pakai foto yang kalian ambil sendiri, atau foto gratis dari Unsplash dan Pexels. Jangan mengambil foto dari toko lain tanpa izin, karena itu melanggar hak cipta mereka.

### 6.2 Checklist Kualitas Sebelum Publish

Centang satu per satu:

| Bagian | Yang diperiksa |
|---|---|
| Struktur | Hanya satu `h1`, urutan `h2`, `h3` rapi, tag semantik dipakai |
| Responsive | Tampil rapi di 375px (HP) dan 1280px (laptop) |
| Gambar dan link | Semua link berfungsi, gambar punya `alt` |
| Tombol beli | Link WhatsApp membuka chat dengan pesan yang benar |
| Konsol | Tidak ada pesan error merah di tab **Console** (`F12`) |
| Dark mode | Teks tetap terbaca jelas di mode gelap |
| Judul halaman | `title` dan `meta description` sudah diisi |

### 6.3 Mengukur Kualitas dengan Lighthouse

Browser berbasis Chromium (Chrome dan Edge) punya alat audit bawaan bernama **Lighthouse**:
1. Tekan `F12`, lalu buka tab **Lighthouse**.
2. Pilih kategori **Performance**, **Accessibility**, dan **SEO**.
3. Klik **Analyze page load**.
4. Baca skor (0 sampai 100) dan daftar saran perbaikan.

> Tips Dosen: Jangan terobsesi mengejar skor 100. Perlakukan hasilnya sebagai **daftar saran**. Untuk toko online, ukuran foto sering jadi penyebab skor Performance rendah. Foto produk yang terlalu besar (misalnya beberapa megabyte) membuat halaman lambat dibuka, jadi kecilkan dulu sebelum dipakai.

### 6.4 Mempublikasikan Website Statis

Karena proyek kita hanya berisi file HTML, CSS, dan gambar (**website statis**), mempublikasikannya mudah dan gratis. Ada beberapa pilihan:

| Layanan | Cara singkat | Cocok untuk |
|---|---|---|
| Netlify Drop | Buka `netlify.com/drop`, seret folder proyek ke halaman itu | Paling cepat, tanpa instalasi |
| GitHub Pages | Unggah proyek ke repository GitHub, lalu aktifkan Pages di pengaturan | Proyek yang ingin disimpan rapi bersama kodenya |

Langkah Netlify Drop:
1. Pastikan `index.html` berada **langsung di dalam folder** yang akan diseret (bukan di subfolder lagi), dan folder `img` ikut di dalamnya.
2. Seret folder `thriftkita` ke halaman Netlify Drop.
3. Dalam hitungan detik kalian mendapat link publik.
4. Buat akun gratis dan **klaim situs** tersebut agar link tidak kedaluwarsa.

> Peringatan Dosen: Situs Netlify Drop yang tidak diklaim bersifat **sementara** dan dapat dihapus otomatis. Jangan membagikan link toko kalian ke teman sebelum situsnya diklaim.

### 6.5 Dari Toko Statis ke Toko Sungguhan

Toko kita sekarang sudah bisa "menjual" lewat WhatsApp, cara yang dipakai banyak UMKM di dunia nyata. Tapi toko online besar punya keranjang belanja, hitung total otomatis, dan pembayaran online. Semua itu membutuhkan **JavaScript**.

Teman-teman bisa melanjutkan di course **Fundamental JavaScript** di LMS ini. Dua modul yang paling nyambung dengan proyek ini:
- **Modul 5: DOM dan Event**, untuk membuat tombol "Tambah ke Keranjang" yang bisa diklik.
- **Modul 6: DOM Lanjutan**, untuk menyimpan isi keranjang ke `localStorage` agar tidak hilang saat halaman dimuat ulang.

Setelah itu, jalur belajar bisa berlanjut ke **React Fundamentals** dan **Modern React Application**.

---

## 🛠️ Panduan Praktik Terbimbing: Sprint Akhir

1. Ganti konten ThriftKita menjadi ide toko kalian sendiri (bagian **6.1**).
2. Sesuaikan token warna di `:root` untuk membuat identitas toko kalian.
3. Jalankan checklist di bagian **6.2** sampai semua tercentang.
4. Jalankan Lighthouse dan perbaiki **minimal satu** saran.
5. Publikasikan lewat salah satu cara di bagian **6.4**.
6. Bagikan link toko kalian ke satu teman dan minta dia mencoba tombol belinya.

> Catatan Penting: Menyalin kode dari AI atau internet tanpa memahaminya membuat kalian sulit memperbaikinya saat ada masalah. Kalau memakai AI, gunakan sebagai **tutor**: minta penjelasan baris demi baris, lalu ketik ulang sendiri.

---

Hebat sekali! Kalian telah membangun toko online modern lengkap dengan layout responsif, animasi halus, dan dark mode, lalu menayangkannya ke dunia. Ini bukan akhir, tetapi awal dari perjalanan kalian sebagai web developer. Teruslah membuat, teruslah salah, dan teruslah belajar! 🎓
