# MODUL 3: React Router

Halo rekan-rekan! Selamat datang di **Modul 3**.

Setelah di modul sebelumnya kita menguasai konsep React Hooks untuk mengelola data lokal, sekarang saatnya kita mempelajari cara membagi antarmuka web kita menjadi banyak halaman dinamis tanpa memicu pemuatan ulang (*reload*) browser menggunakan library standar industri: **React Router v7** (versi terbaru).

Mari kita bahas kodingnya bersama-sama!

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Menjelaskan apa itu React Router dan fungsinya dalam aplikasi SPA.
2. Menginstal dan mengkonfigurasi React Router v7 di proyek React.
3. Menggunakan komponen `BrowserRouter`, `Routes`, dan `Route` untuk menyusun rute.
4. Membuat tombol navigasi menggunakan `Link` dan `NavLink`.
5. Memasang `useNavigate` untuk memicu navigasi terprogram (programatik).
6. Membuat halaman *Not Found (404)* untuk menangani URL salah.

---

## 3.1 Apa itu React Router?

Secara bawaan, aplikasi React hanya berputar pada satu halaman HTML saja. **React Router** adalah library eksternal wajib yang membantu kita menyimulasikan banyak halaman web berdasarkan rute URL browser.

React Router melacak alamat URL, menyinkronkannya dengan tampilan antarmuka (UI), dan menangani navigasi tombol *back/forward* browser secara mulus tanpa memicu pemuatan ulang halaman.

| Masalah Aplikasi Statis | Solusi React Router |
| :--- | :--- |
| Aplikasi hanya memiliki satu rute URL statis | Memungkinkan pendaftaran banyak URL dinamis. |
| Tombol back/forward browser merusak aplikasi | Menyinkronkan riwayat browser secara aman. |
| Tautan menu memicu kedipan layar (*reload*) | Navigasi instan menggunakan komponen `Link`. |

---

## 3.2 Instalasi React Router v7

React Router v7 merupakan versi terbaru yang menyatukan package `react-router-dom` ke dalam satu package induk: **`react-router`**. Kita hanya perlu menginstal satu package ini saja.

### Langkah Instalasi:
Matikan server development kalian di terminal (`Ctrl + C`), lalu jalankan perintah instalasi berikut:
```bash
npm install react-router
```

Perintah di atas akan menambahkan library ke folder `node_modules` dan mencatatnya ke konfigurasi `package.json`.

---

## 3.3 BrowserRouter: Pintu Masuk Routing

`BrowserRouter` adalah komponen pembungkus utama yang memberikan kemampuan pelacakan navigasi berbasis HTML5 History API kepada seluruh aplikasi React kita.

### Lokasi Terbaik Memasang BrowserRouter
Pasanglah komponen ini di file **`src/main.jsx`** (entry point) agar seluruh komponen anak di bawah `App.jsx` mendapatkan akses routing secara global:

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router'; // Impor di sini
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
```

---

## 3.4 Routes dan Route: Menentukan Peta Halaman

Setelah aplikasi dibungkus oleh `BrowserRouter`, kita bisa mendaftarkan peta alamat URL halaman kita di file **`src/App.jsx`** menggunakan pasangan komponen `Routes` dan `Route`.

* **`Routes`**: Wadah penyaring rute. Elemen ini bertugas mencocokkan URL aktif browser dengan daftar rute di dalamnya.
* **`Route`**: Baris rute tunggal yang mendefinisikan URL (`path`) dan komponen halaman (`element`) yang harus muncul.

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
    return (
        <Routes>
            {/* path "/" mewakili halaman utama / beranda */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    );
}

export default App;
```

---

## 3.5 Navigasi Link vs Tag Jangkar `<a>`

Di HTML biasa, kita berpindah halaman menggunakan tag `<a href="...">`. **Jangan pernah menggunakan tag `<a>` di React SPA!** Karena tag `<a>` akan memaksa browser memuat ulang seluruh aset dari awal (layar memutih).

Gunakan komponen **`Link`** dari React Router untuk melakukan transisi halaman instan:

```jsx
import { Link } from 'react-router';

function Navigation() {
    return (
        <nav className="flex gap-4">
            {/* Menggunakan 'to' sebagai pengganti 'href' */}
            <Link to="/">Beranda</Link>
            <Link to="/about">Tentang Kami</Link>
        </nav>
    );
}
```

---

