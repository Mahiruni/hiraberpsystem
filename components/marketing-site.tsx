"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Factory,
  FileCheck2,
  Fingerprint,
  Gauge,
  Globe2,
  HardDrive,
  Headphones,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import {
  FormEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const navModules = [
  ["Financials", "Close the books, control cash, consolidate entities.", CircleDollarSign],
  ["Inventory", "Plan, value and move stock across every location.", Boxes],
  ["HR", "People, payroll, time and workforce operations.", Users],
  ["CRM", "Pipeline, accounts, orders and customer economics.", Network],
  ["Manufacturing", "BOMs, work orders, capacity and production cost.", Factory],
  ["Analytics", "Company-wide metrics, variance and operating signals.", BarChart3],
] as const;

const moduleData = {
  Financials: {
    kicker: "Financial command",
    title: "Close with every operational event already posted.",
    body: "Cash, receivables, payables, revenue, tax and intercompany activity live on the same ledger as the work that created them.",
    metrics: [["Net cash", "$18.42M", "+4.8%"], ["Open AR", "$4.16M", "12.4 days"], ["Close status", "82%", "Day 2"]],
    feed: [["Journal 009184", "Payroll accrual", "$482,900"], ["Receipt 45291", "Northwind Retail", "$128,440"], ["AP batch 6612", "37 invoices", "$704,120"]],
  },
  Inventory: {
    kicker: "Inventory control",
    title: "Know the value, velocity and risk of every unit.",
    body: "Multi-site stock, landed cost, replenishment and traceability update the moment a purchase, transfer, build or shipment moves.",
    metrics: [["Stock value", "$31.8M", "+1.2%"], ["Turns", "7.4×", "+0.6"], ["At risk", "2.8%", "412 SKUs"]],
    feed: [["Transfer TR-1884", "Berlin → Prague", "In transit"], ["SKU AX-410", "Low-stock threshold", "18 units"], ["Cycle count", "Plant 04 · Aisle C", "99.4%"]],
  },
  HR: {
    kicker: "People operations",
    title: "Run headcount and payroll with financial context attached.",
    body: "Org structure, compensation, time, approvals and workforce cost stay aligned with departments, entities and operating plans.",
    metrics: [["Headcount", "1,284", "+22"], ["Payroll", "$6.28M", "On schedule"], ["Open roles", "34", "11 critical"]],
    feed: [["Payroll run", "US · August", "Approved"], ["Offer 0228", "Plant controller", "Accepted"], ["Time review", "Operations · Week 34", "96.8%"]],
  },
  CRM: {
    kicker: "Revenue operations",
    title: "Customer activity and financial reality on one record.",
    body: "Pipeline, quotes, orders, invoices, collections and account margin stay connected from first conversation through cash receipt.",
    metrics: [["Pipeline", "$22.6M", "+9.1%"], ["Win rate", "31.8%", "+2.4 pts"], ["NRR", "118%", "Trailing 12m"]],
    feed: [["Opportunity", "Morrow Foods", "$860,000"], ["Order SO-9912", "Atlas Industrial", "Released"], ["Renewal", "Horizon Group", "Signed"]],
  },
  Manufacturing: {
    kicker: "Production system",
    title: "Plan capacity with cost and material truth built in.",
    body: "BOMs, routings, labor, machine time, WIP and finished goods resolve into operational and financial truth without reconciliation theater.",
    metrics: [["OEE", "86.2%", "+3.1 pts"], ["WIP", "$4.91M", "Healthy"], ["Yield", "97.8%", "+0.4 pts"]],
    feed: [["WO-48291", "Line 3 · Assembly", "72%"], ["Material issue", "Resin R-18", "1,240 kg"], ["Quality hold", "Lot 24-881", "Review"]],
  },
  Analytics: {
    kicker: "Operating intelligence",
    title: "Ask why the number moved before the meeting starts.",
    body: "Variance, forecast and anomaly signals use the same governed data model as finance and operations, with source records one click away.",
    metrics: [["Revenue", "$42.7M", "+6.3%"], ["EBITDA", "18.9%", "+1.1 pts"], ["Forecast", "98.4%", "Accuracy"]],
    feed: [["Variance", "Freight cost +12.8%", "Explained"], ["Demand signal", "SKU F-220 · West", "+18%"], ["Anomaly", "Overtime · Plant 02", "Review"]],
  },
} as const;

type ModuleName = keyof typeof moduleData;

const pricing = [
  {
    name: "Growth",
    note: "For multi-team companies replacing disconnected finance and operations tools.",
    monthly: 2400,
    annual: 2200,
    people: "Up to 250 employees",
    entities: "3 legal entities",
    features: ["Financials, inventory, CRM", "Advanced reporting", "Standard integrations", "Email support + onboarding"],
  },
  {
    name: "Scale",
    note: "For multi-entity operators that need deeper control, planning and production workflows.",
    monthly: 6200,
    annual: 5600,
    people: "Up to 1,500 employees",
    entities: "12 legal entities",
    featured: true,
    features: ["Everything in Growth", "HR + manufacturing", "Planning and forecasting", "Priority implementation team"],
  },
  {
    name: "Enterprise",
    note: "For complex groups with custom governance, integration and operating-model requirements.",
    monthly: 0,
    annual: 0,
    people: "5,000+ employees",
    entities: "Custom entity model",
    enterprise: true,
    features: ["Full AetherERP suite", "SSO + advanced controls", "Dedicated solution architecture", "Contracted support and SLA"],
  },
];

const caseStudies = [
  { industry: "Industrial manufacturing", metric: "9 → 3 days", label: "financial close", detail: "One operational model replaced plant spreadsheets, a legacy general ledger and disconnected MRP reporting.", stat: "41% less manual journal work" },
  { industry: "Wholesale distribution", metric: "98.6%", label: "inventory accuracy", detail: "Eight distribution sites moved to shared replenishment, landed-cost and cycle-count controls.", stat: "23% lower safety stock" },
  { industry: "Multi-site services", metric: "17 hrs", label: "saved each week", detail: "Revenue operations, payroll allocation and entity reporting moved onto a single governed customer record.", stat: "12 systems retired" },
];

const integrations = ["Salesforce", "Shopify", "Stripe", "Microsoft 365", "Google Workspace", "Slack", "HubSpot", "Snowflake", "Power BI", "Docusign", "Plaid", "Workday"];

const reveal = { duration: 0.72, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`aether-mark ${compact ? "compact" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 40 40" focusable="false">
        <path d="M8 29.5 19.8 7 32 29.5" />
        <path className="mark-accent" d="M12.2 22.2h15.4" />
        <path d="M16.1 29.5h7.8" />
      </svg>
    </span>
  );
}

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <a className="wordmark" href="#top" aria-label="AetherERP home">
      <Mark compact={compact} />
      <span>Aether<span>ERP</span></span>
    </a>
  );
}

function DustField({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const mobile = matchMedia("(max-width: 720px)").matches;
    const count = compact ? (mobile ? 12 : 34) : mobile ? 20 : 66;
    const motes = Array.from({ length: count }, () => ({
      x: Math.random(), y: Math.random(), r: 0.35 + Math.random() * 1.1,
      vx: (Math.random() - 0.5) * 0.000035, vy: (Math.random() - 0.5) * 0.00002,
      a: 0.08 + Math.random() * 0.12, phase: Math.random() * Math.PI * 2,
    }));
    let width = 0; let height = 0; let raf = 0; let dpr = 1;
    const size = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width; height = box.height; dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const paint = (time = 0) => {
      ctx.clearRect(0, 0, width, height);
      motes.forEach((m) => {
        m.x += m.vx + Math.sin(time * 0.00012 + m.phase) * 0.000003;
        m.y += m.vy;
        if (m.x < -.04) m.x = 1.04; if (m.x > 1.04) m.x = -.04;
        if (m.y < -.04) m.y = 1.04; if (m.y > 1.04) m.y = -.04;
        const x = m.x * width; const y = m.y * height;
        const g = ctx.createRadialGradient(x, y, 0, x, y, m.r * 8);
        g.addColorStop(0, `rgba(62,224,196,${m.a})`);
        g.addColorStop(1, "rgba(62,224,196,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, m.r * 8, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = `rgba(160,235,223,${Math.min(.2, m.a + .03)})`;
        ctx.beginPath(); ctx.arc(x, y, m.r, 0, Math.PI * 2); ctx.fill();
      });
      raf = requestAnimationFrame(paint);
    };
    size(); raf = requestAnimationFrame(paint); addEventListener("resize", size);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); };
  }, [compact, reduced]);

  if (reduced) return null;
  return <canvas ref={ref} className="dust-field" aria-hidden="true" />;
}

function MagneticButton({ href, className = "", children, onClick }: { href?: string; className?: string; children: ReactNode; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const move = (e: ReactMouseEvent<HTMLElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${(e.clientX - r.left - r.width / 2) * .08}px`);
    ref.current.style.setProperty("--my", `${(e.clientY - r.top - r.height / 2) * .1}px`);
  };
  const leave = () => { ref.current?.style.setProperty("--mx", "0px"); ref.current?.style.setProperty("--my", "0px"); };
  const inner = <span>{children}</span>;
  if (href) return <a ref={ref as never} href={href} onMouseMove={move} onMouseLeave={leave} className={`button magnetic ${className}`}>{inner}</a>;
  return <button ref={ref as never} type="button" onClick={onClick} onMouseMove={move} onMouseLeave={leave} className={`button magnetic ${className}`}>{inner}</button>;
}

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-20px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);
  useEffect(() => {
    if (!seen || reduced) { if (reduced) setN(value); return; }
    const start = performance.now(); let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 900); const e = 1 - Math.pow(1 - p, 4);
      setN(Math.round(value * e)); if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [seen, reduced, value]);
  return <span ref={ref}>{n}</span>;
}

