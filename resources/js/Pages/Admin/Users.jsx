import React, { useState } from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout ";

const Users = ({ auth, users, roles }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: "",
        role: "",
    });

    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("");

    const handleAssignRole = (userId, roleName) => {
        setData({ ...data, user_id: userId, role: roleName });
        post(route("admin.assignRole"), {
            onSuccess: (page) => {
                alert("Role assigned successfully.");
            },
            onError: (page) => {
                alert("Failed to assign role.");
            },
        });
    };

    const handleRevokeRole = (userId, roleName) => {
        setData({ ...data, user_id: userId, role: roleName });
        post(route("admin.revokeRole"), {
            onSuccess: (page) => {
                alert(page.props.flash.success);
                reset();
            },
            onError: (page) => {
                alert(page.props.flash.error);
            },
        });
    };

    const renderRoleButtons = (user) => {
        const userRoles = user.roles.map((role) => role.name);

        return (
            <div className="flex gap-2">
                {roles.map((role) =>
                    userRoles.includes(role) ? (
                        <button
                            key={`revoke-${role}`}
                            onClick={() => handleRevokeRole(user.id, role)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            disabled={processing}
                        >
                            {processing
                                ? "Revoking..."
                                : `Revoke ${
                                      role.charAt(0).toUpperCase() +
                                      role.slice(1)
                                  }`}
                        </button>
                    ) : (
                        <button
                            key={`assign-${role}`}
                            onClick={() => handleAssignRole(user.id, role)}
                            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            disabled={processing}
                        >
                            {processing
                                ? "Assigning..."
                                : `Assign ${
                                      role.charAt(0).toUpperCase() +
                                      role.slice(1)
                                  }`}
                        </button>
                    )
                )}
            </div>
        );
    };

    const { flash } = usePage().props;

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-screen overflow-hidden">
                    <div className="bg-white shadow-sm sm:rounded-lg max-h-full flex flex-col">
                        <div className="p-6 text-gray-900 flex-grow">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
                                Manage Users
                            </h2>
                            <div
                                className="overflow-y-auto flex-grow"
                                style={{ maxHeight: "calc(100vh - 200px)" }}
                            >
                                <table className="w-full divide-y divide-gray-200">
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
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider flex justify-center">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                                                    {user.roles
                                                        .map(
                                                            (role) => role.name
                                                        )
                                                        .join(", ")}
                                                </td>
                                                <td className="px-6 py-1 whitespace-nowrap w-full flex text-sm font-medium items-end justify-end">
                                                    {renderRoleButtons(user)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Users;
