// import React from "react";
// import { useForm } from "@inertiajs/inertia-react";

// // Assume you have predefinedDegrees
// const predefinedDegrees = ["Bachelor", "Master", "PhD"];

// function EditQualification({ isOpen, onClose, qualification, onSave }) {
//     const { data, setData, post, processing, errors } = useForm({
//         degree: qualification.degree || "",
//         institution: qualification.institution || "",
//         year: qualification.year || "",
//     });

//     const handleChange = (field, value) => {
//         setData((prevData) => ({
//             ...prevData,
//             [field]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         post(route("qualifications.update", qualification.id), {
//             onSuccess: () => {
//                 onSave(data); // Notify parent of success
//                 onClose(); // Close modal
//             },
//             onError: (errors) => {
//                 console.error(errors); // Handle errors
//             },
//         });
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full h-[80%] min-h-[20%]">
//                 <h3 className="text-lg font-semibold mb-4">
//                     Edit Qualification
//                 </h3>
//                 <form
//                     onSubmit={handleSubmit}
//                     className="h-[90%] overflow-y-auto"
//                 >
//                     <div className="mb-4">
//                         <select
//                             value={data.degree}
//                             onChange={(e) =>
//                                 handleChange("degree", e.target.value)
//                             }
//                             className="block w-full mb-2 rounded-md"
//                         >
//                             <option value="">Select Degree</option>
//                             {predefinedDegrees.map((degree) => (
//                                 <option key={degree} value={degree}>
//                                     {degree}
//                                 </option>
//                             ))}
//                         </select>

//                         <input
//                             type="text"
//                             placeholder="Institution"
//                             value={data.institution}
//                             onChange={(e) =>
//                                 handleChange("institution", e.target.value)
//                             }
//                             className="block w-full mb-2 rounded-md"
//                         />

//                         <input
//                             type="number"
//                             placeholder="Year"
//                             value={data.year}
//                             onChange={(e) =>
//                                 handleChange("year", e.target.value)
//                             }
//                             className="block w-full mb-2 rounded-md"
//                             min="1900"
//                             max={new Date().getFullYear()}
//                         />

//                         <div className="flex justify-between items-center">
//                             <button
//                                 type="button"
//                                 onClick={onClose}
//                                 className="bg-gray-500 text-white px-4 py-2 mt-4 rounded-md"
//                             >
//                                 Cancel
//                             </button>

//                             <button
//                                 type="submit"
//                                 disabled={processing}
//                                 className="bg-blue-700 text-white px-4 py-2 mt-4 rounded-md"
//                             >
//                                 Save
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default EditQualification;
