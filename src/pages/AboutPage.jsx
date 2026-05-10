import Footer from "../components/Footer";

export default function AboutPage({ navigate }) {
    const team = [
        { name: "Founder Name", role: "Founder & CEO", bio: "Passionate padel enthusiast with 15+ years in sports industry" },
        { name: "Co-Founder", role: "Co-Founder & Director", bio: "Expert in club management and community building" },
        { name: "Operations Lead", role: "Operations Manager", bio: "Dedicated to delivering world-class padel experience" },
    ];

    const milestones = [
        { year: "2020", title: "The Vision", desc: "Founded KROSS with the mission to revolutionize padel in Asia" },
        { year: "2021", title: "First Court", desc: "Opened flagship venue in Onnut, Bangkok" },
        { year: "2022", title: "Expansion", desc: "Launched three new premium locations across Bangkok" },
        { year: "2024", title: "Community", desc: "Over 5,000+ active members and growing" },
    ];

    const reasons = [
        { title: "Premium Courts", desc: "International standard padel courts with professional-grade equipment" },
        { title: "Professional Coaching", desc: "Expert coaches for all skill levels, from beginners to advanced" },
        { title: "Thriving Community", desc: "Connect with fellow padel enthusiasts at tournaments and social events" },
        { title: "International Standards", desc: "World-class facilities meeting international padel benchmarks" },
        { title: "Tournaments & Events", desc: "Regular competitions and exclusive member events throughout the year" },
        { title: "Lifestyle Experience", desc: "More than padel—a premium lifestyle and social club" },
    ];

    return (
        <div>
            {/* HERO SECTION */}
            <section id="hero" style={{ padding: 0 }}>
                <div className="hero-video-wrap" style={{
                    background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
                }} />
                <div className="hero-content">
                    <div className="hero-eyebrow">Our Story</div>
                    <div className="hero-title">About KROSS</div>
                    <div className="hero-sub">Building Asia's Premier Padel Community</div>
                </div>
            </section>

            {/* OUR STORY TIMELINE */}
            <section style={{ padding: "100px 56px" }}>
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <div className="tag">Our Journey</div>
                    <div className="heading" style={{ marginBottom: 64 }}>Our Story</div>
                    <p className="body-txt" style={{ marginBottom: 64, fontSize: "18px", lineHeight: "1.8", opacity: 0.9 }}>
                        KROSS was born from a simple passion: bringing world-class padel to Asia. We believe padel is more than a sport—it's a lifestyle, a community, and a gateway to meaningful connections. From our first court in Onnut to our four thriving locations, every step has been driven by our commitment to excellence and community.
                    </p>
                    <div style={{ display: "grid", gap: 48 }}>
                        {milestones.map((m, i) => (
                            <div key={i} style={{
                                display: "flex",
                                gap: 32,
                                paddingBottom: i < milestones.length - 1 ? 48 : 0,
                                borderBottom: i < milestones.length - 1 ? `1px solid var(--border)` : "none"
                            }}>
                                <div style={{
                                    minWidth: "100px",
                                    fontSize: "28px",
                                    fontWeight: 600,
                                    color: "var(--green-highlight)"
                                }}>{m.year}</div>
                                <div>
                                    <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: 8 }}>{m.title}</div>
                                    <p className="body-txt">{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MISSION & VISION */}
            <section style={{
                padding: "100px 56px",
                background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)",
                marginTop: 0
            }}>
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
                        <div>
                            <div className="tag" style={{ color: "var(--green-highlight)" }}>Our Purpose</div>
                            <div className="heading" style={{ marginBottom: 24 }}>Mission</div>
                            <p className="body-txt" style={{ fontSize: "18px", lineHeight: "1.8", opacity: 0.95 }}>
                                To grow padel culture across Asia and create world-class clubs where people connect, compete, and build lasting friendships through the sport we love.
                            </p>
                        </div>
                        <div>
                            <div className="tag" style={{ color: "var(--green-highlight)" }}>Where We're Headed</div>
                            <div className="heading" style={{ marginBottom: 24 }}>Vision</div>
                            <p className="body-txt" style={{ fontSize: "18px", lineHeight: "1.8", opacity: 0.95 }}>
                                To become one of Asia's leading padel communities, recognized for premium facilities, world-class coaching, and unforgettable member experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY KROSS */}
            <section style={{ padding: "100px 56px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div className="tag">The KROSS Difference</div>
                    <div className="heading" style={{ marginBottom: 64 }}>Why Choose KROSS?</div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 40
                    }}>
                        {reasons.map((r, i) => (
                            <div key={i} style={{
                                padding: 32,
                                border: `1px solid var(--border)`,
                                borderRadius: "8px",
                                background: "var(--mid2)",
                                transition: "all 0.3s ease"
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "var(--green-highlight)";
                                    e.currentTarget.style.background = "rgba(45, 168, 79, 0.05)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "var(--border)";
                                    e.currentTarget.style.background = "var(--mid2)";
                                }}>
                                <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: 8 }}>{r.title}</div>
                                <p className="body-txt">{r.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM SECTION */}
            <section style={{ padding: "100px 56px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div className="tag">Meet The Team</div>
                    <div className="heading" style={{ marginBottom: 64 }}>Our Founders & Leadership</div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: 48
                    }}>
                        {team.map((member, i) => (
                            <div key={i} style={{
                                textAlign: "center",
                                padding: "32px 0"
                            }}>
                                <div style={{
                                    width: "120px",
                                    height: "120px",
                                    borderRadius: "50%",
                                    background: `linear-gradient(135deg, var(--green-dark) 0%, var(--green-bright) 100%)`,
                                    margin: "0 auto 24px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "48px"
                                }}>👨‍💼</div>
                                <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: 4 }}>{member.name}</div>
                                <div style={{ fontSize: "14px", color: "var(--green-highlight)", marginBottom: 12 }}>{member.role}</div>
                                <p className="body-txt">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* FINAL CTA */}
            <section style={{
                padding: "100px 56px",
                background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
            }}>
                <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
                    <div className="tag" style={{ color: "var(--green-highlight)" }}>Join Us</div>
                    <div className="heading" style={{ marginBottom: 32 }}>Join the KROSS Community</div>
                    <p className="body-txt" style={{ fontSize: "18px", marginBottom: 48, opacity: 0.95 }}>
                        Ready to experience premium padel? Become part of our thriving community today.
                    </p>
                    <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                        <button className="btn-primary" onClick={() => navigate("membership")}>View Membership</button>
                        <button className="btn-ghost" onClick={() => navigate("contact")}>Contact Us</button>
                    </div>
                </div>
            </section>

            <Footer navigate={navigate} />
        </div>
    );
}
