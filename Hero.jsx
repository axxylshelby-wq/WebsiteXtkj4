import { motion } from "framer-motion";
import * as D from "./data.js";
import { useTyping } from "./ui.jsx";

const { KELAS, QUOTES } = D;

export default function Hero() {
  const t = useTyping(QUOTES);
  const gelap = KELAS.fotoGelap ?? 0.25; // 0-1: makin besar, foto makin gelap (latar makin terlihat)
  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center px-5 pb-14 pt-24 text-center">
      {/* Foto kelas: SELURUH foto terlihat (tidak dipotong / di-zoom), sedikit digelapkan agar latar tetap terlihat */}
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}
        className="glass relative w-fit max-w-full rounded-3xl p-2">
        {KELAS.foto ? (
          <div className="relative overflow-hidden rounded-2xl">
            <img src={KELAS.foto} alt={`Foto kelas ${KELAS.nama}`} className="block h-auto max-h-[46vh] w-auto max-w-full object-contain" />
            <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${gelap})` }} />
          </div>
        ) : (
          <div className="grid aspect-[16/9] w-[min(86vw,34rem)] place-items-center rounded-2xl bg-white/5">
            <svg viewBox="0 0 400 200" className="w-3/4 text-white/15" fill="currentColor">
              <circle cx="110" cy="70" r="26" /><path d="M60 170c0-34 22-56 50-56s50 22 50 56z" />
              <circle cx="200" cy="55" r="30" /><path d="M142 170c0-40 26-66 58-66s58 26 58 66z" />
              <circle cx="290" cy="70" r="26" /><path d="M240 170c0-34 22-56 50-56s50 22 50 56z" />
            </svg>
          </div>
        )}
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass mb-4 mt-8 inline-block rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[.25em] text-slate-200">
        {KELAS.sekolah}{KELAS.berdiri && ` • Sejak ${KELAS.berdiri}`}
      </motion.p>
      <h1 className="font-head font-bold uppercase leading-[.95] tracking-tight [text-shadow:0_6px_24px_rgba(0,0,0,.6)]">
        <motion.span initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="block text-4xl sm:text-6xl lg:text-7xl">Welcome to</motion.span>
        <motion.span initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.55 }} className="block text-5xl text-sky-400 sm:text-7xl lg:text-8xl">{KELAS.nama}</motion.span>
      </h1>
      <p className="glass mx-auto mt-5 block w-fit min-w-[min(88vw,22rem)] rounded-full px-6 py-2.5 text-base italic text-white sm:text-xl">“{t}<span className="ml-0.5 inline-block h-[1em] w-0.5 animate-blink bg-sky-400 align-[-.12em]" />”</p>
      <motion.a href="#tentang" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-6 text-2xl text-white/70">⌄</motion.a>
    </section>
  );
}
