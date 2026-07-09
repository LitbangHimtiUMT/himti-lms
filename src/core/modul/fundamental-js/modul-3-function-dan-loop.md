# MODUL 3: Function dan Loop

Halo semuanya! Selamat datang kembali di Modul 3. Bagaimana tugas Modul 2 kemarin? Aman, kan? 

Hari ini kita akan membahas dua pilar yang sangat penting dalam dunia pemrograman, yaitu **Function** (Fungsi) dan **Loop** (Perulangan). 

Bayangkan kalau kalian disuruh menulis kata *"Saya tidak akan mengulangi kesalahan lagi"* sebanyak 100 kali. Kalau ditulis manual, jari kalian bisa keriting, kan? Atau bayangkan kalian punya satu rumus rumit yang harus dipakai berkali-kali di baris kode yang berbeda. Capek banget kalau harus tulis ulang rumusnya dari nol. 

Nah, di modul ini kita akan belajar cara menyuruh komputer melakukan hal berulang tanpa capek menggunakan **Loop**, dan membungkus rumus atau logika kita agar bisa dipanggil berulang kali menggunakan **Function**. Mari kita bahas secara santai tapi mendalam!

---

## 🎯 Apa Saja yang Akan Kita Pelajari Hari Ini?

Setelah sesi ini selesai, kalian diharapkan mampu:
1. Mendefinisikan serta menggunakan `function` lengkap dengan parameter dan nilai kembalian (*return value*).
2. Memahami konsep ruang lingkup variabel (*scope*) di JavaScript.
3. Mengenal gaya modern menulis fungsi, yaitu *arrow function*.
4. Mengimplementasikan berbagai jenis perulangan seperti `for`, `while`, dan `do-while`.
5. Mengatur laju perulangan dengan perintah `break` dan `continue`.
6. **Goal Akhir:** Membangun aplikasi kalkulator interaktif yang memiliki riwayat perhitungan!

---

## 📚 Pembahasan Materi

### 3.1 Apa itu Function?

Secara sederhana, **Function** adalah sebuah blok kode yang sengaja kita buat untuk melakukan tugas tertentu, lalu kita kasih nama. Kapan pun kita butuh tugas itu, kita tinggal panggil namanya. Praktis, kan?

Ada beberapa cara membuat fungsi di JavaScript:

**1. Function Declaration (Gaya Klasik)**
Ini cara paling umum dan paling mudah dibaca.
```javascript
function sapaMahasiswa(nama) {
    return `Halo, ${nama}! Selamat datang di kelas JavaScript.`;
}

// Cara memanggilnya:
console.log(sapaMahasiswa("Budi")); // Output: Halo, Budi! Selamat datang...
```

**2. Function Expression (Fungsi sebagai Variabel)**
Di sini, kita membuat fungsi tanpa nama (*anonymous function*) lalu menyimpannya ke dalam variabel.
```javascript
const sapaMahasiswa = function(nama) {
    return `Halo, ${nama}!`;
};

console.log(sapaMahasiswa("Andi")); // Output: Halo, Andi!
```

**3. Arrow Function (Gaya Modern ES6)**
Ini gaya kekinian yang sering dipakai di React. Kodenya ringkas dan modis.
```javascript
const sapaMahasiswa = (nama) => {
    return `Halo, ${nama}!`;
};

// Bahkan jika isinya cuma satu baris, kita bisa persingkat lagi!
const sapaSingkat = nama => `Halo, ${nama}!`;

console.log(sapaSingkat("Siti")); // Output: Halo, Siti!
```

---

### 3.2 Parameter dan Argument (Apa Bedanya?)

Banyak mahasiswa yang tertukar antara dua istilah ini. Mari kita perjelas:
- **Parameter** adalah variabel penampung yang ditulis saat fungsi dideklarasikan (ibaratnya "lubang input").
- **Argument** adalah nilai asli yang kita masukkan ke dalam lubang tersebut saat fungsi dipanggil.

```javascript
// 'a' dan 'b' adalah PARAMETER (penampung sementara)
function tambah(a, b) { 
    return a + b;
}

// '5' dan '3' adalah ARGUMENT (nilai nyata yang dimasukkan)
tambah(5, 3); 
```

#### Default Parameter
Bagaimana kalau *user* lupa memasukkan nilai saat memanggil fungsi? Kita bisa siapkan nilai cadangan!
```javascript
function sapa(nama = "Teman-teman") {
    return `Halo, ${nama}!`;
}

console.log(sapa());       // Output: Halo, Teman-teman! (Menggunakan nilai default)
console.log(sapa("Rifki")); // Output: Halo, Rifki!
```

---

### 3.3 Nilai Kembalian (*Return Value*)

Sebuah fungsi itu ibarat mesin jus. Kita masukkan buah (sebagai *argument*), mesin bekerja, lalu mengeluarkan segelas jus. Hasil jus inilah yang kita sebut **Return Value**.

