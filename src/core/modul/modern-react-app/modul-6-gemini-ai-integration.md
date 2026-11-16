# MODUL 6: Gemini AI Integration

Halo teman-teman! Selamat datang di **Modul 6**.

Pernahkah kalian membayangkan aplikasi web kalian memiliki kemampuan berdialog cerdas secara *real-time*? Hari ini, kita akan membawa aplikasi kita ke tingkat kecerdasan berikutnya dengan mengintegrasikannya ke model kecerdasan buatan terkuat milik Google menggunakan **Gemini API** — melalui backend milik kita sendiri, supaya API Key tidak pernah sampai ke browser.

Kita akan belajar cara membuat koneksi aman, memahami aspek keamanan kredensial, dan membangun **AI Study Assistant** interaktif yang siap membantu kalian belajar pemrograman.

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Menjelaskan fungsi dan cara kerja Gemini API.
2. Membuat API Key di Google AI Studio secara mandiri.
3. Menjelaskan kenapa API Key tidak boleh ada di kode frontend, dan menyimpannya dengan aman di sisi server menggunakan *Environment Variables* (`.env`).
4. Menginstal dan mengoperasikan SDK resmi Google `@google/genai` di backend, serta pola *proxy backend* untuk memanggilnya dari React.
5. Merancang teknik *Prompt Engineering* dasar menggunakan *System Instruction*.
6. Membangun antarmuka asisten AI interaktif dengan penanganan error.

---

## 6.1 Apa itu Gemini API?

**Gemini API** adalah layanan dari Google yang memberikan akses pengembang (developer) ke model kecerdasan buatan (GenAI) milik Google. Melalui API ini, aplikasi React kalian bisa melakukan tugas-tugas cerdas seperti:
* Menghasilkan atau meringkas teks tulisan.
* Menjawab pertanyaan konsultatif.
* Menganalisis potongan baris kode pemrograman (*debugging*).
* Menerjemahkan bahasa secara akurat.

Untuk kebutuhan belajar ini, kita akan menggunakan model **`gemini-3.6-flash`** karena responsnya yang sangat cepat, andal, dan memiliki kuota gratis yang melimpah untuk latihan (*free tier*).

---

## 6.2 Google AI Studio & API Key

Sebelum memanggil API dari backend, kita membutuhkan **API Key** (kunci autentikasi). Kunci ini bisa diibaratkan sebagai username & password unik proyek kalian untuk menggunakan layanan AI Google.

