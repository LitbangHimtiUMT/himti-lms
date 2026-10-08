# MODUL 4: Komponen & Micro-interaction

Halo teman-teman! Layout sudah rapi. Sekarang kita buat toko ini **terasa hidup**. Website modern bukan hanya soal tampilan, tapi juga soal "rasa": tombol yang merespon saat disentuh, kartu produk yang terangkat halus, dan foto yang sedikit membesar saat disorot. Detail kecil seperti ini disebut **micro-interaction**.

---

## 🎯 Apa Saja yang Akan Kita Capai Hari Ini?

Setelah menyelesaikan modul ini, saya harap teman-teman bisa:
1. Membuat komponen tombol dengan beberapa varian (`btn-primary` dan `btn-ghost`).
2. Membuat kartu produk lengkap dengan badge, harga, dan harga coret.
3. Menambahkan efek `:hover` yang halus memakai `transition` dan `transform`.
4. Membuat tombol bisa diakses keyboard dengan `:focus-visible`.
5. Membuat animasi dengan `@keyframes`, termasuk animasi bergantian lewat CSS variable.
6. Membuat bar stok yang nilainya diatur dari HTML.
7. **Goal Akhir:** Toko ThriftKita punya tombol, kartu, badge, harga, bar stok, dan animasi yang halus.

---

## 📚 Pembahasan Materi

### 4.1 Tombol yang Punya Varian

Satu kelas dasar `.btn` untuk bentuk, lalu kelas varian untuk warna:

```css
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary {
  background: var(--utama);
  color: #FFFFFF;
  box-shadow: var(--shadow);
}

.btn-ghost {
  border: 2px solid var(--border);
}
```

Di HTML, kita menumpuk dua kelas: `class="btn btn-primary"`. Pola ini membuat bentuk tombol cukup ditulis sekali, dan varian baru tinggal menambah satu kelas kecil.

`border-radius: 999px` adalah trik untuk membuat sudut tombol **bulat penuh** (bentuk pil).

### 4.2 Hover, Transition, dan Transform

```css
.btn:hover {
  transform: translateY(-2px);
}
```

Tanpa `transition`, tombol akan **meloncat** seketika. Dengan `transition: transform 0.2s`, perpindahannya jadi **halus selama 0,2 detik**.

> Peringatan Dosen: Untuk menggeser elemen saat hover, pakailah `transform`, bukan `margin` atau `top`. `transform` diproses lebih ringan oleh browser sehingga animasinya mulus, sedangkan mengubah `margin` memaksa browser menghitung ulang tata letak seluruh halaman dan terasa patah-patah.

### 4.3 Fokus untuk Pengguna Keyboard

Tidak semua orang memakai mouse. Sebagian pengguna menekan `Tab` untuk berpindah antar tombol. Beri mereka penanda yang jelas:

```css
.btn:focus-visible {
  outline: 3px solid var(--aksen);
  outline-offset: 3px;
}
```

Keunggulan `:focus-visible` dibanding `:focus`: garis ini hanya muncul saat fokus datang dari **keyboard**, bukan saat kita mengeklik dengan mouse. Jadi tampilan tetap bersih, tapi tetap ramah aksesibilitas.

### 4.4 Kartu, Badge, dan Harga

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: var(--s3);
  box-shadow: var(--shadow);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-6px);
}

.badge {
  display: inline-block;
  margin: var(--s2) 0 var(--s1);
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--aksen);
  color: var(--gelap);
  font-size: 0.75rem;
  font-weight: 800;
}

.price {
  font-size: 1.25rem;
  font-weight: 800;
}

.price s {
  margin-left: var(--s1);
  color: var(--muted);
  font-size: 0.9rem;
  font-weight: 400;
}
```

Perhatikan `.price s`: aturan ini hanya berlaku untuk tag `s` (harga coret) **di dalam** `.price`. Harga lama jadi lebih kecil dan abu-abu, sehingga mata pembeli langsung tertuju ke harga diskon.

### 4.5 Foto Produk yang Membesar Saat Disorot

Efek ini sering kita lihat di toko online besar. Ada dua kunci: kotak pembungkus yang **memotong** isi yang meluber (`overflow: hidden`), dan gambar yang **membesar** (`scale`) saat kartunya di-hover:

```css
.thumb {
  overflow: hidden;
  border-radius: calc(var(--radius) - 4px);
}

.thumb img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  transition: transform 0.3s;
}

