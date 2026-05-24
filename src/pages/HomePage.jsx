import { useState, useEffect, useContext } from "react";
import Footer from "../components/Footer";
import { VenueContext } from "../context/VenueContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { locationWord } from "../utils/venueUtils";

function formatDate(val) {
    if (!val) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
        const d = new Date(val + "T00:00:00");
        return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    }
    return val;
}

export default function HomePage({ navigate, openBook }) {
    const { venues } = useContext(VenueContext);
    const [stories, setStories] = useState([]);
    const [plans, setPlans] = useState([]);
    const [activities, setActivities] = useState([]);

    const venueWord = locationWord(venues.length);

    useEffect(() => {
        const load = async () => {
            const snap = await getDocs(collection(db, "stories"));
            setStories(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
        };
        load();
    }, []);

    useEffect(() => {
        const load = async () => {
            const snap = await getDocs(collection(db, "activities"));
            setActivities(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
        };
        load();
    }, []);

    useEffect(() => {
        const loadPlans = async () => {
            const snap = await getDocs(collection(db, "plans"));
            const docs = snap.docs.map(d => ({ docId: d.id, ...d.data() }));
            if (docs.length > 0) setPlans(docs);
        };
        loadPlans();
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
                    <div className="hero-eyebrow">Bangkok's Premier Padel Club</div>
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
            <section style={{ padding: "100px 0 0" }}>
                <div style={{ padding: "0 56px 52px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
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
            </section>

            {/* ACTIVITIES */}
            {activities.length > 0 && (
                <section style={{ padding: "100px 56px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 24 }}>
                        <div>
                            <div className="tag">What We Offer</div>
                            <div className="heading" style={{ marginBottom: 0 }}>Activities.</div>
                        </div>
                        <button className="btn-ghost" onClick={() => navigate("activities")}>All Activities</button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
                        {activities.slice(0, 3).map((a) => (
                            <div key={a.docId} onClick={() => navigate("activities")} style={{
                                position: "relative", height: 340, overflow: "hidden", cursor: "pointer",
                                background: a.imageUrl
                                    ? `url(${a.imageUrl}) center/cover no-repeat`
                                    : "linear-gradient(135deg, var(--green-dark), var(--green-mid))",
                                transition: "transform .4s ease"
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.querySelector(".act-bg-overlay").style.opacity = "0.7"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.querySelector(".act-bg-overlay").style.opacity = "1"; }}
                            >
                                <div className="act-bg-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.2) 60%, transparent 100%)", transition: "opacity .4s ease" }} />
                                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px" }}>
                                    {a.date && <div style={{ fontSize: 10, opacity: 0.55, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>{formatDate(a.date)}</div>}
                                    <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 28, letterSpacing: "1.5px", lineHeight: 1.1, marginBottom: 8 }}>{a.name}</div>
                                    <p className="body-txt" style={{ fontSize: 13, opacity: 0.7, margin: 0 }}>{a.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* STORIES */}
            <section style={{ background: "var(--mid)", padding: "120px 0" }}>
                <div style={{ padding: "0 56px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 24 }}>
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
                    <div style={{ padding: "80px 56px", opacity: .3, fontSize: 12, letterSpacing: 3, textTransform: "uppercase" }}>No stories yet</div>
                )}

            </section>

            {/* MEMBERSHIP */}
            <section style={{ padding: 0 }}>
                <div className="membership-inner">
                    <div>
                        <div className="tag">Membership</div>
                        <div className="heading">Join<br />The Club.</div>
                        <p className="body-txt">Unlimited court access, priority booking, coaching discounts, and exclusive member events.</p>
                        <br /><br />
                        <button className="btn-primary" onClick={() => navigate("membership")}>View Plans</button>
                    </div>
                    <div className="membership-right">
                        {plans.map(p => (
                            <div className={`plan-card${p.featured ? " featured" : ""}`} key={p.docId || p.name} onClick={() => navigate("membership")}>
                                <div className="plan-name">{p.name}</div>
                                <div className="plan-price">From <strong>{p.price}</strong> / month</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BOOK CTA */}
            <div id="book-cta" onClick={openBook}>
                <div className="book-bg-text">BOOK PADEL BOOK PADEL BOOK PADEL BOOK PADEL &nbsp;BOOK PADEL BOOK PADEL BOOK PADEL BOOK PADEL &nbsp;</div>
                <div className="book-content">
                    <div className="book-title">Ready To<br />Play?</div>
                    <button className="book-cta-btn">Book A Court</button>
                </div>
            </div>

            <Footer navigate={navigate} />
        </div>
    );
}