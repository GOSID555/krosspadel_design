# Contact Form Email Setup (Web3Forms)

ฟอร์มหน้า **Contact** (`src/pages/ContactPage.jsx`) ส่งอีเมลผ่านบริการ **Web3Forms**
เว็บนี้เป็น frontend ล้วน (Vite SPA ไม่มี backend) จึงใช้ Web3Forms ยิงอีเมลจากหน้าเว็บได้โดยตรง

> เดิมใช้ EmailJS — ถอดออกแล้ว (ลบ `@emailjs/browser` ออกจาก dependencies ด้วย)

---

## ข้อความลูกค้าเข้ากล่องไหน?

Web3Forms จะส่งอีเมล **ไปยังกล่องที่ผูกกับ access key เท่านั้น** (กำหนดตอนสมัคร ไม่ได้ตั้งในโค้ด
เพื่อกันการสแปม) ปัจจุบันต้องการให้เข้ากล่อง **krossinfo**

## วิธีตั้งค่า / เปลี่ยนกล่องปลายทาง

1. เข้า https://web3forms.com
2. กรอกอีเมลปลายทางที่อยากให้ข้อความลูกค้าเข้า (กล่อง **krossinfo**) → กด **Create Access Key**
3. เปิดเมลกล่องนั้น จะได้ **Access Key** มา (เป็นสตริงรูปแบบ UUID)
4. เอา key มาวางใน `src/pages/ContactPage.jsx`:

   ```js
   const WEB3FORMS_ACCESS_KEY = "วาง-access-key-ที่นี่";
   ```

5. บันทึก → ข้อความจากฟอร์มจะวิ่งเข้ากล่องปลายทางทันที (ไม่ต้อง deploy ตัว backend อะไรเพิ่ม)

**ถ้าจะเปลี่ยนกล่องปลายทางในอนาคต:** สมัคร access key ใหม่ด้วยอีเมลใหม่ แล้วเปลี่ยนค่า
`WEB3FORMS_ACCESS_KEY` เป็น key ตัวใหม่ (เปลี่ยนปลายทาง = เปลี่ยน key เท่านั้น)

---

## โค้ดทำงานยังไง (สรุป)

`handleSubmit` ใน `ContactPage.jsx` ส่ง `POST` ไปที่ `https://api.web3forms.com/submit`
พร้อม body เป็น JSON:

```js
{
  access_key: WEB3FORMS_ACCESS_KEY,
  subject: "[KROSS Contact] <title> — <ชื่อ>",
  from_name: "<ชื่อ นามสกุล>",
  // ...ฟิลด์จากฟอร์ม: name, last_name, email, title, message
}
```

ถ้า response `data.success === true` ถือว่าส่งสำเร็จ (แจ้ง "Message sent!"),
ถ้าไม่ใช่จะแจ้ง "Failed to send. Please try again."

## หมายเหตุ

- **Access key เปิดเผยใน frontend ได้** เป็นเรื่องปกติของ Web3Forms (ออกแบบมาให้ใช้ฝั่ง client)
  ตัว key คุมได้แค่ "ส่งเข้ากล่องที่ผูกไว้" เปลี่ยนปลายทางเองไม่ได้ จึงไม่ใช่ความลับ
- โควตาฟรี: ~250 ข้อความ/เดือน (ดูเงื่อนไขล่าสุดที่ web3forms.com)
- อยากกัน spam เพิ่ม: Web3Forms รองรับ honeypot / hCaptcha (ตั้งใน dashboard + เพิ่มฟิลด์ในฟอร์ม)
- อีเมลที่แสดงบนหน้า Contact (`info@krosspadel.com`) เป็นแค่ข้อความที่โชว์ ไม่เกี่ยวกับปลายทางจริง
  ของฟอร์ม — ถ้าอยากให้ตรงกัน แก้ได้ใน `src/pages/ContactPage.jsx`
