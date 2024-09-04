import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout ";

const Roles = ({ auth, roles }) => {
    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    User Roles
                </h2>
            }
        >
            <Head title="User Roles" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 h-screen overflow-hidden">
                    <div className="bg-white shadow-sm sm:rounded-lg max-h-full flex flex-col w-[80%] m-auto">
                        <div className="p-6 text-gray-900 flex-grow">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
                                Manage Roles
                            </h2>
                            <div
                                className="overflow-y-auto flex-grow"
                                style={{ maxHeight: "calc(100vh - 200px)" }}
                            >
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-blue-900 text-white">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                                Id
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                                Role
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {roles.map((role) => (
                                            <tr key={role.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {role.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {role.name}
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
export default Roles;
