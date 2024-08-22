import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Users = ({ auth, users }) => {
    const { post } = useForm();

    const handleAssignRole = (userId, role) => {
        post(route("admin.assignRole"), {
            user_id: userId,
            role: role,
        });
    };

    const handleRevokeRole = (userId, role) => {
        post(route("admin.revokeRole"), {
            user_id: userId,
            role: role,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manage Users" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Manage Users
                            </h2>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-900 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            Roles
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.role}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    {[
                                                        "admin",
                                                        "editor",
                                                        "author",
                                                        "reviewer",
                                                    ].map((role) => (
                                                        <button
                                                            key={role}
                                                            onClick={() =>
                                                                handleAssignRole(
                                                                    user.id,
                                                                    role
                                                                )
                                                            }
                                                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                                        >
                                                            Assign{" "}
                                                            {role
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                role.slice(1)}
                                                        </button>
                                                    ))}
                                                    {[
                                                        "admin",
                                                        "editor",
                                                        "author",
                                                        "reviewer",
                                                    ].map((role) => (
                                                        <button
                                                            key={`revoke-${role}`}
                                                            onClick={() =>
                                                                handleRevokeRole(
                                                                    user.id,
                                                                    role
                                                                )
                                                            }
                                                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                        >
                                                            Revoke{" "}
                                                            {role
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                role.slice(1)}
                                                        </button>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Users;
