import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';


const ImageUploader = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log('file', file)
    onImageUpload(file);

  }, [onImageUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()} className="dropzone mb-4">
      <input {...getInputProps()} />
      <p className="text-gray-600 text-sm">Drag 'n' drop an image here, or click to select one</p>
    </div>
  );
};

export default ImageUploader;