function Nav({ onDemo }: { onDemo: () => void }) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(false);
  const [dense, setDense] = useState(false);
  useEffect(() => {
    const onScroll = () => setDense(scrollY > 48);
    onScroll(); addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nav-wrap ${dense ? "dense" : ""}`}>
      <div className="nav-shell">
        <Wordmark />
        <nav className="nav-main" aria-label="Primary navigation">
          <div className="nav-products" onMouseEnter={() => setProducts(true)} onMouseLeave={() => setProducts(false)}>
            <button onClick={() => setProducts((v) => !v)} aria-expanded={products}>Platform <ChevronDown size={14} /></button>
            <AnimatePresence>
              {products && (
                <motion.div className="mega" initial={{ opacity: 0, y: 8, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: 6 }} transition={{ duration: .22 }}>
                  <div className="mega-intro"><span className="label">Operating system</span><h3>Every function.<br />One company model.</h3><p>Move from transaction to decision without rebuilding the story between systems.</p></div>
                  <div className="mega-grid">{navModules.map(([name, text, Icon]) => <a href="#modules" key={name} onClick={() => setProducts(false)}><Icon size={17} /><div><strong>{name}</strong><span>{text}</span></div><ArrowRight size={14} /></a>)}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a href="#intelligence">Intelligence</a><a href="#security">Security</a><a href="#pricing">Pricing</a>
        </nav>
        <div className="nav-actions"><a className="nav-login" href="#modules">View platform</a><MagneticButton className="button-primary nav-demo" onClick={onDemo}>Book a demo <ArrowRight size={14} /></MagneticButton><button className="mobile-menu" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu size={20} /></button></div>
      </div>
      <AnimatePresence>{open && <motion.div className="mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="mobile-panel" initial={{ x: 32 }} animate={{ x: 0 }} exit={{ x: 32 }} transition={reveal}><div className="mobile-top"><Wordmark /><button aria-label="Close navigation" onClick={() => setOpen(false)}><X size={20} /></button></div><span className="label">Platform</span><div className="mobile-links">{navModules.map(([name, , Icon]) => <a href="#modules" key={name} onClick={() => setOpen(false)}><Icon size={17} />{name}<ChevronRight size={15} /></a>)}</div><a href="#intelligence" onClick={() => setOpen(false)}>Intelligence</a><a href="#security" onClick={() => setOpen(false)}>Security</a><a href="#pricing" onClick={() => setOpen(false)}>Pricing</a><MagneticButton className="button-primary mobile-demo" onClick={() => { setOpen(false); onDemo(); }}>Book a demo <ArrowRight size={15} /></MagneticButton></motion.div></motion.div>}</AnimatePresence>
    </header>
  );
}

function LiveDashboard({ module = "Financials", compact = false }: { module?: ModuleName; compact?: boolean }) {
  const reduced = useReducedMotion();
  const data = moduleData[module];
  const [pulse, setPulse] = useState(0);
  const [cursor, setCursor] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const a = setInterval(() => setPulse((v) => (v + 1) % 4), 2300);
    const b = setInterval(() => setCursor((v) => (v + 1) % 3), 3400);
    return () => { clearInterval(a); clearInterval(b); };
  }, [reduced]);
  return (
    <div className={`dashboard ${compact ? "dashboard-compact" : ""}`}>
      <div className="dash-top"><div className="dash-brand"><Mark compact /><span>AetherERP</span></div><div className="dash-search"><Search size={12} /><span>Search company</span><kbd>⌘ K</kbd></div><div className="dash-entity"><Building2 size={13} /><span>Atlas Group</span><ChevronDown size={11} /></div><span className="sync"><i /> synced</span><span className="dash-clock"><Clock3 size={11} />09:42</span></div>
      <div className="dash-layout">
        <aside className="dash-side"><span className="side-cap">Control</span>{[Layers3, CircleDollarSign, Boxes, Users, Factory, BarChart3].map((Icon, i) => <button key={i} className={i === 1 ? "active" : ""} aria-label={`Navigation item ${i + 1}`}><Icon size={14} /></button>)}</aside>
        <div className="dash-content">
          <div className="dash-heading"><div><span className="mini-label">{data.kicker}</span><strong>Executive command center</strong></div><span className="period">Aug 2026 <ChevronDown size={10} /></span></div>
          <div className="kpi-row">{data.metrics.map(([label, value, note], i) => <motion.div key={label} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 + i * .08 }} className={pulse === i ? "pulse" : ""}><span>{label}</span><strong>{value}</strong><em>{note}</em></motion.div>)}</div>
          <div className="dash-main-grid">
            <div className="dash-chart"><div className="dash-card-head"><div><strong>Revenue vs forecast</strong><span>Trailing 12 months</span></div><em>+6.3%</em></div><svg viewBox="0 0 520 180" preserveAspectRatio="none" role="img" aria-label="Revenue and forecast chart"><defs><linearGradient id="aetherArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3EE0C4" stopOpacity=".22"/><stop offset="100%" stopColor="#3EE0C4" stopOpacity="0"/></linearGradient></defs>{[36,72,108,144].map(y => <line key={y} x1="0" x2="520" y1={y} y2={y} className="chart-gridline"/>)}<path className="forecast" d="M0 144 C60 129 82 122 124 115 S190 94 230 91 S310 70 354 65 S427 49 520 37"/><path className="area" d="M0 150 C48 136 76 143 118 123 S184 119 224 97 S297 85 342 72 S417 61 459 42 S497 36 520 29 L520 180 L0 180Z"/><path className="actual" pathLength="1" d="M0 150 C48 136 76 143 118 123 S184 119 224 97 S297 85 342 72 S417 61 459 42 S497 36 520 29"/><motion.circle animate={reduced ? undefined : { cx: [342, 459, 520], cy: [72, 42, 29] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="chart-dot" cx="520" cy="29" r="4"/><motion.g className="tooltip" animate={reduced ? undefined : { opacity: [0, 1, 1, 0], x: [330, 330, 448, 448], y: [42, 42, 12, 12] }} transition={{ duration: 8, repeat: Infinity }}><rect width="74" height="32" rx="5"/><text x="9" y="13">Revenue</text><text x="9" y="25">$42.7M</text></motion.g></svg><div className="chart-legend"><span><i />Actual</span><span><i />Forecast</span><span>Sep</span><span>Nov</span><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span></div></div>
            <div className="inventory-health"><div className="dash-card-head"><div><strong>Inventory health</strong><span>All facilities</span></div><PackageCheck size={14}/></div>{[["Healthy",76],["Watch",17],["Critical",7]].map(([name, width], i) => <div className="health-row" key={name}><span>{name}</span><b>{width}%</b><div><motion.i initial={reduced ? { width: `${width}%` } : { width: 0 }} animate={{ width: `${width}%` }} transition={{ duration: 1, delay: .5 + i * .12 }}/></div></div>)}<AnimatePresence mode="wait"><motion.div key={pulse} className="low-stock" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><span>Low stock</span><strong>{pulse % 2 ? "AX-410 · 18 units" : "RM-220 · 11 units"}</strong><em>Reorder suggested</em></motion.div></AnimatePresence></div>
          </div>
          <div className="dash-feed"><div className="feed-head"><strong>Live company activity</strong><span>Source</span><span>Amount / status</span></div>{data.feed.map(([id, desc, amount], i) => <motion.div key={id} className={cursor === i ? "highlight" : ""} animate={reduced ? undefined : { x: cursor === i ? 2 : 0 }}><strong>{id}</strong><span>{desc}</span><em>{amount}</em></motion.div>)}</div>
        </div>
      </div>
      {!reduced && <motion.div className="fake-cursor" animate={{ x: [360, 510, 430, 610, 360], y: [214, 164, 330, 286, 214] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}><svg viewBox="0 0 20 24"><path d="M2 2 17 13l-7 1 3 7-3 1-3-7-5 5Z"/></svg></motion.div>}
    </div>
  );
}

function LaptopMock({ module = "Financials", compact = false }: { module?: ModuleName; compact?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={`laptop-scene ${compact ? "compact" : ""}`} initial={reduced ? false : { opacity: 0, y: 48, rotateX: 5 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ ...reveal, delay: .18 }}>
      <div className="screen-glow" />
      <div className="laptop-lid"><div className="laptop-camera"/><div className="laptop-screen"><LiveDashboard module={module} compact={compact}/></div></div>
      <div className="laptop-base"><div className="keyboard"><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/><span/></div><div className="trackpad"/></div>
      <div className="desk-reflection" />
    </motion.div>
  );
}

function SectionIntro({ eyebrow, title, body, center = false }: { eyebrow: string; title: string; body: string; center?: boolean }) {
  return <motion.div className={`section-intro ${center ? "center" : ""}`} initial={{ opacity: 0, y: 16, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-90px" }} transition={reveal}><span className="label">{eyebrow}</span><h2>{title}</h2><p>{body}</p></motion.div>;
}

function Hero({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="hero" id="top">
      <DustField /><div className="grain" aria-hidden="true"/><div className="hero-glow"/><div className="hero-grid" aria-hidden="true"/>
      <div className="shell hero-layout">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 18, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={reveal}>
          <span className="hero-eyebrow"><i/> Enterprise resource planning, finally composed</span>
          <h1>Run the whole company from <em>one desk.</em></h1>
          <p>Finance, stock, people and customers share one operating model — so every decision starts from the same company truth.</p>
          <div className="hero-buttons"><MagneticButton className="button-primary button-large" onClick={onDemo}>Book a demo <ArrowRight size={17}/></MagneticButton><MagneticButton href="#modules" className="button-ghost button-large">Watch the platform <span className="play-dot">▶</span></MagneticButton></div>
          <div className="trust-row"><div><strong>99.99%</strong><span>uptime SLA</span></div><div><strong>18</strong><span>operating countries</span></div><div><strong>64%</strong><span>faster close*</span></div></div>
        </motion.div>
        <div className="hero-machine"><LaptopMock /></div>
      </div>
      <div className="desk-plane" aria-hidden="true"/>
    </section>
  );
}

function ProofStrip() {
  return <section className="proof-strip"><div className="shell"><span className="label">Built for operators running complexity</span><div className="logo-marquee"><div className="logo-track">{["NORTHSTAR", "MERIDIAN", "FOUNDRY", "ATLAS", "HARBOR", "VERDANT", "NORTHSTAR", "MERIDIAN", "FOUNDRY", "ATLAS", "HARBOR", "VERDANT"].map((n,i)=><span key={`${n}-${i}`}>{n}</span>)}</div></div><div className="proof-badges"><span><ShieldCheck size={14}/>SOC 2 controls</span><span><Globe2 size={14}/>Multi-entity</span><span><FileCheck2 size={14}/>Audit-ready</span><span><Headphones size={14}/>Named implementation team</span></div></div></section>;
}

function ProblemSection() {
  return <section className="section problem"><div className="shell problem-grid"><SectionIntro eyebrow="The hidden operating tax" title="14 tools and a spreadsheet graveyard." body="The cost is not the subscription list. It is the reconciliation layer your best operators carry in their heads: exports, handoffs, duplicated master data and meetings spent arguing over which number is current."/><motion.div className="graveyard" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reveal}><div className="grave-head"><span>Month-end reconciliation</span><strong>08:17:42</strong></div>{[["CRM export", "customers_final_v7.csv", "2h ago"],["Inventory", "stock-adjusted-FINAL.xlsx", "38m ago"],["Payroll", "aug-payroll-approved2.xlsx", "14m ago"],["Finance", "close-pack-working-copy.xlsx", "now"]].map(([a,b,c],i)=><motion.div className="grave-row" key={a} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i*.08 }} viewport={{ once: true }}><span>{a}</span><strong>{b}</strong><em>{c}</em></motion.div>)}<div className="grave-total"><span>Manual touchpoints this close</span><strong>184</strong></div></motion.div></div></section>;
}

function Modules() {
  const [active, setActive] = useState<ModuleName>("Financials");
  const data = moduleData[active];
  return <section className="section modules" id="modules"><div className="shell"><SectionIntro eyebrow="One operating system" title="Every function sees the same company." body="Choose a workspace. The interface changes; the company model underneath does not." center/><div className="module-tabs" role="tablist" aria-label="ERP modules">{(Object.keys(moduleData) as ModuleName[]).map((name) => { const Icon = navModules.find(x=>x[0]===name)?.[2] || Layers3; return <button role="tab" aria-selected={active===name} className={active===name?"active":""} key={name} onClick={()=>setActive(name)}><Icon size={16}/><span>{name}</span>{active===name&&<motion.i layoutId="module-active"/>}</button>})}</div><div className="module-stage"><div className="module-copy"><AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity:0,y:10,filter:"blur(6px)" }} animate={{opacity:1,y:0,filter:"blur(0px)"}} exit={{opacity:0,y:-6}} transition={{duration:.28}}><span className="label">{data.kicker}</span><h3>{data.title}</h3><p>{data.body}</p><a href="#pricing">Explore {active.toLowerCase()} <ArrowRight size={15}/></a></motion.div></AnimatePresence><div className="module-rule"><span>Shared controls</span><div><Check size={13}/>One chart of accounts</div><div><Check size={13}/>One entity model</div><div><Check size={13}/>One permission layer</div></div></div><motion.div className="product-frame" layout><div className="frame-toolbar"><div><i/><i/><i/></div><span>aether.company / {active.toLowerCase()}</span><em><LockKeyhole size={11}/>Private workspace</em></div><LiveDashboard module={active}/></motion.div></div></div></section>;
}

function DataModel() {
  const nodes = ["Customer", "Order", "Shipment", "Invoice", "Payment", "Ledger"];
  return <section className="section data-model"><div className="shell data-grid"><div><SectionIntro eyebrow="Unified data model" title="The transaction is the integration." body="AetherERP does not move summaries between departmental systems. A single governed object travels through the company, collecting operational and financial meaning as work happens."/><div className="data-principles"><div><strong>01</strong><span>Master data once</span><p>Customers, items, people, suppliers and entities have one canonical record.</p></div><div><strong>02</strong><span>Events become entries</span><p>Shipments, receipts, payroll and production create financial impact at the source.</p></div><div><strong>03</strong><span>History stays explainable</span><p>Every KPI resolves to the document, approval and person that changed it.</p></div></div></div><motion.div className="model-visual" initial={{opacity:0,scale:.97}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={reveal}><div className="model-core"><Mark/><span>Aether model</span><strong>Company truth</strong></div>{nodes.map((n,i)=><motion.div className={`model-node node-${i+1}`} key={n} initial={{opacity:0,scale:.8}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:.15+i*.07}}><i/>{n}</motion.div>)}<svg viewBox="0 0 560 560" aria-hidden="true"><circle cx="280" cy="280" r="196"/><circle cx="280" cy="280" r="126"/><path d="M280 84V214M450 182 350 240M450 378 350 320M280 476V346M110 378 210 320M110 182 210 240"/></svg></motion.div></div></section>;
}

function HowItWorks() {
  const steps=[["01","Discover","Map entities, controls, critical workflows and the source systems that define the current operating model."],["02","Configure","Build the chart, roles, approval paths, modules and reporting model in an implementation environment."],["03","Migrate","Load master data, opening balances and history; reconcile before users move into the new system."],["04","Operate","Run parallel controls, switch the system of record and complete the first close with the implementation team."]];
  return <section className="section how"><div className="shell"><SectionIntro eyebrow="90-day operating change" title="A controlled path from discovery to daily use." body="The implementation is designed around business continuity: prove the model, reconcile the numbers, then move the organization." center/><div className="timeline">{steps.map(([n,t,b],i)=><motion.article key={n} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{...reveal,delay:i*.07}}><span>{n}</span><div className="timeline-dot"/><h3>{t}</h3><p>{b}</p><em>{i===0?"Week 1–2":i===1?"Week 2–5":i===2?"Week 5–9":"Week 9–13"}</em></motion.article>)}</div></div></section>;
}

function Intelligence() {
  return <section className="section intelligence" id="intelligence"><div className="shell intel-grid"><div><SectionIntro eyebrow="Aether intelligence" title="Not more dashboards. Better operating questions." body="Aether flags what changed, quantifies the exposure and keeps the explanation attached to the governed transaction history."/><div className="intel-list">{[[Gauge,"Variance explanations","Freight is 12.8% above plan because spot-carrier volume increased in the West region."],[Activity,"Anomaly flags","Overtime at Plant 02 is outside the six-week operating band and concentrated on Line 3."],[BarChart3,"Demand forecast","SKU F-220 demand is projected 18% above plan over the next four replenishment cycles."]].map(([Icon,title,text],i)=><motion.div key={String(title)} initial={{opacity:0,x:-10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.08}}><span className="intel-icon">{typeof Icon!=="string"&&<Icon size={17}/>}</span><div><strong>{title as string}</strong><p>{text as string}</p></div></motion.div>)}</div></div><div className="intel-terminal"><div className="terminal-top"><span><Sparkles size={13}/>Aether analyst</span><em>Source-aware</em></div><div className="question">Why did gross margin miss plan in July?</div><motion.div className="answer" initial={{opacity:0,y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{...reveal,delay:.25}}><span className="label">Variance explanation</span><h3>Gross margin closed 1.7 points below plan.</h3><p><strong>0.9 pts</strong> came from expedited freight on West-region orders. <strong>0.5 pts</strong> came from resin purchase-price variance. <strong>0.3 pts</strong> came from mix shift toward lower-margin assemblies.</p><div className="answer-sources"><span>37 shipments</span><span>14 purchase orders</span><span>6 product families</span></div></motion.div><div className="terminal-actions"><button>Open source records</button><button>Save to board pack</button></div></div></div></section>;
}

function Security() {
  const controls=[[ShieldCheck,"SOC 2 Type II","Control design and operating evidence for security, availability and confidentiality."],[Fingerprint,"ISO 27001","Information-security management aligned to a formal risk and control framework."],[LockKeyhole,"SAML / SSO","Central identity, enforced MFA, role mapping and session policy."],[FileCheck2,"Immutable audit trail","Every privileged action, approval and record change remains attributable."],[HardDrive,"Data residency","Regional deployment options and documented retention controls for regulated groups."],[Zap,"Recovery controls","Backups, tested restoration paths and contracted recovery objectives."]];
  return <section className="section security" id="security"><div className="shell"><div className="security-head"><SectionIntro eyebrow="Enterprise control" title="Designed for the people who sign the controls." body="Security is treated as operating infrastructure: identity, access, traceability, continuity and documented responsibility."/><div className="security-badge"><ShieldCheck size={22}/><div><span>Trust center</span><strong>Control evidence available</strong></div><ArrowRight size={16}/></div></div><div className="security-grid">{controls.map(([Icon,title,text],i)=><motion.article key={String(title)} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.06}}>{typeof Icon!=="string"&&<Icon size={19}/>}<h3>{title as string}</h3><p>{text as string}</p></motion.article>)}</div></div></section>;
}

function CaseStudies() {
  return <section className="section cases"><div className="shell"><SectionIntro eyebrow="Operating outcomes" title="Results measured in close days, stock accuracy and hours returned." body="Representative composite deployments shown without customer identity. Outcomes depend on starting systems, process discipline and implementation scope." center/><div className="case-grid">{caseStudies.map((c,i)=><motion.article key={c.industry} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><span className="case-index">0{i+1}</span><span className="label">{c.industry}</span><strong>{c.metric}</strong><em>{c.label}</em><p>{c.detail}</p><div>{c.stat}<ArrowRight size={14}/></div></motion.article>)}</div></div></section>;
}

function Pricing({ onDemo }: { onDemo: () => void }) {
  const [annual, setAnnual] = useState(true);
  return <section className="section pricing" id="pricing"><div className="shell"><SectionIntro eyebrow="Pricing" title="Commercial clarity before implementation starts." body="Platform pricing is based on operating scale and module scope. Implementation and unusual integration work are scoped separately." center/><div className="price-toggle"><button className={!annual?"active":""} onClick={()=>setAnnual(false)}>Monthly</button><button className={annual?"active":""} onClick={()=>setAnnual(true)}>Annual <span>save ~9%</span></button><motion.i layout transition={{type:"spring",stiffness:380,damping:32}} style={{left:annual?"50%":"0%"}}/></div><div className="price-grid">{pricing.map((p,i)=><motion.article className={`${p.featured?"featured":""} ${p.enterprise?"enterprise":""}`} key={p.name} initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.07}}>{p.featured&&<span className="recommended">Most selected</span>}{p.enterprise&&<span className="enterprise-badge">Enterprise</span>}<span className="plan-index">0{i+1}</span><h3>{p.name}</h3><p>{p.note}</p><div className="plan-price">{p.enterprise?<strong>Custom</strong>:<><strong>${(annual?p.annual:p.monthly).toLocaleString()}</strong><span>/ month</span></>}</div>{!p.enterprise&&<small>Billed {annual?"annually":"monthly"}</small>}<div className="plan-scale"><span><Users size={14}/>{p.people}</span><span><Building2 size={14}/>{p.entities}</span></div><ul>{p.features.map(f=><li key={f}><Check size={14}/>{f}</li>)}</ul><MagneticButton className={p.featured?"button-primary":"button-secondary"} onClick={onDemo}>{p.enterprise?"Talk to enterprise":"Book a demo"}<ArrowRight size={14}/></MagneticButton></motion.article>)}</div><div className="pricing-foot"><span>All plans include role-based access, audit history, API access and standard backup controls.</span><a href="#comparison">Compare plan details <ArrowRight size={13}/></a></div></div></section>;
}

function Integrations() {
  return <section className="section integrations"><div className="shell integrations-grid"><div><SectionIntro eyebrow="Integrations" title="Keep the specialist tools that still earn their place." body="AetherERP becomes the governed operating core while approved systems continue to exchange customers, documents, payments and analytical data through controlled interfaces."/><a href="#modules">Explore integration architecture <ArrowRight size={14}/></a></div><div className="integration-grid">{integrations.map((n,i)=><motion.div key={n} initial={{opacity:0,scale:.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:(i%4)*.04}}><span>{n.slice(0,2).toUpperCase()}</span><strong>{n}</strong></motion.div>)}</div></div></section>;
}

function FinalCTA({ onDemo }: { onDemo: () => void }) {
  return <section className="final-cta"><DustField compact/><div className="grain"/><div className="final-glow"/><div className="shell final-grid"><motion.div initial={{opacity:0,y:15,filter:"blur(8px)"}} whileInView={{opacity:1,y:0,filter:"blur(0px)"}} viewport={{once:true}} transition={reveal}><span className="label">One operating system</span><h2>Run the company from one place.</h2><p>Bring your entity map, close process and two problem workflows. We will show how AetherERP would model the company before discussing a migration.</p><div className="final-actions"><MagneticButton className="button-primary button-large" onClick={onDemo}>Book a working session <ArrowRight size={16}/></MagneticButton><span>45 minutes · operator-led</span></div></motion.div><div className="final-machine"><LaptopMock module="Analytics" compact/></div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="shell footer-grid"><div className="footer-main"><Wordmark/><p>One operating system for the entire company.</p><span>Finance · Inventory · HR · CRM · Manufacturing · Analytics</span></div><div><h4>Platform</h4>{["Financials","Inventory","HR","CRM","Manufacturing","Analytics"].map(x=><a key={x} href="#modules">{x}</a>)}</div><div><h4>Company</h4><a href="#security">Security</a><a href="#pricing">Pricing</a><a href="#cases">Case studies</a><a href="#top">About</a></div><div><h4>Resources</h4><a href="#modules">Product tour</a><a href="#security">Trust center</a><a href="#how">Implementation</a><a href="mailto:sales@aethererp.com">Contact</a></div></div><div className="shell footer-bottom"><span>© 2026 AetherERP. All rights reserved.</span><div><a href="#">Privacy</a><a href="#">Terms</a><a href="#security">Security</a></div><em>System status <i/> Operational</em></div></footer>;
}

function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [size,setSize]=useState(""); const [mods,setMods]=useState<string[]>([]); const [error,setError]=useState("");
  useEffect(()=>{ if(!open) setError(""); },[open]);
  const submit=(e:FormEvent)=>{e.preventDefault(); if(name.trim().length<2){setError("Enter your name.");return;} if(!/^\S+@\S+\.\S+$/.test(email)){setError("Enter a valid work email.");return;} if(!size){setError("Select company size.");return;} if(!mods.length){setError("Select at least one module.");return;} const subject=encodeURIComponent(`AetherERP demo request — ${name}`); const body=encodeURIComponent(`Name: ${name}\nWork email: ${email}\nCompany size: ${size}\nModules: ${mods.join(", ")}`); window.location.href=`mailto:sales@aethererp.com?subject=${subject}&body=${body}`; onClose(); };
  const toggle=(m:string)=>setMods(v=>v.includes(m)?v.filter(x=>x!==m):[...v,m]);
  return <AnimatePresence>{open&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="presentation" onMouseDown={onClose}><motion.div className="demo-modal" initial={{opacity:0,y:18,scale:.985}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:10}} transition={reveal} role="dialog" aria-modal="true" aria-labelledby="demo-title" onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><div><span className="label">Working session</span><h2 id="demo-title">See AetherERP against your operating model.</h2></div><button aria-label="Close demo form" onClick={onClose}><X size={18}/></button></div><form onSubmit={submit} noValidate><label><span>Name</span><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" autoComplete="name"/></label><label><span>Work email</span><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email" inputMode="email"/></label><label><span>Company size</span><select value={size} onChange={e=>setSize(e.target.value)}><option value="">Select size</option><option>50–249 people</option><option>250–999 people</option><option>1,000–4,999 people</option><option>5,000+ people</option></select></label><fieldset><legend>Modules to review</legend><div className="module-checks">{Object.keys(moduleData).map(m=><button type="button" key={m} className={mods.includes(m)?"active":""} onClick={()=>toggle(m)}>{mods.includes(m)&&<Check size={12}/>} {m}</button>)}</div></fieldset>{error&&<p className="form-error" role="alert">{error}</p>}<button className="button button-primary submit-demo" type="submit"><span>Prepare demo request <ArrowRight size={15}/></span></button><small>Submitting opens your email client with the request details. No data is sent from this page.</small></form></motion.div></motion.div>}</AnimatePresence>;
}

export default function MarketingSite() {
  const [demo,setDemo]=useState(false);
  return <main><Nav onDemo={()=>setDemo(true)}/><Hero onDemo={()=>setDemo(true)}/><ProofStrip/><ProblemSection/><Modules/><DataModel/><HowItWorks/><Intelligence/><Security/><CaseStudies/><Pricing onDemo={()=>setDemo(true)}/><Integrations/><FinalCTA onDemo={()=>setDemo(true)}/><Footer/><DemoModal open={demo} onClose={()=>setDemo(false)}/></main>;
}
