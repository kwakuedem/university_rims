import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { format } from "date-fns";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GrView } from "react-icons/gr";

const Index = ({ auth, publications }) => {
    // Helper function to format the date
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };

    const { delete: destroy } = useForm();

    const deletePublication = (publication_id) => {
        destroy(route("publications.destroy", publication_id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    Publications
                </h2>
            }
        >
            <Head title="Publications" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Button to add a new publication */}
                            <div className="mb-3  flex justify-end">
                                <Link
                                    className="py-1 px-2 rounded-md bg-blue-900 text-white/60"
                                    href={route("publications.create")}
                                >
                                    Add Publication
                                </Link>
                            </div>

                            {/* Table to display publications */}
                            <div className="overflow-x-auto mt-4">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-blue-900/80">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {publications.map(
                                            (publication, index) => (
                                                <tr
                                                    key={publication.id}
                                                    className={
                                                        index % 2 === 0
                                                            ? "bg-gray-50"
                                                            : "bg-white"
                                                    }
                                                >
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <Link
                                                            href={route(
                                                                "publications.show",
                                                                publication.id
                                                            )}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            {publication.title}
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        {formatDate(
                                                            publication.created_at
                                                        )}
                                                    </td>
                                                    <td className="flex justify-center gap-2 px-4 py-2 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route(
                                                                "publications.show",
                                                                publication.id
                                                            )}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            <GrView className="!text-green-400 text-[20px]" />
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "publications.edit",
                                                                publication.id
                                                            )}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            <FaRegEdit className="!text-blue-600 text-[20px]" />
                                                        </Link>
                                                        <form
                                                            onSubmit={(e) => {
                                                                e.preventDefault();
                                                                deletePublication(
                                                                    publication.id
                                                                );
                                                            }}
                                                            className="inline"
                                                        >
                                                            <button
                                                                type="submit"
                                                                className="text-red-600/90 hover:text-red-600/70"
                                                            >
                                                                <MdDeleteForever className="text-[20px]" />
                                                            </button>
                                                        </form>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {publications.length === 0 && (
                                <div className="p-4 text-center text-gray-500">
                                    No publications found!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
