import { useEffect, useRef } from "react";
import bgDefault from "./latar.jpg";
import { LATAR } from "./data.js";

// Latar: foto hitam-putih + bintang redup. Dibuat ringan: tanpa filter blur,
// bintang berhenti bergerak saat di-scroll dan hanya ~30 fps, supaya scroll mulus.
export default function Space() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext("2d");
    let W, H, raf, last = 0, scrolling = false, st, stars = [], shoot = [];
    const resize = () => {
      W = c.width = innerWidth; H = c.height = innerHeight;
      stars = Array.from({ length: Math.min(110, W / 7) }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + 0.2,
        s: Math.random() * 0.3 + 0.04, p: Math.random() * 6,
      }));
    };
    const onScroll = () => { scrolling = true; clearTimeout(st); st = setTimeout(() => { scrolling = false; }, 180); };
    resize(); addEventListener("resize", resize); addEventListener("scroll", onScroll, { passive: true });
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (scrolling || document.hidden || t - last < 33) return;
      last = t;
      x.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        s.y += s.s; if (s.y > H) { s.y = 0; s.x = Math.random() * W; }
        x.globalAlpha = 0.25 + 0.5 * Math.abs(Math.sin(t / 1100 + s.p));
        x.fillStyle = "#ffffff";
        x.beginPath(); x.arc(s.x, s.y, s.r, 0, 7); x.fill();
      });
      if (Math.random() < 0.006) shoot.push({ x: Math.random() * W * 0.7, y: Math.random() * H * 0.4, l: 0 });
      shoot = shoot.filter((s) => s.l < 35);
      shoot.forEach((s) => {
        s.l++; s.x += 16; s.y += 7;
        const g = x.createLinearGradient(s.x, s.y, s.x - 90, s.y - 40);
        g.addColorStop(0, "#fff"); g.addColorStop(1, "transparent");
        x.globalAlpha = (1 - s.l / 35) * 0.8; x.strokeStyle = g; x.lineWidth = 1.5;
        x.beginPath(); x.moveTo(s.x, s.y); x.lineTo(s.x - 90, s.y - 40); x.stroke();
      });
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); clearTimeout(st); removeEventListener("resize", resize); removeEventListener("scroll", onScroll); };
  }, []);

  const img = LATAR.gambar || bgDefault;
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050505]" style={{ isolation: "isolate" }}>
      {/* foto latar (hitam-putih, HD) */}
      <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${img})`, backgroundPosition: LATAR.posisi, transform: "translateZ(0)", willChange: "transform" }} />
      {LATAR.warna && <div className="absolute inset-0" style={{ background: LATAR.warna, mixBlendMode: "multiply" }} />}
      <div className="absolute inset-0" style={{ background: `rgba(0,0,0,${LATAR.gelap})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      <canvas ref={ref} className="absolute inset-0 opacity-35" />
    </div>
  );
}
