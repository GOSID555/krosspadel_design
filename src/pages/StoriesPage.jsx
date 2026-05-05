import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function StoriesPage({ navigate }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "stories"));
      setStories(snap.docs.map(d => ({ docId: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <div>
      <div className="inner-hero">
        <div className="inner-hero-bg" />
        <div>
          <button className="back-btn" onClick={() => navigate("home")}>← Back</button>
          <div className="inner-hero-title">Our Stories</div>
        </div>
      </div>
      <div className="inner-section">
        <div className="stories-list">
          {stories.map(s => (
            <div className="story-item" key={s.docId}>
              <div className="story-item-img">
                {s.imageUrl ? (
                  <img src={s.imageUrl} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div className="story-item-img-inner" style={{ background: s.bg }} />
                )}
              </div>
              <div className="story-item-body">
                <div className="story-item-cat">{s.cat}</div>
                <div className="story-item-title">{s.title}</div>
                <div className="story-item-excerpt">{s.excerpt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}