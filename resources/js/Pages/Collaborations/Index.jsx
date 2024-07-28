import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

const Index = ({ collaborations, auth }) => {
    const handleAccept = (id) => {
        Inertia.put(`/collaborations.update/${id}`, {
            status: "accepted",
        });
    };

    const handleReject = (id) => {
        Inertia.put(`/collaborations/${id}`, { status: "rejected" });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500  leading-tight">
                    Collaborations
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end">
                                <Link
                                    href={route("collaborations.create")}
                                    className="bg-blue-900/90 px-4 text-white rounded-md hover:bg-blue-900/80"
                                >
                                    Invite Collaborator
                                </Link>
                            </div>

                            <ul>
                                {collaborations.map((collaboration) => (
                                    <li key={collaboration.id}>
                                        <p>{collaboration.research.title}</p>
                                        <p>{collaboration.collaborator.name}</p>
                                        <p>Status: {collaboration.status}</p>
                                        {collaboration.status === "pending" && (
                                            <div className="flex gap-3 py-2">
                                                <button
                                                    onClick={() =>
                                                        handleAccept(
                                                            collaboration.id
                                                        )
                                                    }
                                                    className="bg-green-500 px-4 text-white rounded-md"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleReject(
                                                            collaboration.id
                                                        )
                                                    }
                                                    className="bg-red-500 px-4 text-white rounded-md"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
