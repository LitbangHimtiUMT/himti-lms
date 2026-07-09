# MODUL 4: Array dan Object

Halo rekan-rekan mahasiswa sekalian! Senang sekali bisa berjumpa lagi di Modul 4. 

Kemarin kita sudah bisa menyimpan satu nilai dalam variabel dan mengaturnya menggunakan fungsi serta perulangan. Tapi, bagaimana kalau kalian diminta menyimpan data mahasiswa satu kelas? Masa iya harus bikin variabel `namaMhs1`, `namaMhs2`, `namaMhs3`, sampai `namaMhs40`? Capek banget, kan!

Nah, hari ini kita akan mempelajari solusinya: **Array** dan **Object**. Dua struktur data ini adalah kunci utama untuk mengelola banyak data secara rapi dan terstruktur di JavaScript. Mari kita bedah bersama dengan santai dan mudah!

---

## 🎯 Apa Saja yang Akan Kita Capai Hari Ini?

Setelah menyelesaikan modul ini, kalian diharapkan mampu:
1. Membuat dan memanipulasi `Array` (menambah, membaca, mengubah, dan menghapus elemen).
2. Membuat serta mengelola `Object` yang memiliki properti dan metode (*method*).
3. Mengakses elemen array menggunakan nomor laci (*index*).
4. Melakukan penjelajahan (*looping*) pada array menggunakan cara modern.
5. Mengenal metode transformasi array yang sangat berguna seperti `forEach()`, `map()`, dan `filter()`.
6. **Goal Akhir:** Membangun aplikasi manajemen mahasiswa sederhana yang lengkap dengan fungsi penambahan, pencarian, pengurutan, dan statistika nilai!

---

## 📚 Pembahasan Materi

### 4.1 Array (Kumpulan Data Terurut)

Bayangkan **Array** itu seperti lemari laci yang panjang. Setiap laci ada nomornya, dimulai dari nomor **`0`** (bukan 1 ya!). Di dalam laci-laci ini kita bisa menyimpan data apa saja.

#### Cara Membuat Array:
```javascript
// Menggunakan tanda kurung siku [] (Cara Literal - Paling sering dipakai ⭐)
const buah = ["Apel", "Pisang", "Jeruk"];
const angka = [10, 20, 30, 40];
const campur = ["Dosen", 2026, true, null]; // Boleh beda-beda tipe data!
```

#### Cara Mengakses dan Mengubah Elemen Array:
Ingat ya, laci pertama dimulai dari indeks `0`.
```javascript
const buah = ["Apel", "Pisang", "Jeruk"];

console.log(buah[0]); // Output: "Apel"
console.log(buah[1]); // Output: "Pisang"

// Mengubah isi laci nomor 1
buah[1] = "Stroberi";
console.log(buah);    // Output: ["Apel", "Stroberi", "Jeruk"]

// Cara tahu berapa banyak isi laci
console.log(buah.length); // Output: 3
```

---

### 4.2 Operasi CRUD pada Array

Dalam pemrograman, kita pasti akan sering melakukan **CRUD** (Create, Read, Update, Delete) pada data kita. Berikut jurus-jurusnya di JavaScript:

#### 1. Create (Menambah Data)
- **`push()`**: Menambahkan data di bagian **paling akhir**.
- **`unshift()`**: Menambahkan data di bagian **paling awal**.
- **`splice()`**: Menyelipkan data di posisi indeks mana saja yang kita inginkan.

```javascript
const nomor = [2, 3];

nomor.push(4);      // nomor menjadi [2, 3, 4]
nomor.unshift(1);   // nomor menjadi [1, 2, 3, 4]
nomor.splice(1, 0, 1.5); // Mulai dari indeks 1, hapus 0 data, masukkan 1.5. Hasil: [1, 1.5, 2, 3, 4]
```

#### 2. Read (Membaca Data)
- Menggunakan indeks: `nomor[0]`.
- **`includes()`**: Mengecek apakah suatu nilai ada di dalam array (menghasilkan `true`/`false`).
- **`indexOf()`**: Mencari posisi indeks suatu nilai (mengembalikan `-1` jika data tidak ditemukan).

