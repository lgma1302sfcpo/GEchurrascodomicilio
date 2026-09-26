"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Flame, Instagram, Menu, ShieldCheck, Sparkles, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register before child effects create their scroll animations.
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_PHONE = "5513997302538";
const INSTAGRAM_URL = "https://instagram.com/gechurrascodomicilio";
const MESSAGE = "Olá! Vi o trabalho de vocês e gostaria de pedir um orçamento para meu evento.";
const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(MESSAGE)}`;

const photos = {
  fire: "/images/hero-fire.png",
  event: "/images/event-night.png",
  craft: "/images/craft-cut.png",
  table: "/images/table-spread.png",
  grillEvent: "/images/real-grill-event.jpeg",
  grillTeam: "/images/real-grill-team.jpeg",
  serviceTeam: "/images/real-service-team.jpeg",
  buffetChef: "/images/real-buffet-chef.jpeg",
  premiumCuts: "/images/real-premium-cuts.jpeg",
  chefRoast: "/images/real-chef-roast.jpeg",
  buffetStructure: "/images/real-buffet-structure.jpeg",
  teamBuffet: "/images/real-team-buffet.jpeg",
  birthdayBuffet: "/images/birthday-whatsapp-2026-09-04.jpeg",
  coffeeBreak: "/images/real-coffee-break.jpeg",
  fireRoast: "/images/real-fire-roast.jpeg",
  buffetSalads: "/images/real-buffet-salads.jpeg",
  saladTable: "/images/real-salad-table.jpeg",
  chefPortrait: "/images/real-chef-portrait.jpeg",
  eventOperation: "/images/real-event-operation.jpeg",
  rawBeef: "/images/real-raw-beef.jpeg",
};

const services = [
  ["Aniversários", photos.birthdayBuffet, "50% 24%", "Churrasco a domicílio servido em festa de aniversário em Santos"],
  ["Festas", photos.buffetChef, "52% 54%", "Chef preparando buffet de churrasco a domicílio para festa em Santos"],
  ["Confraternizações", photos.grillEvent, "50% 48%", "Churrasco a domicílio em confraternização de empresa na Baixada Santista"],
  ["Eventos corporativos", photos.coffeeBreak, "50% 52%", "Coffee break e churrasco a domicílio para evento corporativo em Santos"],
  ["Casamentos", photos.buffetSalads, "50% 62%", "Buffet de saladas e acompanhamentos para casamento com churrasco a domicílio"],
  ["Eventos particulares", photos.chefRoast, "50% 50%", "Churrasqueiro preparando carne na brasa em evento particular em Santos"],
];

const story = [
  ["Acende.", photos.fireRoast, "50% 64%"],
  ["Prepara.", photos.chefRoast, "50% 48%"],
  ["Serve.", photos.buffetStructure, "50% 57%"],
  ["Comemora.", photos.serviceTeam, "50% 35%"],
];

const gallery = [
  [photos.fireRoast, "A brasa", "gallery-tall", "50% 62%"],
  [photos.grillEvent, "O evento", "gallery-wide", "50% 48%"],
  [photos.rawBeef, "O corte", "gallery-square", "50% 62%"],
  [photos.buffetStructure, "À mesa", "gallery-tall", "50% 56%"],
  [photos.serviceTeam, "A celebração", "gallery-square", "50% 38%"],
  [photos.fire, "O fogo", "gallery-wide", "35% 65%"],
  [photos.saladTable, "Os detalhes", "gallery-square", "50% 58%"],
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
      <Image src="/images/logo-ge-dark.png" alt="G&E Churrasco a Domicílio" width={1536} height={1536} sizes={full ? "138px" : "84px"} />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["Experiência", "#experiencia"], ["Eventos", "#servicos"], ["Galeria", "#galeria"], ["Regiões", "#regioes"], ["Dúvidas", "#duvidas"]];
  return (
    <motion.header initial={false} className="header">
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
      <div className="hero-media parallax-image"><Image src={photos.fire} alt="Carnes grelhando sobre a brasa" fill preload sizes="100vw" /></div>
      <div className="hero-shade" />
      <div className="embers" aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</div>
      <div className="hero-content container">
        <div className="hero-kicker"><span /> Churrasco a domicílio</div>
        <h1>Churrasco a domicílio em Santos e região.</h1>
        <p>Churrasco completo para aniversários, casamentos, confraternizações e eventos corporativos, preparado na brasa direto no local do seu evento em Santos e Baixada Santista.</p>
        <div className="hero-actions">
          <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: .98 }} className="button button-fire" href={whatsappUrl} target="_blank" rel="noreferrer">Quero um orçamento <ArrowRight size={18} /></motion.a>
          <a className="text-link" href="#galeria">Ver nosso trabalho <ArrowDown size={16} /></a>
        </div>
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
        {services.map(([title, src, pos, alt], i) => (
          <motion.article className="service-card reveal-card" whileHover="hover" key={title}>
            <motion.div className="service-media" variants={{ hover: { scale: 1.06 } }} transition={{ duration: .7 }}>
              <Image src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectPosition: pos }} />
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

const REGION_CITIES = ["Santos", "São Vicente", "Guarujá", "Cubatão", "Praia Grande", "Mongaguá", "Itanhaém", "Peruíbe", "Bertioga"];

function Regions() {
  return (
    <section id="regioes" className="section regions container">
      <div className="section-heading">
        <div><Eyebrow>ONDE ESTAMOS</Eyebrow><h2>Regiões<br /><em>atendidas.</em></h2></div>
        <p>Churrasco a domicílio<br />perto de você.</p>
      </div>
      <p className="regions-text">
        Atendemos toda a <strong>Baixada Santista</strong> com churrasco a domicílio para aniversários,
        casamentos, confraternizações, eventos corporativos e festas particulares.
      </p>
      <ul className="region-chips">
        {REGION_CITIES.map((city) => <li key={city}>{city}</li>)}
      </ul>
      <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">Consultar disponibilidade na minha cidade <ArrowRight size={16} /></a>
    </section>
  );
}

function FAQ() {
  const message = (text: string) => `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  // TODO(SEO): perguntas sobre número mínimo de convidados, prazo de antecedência
  // para reserva, preço/orçamento e itens exatos inclusos (equipamentos,
  // acompanhamentos específicos) ainda dependem de confirmação do cliente e
  // foram deixadas de fora para não inventar respostas.
  const faqs = [
    ["Como funciona o churrasco a domicílio?", "Nossa equipe se desloca até o local do seu evento — casa, salão de festas ou condomínio — e prepara o churrasco na brasa, ao vivo, durante a festa."],
    ["Quais tipos de eventos vocês atendem?", "Atendemos aniversários, casamentos, confraternizações, eventos corporativos e festas particulares."],
    ["Vocês atendem condomínios e salões de festas?", "Sim, preparamos o churrasco no local do evento, seja em casa, condomínio ou salão de festas."],
    ["Quais regiões vocês atendem?", `Atendemos toda a Baixada Santista: ${REGION_CITIES.join(", ")}.`],
    ["Como faço para solicitar um orçamento?", "Chame a gente no WhatsApp contando a data, o local e o número aproximado de convidados do seu evento."],
  ];
  return (
    <section id="duvidas" className="section faq container">
      <div className="section-heading">
        <div><Eyebrow>DÚVIDAS FREQUENTES</Eyebrow><h2>Perguntas<br /><em>e respostas.</em></h2></div>
        <p>Tudo o que você<br />precisa saber.</p>
      </div>
      <div className="faq-list">
        {faqs.map(([q, a]) => (
          <details className="faq-item" key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
      <a className="text-link" href={message("Olá! Fiquei com uma dúvida sobre o churrasco a domicílio e gostaria de conversar com vocês.")} target="_blank" rel="noreferrer">Tirar dúvida pelo WhatsApp <ArrowRight size={16} /></a>
    </section>
  );
}

function CinematicStory() {
  return (
    <section className="story" aria-label="Da brasa à celebração">
      <div className="story-sticky">
        {story.map(([word, src, pos], i) => (
          <div className={`story-frame frame-${i}`} key={word}>
            <Image className="story-backdrop" src={src} alt="" fill sizes="100vw" style={{ objectPosition: pos }} />
            <div className="story-focus">
              <Image className="story-subject" src={src} alt="" fill sizes="(max-width: 800px) 100vw, 760px" style={{ objectPosition: pos }} />
            </div>
            <div className="story-vignette" />
          </div>
        ))}
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(ref.current, { textContent: 0 }, { textContent: value, immediateRender: false, duration: 1.8, snap: { textContent: 1 }, scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, [value]);
  return <><span ref={ref}>{value}</span>{suffix}</>;
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
  const tiles = [
    [photos.grillTeam, "50% 42%", "Equipe de churrasqueiros preparando evento em Santos"],
    [photos.premiumCuts, "50% 58%", "Cortes de carne selecionados para churrasco a domicílio"],
    [photos.chefPortrait, "50% 40%", "Churrasqueiro profissional da G&E durante evento"],
    [photos.eventOperation, "50% 40%", "Operação de churrasco a domicílio em festa na Baixada Santista"],
    [photos.buffetSalads, "50% 62%", "Mesa de saladas e acompanhamentos do buffet de churrasco"],
    [photos.chefRoast, "50% 50%", "Carne assando na brasa durante evento G&E"],
  ];
  return <section className="section instagram-section container"><div className="instagram-head"><div><Eyebrow>SIGA A BRASA</Eyebrow><h2>Acontecendo<br /><em>por aí.</em></h2></div><div><Instagram size={20} /><span>@gechurrascodomicilio</span></div></div><div className="instagram-grid">{tiles.map(([src, pos, alt], i) => <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" key={i}><Image src={src} alt={alt} fill sizes="(max-width: 700px) 50vw, 17vw" style={{ objectPosition: pos }} /><span><Instagram /></span></a>)}</div><a className="instagram-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Ver mais eventos no Instagram <ArrowRight size={18} /></a></section>;
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    const ctx = gsap.context(() => {
      gsap.to(".hero-media", { scale: 1, duration: 2.2, ease: "power2.out" });
      gsap.utils.toArray<HTMLElement>(".parallax-image img").forEach(img => gsap.to(img, { yPercent: 10, ease: "none", scrollTrigger: { trigger: img.parentElement, scrub: true } }));
      gsap.fromTo(".impact-media", { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".impact", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".reveal-card").forEach(el => gsap.from(el, { y: 35, immediateRender: false, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
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
  return <main ref={root}><Header /><Hero /><Impact /><Services /><Differentials /><Regions /><CinematicStory /><Gallery /><Numbers /><Testimonials /><InstagramSection /><FAQ /><FinalCTA /><Footer /><FloatingWhatsApp /></main>;
}
