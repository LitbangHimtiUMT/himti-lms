# MODUL 7: Panduan Troubleshooting & Evaluasi Akhir

Halo semuanya! Selamat datang di **Modul 7**, modul terakhir dari rangkaian materi **React JS Fundamental**.

Kalian telah menempuh perjalanan luar biasa mulai dari berkenalan dengan ekosistem Node.js, menulis sintaks JSX, mengirim data dinamis via Props, hingga merangkai landing page HIMTI secara responsif menggunakan Tailwind CSS. 

Pada modul penutup ini, kita akan fokus mempelajari panduan pemecahan masalah (**Troubleshooting**) saat koding React untuk membekali kalian menghadapi error secara mandiri, meninjau kembali ringkasan materi, serta menyelesaikan kuis evaluasi akhir beserta instruksi tugas praktik mandiri.

Mari kita selesaikan modul terakhir ini dengan penuh semangat!

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Mengidentifikasi penyebab dan solusi dari error-error umum di proyek React.
2. Memanfaatkan DevTools Console browser dan terminal untuk melacak error secara taktis.
3. Mengulas kembali seluruh rangkuman materi pokok React JS Fundamental.
4. Menyelesaikan kuis komprehensif dengan nilai minimal kelulusan.
5. Membangun sebuah aplikasi web sederhana yang responsif secara mandiri sebagai syarat tugas akhir modul.

---

## 14.1 Panduan Troubleshooting Error Umum di React

Saat menulis kode, error bukanlah sebuah kegagalan. Error adalah cara komputer memberi tahu kita bahwa ada sesuatu yang perlu diperbaiki. Berikut adalah 5 jenis error paling populer di React beserta cara cepat menyelesaikannya:

