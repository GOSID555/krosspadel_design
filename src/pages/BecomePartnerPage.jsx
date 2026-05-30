import Footer from "../components/Footer";

const CARDS = [
  {
    id: "partner-be-part",
    label: "Be Part Of Kross",
  },
  {
    id: "partner-franchisees",
    label: "Kross Franchisees",
  },
  {
    id: "partner-brands",
    label: "Brands Collabs",
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
