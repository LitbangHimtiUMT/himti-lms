# MODUL 3: Layout Modern dengan Flexbox & Grid

Halo teman-teman! Sekarang saatnya menata halaman. Di modul ini kita berkenalan dengan dua "alat penata letak" paling penting di CSS modern: **Flexbox** dan **CSS Grid**. Keduanya menggantikan trik-trik lama yang rumit, dan hampir semua website zaman sekarang memakainya. Toko online adalah tempat latihan yang pas, karena isinya penuh deretan produk.

---

## 🎯 Apa Saja yang Akan Kita Capai Hari Ini?

Setelah menyelesaikan modul ini, saya harap teman-teman bisa:
1. Memahami kapan memakai Flexbox dan kapan memakai Grid.
2. Menata header dan menu navigasi dengan Flexbox.
3. Membuat hero dua kolom dengan CSS Grid.
4. Membuat deretan kartu produk yang menyesuaikan jumlah kolom otomatis, **tanpa media query**.
5. Membuat gambar tampil rapi dengan `aspect-ratio` dan `object-fit`.
6. **Goal Akhir:** Toko ThriftKita sudah memiliki tata letak yang rapi dengan `max-width` dan jarak antar bagian yang konsisten.

---

## 📚 Pembahasan Materi

### 3.1 Flexbox atau Grid?

Cara mudah mengingatnya:

| Aspek | Flexbox | CSS Grid |
|---|---|---|
| Dimensi | Satu arah (baris **atau** kolom) | Dua arah (baris **dan** kolom) |
| Cocok untuk | Menu, deretan tombol, isi kartu | Tata letak halaman, deretan produk |
| Titik awal | `display: flex` | `display: grid` |

> Catatan Penting: Keduanya bisa dipakai bersamaan. Grid untuk kerangka besar, Flexbox untuk mengatur isi di dalam tiap bagian. Jangan merasa harus memilih salah satu.

### 3.2 Header dan Navigasi dengan Flexbox

Kita ingin logo di kiri dan menu di kanan dalam satu baris:

```css
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--s2);
  max-width: 1120px;
  margin: 0 auto;
  padding: var(--s2) var(--s3);
}

.logo {
  font-weight: 800;
  font-size: 1.25rem;
  text-decoration: none;
}

.site-header nav {
  display: flex;
  gap: var(--s3);
}

.site-header nav a {
  color: var(--muted);
  font-weight: 600;
  text-decoration: none;
}

.site-header nav a:hover {
  color: var(--utama);
}
```

Bedah tiap barisnya:

| Properti | Artinya |
|---|---|
| `display: flex` | Anak-anak elemen berjajar dalam satu baris |
| `justify-content: space-between` | Sebar sepanjang baris, ruang kosong di antara elemen |
| `align-items: center` | Sejajarkan di tengah secara vertikal |
| `flex-wrap: wrap` | Boleh turun ke baris baru jika tidak muat (penting di HP) |
| `gap` | Jarak antar anak elemen |

`margin: 0 auto` bersama `max-width` adalah trik klasik untuk **menaruh konten di tengah** dan membatasi lebarnya agar enak dibaca di layar lebar.

### 3.3 Hero dan Gambar yang Rapi

```css
main {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 var(--s3);
}

.hero {
  display: grid;
  align-items: center;
  gap: var(--s4);
  padding: var(--s5) 0 var(--s4);
}

.hero-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.section {
  padding-top: var(--s5);
}
```

Perhatikan, `.hero` belum menentukan kolom. Artinya di layar kecil, teks dan gambar **bertumpuk** dalam satu kolom, tepat seperti yang kita inginkan di HP. Pembagian dua kolom baru kita tambahkan di Modul 5 lewat media query. Inilah pendekatan **mobile-first**.

Dua baris di `.hero-img` layak dikenal:
- `aspect-ratio: 4 / 3` memaksa gambar punya perbandingan lebar dan tinggi tetap, berapa pun ukuran foto aslinya.
- `object-fit: cover` memotong foto secukupnya agar memenuhi kotak tanpa gepeng atau melar.

> Tips Dosen: Foto produk dari berbagai sumber biasanya punya ukuran berbeda-beda. Tanpa `aspect-ratio` dan `object-fit`, deretan kartu produk akan terlihat berantakan karena tinggi gambarnya tidak sama. Dua properti ini adalah penyelamat semua toko online.

### 3.4 Deretan Kartu yang Otomatis Menyesuaikan

Ini jurus favorit saya. Satu baris saja, dan kartu akan menyesuaikan jumlah kolomnya sendiri sesuai lebar layar:

```css
.grid {
  display: grid;
  gap: var(--s3);
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}
```

Cara membacanya dari dalam ke luar:
1. `minmax(260px, 1fr)` → tiap kolom **minimal 260px**, dan boleh melebar membagi sisa ruang sama rata (`1fr`).
2. `repeat(auto-fit, ...)` → ulangi kolom sebanyak yang **muat**.

Hasilnya: di layar lebar ada 3 kolom, di tablet 2 kolom, di HP 1 kolom. **Tanpa satu pun media query.**

> Tips Dosen: Coba kecilkan dan besarkan lebar jendela browser sambil memperhatikan kartu produk. Ini cara terbaik untuk benar-benar "merasakan" cara kerja `auto-fit`.

---

## 🛠️ Panduan Praktik Terbimbing

1. Buka `style.css`, lalu tambahkan blok layout dari bagian **3.2** dan **3.3**.
2. Tambahkan aturan `.grid` dari bagian **3.4**.
3. Pastikan kartu di HTML dibungkus `<div class="grid">`, seperti ini:

```html
<section id="produk" class="section">
  <h2>Produk Terbaru</h2>
  <div class="grid">
    <article class="card product" style="--i: 0"> ... </article>
    <article class="card product" style="--i: 1"> ... </article>
    <article class="card product" style="--i: 2"> ... </article>
  </div>
</section>
```

4. Simpan dan perhatikan: header sudah rapi, konten berada di tengah, foto hero tampil proporsional, dan produk berjajar tiga kolom.
5. **Eksperimen 1:** ubah `260px` menjadi `340px` dan lihat kapan kartu turun menjadi dua kolom.
6. **Eksperimen 2:** ubah `aspect-ratio: 4 / 3` pada `.hero-img` menjadi `16 / 9`. Lihat bagaimana foto dipotong otomatis.
7. Buka DevTools mode perangkat (`Ctrl + Shift + M`) dan lihat tampilannya di ukuran HP.

---

Keren! Halaman kalian sekarang sudah punya bentuk. Di **Modul 4**, kita akan mempercantik kartu produk, tombol, dan menambahkan animasi halus yang membuat toko terasa hidup. Sampai jumpa! 🎓
