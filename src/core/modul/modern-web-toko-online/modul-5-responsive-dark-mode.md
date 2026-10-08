# MODUL 5: Responsive & Dark Mode

Halo teman-teman! Sebentar lagi toko kita selesai. Di modul ini kita membuat toko nyaman dibuka di **semua ukuran layar**, dan menambahkan fitur yang sedang digemari: **dark mode otomatis**. Kabar baiknya, karena kita sudah memakai design tokens sejak Modul 2, dark mode hanya butuh belasan baris kode.

Ini penting sekali untuk toko online: sebagian besar pembeli belanja lewat HP, sering malam hari di tempat tidur. Toko yang nyaman di HP dan tidak menyilaukan mata akan lebih disukai.

---

## 🎯 Apa Saja yang Akan Kita Capai Hari Ini?

Setelah menyelesaikan modul ini, saya harap teman-teman bisa:
1. Memahami pendekatan **mobile-first**.
2. Menulis media query `min-width` untuk mengubah layout di layar lebar.
3. Menguji tampilan HP dan tablet memakai DevTools.
4. Membuat dark mode otomatis dengan `prefers-color-scheme`.
5. Menghormati pengguna yang tidak nyaman dengan animasi lewat `prefers-reduced-motion`.
6. **Goal Akhir:** Toko ThriftKita responsif di semua ukuran dan otomatis menyesuaikan tema perangkat.

---

## 📚 Pembahasan Materi

### 5.1 Mobile-First: Mulai dari Layar Kecil

Lebih dari separuh pembeli online membuka toko dari HP. Karena itu kita menulis gaya **untuk layar kecil lebih dulu**, lalu menambahkan aturan khusus saat layar melebar.

Ingat `.hero` di Modul 3? Tanpa pembagian kolom, teks dan foto bertumpuk di HP. Itulah tampilan dasar kita. Sekarang kita tambahkan perubahan untuk layar yang lebih lebar:

```css
@media (min-width: 768px) {
  .hero {
    grid-template-columns: 1.1fr 0.9fr;
  }
}
```

Artinya: **jika lebar layar minimal 768px**, bagi hero menjadi dua kolom dengan perbandingan 1,1 banding 0,9. Di bawah 768px, aturan ini diabaikan.

| Lebar layar | Perangkat umum | Tampilan hero |
|---|---|---|
| di bawah 768px | HP | 1 kolom (bertumpuk) |
| 768px ke atas | Tablet dan laptop | 2 kolom |

> Tips Dosen: Perhatikan bahwa deretan produk `.grid` dari Modul 3 **tidak butuh media query sama sekali** berkat `auto-fit` dan `minmax`. Pilih alat paling sederhana yang bisa menyelesaikan masalah. Media query dipakai hanya jika memang perlu.

### 5.2 Menguji di DevTools

Jangan menebak-nebak, **lihat langsung**:
1. Tekan `F12` untuk membuka DevTools.
2. Tekan `Ctrl + Shift + M` untuk masuk ke mode perangkat.
3. Pilih ukuran seperti iPhone atau iPad, atau tarik lebar layar secara bebas.
4. Perhatikan titik kapan hero berubah dari satu menjadi dua kolom, dan kapan produk berubah dari tiga, dua, hingga satu kolom.

Pastikan di `<head>` ada tag ini (sudah kita tulis di Modul 1). Tanpa tag ini, HP akan menampilkan halaman dalam versi "desktop yang diperkecil":

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 5.3 Dark Mode Otomatis

Browser bisa mendeteksi apakah perangkat pengguna sedang dalam mode gelap lewat media query `prefers-color-scheme`. Karena warna kita tersimpan dalam variabel peran (`--bg`, `--surface`, `--text`), kita cukup **mengganti nilainya**:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #14110F;
    --surface: #221D19;
    --text: #F5EFE8;
    --muted: #B9AEA2;
    --border: #3A322B;
    --shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    color-scheme: dark;
  }
}
```

Hanya satu blok, dan **seluruh halaman berubah**: latar, kartu produk, teks, dan batas. Tidak ada satu pun elemen yang perlu ditulis ulang. Itulah hasil kerja keras di Modul 2.

`color-scheme: dark` memberi tahu browser agar elemen bawaannya (scrollbar, kolom isian) ikut tampil gelap.

### 5.4 Merapikan Detail di Mode Gelap

Warna oranye tua `#C2410C` kurang terbaca di atas latar gelap. Untuk elemen tertentu kita butuh penyesuaian kecil di dalam blok dark mode yang sama:

```css
@media (prefers-color-scheme: dark) {
  .eyebrow,
  .site-header nav a:hover {
    color: var(--aksen);
  }

  .btn-primary {
    background: var(--aksen);
    color: var(--gelap);
  }

  .cta {
    background: var(--utama);
  }
}
```

> Catatan Penting: Menguji dark mode butuh perhatian pada **kontras**. Teks harus tetap terbaca jelas. Cara mudah mengecek: perhatikan setiap teks berwarna dan tanyakan, "Apakah nyaman dibaca dari jarak satu lengan?" Kalau ragu, pilih warna yang lebih terang.

Untuk melihat dark mode di komputer, buka pengaturan **Personalization → Colors** (Windows) dan ganti mode ke Dark. Atau di DevTools: tekan `Ctrl + Shift + P`, ketik `dark`, lalu pilih **Emulate CSS prefers-color-scheme: dark**.

### 5.5 Menghormati Pengguna yang Sensitif terhadap Gerak

Sebagian orang merasa pusing atau tidak nyaman melihat animasi, dan mereka bisa mengaktifkan pengaturan "kurangi gerakan" di perangkatnya. Kita wajib menghormatinya:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

Dengan blok ini, semua animasi buatan kita otomatis mati untuk mereka yang memintanya.

---

## 🛠️ Panduan Praktik Terbimbing

1. Tambahkan media query `min-width: 768px` dari bagian **5.1** di bagian bawah `style.css`.
2. Buka mode perangkat di DevTools dan uji di ukuran 375px (HP) dan 1280px (laptop).
3. Tambahkan blok dark mode dari bagian **5.3**, lalu gaya tambahan dari bagian **5.4** (gabungkan dalam satu `@media (prefers-color-scheme: dark)`).
4. Tambahkan blok `prefers-reduced-motion` dari bagian **5.5**.
5. Uji dark mode memakai salah satu cara di bagian 5.4. Cek apakah ada teks yang sulit dibaca.
6. **Tantangan:** buat satu variabel baru `--diskon` dengan dua nilai (terang dan gelap), lalu pakai untuk warna badge diskon.

---

Mantap sekali! Toko kalian sudah modern dan ramah semua orang. Di **Modul 6**, modul terakhir, kita periksa kualitas proyek, **publikasikan ke internet**, dan merencanakan langkah belajar berikutnya. Sampai jumpa! 🎓
