'use client';
import React from "react";

const DownloadCSV = ({ data }) => {
    const convertArrayToString = (arr) => {
        return arr.length ? arr.join(" : ") : "";
    };

    const downloadCSV = () => {
        const processedData = data.map((obj) => {
            const processedObj = {};
            for (let key in obj) {
                if (Array.isArray(obj[key])) {
                    // Convert arrays to strings joined by colons
                    processedObj[key] = convertArrayToString(obj[key]);
                } else {
                    // Keep other fields as they are
                    processedObj[key] = obj[key];
                }
            }
            return processedObj;
        });

        const headers = Object.keys(processedData[0]).join(",") + "\n";
        const rows = processedData
            .map((obj) => Object.values(obj).map((v) => `"${v}"`).join(","))
            .join("\n");
        const csvString = headers + rows;

        const blob = new Blob([csvString], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "data.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="btn bg-[#FB866A] hover:bg-[#FB866A]/90 text-white cursor-pointer text-sm h-10 px-4 py-2 font-medium">
            <button onClick={downloadCSV}>Download CSV</button>
        </div>
    );
};

export default DownloadCSV;