export default function ContactPage({ navigate, notify }) {
  return (
    <div>
      <div className="inner-hero">
        <div className="inner-hero-bg" />
        <div>
          <button className="back-btn" onClick={() => navigate("home")}>← Back</button>
          <div className="inner-hero-title">Contact</div>
        </div>
      </div>
      <div className="inner-section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 100, alignItems: "start" }}>
          <div>
            <div className="tag">Get In Touch</div>
            <div className="heading">Let's<br />Talk.</div>
            {[["Email", "hello@krosspadelclub.com"], ["LINE", "@krosspadel"], ["Instagram", "@krosspadel"], ["Hours", "Daily 07:00 – 22:00"]].map(([k, v]) => (
              <div key={k} style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", opacity: .35, marginBottom: 7 }}>{k}</div>
                <div style={{ fontSize: 15, opacity: .75 }}>{v}</div>
              </div>
            ))}
          </div>
          <div className="contact-form">
            <div className="form-row">
              <div className="form-group"><label>First Name</label><input type="text" placeholder="John" /></div>
              <div className="form-group"><label>Last Name</label><input type="text" placeholder="Doe" /></div>
            </div>
            <div className="form-group"><label>Email</label><input type="email" placeholder="you@email.com" /></div>
            <div className="form-group">
              <label>Subject</label>
              <select>{["General Enquiry", "Court Booking", "Membership", "Coaching", "Events & Tournaments"].map(o => <option key={o}>{o}</option>)}</select>
            </div>
            <div className="form-group"><label>Message</label><textarea placeholder="Tell us how we can help..." /></div>
            <button className="btn-primary" onClick={() => notify("Message sent! We'll reply within 24 hours.")}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}