import { Head, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminLayout from "../../../Layouts/AdminLayout ";

const Edit = ({ auth, department }) => {
    // Initialize useForm with existing publication data
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            ...department,
            _method: "put",
        });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("admin.departments.update", department.id), {
            onSuccess: (page) => {
                alert("Department Updated Successfully.");
            },
            onError: (page) => {
                alert("Failed to Update Department.");
            },
        });
    };

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

            <div className="bg-gray-300 py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-[50%] m-auto">
                        <div className="p-4 text-gray-900">
                            <header className="flex justify-between">
                                <div className="profile-heading flex flex-col">
                                    <p className="mt-1 text-sm text-blue-900">
                                        Edit the necessary fields to update the
                                        Department
                                    </p>
                                </div>
                            </header>
                            <form
                                onSubmit={submit}
                                className="mt-4 space-y-6"
                                encType="multipart/form-data"
                            >
                                <input
                                    type="hidden"
                                    name="_token"
                                    value="{{ csrf_token() }}"
                                />
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="name"
                                        value="NAME"
                                        className="!text-blue-900"
                                    />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        className="mt-1 block w-full !pointer-events-auto outline outline-1 outline-blue-900 h-8 bg-slate-50 shadow-inner"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        isFocused
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="NAME"
                                        className="!text-blue-900"
                                    />
                                    <textarea
                                        cols={10}
                                        rows={3}
                                        id="description"
                                        className="outline outline-1 outline-blue-900 border-gray-300 bg-slate-50 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Save Changes
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Edit;