```javascript
const nama = ["Budi", "Andi"];
console.log(nama.includes("Budi")); // Output: true
console.log(nama.indexOf("Andi"));   // Output: 1
```

#### 3. Update (Mengubah Data)
Langsung sebutkan nomor indeksnya atau gunakan `splice()`.
```javascript
const data = ["A", "B", "C"];
data[1] = "Z"; // data jadi ["A", "Z", "C"]
```

#### 4. Delete (Menghapus Data)
- **`pop()`**: Membuang data **paling akhir**.
- **`shift()`**: Membuang data **paling awal**.
- **`splice()`**: Membuang data di indeks tertentu.

```javascript
const list = ["Apel", "Pisang", "Jeruk"];
list.pop(); // Membuang "Jeruk". List menjadi ["Apel", "Pisang"]
list.splice(0, 1); // Mulai dari indeks 0, hapus 1 data. List menjadi ["Pisang"]
```

---

### 4.3 Object (Kumpulan Data Berdasarkan Label)

Jika Array menggunakan nomor laci (`0`, `1`, `2`), maka **Object** menggunakan label nama (*key-value pair*). Ini sangat cocok untuk memodelkan benda nyata, misalnya Mahasiswa.

#### Cara Membuat Object:
```javascript
const mahasiswa = {
    nama: "Budi Santoso",
    nim: "123456",
    jurusan: "Informatika",
    umur: 20,
    isActive: true
};
```

#### Cara Mengakses Properti di Object:
Ada dua cara yang bisa kita pakai:
1. **Dot Notation** (Menggunakan tanda titik `.`) -> Paling umum.
2. **Bracket Notation** (Menggunakan tanda kurung siku `[]`) -> Dipakai kalau nama labelnya dinamis atau berupa variabel.

```javascript
console.log(mahasiswa.nama);      // Output: "Budi Santoso"
console.log(mahasiswa["jurusan"]); // Output: "Informatika"
```

#### Menambah, Mengubah, dan Menghapus Properti:
```javascript
mahasiswa.ipk = 3.85; // Menambah properti baru
mahasiswa.umur = 21;  // Mengubah properti yang sudah ada
delete mahasiswa.isActive; // Menghapus properti
```

---

### 4.4 Object Method (Fungsi di dalam Object)

Sebuah object tidak hanya bisa menyimpan data (seperti nama, umur), tapi juga bisa melakukan tindakan (*action*). Fungsi yang ditaruh di dalam object ini disebut **Method**.

```javascript
const mahasiswa = {
    nama: "Budi",
    umur: 20,
    
    // Ini dinamakan Method
    sapaDosen() {
        // Kata kunci 'this' mengacu pada object mahasiswa itu sendiri
        return `Selamat pagi Pak, nama saya ${this.nama}`;
    }
};

console.log(mahasiswa.sapaDosen()); // Output: Selamat pagi Pak, nama saya Budi
```

---

### 4.5 Metode Modern Menjelajahi Array (Array Iteration)

Selain menggunakan loop `for` biasa, JavaScript menyediakan metode modern yang lebih bersih dan efisien:

**1. `forEach()`**
Hanya untuk keliling/mengiterasi setiap isi laci tanpa menghasilkan nilai baru.
```javascript
const buah = ["Apel", "Pisang"];
buah.forEach((item, index) => {
    console.log(`Buah ke-${index + 1} adalah ${item}`);
});
```

**2. `map()` (Sangat Populer ⭐)**
Dipakai untuk menjelajahi isi array, memprosesnya, lalu **menghasilkan array baru** dengan ukuran yang sama.
```javascript
const angka = [1, 2, 3];
const kuadrat = angka.map(n => n * n);
console.log(kuadrat); // Output: [1, 4, 9] (Array baru!)
```

