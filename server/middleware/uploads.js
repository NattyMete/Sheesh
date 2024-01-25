import { v2 as cloudinary } from 'cloudinary';
import config from 'config';
import streamifier from 'streamifier';

const cloudinaryConfig = {
    cloud_name: config.get('cloud_name'),
    api_key: config.get('api_key'),
    api_secret: config.get('api_secret'),
};

cloudinary.config(cloudinaryConfig);

export const uploadImage = async (req, res, next) => {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp: timestamp,
            },
            cloudinaryConfig.api_secret
        );

        const payload = {
            signature: signature,
            timestamp: timestamp,
            api_key: config.get('api_key'),
        };

        const data = {
            payload: payload,
            file: req.file.buffer,
        };

        const upload = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                req.body.profilePicture = result.secure_url;
                next();
            } else {
                console.log(error);
                res.status(500).send('Failed to upload image to Cloudinary');
            }
        });

        upload.on('progress', ({ loaded, total }) => {
            const progressPercentage = (loaded / total) * 100;
            console.log(`Upload progress: ${progressPercentage.toFixed(2)}%`);
        });
        
        streamifier.createReadStream(data.file).pipe(upload);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Example usage in Express
// const express = require('express');
// const app = express();

// app.post('/upload', uploadImage);

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
