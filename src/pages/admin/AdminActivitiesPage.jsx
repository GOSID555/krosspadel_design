import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const EMPTY = { num: "", name: "", text: "", icon: "" };

const ICON_OPTIONS = ["🎾", "🏋️", "🍽️", "🏆", "👥", "🎯", "🎓", "🌟", "💪", "🤝", "🏅", "⚡"];

function ActivityPreview({ form }) {
    return (
        <div style={{ background: "var(--mid)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-highlight)" }} />
                <div style={{ fontSize: 11, opacity: 0.5, textTransform: "uppercase", letterSpacing: 2 }}>Live Preview</div>
            </div>
            <div style={{ padding: 24 }}>
                <div style={{ padding: 36, border: "1px solid rgba(255,255,255,0.08)", background: "var(--mid2)", borderRadius: 4 }}>
                    <div style={{ fontSize: 46, marginBottom: 16, opacity: 0.85 }}>
                        {form.icon || "🎾"}
                    </div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: "1.5px", marginBottom: 10, lineHeight: 1.1 }}>
                        {form.name || "Activity Name"}
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.5, lineHeight: 1.8 }}>
                        {form.text || "Description will appear here..."}
                    </div>
                </div>
                <div style={{ marginTop: 12, fontSize: 10, opacity: 0.3, letterSpacing: 1, textTransform: "uppercase" }}>
                    As shown on Activities page
                </div>
            </div>
        </div>
    );
}

export default function AdminActivitiesPage({ navigate }) {
    const [activities, setActivities] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);

    const load = async () => {
        const snap = await getDocs(collection(db, "activities"));
        setActivities(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
    };

    useEffect(() => { load(); }, []);

    const handleEdit = (item) => { setForm(item); setEditing(item.docId); };
    const handleNew = () => { setForm(EMPTY); setEditing("new"); };
    const handleBack = () => { setEditing(null); load(); };
    const handleChange = (key, value) => setForm(f => ({ ...f, [key]: value }));

    const handleSave = async () => {
        setSaving(true);
        const { docId: _docId, ...data } = form;
        if (editing === "new") {
            await addDoc(collection(db, "activities"), data);
        } else {
            await updateDoc(doc(db, "activities", editing), data);
        }
        setSaving(false);
        handleBack();
    };

    const handleDelete = async (docId) => {
        if (!confirm("ลบ activity นี้?")) return;
        await deleteDoc(doc(db, "activities", docId));
        load();
    };

    // LIST
    if (!editing) return (
        <div style={{ minHeight: "100vh", background: "var(--dark)", padding: "120px 40px 40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
                <div>
                    <button className="back-btn" onClick={() => navigate("admin")}>← Dashboard</button>
                    <div className="heading" style={{ fontSize: 32, marginBottom: 0 }}>Activities</div>
                </div>
                <button className="btn-primary" onClick={handleNew}>+ Add Activity</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {activities.map(item => (
                    <div key={item.docId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "var(--mid)", borderRadius: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ fontSize: 28 }}>{item.icon || "🎾"}</div>
                            <div>
                                <div className="venue-name" style={{ fontSize: 18 }}>{item.name}</div>
                                <div style={{ opacity: 0.5, fontSize: 13 }}>{item.text?.slice(0, 80)}...</div>
                            </div>
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
            <div className="heading" style={{ fontSize: 32, marginBottom: 32 }}>{editing === "new" ? "New Activity" : "Edit Activity"}</div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 560px) minmax(280px, 1fr)", gap: 48, alignItems: "start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* Icon picker */}
                    <div>
                        <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 10, textTransform: "uppercase" }}>Icon</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                            {ICON_OPTIONS.map(emoji => (
                                <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => handleChange("icon", emoji)}
                                    style={{
                                        fontSize: 22, width: 46, height: 46, borderRadius: 4, cursor: "pointer",
                                        background: form.icon === emoji ? "rgba(45,168,79,0.2)" : "var(--mid)",
                                        border: form.icon === emoji ? "2px solid var(--green-highlight)" : "1px solid rgba(255,255,255,0.1)",
                                        transition: "all .15s"
                                    }}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                        <input
                            value={form.icon || ""}
                            onChange={e => handleChange("icon", e.target.value)}
                            placeholder="หรือพิมพ์ emoji เอง..."
                            style={{ width: "100%", padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4 }}
                        />
                    </div>
                    {/* Number */}
                    <div>
                        <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 6, textTransform: "uppercase" }}>Number</div>
                        <input
                            value={form.num || ""}
                            onChange={e => handleChange("num", e.target.value)}
                            style={{ width: "100%", padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4 }}
                        />
                    </div>
                    {/* Name */}
                    <div>
                        <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 6, textTransform: "uppercase" }}>Name</div>
                        <input
                            value={form.name || ""}
                            onChange={e => handleChange("name", e.target.value)}
                            style={{ width: "100%", padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4 }}
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 6, textTransform: "uppercase" }}>Description</div>
                        <textarea
                            value={form.text || ""}
                            onChange={e => handleChange("text", e.target.value)}
                            rows={5}
                            style={{ width: "100%", padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4, resize: "vertical" }}
                        />
                    </div>
                    <button className="btn-primary" onClick={handleSave} disabled={saving}>
                        {saving ? "Saving..." : "Save Activity"}
                    </button>
                </div>
                <div style={{ position: "sticky", top: 120 }}>
                    <ActivityPreview form={form} />
                </div>
            </div>
        </div>
    );
}
