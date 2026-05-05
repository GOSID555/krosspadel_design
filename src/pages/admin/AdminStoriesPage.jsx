import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { uploadImage } from "../../supabaseClient";

const EMPTY = { title: "", excerpt: "", date: "", bg: "", imageUrl: "" };

export default function AdminStoriesPage({ navigate }) {
    const [stories, setStories] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const load = async () => {
            const snap = await getDocs(collection(db, "stories"));
            setStories(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
        };
        load();
    }, []);

    const handleBack = async () => {
        setEditing(null);
        const snap = await getDocs(collection(db, "stories"));
        setStories(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
    };

    const handleEdit = (s) => { setForm(s); setEditing(s.docId); };
    const handleNew = () => { setForm(EMPTY); setEditing("new"); };
    const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const handleSave = async () => {
        setSaving(true);
        const data = Object.fromEntries(
            Object.entries(form).filter(([k]) => k !== "docId")
        );
        if (editing === "new") {
            await addDoc(collection(db, "stories"), data);
        } else {
            await updateDoc(doc(db, "stories", editing), data);
        }
        setSaving(false);
        handleBack();
    };

    const handleDelete = async (docId) => {
        if (!confirm("ลบ story นี้?")) return;
        await deleteDoc(doc(db, "stories", docId));
        handleBack();
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const docId = editing === "new" ? "temp" : editing;
            const imageUrl = await uploadImage(file, "stories", docId);
            setForm(f => ({ ...f, imageUrl }));
        } catch (error) {
            console.error("Upload error:", error);
            alert("ผิดพลาดในการอัปโหลดรูป");
        } finally {
            setUploading(false);
        }
    };

    // LIST
    if (!editing) return (
        <div style={{ minHeight: "100vh", background: "var(--dark)", padding: "120px 40px 40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
                <div>
                    <button className="back-btn" onClick={() => navigate("admin")}>← Dashboard</button>
                    <div className="heading" style={{ fontSize: 32, marginBottom: 0 }}>Stories</div>
                </div>
                <button className="btn-primary" onClick={handleNew}>+ Add Story</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {stories.map(s => (
                    <div key={s.docId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "var(--mid)", borderRadius: 8 }}>
                        <div>
                            <div className="venue-name" style={{ fontSize: 18 }}>{s.title}</div>
                            <div style={{ opacity: 0.5, fontSize: 13 }}>{s.date} · {s.excerpt?.slice(0, 60)}...</div>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                            <button className="btn-ghost" onClick={() => handleEdit(s)}>Edit</button>
                            <button onClick={() => handleDelete(s.docId)} style={{ background: "none", border: "1px solid #ff6b6b", color: "#ff6b6b", padding: "8px 20px", cursor: "pointer", borderRadius: 2 }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // FORM
    const fields = [
        ["title", "Title"],
        ["excerpt", "Excerpt"],
        ["date", "Date (e.g. 12 Apr 2025)"],
        ["bg", "BG Gradient"],
    ];

    return (
        <div style={{ minHeight: "100vh", background: "var(--dark)", padding: "120px 40px 40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                <button className="back-btn" onClick={handleBack}>← Back to List</button>
                <button className="back-btn" onClick={() => navigate("admin")}>← Dashboard</button>
            </div>
            <div className="heading" style={{ fontSize: 32, marginBottom: 32 }}>{editing === "new" ? "New Story" : "Edit Story"}</div>
            <div style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 16 }}>
                {fields.map(([key, label]) => (
                    <div key={key}>
                        <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
                        {key === "excerpt"
                            ? <textarea
                                value={form[key] || ""}
                                onChange={e => handleChange(key, e.target.value)}
                                rows={4}
                                style={{ width: "100%", padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4, resize: "vertical" }}
                            />
                            : <input
                                value={form[key] || ""}
                                onChange={e => handleChange(key, e.target.value)}
                                style={{ width: "100%", padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4 }}
                            />
                        }
                    </div>
                ))}
                <div style={{ padding: 20, background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
                    <div style={{ marginBottom: 16 }}>
                        <div className="tag">Image Upload</div>
                        <div style={{ opacity: 0.7, fontSize: 13, marginBottom: 12 }}>Upload story cover image</div>
                        <label style={{ display: "inline-block", cursor: "pointer" }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                style={{ display: "none" }}
                            />
                            <button
                                type="button"
                                className="btn-ghost"
                                disabled={uploading}
                                onClick={(e) => { e.currentTarget.previousElementSibling?.click(); }}
                            >
                                {uploading ? "Uploading..." : "Choose Image"}
                            </button>
                        </label>
                    </div>
                    {form.imageUrl && (
                        <img
                            src={form.imageUrl}
                            alt="Story cover"
                            style={{ maxWidth: 200, borderRadius: 4, marginTop: 12 }}
                        />
                    )}
                </div>
                <button className="btn-primary" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Story"}
                </button>
            </div>
        </div>
    );
}