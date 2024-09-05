import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, Link, useForm } from "@inertiajs/react";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import QualificationForm from "./Partials/Qualification";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
    // user_department,
    userr,
    departments,
    qualifications,
}) {
    const { delete: destroy } = useForm({});

    const deleteQualification = (publication_id) => {
        destroy(route("qualifications.destroy", publication_id));
    };

    console.log(userr);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsEditModalOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold  text-sm text-gray-500 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            departments={departments}
                            loggedinuser={userr}
                            // user_department={user_department}
                            className="w-full "
                        />
                    </div>
                    <div className="px-4 py-2 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="flex justify-between items-center w-full">
                            <h2 className="font-bold text-black w-full">
                                Qualifications
                            </h2>
                            <div className="flex w-full justify-end">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-blue-900 hover:bg-blue-600 px-2 py-1 rounded-md"
                                >
                                    Add Qualification(s)
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {qualifications && qualifications.length > 0 ? (
                                qualifications.map((qualification) => (
                                    <div
                                        className="flex flex-col gap-1 shadow py-1 px-2 mt-2 w-full border-2 rounded-md"
                                        key={qualification.id}
                                    >
                                        <span className="font-bold text-blue-800 flex justify-between items-center">
                                            {qualification.degree}
                                            <button
                                                onClick={() =>
                                                    deleteQualification(
                                                        qualification.id
                                                    )
                                                }
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <MdDeleteForever className="text-[15px] !text-red-500" />
                                            </button>
                                        </span>
                                        <span>{qualification.institution}</span>
                                        <span className="flex justify-between items-center">
                                            {qualification.year}
                                            <button
                                                onClick={openModal}
                                                className="text-blue-600 hover:underline"
                                            >
                                                <FaRegEdit className="text-[15px] !text-indigo-500" />
                                            </button>
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <p className="py-3 text-gray-700">
                                        Ooops! No Qualification Updated
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
                {isModalOpen && (
                    <QualificationForm
                        setIsModalOpen={setIsModalOpen}
                        setIsModalOpenTrue={() => setIsModalOpen(true)}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
