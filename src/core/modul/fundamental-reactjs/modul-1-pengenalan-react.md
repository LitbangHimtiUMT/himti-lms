# MODUL 1: Pengenalan React & Persiapan Environment

Halo semuanya! Selamat datang di **Modul 1 Pemrograman React JS Fundamental**. 

Senang sekali bisa menemani kalian memulai perjalanan baru di dunia *frontend development*. React adalah pustaka (*library*) JavaScript paling populer di dunia saat ini untuk membangun antarmuka web. Kita akan belajar bukan cuma sekadar menghafal sintaks, tapi memahami **mengapa** React dibuat dan masalah apa yang berhasil ia selesaikan. 

Mari kita mulai dengan santai namun fokus!

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Memahami masalah utama manipulasi DOM manual pada JavaScript biasa.
2. Menjelaskan perbedaan antara *Library* dan *Framework*.
3. Menjelaskan konsep *Single Page Application* (SPA) dibanding *Multi-Page Application* (MPA).
4. Menyiapkan *environment* belajar di komputer masing-masing (Node.js, VS Code, dan Git).
5. Menggunakan perintah terminal dasar dan package manager (npm).

---

## 1.1 Masalah dengan Website Tradisional

Sebelum kita melompat ke React, mari kita mundur sejenak. Bagaimana cara kita membuat website dinamis sebelum React ada?

Biasanya, kita menggunakan HTML untuk kerangka halaman, lalu menulis JavaScript biasa (Vanilla JS) untuk mengubah tulisan atau memunculkan elemen baru ketika tombol diklik. Contohnya seperti ini:

```html
<!DOCTYPE html>
<html>
<body>
    <h1 id="judul">Selamat Datang</h1>
    <button onclick="ubahJudul()">Klik Saya</button>
    
    <script>
        function ubahJudul() {
            document.getElementById('judul').textContent = 'Halo Dunia!';
        }
    </script>
</body>
</html>
```

Kode di atas sangat sederhana dan berjalan lancar. Tapi, bagaimana jika aplikasinya berkembang menjadi kompleks? Misal, aplikasi manajemen daftar mahasiswa dengan fitur Tambah, Hapus, Edit, Pencarian, dan Filter.

Di JavaScript biasa, kalian harus menulis kode manipulasi DOM seperti ini secara berulang-ulang:
```javascript
function tampilkanMahasiswa() {
    const list = document.getElementById('daftar-mhs');
    list.innerHTML = ''; // Hapus elemen lama
    for (let mhs of mahasiswaList) {
        const li = document.createElement('li');
        li.textContent = mhs.nama;
        list.appendChild(li); // Tempelkan elemen baru
    }
}
```

### Masalah Utama Manipulasi DOM Manual:
1. **Kode Sangat Berantakan & Sulit Dikelola:** Setiap kali data berubah, kalian harus mencari elemen DOM secara manual (`querySelector`), menghapus elemen lama, membuat elemen baru, dan menempelkannya kembali.
2. **Performa Lambat:** Setiap kali DOM dimanipulasi secara manual, browser harus menghitung ulang layout halaman (*reflow*) dan menggambar ulang tampilannya (*repaint*). Jika dilakukan ratusan kali, web akan terasa lambat dan patah-patah.
3. **Data (State) Sulit Dilacak:** Data mana yang benar? Apakah data yang ada di variabel JavaScript, atau teks yang menempel di elemen HTML? Sangat membingungkan.

