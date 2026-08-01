# MODUL 7: Mini Project (AI Country Explorer)

Selamat kepada kalian karena telah sampai di **Modul 7 (Modul Terakhir)** dari program pembelajaran Modern React Application Development!

Hari ini adalah hari pembuktian keterampilan kalian. Tugas kalian hari ini adalah menyatukan seluruh pilar teknologi modern yang telah dipelajari—**React Router v7**, **shadcn/ui**, **REST Countries API v5 (dengan Bearer Token Auth)**, dan **Gemini API**—ke dalam sebuah aplikasi utuh berskala portfolio bernama **AI Country Explorer**.

Mari kita bangun proyek akhir kita dengan detail dan terstruktur!

---

## 🎯 Sasaran Mini Project
Melalui mini project mandiri ini, kalian diharapkan mampu:
1. Membangun aplikasi React multi-halaman yang dinamis dan responsif.
2. Mengintegrasikan komponen antarmuka premium siap pakai dari `shadcn/ui`.
3. Menarik data negara dari *REST Countries API v5* secara asinkron dengan header otentikasi Bearer Token.
4. Menghubungkan asisten obrolan pintar berbasis *Gemini AI API* secara interaktif.
5. Menyajikan antarmuka ramah pengguna dengan penanganan visual loading, error, dan data kosong.

---

## 7.1 Spesifikasi Fitur Utama

Aplikasi **AI Country Explorer** yang kalian bangun harus memiliki minimal 3 halaman utama:

### 1. Halaman Beranda (Home Page - `/`)
* Menampilkan *Hero section* interaktif yang memikat tentang eksplorasi dunia.
* Tombol CTA (*Call to Action*) yang mengarahkan user menuju halaman daftar negara (`/countries`).
* Penjelasan singkat mengenai fitur-fitur utama aplikasi.

### 2. Halaman Daftar Negara (Countries Page - `/countries`)
* Menarik dan menyajikan daftar seluruh negara di dunia dari **REST Countries API v5**.
* Menyediakan fitur pencarian negara secara dinamis menggunakan input teks.
* Memiliki indikator loading skeleton saat menunggu data, alert jika terjadi kegagalan jaringan, dan pesan kosong jika pencarian tidak membuahkan hasil.

### 3. Halaman Asisten AI (AI Assistant Page - `/ai-assistant` atau Chat Widget)
* Menampilkan panel room chat interaktif bertenaga **Gemini API** (`gemini-3.6-flash`).
* Menyematkan *System Instruction* agar asisten AI memposisikan diri sebagai pakar geografi dunia yang ramah dan siap membantu menjawab pertanyaan mahasiswa seputar data geografi.

---

## 7.2 Arsitektur Folder Proyek yang Direkomendasikan

Agar kode kalian rapi, terorganisir, dan mudah dirawat, ikuti standarisasi folder industri berikut:

```text
ai-country-explorer/
├── src/
│   ├── components/
│   │   ├── ui/              ← Folder komponen shadcn/ui
│   │   ├── Layout.jsx       ← Komponen pembungkus halaman
│   │   ├── Navbar.jsx       ← Bilah navigasi atas
│   │   └── Footer.jsx       ← Bilah catatan kaki
│   ├── pages/
│   │   ├── Home.jsx         ← Halaman beranda
│   │   ├── Countries.jsx    ← Halaman penjelajah negara
│   │   └── NotFound.jsx     ← Halaman error 404
│   ├── services/
│   │   ├── countryService.js ← Service Fetch REST Countries v5 dengan Header Auth
│   │   └── geminiService.js  ← Service SDK Gemini AI
│   ├── App.jsx              ← Konfigurasi rute React Router v7
│   ├── main.jsx             ← Pintu masuk BrowserRouter
│   └── index.css            ← File CSS Tailwind global
├── .env                     ← Menyimpan API Key Gemini
├── components.json          ← Konfigurasi shadcn
└── tailwind.config.js       ← Konfigurasi Tailwind
```

---

## 7.3 Panduan Langkah Pengerjaan & Kode Contoh

### Tahap 1: Setup Proyek & Dependensi
1. Jalankan inisialisasi proyek baru dengan Vite:
   ```bash
   npm create vite@latest ai-country-explorer -- --template react
   cd ai-country-explorer
   npm install
   ```
2. Pasang library React Router v7 dan SDK Gemini AI:
   ```bash
   npm install react-router
   npm install @google/genai
   ```
