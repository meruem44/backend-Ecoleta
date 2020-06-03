import * as dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import crypto from 'crypto';

const storageTypes = {
    s3: multerS3({
        s3: new aws.S3({
            accessKeyId:process.env.AWS_KEY_ID,
            secretAccessKey:process.env.AWS_SECRET_ID,
            
        }),
        bucket:'ecoleta',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
            });
        },
    })
};

export default {
    storage: storageTypes['s3'],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req: Request, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/svg+xml'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }else {
            cb(new Error('Invalid file type'));
        }
    },
};