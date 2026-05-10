# KROSS Padel — Project Overview

## ภาพรวมโปรเจ็ค

เว็บไซต์สำหรับ **KROSS Padel** แบรนด์สนามพาเดิลในไทย ทำหน้าที่เป็นทั้ง marketing site สำหรับลูกค้า และมี admin panel สำหรับจัดการข้อมูลหลังบ้าน

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Routing | Custom SPA routing ผ่าน `page` state ใน App.jsx (ไม่ใช้ React Router) |
| Database | Firebase Firestore (Realtime data) |
| Auth | Firebase Auth |
| Image Storage | Supabase Storage (bucket: `kross_backend`) |
| Styling | CSS Variables ใน `global.css` (dark theme) |
| Color Picker | `react-color` (ChromePicker) |

---

## โครงสร้างไฟล์

```
src/
├── App.jsx                    # Root — routing logic, providers wrap
├── main.jsx
├── firebase.js                # Firebase config (db, auth)
├── supabaseClient.ts          # Supabase client + uploadImage()
│
├── context/
│   ├── AuthContext.js         # Context สำหรับ user state
│   ├── AuthProvider.jsx       # Firebase onAuthStateChanged
│   ├── VenueContext.jsx       # Context สำหรับ venues
│   └── VenueProvider.jsx      # โหลด venues จาก Firestore ผ่าน venueService
│
├── service/
│   └── venueService.js        # getVenues() — query Firestore collection "venues"
│
├── components/
│   ├── Nav.jsx                # Navbar (รับ scrolled state จาก App)
│   ├── Footer.jsx
│   ├── BookModal.jsx          # Modal จองคอร์ท
│   └── Notif.jsx              # Toast notification
│
├── pages/
│   ├── HomePage.jsx
│   ├── VenuesPage.jsx         # รายการ venues ทั้งหมด
│   ├── VenueDetailPage.jsx    # หน้า detail ของ venue แต่ละอัน
│   ├── ActivitiesPage.jsx
│   ├── StoriesPage.jsx
│   ├── MembershipPage.jsx
│   ├── ContactPage.jsx
│   ├── AboutPage.jsx
│   ├── BecomePartnerPage.jsx
│   └── admin/
│       ├── AdminLoginPage.jsx
│       ├── AdminDashboard.jsx         # เมนูหลัก admin
│       ├── AdminVenuesPage.jsx        # CRUD venues
│       ├── AdminStoriesPage.jsx       # CRUD stories
│       ├── AdminActivitiesPage.jsx    # CRUD activities
│       └── AdminMembershipPage.jsx    # จัดการ membership plans
│
├── data/
│   └── index.js               # Static data fallback (ถ้ามี)
│
└── styles/
    └── global.css             # Design system — CSS variables, utility classes
```

---

## Routing

ใช้ `page` state string แทน URL routing:

```
"home" | "venues" | "venue-{id}" | "activities" | "stories"
"membership" | "contact" | "about" | "partner"
"admin-login" | "admin" | "admin-venues" | "admin-stories"
"admin-activities" | "admin-membership"
```

- `navigate(p)` ฟังก์ชันเดียวใช้ทั้ง app — `setPage(p)` + `scrollTo(0,0)`
- venue detail ใช้ pattern `venue-{docId}` แล้ว match กับ VenueContext

---

## Data Model — Venue (Firestore)

```js
{
  name, loc, region, num, status,   // ข้อมูลพื้นฐาน
  hours, address, phone, courts,
  intro,                             // paragraph แนะนำ venue

  // Hero / Background
  bg,          // gradient color hex (hero section)
  bgImage,     // URL รูป hero background (override bg)
  bg1,         // gradient color hex (detail hero)
  bg1Image,    // URL รูป detail hero (override bg1)

  // Courts Section
  courtsImageBg,      // color หรือ gradient
  courtsImageBgImage, // URL รูป courts section
  courtsImageCaption,
  courtText,
  courtText2,

  // Club Section
  clubImageBg,
  clubImageBgImage,   // URL รูป club section
  clubImageCaption,
  clubText,
  clubText2,

  imageUrl,    // cover image ของ venue card

  features: [{ num: string, label: string }]  // stats cards เช่น "4 / Courts"
}
```

---

## Admin Panel

- Route: `/admin` (guard ด้วย Firebase Auth — ถ้าไม่ login redirect ไป AdminLoginPage)
- **AdminVenuesPage** — CRUD venue: form รองรับ image upload (Supabase) + color picker (ChromePicker) สำหรับ bg fields
- **AdminStoriesPage** — CRUD stories
- **AdminActivitiesPage** — CRUD activities
- **AdminMembershipPage** — จัดการ membership plans

### Image Upload Flow

```
user เลือกไฟล์ → uploadImage() ใน supabaseClient.ts
→ อัพโหลดไปที่ Supabase Storage bucket "kross_backend"
→ path: {collection}/{docId}/{timestamp}.{ext}
→ คืน public URL → เก็บใน Firestore field
```

---

## Design System

CSS Variables หลักใน `global.css`:
- `--dark` — background หลัก (near black)
- `--mid` / `--mid2` — card backgrounds
- `--white` — text
- `--green-highlight` — accent color (CTA, active states)

Utility classes: `.btn-primary`, `.btn-ghost`, `.back-btn`, `.heading`, `.tag`, `.venue-name`

---

## Firebase Project

- Project ID: `kross-backend`
- Auth Domain: `kross-backend.firebaseapp.com`
- Firestore collections: `venues`, `stories`, `activities`, `membership` (คาดว่ามี)

## Supabase

- Bucket: `kross_backend`
- URL/Key อยู่ใน `.env` ตัวแปร `VITE_SUPABASE_URL` และ `VITE_SUPABASE_PUBLISHABLE_KEY`
