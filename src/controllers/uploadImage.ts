import { Request, Response, NextFunction } from 'express';
import { bucketName, imagePrefix, s3 } from '../config/awsConfig';

import { v4 as uuid } from 'uuid';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.body;
  const imageKey = uuid();
  try {
    const uploadURL = await s3.getSignedUrlPromise('putObject', {
      Bucket: bucketName,
      ContentType: type,
      Key: imageKey,
    });
    res.json({
      uploadURL,
      imageUrl: `${imagePrefix}/${imageKey}`,
    });
  } catch (e) {
    next(e);
  }
};
