# MODUL 2: Pengambilan Keputusan

Halo rekan-rekan mahasiswa! Senang sekali bisa bertemu lagi di Modul 2. 

Di Modul 1 kemarin kita sudah belajar cara menyimpan data ke dalam "kotak" (variabel). Nah, hari ini kita akan naik kelas! Kita akan belajar cara memberikan **otak** ke program kita supaya dia bisa mengambil keputusan sendiri. 

Bayangkan sebuah program seperti kehidupan kita sehari-hari: *"Kalau hari hujan, saya bawa payung. Kalau tidak, ya tidak usah bawa."* Logika sederhana inilah yang membuat aplikasi web kalian menjadi dinamis dan cerdas. Mari kita bedah bersama!

---

## 🎯 Apa Saja yang Akan Kita Pelajari Hari Ini?

Setelah sesi ini selesai, kalian diharapkan bisa:
1. Memakai operator matematika, perbandingan, dan logika dengan benar.
2. Memahami konsep boolean serta konsep seru bernama *truthy* dan *falsy values*.
3. Menerapkan pengondisian dengan `if`, `else`, dan `else if`.
4. Menyusun kondisi di dalam kondisi (*nested if*) untuk logika yang lebih kompleks.
5. Memakai `switch case` sebagai alternatif biar kode nggak kepanjangan.
6. Memanfaatkan *ternary operator* (gaya singkat menulis kondisi).
7. **Goal Akhir:** Membangun aplikasi keren pelacak kelulusan dan nilai mahasiswa!

---

## 📚 Pembahasan Materi

### 2.1 Operator Aritmatika (Matematika Dasar)

Di JavaScript, kita bisa melakukan hitung-hitungan matematika layaknya kalkulator.

```javascript
let a = 10, b = 3;

console.log(a + b);   // 13 (Penjumlahan)
console.log(a - b);   // 7  (Pengurangan)
console.log(a * b);   // 30 (Perkalian)
console.log(a / b);   // 3.333... (Pembagian)
console.log(a % b);   // 1  (Modulus / Sisa Hasil Bagi, ini berguna banget buat nge-cek angka ganjil/genap!)
console.log(a ** b);  // 1000 (Eksponensial / Pangkat)
```

#### Increment (Tambah 1) dan Decrement (Kurang 1)
Saya ingin kalian perhatikan bedanya tanda tambah di depan (`++counter`) dan di belakang (`counter++`):

```javascript
let counter = 5;

// Post-increment (Tampilkan dulu nilainya yang sekarang, baru ditambah 1)
console.log(counter++);  // Output: 5 (tapi di memori nilai counter sekarang sudah jadi 6)
console.log(counter);    // Output: 6

// Pre-increment (Ditambah 1 dulu baru ditampilkan)
console.log(++counter);  // Output: 7 (langsung berubah!)
```

---

### 2.2 Operator Perbandingan (Membandingkan Nilai)

Hasil dari operator perbandingan selalu berupa kebenaran: **benar (`true`)** atau **salah (`false`)**.

#### Kenapa Harus Pakai `===` dan Bukan `==`? (PENTING! ⭐)
Di JavaScript, ada dua cara membandingkan kesamaan:
- `==` (*Loose Equality*): Cuma nge-cek nilainya saja, cuek dengan tipe datanya.
- `===` (*Strict Equality*): Nge-cek nilai **DAN** tipe datanya.

Saya sangat menyarankan kalian selalu memakai `===`. Perhatikan contoh berikut:
```javascript
// Loose equality (==) - TIDAK DIREKOMENDASIKAN ❌
console.log(5 == '5');    // Output: true (Padahal yang satu angka, yang satu teks!)
console.log(0 == false);  // Output: true 

// Strict equality (===) - SANGAT DIREKOMENDASIKAN ⭐
console.log(5 === '5');   // Output: false (Tipe data beda, jadi dianggap tidak sama!)
console.log(0 === false); // Output: false
```

---

### 2.3 Operator Logika (Menggabungkan Kondisi)

Ketika kalian punya lebih dari satu syarat untuk mengambil keputusan, di situlah operator logika beraksi.

**1. Operator AND (`&&`)**
Semua syarat wajib terpenuhi (`true`). Kalau ada satu aja yang salah (`false`), hasilnya langsung gagal.
```javascript
let umur = 20;
let punyaKTM = true;
// Syarat masuk perpustakaan: Umur >= 18 DAN punya KTM
console.log(umur >= 18 && punyaKTM);  // Output: true
```

