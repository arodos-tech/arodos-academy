import axios from "axios";
import { IMAGE_UPLOAD_URL, UPLOAD_DIR, UPLOAD_ID, UPLOAD_PASS } from "@/lib/constants";
import { compressImage } from "@/lib/image-compression";

export async function uploadMedia(file: File, folderName: string) {
  const formData = new FormData();
  let fileToUpload = file;

  // Only compress if it's an image file
  if (file.type.startsWith("image/")) {
    const compressed = await compressImage(file);
    if (!compressed) throw new Error("Failed to compress image");
    fileToUpload = compressed;
  }

  const appName = UPLOAD_DIR.split(" ").join("-").toLocaleLowerCase();
  formData.append("folder", `${appName}/${folderName}`);
  formData.append("image", fileToUpload);

  const { data } = await axios.post(IMAGE_UPLOAD_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      username: UPLOAD_ID,
      password: UPLOAD_PASS,
    },
  });
  // console.log("data", data);
  return data;
}
