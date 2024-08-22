import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { format } from "date-fns";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GrView } from "react-icons/gr";

const IndexSubmissions = ({ auth, submissions }) => {
    const { delete: destroy, patch } = useForm();

    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };

    const deleteSubmission = (submission_id) => {
        destroy(route("submissions.destroy", submission_id));
    };

    const togglePublicationStatus = (submission_id, status) => {
        patch(route("submissions.update-status", submission_id), {
            status: status === "published" ? "unpublished" : "published",
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    Submissions
                </h2>
            }
        >
            <Head title="Submissions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-3 flex justify-end">
                                <Link
                                    className="py-1 px-2 rounded-md bg-blue-900 text-white/60"
                                    href={route("submissions.create")}
                                >
                                    Add Submission
                                </Link>
                            </div>

                            <div className="overflow-x-auto mt-4">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-blue-900/80">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                Research Title
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                Reviewer
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                Published Status
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {submissions.map(
                                            (submission, index) => (
                                                <tr
                                                    key={submission.id}
                                                    className={
                                                        index % 2 === 0
                                                            ? "bg-gray-50"
                                                            : "bg-white"
                                                    }
                                                >
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <Link
                                                            href={route(
                                                                "submissions.show",
                                                                submission.id
                                                            )}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            {
                                                                submission
                                                                    .research
                                                                    .title
                                                            }
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <p className="text-sm text-gray-500">
                                                            {submission.status}
                                                        </p>
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <p className="text-sm text-gray-500">
                                                            {submission.reviewer
                                                                ? submission
                                                                      .reviewer
                                                                      .name
                                                                : "None"}
                                                        </p>
                                                    </td>

                                                    <td className="">
                                                        <button
                                                            onClick={() =>
                                                                togglePublicationStatus(
                                                                    submission.id,
                                                                    submission.status
                                                                )
                                                            }
                                                            className="px-2 py-1 text-white rounded-md"
                                                            style={{
                                                                backgroundColor:
                                                                    submission.status ===
                                                                    "published"
                                                                        ? "green"
                                                                        : "gray",
                                                            }}
                                                        >
                                                            {submission.status ===
                                                            "published"
                                                                ? "Unpublish"
                                                                : "Publish"}
                                                        </button>
                                                    </td>
                                                    <td className="flex justify-center gap-2 px-4 py-2 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route(
                                                                "submissions.show",
                                                                submission.id
                                                            )}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            <GrView className="!text-green-400 text-[20px]" />
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "submissions.edit",
                                                                submission.id
                                                            )}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            <FaRegEdit className="text-[20px] !text-indigo-500" />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                deleteSubmission(
                                                                    submission.id
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <MdDeleteForever className="text-[25px] !text-red-500" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default IndexSubmissions;
