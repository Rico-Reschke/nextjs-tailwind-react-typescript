import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

import { Readable } from "stream";

export const uploadImage = (
  file: any,
): Promise<UploadApiResponse | undefined> => {
  return new Promise(async (resolve, reject) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image", public_id: file.name },
      (error, result) => (error ? reject(error) : resolve(result)),
    );

    readableStream.pipe(uploadStream);
  });
}