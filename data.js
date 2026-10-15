// ============================================================
//  SEMUA ISI WEBSITE DIEDIT DI FILE INI.
//  Foto: taruh di folder /public, lalu isi misal src: "/kelas.jpg"
//  (src kosong = tampil kotak placeholder)
// ============================================================
export const BRAND = ["KELAS", "XTKJ4"]; // logo teks: putih + biru
export const KELAS = {
  nama: "X TKJ 4",
  sekolah: "SMKS Teladan Medan",
  berdiri: "1989",     // tahun sekolah berdiri (kosong = tidak ditampilkan)
  foto: "https://files.catbox.moe/apraun.jpg", // foto kelas yang menyambut pengunjung di halaman utama, mis. "/kelas.jpg" (taruh di /public)
  fotoGelap: 0.25, // 0 - 1: makin besar, foto kelas makin gelap sehingga latar makin terlihat
};

// Latar belakang seluruh halaman: foto hitam-putih (latar.jpg) yang terlihat jelas
export const LATAR = {
  gambar: "https://files.catbox.moe/uhvo4q.jpg",           // kosong = pakai file latar.jpg bawaan. Isi link foto sendiri untuk mengganti (bisa juga timpa file latar.jpg)
  posisi: "center 40%", // bagian gambar yang diutamakan: "center top", "center 60%", dst
  gelap: 0.38,          // tingkat gelap 0 - 1 (makin kecil = foto makin terlihat)
  warna: "",            // kosong = hitam-putih asli. Isi hex (mis. "#b0102a") untuk mewarnai latar
};

// Kutipan yang mengetik bergantian di halaman utama
export const QUOTES = ["Jadikan setiap hari sebuah cerita.", "Raih impian, ukir prestasi!", "Belajar, berkarya, bertumbuh bersama."];

// Menu navbar: [id bagian, label]
export const NAV = [["home", "Home"], ["tentang", "Tentang"], ["media", "Media"], ["struktur", "Struktur"], ["anggota", "Anggota"], ["gallery", "Gallery"], ["prestasi", "Prestasi"]];

export const TENTANG = {
  deskripsi: "Kami adalah siswa-siswi Teknik Komputer dan Jaringan yang penuh semangat belajar, berkolaborasi, dan berkarya. Di sini, kami belajar, berbagi, dan tumbuh bersama untuk meraih impian di masa depan.",
};
// Info kelas & sekolah: [label, isi]. Bebas tambah / hapus / ubah.
export const INFO = [
  ["Sekolah", "SMK Teladan Medan"],
  ["Jurusan", "Teknik Komputer dan Jaringan"],
  ["Wali Kelas", "Suci Ayu Zul Fatiha"],
  ["Ketua Kelas", "Randova Huntal Ritonga"],
  ["Tahun Ajaran", "2026/2027"],
  ["Alamat", "Jl. Bersama No. 268-A / Jl. Pertiwi No. 95, Medan"],
];
// Statistik: [angka, label]
export const STATS = [[42, "Students"], [24, "Boys"], [18, "Girls"]];

// Media sosial kelas. Cukup isi dua kolom ini, preview-nya muncul otomatis di bagian Media:
//  - instagram: username Instagram kelas (mis. "kelas.xtkj4") -> tampil preview akun Instagram
//  - spotify  : link lagu/playlist/album Spotify (mis. "https://open.spotify.com/track/xxxx") -> tampil lagu + tombol putar
// TikTok sedang DINONAKTIFKAN. Data sebelumnya (untuk dikembalikan nanti):
//  { nama: "TikTok", handle: "@kelas.xiia", desk: "Video seru dan kreativitas tanpa batas.", link: "https://tiktok.com/", badge: "TT", warna: "from-slate-700 to-slate-900" }
export const MEDIA = {
  instagram: "xtkj4_netura",
  lagu: { file: "", judul: "", artis: "", cover: "" }, // file lagu sendiri (mis. "/lagu.mp3"): diputar penuh dari awal. Prioritas pertama
  youtube: "https://music.youtube.com/watch?v=b4gMZe_8sio", // link YouTube lagu kelas: diputar penuh dari awal (jika diisi, menggantikan Spotify)
  spotify: "",
};

// Instagram. tampilan: "embed" (bawaan) = LANGSUNG dari Instagram (real-time; latar putih milik Instagram), dipotong agar
// hanya menampilkan profil + 3 postingan terbaru. "kartu" = kartu bertema glass dengan angka & foto yang kamu isi sendiri.
export const INSTAGRAM = {
  tampilan: "embed",
  tinggiHeader: 190, // tinggi bagian profil pada tampilan embed (px). Naikkan jika foto terpotong, turunkan jika ada ruang kosong
  baris: 1,          // jumlah baris foto yang ditampilkan (1 baris = 3 postingan)
  // --- hanya untuk tampilan "kartu" ---
  nama: "", bio: "", avatar: "", postingan: "", pengikut: "", mengikuti: "", foto: ["", "", ""],
};

// Struktur kelas (bagan). Warna pengurus: "green" atau "pink"
export const STRUKTUR = {
  wali: { peran: "Wali Kelas", nama: "Frau Suci" },
  pimpinan: [{ peran: "Ketua Kelas", nama: "Randova" }, { peran: "Wakil Ketua", nama: "Safira" }],
  pengurus: [
    { peran: "Sekretaris 1", nama: "Najwa", w: "green" },
    { peran: "Sekretaris 2", nama: "Winda", w: "green" },
    { peran: "Bendahara 1", nama: "Nisa", w: "pink" },
    { peran: "Bendahara 2", nama: "Citra", w: "pink" },
  ],
};

