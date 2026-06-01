import { useState, useEffect, useContext, useRef } from "react";
import Footer from "../components/Footer";
import { VenueContext } from "../context/VenueContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { locationWord, formatDate } from "../utils/venueUtils";

export default function HomePage({ navigate, openBook }) {
    const { venues } = useContext(VenueContext);
    const [stories, setStories] = useState([]);
    const [activities, setActivities] = useState([]);

    const venueWord = locationWord(venues.length);
    const carouselRef = useRef(null);

    useEffect(() => {
        let cancelled = false;
        const mapDocs = (snap) => snap.docs.map(d => ({ docId: d.id, ...d.data() }));
        Promise.all([
            getDocs(collection(db, "stories")),
            getDocs(collection(db, "activities")),
        ]).then(([storiesSnap, activitiesSnap]) => {
            if (cancelled) return;
            setStories(mapDocs(storiesSnap));
            setActivities(mapDocs(activitiesSnap));
        });
        return () => { cancelled = true; };
    }, []);


    return (
        <div>
            {/* VIDEO HERO */}
            <section id="hero" style={{ padding: 0 }}>
                <div className="hero-video-wrap">
                    <iframe
                        src="https://www.youtube.com/embed/292h6TFzUVs?autoplay=1&mute=1&loop=1&playlist=292h6TFzUVs&controls=0&showinfo=0&rel=0"
                        style={{
                            position: "absolute", top: "50%", left: "50%",
                            transform: "translate(-50%, -50%) scale(1.5)",
                            width: "100%", height: "100%",
                            border: "none", pointerEvents: "none",
                            filter: "brightness(0.6) saturate(0.9)"
                        }}
                        allow="autoplay; fullscreen"
                    />
                </div>
                <div className="hero-content">
                    <div className="hero-eyebrow">Thailand's Premier Padel Clubs</div>
                    <div className="hero-title">KROSS</div>
                    <div className="hero-sub">Onnut · Asoke · Thonglor · Rama IV</div>
                    <div className="hero-actions">
                        <button className="btn-primary" onClick={openBook}>Book Padel</button>
                        <button className="btn-ghost" onClick={() => navigate("venues")}>Our Venues</button>
                    </div>
                </div>
                <div className="scroll-ind"><div className="scroll-line" /></div>
            </section>

            {/* VENUES */}
            <section style={{ padding: "100px clamp(24px, 5vw, 72px) 0" }}>
                <div style={{ padding: "0 0 52px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
                    <div>
                        <div className="tag">Our Venues</div>
                        <div className="heading" style={{ marginBottom: 0 }}>{venueWord}<br />Locations.</div>
                    </div>
                    <div>
                        <p className="body-txt" style={{ marginBottom: 24 }}>World-class padel across Bangkok — each venue designed for the neighbourhood it serves.</p>
                        <button className="btn-ghost" onClick={() => navigate("venues")}>Explore All Venues</button>
                    </div>
                </div>
                <div className="venues-grid">
                    {venues.map(v => {
                        const courtCount = v.courtsInfo ? v.courtsInfo.match(/\d+/)?.[0] : null;
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
                                    {courtCount && (
                                        <div style={{
                                            position: "absolute", bottom: 24, right: 24,
                                            fontSize: 14, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.55
                                        }}>{courtCount} Courts</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ACTIVITIES CAROUSEL */}
            {activities.length > 0 && (
                <section style={{ padding: "100px clamp(24px, 5vw, 72px) 0" }}>
                    <div style={{ padding: "0", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 24 }}>
                        <div>
                            <div className="tag">What We Offer</div>
                            <div className="heading" style={{ marginBottom: 0 }}>Activities.</div>
                        </div>
                        <button className="btn-ghost" onClick={() => navigate("activities")}>All Activities</button>
                    </div>
                    <div style={{ position: "relative" }}>
                        {/* Left arrow */}
                        <button onClick={() => carouselRef.current?.scrollBy({ left: -340, behavior: "smooth" })} style={{
                            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                            zIndex: 10, width: 48, height: 48,
                            border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(8px)", color: "var(--white)",
                            cursor: "pointer", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center"
                        }}>‹</button>
                        {/* Right arrow */}
                        <button onClick={() => carouselRef.current?.scrollBy({ left: 340, behavior: "smooth" })} style={{
                            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                            zIndex: 10, width: 48, height: 48,
                            border: "1px solid rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(8px)", color: "var(--white)",
                            cursor: "pointer", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center"
                        }}>›</button>
                        <div ref={carouselRef} style={{ display: "flex", gap: 2, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
                            {activities.map((a) => (
                                <div key={a.docId} onClick={() => a.url ? window.open(a.url, "_blank", "noopener noreferrer") : navigate("activities")} style={{
                                    position: "relative", height: 580, minWidth: 480, flexShrink: 0,
                                    scrollSnapAlign: "start", overflow: "hidden", cursor: "pointer",
                                    background: a.imageUrl
                                        ? `url(${a.imageUrl}) center/cover no-repeat`
                                        : "linear-gradient(135deg, var(--green-dark), var(--green-mid))",
                                    transition: "transform .4s ease"
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.2) 60%, transparent 100%)" }} />
                                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px" }}>
                                        {a.date && <div style={{ fontSize: 10, opacity: 0.55, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>{formatDate(a.date)}</div>}
                                        <div style={{ fontFamily: "'Gotham Narrow', sans-serif", fontSize: 28, letterSpacing: "1.5px", lineHeight: 1.1, marginBottom: 8 }}>{a.name}</div>
                                        <p className="body-txt" style={{ fontSize: 13, opacity: 0.7, margin: 0 }}>{a.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* STORIES */}
            <section style={{ background: "var(--mid)", padding: "100px clamp(24px, 5vw, 72px) 0" }}>
                <div style={{ padding: "0", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 24 }}>
                    <div>
                        <div className="tag">Our Stories</div>
                        <div className="heading" style={{ marginBottom: 0 }}>Latest<br />News.</div>
                    </div>
                    <button className="btn-ghost" onClick={() => navigate("stories")}>All Stories</button>
                </div>
                {stories.length > 0 ? (
                    <div className="stories-gallery">
                        {/* Featured — large left */}
                        <div className="story-gallery-feature" onClick={() => navigate("stories")}>
                            <div className="story-gallery-bg" style={{
                                background: stories[0].imageUrl
                                    ? `url(${stories[0].imageUrl}) center/cover no-repeat`
                                    : (stories[0].bg || "var(--mid2)")
                            }} />
                            <div className="story-gallery-overlay" />
                            <div className="story-gallery-feature-body">
                                {stories[0].cat && <div className="story-gallery-cat">{stories[0].cat}</div>}
                                <div className="story-gallery-title-lg">{stories[0].title}</div>
                                <div className="story-gallery-date">{formatDate(stories[0].date)}</div>
                                {stories[0].excerpt && <p className="story-gallery-excerpt">{stories[0].excerpt}</p>}
                                <div className="story-gallery-read">Read More →</div>
                            </div>
                        </div>
                        {/* Side — 2 stacked small cards */}
                        <div className="story-gallery-side">
                            {stories.slice(1, 3).map(s => (
                                <div key={s.docId} className="story-gallery-small" onClick={() => navigate("stories")}>
                                    <div className="story-gallery-bg" style={{
                                        background: s.imageUrl
                                            ? `url(${s.imageUrl}) center/cover no-repeat`
                                            : (s.bg || "var(--mid2)")
                                    }} />
                                    <div className="story-gallery-overlay" />
                                    <div className="story-gallery-small-body">
                                        {s.cat && <div className="story-gallery-cat">{s.cat}</div>}
                                        <div className="story-gallery-title-sm">{s.title}</div>
                                        <div className="story-gallery-date">{formatDate(s.date)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: "80px 0", opacity: .3, fontSize: 12, letterSpacing: 3, textTransform: "uppercase" }}>No stories yet</div>
                )}

            </section>

            {/* APP SHOWCASE */}
            <section style={{ background: "linear-gradient(145deg, var(--green-dark) 0%, #0a0f0a 100%)", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch", minHeight: 600 }}>
                <div style={{ padding: "100px clamp(24px, 5vw, 72px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div className="tag">The App</div>
                    <div className="heading">Join The<br />Kross App.</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "32px 0 40px" }}>
                        {[
                            { title: "Profile & Level", desc: "Track your profile, stats and player level in one place." },
                            { title: "Book Courts & Coaches", desc: "Easily book courts and coaching sessions anytime." },
                            { title: "Open Matches", desc: "Join open matches and play with the community." },
                            { title: "Activities & Lessons", desc: "Discover events, classes and training activities." },
                        ].map((item, i) => (
                            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-highlight)", marginTop: 7, flexShrink: 0 }} />
                                <p className="body-txt" style={{ margin: 0, fontSize: 14 }}>
                                    <strong style={{ color: "var(--white)" }}>{item.title}</strong> — {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                    <a href="https://apps.apple.com/kz/app/kross-padel/id6741785490" target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", alignSelf: "flex-start" }}>Download on App Store</a>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", overflow: "hidden" }}>
                    <img src="/image/kross_app.png" alt="Kross App" style={{ maxHeight: 620, maxWidth: "100%", objectFit: "contain", display: "block" }}
                        onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                    />
                    <div style={{ display: "none", width: 260, height: 520, border: "2px solid var(--border)", borderRadius: 32, alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, opacity: 0.3 }}>
                        <div style={{ fontSize: 11, letterSpacing: "2px", textTransform: "uppercase" }}>App Image</div>
                        <div style={{ fontSize: 10, opacity: 0.6 }}>Drop app_mockup.png in /public</div>
                    </div>
                </div>
            </section>

            {/* BOOK CTA */}
            <div id="book-cta" onClick={openBook}>
                <div className="book-bg-text">BOOK PADEL BOOK PADEL BOOK PADEL BOOK PADEL &nbsp;BOOK PADEL BOOK PADEL BOOK PADEL BOOK PADEL &nbsp;</div>
                <div className="book-content">
                    <div className="book-title">Ready To Play?</div>
                    <div style={{ fontSize: 13, letterSpacing: "3px", textTransform: "uppercase", opacity: 0.5, marginBottom: 32 }}>Join Our Community</div>
                    <button className="book-cta-btn">Book A Court</button>
                </div>
            </div>

            <Footer navigate={navigate} />
        </div>
    );
}
