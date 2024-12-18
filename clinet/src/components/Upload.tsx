'use client'
import React, { useState } from 'react';
import axios from 'axios';
import DownloadCV from './DownloadCV';

const UploadComponent = () => {
    const [files, setFiles] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [parsedData, setParsedData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleUpload = async () => {
        if (!files.length) {
            setResponseMessage('Select a file first');
            return;
        }

        const formData = new FormData();
        files.forEach(file => formData.append('images', file));

        setLoading(true);
        setResponseMessage('Uploading...');

        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const rawResponses = response?.data || [];
            const parsedResponses = rawResponses.map(item => JSON.parse(item?.Response));
            setParsedData(parsedResponses);
            setResponseMessage('Upload Successful');
        } catch (error) {
            console.error(error);
            setResponseMessage('Error during upload');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Upload Your Files</h2>
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ marginBottom: '10px' }}
            />
            <button
                onClick={handleUpload}
                disabled={loading}
                style={{
                    backgroundColor: '#FF477E',
                    color: '#ffffff',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '5px',
                }}
            >
                {loading ? 'Uploading...' : 'Upload'}
            </button>

            {responseMessage && <p>{responseMessage}</p>}

            {/* Render DownloadCV only if data is loaded */}
            {parsedData.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <DownloadCV parsedData={parsedData} />
                </div>
            )}
        </div>
    );
};

export default UploadComponent;
