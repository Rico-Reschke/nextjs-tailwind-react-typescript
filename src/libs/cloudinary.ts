import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

export const uploadImage = (
  file: File,
): Promise<UploadApiResponse | undefined> => {
  return new Promise(async (resolve, reject) => {
    // Convert the ArrayBuffer to a Readable stream
    const buffer = Buffer.from(await file.arrayBuffer());
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null); // Signal the end of file data

    // Upload the file to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        public_id: file.name, // Assuming file.name is 'image.jpg', public_id will be 'image'
      },
      (error, result) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    readableStream.pipe(uploadStream); // Pipe the Readable stream to the Cloudinary upload stream
  });
};
