import { Link, Head } from "@inertiajs/react";
import { format } from "date-fns";
import AdminLayout from "../../../Layouts/AdminLayout ";

export default function Show({ department, auth }) {
    console.log(department);

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    Edit Department
                </h2>
            }
        >
            <Head title="Departments" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 text-gray-900">
                            <div className="submission-section grid lg:m-auto pt-8">
                                <h2 className="title text-black/80 text-3xl font-bold">
                                    {department.name}
                                </h2>
                                <p className="text-black/75 font-bold pt-4 text-lg pb-2">
                                    Description
                                </p>
                                <p className=" text-black/80">
                                    {department.description}
                                </p>

                                <div className="flex justify-end">
                                    {" "}
                                    <Link
                                        target="_blank"
                                        rel="noopenernoreferrer"
                                        className="bg-gray-700 flex justify-center py-1 text-white px-2 rounded-full w-[15%]"
                                    >
                                        Edit Department
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
