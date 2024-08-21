import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
const uploadPhotoCloudinary = async (localFilePath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });
    if (!localFilePath) {
      throw new Error('no localfile path found');
    }
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    console.log(uploadResult);
    await fs.unlinkSync(localFilePath);
    return uploadResult.url;
  } catch (error) {
    await fs.unlinkSync(localFilePath);
    throw error;
  }
};

export { uploadPhotoCloudinary };
