# MODUL 1: Dasar-Dasar JavaScript

Halo semuanya! Selamat datang di Modul 1. Di pertemuan pertama kita kali ini, kita bakal berkenalan dengan fondasi dari segala interaksi di web masa kini, yaitu **JavaScript**. 

Coba bayangkan begini: jika HTML adalah kerangka dari sebuah rumah dan CSS adalah cat atau dekorasi yang membuatnya cantik, maka **JavaScript adalah listrik dan saluran airnya**. Dialah yang membuat rumah itu "hidup" dan bisa diajak berinteraksi. Seru kan? Mari kita mulai!

---

## 🎯 Apa Saja yang Akan Kita Capai Hari Ini?

Setelah menyelesaikan sesi ini, Saya harap teman-teman bisa:
1. Memahami seberapa pentingnya peran JavaScript dalam dunia *Web Development*.
2. Tahu cara yang benar untuk menyambungkan file JavaScript ke HTML kalian.
3. Bisa "bermain" dan menjalankan kode langsung lewat *Browser Console*.
4. Menggunakan `console.log()` untuk mencetak hasil (ini bakal sering banget kita pakai untuk nge-cek error!).
5. Ngerti bedanya nyimpen data pakai `let` dan `const`.
6. Mengenal tipe-tipe data dasar: Teks, Angka, Boolean, dll.
7. Mengerti cara kerja operator penugasan (*assignment*).
8. **Goal Akhir:** Membangun aplikasi kecil-kecilan untuk nampilin data identitas mahasiswa!

---

## 📚 Yuk, Masuk ke Materi!

### 1.1 Kenalan Dulu Sama JavaScript (JS)

Jadi, apa sih sebenarnya JavaScript itu?
Secara sederhana, JS adalah bahasa pemrograman yang tugas awalnya adalah bikin web jadi interaktif. Tapi sekarang? Wow, JavaScript udah berevolusi jauh banget! Kalian bisa pakai JS buat bikin aplikasi HP, desktop, bahkan program *server-side* sekalipun.

Coba perhatikan bagan pembagian tugas web modern ini:

```text
┌─────────────────────────────────────────────┐
│          ARSITEKTUR WEB MODERN              │
├─────────────────────────────────────────────┤
│  HTML  →  Struktur / Tulang                 │
│  CSS   →  Tampilan / Baju                   │
│  JS    →  Logika & Aksi / Otak              │
├─────────────────────────────────────────────┤
│  JavaScript sering dipakai buat:            │
│  ✓ Gonta-ganti isi halaman tanpa reload     │
│  ✓ Ngecek form (misal: password kurang)     │
│  ✓ Ngambil data dari server (API)           │
│  ✓ Animasi yang kompleks                    │
└─────────────────────────────────────────────┘
```

> **Catatan Penting dari Dosen:**
> Jangan keliru antara **JavaScript** dan **Java** ya! Namanya memang mirip, tapi ibaratnya sama bedanya kayak "Jawa" sama "Jawara". Beda jauh secara fungsi dan cara kerjanya. JS jalan di browser, Java biasa buat aplikasi berat (enterprise).

---

### 1.2 Cara Pasang JavaScript di HTML

Ada 3 cara untuk "mencolokkan" JS ke dalam HTML kalian. Perhatikan baik-baik ya:

**1. Inline JavaScript (Tidak Disarankan!)**
Ini ditaruh langsung di tag HTML. Saya tidak menyarankan ini karena bikin kode jadi berantakan.
```html
<button onclick="alert('Halo Teman-teman!')">Klik Saya</button>
```

**2. Internal JavaScript**
Kita taruh kodenya di antara tag `<script>` di dalam file HTML. Lumayan oke buat kode yang pendek.
```html
<!DOCTYPE html>
<html>
<head>
    <title>Contoh Internal JS</title>
</head>
<body>
    <script>
        console.log("Halo dari dalam file HTML!");
    </script>
</body>
</html>
```

**3. External JavaScript (Paling Direkomendasikan ⭐)**
Nah, ini cara paling profesional. File JS dipisah, lalu dipanggil dari HTML. Supaya apa? Supaya kode kita rapi!
```html
<!DOCTYPE html>
<html>
<head>
    <title>Contoh External JS</title>
</head>
<body>
    <!-- Taruh di paling bawah body sebelum </body> -->
    <script src="script.js"></script>
</body>
</html>
```

> **Tips Dosen:** Selalu biasakan pakai *External JavaScript* dan taruh tag `<script>` di akhir bagian `<body>`. Kenapa? Supaya HTML-nya beres diload dulu sama browser, baru jalankan logikanya!

---

### 1.3 Ngintip Console Browser

Teman-teman, saat kalian coding JS, kalian butuh "ruang rahasia" buat nge-cek apakah kodenya jalan dengan benar atau malah *error*. Ruang rahasia ini namanya **Browser Console**.

Cara bukanya gampang:
- Di Chrome/Edge: Tekan `F12` lalu pilih tab "Console", atau pencet `Ctrl+Shift+J`.

Kalian bisa ngetik kode JS langsung di situ lho! Coba deh ketik `2 + 3` trus enter. Pasti keluar angka `5`. Seru, kan?

---

### 1.4 Jurus Andalan: `console.log()`

Kalau di bahasa C kalian pakai `printf`, di Python pakai `print`, nah di JavaScript kita punya `console.log()`. Gunanya untuk mencetak nilai ke *Console* yang tadi kita pelajari.

```javascript
console.log("Halo HIMTI!");             // Nyetak teks
console.log(2023);                      // Nyetak angka
console.log(true);                      // Nyetak boolean
console.log("Nama:", "Budi", "NIM:", 123); // Nyetak banyak sekaligus
```

