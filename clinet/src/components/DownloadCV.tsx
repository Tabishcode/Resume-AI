import React from "react";
import { jsPDF } from "jspdf";

const CVDownloadComponent = ({ cvData }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.text(cvData.Name, 10, 10);

        doc.setFont("helvetica", "normal");
        doc.text(`Phone: ${cvData.Phone}`, 10, 20);
        doc.text(`Email: ${cvData.Email}`, 10, 30);
        doc.text(`LinkedIn: ${cvData.LinkedIn}`, 10, 40);
        doc.text(`GitHub: ${cvData.GitHub}`, 10, 50);

        // Education Section
        doc.text("Education:", 10, 60);
        cvData.Education.forEach((edu, index) => {
            const yOffset = 70 + index * 20;
            doc.text(`${edu.Degree}, ${edu.Institution}`, 10, yOffset);
            doc.text(`${edu.Dates} | ${edu.Location}`, 10, yOffset + 10);
            doc.text("Coursework:", 10, yOffset + 20);
            edu.Coursework.forEach((course, i) => {
                doc.text(`- ${course}`, 15, yOffset + 30 + i * 10);
            });
        });

        // Experience Section
        doc.text("Experience:", 10, 140);
        cvData.Experience.forEach((exp, index) => {
            const yOffset = 150 + index * 40;
            doc.text(`${exp.Title} at ${exp.Company}`, 10, yOffset);
            doc.text(`${exp.Dates} | ${exp.Location}`, 10, yOffset + 10);
            exp.Description.forEach((desc, i) => {
                doc.text(`- ${desc}`, 15, yOffset + 20 + i * 10);
            });
        });

        // Projects Section
        doc.text("Projects:", 10, 200);
        cvData.Projects.forEach((project, index) => {
            const yOffset = 210 + index * 40;
            doc.text(`${project.Name} (${project.Date})`, 10, yOffset);
            doc.text(`Technologies: ${project.Technologies}`, 10, yOffset + 10);
            project.Links.forEach((link, i) => {
                doc.text(`- ${link}`, 15, yOffset + 20 + i * 10);
            });
            project.Description.forEach((desc, i) => {
                doc.text(`- ${desc}`, 15, yOffset + 40 + i * 10);
            });
        });

        doc.save("CV.pdf");
    };

    return (
        <div>
            <h1>{cvData.Name}</h1>
            <p>Phone: {cvData.Phone}</p>
            <p>Email: {cvData.Email}</p>
            <p>
                LinkedIn: <a href={`https://${cvData.LinkedIn}`}>{cvData.LinkedIn}</a>
            </p>
            <p>
                GitHub: <a href={`https://${cvData.GitHub}`}>{cvData.GitHub}</a>
            </p>

            <h2>Education</h2>
            {cvData.Education.map((edu, index) => (
                <div key={index}>
                    <h3>{edu.Degree}</h3>
                    <p>
                        {edu.Institution}, {edu.Location}
                    </p>
                    <p>{edu.Dates}</p>
                    <ul>
                        {edu.Coursework.map((course, i) => (
                            <li key={i}>{course}</li>
                        ))}
                    </ul>
                </div>
            ))}

            <h2>Experience</h2>
            {cvData.Experience.map((exp, index) => (
                <div key={index}>
                    <h3>{exp.Title} at {exp.Company}</h3>
                    <p>{exp.Dates} | {exp.Location}</p>
                    <ul>
                        {exp.Description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                        ))}
                    </ul>
                </div>
            ))}

            <h2>Projects</h2>
            {cvData.Projects.map((project, index) => (
                <div key={index}>
                    <h3>{project.Name}</h3>
                    <p>Technologies: {project.Technologies}</p>
                    <ul>
                        {project.Links.map((link, i) => (
                            <li key={i}>
                                <a href={`https://${link}`}>{link}</a>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {project.Description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                        ))}
                    </ul>
                </div>
            ))}

            <button onClick={generatePDF}>Download PDF</button>
        </div>
    );
};

export default CVDownloadComponent;
