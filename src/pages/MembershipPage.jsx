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
          <div className="hero-title">Book & Pricing</div>
          <div className="hero-sub">Join thousands of players — priority booking, exclusive events & more</div>
        </div>
      </section>

      {/* MEMBERSHIP SECTION */}
      <section style={{ padding: "100px clamp(24px, 5vw, 72px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="tag">Join The Club</div>
          <div className="heading" style={{ marginBottom: 64 }}>Choose Your Plan</div>
          <p className="body-txt" style={{ fontSize: "clamp(14px, 2vw, 18px)", marginBottom: 64, lineHeight: "1.8", opacity: 0.9 }}>
            All plans include access to all KROSS venues, priority booking, coaching discounts, and exclusive member events. Whether you're a casual player or competing regularly, we have the perfect plan for you.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: 24,
            alignItems: "stretch"
          }}>
            {plans.map(p => (
              <div
                key={p.docId || p.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "40px 36px",
                  border: `1px solid ${p.featured ? "var(--green-highlight)" : "var(--border)"}`,
                  background: p.featured ? "rgba(45,168,79,0.08)" : "var(--mid2)",
                  position: "relative",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {p.featured && (
                  <div style={{
                    position: "absolute", top: -1, left: 0, right: 0,
                    height: 3, background: "var(--green-highlight)"
                  }} />
                )}
                {p.featured && (
                  <div style={{
                    display: "inline-flex", alignSelf: "flex-start",
                    background: "var(--green-highlight)", color: "var(--dark)",
                    fontSize: 9, fontWeight: 700, letterSpacing: "2px",
                    textTransform: "uppercase", padding: "4px 10px",
                    marginBottom: 20
                  }}>
                    MOST POPULAR
                  </div>
                )}

                {/* Plan name */}
                <div style={{
                  fontFamily: "'Gotham Narrow', sans-serif",
                  fontSize: "clamp(20px, 2.5vw, 26px)",
                  letterSpacing: "1.5px",
                  lineHeight: 1.1,
                  marginBottom: 4,
                  marginTop: p.featured ? 0 : 28
                }}>
                  {p.name}
                </div>
                {p.priceLabel && (
                  <div style={{ fontSize: 11, opacity: 0.45, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 24 }}>
                    {p.priceLabel}
                  </div>
                )}

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(255,255,255,0.07)", marginBottom: 24 }} />

                {/* Price */}
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Gotham Narrow', sans-serif", fontSize: 13, opacity: 0.5, verticalAlign: "super" }}>฿</span>
                  <span style={{ fontSize: "clamp(40px, 6vw, 56px)", fontWeight: 700, color: "var(--green-highlight)", letterSpacing: "-1px" }}>
                    {p.price}
                  </span>
                </div>
                {p.validity && (
                  <div style={{ fontSize: 11, opacity: 0.38, lineHeight: 1.6, marginBottom: 28 }}>{p.validity}</div>
                )}

                {/* Perks */}
                {p.perks && (
                  <div style={{ flex: 1, marginBottom: 36 }}>
                    {p.perks.split("\n").filter(l => l.trim()).map((line, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                          background: "rgba(45,168,79,0.15)",
                          border: "1px solid rgba(45,168,79,0.4)",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          <span style={{ color: "var(--green-highlight)", fontSize: 10, lineHeight: 1 }}>✓</span>
                        </div>
                        <span style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.75 }}>
                          {line.replace(/^[-•·]\s*/, "")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <button
                  className={p.featured ? "btn-primary" : "btn-ghost"}
                  onClick={() => notify(`${p.name} — we'll contact you shortly`)}
                  style={{ width: "100%", marginTop: "auto" }}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section style={{
        padding: "100px clamp(24px, 5vw, 72px)",
        background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="tag" style={{ color: "var(--green-highlight)" }}>Member Benefits</div>
          <div className="heading" style={{ marginBottom: 64 }}>Why Join KROSS</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: 32
          }}>
            {[
              { title: "Unlimited Court Access", desc: "Play as much as you want at any of our venues" },
              { title: "Priority Booking", desc: "Secure your preferred time slots before general members" },
              { title: "Coaching Discounts", desc: "Get 25-50% off all training sessions and clinics" },
              { title: "Member Events", desc: "Exclusive tournaments and social events throughout the year" },
              { title: "Progress Tracking", desc: "Monitor your performance and skill development" },
              { title: "Community", desc: "Join a thriving community of passionate padel players" }
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
                <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: 8 }}>{item.title}</div>
                <p className="body-txt">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: "100px clamp(24px, 5vw, 72px)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div className="tag" style={{ textAlign: "center", marginBottom: 16 }}>Ready To Join?</div>
          <div className="heading" style={{ marginBottom: 32 }}>Become A Member Today</div>
          <p className="body-txt" style={{ fontSize: "clamp(14px, 2vw, 18px)", marginBottom: 48, opacity: 0.9 }}>
            Choose your plan above and start enjoying unlimited access to KROSS venues, priority booking, and exclusive member benefits.
          </p>
          <button className="btn-primary" onClick={openBook}>Book First Court</button>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}