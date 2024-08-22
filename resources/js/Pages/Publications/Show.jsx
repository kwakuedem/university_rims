import { Link, Head } from "@inertiajs/react";
import { format } from "date-fns";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

export default function Show({ publication, auth }) {
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
    };

    console.log(publication);

    const getAssetUrl = (path) => {
        return `${window.location.origin}/storage/${path}`;
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    Edit Publication
                </h2>
            }
        >
            <Head title="Publications" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 text-gray-900">
                            <div className="submission-section grid lg:m-auto pt-8">
                                <h2 className="title text-black/80 text-3xl font-bold">
                                    {publication.title}
                                </h2>
                                <p className="text-black/75 font-bold pt-4 text-lg pb-2">
                                    Abstract
                                </p>
                                <p className=" text-black/80">
                                    {publication.abstract}
                                </p>

                                <div className="flex justify-end">
                                    {" "}
                                    <a
                                        href={getAssetUrl(
                                            publication.file_path
                                        )}
                                        target="_blank"
                                        rel="noopenernoreferrer"
                                        className="bg-gray-700 flex justify-center py-1 text-white px-2 rounded-full w-[15%]"
                                    >
                                        View Document
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
