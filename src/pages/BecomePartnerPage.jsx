import Footer from "../components/Footer";

const BRAND_PARTNERS = [
  { name: "Corona", category: "Beverage" },
  { name: "airasia", category: "Aviation" },
  { name: "alo", category: "Apparel" },
  { name: "Wilson", category: "Equipment" },
  { name: "Electrolit", category: "Hydration" },
  { name: "Red Bull", category: "Energy" },
  { name: "HYPERICE", category: "Recovery" },
];

const CARDS = [
  {
    id: "partner-brands",
    label: "Brands Collabs",
  },
  {
    id: "partner-be-part",
    label: "Be Part Of Kross",
  },
  {
    id: "partner-franchisees",
    label: "Kross Franchisees",
  },
];

export default function BecomePartnerPage({ navigate }) {
  return (
    <div>
      {/* HERO */}
      <section id="hero" style={{ padding: 0 }}>
        <div className="hero-video-wrap" style={{
          background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
        }} />
        <div className="hero-content">
          <div className="hero-eyebrow">Business Opportunity</div>
          <div className="hero-title">Become A Partner</div>
          <div className="hero-sub">Join Asia's Growing Padel Revolution</div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("partner-franchisees")}>Partner With Us</button>
            <button className="btn-ghost" onClick={() => navigate("about")}>Learn More</button>
          </div>
        </div>
      </section>

      {/* STRONG PARTNERS SECTION */}
      <section style={{ background: "var(--black)", padding: "80px clamp(24px, 5vw, 72px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="tag" style={{ marginBottom: 24 }}>Brands Collaboration</div>
          <div style={{ fontFamily: "'Gotham Narrow', sans-serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, textTransform: "uppercase", lineHeight: 1.05, marginBottom: 24 }}>
            Strong Partners.<br />Better Together.
          </div>
          <p className="body-txt" style={{ fontSize: 15, lineHeight: 1.8, maxWidth: 480, marginBottom: 56, opacity: 0.7 }}>
            We team up with global brands that share our passion for sport, lifestyle and community. Together, we create unique experiences on and off the court.
          </p>

          {/* Partner logos row */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0, borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}>
            {BRAND_PARTNERS.map((b, i) => (
              <div key={i} style={{
                flex: "1 1 120px",
                minWidth: 120,
                padding: "36px 28px",
                borderRight: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background .25s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--mid)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span style={{ fontFamily: "'Gotham Narrow', sans-serif", fontSize: "clamp(14px, 2vw, 20px)", fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{b.name}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("partner-brands")}
            style={{ marginTop: 32, background: "none", border: "none", color: "var(--green-highlight)", fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 700, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 8 }}
          >
            AND MORE →
          </button>
        </div>
      </section>

      {/* 3 CARDS */}
      <section style={{ padding: "100px clamp(24px, 5vw, 72px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 6 }}>
            {CARDS.map((card) => (
              <div
                key={card.id}
                onClick={() => navigate(card.id)}
                style={{
                  position: "relative",
                  height: 260,
                  background: "var(--green-dark)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "background .3s, border-color .3s",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--green-mid)";
                  e.currentTarget.style.borderColor = "var(--green-highlight)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "var(--green-dark)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div style={{
                  fontFamily: "'Gotham Narrow', sans-serif",
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  textAlign: "center",
                  lineHeight: 1.2,
                  padding: "0 24px",
                  color: "var(--white)",
                }}>
                  {card.label}
                </div>
                <div style={{
                  position: "absolute",
                  bottom: 20, right: 20,
                  fontSize: 20,
                  opacity: 0.3,
                }}>→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}
