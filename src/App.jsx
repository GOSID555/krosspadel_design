import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --black:#080808;--white:#f2f0ea;--accent:#2d6a2d;
    --accent-light:#3d8f3d;--accent-bright:#4aab4a;
    --mid:#111;--border:rgba(255,255,255,0.09);--muted:rgba(242,240,234,0.5);
  }
  body{background:var(--black);color:var(--white);font-family:'Barlow',sans-serif;font-weight:300;overflow-x:hidden}
  nav{
    position:fixed;top:0;left:0;right:0;z-index:200;
    display:flex;align-items:center;justify-content:space-between;
    padding:0 52px;height:62px;
    background:rgba(8,8,8,0.88);backdrop-filter:blur(16px);
    border-bottom:1px solid var(--border);
  }
  .nav-links{display:flex;gap:32px;align-items:center}
  .nav-links a,.nav-right a{
    font-size:10.5px;letter-spacing:2.5px;text-transform:uppercase;
    color:var(--white);text-decoration:none;opacity:.65;
    transition:opacity .2s,color .2s;cursor:pointer;
  }
  .nav-links a:hover,.nav-right a:hover{opacity:1;color:var(--accent-bright)}
  .nav-logo{
    font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:5px;
    color:var(--white);text-decoration:none;cursor:pointer;
    position:absolute;left:50%;transform:translateX(-50%);
  }
  .nav-right{display:flex;gap:28px;align-items:center}
  .lang-toggle{
    font-size:10px;letter-spacing:2px;text-transform:uppercase;
    background:none;border:1px solid var(--border);color:var(--white);
    padding:5px 12px;cursor:pointer;font-family:'Barlow',sans-serif;
    opacity:.65;transition:all .2s;
  }
  .lang-toggle:hover{opacity:1;border-color:var(--accent-bright);color:var(--accent-bright)}
  #hero{height:100vh;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;}
  .hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 60% 40%, #0d2a0d 0%, #0a0a0a 60%);}
  .court-lines{position:absolute;inset:0;opacity:.06;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:80px 80px;}
  .hero-glow{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(45,106,45,0.18) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);animation:pulse 4s ease-in-out infinite;}
  @keyframes pulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:1}50%{transform:translate(-50%,-50%) scale(1.15);opacity:.7}}
  .hero-content{position:relative;z-index:2;text-align:center;}
  .hero-eyebrow{font-size:11px;letter-spacing:5px;text-transform:uppercase;opacity:.5;margin-bottom:16px;animation:fadeUp .8s ease both;animation-delay:.2s;}
  .hero-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(90px,15vw,180px);letter-spacing:8px;line-height:.9;animation:fadeUp .8s ease both;animation-delay:.35s;}
  .hero-title span{color:var(--accent-bright)}
  .hero-sub{font-size:13px;letter-spacing:3px;text-transform:uppercase;opacity:.5;margin-top:20px;margin-bottom:44px;animation:fadeUp .8s ease both;animation-delay:.5s;}
  .hero-actions{display:flex;gap:16px;justify-content:center;animation:fadeUp .8s ease both;animation-delay:.65s;}
  .btn-primary{display:inline-block;background:var(--accent);color:var(--white);font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;padding:15px 40px;border:none;cursor:pointer;font-family:'Barlow',sans-serif;transition:transform .2s,box-shadow .2s,background .2s;}
  .btn-primary:hover{transform:translateY(-3px);background:var(--accent-light);box-shadow:0 12px 40px rgba(45,106,45,.35)}
  .btn-ghost{display:inline-block;border:1px solid rgba(255,255,255,.3);color:var(--white);font-size:11px;letter-spacing:3px;text-transform:uppercase;padding:15px 40px;cursor:pointer;background:none;font-family:'Barlow',sans-serif;transition:all .2s;}
  .btn-ghost:hover{border-color:var(--accent-bright);color:var(--accent-bright);background:rgba(45,106,45,.08)}
  @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
  .scroll-ind{position:absolute;bottom:36px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:10px;font-size:9px;letter-spacing:3px;text-transform:uppercase;opacity:.35;animation:fadeUp 1s ease both;animation-delay:1s;}
  .scroll-line{width:1px;height:48px;background:var(--white);transform-origin:top;animation:scrollAnim 1.8s ease infinite}
  @keyframes scrollAnim{0%{transform:scaleY(0)}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
  section{padding:120px 52px}
  .tag{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:var(--accent-bright);margin-bottom:16px}
  .heading{font-family:'Bebas Neue',sans-serif;font-size:clamp(52px,7vw,96px);letter-spacing:3px;line-height:.95;margin-bottom:36px;}
  .body-txt{font-size:15px;line-height:1.85;opacity:.6;max-width:500px}
  .venues-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px}
  .venue-card{position:relative;aspect-ratio:3/4;overflow:hidden;cursor:pointer;background:#1a1a1a;}
  .venue-card-inner{width:100%;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:32px;transition:transform .6s cubic-bezier(.25,.46,.45,.94);position:relative;}
  .venue-card:hover .venue-card-inner{transform:scale(1.04)}
  .venue-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .6s;}
  .venue-card:hover .venue-bg{transform:scale(1.06)}
  .venue-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.1) 55%)}
  .venue-info{position:relative;z-index:1}
  .venue-number{font-size:10px;letter-spacing:3px;opacity:.45;margin-bottom:8px}
  .venue-name{font-family:'Bebas Neue',sans-serif;font-size:42px;letter-spacing:2px;line-height:1}
  .venue-loc{font-size:12px;opacity:.55;margin-top:6px;letter-spacing:1px}
  .venue-tag{display:inline-block;margin-top:16px;border:1px solid var(--accent-bright);color:var(--accent-bright);font-size:9px;letter-spacing:2.5px;text-transform:uppercase;padding:5px 12px;opacity:0;transform:translateY(8px);transition:all .3s;}
  .venue-card:hover .venue-tag{opacity:1;transform:translateY(0)}
  .act-main{background:linear-gradient(135deg,#0d2a0d,#1a3a0a);padding:64px 52px;position:relative;overflow:hidden;cursor:pointer;transition:transform .3s;}
  .act-main:hover{transform:scale(1.01)}
  .act-side{display:flex;flex-direction:column;gap:3px}
  .act-card{background:var(--mid);padding:40px 36px;cursor:pointer;transition:background .3s;flex:1;display:flex;flex-direction:column;justify-content:flex-end;}
  .act-card:hover{background:#1e1e1e}
  .act-icon{font-size:32px;margin-bottom:20px;opacity:.8}
  .act-title{font-family:'Bebas Neue',sans-serif;font-size:36px;letter-spacing:2px;margin-bottom:8px}
  .act-desc{font-size:13px;opacity:.5;line-height:1.7}
  .act-main .act-title{font-size:56px}
  .act-main .act-desc{max-width:380px;font-size:14px}
  .act-main-num{font-family:'Bebas Neue',sans-serif;font-size:180px;color:rgba(74,171,74,0.07);position:absolute;right:-20px;top:-30px;line-height:1;letter-spacing:-5px;pointer-events:none;}
  .stories-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px}
  .story-card{cursor:pointer}
  .story-img{aspect-ratio:4/3;background:var(--black);margin-bottom:20px;position:relative;overflow:hidden;}
  .story-img-inner{width:100%;height:100%;transition:transform .5s cubic-bezier(.25,.46,.45,.94);display:flex;align-items:center;justify-content:center;}
  .story-card:hover .story-img-inner{transform:scale(1.06)}
  .story-date{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;opacity:.4;margin-bottom:10px}
  .story-title{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:1.5px;line-height:1.1;margin-bottom:10px}
  .story-excerpt{font-size:13px;opacity:.55;line-height:1.7}
  .story-arrow{display:inline-block;margin-top:16px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--accent-bright);opacity:0;transform:translateX(-6px);transition:all .3s;}
  .story-card:hover .story-arrow{opacity:1;transform:translateX(0)}
  .membership-inner{background:linear-gradient(135deg,#0a2010,#0f2a12);padding:100px 80px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;position:relative;overflow:hidden;}
  .membership-inner::before{content:'K';font-family:'Bebas Neue',sans-serif;font-size:480px;color:rgba(45,106,45,.07);position:absolute;right:-60px;bottom:-120px;line-height:1;pointer-events:none;}
  .membership-right{display:flex;flex-direction:column;gap:20px}
  .plan-card{border:1px solid var(--border);padding:28px 32px;transition:all .3s;cursor:pointer;position:relative;}
  .plan-card:hover,.plan-card.featured{border-color:var(--accent-bright);background:rgba(45,106,45,.08)}
  .plan-card.featured::before{content:'POPULAR';position:absolute;top:-1px;right:24px;background:var(--accent);color:var(--white);font-size:8px;letter-spacing:2px;padding:4px 10px;font-weight:600;}
  .plan-name{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:2px;margin-bottom:4px}
  .plan-price{font-size:13px;opacity:.6}
  .plan-price strong{font-size:24px;font-weight:500;color:var(--white);opacity:1}
  #book-cta{padding:0;height:60vh;background:var(--accent);display:flex;align-items:center;justify-content:center;text-align:center;cursor:pointer;transition:filter .3s;position:relative;overflow:hidden;}
  #book-cta:hover{filter:brightness(1.12)}
  .book-bg-text{font-family:'Bebas Neue',sans-serif;font-size:28vw;color:rgba(0,0,0,.12);position:absolute;white-space:nowrap;line-height:1;animation:marquee 12s linear infinite;}
  @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .book-content{position:relative;z-index:2}
  .book-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(56px,8vw,110px);color:var(--white);letter-spacing:4px;line-height:.95;margin-bottom:28px;}
  .book-cta-btn{background:var(--white);color:var(--accent);font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;padding:16px 48px;border:none;cursor:pointer;font-family:'Barlow',sans-serif;transition:transform .2s;}
  .book-cta-btn:hover{transform:translateY(-3px)}
  footer{background:var(--mid);padding:64px 52px 40px;border-top:1px solid var(--border);}
  .footer-top{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:48px;margin-bottom:64px}
  .footer-logo{font-family:'Bebas Neue',sans-serif;font-size:40px;letter-spacing:5px;margin-bottom:16px}
  .footer-tagline{font-size:13px;opacity:.45;line-height:1.7}
  .footer-col h6{font-size:10px;letter-spacing:3px;text-transform:uppercase;opacity:.4;margin-bottom:20px}
  .footer-col a{display:block;font-size:13px;opacity:.6;text-decoration:none;color:var(--white);margin-bottom:10px;transition:opacity .2s,color .2s;cursor:pointer;}
  .footer-col a:hover{opacity:1;color:var(--accent-bright)}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:32px;border-top:1px solid var(--border);font-size:11px;opacity:.35;letter-spacing:1px;flex-wrap:wrap;gap:12px;}
  .inner-hero{height:50vh;display:flex;align-items:flex-end;padding:0 52px 64px;background:linear-gradient(135deg,#0d2a0d,#080808);position:relative;overflow:hidden;margin-top:62px;}
  .inner-hero-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(64px,10vw,120px);letter-spacing:4px;position:relative;z-index:1;}
  .inner-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 70% 50%,rgba(45,106,45,.12) 0%,transparent 60%);}
  .inner-section{padding:80px 52px}
  .back-btn{display:inline-flex;align-items:center;gap:8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--accent-bright);cursor:pointer;margin-bottom:40px;background:none;border:none;font-family:'Barlow',sans-serif;opacity:.8;transition:opacity .2s;}
  .back-btn:hover{opacity:1}
  .courts-info{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
  .court-stat{border-top:1px solid var(--border);padding-top:20px}
  .court-stat-num{font-family:'Bebas Neue',sans-serif;font-size:56px;color:var(--accent-bright);letter-spacing:1px}
  .court-stat-label{font-size:12px;opacity:.5;letter-spacing:1.5px;text-transform:uppercase;margin-top:4px}
  .contact-form{max-width:640px}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
  .form-group{margin-bottom:16px}
  .form-group label{display:block;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;opacity:.5;margin-bottom:8px}
  .form-group input,.form-group textarea,.form-group select{width:100%;background:var(--mid);border:1px solid var(--border);color:var(--white);padding:14px 18px;font-size:14px;font-family:'Barlow',sans-serif;font-weight:300;outline:none;transition:border-color .2s;}
  .form-group input:focus,.form-group textarea:focus,.form-group select:focus{border-color:var(--accent-bright)}
  .form-group textarea{height:120px;resize:vertical}
  .form-group select option{background:var(--black)}
  .activities-list{display:grid;grid-template-columns:repeat(2,1fr);gap:3px;margin-top:40px}
  .activity-item{background:var(--mid);padding:52px 44px;cursor:pointer;transition:background .3s;position:relative;overflow:hidden;}
  .activity-item:hover{background:#1a1a1a}
  .activity-item::after{content:'→';position:absolute;right:44px;bottom:44px;font-size:24px;color:var(--accent-bright);opacity:0;transform:translateX(-8px);transition:all .3s;}
  .activity-item:hover::after{opacity:1;transform:translateX(0)}
  .activity-num{font-family:'Bebas Neue',sans-serif;font-size:80px;color:rgba(74,171,74,0.08);margin-bottom:-20px;line-height:1;}
  .activity-name{font-family:'Bebas Neue',sans-serif;font-size:48px;letter-spacing:2px;margin-bottom:12px}
  .activity-text{font-size:14px;opacity:.55;line-height:1.75;max-width:400px}
  .stories-list{display:grid;grid-template-columns:repeat(2,1fr);gap:3px;margin-top:40px}
  .story-item{background:var(--mid);cursor:pointer;overflow:hidden;transition:transform .3s;}
  .story-item:hover{transform:scale(1.01)}
  .story-item-img{aspect-ratio:16/9;background:#1a1a1a;display:flex;align-items:center;justify-content:center;overflow:hidden;}
  .story-item-img-inner{width:100%;height:100%;background-size:cover;background-position:center;transition:transform .5s}
  .story-item:hover .story-item-img-inner{transform:scale(1.05)}
  .story-item-body{padding:32px 36px}
  .story-item-cat{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--accent-bright);margin-bottom:10px}
  .story-item-title{font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:1.5px;margin-bottom:10px;line-height:1.1}
  .story-item-excerpt{font-size:13px;opacity:.55;line-height:1.7}
  .modal{position:fixed;inset:0;z-index:500;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s;}
  .modal.open{opacity:1;pointer-events:all}
  .modal-bg{position:absolute;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(8px)}
  .modal-box{position:relative;background:var(--mid);width:min(480px,90vw);padding:52px;border:1px solid var(--border);z-index:1;transform:translateY(20px);transition:transform .3s;}
  .modal.open .modal-box{transform:translateY(0)}
  .modal-close{position:absolute;top:20px;right:24px;background:none;border:none;color:var(--white);font-size:22px;cursor:pointer;opacity:.5;transition:opacity .2s;}
  .modal-close:hover{opacity:1}
  .modal-title{font-family:'Bebas Neue',sans-serif;font-size:40px;letter-spacing:2px;margin-bottom:28px}
  .notif{position:fixed;bottom:32px;right:32px;z-index:1000;background:var(--accent);color:var(--white);padding:14px 28px;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;transform:translateY(80px);opacity:0;transition:all .4s;}
  .notif.show{transform:translateY(0);opacity:1}
  /* ─────────────────────────────
   RESPONSIVE ADD-ON (APPEND ONLY)
───────────────────────────── */

/* Tablet */
@media (max-width: 1024px){
  nav{padding:0 24px}
  section{padding:100px 24px}
  .inner-section{padding:60px 24px}

  .venues-grid{grid-template-columns:1fr 1fr}
  .stories-grid{grid-template-columns:1fr 1fr}
  .stories-list{grid-template-columns:1fr}

  .activities-list{grid-template-columns:1fr}
  .courts-info{grid-template-columns:1fr 1fr}

  .membership-inner{
    grid-template-columns:1fr;
    gap:40px;
    padding:60px 32px;
  }

  .footer-top{
    grid-template-columns:1fr 1fr;
  }
}

/* Mobile */
@media (max-width: 640px){
  nav{
    padding:0 16px;
  }

  .nav-links{
    display:none; /* ซ่อนเมนูซ้าย */
  }

  .nav-right{
    gap:12px;
  }

  .nav-logo{
    font-size:22px;
  }

  section{
    padding:80px 16px;
  }

  .inner-hero{
    padding:0 16px 40px;
  }

  .inner-section{
    padding:50px 16px;
  }

  /* HERO */
  .hero-title{
    font-size:clamp(60px,20vw,120px);
  }

  .hero-actions{
    flex-direction:column;
    width:100%;
    padding:0 16px;
  }

  .btn-primary,
  .btn-ghost{
    width:100%;
    text-align:center;
  }

  /* GRID STACK */
  .venues-grid{
    grid-template-columns:1fr;
  }

  .stories-grid{
    grid-template-columns:1fr;
  }

  .activities-list{
    grid-template-columns:1fr;
  }

  .courts-info{
    grid-template-columns:1fr;
  }

  /* ACTIVITY SECTION */
  .act-main{
    padding:40px 24px;
  }

  .act-main .act-title{
    font-size:42px;
  }

  .act-card{
    padding:28px 24px;
  }

  /* MEMBERSHIP */
  .membership-inner{
    padding:50px 20px;
  }

  /* FORM */
  .form-row{
    grid-template-columns:1fr;
  }

  /* FOOTER */
  .footer-top{
    grid-template-columns:1fr;
  }

  .footer-bottom{
    flex-direction:column;
    align-items:flex-start;
  }

  /* CTA */
  #book-cta{
    height:50vh;
  }

  .book-title{
    font-size:clamp(40px,12vw,80px);
  }
}

/* Ultra wide (Full screen feel) */
@media (min-width: 1600px){
  section,
  .inner-section{
    padding-left:120px;
    padding-right:120px;
  }

  nav{
    padding:0 120px;
  }
}
`;

// ── Data ──────────────────────────────────────────────
const venues = [
  { num: "01", region: "BANGKOK", name: "ONNUT", loc: "Sukhumvit 77", courts: "6 Courts", bg: "linear-gradient(160deg, #1a3008, #0a1504)" },
  { num: "02", region: "BANGKOK", name: "ASOKE", loc: "Laguna Area", courts: "4 Courts", bg: "linear-gradient(160deg, #ff8c00, #ff3c00)" },
  { num: "03", region: "BANGKOK", name: "THONGLOR", loc: "Sukhumvit 55", courts: "Coming 2025", bg: "linear-gradient(160deg, #2b2b2b, #0f0f0f)" },
  { num: "04", region: "BANGKOK", name: "RAMA IV", loc: "Sukhumvit 55", courts: "Coming 2025", bg: "linear-gradient(160deg, #081a30, #020810)" },
];

const stories = [
  { cat: "Tournament", title: "KROSS Open — Season 3", excerpt: "120+ players, 3 days, one champion.", date: "March 2025", bg: "linear-gradient(135deg,#0e2505,#1a3a08)" },
  { cat: "Venue", title: "Phuket Venue Now Open", excerpt: "World-class courts meet island living.", date: "February 2025", bg: "linear-gradient(135deg,#081a30,#020810)" },
  { cat: "Coaching", title: "New Coaching Program", excerpt: "From beginner to podium — find your level.", date: "January 2025", bg: "linear-gradient(135deg,#1a1208,#302008)" },
  { cat: "Community", title: "The KROSS Social League", excerpt: "Friday nights. All levels. Just show up.", date: "December 2024", bg: "linear-gradient(135deg,#1a0520,#0a0212)" },
];

const activities = [
  { num: "01", name: "Padel", text: "Court hire, group sessions, beginner clinics, and weekly competitive leagues." },
  { num: "02", name: "Coaching", text: "Private and group lessons from certified pro coaches. Every skill level welcome." },
  { num: "03", name: "Fitness", text: "Performance training and conditioning built around court sports." },
  { num: "04", name: "Tournaments", text: "Monthly open tournaments and seasonal leagues. Compete and climb the rankings." },
];

const plans = [
  { name: "Explorer", price: "฿2,900", perks: "4 hrs/month · 1 venue · 1 guest pass/month", featured: false },
  { name: "Athlete", price: "฿5,500", perks: "10 hrs/month · All venues · 3 guest passes · 10% coaching", featured: true },
  { name: "Elite", price: "฿9,800", perks: "Unlimited courts · All venues · Unlimited guests · 25% coaching · Locker", featured: false },
];

// ── Sub-components ────────────────────────────────────
function Notif({ msg }) {
  return <div className={`notif${msg ? " show" : ""}`}>{msg}</div>;
}

function BookModal({ open, onClose, onSubmit }) {
  return (
    <div className={`modal${open ? " open" : ""}`}>
      <div className="modal-bg" onClick={onClose} />
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">Book Padel</div>
        <div className="form-group">
          <label>Venue</label>
          <select><option>Onnut</option><option>Asoke</option><option>Thonglor</option><option>Rama 4</option></select>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Date</label><input type="date" /></div>
          <div className="form-group"><label>Time</label><input type="time" /></div>
        </div>
        <div className="form-group"><label>Name</label><input type="text" placeholder="Your name" /></div>
        <div className="form-group"><label>Phone</label><input type="tel" placeholder="+66" /></div>
        <br />
        <button className="btn-primary" style={{ width: "100%", textAlign: "center" }} onClick={onSubmit}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

function Nav({ navigate, }) {
  const [lang, setLang] = useState("THAI");
  return (
    <nav>
      <div className="nav-links">
        <a onClick={() => navigate("stories")}>Our Stories</a>
        <a onClick={() => navigate("venues")}>Our Venues</a>
        <a onClick={() => navigate("activities")}>Our Activities</a>
      </div>
      <a className="nav-logo" onClick={() => navigate("home")}>KROSS</a>
      <div className="nav-right">
        <a onClick={() => navigate("membership")}>Membership</a>
        <a onClick={() => navigate("contact")}>Contact</a>
        <button className="lang-toggle" onClick={() => setLang(l => l === "THAI" ? "ENG" : "THAI")}>{lang}</button>
      </div>
    </nav>
  );
}

function Footer({ navigate }) {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-logo">KROSS</div>
          <div className="footer-tagline">Bangkok's leading padel club.<br />Play. Train. Connect.</div>
        </div>
        <div className="footer-col">
          <h6>Venues</h6>
          {["Onnut", "Phuket", "Thonglor"].map(v => <a key={v} onClick={() => navigate("venues")}>{v}</a>)}
        </div>
        <div className="footer-col">
          <h6>Club</h6>
          {[["activities", "Activities"], ["membership", "Membership"], ["stories", "Stories"]].map(([p, l]) =>
            <a key={p} onClick={() => navigate(p)}>{l}</a>
          )}
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
        <span>Privacy Policy · Terms</span>
      </div>
    </footer>
  );
}

// ── Pages ─────────────────────────────────────────────
function HomePage({ navigate, openBook, }) {
  return (
    <div>
      {/* HERO */}
      <section id="hero">
        <div className="hero-bg" />
        <div className="court-lines" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-eyebrow">Bangkok's Premier Padel Club</div>
          <div className="hero-title">KR<span>O</span>SS</div>
          <div className="hero-sub">Onnut · Phuket · Thonglor</div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={openBook}>Book Padel</button>
            <button className="btn-ghost" onClick={() => navigate("venues")}>Our Venues</button>
          </div>
        </div>
        <div className="scroll-ind"><div className="scroll-line" /></div>
      </section>

      {/* VENUES PREVIEW */}
      <section style={{ padding: "100px 0 0" }}>
        <div style={{ padding: "0 52px 56px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="tag">Our Venues</div>
            <div className="heading" style={{ marginBottom: 0 }}>Three<br />Courts.</div>
          </div>
          <div>
            <p className="body-txt" style={{ marginBottom: 24 }}>State-of-the-art padel facilities across Bangkok and Phuket.</p>
            <button className="btn-ghost" onClick={() => navigate("venues")}>Explore All Venues</button>
          </div>
        </div>
        <div className="venues-grid">
          {venues.map(v => (
            <div className="venue-card" key={v.name} onClick={() => navigate("venues")}>
              <div className="venue-bg" style={{ position: "absolute", inset: 0, background: v.bg }} />
              <div className="venue-card-inner">
                <div className="venue-overlay" />
                <div className="venue-info">
                  <div className="venue-number">{v.num} / {v.region}</div>
                  <div className="venue-name">{v.name}</div>
                  <div className="venue-loc">{v.loc}</div>
                  <div className="venue-tag">{v.courts}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVITIES */}
      <section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          <div className="act-main" onClick={() => navigate("activities")}>
            <div className="act-main-num">01</div>
            <div className="act-icon">🎾</div>
            <div className="act-title">Padel</div>
            <div className="act-desc">Book a court, join a clinic, or compete in weekly tournaments.</div>
          </div>
          <div className="act-side">
            <div className="act-card" onClick={() => navigate("activities")}>
              <div className="act-icon">🏋️</div>
              <div className="act-title">Fitness</div>
              <div className="act-desc">Performance training tailored to court sports.</div>
            </div>
            <div className="act-card" onClick={() => navigate("activities")}>
              <div className="act-icon">🍽️</div>
              <div className="act-title">Restaurant</div>
              <div className="act-desc">Fuel up before or unwind after your match.</div>
            </div>
          </div>
        </div>
      </section>

      {/* STORIES PREVIEW */}
      <section style={{ background: "var(--mid)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="tag">Our Stories</div>
            <div className="heading" style={{ marginBottom: 0 }}>Latest<br />News.</div>
          </div>
          <button className="btn-ghost" onClick={() => navigate("stories")}>All Stories</button>
        </div>
        <div className="stories-grid">
          {stories.slice(0, 3).map(s => (
            <div className="story-card" key={s.title} onClick={() => navigate("stories")}>
              <div className="story-img"><div style={{ position: "absolute", inset: 0, background: s.bg }} /></div>
              <div className="story-date">{s.date}</div>
              <div className="story-title">{s.title}</div>
              <div className="story-excerpt">{s.excerpt}</div>
              <div className="story-arrow">Read More →</div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section style={{ padding: 0 }}>
        <div className="membership-inner">
          <div>
            <div className="tag">Membership</div>
            <div className="heading">Join<br />The Club.</div>
            <p className="body-txt">Unlimited court access, priority booking, coaching discounts, and exclusive member events.</p>
            <br /><br />
            <button className="btn-primary" onClick={() => navigate("membership")}>View Plans</button>
          </div>
          <div className="membership-right">
            {plans.map(p => (
              <div className={`plan-card${p.featured ? " featured" : ""}`} key={p.name} onClick={() => navigate("membership")}>
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">From <strong>{p.price}</strong> / month</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK CTA */}
      <div id="book-cta" onClick={openBook}>
        <div className="book-bg-text">BOOK PADEL BOOK PADEL BOOK PADEL BOOK PADEL &nbsp;</div>
        <div className="book-content">
          <div className="book-title">Ready To<br />Play?</div>
          <button className="book-cta-btn">Book A Court</button>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}

function VenuesPage({ navigate, openBook }) {
  return (
    <div>
      <div className="inner-hero">
        <div className="inner-hero-bg" />
        <div>
          <button className="back-btn" onClick={() => navigate("home")}>← Back</button>
          <div className="inner-hero-title">Our Venues</div>
        </div>
      </div>
      <div className="inner-section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3, marginBottom: 80 }}>
          {venues.map(v => (
            <div className="venue-card" key={v.name} style={{ height: 500 }}>
              <div style={{ position: "absolute", inset: 0, background: v.bg }} />
              <div className="venue-card-inner">
                <div className="venue-overlay" />
                <div className="venue-info">
                  <div className="venue-number">{v.num} / {v.region}</div>
                  <div className="venue-name">{v.name}</div>
                  <div className="venue-loc">{v.loc}</div>
                  <div className="venue-tag">{v.courts} · Open Daily</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="courts-info">
          <div className="court-stat"><div className="court-stat-num">16</div><div className="court-stat-label">Total Courts</div></div>
          <div className="court-stat"><div className="court-stat-num">3</div><div className="court-stat-label">Locations</div></div>
          <div className="court-stat"><div className="court-stat-num">07–22</div><div className="court-stat-label">Daily Hours</div></div>
        </div>
        <div style={{ marginTop: 64, textAlign: "center" }}>
          <button className="btn-primary" onClick={openBook}>Book A Court Now</button>
        </div>
      </div>
    </div>
  );
}

function ActivitiesPage({ navigate, openBook }) {
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

function StoriesPage({ navigate }) {
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
            <div className="story-item" key={s.title}>
              <div className="story-item-img"><div className="story-item-img-inner" style={{ background: s.bg }} /></div>
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

function MembershipPage({ navigate, notify }) {
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 80, alignItems: "start" }}>
          <div>
            <div className="tag">Join The Club</div>
            <div className="heading">Choose<br />Your<br />Plan.</div>
            <p className="body-txt">All plans include access to all KROSS venues, priority booking, and member-only events.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {plans.map(p => (
              <div className={`plan-card${p.featured ? " featured" : ""}`} key={p.name}
                style={{ padding: "36px 40px" }}
                onClick={() => notify(`${p.name} plan — we'll contact you shortly`)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div className="plan-name" style={{ fontSize: 36 }}>{p.name}</div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 44, color: "var(--accent-bright)" }}>{p.price}</div>
                    <div style={{ fontSize: 11, opacity: .5 }}>/month</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, opacity: .6, lineHeight: 2 }}>{p.perks}</div>
                <br />
                <button className={p.featured ? "btn-primary" : "btn-ghost"}
                  onClick={e => { e.stopPropagation(); notify(`${p.name} plan — we'll contact you shortly`); }}>
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

