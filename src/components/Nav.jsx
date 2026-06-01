import { useState } from "react";

export default function Nav({ navigate, scrolled, page }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = page && page.startsWith("admin");
  const go = (p) => { navigate(p); setMenuOpen(false); };

  if (isAdmin) return (
    <nav className={scrolled ? "scrolled" : ""}>
      <img src="/image/kross_logo.png" alt="KROSS" onClick={() => go("admin")} style={{ height: 48, cursor: "pointer" }} />
    </nav>
  );

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-links">
          <a onClick={() => go("about")}>We Are Kross</a>
          <a onClick={() => go("venues")}>We Are Venues</a>
          <a onClick={() => go("activities")}>We Are Activities</a>
          <a onClick={() => go("lifestyle")}>We Are Lifestyle</a>
          <a onClick={() => go("stories")}>We Are Stories</a>
        </div>
        <img src="/image/kross_logo.png" alt="KROSS" onClick={() => go("home")} style={{ height: 48, cursor: "pointer", position: "absolute", left: "50%", transform: "translateX(-50%)" }} />
        <div className="nav-right">
          <a className="desktop-only" onClick={() => go("krosspark")}>Kross Park</a>
          <a className="desktop-only" onClick={() => go("partner")}>Become a Partner</a>
          <a className="desktop-only" onClick={() => go("membership")}>Book & Pricing</a>
          <a className="desktop-only" onClick={() => go("contact")}>Contact</a>
          <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <a onClick={() => go("about")}>We Are Kross</a>
        <a onClick={() => go("venues")}>We Are Venues</a>
        <a onClick={() => go("activities")}>We Are Activities</a>
        <a onClick={() => go("lifestyle")}>We Are Lifestyle</a>
        <a onClick={() => go("stories")}>We Are Stories</a>
        <a onClick={() => go("krosspark")}>Kross Park</a>
        <a onClick={() => go("partner")}>Become a Partner</a>
        <a onClick={() => go("membership")}>Book & Pricing</a>
        <a onClick={() => go("contact")}>Contact</a>
      </div>
    </>
  );
}