**2. Operator OR (`||`)**
Cukup salah satu syarat saja yang terpenuhi, hasilnya sudah dianggap `true`.
```javascript
let hari = "Sabtu";
// Diskon berlaku kalau hari Sabtu ATAU Minggu
let dapatDiskon = (hari === "Sabtu" || hari === "Minggu");
console.log(dapatDiskon);  // Output: true
```

**3. Operator NOT (`!`)**
Membalikkan kenyataan. Yang tadinya `true` jadi `false`, yang `false` jadi `true`.
```javascript
let isLogin = false;
console.log(!isLogin); // Output: true (Bisa dibaca: "Jika user sedang TIDAK login")
```

---

### 2.4 Konsep Seru: Truthy & Falsy Values

Di JavaScript, setiap nilai punya "kecenderungan bawaan" bernilai benar atau salah jika dimasukkan ke dalam kondisi *boolean*.

- **Falsy Values (Bawaan bernilai salah):**
  Teks kosong `""`, angka `0`, `-0`, `null`, `undefined`, `NaN` (Not a Number), dan tentu saja `false`.
- **Truthy Values (Bawaan bernilai benar):**
  Semua nilai di luar kelompok *Falsy* di atas, termasuk teks berisi `"hello"`, array kosong `[]`, dan object kosong `{}`.

---

### 2.5 Mengambil Keputusan dengan `if`, `else`, dan `else if`

Sekarang kita masuk ke bagian intinya! Bagaimana cara menuliskan pengondisian ini di kode?

#### Contoh `if-else` Sederhana:
```javascript
let nilaiUjian = 75;

if (nilaiUjian >= 60) {
    console.log("Selamat, kamu lulus!");
} else {
    console.log("Jangan menyerah, silakan coba lagi!");
}
```

#### Kondisi Bercabang (`else if`):
Jika syaratnya lebih dari dua pilihan:
```javascript
let nilai = 85;

if (nilai >= 90) {
    console.log("Grade: A");
} else if (nilai >= 80) {
    console.log("Grade: B"); // Kode ini yang akan jalan!
} else if (nilai >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: D/E");
}
```
> **Tips Dosen:** Selalu taruh kondisi yang paling spesifik di paling atas ya! Kalau terbalik, logika program kalian bisa kacau.

---

### 2.6 Percabangan Bersarang (*Nested If*)

Terkadang kita perlu memeriksa suatu kondisi di dalam kondisi yang lain. 
```javascript
let umur = 20;
let sudahBayarTiket = false;

if (umur >= 18) {
    if (sudahBayarTiket) {
        console.log("Silakan masuk ke studio bioskop!");
    } else {
        console.log("Kamu sudah cukup umur, tapi tiketnya belum dibayar nih.");
    }
} else {
    console.log("Maaf ya, film ini khusus dewasa.");
}
```

---

### 2.7 Switch Case (Alternatif `else-if` Biar Lebih Rapi)

Kalau pilihannya ada banyak sekali dan berupa nilai pasti (seperti nama hari, menu makanan, atau kode pilihan), memakai `else-if` bertumpuk akan membuat kode jadi melelahkan untuk dibaca. Gunakan `switch-case` sebagai solusinya!

```javascript
let hari = "Sabtu";

switch (hari) {
    case "Senin":
    case "Selasa":
    case "Rabu":
    case "Kamis":
    case "Jumat":
        console.log("Semangat kuliah & kerjanya!");
        break; // break ini wajib ya! Biar kodenya nggak bablas ke bawah.
    case "Sabtu":
    case "Minggu":
        console.log("Waktunya libur dan istirahat!");
        break;
    default:
        console.log("Nama hari tidak valid.");
}
```

---

### 2.8 Ternary Operator (Jalan Pintas Cepat)

Jika kalian hanya punya kondisi `if-else` sederhana untuk mengisi nilai variabel, kalian bisa menulisnya hanya dalam 1 baris saja!

```javascript
let nilai = 75;
// Format: kondisi ? jika_true : jika_false
let status = nilai >= 60 ? "Lulus" : "Tidak Lulus";

console.log(status); // Output: "Lulus"
```

---

## 🛠️ Panduan Praktik Terbimbing

Saya ingin kalian mencoba menulis script berikut untuk memantapkan pemahaman kalian.

### Praktik 1: Kalkulator Grade Sederhana
Bikin file bernama `grade-calculator.js` di VSCode kalian, lalu tulis dan jalankan kode ini:

