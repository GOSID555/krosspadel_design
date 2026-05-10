import { describe, it, expect } from "vitest";
import { locationWord, totalCourts } from "./venueUtils";

// -------------------------------------------------------
// locationWord
// -------------------------------------------------------
describe("locationWord", () => {
    it("แปลง 0–10 เป็นคำภาษาอังกฤษ", () => {
        expect(locationWord(0)).toBe("Zero");
        expect(locationWord(1)).toBe("One");
        expect(locationWord(4)).toBe("Four");
        expect(locationWord(10)).toBe("Ten");
    });

    it("ตัวเลขเกิน 10 คืนเป็น string ตัวเลข", () => {
        expect(locationWord(11)).toBe("11");
        expect(locationWord(99)).toBe("99");
    });
});

// -------------------------------------------------------
// totalCourts
// -------------------------------------------------------
describe("totalCourts", () => {
    it("บวกจำนวน courts ทั้งหมด", () => {
        expect(totalCourts([{ courts: 6 }, { courts: 4 }])).toBe(10);
    });

    it("ข้าม venue ที่ courts เป็น undefined หรือว่าง", () => {
        expect(totalCourts([{ courts: 6 }, { courts: undefined }])).toBe(6);
        expect(totalCourts([{ courts: 6 }, { courts: "" }])).toBe(6);
    });

    it("รับ string ตัวเลขได้", () => {
        expect(totalCourts([{ courts: "8" }, { courts: "5" }])).toBe(13);
    });

    it("venues ว่างคืน 0", () => {
        expect(totalCourts([])).toBe(0);
    });

    it("ทุก venue ไม่มีตัวเลข คืน 0", () => {
        expect(totalCourts([{ courts: "" }, { courts: undefined }])).toBe(0);
    });
});
