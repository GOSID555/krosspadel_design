import Footer from "../components/Footer";

export default function BrandsCollabsPage({ navigate }) {
  return (
    <div>
      <section id="hero" style={{ padding: 0 }}>
        <div className="hero-video-wrap" style={{
          background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
        }} />
        <div className="hero-content">
          <div className="hero-eyebrow">Partnerships</div>
          <div className="hero-title">Brands Collabs</div>
          <div className="hero-sub">Partner with Thailand's fastest growing padel brand</div>
        </div>
      </section>

      <section style={{ padding: "100px clamp(24px, 5vw, 72px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="tag">Collab With KROSS</div>
          <div className="heading" style={{ marginBottom: 32 }}>Reach An Active,<br />Engaged Community.</div>
          <p className="body-txt" style={{ fontSize: 18, lineHeight: 1.8, maxWidth: 620, marginBottom: 64, opacity: 0.85 }}>
            KROSS connects brands with a premium audience across 4 Bangkok venues, our digital platforms and an active community of 10,000+ players and lifestyle enthusiasts.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2, marginBottom: 80 }}>
            {[
              { title: "Venue Sponsorship", desc: "Branded court panels, signage and on-site activations across our Bangkok locations — put your brand in front of thousands of players every week." },
              { title: "Event & Tournament Title", desc: "Become the title sponsor of our signature tournaments and community events. Full branding rights, hospitality access and social amplification." },
              { title: "Apparel & Equipment", desc: "Co-branded gear partnerships for our coaching programs, tournaments and retail offerings. Be seen on every court at every KROSS venue." },
              { title: "Digital & Content", desc: "Native content, influencer campaigns and social media takeovers reaching our growing community across Instagram, LINE and the KROSS app." },
              { title: "F&B Partnerships", desc: "Exclusive pouring rights, co-branded menu items and bar activations — from post-match drinks to tournament hospitality." },
              { title: "Community Activations", desc: "Pop-ups, workshops and experiential campaigns integrated into our events calendar. Engage the KROSS community in a meaningful way." },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "36px 32px",
                border: "1px solid var(--border)",
                background: "var(--mid)",
                transition: "border-color .3s"
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--green-highlight)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--green-highlight)", marginBottom: 12 }}>{item.title}</div>
                <p className="body-txt" style={{ fontSize: 14, margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ padding: "60px 48px", background: "var(--mid)", borderTop: "2px solid var(--green-highlight)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
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
