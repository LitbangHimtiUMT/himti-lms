# MODUL 7: Proyek Akhir JavaScript Fundamental

Halo rekan-rekan mahasiswa sekalian! Selamat datang di babak penutup: **Modul 7**. 

Saya ucapkan selamat karena kalian sudah berhasil melewati perjalanan panjang dari Modul 1 hingga Modul 6. Kita sudah belajar dasar variabel, logika percabangan, fungsi, perulangan, struktur data array & object, hingga memanipulasi halaman web menggunakan DOM dan menyimpannya ke Local Storage browser. Luar biasa perjuangan kalian!

Sekarang adalah saatnya kalian membuktikan semua pemahaman tersebut. Di modul terakhir ini, tugas kalian adalah membangun sebuah **Aplikasi Web Interaktif Mandiri** tanpa bantuan framework seperti React atau Vue. Gunakan JavaScript murni (Vanilla JavaScript) untuk menciptakan solusi nyata!

---

## 🎯 Tujuan Akhir Pembelajaran

Setelah merancang dan menyelesaikan proyek akhir ini, kalian diharapkan mampu:
1. Menghubungkan dan memadukan seluruh materi JavaScript Fundamental yang sudah dipelajari.
2. Membangun aplikasi web interaktif yang responsif dan ramah pengguna secara mandiri.
3. Menerapkan penulisan kode yang bersih, rapi, dan mudah dibaca (*clean code*).
4. Membuat dokumentasi proyek yang baik (file `README.md`) serta meng-online-kannya ke internet.
5. Mempresentasikan hasil karya kalian dengan percaya diri di depan mentor dan teman-teman!

---

## 📋 Ketentuan Wajib Proyek

Aplikasi kalian harus memenuhi spesifikasi teknis berikut agar memenuhi syarat penilaian:

### 1. Fondasi JavaScript yang Wajib Digunakan:
- **Variabel:** Menggunakan `let` dan `const` dengan benar (tidak ada penggunaan `var` lagi ya!).
- **Logika:** Menggunakan pengondisian (`if`, `else`, `else if`, atau `switch case`).
- **Fungsi:** Mengatur kode secara rapi menggunakan `function` (diutamakan menggunakan *arrow function*).
- **Perulangan:** Menerapkan perulangan (`for`, `while`, atau metode iterasi modern seperti `.map()`, `.filter()`, `.forEach()`).
- **Struktur Data:** Data aplikasi harus dikelola dalam bentuk **Array** dan **Object** (*Array of Objects*).
- **Interaktivitas:** Menggunakan DOM Manipulation dan memasang `addEventListener()`.

### 2. Fitur Aplikasi yang Wajib Ada:
- **CRUD Operations:** Pengguna harus bisa menambah data (*Create*), menampilkan data (*Read*), mengubah data (*Update*), dan menghapus data (*Delete*).
- **Penyimpanan Lokal (localStorage):** Data aplikasi tidak boleh hilang ketika halaman di-refresh.
- **Desain Responsif:** Tampilan web harus tetap rapi saat dibuka di HP maupun Laptop.
- **Validasi Form:** Mencegah input kosong atau format data yang salah secara informatif.
- **Fitur Cari & Saring:** Memiliki kolom pencarian (*search*) atau tombol penyaringan (*filter*).
- **Statistika Data:** Menampilkan rangkuman atau jumlah kalkulasi data (misal: total pengeluaran, rata-rata nilai, atau jumlah tugas selesai).

### 💡 Nilai Tambah (Bonus Point!):
- Adanya fitur *Dark Mode / Light Mode* toggle.
- Fitur Ekspor/Impor data dalam format JSON/CSV.
- Efek animasi halus saat data ditambah atau dihapus.
- Dukungan navigasi tombol pintas keyboard (*keyboard shortcuts*).

---

## 🎨 Pilihan Tema Proyek (Silakan Pilih Salah Satu!)

Saya bebaskan kalian memilih tema yang paling menarik minat kalian. Berikut beberapa ide tema beserta gambaran fiturnya:

1. **Aplikasi Catatan Kuliah (Notes App)**
   - Membuat, mengedit, dan menghapus catatan.
   - Mengelompokkan catatan berdasarkan kategori (tugas, materi, pribadi).
   - Fitur pencarian catatan secara cepat.
   
