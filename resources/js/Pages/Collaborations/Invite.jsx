import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Create = ({ researches, users, auth, collaborations }) => {
    const {
        data,
        setData,
        post,
        delete: destroy,
        patch,
        processing,
        errors,
    } = useForm({
        research_id: "",
        collaborator_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("collaborations.store"));
    };

    const handleCancel = (collaborator_id) => {
        destroy(route("collaborations.cancel", collaborator_id));
    };

    const handleAccept = (collaborator_id) => {
        patch(route("collaborations.accept", collaborator_id));
    };

    const handleReject = (collaborator_id) => {
        patch(route("collaborations.reject", collaborator_id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-800/60 leading-tight">
                    Collaborations
                </h2>
            }
        >
            <Head title="Create Collaboration" />

            <div className="py-12 max-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-hidden">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block font-medium text-sm text-gray-700">
                                        Research
                                    </label>
                                    <select
                                        name="research_id"
                                        value={data.research_id}
                                        onChange={(e) =>
                                            setData(
                                                "research_id",
                                                e.target.value
                                            )
                                        }
                                        className="form-select block w-full mt-1"
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
                                        <div className="text-red-600">
                                            {errors.research_id}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block font-medium text-sm text-gray-700">
                                        Collaborator
                                    </label>
                                    <select
                                        name="collaborator_id"
                                        value={data.collaborator_id}
                                        onChange={(e) =>
                                            setData(
                                                "collaborator_id",
                                                e.target.value
                                            )
                                        }
                                        className="form-select block w-full mt-1"
                                    >
                                        <option value="">
                                            Select Collaborator
                                        </option>
                                        {users.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.collaborator_id && (
                                        <div className="text-red-600">
                                            {errors.collaborator_id}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-blue-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Sending..."
                                            : "Send Invitation"}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-8 bg-gray-50 overflow-hidden">
                                <h3 className="font-semibold text-lg">
                                    Your Invitations
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-2 py-1 !overflow-auto">
                                    {collaborations.map((collaboration) => (
                                        <div
                                            key={collaboration.id}
                                            className="mt-4 border-2 border-blue-100 rounded-lg shadow-md px-2 py-1"
                                        >
                                            <p className="flex flex-col">
                                                <span className="text-blue-900/90">
                                                    <span className="font-bold">
                                                        INVITATION TO :
                                                    </span>
                                                    {
                                                        collaboration
                                                            .collaborator.name
                                                    }
                                                </span>
                                                <span className="text-gray-500">
                                                    <span className="font-bold">
                                                        RESEARCH TOPIC :{" "}
                                                    </span>
                                                    {
                                                        collaboration.research
                                                            .title
                                                    }{" "}
                                                </span>
                                            </p>
                                            {collaboration.user_id ===
                                            auth.user.id ? (
                                                <button
                                                    onClick={() =>
                                                        handleCancel(
                                                            collaboration.id
                                                        )
                                                    }
                                                    className="inline-flex items-center px-4 py-1 my-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-900 focus:outline-none focus:border-red-900 focus:ring ring-red-300 disabled:opacity-25 transition ease-in-out duration-150"
                                                >
                                                    Cancel Invitation
                                                </button>
                                            ) : (
                                                <div>
                                                    {collaboration.status ===
                                                        "pending" && (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    handleAccept(
                                                                        collaboration.id
                                                                    )
                                                                }
                                                                className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-green-900 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150"
                                                            >
                                                                Accept
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleReject(
                                                                        collaboration.id
                                                                    )
                                                                }
                                                                className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700 active:bg-yellow-900 focus:outline-none focus:border-yellow-900 focus:ring ring-yellow-300 disabled:opacity-25 transition ease-in-out duration-150"
                                                            >
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
