import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const initials = (n) => n.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
export const clean = (u) => u.trim().replace(/^@/, "");

export function useTyping(words) {
  const [txt, setTxt] = useState(""); const [i, setI] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) { setTxt(w.slice(0, txt.length + 1)); if (txt.length + 1 === w.length) setTimeout(() => setDel(true), 1400); }
      else { setTxt(w.slice(0, txt.length - 1)); if (txt.length - 1 === 0) { setDel(false); setI(i + 1); } }
    }, del ? 35 : 80);
    return () => clearTimeout(t);
  }, [txt, del, i, words]);
  return txt;
}

export function useActive(ids) {
  const [a, setA] = useState(ids[0]);
  useEffect(() => {
    const o = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setA(e.target.id)), { rootMargin: "-40% 0px -55% 0px" });
    ids.forEach((id) => { const el = document.getElementById(id); el && o.observe(el); });
    return () => o.disconnect();
  }, [ids]);
  return a;
}

export function Counter({ to }) {
  const ref = useRef(null); const [n, setN] = useState(0);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; o.disconnect();
      let s = null;
      const step = (t) => { s = s ?? t; const p = Math.min((t - s) / 1400, 1); setN(Math.round(to * p)); p < 1 && requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
    o.observe(ref.current); return () => o.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

export const Reveal = ({ children, className = "", d = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay: d }} className={className}>{children}</motion.div>
);

export const Section = ({ id, children }) => <section id={id} className="relative z-10 mx-auto max-w-6xl px-5 py-20">{children}</section>;

export const Heading = ({ children, sub, blue }) => (
  <Reveal className="mb-10 text-center">
    <h2 className={`font-head text-4xl font-bold uppercase tracking-wide sm:text-5xl [text-shadow:0_2px_14px_rgba(0,0,0,.85)] ${blue ? "text-sky-400" : "text-white"}`}>{children}</h2>
    <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-sky-400 shadow-[0_0_14px_#ffffff]" />
    {sub && <p className="mx-auto mt-5 max-w-2xl text-sm italic leading-relaxed text-slate-300 [text-shadow:0_1px_8px_rgba(0,0,0,.9)]">{sub}</p>}
  </Reveal>
);

export function Pager({ page, pages, set }) {
  if (pages < 2) return null;
  const b = "glass rounded-md px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/20 disabled:opacity-40";
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button disabled={page === 0} onClick={() => set(page - 1)} className={b}>Prev</button>
      {Array.from({ length: pages }, (_, i) => (
        <button key={i} onClick={() => set(i)} className={`h-8 w-8 rounded-md text-sm font-semibold transition ${i === page ? "glass !border-white/80 !bg-white/25 text-white shadow-[0_0_14px_rgba(255,255,255,.35)]" : "glass text-white hover:bg-white/20"}`}>{i + 1}</button>
      ))}
      <button disabled={page === pages - 1} onClick={() => set(page + 1)} className={b}>Next</button>
    </div>
  );
}

export const Photo = ({ src, alt, className = "", i = 0 }) => src
  ? <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${className}`} />
  : <div className={`grid h-full w-full place-items-center ${className}`} style={{ background: `linear-gradient(135deg, hsl(0 0% ${26 + i * 2}%), #050505)` }}>
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></svg>
    </div>;
