import { useState } from "react";

const NAVY = "#003087";
const RED = "#E31837";
const LIGHT_BLUE = "#e8eef7";
const GREY_BG = "#f5f6f8";
const BORDER = "#dde1e9";
const TEXT = "#1a1a2e";
const MUTED = "#6b7280";

const categories = [
  {
    id: "nutrition", label: "Nutrition & Supplements", icon: "🌿",
    options: ["Multivitamin / daily supplement","Omega-3 / Fish Oil","Vitamin C or D","Protein powder","Probiotics / gut health","Weight management","Kids nutrition","Athletic performance"],
    amwayProducts: [
      { name: "Nutriway Double X Multivitamin (31-Day Refill)", match: ["Multivitamin / daily supplement","Athletic performance"], url: "https://www.amway.com.au/Categories/Shop/Health/Vitamins-&-Supplements/Everyday-Essentials/NUTRIWAY%E2%84%A2-DOUBLE-X%E2%84%A2-31-Day-Supply-Refill/p/120844" },
      { name: "Nutriway Advanced Omega-3 (60 Softgels)", match: ["Omega-3 / Fish Oil","Athletic performance"], url: "https://www.amway.com.au/Brands/NUTRIWAY/Nutriway%E2%84%A2-Advanced-Omega-3---60-Softgel-Capsules/p/126136" },
      { name: "Nutriway Vitamin C Plus (120 Tablets)", match: ["Vitamin C or D"], url: "https://www.amway.com.au/Categories/Shop/Health/Vitamins-&-Supplements/Cold,-Flu-&-Immunity/NUTRIWAY%E2%84%A2-Vitamin-C-Plus---120-Tablets/p/109746" },
      { name: "XS Whey Protein — Vanilla", match: ["Protein powder","Weight management","Athletic performance"], url: "https://www.amway.com.au/Categories/Shop/Health/XS%E2%84%A2-Whey-Protein-Vanilla/p/268210" },
      { name: "Nutriway Probiotic", match: ["Probiotics / gut health"], url: "https://www.amway.com.au/Categories/Shop/Health/Vitamins-&-Supplements/Probiotics/NUTRIWAY%E2%84%A2-Probiotic/p/120571" },
      { name: "Nutriway Kids Daily Multivitamin (60 Chewable)", match: ["Kids nutrition"], url: "https://www.amway.com.au/Brands/NUTRIWAY/Nutriway%E2%84%A2-Kids-Daily-Multivitamin---60-Chewable-Tablets/p/123043" },
    ]
  },
  {
    id: "energy", label: "Energy & Performance", icon: "⚡",
    options: ["Energy drinks","Coffee / caffeine reliance","Pre-workout","Sports / hydration drinks","Recovery support","Mental focus"],
    amwayProducts: [
      { name: "XS Energy Drink — Citrus Blast", match: ["Energy drinks","Coffee / caffeine reliance","Mental focus"], url: "https://www.amway.com.au/Categories/Shop/Health/Energy-&-Sports-Nutrition/Energy-Drinks/XS%E2%84%A2-Energy-Drink-Citrus-Blast/p/110699" },
      { name: "XS Pre-Workout Boost — Melonade", match: ["Pre-workout","Mental focus"], url: "https://www.amway.com.au/Categories/Shop/Health/XS%E2%84%A2-Pre-Workout-Boost-Melonade/p/268208" },
      { name: "XS Whey Protein — Vanilla", match: ["Recovery support","Athletic performance"], url: "https://www.amway.com.au/Categories/Shop/Health/XS%E2%84%A2-Whey-Protein-Vanilla/p/268210" },
      { name: "XS Muscle Multiplier Essential Amino Acids", match: ["Sports / hydration drinks","Recovery support"], url: "https://www.amway.com.au/Categories/Shop/Health/Energy-&-Sports-Nutrition/Sports-Nutrition/XS%E2%84%A2-Muscle-Multiplier%E2%84%A2-Essential-Amino-Acids---Fruit-Punch/p/116400" },
    ]
  },
  {
    id: "skincare", label: "Skincare & Beauty", icon: "✨",
    options: ["Moisturiser / hydration","Serum or eye cream","SPF / sun protection","Cleanser or exfoliator","Foundation / makeup","Anti-ageing","Sensitive or acne-prone skin"],
    amwayProducts: [
      { name: "Artistry Skin Nutrition Hydrating Moisturiser", match: ["Moisturiser / hydration","Sensitive or acne-prone skin"], url: "https://www.amway.com.au/Categories/Shop/Beauty/Skincare/Moisturisers/ARTISTRY%E2%84%A2-Skin-Nutrition-Hydrating-Moisturiser/p/123464" },
      { name: "Artistry Vitamin C + HA3 Daily Serum", match: ["Serum or eye cream","Anti-ageing"], url: "https://www.amway.com.au/Brands/ARTISTRY/Artistry%E2%84%A2-Skin-Nutrition-Vitamin-C-+-HA3-/p/125517" },
      { name: "Artistry Intensive Skincare Anti-Wrinkle Firming Serum", match: ["Anti-ageing","Serum or eye cream"], url: "https://www.amway.com.au/Categories/Shop/Beauty/Skincare-By-Concern/Anti-Ageing/ARTISTRY%E2%84%A2-Intensive-Skincare-Anti-Wrinkle-Firming-Serum/p/109709" },
      { name: "Artistry Skin Nutrition Balancing Cleanser", match: ["Cleanser or exfoliator","Sensitive or acne-prone skin"], url: "https://www.amway.com.au/Categories/Shop/Beauty/Skincare/Cleansers/ARTISTRY%E2%84%A2-Skin-Nutrition-Balancing-Cleanser/p/123460" },
      { name: "Artistry Studio Skincare Cleanser + Exfoliator", match: ["Cleanser or exfoliator","Foundation / makeup"], url: "https://www.amway.com.au/Brands/ARTISTRY/Artistry-Studio%E2%84%A2-Skincare-Cleanser-+-Exfoliator/p/124812" },
      { name: "Artistry Skin Nutrition Brightening Eye Cream", match: ["Serum or eye cream","Anti-ageing"], url: "https://www.amway.com.au/Categories/Shop/Beauty/Skincare/Eye-Treatments/ARTISTRY%E2%84%A2-Skin-Nutrition-Brightening-Eye-Cream/p/123468" },
    ]
  },
  {
    id: "personal_care", label: "Personal Care", icon: "🛁",
    options: ["Shampoo & conditioner","Body wash","Deodorant","Toothpaste & mouthwash","Hair growth or thickness","Natural / plant-based products"],
    amwayProducts: [
      { name: "Satinique 2-in-1 Shampoo & Conditioner (750ml)", match: ["Shampoo & conditioner","Hair growth or thickness","Natural / plant-based products"], url: "https://www.amway.com.au/Brands/SATINIQUE/Satinique%E2%84%A2-2in1-Shampoo-&-Conditioner---750ml/p/126456" },
      { name: "Satinique Colour Protect Shampoo", match: ["Shampoo & conditioner","Hair growth or thickness"], url: "https://www.amway.com.au/Categories/Shop/Beauty/Hair/Shampoo/SATINIQUE%E2%84%A2-Colour-Protect-Shampoo---750ml/p/109774" },
      { name: "g&h Nourish+ Body Wash (1L)", match: ["Body wash","Natural / plant-based products"], url: "https://www.amway.com.au/Brands/G&H/g&h-Nourish+%E2%84%A2-Body-Wash---1L/p/125914" },
      { name: "g&h Protect+ Deodorant Spray", match: ["Deodorant"], url: "https://www.amway.com.au/Categories/Shop/Beauty/Bath-&-Body/Deodorant/g&h-PROTECT+%E2%84%A2-Deodorant-Spray/p/109800" },
      { name: "Glister Multi-Action Toothpaste (200g)", match: ["Toothpaste & mouthwash"], url: "https://www.amway.com.au/Brands/Glister/Glister%E2%84%A2-Multi-Action-Toothpaste---200gm/p/124106" },
      { name: "Glister Multi-Action Mouthwash (500ml)", match: ["Toothpaste & mouthwash"], url: "https://www.amway.com.au/Brands/Glister/Glister%E2%84%A2-Multi-Action-Ready-to-Use-Mouthwash---500ml/p/124113" },
    ]
  },
  {
    id: "home", label: "Home & Cleaning", icon: "🏠",
    options: ["All-purpose / surface cleaner","Dishwashing liquid","Laundry detergent","Bathroom cleaner","Eco-friendly or concentrated products","Safer products around kids or pets"],
    amwayProducts: [
      { name: "L.O.C. Multi-Purpose Cleaner (1L)", match: ["All-purpose / surface cleaner","Eco-friendly or concentrated products","Safer products around kids or pets"], url: "https://www.amway.com.au/Categories/Shop/Home/Household-Hygiene/General-Cleaning/L-O-C-%E2%84%A2-Multi-Purpose-Cleaner-1L/p/202599" },
      { name: "L.O.C. Glass Cleaner", match: ["All-purpose / surface cleaner","Bathroom cleaner"], url: "https://www.amway.com.au/Categories/Shop/Home/Household-Hygiene/General-Cleaning/L-O-C-%E2%84%A2-Glass-Cleaner/p/202602" },
      { name: "Dish Drops Dishwashing Liquid (1L)", match: ["Dishwashing liquid","Eco-friendly or concentrated products"], url: "https://www.amway.com.au/Categories/Shop/Home/Household-Hygiene/Kitchen/DISH-DROPS%E2%84%A2-1L/p/2249" },
      { name: "SA8 Premium Laundry Powder (3kg)", match: ["Laundry detergent","Eco-friendly or concentrated products"], url: "https://www.amway.com.au/Brands/Amway-Home/SA8/SA8%E2%84%A2-Premium---3kg/p/116" },
      { name: "SA8 Liquid Laundry Detergent (1L)", match: ["Laundry detergent","Safer products around kids or pets"], url: "https://www.amway.com.au/Categories/Shop/Home/SA8%E2%84%A2-Liquid-Laundry-Detergent-1L/p/103277" },
    ]
  }
];

