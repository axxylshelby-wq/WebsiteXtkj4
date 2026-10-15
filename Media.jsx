import { useEffect, useRef, useState } from "react";
import * as D from "./data.js";
import { Heading, Reveal, Section, clean, initials } from "./ui.jsx";

const MEDIA = D.MEDIA || {};
const IG = D.INSTAGRAM || {}; // opsional: nama, bio, avatar, postingan, pengikut, mengikuti, foto[3], tampilan

// Ubah link Spotify biasa menjadi link embed (track / playlist / album / episode)
const spotifyEmbed = (url) => {
  const m = (url || "").match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|playlist|album|episode|show|artist)\/([A-Za-z0-9]+)/);
  return m ? { src: `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0`, tall: !["track", "episode"].includes(m[1]) } : null;
};

// Ubah link YouTube (video / playlist) menjadi embed. Selalu diputar dari awal (start=0).
const youtubeEmbed = (url) => {
  const u = (url || "").trim(); if (!u) return null;
  const list = u.match(/[?&]list=([\w-]+)/);
  const id = u.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|music\.youtube\.com\/watch\?(?:.*&)?v=)([\w-]{11})/);
  const opt = "rel=0&modestbranding=1&playsinline=1";
  if (id) return { src: `https://www.youtube-nocookie.com/embed/${id[1]}?start=0&${opt}${list ? `&list=${list[1]}` : ""}` };
  if (list) return { src: `https://www.youtube-nocookie.com/embed/videoseries?list=${list[1]}&${opt}` };
  return null;
};

const Head = ({ badge, warna, title, sub }) => (
  <div className="mb-4 flex items-center gap-3">
    <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${warna} font-head text-base font-bold`}>{badge}</div>
    <div><p className="font-head text-xl font-bold uppercase tracking-wide">{title}</p><p className="text-xs text-slate-400">{sub}</p></div>
  </div>
);
const Note = ({ children }) => <p className="mt-3 text-center text-[11px] italic text-slate-500">{children}</p>;
const Cam = () => (
  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="3" /><circle cx="9" cy="10" r="1.8" /><path d="M21 16l-5-5-8 8" /></svg>
);
const btn = "glass glow-hover mt-4 block rounded-xl px-4 py-2.5 text-center text-sm font-bold text-white";

// Kartu Instagram bertema glass: profil, 3 angka, 3 foto postingan
function InstaCard({ u }) {
  const stat = (v, l) => (
    <div className="glass rounded-xl px-2 py-2 text-center">
      <b className="block text-base leading-tight">{v || "—"}</b>
      <span className="text-[10px] uppercase tracking-wider text-slate-400">{l}</span>
    </div>
  );
  const fotos = [0, 1, 2].map((i) => { const f = (IG.foto || [])[i]; return typeof f === "string" ? { src: f } : f || {}; });
  return (
    <>
      <div className="flex items-center gap-3">
        {IG.avatar
          ? <img src={IG.avatar} alt={u} className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-white/60" />
          : <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-zinc-400 to-zinc-800 font-head text-lg ring-2 ring-white/60">{initials(IG.nama || u)}</div>}
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{IG.nama || `@${u}`}</p>
          {IG.bio && <p className="line-clamp-2 text-xs text-slate-400">{IG.bio}</p>}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">{stat(IG.postingan, "Postingan")}{stat(IG.pengikut, "Pengikut")}{stat(IG.mengikuti, "Mengikuti")}</div>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {fotos.map((f, i) => (
          <a key={i} href={f.link || `https://instagram.com/${u}`} target="_blank" rel="noopener noreferrer" className="group block aspect-square overflow-hidden rounded-xl border border-white/15 bg-white/5">
            {f.src
              ? <img src={f.src} alt={`Postingan ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              : <div className="grid h-full w-full place-items-center text-white/30"><Cam /></div>}
          </a>
        ))}
      </div>
      <a href={`https://instagram.com/${u}`} target="_blank" rel="noopener noreferrer" className={btn}>Buka @{u} ↗</a>
    </>
  );
}

// Tampilan LANGSUNG dari Instagram (real-time), dipotong agar hanya profil + baris foto teratas (3 postingan).
// Tidak bisa di-scroll di dalamnya (agar scroll halaman tetap mulus); ketuk area ini untuk membuka Instagram.
function InstaEmbed({ u }) {
  const box = useRef(null); const [w, setW] = useState(280);
  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width)); ro.observe(box.current);
    return () => ro.disconnect();
  }, []);
  const W0 = IG.lebarAsli || 480;                     // lebar asli embed sebelum diperkecil (makin besar = makin kecil tampilannya)
  const sk = Math.min(1, w / W0);                     // skala pengecilan
  const Wi = w / sk;                                  // lebar iframe sebenarnya
  const h = Math.round(((IG.tinggiHeader || 190) + (IG.baris || 1) * (Wi / 3) + 6) * sk);
  return (
    <div ref={box}>
      <div className="relative overflow-hidden rounded-2xl bg-white" style={{ height: h }}>
        <iframe src={`https://www.instagram.com/${u}/embed`} title="Instagram kelas" loading="lazy" scrolling="no" tabIndex={-1}
          className="pointer-events-none absolute left-0 top-0 border-0" style={{ width: Wi, height: 760, transform: `scale(${sk})`, transformOrigin: "top left" }} />
        <a href={`https://instagram.com/${u}`} target="_blank" rel="noopener noreferrer" aria-label="Buka Instagram kelas" className="absolute inset-0" />
      </div>
      <a href={`https://instagram.com/${u}`} target="_blank" rel="noopener noreferrer" className={btn}>Buka @{u} ↗</a>
    </div>
  );
}

