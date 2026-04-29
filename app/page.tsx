import MobileNav from "./components/MobileNav";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";
import {
  projectsQuery,
  servicesQuery,
  testimonialsQuery,
  newsArticlesQuery,
} from "../sanity/lib/queries";
import type {
  SanityProject,
  SanityService,
  SanityTestimonial,
  SanityNewsArticle,
} from "../sanity/lib/types";

export const revalidate = 60;

const desktopHeroImage =
  "https://www.figma.com/api/mcp/asset/5882bf21-7468-42ac-b128-3c3044058f74";
const mobileHeroImage =
  "https://www.figma.com/api/mcp/asset/31858cab-99ff-4459-a8f3-9fb1cdb9a6db";
const aboutImage =
  "https://www.figma.com/api/mcp/asset/52b2aa29-a363-45da-a751-08d1fd6cef58";
const fullBleedImage =
  "https://www.figma.com/api/mcp/asset/67298f57-ec9a-43eb-b1bf-6bad883072ad";

const newsArrowIcon = "https://www.figma.com/api/mcp/asset/d3772777-eb49-49fe-a154-037593d4cd73";

const testimonialLogoMarko = "https://www.figma.com/api/mcp/asset/5fc17bdd-8014-4979-b7c0-96bb711fa8fb";
const testimonialLogoLukas = "https://www.figma.com/api/mcp/asset/cd8def0a-1998-4b43-a6e0-59e7f533f0f4";
const testimonialLogoSarah = "https://www.figma.com/api/mcp/asset/e0218c7d-0273-4b3a-ac25-2bb23ffa8168";
const testimonialLogoSofia = "https://www.figma.com/api/mcp/asset/38205295-23e0-4029-82b8-3a9a9f127990";
const testimonialLogoMarkoMobile = "https://www.figma.com/api/mcp/asset/22fb6961-c8f4-41a2-9530-3e01b512e502";
const testimonialLogoSofiaMobile = "https://www.figma.com/api/mcp/asset/efcd0609-0ac9-4d85-911b-78ba27c16536";

const fallbackProjects = [
  {
    name: "Surfers Paradise",
    tags: ["Social Media", "Photography"],
    image: "https://www.figma.com/api/mcp/asset/ab481a57-d430-42e4-8b34-7e9c21a823ca",
    desktopHeight: "h-[744px]",
  },
  {
    name: "Cyberpunk Caffe",
    tags: ["Social Media", "Photography"],
    image: "https://www.figma.com/api/mcp/asset/16eb0ba3-d2eb-48bf-99c5-498c5c4aedfe",
    desktopHeight: "h-[699px]",
  },
  {
    name: "Agency 976",
    tags: ["Social Media", "Photography"],
    image: "https://www.figma.com/api/mcp/asset/5d1a7039-c6fe-4a1d-8f1f-c39bda8eccce",
    desktopHeight: "h-[699px]",
  },
  {
    name: "Minimal Playground",
    tags: ["Social Media", "Photography"],
    image: "https://www.figma.com/api/mcp/asset/9141cfcd-83ca-468c-a930-480b96721318",
    desktopHeight: "h-[744px]",
  },
];

const fallbackServices = [
  {
    index: "1",
    name: "Brand Discovery",
    desc: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "https://www.figma.com/api/mcp/asset/fa611e05-4fb0-4f1d-91e2-25b85811c652",
  },
  {
    index: "2",
    name: "Web Design & Dev",
    desc: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "https://www.figma.com/api/mcp/asset/96b6a976-1995-4309-b830-fc39b13679d8",
  },
  {
    index: "3",
    name: "Marketing",
    desc: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "https://www.figma.com/api/mcp/asset/d4692cc2-1408-48f1-9017-4be4e7eca865",
  },
  {
    index: "4",
    name: "Photography",
    desc: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.",
    image: "https://www.figma.com/api/mcp/asset/ef3263fb-7109-460e-8f20-62bb74181612",
  },
];

