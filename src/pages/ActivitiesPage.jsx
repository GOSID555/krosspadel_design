import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Footer from "../components/Footer";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function ActivitiesPage({ navigate, openBook }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "activities"));
      const docs = snap.docs.map(d => ({ docId: d.id, ...d.data() }));
      if (docs.length > 0) setActivities(docs);
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
          <div className="hero-eyebrow">What We Offer</div>
          <div className="hero-title">Our Activities</div>
          <div className="hero-sub">From casual play to elite competitions</div>
        </div>
      </section>

      {/* ACTIVITIES SECTION */}
      <section style={{ padding: "100px 56px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="tag">Our Programs</div>
          <div className="heading" style={{ marginBottom: 64 }}>Activities & Programs</div>
          <p className="body-txt" style={{ fontSize: "18px", marginBottom: 64, lineHeight: "1.8", opacity: 0.9 }}>
            From elite competition to casual weekend rallies — something for every player. Whether you're a beginner looking to learn or an advanced player seeking competitive challenges, KROSS has the perfect program for you.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 40
          }}>
            {activities.map((a) => (
              <div key={a.docId || a.name} style={{
                position: "relative", height: 320, overflow: "hidden",
                cursor: "pointer", border: "1px solid var(--border)", borderRadius: 4,
                background: a.imageUrl
                  ? `url(${a.imageUrl}) center/cover no-repeat`
                  : "linear-gradient(135deg, var(--green-dark), var(--green-mid))",
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
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.3) 55%, transparent 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px" }}>
                  {a.date && (
                    <div style={{ fontSize: 11, opacity: 0.55, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>
                      {formatDate(a.date)}
                    </div>
                  )}
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: "1.5px", lineHeight: 1.1, marginBottom: 10 }}>
                    {a.name}
                  </div>
                  <p className="body-txt" style={{ fontSize: 13, opacity: 0.75, margin: 0 }}>{a.text}</p>
                </div>
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
          <div className="tag" style={{ color: "var(--green-highlight)" }}>Why Join</div>
          <div className="heading" style={{ marginBottom: 64 }}>What You'll Gain</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 40
          }}>
            {[
              { title: "Community", desc: "Connect with fellow padel enthusiasts and build lasting friendships" },
              { title: "Skill Development", desc: "Improve your technique under professional coaching guidance" },
              { title: "Competitions", desc: "Participate in tournaments and test your skills against others" },
              { title: "Flexible Scheduling", desc: "Play at your convenience with 24/7 court availability" },
              { title: "Fitness", desc: "Get a full-body workout while having fun on the court" },
              { title: "Social Events", desc: "Join exclusive member events and networking opportunities" }
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
      <section style={{ padding: "100px 56px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div className="tag" style={{ textAlign: "center", marginBottom: 16 }}>Start Your Journey</div>
          <div className="heading" style={{ marginBottom: 32 }}>Find Your Perfect Activity</div>
          <p className="body-txt" style={{ fontSize: "18px", marginBottom: 48, opacity: 0.9, margin: "0 auto 48px" }}>
            Discover which activity suits your style and level, then book your first session today.
          </p>
          <button className="btn-primary" onClick={openBook}>Book Now</button>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}