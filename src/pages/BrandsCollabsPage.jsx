import Footer from "../components/Footer";

const WHY_ITEMS = [
  { num: "01", title: "Premium Audience", desc: "Reach an active, affluent community of 10,000+ players and lifestyle enthusiasts across Bangkok's most sought-after neighbourhoods." },
  { num: "02", title: "High Engagement", desc: "Our members are loyal, passionate and spend time at our venues regularly — giving your brand consistent, meaningful exposure." },
  { num: "03", title: "Lifestyle Alignment", desc: "KROSS sits at the intersection of sport, wellness and social life — the perfect platform for brands that value health and community." },
  { num: "04", title: "Multi-Channel Reach", desc: "From in-venue branding and events to digital content, app integrations and social media — we amplify your brand across every touchpoint." },
];

const ACTIVATION_TYPES = [
  { title: "Tournament Title Sponsorship", desc: "Full naming rights, branding across courts, digital and social amplification for our signature KROSS tournaments." },
  { title: "Court Branding", desc: "Branded court panels, net posts and facility signage across all 4 Bangkok venues." },
  { title: "Pop-Up & Experiential", desc: "Exclusive pop-up activations, product launches and experiential campaigns integrated into our events calendar." },
  { title: "Content & Social", desc: "Native content creation, influencer partnerships and social takeovers reaching our engaged community." },
  { title: "F&B Partnership", desc: "Exclusive pouring rights, co-branded menus and bar activations for tournaments and community events." },
  { title: "Apparel Collaboration", desc: "Co-branded gear, limited-edition collections and kit partnerships worn on every court at every KROSS venue." },
];

const BRAND_PARTNERS = [
  { name: "Corona", category: "Beverage" },
  { name: "PEACHES Active", category: "Apparel" },
];

export default function BrandsCollabsPage({ navigate }) {
  return (
    <div>
      {/* HERO */}
      <section id="hero" style={{ padding: 0 }}>
        <div className="hero-video-wrap" style={{
          background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
        }} />
        <div className="hero-content">
          <div className="hero-eyebrow">Partnerships</div>
          <div className="hero-title">Brands Collabs</div>
          <div className="hero-sub">Partner with Thailand's fastest growing padel brand</div>
          <div className="hero-actions">
            <a href="mailto:info@krosspadel.com" className="btn-primary" style={{ textDecoration: "none" }}>Get In Touch</a>
          </div>
        </div>
      </section>

      {/* WHY COLLAB WITH KROSS */}
      <section className="partner-section">
        <div className="partner-section-inner">
          <div className="tag">Why Partner With Us</div>
          <div className="heading" style={{ marginBottom: 20 }}>Why Collab<br />With Kross.</div>
          <p className="body-txt" style={{ fontSize: 16, lineHeight: 1.9, maxWidth: 560, marginBottom: 64 }}>
            KROSS connects brands with a premium audience across 4 Bangkok venues, our digital platforms and an active community of 10,000+ players and lifestyle enthusiasts.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
            {WHY_ITEMS.map((item, i) => (
              <div key={i} style={{
                padding: "40px 32px",
                background: "var(--mid)",
                border: "1px solid var(--border)",
                transition: "border-color .3s"
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--green-highlight)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <div style={{ fontFamily: "'Gotham Narrow', sans-serif", fontSize: 36, color: "rgba(45,168,79,0.15)", lineHeight: 1, marginBottom: 16 }}>{item.num}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>{item.title}</div>
                <p className="body-txt" style={{ fontSize: 13, margin: 0, lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND EVENT & ACTIVATION */}
      <section className="partner-section" style={{ background: "var(--mid)" }}>
        <div className="partner-section-inner">
          <div className="tag">Activations</div>
          <div className="heading" style={{ marginBottom: 20 }}>Brand Event<br />&amp; Activation.</div>
          <p className="body-txt" style={{ fontSize: 16, lineHeight: 1.9, maxWidth: 560, marginBottom: 64 }}>
            From court-side branding to full experiential campaigns — we design activations that put your brand at the heart of the KROSS community.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
            {ACTIVATION_TYPES.map((item, i) => (
              <div key={i} style={{
                padding: "36px 32px",
                border: "1px solid var(--border)",
                background: "var(--mid2)",
                transition: "border-color .3s"
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--green-highlight)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--green-highlight)", marginBottom: 12 }}>{item.title}</div>
                <p className="body-txt" style={{ fontSize: 13, margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR BRAND PARTNERS */}
      <section className="partner-section">
        <div className="partner-section-inner">
          <div className="tag">Brand Partners</div>
          <div className="heading" style={{ marginBottom: 20 }}>Our Brand<br />Partners.</div>
          <p className="body-txt" style={{ fontSize: 16, lineHeight: 1.9, maxWidth: 560, marginBottom: 64 }}>
            We work with brands that share our values — premium quality, active lifestyle and community connection.
          </p>
          <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {BRAND_PARTNERS.map((b, i) => (
              <div key={i} style={{
                padding: "48px 56px",
                background: "var(--mid)",
                border: "1px solid var(--border)",
                minWidth: 220,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}>
                <div style={{ fontFamily: "'Gotham Narrow', sans-serif", fontSize: 28, letterSpacing: "3px", textTransform: "uppercase" }}>{b.name}</div>
                <div style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.35 }}>{b.category}</div>
              </div>
            ))}
            {/* Become a partner CTA card */}
            <div style={{
              padding: "48px 56px",
              border: "1px dashed rgba(255,255,255,0.15)",
              minWidth: 220,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              cursor: "pointer",
              transition: "border-color .3s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--green-highlight)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
              onClick={() => window.location.href = "mailto:info@krosspadel.com"}
            >
              <div style={{ fontSize: 28, opacity: 0.2 }}>+</div>
              <div style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.4 }}>Your Brand Here</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="partner-section" style={{ background: "var(--mid)" }}>
        <div className="partner-section-inner">
          <div style={{ padding: "60px 48px", background: "var(--mid2)", borderTop: "2px solid var(--green-highlight)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
            <div>
              <div className="heading" style={{ marginBottom: 8, fontSize: "clamp(24px, 4vw, 40px)" }}>Let's Create Something Together</div>
              <p className="body-txt" style={{ margin: 0, opacity: 0.7 }}>Reach out to explore partnership opportunities.</p>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="mailto:info@krosspadel.com" className="btn-primary" style={{ textDecoration: "none" }}>Email Us</a>
              <a href="https://line.me/ti/p/~@krosspadel" target="_blank" rel="noreferrer" className="btn-ghost" style={{ textDecoration: "none" }}>LINE</a>
            </div>
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}
