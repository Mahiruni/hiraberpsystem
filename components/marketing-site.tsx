"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  Sparkles,
  Sun,
  TrendingUp,
  Users,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    features: ["Sales and transaction records", "Expense tracking", "Customer & supplier records", "Basic dashboard and reports"],
  },
  {
    name: "Growth",
    description: "Growing teams that need inventory, purchasing and stronger controls.",
    monthly: "ETB 4,500",
    annual: "ETB 45,000",
    users: "Up to 8 users",
    locations: "Up to 2 locations",
    featured: true,
    features: ["Everything in Starter", "Inventory & warehouse controls", "Invoices & collection follow-up", "Role-based user access"],
  },
  {
    name: "Business",
    description: "Established companies coordinating departments and branches.",
    monthly: "ETB 9,500",
    annual: "ETB 95,000",
    users: "Up to 25 users",
    locations: "Up to 5 locations",
    features: ["Everything in Growth", "Finance & cash-flow workspaces", "Bank reconciliation", "HR, payroll & multi-branch reporting"],
  },
  {
    name: "Enterprise",
    description: "Complex workflows, integrations, migration and governance.",
    monthly: "Custom",
    annual: "Scoped",
    users: "Custom capacity",
    locations: "Custom structure",
    features: ["Custom module configuration", "Integration & API planning", "Complex data migration", "Dedicated implementation management"],
  },
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animation = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;
    const particles = Array.from({ length: 64 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.5 + Math.random() * 1.6,
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.00015,
      a: 0.18 + Math.random() * 0.42,
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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -0.04) p.x = 1.04;
        if (p.x > 1.04) p.x = -0.04;
        if (p.y < -0.04) p.y = 1.04;
        if (p.y > 1.04) p.y = -0.04;
        const x = p.x * width;
        const y = p.y * height;
        ctx.beginPath();
        ctx.fillStyle = `rgba(102, 214, 255, ${p.a})`;
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = (q.x - p.x) * width;
          const dy = (q.y - p.y) * height;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(88, 170, 255, ${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(x, y);
            ctx.lineTo(q.x * width, q.y * height);
            ctx.stroke();
          }
        }
      });
      animation = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

