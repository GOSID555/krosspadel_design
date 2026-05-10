import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const EMPTY = { name: "", price: "", perks: "", featured: false };

function MembershipPreview({ form }) {
    return (
        <div style={{ background: "var(--mid)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-highlight)" }} />
                <div style={{ fontSize: 11, opacity: 0.5, textTransform: "uppercase", letterSpacing: 2 }}>Live Preview</div>
            </div>
            <div style={{ padding: 24 }}>
                {/* Full plan card preview */}
                <div style={{
                    padding: 32,
                    border: `1px solid ${form.featured ? "var(--green-highlight)" : "rgba(255,255,255,0.08)"}`,
                    background: form.featured ? "rgba(45, 168, 79, 0.08)" : "var(--mid2)",
                    borderRadius: 4,
                    position: "relative"
                }}>
                    {form.featured && (
                        <div style={{
                            position: "absolute", top: -1, left: 20,
                            background: "var(--green-highlight)", color: "#fff",
                            fontSize: 8, letterSpacing: "2px", padding: "4px 10px", fontWeight: 600
                        }}>
                            POPULAR
                        </div>
                    )}
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: "1.5px", marginBottom: 10, lineHeight: 1 }}>
                            {form.name || "Plan Name"}
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                            <div style={{ fontSize: 30, fontWeight: 700, color: "var(--green-highlight)" }}>
                                {form.price || "฿0"}
                            </div>
                            <div style={{ fontSize: 12, opacity: 0.5 }}>/month</div>
                        </div>
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.55, lineHeight: 1.9, marginBottom: 20, whiteSpace: "pre-line" }}>
                        {form.perks || "Perks will appear here..."}
                    </div>
                    <div style={{
                        padding: "12px 20px", textAlign: "center", fontSize: 10, letterSpacing: "2px",
                        textTransform: "uppercase", fontWeight: 600,
                        background: form.featured ? "var(--green-bright)" : "none",
                        border: form.featured ? "none" : "1px solid rgba(255,255,255,0.2)",
                        opacity: 0.8
                    }}>
                        Get Started
                    </div>
                </div>

                {/* Homepage mini card preview */}
                <div style={{ marginTop: 20 }}>
                    <div style={{ fontSize: 10, opacity: 0.35, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>As Homepage Card</div>
                    <div style={{
                        padding: "20px 24px",
                        border: `1px solid ${form.featured ? "var(--green-highlight)" : "rgba(255,255,255,0.08)"}`,
                        background: form.featured ? "rgba(45,168,79,0.07)" : "transparent",
                        borderRadius: 2
                    }}>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "1.5px", marginBottom: 4 }}>
                            {form.name || "Plan Name"}
                        </div>
                        <div style={{ fontSize: 12, opacity: 0.5 }}>From <strong style={{ color: "var(--white)", opacity: 1 }}>{form.price || "฿0"}</strong> / month</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminMembershipPage({ navigate }) {
    const [plans, setPlans] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);

    const load = async () => {
        const snap = await getDocs(collection(db, "plans"));
        setPlans(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
    };

    useEffect(() => { load(); }, []);

    const handleEdit = (item) => { setForm(item); setEditing(item.docId); };
    const handleNew = () => { setForm(EMPTY); setEditing("new"); };
    const handleBack = () => { setEditing(null); load(); };
    const handleChange = (key, value) => setForm(f => ({ ...f, [key]: value }));

    const handleSave = async () => {
        setSaving(true);
        const { docId: _docId, ...data } = form;
        data.featured = !!data.featured;
        if (editing === "new") {
            await addDoc(collection(db, "plans"), data);
        } else {
            await updateDoc(doc(db, "plans", editing), data);
        }
        setSaving(false);
        handleBack();
    };

    const handleDelete = async (docId) => {
        if (!confirm("ลบแผนสมาชิกนี้?")) return;
        await deleteDoc(doc(db, "plans", docId));
        load();
    };

    // LIST
    if (!editing) return (
        <div style={{ minHeight: "100vh", background: "var(--dark)", padding: "120px 40px 40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
                <div>
                    <button className="back-btn" onClick={() => navigate("admin")}>← Dashboard</button>
                    <div className="heading" style={{ fontSize: 32, marginBottom: 0 }}>Membership Plans</div>
                </div>
                <button className="btn-primary" onClick={handleNew}>+ Add Plan</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {plans.map(item => (
                    <div key={item.docId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "var(--mid)", borderRadius: 8 }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div className="venue-name" style={{ fontSize: 18 }}>{item.name}</div>
                                {item.featured && <span style={{ fontSize: 8, letterSpacing: "2px", background: "var(--green-highlight)", color: "#fff", padding: "2px 8px", fontWeight: 600 }}>POPULAR</span>}
                            </div>
                            <div style={{ opacity: 0.5, fontSize: 13 }}>{item.price} · {item.perks?.slice(0, 60)}...</div>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                            <button className="btn-ghost" onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.docId)} style={{ background: "none", border: "1px solid #ff6b6b", color: "#ff6b6b", padding: "8px 20px", cursor: "pointer", borderRadius: 2 }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // FORM
    return (
        <div style={{ minHeight: "100vh", background: "var(--dark)", padding: "120px 40px 40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                <button className="back-btn" onClick={handleBack}>← Back to List</button>
                <button className="back-btn" onClick={() => navigate("admin")}>← Dashboard</button>
            </div>
            <div className="heading" style={{ fontSize: 32, marginBottom: 32 }}>{editing === "new" ? "New Plan" : "Edit Plan"}</div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 560px) minmax(280px, 1fr)", gap: 48, alignItems: "start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* Name */}
                    <div>
                        <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 6, textTransform: "uppercase" }}>Name</div>
                        <input
                            value={form.name || ""}
                            onChange={e => handleChange("name", e.target.value)}
                            style={{ width: "100%", padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4 }}
                        />
                    </div>
                    {/* Price */}
                    <div>
                        <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 6, textTransform: "uppercase" }}>Price (e.g. ฿2,500)</div>
                        <input
                            value={form.price || ""}
                            onChange={e => handleChange("price", e.target.value)}
                            style={{ width: "100%", padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4 }}
                        />
                    </div>
                    {/* Perks */}
                    <div>
                        <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 6, textTransform: "uppercase" }}>Perks / Description</div>
                        <div style={{ fontSize: 11, opacity: 0.4, marginBottom: 8 }}>กด Enter เพื่อขึ้นบรรทัดใหม่</div>
                        <textarea
                            value={form.perks || ""}
                            onChange={e => handleChange("perks", e.target.value)}
                            rows={6}
                            style={{ width: "100%", padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4, resize: "vertical" }}
                        />
                    </div>
                    {/* Featured toggle */}
                    <div
                        onClick={() => handleChange("featured", !form.featured)}
                        style={{
                            display: "flex", alignItems: "center", gap: 14, padding: "16px 20px",
                            background: form.featured ? "rgba(45,168,79,0.1)" : "var(--mid)",
                            border: `1px solid ${form.featured ? "var(--green-highlight)" : "rgba(255,255,255,0.1)"}`,
                            borderRadius: 4, cursor: "pointer", transition: "all .2s"
                        }}
                    >
                        <div style={{
                            width: 20, height: 20, borderRadius: 4, flexShrink: 0,
                            background: form.featured ? "var(--green-highlight)" : "none",
                            border: `2px solid ${form.featured ? "var(--green-highlight)" : "rgba(255,255,255,0.3)"}`,
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12
                        }}>
                            {form.featured ? "✓" : ""}
                        </div>
                        <div>
                            <div style={{ fontSize: 13, marginBottom: 2 }}>Mark as Popular / Featured</div>
                            <div style={{ fontSize: 11, opacity: 0.45 }}>แสดง badge "POPULAR" และ highlight สีเขียว</div>
                        </div>
                    </div>
                    <button className="btn-primary" onClick={handleSave} disabled={saving}>
                        {saving ? "Saving..." : "Save Plan"}
                    </button>
                </div>
                <div style={{ position: "sticky", top: 120 }}>
                    <MembershipPreview form={form} />
                </div>
            </div>
        </div>
    );
}
