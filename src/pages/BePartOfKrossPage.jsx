import { useState } from "react";
import Footer from "../components/Footer";

const EMPTY = { name: "", company: "", email: "", phone: "", interest: "", message: "" };

export default function BePartOfKrossPage({ navigate }) {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 900));
    setSending(false);
    setForm(EMPTY);
    alert("Message sent! Hugo will be in touch shortly.");
  };

  const stats = [
    { value: "10+", label: "Premium Clubs", sub: "and Growing" },
    { value: "10+", label: "High-Standard", sub: "Courts" },
    { value: "5K+", label: "Active Players", sub: "and Community" },
    { value: "100+", label: "Events", sub: "Per Year" },
    { value: "4", label: "Prime Locations", sub: "in Bangkok" },
  ];

  const reasons = [
    { title: "Strong & Fast-Growing Brand", desc: "KROSS has become the go-to destination for sport, lifestyle and community in Thailand." },
    { title: "Proven Model", desc: "A tested business model with premium facilities, operational excellence and strong unit economics." },
    { title: "Engaged Community", desc: "Access to a highly active and loyal community of players, members and fans." },
    { title: "Multiple Revenue Streams", desc: "From memberships and court bookings to F&B, events, retail and partnerships." },
    { title: "Full Support System", desc: "From site selection to staff training and marketing — we're with you every step of the way." },
  ];

  return (
    <div>
      {/* HERO — two column */}
      <section style={{ padding: "100px clamp(24px, 5vw, 72px) 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* Left */}
          <div>
            <div className="tag" style={{ color: "var(--green-highlight)", marginBottom: 20 }}>Partnerships</div>
            <div style={{
              fontFamily: "'Gotham Narrow', sans-serif",
              fontSize: "clamp(48px, 7vw, 88px)",
              lineHeight: 0.92,
              textTransform: "uppercase",
              marginBottom: 32,
            }}>
              Be Part<br />Of <span style={{ color: "var(--green-highlight)" }}>Kross.</span>
            </div>
            <p className="body-txt" style={{ fontSize: 15, lineHeight: 1.85, opacity: 0.8, maxWidth: 480 }}>
              KROSS is Thailand's leading premium sports club brand, built around world-class facilities,
              a vibrant community and exceptional experiences on and off the court.
              <br /><br />
              We're growing fast — and inviting the right partners to grow with us.
            </p>
          </div>
          {/* Right — image */}
          <div style={{ height: 480, overflow: "hidden" }}>
            <img
              src="/image/night_court.png"
              alt="KROSS venue"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              onError={e => { e.currentTarget.style.background = "var(--green-dark)"; e.currentTarget.style.display = "none"; }}
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "72px clamp(24px, 5vw, 72px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 2 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: "36px 24px",
              background: "var(--mid)",
              borderTop: "2px solid var(--green-highlight)",
              textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Gotham Narrow', sans-serif", fontSize: 40, fontWeight: 800, color: "var(--green-highlight)", lineHeight: 1, marginBottom: 10 }}>{s.value}</div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.9, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 10, opacity: 0.4, letterSpacing: "1px", textTransform: "uppercase" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY PARTNER */}
      <section style={{ padding: "0 clamp(24px, 5vw, 72px) 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="tag" style={{ marginBottom: 20 }}>Why Partner With KROSS?</div>
          <div style={{
            fontFamily: "'Gotham Narrow', sans-serif",
            fontSize: "clamp(32px, 5vw, 60px)",
            lineHeight: 1,
            textTransform: "uppercase",
            marginBottom: 52,
          }}>More Than A Sports Club.<br />A Movement.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2 }}>
            {reasons.map((r, i) => (
              <div key={i} style={{ padding: "32px 24px", border: "1px solid var(--border)", background: "var(--mid)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>{r.title}</div>
                <p className="body-txt" style={{ fontSize: 13, margin: 0, lineHeight: 1.7, opacity: 0.7 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GRID */}
      <section style={{ padding: "0 clamp(24px, 5vw, 72px) 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6, height: 260 }}>
          {["/image/night_court.png", "/image/night_court.png", "/image/night_court.png"].map((src, i) => (
            <div key={i} style={{ overflow: "hidden", background: "var(--green-dark)" }}>
              <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.85 }} />
            </div>
          ))}
        </div>
      </section>

      {/* CEO CONTACT */}
      <section style={{ padding: "80px clamp(24px, 5vw, 72px) 100px", background: "var(--mid)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
          {/* Left — CEO */}
          <div>
            <div className="tag" style={{ marginBottom: 20 }}>Let's Build The Next KROSS Together</div>
            <div style={{
              fontFamily: "'Gotham Narrow', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.05,
              textTransform: "uppercase",
              marginBottom: 24,
            }}>Directly Connect<br />With Our CEO</div>
            <p className="body-txt" style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.75, marginBottom: 40 }}>
              Have a vision? A location? Or simply want to explore how we can work together?<br /><br />
              Reach out directly to our CEO.
            </p>
            {/* CEO card */}
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--green-dark), var(--green-mid))",
                border: "2px solid var(--green-highlight)",
                flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28
              }}>👤</div>
              <div>
                <div style={{ fontFamily: "'Gotham Narrow', sans-serif", fontSize: 20, letterSpacing: "1px", marginBottom: 4 }}>Hugo Cattaneo</div>
                <div style={{ fontSize: 12, color: "var(--green-highlight)", letterSpacing: "1px", marginBottom: 12 }}>CEO & Co-Founder, KROSS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { icon: "✉", val: "hugo@krosspadel.com", href: "mailto:hugo@krosspadel.com" },
                    { icon: "📞", val: "+66 80 590 0010", href: "tel:+66805900010" },
                    { icon: "💬", val: "LINE ID: hugocattaneo", href: "https://line.me/ti/p/~hugocattaneo" },
                  ].map((c, i) => (
                    <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                      style={{ fontSize: 13, color: "var(--white)", textDecoration: "none", opacity: 0.75, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14 }}>{c.icon}</span>{c.val}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="partner-form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label>Company / Organization *</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Company name" required />
              </div>
            </div>
            <div className="partner-form-row">
              <div className="form-group">
                <label>Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label>Phone / LINE *</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+66 or LINE ID" required />
              </div>
            </div>
            <div className="form-group">
              <label>Partnership Interest *</label>
              <select name="interest" value={form.interest} onChange={handleChange} required>
                <option value="">Select partnership type...</option>
                {["Franchise / New Club", "Brand Collaboration", "Sponsorship", "Venue Partnership", "Supplier / Equipment", "Other"].map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Tell us about your vision, location, or any questions you have..."
                style={{ height: 120 }} />
            </div>
            <button type="submit" className="btn-primary" disabled={sending} style={{ opacity: sending ? 0.6 : 1 }}>
              {sending ? "Sending..." : "Connect With Our CEO"}
            </button>
          </form>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}
