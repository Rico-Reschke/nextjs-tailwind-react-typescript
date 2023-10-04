import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Konfigurieren von Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Konfigurieren von Multer Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary, // hier verwenden wir "cloudinary" und nicht "Cloudinary"
    params: {
        folder:'YelpCamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    } as any
});

export { cloudinary, storage };