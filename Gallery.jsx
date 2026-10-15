import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY, GALLERY_PER_PAGE } from "./data.js";
import { Heading, Pager, Photo, Section } from "./ui.jsx";

export default function Gallery() {
  const pages = Math.max(1, Math.ceil(GALLERY.length / GALLERY_PER_PAGE));
  const [pg, setPg] = useState(0);
  const list = GALLERY.slice(pg * GALLERY_PER_PAGE, (pg + 1) * GALLERY_PER_PAGE);
  return (
    <Section id="gallery">
      <Heading sub="Saksikan momen spesial dan kegiatan seru kami di sini. Setiap foto menyimpan cerita tentang kebersamaan dan semangat kelas kami.">Gallery</Heading>
      <AnimatePresence mode="wait">
        <motion.div key={pg} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {list.map((f, i) => (
            <figure key={pg + "-" + i} className="group relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-white/30 shadow-[0_10px_30px_rgba(0,0,0,.5)]">
              <Photo src={f.src} alt={f.caption} i={pg * GALLERY_PER_PAGE + i} className="transition duration-500 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 text-xs font-bold">{f.caption}</figcaption>
            </figure>
          ))}
        </motion.div>
      </AnimatePresence>
      <Pager page={pg} pages={pages} set={setPg} />
    </Section>
  );
}