// Pemutar lagu bergaya Spotify: memutar file lagu penuh, selalu dari awal (0:00).
function AudioCard({ L }) {
  const a = useRef(null); const [on, setOn] = useState(false); const [t, setT] = useState(0); const [dur, setDur] = useState(0);
  const mm = (x) => `${Math.floor(x / 60)}:${String(Math.floor(x % 60)).padStart(2, "0")}`;
  const toggle = () => { const el = a.current; if (!el) return; if (el.paused) el.play().catch(() => {}); else el.pause(); };
  const seek = (e) => { const r = e.currentTarget.getBoundingClientRect(); if (dur) a.current.currentTime = ((e.clientX - r.left) / r.width) * dur; };
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <audio ref={a} src={L.file} preload="metadata"
        onPlay={() => setOn(true)} onPause={() => setOn(false)} onEnded={() => { setOn(false); a.current.currentTime = 0; }}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDur(e.currentTarget.duration)} />
      <div className="flex items-center gap-4">
        {L.cover
          ? <img src={L.cover} alt={L.judul} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
          : <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-zinc-400 to-zinc-800 text-3xl">♪</div>}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{L.judul || "Lagu kelas"}</p>
          <p className="truncate text-xs text-slate-400">{L.artis}</p>
        </div>
        <button onClick={toggle} aria-label={on ? "Jeda" : "Putar"} className="glass glow-hover grid h-11 w-11 shrink-0 place-items-center rounded-full text-white">{on ? "❚❚" : "▶"}</button>
      </div>
      <div onClick={seek} className="mt-4 h-1.5 w-full cursor-pointer rounded-full bg-white/15"><div className="h-full rounded-full bg-white" style={{ width: dur ? `${(t / dur) * 100}%` : "0%" }} /></div>
      <div className="mt-1 flex justify-between text-[10px] text-slate-500"><span>{mm(t)}</span><span>{dur ? mm(dur) : "--:--"}</span></div>
    </div>
  );
}

function InstaMock() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-zinc-400 to-zinc-800 font-head text-lg">IG</div>
        <div><p className="text-sm font-bold">@username_kelas</p><p className="text-xs text-slate-400">Nama akun Instagram kelas</p></div>
      </div>
      <Note>Contoh tampilan — isi username Instagram di data.js</Note>
    </div>
  );
}
function SpotifyMock() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center gap-4">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-zinc-400 to-zinc-800 text-3xl">♪</div>
        <div className="min-w-0"><p className="truncate text-sm font-bold">Judul lagu tampil di sini</p><p className="text-xs text-slate-400">Nama artis</p></div>
      </div>
      <Note>Contoh tampilan — isi link Spotify di data.js</Note>
    </div>
  );
}

export default function Media() {
  const u = clean(MEDIA.instagram || ""); const sp = spotifyEmbed(MEDIA.spotify); const yt = youtubeEmbed(MEDIA.youtube); const L = MEDIA.lagu && MEDIA.lagu.file ? MEDIA.lagu : null;
  return (
    <Section id="media">
      <Heading blue sub="Cerita kami di media sosial: akun kelas dan lagu yang menemani perjalanan kami.">Media Sosial</Heading>
      <div className="grid items-start gap-5 md:grid-cols-2">
        <Reveal className="glass rounded-3xl p-5">
          <Head badge="IG" warna="from-zinc-300 to-zinc-600" title="Class Instagram" sub={u ? `@${u}` : "Akun Instagram kelas"} />
          {!u ? <InstaMock /> : IG.tampilan === "kartu" ? <InstaCard u={u} /> : <InstaEmbed u={u} />}
        </Reveal>
        <Reveal d={0.1} className="glass rounded-3xl p-5">
          {L ? (
            <>
              <Head badge="♪" warna="from-zinc-300 to-zinc-600" title="Musik Kelas" sub="Diputar dari awal" />
              <AudioCard L={L} />
            </>
          ) : yt ? (
            <>
              <Head badge="YT" warna="from-zinc-300 to-zinc-600" title="Musik Kelas" sub="Diputar dari awal" />
              <div className="h-[200px] w-full overflow-hidden rounded-2xl bg-black">
                <iframe src={yt.src} title="Musik kelas" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin" className="h-full w-full border-0" />
              </div>
            </>
          ) : (
            <>
              <Head badge="SP" warna="from-zinc-300 to-zinc-600" title="Spotify" sub="Lagu kelas kami" />
              {sp ? (
                <iframe src={sp.src} title="Spotify kelas" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className={`w-full rounded-2xl ${sp.tall ? "h-[352px]" : "h-[152px]"}`} />
              ) : <SpotifyMock />}
            </>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
