# MODUL 5: DOM dan Event

Halo semuanya! Jumpa lagi dengan Saya di Modul 5. 

Pada modul-modul sebelumnya, kita sudah belajar banyak tentang logika Javascript di balik layar. Namun, kalau kita cuma melihat hasilnya lewat *console log* terus, bosan juga kan? Nah, di modul inilah keajaiban yang sesungguhnya dimulai!

Kita akan belajar tentang **DOM (Document Object Model)** dan **Event**. Dengan dua konsep ini, kalian bisa menghubungkan kode Javascript kalian ke halaman HTML, sehingga ketika tombol diklik, warna berubah, atau ada tulisan baru yang muncul di layar, semuanya bisa dikendalikan secara dinamis. Menarik sekali, kan? Mari kita pelajari bersama!

---

## 🎯 Apa Saja yang Akan Kita Pelajari Hari Ini?

Setelah menyelesaikan modul ini, kalian diharapkan mampu:
1. Memahami konsep dasar DOM (Document Object Model).
2. Memilih elemen HTML menggunakan `querySelector()` dan `querySelectorAll()`.
3. Mengubah tulisan dan struktur halaman web menggunakan `textContent` dan `innerHTML`.
4. Mengambil atau mengisi data form menggunakan properti `value`.
5. Mengatur tampilan CSS secara langsung dengan `.style` dan `.classList`.
6. Menangani aksi pengguna (klik, ketik, dsb.) menggunakan `addEventListener()`.
7. Memahami konsep *callback function* dan pengelolaan data aplikasi (*state*).
8. **Goal Akhir:** Membangun aplikasi pendaftaran mahasiswa baru (HIMTI Registration App) yang interaktif dengan fitur Dark Mode!

---

## 📚 Pembahasan Materi

### 5.1 Apa itu DOM?

Secara sederhana, **DOM (Document Object Model)** adalah cara browser menerjemahkan dokumen HTML menjadi struktur "pohon keluarga" (*tree structure*) yang dipahami oleh JavaScript. 

Perhatikan struktur pohon DOM di bawah ini:

```text
Document (Dokumen Web)
  └── html
       ├── head (Kepala)
       │    ├── title
       │    └── meta
       └── body (Badan)
            ├── header
            ├── main
            │    ├── h1 (Judul)
            │    ├── p (Paragraf)
            │    └── div (Kotak)
            └── footer
```

Dengan adanya DOM, JavaScript bisa "memanjat" pohon ini untuk mencari tombol, mengubah teks paragraf, menyembunyikan kotak, atau bahkan membuat elemen baru dari nol!

---

### 5.2 Jurus Memilih Elemen: `querySelector()`

Sebelum kita memodifikasi elemen HTML, kita harus memilih atau "menangkap" elemen tersebut terlebih dahulu. Cara paling modern dan direkomendasikan adalah menggunakan `querySelector()`. Cara menulis pemilihnya persis seperti CSS Selector.

```javascript
// Menangkap elemen berdasarkan Tag
const judul = document.querySelector('h1');

// Menangkap elemen berdasarkan Class (.)
const header = document.querySelector('.header-utama');

// Menangkap elemen berdasarkan ID (#)
const tombolDaftar = document.querySelector('#btn-daftar');

// Menangkap input bertipe text
const inputNama = document.querySelector('input[type="text"]');
```

> **Peringatan Dosen:** `querySelector()` hanya akan mengembalikan **satu elemen pertama** yang cocok. Jika elemen yang dicari tidak ada di halaman web, dia akan menghasilkan nilai `null`.

---

### 5.3 Menangkap Banyak Elemen sekaligus: `querySelectorAll()`

Kalau kalian ingin menangkap seluruh elemen yang memiliki kelas yang sama, gunakan `querySelectorAll()`. Method ini akan mengembalikan sekumpulan elemen yang disebut `NodeList` (kalian bisa membayangkannya mirip seperti Array).

```javascript
// Menangkap seluruh elemen paragraf di halaman
const semuaParagraf = document.querySelectorAll('p');

// Kita bisa jelajahi isinya satu-satu menggunakan forEach!
semuaParagraf.forEach(paragraf => {
    console.log(paragraf.textContent);
});
```

---

### 5.4 Mengubah Isi Teks dengan `textContent`

Setelah elemen tertangkap, kita bisa mengganti isinya dengan sangat mudah menggunakan properti `textContent`.

```javascript
const judul = document.querySelector('h1');
judul.textContent = "Selamat Datang di HIMTI UMT!"; // Mengubah isi tulisan h1
```

---

