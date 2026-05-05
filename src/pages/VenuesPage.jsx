

import { useContext } from "react";
import { VenueContext } from "../context/VenueContext";

export default function VenuesPage({ navigate, openBook }) {
  const { venues } = useContext(VenueContext); // ✅ เปลี่ยนจาก import data

  // ... ที่เหลือเหมือนเดิมทุกอย่าง
  return (
    <div>
      <div className="inner-hero">
        <div className="inner-hero-bg" />
        <div>
          <button className="back-btn" onClick={() => navigate("home")}>← Back</button>
          <div className="inner-hero-title">Our Venues</div>
        </div>
      </div>
      <div className="inner-section">
        <div className="venues-grid" style={{ marginBottom: 72 }}>
          {venues.map(v => (
            <div className="venue-card" key={v.id} onClick={() => navigate("venue-" + v.id)}>
              <div className="venue-bg-div" style={{ background: v.bg }} />
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
        <div className="courts-info">
          <div className="court-stat"><div className="court-stat-num">19+</div><div className="court-stat-label">Total Courts</div></div>
          <div className="court-stat"><div className="court-stat-num">4</div><div className="court-stat-label">Locations</div></div>
          <div className="court-stat"><div className="court-stat-num">07–22</div><div className="court-stat-label">Daily Hours</div></div>
        </div>
        <div style={{ marginTop: 64, textAlign: "center" }}>
          <button className="btn-primary" onClick={openBook}>Book A Court Now</button>
        </div>
      </div>
    </div>
  );
}