### 1. Error: `npm: command not found`
- **Penyebab:** Node.js belum terpasang di sistem operasi komputer kalian, atau path terminal belum terdaftar dengan benar.
- **Solusi:** Unduh kembali file installer Node.js versi LTS di [nodejs.org](https://nodejs.org) lalu jalankan proses instalasi ulang. Restart VS Code atau Terminal kalian setelah instalasi selesai.

### 2. Error: `Module not found: Can't resolve './components/Navbar'`
- **Penyebab:** React tidak menemukan file komponen yang ingin kalian impor. Ini biasanya terjadi karena salah mengetik nama file atau folder, atau salah menuliskan arah path.
- **Solusi:** Periksa kembali penulisan path impor kalian. Pastikan menggunakan `./` untuk file lokal. 
  - ✅ `import Navbar from './components/Navbar';`
  - ❌ `import Navbar from 'components/Navbar';` (Akan dianggap sebagai paket eksternal dari `node_modules`).

### 3. Masalah: Komponen Kosong / Tidak Muncul di Layar
- **Penyebab:** Paling sering terjadi karena kalian lupa menuliskan pernyataan `export default` di file komponen anak, atau lupa menuliskan kata kunci `return` sebelum membungkus baris JSX.
- **Solusi:**
  ```jsx
  // Pastikan ada kata kunci return dan tanda kurung pembungkus
  function Header() {
    return (
      <h1>Ini Header</h1>
    );
  }
  export default Header; // Pastikan baris ini ada di paling bawah!
  ```

### 4. Error: `JSX element '...' has no corresponding closing tag`
- **Penyebab:** Ada tag di dalam JSX kalian yang lupa ditutup. Ingat, aturan JSX mewajibkan seluruh tag (terutama tag mandiri seperti `<img />`, `<input />`, atau `<br />`) ditutup secara eksplisit.
- **Solusi:** Cari baris kode yang ditunjuk oleh error, lalu tambahkan penutup garis miring `/` sebelum kurung siku tutup.

### 5. Masalah: Kelas Tailwind CSS Tidak Berfungsi
- **Penyebab:** Server development belum membaca file konfigurasi baru, atau path pemindaian di file `tailwind.config.js` salah.
- **Solusi:** Matikan server di terminal dengan menekan **Ctrl + C**, lalu jalankan kembali lewat `npm run dev`. Periksa kembali bagian isi properti `content` di file `tailwind.config.js`.

---

## 14.2 Tips Debugging secara Mandiri
Jika kalian menemukan error di tengah-tengah pengerjaan koding, lakukan langkah run-through taktis ini:
1. **Baca Pesan Error di Terminal/Layar:** Pesan error React sangatlah informatif. Dia biasanya menunjukkan nama file, baris ke berapa, serta karakter mana yang memicu kegagalan.
2. **Gunakan Console Browser:** Tekan tombol **F12** di browser kalian, buka tab **Console**. Jika ada error JavaScript, dia akan tercetak berwarna merah di sana.
3. **Langkah Darurat (Hapus Cache):** Jika proyek kalian terasa aneh tanpa alasan yang jelas, matikan terminal, hapus folder `node_modules` dan file `package-lock.json`, lalu instal ulang dengan mengetik `npm install` kembali di terminal.

---

## 15.0 Ringkasan 10 Poin Utama React JS Fundamental

Sebagai pengingat sebelum kalian mengerjakan kuis evaluasi, berikut adalah poin-poin saripati materi kita:
1. React adalah **Library JavaScript** khusus untuk merancang antarmuka visual (UI) web.
2. React membagi antarmuka web menjadi potongan kecil yang disebut **Component**.
3. **Vite** adalah build tool modern yang digunakan untuk meluncurkan server lokal dengan sangat cepat.
4. **JSX** adalah perpanjangan sintaks JavaScript yang mempermudah penulisan HTML di dalam file React.
5. Pada JSX, kelas CSS wajib ditulis menggunakan **`className`** (bukan `class`).
6. **Props** adalah data kiriman dari komponen induk ke komponen anak yang bersifat **Read-Only** (tidak bisa diubah nilainya).
7. Tanda kurung kurawal **`{}`** digunakan untuk menyisipkan ekspresi JavaScript dinamis di dalam JSX.
8. **Tailwind CSS** mengusung konsep *Utility-First* di mana styling dilakukan langsung lewat properti kelas di JSX.
9. **Single Page Application (SPA)** memindahkan tampilan secara instan lewat JavaScript tanpa melakukan reload browser.
10. **Virtual DOM** adalah representasi DOM asli di memori yang digunakan React untuk mengoptimalkan performa rendering.

---

## 📝 Quiz Evaluasi Modul 7

Silakan jawab kuis pilihan ganda berikut untuk membuka kunci kelulusan modul React kalian:

1. **Siapakah perusahaan teknologi yang menciptakan dan memelihara React pertama kali?**
   - a. Google
   - b. Microsoft
   - c. Facebook (Meta)
   - d. Twitter (X)
2. **Apa fungsi utama dari build tool Vite di proyek React kita?**
   - a. Menyimpan data mahasiswa ke database.
   - b. Menyediakan server lokal yang cepat serta menggabungkan file kode (*bundling*).
   - c. Menghias tampilan website agar responsif.
   - d. Memeriksa validitas sintaks HTML.
3. **Mengapa kita dilarang keras memodifikasi langsung nilai data Props di dalam komponen anak?**
   - a. Karena React akan menghapus file tersebut secara otomatis.
   - b. Karena props bersifat *Read-Only* untuk menjaga konsistensi alur data searah.
   - c. Karena props adalah fungsi, bukan objek variabel.
   - d. Karena memodifikasi props akan memperlambat koneksi internet browser.
4. **Manakah penulisan komentar yang benar di dalam kode JSX?**
   - a. `// Ini komentar saya`
   - b. `<!-- Ini komentar saya -->`
   - c. `/* Ini komentar saya */`
   - d. `{/* Ini komentar saya */}`
5. **Manakah di antara kode berikut yang merupakan penulisan inline style yang benar di JSX?**
   - a. `<div style="color: blue; margin-top: 10px;">`
   - b. `<div style={{ color: 'blue', marginTop: '10px' }}>`
   - c. `<div style={ color: 'blue', margin-top: '10px' }>`
   - d. `<div className="color: blue; margin-top: 10px;">`

---

## 📝 Kesimpulan Modul 7

Selamat! Kalian telah menyelesaikan seluruh materi belajar React JS Fundamental. Berikut adalah ringkasan akhir dari Modul 7:
1. **Error Bukan Hambatan:** Belajar membaca kode error (seperti `Module not found` atau tag tidak ditutup) membantu kita memahami letak kesalahan dan memperbaikinya secara cepat.
2. **Kunci Debugging:** Manfaatkan browser Console (F12) dan periksa tab terminal VS Code untuk melacak bug atau error secara mandiri.
3. **Pondasi Siap Kerja:** Dengan menguasai Komponen, JSX, Props, dan Tailwind CSS, kalian kini sudah memiliki pondasi kokoh untuk mendesain aplikasi web interaktif berskala besar.

Kerja keras kalian sangat luar biasa! Menyelesaikan rangkaian modul ini adalah langkah awal yang sangat baik untuk menjadi seorang *Frontend Developer* profesional. Teruslah berkarya, asah skill kalian dengan membuat proyek-proyek baru, dan jangan pernah takut menghadapi error! Sampai jumpa di materi tingkat lanjut berikutnya! 🚀
