import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Response } from "express";

cloudinary.config({
  cloud_name: "dxeonqtqt",
  api_key: "951973593716222",
  api_secret: "jbw6V4Qlnw-dD153k_Ukz13cjN0",
  secure: true,
});

interface UploadOptions {
  folder: string;
  public_id: string;
  overwrite?: boolean;
}

 export const commonUploadOptions: UploadOptions = {
  folder: "products/cookies-images",
  public_id: `coffee-${Date.now()}`,
  overwrite: true,
};

export const handleCloudinaryUpload = async (
  options: UploadOptions,
  fileBuffer: Buffer,
  res: Response
): Promise<string | null> => {
  try {
    const result: UploadApiResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error: any, result: any) => {
          if (error) {
            console.error("Error uploading image to Cloudinary:", error);
            res.status(500).json({ error: "Internal server error" });
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(fileBuffer);
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ error: "Internal server error" });
    return null;
  }
};