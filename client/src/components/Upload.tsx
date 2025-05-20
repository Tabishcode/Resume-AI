"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PropagateLoader } from "react-spinners";

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
      const filesMetadata = files.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      }));
      localStorage.setItem("selectedFiles", JSON.stringify(filesMetadata));
      localStorage.setItem("parsedData", JSON.stringify(parsedData));
      router.push("/cvparsing");
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
      console.log(parsedResponses);
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
    <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-xl rounded-lg h-[400px] p-8 w-[1100px] mx-auto mt-10">
      {/* Close Button */}
      <button
        onClick={closeComponent}
        className="absolute top-4 right-4 btn btn-circle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h2 className="text-3xl font-extrabold mb-6 text-center">
        Start Parsing Now with a Single Click
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
          className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full text-lg ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Data is Parsing..." : "Start Parsing"}
        </button>
      </div>

      {/* Minimalist Loader */}
      {loading && (
        <div className="flex justify-center items-end absolute bottom-12 left-0 right-0">
          <PropagateLoader color="#36d7b7" size={25} />
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