export default function AmwayFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [visible, setVisible] = useState(true);

  const totalSteps = categories.length;
  const currentCat = categories[step];
  const isResults = step === totalSteps;

  const toggle = (catId, item) => {
    setAnswers(prev => {
      const cur = prev[catId] || [];
      return { ...prev, [catId]: cur.includes(item) ? cur.filter(i => i !== item) : [...cur, item] };
    });
  };

  const isOn = (catId, item) => (answers[catId] || []).includes(item);

  const go = (fn) => { setVisible(false); setTimeout(() => { fn(); setVisible(true); }, 180); };
  const goNext = () => go(() => setStep(s => s + 1));
  const goBack = () => go(() => setStep(s => s - 1));

  const getRecs = () => {
    const seen = new Set();
    return categories.map(cat => {
      const tags = answers[cat.id] || [];
      const matched = cat.amwayProducts.filter(p => {
        if (seen.has(p.url)) return false;
        if (p.match.some(t => tags.includes(t))) { seen.add(p.url); return true; }
        return false;
      });
      return matched.length > 0 ? { category: cat.label, icon: cat.icon, products: matched } : null;
    }).filter(Boolean);
  };

  const progress = Math.round((step / totalSteps) * 100);

  // ─── WELCOME ────────────────────────────────────────────────
  if (!nameSubmitted) {
    return (
      <div style={S.page}>
        <Header />
        <div style={S.centerWrap}>
          <div style={S.welcomeCard}>
            <div style={S.redRule} />
            <h1 style={S.welcomeTitle}>Find your Amway routine</h1>
            <p style={S.welcomeSub}>
              Tell us what you currently use and what you're open to — we'll match you to the right products from the Amway Australia range.
            </p>
            <label style={S.fieldLabel}>Your first name</label>
            <input
              autoFocus
              style={S.input}
              placeholder="e.g. Sarah"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && name.trim() && setNameSubmitted(true)}
            />
            <button
              style={{ ...S.btnPrimary, opacity: name.trim() ? 1 : 0.4 }}
              disabled={!name.trim()}
              onClick={() => setNameSubmitted(true)}
            >
              Get started
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ─── RESULTS ────────────────────────────────────────────────
  if (isResults) {
    const recs = getRecs();
    const today = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
    const totalProducts = recs.reduce((acc, g) => acc + g.products.length, 0);

    return (
      <div style={S.page}>
        <Header />

        {/* Screenshot-ready results card */}
        <div style={{ width: "100%", maxWidth: 560, margin: "0 auto", padding: "0 16px", boxSizing: "border-box" }}>

          <div style={S.resultsCard}>
            {/* Navy header band */}
            <div style={S.resultsHeader}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600, letterSpacing: "1.5px", marginBottom: 6 }}>
                  PERSONALISED PRODUCT LIST
                </div>
                <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
                  {name}'s Potential Amway Routine
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 5 }}>{today}</div>
              </div>
              <div style={S.countBox}>
                <div style={{ color: "#fff", fontSize: 26, fontWeight: 800, lineHeight: 1 }}>{totalProducts}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontWeight: 600, letterSpacing: "1px", marginTop: 3 }}>PRODUCTS</div>
              </div>
            </div>

            {/* Product groups */}
            <div style={{ padding: "4px 24px 20px" }}>
              {recs.length === 0 ? (
                <p style={{ color: MUTED, padding: "20px 0", fontSize: 14 }}>No matches found — go back and select more options.</p>
              ) : recs.map((group, gi) => (
                <div key={group.category} style={{ marginTop: 20 }}>
                  <div style={S.groupLabel}>
                    <span style={{ marginRight: 6 }}>{group.icon}</span>
                    {group.category}
                  </div>
                  {group.products.map((p, pi) => (
                    <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={S.resultRow}>
                      <div style={S.resultNum}>{gi * 9 + pi + 1}</div>
                      <span style={S.resultName}>{p.name}</span>
                      <span style={S.resultLink}>View ›</span>
                    </a>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer band */}
            <div style={S.resultsFooter}>
              <span style={{ fontWeight: 700, color: NAVY }}>amway</span>
              <span style={{ color: RED, fontWeight: 700 }}>.com.au</span>
              <span style={{ color: "#bbb", marginLeft: "auto", fontSize: 11 }}>Amway Australia Routine Finder</span>
            </div>
          </div>

          {/* Screenshot CTA banner */}
          <div style={{
            marginTop: 20,
            background: NAVY,
            borderRadius: 10,
            padding: "24px 24px",
            border: `3px solid ${RED}`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>📸</div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.3px" }}>
              Take a screenshot &amp; send to your mentor
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.5 }}>
              Your mentor will help you decide which products to start with first.
            </div>
          </div>

          {/* Action row */}
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button style={S.btnOutline} onClick={goBack}>← Back</button>
            <button style={S.btnOutline} onClick={() => { setStep(0); setAnswers({}); setNameSubmitted(false); setName(""); }}>
              Start over
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // ─── QUIZ STEPS ─────────────────────────────────────────────
  const totalSel = (answers[currentCat.id] || []).length;

  return (
    <div style={S.page}>
      <Header />

      {/* Progress bar under header */}
      <div style={S.progressTrack}>
        <div style={{ ...S.progressFill, width: `${progress}%` }} />
      </div>

      <div style={{ width: "100%", maxWidth: 580, margin: "0 auto", padding: "24px 16px 48px", boxSizing: "border-box" }}>

        {/* Step breadcrumb */}
        <div style={S.breadcrumb}>
          {categories.map((c, i) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: i < step ? NAVY : i === step ? NAVY : "#fff",
                border: `2px solid ${i <= step ? NAVY : BORDER}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700,
                color: i <= step ? "#fff" : MUTED,
                transition: "all 0.25s",
                flexShrink: 0,
              }}>
                {i < step ? "✓" : i + 1}
              </div>
              {i < categories.length - 1 && (
                <div style={{ width: 20, height: 2, background: i < step ? NAVY : BORDER, transition: "background 0.25s" }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={{
          ...S.quizCard,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.18s ease, transform 0.18s ease",
        }}>
          {/* Category header */}
          <div style={S.catBar}>
            <span style={{ fontSize: 28 }}>{currentCat.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: MUTED, fontSize: 11, fontWeight: 600, letterSpacing: "1px", marginBottom: 2 }}>
                STEP {step + 1} OF {totalSteps}
              </div>
              <h2 style={S.catTitle}>{currentCat.label}</h2>
            </div>
            {totalSel > 0 && (
              <div style={S.selBadge}>{totalSel} selected</div>
            )}
          </div>

          <div style={S.divider} />

          {/* Combined section */}
          <div style={S.section}>
            <div style={S.sectionHead}>
              <div style={{ ...S.sectionDot, background: NAVY }} />
              Select everything that applies to you
            </div>
            <div style={S.chipGrid}>
              {currentCat.options.map(item => {
                const on = isOn(currentCat.id, item);
                return (
                  <button key={item} onClick={() => toggle(currentCat.id, item)}
                    style={{ ...S.chip, ...(on ? { background: LIGHT_BLUE, borderColor: NAVY, color: NAVY, fontWeight: 600 } : {}) }}>
                    {on && <span style={{ marginRight: 4, color: NAVY }}>✓</span>}{item}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={S.divider} />

          {/* Nav */}
          <div style={S.navRow}>
            {step > 0 && (
              <button style={S.btnOutline} onClick={goBack}>← Back</button>
            )}
            <button style={{ ...S.btnPrimary, marginLeft: "auto" }} onClick={goNext}>
              {step === totalSteps - 1 ? "See my products" : "Next →"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div style={{
      width: "100%",
      background: NAVY,
      padding: "0 24px",
      display: "flex",
      alignItems: "center",
      height: 56,
      boxSizing: "border-box",
      flexShrink: 0,
    }}>
      <span style={{ color: "#fff", fontSize: 14, fontWeight: 600, letterSpacing: "0.3px" }}>
        Product Routine Finder
      </span>
    </div>
  );
}

function Footer() {
  return (
    <div style={{
      width: "100%",
      borderTop: `1px solid ${BORDER}`,
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "auto",
      boxSizing: "border-box",
      flexShrink: 0,
    }}>
      <span style={{ color: "#bbb", fontSize: 12 }}>© Amway of Australia</span>
      <a href="https://www.amway.com.au" target="_blank" rel="noopener noreferrer"
        style={{ color: NAVY, fontSize: 12, textDecoration: "none", fontWeight: 500 }}>
        amway.com.au ›
      </a>
    </div>
  );
}

const S = {
  page: {
    minHeight: "100vh",
    background: GREY_BG,
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    color: TEXT,
  },
  centerWrap: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 16px",
  },
  welcomeCard: {
    background: "#fff",
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    padding: "40px 36px",
    width: "100%",
    maxWidth: 460,
    boxSizing: "border-box",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  redRule: {
    width: 40,
    height: 3,
    background: RED,
    borderRadius: 2,
    marginBottom: 20,
  },
  welcomeTitle: {
    color: NAVY,
    fontSize: 28,
    fontWeight: 700,
    margin: "0 0 12px",
    lineHeight: 1.25,
  },
  welcomeSub: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 1.6,
    margin: "0 0 28px",
  },
  fieldLabel: {
    display: "block",
    color: TEXT,
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 8,
  },
  input: {
    display: "block",
    width: "100%",
    padding: "11px 14px",
    background: "#fff",
    border: `1.5px solid ${BORDER}`,
    borderRadius: 6,
    color: TEXT,
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: 18,
  },
  btnPrimary: {
    display: "block",
    width: "100%",
    background: NAVY,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "12px 24px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "0.3px",
    transition: "opacity 0.2s",
  },
  btnOutline: {
    background: "#fff",
    color: NAVY,
    border: `1.5px solid ${BORDER}`,
    borderRadius: 6,
    padding: "10px 18px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  progressTrack: {
    height: 3,
    background: BORDER,
    width: "100%",
  },
  progressFill: {
    height: "100%",
    background: NAVY,
    transition: "width 0.4s ease",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  quizCard: {
    background: "#fff",
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  },
  catBar: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "20px 24px 16px",
    background: "#fff",
  },
  catTitle: {
    color: NAVY,
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
  },
  selBadge: {
    background: LIGHT_BLUE,
    color: NAVY,
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: 20,
    whiteSpace: "nowrap",
    letterSpacing: "0.3px",
  },
  divider: {
    height: 1,
    background: BORDER,
    margin: "0",
  },
  section: {
    padding: "20px 24px",
  },
  sectionHead: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: TEXT,
    fontSize: 13,
    fontWeight: 600,
    marginBottom: 14,
    letterSpacing: "0.2px",
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    flexShrink: 0,
  },
  chipGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    background: "#fff",
    border: `1.5px solid ${BORDER}`,
    borderRadius: 20,
    padding: "7px 14px",
    color: MUTED,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.12s ease",
    display: "flex",
    alignItems: "center",
  },
  navRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "16px 24px",
  },
  // Results
  resultsCard: {
    background: "#fff",
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
  },
  resultsHeader: {
    background: NAVY,
    padding: "24px 24px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  countBox: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 8,
    padding: "12px 18px",
    textAlign: "center",
    flexShrink: 0,
  },
  groupLabel: {
    color: NAVY,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    paddingTop: 4,
  },
  resultRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 12px",
    marginBottom: 6,
    background: GREY_BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 6,
    textDecoration: "none",
    transition: "border-color 0.12s",
  },
  resultNum: {
    width: 22,
    height: 22,
    borderRadius: 4,
    background: NAVY,
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  resultName: {
    color: TEXT,
    fontSize: 13,
    fontWeight: 500,
    flex: 1,
  },
  resultLink: {
    color: NAVY,
    fontSize: 12,
    fontWeight: 700,
  },
  resultsFooter: {
    borderTop: `1px solid ${BORDER}`,
    padding: "12px 24px",
    display: "flex",
    alignItems: "center",
    fontSize: 13,
  },
};
