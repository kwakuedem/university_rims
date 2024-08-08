import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Create = ({ submission, auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        comments: "",
        recommendation: "accept",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("reviews.store", submission.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Review" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold">
                                Create Review
                            </h1>
                            <form
                                onSubmit={handleSubmit}
                                className="mt-4 space-y-4"
                            >
                                <div>
                                    <label
                                        htmlFor="comments"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Comments
                                    </label>
                                    <textarea
                                        id="comments"
                                        name="comments"
                                        value={data.comments}
                                        onChange={(e) =>
                                            setData("comments", e.target.value)
                                        }
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    />
                                    {errors.comments && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.comments}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="recommendation"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Recommendation
                                    </label>
                                    <select
                                        id="recommendation"
                                        name="recommendation"
                                        value={data.recommendation}
                                        onChange={(e) =>
                                            setData(
                                                "recommendation",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="accept">Accept</option>
                                        <option value="reject">Reject</option>
                                        <option value="revise">Revise</option>
                                    </select>
                                    {errors.recommendation && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.recommendation}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-25 transition ease-in-out duration-150"
                                        disabled={processing}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
