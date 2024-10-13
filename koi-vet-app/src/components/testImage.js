import React, { useState } from 'react';
import api from '../utils/authorizedAxious';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadFile = async () => {
        if (!selectedFile) {
            alert("Please choose a file first!");
            return;
        }

        try {
            // Gọi API từ Spring Boot để lấy Pre-signed URL
            const response = await api.get(`images/presigned-url?imageName=${selectedFile.name}`);
            const presignedUrl = await response.data;  // API trả về URL
            console.log(`Presigned URL: ${presignedUrl}`);
            // Upload file trực tiếp lên S3 bằng Pre-signed URL
            const uploadResponse = await fetch(presignedUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': selectedFile.type,
                },
                body: selectedFile,
            });

            if (uploadResponse.ok) {
                alert('File uploaded successfully!');
            } else {
                alert('Failed to upload file.');
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileInput} />
            <button onClick={uploadFile}>Upload to S3</button>
        </div>
    );
};

export default ImageUpload;