**3. `filter()`**
Menyaring elemen array berdasarkan kondisi tertentu dan menghasilkan array baru.
```javascript
const nilai = [50, 80, 45, 90, 75];
const nilaiLulus = nilai.filter(n => n >= 60);
console.log(nilaiLulus); // Output: [80, 90, 75]
```

**4. `reduce()`**
Menggabungkan semua elemen array menjadi satu nilai tunggal (misalnya menjumlahkan total harga belanja).
```javascript
const koin = [1, 2, 3, 4];
const total = koin.reduce((jumlah, koinSekarang) => jumlah + koinSekarang, 0);
console.log(total); // Output: 10
```

---

## 🛠️ Panduan Praktik Terbimbing

Saya ingin kalian mencoba latihan di bawah ini untuk melihat bagaimana Array dan Object dipadukan (*Array of Objects*).

### Praktik: Array of Objects
Buat file `array-object-practice.js` di VSCode dan ketik baris kode berikut:

```javascript
// Kumpulan data mahasiswa (Array of Objects)
const mahasiswaList = [
    { nama: "Budi", nilai: 85, jurusan: "Informatika" },
    { nama: "Andi", nilai: 72, jurusan: "Sistem Informasi" },
    { nama: "Siti", nilai: 90, jurusan: "Informatika" },
    { nama: "Dewi", nilai: 55, jurusan: "Sistem Informasi" }
];

// 1. Tampilkan semua nama mahasiswa menggunakan forEach
console.log("=== Daftar Nama Mahasiswa ===");
mahasiswaList.forEach(mhs => console.log(mhs.nama));

// 2. Filter mahasiswa yang mendapatkan nilai >= 75 (Lulus)
const lulus = mahasiswaList.filter(mhs => mhs.nilai >= 75);
console.log("\n=== Mahasiswa Lulus ===");
console.log(lulus);

// 3. Hitung rata-rata nilai mahasiswa menggunakan reduce
const totalNilai = mahasiswaList.reduce((sum, mhs) => sum + mhs.nilai, 0);
const rataRata = totalNilai / mahasiswaList.length;
console.log(`\nRata-rata Nilai Kelas: ${rataRata}`);
```

---

## 🚀 Mini Project: Student Management App

Sekarang mari kita buat aplikasi web untuk mengelola daftar mahasiswa secara dinamis!

### Struktur Proyek:
```text
student-management/
├── index.html
├── style.css
└── script.js
```

#### 1. File `index.html`
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Management App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>📚 Student Management</h1>
        
        <!-- Form Input -->
        <div class="form-container">
            <h2>Tambah Data Mahasiswa</h2>
            <input type="text" id="nama" placeholder="Nama Lengkap Mahasiswa">
            <input type="text" id="jurusan" placeholder="Jurusan">
            <input type="number" id="nilai" placeholder="Nilai (0-100)">
            <button onclick="tambahMahasiswa()">Tambah Data</button>
        </div>
        
        <!-- Kontrol Pencarian & Pengurutan -->
        <div class="controls">
            <input type="text" id="search" placeholder="Cari berdasarkan nama/jurusan..." oninput="renderMahasiswa()">
            <select id="sortBy" onchange="renderMahasiswa()">
                <option value="nama">Urutkan Berdasarkan Nama</option>
                <option value="nilai">Urutkan Berdasarkan Nilai Tertinggi</option>
                <option value="id">Urutkan Berdasarkan ID</option>
            </select>
        </div>
        
        <!-- Daftar Mahasiswa -->
        <div id="mahasiswaList"></div>
        
        <!-- Statistik Hasil Belajar -->
        <div id="statistik"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

