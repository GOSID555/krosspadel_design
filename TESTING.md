# KROSS Padel — Testing

## Stack

| Tool | Version | หน้าที่ |
|---|---|---|
| Vitest | ^4.1.5 | Test runner (ทำงานร่วมกับ Vite โดยตรง) |
| @testing-library/react | ^16.3.2 | Test React components |
| @testing-library/jest-dom | ^6.9.1 | Custom matchers เช่น `toBeInTheDocument()` |
| jsdom | ^29.1.1 | จำลอง browser environment |

---

## Commands

```bash
npm test           # watch mode — รัน test ซ้ำทุกครั้งที่แก้ไฟล์
npm run test:run   # รันครั้งเดียวแล้วจบ (ใช้ใน CI)
npm run test:ui    # เปิด browser UI ดู test results
```

---

## Tests ที่มีอยู่

### `src/utils/venueUtils.test.js`

ทดสอบ pure functions ใน `src/utils/venueUtils.js`

#### `locationWord(count)`
แปลงจำนวน venues เป็นคำภาษาอังกฤษ ใช้แสดงใน HomePage ("Four Locations.")

| Test case | Input | Expected |
|---|---|---|
| แปลง 0–10 เป็นคำ | `4` | `"Four"` |
| แปลง 0–10 เป็นคำ | `10` | `"Ten"` |
| เกิน 10 คืนเป็น string ตัวเลข | `11` | `"11"` |
| เกิน 10 คืนเป็น string ตัวเลข | `99` | `"99"` |

#### `totalCourts(venues)`
บวกจำนวน courts ทั้งหมดจาก array ของ venues ใช้แสดงใน VenuesPage stats

| Test case | Input | Expected |
|---|---|---|
| บวกปกติ | `[{courts:6},{courts:4}]` | `10` |
| ข้าม undefined | `[{courts:6},{courts:undefined}]` | `6` |
| ข้าม string ว่าง | `[{courts:6},{courts:""}]` | `6` |
| รับ string ตัวเลขได้ | `[{courts:"8"},{courts:"5"}]` | `13` |
| venues ว่าง | `[]` | `0` |
| ทุกอันไม่มีตัวเลข | `[{courts:""},{courts:undefined}]` | `0` |

**ผลล่าสุด:** 7/7 passed ✅

---

## โครงสร้าง Test Files

```
src/
├── test/
│   └── setup.js          # import @testing-library/jest-dom
└── utils/
    ├── venueUtils.js      # pure functions
    └── venueUtils.test.js # unit tests
```

---

## เพิ่ม Test ใหม่ยังไง

สร้างไฟล์ชื่อ `*.test.js` หรือ `*.test.jsx` ไว้ข้างๆ ไฟล์ที่จะ test

```js
import { describe, it, expect } from "vitest";
import { myFunction } from "./myFile";

describe("myFunction", () => {
    it("should do X when Y", () => {
        expect(myFunction(input)).toBe(expected);
    });
});
```

---

## สิ่งที่ควร Test เพิ่มในอนาคต

- [ ] Component test — `VenuePreview` renders ข้อมูลถูกต้อง
- [ ] Component test — `StoryPreview` แสดง cat/title/date
- [ ] Integration test — form admin บันทึกแล้ว Firestore ได้รับข้อมูลถูก
- [ ] E2E test (Playwright) — navigate ครบทุก page ไม่ crash
