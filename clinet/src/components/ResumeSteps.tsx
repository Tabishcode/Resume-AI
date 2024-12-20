import React from 'react';

const ResumeParserSteps = () => {
    const steps = [
        {
            step: 'Step 1 - Extract Text from Any Document Format',
            description:
                'Our resume parser algorithm first identifies and extracts raw text from formats like PDF, Word, and HTML. It uses OCR for image-based files and ensures text accuracy, which is crucial for ATS-friendly parsing.',
            image: 'https://skima.ai/static/products/ai-resume-parser/illustration-1.svg',
            alt: 'Text extraction from different file format',
            imageFirst: false,
        },
        {
            step: 'Step 2 - Organize Data into Logical Sections',
            description:
                'The extracted text is then organized into sections like work experience, education, skills, and more. The parser\'s advanced pattern recognition ensures structured segmentation even in varied resume layouts.',
            image: 'https://skima.ai/static/products/ai-resume-parser/illustration-2.svg',
            alt: 'Organize data in logical sections',
            imageFirst: true,
        },
        {
            step: 'Step 3 - Prioritize Relevant Information Using NLP',
            description:
                'Natural Language Processing (NLP) identifies and ranks essential details, filtering keywords and phrases that match job requirements. This prioritization optimizes candidate relevance for recruiters.',
            image: 'https://skima.ai/static/products/ai-resume-parser/illustration-3.svg',
            alt: 'Prioritize Relevant Information Using NLP',
            imageFirst: false,
        },
        {
            step: 'Step 4 - Output Optimized for ATS Systems',
            description:
                'The final structured data is formatted to be ATS-compatible, ensuring easy integration with HR software. This step maximizes candidate visibility and accuracy in ATS filtering.',
            image: 'https://skima.ai/static/products/ai-resume-parser/illustration-4.svg',
            alt: 'Output Optimized for ATS Systems',
            imageFirst: true,
        },
    ];

    return (
        <div className="max-w-screen-2xl mx-auto w-full lg:px-20 md:px-10 px-4 md:pt-[80px] pt-10 pb-10">
            <div>
                <h2 className="text-center md:text-5xl text-3xl md:leading-[3.5rem] font-medium">
                    How Our Resume Parser <br /> Algorithm Works?
                </h2>
                <p className="text-center md:text-4xl text-xl md:font-semibold font-medium mt-2 md:mt-12 text-[#404554]">
                    Our AI resume parser algorithm works in 4 steps:
                </p>
            </div>
            <div className="space-y-10 md:mt-10 mt-8">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={`grid md:grid-cols-2 group grid-cols-1 gap-10 md:gap-14 place-content-center bg-[#F6F4F9] p-6 md:p-10 lg:p-14 rounded-xl`}
                    >
                        {step.imageFirst && (
                            <div className="col-span-1 h-full w-full flex items-center justify-center">
                                <img
                                    src={step.image}
                                    alt={step.alt}
                                    className="shadow-lg shadow-primary/10 rounded-xl"
                                    width="446"
                                    height="320"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        )}
                        <div
                            className={`${step.imageFirst ? 'md:text-right' : 'md:text-left'
                                } my-auto text-center flex justify-center flex-col col-span-1`}
                        >
                            <h3 className="md:text-3xl leading-[2rem] text-2xl font-medium">
                                {step.step}
                            </h3>
                            <p className="pt-5 md:text-xl text-lg">{step.description}</p>
                        </div>
                        {!step.imageFirst && (
                            <div className="col-span-1 h-full w-full flex items-center justify-center">
                                <img
                                    src={step.image}
                                    alt={step.alt}
                                    className="shadow-lg shadow-primary/10 rounded-xl"
                                    width="446"
                                    height="320"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
             
        </div>
    );
};

export default ResumeParserSteps;
