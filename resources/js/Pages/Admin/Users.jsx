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
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2">Name</th>
                                        <th className="py-2">Email</th>
                                        <th className="py-2">Roles</th>
                                        <th className="py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="py-2">
                                                {user.name}
                                            </td>
                                            <td className="py-2">
                                                {user.email}
                                            </td>
                                            <td className="py-2">
                                                {user.roles.map((role) => (
                                                    <span
                                                        key={role.id}
                                                        className="px-2 py-1 bg-blue-500 text-white rounded"
                                                    >
                                                        {role.name}
                                                    </span>
                                                ))}
                                            </td>
                                            <td className="py-2">
                                                <button
                                                    onClick={() =>
                                                        handleAssignRole(
                                                            user.id,
                                                            "admin"
                                                        )
                                                    }
                                                    className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                                                >
                                                    Assign Admin
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleRevokeRole(
                                                            user.id,
                                                            "admin"
                                                        )
                                                    }
                                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                                >
                                                    Revoke Admin
                                                </button>
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