### 5.5 Mengubah HTML dengan `innerHTML`

Jika kalian ingin memasukkan teks beserta tag HTML baru (misalnya ingin membuat link atau cetak tebal), kalian bisa menggunakan `innerHTML`.

```javascript
const kotakPesan = document.querySelector('.pesan');
kotakPesan.innerHTML = 'Selamat! Kamu dinyatakan <strong>LULUS</strong> seleksi.';
```

> **Catatan Keamanan Penting dari Dosen (Security Alert! ⚠️):**
> Hati-hati menggunakan `innerHTML` jika datanya berasal dari ketikan *user* langsung. Mengapa? Karena bisa disusupi script berbahaya (*Cross-Site Scripting / XSS*). Jika hanya ingin mengubah teks biasa tanpa tag HTML, gunakanlah `textContent` karena jauh lebih aman!

---

### 5.6 Mengambil Data Input dengan `value`

Untuk elemen form seperti `<input>`, `<select>`, atau `<textarea>`, kita mengambil apa yang diketik atau dipilih oleh *user* menggunakan properti `value`.

```javascript
const inputNama = document.querySelector('#nama');
console.log(inputNama.value); // Mengambil teks yang sedang diketik user

// Kita juga bisa mengisi nilainya lewat JS
inputNama.value = "Nama Baru";
```

---

### 5.7 Memanipulasi CSS lewat `.style` dan `.classList`

Bagaimana cara mengubah gaya atau tampilan web menggunakan JavaScript? Ada dua metode utama:

**1. Menggunakan `.style` (Inline CSS)**
Metode ini mengubah CSS inline secara langsung.
```javascript
const kotak = document.querySelector('.box');
kotak.style.backgroundColor = 'blue'; // Penulisan camelCase (bukan background-color)
kotak.style.color = 'white';
kotak.style.borderRadius = '8px';
```

**2. Menggunakan `.classList` (Sangat Direkomendasikan ⭐)**
Metode ini jauh lebih rapi. Kita definisikan dulu kelasnya di file CSS, lalu tinggal tambah atau hapus kelas tersebut via JavaScript.
```javascript
const kotak = document.querySelector('.box');

kotak.classList.add('aktif');     // Menambahkan class 'aktif'
kotak.classList.remove('nonaktif'); // Menghapus class 'nonaktif'
kotak.classList.toggle('highlight'); // Tambah jika belum ada, hapus jika sudah ada!
```

---

### 5.8 Merespon Aksi User dengan `addEventListener()`

Agar web kita interaktif, dia harus bisa merespon aksi dari pengguna (seperti klik tombol, ketik tombol keyboard, dll.). Caranya adalah dengan memasangkan **Event Listener**.

```javascript
const tombol = document.querySelector('#my-button');

// Format: element.addEventListener('nama_event', fungsi_callback)
tombol.addEventListener('click', () => {
    alert('Tombol berhasil diklik!');
});
```

Beberapa event yang sering digunakan:
- `'click'`: Ketika elemen diklik.
- `'input'`: Ketika nilai di dalam input text berubah (langsung merespon saat diketik).
- `'change'`: Ketika nilai elemen berubah dan user pindah fokus (misal pada dropdown select).
- `'submit'`: Ketika form dikirimkan.

---

### 5.9 Mengenal Konsep State Sederhana

Dalam membuat aplikasi interaktif, kalian akan sering menyimpan data aplikasi dalam variabel. Data inilah yang disebut **State**. Perubahan pada *state* ini harus langsung memperbarui tampilan (UI) kita.

```javascript
// 1. State data aplikasi kita
let jumlahPengunjung = 0;

// 2. DOM Elemen
const layarAngka = document.querySelector('#counter');
const tombolTambah = document.querySelector('#btn-tambah');

// 3. Event Listener
tombolTambah.addEventListener('click', () => {
    jumlahPengunjung++; // Update data / state
    layarAngka.textContent = jumlahPengunjung; // Update visual di layar
});
```

---

## 🛠️ Panduan Praktik Terbimbing

Mari kita buat percobaan sederhana di komputer masing-masing.

### Praktik: Live Text Preview & Toggle Box
Buat file `index.html` dan isi kode berikut:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Latihan DOM dan Event</title>
    <style>
        .box { width: 100px; height: 100px; background: blue; transition: 0.3s; }
        .box.merah { background: red; }
    </style>
