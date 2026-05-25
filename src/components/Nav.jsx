import { useState } from "react";

export default function Nav({ navigate, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (p) => { navigate(p); setMenuOpen(false); };

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-links">
          <a onClick={() => go("stories")}>Club Stories</a>
          <a onClick={() => go("venues")}>Club Venues</a>
          <a onClick={() => go("activities")}>Club Activities</a>
          <a onClick={() => go("about")}>About</a>
        </div>
        <span className="nav-logo" onClick={() => go("home")}>KROSS</span>
        <div className="nav-right">
          <a className="desktop-only" onClick={() => go("partner")}>Become a Partner</a>
          <a className="desktop-only" onClick={() => go("membership")}>Membership</a>
          <a className="desktop-only" onClick={() => go("contact")}>Contact</a>
          <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <a onClick={() => go("stories")}>Stories</a>
        <a onClick={() => go("venues")}>Venues</a>
        <a onClick={() => go("activities")}>Activities</a>
        <a onClick={() => go("about")}>About</a>
        <a onClick={() => go("partner")}>Become a Partner</a>
        <a onClick={() => go("membership")}>Membership</a>
        <a onClick={() => go("contact")}>Contact</a>
      </div>
    </>
  );
}