Ingat, kata kunci `return` akan langsung **menghentikan** jalannya fungsi seketika itu juga.

```javascript
function luasPersegi(sisi) {
    return sisi * sisi; // Mengembalikan hasil dan keluar dari fungsi
    console.log("Kode ini tidak akan pernah dijalankan!"); // Karena ada di bawah return
}
```

---

### 3.4 Scope (Ruang Lingkup Variabel)

*Scope* menentukan di mana suatu variabel boleh dibaca atau digunakan. Di JavaScript, ini penting sekali untuk menghindari variabel tabrakan.

**1. Global Scope (Bisa diakses dari mana saja)**
```javascript
let namaDosen = "Budi"; // Di luar fungsi manapun

Ibnu() {
    console.log(namaDosen); // Bisa diakses di dalam fungsi!
}
```

**2. Local / Function Scope (Hanya hidup di dalam fungsi tersebut)**
```javascript
function kelas() {
    let rahasia = "Kuis dadakan dibatalkan";
    console.log(rahasia); // Aman diakses di dalam
}
// console.log(rahasia); // ERROR! Di luar kelas, rahasia ini tidak dikenal.
```

---

### 3.5 Masuk ke Dunia Perulangan (Looping)

Perulangan digunakan untuk mengeksekusi blok kode berulang kali selama kondisi terpenuhi.

### 3.6 For Loop (Jumlah Perulangan Sudah Jelas)
Kita pakai `for` kalau kita sudah tahu pasti mau mengulang berapa kali.

```javascript
// Aturan: (Mulai dari mana; Batasnya apa; Perubahannya bagaimana)
for (let i = 1; i <= 5; i++) {
    console.log(`Perulangan ke-${i}`);
}
```

### 3.7 While Loop (Jumlah Perulangan Belum Pasti)
`while` akan terus mengulang selama kondisinya bernilai benar. Hati-hati, pastikan kondisinya suatu saat akan bernilai salah, kalau tidak program kalian akan macet total (*Infinite Loop*)!

```javascript
let counter = 1;
while (counter <= 5) {
    console.log(`Angka: ${counter}`);
    counter++; // Sangat penting! Supaya kondisinya berubah dan tidak mengulang selamanya.
}
```

### 3.8 Do-While Loop (Minimal Jalan Sekali)
Bedanya dengan `while`, pada `do-while` kodenya dijalankan dulu satu kali, baru setelah itu dicek kondisinya.

```javascript
let y = 10;
do {
    console.log("Ini pasti muncul sekali meskipun kondisinya salah!");
    y++;
} while (y < 5);
```

---

### 3.9 Mengatur Jalannya Loop dengan `break` dan `continue`

- **`break`:** Menghentikan paksa perulangan saat itu juga dan langsung keluar dari loop.
- **`continue`:** Melewati perulangan yang sedang berjalan saat ini, langsung lompat ke putaran berikutnya.

```javascript
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        continue; // Angka 5 dilewati / tidak dicetak
    }
    if (i === 8) {
        break; // Loop dihentikan total saat mencapai angka 8
    }
    console.log(i); // Output: 1, 2, 3, 4, 6, 7
}
```

---

## 🛠️ Panduan Praktik Terbimbing

Mari kita coba gabungkan konsep *function* dan *loop* di VSCode kalian!

### Praktik: Filter Angka Genap & Cetak Segitiga Bintang
Bikin file bernama `combo-practice.js` dan coba tulis kode ini:

```javascript
// 1. Fungsi menyaring angka genap dari sebuah daftar
function filterGenap(daftarAngka) {
    const hasil = [];
    for (const num of daftarAngka) {
        if (num % 2 === 0) {
            hasil.push(num);
        }
    }
    return hasil;
}

// 2. Fungsi menggambar segitiga bintang
function cetakSegitiga(tinggi) {
    for (let i = 1; i <= tinggi; i++) {
        let baris = '';
        for (let j = 1; j <= i; j++) {
            baris += '* ';
        }
        console.log(baris);
    }
}

// Uji Coba
console.log("=== Hasil Filter Genap ===");
console.log(filterGenap([1, 2, 3, 4, 5, 6, 7, 8])); // Output: [2, 4, 6, 8]

console.log("=== Menggambar Segitiga Bintang ===");
cetakSegitiga(5);
```

---

## 🚀 Mini Project: Simple Calculator dengan Riwayat Perhitungan

Mari kita bangun kalkulator berbasis web yang bisa menyimpan riwayat perhitungan kita!