2. **Pelacak Keuangan Mahasiswa (Expense Tracker)**
   - Mencatat pengeluaran dan pemasukan harian.
   - Grafik sederhana total anggaran.
   - Filter transaksi berdasarkan kategori (makanan, kosan, buku).
   
3. **Absensi Kehadiran Kelas (Student Attendance)**
   - Input daftar hadir mahasiswa per kelas.
   - Menghitung persentase kehadiran secara otomatis.
   - Saring kehadiran berdasarkan status (Hadir, Sakit, Alpa).
   
4. **Pelacak Kebiasaan Baik (Habit Tracker)**
   - Daftar kebiasaan yang ingin dibangun (baca buku, olahraga, tidur tepat waktu).
   - Cetak centang harian.
   - Menghitung *streak* berturut-turut untuk menjaga motivasi.

5. **Kalkulator Nilai Akhir (Student Score App)**
   - Memasukkan nilai tugas, UTS, UAS.
   - Menghitung nilai akhir rata-rata tertimbang.
   - Menampilkan predikat kelulusan (A, B, C, D, E) secara otomatis beserta peringkat kelas.

---

## 📊 Kriteria Penilaian Ujian Akhir

Proyek kalian akan dinilai secara adil berdasarkan aspek berikut:

| Aspek Penilaian | Bobot | Deskripsi |
| :--- | :---: | :--- |
| **Fungsionalitas** | 30% | Semua tombol, validasi, dan penyimpanan local berjalan 100% tanpa error di console. |
| **Kualitas Kode** | 20% | Penamaan variabel rapi (*camelCase*), struktur file teratur, dan ada komentar penjelas. |
| **UI/UX (Tampilan)**| 20% | Desain web menarik, responsif, warna harmonis, dan nyaman digunakan. |
| **Inovasi & Bonus**| 15% | Adanya fitur tambahan di luar wajib (seperti *dark mode* atau ekspor data). |
| **Dokumentasi** | 15% | Adanya file `README.md` yang menjelaskan cara menjalankan aplikasi dan link demo yang aktif. |

---

## 🧭 Panduan Alur Pengerjaan (Timeline)

Agar pengerjaan proyek kalian teratur dan tidak menumpuk di akhir, ikuti tahapan berikut:

- **Tahap 1: Perencanaan (1 Jam)**
  - Tentukan tema, coret-coret rancangan tampilan di kertas, dan rancang bentuk isi properti Object data kalian.
- **Tahap 2: Persiapan Project (30 Menit)**
  - Buat folder baru, hubungkan file HTML, CSS, dan JS. Pastikan file JavaScript dipanggil dengan benar di bagian bawah body.
- **Tahap 3: Coding Tahap Utama (3-4 Jam)**
  - Tulis logika array dan object-nya terlebih dahulu, susun fungsi CRUD-nya, baru sambungkan ke tombol-tombol DOM HTML kalian. Pasang fitur localStorage dan statistik di akhir.
- **Tahap 4: Pengujian & Perbaikan Bug (1 Jam)**
  - Coba input data aneh-aneh (kosong, teks di kolom angka) untuk memastikan form validasi kalian bekerja dan tidak membuat aplikasi eror.
- **Tahap 5: Polishing & Merapikan Kode (30 Menit)**
  - Hapus kode `console.log` yang sudah tidak terpakai, rapihkan lekukan baris kode (*indentation*), dan poles tampilan CSS agar makin estetik.
- **Tahap 6: Publikasi (30 Menit)**
  - Upload kode kalian ke GitHub dan online-kan menggunakan layanan gratis seperti GitHub Pages atau Netlify. Lengkapi file `README.md`.

---

## 🛠️ Template Kerangka Kerja (Boilerplate)

Saya sediakan cetak biru struktur file dan kode dasar agar kalian bisa langsung mulai tanpa bingung:

### 1. Struktur Folder Proyek:
```text
nama-proyek-kalian/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── icons/
```