function ContactPage({ navigate, notify }) {
  return (
    <div>
      <div className="inner-hero">
        <div className="inner-hero-bg" />
        <div>
          <button className="back-btn" onClick={() => navigate("home")}>← Back</button>
          <div className="inner-hero-title">Contact</div>
        </div>
      </div>
      <div className="inner-section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 100, alignItems: "start" }}>
          <div>
            <div className="tag">Get In Touch</div>
            <div className="heading">Let's<br />Talk.</div>
            {[["Email", "hello@krosspadelclub.com"], ["LINE", "@krosspadel"], ["Instagram", "@krosspadel"], ["Hours", "Daily 07:00 – 22:00"]].map(([k, v]) => (
              <div key={k} style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", opacity: .4, marginBottom: 8 }}>{k}</div>
                <div style={{ fontSize: 16, opacity: .8 }}>{v}</div>
              </div>
            ))}
          </div>
          <div className="contact-form">
            <div className="form-row">
              <div className="form-group"><label>First Name</label><input type="text" placeholder="John" /></div>
              <div className="form-group"><label>Last Name</label><input type="text" placeholder="Doe" /></div>
            </div>
            <div className="form-group"><label>Email</label><input type="email" placeholder="you@email.com" /></div>
            <div className="form-group">
              <label>Subject</label>
              <select>
                {["General Enquiry", "Court Booking", "Membership", "Coaching", "Events & Tournaments"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Message</label><textarea placeholder="Tell us how we can help..." /></div>
            <button className="btn-primary" onClick={() => notify("Message sent! We'll reply within 24 hours.")}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────
export default function KrossWebsite() {
  const [page, setPage] = useState("home");
  const [bookOpen, setBookOpen] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");

  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };
  const openBook = () => setBookOpen(true);

  const notify = (msg) => {
    setNotifMsg(msg);
    setTimeout(() => setNotifMsg(""), 3000);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = styles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setBookOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Nav navigate={navigate} />
      <BookModal open={bookOpen} onClose={() => setBookOpen(false)} onSubmit={() => { setBookOpen(false); notify("Booking confirmed! Check your email."); }} />
      <Notif msg={notifMsg} />

      {page === "home" && <HomePage navigate={navigate} openBook={openBook} />}
      {page === "venues" && <VenuesPage navigate={navigate} openBook={openBook} />}
      {page === "activities" && <ActivitiesPage navigate={navigate} openBook={openBook} />}
      {page === "stories" && <StoriesPage navigate={navigate} />}
      {page === "membership" && <MembershipPage navigate={navigate} notify={notify} />}
      {page === "contact" && <ContactPage navigate={navigate} notify={notify} />}
    </>
  );
}