### Struktur Proyek:
```text
simple-calculator/
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
    <title>Simple Calculator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>🧮 Simple Calculator</h1>
        <div class="calculator">
            <input type="number" id="num1" placeholder="Angka pertama">
            <input type="number" id="num2" placeholder="Angka kedua">
            <div class="buttons">
                <button onclick="hitung('+')">+</button>
                <button onclick="hitung('-')">−</button>
                <button onclick="hitung('*')">×</button>
                <button onclick="hitung('/')">÷</button>
            </div>
            <div id="result"></div>
            <button onclick="clearHistory()" class="clear-btn">Hapus Riwayat</button>
            <div id="history"></div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

#### 2. File `script.js`
```javascript
let history = [];

// Fungsi-fungsi operasi dasar
const tambah = (a, b) => a + b;
const kurang = (a, b) => a - b;
const kali = (a, b) => a * b;
const bagi = (a, b) => {
    if (b === 0) {
        return "Error: Pembagian dengan 0!";
    }
    return a / b;
};

// Fungsi Utama untuk menghitung
function hitung(operator) {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    
    // Validasi input
    if (isNaN(num1) || isNaN(num2)) {
        alert('Tolong masukkan angka pertama dan kedua dengan benar ya!');
        return;
    }
    
    let hasil;
    let simbol;
    
    // Switch case untuk menentukan operasi
    switch (operator) {
        case '+':
            hasil = tambah(num1, num2);
            simbol = '+';
            break;
        case '-':
            hasil = kurang(num1, num2);
            simbol = '−';
            break;
        case '*':
            hasil = kali(num1, num2);
            simbol = '×';
            break;
        case '/':
            hasil = bagi(num1, num2);
            simbol = '÷';
            break;
        default:
            hasil = 'Operasi tidak dikenal';
    }
    
    // Menampilkan hasil
    const resultDiv = document.getElementById('result');
    const hasilText = typeof hasil === 'number' ? hasil.toFixed(2) : hasil;
    resultDiv.innerHTML = `<p>${num1} ${simbol} ${num2} = <strong>${hasilText}</strong></p>`;
    
    // Simpan hasil ke dalam riwayat
    if (typeof hasil === 'number') {
        const entry = `${num1} ${simbol} ${num2} = ${hasilText}`;
        history.push(entry);
        tampilkanHistory();
    }
    
    // Reset kolom input
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
}

// Fungsi untuk menampilkan riwayat perhitungan menggunakan Looping
function tampilkanHistory() {
    const historyDiv = document.getElementById('history');
    if (history.length === 0) {
        historyDiv.innerHTML = '<p>Belum ada riwayat perhitungan.</p>';
        return;
    }
    
    let html = '<h3>Riwayat Perhitungan:</h3><ul>';
    // Menggunakan loop for...of untuk menjelajahi riwayat
    for (const item of history) {
        html += `<li>${item}</li>`;
    }
    html += '</ul>';
    historyDiv.innerHTML = html;
}

function clearHistory() {
    history = [];
    tampilkanHistory();
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
    background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.container {
    background: #1f2937;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    max-width: 500px;
    width: 90%;
    border: 1px solid #374151;
}

h1 {
    text-align: center;
    margin-bottom: 25px;
    color: #f3f4f6;
}

input {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 2px solid #374151;
    background: #111827;
    color: white;
    border-radius: 10px;
    font-size: 16px;
}

input:focus {
    border-color: #6366f1;
    outline: none;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 20px;
}

button {
    padding: 12px;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
}

button:hover {
    background: #4f46e5;
}

#result {
    background: #111827;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
    border: 1px solid #374151;
}

.clear-btn {
    width: 100%;
    background: #ef4444;
    font-size: 14px;
    padding: 10px;
    margin-bottom: 20px;
}

.clear-btn:hover {
    background: #dc2626;
}

#history {
    background: #111827;
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #374151;
    max-height: 150px;
    overflow-y: auto;
}

#history h3 {
    font-size: 14px;
    margin-bottom: 10px;
    color: #9ca3af;
}

#history ul {
    list-style: none;
    padding-left: 0;
    font-size: 14px;
    color: #d1d5db;
}

#history li {
    padding: 4px 0;
    border-bottom: 1px solid #374151;
}
```

---

## 📝 Evaluasi Pemahaman

Yuk, coba asah pemahaman kalian dengan kuis kecil ini:
1. Apa kegunaan utama dari kata kunci `return` pada sebuah fungsi?
2. Kapan sebaiknya kita memakai `while loop` alih-alih `for loop`?
3. Apa perbedaan utama antara perulangan `while` dan `do-while`?

Sangat menarik, bukan? Kita sudah belajar membuat kode kita modular dengan fungsi dan dinamis dengan perulangan. 

Di pertemuan selanjutnya (**Modul 4**), kita akan membahas cara menyimpan koleksi data yang kompleks agar lebih terstruktur dengan belajar **Array** dan **Object**. Tetap semangat belajar kodingnya ya! Sampai jumpa di Modul 4! 🎓
