# MODUL 5: Public API Integration

Halo teman-teman! Selamat datang di **Modul 5**.

Sebuah aplikasi web modern akan jauh lebih berguna ketika dapat terhubung dengan data eksternal di internet. Pada modul ini, kita akan mempelajari bagaimana cara melakukan pertukaran data antara aplikasi React kita dengan server backend luar menggunakan **REST API** dan **Fetch API** bawaan JavaScript.

Sebagai studi kasus nyata, kita akan mengintegrasikan **REST Countries API v5** dengan sistem keamanan **Bearer Token** untuk membangun aplikasi **Country Explorer** interaktif lengkap dengan pencarian, paginasi, dan penyaringan regional.

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Menjelaskan konsep API, HTTP Request, HTTP Response, dan format data JSON.
2. Memahami perbedaan HTTP Method utama (`GET`, `POST`, `PUT`, `DELETE`).
3. Menggunakan `Fetch API` dengan menyertakan custom header **Authorization Bearer Token**.
4. Melakukan optimasi transfer data menggunakan query parameters: `limit`, `offset`, `q`, `response_fields`, dan `pretty`.
5. Menangani status visual pemuatan: *Loading State* (Skeleton), *Error State*, dan *Empty State*.

---

## 5.1 Apa itu API & REST?

**API (Application Programming Interface)** adalah aturan dan protokol yang menjembatani dua aplikasi komputer berbeda untuk berkomunikasi dan bertukar informasi.

### Cara Kerja REST API:
Komunikasi pada REST API menggunakan protokol web standar (HTTP) yang berjalan melalui dua aksi utama:
1. **Request (Permintaan):** Dikirim oleh aplikasi React kalian ke server API. Request berisi alamat tujuan (*endpoint*), jenis aksi (*HTTP Method*), otentikasi, dan data opsional.
2. **Response (Jawaban):** Dikirim oleh server API kembali ke React. Response berisi status kelancaran (*HTTP Status Code*) dan data yang diminta (biasanya dalam format **JSON**).

