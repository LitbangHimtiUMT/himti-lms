# MODUL 6: DOM Lanjutan

Halo rekan-rekan mahasiswa sekalian! Selamat datang di Modul 6. 

Di Modul 5 kemarin, kita sudah sukses berkenalan dengan DOM dasar, mulai dari memilih elemen, memanipulasi teks, hingga merespon aksi klik. Keren sekali kalian semua sudah bisa membuat aplikasi pendaftaran mahasiswa dengan *Dark Mode*!

Hari ini, kita akan masuk ke tingkat yang lebih *advance* (lanjutan). Kita tidak hanya memodifikasi elemen HTML yang sudah tertulis di dokumen saja, melainkan akan **menciptakan elemen baru langsung dari memori JavaScript** dan memasukkannya ke halaman web secara dinamis. Selain itu, kita juga akan belajar cara menyimpan data aplikasi di komputer pengguna agar tidak hilang saat halaman di-refresh menggunakan **Local Storage**. Mari kita mulai!

---

## 🎯 Apa Saja yang Akan Kita Capai Hari Ini?

Setelah menyelesaikan modul ini, kalian diharapkan mampu:
1. Membuat elemen DOM baru secara dinamis menggunakan `createElement()`.
2. Menambah serta menghapus elemen di halaman menggunakan `appendChild()` dan `.remove()`.
3. Menjelajahi silsilah DOM (mencari induk/anak elemen) menggunakan `parentElement`, `children`, dan `.closest()`.
4. Menyimpan data bayangan di elemen HTML menggunakan atribut `data-*` (*dataset*).
5. Mengelola data aplikasi menggunakan struktur variabel kelas (*state management*).
6. Membuat sistem validasi form yang kompleks secara rapi.
7. Memanfaatkan `localStorage` untuk menyimpan data permanen di browser.
8. **Goal Akhir:** Membangun aplikasi Todo List interaktif yang memiliki fitur pencarian, filter status, dan datanya tidak hilang saat browser ditutup!

---

## 📚 Pembahasan Materi

### 6.1 Membuat Elemen Baru: `createElement()`

Selama ini kita menulis tag HTML secara langsung di file `.html`. Tapi, bagaimana kalau kalian ingin menambahkan baris tabel baru saat pengguna mengklik tombol? Di situlah `createElement()` beraksi.

```javascript
// 1. Bikin elemen di memori komputer
const divBaru = document.createElement('div');
const tombolHapus = document.createElement('button');

// 2. Beri bumbu (kelas, teks, atau atribut)
divBaru.className = 'container-kartu';
divBaru.id = 'kartu-mahasiswa';
divBaru.textContent = 'Ini adalah kartu profil baru.';

tombolHapus.textContent = 'Hapus';
tombolHapus.setAttribute('type', 'button');
```

---

### 6.2 Menempelkan Elemen: `appendChild()`

Meskipun elemen baru sudah berhasil dibuat di memori JavaScript, dia belum akan muncul di halaman web sebelum kita tempelkan ke salah satu elemen induk (*parent*).

```javascript
const mainContainer = document.querySelector('#main-container');

// Tempelkan divBaru sebagai anak terakhir di dalam mainContainer
mainContainer.appendChild(divBaru);

// Tempelkan tombol ke dalam divBaru yang baru saja kita pasang
divBaru.appendChild(tombolHapus);
```

---

### 6.3 Menghapus Elemen: `remove()`

Untuk membuang suatu elemen dari halaman web, kita tinggal memanggil method `.remove()` pada elemen yang dituju. Sangat instan!

```javascript
const iklan = document.querySelector('.banner-iklan');
iklan.remove(); // Banner langsung lenyap dari layar!
```

---

### 6.4 Navigasi Silsilah DOM (Naik Turun Pohon HTML)

Dalam pembuatan aplikasi web, terkadang ketika kita mengklik tombol "Hapus" yang ada di dalam sebuah kartu, kita ingin menghapus seluruh kartu itu sendiri. Maka kita harus bisa mencari siapa induk dari tombol tersebut.

**1. Mengakses Induk: `parentElement`**
```javascript
const tombol = document.querySelector('.btn-hapus');
const kartuInduk = tombol.parentElement; // Mencari 1 tingkat di atasnya
kartuInduk.remove(); // Menghapus kartu beserta tombolnya
```