</head>
<body>
    <h1>Latihan Live Preview</h1>
    <input type="text" id="ketik" placeholder="Ketik sesuatu di sini...">
    <h3 id="preview">Preview ketikan kalian akan muncul di sini</h3>
    
    <hr>
    
    <div class="box" id="kotakToko"></div>
    <button id="btnToggle">Ganti Warna Kotak</button>

    <script>
        // 1. Logika Live Preview
        const input = document.getElementById('ketik');
        const preview = document.getElementById('preview');
        
        input.addEventListener('input', (e) => {
            preview.textContent = e.target.value || "Tulis sesuatu...";
        });

        // 2. Logika Ganti Warna Kotak
        const kotak = document.getElementById('kotakToko');
        const tombol = document.getElementById('btnToggle');
        
        tombol.addEventListener('click', () => {
            kotak.classList.toggle('merah');
        });
    </script>
</body>
</html>
```

---

## 🚀 Mini Project: HIMTI Registration App dengan Dark Mode

Sekarang, mari kita buat aplikasi pendaftaran mahasiswa baru HIMTI yang keren dengan validasi *real-time* dan fitur *Dark Mode*!

### Struktur Proyek:
```text
himti-registration/
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
    <title>HIMTI Registration App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app">
        <header>
            <h1>📋 HIMTI Registration</h1>
            <button id="toggleTheme" class="theme-btn">🌙</button>
        </header>
        
        <main class="main-content">
            <!-- Kolom Form Kiri -->
            <section class="form-section">
                <h2>Formulir Pendaftaran</h2>
                <form id="registrationForm">
                    <div class="form-group">
                        <label for="nama">Nama Lengkap</label>
                        <input type="text" id="nama" placeholder="Contoh: Budi Santoso" required>
                        <div class="error-msg" id="namaError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="nim">NIM (10 Digit)</label>
                        <input type="text" id="nim" placeholder="Contoh: 2255201123" required>
                        <div class="error-msg" id="nimError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Contoh: budi@gmail.com" required>
                        <div class="error-msg" id="emailError"></div>
                    </div>
                    
                    <div class="form-group">
                        <label for="jurusan">Jurusan</label>
                        <select id="jurusan" required>
                            <option value="">Pilih Jurusan</option>
                            <option value="Informatika">Teknik Informatika</option>
                            <option value="Sistem Informasi">Sistem Informasi</option>
                        </select>
                        <div class="error-msg" id="jurusanError"></div>
                    </div>
                    
                    <button type="submit" class="submit-btn">Daftar Sekarang</button>
                </form>
            </section>
            
            <!-- Kolom Hasil Kanan -->
            <section class="list-section">
                <h2>Daftar Mahasiswa Terdaftar</h2>
                <div id="emptyState" class="empty-state">Belum ada mahasiswa yang mendaftar.</div>
                <div id="studentList" class="student-cards-container"></div>
            </section>
        </main>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

#### 2. File `script.js`
```javascript
// 1. Data Aplikasi (State)
let students = [];
let isDarkMode = false;

// 2. Menangkap DOM Elements
const form = document.getElementById('registrationForm');
const studentList = document.getElementById('studentList');
const emptyState = document.getElementById('emptyState');
const toggleThemeBtn = document.getElementById('toggleTheme');

// 3. Fungsi Validasi Input secara Real-time
function validateField(inputEl, errorEl, checkFn, message) {
    if (!checkFn(inputEl.value.trim())) {
        errorEl.textContent = message;
        inputEl.classList.add('invalid');
        return false;
    } else {
        errorEl.textContent = '';
        inputEl.classList.remove('invalid');
        return true;
    }
}

// 4. Validasi Menyeluruh sebelum Form dikirim
function isFormValid() {
    let valid = true;
    
    valid &= validateField(
        document.getElementById('nama'),
        document.getElementById('namaError'),
        val => val.length >= 3,
        'Nama minimal harus 3 karakter ya!'
    );
    
    valid &= validateField(
        document.getElementById('nim'),
        document.getElementById('nimError'),
        val => /^\d{10}$/.test(val),
        'NIM harus berupa 10 digit angka!'
    );
    
    valid &= validateField(
        document.getElementById('email'),
        document.getElementById('emailError'),
        val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        'Tolong masukkan alamat email yang valid!'
    );
    
    valid &= validateField(
        document.getElementById('jurusan'),
        document.getElementById('jurusanError'),
        val => val !== '',
        'Silakan pilih jurusan kalian!'
    );
    
    return valid;
}

// 5. Menambahkan Data Mahasiswa Baru
function addStudent(nama, nim, email, jurusan) {
    const newStudent = {
        id: Date.now(),
        nama,
        nim,
        email,
        jurusan,
        waktuDaftar: new Date().toLocaleTimeString()
    };
    
    students.push(newStudent);
    renderStudents();
}

// 6. Menghapus Data Mahasiswa
function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    renderStudents();
}

// 7. Render (Menampilkan) Daftar Mahasiswa ke Layar
function renderStudents() {
    if (students.length === 0) {
        studentList.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    studentList.innerHTML = students.map(student => `
        <div class="student-card">
            <div class="student-info">
                <h3>${student.nama}</h3>
                <p>NIM: ${student.nim}</p>
                <p>Email: ${student.email}</p>
                <p>Jurusan: ${student.jurusan}</p>
                <span class="time-stamp">Daftar pada: ${student.waktuDaftar}</span>
            </div>
            <button onclick="deleteStudent(${student.id})" class="btn-delete-card">Hapus</button>
        </div>
    `).join('');
}

// 8. Event Listener Form Submit
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah halaman refresh otomatis
    
    if (isFormValid()) {
        const nama = document.getElementById('nama').value;
        const nim = document.getElementById('nim').value;
        const email = document.getElementById('email').value;
        const jurusan = document.getElementById('jurusan').value;
        
        addStudent(nama, nim, email, jurusan);
        form.reset(); // Kosongkan form kembali
    }
});

// 9. Logika Mengganti Tema (Dark/Light Mode)
toggleThemeBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    toggleThemeBtn.textContent = isDarkMode ? '☀️' : '🌙';
});
```

