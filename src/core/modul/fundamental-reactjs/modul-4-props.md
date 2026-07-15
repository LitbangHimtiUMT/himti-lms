# MODUL 4: Mengirim Data dengan Props

Halo teman-teman mahasiswa sekalian! Selamat datang di **Modul 4**.

Kemarin kita sudah bisa membuat komponen visual sederhana dan memahami cara menulis kode menggunakan JSX. Namun, komponen yang kita buat kemarin nilainya masih statis (itu-itu saja). Tombol yang kita panggil berkali-kali akan terus menampilkan teks yang sama. 

Nah, hari ini kita akan mempelajari konsep super penting bernama **Props** (singkatan dari *Properties*). Dengan Props, kita bisa menyulap komponen kita menjadi dinamis dan fleksibel sehingga tampilannya bisa disesuaikan dengan data yang dikirim dari luar!

Mari kita pelajari bersama-sama!

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Menjelaskan definisi dan fungsi utama `Props` di React.
2. Mengirimkan berbagai tipe data (string, number, boolean, array, dll.) sebagai props dari komponen induk (*parent*).
3. Menerapkan teknik *destructuring* untuk menerima props dengan lebih bersih di komponen anak (*child*).
4. Menyiapkan *default props* untuk menangani data kosong.
5. Memahami aturan mutlak bahwa props bersifat *Read-Only* (tidak bisa dimutasi).

---

## 7.1 Apa itu Props?

Secara harfiah, **Props** adalah singkatan dari *Properties* (properti). Di React, props adalah sekumpulan data yang dikirimkan dari **Parent Component** (Komponen Induk) menuju ke **Child Component** (Komponen Anak).

### Analogi Sederhana: Cetakan Kue & Bahan-Bahan
Coba bayangkan kalian sedang membuat kue mangkok:
- **Komponen:** Cetakan kue mangkok itu sendiri. Bentuk cetakannya sama, tetapi rasa dan warnanya bisa bervariasi.
- **Props:** Bahan atau bumbu yang kalian masukkan (seperti pewarna merah, rasa cokelat, atau toping keju).
- **Hasil Render:** Kue mangkok yang sudah matang dengan warna dan rasa yang berbeda-beda tergantung bahan yang dimasukkan ke cetakan.

```text
┌───────────────────────┐
│     CETAKAN KUE       │  <-- Komponen (Template)
│  (Menerima Rasa/Warna)│
└───────────┬───────────┘
            │  <-- Diisi bahan: Tepung Cokelat / Stroberi (Props)
            ▼
┌───────────────────────┐
│ KUE COKELAT / PINK    │  <-- Hasil UI di Browser
└───────────────────────┘
```

---

## 7.2 Cara Mengirimkan Props

Mengirim props sangat mirip seperti menuliskan atribut pada tag HTML biasa.

```jsx
// Mengirim props dari App.jsx (Parent)
function App() {
  return (
    <div className="flex gap-4 p-8">
      {/* Mengirim prop bernama 'nama' dengan nilai string */}
      <Welcome name="Budi" />
      <Welcome name="Andi" />
      
      {/* Mengirim tipe data non-string wajib dibungkus kurung kurawal {} */}
      <Card
        title="Belajar React"
        count={10}             // Tipe Number
        isActive={true}        // Tipe Boolean
        skills={['JS', 'React']} // Tipe Array
      />
    </div>
  );
}
```

---

## 7.3 Cara Menerima Props di Komponen Anak

Ada beberapa metode untuk menerima data props yang dikirimkan:

### Cara 1: Menggunakan Parameter `props` (Object)
Secara bawaan, semua data yang dikirim akan dibungkus ke dalam satu parameter object bernama `props`.

```jsx
function Welcome(props) {
  // props adalah sebuah object, panggil nilainya menggunakan titik (.)
  return <h1>Halo, {props.name}!</h1>;
}
```

