# Pomodoro Timer - Gaya Pixel 🍅

Sebuah timer Pomodoro sederhana namun powerful dengan estetika seni piksel unik untuk membantumu tetap fokus dan produktif.



---

## ✨ Fitur Utama

- **Timer Pomodoro Klasik:** Otomatis berganti antara sesi fokus, istirahat singkat, dan istirahat panjang.
- **Durasi Fleksibel:** Atur panjang tiap sesi sesuai kebutuhanmu melalui pengaturan.
- **Daftar Tugas Terintegrasi:** Rencanakan tugas untuk setiap sesi fokus dan centang saat selesai. Semua tersimpan lokal di browser!
- **Kutipan Motivasi AI:** Dapatkan kutipan inspiratif di akhir setiap sesi untuk menjaga semangatmu.
- **UI Seni Piksel:** Desain retro yang menyenangkan dengan animasi piksel memuaskan.
- **Perayaan Konfeti:** Nikmati ledakan konfeti piksel setiap kali menyelesaikan sesi fokus!
- **Desain Responsif:** Nyaman digunakan di desktop maupun perangkat seluler.

---

## 🛠️ Teknologi yang Digunakan

- **Framework:** [Next.js](https://nextjs.org/)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generatif:** [Genkit (Firebase)](https://firebase.google.com/docs/genkit)
- **Font:** [Google Fonts - Silkscreen](https://fonts.google.com/specimen/Silkscreen)

---

## 🚀 Cara Memulai

Ingin mencoba secara lokal? Ikuti langkah-langkah berikut:

### Prasyarat

- [Node.js](https://nodejs.org/en) v18 atau lebih baru
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

### Instalasi

1. **Kloning repositori ini:**
    ```sh
    git clone https://github.com/suzuy1/Pixel-Pomodoro.git
    ```
2. **Masuk ke folder proyek:**
    ```sh
    cd Pixel-Pomodoro
    ```
3. **Install dependensi:**
    ```sh
    npm install
    ```
    atau jika menggunakan yarn:
    ```sh
    yarn install
    ```
4. **Siapkan variabel lingkungan untuk API Gemini:**
    - Buat file `.env.local` di root project.
    - Isi dengan:
      ```
      GEMINI_API_KEY=KUNCI_API_ANDA
      ```
    - Dapatkan kunci API Gemini dari [Firebase Genkit](https://firebase.google.com/docs/genkit).

### Menjalankan Aplikasi

Jalankan server pengembangan:

```sh
npm run dev
```
atau
```sh
yarn dev
```

Buka [http://localhost:9002](http://localhost:9002) di browser Anda untuk melihat aplikasi.

---

## 📸 Demo

*Jika sudah tersedia, tambahkan tautan demo di sini!*

---

## 🤝 Kontribusi

Kontribusi sangat terbuka! Silakan buka issue atau pull request untuk fitur, perbaikan bug, atau saran.

---

## 📄 Lisensi

MIT License. Lihat file LICENSE untuk detail lebih lanjut.

---

> Proyek ini dikembangkan menggunakan [Firebase Studio](https://firebase.google.com/products/extensions/firebase-studio).
