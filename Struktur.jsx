import { STRUKTUR } from "./data.js";
import { Heading, Reveal, Section } from "./ui.jsx";

const C = {
  violet: "border-white/70 shadow-[0_0_22px_rgba(255,255,255,.3)]",
  cyan: "border-white/50",
  green: "border-white/40",
  pink: "border-white/30",
};
const Box = ({ c, peran, nama }) => (
  <div className={`glass min-w-[104px] rounded-xl border-2 px-3 py-2 text-center ${C[c]}`}>
    <p className="text-[9px] font-bold uppercase tracking-wider opacity-85">{peran}</p>
    <p className="text-xs font-bold sm:text-sm">{nama}</p>
  </div>
);
const line = "bg-sky-300/80 shadow-[0_0_8px_#ffffff]";
const Stem = () => <div className={`mx-auto h-6 w-px ${line}`} />;
const Tier = ({ items, color }) => {
  const n = items.length;
  return (
    <div className="relative grid gap-3 pt-6" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
      {n > 1 && <span className={`absolute top-0 h-px ${line}`} style={{ left: `${50 / n}%`, right: `${50 / n}%` }} />}
      {items.map((b, i) => (
        <div key={i} className="relative flex justify-center"><span className={`absolute -top-6 h-6 w-px ${line}`} /><Box c={color(b)} {...b} /></div>
      ))}
    </div>
  );
};

export default function Struktur() {
  const { wali, pimpinan, pengurus } = STRUKTUR;
  return (
    <Section id="struktur">
      <Heading sub="Susunan pengurus kelas yang menjaga kebersamaan dan kekompakan kami.">Struktur Kelas</Heading>
      <Reveal className="overflow-x-auto pb-4">
        <div className="mx-auto min-w-[600px] max-w-3xl">
          <div className="flex justify-center"><Box c="violet" {...wali} /></div>
          <Stem />
          <Tier items={pimpinan} color={() => "cyan"} />
          <Stem />
          <Tier items={pengurus} color={(b) => b.w || "green"} />
        </div>
      </Reveal>
    </Section>
  );
}
