import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Footer from "../components/Footer";

export default function MembershipPage({ navigate, notify, openBook }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "plans"));
      const docs = snap.docs.map(d => ({ docId: d.id, ...d.data() }));
      if (docs.length > 0) setPlans(docs);
    };
    load();
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section id="hero" style={{ padding: 0 }}>
        <div className="hero-video-wrap" style={{
          background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
        }} />
        <div className="hero-content">
          <div className="hero-eyebrow">Unlimited Access</div>
          <div className="hero-title">Membership Plans</div>
          <div className="hero-sub">Join thousands of players — priority booking, exclusive events & more</div>
        </div>
      </section>

      {/* MEMBERSHIP SECTION */}
      <section style={{ padding: "100px 56px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="tag">Join The Club</div>
          <div className="heading" style={{ marginBottom: 64 }}>Choose Your Plan</div>
          <p className="body-txt" style={{ fontSize: "18px", marginBottom: 64, lineHeight: "1.8", opacity: 0.9 }}>
            All plans include access to all KROSS venues, priority booking, coaching discounts, and exclusive member events. Whether you're a casual player or competing regularly, we have the perfect plan for you.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 32
          }}>
            {plans.map(p => (
              <div className={`plan-card-lg${p.featured ? " featured" : ""}`} key={p.docId || p.name} style={{
                padding: 40,
                border: `1px solid var(--border)`,
                background: p.featured ? "rgba(45, 168, 79, 0.1)" : "var(--mid2)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
                borderColor: p.featured ? "var(--green-highlight)" : "var(--border)",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--green-highlight)";
                  e.currentTarget.style.background = p.featured ? "rgba(45, 168, 79, 0.15)" : "rgba(45, 168, 79, 0.05)";
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = p.featured ? "var(--green-highlight)" : "var(--border)";
                  e.currentTarget.style.background = p.featured ? "rgba(45, 168, 79, 0.1)" : "var(--mid2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                {p.featured && (
                  <div style={{
                    position: "absolute",
                    top: "-12px",
                    left: "20px",
                    background: "var(--green-highlight)",
                    color: "var(--dark)",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    POPULAR
                  </div>
                )}
                <div style={{ marginBottom: 24 }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "28px",
                    letterSpacing: "1.5px",
                    marginBottom: 12,
                    lineHeight: 1.1
                  }}>
                    {p.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <div style={{ fontSize: "32px", fontWeight: 700, color: "var(--green-highlight)" }}>
                      {p.price}
                    </div>
                    <div style={{ fontSize: "14px", opacity: 0.6 }}>/month</div>
                  </div>
                </div>
                <p className="body-txt" style={{ fontSize: "14px", marginBottom: 32, lineHeight: "1.6" }}>
                  {p.perks}
                </p>
                <button
                  className={p.featured ? "btn-primary" : "btn-ghost"}
                  onClick={() => notify(`${p.name} plan — we'll contact you shortly`)}
                  style={{ width: "100%" }}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section style={{
        padding: "100px 56px",
        background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="tag" style={{ color: "var(--green-highlight)" }}>Member Benefits</div>
          <div className="heading" style={{ marginBottom: 64 }}>Why Join KROSS</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32
          }}>
            {[
              { icon: "🎾", title: "Unlimited Court Access", desc: "Play as much as you want at any of our venues" },
              { icon: "⏰", title: "Priority Booking", desc: "Secure your preferred time slots before general members" },
              { icon: "🏆", title: "Coaching Discounts", desc: "Get 25-50% off all training sessions and clinics" },
              { icon: "👥", title: "Member Events", desc: "Exclusive tournaments and social events throughout the year" },
              { icon: "🎯", title: "Progress Tracking", desc: "Monitor your performance and skill development" },
              { icon: "💚", title: "Community", desc: "Join a thriving community of passionate padel players" }
            ].map((item, i) => (
              <div key={i} style={{
                padding: 32,
                border: `1px solid rgba(45, 168, 79, 0.3)`,
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
                <div style={{ fontSize: "44px", marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: 8 }}>{item.title}</div>
                <p className="body-txt">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: "100px 56px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div className="tag" style={{ textAlign: "center", marginBottom: 16 }}>Ready To Join?</div>
          <div className="heading" style={{ marginBottom: 32 }}>Become A Member Today</div>
          <p className="body-txt" style={{ fontSize: "18px", marginBottom: 48, opacity: 0.9 }}>
            Choose your plan above and start enjoying unlimited access to KROSS venues, priority booking, and exclusive member benefits.
          </p>
          <button className="btn-primary" onClick={openBook}>Book First Court</button>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}