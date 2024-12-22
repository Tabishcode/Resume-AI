'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadCSV from './DownloadCSV';
import DownloadCV from './DownloadCV';
import { useUser } from '@clerk/clerk-react';


const DisplayComponent = ({  }) => {
    const { user } = useUser();
    const [data, setData] = useState([]);
    const parsedData = data;
    const userId =  user.id;
    useEffect(() => {
        try {
            axios.get('http://localhost:5000/get_all')
                .then((response) => {
                    let skimmedData = response.data.map((d) => JSON.parse(d.data));
                    console.log("Skimmed data:", skimmedData);
                    setData(skimmedData);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className=''> 
            {!user ? <div className="h-[500px] bg-red-500 flex items-center justify-center text-white text-2xl">
                <div className="text-center">
                    <p>Please login first to see history 🤔🔒</p>
                </div>
            </div>
: <div>
        <div>
            {parsedData.length > 0 ? (
                <div className="relative flex justify-left items-start min-h-screen bg-gray-100">
                    {/* Parsed Data Container */}
                   
                   <div>
                    <h3 className="text-center text-2xl mt-3 font-semibold text-gray-800 mb-2">
                        Parsed Resumes History
                    </h3>

                    <div className="overflow-y-auto max-h-[600px] w-[950px] bg-white rounded-lg shadow-lg border border-gray-300 p-6">
                        
                        {/* Parsed Data */}
                        {parsedData.map((data, index) => (
                            <div
                                key={index}
                                className="mb-10 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
                            >
                                {/* Name and Profile */}
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{data.Name}</h4>
                                <p className="text-sm text-gray-700">{data.Profile}</p>

                                {/* Education */}
                                <div className="mt-6">
                                    <h5 className="text-lg font-semibold text-gray-800 mb-3">Education</h5>
                                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                                        {Array.isArray(data.Education) ? (
                                            data.Education.map((edu, idx) => (
                                                <li key={idx} className="text-sm">
                                                    {edu}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm">{data.Education}</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Skills */}
                                <div className="mt-6">
                                    <h5 className="text-lg font-semibold text-gray-800 mb-3">Skills</h5>
                                    <ul className="flex flex-wrap gap-2">
                                        {Array.isArray(data.Skills) ? (
                                            data.Skills.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-sm">{data.Skills}</span>
                                        )}
                                    </ul>
                                </div>

                                {/* Projects */}
                                <div className="mt-6">
                                    <h5 className="text-lg font-semibold text-gray-800 mb-3">Projects</h5>
                                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                                        {Array.isArray(data.Projects) ? (
                                            data.Projects.map((project, idx) => (
                                                <li key={idx} className="text-sm">
                                                    {project}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm">{data.Projects}</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Contact Information */}
                                <div className="mt-6">
                                    <h5 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h5>
                                    <p className="text-sm text-gray-700 mb-2">
                                        <strong>Phone:</strong> {data.Phone}
                                    </p>
                                    <p className="text-sm text-gray-700 mb-2">
                                        <strong>Email:</strong> {data.Email}
                                    </p>
                                    <p className="text-sm text-gray-700 mb-2">
                                        <strong>LinkedIn:</strong> <a href={data.LinkedIn} className="text-blue-600 underline">{data.LinkedIn}</a>
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <strong>GitHub:</strong> <a href={data.GitHub} className="text-blue-600 underline">{data.GitHub}</a>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                    <div className='text-center mt-6 ml-4'>
                        <div className="  ">
                            <DownloadCV dataNew={parsedData} />
                        </div>
                        <div className="mt-3 ">
                            {/* <button className='px-10 bg-green-500 hover:bg-green-500/90 btn text-white' onClick={handleSave}>Save to Database</button> */}
                            <DownloadCSV data={parsedData} />
                        </div>
                    </div>
                </div>
            ) : (
                <p>No parsed data available.</p>
            )}
            </div>
        </div>}
        </div>
    );
};

export default DisplayComponent;
