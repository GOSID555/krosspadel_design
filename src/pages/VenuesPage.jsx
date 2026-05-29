import { useContext } from "react";
import { VenueContext } from "../context/VenueContext";
import Footer from "../components/Footer";
export default function VenuesPage({ navigate, openBook }) {
  const { venues } = useContext(VenueContext);

  return (
    <div>
      {/* HERO SECTION */}
      <section id="hero" style={{ padding: 0 }}>
        <div className="hero-video-wrap" style={{
          background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
        }} />
        <div className="hero-content">
          <div className="hero-eyebrow">Discover Our Locations</div>
          <div className="hero-title">Our Venues</div>
          <div className="hero-sub">Premium padel courts across Bangkok</div>
        </div>
      </section>

      {/* VENUES SECTION */}
      <section style={{ padding: "100px 56px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="tag">Explore KROSS</div>
          <div className="heading" style={{ marginBottom: 64 }}>World-Class Facilities</div>
          <p className="body-txt" style={{ fontSize: "18px", marginBottom: 64, lineHeight: "1.8", opacity: 0.9 }}>
            Each KROSS venue is designed with premium padel in mind. International standard courts, professional coaching, and vibrant community spaces await you.
          </p>
          <div className="venues-grid" style={{ marginBottom: 72 }}>
            {venues.map(v => {
              const vCourtCount = v.courtsInfo ? v.courtsInfo.match(/\d+/)?.[0] : null;
              return (
                <div className="venue-card" key={v.id} onClick={() => navigate("venue-" + v.id)}>
                  <div className="venue-bg-div" style={{
                    background: v.bgImage ? `url(${v.bgImage}) center/cover no-repeat` : v.bg
                  }} />
                  <div className="venue-card-inner">
                    <div className="venue-overlay" />
                    <div className="venue-info">
                      <div style={{ fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.55, marginBottom: 10 }}>Est. 2025</div>
                      <div className="venue-name">{v.name}</div>
                      <div className="venue-loc">{v.loc}</div>
                      <div className="venue-cta">View Venue →</div>
                    </div>
                    {vCourtCount && (
                      <div style={{
                        position: "absolute", bottom: 24, right: 24,
                        fontSize: 14, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.55
                      }}>{vCourtCount} Courts</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={{ padding: "80px 0", background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}>
          {[
            { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M9 21V11h6v10"/></svg>, value: "4", label: "Clubs", sub: "and growing" },
            { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="1"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="5" x2="12" y2="19"/></svg>, value: "10+", label: "Courts", sub: "premium standard" },
            { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v6M8 6h8M10 8v8M14 8v8M6 22h12M4 22h16"/></svg>, value: "3", label: "Projects", sub: "in development" },
            { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="7" r="3"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="18" cy="7" r="2"/><path d="M21 21v-2a3 3 0 00-2-2.83"/></svg>, value: "10K+", label: "Players", sub: "and active community" },
            { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>, value: "6-00", label: "Opening Hours", sub: "daily" },
            { icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>, value: "365", label: "Days a Year", sub: "to move & connect" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "40px 24px", borderRight: i < 5 ? "1px solid rgba(255,255,255,0.1)" : "none", textAlign: "center", color: "var(--green-highlight)" }}>
              <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>{s.icon}</div>
              <div style={{ fontFamily: "'Gotham Narrow', sans-serif", fontSize: 40, fontWeight: 800, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--white)", marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 10, opacity: 0.45, letterSpacing: "1px", color: "var(--white)" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ padding: "100px 56px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div className="tag" style={{ textAlign: "center", marginBottom: 16 }}>Ready to Play?</div>
          <div className="heading" style={{ marginBottom: 32 }}>Book Your Court Today</div>
          <p className="body-txt" style={{ fontSize: "18px", marginBottom: 48, opacity: 0.9, margin: "0 auto 48px" }}>
            Choose your preferred venue and time, then start your padel journey with KROSS.
          </p>
          <button className="btn-primary" onClick={openBook}>Book A Court Now</button>
        </div>
      </section>

      <Footer navigate={navigate} />
    </div>
  );
}