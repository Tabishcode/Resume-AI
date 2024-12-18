import React, { useRef, useEffect } from "react";
import html2canvas from "html2canvas";

const DownloadCV = () => {
    const cvRef = useRef<HTMLDivElement>(null);

    const handleDownloadAll = async () => {
        if (!cvRef.current) {
            console.error("CV element not found.");
            return;
        }

        try {
            const canvas = await html2canvas(cvRef.current, {
                useCORS: true,
                logging: true,
                backgroundColor: "#FFFFFF", // Force background fallback to white.
                // Strip advanced computed styles interfering with rendering.
                ignoreElements: (element) => {
                    const computedStyle = window.getComputedStyle(element);
                    return computedStyle.color.includes("oklch"); // Avoid unsupported `oklch`
                },
            });

            const imgData = canvas.toDataURL("image/png");

            const downloadLink = document.createElement("a");
            downloadLink.href = imgData;
            downloadLink.download = "my-cv.png";
            downloadLink.click();
        } catch (error) {
            console.error("Error generating CV image", error);
        }
    };

    // Explicitly force override of any modern CSS or inherited values.
    useEffect(() => {
        if (cvRef.current) {
            cvRef.current.style.setProperty("background-color", "#FFFFFF", "important");
            cvRef.current.style.setProperty("color", "black", "important");
            cvRef.current.style.setProperty("font-family", "Arial, sans-serif", "important");
            cvRef.current.style.setProperty("border", "none", "important");
        }
    }, []);

    return (
        <>
            {/* Area to capture for the CV */}
            <div
                ref={cvRef}
                className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
            >
                <h2 className="text-xl font-bold mb-4 text-center">My CV</h2>
                <div className="space-y-4">
                    <p><strong>Name:</strong> Tabish Akhtar</p>
                    <p><strong>Role:</strong> Full Stack Developer</p>
                    <p><strong>Skills:</strong> React, Next.js, Node.js, Django, MERN, HTML, CSS</p>
                    <p><strong>Experience:</strong> 2 years of frontend development experience and full-stack expertise</p>
                    <p><strong>Education:</strong> Bachelor's in Computer Science</p>
                </div>
            </div>

            {/* Button to trigger download */}
            <button
                onClick={handleDownloadAll}
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
                Download My CV
            </button>
        </>
    );
};

export default DownloadCV;
