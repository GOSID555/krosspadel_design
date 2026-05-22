import { useState } from "react";
import Footer from "../components/Footer";

const EMPTY_FORM = { name: "", company: "", email: "", phone: "", type: "", message: "" };

export default function BecomePartnerPage({ navigate, notify }) {
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [sending, setSending] = useState(false);

    const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email) return;
        setSending(true);
        await new Promise(r => setTimeout(r, 800));
        setSending(false);
        setForm(EMPTY_FORM);
        notify("Partnership inquiry sent! We'll be in touch within 2 business days.");
    };

    const partnerships = [
        { icon: "🏢", title: "Franchise Owner", desc: "Own and operate a KROSS venue with full brand support and proven business model" },
        { icon: "💼", title: "Investment Partner", desc: "Invest in club expansion and share in revenue growth across multiple venues" },
        { icon: "🏛️", title: "Venue Collaboration", desc: "Partner with existing venues to bring KROSS concept to new markets" },
        { icon: "🤝", title: "Corporate Partnership", desc: "Collaborate on events, tournaments, and exclusive member benefits" },
    ];

    const benefits = [
        { title: "Proven Business Model", desc: "Operating system refined across 4+ venues with consistent profitability" },
        { title: "International Club Concept", desc: "Premium brand identity recognized across Asia" },
        { title: "Supplier Network Access", desc: "Preferred partnerships for court equipment, technology, and services" },
        { title: "Staff Training Program", desc: "Comprehensive onboarding and ongoing professional development" },
        { title: "Launch Support", desc: "Full setup assistance from venue design to community building" },
        { title: "Ongoing Management Consultation", desc: "Continuous business support and optimization strategies" },
    ];

    const process = [
        { step: "1", title: "Inquiry", desc: "Submit partnership interest and preliminary information" },
        { step: "2", title: "Consultation", desc: "Meet with our team to discuss vision, location, and partnership type" },
        { step: "3", title: "Planning", desc: "Develop detailed business plan and financial projections" },
        { step: "4", title: "Setup", desc: "Prepare venue, train team, and establish operations" },
        { step: "5", title: "Launch", desc: "Grand opening with community events and member acquisition" },
    ];

    const faqs = [
        {
            q: "What investment is required to become a franchise owner?",
            a: "Investment varies by location and venue size. Typically, initial setup costs range from 2-5M THB, including court construction, equipment, and working capital. We provide detailed financial projections during consultation."
        },
        {
            q: "How long does the setup process take?",
            a: "From initial inquiry to grand opening typically takes 8-12 months, depending on venue readiness and local regulations. We manage the entire process to minimize delays."
        },
        {
            q: "What kind of location works best?",
            a: "Ideal locations are in urban areas with high foot traffic, preferably near residential or business districts. The venue should accommodate 4-8 courts with additional amenities."
        },
        {
            q: "Will KROSS provide staff training?",
            a: "Yes, comprehensive training is provided for all staff including court management, customer service, coaching, and administrative operations. We also offer ongoing support."
        },
        {
            q: "What are the typical revenue projections?",
            a: "Based on our current venues, a full 6-court facility typically generates 800K-1.2M THB monthly revenue after 12-18 months of operation, with margins of 25-35%."
        },
        {
            q: "Can I operate multiple venues?",
            a: "Yes, we support multi-venue operators. Additional support is provided for managing multiple locations efficiently."
        },
    ];

    const testimonials = [
        { name: "Partner Name", location: "Bangkok", quote: "Investing in KROSS was the best business decision. The support and community are unmatched." },
        { name: "Franchise Owner", location: "Venue Location", quote: "The proven model and operations support made launching smooth. Members love the KROSS experience." },
    ];

    return (
        <div>
            {/* HERO SECTION */}
            <section id="hero" style={{ padding: 0 }}>
                <div className="hero-video-wrap" style={{
                    background: "linear-gradient(135deg, var(--green-accent) 0%, var(--green-bright) 100%)"
                }} />
                <div className="hero-content">
                    <div className="hero-eyebrow">Business Opportunity</div>
                    <div className="hero-title">Become a KROSS Partner</div>
                    <div className="hero-sub">Join Asia's Growing Padel Revolution</div>
                    <div className="hero-actions">
                        <button className="btn-primary" onClick={() => document.querySelector("#contact-form").scrollIntoView({ behavior: "smooth" })}>Partner With Us</button>
                        <button className="btn-ghost" onClick={() => navigate("contact")}>Learn More</button>
                    </div>
                </div>
            </section>

            {/* WHY INVEST IN PADEL */}
            <section style={{ padding: "100px 56px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div className="tag">Market Opportunity</div>
                    <div className="heading" style={{ marginBottom: 64 }}>Why Invest in Padel?</div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: 24
                    }}>
                        {[
                            { stat: "+200%", label: "Global Growth", desc: "Padel is the fastest growing sport worldwide" },
                            { stat: "5M+", label: "Active Players", desc: "And growing exponentially in Asia" },
                            { stat: "35+", label: "Countries", desc: "Padel communities established worldwide" },
                            { stat: "High ROI", label: "Business Model", desc: "Strong margins and repeat membership revenue" },
                        ].map((item, i) => (
                            <div key={i} style={{
                                padding: 32,
                                background: "var(--mid2)",
                                border: "1px solid var(--border)",
                                borderRadius: "8px",
                                textAlign: "center"
                            }}>
                                <div style={{
                                    fontSize: "36px",
                                    fontWeight: 600,
                                    color: "var(--green-highlight)",
                                    marginBottom: 8
                                }}>{item.stat}</div>
                                <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: 8 }}>{item.label}</div>
                                <p className="body-txt">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PARTNERSHIP MODELS */}
            <section style={{ padding: "100px 56px", background: "var(--mid2)" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div className="tag">Partnership Options</div>
                    <div className="heading" style={{ marginBottom: 64 }}>Different Ways to Partner</div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: 32
                    }}>
                        {partnerships.map((p, i) => (
                            <div key={i} style={{
                                padding: 40,
                                border: "1px solid var(--border)",
                                borderRadius: "8px",
                                background: "var(--black)",
                                transition: "all 0.3s ease"
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "var(--green-highlight)";
                                    e.currentTarget.style.background = "rgba(45, 168, 79, 0.03)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "var(--border)";
                                    e.currentTarget.style.background = "var(--black)";
                                }}>
                                <div style={{ fontSize: "48px", marginBottom: 16 }}>{p.icon}</div>
                                <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: 12 }}>{p.title}</div>
                                <p className="body-txt">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHAT YOU GET */}
            <section style={{ padding: "100px 56px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div className="tag">Your Advantages</div>
                    <div className="heading" style={{ marginBottom: 64 }}>What You'll Get</div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: 40
                    }}>
                        {benefits.map((b, i) => (
                            <div key={i} style={{ paddingBottom: 24 }}>
                                <div style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-bright) 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "24px",
                                    marginBottom: 16
                                }}>✓</div>
                                <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: 8 }}>{b.title}</div>
                                <p className="body-txt">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section style={{
                padding: "100px 56px",
                background: "linear-gradient(135deg, var(--green-dark) 0%, var(--green-mid) 100%)"
            }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div className="tag" style={{ color: "var(--green-highlight)" }}>Get Started</div>
                    <div className="heading" style={{ marginBottom: 64 }}>Partnership Process</div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 32
                    }}>
                        {process.map((p, i) => (
                            <div key={i} style={{
                                display: "flex",
                                gap: 32,
                                alignItems: "flex-start",
                                paddingBottom: i < process.length - 1 ? 32 : 0,
                                borderBottom: i < process.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none"
                            }}>
                                <div style={{
                                    minWidth: "60px",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "24px",
                                    fontWeight: 600
                                }}>{p.step}</div>
                                <div style={{ paddingTop: 8 }}>
                                    <div style={{ fontSize: "20px", fontWeight: 600, marginBottom: 8 }}>{p.title}</div>
                                    <p className="body-txt">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section style={{ padding: "100px 56px" }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div className="tag">Success Stories</div>
                    <div className="heading" style={{ marginBottom: 64 }}>Partner Testimonials</div>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                        gap: 40
                    }}>
                        {testimonials.map((t, i) => (
                            <div key={i} style={{
                                padding: 40,
                                background: "var(--mid2)",
                                border: "1px solid var(--border-green)",
                                borderRadius: "8px"
                            }}>
                                <div style={{ fontSize: "32px", marginBottom: 16 }}>⭐⭐⭐⭐⭐</div>
                                <p className="body-txt" style={{ marginBottom: 24, fontSize: "16px", fontStyle: "italic" }}>"{t.quote}"</p>
                                <div style={{ fontSize: "16px", fontWeight: 600 }}>{t.name}</div>
                                <div style={{ fontSize: "14px", color: "var(--green-highlight)" }}>{t.location}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section style={{ padding: "100px 56px", background: "var(--mid2)" }}>
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <div className="tag">Questions?</div>
                    <div className="heading" style={{ marginBottom: 64 }}>Frequently Asked Questions</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{
                                border: "1px solid var(--border)",
                                borderRadius: "8px",
                                overflow: "hidden",
                                background: expandedFaq === i ? "rgba(45, 168, 79, 0.05)" : "transparent"
                            }}>
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                    style={{
                                        width: "100%",
                                        padding: "24px",
                                        background: "transparent",
                                        border: "none",
                                        color: "var(--white)",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        textAlign: "left",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        transition: "all 0.3s ease"
                                    }}>
                                    {faq.q}
                                    <span style={{
                                        fontSize: "20px",
                                        transition: "transform 0.3s ease",
                                        transform: expandedFaq === i ? "rotate(180deg)" : "rotate(0deg)"
                                    }}>⌄</span>
                                </button>
                                {expandedFaq === i && (
                                    <div style={{
                                        padding: "0 24px 24px",
                                        borderTop: "1px solid var(--border)"
                                    }}>
                                        <p className="body-txt">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT FORM */}
            <section id="contact-form" style={{ padding: "100px 56px" }}>
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <div className="tag">Get In Touch</div>
                    <div className="heading" style={{ marginBottom: 16 }}>Start Your KROSS Journey</div>
                    <p className="body-txt" style={{ marginBottom: 56 }}>
                        Ready to become a KROSS partner? Fill in the form below and our partnership team will be in touch within 2 business days.
                    </p>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input
                                    value={form.name}
                                    onChange={e => handleChange("name", e.target.value)}
                                    placeholder="Your full name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Company / Organization</label>
                                <input
                                    value={form.company}
                                    onChange={e => handleChange("company", e.target.value)}
                                    placeholder="Company name"
                                />
                            </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={e => handleChange("email", e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone / LINE</label>
                                <input
                                    value={form.phone}
                                    onChange={e => handleChange("phone", e.target.value)}
                                    placeholder="+66 or LINE ID"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Partnership Type</label>
                            <select value={form.type} onChange={e => handleChange("type", e.target.value)}>
                                <option value="">Select partnership type...</option>
                                <option value="franchise">Franchise Owner</option>
                                <option value="investment">Investment Partner</option>
                                <option value="venue">Venue Collaboration</option>
                                <option value="corporate">Corporate Partnership</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                value={form.message}
                                onChange={e => handleChange("message", e.target.value)}
                                placeholder="Tell us about your interest, location, or any questions you have..."
                                style={{ height: 140 }}
                            />
                        </div>
                        <div>
                            <button type="submit" className="btn-primary" disabled={sending}>
                                {sending ? "Sending..." : "Send Partnership Inquiry"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <Footer navigate={navigate} />
        </div>
    );
}
