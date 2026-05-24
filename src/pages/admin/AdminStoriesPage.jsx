import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { uploadImage } from "../../supabaseClient";

const EMPTY = { title: "", excerpt: "", date: "", cat: "", bg: "", imageUrl: "" };

function StoryPreview({ form }) {
    return (
        <div style={{ background: "var(--mid)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-highlight)" }} />
                <div style={{ fontSize: 11, opacity: 0.5, textTransform: "uppercase", letterSpacing: 2 }}>Live Preview</div>
            </div>
            <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}>
                {/* Gallery card preview (featured) */}
                <div style={{ position: "relative", height: 240, overflow: "hidden" }}>
                    <div style={{
                        position: "absolute", inset: 0,
                        background: form.imageUrl
                            ? `url(${form.imageUrl}) center/cover no-repeat`
                            : (form.bg || "var(--mid2)")
                    }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.1) 55%, transparent 100%)" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px" }}>
                        {form.cat && <div style={{ fontSize: 9, letterSpacing: "3.5px", textTransform: "uppercase", color: "var(--green-highlight)", marginBottom: 8 }}>{form.cat}</div>}
                        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 26, letterSpacing: "1.5px", lineHeight: 1, marginBottom: 6 }}>
                            {form.title || "Story Title"}
                        </div>
                        <div style={{ fontSize: 10, opacity: .4, letterSpacing: "1.5px" }}>{form.date}</div>
                    </div>
                </div>

                {/* List card preview */}
                <div style={{ padding: 20, borderTop: "2px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ fontSize: 10, opacity: 0.35, marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>As Story Card</div>
                    <div style={{ background: "var(--mid2)", borderRadius: 4, overflow: "hidden" }}>
                        <div style={{
                            aspectRatio: "4/3",
                            background: form.imageUrl
                                ? `url(${form.imageUrl}) center/cover no-repeat`
                                : (form.bg || "#1a1a1a")
                        }} />
                        <div style={{ padding: "14px 16px" }}>
                            {form.cat && <div style={{ fontSize: 8, letterSpacing: "3px", textTransform: "uppercase", color: "var(--green-highlight)", marginBottom: 6 }}>{form.cat}</div>}
                            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: 18, letterSpacing: "1px", marginBottom: 6, lineHeight: 1.1 }}>
                                {form.title || "Story Title"}
                            </div>
                            <div style={{ fontSize: 10, opacity: .4, marginBottom: 8 }}>{form.date}</div>
                            {form.excerpt && <div style={{ fontSize: 11, opacity: .55, lineHeight: 1.6 }}>{form.excerpt.slice(0, 100)}{form.excerpt.length > 100 ? "…" : ""}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminStoriesPage({ navigate }) {
    const [stories, setStories] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    const load = async () => {
        const snap = await getDocs(collection(db, "stories"));
        setStories(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
    };

    useEffect(() => { load(); }, []);

    const handleBack = () => { setEditing(null); load(); };
    const handleEdit = (s) => { setForm(s); setEditing(s.docId); };
    const handleNew = () => { setForm(EMPTY); setEditing("new"); };
    const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const handleSave = async () => {
        setSaving(true);
        const { docId: _docId, ...data } = form;
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
        load();
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
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            {s.imageUrl && <img src={s.imageUrl} alt="" style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 3, opacity: .8 }} />}
                            <div>
                                <div className="venue-name" style={{ fontSize: 18 }}>{s.title}</div>
                                <div style={{ opacity: 0.5, fontSize: 13 }}>{s.cat ? `${s.cat} · ` : ""}{s.date}</div>
                            </div>
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
        ["cat", "Category (e.g. Community, Tournament)"],
        ["excerpt", "Excerpt"],
        ["bg", "BG Color (fallback if no image)"],
    ];

    return (
        <div style={{ minHeight: "100vh", background: "var(--dark)", padding: "120px 40px 40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                <button className="back-btn" onClick={handleBack}>← Back to List</button>
                <button className="back-btn" onClick={() => navigate("admin")}>← Dashboard</button>
            </div>
            <div className="heading" style={{ fontSize: 32, marginBottom: 32 }}>{editing === "new" ? "New Story" : "Edit Story"}</div>
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 560px) minmax(280px, 1fr)", gap: 48, alignItems: "start" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
                    {/* Date */}
                    <div>
                        <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 6, textTransform: "uppercase" }}>Date</div>
                        <input
                            type="date"
                            value={form.date || ""}
                            onChange={e => handleChange("date", e.target.value)}
                            style={{ width: "100%", padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4, colorScheme: "dark" }}
                        />
                    </div>
                    {/* Image upload */}
                    <div style={{ padding: 20, background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
                        <div className="tag" style={{ marginBottom: 8 }}>Cover Image</div>
                        <div style={{ opacity: 0.7, fontSize: 13, marginBottom: 12 }}>Upload story cover image (overrides BG color)</div>
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
                        {form.imageUrl && (
                            <div style={{ marginTop: 12 }}>
                                <img src={form.imageUrl} alt="Cover" style={{ maxWidth: "100%", maxHeight: 160, borderRadius: 4, objectFit: "cover" }} />
                                <button
                                    onClick={() => handleChange("imageUrl", "")}
                                    style={{ display: "block", marginTop: 8, fontSize: 11, background: "none", border: "1px solid #ff6b6b", color: "#ff6b6b", padding: "6px 12px", cursor: "pointer", borderRadius: 3 }}
                                >
                                    Remove Image
                                </button>
                            </div>
                        )}
                    </div>
                    <button className="btn-primary" onClick={handleSave} disabled={saving}>
                        {saving ? "Saving..." : "Save Story"}
                    </button>
                </div>
                <div style={{ position: "sticky", top: 120 }}>
                    <StoryPreview form={form} />
                </div>
            </div>
        </div>
    );
}
