# MODUL 1: Struktur Semantik & Persiapan Proyek

Halo teman-teman! Selamat datang di course **Modern Web: Toko Online**. Di kelas dasar kalian sudah belajar HTML dan CSS lewat halaman profil. Sekarang kita naik level: membangun **toko online** yang rapi, responsif, punya animasi halus, dan bahkan mendukung dark mode. Seru kan?

Semua dikerjakan **tanpa instalasi apa pun**. Cukup VS Code, browser, dan semangat belajar.

---

## 🎯 Apa Saja yang Akan Kita Capai Hari Ini?

Setelah menyelesaikan modul ini, saya harap teman-teman bisa:
1. Membayangkan hasil akhir proyek **ThriftKita**, toko thrift fashion yang akan kita bangun selama 6 modul.
2. Menyiapkan folder proyek dan menjalankannya dengan Live Server.
3. Menulis kerangka dokumen HTML5 yang benar, lengkap dengan `meta description`.
4. Menyusun halaman memakai tag semantik: `header`, `nav`, `main`, `section`, `article`, dan `footer`.
5. Menulis kartu produk lengkap dengan gambar, harga, dan tombol beli lewat WhatsApp.
6. **Goal Akhir:** Menyelesaikan seluruh HTML toko ThriftKita (belum bergaya, dan itu normal!).

---

## 📚 Pembahasan Materi

### 1.1 Rancangan Toko Kita

Toko online yang baik membuat pengunjung cepat menemukan barang dan cepat membeli. Ini rancangan **ThriftKita** yang akan kita bangun:

┌────────────────────────────────┐
│ 1. HEADER  logo + menu         │
├────────────────────────────────┤
│ 2. HERO    judul + 2 tombol    │
├────────────────────────────────┤
│ 3. FITUR   [ ] [ ] [ ]         │
├────────────────────────────────┤
│ 4. PRODUK  [ ] [ ] [ ] x 6     │
├────────────────────────────────┤
│ 5. CARA BELI  [ ] [ ] [ ]      │
├────────────────────────────────┤
│ 6. KONTAK  tombol WhatsApp     │
├────────────────────────────────┤
│ 7. FOOTER  hak cipta           │
└────────────────────────────────┘

> Tips Dosen: Sebelum menulis kode, gambar dulu rancangan kasarnya di kertas. Dengan begitu kalian tahu bagian apa saja yang harus ditulis, dan kode jadi lebih terarah.

### 1.2 Siapkan Folder Proyek

Buat folder baru bernama `thriftkita`, lalu buka di VS Code lewat **File → Open Folder**. Di dalamnya buat dua file dan satu folder gambar:

```text
thriftkita/
├── index.html
├── style.css
└── img/
```

