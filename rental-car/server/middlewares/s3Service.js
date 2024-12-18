import { v4 as uuidv4 } from 'uuid'
import { config } from 'dotenv'
import AWS from 'aws-sdk'

config()
export const s3Uploadv2 = async (files) => {
  const s3 = new AWS.S3();

  const params = files.map((file) => {
    return {
      Bucket: process.env.BUCKET_NAME,
      Key: `uploads/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',  // Make the files publicly accessible
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};

export const s3Delete = async (images) => {
  const s3 = new AWS.S3();

  if (images && images[0].startsWith('https://vehicle-s3.s3.eu-north-1.amazonaws.com/')) {
    let getKeys = images.map((image) => {
      return {
        Key: image.split('/').slice(3).join('/'),
      };
    });

    const params = {
      Bucket: process.env.BUCKET_NAME,
      Delete: {
        Objects: getKeys,
        Quiet: false,
      },
    };

    return s3.deleteObjects(params).promise();
  } else {
    console.log('URL does not match expected S3 format.');
  }
};
