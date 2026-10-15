import { BRAND, FOOTER, NAV } from "./data.js";
import { clean, initials } from "./ui.jsx";

const H = ({ children }) => (
  <div className="mb-4"><h4 className="font-head text-lg font-bold uppercase tracking-wide">{children}</h4><div className="mt-1 h-0.5 w-10 bg-sky-400" /></div>
);

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black px-5 pb-8 pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-head text-2xl font-bold">{BRAND[0]}<span className="text-sky-400">{BRAND[1]}</span></p>
          <p className="mt-3 text-sm italic leading-relaxed text-slate-400">{FOOTER.deskripsi}</p>
        </div>
        <div>
          <H>Quick Link</H>
          <ul className="space-y-2 text-sm italic text-slate-400">{NAV.map(([id, l]) => <li key={id}><a href={"#" + id} className="transition hover:text-sky-400">{l}</a></li>)}</ul>
        </div>
        <div><H>Address</H><p className="text-sm italic leading-relaxed text-slate-400">{FOOTER.alamat}</p></div>
        <div>
          <H>Created By</H>
          <ul className="space-y-3">
            {FOOTER.pembuat.map((p) => (
              <li key={p.nama}>
                <a href={`https://instagram.com/${clean(p.ig)}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/10 text-sm font-bold transition group-hover:border-sky-400">{initials(p.nama)}</span>
                  <span>
                    <span className="block text-sm font-bold transition group-hover:text-sky-400">{p.nama}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-sky-400">{p.peran}</span>
                    <span className="block text-xs text-slate-400">@{clean(p.ig)} ↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} {BRAND[0]}{BRAND[1]} • All rights reserved.</p>
    </footer>
  );
}
