const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadImage = async (
  file: File,
  collection: string,
  docId: string
): Promise<string> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  // จะสร้างโฟลเดอร์ collection/docId
  formData.append("folder", `${collection}/${docId}`);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Upload failed");
  }

  return data.secure_url;
};

// แปลง URL ต้นฉบับเป็นเวอร์ชันย่อ (เฉพาะ URL ของ Cloudinary ที่ยังไม่มี transform)
export const cldImg = (url: string | undefined | null, w = 1200): string | undefined => {
  if (!url || !url.includes("res.cloudinary.com") || /\/upload\/[^/]*(f_auto|w_\d)/.test(url)) {
    return url ?? undefined;
  }
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${w},c_limit/`);
};
