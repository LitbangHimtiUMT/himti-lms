# MODUL 3: React Component & JSX

Halo teman-teman! Selamat datang di **Modul 3**.

Hari ini kita akan membahas jantung pertahanan dari React, yaitu **Component** (Komponen) dan **JSX**. Dua konsep inilah yang membuat React sangat menyenangkan dan digemari oleh jutaan developer di seluruh dunia. 

Mari kita pelajari konsepnya perlahan-lahan agar pondasi koding kalian kuat!

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Menjelaskan definisi dan pentingnya konsep komponen pada React.
2. Membuat komponen React pertama dengan penulisan PascalCase yang benar.
3. Memahami dan menerapkan aturan-aturan menulis sintaks JSX.
4. Menuliskan ekspresi JavaScript dinamis di dalam JSX menggunakan kurung kurawal `{}`.
5. Memasang komentar yang benar di dalam kode JSX.

---

## 5.1 Apa itu Component?

Secara sederhana, **Component** adalah potongan kecil antarmuka pengguna (UI) yang bersifat independen dan bisa kita gunakan berulang kali (*reusable*). 

Bayangkan saat kalian ingin membuat halaman web modern. Dibanding menulis satu file HTML raksasa yang panjangnya ribuan baris, React mengajak kalian untuk memecahnya menjadi bagian-bagian kecil:

```text
┌───────────────────────────────────────────┐
│                 WEBSITE                   │
├───────────────────────────────────────────┤
│  [ Navbar Component ]                     │
├───────────────────────────────────────────┤
│  [ Hero Component ]                       │
├───────────────────────────────────────────┤
│  [ Card Component ]   [ Card Component ]  │
├───────────────────────────────────────────┤
│  [ Footer Component ]                     │
└───────────────────────────────────────────┘
```

Setiap bagian di atas adalah komponen mandiri. Mereka memiliki tampilan dan fungsinya masing-masing.

### Analogi Sederhana: Bermain Lego
Pikirkan komponen React seperti bongkahan **Lego**. 
- Satu bongkahan Lego atap bisa kalian pasang di rumah-rumahan, kastil, atau garasi mobil. 
- Di React, satu komponen Tombol (`Button`) yang sama bisa kalian pasang di halaman Login, halaman Register, maupun di pojok keranjang belanja belanjaan. Jika ada perubahan warna tombol, kalian cukup mengedit satu file tombol tersebut saja, dan seluruh tombol di website otomatis berubah!

