import Footer from "../components/Footer";

const BRANDS = [
  {
    num: "01",
    name: "KROSS PARK",
    sub: "More Than A Club. It's A Community.",
    body: "Our flagship padel club concept — premium courts, rooftop bars, wellness spaces, great food and a vibrant community designed around movement and connection.",
    img: "/image/lifestyle_park.jpg",
  },
  {
    num: "02",
    name: "KROSS ACTION",
    sub: "Track. Analyze. Improve. All In One App.",
    body: "Our performance tracking web app that helps you log padel matches, workouts and daily activities. Analyze your progress and stay motivated every day.",
    img: "/image/lifestyle_action.jpg",
  },
  {
    num: "03",
    name: "KROSS ACTIVE",
    sub: "Performance Meets Style. Made To Move.",
    body: "Our performance apparel brand. Designed for movement, built for comfort and created to represent the lifestyle we live on and off the court.",
    img: "/image/lifestyle_active.jpg",
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
          <div className="hero-eyebrow">We Are Lifestyle</div>
          <div className="hero-title">Our Brands</div>
          <div className="hero-sub">Sport, style and community — beyond the court</div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section style={{ padding: "100px clamp(24px, 5vw, 72px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="tag">The KROSS Universe</div>
          <div className="heading" style={{ marginBottom: 64 }}>Brands & Experiences</div>
          <p className="body-txt" style={{ fontSize: "18px", marginBottom: 64, lineHeight: "1.8", opacity: 0.9 }}>
            At KROSS, sport goes beyond the court. We build brands and experiences that inspire people to move, connect and live better every day.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 2
          }}>
            {BRANDS.map((b) => (
              <div key={b.num} style={{
                position: "relative", height: 420, overflow: "hidden",
                cursor: "pointer", border: "1px solid var(--border)",
                background: `url(${b.img}) center/cover no-repeat, linear-gradient(135deg, var(--green-dark), var(--green-mid))`,
                transition: "transform .4s ease, border-color .3s ease"
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "var(--green-highlight)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.3) 55%, transparent 100%)" }} />
                <div style={{ position: "absolute", top: 28, left: 28 }}>
                  <div style={{ fontSize: 11, letterSpacing: "3px", opacity: 0.4 }}>{b.num}</div>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--green-highlight)", marginBottom: 10 }}>
                    {b.sub}
                  </div>
                  <div style={{ fontFamily: "'Gotham Narrow', sans-serif", fontSize: 28, letterSpacing: "1.5px", lineHeight: 1.1, marginBottom: 12 }}>
                    {b.name}
                  </div>
                  <p className="body-txt" style={{ fontSize: 13, opacity: 0.7, margin: 0, lineHeight: 1.6 }}>{b.body}</p>
                </div>
              </div>
            ))}
          </div>
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
