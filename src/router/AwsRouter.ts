import express from 'express';
import { hasPermissionToCreate, isAuthenticated } from '../security/Authentication';
import multer from 'multer';
import path from 'path';
import {S3Client} from '@aws-sdk/client-s3'
import multers3 from 'multer-s3';
import { saveImageIntoAWS } from '../controller/AwsController';

const bucket = process.env.BUCKET_NAME
const accessKeyId = process.env.ACCESS_ID
const secretAccessKey = process.env.ACCESS_KEY

const s3 = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

const upload = multer({
    storage: multers3({
      s3: s3,
      bucket: bucket,
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + path.extname(file.originalname));
      },
      acl: 'public-read'
    })
  });
  
export default(router: express.Router) => {
    router.post("/asset/aws", isAuthenticated, hasPermissionToCreate, upload.single('file'), saveImageIntoAWS)
}