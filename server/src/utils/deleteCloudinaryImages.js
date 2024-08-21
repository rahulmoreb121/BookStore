import { v2 as cloudinary } from 'cloudinary';
export const deleteCloudinaryImages = async (imageId) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
    });
    const result = await cloudinary.uploader.destroy(imageId);
    console.log(result);
    
    return result;
  } catch (err) {
    throw Error(err);
  }
};