const fallbackTestimonials = [
  {
    name: "Marko Stojković",
    quote: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    logo: testimonialLogoMarko,
    logoMobile: testimonialLogoMarkoMobile,
    desktopLeft: 102, desktopTop: 142, desktopRotation: -6.85,
    mobileRotation: -3.5,
    logoWidth: 142.749, logoHeight: 18.97,
  },
  {
    name: "Lukas Weber",
    quote: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    logo: testimonialLogoLukas,
    logoMobile: testimonialLogoLukas,
    desktopLeft: 676, desktopTop: 272, desktopRotation: 2.9,
    mobileRotation: 2.9,
    logoWidth: 137.733, logoHeight: 19.263,
  },
  {
    name: "Sarah Jenkins",
    quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don't just make things look good; they solve business problems through visual clarity.",
    logo: testimonialLogoSarah,
    logoMobile: testimonialLogoSarah,
    desktopLeft: 305, desktopTop: 553, desktopRotation: 2.23,
    mobileRotation: 2.23,
    logoWidth: 108.537, logoHeight: 30.748,
  },
  {
    name: "Sofia Martínez",
    quote: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    logo: testimonialLogoSofia,
    logoMobile: testimonialLogoSofiaMobile,
    desktopLeft: 987, desktopTop: 546, desktopRotation: -4.15,
    mobileRotation: 2,
    logoWidth: 81.1, logoHeight: 36.174,
  },
];

const fallbackNews = [
  {
    image: "https://www.figma.com/api/mcp/asset/d0086d95-519d-428a-b5fb-2ec5f5be537a",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    desktopOffset: false,
  },
  {
    image: "https://www.figma.com/api/mcp/asset/8c042239-0491-43c6-9dae-22e995b65e83",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    desktopOffset: true,
  },
  {
    image: "https://www.figma.com/api/mcp/asset/03f4f609-e860-4cdc-af14-8ce07e33f9cb",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    desktopOffset: false,
  },
];

const navLinks = ["About", "Services", "Projects", "News", "Contact"];

function getProjectHeight(isTall: boolean) {
  return isTall ? "h-[744px]" : "h-[699px]";
}