Bahkan kalian bisa kasih warna lho!
```javascript
console.log("%cPesan Penting!", "color: red; font-size: 20px;");
```

---

### 1.5 Kotak Penyimpanan: `let` dan `const`

Dalam pemrograman, kita butuh tempat untuk nyimpen data. Kita sebut itu **Variabel**. Bayangkan variabel ini sebagai *kotak* yang ada label namanya. Di JS modern, kita pakai dua jenis "kotak":

**1. `let` (Kotak yang Isinya Bisa Diganti)**
```javascript
let nama = "Budi";
console.log(nama); // Budi

nama = "Andi";     // Kita ganti isinya
console.log(nama); // Andi
```

**2. `const` (Kotak yang Digembok / Permanen)**
```javascript
const PI = 3.14;
// PI = 3.1415; // ERROR! Nilainya nggak bisa diubah!
```

> **Aturan Penamaan Kotak (Variabel):**
> 1. Enggak boleh diawali angka (❌ `1nama`).
> 2. Case sensitive! `Nama` dan `nama` itu dua kotak yang berbeda.
> 3. Gunakan format *camelCase* (kayak punuk unta) untuk nama yang panjang. Contoh: `namaMahasiswaBaru`.

---

### 1.6 Tipe Data (Apa Saja yang Bisa Dimasukkan ke Kotak?)

JS ini sangat pengertian lho, dia otomatis tahu tipe data apa yang kalian masukkan.

**1. String (Teks)**
Diapit tanda kutip satu `''`, dua `""`, atau *backtick* ` `` `.
```javascript
let nama = "Budi";
let jurusan = 'Informatika';
// Backtick spesial, bisa nyelipin variabel!
let perkenalan = `Halo, namaku ${nama} dari ${jurusan}`; 
```

**2. Number (Angka)**
Bebas, mau angka bulat atau desimal.
```javascript
let umur = 20;
let ipk = 3.85;
```

**3. Boolean (Benar / Salah)**
Cuma ada dua nilai: `true` atau `false`.
```javascript
let sudahLulus = false;
let lagiPusing = true;
```

**4. Kosong, Hampa, Tiada...**
- `null`: Sengaja kita kosongkan.
- `undefined`: Belum diisi apa-apa.

---

### 1.7 Operator Penugasan (Assignment)

Kita bisa isi variabel sekaligus ngasih operasi matematika. Ibarat jalan pintas!

```javascript
let uang = 10000;
uang += 5000; // Sama aja kayak: uang = uang + 5000
// Sekarang uang jadi 15000!

uang *= 2; // Sama aja kayak: uang = uang * 2
// Sekarang uang jadi 30000!
```

---

## 🛠️ Yuk Kita Praktik!

Saya minta kalian buka VSCode sekarang. Kita akan bikin proyek pertama!

### Praktik 1: Siapkan File
Bikin folder baru, lalu bikin 3 file ini:
- `index.html`
- `style.css` (biarin kosong dulu)
- `script.js`

Di `index.html`, ketik ini:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Belajar JavaScript</title>
</head>
<body>
    <h1>Belajar JavaScript Bareng HIMTI!</h1>
    <p>Jangan lupa buka console browser (F12) ya buat lihat hasilnya.</p>
    
    <!-- Manggil si script.js -->
    <script src="script.js"></script>
</body>
</html>
```

Di `script.js`, coba kalian ngoding ini:
```javascript
console.log("=== Selamat Datang di Kelas JavaScript ===");

const nama = "Budi Santoso";
const nim = "12345678";
let semester = 3;
let ipk = 3.75;
const statusAktif = true;

console.log(`Nama: ${nama}`);
console.log(`NIM: ${nim}`);
console.log(`Semester saat ini: ${semester}`);
console.log(`Status Aktif: ${statusAktif}`);
```
Buka `index.html` kalian di browser, tekan `F12`, dan lihat hasilnya di tab Console! Keren kan?

---

## 🚀 Mini Project: Aplikasi Identitas Mahasiswa

Sekarang tantangan buat kalian. Coba bikin file baru, dan buat program sederhana yang mencetak identitas kalian sendiri menggunakan variabel dan `console.log`.

**Syarat dari dosen:**
1. Variabelnya harus pakai kombinasi `let` dan `const`.
2. Gunakan minimal 3 tipe data (String, Number, Boolean).
3. Gunakan *Template Literal* (tanda backtick ` `` `) pas mau nyetak (nge-print).

Tampilannya di console kurang lebih harus kayak gini:
```text
=== DATA MAHASISWA ===
Nama      : [Nama Kalian]
NIM       : [NIM Kalian]
Jurusan   : [Jurusan]
Angkatan  : [Tahun]
IPK       : [Tebak aja!]
Status    : [Aktif/Cuti]
```

---

## 📝 Evaluasi (Cek Pemahaman Kalian)

Sebelum menutup sesi ini, mari kita asah otak sedikit. Jawab dalam hati aja ya:
1. Kenapa sih `console.log()` itu penting banget buat *programmer*?
2. Kapan sebaiknya kita pakai `let` dan kapan kita harus pakai `const`?
3. Kenapa penulisan variabel *nggak boleh* diawali dengan angka?

Bagaimana? Gampang kan Modul 1 ini? Kalau kalian bingung, jangan malu-malu buat tanya ke mentor atau temen sekelas. Kita ketemu lagi di **Modul 2** nanti, kita akan belajar cara bikin program yang bisa mengambil keputusan. Sampai jumpa! 
