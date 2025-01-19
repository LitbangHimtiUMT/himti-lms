# HIMTI Learning Management System (LMS)

## 📌 Tentang Proyek
LMS (Learning Management System) is a platform to help the online learning process. This system allows users to take classes, access learning modules, and track their learning progress.

## ✨ Fitur Utama
- **User Management**: Registration, authentication, and user roles (admin, mentor, participant).
- **Classes & Mentors**: Mentors can create classes and manage participants.
- **Modules & Sessions**: Each class has sessions containing learning modules in the form of text and video.
- **Progress Tracking**: Users can mark completed modules.
- **Points & Reward System**: Can be further developed to increase user engagement.

## 🛠️ Teknologi yang Digunakan
React Vite, Typescript, Tailwind CSS

## 📂 Struktur Proyek
```
📦 learning-management-system
├── 📁 src
│   ├── 📁 core
│       ├── 📁 core
│   │   ├── 📁 models
│   │   ├── 📁 service
│   │   ├── 📁 config
│   ├── 📁 entries
│   │   ├── 📄 app.tsx
│   │   ├── 📁 index.css
│   ├── 📁 feature
│   │   ├── 📁 components
│   │   │   ├── ⚛ ClassButton.tsx
│   │   ├── 📁 hooks
│   │   │   ├── ⚛ useClass.ts
│   │   ├── 📁 views
│   │   │   ├── ⚛ ClassesView.tsx
├── 📄 index.html
├── 📄 README.md
```

## 🚀 Instalasi & Menjalankan Proyek
### Prasyarat
- Node.js & npm/yarn

### Langkah-Langkah
#### 1️⃣ Clone Repository
```bash
git clone https://github.com/LitbangHimtiUMT/learning-management-system.git
cd learning-management-system
```

#### 3️⃣ Setup Environment
```bash
touch .env
# Edit file .env sesuai konfigurasi API backend

# Install dependency
yarn install

# Jalankan aplikasi
yarn dev
```

## 🤝 Contributions
We welcome contributions from anyone! Please feel free to fork this repository, create new branches, and submit pull requests.

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---
🚀 Built with ❤️ by **[Litbang/HIMTI-UMT]**

