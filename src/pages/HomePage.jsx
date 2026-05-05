import { useState, useEffect, useContext } from "react";
import Footer from "../components/Footer";
import { plans as fallbackPlans } from "../data";
import { VenueContext } from "../context/VenueContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function HomePage({ navigate, openBook }) {
    const { venues } = useContext(VenueContext);
    const [stories, setStories] = useState([]);
    const [plans, setPlans] = useState(fallbackPlans);

    useEffect(() => {
        const load = async () => {
            const snap = await getDocs(collection(db, "stories"));
            setStories(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
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
                        <div className="heading" style={{ marginBottom: 0 }}>Four<br />Locations.</div>
                    </div>
                    <div>
                        <p className="body-txt" style={{ marginBottom: 24 }}>World-class padel across Bangkok — each venue designed for the neighbourhood it serves.</p>
                        <button className="btn-ghost" onClick={() => navigate("venues")}>Explore All Venues</button>
                    </div>
                </div>
                <div className="venues-grid">
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
            </section>

            {/* ACTIVITIES */}
            <section style={{ padding: "100px 0 0" }}>
                <div className="act-grid">
                    <div className="act-main" onClick={() => navigate("activities")}>
                        <div className="act-main-num">01</div>
                        <div className="act-icon">🎾</div>
                        <div className="act-title">Padel</div>
                        <div className="act-desc">Book a court, join a clinic, or compete in weekly tournaments.</div>
                    </div>
                    <div className="act-side">
                        <div className="act-card" onClick={() => navigate("activities")}>
                            <div className="act-icon">🏋️</div>
                            <div className="act-title">Fitness</div>
                            <div className="act-desc">Performance training tailored to court sports.</div>
                        </div>
                        <div className="act-card" onClick={() => navigate("activities")}>
                            <div className="act-icon">🍽️</div>
                            <div className="act-title">Restaurant</div>
                            <div className="act-desc">Fuel up before or unwind after your match.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* STORIES */}
            <section style={{ background: "var(--mid)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
                    <div>
                        <div className="tag">Our Stories</div>
                        <div className="heading" style={{ marginBottom: 0 }}>Latest<br />News.</div>
                    </div>
                    <button className="btn-ghost" onClick={() => navigate("stories")}>All Stories</button>
                </div>
                <div className="stories-grid">
                    {stories.slice(0, 3).map(s => (
                        <div className="story-card" key={s.docId} onClick={() => navigate("stories")}>
                            <div className="story-img">
                                {s.imageUrl ? (
                                    <img src={s.imageUrl} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                ) : (
                                    <div className="story-img-inner" style={{ background: s.bg }} />
                                )}
                            </div>
                            <div className="story-date">{s.date}</div>
                            <div className="story-title">{s.title}</div>
                            <div className="story-excerpt">{s.excerpt}</div>
                            <div className="story-arrow">Read More →</div>
                        </div>
                    ))}
                </div>
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