**2. Mengakses Anak-anak: `children`**
Menghasilkan daftar elemen anak yang ada di dalam elemen parent tersebut.
```javascript
const daftarMahasiswa = document.querySelector('#tabel-mhs');
console.log(daftarMahasiswa.children.length); // Tahu jumlah baris tabel anak
```

**3. Mencari Induk Spesifik Terdekat: `closest()` (Sangat Berguna! ⭐)**
`closest()` akan berjalan mendaki pohon DOM ke atas untuk mencari elemen induk yang paling dekat yang cocok dengan selector CSS yang kita tentukan.
```javascript
const tombolEdit = document.querySelector('.btn-edit');
// Cari induk pembungkus berupa card terdekat, meskipun terhalang oleh div-div lain di antaranya
const kartuBesar = tombolEdit.closest('.card-mahasiswa');
```

---

### 6.5 Menyimpan Data Bayangan dengan Dataset (`data-*`)

Pernahkah kalian butuh menyimpan ID database dari suatu item di tombol hapus tanpa ingin menunjukkannya di tampilan layar? Kita bisa menyimpannya menggunakan atribut `data-*`.

#### Di File HTML:
```html
<button id="btnUser" data-id="99" data-user-name="Budi" data-role="Admin">Detail User</button>
```

#### Di File JavaScript:
```javascript
const tombol = document.querySelector('#btnUser');

// Kita baca datanya lewat properti dataset (penulisan camelCase!)
console.log(tombol.dataset.id);       // Output: "99"
console.log(tombol.dataset.userName); // Output: "Budi"

// Kita juga bisa mengubah nilainya lewat JS
tombol.dataset.role = "Superadmin";
```

---

### 6.6 Validasi Form Kompleks secara Elegan

Ketika formulir pendaftaran dikirim, kita tidak boleh percaya begitu saja pada input pengguna. Kita harus memeriksa kelayakannya. Saya sarankan kalian membuat struktur validasi yang rapi, contohnya seperti menggunakan pola kelas berikut:

```javascript
class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.errors = {};
    }
    
    validateRequired(fieldName, message) {
        const value = new FormData(this.form).get(fieldName);
        if (!value || value.trim() === '') {
            this.errors[fieldName] = message;
            return false;
        }
        return true;
    }
    
    validateMinLength(fieldName, length, message) {
        const value = new FormData(this.form).get(fieldName);
        if (value.length < length) {
            this.errors[fieldName] = message;
            return false;
        }
        return true;
    }
}
```

---

### 6.7 Data Persistence: `localStorage`

Semua data variabel yang kita buat akan **hilang** begitu kita menekan tombol refresh browser. Agar data tetap tersimpan awet, browser menyediakan tempat penyimpanan lokal bernama **Local Storage**.

```javascript
// 1. Menyimpan data (Ingat, tipe data yang disimpan harus berupa String!)
const dataMhs = { nama: "Budi", nilai: 85 };
localStorage.setItem('mahasiswa', JSON.stringify(dataMhs)); // Kita jadikan teks JSON dulu

// 2. Mengambil data kembali
const dataTeks = localStorage.getItem('mahasiswa');
const dataAsli = JSON.parse(dataTeks); // Kita ubah lagi menjadi Object JS
console.log(dataAsli.nama); // Output: "Budi"

// 3. Menghapus data
localStorage.removeItem('mahasiswa');
```

---

## 🛠️ Panduan Praktik Terbimbing

Mari kita coba membuat sistem pembuatan kartu tugas secara dinamis.

