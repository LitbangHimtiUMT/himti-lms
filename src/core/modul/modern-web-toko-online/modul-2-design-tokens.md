# MODUL 2: Design Tokens & Tipografi

Halo lagi, teman-teman! Kerangka HTML toko kita sudah jadi, tapi masih polos. Sebelum mendandani halaman, ada satu kebiasaan profesional yang akan menghemat banyak waktu: **mengumpulkan semua keputusan desain di satu tempat**. Di dunia desain, ini disebut **design tokens**, dan di CSS kita membuatnya dengan **CSS variables**.

---

## 🎯 Apa Saja yang Akan Kita Capai Hari Ini?

Setelah menyelesaikan modul ini, saya harap teman-teman bisa:
1. Memahami masalah yang muncul kalau warna ditulis berulang-ulang.
2. Mendefinisikan warna, jarak, dan radius sebagai CSS variables di `:root`.
3. Memakai variabel dengan fungsi `var()`.
4. Memasang font dari Google Fonts.
5. Membuat ukuran judul yang menyesuaikan layar memakai `clamp()`.
6. **Goal Akhir:** Menyelesaikan bagian dasar `style.css` sehingga toko ThriftKita punya font, warna, dan ritme jarak yang konsisten.

---

## 📚 Pembahasan Materi

### 2.1 Masalah Kalau Warna Ditulis Berulang

Bayangkan warna oranye merek toko kita `#C2410C` ditulis di 30 tempat. Suatu hari pemilik toko bilang, "Ganti jadi hijau ya!". Kalian harus mencari dan mengganti 30 tempat itu satu per satu, dan pasti ada yang terlewat.

Solusinya: tulis warnanya **sekali**, beri **nama**, lalu pakai namanya di mana-mana.

### 2.2 CSS Variables di :root

```css
:root {
  --utama: #C2410C;
  --aksen: #FFC83D;
  --gelap: #1F1A17;
  --bg: #FAF6F0;
  --surface: #FFFFFF;
  --text: #1F1A17;
  --muted: #6B625A;
  --border: #E8E0D5;
}
```

Aturan penulisannya:
- Nama variabel **wajib diawali dua tanda hubung** (`--`).
- `:root` artinya elemen paling atas halaman, sehingga variabelnya bisa dipakai di mana saja.
- Memakainya dengan `var(--nama)`.

```css
.eyebrow {
  color: var(--utama);
}
```

> Catatan Penting: Perhatikan bahwa kita memberi nama berdasarkan **peran** (`--bg`, `--surface`, `--text`, `--muted`), bukan hanya berdasarkan warna. Di Modul 5, kita akan mengganti nilai `--bg` dan `--text` saat dark mode dan seluruh halaman ikut berubah. Itulah kekuatan tokens.

### 2.3 Token untuk Jarak, Radius, dan Bayangan

Bukan cuma warna. Kita juga membuat skala jarak supaya semua ruang kosong terasa seirama:

```css
:root {
  --radius: 16px;
  --s1: 8px;
  --s2: 16px;
  --s3: 24px;
  --s4: 40px;
  --s5: 72px;
  --shadow: 0 8px 24px rgba(31, 26, 23, 0.1);
  color-scheme: light;
}
```

Sekarang kita tidak perlu menebak-nebak angka. Mau jarak kecil? Pakai `var(--s1)`. Jarak antar bagian besar? `var(--s5)`. Hasilnya halaman terlihat konsisten dan "mahal".

### 2.4 Memasang Font dari Google Fonts

Buka [fonts.google.com](https://fonts.google.com), pilih **Plus Jakarta Sans**, pilih bobot 400, 600, 700, 800, lalu salin tag `link`-nya ke `<head>` di `index.html`, **sebelum** tag `link` untuk `style.css`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
```

Lalu di CSS, kita pakai di `body`:

```css
body {
  margin: 0;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}
```

> Tips Dosen: Selalu tulis font cadangan (`system-ui, sans-serif`) setelah font utama. Kalau internet bermasalah dan font gagal dimuat, halaman tetap terbaca dengan font bawaan perangkat.

### 2.5 Reset Singkat dan Ukuran Judul dengan clamp()

Beberapa baris reset yang wajib ada di hampir setiap proyek:

```css
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
}
```

Penjelasannya:
- `box-sizing: border-box` membuat padding dan border dihitung **di dalam** lebar elemen, jadi ukuran kotak tidak membengkak.
- `scroll-behavior: smooth` membuat klik link menu meluncur halus ke bagian yang dituju.
- `max-width: 100%` pada gambar mencegah foto produk melebihi lebar layar, penting sekali di HP.
- `color: inherit` membuat link ikut mewarisi warna teks di sekitarnya, bukan biru bergaris bawah bawaan browser.

Sekarang judul. Kita ingin judul besar di laptop dan lebih kecil di HP, **tanpa menulis media query**. Gunakan `clamp(minimum, ideal, maksimum)`:

```css
h1, h2, h3 {
  line-height: 1.15;
  margin: 0 0 var(--s2);
}

h1 {
  font-size: clamp(2rem, 5vw + 1rem, 3.5rem);
}

h2 {
  font-size: clamp(1.5rem, 3vw + 0.75rem, 2.25rem);
}

p {
  margin: 0 0 var(--s2);
}
```

Cara bacanya: ukuran `h1` akan mengikuti lebar layar (`5vw + 1rem`), tetapi **tidak akan lebih kecil dari `2rem`** dan **tidak akan lebih besar dari `3.5rem`**.

---

## 🛠️ Panduan Praktik Terbimbing

1. Di `index.html`, tambahkan tiga tag `link` font dari bagian **2.4** ke dalam `<head>`.
2. Di `style.css`, tulis blok `:root` lengkap (bagian **2.2** dan **2.3**) di baris paling atas.
3. Tulis reset, `body`, dan aturan judul dari bagian **2.4** dan **2.5**.
4. Simpan dan lihat browser. Halaman kalian sekarang punya font baru, latar krem hangat, dan teks yang nyaman dibaca.
5. **Eksperimen:** ubah nilai `--utama` menjadi warna favoritmu (misalnya hijau `#15803D`), lalu pakai di `.eyebrow` dengan `color: var(--utama);`. Perhatikan betapa mudahnya satu perubahan berdampak ke seluruh halaman.
6. Buka DevTools (`F12`), pilih elemen `h1`, lalu perhatikan nilai `font-size` yang dihitung browser. Ubah lebar jendela browser dan lihat angkanya ikut berubah.

---

Mantap! Fondasi tampilan sudah rapi. Di **Modul 3**, kita akan menata halaman dengan **Flexbox** dan **CSS Grid**, termasuk trik grid yang membuat deretan produk otomatis menyesuaikan jumlah kolom. Sampai jumpa! 🎓