#### 2. File `script.js`
```javascript
let mahasiswaList = [];
let nextId = 1;

// 1. Fungsi Tambah Mahasiswa
function tambahMahasiswa() {
    const nama = document.getElementById('nama').value.trim();
    const jurusan = document.getElementById('jurusan').value.trim();
    const nilai = parseInt(document.getElementById('nilai').value);
    
    // Validasi input
    if (!nama || !jurusan || isNaN(nilai) || nilai < 0 || nilai > 100) {
        alert('Mohon isi semua data dengan benar ya! Nilai harus antara 0-100.');
        return;
    }
    
    // Bungkus data ke dalam Object
    const mahasiswa = {
        id: `M${String(nextId++).padStart(3, '0')}`,
        nama: nama,
        jurusan: jurusan,
        nilai: nilai
    };
    
    // Masukkan ke Array list utama
    mahasiswaList.push(mahasiswa);
    renderMahasiswa();
    
    // Reset Form input
    document.getElementById('nama').value = '';
    document.getElementById('jurusan').value = '';
    document.getElementById('nilai').value = '';
}

// 2. Fungsi Hapus Mahasiswa
function hapusMahasiswa(id) {
    if (confirm('Apakah kalian yakin ingin menghapus data mahasiswa ini?')) {
        mahasiswaList = mahasiswaList.filter(mhs => mhs.id !== id);
        renderMahasiswa();
    }
}

// 3. Fungsi Edit Mahasiswa
function editMahasiswa(id) {
    const mahasiswa = mahasiswaList.find(mhs => mhs.id === id);
    if (!mahasiswa) return;
    
    const namaBaru = prompt('Nama baru:', mahasiswa.nama);
    if (namaBaru !== null) mahasiswa.nama = namaBaru.trim();
    
    const jurusanBaru = prompt('Jurusan baru:', mahasiswa.jurusan);
    if (jurusanBaru !== null) mahasiswa.jurusan = jurusanBaru.trim();
    
    const nilaiBaru = prompt('Nilai baru (0-100):', mahasiswa.nilai);
    if (nilaiBaru !== null) {
        const nilai = parseInt(nilaiBaru);
        if (!isNaN(nilai) && nilai >= 0 && nilai <= 100) {
            mahasiswa.nilai = nilai;
        } else {
            alert('Nilai tidak valid! Nilai harus antara 0-100.');
        }
    }
    
    renderMahasiswa();
}

// 4. Fungsi Menggambar / Tampilkan Data Ke HTML
function renderMahasiswa() {
    const search = document.getElementById('search').value.toLowerCase();
    const sortBy = document.getElementById('sortBy').value;
    
    // Langkah 1: Saring data berdasarkan pencarian (Filter)
    let filtered = mahasiswaList.filter(mhs => 
        mhs.nama.toLowerCase().includes(search) ||
        mhs.jurusan.toLowerCase().includes(search) ||
        mhs.id.toLowerCase().includes(search)
    );
    
    // Langkah 2: Urutkan data (Sort)
    filtered.sort((a, b) => {
        if (sortBy === 'nama') return a.nama.localeCompare(b.nama);
        if (sortBy === 'nilai') return b.nilai - a.nilai; // Descending (tertinggi dulu)
        if (sortBy === 'id') return a.id.localeCompare(b.id);
        return 0;
    });
    
    // Langkah 3: Render ke tabel HTML
    const container = document.getElementById('mahasiswaList');
    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#9ca3af;">Tidak ada data mahasiswa.</p>';
    } else {
        let html = '<table><thead><tr><th>ID</th><th>Nama</th><th>Jurusan</th><th>Nilai</th><th>Grade</th><th>Aksi</th></tr></thead><tbody>';
        filtered.forEach(mhs => {
            const grade = mhs.nilai >= 85 ? 'A' :
                          mhs.nilai >= 75 ? 'B' :
                          mhs.nilai >= 65 ? 'C' :
                          mhs.nilai >= 50 ? 'D' : 'E';
            html += `
                <tr>
                    <td>${mhs.id}</td>
                    <td><strong>${mhs.nama}</strong></td>
                    <td>${mhs.jurusan}</td>
                    <td>${mhs.nilai}</td>
                    <td><span class="grade-badge grade-${grade}">${grade}</span></td>
                    <td>
                        <button onclick="editMahasiswa('${mhs.id}')" class="btn-edit">✏️</button>
                        <button onclick="hapusMahasiswa('${mhs.id}')" class="btn-delete">🗑️</button>
                    </td>
                </tr>
            `;
        });
        html += '</tbody></table>';
        container.innerHTML = html;
    }
    
    // Update data statistik
    renderStatistik(filtered);
}

// 5. Fungsi Penghitung Statistik Nilai
function renderStatistik(filtered) {
    const statsDiv = document.getElementById('statistik');
    if (filtered.length === 0) {
        statsDiv.innerHTML = '';
        return;
    }
    
    const total = filtered.reduce((sum, mhs) => sum + mhs.nilai, 0);
    const rata = total / filtered.length;
    const max = Math.max(...filtered.map(mhs => mhs.nilai));
    const min = Math.min(...filtered.map(mhs => mhs.nilai));
    const lulus = filtered.filter(mhs => mhs.nilai >= 60).length;
    
    statsDiv.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">📊 <span>Total</span> <strong>${filtered.length}</strong></div>
            <div class="stat-card">📈 <span>Rata-rata</span> <strong>${rata.toFixed(2)}</strong></div>
            <div class="stat-card">🏆 <span>Tertinggi</span> <strong>${max}</strong></div>
            <div class="stat-card">📉 <span>Terendah</span> <strong>${min}</strong></div>
            <div class="stat-card">✅ <span>Lulus (>=60)</span> <strong>${lulus}</strong></div>
        </div>
    `;
}
```

#### 3. File `style.css`
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    min-height: 100vh;
    padding: 40px 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: #1e293b;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    border: 1px solid #334155;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #38bdf8;
}

.form-container {
    background: #0f172a;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 30px;
    border: 1px solid #334155;
}

.form-container h2 {
    font-size: 18px;
    margin-bottom: 15px;
    color: #f8fafc;
}

.form-container input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background: #1e293b;
    border: 1px solid #475569;
    border-radius: 8px;
    color: white;
}

.form-container button {
    width: 100%;
    padding: 12px;
    background: #38bdf8;
    color: #0f172a;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}

.form-container button:hover {
    background: #0ea5e9;
}

.controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.controls input {
    flex: 2;
    padding: 10px;
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    color: white;
}

.controls select {
    flex: 1;
    padding: 10px;
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    color: white;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
}

th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #334155;
}

th {
    background: #0f172a;
    color: #38bdf8;
}

tr:hover {
    background: #1e293b;
}

button.btn-edit, button.btn-delete {
    padding: 6px 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 5px;
}

button.btn-edit { background: #eab308; color: black; }
button.btn-delete { background: #ef4444; color: white; }

.grade-badge {
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: bold;
}
.grade-A { background: #22c55e; color: black; }
.grade-B { background: #3b82f6; color: white; }
.grade-C { background: #eab308; color: black; }
.grade-D { background: #f97316; color: white; }
.grade-E { background: #ef4444; color: white; }

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 15px;
}

.stat-card {
    background: #0f172a;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    border: 1px solid #334155;
}

.stat-card span {
    display: block;
    font-size: 12px;
    color: #94a3b8;
    margin-top: 5px;
}

.stat-card strong {
    font-size: 20px;
    color: #38bdf8;
}
```

---

## 📝 Evaluasi Pemahaman

Saya siapkan beberapa kuis pendek untuk menguji pengetahuan kalian:
1. Apa perbedaan cara pemanggilan elemen di dalam Array dibanding dengan properti di dalam Object?
2. Apa perbedaan hasil akhir dari metode `.forEach()` dan `.map()` ketika mengolah isi array?
3. Sebutkan cara mendeteksi apakah suatu nilai ada di dalam array tanpa perlu menulis loop secara manual!

Bagaimana? Makin seru kan belajar JavaScript? Kita sekarang sudah bisa mengelola data kompleks secara terstruktur di memori komputer. 

Di pertemuan selanjutnya (**Modul 5**), kita akan belajar bagaimana cara menyambungkan data JavaScript kita ini ke elemen visual halaman web secara langsung agar halaman kita bisa berubah dinamis ketika diklik atau diketik menggunakan **DOM Manipulation**! Sampai jumpa di kelas berikutnya! 🎓