### Praktik: Dynamic Card Creator
Buat halaman HTML sederhana berikut untuk menguji pemahaman *DOM Advanced*:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dynamic Card Creator</title>
    <style>
        .container { display: flex; gap: 10px; margin-top: 20px; }
        .card { background: #e2e8f0; padding: 15px; border-radius: 8px; width: 150px; }
    </style>
</head>
<body>
    <h1>Dynamic Card Creator</h1>
    <input type="text" id="judulKartu" placeholder="Judul kartu...">
    <button id="btnTambah">Tambah Kartu</button>
    
    <div class="container" id="cardContainer"></div>

    <script>
        const input = document.getElementById('judulKartu');
        const tombol = document.getElementById('btnTambah');
        const container = document.getElementById('cardContainer');

        tombol.addEventListener('click', () => {
            const teks = input.value.trim();
            if (!teks) return alert('Tolong isi judulnya!');

            // 1. Membuat Elemen Card
            const card = document.createElement('div');
            card.className = 'card';

            const title = document.createElement('h3');
            title.textContent = teks;

            const btnHapus = document.createElement('button');
            btnHapus.textContent = 'Hapus';
            
            // Pasang event hapus langsung ke tombolnya
            btnHapus.addEventListener('click', () => {
                card.remove(); // Hapus kartu ini
            });

            // 2. Rakit Elemen
            card.appendChild(title);
            card.appendChild(btnHapus);
            container.appendChild(card);

            // Reset input
            input.value = '';
        });
    </script>
</body>
</html>
```

---

## 🚀 Mini Project: Todo List App dengan Data Persistence (localStorage)

Mari kita buat aplikasi pencatat tugas harian (Todo List) yang sangat responsif, lengkap dengan pencarian, filter status, dan data yang tersimpan di browser secara permanen!

### Struktur Proyek:
```text
todo-list-app/
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
    <title>Todo List App - HIMTI</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app">
        <h1>📋 Todo List Mahasiswa</h1>
        
        <!-- Kolom Tambah -->
        <div class="input-section">
            <input type="text" id="todoInput" placeholder="Ketik tugas kuliah baru di sini...">
            <button id="addTodo">Tambah Tugas</button>
        </div>
        
        <!-- Filter Status -->
        <div class="filter-section">
            <button data-filter="all" class="active">Semua Tugas</button>
            <button data-filter="active">Sedang Dikerjakan</button>
            <button data-filter="completed">Sudah Selesai</button>
        </div>
        
        <!-- Kolom Pencarian -->
        <input type="text" id="searchTodo" placeholder="Cari tugas...">
        
        <!-- Tempat List Todo Muncul -->
        <div id="todoList" class="todo-list-container"></div>
        
        <!-- Info Statistik Sederhana -->
        <div class="stats">
            <span id="totalCount">Total: 0</span>
            <span id="activeCount">Belum Selesai: 0</span>
            <span id="completedCount">Selesai: 0</span>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

#### 2. File `script.js`
```javascript
class TodoApp {
    constructor() {
        this.todos = this.loadTodos(); // Load data dari localstorage
        this.filter = 'all';
        this.search = '';
        
        // Menentukan ID berikutnya agar unik
        this.currentId = this.todos.length > 0 
            ? Math.max(...this.todos.map(t => t.id)) + 1 
            : 1;
        
        this.init();
    }
    
    init() {
        // DOM Elements
        this.input = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addTodo');
        this.list = document.getElementById('todoList');
        this.filterBtns = document.querySelectorAll('[data-filter]');
        this.searchInput = document.getElementById('searchTodo');
        
        this.statsEl = {
            total: document.getElementById('totalCount'),
            active: document.getElementById('activeCount'),
            completed: document.getElementById('completedCount')
        };
        
        // Event Listeners
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filter = btn.dataset.filter;
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.render();
            });
        });
        
        this.searchInput.addEventListener('input', (e) => {
            this.search = e.target.value.toLowerCase();
            this.render();
        });
        
        this.render(); // Gambar data pertama kali
    }
    
    loadTodos() {
        const data = localStorage.getItem('todos');
        return data ? JSON.parse(data) : [];
    }
    
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    addTodo() {
        const text = this.input.value.trim();
        if (!text) {
            alert('Tuliskan kegiatannya dulu ya!');
            return;
        }
        
        this.todos.push({
            id: this.currentId++,
            text: text,
            done: false,
            createdAt: new Date().toISOString()
        });
        
        this.input.value = '';
        this.saveTodos();
        this.render();
    }
    
    deleteTodo(id) {
        if (confirm('Yakin ingin menghapus tugas ini dari daftar?')) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveTodos();
            this.render();
        }
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.done = !todo.done;
            this.saveTodos();
            this.render();
        }
    }
    
    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;
        
        const newText = prompt('Ubah judul tugas kuliah:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            this.saveTodos();
            this.render();
        }
    }
    
    getFilteredTodos() {
        let filtered = this.todos;
        
        // Saring berdasarkan Status tombol yang diklik
        if (this.filter === 'active') {
            filtered = filtered.filter(t => !t.done);
        } else if (this.filter === 'completed') {
            filtered = filtered.filter(t => t.done);
        }
        
        // Saring berdasarkan pencarian teks
        if (this.search) {
            filtered = filtered.filter(t => 
                t.text.toLowerCase().includes(this.search)
            );
        }
        
        return filtered;
    }
    
    render() {
        const filtered = this.getFilteredTodos();
        
        if (filtered.length === 0) {
            this.list.innerHTML = `<div class="empty-state"><p>📭 Wah, tidak ada tugas di daftar ini!</p></div>`;
        } else {
            this.list.innerHTML = filtered.map(todo => `
                <div class="todo-item ${todo.done ? 'completed' : ''}">
                    <div class="todo-content">
                        <input type="checkbox" 
                               ${todo.done ? 'checked' : ''} 
                               onchange="app.toggleTodo(${todo.id})">
                        <span class="todo-text">${todo.text}</span>
                        <small>${new Date(todo.createdAt).toLocaleDateString()}</small>
                    </div>
                    <div class="todo-actions">
                        <button onclick="app.editTodo(${todo.id})" class="btn-edit-todo">✏️</button>
                        <button onclick="app.deleteTodo(${todo.id})" class="btn-delete-todo">🗑️</button>
                    </div>
                </div>
            `).join('');
        }
        
        // Perbarui data statistik di bawah layar
        const total = this.todos.length;
        const active = this.todos.filter(t => !t.done).length;
        const completed = this.todos.filter(t => t.done).length;
        
        this.statsEl.total.textContent = `Total: ${total}`;
        this.statsEl.active.textContent = `Aktif: ${active}`;
        this.statsEl.completed.textContent = `Selesai: ${completed}`;
    }
}

// Menjalankan aplikasi
const app = new TodoApp();
window.app = app; // Supaya method onclick tombol bisa mengakses fungsi app
```

#### 3. File `style.css`
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    min-height: 100vh;
    padding: 30px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.app {
    width: 100%;
    max-width: 550px;
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
}

h1 {
    text-align: center;
    color: #1e3a8a;
    margin-bottom: 25px;
    font-size: 24px;
}

.input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

#todoInput {
    flex: 1;
    padding: 12px;
    border: 2px solid #cbd5e1;
    border-radius: 8px;
    font-size: 15px;
}