export default async function Home() {
  const hasSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your-project-id';

  let rawProjects: SanityProject[] = [];
  let rawServices: SanityService[] = [];
  let rawTestimonials: SanityTestimonial[] = [];
  let rawNews: SanityNewsArticle[] = [];

  if (hasSanity) {
    [rawProjects, rawServices, rawTestimonials, rawNews] = await Promise.all([
      client.fetch<SanityProject[]>(projectsQuery),
      client.fetch<SanityService[]>(servicesQuery),
      client.fetch<SanityTestimonial[]>(testimonialsQuery),
      client.fetch<SanityNewsArticle[]>(newsArticlesQuery),
    ]);
  }

  const projects = rawProjects.length > 0
    ? rawProjects.map((p) => ({
        name: p.name,
        tags: p.tags ?? [],
        image: p.image ? urlFor(p.image).width(800).url() : '',
        desktopHeight: getProjectHeight(p.isTall),
      }))
    : fallbackProjects;

  const services = rawServices.length > 0
    ? rawServices.map((s) => ({
        index: s.index,
        name: s.name,
        desc: s.desc,
        image: s.image ? urlFor(s.image).width(300).url() : '',
      }))
    : fallbackServices;

  const testimonials = rawTestimonials.length > 0
    ? rawTestimonials.map((t, i) => ({
        ...fallbackTestimonials[i % fallbackTestimonials.length],
        name: t.name,
        quote: t.quote,
        logo: t.logo ? urlFor(t.logo).width(300).url() : '',
        logoMobile: t.logoMobile ? urlFor(t.logoMobile).width(300).url() : (t.logo ? urlFor(t.logo).width(300).url() : ''),
      }))
    : fallbackTestimonials;

  const newsArticles = rawNews.length > 0
    ? rawNews.map((n) => ({
        image: n.image ? urlFor(n.image).width(800).url() : '',
        desc: n.desc,
        desktopOffset: n.desktopOffset ?? false,
      }))
    : fallbackNews;

  return (
    <main>
    <section className="relative overflow-hidden flex flex-col items-center h-screen">

      {/* Hero background image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          alt=""
          className="hidden md:block w-full h-full object-cover object-[center_35%]"
          src={desktopHeroImage}
        />
        <img
          alt=""
          className="md:hidden w-full h-full object-cover object-[center_20%]"
          src={mobileHeroImage}
        />
      </div>

      {/* Desktop blur overlay — anchored to bottom, fades in from top edge */}
      <div
        className="hidden md:block absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)] pointer-events-none"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 35%)" }}
      />

      {/* Mobile blur overlay — fades in from top edge */}
      <div
        className="md:hidden absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px] bg-[rgba(217,217,217,0.01)] pointer-events-none"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 35%)" }}
      />

      {/* ── Content container ── */}
      <div className="relative w-full max-w-[1376px] mx-auto px-4 md:px-0 flex flex-col justify-between md:justify-start md:gap-[240px] pb-6 md:pb-0 flex-1">

        {/* ── Navbar ── */}
        <nav className="flex items-center justify-between py-6 w-full shrink-0">
        <span className="font-semibold text-base tracking-[-0.04em] capitalize text-black">
          H.Studio
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-14 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="font-semibold text-base tracking-[-0.04em] capitalize text-black hover:opacity-60 transition-opacity"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button className="hidden md:flex items-center justify-center bg-black text-white font-medium text-sm tracking-[-0.04em] rounded-full px-4 py-3 cursor-pointer hover:opacity-80 transition-opacity">
          Let&apos;s talk
        </button>

        {/* Mobile nav (hamburger + fullscreen overlay) */}
        <MobileNav />
      </nav>

      {/* ── Hero content ── */}
      <div className="relative w-full flex flex-col items-center md:items-stretch justify-between md:justify-center h-[341px] md:h-auto shrink-0">

        {/* "[ Hello i'm ]" + name */}
        <div className="flex flex-col items-center w-full pb-[15px]">
          <div className="flex items-center justify-center md:justify-start px-[18px] w-full -mb-[15px]">
            <p className="font-mono font-normal leading-[1.1] mix-blend-overlay text-[14px] text-white uppercase whitespace-nowrap">
              [ Hello i&apos;m ]
            </p>
          </div>
          <h1 className="font-medium text-[96px] md:text-[min(13.75vw,198px)] text-white mix-blend-overlay tracking-[-6.72px] md:tracking-[-13.86px] leading-[0.8] md:leading-[1.1] capitalize w-fit whitespace-pre-wrap -mb-[15px]">
            {`Harvey   Specter`}
          </h1>
        </div>

        {/* Description + CTA — right on desktop, left on mobile */}
        <div className="flex flex-col items-start md:items-end w-full">
          <div className="flex flex-col gap-[17px] w-[293px] md:w-[294px]">
            <p className="font-bold italic leading-[1.1] text-[#1f1f1f] text-[14px] tracking-[-0.56px] uppercase">
              <span>H.Studio is a </span>
              <span className="font-normal not-italic">full-service</span>
              <span>
                {" "}creative studio creating beautiful digital experiences and
                products. We are an{" "}
              </span>
              <span className="font-normal not-italic">award winning</span>
              <span>
                {" "}design and art group specializing in branding, web design
                and engineering.
              </span>
            </p>
            <button className="w-fit bg-black text-white font-medium text-sm tracking-[-0.04em] rounded-full px-4 py-3 cursor-pointer hover:opacity-80 transition-opacity">
              Let&apos;s talk
            </button>
          </div>
        </div>

      </div>

      </div>
    </section>

    {/* ── Tagline section ── */}
    <section className="flex flex-col items-center justify-center px-4 md:px-8 py-12 md:py-[120px]">
      <div className="flex flex-col gap-6 w-full max-w-[1376px] mx-auto">

        {/* Label + rule */}
        <div className="flex flex-col gap-3 items-end w-full">
          <p className="font-mono text-[14px] text-[#1f1f1f] text-right uppercase leading-[1.1]">
            [ 8+ years in industry ]
          </p>
          <hr className="w-full border-t border-[#1f1f1f] m-0" />
        </div>

        {/* Staggered type */}
        <div className="flex flex-col gap-2 items-center md:items-start w-full">

          {/* 001 index — mobile: above type block, desktop: inline with line 1 */}
          <span className="md:hidden font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">001</span>

          {/* Line 1: title + index */}
          <div className="flex items-start gap-3 uppercase">
            <p className="font-light text-[32px] md:text-[96px] tracking-[-2.56px] md:tracking-[-7.68px] leading-[0.84] whitespace-pre text-black">
              A creative director   /
            </p>
            <span className="hidden md:inline font-mono text-[14px] text-[#1f1f1f] leading-[1.1] mt-1">001</span>
          </div>

          {/* Line 2: Photographer — indented on desktop */}
          <div className="md:pl-[15.55%] uppercase">
            <p className="font-light text-[32px] md:text-[96px] tracking-[-2.56px] md:tracking-[-7.68px] leading-[0.84] whitespace-nowrap text-black">
              Photographer
            </p>
          </div>

          {/* Line 3: Born & raised — deeply indented on desktop */}
          <div className="md:pl-[44.3%] uppercase">
            <p className="font-light text-[32px] md:text-[96px] tracking-[-2.56px] md:tracking-[-7.68px] leading-[0.84] whitespace-nowrap text-black">
              Born{" "}
              <span className="font-[family-name:var(--font-playfair)] italic not-uppercase">
                &amp;
              </span>{" "}
              raised
            </p>
          </div>

          {/* Line 4: On the south side — left on desktop */}
          <div className="uppercase">
            <p className="font-light text-[32px] md:text-[96px] tracking-[-2.56px] md:tracking-[-7.68px] leading-[0.84] whitespace-nowrap text-black">
              on the south side
            </p>
          </div>

          {/* Line 5: Of chicago. + [ creative freelancer ] */}
          <div className="relative md:pl-[44%] uppercase w-full flex flex-col items-center md:items-start">
            <p className="font-light text-[32px] md:text-[96px] tracking-[-2.56px] md:tracking-[-7.68px] leading-[0.84] whitespace-nowrap text-black">
              of chicago.
            </p>
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] uppercase whitespace-nowrap md:absolute md:top-[26px] md:left-[78.4%]">
              [ creative freelancer ]
            </span>
          </div>

        </div>
      </div>
    </section>

    {/* ── About section ── */}
    <section className="px-4 md:px-8 py-12 md:py-[80px]">
      <div className="w-full max-w-[1376px] mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-5 md:gap-0">

        {/* [ About ] label — left on desktop, after 002 on mobile */}
        <p className="font-mono text-[14px] text-[#1f1f1f] uppercase leading-[1.1] whitespace-nowrap order-2 md:order-none">
          [ About ]
        </p>

        {/* Right block: bracketed text + 002 + photo */}
        <div className="flex flex-col md:flex-row md:items-end gap-5 md:gap-8 order-3 md:order-none md:w-[983px]">

          {/* Bracketed text block */}
          <div className="flex items-stretch gap-3 flex-1 min-w-0">
            {/* Left corner brackets */}
            <div className="flex flex-col justify-between shrink-0 w-4">
              <span className="block w-4 h-4 border-l border-t border-[#1f1f1f]" />
              <span className="block w-4 h-4 border-l border-b border-[#1f1f1f]" />
            </div>
            {/* Body text */}
            <p className="flex-1 py-3 text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.56px]">
              Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.
            </p>
            {/* Right corner brackets */}
            <div className="flex flex-col justify-between items-end shrink-0 w-4">
              <span className="block w-4 h-4 border-r border-t border-[#1f1f1f]" />
              <span className="block w-4 h-4 border-r border-b border-[#1f1f1f]" />
            </div>
          </div>

          {/* 002 label + portrait photo */}
          <div className="flex items-start gap-6 shrink-0">
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] hidden md:block">002</span>
            <div className="w-full md:w-[436px] md:h-[614px] aspect-[422/594] md:aspect-auto overflow-hidden relative">
              <img
                alt="Portrait"
                className="absolute inset-0 w-full h-full object-cover"
                src={aboutImage}
              />
            </div>
          </div>

        </div>

        {/* 002 label — mobile only, appears first */}
        <p className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1] order-1 md:hidden">002</p>

      </div>
    </section>

    {/* ── Full-bleed image ── */}
    <div className="w-full h-[500px] md:h-[900px] overflow-hidden relative">
      <img
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[65%_center] md:object-center"
        src={fullBleedImage}
      />
    </div>

    {/* ── Services section ── */}
    <section className="bg-black px-4 md:px-8 py-12 md:py-[80px]">
      <div className="w-full max-w-[1376px] mx-auto flex flex-col gap-8 md:gap-12">

        {/* [ services ] label */}
        <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
          [ services ]
        </p>

        {/* [4] Deliverables header */}
        <div className="flex items-center justify-between text-white uppercase font-light tracking-[-2.56px] md:tracking-[-7.68px] text-[32px] md:text-[96px] leading-none whitespace-nowrap">
          <span>[{services.length}]</span>
          <span>Deliverables</span>
        </div>

        {/* Service rows */}
        <div className="flex flex-col gap-12">
          {services.map((s) => (
            <div key={s.index} className="flex flex-col gap-[9px]">
              {/* Index + divider */}
              <p className="font-mono text-[14px] text-white uppercase leading-[1.1]">
                [ {s.index} ]
              </p>
              <hr className="border-t border-white/40 m-0" />

              {/* Name + desc + image */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pt-[9px]">
                <p className="font-bold italic text-[36px] text-white tracking-[-1.44px] uppercase leading-[1.1] whitespace-nowrap shrink-0">
                  {s.name}
                </p>
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <p className="text-[14px] text-white leading-[1.3] tracking-[-0.56px] md:w-[393px]">
                    {s.desc}
                  </p>
                  <div className="size-[151px] relative overflow-hidden shrink-0">
                    <img
                      alt={s.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      src={s.image}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

    {/* ── Selected Work section ── */}
    <section className="px-4 md:px-8 py-12 md:py-[80px]">
      <div className="w-full max-w-[1376px] mx-auto flex flex-col gap-8 md:gap-[60px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 uppercase">
          {/* Mobile: [ portfolio ] on top */}
          <p className="md:hidden font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">[ portfolio ]</p>
          <div className="flex items-start justify-between md:justify-start gap-[10px] whitespace-nowrap">
            <div className="font-light text-[32px] md:text-[96px] text-black tracking-[-2.56px] md:tracking-[-7.68px] leading-[0.86]">
              <p className="mb-0">Selected</p>
              <p>Work</p>
            </div>
            <span className="font-mono text-[14px] text-[#1f1f1f] leading-[1.1]">004</span>
          </div>
          {/* Desktop: [ portfolio ] rotated on the right */}
          <div className="hidden md:flex h-[110px] w-[15px] items-center justify-center shrink-0">
            <p className="-rotate-90 font-mono text-[14px] text-[#1f1f1f] uppercase whitespace-nowrap leading-[1.1]">
              [ portfolio ]
            </p>
          </div>
        </div>

        {/* Desktop two-column staggered grid */}
        <div className="hidden md:flex gap-6 items-start">

          {/* Left column */}
          <div className="flex flex-col gap-[117px] flex-1">
            {[projects[0], projects[1]].map((p) => (
              <div key={p.name} className="flex flex-col gap-[10px]">
                <div className={`relative ${p.desktopHeight} w-full overflow-hidden`}>
                  <img alt={p.name} className="absolute inset-0 w-full h-full object-cover" src={p.image} />
                  <div className="absolute bottom-4 left-4 flex gap-3">
                    {p.tags.map((t) => (
                      <span key={t} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[14px] font-medium text-[#111] tracking-[-0.56px] whitespace-nowrap">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-black text-[36px] text-black tracking-[-1.44px] uppercase leading-[1.1]">{p.name}</p>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
                    <path d="M8 24L24 8M24 8H10M24 8V22" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}

            {/* CTA with corner brackets */}
            <div className="flex items-stretch gap-3 w-[465px]">
              <div className="flex flex-col justify-between shrink-0 w-4">
                <span className="block w-4 h-4 border-l border-t border-[#1f1f1f]" />
                <span className="block w-4 h-4 border-l border-b border-[#1f1f1f]" />
              </div>
              <div className="flex flex-col gap-[10px] flex-1 py-3">
                <p className="italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.56px]">
                  Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
                </p>
                <button className="w-fit bg-black text-white font-medium text-sm tracking-[-0.04em] rounded-full px-4 py-3 cursor-pointer hover:opacity-80 transition-opacity">
                  Let&apos;s talk
                </button>
              </div>
              <div className="flex flex-col justify-between items-end shrink-0 w-4">
                <span className="block w-4 h-4 border-r border-t border-[#1f1f1f]" />
                <span className="block w-4 h-4 border-r border-b border-[#1f1f1f]" />
              </div>
            </div>
          </div>

          {/* Right column — offset 240px from top */}
          <div className="flex flex-col gap-[117px] flex-1 pt-[240px]">
            {[projects[2], projects[3]].map((p) => (
              <div key={p.name} className="flex flex-col gap-[10px]">
                <div className={`relative ${p.desktopHeight} w-full overflow-hidden`}>
                  <img alt={p.name} className="absolute inset-0 w-full h-full object-cover" src={p.image} />
                  <div className="absolute bottom-4 left-4 flex gap-3">
                    {p.tags.map((t) => (
                      <span key={t} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[14px] font-medium text-[#111] tracking-[-0.56px] whitespace-nowrap">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-black text-[36px] text-black tracking-[-1.44px] uppercase leading-[1.1]">{p.name}</p>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
                    <path d="M8 24L24 8M24 8H10M24 8V22" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Mobile single-column */}
        <div className="flex md:hidden flex-col gap-6">
          {projects.map((p) => (
            <div key={p.name} className="flex flex-col gap-[10px]">
              <div className="relative h-[390px] w-full overflow-hidden">
                <img alt={p.name} className="absolute inset-0 w-full h-full object-cover object-center" src={p.image} />
                <div className="absolute bottom-4 left-4 flex gap-3">
                  {p.tags.map((t) => (
                    <span key={t} className="backdrop-blur-[10px] bg-white/30 px-2 py-1 rounded-full text-[14px] font-medium text-[#111] tracking-[-0.56px] whitespace-nowrap">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-black text-[24px] text-black tracking-[-0.96px] uppercase leading-[1.1]">{p.name}</p>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="shrink-0">
                  <path d="M8 24L24 8M24 8H10M24 8V22" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}

          {/* Mobile CTA */}
          <div className="flex items-stretch gap-3">
            <div className="flex flex-col justify-between shrink-0 w-4">
              <span className="block w-4 h-4 border-l border-t border-[#1f1f1f]" />
              <span className="block w-4 h-4 border-l border-b border-[#1f1f1f]" />
            </div>
            <div className="flex flex-col gap-[10px] flex-1 py-3">
              <p className="italic text-[14px] text-[#1f1f1f] leading-[1.3] tracking-[-0.56px]">
                Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.
              </p>
              <button className="w-fit bg-black text-white font-medium text-sm tracking-[-0.04em] rounded-full px-4 py-3 cursor-pointer hover:opacity-80 transition-opacity">
                Let&apos;s talk
              </button>
            </div>
            <div className="flex flex-col justify-between items-end shrink-0 w-4">
              <span className="block w-4 h-4 border-r border-t border-[#1f1f1f]" />
              <span className="block w-4 h-4 border-r border-b border-[#1f1f1f]" />
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ── Testimonials section ── */}
    <section className="bg-white overflow-hidden">

      {/* Desktop */}
      <div className="hidden md:block relative max-w-[1376px] mx-auto h-[960px]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <p className="font-medium text-[198px] text-black text-center tracking-[-13.86px] leading-[1.1] capitalize">
            Testimonials
          </p>
        </div>

        {testimonials.map((t) => (
          <div key={t.name} className="absolute" style={{ left: `${t.desktopLeft}px`, top: `${t.desktopTop}px` }}>
            <div style={{ transform: `rotate(${t.desktopRotation}deg)` }}>
              <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-[353px]">
                <div className="relative shrink-0" style={{ width: `${t.logoWidth}px`, height: `${t.logoHeight}px` }}>
                  <img alt="" className="absolute inset-0 w-full h-full object-contain object-left" src={t.logo} />
                </div>
                <p className="text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.72px]">
                  {t.quote}
                </p>
                <p className="font-black text-black text-[16px] leading-[1.1] tracking-[-0.64px] uppercase">
                  {t.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden py-16 px-4 flex flex-col gap-8">
        <p className="font-medium text-[64px] text-black tracking-[-4.48px] leading-[0.8] capitalize">
          Testimonials
        </p>
        <div className="flex gap-4 overflow-x-auto py-4 -mx-4 px-4">
          {testimonials.map((t) => (
            <div key={t.name} className="shrink-0" style={{ transform: `rotate(${t.mobileRotation}deg)` }}>
              <div className="bg-[#f1f1f1] border border-[#ddd] rounded-[4px] p-6 flex flex-col gap-4 w-[260px]">
                <div className="relative shrink-0" style={{ width: `${t.logoWidth}px`, height: `${t.logoHeight}px` }}>
                  <img alt="" className="absolute inset-0 w-full h-full object-contain object-left" src={t.logoMobile} />
                </div>
                <p className="text-[#1f1f1f] text-[18px] leading-[1.3] tracking-[-0.72px]">
                  {t.quote}
                </p>
                <p className="font-black text-black text-[16px] leading-[1.1] tracking-[-0.64px] uppercase">
                  {t.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>

    {/* ── News section ── */}
    <section className="bg-[#f3f3f3] px-4 md:px-8 py-16 md:py-[120px]">
      <div className="w-full max-w-[1376px] mx-auto">

        {/* Desktop */}
        <div className="hidden md:flex items-end justify-between">

          {/* Vertical title */}
          <div className="relative flex items-center justify-center shrink-0 w-[110px] h-[706px]">
            <div className="flex-none" style={{ transform: "rotate(-90deg)" }}>
              <p className="font-light text-[64px] text-black tracking-[-5.12px] uppercase leading-[0.86] whitespace-nowrap">Keep up with my latest</p>
              <p className="font-light text-[64px] text-black tracking-[-5.12px] uppercase leading-[0.86] whitespace-nowrap">news &amp; achievements</p>
            </div>
          </div>

          {/* Cards row */}
          <div className="flex items-start">
            {newsArticles.flatMap((article, i) => {
              const divider = i > 0 ? (
                <div key={`div-${i}`} className="w-px self-stretch bg-black/10 mx-[15.5px]" />
              ) : null;
              const card = (
                <div key={`card-${i}`} className={`flex flex-col gap-4 w-[353px] shrink-0${article.desktopOffset ? " pt-[120px]" : ""}`}>
                  <div className="relative h-[469px] w-full overflow-hidden">
                    <img alt="" className="absolute inset-0 w-full h-full object-cover" src={article.image} />
                  </div>
                  <p className="text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.56px]">{article.desc}</p>
                  <div className="border-b border-black flex gap-[10px] items-center py-1 w-fit">
                    <span className="font-medium text-[14px] text-black tracking-[-0.56px]">Read more</span>
                    <img alt="" className="size-[18px] shrink-0" style={{ transform: "rotate(-90deg)" }} src={newsArrowIcon} />
                  </div>
                </div>
              );
              return divider ? [divider, card] : [card];
            })}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col gap-8">
          <p className="font-light text-[32px] text-black tracking-[-2.56px] uppercase leading-[0.86]">
            Keep up with my latest news &amp; achievements
          </p>
          <div className="flex gap-4 overflow-x-auto -mx-4 px-4 py-4">
            {newsArticles.map((article, i) => (
              <div key={i} className="flex flex-col gap-4 w-[300px] shrink-0">
                <div className="relative h-[398px] w-full overflow-hidden">
                  <img alt="" className="absolute inset-0 w-full h-full object-cover" src={article.image} />
                </div>
                <p className="text-[#1f1f1f] text-[14px] leading-[1.3] tracking-[-0.56px]">{article.desc}</p>
                <div className="border-b border-black flex gap-[10px] items-center py-1 w-fit">
                  <span className="font-medium text-[14px] text-black tracking-[-0.56px]">Read more</span>
                  <img alt="" className="size-[18px] shrink-0" style={{ transform: "rotate(-90deg)" }} src={newsArrowIcon} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>

    {/* ── Footer ── */}
    <footer className="bg-black pt-12 px-4 md:px-8">
      <div className="w-full max-w-[1376px] mx-auto flex flex-col gap-12 md:gap-[120px]">

        {/* Top: CTA + social + divider */}
        <div className="flex flex-col gap-6 md:gap-12">

          {/* Desktop 3-column */}
          <div className="hidden md:flex items-start justify-between">
            <div className="flex flex-col gap-3 w-[298px]">
              <p className="font-light italic text-[24px] text-white tracking-[-0.96px] uppercase leading-[1.1]">
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <button className="w-fit border border-white text-white font-medium text-[14px] tracking-[-0.56px] rounded-[24px] px-4 py-3 cursor-pointer hover:bg-white hover:text-black transition-colors">
                Let&apos;s talk
              </button>
            </div>
            <div className="text-[18px] text-white tracking-[-0.72px] uppercase text-center w-[298px]">
              <p className="leading-[1.1]">Facebook</p>
              <p className="leading-[1.1]">Instagram</p>
            </div>
            <div className="text-[18px] text-white tracking-[-0.72px] uppercase text-right w-[298px]">
              <p className="leading-[1.1]">x.com</p>
              <p className="leading-[1.1]">Linkedin</p>
            </div>
          </div>

          {/* Mobile stacked */}
          <div className="md:hidden flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <p className="font-light italic text-[24px] text-white tracking-[-0.96px] uppercase leading-[1.1]">
                Have a <span className="font-black not-italic">project</span> in mind?
              </p>
              <button className="w-fit border border-white text-white font-medium text-[14px] tracking-[-0.56px] rounded-[24px] px-4 py-3 cursor-pointer">
                Let&apos;s talk
              </button>
            </div>
            <p className="text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Facebook</p>
            <p className="text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Instagram</p>
            <p className="text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">x.com</p>
            <p className="text-[18px] text-white tracking-[-0.72px] uppercase leading-[1.1]">Linkedin</p>
          </div>

          <hr className="border-t border-white/20 m-0" />
        </div>

        {/* Desktop bottom: wordmark + legal */}
        <div className="hidden md:flex items-end justify-between">
          <div className="relative h-[219px] w-[1093px] overflow-hidden">
            <p className="font-semibold text-[290px] text-white tracking-[-17.4px] leading-[0.8] capitalize whitespace-nowrap absolute top-0">
              H.Studio
            </p>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[15px] h-[160px]">
              <p className="font-mono text-[14px] text-white uppercase whitespace-nowrap" style={{ transform: "rotate(-90deg)" }}>
                [ Coded By Claude ]
              </p>
            </div>
          </div>
          <div className="flex gap-[34px] items-center pb-8 text-[12px] text-white tracking-[-0.48px] uppercase">
            <span className="underline cursor-pointer">licences</span>
            <span className="underline cursor-pointer">Privacy policy</span>
          </div>
        </div>

        {/* Mobile bottom: legal + wordmark */}
        <div className="md:hidden flex flex-col gap-3 overflow-hidden">
          <div className="flex gap-[34px] text-[12px] text-white tracking-[-0.48px] uppercase">
            <span className="underline cursor-pointer">licences</span>
            <span className="underline cursor-pointer">Privacy policy</span>
          </div>
          <p className="font-mono text-[10px] text-white uppercase">[ Coded By Claude ]</p>
          <p className="font-semibold text-white capitalize whitespace-nowrap leading-[0.8]" style={{ fontSize: "91.425px", letterSpacing: "-5.4855px" }}>
            H.Studio
          </p>
        </div>

      </div>
    </footer>

    </main>
  );
}
