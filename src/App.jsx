import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  :root{
    --black:#080808;
    --white:#f2f0ea;
    --green-dark:#0d3320;
    --green-mid:#154d2e;
    --green-bright:#1a6b3a;
    --green-accent:#22883f;
    --green-highlight:#2da84f;
    --mid:#0f0f0f;
    --mid2:#161616;
    --border:rgba(255,255,255,0.08);
    --border-green:rgba(29,107,58,0.4);
  }
  html,body{width:100%;min-height:100%;overflow-x:hidden}
  body{background:var(--black);color:var(--white);font-family:'Barlow',sans-serif;font-weight:300}
  #root{width:100%;min-height:100%}

  /* NAV */
  nav{
    position:fixed;top:0;left:0;right:0;z-index:200;
    display:flex;align-items:center;justify-content:space-between;
    padding:0 56px;height:64px;
    background:rgba(8,8,8,0);backdrop-filter:blur(0px);
    border-bottom:1px solid transparent;
    transition:background .4s,backdrop-filter .4s,border-color .4s;
  }
  nav.scrolled{
    background:rgba(8,8,8,0.92);backdrop-filter:blur(20px);
    border-bottom-color:var(--border);
  }
  .nav-links{display:flex;gap:36px;align-items:center}
  .nav-links a,.nav-right a{
    font-size:10px;letter-spacing:2.5px;text-transform:uppercase;
    color:var(--white);text-decoration:none;opacity:.65;
    transition:opacity .2s,color .2s;cursor:pointer;
  }
  .nav-links a:hover,.nav-right a:hover{opacity:1;color:var(--green-highlight)}
  .nav-logo{
    font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:6px;
    color:var(--white);cursor:pointer;
    position:absolute;left:50%;transform:translateX(-50%);
  }
  .nav-right{display:flex;gap:28px;align-items:center}
  .lang-toggle{
    font-size:9px;letter-spacing:2px;text-transform:uppercase;
    background:none;border:1px solid rgba(255,255,255,.25);color:var(--white);
    padding:5px 13px;cursor:pointer;font-family:'Barlow',sans-serif;
    opacity:.65;transition:all .2s;
  }
  .lang-toggle:hover{opacity:1;border-color:var(--green-highlight);color:var(--green-highlight)}

  /* HAMBURGER */
  .hamburger{
    display:none;flex-direction:column;gap:5px;cursor:pointer;
    background:none;border:none;padding:4px;z-index:210;
  }
  .hamburger span{display:block;width:22px;height:1px;background:var(--white);transition:all .3s;}
  .hamburger.open span:nth-child(1){transform:translateY(6px) rotate(45deg);}
  .hamburger.open span:nth-child(2){opacity:0;}
  .hamburger.open span:nth-child(3){transform:translateY(-6px) rotate(-45deg);}

  /* MOBILE MENU */
  .mobile-menu{
    position:fixed;inset:0;z-index:190;
    background:rgba(8,8,8,.97);backdrop-filter:blur(20px);
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;
    transform:translateY(-100%);transition:transform .45s cubic-bezier(.77,0,.18,1);
    pointer-events:none;
  }
  .mobile-menu.open{transform:translateY(0);pointer-events:all;}
  .mobile-menu a{
    font-family:'Bebas Neue',sans-serif;font-size:clamp(40px,10vw,56px);
    letter-spacing:4px;color:var(--white);text-decoration:none;
    opacity:.5;transition:opacity .2s,color .2s;cursor:pointer;
  }
  .mobile-menu a:hover{opacity:1;color:var(--green-highlight);}
  .mobile-menu-lang{
    margin-top:16px;font-size:9px;letter-spacing:2px;text-transform:uppercase;
    background:none;border:1px solid rgba(255,255,255,.25);color:var(--white);
    padding:7px 18px;cursor:pointer;font-family:'Barlow',sans-serif;opacity:.5;
  }

  /* VIDEO HERO */
  #hero{
    width:100%;height:100vh;position:relative;
    overflow:hidden;display:flex;align-items:center;justify-content:center;
  }
  .hero-video-wrap{position:absolute;inset:0;z-index:0;}
  .hero-video-wrap video{
    width:100%;height:100%;object-fit:cover;
    filter:brightness(0.5) saturate(0.75);
  }
  .hero-video-fallback{
    position:absolute;inset:0;
    background:
      radial-gradient(ellipse at 30% 70%, rgba(13,51,32,0.9) 0%, transparent 60%),
      radial-gradient(ellipse at 75% 25%, rgba(21,77,46,0.5) 0%, transparent 50%),
      linear-gradient(160deg,#0a1a0a,#050505 60%);
    animation:bgPulse 8s ease-in-out infinite;
  }
  @keyframes bgPulse{0%,100%{opacity:1}50%{opacity:.75}}
  .court-overlay{
    position:absolute;inset:0;z-index:1;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),
      linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
    background-size:80px 80px;
    pointer-events:none;
  }
  .hero-vignette{
    position:absolute;inset:0;z-index:2;
    background:
      radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%),
      linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.7) 100%);
    pointer-events:none;
  }
  .hero-tint{
    position:absolute;inset:0;z-index:1;
    background:linear-gradient(135deg,rgba(13,51,32,0.35) 0%,transparent 60%);
    pointer-events:none;
  }
  .hero-content{
    position:relative;z-index:3;
    text-align:center;padding:0 20px;
  }
  .hero-eyebrow{
    font-size:10px;letter-spacing:6px;text-transform:uppercase;
    color:var(--green-highlight);margin-bottom:20px;
    animation:fadeUp .9s ease both;animation-delay:.3s;
  }
  .hero-title{
    font-family:'Bebas Neue',sans-serif;
    font-size:clamp(90px,18vw,220px);
    letter-spacing:10px;line-height:.88;
    animation:fadeUp .9s ease both;animation-delay:.5s;
    text-shadow:0 0 120px rgba(45,168,79,0.12);
  }
  .hero-title span{color:var(--green-highlight);text-shadow:0 0 40px rgba(45,168,79,0.35)}
  .hero-sub{
    font-size:11px;letter-spacing:5px;text-transform:uppercase;
    color:rgba(242,240,234,0.45);margin-top:24px;margin-bottom:48px;
    animation:fadeUp .9s ease both;animation-delay:.7s;
  }
  .hero-actions{
    display:flex;gap:14px;justify-content:center;flex-wrap:wrap;
    animation:fadeUp .9s ease both;animation-delay:.9s;
  }
  .scroll-ind{
    position:absolute;bottom:36px;left:50%;transform:translateX(-50%);
    display:flex;flex-direction:column;align-items:center;gap:10px;
    font-size:8px;letter-spacing:3px;text-transform:uppercase;opacity:.3;
    z-index:3;animation:fadeUp 1s ease both;animation-delay:1.3s;
    pointer-events:none;
  }
  .scroll-line{width:1px;height:44px;background:var(--white);transform-origin:top;animation:scrollAnim 2s ease infinite}
  @keyframes scrollAnim{0%{transform:scaleY(0)}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
  .mute-btn{
    position:absolute;bottom:36px;right:40px;z-index:10;
    background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);
    color:var(--white);width:40px;height:40px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;font-size:14px;transition:all .2s;
    backdrop-filter:blur(8px);
  }
  .mute-btn:hover{background:rgba(45,168,79,.2);border-color:var(--green-highlight);}

  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

  /* BTNs */
  .btn-primary{
    display:inline-block;background:var(--green-bright);color:var(--white);
    font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:600;
    padding:15px 42px;border:none;cursor:pointer;font-family:'Barlow',sans-serif;
    transition:transform .2s,box-shadow .2s,background .2s;
  }
  .btn-primary:hover{transform:translateY(-2px);background:var(--green-accent);box-shadow:0 10px 36px rgba(29,107,58,.4)}
  .btn-ghost{
    display:inline-block;border:1px solid rgba(255,255,255,.2);color:var(--white);
    font-size:10px;letter-spacing:3px;text-transform:uppercase;
    padding:15px 42px;cursor:pointer;background:none;font-family:'Barlow',sans-serif;transition:all .2s;
  }
  .btn-ghost:hover{border-color:var(--green-highlight);color:var(--green-highlight);background:rgba(29,107,58,.07)}

  /* SECTIONS */
  section{padding:120px 56px;width:100%;}
  .tag{font-size:9px;letter-spacing:4px;text-transform:uppercase;color:var(--green-highlight);margin-bottom:14px;opacity:.9}
  .heading{font-family:'Bebas Neue',sans-serif;font-size:clamp(54px,7vw,100px);letter-spacing:2px;line-height:.92;margin-bottom:36px;}
  .body-txt{font-size:15px;line-height:1.9;opacity:.55;max-width:480px}

  /* VENUES GRID */
  .venues-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;width:100%;}
  .venue-card{position:relative;aspect-ratio:2/3;overflow:hidden;cursor:pointer;}
  .venue-card-inner{width:100%;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:28px;position:relative;}
  .venue-bg-div{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .7s cubic-bezier(.25,.46,.45,.94);}
  .venue-card:hover .venue-bg-div{transform:scale(1.06)}
  .venue-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.88) 0%,rgba(0,0,0,.05) 60%)}
  .venue-info{position:relative;z-index:1}
  .venue-number{font-size:9px;letter-spacing:3px;opacity:.4;margin-bottom:6px}
  .venue-name{font-family:'Bebas Neue',sans-serif;font-size:38px;letter-spacing:2px;line-height:1}
  .venue-loc{font-size:11px;opacity:.5;margin-top:5px;letter-spacing:1px}
  .venue-cta{
    display:inline-block;margin-top:14px;
    border:1px solid var(--green-highlight);color:var(--green-highlight);
    font-size:8px;letter-spacing:2.5px;text-transform:uppercase;padding:5px 12px;
    opacity:0;transform:translateY(6px);transition:all .35s;
  }
  .venue-card:hover .venue-cta{opacity:1;transform:translateY(0)}

  /* ACTIVITIES */
  .act-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:2px;width:100%;}
  .act-main{
    background:linear-gradient(135deg,var(--green-dark),#0a0a0a);
    padding:72px 56px;position:relative;overflow:hidden;cursor:pointer;transition:filter .3s;
  }
  .act-main:hover{filter:brightness(1.08)}
  .act-side{display:flex;flex-direction:column;gap:2px}
  .act-card{background:var(--mid2);padding:44px 40px;cursor:pointer;transition:background .3s;flex:1;display:flex;flex-direction:column;justify-content:flex-end;}
  .act-card:hover{background:#1c1c1c}
  .act-icon{font-size:28px;margin-bottom:18px;opacity:.75}
  .act-title{font-family:'Bebas Neue',sans-serif;font-size:34px;letter-spacing:2px;margin-bottom:8px}
  .act-desc{font-size:13px;opacity:.45;line-height:1.75}
  .act-main .act-title{font-size:60px}
  .act-main .act-desc{max-width:360px;font-size:14px;opacity:.55}
  .act-main-num{font-family:'Bebas Neue',sans-serif;font-size:200px;color:rgba(29,107,58,0.06);position:absolute;right:-20px;top:-40px;line-height:1;pointer-events:none;}

  /* STORIES */
  .stories-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:56px}
  .story-card{cursor:pointer}
  .story-img{aspect-ratio:4/3;background:var(--mid2);margin-bottom:18px;position:relative;overflow:hidden;}
  .story-img-inner{width:100%;height:100%;transition:transform .6s cubic-bezier(.25,.46,.45,.94);}
  .story-card:hover .story-img-inner{transform:scale(1.05)}
  .story-date{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;opacity:.35;margin-bottom:9px}
  .story-title{font-family:'Bebas Neue',sans-serif;font-size:26px;letter-spacing:1.5px;line-height:1.1;margin-bottom:9px}
  .story-excerpt{font-size:13px;opacity:.5;line-height:1.75}
  .story-arrow{display:inline-block;margin-top:14px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--green-highlight);opacity:0;transform:translateX(-6px);transition:all .3s;}
  .story-card:hover .story-arrow{opacity:1;transform:translateX(0)}

  /* MEMBERSHIP */
  .membership-inner{
    background:linear-gradient(145deg,var(--green-dark) 0%,#0a0f0a 100%);
    padding:100px 80px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;
    position:relative;overflow:hidden;width:100%;
  }
  .membership-inner::before{
    content:'K';font-family:'Bebas Neue',sans-serif;font-size:500px;
    color:rgba(29,107,58,.05);position:absolute;right:-80px;bottom:-140px;line-height:1;pointer-events:none;
  }
  .membership-right{display:flex;flex-direction:column;gap:16px}
  .plan-card{border:1px solid var(--border);padding:28px 32px;transition:all .3s;cursor:pointer;position:relative;}
  .plan-card:hover,.plan-card.featured{border-color:var(--green-highlight);background:rgba(29,107,58,.07)}
  .plan-card.featured::before{
    content:'POPULAR';position:absolute;top:-1px;right:24px;
    background:var(--green-bright);color:var(--white);
    font-size:8px;letter-spacing:2px;padding:4px 10px;font-weight:600;
  }
  .plan-name{font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:2px;margin-bottom:4px}
  .plan-price{font-size:13px;opacity:.55}
  .plan-price strong{font-size:22px;font-weight:400;color:var(--white);opacity:1}

  /* BOOK CTA */
  #book-cta{
    width:100%;height:58vh;
    background:linear-gradient(135deg,var(--green-mid),var(--green-dark));
    display:flex;align-items:center;justify-content:center;text-align:center;
    cursor:pointer;position:relative;overflow:hidden;
  }
  #book-cta::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(255,255,255,.04) 0%,transparent 70%)}
  .book-bg-text{font-family:'Bebas Neue',sans-serif;font-size:26vw;color:rgba(255,255,255,.04);position:absolute;white-space:nowrap;line-height:1;animation:marquee 14s linear infinite;}
  @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .book-content{position:relative;z-index:2}
  .book-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(60px,9vw,120px);color:var(--white);letter-spacing:4px;line-height:.92;margin-bottom:32px;}
  .book-cta-btn{
    background:var(--white);color:var(--green-dark);
    font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:700;
    padding:16px 52px;border:none;cursor:pointer;font-family:'Barlow',sans-serif;transition:transform .2s,box-shadow .2s;
  }
  .book-cta-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,.3)}

  /* FOOTER */
  footer{background:var(--mid);padding:64px 56px 40px;border-top:1px solid var(--border);width:100%;}
  .footer-top{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:48px;margin-bottom:60px}
  .footer-logo{font-family:'Bebas Neue',sans-serif;font-size:38px;letter-spacing:6px;margin-bottom:14px}
  .footer-tagline{font-size:13px;opacity:.4;line-height:1.8}
  .footer-col h6{font-size:9px;letter-spacing:3px;text-transform:uppercase;opacity:.35;margin-bottom:18px}
  .footer-col a{display:block;font-size:13px;opacity:.5;text-decoration:none;color:var(--white);margin-bottom:10px;transition:opacity .2s,color .2s;cursor:pointer;}
  .footer-col a:hover{opacity:1;color:var(--green-highlight)}
  .footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;border-top:1px solid var(--border);font-size:10px;opacity:.3;letter-spacing:1px;flex-wrap:wrap;gap:12px;}

  /* INNER PAGES */
  .inner-hero{
    height:52vh;display:flex;align-items:flex-end;
    padding:0 56px 60px;
    background:linear-gradient(155deg,var(--green-dark) 0%,#050505 70%);
    position:relative;overflow:hidden;margin-top:64px;
  }
  .inner-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 65% 45%,rgba(29,107,58,.15) 0%,transparent 60%);}
  .inner-hero-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(68px,10vw,128px);letter-spacing:4px;position:relative;z-index:1;}
  .inner-section{padding:80px 56px}
  .back-btn{
    display:inline-flex;align-items:center;gap:8px;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;
    color:var(--green-highlight);cursor:pointer;margin-bottom:36px;background:none;border:none;
    font-family:'Barlow',sans-serif;opacity:.75;transition:opacity .2s;
  }
  .back-btn:hover{opacity:1}
  .courts-info{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
  .court-stat{border-top:1px solid var(--border-green);padding-top:18px}
  .court-stat-num{font-family:'Bebas Neue',sans-serif;font-size:60px;color:var(--green-highlight);letter-spacing:1px}
  .court-stat-label{font-size:11px;opacity:.45;letter-spacing:2px;text-transform:uppercase;margin-top:4px}

  /* VENUE DETAIL */
  .venue-detail-hero{
    height:75vh;position:relative;overflow:hidden;
    display:flex;align-items:flex-end;padding:0 56px 72px;
    margin-top:64px;
  }
  .venue-detail-hero-bg{position:absolute;inset:0;background-size:cover;background-position:center;}
  .venue-detail-hero-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.2) 50%,transparent 100%)}
  .venue-detail-content{position:relative;z-index:2}
  .venue-detail-tag{font-size:9px;letter-spacing:4px;text-transform:uppercase;color:var(--green-highlight);margin-bottom:12px}
  .venue-detail-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(80px,12vw,160px);letter-spacing:6px;line-height:.88;margin-bottom:16px}
  .venue-detail-sub{font-size:13px;letter-spacing:2px;opacity:.55;text-transform:uppercase}
  .venue-detail-body{display:grid;grid-template-columns:1fr 2.2fr;gap:80px;padding:80px 56px;align-items:start;}
  .venue-detail-sticky{position:sticky;top:90px}
  .venue-sidebar-item{margin-bottom:32px}
  .venue-sidebar-label{font-size:9px;letter-spacing:3px;text-transform:uppercase;opacity:.35;margin-bottom:6px}
  .venue-sidebar-val{font-size:15px;opacity:.8;line-height:1.6}
  .venue-sidebar-divider{height:1px;background:var(--border);margin:28px 0}
  .venue-intro{font-size:20px;line-height:1.75;opacity:.8;font-weight:300;margin-bottom:56px;max-width:660px}
  .venue-section-heading{font-family:'Bebas Neue',sans-serif;font-size:44px;letter-spacing:2px;margin-bottom:20px;margin-top:52px}
  .venue-body-text{font-size:15px;line-height:1.9;opacity:.6;max-width:640px;margin-bottom:32px}
  .venue-img-block{margin:40px 0;aspect-ratio:16/9;background:var(--mid2);overflow:hidden;position:relative;}
  .venue-img-inner{width:100%;height:100%;background-size:cover;background-position:center;}
  .venue-img-caption{font-size:10px;letter-spacing:2px;text-transform:uppercase;opacity:.3;margin-top:10px}
  .venue-features{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin:32px 0}
  .venue-feature{background:var(--mid2);padding:28px 32px}
  .venue-feature-num{font-family:'Bebas Neue',sans-serif;font-size:48px;color:var(--green-highlight);line-height:1;margin-bottom:6px}
  .venue-feature-label{font-size:11px;opacity:.5;letter-spacing:1.5px;text-transform:uppercase}
  .venue-detail-cta{margin-top:56px;padding:52px;background:linear-gradient(135deg,var(--green-dark),#0a0a0a);display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;}
  .venue-detail-cta-text{font-family:'Bebas Neue',sans-serif;font-size:40px;letter-spacing:2px;}

  /* CONTACT */
  .contact-form{max-width:640px}
  .form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
  .form-group{margin-bottom:14px}
  .form-group label{display:block;font-size:9px;letter-spacing:2.5px;text-transform:uppercase;opacity:.4;margin-bottom:7px}
  .form-group input,.form-group textarea,.form-group select{
    width:100%;background:var(--mid2);border:1px solid var(--border);
    color:var(--white);padding:14px 18px;font-size:14px;
    font-family:'Barlow',sans-serif;font-weight:300;outline:none;transition:border-color .2s;
  }
  .form-group input:focus,.form-group textarea:focus,.form-group select:focus{border-color:var(--green-highlight)}
  .form-group textarea{height:120px;resize:vertical}
  .form-group select option{background:var(--black)}

  /* ACTIVITIES PAGE */
  .activities-list{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;margin-top:40px}
  .activity-item{background:var(--mid2);padding:56px 48px;cursor:pointer;transition:background .3s;position:relative;overflow:hidden;}
  .activity-item:hover{background:#191919}
  .activity-item::after{content:'→';position:absolute;right:48px;bottom:48px;font-size:22px;color:var(--green-highlight);opacity:0;transform:translateX(-8px);transition:all .3s;}
  .activity-item:hover::after{opacity:1;transform:translateX(0)}
  .activity-num{font-family:'Bebas Neue',sans-serif;font-size:88px;color:rgba(29,107,58,0.07);margin-bottom:-24px;line-height:1;}
  .activity-name{font-family:'Bebas Neue',sans-serif;font-size:52px;letter-spacing:2px;margin-bottom:12px}
  .activity-text{font-size:14px;opacity:.5;line-height:1.8;max-width:420px}

  /* STORIES PAGE */
  .stories-list{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;margin-top:40px}
  .story-item{background:var(--mid2);cursor:pointer;overflow:hidden;transition:transform .3s;}
  .story-item:hover{transform:scale(1.005)}
  .story-item-img{aspect-ratio:16/9;overflow:hidden;}
  .story-item-img-inner{width:100%;height:100%;background-size:cover;background-position:center;transition:transform .6s}
  .story-item:hover .story-item-img-inner{transform:scale(1.05)}
  .story-item-body{padding:32px 36px}
  .story-item-cat{font-size:8px;letter-spacing:3px;text-transform:uppercase;color:var(--green-highlight);margin-bottom:10px}
  .story-item-title{font-family:'Bebas Neue',sans-serif;font-size:30px;letter-spacing:1.5px;margin-bottom:10px;line-height:1.1}
  .story-item-excerpt{font-size:13px;opacity:.5;line-height:1.75}

  /* MEMBERSHIP PAGE */
  .membership-page-grid{display:grid;grid-template-columns:1fr 1.8fr;gap:80px;align-items:start}
  .plan-card-lg{border:1px solid var(--border);padding:36px 40px;transition:all .3s;cursor:pointer;position:relative;margin-bottom:14px}
  .plan-card-lg:hover,.plan-card-lg.featured{border-color:var(--green-highlight);background:rgba(29,107,58,.07)}
  .plan-card-lg.featured::before{content:'POPULAR';position:absolute;top:-1px;right:24px;background:var(--green-bright);color:var(--white);font-size:8px;letter-spacing:2px;padding:4px 10px;font-weight:600;}
  .plan-card-lg-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
  .plan-name-lg{font-family:'Bebas Neue',sans-serif;font-size:34px;letter-spacing:2px}
  .plan-price-lg{font-family:'Bebas Neue',sans-serif;font-size:42px;color:var(--green-highlight)}
  .plan-per{font-size:10px;opacity:.45;text-align:right}
  .plan-perks{font-size:13px;opacity:.55;line-height:2}

  /* MODAL */
  .modal{position:fixed;inset:0;z-index:500;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s;}
  .modal.open{opacity:1;pointer-events:all}
  .modal-bg{position:absolute;inset:0;background:rgba(0,0,0,.88);backdrop-filter:blur(10px)}
  .modal-box{
    position:relative;background:var(--mid2);
    width:min(480px,90vw);padding:52px;
    border:1px solid var(--border-green);z-index:1;
    transform:translateY(18px);transition:transform .3s;
    max-height:90vh;overflow-y:auto;
  }
  .modal.open .modal-box{transform:translateY(0)}
  .modal-close{position:absolute;top:20px;right:24px;background:none;border:none;color:var(--white);font-size:20px;cursor:pointer;opacity:.4;transition:opacity .2s;}
  .modal-close:hover{opacity:1}
  .modal-title{font-family:'Bebas Neue',sans-serif;font-size:42px;letter-spacing:2px;margin-bottom:28px}

  /* NOTIF */
  .notif{position:fixed;bottom:32px;right:32px;z-index:1000;background:var(--green-bright);color:var(--white);padding:14px 28px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;transform:translateY(80px);opacity:0;transition:all .4s;}
  .notif.show{transform:translateY(0);opacity:1}

  /* RESPONSIVE */
  @media(max-width:1200px){
    .venues-grid{grid-template-columns:repeat(2,1fr)}
    .venue-detail-body{grid-template-columns:1fr;gap:48px}
    .venue-detail-sticky{position:static}
    .footer-top{grid-template-columns:1fr 1fr}
  }
  @media(max-width:900px){
    nav{padding:0 20px}
    .nav-links,.nav-right .desktop-only{display:none!important}
    .hamburger{display:flex}
    section{padding:80px 20px}
    .inner-hero{padding:0 20px 48px}
    .venue-detail-hero{padding:0 20px 48px}
    .membership-inner{grid-template-columns:1fr;padding:60px 24px;gap:40px}
    .membership-page-grid{grid-template-columns:1fr;gap:40px}
    .stories-grid{grid-template-columns:1fr 1fr}
    .activities-list{grid-template-columns:1fr}
    .stories-list{grid-template-columns:1fr}
    .venue-features{grid-template-columns:1fr 1fr}
    .act-grid{grid-template-columns:1fr}
    footer{padding:48px 20px 32px}
  }
  @media(max-width:600px){
    .venues-grid{grid-template-columns:1fr}
    .stories-grid{grid-template-columns:1fr}
    .hero-actions{flex-direction:column;padding:0 32px}
    .btn-primary,.btn-ghost{width:100%;text-align:center;display:block}
    .form-row{grid-template-columns:1fr}
    .footer-top{grid-template-columns:1fr}
    .courts-info{grid-template-columns:1fr 1fr}
    .venue-detail-title{font-size:clamp(60px,16vw,100px)}
    .membership-inner{padding:50px 16px}
    .membership-inner::before{display:none}
    .venue-detail-cta{flex-direction:column}
    .act-main{padding:48px 24px}
    .act-card{padding:32px 24px}
    section{padding:64px 16px}
    .inner-section{padding:60px 20px}
    .venue-detail-body{padding:48px 20px}
    .mute-btn{bottom:80px;right:20px}
  }
`;

// ── Data ─────────────────────────────────────────────────
const venues = [
  {
    id: "onnut", num: "01", region: "BANGKOK", name: "ONNUT", loc: "Sukhumvit 77",
    courts: "6 Courts", bg: "linear-gradient(160deg, #2f6d4e, #060d06)",
    status: "Open", hours: "07:00 – 22:00", phone: "+66 2 123 4567",
    address: "101/5 Sukhumvit 77, Watthana, Bangkok 10110",
    intro: "KROSS Onnut is our flagship venue — a full-scale padel destination built from the ground up for serious players and beginners alike. Six premium courts, a dedicated fitness zone, and a restaurant bar make it the most complete padel club in Bangkok.",
    courtCount: 6, imgBg1: "linear-gradient(135deg,#0d3320,#1a4d28)", imgBg2: "linear-gradient(135deg,#0a2a18, #0f3d20)",
    features: [{ num: "6", label: "Padel Courts" }, { num: "1", label: "Fitness Zone" }, { num: "300+", label: "Members" }, { num: "7am", label: "Opens Daily" }]
  },
  {
    id: "asoke", num: "02", region: "BANGKOK", name: "ASOKE", loc: "Sukhumvit 21",
    courts: "4 Courts", bg: "linear-gradient(160deg, #ba7520, #2a230a)",
    status: "Open", hours: "07:00 – 22:00", phone: "+66 2 234 5678",
    address: "88/2 Sukhumvit 21, Klongtoey-Nua, Bangkok 10110",
    intro: "Located in the heart of Bangkok's CBD, KROSS Asoke brings padel to the city's most connected district. Four indoor courts with climate control — built for those who play before or after work.",
    courtCount: 4, imgBg1: "linear-gradient(135deg,  #ba7520,#2a230a)", imgBg2: "linear-gradient(135deg, #ba7520, #2a230a)",
    features: [{ num: "4", label: "Padel Courts" }, { num: "Indoor", label: "Climate Controlled" }, { num: "150+", label: "Members" }, { num: "BTS", label: "Asoke Access" }]
  },
  {
    id: "thonglor", num: "03", region: "BANGKOK", name: "THONGLOR", loc: "Sukhumvit 55",
    courts: "Coming 2025", bg: "linear-gradient(160deg, #444444,#0a0a0a)",
    status: "Coming Soon", hours: "TBA", phone: "TBA",
    address: "Sukhumvit 55, Watthana, Bangkok 10110",
    intro: "KROSS Thonglor is our most design-forward venue yet — set in the heart of Bangkok's most vibrant neighbourhood. Opening late 2025 with 5 courts, rooftop dining, and a social club atmosphere.",
    courtCount: 5, imgBg1: "linear-gradient(135deg,#1a1a1a,#2a2a2a)", imgBg2: "linear-gradient(135deg,#111,#1e1e1e)",
    features: [{ num: "5", label: "Padel Courts" }, { num: "Rooftop", label: "Restaurant Bar" }, { num: "2025", label: "Opening Year" }, { num: "VIP", label: "Founding Members" }]
  },
  {
    id: "ramaiv", num: "04", region: "BANGKOK", name: "RAMA IV", loc: "Rama IV Road",
    courts: "Coming 2025", bg: "linear-gradient(160deg, #24416a,#050d1a)",
    status: "Coming Soon", hours: "TBA", phone: "TBA",
    address: "Rama IV Road, Klong Toey, Bangkok 10110",
    intro: "Our south Bangkok outpost — KROSS Rama IV will serve the growing padel community south of the river with 4 world-class courts and direct access from the Lumpini area.",
    courtCount: 4, imgBg1: "linear-gradient(135deg,#081a30,#0d2a48)", imgBg2: "linear-gradient(135deg,#050d1a,#081a30)",
    features: [{ num: "4", label: "Padel Courts" }, { num: "2", label: "Practice Walls" }, { num: "2025", label: "Opening Year" }, { num: "South", label: "Bangkok" }]
  },
];

const stories = [
  { cat: "Tournament", title: "KROSS Open — Season 3", excerpt: "120+ players, 3 days, one champion.", date: "March 2025", bg: "linear-gradient(135deg,#0d3320,#1a4d28)" },
  { cat: "Venue", title: "Asoke Now Open", excerpt: "Our CBD court is here. Walk in from BTS.", date: "February 2025", bg: "linear-gradient(135deg,#1a2a0a,#253d10)" },
  { cat: "Coaching", title: "New Coaching Program", excerpt: "From beginner to podium — find your level.", date: "January 2025", bg: "linear-gradient(135deg,#0f1a08,#1a2d0a)" },
  { cat: "Community", title: "The KROSS Social League", excerpt: "Friday nights. All levels. Just show up.", date: "December 2024", bg: "linear-gradient(135deg,#0a1a20,#0d2530)" },
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

// ── Nav ──────────────────────────────────────────────────
function Nav({ navigate, scrolled }) {
  const [lang, setLang] = useState("THAI");
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (p) => { navigate(p); setMenuOpen(false); };

  return (
    <>
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-links">
          <a onClick={() => go("stories")}>Our Stories</a>
          <a onClick={() => go("venues")}>Our Venues</a>
          <a onClick={() => go("activities")}>Our Activities</a>
        </div>
        <span className="nav-logo" onClick={() => go("home")}>KROSS</span>
        <div className="nav-right">
          <a className="desktop-only" onClick={() => go("membership")}>Membership</a>
          <a className="desktop-only" onClick={() => go("contact")}>Contact</a>
          <button className="lang-toggle desktop-only" onClick={() => setLang(l => l === "THAI" ? "ENG" : "THAI")}>{lang}</button>
          <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <a onClick={() => go("stories")}>Stories</a>
        <a onClick={() => go("venues")}>Venues</a>
        <a onClick={() => go("activities")}>Activities</a>
        <a onClick={() => go("membership")}>Membership</a>
        <a onClick={() => go("contact")}>Contact</a>
        <button className="mobile-menu-lang" onClick={() => setLang(l => l === "THAI" ? "ENG" : "THAI")}>{lang}</button>
      </div>
    </>
  );
}

// ── Book Modal ───────────────────────────────────────────
function BookModal({ open, onClose, onSubmit }) {
  return (
    <div className={`modal${open ? " open" : ""}`}>
      <div className="modal-bg" onClick={onClose} />
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">Book Padel</div>
        <div className="form-group">
          <label>Venue</label>
          <select>{venues.map(v => <option key={v.id}>{v.name} — {v.loc}</option>)}</select>
        </div>
        <div className="form-row">
          <div className="form-group"><label>Date</label><input type="date" /></div>
          <div className="form-group"><label>Time</label><input type="time" /></div>
        </div>
        <div className="form-group"><label>Name</label><input type="text" placeholder="Your name" /></div>
        <div className="form-group"><label>Phone</label><input type="tel" placeholder="+66" /></div>
        <br />
        <button className="btn-primary" style={{ width: "100%", textAlign: "center" }} onClick={onSubmit}>Confirm Booking</button>
      </div>
    </div>
  );
}

// ── Notif ────────────────────────────────────────────────
function Notif({ msg }) {
  return <div className={`notif${msg ? " show" : ""}`}>{msg}</div>;
}

// ── Footer ───────────────────────────────────────────────
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
        <span>Privacy Policy · Terms</span>
      </div>
    </footer>
  );
}

// ── HOME ─────────────────────────────────────────────────
function HomePage({ navigate, openBook }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(m => !m);
    }
  };

  return (
    <div>
      {/* VIDEO HERO */}
      <section id="hero" style={{ padding: 0 }}>
        <div className="hero-video-wrap">
          {/*
            ── ใส่ URL วิดีโอของคุณตรงนี้ ──
            ตัวอย่าง: src="https://your-cdn.com/padel-aerial.mp4"
            แนะนำ: วิดีโอมุมสูง (drone shot) ของสนาม padel
            ขนาดแนะนำ: 1920x1080, format: MP4 (H.264)
          */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) saturate(0.75)" }}
          >
            {/* แทนที่ด้วย URL วิดีโอจริงของคุณ */}
            <source src="YOUR_PADEL_AERIAL_VIDEO_URL.mp4" type="video/mp4" />
          </video>
          {/* Fallback gradient ถ้าไม่มีวิดีโอ */}
          <div className="hero-video-fallback" />
          <div className="hero-tint" />
        </div>
        <div className="court-overlay" />
        <div className="hero-vignette" />

        <div className="hero-content">
          <div className="hero-eyebrow">Bangkok's Premier Padel Club</div>
          <div className="hero-title">KROSS</div>
          <div className="hero-sub">Onnut · Asoke · Thonglor · Rama IV</div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={openBook}>Book Padel</button>
            <button className="btn-ghost" onClick={() => navigate("venues")}>Our Venues</button>
          </div>
        </div>

        <div className="scroll-ind"><div className="scroll-line" /></div>
        <button className="mute-btn" onClick={toggleMute} title="Toggle sound">
          {muted ? "🔇" : "🔊"}
        </button>
      </section>

      {/* VENUES */}
      <section style={{ padding: "100px 0 0" }}>
        <div style={{ padding: "0 56px 52px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="tag">Our Venues</div>
            <div className="heading" style={{ marginBottom: 0 }}>Four<br />Locations.</div>
          </div>
          <div>
            <p className="body-txt" style={{ marginBottom: 24 }}>World-class padel across Bangkok — each venue designed for the neighbourhood it serves.</p>
            <button className="btn-ghost" onClick={() => navigate("venues")}>Explore All Venues</button>
          </div>
        </div>
        <div className="venues-grid">
          {venues.map(v => (
            <div className="venue-card" key={v.id} onClick={() => navigate("venue-" + v.id)}>
              <div className="venue-bg-div" style={{ background: v.bg }} />
              <div className="venue-card-inner">
                <div className="venue-overlay" />
                <div className="venue-info">
                  <div className="venue-number">{v.num} / {v.region}</div>
                  <div className="venue-name">{v.name}</div>
                  <div className="venue-loc">{v.loc}</div>
                  <div className="venue-cta">View Venue →</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVITIES */}
      <section style={{ padding: "100px 0 0" }}>
        <div className="act-grid">
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

      {/* STORIES */}
      <section style={{ background: "var(--mid)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="tag">Our Stories</div>
            <div className="heading" style={{ marginBottom: 0 }}>Latest<br />News.</div>
          </div>
          <button className="btn-ghost" onClick={() => navigate("stories")}>All Stories</button>
        </div>
        <div className="stories-grid">
          {stories.slice(0, 3).map(s => (
            <div className="story-card" key={s.title} onClick={() => navigate("stories")}>
              <div className="story-img"><div className="story-img-inner" style={{ background: s.bg }} /></div>
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
        <div className="book-bg-text">BOOK PADEL BOOK PADEL BOOK PADEL BOOK PADEL &nbsp;BOOK PADEL BOOK PADEL BOOK PADEL BOOK PADEL &nbsp;</div>
        <div className="book-content">
          <div className="book-title">Ready To<br />Play?</div>
          <button className="book-cta-btn">Book A Court</button>
        </div>
      </div>

      <Footer navigate={navigate} />
    </div>
  );
}

// ── VENUES LIST ──────────────────────────────────────────
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
        <div className="venues-grid" style={{ marginBottom: 72 }}>
          {venues.map(v => (
            <div className="venue-card" key={v.id} onClick={() => navigate("venue-" + v.id)}>
              <div className="venue-bg-div" style={{ background: v.bg }} />
              <div className="venue-card-inner">
                <div className="venue-overlay" />
                <div className="venue-info">
                  <div className="venue-number">{v.num} / {v.region}</div>
                  <div className="venue-name">{v.name}</div>
                  <div className="venue-loc">{v.loc}</div>
                  <div className="venue-cta">View Venue →</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="courts-info">
          <div className="court-stat"><div className="court-stat-num">19+</div><div className="court-stat-label">Total Courts</div></div>
          <div className="court-stat"><div className="court-stat-num">4</div><div className="court-stat-label">Locations</div></div>
          <div className="court-stat"><div className="court-stat-num">07–22</div><div className="court-stat-label">Daily Hours</div></div>
        </div>
        <div style={{ marginTop: 64, textAlign: "center" }}>
          <button className="btn-primary" onClick={openBook}>Book A Court Now</button>
        </div>
      </div>
    </div>
  );
}

// ── VENUE DETAIL ─────────────────────────────────────────
function VenueDetailPage({ venue, navigate, openBook }) {
  return (
    <div>
      <div className="venue-detail-hero">
        <div className="venue-detail-hero-bg" style={{ background: venue.imgBg1 }} />
        <div className="venue-detail-hero-overlay" />
        <div className="venue-detail-content">
          <button className="back-btn" onClick={() => navigate("venues")}>← All Venues</button>
          <div className="venue-detail-tag">{venue.num} / {venue.region} · {venue.status}</div>
          <div className="venue-detail-title">{venue.name}</div>
          <div className="venue-detail-sub">{venue.loc} · {venue.courts}</div>
        </div>
      </div>
      <div className="venue-detail-body">
        <div>
          <div className="venue-detail-sticky">
            <div className="tag" style={{ marginBottom: 24 }}>Venue Info</div>
            <div className="venue-sidebar-item">
              <div className="venue-sidebar-label">Status</div>
              <div className="venue-sidebar-val" style={{ color: venue.status === "Open" ? "var(--green-highlight)" : "var(--white)" }}>{venue.status}</div>
            </div>
            <div className="venue-sidebar-divider" />
            <div className="venue-sidebar-item">
              <div className="venue-sidebar-label">Hours</div>
              <div className="venue-sidebar-val">{venue.hours}</div>
            </div>
            <div className="venue-sidebar-divider" />
            <div className="venue-sidebar-item">
              <div className="venue-sidebar-label">Address</div>
              <div className="venue-sidebar-val" style={{ fontSize: 13, opacity: .65 }}>{venue.address}</div>
            </div>
            <div className="venue-sidebar-divider" />
            <div className="venue-sidebar-item">
              <div className="venue-sidebar-label">Phone</div>
              <div className="venue-sidebar-val">{venue.phone}</div>
            </div>
            <div className="venue-sidebar-divider" />
            <br />
            <button className="btn-primary" onClick={openBook} style={{ width: "100%", textAlign: "center" }}>Book Here</button>
          </div>
        </div>
        <div>
          <p className="venue-intro">{venue.intro}</p>
          <div className="venue-img-block"><div className="venue-img-inner" style={{ background: venue.imgBg1 }} /></div>
          <div className="venue-img-caption">KROSS {venue.name} — Courts Overview</div>
          <div className="venue-section-heading">The Courts</div>
          <p className="venue-body-text">Every court at KROSS {venue.name} is built to World Padel Tour specifications — premium glass walls, artificial grass turf, and professional LED lighting for day and evening play.</p>
          <p className="venue-body-text">Court hire is available from opening to close, with online booking up to 7 days in advance. Members receive priority windows and guaranteed slots during peak hours.</p>
          <div className="venue-features">
            {venue.features.map(f => (
              <div className="venue-feature" key={f.label}>
                <div className="venue-feature-num">{f.num}</div>
                <div className="venue-feature-label">{f.label}</div>
              </div>
            ))}
          </div>
          <div className="venue-img-block"><div className="venue-img-inner" style={{ background: venue.imgBg2 }} /></div>
          <div className="venue-img-caption">KROSS {venue.name} — Club Space</div>
          <div className="venue-section-heading">The Club</div>
          <p className="venue-body-text">Beyond the courts, KROSS {venue.name} is a place to stay. The club lounge is designed for post-match recovery and pre-match preparation.</p>
          <p className="venue-body-text">Locker rooms are available for members. Equipment rental and restringing services are available at the front desk.</p>
          <div className="venue-detail-cta">
            <div className="venue-detail-cta-text">Ready to play at {venue.name}?</div>
            <button className="btn-primary" onClick={openBook}>Book A Court</button>
          </div>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
}

// ── ACTIVITIES ───────────────────────────────────────────
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

// ── STORIES ──────────────────────────────────────────────
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

// ── MEMBERSHIP ───────────────────────────────────────────
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

// ── CONTACT ──────────────────────────────────────────────
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
                <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", opacity: .35, marginBottom: 7 }}>{k}</div>
                <div style={{ fontSize: 15, opacity: .75 }}>{v}</div>
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
              <select>{["General Enquiry", "Court Booking", "Membership", "Coaching", "Events & Tournaments"].map(o => <option key={o}>{o}</option>)}</select>
            </div>
            <div className="form-group"><label>Message</label><textarea placeholder="Tell us how we can help..." /></div>
            <button className="btn-primary" onClick={() => notify("Message sent! We'll reply within 24 hours.")}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────
export default function KrossWebsite() {
  const [page, setPage] = useState("home");
  const [bookOpen, setBookOpen] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };
  const openBook = () => setBookOpen(true);
  const notify = (msg) => { setNotifMsg(msg); setTimeout(() => setNotifMsg(""), 3200); };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = styles;
    document.head.appendChild(style);
    // Force full width
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.width = "100%";
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setBookOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const venueMatch = page.startsWith("venue-") ? venues.find(v => "venue-" + v.id === page) : null;

  return (
    <>
      <Nav navigate={navigate} scrolled={scrolled} />
      <BookModal open={bookOpen} onClose={() => setBookOpen(false)} onSubmit={() => { setBookOpen(false); notify("Booking confirmed! Check your email."); }} />
      <Notif msg={notifMsg} />
      {page === "home" && <HomePage navigate={navigate} openBook={openBook} />}
      {page === "venues" && <VenuesPage navigate={navigate} openBook={openBook} />}
      {page === "activities" && <ActivitiesPage navigate={navigate} openBook={openBook} />}
      {page === "stories" && <StoriesPage navigate={navigate} />}
      {page === "membership" && <MembershipPage navigate={navigate} notify={notify} />}
      {page === "contact" && <ContactPage navigate={navigate} notify={notify} />}
      {venueMatch && <VenueDetailPage venue={venueMatch} navigate={navigate} openBook={openBook} />}
    </>
  );
}