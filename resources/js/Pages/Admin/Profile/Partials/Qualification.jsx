import { useForm } from "@inertiajs/react";
import React from "react";

function QualificationForm({ setIsModalOpen }) {
    const { data, setData, post, processing, errors } = useForm({
        qualifications: [{ degree: "", institution: "", year: "" }],
    });

    const addQualification = () => {
        setData("qualifications", [
            ...data.qualifications,
            { degree: "", institution: "", year: "" },
        ]);
    };

    const removeQualification = (index) => {
        const newQualifications = data.qualifications.filter(
            (_, i) => i !== index
        );
        setData("qualifications", newQualifications);
    };

    const handleChange = (index, key, value) => {
        const newQualifications = data.qualifications.map((qualification, i) =>
            i === index ? { ...qualification, [key]: value } : qualification
        );
        setData("qualifications", newQualifications);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("qualifications.store"));
        setIsModalOpen(false);
    };

    const predefinedDegrees = [
        "Bachelor's Degree",
        "Master's Degree",
        "PhD",
        "Associate Degree",
        "Diploma",
        "Certificate",
    ];

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-[80%] min-h-[20%]">
                <h3 className="text-lg font-semibold mb-4">
                    Add Qualification
                </h3>

                <form
                    onSubmit={handleSubmit}
                    className="h-[90%] overflow-y-auto"
                >
                    {data.qualifications.map((qualification, index) => (
                        <div key={index} className="mb-4">
                            {/* Degree Field as Select */}
                            <select
                                value={qualification.degree}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "degree",
                                        e.target.value
                                    )
                                }
                                className="block w-full mb-2 rounded-md "
                            >
                                <option value="">Select Degree</option>
                                {predefinedDegrees.map((degree) => (
                                    <option key={degree} value={degree}>
                                        {degree}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                placeholder="Institution"
                                value={qualification.institution}
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "institution",
                                        e.target.value
                                    )
                                }
                                className="block w-full mb-2 rounded-md"
                            />
                            {/* Year Field as Number Input */}
                            <input
                                type="number"
                                placeholder="Year"
                                value={qualification.year}
                                onChange={(e) =>
                                    handleChange(index, "year", e.target.value)
                                }
                                className="block w-full mb-2 rounded-md"
                                min="1900"
                                max={new Date().getFullYear()}
                            />
                            <button
                                type="button"
                                onClick={() => removeQualification(index)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={addQualification}
                            className="text-blue-500"
                        >
                            Add Another Qualification
                        </button>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className=" bg-gray-500  text-white px-4 py-2 mt-4 rounded-md"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-700 text-white px-4 py-2 mt-4 rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QualificationForm;
