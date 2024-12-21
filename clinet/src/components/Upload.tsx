"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DownloadCV from "./DownloadCV";

const UploadComponent = ({ initialFiles }) => {
  const [files, setFiles] = useState(
    Array.isArray(initialFiles) ? initialFiles : []
  );
  const [responseMessage, setResponseMessage] = useState("");
  const [parsedData, setParsedData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFiles(Array.isArray(initialFiles) ? initialFiles : []);
  }, [initialFiles]);

  const handleUpload = async () => {
    if (!files.length) {
      setResponseMessage("Select a file first");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    setLoading(true);
    setResponseMessage("Uploading...");

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
      setResponseMessage("Upload Successful");
    } catch (error) {
      console.error(error);
      setResponseMessage("Error during upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white w-[1100px] h-[500px] p-5">
      <div className="text-right">
        <h2>Your Files</h2>

        {files.length > 0 && (
          <ul className="list-disc pl-5">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-[#FF477E] text-white py-2 px-4 rounded-md"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {responseMessage && <p>{responseMessage}</p>}
      </div>

      {parsedData.length > 0 && (
        <div>
          <DownloadCV dataNew={parsedData}/>
        <div className="overflow-y-auto h-[500px] w-[700px] text-left absolute bg-black top-2">
          <h3 className="text-center text-2xl mb-5">Parsed Data:</h3>
          
          <div className="mt-5 font-sans leading-6">
            <h3 className="text-center text-3xl mb-5">Parsed CV</h3>

            {parsedData.map((data, index) => (
              <div
                key={index}
                className="mb-8 p-5 border border-gray-300 rounded-lg"
              >
                <h4 className="text-xl mb-3 text-gray-800">{data.Name}</h4>
                <p className="text-lg text-gray-600">{data.Profile}</p>

                <div className="mt-5">
                  <h5 className="text-xl mb-3">Education:</h5>
                  <ul className="pl-5 list-disc">
                    {data.Education &&
                      data.Education.map((edu, idx) => (
                        <li key={idx} className="text-lg mb-2">
                          {edu}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <h5 className="text-xl mb-3">Skills:</h5>
                  <ul className="pl-5 list-disc">
                    {data.Skills &&
                      data.Skills.map((skill, idx) => (
                        <li key={idx} className="text-lg mb-2">
                          {skill}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <h5 className="text-xl mb-3">Projects:</h5>
                  <ul className="pl-5 list-disc">
                    {data.Projects &&
                      data.Projects.map((project, idx) => (
                        <li key={idx} className="text-lg mb-2">
                          {project}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <h5 className="text-xl mb-3">Contact Information:</h5>
                  <p className="text-lg mb-2">
                    <strong>Phone:</strong> {data.Phone}
                  </p>
                  <p className="text-lg mb-2">
                    <strong>Email:</strong> {data.Email}
                  </p>
                  <p className="text-lg mb-2">
                    <strong>LinkedIn:</strong> {data.LinkedIn}
                  </p>
                  <p className="text-lg mb-2">
                    <strong>GitHub:</strong> {data.GitHub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;
