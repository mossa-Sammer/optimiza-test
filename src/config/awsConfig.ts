import AWS from 'aws-sdk';

export const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: 'eu-west-3',
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

export const bucketName = 'imagestore1ps';

export const imagePrefix = `https://${bucketName}.s3.eu-west-3.amazonaws.com/`;