#todoInput:focus {
    border-color: #3b82f6;
    outline: none;
}

#addTodo {
    padding: 12px 20px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}

#addTodo:hover {
    background: #1e3a8a;
}

.filter-section {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

.filter-section button {
    padding: 6px 12px;
    background: #f1f5f9;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
}

.filter-section button.active {
    background: #3b82f6;
    color: white;
}

#searchTodo {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 13px;
}

.todo-list-container {
    margin-bottom: 25px;
    max-height: 250px;
    overflow-y: auto;
}

.todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #f8fafc;
    border-radius: 8px;
    margin-bottom: 8px;
    border-left: 4px solid #3b82f6;
}

.todo-item.completed {
    border-left-color: #94a3b8;
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    color: #94a3b8;
}

.todo-content {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
}

.todo-content input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.todo-text {
    flex: 1;
    font-size: 14px;
}

.todo-content small {
    font-size: 10px;
    color: #94a3b8;
    margin-left: 5px;
}

.todo-actions button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    font-size: 14px;
}

.empty-state {
    text-align: center;
    padding: 30px;
    color: #94a3b8;
    font-size: 14px;
}

.stats {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    border-top: 1px solid #e2e8f0;
    color: #64748b;
    font-size: 12px;
    font-weight: bold;
}
```

---

## 📝 Evaluasi Pemahaman

Untuk menguji apakah materi kali ini terserap dengan baik, coba renungkan kuis berikut:
1. Apa perbedaan antara `.remove()` dan `.removeChild()` ketika menghapus elemen?
2. Bagaimana cara kerja `.closest()` dalam mendeteksi elemen induk di DOM?
3. Mengapa data yang kita simpan ke dalam `localStorage` harus diubah menjadi format String menggunakan `JSON.stringify()`?

Luar biasa! Kalian sudah berhasil memahami DOM lanjutan dan menguasai *Local Storage*. 

Di modul penutup (**Modul 7**), kita akan menguji semua keahlian JavaScript fundamental kalian melalui penugasan **Proyek Akhir Web Development**. Bersiaplah, karena ini saatnya kalian bersinar membuat karya mandiri! Sampai jumpa di kelas berikutnya! 🎓