```text
┌─────────────────────────────────────────────────────────────┐
│                    CARA KERJA API                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  React App (Frontend)  ── Request ──>  REST Countries API   │
│  (Mengirim URL, Token, Method)         (v5 Engine Backend)  │
│                                                             │
│  React App (Frontend)  <── Response ─  REST Countries API   │
│  (Menerima Status & JSON)              (Data Negara-negara) │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5.2 Pentingnya Keamanan API: Bearer Token Authentication

Pada API tingkat produksi industri, server membatasi akses agar tidak disalahgunakan. Pengembang wajib menyertakan **Bearer Token** di dalam request headers untuk membuktikan bahwa request tersebut legal dan memiliki hak akses.

Sesuai instruksi resmi, token otentikasi kita untuk REST Countries API v5 adalah:
`rc_live_11b0d9a0acf547ebb9533897f54cacfa`

### Contoh Pengiriman Headers di Fetch:
```javascript
fetch('https://api.restcountries.com/countries/v5', {
  headers: {
    'Authorization': 'Bearer rc_live_11b0d9a0acf547ebb9533897f54cacfa'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

---

## 5.3 Query Parameters Penting di REST Countries API v5

Untuk mempercepat loading aplikasi, kita harus meminimalkan ukuran data yang diunduh dari server menggunakan query parameters di ujung URL:

1. **Paginasi (`limit` & `offset`):**
   * Paginasi membagi ribuan data menjadi halaman-halaman kecil.
   * `limit`: Jumlah data yang diambil per request (Default: 25, Maksimal: 100).
   * `offset`: Berapa banyak data yang dilewati (untuk mengambil halaman berikutnya).
   * Contoh: `https://api.restcountries.com/countries/v5?limit=25&offset=25` (mengambil halaman kedua).
   
2. **Pencarian Bebas (`q`):**
   * Menggunakan parameter `q` untuk mencari data negara secara fleksibel di semua field text.
   * Contoh: `https://api.restcountries.com/countries/v5?q=indonesia`
   
3. **Penyaringan Bidang (`response_fields`):**
   * Membatasi field data apa saja yang dikembalikan oleh API (sangat menghemat kuota!).
   * Contoh: `?response_fields=names.common,capital,region,population,flag.emoji`
   
4. **Pretty-print (`pretty`):**
   * Merapikan format tampilan JSON ketika diuji di browser/terminal.
   * Contoh: `?pretty=true` atau `?pretty`

---

## 5.4 Praktik: Membangun Aplikasi Country Explorer

Mari kita buat fitur interaktif penjelajah negara menggunakan **REST Countries API v5** dan komponen `shadcn/ui`.

### Step 1: Membuat Service API (`src/services/countryService.js`)
Buat berkas baru khusus untuk menampung fungsi pemanggilan API ke server dengan Authorization Token:

```javascript
// src/services/countryService.js
const API_BASE_URL = 'https://api.restcountries.com/countries/v5';
const AUTH_TOKEN = 'rc_live_11b0d9a0acf547ebb9533897f54cacfa';

// Setup default headers untuk otentikasi
const fetchHeaders = {
  'Authorization': `Bearer ${AUTH_TOKEN}`
};

// Ambil data negara dengan paginasi dan pembatasan field
export async function getCountries(limit = 12, offset = 0, region = '') {
  try {
    let url = `${API_BASE_URL}?limit=${limit}&offset=${offset}&response_fields=names.common,capital,region,population,flag.emoji&pretty`;
    if (region) {
      url += `&region=${region}`;
    }
    
    const response = await fetch(url, { headers: fetchHeaders });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
}

// Cari negara berdasarkan nama / kata kunci pencarian bebas (q)
export async function searchCountries(query) {
  try {
    const url = `${API_BASE_URL}?q=${encodeURIComponent(query)}&response_fields=names.common,capital,region,population,flag.emoji&pretty`;
    const response = await fetch(url, { headers: fetchHeaders });
    if (!response.ok) {
      throw new Error(`Gagal mencari negara! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching countries:', error);
    throw error;
  }
}
```

### Step 2: Membuat Komponen Kartu Negara (`src/components/CountryCard.jsx`)
Gunakan komponen `Card` dan `Badge` milik `shadcn/ui` untuk mendesain kartu informasi negara:

```jsx
// src/components/CountryCard.jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function CountryCard({ country }) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group">
      {/* Bendera Emoji Negara */}
      <div className="h-32 bg-slate-100 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
        {country.flag?.emoji || "🏳️"}
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-md font-bold tracking-tight text-slate-800 line-clamp-1">
            {country.names?.common || "Tidak diketahui"}
          </CardTitle>
          <Badge variant="secondary" className="text-[10px]">{country.region}</Badge>
        </div>
        <CardDescription className="text-xs">Ibu Kota: {country.capital || "-"}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-xs text-slate-500 space-y-1">
        <div className="flex justify-between">
          <span>Populasi:</span>
          <span className="font-bold text-slate-700">
            {new Intl.NumberFormat().format(country.population || 0)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default CountryCard;
```

### Step 3: Membuat Komponen Halaman Penjelajah Negara (`src/pages/Countries.jsx`)
Komponen ini bertugas mengelola siklus hidup data: dari memicu loading skeleton, menangani error koneksi, hingga menampilkan daftar negara.

```jsx
// src/pages/Countries.jsx
import { useState, useEffect } from 'react';
import { getCountries, searchCountries } from '../services/countryService';
import CountryCard from '../components/CountryCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    loadAllCountries();
  }, [selectedRegion]);

  async function loadAllCountries() {
    try {
      setLoading(true);
      const data = await getCountries(24, 0, selectedRegion);
      setCountries(data);
      setError(null);
    } catch (err) {
      setError("Koneksi gagal. Pastikan Token Autentikasi dan API Server valid.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadAllCountries();
      return;
    }

    try {
      setIsSearching(true);
      setLoading(true);
      const data = await searchCountries(searchQuery);
      setCountries(data);
      setError(null);
    } catch (err) {
      setCountries([]); 
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }

  // 1. LOADING STATE: Menampilkan Skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Card key={i} className="h-64 p-4 space-y-4 animate-pulse">
            <div className="h-32 bg-slate-200 rounded-xl" />
            <div className="h-4 bg-slate-200 rounded w-2/3" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  // 2. ERROR STATE
  if (error) {
    return (
      <div className="text-center py-20">
        <span className="text-5xl">📶</span>
        <h3 className="text-lg font-bold text-slate-800 mt-4">{error}</h3>
        <Button onClick={loadAllCountries} className="mt-4">Coba Lagi</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">Aplikasi Penjelajah Negara</h2>
        <p className="text-slate-500 text-xs">Mencari dan memfilter data negara menggunakan REST Countries API v5.</p>
      </div>

      {/* Kolom Pencarian */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <Input 
          type="text" 
          placeholder="Masukkan nama negara (misal: Canada)..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-xl"
        />
        <Button type="submit" disabled={isSearching} className="rounded-xl">
          <Search className="w-4 h-4 mr-2" /> Cari
        </Button>
      </form>

      {/* Pilihan Region */}
      <div className="flex justify-center gap-2 flex-wrap">
        {['', 'Asia', 'Europe', 'Americas', 'Africa', 'Oceania'].map((region) => (
          <Button
            key={region}
            variant={selectedRegion === region ? 'default' : 'outline'}
            onClick={() => { setSelectedRegion(region); setSearchQuery(''); }}
            className="text-xs rounded-xl"
          >
            {region || 'Semua'}
          </Button>
        ))}
      </div>

      {/* Grid Negara */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.map((country, idx) => (
          <CountryCard key={idx} country={country} />
        ))}
      </div>
    </div>
  );
}

export default Countries;
```

---

## 📝 Kesimpulan Modul 5

Berikut adalah poin-poin kesimpulan penting dari pembelajaran integrasi API kita hari ini:
1. **Peran REST API:** REST API mempermudah program frontend React untuk meminta atau mengirim data terstruktur ke server luar melalui protokol web HTTP.
2. **Bearer Token Authentication:** Menyertakan token otentikasi di header request (`Authorization: Bearer <token>`) merupakan standar industri wajib untuk mengamankan akses API.
3. **Penyaringan Bidang (`response_fields`):** Mengoptimalkan performa dengan membatasi respons JSON hanya memuat bidang penting seperti `names.common` dan `flag.emoji`.
4. **Paginasi (`limit` & `offset`):** Membantu mengontrol ukuran beban transfer data agar proses rendering halaman aplikasi tetap ringan dan cepat.

Hebat sekali! Kalian sudah bisa menghubungkan aplikasi React kalian dengan data nyata yang terproteksi aman di internet. 

Di **Modul 6** selanjutnya, kita akan menaikkan level aplikasi kita menjadi cerdas dengan menyematkan fitur kecerdasan buatan dari Google menggunakan **Gemini AI API**! Tetap bersemangat! 🚀
