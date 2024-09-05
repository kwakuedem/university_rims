import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AdminLayout from "../../../Layouts/AdminLayout ";
import { Transition } from "@headlessui/react";

const Create = ({ auth }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            description: "",
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.departments.store"), {
            forceFormData: true,
            onSuccess: (page) => {
                alert("Department Created Successfully.");
            },
            onError: (page) => {
                alert("Failed to Create Department.");
            },
        });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    Create Department
                </h2>
            }
        >
            <Head title="Departments" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-[50%] m-auto">
                        <div className="p-4 text-gray-900">
                            <header className="flex justify-between">
                                <div className="profile-heading flex flex-col">
                                    <p className="mt-1 text-sm text-blue-900">
                                        Fill in the necessary fields to create a
                                        department
                                    </p>
                                </div>
                            </header>
                            <form
                                onSubmit={submit}
                                className="mt-4 space-y-6"
                                encType="multipart/form-data"
                                autoComplete="off"
                            >
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="name"
                                        value="Name"
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
                                        htmlFor="description"
                                        value="Description"
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
                                        Save Department
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

export default Create;
