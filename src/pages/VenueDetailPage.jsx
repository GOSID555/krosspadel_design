import Footer from "../components/Footer";

export default function VenueDetailPage({ venue, navigate, openBook }) {
  const courtText = venue.courtText || `Every court at KROSS ${venue.name} is built to World Padel Tour specifications — premium glass walls, artificial grass turf, and professional LED lighting for day and evening play.`;
  const courtText2 = venue.courtText2 || `Court hire is available from opening to close, with online booking up to 7 days in advance. Members receive priority windows and guaranteed slots during peak hours.`;
  const clubText = venue.clubText || `Beyond the courts, KROSS ${venue.name} is a place to stay. The club lounge is designed for post-match recovery and pre-match preparation.`;
  const clubText2 = venue.clubText2 || `Locker rooms are available for members. Equipment rental and restringing services are available at the front desk.`;
  const courtsImageCaption = venue.courtsImageCaption || `KROSS ${venue.name} — Courts Overview`;
  const clubImageCaption = venue.clubImageCaption || `KROSS ${venue.name} — Club Space`;

  return (
    <div>
      <div className="venue-detail-hero">
        <div className="venue-detail-hero-bg" style={{
          background: venue.bg1Image ? `url(${venue.bg1Image}) center/cover no-repeat` : venue.bg1
        }} />
        <div className="venue-detail-hero-overlay" />
        <div className="venue-detail-content">
          <button className="back-btn" onClick={() => navigate("venues")}>← All Venues</button>
          <div className="venue-detail-tag">{venue.num} / {venue.region} · {venue.status}</div>
          <div className="venue-detail-title">{venue.name}</div>
          <div className="venue-detail-sub">{venue.loc}{venue.courts ? ` · ${venue.courts} Courts` : ""}</div>
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
        <div style={{ minWidth: 0 }}>
          <p className="venue-intro">{venue.intro}</p>
          {venue.address && (
            <div style={{ marginBottom: 56 }}>
              <div className="venue-section-heading">Location</div>
              {venue.mapUrl ? (
                <iframe
                  title={`Map – KROSS ${venue.name}`}
                  src={venue.mapUrl}
                  width="100%"
                  height="360"
                  style={{ border: 0, borderRadius: 4, display: "block", filter: "grayscale(1) invert(1) hue-rotate(180deg) brightness(0.9)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("KROSS " + venue.name + " " + venue.address + " Bangkok")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "20px 24px",
                    background: "var(--mid2)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    textDecoration: "none",
                    color: "var(--white)",
                    transition: "border-color .2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "var(--green-highlight)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-highlight)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>View on Google Maps</div>
                    <div style={{ fontSize: 12, opacity: 0.5 }}>{venue.address}</div>
                  </div>
                  <svg style={{ marginLeft: "auto", opacity: 0.4 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              )}
            </div>
          )}
          <div className="venue-img-block"><div className="venue-img-inner" style={{
            background: venue.courtsImageBgImage && venue.courtsImageBgImage.startsWith('http') ? `url(${venue.courtsImageBgImage}) center/cover no-repeat` : (venue.courtsImageBg || "var(--mid2)")
          }} /></div>
          <div className="venue-img-caption">{courtsImageCaption}</div>
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
          <div className="venue-img-block"><div className="venue-img-inner" style={{
            background: venue.clubImageBgImage && venue.clubImageBgImage.startsWith('http') ? `url(${venue.clubImageBgImage}) center/cover no-repeat` : (venue.clubImageBg || "var(--mid2)")
          }} /></div>
          <div className="venue-img-caption">{clubImageCaption}</div>
          <div className="venue-section-heading">The Club</div>
          <p className="venue-body-text">{clubText}</p>
          <p className="venue-body-text">{clubText2}</p>
          {(venue.gallery || []).length > 0 && (
            <div className="venue-gallery">
              <div className="venue-section-heading">Gallery</div>
              <div className="venue-gallery-strip" onWheel={(e) => { e.preventDefault(); e.currentTarget.scrollLeft += e.deltaY; }}>
                {(venue.gallery || []).map((url, i) => (
                  <img key={i} src={url} alt={`${venue.name} ${i + 1}`} className="venue-gallery-img" />
                ))}
              </div>
            </div>
          )}
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