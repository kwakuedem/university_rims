import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const ShowSubmission = ({ submission, reviewers }) => {
    const { data, setData, post, processing, errors } = useForm({
        reviewer_id: "",
    });

    const handleManualAssignment = (e) => {
        e.preventDefault();
        post(route("submissions.assign-reviewer", submission.id));
    };

    const handleAutoAssignment = (e) => {
        e.preventDefault();
        post(route("submissions.auto-assign-reviewer", submission.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    Submission Details
                </h2>
            }
        >
            <Head title="Submission Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold">Title</h3>
                                <p>{submission.title}</p>
                            </div>

                            {/* Manual Assignment Form */}
                            <form
                                onSubmit={handleManualAssignment}
                                className="mb-4"
                            >
                                <div className="mb-4">
                                    <label
                                        htmlFor="reviewer_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Assign Reviewer
                                    </label>
                                    <select
                                        id="reviewer_id"
                                        name="reviewer_id"
                                        value={data.reviewer_id}
                                        onChange={(e) =>
                                            setData(
                                                "reviewer_id",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">
                                            Select Reviewer
                                        </option>
                                        {reviewers.map((reviewer) => (
                                            <option
                                                key={reviewer.id}
                                                value={reviewer.id}
                                            >
                                                {reviewer.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.reviewer_id && (
                                        <div className="text-red-600 text-sm">
                                            {errors.reviewer_id}
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="py-2 px-4 bg-blue-600 text-white rounded-md"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Assigning..."
                                            : "Assign Reviewer"}
                                    </button>
                                </div>
                            </form>

                            {/* Automatic Assignment Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleAutoAssignment}
                                    className="py-2 px-4 bg-green-600 text-white rounded-md"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Assigning..."
                                        : "Auto Assign Reviewer"}
                                </button>
                            </div>

                            <Link
                                href="/submissions"
                                className="mt-4 inline-block text-blue-600 hover:underline"
                            >
                                Back to Submissions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ShowSubmission;
