# HIMTI LMS

Learning Management System HIMTI UMT. Buat peserta, mentor, dan admin. Frontend aja, backend-nya repo terpisah.

Live di https://lms.himtiumt.org. Backend/API: [himti-api](https://github.com/LitbangHimtiUMT/himti-api).

## Fitur

Yang ada sekarang:

- Auth: sign-in, sign-up, lupa password.
- Kelas dan mentor: mentor bikin kelas, atur peserta, sesi, dan modul.
- Sesi, modul, dan assignment: modul teks dan video, assignment plus submission.
- Progres belajar: peserta menandai modul yang selesai.
- Sertifikat: peserta bisa cek dan unduh sertifikat kelas yang selesai.
- Materi mandiri (`/courses`): materi statis yang dipelajari sendiri, tanpa mentor dan sertifikat. 4 materi tersedia, 6 masih placeholder.
- Undangan via kode: gabung kelas pakai kode undangan.

Nggak ada sistem poin atau reward.

## Tech stack

- React 18 + Vite 5 + TypeScript 5
- Tailwind CSS 3
- React Query 5, Jotai, react-router-dom 6
- Pendukung: react-toastify, lucide-react, react-icons, suneditor, lottie-react, date-fns

## Prasyarat

- Node 18 atau lebih baru.
- npm. Jangan pakai yarn, repo ini pakai `package-lock.json`.
- API backend yang bisa diakses (lihat `HIMTI_BASE_URL` di bawah).

## Quickstart

1. Clone repo:

```bash
git clone https://github.com/LitbangHimtiUMT/himti-lms.git
cd himti-lms
```

2. Install dependency:

```bash
npm install
```

Repo ini pakai `legacy-peer-deps=true` di `.npmrc`. Jangan dihapus, build Vercel butuh itu.

3. Salin env example dan isi nilainya:

```bash
cp .env.example .env
```

| Variabel | Buat apa |
| --- | --- |
| `HIMTI_BASE_URL` | URL dasar API backend. |
| `HIMTI_APP_NAME` | Nama aplikasi, dipakai di judul halaman. |
| `HIMTI_SECRET_KEY` | Dipakai buat nurunin nama key token di localStorage. |
| `HIMTI_HEADER_KEY` | Legacy. Sudah tidak dibaca kode sejak header `x-api-key` dicabut. Masih ada di `.env.example` sampai dibersihkan bareng perbaikan keamanan berikutnya. |

4. Jalankan:

```bash
npm run dev
```

5. Build dan lint sebelum PR:

```bash
npm run build
npm run lint
```

## Struktur proyek

```
himti-lms
├── public/            # file statis, termasuk logo + favicon HIMTI.png
├── src/
│   ├── core/          # kode bersama: configs, libs, model, services, utils, assets
│   │   └── modul/     # konten markdown materi mandiri (4 folder course)
│   ├── entries/       # App.tsx + index.css
│   └── features/      # satu folder per fitur: components, hooks, views
│       ├── _global/   # komponen dan layout yang dipakai semua fitur
│       ├── authentication/
│       ├── categories/
│       ├── certificates/
│       ├── class/
│       ├── course/    # katalog + halaman materi mandiri
│       ├── dashboard/
│       ├── faq/
│       ├── home/
│       ├── invitations/
│       ├── learning/
│       ├── mentor/
│       └── profile/
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── vercel.json
```

`core/` isinya kode yang dipakai lintas fitur. `features/` isinya kode per fitur, dan `_global/` di dalamnya isinya komponen bersama. Konten materi mandiri tinggal di `src/core/modul/` sebagai file markdown, diimpor pakai `?raw` supaya Vite membacanya sebagai teks mentah.

## Scripts

| Script | Buat apa |
| --- | --- |
| `npm run dev` | Jalankan dev server. |
| `npm run build` | Typecheck (`tsc -b`) lalu build produksi. |
| `npm run lint` | ESLint, nol warning. |
| `npm run preview` | Jalankan hasil build secara lokal. |

## Deploy

Deploy di Vercel. `vercel.json` sudah berisi rewrite SPA (semua path ke `/`), jadi routing client-side tetap jalan pas refresh halaman. Env var diisi di dashboard Vercel, jangan commit file `.env`.

## Kontribusi

Baca [CONTRIBUTING.md](CONTRIBUTING.md) dulu sebelum bikin PR.

## Lisensi

[MIT](LICENSE.md). Dibangun Litbang HIMTI UMT.