// Jumlah item per halaman
export const PER_PAGE = 8;          // anggota
export const GALLERY_PER_PAGE = 4;  // gallery
export const PRESTASI_PER_PAGE = 3; // prestasi

// Anggota (dari daftar hadir). Isi ig dengan username Instagram masing-masing (boleh pakai @).
// foto opsional: "/andi.jpg" (taruh di /public)
export const SISWA = [
  { nama: "Abdillah Nada Suhana", ig: "", foto: "" },
  { nama: "Ahmad Akbar Syahrial", ig: "", foto: "" },
  { nama: "Alyndra Naufal Aulia Zafa", ig: "", foto: "" },
  { nama: "Angga Pratama Damanik", ig: "", foto: "" },
  { nama: "Azka Raffa Nasution", ig: "", foto: "" },
  { nama: "Citra Putri Syakila", ig: "", foto: "" },
  { nama: "Delvino", ig: "", foto: "" },
  { nama: "Dinda Dwi Lestari", ig: "", foto: "" },
  { nama: "Dino Revaldo Hutabarat", ig: "", foto: "" },
  { nama: "Fari Ramadan", ig: "", foto: "" },
  { nama: "Fatih Fathoni", ig: "", foto: "" },
  { nama: "Hafizah Rahma Harahap", ig: "", foto: "" },
  { nama: "Indra Pratama", ig: "", foto: "" },
  { nama: "Iqbal Harun Nasution", ig: "", foto: "" },
  { nama: "Jeni Meilandri", ig: "", foto: "" },
  { nama: "M Irgi Fahrizi", ig: "@irgii_shelby", foto: "https://files.catbox.moe/p9ivcv.jpg" },
  { nama: "M. Fatan Al Farizi LBS", ig: "", foto: "" },
  { nama: "M. Royan", ig: "", foto: "" },
  { nama: "Marhama Lubis", ig: "", foto: "" },
  { nama: "Muhammad Fahrizi", ig: "", foto: "" },
  { nama: "Muhammad Syuhada", ig: "", foto: "" },
  { nama: "Muhammad Zaki Zabran", ig: "", foto: "" },
  { nama: "Nabila Syakieb Pohan", ig: "", foto: "" },
  { nama: "Najwa Asifa", ig: "", foto: "" },
  { nama: "Nayra Oktyaviani", ig: "", foto: "" },
  { nama: "Nazla Ramadhani", ig: "", foto: "" },
  { nama: "Nazwa Salsabila", ig: "", foto: "" },
  { nama: "Nia Ramadhani", ig: "", foto: "" },
  { nama: "Nova Annisa", ig: "", foto: "" },
  { nama: "Radit Abdul Fattah", ig: "", foto: "" },
  { nama: "Rafa Fairuz", ig: "", foto: "" },
  { nama: "Raffa Kurniawan", ig: "", foto: "" },
  { nama: "Randova Huntal Ritonga", ig: "", foto: "" },
  { nama: "Reyfan Ryan Putra", ig: "", foto: "" },
  { nama: "Rio Andika", ig: "", foto: "" },
  { nama: "Safira Rahmadani", ig: "", foto: "" },
  { nama: "Sartika Zahirah", ig: "", foto: "" },
  { nama: "Sherly Handayani", ig: "", foto: "" },
  { nama: "Silvi Oktaviani", ig: "", foto: "" },
  { nama: "Winda Octavia Hutagaol", ig: "", foto: "" },
  { nama: "Yuriz Pratama Simangunsong", ig: "", foto: "" },
  { nama: "Zaid Afham", ig: "@zaidafhamm28", foto: "https://image-link.edgeone.app/1792031505798-8igh94.jpg" },
];

// Gallery foto kegiatan
export const GALLERY = [
  { src: "", caption: "Foto bersama" }, { src: "", caption: "Kegiatan belajar" },
  { src: "", caption: "Study tour" }, { src: "", caption: "Hari kemerdekaan" },
  { src: "", caption: "Class meeting" }, { src: "", caption: "Perpisahan" },
  { src: "", caption: "Praktik lab" }, { src: "", caption: "Hari guru" },
];

// Prestasi
export const PRESTASI = [
  { judul: "Juara 1 Web Design", desk: "Meraih juara 1 lomba desain web tingkat kota dengan karya tim kelas.", src: "" },
  { judul: "Juara 2 Drama Musikal", desk: "Penampilan seni yang memukau dan penuh kekompakan seluruh anggota kelas.", src: "" },
  { judul: "Juara 3 Futsal", desk: "Kerja sama tim yang solid membawa kelas ke podium turnamen antarkelas.", src: "" },
  { judul: "Finalis LKS IT", desk: "Perwakilan kelas lolos hingga babak final tingkat provinsi.", src: "" },
  { judul: "Juara Kebersihan Kelas", desk: "Kelas terbersih dan terindah selama satu semester penuh.", src: "" },
];

// Footer
export const FOOTER = {
  deskripsi: "Website resmi kelas kami — tempat menyimpan cerita, momen, dan prestasi selama bersama.",
  alamat: "Jl. Bersama No. 268-A / Jl. Pertiwi No. 95, Kota Medan, Sumatera Utara",
  pembuat: [{ nama: "Irgy4you", peran: "Web Developer", ig: "irgii_shelby" }],
};
