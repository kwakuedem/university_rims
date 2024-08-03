import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Invitations = ({ collaborations, auth }) => {
    const { data, setData, post, patch, processing, errors } = useForm({
        status: "", // To determine whether the action is 'accept' or 'reject'
    });

    // const handleAction = (id, status) => {
    //     setData("status", status);
    //     post(route(`collaborations.${status}`, { id }));
    // };
    const handleAccept = (collaborator_id) => {
        patch(route("collaborations.accept", collaborator_id));
    };

    const handleReject = (collaborator_id) => {
        patch(route("collaborations.reject", collaborator_id));
    };

    const deleteCollaboration = (collaborator_id) => {
        destroy(route("collaborations.delete", collaborator_id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Collaborations
                </h2>
            }
        >
            <Head title="Invitations" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="invite-button flex justify-end py-2">
                                <Link
                                    href={route("collaborations.create")}
                                    className="bg-blue-900 text-white/70 font-bold py-1 px-3 rounded-md"
                                >
                                    {" "}
                                    Invite Collaborator
                                </Link>
                            </div>
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {collaborations.map((collaboration) => (
                                    <div
                                        key={collaboration.id}
                                        className="p-4 bg-white shadow-md rounded-lg mb-4 flex flex-col items-center border-2"
                                    >
                                        {/* <p>
                                            Research:{" "}
                                            {collaboration.research.title}
                                        </p> */}
                                        <p className="flex flex-col gap-1 justify-center items-center">
                                            {auth.user.id ===
                                            collaboration.user_id ? (
                                                <div className="flex flex-col">
                                                    <span>
                                                        You Invited{" "}
                                                        {
                                                            collaboration
                                                                .collaborator
                                                                .name
                                                        }
                                                    </span>

                                                    <span>
                                                        Project Topic:{" "}
                                                        {
                                                            collaboration
                                                                .research.title
                                                        }
                                                    </span>
                                                    {collaboration.status ==
                                                        "pending" && (
                                                        <span className=" w-[40%] m-auto pt-2 ">
                                                            <span className="text-white bg-yellow-500 flex justify-center items-center ring-1 rounded-md ring-yellow-300">
                                                                {
                                                                    collaboration.status
                                                                }
                                                            </span>
                                                        </span>
                                                    )}

                                                    {collaboration.status ==
                                                        "accepted" && (
                                                        <span className="w-[60%] m-auto pt-2">
                                                            <button className="bg-blue-900/90 text-white/80 rounded-md hover:bg-blue-900/70 px-2">
                                                                Chat
                                                                Collaborator(s)
                                                            </button>
                                                        </span>
                                                    )}

                                                    {collaboration.status ==
                                                        "rejected" && (
                                                        <span className=" w-[80%] m-auto pt-2 flex gap-3 justify-center items-center">
                                                            <button className="text-red-400 px-2 ring-1 rounded-md ring-red-300">
                                                                {
                                                                    collaboration.status
                                                                }
                                                            </button>
                                                            <form
                                                                onSubmit={
                                                                    deleteCollaboration
                                                                }
                                                                action=""
                                                                className="w-full"
                                                            >
                                                                <button className="bg-red-600 text-white ring-1 ring-red-300 rounded-md px-2 hover:bg-red-600/90">
                                                                    delete
                                                                </button>
                                                            </form>
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="flex flex-col">
                                                    <span>
                                                        <span className="font-bold text-blue-900/80">
                                                            INVITATION BY :{" "}
                                                        </span>
                                                        {
                                                            collaboration.user
                                                                .name
                                                        }
                                                    </span>

                                                    <span>
                                                        <span className="font-bold text-blue-900/80">
                                                            ON THE RESEARCH
                                                            TOPIC :{" "}
                                                        </span>
                                                        {
                                                            collaboration
                                                                .research.title
                                                        }
                                                    </span>
                                                </span>
                                            )}
                                        </p>
                                        {auth.user.id ===
                                            collaboration.collaborator_id && (
                                            <div className="mt-2 flex space-x-2 w-[80%] justify-around">
                                                <button
                                                    onClick={() =>
                                                        handleAccept(
                                                            collaboration.id
                                                        )
                                                    }
                                                    className="px-4 py-1 bg-green-500 text-white rounded-md"
                                                    disabled={processing}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleReject(
                                                            collaboration.id
                                                        )
                                                    }
                                                    className="px-4 py-1 bg-red-500 text-white rounded-md"
                                                    disabled={processing}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                        {errors.action && (
                                            <div className="text-red-600">
                                                {errors.action}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Invitations;
