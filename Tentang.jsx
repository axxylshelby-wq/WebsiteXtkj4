import { KELAS, TENTANG, INFO, STATS } from "./data.js";
import { Counter, Heading, Reveal, Section } from "./ui.jsx";

export default function Tentang() {
  return (
    <Section id="tentang">
      <Heading sub={TENTANG.deskripsi}>Tentang {KELAS.nama}</Heading>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {INFO.map(([l, v], i) => (
          <Reveal key={l} d={i * 0.06} className="glass glow-hover rounded-2xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-sky-400">{l}</p>
            <p className="mt-1.5 text-sm font-bold leading-snug">{v}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="glass mt-10 grid grid-cols-3 gap-2 rounded-3xl px-4 py-12 text-center">
        {STATS.map(([n, l]) => (
          <div key={l}>
            <p className="font-head text-5xl font-bold sm:text-7xl"><Counter to={n} /></p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[.25em] text-slate-300 sm:text-sm">{l}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