### Cara 2: Menggunakan Destructuring (Sangat Direkomendasikan ⭐)
Dibanding menulis `props.name` berulang kali, kita bisa langsung "membongkar" properti yang dibutuhkan langsung pada bagian parameter fungsi. Cara ini jauh lebih bersih dan populer di kalangan developer.

```jsx
// Mengambil langsung properti 'name' dari object props
function Welcome({ name }) {
  return <h1>Halo, {name}!</h1>;
}
```

### Cara 3: Menambahkan Nilai Cadangan (Default Props)
Bagaimana jika komponen induk lupa mengirimkan data? Agar aplikasi kita tidak rusak atau kosong, kita bisa memberikan nilai cadangan (*default value*) secara langsung saat melakukan destructuring.

```jsx
function Welcome({ name = "Tamu Misterius" }) {
  return <h1>Halo, {name}!</h1>;
}
```

---

## 7.4 Aturan Emas: Props bersifat Read-Only!

Satu hal yang wajib kalian catat dan ingat baik-baik: **Props tidak boleh diubah nilainya secara langsung di dalam komponen penerima (anak).**

React menganut filosofi **Pure Function** (Fungsi Murni), di mana sebuah komponen dilarang keras memodifikasi input yang diterimanya sendiri.

```jsx
// ❌ SALAH BESAR (Pasti memicu error atau merusak alur data React)
function Welcome({ name }) {
  name = "Andi"; // ERROR! Dilarang mengubah data props secara paksa.
  return <h1>Halo, {name}!</h1>;
}

// ✅ BENAR (Gunakan props hanya untuk dibaca)
function Welcome({ name }) {
  return <h1>Halo, {name}!</h1>;
}
```
> **Lalu bagaimana jika datanya perlu diubah secara dinamis saat tombol diklik?**
> Jika data tersebut harus bisa berubah di dalam komponen itu sendiri, kita harus menyimpannya di dalam **State** (bukan Props) menggunakan hook `useState`. Perbedaan mendasarnya adalah:
> - **Props:** Data kiriman dari luar (seperti alamat kosan yang dikasih tahu orang tua, kalian tidak bisa gonta-ganti alamat tersebut seenaknya).
> - **State:** Data milik internal komponen itu sendiri yang bisa diubah kapan saja (seperti isi dompet kalian yang bisa bertambah atau berkurang).

---

## 📝 Kesimpulan Modul 4

Mari kita tinjau kembali poin-poin kesimpulan penting dari pembelajaran Props kita hari ini:
1. **Definisi Props:** Singkatan dari *Properties*, yaitu data yang dialirkan secara searah dari *Parent Component* (Induk) menuju *Child Component* (Anak).
2. **Komponen Dinamis:** Dengan menggunakan props, satu cetakan komponen yang sama dapat menghasilkan tampilan visual dan isi data yang bervariasi sesuai data kiriman.
3. **Menerima Props:** Kita bisa menggunakan parameter object `props`, atau menggunakan teknik bongkar-pasang **Destructuring** `{ propName }` yang lebih ringkas dan direkomendasikan.
4. **Sifat Read-Only:** Props mutlak bersifat tidak bisa diubah (*immutable*) oleh komponen penerima untuk mematuhi prinsip *Pure Function*.
5. **Perbedaan Props vs State:** Props berasal dari luar komponen dan tidak bisa dimutasi secara lokal, sedangkan State dikelola dari dalam komponen itu sendiri untuk mengontrol interaksi dinamis.

Kerja bagus teman-teman! Kalian sekarang sudah menguasai cara mengalirkan data dinamis dari komponen induk ke komponen anak menggunakan Props.

Di **Modul 5** nanti, kita akan belajar teknik mewarnai dan menghias komponen React kita secara instan menggunakan utilitas framework CSS terpopuler, yaitu **Tailwind CSS**! Tetap semangat belajar kodingnya dan sampai jumpa di kelas berikutnya! 🚀
