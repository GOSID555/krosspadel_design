import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { activities as fallbackActivities } from "../data";

export default function ActivitiesPage({ navigate, openBook }) {
  const [activities, setActivities] = useState(fallbackActivities);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "activities"));
      const docs = snap.docs.map(d => ({ docId: d.id, ...d.data() }));
      if (docs.length > 0) setActivities(docs);
    };
    load();
  }, []);

  return (
    <div>
      <div className="inner-hero">
        <div className="inner-hero-bg" />
        <div>
          <button className="back-btn" onClick={() => navigate("home")}>← Back</button>
          <div className="inner-hero-title">Our Activities</div>
        </div>
      </div>
      <div className="inner-section">
        <p className="body-txt">From elite competition to casual weekend rallies — something for every player.</p>
        <div className="activities-list">
          {activities.map(a => (
            <div className="activity-item" key={a.name}>
              <div className="activity-num">{a.num}</div>
              <div className="activity-name">{a.name}</div>
              <div className="activity-text">{a.text}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 64, textAlign: "center" }}>
          <button className="btn-primary" onClick={openBook}>Book Now</button>
        </div>
      </div>
    </div>
  );
}