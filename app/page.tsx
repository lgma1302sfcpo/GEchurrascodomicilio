"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Flame, Instagram, Menu, ShieldCheck, Sparkles, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const WHATSAPP_PHONE = "5511953410076";
const INSTAGRAM_URL = "https://instagram.com/gechurrascodomicilio";
const MESSAGE = "Olá! Vi o trabalho de vocês e gostaria de pedir um orçamento para meu evento.";
const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(MESSAGE)}`;

const photos = {
  fire: "/images/hero-fire.png",
  event: "/images/event-night.png",
  craft: "/images/craft-cut.png",
  table: "/images/table-spread.png",
};

const services = [
  ["Aniversários", photos.event, "50% 50%"],
  ["Festas", photos.table, "50% 55%"],
  ["Confraternizações", photos.fire, "65% 50%"],
  ["Eventos corporativos", photos.event, "80% 50%"],
  ["Casamentos", photos.table, "30% 50%"],
  ["Eventos particulares", photos.craft, "50% 45%"],
];

const story = [
  ["Acende.", photos.fire],
  ["Prepara.", photos.craft],
  ["Serve.", photos.table],
  ["Comemora.", photos.event],
];

const gallery = [
  [photos.fire, "A brasa", "gallery-tall", "62% 50%"],
  [photos.event, "O evento", "gallery-wide", "48% 50%"],
  [photos.craft, "O corte", "gallery-square", "50% 42%"],
  [photos.table, "À mesa", "gallery-tall", "50% 50%"],
  [photos.event, "A celebração", "gallery-square", "78% 50%"],
  [photos.fire, "O fogo", "gallery-wide", "35% 65%"],
  [photos.table, "Os detalhes", "gallery-square", "20% 55%"],
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

function WhatsAppIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.9 7.9 0 0 0-2.327-5.607M7.994 14.521a6.57 6.57 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.25a6.56 6.56 0 0 1-1.007-3.505c0-3.652 2.972-6.625 6.631-6.625a6.59 6.59 0 0 1 4.686 1.944 6.58 6.58 0 0 1 1.94 4.69c-.004 3.655-2.976 6.629-6.67 6.629m3.639-4.95c-.197-.098-1.177-.58-1.36-.646-.182-.065-.315-.098-.447.099-.133.197-.513.646-.63.775-.116.13-.232.145-.43.049-.197-.099-.836-.308-1.592-.984-.59-.525-.986-1.174-1.101-1.372-.116-.197-.012-.304.086-.401.088-.088.197-.232.296-.348.098-.116.132-.197.197-.33.066-.132.033-.248-.016-.347-.05-.099-.448-1.077-.612-1.474-.16-.388-.323-.335-.447-.341l-.38-.007a.73.73 0 0 0-.528.248c-.182.198-.694.678-.694 1.654s.71 1.916.81 2.049c.098.132 1.394 2.13 3.38 2.988.473.204.842.326 1.13.417.475.151.907.13 1.249.079.38-.057 1.176-.481 1.342-.946.164-.465.164-.864.115-.946-.049-.082-.182-.132-.38-.23" />
    </svg>
  );
}

function Brand({ full = false }: { full?: boolean }) {
  return (
    <a href="#inicio" className={`brand${full ? " brand-full" : ""}`} aria-label="G&E Churrasco a Domicílio — início">
      <Image src="/images/logo-ge-dark.png" alt="G&E Churrasco a Domicílio" width={1536} height={1536} priority={!full} />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["Experiência", "#experiencia"], ["Eventos", "#servicos"], ["Galeria", "#galeria"]];
  return (
    <motion.header initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: .9, delay: .25 }} className="header">
      <Brand />
      <nav className="desktop-nav">
        {links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      </nav>
      <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Orçamento <ArrowRight size={16} /></a>
      <button className="menu-button" onClick={() => setOpen(true)} aria-label="Abrir menu"><Menu /></button>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}>
            <button onClick={() => setOpen(false)} aria-label="Fechar menu"><X /></button>
            <Brand />
            <nav>{links.map(([label, href]) => <a href={href} onClick={() => setOpen(false)} key={href}>{label}</a>)}</nav>
            <a className="button button-fire" href={whatsappUrl} target="_blank" rel="noreferrer">Quero um orçamento</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-media parallax-image"><Image src={photos.fire} alt="Carnes grelhando sobre a brasa" fill priority sizes="100vw" /></div>
      <div className="hero-shade" />
      <div className="embers" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</div>
      <div className="hero-content container">
        <div className="hero-kicker"><span /> Churrasco a domicílio</div>
        <h1 aria-label="O churrasco vai até você.">{["O", "churrasco", "vai", "até", "você."].map((word, i) => <span className="hero-word-wrap" key={word}><motion.span initial={{ y: "115%" }} animate={{ y: 0 }} transition={{ duration: .9, delay: .38 + i * .08, ease: [0.16, 1, 0.3, 1] }}>{word}</motion.span></span>)}</h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.08 }}>Festas. Eventos. Bons momentos.</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.22 }}>
          <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: .98 }} className="button button-fire" href={whatsappUrl} target="_blank" rel="noreferrer">Quero um orçamento <ArrowRight size={18} /></motion.a>
          <a className="text-link" href="#galeria">Ver nosso trabalho <ArrowDown size={16} /></a>
        </motion.div>
      </div>
      <div className="hero-index">01 <span /> 10</div>
      <div className="scroll-hint"><span>DESCUBRA</span><i /></div>
    </section>
  );
}

function Impact() {
  return (
    <section id="experiencia" className="impact reveal-section">
      <div className="impact-media parallax-image"><Image src={photos.event} alt="Evento com churrasco ao vivo" fill sizes="100vw" /></div>
      <div className="impact-shade" />
      <div className="impact-copy"><Eyebrow>A EXPERIÊNCIA G&E</Eyebrow><h2>A brasa começa.<br /><em>Você aproveita.</em></h2></div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicos" className="section services container">
      <div className="section-heading"><div><Eyebrow>DO SEU JEITO</Eyebrow><h2>Seu evento.<br /><em>Nossa brasa.</em></h2></div><p>Do encontro íntimo<br />à grande celebração.</p></div>
      <div className="service-grid">
        {services.map(([title, src, pos], i) => (
          <motion.article className="service-card reveal-card" whileHover="hover" key={title}>
            <motion.div className="service-media" variants={{ hover: { scale: 1.06 } }} transition={{ duration: .7 }}>
              <Image src={src} alt={title} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectPosition: pos }} />
            </motion.div>
            <div className="service-overlay" />
            <span className="service-number">0{i + 1}</span>
            <motion.h3 variants={{ hover: { y: -8 } }}>{title}</motion.h3>
            <motion.div className="round-arrow" variants={{ hover: { backgroundColor: "#d95b27", rotate: -35 } }}><ArrowRight /></motion.div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Differentials() {
  const items = [[Flame, "Na brasa", "Preparado no evento."], [Sparkles, "Qualidade", "Ingredientes selecionados."], [ShieldCheck, "Sem preocupação", "Você aproveita a festa."]];
  return (
    <section className="section differences container">
      <div className="difference-title"><Eyebrow>SIMPLES ASSIM</Eyebrow><h2>Você chama.<br /><em>A gente leva.</em></h2></div>
      <div className="difference-list">{items.map(([Icon, title, text], i) => <div className="difference-item" key={title as string}><span className="diff-num">0{i + 1}</span><Icon size={31} strokeWidth={1.35} /><div><h3>{title as string}</h3><p>{text as string}</p></div></div>)}</div>
    </section>
  );
}

function CinematicStory() {
  return (
    <section className="story" aria-label="Da brasa à celebração">
      <div className="story-sticky">
        {story.map(([word, src], i) => <div className={`story-frame frame-${i}`} key={word}><Image src={src} alt="" fill sizes="100vw" style={{ objectPosition: i === 3 ? "55% 50%" : "50% 50%" }} /><div /></div>)}
        <div className="story-copy">{story.map(([word], i) => <h2 className={`story-word word-${i}`} key={word}>{word}</h2>)}</div>
        <div className="story-side">O RITUAL<br /><span>G&E</span></div>
        <div className="story-progress"><i /></div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [close]);
  return (
    <section id="galeria" className="section gallery container">
      <div className="section-heading"><div><Eyebrow>EM CADA DETALHE</Eyebrow><h2>Veja<br /><em>de perto.</em></h2></div><p>Fogo. Sabor.<br />Gente feliz.</p></div>
      <div className="gallery-grid">{gallery.map(([src, label, cls, pos], i) => <button className={`gallery-item ${cls} reveal-card`} onClick={() => setActive(i)} key={`${label}-${i}`} aria-label={`Ampliar: ${label}`}><Image src={src} alt={label} fill sizes="(max-width: 700px) 100vw, 50vw" style={{ objectPosition: pos }} /><span>{label} <ArrowRight size={16} /></span></button>)}</div>
      <AnimatePresence>{active !== null && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}><button onClick={close} aria-label="Fechar"><X /></button><motion.div initial={{ scale: .94 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()}><Image src={gallery[active][0]} alt={gallery[active][1]} fill sizes="90vw" /></motion.div></motion.div>}</AnimatePresence>
    </section>
  );
}

function Count({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.fromTo(ref.current, { textContent: 0 }, { textContent: value, duration: 1.8, snap: { textContent: 1 }, scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } });
    return () => { tween.kill(); };
  }, [value]);
  return <><span ref={ref}>0</span>{suffix}</>;
}

function Numbers() {
  return <section className="numbers"><div className="container number-grid"><div><strong>+<Count value={100} /></strong><span>EVENTOS</span></div><div><strong>+<Count value={500} /></strong><span>CONVIDADOS FELIZES</span></div><div><strong><Count value={5} suffix="★" /></strong><span>AVALIAÇÕES</span></div></div></section>;
}

function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const testimonials = [["Churrasco sensacional e equipe incrível.", "Mariana"], ["Foi o destaque da nossa festa.", "Rafael"], ["Tudo impecável, do fogo ao atendimento.", "Fernanda"], ["Nossos convidados amaram a experiência.", "Lucas"]];
  return (
    <section className="section testimonials">
      <div className="container testimonial-head"><div><Eyebrow>QUEM PROVOU</Eyebrow><h2>Momentos que<br /><em>ficam.</em></h2></div><div className="carousel-controls"><button onClick={() => emblaApi?.scrollPrev()} aria-label="Anterior"><ChevronLeft /></button><button onClick={() => emblaApi?.scrollNext()} aria-label="Próximo"><ChevronRight /></button></div></div>
      <div className="embla" ref={emblaRef}><div className="embla-container">{testimonials.map(([text, name]) => <div className="testimonial-slide" key={name}><div className="stars">★★★★★</div><blockquote>“{text}”</blockquote><cite>— {name}</cite></div>)}</div></div>
    </section>
  );
}

function InstagramSection() {
  const tiles = [[photos.event, "50% 50%"], [photos.craft, "50% 45%"], [photos.fire, "70% 60%"], [photos.table, "52% 55%"], [photos.event, "85% 50%"], [photos.fire, "35% 50%"]];
  return <section className="section instagram-section container"><div className="instagram-head"><div><Eyebrow>SIGA A BRASA</Eyebrow><h2>Acontecendo<br /><em>por aí.</em></h2></div><div><Instagram size={20} /><span>@gechurrascodomicilio</span></div></div><div className="instagram-grid">{tiles.map(([src, pos], i) => <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" key={i}><Image src={src} alt="Evento G&E" fill sizes="(max-width: 700px) 50vw, 17vw" style={{ objectPosition: pos }} /><span><Instagram /></span></a>)}</div><a className="instagram-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Ver Instagram <ArrowRight size={18} /></a></section>;
}

function FinalCTA() {
  return <section className="final-cta"><Image src={photos.event} alt="Celebração com churrasco G&E" fill sizes="100vw" style={{ objectPosition: "50% 52%" }} /><div className="final-shade" /><div><Eyebrow>O PRÓXIMO É O SEU</Eyebrow><h2>Vai ter festa?</h2><p>Deixa o churrasco com a gente.</p><motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: .98 }} className="button button-fire button-large" href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsAppIcon size={21} /> Pedir orçamento no WhatsApp</motion.a></div></section>;
}

function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 3500); return () => clearTimeout(t); }, []);
  return <div className="floating-whatsapp"><AnimatePresence>{show && <motion.span initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>Vai fazer um evento?</motion.span>}</AnimatePresence><motion.a className="whatsapp-trigger" whileHover={{ scale: 1.1 }} whileTap={{ scale: .94 }} href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Pedir orçamento no WhatsApp"><WhatsAppIcon size={29} className="whatsapp-mark" /></motion.a></div>;
}

function Footer() {
  return <footer className="footer container"><Brand full /><span>Fogo aceso. Festa pronta.</span><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><Instagram size={18} /> @gechurrascodomicilio</a><small>© {new Date().getFullYear()} G&E Churrasco a Domicílio</small></footer>;
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    const ctx = gsap.context(() => {
      gsap.to(".hero-media", { scale: 1, duration: 2.2, ease: "power2.out" });
      gsap.utils.toArray<HTMLElement>(".parallax-image img").forEach(img => gsap.to(img, { yPercent: 10, ease: "none", scrollTrigger: { trigger: img.parentElement, scrub: true } }));
      gsap.fromTo(".impact-media", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".impact", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".reveal-card").forEach(el => gsap.from(el, { clipPath: "inset(0 0 100% 0)", y: 35, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
      story.forEach((_, i) => {
        gsap.set(`.frame-${i}`, { opacity: i === 0 ? 1 : 0 });
        gsap.set(`.word-${i}`, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 70 });
        if (i > 0) {
          const pos = (i / story.length) * 100;
          gsap.to(`.frame-${i - 1}`, { opacity: 0, scrollTrigger: { trigger: ".story", start: `${pos}% top`, end: `${pos + 8}% top`, scrub: true } });
          gsap.to(`.frame-${i}`, { opacity: 1, scrollTrigger: { trigger: ".story", start: `${pos}% top`, end: `${pos + 8}% top`, scrub: true } });
          gsap.to(`.word-${i - 1}`, { opacity: 0, y: -60, scrollTrigger: { trigger: ".story", start: `${pos}% top`, end: `${pos + 6}% top`, scrub: true } });
          gsap.to(`.word-${i}`, { opacity: 1, y: 0, scrollTrigger: { trigger: ".story", start: `${pos}% top`, end: `${pos + 7}% top`, scrub: true } });
        }
      });
      gsap.to(".story-progress i", { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".story", start: "top top", end: "bottom bottom", scrub: true } });
    }, root);
    return () => { ctx.revert(); cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);
  return <main ref={root}><Header /><Hero /><Impact /><Services /><Differentials /><CinematicStory /><Gallery /><Numbers /><Testimonials /><InstagramSection /><FinalCTA /><Footer /><FloatingWhatsApp /></main>;
}
