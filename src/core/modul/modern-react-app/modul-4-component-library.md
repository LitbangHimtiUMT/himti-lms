# MODUL 4: Component Library (shadcn/ui)

Halo teman-teman! Selamat datang di **Modul 4**.

Setelah berhasil memetakan navigasi halaman aplikasi kita menggunakan React Router, tantangan berikutnya adalah mendesain antarmuka yang cantik, konsisten, dan responsif. Di dunia industri profesional, kita tidak perlu mendesain setiap tombol, form input, atau dialog popup dari nol. Kita menggunakan **Component Library**.

Hari ini, kita akan mempelajari konsep ini menggunakan **shadcn/ui**—pustaka UI paling populer saat ini yang memberikan kebebasan kustomisasi 100% pada kode kita.

---

## 🎯 Target Pembelajaran Hari Ini
Setelah menyelesaikan modul ini, diharapkan kalian mampu:
1. Menjelaskan manfaat dan alasan utama industri menggunakan Component Library.
2. Menginstal dan mengkonfigurasi `shadcn/ui` di dalam proyek React.
3. Memahami struktur folder komponen `@/components/ui`.
4. Menggunakan ragam komponen dasar: `Button`, `Card`, `Input`, `Badge`, `Dialog`, `Alert`, dan `Navigation Menu`.
5. Membangun tata letak UI yang premium dan konsisten secara cepat.

---

## 4.1 Apa itu Component Library?

**Component Library** adalah koleksi komponen antarmuka (UI) siap pakai yang telah dirancang secara profesional, memenuhi standar aksesibilitas (ramah keyboard dan pembaca layar), serta diuji lintas-browser.

Pustaka komponen ini membantu kita melompati proses pembuatan elemen-elemen dasar yang membosankan dan berulang, seperti:

```text
Tombol (Button)   →   Kartu Konten (Card)   →   Input Teks (Input)
   ↓                         ↓                         ↓
Pop-up (Dialog)   →   Label Status (Badge)  →   Navigasi (Menu)
```

### Bandingkan Kecepatannya:
* **Membuat Sendiri (From Scratch):** Menulis struktur HTML, mengatur CSS/Tailwind, menangani state klik, mengatur responsivitas layar HP, dan memastikan navigasi keyboard. (Memakan waktu berhari-hari).
* **Menggunakan Component Library:** Cukup impor komponen, masukkan data kalian, dan UI premium langsung tersaji. (Hanya hitungan detik!).

---

## 4.2 Keunikan shadcn/ui dibanding Library Biasa