### Cara Mendapatkan API Key:
1. Kunjungi platform pengujian **[Google AI Studio](https://aistudio.google.com)**.
2. Masuk menggunakan akun Google kalian.
3. Klik tombol **Get API Key** di menu sebelah kiri.
4. Klik **Create API Key** lalu salin rentetan kunci rahasia yang muncul (berawalan `AIzaSy...`).

> [!WARNING]
> **Jaga Kerahasiaan API Key Anda:** Kunci API bersifat rahasia dan berharga. Jangan pernah menulisnya langsung di dalam baris kode proyek kalian, jangan pernah menaruhnya di kode frontend (apa pun yang dikirim ke browser bisa dibaca siapa saja), dan pastikan kunci ini tidak ikut terunggah (*commit*) ke repositori GitHub publik agar tidak disalahgunakan oleh pihak asing.

---

## 6.3 Kenapa API Key Tidak Boleh Ada di Frontend

Godaan paling umum bagi pemula: menaruh API Key di file `.env` dengan prefix `VITE_`, lalu membacanya di React lewat `import.meta.env.VITE_GEMINI_API_KEY`. **Jangan lakukan ini.** Vite mengganti semua variabel berprefix `VITE_` dengan nilainya saat *build*, sehingga kunci tersebut ikut tertulis di dalam bundle JavaScript yang dikirim ke browser. Siapa pun bisa membukanya lewat DevTools dan memakai kunci kalian sampai kuotanya habis — atau sampai tagihannya datang.

File `.gitignore` tidak menolong di sini: ia hanya menjaga kunci tidak masuk ke repositori Git, tetapi tidak mengubah fakta bahwa nilai `VITE_*` ikut terkirim ke setiap pengunjung aplikasi.

Aturan yang benar:

* **Rahasia hanya boleh hidup di server.** Server adalah kode yang berjalan di mesin kalian sendiri, bukan di browser pengunjung.
* **Browser hanya bicara dengan endpoint milik kalian sendiri.** Endpoint itulah yang memegang kunci dan meneruskan pertanyaan ke Gemini. Pola ini disebut **proxy backend**:

```text
Browser (React)  →  POST /api/ask  →  Server (punya API Key)  →  Gemini API
```

### Langkah Setup Keamanan:
1. Buat berkas baru bernama **`.env`** di level terluar proyek kalian (sejajar dengan `package.json`).
2. Masukkan kunci API kalian **tanpa prefix `VITE_`**. File ini hanya akan dibaca oleh server (Node.js), bukan oleh Vite, sehingga nilainya tidak pernah ikut ke-bundle:
   ```text
   GEMINI_API_KEY=AIzaSyYourActualAPIKeyHere
   ```
3. Buka file **`.gitignore`** proyek kalian, lalu tambahkan baris `.env` di paling bawah agar Git secara otomatis mengabaikan file ini saat kalian melakukan push ke GitHub:
   ```text
   # .gitignore
   .env
   .env.local
   ```

Ingat perbedaan kuncinya: prefix `VITE_` berarti *"nilai ini boleh dibaca semua orang"* — hanya untuk konfigurasi publik. Secret tidak pernah memakai prefix itu.

---

## 6.4 Memasang SDK Resmi `@google/genai` di Backend

Google menyediakan pustaka SDK resmi untuk mempermudah pemanggilan fungsi kecerdasan buatan. SDK ini akan dipakai oleh kode **server**, bukan kode React — begitu pula `express` (server HTTP) dan `dotenv` (pembaca file `.env` di Node.js). Jalankan instalasi melalui terminal kalian:

```bash
npm install @google/genai express dotenv
```

Template Vite React sudah memakai ESM (`"type": "module"` di `package.json`), jadi sintaks `import` di file server nanti langsung jalan tanpa konfigurasi tambahan.

---

## 6.5 Praktik: Membangun AI Study Assistant

Mari kita rancang modul asisten belajar pemrograman cerdas di proyek kita.

### Step 1: Membuat Endpoint Backend (`server/index.js`)
Buat file server khusus untuk menginisialisasi client Google GenAI dan melayani pertanyaan dari frontend. Perhatikan: kunci hanya dibaca di sini, lewat `process.env` — tidak pernah muncul di kode React:

```javascript
// server/index.js
import express from "express";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config"; // Membaca file .env di folder root proyek

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("GEMINI_API_KEY tidak ditemukan. Harap periksa file .env Anda.");
  process.exit(1);
}

// Inisialisasi client SDK resmi Google
const ai = new GoogleGenAI({
  apiKey: API_KEY,
  httpOptions: {
    apiVersion: "v1", // Gunakan v1 stable
  },
});

const app = express();
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  const { question } = req.body ?? {};
  if (typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "Pertanyaan wajib diisi." });
  }

  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: question,
      // Mengatur kepribadian & batasan AI
      system_instruction: `
        Kamu adalah asisten belajar React JS dan Web Dev yang ramah, sopan, dan sabar.
        Tugas kamu adalah membantu mahasiswa memahami konsep koding.
        Gunakan bahasa santai (kamu-kalian-saya) agar mudah dimengerti pemula.
        Berikan analogi sederhana sehari-hari dan contoh potongan kode JSX jika relevan.
        Jika pertanyaan mahasiswa di luar topik pemrograman web, ingatkan mereka dengan sopan.
      `,
      generation_config: {
        temperature: 0.7, // Kreativitas seimbang
        max_output_tokens: 1000,
      },
    });

    if (interaction.status !== 'completed') {
      return res.status(502).json({ error: 'AI mengembalikan respons tidak lengkap.' });
    }

    return res.json({ answer: interaction.output_text || 'Maaf, saya tidak bisa memproses jawaban.' });
  } catch (error) {
    console.error('Gemini API Error:', error);
    // Jangan kirim detail error ke client: pesannya bisa membocorkan info server.
    return res.status(500).json({ error: 'Gagal memproses pertanyaan.' });
  }
});

app.listen(3001, () => {
  console.log("Backend AI jalan di http://localhost:3001");
});
```

### Step 2: Meneruskan `/api` dari Vite ke Server (`vite.config.js`)
Saat development, React jalan di port 5173 sedangkan server di port 3001. Supaya frontend cukup memanggil `/api/ask` (tanpa urusan CORS), tambahkan proxy di konfigurasi Vite:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
```

### Step 3: Membuat Service API di Frontend (`src/services/geminiService.js`)
Service di React sekarang hanya memanggil endpoint milik sendiri. Tidak ada kunci, tidak ada SDK — yang dikirim hanya pertanyaan, yang diterima hanya jawaban:

```javascript
// src/services/geminiService.js
export async function askGemini(question) {
  const response = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error('Gagal terhubung dengan asisten AI.');
  }

  const data = await response.json();
  return data.answer;
}
```

### Menjalankan Aplikasi
Jalankan dua proses di dua terminal terpisah: `node server/index.js` untuk backend, lalu `npm run dev` untuk React. Keduanya harus hidup bersamaan agar chat berfungsi.

### Step 4: Membuat Komponen Antarmuka Chat (`src/components/AIAssistant.jsx`)
Gunakan kombinasi komponen `Card`, `Input`, dan `Button` milik `shadcn/ui` untuk mendesain panel obrolan AI yang interaktif:

```jsx
// src/components/AIAssistant.jsx
import { useState } from 'react';
import { askGemini } from '../services/geminiService';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