function LogoMark() {
  return (
    <a href="#top" className="brand" aria-label="Hisab ERP home">
      <span className="brand-mark">H</span>
      <span className="brand-copy">
        <strong>Hisab</strong>
        <small>ERP</small>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <header className="site-header">
      <div className="header-shell glass-panel">
        <LogoMark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a href="#pricing" className="button button-secondary desktop-cta">See pricing</a>
          <a href="#cta" className="button button-primary desktop-cta">Book a demo <ArrowRight size={16} /></a>
          <button className="menu-button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-drawer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="mobile-drawer-panel" initial={{ x: 30 }} animate={{ x: 0 }} exit={{ x: 30 }}>
              <div className="drawer-top"><LogoMark /><button className="icon-button" onClick={() => setOpen(false)} aria-label="Close menu"><X size={20} /></button></div>
              <div className="drawer-label">Explore Hisab ERP</div>
              <nav aria-label="Mobile navigation">
                {nav.map(([label, href]) => (
                  <a key={href} href={href} onClick={() => setOpen(false)}>{label}<ChevronRight size={18} /></a>
                ))}
              </nav>
              <a href="#cta" onClick={() => setOpen(false)} className="button button-primary drawer-cta">Book a demo <ArrowRight size={16} /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function SectionHeading({ eyebrow, title, body, center = false }: { eyebrow: string; title: string; body: string; center?: boolean }) {
  return (
    <motion.div className={`section-heading ${center ? "center" : ""}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{body}</p>
    </motion.div>
  );
}

function HeroWorkspace() {
  return (
    <motion.div className="hero-workspace glass-card" initial={{ opacity: 0, y: 36, rotateX: 6 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.75, delay: 0.2 }}>
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
          <span><Check size={14} /> Journal entry created</span>
          <span><Check size={14} /> Balanced</span>
          <b>Dr 48,200.00 · Cr 48,200.00</b>
        </div>
      </div>
      <div className="float-card float-one glass-panel"><TrendingUp size={16} /><div><small>Gross sales</small><strong>ETB 4.82M</strong></div><em>+18.6%</em></div>
      <div className="float-card float-two glass-panel"><PackageCheck size={16} /><div><small>Stock at cost</small><strong>ETB 3.10M</strong></div><em>148 items</em></div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <ParticleField />
      <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
      <div className="container hero-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="hero-badge"><span className="pulse-dot" /> Hisab ERP · Addis Ababa <Sparkles size={14} /></div>
          <h1>Run the whole business from <span>one ledger.</span></h1>
          <p>Hisab connects sales, inventory, purchasing and cash to a single double-entry general ledger — so the number you report is the number that happened.</p>
          <div className="hero-actions">
            <a href="#cta" className="button button-primary button-large">Book a demo <ArrowRight size={18} /></a>
            <a href="#preview" className="button button-ghost button-large">Take the product tour <ChevronRight size={18} /></a>
          </div>
          <div className="hero-assurance"><span><Check size={15} /> No card to start</span><span><Check size={15} /> Spreadsheet migration included</span></div>
        </motion.div>
        <HeroWorkspace />
      </div>
      <div className="container facts-grid">
        {[
          ["15%", "VAT calculated and posted on issue"],
          ["3", "English, Amharic and Tigrinya"],
          ["2×", "Every transaction posted debit against credit"],
          ["ETB", "Birr-native amounts, documents and reporting"],
        ].map(([value, label]) => (
          <div className="fact" key={value}><strong>{value}</strong><span>{label}</span></div>
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
              <motion.article className="module-card" key={module.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: index * 0.05 }} whileHover={{ y: -6 }}>
                <div className="module-icon"><Icon size={21} /></div>
                <h3>{module.title}</h3>
                <p>{module.text}</p>
                <div className="module-meta">{module.meta}</div>
                <a href="#preview">Explore workflow <ArrowRight size={15} /></a>
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
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".24" /><stop offset="100%" stopColor="currentColor" stopOpacity="0" /></linearGradient>
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
        <div className="preview-shell glass-card">
          <div className="preview-sidebar">
            <div className="preview-brand"><span className="brand-mark small">H</span><span>Hisab mobile</span></div>
            <div className="preview-tabs" role="tablist" aria-label="Product areas">
              {(Object.keys(previewTabs) as PreviewTab[]).map((name) => (
                <button key={name} role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={tab === name ? "active" : ""}>
                  {name === "Dashboard" && <Layers3 size={17} />}
                  {name === "Sales" && <ReceiptText size={17} />}
                  {name === "Inventory" && <Boxes size={17} />}
                  {name === "Finance" && <CircleDollarSign size={17} />}
                  {name === "Reports" && <BarChart3 size={17} />}
                  <span>{name}</span>
                </button>
              ))}
            </div>
            <div className="preview-user"><span>MA</span><div><strong>Mahir</strong><small>Administrator</small></div></div>
          </div>
          <div className="preview-main">
            <div className="preview-toolbar"><div><small>Good afternoon</small><strong>{data.eyebrow}</strong></div><button className="button button-secondary">+ New record</button></div>
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
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
        </div>
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
          <div className="trust-chips"><span><ShieldCheck size={15} /> Organization scoped</span><span><FileCheck2 size={15} /> Balanced or rejected</span><span><Fingerprint size={15} /> Traceable history</span></div>
        </div>
        <div className="trust-list">
          {items.map(([Icon, title, text], index) => (
            <motion.div key={title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }}>
              <div className="module-icon"><Icon size={20} /></div><div><h3>{title}</h3><p>{text}</p></div>
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
            <motion.div className="step-card" key={number} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
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
            <motion.article className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} whileHover={{ y: -6 }}>
              {plan.featured && <div className="recommended">Recommended</div>}
              <div className="plan-index">0{index + 1}</div><h3>{plan.name}</h3><p className="plan-desc">{plan.description}</p>
              <div className="price"><strong>{annual ? plan.annual : plan.monthly}</strong><span>{plan.name === "Enterprise" ? "" : annual ? "/ year" : "/ month"}</span></div>
              <div className="plan-capacity"><span><Users size={15} /> {plan.users}</span><span><Building2 size={15} /> {plan.locations}</span></div>
              <ul>{plan.features.map((feature) => <li key={feature}><Check size={15} /> {feature}</li>)}</ul>
              <a href="#cta" className={`button ${plan.featured ? "button-primary" : "button-secondary"}`}>{plan.name === "Enterprise" ? "Talk to sales" : `Choose ${plan.name}`} <ArrowRight size={15} /></a>
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
          {proof.map(([Icon, title, text], index) => <motion.article key={title} initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><Icon size={22} /><h3>{title}</h3><p>{text}</p><a href={title.includes("pricing") ? "#pricing" : title.includes("tour") ? "#preview" : "#trust"}>Inspect evidence <ArrowRight size={14} /></a></motion.article>)}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section cta-section" id="cta">
      <div className="container">
        <div className="cta-card glass-card">
          <div className="cta-glow" />
          <div className="cta-copy"><span className="eyebrow">See it run on your own numbers</span><h2>Bring a month of real invoices. Watch Hisab post them.</h2><p>Book a working session with the HisabTech team in Addis Ababa. We can focus the demonstration on your industry, branches, team structure and reporting requirements.</p></div>
          <div className="cta-actions"><a href="mailto:mahir@hisabtech.com?subject=HisabERP%20demo%20request" className="button button-primary button-large">Book a demo <ArrowRight size={18} /></a><a href="#pricing" className="button button-ghost button-large">See pricing</a></div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand"><LogoMark /><p>Hisab ERP is a connected operating system for Ethiopian businesses — sales, finance, inventory and reporting posting to one set of books.</p><div className="local-tags"><span><Languages size={14} /> EN · AM · TI</span><span><Building2 size={14} /> Addis Ababa</span></div></div>
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