Gambar produk bisa kalian ambil gratis dari [Unsplash](https://unsplash.com) (cari kata kunci seperti `denim jacket`, `tote bag`, `sneakers`). Simpan di folder `img`. Atau pakai foto barang kalian sendiri, itu lebih keren!

Klik kanan `index.html` dan pilih **Open with Live Server**. Mulai sekarang, setiap kali menyimpan file (`Ctrl + S`), browser akan menyegarkan diri otomatis.

### 1.3 Kerangka Dokumen yang Benar

Ketik `!` lalu tekan `Tab` di `index.html`. VS Code akan membuatkan kerangka dasar. Kita rapikan seperti ini:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="ThriftKita: thrift fashion pilihan dengan harga pelajar.">
  <title>ThriftKita | Thrift Fashion Harga Pelajar</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- isi halaman di sini -->
</body>
</html>
```

Perhatikan tiga hal penting di sini:

| Baris | Fungsi |
|---|---|
| `lang="id"` | Memberi tahu browser dan pembaca layar bahwa halaman berbahasa Indonesia |
| `meta viewport` | Membuat halaman tampil benar di layar HP (kita pakai penuh di Modul 5) |
| `meta description` | Ringkasan halaman yang sering muncul di hasil pencarian Google |

### 1.4 Kerangka Semantik

Dulu orang menaruh semuanya di `<div>`. Sekarang kita pakai tag yang **punya makna**, supaya mesin pencari dan pembaca layar paham struktur halaman kita.

| Tag | Dipakai untuk |
|---|---|
| `header` | Bagian atas halaman: logo dan menu |
| `nav` | Kumpulan link navigasi |
| `main` | Isi utama halaman (hanya satu per halaman) |
| `section` | Satu bagian bertema, biasanya diawali judul `h2` |
| `article` | Satu unit konten yang berdiri sendiri, misalnya satu kartu produk |
| `footer` | Bagian bawah halaman |

Kerangka body toko kita:

```html
<body>
  <header class="site-header">
    <a class="logo" href="#">ThriftKita</a>
    <nav aria-label="Navigasi utama">
      <a href="#produk">Produk</a>
      <a href="#cara-beli">Cara Beli</a>
      <a href="#kontak">Kontak</a>
    </nav>
  </header>

  <main>
    <section class="hero"> ... </section>
    <section id="fitur" class="section"> ... </section>
    <section id="produk" class="section"> ... </section>
    <section id="cara-beli" class="section"> ... </section>
    <section id="kontak" class="cta"> ... </section>
  </main>

  <footer>
    <p>© 2026 ThriftKita. Dibuat saat SI Fest 2026.</p>
  </footer>
</body>
```

> Catatan Penting: Atribut `class` (misalnya `site-header`, `hero`) belum berefek apa-apa sekarang. Kita menyiapkannya sebagai "pegangan" untuk CSS di modul berikutnya. Dan `id` seperti `produk` dipakai agar link `href="#produk"` bisa meloncat ke bagian itu.

### 1.5 Bagian Hero

Hero adalah bagian pertama yang dilihat pengunjung: janji toko, ajakan belanja, dan satu gambar yang menarik.

```html
<section class="hero">
  <div class="hero-text">
    <p class="eyebrow">Thrift pilihan, harga pelajar</p>
    <h1>Gaya keren tanpa bikin kantong bolong</h1>
    <p class="lead">Baju, tas, dan sepatu preloved yang sudah dicek satu per satu.</p>
    <div class="actions">
      <a class="btn btn-primary" href="#produk">Belanja Sekarang</a>
      <a class="btn btn-ghost" href="#cara-beli">Cara Beli</a>
    </div>
  </div>
  <img class="hero-img" src="img/hero-rak.jpg" alt="Deretan kaos berwarna-warni di rak pakaian" loading="lazy">
</section>
```

Aturan emasnya: **satu `h1` per halaman**, lalu `h2` untuk tiap bagian, dan `h3` untuk judul di dalam kartu. Jangan lompat dari `h1` langsung ke `h4` hanya karena ingin teks yang lebih kecil. Ukuran urusan CSS, urutan adalah urusan makna.

> Peringatan Dosen: Jangan lupa atribut `alt` pada setiap gambar. Teks ini dibacakan pembaca layar untuk teman-teman tunanetra, dan tampil kalau gambar gagal dimuat. `alt` yang baik menjelaskan isi gambar, misalnya "Jaket denim vintage tergantung di dinding putih", bukan hanya "gambar1".

### 1.6 Kartu Produk

Inilah jantung toko online. Satu produk dibungkus satu `article`:

```html
<article class="card product" style="--i: 0">
  <div class="thumb"><img src="img/jaket-denim.jpg" alt="Jaket denim vintage tergantung di dinding putih" loading="lazy"></div>
  <span class="badge">Terlaris</span>
  <h3>Jaket Denim Vintage</h3>
  <p class="price">Rp145.000</p>
  <div class="bar" style="--progress: 25%"><span></span></div>
  <small class="stok">Sisa 1 pcs</small>
  <a class="btn btn-primary" href="https://wa.me/628123456789?text=Halo%20ThriftKita%2C%20saya%20mau%20beli%20Jaket%20Denim%20Vintage">Beli via WhatsApp</a>
</article>
```

Beberapa hal menarik di sini:

| Bagian | Penjelasan |
|---|---|
| `style="--i: 0"` | Nomor urut kartu. Dipakai di Modul 4 untuk animasi muncul bergantian |
| `style="--progress: 25%"` | Seberapa penuh bar stok. Dipakai di Modul 4 |
| `href="https://wa.me/..."` | Link WhatsApp. Angka setelah `wa.me/` adalah nomor penjual dengan awalan 62 (tanpa 0 dan tanpa tanda +) |
| `?text=...` | Isi pesan yang otomatis terisi. Spasi ditulis `%20` |

Untuk produk yang diskon, tambahkan harga lama dengan tag `<s>` (strikethrough, tulisan dicoret):

```html
<p class="price">Rp175.000 <s>Rp219.000</s></p>
```

> Tips Dosen: Ganti nomor `628123456789` dengan nomor WhatsApp kalian sendiri saat menguji. Dengan begitu tombol beli langsung membuka chat ke nomor kalian dan terasa seperti toko sungguhan.

---

## 🛠️ Panduan Praktik Terbimbing

Waktunya mengetik! Ikuti langkah ini:

1. Pastikan folder `thriftkita` sudah terbuka dan Live Server menyala.
2. Tulis kerangka dokumen dari bagian **1.3**.
3. Isi `body` dengan kerangka semantik dari bagian **1.4**.
4. Tulis bagian hero dari bagian **1.5**. Simpan foto rak baju (atau foto pilihanmu) di folder `img`.
5. Buat bagian `#fitur` berisi tiga kartu `article class="card"` dengan judul `h3` dan satu paragraf. Isi `style="--i: 0"`, `--i: 1`, dan `--i: 2` pada ketiganya.
6. Buat bagian `#produk` berisi **enam** kartu produk memakai pola dari bagian **1.6**. Bungkus keenam kartu dengan `<div class="grid">`.
7. Buat bagian `#cara-beli` berisi tiga kartu langkah. Setiap kartu diawali `<span class="step">1</span>`, lalu `h3` dan `p`.
8. Buat bagian `#kontak` (judul, satu kalimat, dan tombol `Chat via WhatsApp`) serta `footer`.

Hasil akhirnya akan terlihat **polos seperti halaman tahun 1995**. Itu benar! Kerangka yang baik harus tetap bisa dibaca tanpa CSS.

> Tips Dosen: Tekan `Alt + Shift + F` di VS Code untuk merapikan indentasi kodemu. Kode yang rapi jauh lebih mudah dicari kesalahannya, terutama tag yang lupa ditutup.

---

Hebat! Kerangka ThriftKita sudah berdiri. Di **Modul 2**, kita akan menyusun "bumbu dasar" tampilan: warna, jarak, dan tipografi dalam bentuk **design tokens** memakai CSS variables. Sampai jumpa! 🎓