function AIAssistant() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResponse('');

    try {
      const reply = await askGemini(input);
      setResponse(reply);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800">🤖 AI Study Assistant</h2>
        <p className="text-slate-500 text-xs">Asisten cerdas untuk menemanimu belajar React & Web Dev.</p>
      </div>

      <Card className="border border-slate-100 shadow-md">
        <CardHeader className="border-b border-slate-50 py-3 bg-slate-50/50">
          <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Room Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 min-h-[300px] flex flex-col justify-between gap-4">
          
          {/* Output Obrolan */}
          <div className="flex-grow overflow-y-auto space-y-4">
            {/* Tampilan default jika belum mengirim chat */}
            {!response && !loading && !error && (
              <div className="text-center py-16 text-slate-350 space-y-2">
                <span className="text-5xl block animate-bounce">💡</span>
                <p className="text-xs font-medium">Tanyakan sesuatu tentang React (misal: "Apa bedanya props dan state?")</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold">
                ⚠️ Error: {error}
              </div>
            )}

            {/* Loading Animasi */}
            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs italic">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                AI sedang merumuskan jawaban...
              </div>
            )}

            {/* Tampilan Jawaban AI */}
            {response && !loading && (
              <div className="space-y-2">
                <div className="bg-indigo-50 border border-indigo-100 text-slate-800 p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line">
                  {response}
                </div>
              </div>
            )}
          </div>

          {/* Form Input Kirim Pertanyaan */}
          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-slate-100 pt-3">
            <Input 
              placeholder="Tulis pertanyaanmu di sini..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="rounded-xl flex-grow"
            />
            <Button type="submit" disabled={loading || !input.trim()} className="rounded-xl">
              <Send className="w-4 h-4" />
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  );
}

export default AIAssistant;
```

---

## 📝 Kesimpulan Modul 6

Berikut adalah poin-poin kesimpulan penting dari pembelajaran Gemini AI kita hari ini:
1. **Fungsi Gemini API:** Layanan AI tingkat lanjut yang terintegrasi untuk memberikan kecerdasan pemrosesan bahasa alami di web.
2. **Kunci Autentikasi:** API Key di Google AI Studio wajib dijaga ketat: tidak boleh ada di kode frontend, tidak boleh bocor ke repositori GitHub, dan hanya boleh dibaca oleh server.
3. **Environment Variables:** Kredensial sensitif disimpan di file `.env` yang dibaca server (tanpa prefix `VITE_`), dan disembunyikan lewat pengaturan berkas `.gitignore`. Prefix `VITE_` berarti nilai ikut ke-bundle dan bisa dibaca siapa saja — jangan pernah dipakai untuk secret.
4. **SDK Resmi:** Memanfaatkan package `@google/genai` resmi milik Google di sisi server untuk kemudahan inisialisasi client dan interaksi asinkron.
5. **Pola Proxy Backend:** Browser memanggil endpoint milik sendiri (`/api/ask`), server yang memegang kunci dan meneruskan pertanyaan ke Gemini API.
6. **System Instruction:** Menyetel kepribadian, gaya bahasa, batasan topik, serta format respons asisten AI agar sesuai dengan target sasaran pengguna.

Selamat! Aplikasi kalian sekarang sudah terhubung dengan AI melalui backend kalian sendiri dan dapat menjawab pertanyaan pemrograman secara interaktif.

Di **Modul 7 (Terakhir)** berikutnya, kalian akan menyatukan seluruh pilar (Routing, shadcn/ui, API, dan AI) ke dalam sebuah **Mini Project mandiri**! Bersiaplah untuk tantangan akhir! 🚀
