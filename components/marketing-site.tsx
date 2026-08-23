"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  FileCheck2,
  Fingerprint,
  Languages,
  Layers3,
  LockKeyhole,
  Moon,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  Sun,
  TrendingUp,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import {
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const nav = [
  ["Product", "#product"],
  ["Live preview", "#preview"],
  ["How it works", "#how"],
  ["Pricing", "#pricing"],
  ["Trust", "#trust"],
];

const modules = [
  {
    icon: ReceiptText,
    title: "Sales & invoicing",
    text: "Quote, invoice, collect and post receivable, revenue and VAT from one transaction.",
    meta: "Quotes · Invoices · Receipts",
  },
  {
    icon: CircleDollarSign,
    title: "Finance & accounting",
    text: "Double-entry ledger, cash, journals, VAT position and month-end control without reconstruction.",
    meta: "Ledger · Journals · VAT",
  },
  {
    icon: Boxes,
    title: "Inventory control",
    text: "Keep quantity, movement and value synchronized with sales, purchases, issues and returns.",
    meta: "Stock · Movement · Valuation",
  },
  {
    icon: BarChart3,
    title: "Reports & analytics",
    text: "Trace P&L, balance sheet and operational metrics directly back to the source records.",
    meta: "P&L · Balance sheet · Trends",
  },
  {
    icon: WalletCards,
    title: "Purchasing & suppliers",
    text: "Track what you buy, what you owe and how supplier obligations affect stock and cash.",
    meta: "Purchases · Payables · Expenses",
  },
  {
    icon: ShieldCheck,
    title: "Controls & audit",
    text: "Role-based posting, sequential documents, approvals and immutable event history for every record.",
    meta: "Roles · Approvals · Audit trail",
  },
];

const previewTabs = {
  Dashboard: {
    eyebrow: "Executive dashboard",
    headline: "See the business position in one glance.",
    metrics: [
      ["Today's revenue", "ETB 84,600", "+12.8%"],
      ["Cash available", "ETB 318,400", "Current"],
      ["Receivables", "ETB 72,900", "11 accounts"],
    ],
    activity: [
      ["Sale · Abeba Trading", "ETB 18,900", "Paid"],
      ["Supplier bill · Meron Distribution", "ETB 34,500", "Due"],
      ["Stock alert · Cooking Oil 5L", "7 units", "Reorder"],
    ],
  },
  Sales: {
    eyebrow: "Revenue workflow",
    headline: "Move from sale to invoice to collection without losing the trail.",
    metrics: [
      ["Sales today", "31", "Live"],
      ["Invoiced", "ETB 96,240", "Today"],
      ["Outstanding", "ETB 26,450", "4 invoices"],
    ],
    activity: [
      ["INV-1048 · Abeba Trading", "ETB 18,900", "Paid"],
      ["INV-1047 · Nuru Market", "ETB 12,400", "Partial"],
      ["INV-1046 · Selam Services", "ETB 8,750", "Due Friday"],
    ],
  },
  Inventory: {
    eyebrow: "Stock visibility",
    headline: "Know what is available, what is moving and what needs action.",
    metrics: [
      ["Inventory value", "ETB 684,200", "146 items"],
      ["Low stock", "9 items", "3 urgent"],
      ["Fastest mover", "A-24", "86 units"],
    ],
    activity: [
      ["Premium Coffee 1kg", "48 units", "Healthy"],
      ["Cooking Oil 5L", "7 units", "Reorder"],
      ["Packaging Box M", "126 units", "Stable"],
    ],
  },
  Finance: {
    eyebrow: "Financial control",
    headline: "Understand cash and obligations before month-end.",
    metrics: [
      ["Net cash flow", "ETB 96,240", "Positive"],
      ["Operating margin", "31.8%", "+4.2 pts"],
      ["Payables", "ETB 41,200", "6 bills"],
    ],
    activity: [
      ["Collections received", "ETB 148,600", "This month"],
      ["Operating expenses", "ETB 126,800", "This month"],
      ["Supplier payments", "ETB 52,400", "This month"],
    ],
  },
  Reports: {
    eyebrow: "Management insight",
    headline: "Turn records into decisions without rebuilding spreadsheets.",
    metrics: [
      ["Revenue growth", "+24%", "Prior period"],
      ["Collection rate", "91.4%", "Current"],
      ["Inventory turnover", "4.8×", "Quarter"],
    ],
    activity: [
      ["Revenue performance", "+24%", "Improving"],
      ["Outstanding debt", "ETB 72,900", "11 accounts"],
      ["Expense ratio", "68.2%", "Improved"],
    ],
  },
} as const;

type PreviewTab = keyof typeof previewTabs;

const plans = [
  {
    name: "Starter",
    description: "Small businesses establishing dependable digital records.",
    monthly: "ETB 1,500",
    annual: "ETB 15,000",
    users: "Up to 2 users",
    locations: "1 business location",
    features: [
      "Sales and transaction records",
      "Expense tracking",
      "Customer & supplier records",
      "Basic dashboard and reports",
    ],
  },
  {
    name: "Growth",
    description: "Growing teams that need inventory, purchasing and stronger controls.",
    monthly: "ETB 4,500",
    annual: "ETB 45,000",
    users: "Up to 8 users",
    locations: "Up to 2 locations",
    featured: true,
    features: [
      "Everything in Starter",
      "Inventory & warehouse controls",
      "Invoices & collection follow-up",
      "Role-based user access",
    ],
  },
  {
    name: "Business",
    description: "Established companies coordinating departments and branches.",
    monthly: "ETB 9,500",
    annual: "ETB 95,000",
    users: "Up to 25 users",
    locations: "Up to 5 locations",
    features: [
      "Everything in Growth",
      "Finance & cash-flow workspaces",
      "Bank reconciliation",
      "HR, payroll & multi-branch reporting",
    ],
  },
  {
    name: "Enterprise",
    description: "Complex workflows, integrations, migration and governance.",
    monthly: "Custom",
    annual: "Scoped",
    users: "Custom capacity",
    locations: "Custom structure",
    features: [
      "Custom module configuration",
      "Integration & API planning",
      "Complex data migration",
      "Dedicated implementation management",
    ],
  },
];

const revealTransition = {
  duration: 0.72,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
};

function BrandGlyph({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-mark${small ? " small" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 36 36" focusable="false">
        <path d="M10 8v20M26 8v20M10 18h16" />
        <path className="glyph-accent" d="M7 8h6M23 28h6" />
      </svg>
    </span>
  );
}

function ParticleField({ compact = false }: { compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const style = getComputedStyle(document.documentElement);
    const accentRgb = style.getPropertyValue("--accent-rgb").trim() || "215, 169, 75";
    const glowRgb = style.getPropertyValue("--glow-rgb").trim() || accentRgb;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const count = compact ? (mobile ? 16 : 30) : mobile ? 24 : 68;

    let animation = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.45 + Math.random() * 1.25,
      vx: (Math.random() - 0.5) * 0.000055,
      vy: -0.000018 - Math.random() * 0.000045,
      a: 0.08 + Math.random() * 0.12,
      drift: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time = 0) => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(time * 0.00016 + p.drift) * 0.000006;
        p.y += p.vy;
        if (p.x < -0.04) p.x = 1.04;
        if (p.x > 1.04) p.x = -0.04;
        if (p.y < -0.04) p.y = 1.04;
        const x = p.x * width;
        const y = p.y * height;
        const halo = ctx.createRadialGradient(x, y, 0, x, y, p.r * 7);
        halo.addColorStop(0, `rgba(${accentRgb}, ${p.a})`);
        halo.addColorStop(1, `rgba(${glowRgb}, 0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y, p.r * 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${accentRgb}, ${Math.min(p.a + 0.04, 0.2)})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animation = requestAnimationFrame(draw);
    };

    resize();
    animation = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
    };
  }, [compact, reduced]);

  if (reduced) return null;
  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

function LogoMark() {
  return (
    <a href="#top" className="brand" aria-label="Hisab ERP home">
      <BrandGlyph />
      <span className="brand-copy">
        <strong>Hisab</strong>
        <small>ERP</small>
      </span>
    </a>
  );
}

function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.1;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
    ref.current.style.setProperty("--magnetic-x", `${x}px`);
    ref.current.style.setProperty("--magnetic-y", `${y}px`);
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--magnetic-x", "0px");
    ref.current.style.setProperty("--magnetic-y", "0px");
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`button magnetic-button ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span>{children}</span>
    </a>
  );
}

function AnimatedMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced || value === "ETB") {
      setDisplay(value);
      return;
    }
    const numeric = Number(value.replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(numeric)) return;
    const prefix = value.startsWith("+") ? "+" : "";
    const suffix = value.replace(/[+0-9.]/g, "");
    const start = performance.now();
    const duration = 900;
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      const next = numeric % 1 === 0 ? Math.round(numeric * eased) : (numeric * eased).toFixed(1);
      setDisplay(`${prefix}${next}${suffix}`);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  return <span ref={ref}>{display}</span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [dense, setDense] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setDense(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${dense ? " is-dense" : ""}`}>
      <div className="header-shell glass-panel">
        <LogoMark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href="#pricing" className="button button-secondary desktop-cta">
            <span>See pricing</span>
          </a>
          <MagneticLink href="#cta" className="button-primary desktop-cta">
            Book a demo <ArrowRight size={15} />
          </MagneticLink>
          <button className="menu-button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mobile-drawer-panel"
              initial={{ x: 30 }}
              animate={{ x: 0 }}
              exit={{ x: 30 }}
              transition={revealTransition}
            >
              <div className="drawer-top">
                <LogoMark />
                <button className="icon-button" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X size={19} />
                </button>
              </div>
              <div className="drawer-label">Explore Hisab ERP</div>
              <nav aria-label="Mobile navigation">
                {nav.map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setOpen(false)}>
                    {label}
                    <ChevronRight size={17} />
                  </a>
                ))}
              </nav>
              <a href="#cta" onClick={() => setOpen(false)} className="button button-primary drawer-cta">
                <span>Book a demo <ArrowRight size={15} /></span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  center = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  center?: boolean;
}) {
  return (
    <motion.div
      className={`section-heading ${center ? "center" : ""}`}
      initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={revealTransition}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{body}</p>
    </motion.div>
  );
}

function HeroWorkspace() {
  return (
    <motion.div
      className="hero-workspace glass-card"
      initial={{ opacity: 0, y: 28, rotateX: 4, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      transition={{ ...revealTransition, delay: 0.16 }}
    >
      <div className="workspace-bar">
        <div className="workspace-dots"><i /><i /><i /></div>
        <span>Illustrative invoice posting</span>
        <span className="live-pill"><i /> Posted</span>
      </div>
      <div className="workspace-body">
        <div className="workspace-topline">
          <div>
            <small>INV-2041 · 23 Jul 2026</small>
            <h3>Abyssinia Trading PLC</h3>
            <p>Sales invoice · 15% VAT inclusive</p>
          </div>
          <strong>ETB 48,200.00</strong>
        </div>
        <div className="ledger-table">
          <div className="ledger-row ledger-head"><span>Account</span><span>Debit</span><span>Credit</span></div>
          <div className="ledger-row"><span>1200 · Accounts receivable</span><span>48,200.00</span><span>—</span></div>
          <div className="ledger-row"><span>4000 · Sales revenue</span><span>—</span><span>41,913.04</span></div>
          <div className="ledger-row"><span>2310 · VAT payable</span><span>—</span><span>6,286.96</span></div>
        </div>
        <div className="workspace-foot">
          <span><Check size={13} /> Journal entry created</span>
          <span><Check size={13} /> Balanced</span>
          <b>Dr 48,200.00 · Cr 48,200.00</b>
        </div>
      </div>
      <motion.div className="float-card float-one glass-panel" animate={{ y: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <TrendingUp size={15} /><div><small>Gross sales</small><strong>ETB 4.82M</strong></div><em>+18.6%</em>
      </motion.div>
      <motion.div className="float-card float-two glass-panel" animate={{ y: [0, 5, 0] }} transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}>
        <PackageCheck size={15} /><div><small>Stock at cost</small><strong>ETB 3.10M</strong></div><em>148 items</em>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <ParticleField />
      <div className="hero-gridlines" aria-hidden="true" />
      <div className="hero-orb orb-one" />
      <div className="hero-orb orb-two" />
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={revealTransition}
        >
          <div className="hero-badge"><span className="pulse-dot" /> Hisab ERP · Addis Ababa <span className="badge-rule" /></div>
          <h1>Run the whole business from <em>one ledger.</em></h1>
          <p>Hisab connects sales, inventory, purchasing and cash to a single double-entry general ledger — so the number you report is the number that happened.</p>
          <div className="hero-actions">
            <MagneticLink href="#cta" className="button-primary button-large">Book a demo <ArrowRight size={17} /></MagneticLink>
            <MagneticLink href="#preview" className="button-ghost button-large">Take the product tour <ChevronRight size={17} /></MagneticLink>
          </div>
          <div className="hero-assurance"><span><Check size={14} /> No card to start</span><span><Check size={14} /> Spreadsheet migration included</span></div>
        </motion.div>
        <HeroWorkspace />
      </div>
      <div className="container facts-grid">
        {[
          ["15%", "VAT calculated and posted on issue"],
          ["3", "English, Amharic and Tigrinya"],
          ["2×", "Every transaction posted debit against credit"],
          ["ETB", "Birr-native amounts, documents and reporting"],
        ].map(([value, label], index) => (
          <motion.div className="fact" key={value} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ...revealTransition, delay: index * 0.06 }}>
            <strong><AnimatedMetric value={value} /></strong><span>{label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProductSection() {
  return (
    <section className="section" id="product">
      <div className="container">
        <SectionHeading eyebrow="One system, one source" title="Six connected areas. One set of books." body="Each workspace supports daily operations without keeping a private version of the truth. The result is finance-grade control with the speed of a modern SaaS product." />
        <div className="module-grid">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <motion.article
                className="module-card"
                key={module.title}
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ ...revealTransition, delay: index * 0.055 }}
              >
                <div className="module-index">0{index + 1}</div>
                <div className="module-icon"><Icon size={19} /></div>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
                <div className="module-meta">{module.meta}</div>
                <a href="#preview">Explore workflow <ArrowRight size={14} /></a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Chart() {
  return (
    <div className="chart-wrap" aria-label="Illustrative performance trend chart">
      <svg viewBox="0 0 760 220" role="img" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".22" /><stop offset="100%" stopColor="currentColor" stopOpacity="0" /></linearGradient>
        </defs>
        {[40, 85, 130, 175].map((y) => <line key={y} x1="0" x2="760" y1={y} y2={y} className="chart-grid" />)}
        <path className="chart-area" d="M0 177 C40 155 65 170 105 142 S170 130 210 136 S280 92 326 102 S390 76 435 90 S500 48 548 64 S625 40 674 50 S720 30 760 22 L760 220 L0 220 Z" />
        <path className="chart-line" pathLength="1" d="M0 177 C40 155 65 170 105 142 S170 130 210 136 S280 92 326 102 S390 76 435 90 S500 48 548 64 S625 40 674 50 S720 30 760 22" />
        <circle className="chart-point" cx="760" cy="22" r="5" />
      </svg>
      <div className="chart-labels"><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span></div>
    </div>
  );
}

function PreviewSection() {
  const [tab, setTab] = useState<PreviewTab>("Dashboard");
  const data = previewTabs[tab];
  return (
    <section className="section preview-section" id="preview">
      <div className="container">
        <SectionHeading eyebrow="Live product preview" title="Trading-grade visibility for everyday operations." body="A dense, responsive management workspace — designed with the speed and clarity people expect from modern finance platforms, using the same connected records that run the business." center />
        <motion.div className="preview-shell glass-card" initial={{ opacity: 0, y: 18, filter: "blur(10px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-80px" }} transition={revealTransition}>
          <div className="preview-sidebar">
            <div className="preview-brand"><BrandGlyph small /><span>Hisab workspace</span></div>
            <div className="preview-tabs" role="tablist" aria-label="Product areas">
              {(Object.keys(previewTabs) as PreviewTab[]).map((name) => (
                <button key={name} role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={tab === name ? "active" : ""}>
                  {name === "Dashboard" && <Layers3 size={16} />}
                  {name === "Sales" && <ReceiptText size={16} />}
                  {name === "Inventory" && <Boxes size={16} />}
                  {name === "Finance" && <CircleDollarSign size={16} />}
                  {name === "Reports" && <BarChart3 size={16} />}
                  <span>{name}</span>
                </button>
              ))}
            </div>
            <div className="preview-user"><span>MA</span><div><strong>Mahir</strong><small>Administrator</small></div></div>
          </div>
          <div className="preview-main">
            <div className="preview-toolbar"><div><small>Good afternoon</small><strong>{data.eyebrow}</strong></div><button className="button button-secondary"><span>+ New record</span></button></div>
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 8, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -5, filter: "blur(4px)" }} transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}>
                <div className="preview-title"><div><span className="eyebrow">{data.eyebrow}</span><h3>{data.headline}</h3></div><span className="updated"><i /> Updated now</span></div>
                <div className="preview-metrics">
                  {data.metrics.map(([label, value, note]) => <div key={label}><small>{label}</small><strong>{value}</strong><span>{note}</span></div>)}
                </div>
                <div className="chart-card"><div className="chart-header"><div><span>Performance trend</span><small>Last six periods</small></div><strong>+24.0%</strong></div><Chart /></div>
                <div className="activity-card">
                  <div className="activity-header"><span>Current activity</span><small>Value</small><small>Status</small></div>
                  {data.activity.map(([label, value, status]) => <div className="activity-row" key={label}><strong>{label}</strong><span>{value}</span><em>{status}</em></div>)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustSection() {
  const items = [
    [LockKeyhole, "Row-level security", "Every query is scoped to your organization at the database level, not only in the interface."],
    [FileCheck2, "Period locking", "Open, soft-closed and locked periods preserve the integrity of historical reporting."],
    [Fingerprint, "Audit events", "Know who posted what, when, and against which document — with history attached."],
    [Zap, "Atomic posting", "Stock, ledger and VAT move together or not at all. Unbalanced journals are rejected."],
  ] as const;
  return (
    <section className="section trust-section" id="trust">
      <div className="container trust-grid">
        <div>
          <SectionHeading eyebrow="Controls by design" title="Accounting software should be difficult to lie to." body="These controls are not optional settings switched on later. They are how posting works — so reports can be trusted without a second spreadsheet." />
          <div className="trust-chips"><span><ShieldCheck size={14} /> Organization scoped</span><span><FileCheck2 size={14} /> Balanced or rejected</span><span><Fingerprint size={14} /> Traceable history</span></div>
        </div>
        <div className="trust-list">
          {items.map(([Icon, title, text], index) => (
            <motion.div key={title} initial={{ opacity: 0, x: 12, filter: "blur(6px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ ...revealTransition, delay: index * 0.07 }}>
              <div className="module-icon"><Icon size={19} /></div><div><h3>{title}</h3><p>{text}</p></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowSection() {
  const steps = [
    ["01", "Set up the books", "Configure the chart of accounts, VAT settings, branches, users and roles around how the business actually operates."],
    ["02", "Bring in your history", "Migrate customers, suppliers, stock items and opening balances, then check the trial balance before go-live."],
    ["03", "Run one cycle in parallel", "Use Hisab alongside the old process for a full period so your own numbers prove the workflow."],
    ["04", "Close in Hisab", "Run the first close on posted entries, then archive the old spreadsheets instead of maintaining them."],
  ];
  return (
    <section className="section" id="how">
      <div className="container">
        <SectionHeading eyebrow="Implementation" title="Four steps, and you never run blind." body="Changing the system a business runs on is a real risk. The rollout proves the workflow against your own numbers before the old process is retired." center />
        <div className="steps-grid">
          {steps.map(([number, title, text], index) => (
            <motion.div className="step-card" key={number} initial={{ opacity: 0, y: 14, filter: "blur(7px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ ...revealTransition, delay: index * 0.07 }}>
              <div className="step-number">{number}</div><div className="step-line" /><h3>{title}</h3><p>{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [annual, setAnnual] = useState(true);
  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <SectionHeading eyebrow="Transparent ETB pricing" title="Choose the control your business needs now." body="Published pricing, clear capacity and secure one-time Chapa checkout. Renewal is manual — no automatic recurring charge." center />
        <div className="billing-toggle" role="group" aria-label="Billing period">
          <button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Monthly</button>
          <button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Annual <span>Save ≈ 2 months</span></button>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <motion.article className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.name} initial={{ opacity: 0, y: 16, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ ...revealTransition, delay: index * 0.06 }}>
              {plan.featured && <div className="recommended">Recommended</div>}
              <div className="plan-index">0{index + 1}</div><h3>{plan.name}</h3><p className="plan-desc">{plan.description}</p>
              <div className="price"><strong>{annual ? plan.annual : plan.monthly}</strong><span>{plan.name === "Enterprise" ? "" : annual ? "/ year" : "/ month"}</span></div>
              <div className="plan-capacity"><span><Users size={14} /> {plan.users}</span><span><Building2 size={14} /> {plan.locations}</span></div>
              <ul>{plan.features.map((feature) => <li key={feature}><Check size={14} /> {feature}</li>)}</ul>
              <a href="#cta" className={`button ${plan.featured ? "button-primary" : "button-secondary"}`}><span>{plan.name === "Enterprise" ? "Talk to sales" : `Choose ${plan.name}`} <ArrowRight size={14} /></span></a>
            </motion.article>
          ))}
        </div>
        <p className="pricing-note">Published prices are shown before any applicable VAT or statutory charge. Migration, extra users, extra branches and custom integrations are scoped separately.</p>
      </div>
    </section>
  );
}

function ProofSection() {
  const proof = [
    [Layers3, "Interactive product tour", "Inspect how sales, inventory, finance and reporting connect before creating an account."],
    [CircleDollarSign, "Transparent ETB pricing", "Review published launch pricing, included users, branch capacity and optional implementation costs."],
    [ShieldCheck, "Public trust controls", "Evaluate implemented security controls, configuration-dependent safeguards and shared responsibilities."],
    [Users, "Reference customer program", "Measure operational improvement against a documented baseline before any story is published."],
  ] as const;
  return (
    <section className="section proof-section">
      <div className="container">
        <SectionHeading eyebrow="Evidence before promotion" title="No invented testimonials. Proof you can inspect." body="HisabTech's publication standard is simple: verified business identity, a documented starting point, a defined implementation scope and an approved result before a customer story becomes public." center />
        <div className="proof-grid">
          {proof.map(([Icon, title, text], index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 10, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ ...revealTransition, delay: index * .06 }}>
              <Icon size={20} /><h3>{title}</h3><p>{text}</p><a href={title.includes("pricing") ? "#pricing" : title.includes("tour") ? "#preview" : "#trust"}>Inspect evidence <ArrowRight size={13} /></a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section cta-section" id="cta">
      <div className="container">
        <motion.div className="cta-card glass-card" initial={{ opacity: 0, y: 14, filter: "blur(9px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-70px" }} transition={revealTransition}>
          <ParticleField compact />
          <div className="cta-gridlines" aria-hidden="true" />
          <div className="cta-glow" />
          <div className="cta-copy"><span className="eyebrow">See it run on your own numbers</span><h2>Bring a month of real invoices. Watch Hisab post them.</h2><p>Book a working session with the HisabTech team in Addis Ababa. We can focus the demonstration on your industry, branches, team structure and reporting requirements.</p></div>
          <div className="cta-actions"><MagneticLink href="mailto:mahir@hisabtech.com?subject=HisabERP%20demo%20request" className="button-primary button-large">Book a demo <ArrowRight size={17} /></MagneticLink><MagneticLink href="#pricing" className="button-ghost button-large">See pricing</MagneticLink></div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand"><LogoMark /><p>Hisab ERP is a connected operating system for Ethiopian businesses — sales, finance, inventory and reporting posting to one set of books.</p><div className="local-tags"><span><Languages size={13} /> EN · AM · TI</span><span><Building2 size={13} /> Addis Ababa</span></div></div>
        <div><h4>Product</h4><a href="#preview">Product tour</a><a href="#product">Sales & invoicing</a><a href="#product">Finance & cash flow</a><a href="#product">Inventory</a><a href="#pricing">Pricing</a></div>
        <div><h4>Learn</h4><a href="#how">Implementation</a><a href="#trust">Trust centre</a><a href="#preview">Reports & analytics</a><a href="#pricing">Compare plans</a></div>
        <div><h4>Company</h4><a href="mailto:mahir@hisabtech.com">Contact</a><a href="#trust">Security</a><a href="#cta">Book a demo</a><a href="#top">Hisab Technologies</a></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Hisab Technologies. Addis Ababa, Ethiopia.</span><div><a href="#">Privacy</a><a href="#">Terms</a><a href="#trust">Security</a></div></div>
    </footer>
  );
}

export default function MarketingSite() {
  return <main><Header /><Hero /><ProductSection /><PreviewSection /><TrustSection /><HowSection /><PricingSection /><ProofSection /><CTASection /><Footer /></main>;
}