![Lego Bricks](https://media.istockphoto.com/id/458088603/photo/lego-blocks-with-copy-space.jpg?s=612x612&w=0&k=20&c=1jnUt5ci60VGbCIN4ddJajsEA-mxdhP7vOy4UTrawdQ=)
*Ilustrasi: Bongkahan Lego yang siap disusun menjadi bentuk apa pun.*

---

## 5.2 Membuat Komponen Pertama Kalian

Di React, komponen sebenarnya hanyalah sebuah **fungsi JavaScript biasa** yang mengembalikan tampilan visual berupa JSX.

### Aturan Wajib Membuat Komponen:
1. **Nama komponen harus diawali huruf besar (PascalCase).** 
   - Contoh: `Greeting.jsx` (Benar ✅)
   - Contoh: `greeting.jsx` (Salah ❌, akan dianggap tag HTML biasa oleh React)
2. Komponen harus mengembalikan (*return*) JSX.
3. Komponen wajib diexport agar dapat diimport dan digunakan oleh file lain.

### Panduan Membuat Folder Komponen:
Sebelum koding, silakan buat folder baru bernama **`components`** di dalam folder **`src`** proyek kalian. 
Letak foldernya wajib berada di bawah folder `src`, seperti struktur pohon folder berikut:
```text
himti-landing-page/
├── 📁 node_modules/
├── 📁 src/
│   ├── 📁 components/     <-- BUAT FOLDER BARU DI SINI!
│   │   └── 📄 Greeting.jsx <-- File komponen kalian
│   ├── 📄 App.jsx
│   └── 📄 main.jsx
```

Lalu, mari kita buat file baru di dalam folder tersebut dengan nama `src/components/Greeting.jsx`:

```jsx
// 1. Buat fungsi komponen dengan huruf besar di awal
function Greeting() {
  // 2. Return kode JSX (bungkus dengan tanda kurung)
  return (
    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
      <h1 className="text-xl font-bold text-white">Halo, Selamat Belajar React!</h1>
      <p className="text-slate-400">Ini adalah komponen pertama saya di HIMTI.</p>
    </div>
  );
}

// 3. Export komponen agar bisa diimport
export default Greeting;
```

### Cara Memanggil Komponen `Greeting` di `App.jsx`:
Buka file `src/App.jsx` dan panggil komponen di atas layaknya menulis tag HTML self-closing:

```jsx
import Greeting from "./components/Greeting";

function App() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Daftar Komponen:</h2>
      {/* Kita panggil berkali-kali! */}
      <Greeting />
      <Greeting />
    </div>
  );
}

export default App;
```

---

## 6.1 Mengenal JSX (JavaScript XML)

Saat menulis komponen di atas, kalian melihat ada tag seperti HTML di dalam file JavaScript. Itu disebut **JSX**. 

JSX bukanlah HTML sungguhan. JSX adalah perpanjangan sintaks JavaScript yang mempermudah kita menulis UI. Sebelum ada JSX, developer React harus menulis kode yang rumit seperti ini:

```javascript
// Cara lama tanpa JSX
const element = React.createElement('h1', { className: 'title' }, 'Halo Dunia!');
```
Dengan JSX, kita cukup menulisnya seperti HTML biasa:
```jsx
// Jauh lebih bersih dan mudah dibaca!
const element = <h1 className="title">Halo Dunia!</h1>;
```

---

## 6.2 Perbedaan Penting: HTML vs JSX

Karena JSX berjalan di atas JavaScript, ada beberapa aturan penulisan yang sedikit berbeda dengan HTML biasa:

| HTML | JSX | Alasan |
| :--- | :--- | :--- |
| `class="container"` | `className="container"` | `class` adalah kata kunci bawaan JavaScript untuk membuat Class. |
| `for="email"` | `htmlFor="email"` | `for` adalah kata kunci bawaan JavaScript untuk perulangan (*loop*). |
| `onclick="run()"` | `onClick={run}` | Event handler di JSX ditulis menggunakan *camelCase*. |
| `<img src="logo.png">` | `<img src="logo.png" />` | **Wajib ditutup!** Semua tag tanpa anak wajib menggunakan *self-closing* `/`. |
| `style="color: red;"` | `style={{ color: 'red' }}` | Gaya inline di JSX harus berupa **Object JavaScript** (double kurung kurawal). |

---

## 6.3 Aturan Emas Menulis JSX

### Aturan 1: Wajib Memiliki Satu Induk Element (Single Parent)
Kode JSX di dalam return tidak boleh melayang sendirian tanpa pembungkus tunggal.

```jsx
// SALAH ❌ (Akan memicu error compile)
return (
  <h1>Judul</h1>
  <p>Deskripsi</p>
);

// BENAR ✅ (Dihubungkan dalam satu pembungkus parent)
return (
  <div>
    <h1>Judul</h1>
    <p>Deskripsi</p>
  </div>
);
```
> **Tips:** Jika kalian tidak ingin menambahkan tag `<div>` ekstra di halaman HTML (agar tidak merusak susunan CSS), gunakan **React Fragment** `<> ... </>` sebagai pembungkus bayangan.

---

## 6.4 Menulis Kode JavaScript di dalam JSX dengan `{}`

Kurung kurawal `{}` adalah "jembatan gaib" di JSX. Apa pun yang kalian tulis di dalam `{}` akan dibaca sebagai kode JavaScript dinamis.

```jsx
function Profil() {
  const nama = "Budi Santoso";
  const usia = 20;

  return (
    <div>
      {/* 1. Menampilkan isi variabel */}
      <h2>Nama: {nama}</h2> 
      
      {/* 2. Operasi matematika */}
      <p>Usia tahun depan: {usia + 1} tahun</p> 
      
      {/* 3. Menjalankan fungsi bawaan string */}
      <p>Huruf besar: {nama.toUpperCase()}</p>
      
      {/* 4. Operator Ternary (Pengondisian) */}
      <p>Status: {usia >= 18 ? "Dewasa" : "Anak-anak"}</p>
    </div>
  );
}
```
> **Batasan Penting:** Kalian hanya boleh menulis **Ekspresi** (nilai yang menghasilkan sesuatu) di dalam `{}`. Kalian **tidak boleh** menulis *Statement* (seperti pernyataan `if` lengkap, `for`, atau `while` loop) di dalam kurung kurawal tersebut.

---

## 6.5 Menulis Komentar di dalam JSX

Menulis komentar satu baris menggunakan `//` di dalam area JSX akan memicu error karena akan dianggap sebagai teks biasa di layar. Gunakan format komentar khusus ini:

```jsx
return (
  <div>
    {/* Ini adalah komentar satu baris di dalam JSX */}
    <h1>Selamat Belajar</h1>
    
    {/* 
       Ini komentar
       multi-baris di JSX
    */}
  </div>
);
```

---

## 📝 Kesimpulan Modul 3

Berikut adalah poin-poin kesimpulan penting yang telah kita bahas di Modul 3 ini:
1. **Definisi Komponen:** Potongan kecil antarmuka pengguna (UI) yang bersifat independen, bisa digunakan kembali (*reusable*), dan membagi kode aplikasi menjadi bagian-bagian teratur layaknya menyusun puzzle atau Lego.
2. **Aturan Komponen:** Wajib ditulis dengan penulisan huruf besar di awal (PascalCase), mengembalikan return JSX, dan harus diexport-import agar dapat digunakan oleh file lain.
3. **Konsep JSX:** Singkatan dari JavaScript XML, yaitu perpanjangan sintaks JavaScript yang mempermudah penulisan HTML di dalam React. JSX dikompilasi secara otomatis menjadi fungsi `React.createElement`.
4. **Aturan Emas JSX:** Harus memiliki satu elemen induk (bisa menggunakan React Fragment `<> ... </>`), mewajibkan tag ditutup secara mandiri (*self-closing*), dan atribut style berupa objek JavaScript.
5. **Ekspresi JavaScript `{}`:** Kurung kurawal digunakan untuk menyisipkan variabel, logika ternary, operasi matematika, atau memetakan array menggunakan `.map()` di dalam JSX.

Hebat sekali! Kalian kini sudah memahami apa itu komponen dan bagaimana aturan koding menggunakan JSX. 

Di **Modul 4** nanti, kita akan belajar cara mengirimkan data dinamis antar komponen menggunakan fitur super penting bernama **Props**! Tetap semangat belajar kodingnya dan sampai jumpa di kelas berikutnya! 🚀
