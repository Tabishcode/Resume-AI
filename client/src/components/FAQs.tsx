'use client';
import React, { useState } from "react";

const FAQs: React.FC = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    // Correct type for index: number
    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqItems = [
        {
            question: "What is resume parsing?",
            answer:
                "Resume parsing is an AI-driven process of extracting information from resumes or CVs. The information includes education, experience, skills, contact details, and more. After extraction, the resume parser quickly turns unstructured data into organized fields. This process speeds up candidate filtering by up to 70% and improves hiring efficiency.",
        },
        {
            question: "How do I parse my resume?",
            answer:
                "To parse a resume, upload it to a resume parser tool or ATS with parsing capabilities. The tool scans the document, extracts relevant information, and converts it into a structured format. Now, you can download or sync with your ATS, HRM, and other HR tools to easily search and filter.",
        },
        {
            question: "How does resume parsing work?",
            answer:
                "Resume parsing uses machine learning and natural language processing to analyze resume text. It identifies patterns to classify data like names, skills, job titles, education, and more. The parsing process takes unstructured information from resumes and organizes it into structured fields. This organized data is then stored in the recruiter's ATS to filter and search for candidates by relevant qualifications.",
        },
        {
            question: "How does resume parsing help recruiters?",
            answer:
                "Recruiters can save more than 70% of their time by using a resume parser tool. It speeds up recruitment by automating data extraction, reducing manual entry, and enabling recruiters to search for specific skills or experience. This technology boosts candidate searchability and ATS accuracy. This helps recruiters find qualified candidates faster and hire them sooner.",
        },
        {
            question: "Is my data secure when using the resume parser?",
            answer:
                "Yes, your data is extremely secure. Skima AI resume parser is SOC 2 compliant and follows strict security standards. It uses end-to-end encryption and secure storage. This setup protects sensitive candidate information from unauthorized access. So, both recruiters and applicants can be confident in their data privacy.",
        },
    ];

    return (
        <section className="w-full">
            <div className="lg:px-40 md:px-10 px-4 lg:pt-20 pt-10 pb-16 text-center mx-auto">
                <div className="flex items-center flex-col space-y-4 md:flex-row md:space-y-0 space-x-2 justify-between">
                    <h3 className="md:text-4xl text-2xl font-medium text-start">
                        Frequently Asked Questions
                    </h3>
                    <button className="inline-flex items-center justify-center space-x-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 w-[160px] h-12 font-bold text-[15px]">
                        Contact Us
                    </button>
                </div>
                <div className="text-left mt-10">
                    {faqItems.map((faq, index) => (
                        <div
                            key={index}
                            className={`group ${openFAQ !== index ? "bg-[#f5f5f5]" : "bg-[#F6F4F9]"} rounded-xl`}
                        >
                            <h4
                                onClick={() => toggleFAQ(index)}
                                className="mt-4 p-5 px-6 cursor-pointer flex items-center justify-between space-x-3 text-neutral-600 font-semibold md:text-2xl sm:text-xl text-base"
                            >
                                <span>{faq.question}</span>
                                <button
                                    className={`h-5 w-5 flex items-center justify-center transition-transform ${openFAQ === index ? "rotate-180 bg-primary" : "bg-gray-600"
                                        }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-white"
                                    >
                                        <path d="m6 9 6 6 6-6"></path>
                                    </svg>
                                </button>
                            </h4>
                            {openFAQ === index && (
                                <div className="pb-5 px-6">
                                    <p className="md:text-xl sm:text-lg text-xs leading-5 md:leading-8 font-medium">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQs;
