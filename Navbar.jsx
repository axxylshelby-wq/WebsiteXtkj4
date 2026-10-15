import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND, NAV } from "./data.js";
import { useActive } from "./ui.jsx";

const ids = NAV.map((n) => n[0]);
const Logo = () => (
  <svg viewBox="0 0 40 40" className="h-9 w-9 drop-shadow-[0_0_8px_#ffffff]"><circle cx="20" cy="20" r="18" fill="none" stroke="#ffffff" strokeWidth="2.5" /><path d="M20 9l2.6 8.4L31 20l-8.4 2.6L20 31l-2.6-8.4L9 20l8.4-2.6z" fill="#fff" /></svg>
);

export default function Navbar() {
  const active = useActive(ids); const [open, setOpen] = useState(false);
  const bar = "absolute left-0 h-0.5 w-5 rounded bg-white";
  const link = ([id, l], mobile) => (
    <a key={id} href={"#" + id} onClick={() => setOpen(false)}
      className={`relative text-[13px] font-bold uppercase tracking-wider transition-colors ${mobile ? "block border-b border-white/10 px-6 py-4" : ""} ${active === id ? "text-white" : "text-slate-300 hover:text-white"}`}>
      {l}
      {active === id && !mobile && <motion.span layoutId="ul" className="absolute -bottom-2 left-0 h-0.5 w-full bg-sky-400 shadow-[0_0_10px_#ffffff]" />}
      {active === id && mobile && <span className="float-right text-sky-400">●</span>}
    </a>
  );
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#home" className="flex items-center gap-2.5 font-head text-2xl font-bold tracking-wide"><Logo />{BRAND[0]}<span className="-ml-1.5 text-sky-400">{BRAND[1]}</span></a>
        <nav className="hidden items-center gap-7 lg:flex">{NAV.map((n) => link(n, false))}</nav>
        <button onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open} className="grid h-10 w-10 place-items-center rounded-lg border border-white/20 lg:hidden">
          <span className="relative block h-3.5 w-5">
            <motion.span className={bar + " top-0"} animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }} />
            <motion.span className={bar + " top-[6px]"} animate={{ opacity: open ? 0 : 1 }} />
            <motion.span className={bar + " top-[12px]"} animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }} />
          </span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-t border-white/10 bg-black/85 backdrop-blur-md lg:hidden">
            {NAV.map((n) => link(n, true))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