3. Lakukan inisialisasi konfigurasi `shadcn/ui` beserta ikon-ikon Lucide:
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button card input badge dialog alert navigation-menu
   ```

### Tahap 2: Pengaturan Lingkungan Kunci API
1. Buat file `.env` di folder terluar proyek.
2. Masukkan API Key Google AI Studio kalian:
   ```text
   VITE_GEMINI_API_KEY=AIzaSyYourActualAPIKeyHere
   ```
3. Daftarkan file `.env` ke dalam berkas `.gitignore` demi keamanan.

### Tahap 3: Implementasi Service API Negara (`src/services/countryService.js`)
Gunakan token otentikasi bearer dan query parameter `response_fields` untuk meminimalkan beban bandwidth data negara:

```javascript
// src/services/countryService.js
const API_BASE_URL = 'https://api.restcountries.com/countries/v5';
const AUTH_TOKEN = 'rc_live_11b0d9a0acf547ebb9533897f54cacfa';

const headers = {
  'Authorization': `Bearer ${AUTH_TOKEN}`
};

export async function getAllCountries(limit = 24, offset = 0) {
  try {
    const response = await fetch(`${API_BASE_URL}?limit=${limit}&offset=${offset}&response_fields=names.common,capital,region,population,flag.emoji&pretty`, {
      headers
    });
    if (!response.ok) throw new Error('Gagal mengambil data negara');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function searchCountries(query) {
  try {
    const response = await fetch(`${API_BASE_URL}?q=${encodeURIComponent(query)}&response_fields=names.common,capital,region,population,flag.emoji&pretty`, {
      headers
    });
    if (!response.ok) throw new Error('Negara tidak ditemukan');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

### Tahap 4: Hubungkan Gemini AI Assistant (`src/services/geminiService.js`)
Inisialisasi client Google GenAI menggunakan API Key dari `import.meta.env.VITE_GEMINI_API_KEY` untuk obrolan geografi:

```javascript
// src/services/geminiService.js
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: API_KEY,
});

export async function askGeographyAI(question, countryContext = '') {
  try {
    const prompt = countryContext 
      ? `Negara Fokus: ${countryContext}\nPertanyaan: ${question}`
      : question;

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: prompt,
      system_instruction: `
        Kamu adalah asisten ahli geografi dunia yang sangat pintar dan ramah.
        Tugas kamu adalah menjawab pertanyaan seputar negara, ibukota, populasi, budaya, dan data geografis lainnya.
        Jawablah menggunakan bahasa Indonesia yang santai, edukatif, dan mudah dipahami mahasiswa.
      `,
    });
    return interaction.output_text;
  } catch (error) {
    console.error(error);
    throw new Error('Gagal terhubung dengan asisten AI.');
  }
}
```

---

## 7.4 Kriteria Penilaian Ujian Akhir

| Aspek Penilaian | Bobot | Deskripsi Kriteria |
| :--- | :--- | :--- |
| **Fungsionalitas Program** | 30% | Halaman rute berfungsi, API v5 terhubung dengan token auth header, dan chat AI merespon dengan tepat. |
| **UX/UI & Desain** | 20% | Desain premium, rapi, menggunakan standard komponen `shadcn/ui`, dan fully responsive di layar HP. |
| **State & Error Handling** | 20% | Menangani visual Loading skeleton, Error alert, dan Empty State pencarian secara halus. |
| **Kualitas & Kerapian Kode** | 20% | Pemisahan folder clean, penulisan fungsi asinkron bersih, variabel dinamis terawat. |
| **Dokumentasi Proyek** | 10% | Menyusun berkas `README.md` cara setup proyek dan file `.env`. |

---

## 📝 Kesimpulan Akhir Pembelajaran

Selamat! Kalian telah menguasai pilar-pilar penting pengembangan aplikasi web modern:
1. **Pemahaman SPA & Routing:** Mengetahui cara memindahkan halaman antarmuka web instan tanpa perlu reload layar browser.
2. **Kekuatan Component Library:** Memanfaatkan `shadcn/ui` untuk meningkatkan efisiensi pengerjaan visual antarmuka berstandar premium.
3. **Konektivitas API Dunia Nyata:** Terbiasa menarik data dinamis asinkron dari internet (menggunakan REST Countries API v5 dengan Bearer Token).
4. **Sentuhan Kecerdasan Buatan:** Mampu merancang chatbot interaktif asisten belajar bertenaga Gemini AI.

Kerjakan mini project kalian dengan jujur, teliti, dan penuh eksplorasi kreatif. Karya portofolio ini akan menjadi bukti nyata kesiapan kalian melangkah ke dunia industri web developer profesional! 

Teruslah belajar, berkolaborasi, dan menembus batas kemampuan coding kalian! Sukses selalu! 🚀