### 2. Kerangka Dasar JavaScript (`script.js`):
```javascript
// ============================================
// 1. DATA UTAMA / STATE APLIKASI
// ============================================
let database = [];
let idBerikutnya = 1;
let filterAktif = 'all';
let kataKunciCari = '';

// ============================================
// 2. TOMBOL-TOMBOL DOM HTML
// ============================================
const formulir = document.getElementById('mainForm');
const wadahList = document.getElementById('dataList');
const textCari = document.getElementById('search');

// ============================================
// 3. FUNGSI LOGIKA CRUD
// ============================================
function tambahData(namaBarang, jumlah) {
    const dataBaru = {
        id: idBerikutnya++,
        nama: namaBarang,
        qty: jumlah,
        selesai: false
    };
    database.push(dataBaru);
    simpanKeBrowser();
    renderTampilan();
}

function hapusData(id) {
    database = database.filter(item => item.id !== id);
    simpanKeBrowser();
    renderTampilan();
}

// ============================================
// 4. FUNGSI RENDER (MENGGAMBAR KE LAYAR)
// ============================================
function renderTampilan() {
    // Saring data berdasarkan cari dan filter
    let hasilSaring = database.filter(item => {
        return item.nama.toLowerCase().includes(kataKunciCari);
    });

    if (hasilSaring.length === 0) {
        wadahList.innerHTML = `<p>Belum ada data yang tersimpan.</p>`;
        return;
    }

    wadahList.innerHTML = hasilSaring.map(item => `
        <div class="item-card">
            <span>${item.nama} (Jumlah: ${item.qty})</span>
            <button onclick="hapusData(${item.id})">Hapus</button>
        </div>
    `).join('');
}

// ============================================
// 5. LOCAL STORAGE (MENYIMPAN DATA)
// ============================================
function simpanKeBrowser() {
    localStorage.setItem('dataProyek', JSON.stringify(database));
}

function muatDataDariBrowser() {
    const dataLokal = localStorage.getItem('dataProyek');
    if (dataLokal) {
        database = JSON.parse(dataLokal);
        // Sesuaikan ID agar tidak bentrok
        if(database.length > 0) {
            idBerikutnya = Math.max(...database.map(item => item.id)) + 1;
        }
    }
}

// ============================================
// 6. EVENT LISTENERS & INISIALISASI APLIKASI
// ============================================
formulir.addEventListener('submit', (e) => {
    e.preventDefault();
    const namaInput = document.getElementById('inputNama').value;
    const qtyInput = parseInt(document.getElementById('inputQty').value);
    
    tambahData(namaInput, qtyInput);
    formulir.reset();
});

textCari.addEventListener('input', (e) => {
    kataKunciCari = e.target.value.toLowerCase();
    renderTampilan();
});

// Jalankan saat halaman dibuka pertama kali
muatDataDariBrowser();
renderTampilan();
```

---

## 📚 Daftar Referensi Belajar Mandiri

Jika kalian menemukan kesulitan saat ngoding proyek akhir, silakan cari solusinya di dokumentasi resmi atau video tutorial berikut:

### Buku Rekomendasi:
- *Eloquent JavaScript* (Marijn Haverbeke) - Sangat detail membedah logika JS. (Tersedia gratis di [eloquentjavascript.net](https://eloquentjavascript.net)).
- *JavaScript: The Definitive Guide* (David Flanagan) - Kitab suci terlengkap untuk JavaScript.

### Sumber Online Terbaik:
- **MDN Web Docs (developer.mozilla.org):** Dokumentasi paling valid untuk mengecek fungsi-fungsi bawaan JavaScript.
- **JavaScript.info:** Panduan belajar JavaScript modern dari dasar dengan penjelasan yang sangat ramah pemula.

### Forum Bantuan & Komunitas:
- **Stack Overflow (stackoverflow.com):** Tempat bertanya jika kode kalian mentok mengeluarkan error yang tidak dipahami.
- **GitHub (github.com):** Cari inspirasi struktur proyek dan kelola kode kalian secara kolaboratif.

---

Saya ucapkan **Selamat Pengerjaan Proyek Akhir!** Saya yakin kalian semua bisa membuat karya yang luar biasa dan membanggakan. Teruslah berkarya, jangan takut mencoba hal baru, dan selamat berkembang menjadi *Web Developer* yang hebat! 🚀🎓
