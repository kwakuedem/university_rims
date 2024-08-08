import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IoChatboxEllipses } from "react-icons/io5";
import { FcApprove, FcApproval, FcDisapprove } from "react-icons/fc";
import { MdPending, MdDeleteForever } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

const Invitations = ({ collaborations, auth }) => {
    const { data, setData, post, patch, processing, errors } = useForm({
        status: "", // To determine whether the action is 'accept' or 'reject'
    });

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
                                    Invitations
                                </Link>
                            </div>
                            <div className="mt-6">
                                <div className="overflow-x-auto overflow-y-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr className="bg-blue-900/70 rounded-md">
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Inviter
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Research Topic
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto max-h-40">
                                            {collaborations.map(
                                                (collaboration, index) => (
                                                    <tr
                                                        key={collaboration.id}
                                                        className={
                                                            index % 2 === 0
                                                                ? "bg-gray-50"
                                                                : "bg-white"
                                                        }
                                                    >
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            {auth.user.id ===
                                                            collaboration.user_id ? (
                                                                <span className="font-medium text-gray-900">
                                                                    You invited{" "}
                                                                    {
                                                                        collaboration
                                                                            .collaborator
                                                                            .name
                                                                    }
                                                                </span>
                                                            ) : (
                                                                <span className="font-medium text-gray-900">
                                                                    {
                                                                        collaboration
                                                                            .user
                                                                            .name
                                                                    }
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            {
                                                                collaboration
                                                                    .research
                                                                    .title
                                                            }
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            {collaboration.status ===
                                                                "pending" && (
                                                                <MdPending className="!text-yellow-500 text-[25px]" />
                                                            )}
                                                            {collaboration.status ===
                                                                "accepted" && (
                                                                <FcApproval className="!text-green-500 text-[25px]" />
                                                            )}
                                                            {collaboration.status ===
                                                                "rejected" && (
                                                                <FcDisapprove className="!text-red-500 text-[25px]" />
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                                            {auth.user.id ===
                                                                collaboration.collaborator_id &&
                                                                collaboration.status ===
                                                                    "pending" && (
                                                                    <div className="flex space-x-2">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleAccept(
                                                                                    collaboration.id
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                processing
                                                                            }
                                                                        >
                                                                            <FcApprove className="!text-green-600 text-[25px]" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleReject(
                                                                                    collaboration.id
                                                                                )
                                                                            }
                                                                            disabled={
                                                                                processing
                                                                            }
                                                                        >
                                                                            <IoMdCloseCircle className="!text-red-600 text-[25px]" />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            {auth.user.id ===
                                                                collaboration.collaborator_id &&
                                                                collaboration.status ===
                                                                    "accepted" && (
                                                                    <Link
                                                                        href={route(
                                                                            "chats.create"
                                                                        )}
                                                                    >
                                                                        <IoChatboxEllipses className="!text-blue-900/90 text-[25px]  hover:text-blue-900/70" />
                                                                    </Link>
                                                                )}
                                                            {auth.user.id ===
                                                                collaboration.user_id &&
                                                                collaboration.status ===
                                                                    "accepted" && (
                                                                    <Link
                                                                        href={route(
                                                                            "chats.create"
                                                                        )}
                                                                    >
                                                                        <IoChatboxEllipses className="!text-blue-900/90 text-[25px]  hover:text-blue-900/70" />
                                                                    </Link>
                                                                )}
                                                            {auth.user.id ===
                                                                collaboration.user_id &&
                                                                collaboration.status ===
                                                                    "rejected" && (
                                                                    <form
                                                                        onSubmit={() =>
                                                                            deleteCollaboration(
                                                                                collaboration.id
                                                                            )
                                                                        }
                                                                        className="inline"
                                                                    >
                                                                        <button className="">
                                                                            <MdDeleteForever className="!text-red-600/90 text-[25px]  hover:text-red-600/70" />
                                                                        </button>
                                                                    </form>
                                                                )}
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
            </div>
        </AuthenticatedLayout>
    );
};

export default Invitations;
