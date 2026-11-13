# Kebijakan Keamanan

## Versi yang didukung

Hanya branch `main` (production) yang menerima perbaikan keamanan.

| Branch | Didukung |
| --- | --- |
| `main` | Ya |
| Branch lain / commit lama | Tidak |

## Melaporkan kerentanan

Jangan buka issue publik untuk kerentanan keamanan.

Laporkan lewat **GitHub Security Advisory** (private vulnerability
reporting): buka tab **Security** di repo ini, lalu **Report a
vulnerability**. Laporanmu hanya terlihat oleh maintainer sampai
perbaikan selesai.

Tulis di laporan: halaman atau endpoint yang kena, langkah buat
ngulanginnya, dan dampak yang lu lihat. Kalau ada, sertakan tangkapan
layar atau contoh request.

## Yang tidak boleh

- Jangan akses data user lain.
- Jangan eksploitasi di production.
- Jangan publikasikan kerentanan sebelum perbaikan selesai.
- Jangan ngelakuin pengujian yang ngerusak data atau ngeganggu layanan,
  misalnya brute force login, spam form, atau nembak endpoint API
  berkali-kali di luar pemakaian normal.

## Lingkup

Repo ini cuma frontend LMS. Kerentanan di sisi API (endpoint, auth,
database) dilaporin ke repo
[himti-api](https://github.com/LitbangHimtiUMT/himti-api), bukan di sini.

## Praktik repo

- Secret cuma lewat env var. Jangan pernah commit file `.env` apa pun.
- `.env.example` cuma berisi placeholder yang jelas palsu, bukan nilai beneran.
- `.gitignore` sudah mencakup `.env`, `.env.*` (kecuali `.env.example`),
  `.vercel`, dan `coverage`.
- Kredensial tidak boleh ada di log atau di bundle JavaScript.

## Dependensi

- Jalankan `npm audit` berkala dan perbaiki temuan yang relevan.
- Dependensi yang nggak kepakai wajib dihapus.
- Jangan nambah dependensi baru tanpa justifikasi di deskripsi PR.
