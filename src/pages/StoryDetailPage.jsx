import Footer from "../components/Footer";

export default function StoryDetailPage({ navigate }) {
  return (
    <div>
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 56px)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(45,168,79,0.07) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />
        <div style={{
          fontFamily: "'Gotham Narrow', sans-serif",
          fontSize: "clamp(100px, 18vw, 180px)",
          lineHeight: 1,
          color: "rgba(255,255,255,0.04)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap"
        }}>KROSS</div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 560 }}>
          <div className="tag" style={{ marginBottom: 24 }}>Coming Soon</div>
          <div className="heading" style={{ fontSize: "clamp(36px, 6vw, 64px)", marginBottom: 20, lineHeight: 1.05 }}>
            Story Detail<br />In Development
          </div>
          <p className="body-txt" style={{ fontSize: 16, lineHeight: 1.9, marginBottom: 48 }}>
            Full story pages are coming in a future update. Stay tuned for in-depth member stories, match recaps, and community highlights from the KROSS world.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => navigate("stories")}>← Back to Stories</button>
            <button className="btn-ghost" onClick={() => navigate("home")}>Go Home</button>
          </div>
        </div>
      </section>
      <Footer navigate={navigate} />
    </div>
  );
}
