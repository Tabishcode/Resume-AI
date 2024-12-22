"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const UploadComponent = ({ initialFiles }) => {
  const [files, setFiles] = useState(
    Array.isArray(initialFiles) ? initialFiles : []
  );
  const [responseMessage, setResponseMessage] = useState("");
  const [parsedData, setParsedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setFiles(Array.isArray(initialFiles) ? initialFiles : []);
  }, [initialFiles]);

  useEffect(() => {
    if (parsedData.length > 0) {
      // Store both parsed data and files metadata in localStorage
      const filesMetadata = files.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      }));
      localStorage.setItem("selectedFiles", JSON.stringify(filesMetadata));
      localStorage.setItem("parsedData", JSON.stringify(parsedData));
      router.push("/CVParsing");
    }
  }, [parsedData, files, router]);

  const handleUpload = async () => {
    if (!files.length) {
      setResponseMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const rawResponses = response?.data || [];
      const parsedResponses = rawResponses.map((item) =>
        JSON.parse(item?.Response)
      );
      setParsedData(parsedResponses);
      console.log(parsedResponses)
      setResponseMessage("Upload Successful!");
    } catch (error) {
      console.error(error);
      setResponseMessage("An error occurred during upload.");
    } finally {
      setLoading(false);
    }
  };

  const closeComponent = () => {
    window.location.reload();
    
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-xl rounded-lg p-8 max-w-4xl mx-auto mt-10">
      {/* Cross Button */}
      <button
        onClick={closeComponent}
        className="absolute top-4 right-4 text-gray-200 hover:text-white text-xl font-bold"
      >
        Close
      </button>

      <h2 className="text-3xl font-extrabold mb-6 text-center">
        Upload Your Files
      </h2>

      {/* File Display */}
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
        {files.map((file, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 rounded-full px-2 py-1 text-xs font-medium truncate shadow hover:shadow-lg transition duration-200"
          >
            {file.name}
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <div className="text-center">
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full text-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Uploading..." : "Upload Files"}
        </button>
      </div>

      {/* Modern Loader */}
      {loading && (
        <div className="flex justify-center items-center mt-6">
          <div className="relative w-16 h-16">
            <div className="absolute w-full h-full border-4 border-dashed rounded-full border-white animate-spin"></div>
            <div className="absolute w-full h-full border-4 border-dotted rounded-full border-pink-300 animate-spin-slow"></div>
          </div>
        </div>
      )}

      {/* Response Message */}
      {responseMessage && (
        <p className="mt-6 text-center text-xl font-semibold">
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default UploadComponent;
