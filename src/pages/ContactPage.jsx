import Footer from "../components/Footer";

export default function ContactPage({ navigate, notify }) {
  return (
    <div>
      {/* HERO SECTION */}
      <section id="hero" style={{ padding: 0 }}>
        <div className="hero-video-wrap" style={{
          background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
        }} />
        <div className="hero-content">
          <div className="hero-eyebrow">We'd Love To Hear From You</div>
          <div className="hero-title">Get In Touch</div>
          <div className="hero-sub">Reach out for court bookings, partnerships, or just to say hello</div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section style={{ padding: "100px 56px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 100, alignItems: "start" }}>
            {/* CONTACT INFO */}
            <div>
              <div className="tag">Get In Touch</div>
              <div className="heading" style={{ marginBottom: 56 }}>Contact<br />Information</div>
              {[["Email", "hello@krosspadelclub.com"], ["LINE", "@krosspadel"], ["Instagram", "@krosspadel"], ["Hours", "Daily 07:00 – 22:00"]].map(([k, v]) => (
                <div key={k} style={{ marginBottom: 40 }}>
                  <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.5, marginBottom: 8, fontWeight: 600 }}>{k}</div>
                  <div style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.9 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* CONTACT FORM */}
            <div style={{ padding: 40, border: "1px solid var(--border)", background: "var(--mid2)" }}>
              <div className="tag" style={{ marginBottom: 24 }}>Send Us A Message</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: 12, opacity: 0.5, marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>First Name</label>
                  <input type="text" placeholder="John" style={{ width: "100%", padding: "12px 16px", background: "var(--dark)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, opacity: 0.5, marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>Last Name</label>
                  <input type="text" placeholder="Doe" style={{ width: "100%", padding: "12px 16px", background: "var(--dark)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", fontSize: 14 }} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, opacity: 0.5, marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>Email</label>
                <input type="email" placeholder="you@email.com" style={{ width: "100%", padding: "12px 16px", background: "var(--dark)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", fontSize: 14 }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, opacity: 0.5, marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>Subject</label>
                <select style={{ width: "100%", padding: "12px 16px", background: "var(--dark)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", fontSize: 14 }}>
                  {["General Enquiry", "Court Booking", "Membership", "Coaching", "Events & Tournaments"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, opacity: 0.5, marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>Message</label>
                <textarea placeholder="Tell us how we can help..." rows={6} style={{ width: "100%", padding: "12px 16px", background: "var(--dark)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", fontSize: 14, resize: "vertical" }} />
              </div>
              <button className="btn-primary" onClick={() => notify("Message sent! We'll reply within 24 hours.")} style={{ width: "100%" }}>Send Message</button>
            </div>
          </div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section style={{
        padding: "100px 56px",
        background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="tag" style={{ color: "var(--green-highlight)" }}>Other Ways To Connect</div>
          <div className="heading" style={{ marginBottom: 64 }}>Find Your Channel</div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32
          }}>
            {[
              { icon: "📧", title: "Email", desc: "hello@krosspadelclub.com", sub: "For general inquiries" },
              { icon: "💬", title: "LINE Chat", desc: "@krosspadel", sub: "Fast replies during business hours" },
              { icon: "📱", title: "Instagram", desc: "@krosspadel", sub: "Updates, photos & announcements" },
              { icon: "☎️", title: "Phone", desc: "+66 (0)80-000-0000", sub: "Call us for urgent matters" }
            ].map((item, i) => (
              <div key={i} style={{
                padding: 32,
                border: "1px solid rgba(45, 168, 79, 0.3)",
                background: "rgba(45, 168, 79, 0.05)"
              }}>
                <div style={{ fontSize: "44px", marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: "15px", color: "var(--green-highlight)", fontWeight: 600, marginBottom: 8 }}>{item.desc}</div>
                <p className="body-txt" style={{ fontSize: "13px" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}