import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const EMPTY = { name: "", price: "", perks: "", featured: false };

export default function AdminMembershipPage({ navigate }) {
    const [plans, setPlans] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);

    const load = async () => {
        const snap = await getDocs(collection(db, "plans"));
        setPlans(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
    };

    useEffect(() => {
        load();
    }, []);

    const handleEdit = (item) => { setForm(item); setEditing(item.docId); };
    const handleNew = () => { setForm(EMPTY); setEditing("new"); };
    const handleBack = () => { setEditing(null); load(); };
    const handleChange = (key, value) => setForm(f => ({ ...f, [key]: value }));

    const handleSave = async () => {
        setSaving(true);
        const data = { name: form.name, price: form.price, perks: form.perks, featured: !!form.featured };
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

    if (!editing) return (
        <div style={{ minHeight: "100vh", background: "var(--dark)", padding: 40 }}>
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
                            <div className="venue-name" style={{ fontSize: 18 }}>{item.name}</div>
                            <div style={{ opacity: 0.5, fontSize: 13 }}>{item.price} · {item.perks?.slice(0, 80)}...</div>
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

    return (
        <div style={{ minHeight: "100vh", background: "var(--dark)", padding: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                <button className="back-btn" onClick={handleBack}>← Back to List</button>
                <button className="back-btn" onClick={() => navigate("admin")}>← Dashboard</button>
            </div>
            <div className="heading" style={{ fontSize: 32, marginBottom: 32 }}>{editing === "new" ? "New Plan" : "Edit Plan"}</div>
            <div style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                    ["name", "Name"],
                    ["price", "Price"],
                    ["perks", "Perks"],
                ].map(([key, label]) => (
                    <div key={key}>
                        <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
                        {key === "perks" ? (
                            <textarea
                                value={form[key] || ""}
                                onChange={e => handleChange(key, e.target.value)}
                                rows={4}
                                style={{ width: "100%", padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4, resize: "vertical" }}
                            />
                        ) : (
                            <input
                                value={form[key] || ""}
                                onChange={e => handleChange(key, e.target.value)}
                                style={{ width: "100%", padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4 }}
                            />
                        )}
                    </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <input
                        id="featured-plan"
                        type="checkbox"
                        checked={!!form.featured}
                        onChange={e => handleChange("featured", e.target.checked)}
                    />
                    <label htmlFor="featured-plan" style={{ opacity: 0.8 }}>Featured plan</label>
                </div>
                <button className="btn-primary" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Plan"}
                </button>
            </div>
        </div>
    );
}
