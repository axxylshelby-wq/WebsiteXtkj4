import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PRESTASI, PRESTASI_PER_PAGE } from "./data.js";
import { Heading, Pager, Photo, Section } from "./ui.jsx";

export default function Prestasi() {
  const pages = Math.max(1, Math.ceil(PRESTASI.length / PRESTASI_PER_PAGE));
  const [pg, setPg] = useState(0);
  const list = PRESTASI.slice(pg * PRESTASI_PER_PAGE, (pg + 1) * PRESTASI_PER_PAGE);
  return (
    <Section id="prestasi">
      <Heading sub="Kami bangga dengan prestasi kami! Semua pencapaian ini adalah bukti kerja keras, kebersamaan, dan dedikasi kami.">Prestasi</Heading>
      <AnimatePresence mode="wait">
        <motion.div key={pg} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="grid items-start gap-5 md:grid-cols-3">
          {list.map((p, i) => (
            <article key={p.judul} className="glass glow-hover rounded-3xl p-3">
              <div className="aspect-video overflow-hidden rounded-2xl"><Photo src={p.src} alt={p.judul} i={pg * PRESTASI_PER_PAGE + i} /></div>
              <h3 className="mt-4 px-2 text-sm font-bold uppercase tracking-wide text-sky-400">{p.judul}</h3>
              <p className="mb-2 mt-2 px-2 text-xs italic leading-relaxed text-slate-200">{p.desk}</p>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>
      <Pager page={pg} pages={pages} set={setPg} />
    </Section>
  );
}
