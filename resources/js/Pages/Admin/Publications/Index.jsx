import { Head, Link, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { format } from "date-fns";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useAuthorizations } from "@/utils";
import AdminLayout from "../../../Layouts/AdminLayout ";

const Index = ({ auth, publications }) => {
    const { data, delete: destroy, processing } = useForm({});

    const { props } = usePage();

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredPublications = publications.filter((publication) => {
        const authorName = publication.author.name.toLowerCase();
        const title = publication.title.toLowerCase();
        const publicationStatus = publication.status.toLowerCase();
        const searchLower = searchQuery.toLowerCase();
        const publicationYear = new Date(publication.created_at)
            .getFullYear()
            .toString();

        return (
            authorName.includes(searchLower) ||
            title.includes(searchLower) ||
            publicationYear.includes(searchLower) ||
            publicationStatus.includes(searchLower)
        );
    });

    // Helper function to format the date
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };

    // Helper function to get the correct asset URL
    const getAssetUrl = (path) => {
        return `${window.location.origin}/storage/${path}`;
    };

    const deletePublication = (publication_id) => {
        destroy(route("admin.publications.destroy", publication_id), {
            onSuccess: (page) => {
                alert("Publication Deleted successfully.");
            },
            onError: (page) => {
                alert("Failed to Delete Publication!");
            },
        });
    };

    return (
        <AdminLayout
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
                            {/* Search Input */}
                            <div className="mb-3 flex justify-between">
                                <div className="items-center justify-center border w-[50%] m-auto border-slate-800 focus-within:border-slate-900 rounded-md">
                                    <input
                                        value={searchQuery}
                                        autoComplete="off"
                                        type="text"
                                        className="flex-1 w-full text-gray-600 rounded-md"
                                        name="search"
                                        placeholder="Search by author, title, or year ...."
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <Link
                                    className="px-2 rounded-md bg-blue-900 hidden text-white/60 w-[15%]  items-center justify-center"
                                    href={route("admin.publications.create")}
                                >
                                    Add Publication
                                </Link>
                            </div>

                            {/* Table to display publications */}
                            {filteredPublications.length > 0 ? (
                                <div className="overflow-x-auto mt-4">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-blue-900/80">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Title
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Document
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredPublications.map(
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
                                                                    "admin.publications.show",
                                                                    publication.id
                                                                )}
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                {
                                                                    publication.title
                                                                }
                                                            </Link>
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <a
                                                                href={getAssetUrl(
                                                                    publication.file_path
                                                                )}
                                                                target="_blank"
                                                                className="text-sm underline text-blue-600"
                                                            >
                                                                Document
                                                            </a>
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <p className="text-sm text-gray-500">
                                                                {formatDate(
                                                                    publication.created_at
                                                                )}
                                                            </p>
                                                        </td>

                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <span
                                                                className={`rounded-md text-sm p-2 ${
                                                                    publication.status ===
                                                                    "published"
                                                                        ? "bg-green-500 text-white"
                                                                        : "bg-orange-100 text-orange-600"
                                                                }`}
                                                            >
                                                                {
                                                                    publication.status
                                                                }
                                                            </span>
                                                        </td>
                                                        <td className="flex justify-center gap-2 px-4 py-2 whitespace-nowrap text-sm font-medium">
                                                            <Link
                                                                href={route(
                                                                    "admin.publications.show",
                                                                    publication.id
                                                                )}
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                <GrView className="!text-green-400 text-[20px]" />
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "admin.publications.edit",
                                                                    publication.id
                                                                )}
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                <FaRegEdit className="text-[20px] !text-indigo-500" />
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    deletePublication(
                                                                        publication.id
                                                                    )
                                                                }
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                <MdDeleteForever className="text-[25px] !text-red-500" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>
                                    Awww! You do not have any publication yet!
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
