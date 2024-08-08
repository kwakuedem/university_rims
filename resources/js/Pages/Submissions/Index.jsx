import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = ({ submissions, auth }) => {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Submissions" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold">Submissions</h1>
                            <Link
                                href={route("submissions.create")}
                                className="mt-4 text-blue-500"
                            >
                                Create Submission
                            </Link>
                            <div className="mt-4">
                                {submissions.length === 0 ? (
                                    <p>No submissions found.</p>
                                ) : (
                                    <table className="min-w-full">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2">
                                                    Title
                                                </th>
                                                <th className="px-4 py-2">
                                                    Status
                                                </th>
                                                <th className="px-4 py-2">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {submissions.map((submission) => (
                                                <tr key={submission.id}>
                                                    <td className="border px-4 py-2">
                                                        {
                                                            submission.research
                                                                .title
                                                        }
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {submission.status}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        <Link
                                                            href={route(
                                                                "submissions.edit",
                                                                submission.id
                                                            )}
                                                            className="text-blue-500 mr-2"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "reviews.create",
                                                                submission.id
                                                            )}
                                                            className="text-blue-500"
                                                        >
                                                            Review
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
