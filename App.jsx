import { useEffect } from "react";
import Space from "./Space.jsx";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Tentang from "./Tentang.jsx";
import Media from "./Media.jsx";
import Struktur from "./Struktur.jsx";
import Anggota from "./Anggota.jsx";
import Gallery from "./Gallery.jsx";
import Prestasi from "./Prestasi.jsx";
import Footer from "./Footer.jsx";
import { KELAS } from "./data.js";

export default function App() {
  useEffect(() => { document.title = `Kelas ${KELAS.nama} • ${KELAS.sekolah}`; }, []);
  return (
    <>
      <Space />
      <Navbar />
      <main className="relative z-10">
        <Hero /><Tentang /><Media /><Struktur /><Anggota /><Gallery /><Prestasi />
      </main>
      <Footer />
    </>
  );
}
