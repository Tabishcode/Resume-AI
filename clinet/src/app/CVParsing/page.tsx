'use client'; // Ensure this is a client-side component
import { useState, useEffect } from 'react';
import DownloadCV from '../../components/DownloadCV';

const CVParsing = () => {
  const [filesMetadata, setFilesMetadata] = useState<
    { name: string; type: string; size: number }[]
  >([]);
  const [parsedData, setParsedData] = useState<any[]>([]); // Adjust type based on your parsed data structure
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Track selected file index

  useEffect(() => {
    // Retrieve stored files metadata from localStorage
    const storedFiles = localStorage.getItem('selectedFiles');
    if (storedFiles) {
      try {
        const parsedFiles = JSON.parse(storedFiles);
        if (Array.isArray(parsedFiles)) {
          setFilesMetadata(parsedFiles);
        }
      } catch (error) {
        console.error('Error parsing stored files metadata:', error);
      }
    }

    // Retrieve parsed data from localStorage
    const storedParsedData = localStorage.getItem('parsedData');
    if (storedParsedData) {
      try {
        const parsed = JSON.parse(storedParsedData);
        if (Array.isArray(parsed)) {
          setParsedData(parsed);
        }
      } catch (error) {
        console.error('Error parsing stored parsed data:', error);
      }
    }
  }, []);

  const handleFileClick = (index: number) => {
    setSelectedIndex(index); // Set the selected file index
  };

  return (
    <div className="flex p-1">
      <div className="p-4 w-[25%]">
        <h1 className="text-xl font-bold mb-1">CV Parsing Page</h1>

        {/* File Metadata */}
        <h2 className="text-sm font-semibold mb-2">Received Files:</h2>
        {filesMetadata.length > 0 ? (
          <div className="flex flex-col items-start gap-1">
            {filesMetadata.map((file, index) => (
              <button
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded shadow-sm hover:bg-gray-200 transition w-max"
                onClick={() => handleFileClick(index)} // Set the selected file index on click
              >
                {file.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-600">No files received.</p>
        )}
        <div className="absolute top-[450px] left-28 w-[60vw] ">
          <button className='px-10 bg-primary hover:bg-primary/90 btn'>Save</button>
        </div>
        <div className="absolute top-[490px] left-[-220px] w-[60vw]">
          
          <DownloadCV dataNew={parsedData} />
        </div>
      </div>

      <div className="w-[75%]">
        {/* Parsed Data */}
        <h2 className="text-xl font-semibold  mb-4">Parsed Data:</h2>
        {parsedData.length > 0 && selectedIndex !== null ? (
          <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
            {/* Parsed Data Container */}
            <div className="overflow-y-auto max-h-[600px] bg-white rounded-lg shadow-lg border border-gray-300 ">
              {/* Display Parsed Data based on selectedIndex */}
              {parsedData[selectedIndex] && (
                <div className="mb-10 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow ">
                  {/* Name and Profile */}
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {parsedData[selectedIndex].Name}
                  </h4>
                  <p className="text-sm text-gray-700">
                    {parsedData[selectedIndex].Profile}
                  </p>

                  {/* Education */}
                  <div className="mt-6">
                    <h5 className="text-lg font-semibold text-gray-800 mb-3">
                      Education
                    </h5>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      {parsedData[selectedIndex].Education?.map((edu, idx) => (
                        <li key={idx} className="text-sm">
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div className="mt-6">
                    <h5 className="text-lg font-semibold text-gray-800 mb-3">Skills</h5>
                    {Array.isArray(parsedData[selectedIndex]?.Skills) ? (
                      <ul className="flex flex-wrap gap-2">
                        {parsedData[selectedIndex].Skills?.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-700">{parsedData[selectedIndex]?.Skills}</p>
                    )}
                  </div>


                  {/* Projects */}
                  <div className="mt-6">
                    <h5 className="text-lg font-semibold text-gray-800 mb-3">
                      Projects
                    </h5>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      {parsedData[selectedIndex].Projects?.map((project, idx) => (
                        <li key={idx} className="text-sm">
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact Information */}
                  <div className="mt-6">
                    <h5 className="text-lg font-semibold text-gray-800 mb-3">
                      Contact Information
                    </h5>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Phone:</strong> {parsedData[selectedIndex].Phone}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Email:</strong> {parsedData[selectedIndex].Email}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>LinkedIn:</strong>{' '}
                      <a
                        href={parsedData[selectedIndex].LinkedIn}
                        className="text-blue-600 underline"
                      >
                        {parsedData[selectedIndex].LinkedIn}
                      </a>
                    </p>
                    <p className="text-sm text-gray-700 mb-24">
                      <strong>GitHub:</strong>{' '}
                      <a
                        href={parsedData[selectedIndex].GitHub}
                        className="text-blue-600 underline"
                      >
                        {parsedData[selectedIndex].GitHub}
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>No parsed data available.</p>
        )}
      </div>
    </div>
  );
};

export default CVParsing;