.product:hover .thumb img {
  transform: scale(1.05);
}
```

Tanpa `overflow: hidden`, foto yang membesar akan menimpa elemen di sekitarnya. Dengan pembungkus ini, foto hanya membesar di dalam bingkainya.

Selector `.product:hover .thumb img` dibaca: "gambar di dalam `.thumb`, yang ada di dalam `.product`, **saat `.product` di-hover**". Jadi seluruh kartu yang disorot membuat fotonya membesar, bukan hanya saat mouse tepat di atas foto.

### 4.6 Bar Stok yang Nilainya Diatur dari HTML

Kita ingin pembeli tahu stok tinggal sedikit (taktik klasik toko online!). Di CSS kita pakai variabel `--progress`, dan di HTML kita isi nilainya langsung di elemen:

```css
.bar {
  height: 8px;
  border-radius: 999px;
  background: var(--border);
  overflow: hidden;
}

.bar span {
  display: block;
  height: 100%;
  width: var(--progress, 0%);
  background: var(--utama);
}

.stok {
  display: block;
  margin: var(--s1) 0 var(--s2);
  color: var(--muted);
}
```

```html
<div class="bar" style="--progress: 25%"><span></span></div>
<small class="stok">Sisa 1 pcs</small>
```

Nilai `0%` di dalam `var(--progress, 0%)` adalah **nilai cadangan** kalau variabelnya lupa diisi. Hanya dengan mengubah angka di HTML, panjang bar langsung berubah, tanpa menyentuh CSS.

### 4.7 Animasi Muncul dengan @keyframes

Kita ingin kartu **muncul sambil naik halus** saat halaman dibuka:

```css
@keyframes muncul {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
```

Lalu pasang di `.card`. Tambahkan dua baris di dalam aturan `.card` yang sudah ada:

```css
.card {
  animation: muncul 0.6s both;
  animation-delay: calc(var(--i) * 120ms);
}
```

Ingat angka `--i: 0`, `--i: 1`, `--i: 2` yang kita titipkan di HTML pada Modul 1? Sekarang terpakai! `calc(var(--i) * 120ms)` membuat kartu pertama muncul langsung, kartu kedua tertunda 120ms, kartu ketiga 240ms, dan seterusnya. Hasilnya kartu muncul **bergantian**, efek yang biasanya dibuat dengan JavaScript.

`both` memastikan kartu tetap tersembunyi selama menunggu gilirannya dan tetap tampil setelah animasi selesai.

> Tips Dosen: Animasi terbaik adalah yang **hampir tidak disadari**. Gerakan kecil dan singkat terasa elegan, sedangkan gerakan besar dan cepat justru mengganggu pembeli yang sedang memilih barang.

---

## 🛠️ Panduan Praktik Terbimbing

1. Pastikan HTML sudah memuat kartu produk, badge, harga, dan bar seperti pada Modul 1.
2. Tambahkan CSS komponen dari bagian **4.1** sampai **4.6** ke `style.css`.
3. Tambahkan juga gaya `.eyebrow`, `.lead`, dan `.actions` agar hero rapi:

```css
.eyebrow {
  color: var(--utama);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.lead {
  max-width: 52ch;
  color: var(--muted);
  font-size: 1.125rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s2);
}
```

4. Tambahkan gaya tombol beli di dalam kartu produk dan nomor langkah di bagian Cara Beli:

```css
.product .btn {
  display: block;
  text-align: center;
}

.step {
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-bottom: var(--s2);
  border-radius: 50%;
  background: var(--utama);
  color: #FFFFFF;
  font-weight: 800;
}
```

5. Lengkapi bagian ajakan (`.cta`) dan `footer`:

```css
.cta {
  margin: var(--s5) 0;
  padding: var(--s4) var(--s3);
  border-radius: calc(var(--radius) * 1.5);
  background: var(--gelap);
  color: #FFFFFF;
  text-align: center;
}

footer {
  padding: var(--s4) var(--s3);
  color: var(--muted);
  text-align: center;
}
```

6. Tambahkan animasi `muncul` dari bagian **4.7**, lalu segarkan halaman dan perhatikan kartu muncul bergantian.
7. Tekan `Tab` berulang kali di keyboard dan lihat garis kuning di tombol yang sedang fokus.
8. **Tantangan:** ubah `--progress` pada tiap produk sesuai stok versi kalian sendiri.

---

Luar biasa! Toko kalian sekarang terasa hidup. Di **Modul 5**, kita akan membuatnya nyaman di semua ukuran layar dan menambahkan **dark mode** hanya dengan mengganti nilai variabel. Sampai jumpa! 🎓
