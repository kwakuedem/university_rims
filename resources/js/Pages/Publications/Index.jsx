import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Card from "@/Components/Card";
import { format } from "date-fns";

const Index = ({ auth, publications }) => {
    // Helper function to format the date
    const formatDate = (dateString) => {
        return format(new Date(dateString), "yyyy-MM-dd");
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
                            <div className="mb-3 px-12 flex justify-end">
                                <Link
                                    className="py-1 px-2 rounded-md bg-blue-900 text-white/60"
                                    href={route("publications.create")}
                                >
                                    Add Publication
                                </Link>
                            </div>

                            {/* Grid to display publications */}
                            <div className="pt-10 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-3 pb-40">
                                {publications.map((publication) => (
                                    <Card
                                        key={publication.id}
                                        href={`publications/${publication.id}`}
                                        file={`/research_files/${publication.file_path}`}
                                        urllink={`publications/${publication.id}/edit`}
                                        title={publication.title}
                                        date={formatDate(
                                            publication.created_at
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
