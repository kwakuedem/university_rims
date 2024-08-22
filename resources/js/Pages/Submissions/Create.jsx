import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useAuthorizations } from "@/utils";

const CreateSubmission = ({ auth, researches }) => {
    const { data, setData, post, processing, errors } = useForm({
        research_id: "",
        status: "pending",
        reviewer_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/submissions");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    Create Submission
                </h2>
            }
        >
            <Head title="Create Submission" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="research_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Research
                                    </label>
                                    <select
                                        id="research_id"
                                        name="research_id"
                                        value={data.research_id}
                                        onChange={(e) =>
                                            setData(
                                                "research_id",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="">
                                            Select Research
                                        </option>
                                        {researches.map((research) => (
                                            <option
                                                key={research.id}
                                                value={research.id}
                                            >
                                                {research.title}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.research_id && (
                                        <div className="text-red-600 text-sm">
                                            {errors.research_id}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="status"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">
                                            Approved
                                        </option>
                                        <option value="rejected">
                                            Rejected
                                        </option>
                                        <option value="under_review">
                                            Under Review
                                        </option>
                                    </select>
                                    {errors.status && (
                                        <div className="text-red-600 text-sm">
                                            {errors.status}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="reviewer_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Reviewer ID
                                    </label>
                                    <input
                                        id="reviewer_id"
                                        name="reviewer_id"
                                        type="text"
                                        value={data.reviewer_id}
                                        onChange={(e) =>
                                            setData(
                                                "reviewer_id",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
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
                                            ? "Submitting..."
                                            : "Submit"}
                                    </button>
                                </div>
                                <Link
                                    href="/submissions"
                                    className="mt-4 inline-block text-blue-600 hover:underline"
                                >
                                    Back to Submissions
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateSubmission;
