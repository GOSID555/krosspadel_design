import { useState, useEffect, useContext, useRef } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { VenueContext } from "../../context/VenueContext";
import { uploadImage } from "../../supabaseClient";
import { ChromePicker } from "react-color";

const EMPTY = {
    name: "", loc: "", region: "", num: "", status: "Open", hours: "", address: "", phone: "", courts: "", intro: "",
    bg: "", bg1: "", imgBg1: "", imgBg2: "", imgCaption1: "", imgCaption2: "",
    courtText: "", courtText2: "", clubText: "", clubText2: "", features: [], imageUrl: ""
};

export default function AdminVenuesPage({ navigate }) {
    const { refreshVenues } = useContext(VenueContext);
    const [venues, setVenues] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [colorPickerOpen, setColorPickerOpen] = useState(null);
    const colorPickerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
                setColorPickerOpen(null);
            }
        };
        if (colorPickerOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [colorPickerOpen]);

    const load = async () => {
        const snap = await getDocs(collection(db, "venues"));
        setVenues(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
    };

    useEffect(() => {
        const load = async () => {
            const snap = await getDocs(collection(db, "venues"));
            setVenues(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
        };
        load();
    }, []);

    const handleEdit = (v) => { setForm(v); setEditing(v.docId); };
    const handleNew = () => { setForm(EMPTY); setEditing("new"); };
    const handleBack = () => { setEditing(null); load(); };

    const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));
    const handleFeatureChange = (index, key, value) => setForm(f => {
        const features = [...(f.features || [])];
        features[index] = { ...features[index], [key]: value };
        return { ...f, features };
    });
    const handleFeatureAdd = () => setForm(f => ({ ...f, features: [...(f.features || []), { num: "", label: "" }] }));
    const handleFeatureRemove = (index) => setForm(f => ({ ...f, features: (f.features || []).filter((_, i) => i !== index) }));

    const handleSave = async () => {
        setSaving(true);
        const { docId: _docId, ...data } = form;
        if (editing === "new") {
            await addDoc(collection(db, "venues"), data);
        } else {
            await updateDoc(doc(db, "venues", editing), data);
        }
        await refreshVenues();
        setSaving(false);
        handleBack();
    };

    const handleDelete = async (docId) => {
        if (!confirm("ลบ venue นี้?")) return;
        await deleteDoc(doc(db, "venues", docId));
        load();
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const docId = editing === "new" ? "temp" : editing;
            const imageUrl = await uploadImage(file, "venues", docId);
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
                    <div className="heading" style={{ fontSize: 32, marginBottom: 0 }}>Venues</div>
                </div>
                <button className="btn-primary" onClick={handleNew}>+ Add Venue</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {venues.map(v => (
                    <div key={v.docId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "var(--mid)", borderRadius: 8 }}>
                        <div>
                            <div className="venue-name" style={{ fontSize: 18 }}>{v.name}</div>
                            <div style={{ opacity: 0.5, fontSize: 13 }}>{v.loc} · {v.status}</div>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                            <button className="btn-ghost" onClick={() => handleEdit(v)}>Edit</button>
                            <button onClick={() => handleDelete(v.docId)} style={{ background: "none", border: "1px solid #ff6b6b", color: "#ff6b6b", padding: "8px 20px", cursor: "pointer", borderRadius: 2 }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // FORM
    const fields = [
        ["name", "Name"], ["loc", "Location"], ["region", "Region"],
        ["num", "Number (01)"], ["status", "Status"], ["hours", "Hours"],
        ["address", "Address"], ["phone", "Phone"], ["courts", "Courts"],
        ["intro", "Intro"], ["bg", "BG Gradient"], ["bg1", "Hero BG"],
        ["imgBg1", "Image BG 1"], ["imgBg2", "Image BG 2"],
        ["imgCaption1", "Image Caption 1"], ["imgCaption2", "Image Caption 2"],
        ["courtText", "Court Section Text"], ["courtText2", "Court Section Text 2"],
        ["clubText", "Club Section Text"], ["clubText2", "Club Section Text 2"],
    ];

    return (
        <div style={{ minHeight: "100vh", background: "var(--dark)", padding: "120px 40px 40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
                <button className="back-btn" onClick={handleBack}>← Back to List</button>
                <button className="back-btn" onClick={() => navigate("admin")}>← Dashboard</button>
            </div>
            <div className="heading" style={{ fontSize: 32, marginBottom: 32 }}>{editing === "new" ? "New Venue" : "Edit Venue"}</div>
            <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: 16 }}>
                {fields.map(([key, label]) => (
                    <div key={key}>
                        <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
                        {key === "bg" || key === "bg1" ? (
                            <div style={{ display: "flex", gap: 12, alignItems: "center", position: "relative" }}>
                                <div
                                    onClick={() => setColorPickerOpen(colorPickerOpen === key ? null : key)}
                                    style={{
                                        width: 60, height: 60, background: form[key] || "#000",
                                        borderRadius: 4, cursor: "pointer", border: "2px solid rgba(255,255,255,0.2)"
                                    }}
                                />
                                <input
                                    value={form[key] || ""}
                                    onChange={e => handleChange(key, e.target.value)}
                                    placeholder="#000000"
                                    style={{ flex: 1, padding: "12px 16px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4 }}
                                />
                                {colorPickerOpen === key && (
                                    <div ref={colorPickerRef} style={{ position: "absolute", top: 0, left: 80, zIndex: 1000, background: "var(--mid)", padding: 12, borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)" }}>
                                        <ChromePicker
                                            color={form[key] || "#000"}
                                            onChange={(color) => handleChange(key, color.hex)}
                                        />
                                        <button
                                            onClick={() => setColorPickerOpen(null)}
                                            style={{ width: "100%", marginTop: 12, padding: "8px 12px", background: "var(--green-highlight)", border: "none", color: "white", borderRadius: 4, cursor: "pointer", fontSize: 12 }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (key === "intro" || key.includes("Text") || key.includes("Caption")) ? (
                            <textarea
                                value={form[key] || ""}
                                onChange={e => handleChange(key, e.target.value)}
                                rows={key === "intro" || key.includes("Text") ? 4 : 2}
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
                <div style={{ padding: 20, background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
                    <div style={{ marginBottom: 16 }}>
                        <div className="tag">Image Upload</div>
                        <div style={{ opacity: 0.7, fontSize: 13, marginBottom: 12 }}>Upload venue cover image</div>
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
                            alt="Venue cover"
                            style={{ maxWidth: 200, borderRadius: 4, marginTop: 12 }}
                        />
                    )}
                </div>
                <div style={{ padding: 20, background: "rgba(255,255,255,0.02)", borderRadius: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <div>
                            <div className="tag">Venue Features</div>
                            <div style={{ opacity: 0.7, fontSize: 13 }}>Add or remove feature cards shown on venue detail pages.</div>
                        </div>
                        <button className="btn-ghost" onClick={handleFeatureAdd}>+ Add Feature</button>
                    </div>
                    {(form.features || []).map((feature, idx) => (
                        <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12, alignItems: "flex-end", marginBottom: 12 }}>
                            <div>
                                <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 6 }}>Feature Number</div>
                                <input
                                    value={feature.num || ""}
                                    onChange={e => handleFeatureChange(idx, "num", e.target.value)}
                                    style={{ width: "100%", padding: "10px 14px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4 }}
                                />
                            </div>
                            <div>
                                <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 6 }}>Feature Label</div>
                                <input
                                    value={feature.label || ""}
                                    onChange={e => handleFeatureChange(idx, "label", e.target.value)}
                                    style={{ width: "100%", padding: "10px 14px", background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--white)", borderRadius: 4 }}
                                />
                            </div>
                            <button
                                onClick={() => handleFeatureRemove(idx)}
                                style={{ background: "none", border: "1px solid #ff6b6b", color: "#ff6b6b", padding: "10px 16px", cursor: "pointer", borderRadius: 4 }}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <button className="btn-primary" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Venue"}
                </button>
            </div>
        </div>
    );
}