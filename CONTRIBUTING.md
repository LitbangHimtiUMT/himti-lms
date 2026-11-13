# Kontribusi

## Cara kontribusi

1. Fork repo ini.
2. Bikin branch dari `main`. Penamaan: `feat/...`, `fix/...`, `docs/...`, `chore/...`.
3. Bikin PR ke `main`. Tulis di deskripsi: apa yang berubah, kenapa, dan cara ngetesnya.

Setup lokal sama kayak di [README.md](README.md). Jangan duplikasi langkahnya di sini.

## Aturan kode

- TypeScript strict. `noUnusedLocals` nyala, impor dan variabel yang nggak kepakai bikin build gagal.
- `npm run lint` dan `npm run build` wajib lolos sebelum PR.
- Hapus `console.log` debug sebelum commit.
- Nggak ada file mati. Kalau ngehapus pemakaian, hapus impor dan file yang nggak kepakai di PR yang sama.

## Komponen bersama

Cek `_global` dulu sebelum bikin komponen baru. Yang hidup dan dipakai:

`MasterTable`, `DropdownRevamp`, `DropdownMenu`, `DatePicker`, `UploadFiles`, `TextEditor`, `EmptyState`, `Shimer`, `Pagination`, `Dialog`, `Drawer`.

Dilarang bikin komponen duplikat baru tanpa cek `_global` dulu. Komponen ini sudah dihapus dan jangan dibikin ulang: `CropperImage`, `PageLayout`, Sidebar global lama, `EmptyData`, `Date` dan `Dropdown` lama, `LoaderHIMTI`, `SimpleLoadingTable`.

## Penamaan

- `classes`, bukan `classess`. Typo lama ini sudah dibersihkan, jangan balik lagi.
- Folder per fitur: `components`, `hooks`, `views`.
- Jangan nambah konten statis baru di `src/core/modul/` tanpa diskusi dulu. Konten materi mandiri lewat jalur yang disepakati.

## Commit

- Satu commit per perubahan logis.
- Pesan commit terse, conventional commits per-scope (mis. `fix(api): ...`), tanpa frasa AI.

## Review

- PR butuh review dan QA manual sebelum merge.
- Jangan merge PR yang nambah dependensi tanpa alasan di deskripsi. Dependensi yang nggak kepakai wajib dicabut.
