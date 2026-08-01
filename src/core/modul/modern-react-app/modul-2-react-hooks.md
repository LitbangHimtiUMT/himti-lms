# MODUL 2: React Hooks (useState & useEffect)

Halo teman-teman! Selamat datang di **Modul 2**.

Sebelum kita melangkah lebih jauh untuk menarik data dari internet atau memindahkan halaman, ada satu konsep inti di React yang wajib kalian kuasai: **React Hooks**. Tanpa Hooks, aplikasi kita akan menjadi statis dan kaku.

Pada modul ini, kita akan fokus mempelajari dua Hooks paling penting di React: **`useState`** dan **`useEffect`**. Mari kita kupas tuntas dengan cara yang paling santai dan mudah dipahami!

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Memahami perbedaan mendasar antara variabel biasa dengan *State* di React.
2. Menggunakan hook `useState` untuk menyimpan dan memperbarui data dinamis di antarmuka.
3. Memahami konsep efek samping (*side effects*) dalam pengembangan web.
4. Menggunakan hook `useEffect` untuk memicu penarikan data ketika komponen pertama kali dibuka (*component mounting*).
5. Mengatur *dependency array* di `useEffect` secara tepat.

---

## 2.1 Mengapa Kita Butuh State?

Variabel JavaScript biasa (`let` atau `const`) tidak dapat memicu perubahan tampilan di layar saat nilainya berubah. Di React, kita membutuhkan jenis variabel khusus yang dapat didengar oleh React untuk memicu proses render ulang (*re-render*). Variabel khusus ini disebut **State**.

```text
┌─────────────────────────────────────────────────────────────┐
│                 ALUR RENDER STATE DI REACT                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   State Berubah  ──>  React Mendeteksi  ──>  Layar di-update│
│   (Misal: data +1)    Perubahan Data         (Secara Instan)│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2.2 useState Hook (Menyimpan Data di Komponen)

`useState` adalah hook yang paling sering digunakan. Ia digunakan untuk membuat dan mengelola state lokal di dalam suatu komponen.

### Sintaks Dasar:
```jsx
import { useState } from 'react';

const [data, setData] = useState(nilaiAwal);
```
* **`data`**: Variabel state yang menyimpan nilai aktif kalian saat ini.
* **`setData`**: Fungsi khusus yang digunakan untuk mengubah nilai variabel `data`.
* **`nilaiAwal`**: Nilai pertama kali saat komponen dimuat.

### Contoh Kasus: Penghitung Klik (Counter)
Mari kita lihat kode sederhana berikut untuk memahami cara kerjanya:

```jsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";

function Counter() {
  // Membuat state bernama 'count' dengan nilai awal 0
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 text-center space-y-4">
      <p className="text-lg">Kalian sudah mengklik sebanyak: <span className="font-bold text-indigo-650">{count}</span> kali</p>
      
      {/* Ketika diklik, panggil setCount untuk menambah nilai count */}
      <Button onClick={() => setCount(count + 1)}>
        Klik Saya
      </Button>
    </div>
  );
}
```

---

## 2.3 useEffect Hook (Menangani Efek Samping)

**Efek Samping (Side Effects)** adalah proses yang terjadi di luar kendali rendering murni React. Contoh paling umum adalah **mengambil data dari internet (fetch API)**, memanipulasi DOM secara manual, atau memasang timer.

Kita menggunakan **`useEffect`** untuk memberi tahu React kapan proses efek samping tersebut harus dijalankan.

### Sintaks Dasar:
```jsx
import { useEffect } from 'react';

useEffect(() => {
  // Blok kode efek samping kalian di sini
}, [dependencyArray]);
```

### Memahami Dependency Array (Kunci Jalannya Efek)
* **Kasus A: Tanpa Dependency Array**
  ```javascript
  useEffect(() => {
    console.log("Dijalankan setiap kali ada komponen yang di-render ulang!");
  });
  ```
* **Kasus B: Empty Dependency Array `[]` (Paling Sering Digunakan untuk API)**
  ```javascript
  useEffect(() => {
    console.log("HANYA dijalankan sekali, saat komponen pertama kali muncul di layar!");
  }, []); // Array kosong
  ```
* **Kasus C: Array dengan Variabel `[state]`**
  ```javascript
  useEffect(() => {
    console.log("Dijalankan di awal, dan akan jalan lagi jika nilai 'state' berubah!");
  }, [state]);
  ```

---

## 2.4 Contoh Praktik Gabungan `useState` & `useEffect`

Mari kita bayangkan simulasi mengambil profil mahasiswa dari database simulasi (asinkron):

```jsx
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi penarikan data dari server (memakan waktu 2 detik)
    const timer = setTimeout(() => {
      setStudent({
        name: "Rifki Prasetyo",
        major: "Teknik Informatika",
        gpa: 3.85
      });
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Pembersihan memory (cleanup)
  }, []); // Efek hanya dipicu sekali di awal

  if (loading) {
    return <div className="text-center py-10">Memuat profil mahasiswa...</div>;
  }

  return (
    <Card className="w-80 mx-auto">
      <CardHeader>
        <CardTitle>{student.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-slate-600">
        <p>Jurusan: {student.major}</p>
        <p>IPK Kumulatif: ⭐ {student.gpa}</p>
      </CardContent>
    </Card>
  );
}
```

---

## 📝 Kesimpulan Modul 2

Berikut adalah poin-poin kesimpulan penting dari pembelajaran kita hari ini:
1. **Fungsi State:** Jenis variabel khusus di React yang dapat memicu pembaruan antarmuka visual secara instan saat nilainya berubah.
2. **Aturan useState:** Kita harus menggunakan fungsi updater (seperti `setCount`) untuk mengubah nilai state, bukan dengan menuliskannya langsung (`count = count + 1` ❌).
3. **Fungsi useEffect:** Mengisolasi kode yang berurusan dengan sistem luar (seperti mengambil data API) agar berjalan tertib di luar render utama.
4. **Fungsi Dependency Array:** Menentukan pemicu jalannya efek samping. Array kosong `[]` menandakan efek hanya berjalan sekali di awal pemuatan komponen.

Selamat! Kalian kini sudah memahami fondasi data paling krusial di React. 

Di **Modul 3** berikutnya, kita akan menggunakan modal pengetahuan state ini untuk mempelajari cara berpindah-pindah halaman secara dinamis menggunakan **React Router v7**! Tetap semangat belajar coding-nya! 🚀