![DOM Tree Illustration](https://camo.githubusercontent.com/8ba2054d5f2e9d3d5bcdd907561b998b47620524c11324afdc54329fa527c744/68747470733a2f2f637572726963756c756d2d636f6e74656e742e73332e616d617a6f6e6177732e636f6d2f666577706a732f666577706a732d7468652d646f6d2d747265652f496d6167655f365f446f6d547265652e706e67)
*Ilustrasi: DOM pohon HTML yang kompleks dan rumit untuk dikelola secara manual.*

---

## 1.2 Lahirnya React & Konsep Utamanya

Untuk menyelesaikan masalah di atas, Facebook menciptakan **React** pada tahun 2013. React memperkenalkan pendekatan baru yang revolusioner dalam membangun antarmuka web.

### Apakah React itu Library atau Framework?
React secara teknis adalah sebuah **Library** (Pustaka), bukan Framework.
- **Library:** Menyediakan alat bantu khusus (React fokus pada tampilan/UI saja). Kalian bebas mengatur struktur folder dan memilih library pendukung lainnya (seperti router, fetching, dll). Ibarat dibekali kotak perkakas.
- **Framework:** Menyediakan aturan yang ketat dan struktur aplikasi yang wajib diikuti dari awal (seperti Angular atau NestJS). Ibarat masuk ke dalam cetakan rumah jadi.

### Dua Pilar Kekuatan React:
1. **Component-Based:** Halaman web dibagi menjadi potongan-potongan kecil yang independen dan dapat digunakan kembali (*reusable*).
2. **Virtual DOM:** React membuat salinan DOM asli di memori komputer yang disebut Virtual DOM. Ketika ada perubahan data, React membandingkan Virtual DOM dengan DOM asli terlebih dahulu, lalu hanya memperbarui bagian yang berubah saja. Ini membuat proses render menjadi super cepat!

---

## 1.3 Website Tradisional vs Single Page Application (SPA)

Kalian pasti sering merasa kesal saat mengklik menu di website lama dan seluruh layar memutih karena sedang *loading/reload* halaman baru. Itu adalah **Multi-Page Application (MPA)**.

React mengusung konsep **Single Page Application (SPA)**:
- Browser hanya mengunduh 1 file HTML di awal (`index.html`).
- Perpindahan halaman sebenarnya hanya menyembunyikan elemen lama dan menampilkan elemen baru menggunakan JavaScript secara instan tanpa perlu reload.
- Pengalaman pengguna menjadi sangat mulus layaknya aplikasi mobile native!

---

## 2.1 Persiapan Environment: Menginstal Node.js

Untuk memulai coding React di komputer, kita membutuhkan **Node.js**. 

### Apa itu Node.js?
Node.js adalah sebuah *runtime environment* yang memungkinkan kita menjalankan kode JavaScript langsung di komputer kita, tidak hanya terbatas di dalam browser saja. Kita membutuhkan Node.js untuk menggunakan program pembantu React dan mengunduh pustaka eksternal.

### Langkah Instalasi:
1. Kunjungi website resmi [nodejs.org](https://nodejs.org).
2. Unduh versi **LTS (Long Term Support)** yang direkomendasikan karena versi ini paling stabil dan minim bug.
3. Jalankan file installer dan klik *Next* sampai selesai.
4. **Verifikasi Instalasi:** Buka Terminal atau Command Prompt di komputer kalian, lalu ketik perintah berikut:
   ```bash
   node --version
   npm --version
   ```
   Jika memunculkan angka versi (seperti `v18.x.x` atau `v20.x.x`), selamat! Node.js dan npm (Node Package Manager) sudah aktif di komputer kalian.

![Code on screen](https://i.ytimg.com/vi/tHthqaBHjeE/maxresdefault.jpg)
*Ilustrasi: Menulis dan menguji kode web modern melalui teks editor dan terminal.*

---

## 2.2 Menyiapkan VS Code & Ekstensi Pendukung

Kita akan menggunakan **Visual Studio Code** sebagai editor teks utama kita. Agar pengalaman koding React kalian menyenangkan, silakan buka menu Extensions (ikon kotak empat di sebelah kiri VS Code) lalu instal ekstensi wajib ini:

1. **ES7+ React/Redux/React-Native snippets:** Ekstensi ini sangat penting untuk menulis shortcut kode React secara instan.
2. **Prettier - Code formatter:** Merapikan baris kode kalian secara otomatis saat disimpan agar terlihat bersih dan konsisten.
3. **Tailwind CSS IntelliSense:** Memberikan saran otomatis (*autocomplete*) saat menulis kelas Tailwind CSS.

---

## 2.3 Mengenal Terminal & npm

Sebagai developer web modern, kalian akan sering berinteraksi dengan terminal ketik. Berikut adalah 4 perintah dasar terminal yang wajib kalian kuasai:
- `cd [nama-folder]`: Berpindah masuk ke folder tujuan.
- `cd ..`: Keluar dari folder saat ini menuju folder tingkat di atasnya.
- `ls` (macOS/Linux) atau `dir` (Windows): Melihat daftar file di dalam folder aktif.
- `clear`: Membersihkan layar terminal.

### Node Package Manager (npm)
npm adalah aplikasi pengelola paket kode untuk JavaScript. Bayangkan npm seperti Google Play Store atau App Store, tapi khusus untuk mendownload pustaka-pustaka kode gratis yang dibuat oleh developer di seluruh dunia.
- Semua daftar paket yang kita unduh akan tercatat di dalam file konfigurasi bernama **`package.json`**.
- File fisik dari paket-paket tersebut disimpan otomatis di dalam folder **`node_modules`** (jangan pernah mengubah isi folder ini secara manual ya!).

---

## 📝 Kesimpulan Modul 1

Sebagai penutup pembelajaran kita hari ini, berikut rangkuman poin penting yang wajib kalian catat:
1. **Manipulasi DOM Manual Lambat:** Koding dengan Vanilla JS memerlukan manipulasi DOM fisik berulang kali yang membuat website berat akibat *reflow/repaint* layout, serta mempersulit pelacakan data (*state*).
2. **React Hadir Sebagai Solusi:** React mempermudah pembuatan UI dinamis berkat arsitektur komponen modular dan sistem Virtual DOM yang super cepat dalam menyaring dan merender pembaruan elemen.
3. **Library vs Framework:** React adalah library UI yang fleksibel, memberi kebebasan dalam menata struktur folder aplikasi, berbeda dengan framework kaku.
4. **Single Page Application (SPA):** Aplikasi web SPA hanya memuat satu file HTML utama di awal, lalu mengganti halaman secara halus melalui manipulasi JavaScript tanpa reload browser.
5. **Environment Siap Pakai:** Kita memanfaatkan Node.js versi LTS dan editor VS Code sebagai modal awal mendevelop dan mengelola pustaka koding melalui npm.

Bagaimana? Seru kan perkenalan awal dengan ekosistem React? Di **Modul 2** nanti, kita akan langsung mempraktikkan cara membuat proyek React pertama kita menggunakan tools modern bernama **Vite**! Tetap semangat dan sampai jumpa di modul berikutnya! 🚀
