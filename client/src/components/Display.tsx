'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadCSV from './DownloadCSV';
import DownloadCV from './DownloadCV';
import { useUser } from '@clerk/clerk-react';

interface ParsedResume {
    Name: string;
    Profile: string;
    Education: string[] | string;
    Skills: string[] | string;
    Projects: string[] | string;
    Phone: string;
    Email: string;
    LinkedIn: string;
    GitHub: string;
}

const DisplayComponent: React.FC = () => {
    const { user } = useUser();
    const [data, setData] = useState<ParsedResume[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<{ data: string }[]>('http://localhost:5000/get_all');
                const skimmedData: ParsedResume[] = response.data.map((d) => JSON.parse(d.data));
                console.log("Skimmed data:", skimmedData);
                setData(skimmedData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {!user ? (
                <div className="h-[500px] bg-red-500 flex items-center justify-center text-white text-2xl">
                    <div className="text-center">
                        <p>Please login first to see history 🤔🔒</p>
                    </div>
                </div>
            ) : (
                <div>
                    {data.length > 0 ? (
                        <div className="relative flex justify-left items-start min-h-screen bg-gray-100">
                            <div>
                                <h3 className="text-center text-2xl mt-3 font-semibold text-gray-800 mb-2">
                                    Parsed Resumes History
                                </h3>

                                <div className="overflow-y-auto max-h-[600px] w-[950px] bg-white rounded-lg shadow-lg border border-gray-300 p-6">
                                    {data.map((resume, index) => (
                                        <div
                                            key={index}
                                            className="mb-10 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
                                        >
                                            <h4 className="text-xl font-bold text-gray-900 mb-3">{resume.Name}</h4>
                                            <p className="text-sm text-gray-700">{resume.Profile}</p>

                                            <div className="mt-6">
                                                <h5 className="text-lg font-semibold text-gray-800 mb-3">Education</h5>
                                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                                    {Array.isArray(resume.Education) ? (
                                                        resume.Education.map((edu, idx) => (
                                                            <li key={idx} className="text-sm">
                                                                {edu}
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className="text-sm">{resume.Education}</li>
                                                    )}
                                                </ul>
                                            </div>

                                            <div className="mt-6">
                                                <h5 className="text-lg font-semibold text-gray-800 mb-3">Skills</h5>
                                                <ul className="flex flex-wrap gap-2">
                                                    {Array.isArray(resume.Skills) ? (
                                                        resume.Skills.map((skill, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm">{resume.Skills}</span>
                                                    )}
                                                </ul>
                                            </div>

                                            <div className="mt-6">
                                                <h5 className="text-lg font-semibold text-gray-800 mb-3">Projects</h5>
                                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                                    {Array.isArray(resume.Projects) ? (
                                                        resume.Projects.map((project, idx) => (
                                                            <li key={idx} className="text-sm">
                                                                {project}
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <li className="text-sm">{resume.Projects}</li>
                                                    )}
                                                </ul>
                                            </div>

                                            <div className="mt-6">
                                                <h5 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h5>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    <strong>Phone:</strong> {resume.Phone}
                                                </p>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    <strong>Email:</strong> {resume.Email}
                                                </p>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    <strong>LinkedIn:</strong>{' '}
                                                    <a href={resume.LinkedIn} className="text-blue-600 underline">
                                                        {resume.LinkedIn}
                                                    </a>
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    <strong>GitHub:</strong>{' '}
                                                    <a href={resume.GitHub} className="text-blue-600 underline">
                                                        {resume.GitHub}
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center mt-6 ml-4">
                                    <DownloadCV dataNew={data} />
                                    <div className="mt-3">
                                        <DownloadCSV data={data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center mt-10 text-gray-600">No parsed data available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DisplayComponent;
