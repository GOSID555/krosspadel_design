import Footer from "../components/Footer";

export default function VenueDetailPage({ venue, navigate, openBook }) {
  const courtText = venue.courtText || `Every court at KROSS ${venue.name} is built to World Padel Tour specifications — premium glass walls, artificial grass turf, and professional LED lighting for day and evening play.`;
  const courtText2 = venue.courtText2 || `Court hire is available from opening to close, with online booking up to 7 days in advance. Members receive priority windows and guaranteed slots during peak hours.`;
  const clubText = venue.clubText || `Beyond the courts, KROSS ${venue.name} is a place to stay. The club lounge is designed for post-match recovery and pre-match preparation.`;
  const clubText2 = venue.clubText2 || `Locker rooms are available for members. Equipment rental and restringing services are available at the front desk.`;
  const imgCaption1 = venue.imgCaption1 || `KROSS ${venue.name} — Courts Overview`;
  const imgCaption2 = venue.imgCaption2 || `KROSS ${venue.name} — Club Space`;

  return (
    <div>
      <div className="venue-detail-hero">
        <div className="venue-detail-hero-bg" style={{ background: venue.bg1 }} />
        <div className="venue-detail-hero-overlay" />
        <div className="venue-detail-content">
          <button className="back-btn" onClick={() => navigate("venues")}>← All Venues</button>
          <div className="venue-detail-tag">{venue.num} / {venue.region} · {venue.status}</div>
          <div className="venue-detail-title">{venue.name}</div>
          <div className="venue-detail-sub">{venue.loc} · {venue.courts}</div>
        </div>
      </div>
      <div className="venue-detail-body">
        <div>
          <div className="venue-detail-sticky">
            <div className="tag" style={{ marginBottom: 24 }}>Venue Info</div>
            <div className="venue-sidebar-item">
              <div className="venue-sidebar-label">Status</div>
              <div className="venue-sidebar-val" style={{ color: venue.status === "Open" ? "var(--green-highlight)" : "var(--white)" }}>{venue.status}</div>
            </div>
            <div className="venue-sidebar-divider" />
            <div className="venue-sidebar-item">
              <div className="venue-sidebar-label">Hours</div>
              <div className="venue-sidebar-val">{venue.hours}</div>
            </div>
            <div className="venue-sidebar-divider" />
            <div className="venue-sidebar-item">
              <div className="venue-sidebar-label">Address</div>
              <div className="venue-sidebar-val" style={{ fontSize: 13, opacity: .65 }}>{venue.address}</div>
            </div>
            <div className="venue-sidebar-divider" />
            <div className="venue-sidebar-item">
              <div className="venue-sidebar-label">Phone</div>
              <div className="venue-sidebar-val">{venue.phone}</div>
            </div>
            <div className="venue-sidebar-divider" />
            <br />
            <button className="btn-primary" onClick={openBook} style={{ width: "100%", textAlign: "center" }}>Book Here</button>
          </div>
        </div>
        <div>
          <p className="venue-intro">{venue.intro}</p>
          <div className="venue-img-block"><div className="venue-img-inner" style={{ background: venue.imgBg1 }} /></div>
          <div className="venue-img-caption">{imgCaption1}</div>
          <div className="venue-section-heading">The Courts</div>
          <p className="venue-body-text">{courtText}</p>
          <p className="venue-body-text">{courtText2}</p>
          <div className="venue-features">
            {(venue.features || []).map(f => (
              <div className="venue-feature" key={`${f.label}-${f.num}`}>
                <div className="venue-feature-num">{f.num}</div>
                <div className="venue-feature-label">{f.label}</div>
              </div>
            ))}
          </div>
          <div className="venue-img-block"><div className="venue-img-inner" style={{ background: venue.imgBg2 }} /></div>
          <div className="venue-img-caption">{imgCaption2}</div>
          <div className="venue-section-heading">The Club</div>
          <p className="venue-body-text">{clubText}</p>
          <p className="venue-body-text">{clubText2}</p>
          <div className="venue-detail-cta">
            <div className="venue-detail-cta-text">Ready to play at {venue.name}?</div>
            <button className="btn-primary" onClick={openBook}>Book A Court</button>
          </div>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}