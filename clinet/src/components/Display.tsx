'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayComponent = ({ d }) => {
    let [data, setData] = useState([]);
    let parsedData = data;

    useEffect(() => {
        try {
            axios.get('http://localhost:5000/get_all')
                .then((response) => {
                    let skimmedData = response.data.map((d) => JSON.parse(d.data));
                    console.log("Skimmed data:", skimmedData);
                    setData(skimmedData);
                });
        }
        catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div>
            {parsedData.length > 0 && (
                <div>
                    {parsedData.map((data, index) => (
                        <div
                            key={index}
                            className="mb-8 p-5 border border-gray-300 rounded-lg"
                        >
                            <h4 className="text-xl mb-3 text-gray-900">{data.Name}</h4>
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
                                        Array.isArray(data.Skills) ?
                                        data.Skills.map((skill, idx) => (
                                            <li key={idx} className="text-lg mb-2">
                                                {skill}
                                            </li>
                                        ))
                                        : <li> {data.Skills} </li>
                                    }
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
            )}
        </div>
    );
};

export default DisplayComponent;s