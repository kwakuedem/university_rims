import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Create = ({ researches, auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        research_id: "",
        status: "pending",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("submissions.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Submission" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold">
                                Create Submission
                            </h1>
                            <form
                                onSubmit={handleSubmit}
                                className="mt-4 space-y-4"
                            >
                                <div>
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
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">
                                            Select a research
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
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.research_id}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:opacity-25 transition ease-in-out duration-150"
                                        disabled={processing}
                                    >
                                        Create
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
