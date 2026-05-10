import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Footer from "../components/Footer";

export default function StoriesPage({ navigate }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "stories"));
      setStories(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
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
          <div className="hero-eyebrow">Member Stories</div>
          <div className="hero-title">Our Stories</div>
          <div className="hero-sub">Real experiences from our KROSS community</div>
        </div>
      </section>

      {/* STORIES SECTION */}
      <section style={{ padding: "100px 56px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="tag">Community Highlights</div>
          <div className="heading" style={{ marginBottom: 64 }}>Member Stories & Experiences</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 40
          }}>
            {stories.map(s => (
              <div key={s.docId} style={{
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
                onClick={() => navigate("story-" + s.docId)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div style={{
                  aspectRatio: "4/3",
                  background: "var(--mid2)",
                  marginBottom: 24,
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "4px",
                  border: "1px solid var(--border)"
                }}>
                  {s.imageUrl ? (
                    <img src={s.imageUrl} alt={s.title} style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(.25, .46, .45, .94)"
                    }}
                      onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    />
                  ) : (
                    <div style={{
                      width: "100%",
                      height: "100%",
                      background: s.bg,
                      transition: "transform 0.6s cubic-bezier(.25, .46, .45, .94)"
                    }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />
                  )}
                </div>
                <div style={{ fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase", opacity: 0.5, marginBottom: 12 }}>
                  {s.cat}
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", letterSpacing: "1.5px", lineHeight: 1.1, marginBottom: 12 }}>
                  {s.title}
                </div>
                <p className="body-txt" style={{ fontSize: "14px" }}>{s.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        padding: "100px 56px",
        background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div className="tag" style={{ color: "var(--green-highlight)" }}>Join the Community</div>
          <div className="heading" style={{ marginBottom: 32 }}>Share Your Story With Us</div>
          <p className="body-txt" style={{ fontSize: "18px", marginBottom: 48, opacity: 0.95 }}>
            Have an amazing experience at KROSS? We'd love to hear your story and feature it on our platform.
          </p>
          <button className="btn-primary" onClick={() => navigate("contact")}>Get In Touch</button>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}