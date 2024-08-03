import React from "react";
import { Link } from "@inertiajs/react";
import { GrDocumentPdf } from "react-icons/gr";
import { FaRegFileWord } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

const Card = ({ href, file, urllink, title, date }) => {
    // Function to get the document type based on the file extension
    const getDocumentIcon = (fileName) => {
        if (fileName.endsWith(".pdf")) {
            return (
                <GrDocumentPdf className="text-red-300 text-xl font-bold w-5" />
            );
        } else if (fileName.endsWith(".doc") || fileName.endsWith(".docx")) {
            return <FaRegFileWord />;
        }
        return <IoDocumentText />;
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
                {file && (
                    <div className="mt-2 flex items-center">
                        {/* Display document icon */}
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-md">
                            {getDocumentIcon(file.split("/").pop())}
                        </div>
                        {/* Display file name and download link */}
                        <a
                            href={file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 text-blue-600 hover:underline"
                        >
                            {file.split("/").pop()}
                        </a>
                    </div>
                )}
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-500">{date}</p>

                <div className="mt-4">
                    <Link
                        href={urllink}
                        className="py-1 px-2 rounded-md bg-blue-900 text-white"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
