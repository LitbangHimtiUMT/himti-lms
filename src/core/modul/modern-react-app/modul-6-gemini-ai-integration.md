# MODUL 6: Gemini AI Integration

Halo teman-teman! Selamat datang di **Modul 6**.

Pernahkah kalian membayangkan aplikasi web kalian memiliki kemampuan berdialog cerdas secara *real-time*? Hari ini, kita akan membawa aplikasi kita ke tingkat kecerdasan berikutnya dengan mengintegrasikannya langsung ke model kecerdasan buatan terkuat milik Google menggunakan **Gemini API**.

Kita akan belajar cara membuat koneksi aman, memahami aspek keamanan kredensial, dan membangun **AI Study Assistant** interaktif yang siap membantu kalian belajar pemrograman.

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Menjelaskan fungsi dan cara kerja Gemini API.
2. Membuat API Key di Google AI Studio secara mandiri.
3. Menyimpan API Key dengan aman menggunakan *Environment Variables* (`.env`) di React.
4. Menginstal dan mengoperasikan SDK resmi Google `@google/genai`.
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

Sebelum memanggil API dari kode React, kita membutuhkan **API Key** (kunci autentikasi). Kunci ini bisa diibaratkan sebagai username & password unik proyek kalian untuk menggunakan layanan AI Google.

### Cara Mendapatkan API Key:
1. Kunjungi platform pengujian **[Google AI Studio](https://aistudio.google.com)**.
2. Masuk menggunakan akun Google kalian.
3. Klik tombol **Get API Key** di menu sebelah kiri.
4. Klik **Create API Key** lalu salin rentetan kunci rahasia yang muncul (berawalan `AIzaSy...`).

> [!WARNING]
> **Jaga Kerahasiaan API Key Anda:** Kunci API bersifat rahasia dan berharga. Jangan pernah menulisnya langsung di dalam baris kode proyek kalian, dan pastikan kunci ini tidak ikut terunggah (*commit*) ke repositori GitHub publik agar tidak disalahgunakan oleh pihak asing.

---

## 6.3 Menyimpan API Key Menggunakan Environment Variables

Cara teraman untuk menyimpan kredensial sensitif di React (Vite) adalah menggunakan file environment variables bernama **`.env`** di folder root proyek kalian.

### Langkah Setup Keamanan:
1. Buat berkas baru bernama **`.env`** di level terluar proyek kalian (sejajar dengan `package.json`).
2. Masukkan kunci API kalian menggunakan prefix khusus Vite:
   ```text
   VITE_GEMINI_API_KEY=AIzaSyYourActualAPIKeyHere
   ```
3. Buka file **`.gitignore`** proyek kalian, lalu tambahkan baris `.env` di paling bawah agar Git secara otomatis mengabaikan file ini saat kalian melakukan push ke GitHub:
   ```text
   # .gitignore
   .env
   .env.local
   ```
4. Di dalam kode React, kalian bisa memanggil nilai kunci tersebut secara aman dengan kode:
   ```javascript
   const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
   ```

---

## 6.4 Memasang SDK Resmi `@google/genai`

Google menyediakan pustaka SDK resmi untuk mempermudah pemanggilan fungsi kecerdasan buatan. Jalankan instalasi SDK melalui terminal kalian:

```bash
npm install @google/genai
```

---

## 6.5 Praktik: Membangun AI Study Assistant

Mari kita rancang modul asisten belajar pemrograman cerdas di proyek kita.

### Step 1: Membuat Service API (`src/services/geminiService.js`)
Buat file service khusus untuk menginisialisasi client Google GenAI dan menyusun fungsi tanya jawab:

```javascript
// src/services/geminiService.js
import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Inisialisasi client SDK resmi Google
const ai = new GoogleGenAI({
  apiKey: API_KEY,
  httpOptions: {
    apiVersion: "v1", // Gunakan v1 stable
  },
});

export async function askGemini(question) {
  if (!API_KEY) {
    throw new Error('API Key Gemini tidak ditemukan. Harap periksa file .env Anda.');
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
      throw new Error('AI mengembalikan respons tidak lengkap.');
    }

    return interaction.output_text || 'Maaf, saya tidak bisa memproses jawaban.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    if (error.message.includes('API key')) {
      throw new Error('Kredensial API Key tidak valid.');
    }
    throw error;
  }
}
```

### Step 2: Membuat Komponen Antarmuka Chat (`src/components/AIAssistant.jsx`)
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
2. **Kunci Autentikasi:** API Key di Google AI Studio wajib dijaga ketat agar tidak bocor ke repositori GitHub.
3. **Environment Variables:** Mengisolasi kredensial sensitif menggunakan file `.env` yang disembunyikan lewat pengaturan berkas `.gitignore`.
4. **SDK Resmi:** Memanfaatkan package `@google/genai` resmi milik Google untuk kemudahan inisialisasi client dan interaksi asinkron.
5. **System Instruction:** Menyetel kepribadian, gaya bahasa, batasan topik, serta format respons asisten AI agar sesuai dengan target sasaran pengguna.

Selamat! Aplikasi kalian sekarang sudah terhubung dengan AI dan dapat menjawab pertanyaan pemrograman secara interaktif. 

Di **Modul 7 (Terakhir)** berikutnya, kalian akan menyatukan seluruh pilar (Routing, shadcn/ui, API, dan AI) ke dalam sebuah **Mini Project mandiri**! Bersiaplah untuk tantangan akhir! 🚀