Umumnya, component library seperti Material UI (MUI) atau Chakra UI diinstal sebagai paket eksternal utuh ke dalam folder `node_modules` (seperti kotak hitam/*black box* yang kodenya tidak bisa diubah langsung).

**shadcn/ui mengambil pendekatan yang berbeda:**
Kalian tidak menginstalnya sebagai library utuh, melainkan menggunakan antarmuka CLI (*Command Line Interface*) untuk **menyalin langsung kode komponen mentah** ke dalam folder proyek kalian (`src/components/ui`).

| Pustaka UI Biasa | shadcn/ui |
| :--- | :--- |
| Terkunci di dalam folder `node_modules` | Disalin langsung ke folder `src/components/ui/` proyek kalian. |
| Sangat sulit mengubah gaya dasar komponen | Bebas diubah atau ditulis ulang karena berupa file komponen biasa. |
| Menambah ukuran bundle aplikasi secara keseluruhan | Hanya menambahkan komponen yang benar-benar kalian gunakan. |

---

## 4.3 Instalasi & Konfigurasi shadcn/ui

Untuk memulai, kita perlu menjalankan inisialisasi konfigurasi shadcn di folder proyek React kita. Jalankan perintah berikut pada terminal kalian:

```bash
npx shadcn@latest init
```

### Menjawab Pertanyaan Konfigurasi:
Kalian akan disuguhi beberapa pertanyaan pengaturan. Silakan ikuti panduan jawaban berikut:

```text
✔ Would you like to use TypeScript? … no
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Slate
✔ Where is your global CSS file? › src/index.css
✔ Would you like to use CSS variables for colors? … yes
✔ Where is your tailwind.config.js located? › tailwind.config.js
✔ Configure the import alias for components: › @/components
✔ Configure the import alias for utils: › @/lib/utils
✔ Write configuration to components.json? … yes
```

Setelah inisialisasi selesai, CLI akan memasang dependensi inti Radix UI dan membuat file baru:
* `src/lib/utils.js`: Berisi helper `cn` untuk menggabungkan kelas Tailwind secara dinamis.
* `components.json`: File pengaturan resmi shadcn/ui.

---

## 4.4 Menggunakan Komponen-Komponen Utama

Berikut cara memasang dan menggunakan komponen penting shadcn/ui:

### 1. Button (Tombol)
Pasang komponen Button lewat terminal:
```bash
npx shadcn@latest add button
```

Gunakan di dalam kode React kalian dengan variasi variant dan size:
```jsx
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"; // Pustaka ikon membawa

function App() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Tombol Utama</Button>
      <Button variant="destructive">Hapus Data</Button>
      <Button variant="outline">
        <Plus className="w-4 h-4 mr-2" /> Tambah Baru
      </Button>
    </div>
  );
}
```

### 2. Card (Kartu Konten)
Pasang komponen Card lewat terminal:
```bash
npx shadcn@latest add card
```

Gunakan untuk membungkus data informasi visual secara rapi:
```jsx
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from "@/components/ui/card";

function ProductCard() {
  return (
    <Card className="w-80 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>Belajar React Modern</CardTitle>
        <CardDescription>Kurikulum Web Dev HIMTI</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-500">Materi mencakup React Router, shadcn/ui, API v5, dan AI.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Mulai Belajar</Button>
      </CardFooter>
    </Card>
  );
}
```

### 3. Input & Label
Pasang komponen input lewat terminal:
```bash
npx shadcn@latest add input
```

Gunakan untuk merancang formulir isian data:
```jsx
import { Input } from "@/components/ui/input";

function FormInput() {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-600">Alamat Email</label>
      <Input type="email" placeholder="contoh@gmail.com" />
    </div>
  );
}
```

### 4. Dialog (Popup Modal)
Pasang komponen dialog lewat terminal:
```bash
npx shadcn@latest add dialog
```

Gunakan untuk memunculkan pesan konfirmasi atau formulir melayang:
```jsx
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";

function ConfirmModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Hapus Akun</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
          <DialogDescription>
            Tindakan ini tidak dapat dibatalkan. Apakah kalian yakin?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Batal</Button>
          <Button variant="destructive">Ya, Hapus</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 📝 Kesimpulan Modul 4

Berikut adalah poin-poin kesimpulan penting dari pembelajaran shadcn/ui kita hari ini:
1. **Component Library:** Menghemat waktu pengerjaan UI, memastikan konsistensi desain, dan menjamin standar aksesibilitas antarmuka.
2. **Kelebihan shadcn/ui:** Kunci utamanya adalah *Full Code Ownership*. Kodenya disalin langsung ke proyek kalian, memberi kebebasan modifikasi penuh tanpa dibatasi.
3. **Pilar Teknis:** Komponen shadcn/ui ditenagai oleh Radix UI untuk fungsionalitas murni, dan Tailwind CSS untuk urusan gaya visualnya.
4. **Instalasi CLI:** Penggunaan perintah `npx shadcn@latest add [nama]` memisahkan pemasangan agar hanya komponen yang digunakan saja yang dipasang, menghindari beban bundle aplikasi.

Luar biasa! Antarmuka aplikasi kita kini sudah terlihat premium dan rapi. 

Di **Modul 5** berikutnya, kita akan menghidupkan antarmuka ini dengan menghubungkannya langsung ke data dunia nyata menggunakan **REST Countries API v5** lengkap dengan Autentikasi Bearer Token! Tetap fokus dan pertahankan semangat belajar kalian! 🚀
