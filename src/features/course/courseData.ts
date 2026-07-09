import modul1 from "../../core/modul/fundamental-js/modul-1-dasar-javascript.md?raw";
import modul2 from "../../core/modul/fundamental-js/modul-2-pengambilan-keputusan.md?raw";
import modul3 from "../../core/modul/fundamental-js/modul-3-function-dan-loop.md?raw";
import modul4 from "../../core/modul/fundamental-js/modul-4-array-dan-object.md?raw";
import modul5 from "../../core/modul/fundamental-js/modul-5-dom-dan-event.md?raw";
import modul6 from "../../core/modul/fundamental-js/modul-6-dom-lanjutan.md?raw";
import modul7 from "../../core/modul/fundamental-js/modul-7-proyek-akhir.md?raw";

export interface ModuleData {
  id: string;
  title: string;
  order: number;
  markdown: string;
  question: string;
  criteria: string;
}

export const courseModules: ModuleData[] = [
  {
    id: "modul-1",
    title: "Modul 1: Dasar-Dasar JavaScript",
    order: 1,
    markdown: modul1,
    question: "Tuliskan kode JavaScript untuk mendeklarasikan variabel nama mahasiswa menggunakan const, variabel umur menggunakan let, dan tampilkan keduanya dalam bentuk kalimat perkenalan menggunakan template literals!",
    criteria: "Harus menggunakan const untuk nama, let untuk umur, dan menggabungkannya memakai template literals (backticks dengan ${nama} dan ${umur})."
  },
  {
    id: "modul-2",
    title: "Modul 2: Pengambilan Keputusan",
    order: 2,
    markdown: modul2,
    question: "Buatlah pengondisian menggunakan ternary operator untuk menentukan apakah total belanja mahasiswa mendapatkan diskon. Jika total belanja lebih besar dari 100000, maka diskon = true, jika tidak maka diskon = false.",
    criteria: "Harus menggunakan ternary operator (kondisi ? true : false) dan menyimpannya ke dalam variabel diskon."
  },
  {
    id: "modul-3",
    title: "Modul 3: Function dan Loop",
    order: 3,
    markdown: modul3,
    question: "Buatlah sebuah arrow function bernama cetakGanjil yang menerima satu parameter angka N, lalu menggunakan for loop untuk mencetak angka ganjil saja dari 1 sampai N menggunakan console.log!",
    criteria: "Menggunakan arrow function (const cetakGanjil = (N) => { ... }), perulangan for loop, dan kondisi (i % 2 !== 0) untuk menyaring angka ganjil."
  },
  {
    id: "modul-4",
    title: "Modul 4: Array dan Object",
    order: 4,
    markdown: modul4,
    question: "Tuliskan kode menggunakan method .filter() untuk menyaring nilai array [45, 60, 75, 80, 55] agar hanya tersisa angka yang bernilai >= 60!",
    criteria: "Harus menggunakan method filter() bawaan array Javascript dan function callback (e.g. .filter(n => n >= 60))."
  },
  {
    id: "modul-5",
    title: "Modul 5: DOM dan Event",
    order: 5,
    markdown: modul5,
    question: "Tuliskan baris kode JavaScript untuk mengambil tombol dengan ID 'ganti-tema' lalu pasangkan event listener klik yang jika diklik akan menambahkan class 'dark-theme' ke element document.body!",
    criteria: "Menggunakan document.querySelector('#ganti-tema'), addEventListener('click', ...), dan document.body.classList.add('dark-theme') atau classList.toggle()."
  },
  {
    id: "modul-6",
    title: "Modul 6: DOM Lanjutan",
    order: 6,
    markdown: modul6,
    question: "Bagaimana cara menyimpan object data { nama: 'Budi', nim: '123' } ke dalam localStorage dengan key 'mahasiswa_aktif' agar tipenya tetap tersimpan sebagai string JSON?",
    criteria: "Harus menggunakan localStorage.setItem('mahasiswa_aktif', JSON.stringify(object))."
  },
  {
    id: "modul-7",
    title: "Modul 7: Proyek Akhir",
    order: 7,
    markdown: modul7,
    question: "Sebutkan tema proyek akhir yang ingin Anda bangun, serta tuliskan rancangan struktur data (Array of Objects) minimal 3 properti yang akan Anda simpan di localStorage untuk mengelola aplikasi tersebut!",
    criteria: "Menyebutkan tema aplikasi secara jelas, dan menuliskan skema array of objects dengan properti kunci seperti id, title/name, dan status/kategori."
  }
];
