import React from "react";

interface PDFButtonProps {
    loading: boolean;
}

const PDFButton: React.FC<PDFButtonProps> = ({ loading }) => {
    return loading ? (
        <button className="px-1 py-2 bg-gray-300">Preparing PDF...</button>
    ) : (
        <button className="btn bg-primary hover:bg-primary/90 text-white cursor-pointer text-sm h-10 px-4 py-2 font-medium">
            Download PDF
        </button>
    );
};

export default PDFButton;