#### 3. File `style.css`
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: background 0.3s, color 0.3s;
}

body {
    font-family: 'Segoe UI', sans-serif;
    background: #f1f5f9;
    color: #1e293b;
    padding: 30px 15px;
}

body.dark-mode {
    background: #0f172a;
    color: #f1f5f9;
}

.app {
    max-width: 900px;
    margin: 0 auto;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    border-bottom: 2px solid #cbd5e1;
    padding-bottom: 15px;
}

body.dark-mode header {
    border-bottom-color: #334155;
}

.theme-btn {
    padding: 8px 15px;
    font-size: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
}

.main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

@media(max-width: 768px) {
    .main-content {
        grid-template-columns: 1fr;
    }
}

.form-section, .list-section {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

body.dark-mode .form-section,
body.dark-mode .list-section {
    background: #1e293b;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

h2 {
    margin-bottom: 20px;
    font-size: 20px;
    color: #4f46e5;
}

body.dark-mode h2 {
    color: #38bdf8;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
}

input, select {
    width: 100%;
    padding: 10px;
    border: 2px solid #cbd5e1;
    border-radius: 8px;
    font-size: 15px;
}

body.dark-mode input,
body.dark-mode select {
    background: #0f172a;
    border-color: #334155;
    color: white;
}

input.invalid {
    border-color: #ef4444;
}

.error-msg {
    color: #ef4444;
    font-size: 12px;
    margin-top: 5px;
}

.submit-btn {
    width: 100%;
    padding: 12px;
    background: #4f46e5;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.submit-btn:hover {
    background: #4338ca;
}

.empty-state {
    color: #64748b;
    text-align: center;
    margin-top: 40px;
}

.student-card {
    background: #f8fafc;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
    border: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

body.dark-mode .student-card {
    background: #0f172a;
    border-color: #334155;
}

.student-info h3 {
    margin-bottom: 5px;
    font-size: 16px;
}

.student-info p {
    font-size: 13px;
    color: #64748b;
}

.time-stamp {
    font-size: 11px;
    color: #94a3b8;
}

.btn-delete-card {
    background: #ef4444;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
}

.btn-delete-card:hover {
    background: #dc2626;
}
```

---

## 📝 Evaluasi Pemahaman

Silakan coba asah pemahaman kalian dengan menjawab beberapa kuis ini:
1. Apa fungsi dari parameter `e` pada callback `addEventListener('click', (e) => {})`?
2. Mengapa merubah style dengan classList lebih direkomendasikan dibandingkan dengan `.style` secara langsung?
3. Sebutkan perbedaan utama antara properti `textContent` dan `innerHTML`!

Hebat sekali! Kalian sudah melangkah sangat jauh. Sekarang halaman web kalian tidak kaku lagi dan bisa menanggapi kemauan pengguna. 

Di pertemuan berikutnya (**Modul 6**), kita akan belajar manipulasi DOM tingkat lanjut seperti membuat elemen secara dinamis lewat kode JavaScript dan menyimpannya ke memori lokal browser agar data tidak hilang ketika halaman di-refresh! Tetap semangat belajar coding-nya ya! Sampai jumpa di kelas selanjutnya! 🎓
