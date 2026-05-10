import { useContext } from "react";
import { VenueContext } from "../context/VenueContext";
import Footer from "../components/Footer";
import { totalCourts } from "../utils/venueUtils";

export default function VenuesPage({ navigate, openBook }) {
  const { venues } = useContext(VenueContext);

  const courtCount = totalCourts(venues);

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
            {venues.map(v => (
              <div className="venue-card" key={v.id} onClick={() => navigate("venue-" + v.id)}>
                <div className="venue-bg-div" style={{
                  background: v.bgImage ? `url(${v.bgImage}) center/cover no-repeat` : v.bg
                }} />
                <div className="venue-card-inner">
                  <div className="venue-overlay" />
                  <div className="venue-info">
                    <div className="venue-number">{v.num} / {v.region}</div>
                    <div className="venue-name">{v.name}</div>
                    <div className="venue-loc">{v.loc}</div>
                    <div className="venue-cta">View Venue →</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={{
        padding: "100px 56px",
        background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="courts-info" style={{ marginBottom: 0 }}>
            <div className="court-stat">
              <div className="court-stat-num">{courtCount}+</div>
              <div className="court-stat-label">Total Courts</div>
            </div>
            <div className="court-stat">
              <div className="court-stat-num">{venues.length}</div>
              <div className="court-stat-label">Prime Locations</div>
            </div>
            <div className="court-stat">
              <div className="court-stat-num">07–22</div>
              <div className="court-stat-label">Daily Hours</div>
            </div>
          </div>
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