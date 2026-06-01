import Footer from "../components/Footer";

const BRANDS = [
  {
    num: "01",
    name: "KROSS PARK",
    sub: "More Than A Club. It's A Community.",
    body: "Our flagship padel club concept — premium courts, rooftop bars, wellness spaces, great food and a vibrant community designed around movement and connection.",
    img: "/image/lifestyle_park.jpg",
    accent: "var(--green-highlight)",
    products: [
      { label: "Premium Courts", icon: "⬡" },
      { label: "Rooftop Bar", icon: "⬡" },
      { label: "Wellness Space", icon: "⬡" },
      { label: "Restaurant", icon: "⬡" },
      { label: "Pro Shop", icon: "⬡" },
      { label: "Event Space", icon: "⬡" },
    ],
  },
  {
    num: "02",
    name: "KROSS ACTION",
    sub: "Track. Analyze. Improve. All In One App.",
    body: "Our performance tracking web app that helps you log padel matches, workouts and daily activities. Analyze your progress and stay motivated every day.",
    img: "/image/lifestyle_action.jpg",
    accent: "#4FC3F7",
    products: [
      { label: "Match Tracking", icon: "⬡" },
      { label: "Performance Stats", icon: "⬡" },
      { label: "Workout Logger", icon: "⬡" },
      { label: "Progress Analytics", icon: "⬡" },
      { label: "Leaderboard", icon: "⬡" },
      { label: "Coach Connect", icon: "⬡" },
    ],
  },
  {
    num: "03",
    name: "KROSS ACTIVE",
    sub: "Performance Meets Style. Made To Move.",
    body: "Our performance apparel brand. Designed for movement, built for comfort and created to represent the lifestyle we live on and off the court.",
    img: "/image/lifestyle_active.jpg",
    accent: "#FFD54F",
    products: [
      { label: "Court Shirts", icon: "⬡" },
      { label: "Training Shorts", icon: "⬡" },
      { label: "Women's Collection", icon: "⬡" },
      { label: "Accessories", icon: "⬡" },
      { label: "Limited Drops", icon: "⬡" },
      { label: "Co-Lab Pieces", icon: "⬡" },
    ],
  },
];

export default function LifestylePage({ navigate }) {
  return (
    <div>
      {/* HERO */}
      <section id="hero" style={{ padding: 0 }}>
        <div className="hero-video-wrap" style={{
          background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
        }} />
        <div className="hero-content">
          <div className="hero-eyebrow">The KROSS Universe</div>
          <div className="hero-title">We Are Lifestyle</div>
          <div className="hero-sub">Sport, style and community — beyond the court</div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section style={{ padding: "100px clamp(24px, 5vw, 72px) 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 72px)" }}>
          <div className="tag">Our Brands</div>
          <div className="heading" style={{ marginBottom: 16 }}>What We Build.</div>
          <p className="body-txt" style={{ fontSize: 16, lineHeight: 1.9, maxWidth: 560, marginBottom: 80, opacity: 0.7 }}>
            At KROSS, sport goes beyond the court. We build brands and experiences that inspire people to move, connect and live better.
          </p>
        </div>

        {/* Brand rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {BRANDS.map((b, idx) => (
            <div key={b.num} style={{
              display: "grid",
              gridTemplateColumns: idx % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
              minHeight: 480,
              background: idx % 2 === 0 ? "var(--mid)" : "var(--black)",
              border: "1px solid var(--border)",
            }}>
              {/* Image side */}
              <div style={{
                order: idx % 2 === 0 ? 0 : 1,
                background: `url(${b.img}) center/cover no-repeat, linear-gradient(135deg, var(--green-dark), var(--green-mid))`,
                position: "relative",
                minHeight: 320,
              }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
                <div style={{ position: "absolute", top: 28, left: 28 }}>
                  <span style={{ fontFamily: "'Gotham Narrow', sans-serif", fontSize: 72, fontWeight: 900, color: b.accent, opacity: 0.12, lineHeight: 1 }}>{b.num}</span>
                </div>
              </div>

              {/* Content side */}
              <div style={{
                order: idx % 2 === 0 ? 1 : 0,
                padding: "56px clamp(32px, 5vw, 64px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: b.accent, marginBottom: 12 }}>
                  {b.sub}
                </div>
                <div style={{ fontFamily: "'Gotham Narrow', sans-serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, letterSpacing: "1px", textTransform: "uppercase", lineHeight: 1.0, marginBottom: 20 }}>
                  {b.name}
                </div>
                <p className="body-txt" style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.65, marginBottom: 36, maxWidth: 440 }}>
                  {b.body}
                </p>

                {/* Products grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                  {b.products.map((p, i) => (
                    <div key={i} style={{
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border)",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "var(--white)",
                      opacity: 0.75,
                      transition: "opacity .2s, border-color .2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.borderColor = b.accent; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = 0.75; e.currentTarget.style.borderColor = "var(--border)"; }}
                    >
                      {p.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS SECTION */}
      <section style={{
        padding: "100px clamp(24px, 5vw, 72px)",
        background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="tag" style={{ color: "var(--green-highlight)" }}>Our Philosophy</div>
          <div className="heading" style={{ marginBottom: 64 }}>Built On Three Pillars</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 2
          }}>
            {[
              { title: "Connection", desc: "Training, playing and engaging with the community to build lasting bonds on and off the court." },
              { title: "Growth", desc: "Building our team and players from the ground up with world-class coaching and facilities." },
              { title: "Expansion", desc: "Taking the KROSS experience beyond Bangkok — across Asia and beyond." },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "40px 36px",
                border: "1px solid rgba(45, 168, 79, 0.3)",
                background: "rgba(45, 168, 79, 0.05)",
                transition: "all 0.3s ease"
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--green-highlight)";
                  e.currentTarget.style.background = "rgba(45, 168, 79, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(45, 168, 79, 0.3)";
                  e.currentTarget.style.background = "rgba(45, 168, 79, 0.05)";
                }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>{item.title}</div>
                <p className="body-txt" style={{ margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px clamp(24px, 5vw, 72px)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div className="tag" style={{ textAlign: "center", marginBottom: 16 }}>Join The Movement</div>
          <div className="heading" style={{ marginBottom: 32 }}>Be Part Of The Lifestyle</div>
          <p className="body-txt" style={{ fontSize: "18px", marginBottom: 48, opacity: 0.9, margin: "0 auto 48px" }}>
            Discover the full KROSS universe — from padel courts to performance apparel.
          </p>
          <button className="btn-primary" onClick={() => navigate("contact")}>Get In Touch</button>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}
