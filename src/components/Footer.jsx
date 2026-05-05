import { useContext } from "react";
import { VenueContext } from "../context/VenueContext";

export default function Footer({ navigate }) {
  const { venues } = useContext(VenueContext);

  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-logo">KROSS</div>
          <div className="footer-tagline">Bangkok's leading padel club.<br />Play. Train. Connect.</div>
        </div>
        <div className="footer-col">
          <h6>Venues</h6>
          {venues.map(v => <a key={v.id} onClick={() => navigate("venue-" + v.id)}>{v.name}</a>)}
        </div>
        <div className="footer-col">
          <h6>Club</h6>
          {[["activities", "Activities"], ["membership", "Membership"], ["stories", "Stories"]].map(([p, l]) => (
            <a key={p} onClick={() => navigate(p)}>{l}</a>
          ))}
        </div>
        <div className="footer-col">
          <h6>Connect</h6>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a>LINE @krosspadel</a>
          <a onClick={() => navigate("contact")}>Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 KROSS Padel Club</span>
        <span style={{ display: "flex", gap: 16 }}>
          <span>Privacy Policy · Terms</span>
          <span onClick={() => navigate("admin-login")} style={{ opacity: 0.1, cursor: "pointer", fontSize: 11 }}>admin</span>
        </span>
      </div>
    </footer>
  );
}