## 3.6 Menandai Menu Aktif dengan NavLink

`NavLink` adalah komponen khusus turunan `Link` yang memiliki kemampuan cerdas mendeteksi apakah alamat URL tujuan sedang aktif diakses oleh user. Kita bisa memanfaatkannya untuk mewarnai menu aktif di Navbar secara otomatis.

```jsx
import { NavLink } from 'react-router';

function Navbar() {
    return (
        <nav className="flex gap-4">
            <NavLink 
                to="/" 
                className={({ isActive }) => 
                    `px-3 py-2 rounded-xl transition ${
                        isActive 
                            ? 'bg-indigo-650 text-white font-bold' 
                            : 'text-slate-600 hover:bg-slate-100'
                    }`
                }
                end // Memastikan menu aktif hanya jika URL pas sejajar
            >
                Home
            </NavLink>
        </nav>
    );
}
```

---

## 3.7 Navigasi Programatik dengan `useNavigate`

Ada kalanya kita ingin mengalihkan halaman user bukan karena mengklik link menu, melainkan setelah melakukan tindakan tertentu (misal: otomatis pindah ke Dashboard setelah berhasil melakukan login form). Ini disebut **Navigasi Programatik**.

Kita bisa memanfaatkan hook **`useNavigate`**:

```jsx
import { useNavigate } from 'react-router';

function LoginForm() {
    const navigate = useNavigate();
    
    const handleLogin = (e) => {
        e.preventDefault();
        // Logika autentikasi...
        navigate('/dashboard'); // Alihkan halaman secara otomatis
    };
    
    return (
        <button onClick={handleLogin}>Masuk Aplikasi</button>
    );
}
```
> **Tips:** Kalian juga bisa melakukan perintah kembali ke halaman sebelumnya menggunakan kode `navigate(-1)`.

---

## 3.8 Halaman Kesalahan 404 (Not Found)

Untuk menangani situasi di mana user mengetikkan alamat URL sembarangan yang tidak terdaftar, kita wajib menyediakan rute penangkap kesalahan (*wildcard path*) berupa tanda bintang `*` di baris terbawah daftar rute.

```jsx
// src/App.jsx
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    {/* Rute tanggap darurat 404 wajib diletakkan paling bawah */}
    <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 3.9 Nested Layout & Outlet

Untuk menghindari penulisan komponen `Navbar` dan `Footer` berulang-ulang di setiap file halaman, kita bisa membuat struktur **Nested Layout** menggunakan komponen **`Outlet`**.

`Outlet` bertindak sebagai penampung bayangan tempat komponen anak diletakkan.

```jsx
// src/components/Layout.jsx
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow p-6">
                <Outlet /> {/* Halaman anak akan muncul di sini */}
            </main>
            <Footer />
        </div>
    );
}
export default Layout;
```

Cara mendaftarkannya di `App.jsx`:
```jsx
// src/App.jsx
<Routes>
    {/* Layout membungkus rute anak */}
    <Route path="/" element={<Layout />}>
        <Route index element={<Home />} /> {/* Rute beranda default */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
    </Route>
</Routes>
```

---

## 📝 Kesimpulan Modul 3

Berikut adalah poin-poin kesimpulan penting dari pembelajaran React Router v7 kita hari ini:
1. **React Router v7:** Library utama untuk memetakan antarmuka multi-halaman di aplikasi SPA tanpa kedipan reload browser.
2. **Setup Global:** Komponen `BrowserRouter` wajib diletakkan pada level teratas (`main.jsx`) membungkus seluruh aplikasi.
3. **Peta Rute:** Pasangan `Routes` dan `Route` di dalam `App.jsx` bertugas memetakan segmen URL ke elemen halaman visual yang sesuai.
4. **Navigasi Bersih:** Hindari tag `<a>` biasa, gunakan komponen `Link` untuk navigasi instan dan `NavLink` untuk menu navigasi interaktif.
5. **Navigasi Programatik:** Hook `useNavigate` digunakan untuk memicu perpindahan halaman secara otomatis dari blok kode fungsi.

Bagus sekali! Kita sudah menguasai cara membagi halaman web kita secara dinamis menggunakan React Router. 

Di **Modul 4** berikutnya, kita akan belajar mempercantik tampilan halaman multi-halaman tersebut secara instan menggunakan pustaka komponen premium industri: **shadcn/ui**! Tetap semangat belajar koding-nya! 🚀
