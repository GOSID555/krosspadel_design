import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { plans as fallbackPlans } from "../data";

export default function MembershipPage({ navigate, notify }) {
  const [plans, setPlans] = useState(fallbackPlans);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "plans"));
      const docs = snap.docs.map(d => ({ docId: d.id, ...d.data() }));
      if (docs.length > 0) setPlans(docs);
    };
    load();
  }, []);

  return (
    <div>
      <div className="inner-hero">
        <div className="inner-hero-bg" />
        <div>
          <button className="back-btn" onClick={() => navigate("home")}>← Back</button>
          <div className="inner-hero-title">Membership</div>
        </div>
      </div>
      <div className="inner-section">
        <div className="membership-page-grid">
          <div>
            <div className="tag">Join The Club</div>
            <div className="heading">Choose<br />Your<br />Plan.</div>
            <p className="body-txt">All plans include access to all KROSS venues, priority booking, and member-only events.</p>
          </div>
          <div>
            {plans.map(p => (
              <div className={`plan-card-lg${p.featured ? " featured" : ""}`} key={p.name}>
                <div className="plan-card-lg-header">
                  <div className="plan-name-lg">{p.name}</div>
                  <div style={{ textAlign: "right" }}>
                    <div className="plan-price-lg">{p.price}</div>
                    <div className="plan-per">/month</div>
                  </div>
                </div>
                <div className="plan-perks">{p.perks}</div>
                <br />
                <button
                  className={p.featured ? "btn-primary" : "btn-ghost"}
                  onClick={() => notify(`${p.name} plan — we'll contact you shortly`)}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}