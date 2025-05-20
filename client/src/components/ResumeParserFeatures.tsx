import React from "react";
import { LuGoal } from "react-icons/lu";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { MdGeneratingTokens } from "react-icons/md";

const ResumeParserFeatures = () => {
    const features = [
        {
            icon: <LuGoal className="text-primary w-16 h-16" />,
            title: "High Accuracy at Speed",
            description:
                "Our resume parser extracts 200+ key data points in seconds. You can parse 100,000+ resumes in minutes with unmatched speed and accuracy. Our AI-powered Resume Parser API simplifies resume data.",
        },
        {
            icon: <BiSolidSelectMultiple className="text-primary w-16 h-16" />,
            title: "Multiple Formats",
            description:
                "You can parse resumes in PDF, DOC, DOCX, IMG, TXT, HTML or Word format and export them as CSV, JSON, XLS, DOC, or PDF. You can configure our AI Resume Parser API to customize resume export templates.",
        },
        {
            icon: <MdGeneratingTokens className="text-primary w-16 h-16" />,
            title: "Integrate Your ATS",
            description:
                "Our resume parser API integrates seamlessly with your HRIS, ATS, and other HR tools. This enables a smooth and automated data flow. Our CV parser helps you hire strategically with accurate and efficient results.",
        },
    ];

    return (
        <div className="max-w-screen-2xl mx-auto w-full lg:px-20 md:px-10 px-4  pb-10 flex items-center flex-col">
            <h2 className="text-3xl md:text-5xl md:leading-[3.5rem] font-medium text-center">
                <p className="font-medium">Key Features That Make</p>
                <p className="text-primary font-bold">Our Resume Parser Stand Out</p>
            </h2>
            <div className="grid lg:grid-cols-12 gap-6 mt-12 grid-cols-4 mx-auto">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-[#F6F4F9] max-w-[400px] p-8 md:p-10 col-span-4 space-y-3 rounded-3xl"
                    >
                        <div className="rounded-xl p-3 md:p-4 flex items-center justify-center bg-white">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-[#404554]">
                            {feature.title}
                        </h3>
                        <p className="md:text-base">{feature.description}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-16">
                <a
                    className="inline-flex items-center justify-center space-x-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 w-[195px] h-12 font-bold text-[15px]"
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span>Try Now For Free</span>
                </a>
            </div>
        </div>
    );
};

export default ResumeParserFeatures;
