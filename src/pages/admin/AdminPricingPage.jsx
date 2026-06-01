import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const CATEGORIES = [
  { key: "court_rental", label: "Court Rental" },
  { key: "coaching", label: "Coaching" },
  { key: "activities", label: "Activities" },
  { key: "racket_rental", label: "Racket Rental" },
];

const EMPTY_ROW = { label: "", price: "", unit: "", note: "" };
const EMPTY = { category: "court_rental", name: "", order: 0, rows: [{ ...EMPTY_ROW }] };

const inputStyle = {
  width: "100%", padding: "10px 14px",
  background: "var(--mid)", border: "1px solid rgba(255,255,255,0.1)",
  color: "var(--white)", borderRadius: 4, fontSize: 13,
};

const smallInput = { ...inputStyle, padding: "8px 12px" };

export default function AdminPricingPage({ navigate }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const snap = await getDocs(collection(db, "pricing"));
    setItems(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
  };

  useEffect(() => {
    let cancelled = false;
    getDocs(collection(db, "pricing")).then(snap => {
      if (!cancelled) setItems(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
    });
    return () => { cancelled = true; };
  }, []);

  const handleEdit = (item) => {
    const rows = Array.isArray(item.rows)
      ? item.rows
      : (() => { try { return JSON.parse(item.rows); } catch { return [{ ...EMPTY_ROW }]; } })();
    setForm({ ...item, rows: rows.length ? rows : [{ ...EMPTY_ROW }] });
    setEditing(item.docId);
  };

  const handleNew = () => { setForm({ ...EMPTY, rows: [{ ...EMPTY_ROW }] }); setEditing("new"); };
  const handleBack = () => { setEditing(null); load(); };
  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleRowChange = (i, key, val) => {
    setForm(f => {
      const rows = [...f.rows];
      rows[i] = { ...rows[i], [key]: val };
      return { ...f, rows };
    });
  };

  const addRow = () => setForm(f => ({ ...f, rows: [...f.rows, { ...EMPTY_ROW }] }));
  const removeRow = (i) => setForm(f => ({ ...f, rows: f.rows.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    setSaving(true);
    const { docId: _docId, ...data } = form;
    data.order = Number(data.order) || 0;
    if (editing === "new") {
      await addDoc(collection(db, "pricing"), data);
    } else {
      await updateDoc(doc(db, "pricing", editing), data);
    }
    setSaving(false);
    handleBack();
  };

  const handleDelete = async (docId) => {
    if (!confirm("ลบรายการนี้?")) return;
    await deleteDoc(doc(db, "pricing", docId));
    load();
  };

  // LIST
  if (!editing) {
    const byCategory = CATEGORIES.map(cat => ({
      ...cat,
      items: items
        .filter(i => i.category === cat.key)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    }));

    return (
      <div style={{ minHeight: "100vh", background: "var(--dark)", padding: "120px 40px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <div>
            <button className="back-btn" onClick={() => navigate("admin")}>← Dashboard</button>
            <div className="heading" style={{ fontSize: 32, marginBottom: 0 }}>Pricing</div>
          </div>
          <button className="btn-primary" onClick={handleNew}>+ Add Item</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {byCategory.map(cat => (
            <div key={cat.key}>
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "2px",
                textTransform: "uppercase", opacity: 0.4, marginBottom: 12
              }}>{cat.label}</div>
              {cat.items.length === 0 ? (
                <div style={{ opacity: 0.25, fontSize: 13, padding: "16px 0" }}>No items yet</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {cat.items.map(item => {
                    const rows = Array.isArray(item.rows) ? item.rows : [];
                    return (
                      <div key={item.docId} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "16px 20px", background: "var(--mid)", borderRadius: 6
                      }}>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
                          <div style={{ opacity: 0.4, fontSize: 12 }}>
                            {rows.length} row{rows.length !== 1 ? "s" : ""} · order {item.order ?? 0}
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <button className="btn-ghost" onClick={() => handleEdit(item)}>Edit</button>
                          <button
                            onClick={() => handleDelete(item.docId)}
                            style={{ background: "none", border: "1px solid #ff6b6b", color: "#ff6b6b", padding: "8px 18px", cursor: "pointer", borderRadius: 2, fontSize: 13 }}
                          >Delete</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // FORM
  return (
    <div style={{ minHeight: "100vh", background: "var(--dark)", padding: "120px 40px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <button className="back-btn" onClick={handleBack}>← Back</button>
        <button className="back-btn" onClick={() => navigate("admin")}>← Dashboard</button>
      </div>
      <div className="heading" style={{ fontSize: 32, marginBottom: 32 }}>
        {editing === "new" ? "New Pricing Item" : "Edit Pricing Item"}
      </div>

      <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Category */}
        <div>
          <div style={{ fontSize: 11, opacity: 0.45, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 8 }}>Category</div>
          <select
            value={form.category}
            onChange={e => handleChange("category", e.target.value)}
            style={{ ...inputStyle, appearance: "none" }}
          >
            {CATEGORIES.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
        </div>

        {/* Name */}
        <div>
          <div style={{ fontSize: 11, opacity: 0.45, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 8 }}>
            Name {form.category === "court_rental" ? "(e.g. KROSS Onnut)" : "(e.g. Personal Coaching)"}
          </div>
          <input
            value={form.name}
            onChange={e => handleChange("name", e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Order */}
        <div>
          <div style={{ fontSize: 11, opacity: 0.45, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 8 }}>Display Order</div>
          <input
            type="number"
            value={form.order}
            onChange={e => handleChange("order", e.target.value)}
            style={{ ...inputStyle, width: 120 }}
          />
        </div>

        {/* Rows */}
        <div>
          <div style={{ fontSize: 11, opacity: 0.45, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>
            Pricing Rows
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {form.rows.map((row, i) => (
              <div key={i} style={{
                background: "var(--mid)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 6, padding: "16px"
              }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <div style={{ flex: 2 }}>
                    <div style={{ fontSize: 10, opacity: 0.4, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Label</div>
                    <input
                      value={row.label}
                      onChange={e => handleRowChange(i, "label", e.target.value)}
                      placeholder="e.g. Off-Peak"
                      style={smallInput}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, opacity: 0.4, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Price (฿)</div>
                    <input
                      value={row.price}
                      onChange={e => handleRowChange(i, "price", e.target.value)}
                      placeholder="500"
                      style={smallInput}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, opacity: 0.4, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Unit</div>
                    <input
                      value={row.unit}
                      onChange={e => handleRowChange(i, "unit", e.target.value)}
                      placeholder="/ hr"
                      style={smallInput}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, opacity: 0.4, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Note (optional)</div>
                    <input
                      value={row.note}
                      onChange={e => handleRowChange(i, "note", e.target.value)}
                      placeholder="e.g. Mon–Fri before 17:00"
                      style={smallInput}
                    />
                  </div>
                  {form.rows.length > 1 && (
                    <button
                      onClick={() => removeRow(i)}
                      style={{ background: "none", border: "1px solid rgba(255,107,107,0.4)", color: "#ff6b6b", padding: "8px 14px", cursor: "pointer", borderRadius: 3, fontSize: 13, flexShrink: 0 }}
                    >✕</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={addRow}
            style={{ marginTop: 10, background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", padding: "8px 20px", cursor: "pointer", borderRadius: 3, fontSize: 13 }}
          >+ Add Row</button>
        </div>

        <button className="btn-primary" onClick={handleSave} disabled={saving} style={{ marginTop: 8 }}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