```javascript
function hitungGrade(nilai) {
    if (nilai >= 90 && nilai <= 100) {
        return "Grade A (Luar Biasa!)";
    } else if (nilai >= 80 && nilai < 90) {
        return "Grade B (Bagus!)";
    } else if (nilai >= 70 && nilai < 80) {
        return "Grade C (Cukup, tingkatkan lagi ya!)";
    } else if (nilai >= 0 && nilai < 70) {
        return "Grade D/E (Silakan ikuti ujian remedial)";
    } else {
        return "Nilai tidak valid! Input harus antara 0-100.";
    }
}

// Uji coba beberapa kemungkinan nilai
console.log(hitungGrade(95)); // Output: Grade A...
console.log(hitungGrade(82)); // Output: Grade B...
console.log(hitungGrade(-5)); // Output: Nilai tidak valid!
```

---

## 🚀 Mini Project: Student Grade Checker

Sekarang, mari kita buat aplikasi mini berbasis halaman web interaktif sesungguhnya!

### Struktur Proyek:
```text
student-grade-checker/
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
    <title>Student Grade Checker</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>📊 Student Grade Checker</h1>
        <div class="input-group">
            <label for="nilai">Masukkan Nilai Ujian (0-100):</label>
            <input type="number" id="nilai" min="0" max="100" placeholder="Contoh: 85">
            <button onclick="checkGrade()">Cek Hasil Kelulusan</button>
        </div>
        <div id="result"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

#### 2. File `script.js`
```javascript
function checkGrade() {
    // Ambil nilai dari kotak input di HTML
    const nilaiInput = document.getElementById('nilai');
    const nilai = parseInt(nilaiInput.value);
    
    // Validasi input: Pastikan isinya angka dan di kisaran 0 - 100
    if (isNaN(nilai) || nilai < 0 || nilai > 100) {
        alert('Tolong masukkan angka nilai yang valid antara 0 sampai 100 ya!');
        return;
    }
    
    let grade, status, deskripsi;
    
    // Logika penentuan grade mahasiswa
    if (nilai >= 90) {
        grade = 'A';
        status = 'Lulus';
        deskripsi = 'Sangat Baik';
    } else if (nilai >= 80) {
        grade = 'B';
        status = 'Lulus';
        deskripsi = 'Baik';
    } else if (nilai >= 70) {
        grade = 'C';
        status = 'Lulus';
        deskripsi = 'Cukup';
    } else if (nilai >= 60) {
        grade = 'D';
        status = 'Lulus';
        deskripsi = 'Kurang';
    } else {
        grade = 'E';
        status = 'Tidak Lulus';
        deskripsi = 'Gagal';
    }
    
    // Tampilkan hasilnya ke halaman web
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="result-card">
            <h2>Hasil Evaluasi Dosen</h2>
            <div class="grade-display">${grade}</div>
            <p><strong>Nilai Angka:</strong> ${nilai}</p>
            <p><strong>Status Mahasiswa:</strong> ${status}</p>
            <p><strong>Deskripsi Nilai:</strong> ${deskripsi}</p>
            <div class="status-${status.toLowerCase().replace(' ', '-')}">
                ${status === 'Lulus' ? '🎉 Selamat ya, kamu dinyatakan Lulus!' : '💪 Tetap Semangat! Jangan menyerah untuk mencoba lagi.'}
            </div>
        </div>
    `;
    
    // Kosongkan kembali kotak input
    nilaiInput.value = '';
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    max-width: 500px;
    width: 90%;
}

h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

label {
    font-weight: 600;
    color: #555;
}

input {
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 10px;
    font-size: 16px;
    transition: border-color 0.3s;
}

input:focus {
    border-color: #667eea;
    outline: none;
}

button {
    padding: 12px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background: #764ba2;
}

#result {
    margin-top: 30px;
}

.result-card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 15px;
    text-align: center;
}

.grade-display {
    font-size: 72px;
    font-weight: bold;
    margin: 10px 0;
    color: #764ba2;
}

.status-lulus {
    color: #28a745;
    font-weight: 600;
    margin-top: 10px;
}

.status-tidak-lulus {
    color: #dc3545;
    font-weight: 600;
    margin-top: 10px;
}
```

---

## 📝 Evaluasi Pemahaman

Yuk, coba jawab kuis kecil ini untuk melihat sejauh mana pemahamanmu:
1. Mengapa membandingkan string `"5"` dengan angka `5` menggunakan `===` menghasilkan nilai `false`? Jelaskan!
2. Sebutkan minimal 3 nilai yang termasuk dalam kategori *Falsy values*.
3. Kapan sebaiknya kita memakai `switch-case` alih-alih `if-else` bertumpuk?

Bagus sekali! Kita sudah berhasil membuat program kita bisa mengambil keputusan. Di modul berikutnya (**Modul 3**), kita akan belajar bagaimana cara menyuruh komputer melakukan hal berulang-ulang tanpa capek menggunakan **Loops** dan membungkus kode kita dengan **Function**. Sampai jumpa di kelas berikutnya! 🎓
