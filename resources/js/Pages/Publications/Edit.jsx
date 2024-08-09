import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";

const Edit = ({ auth, publication }) => {
    // Initialize useForm with existing publication data

    const { data, setData, put, errors, processing, recentlySuccessful } =
        useForm({
            title: publication.title || "",
            abstract: publication.abstract || "",
            file_path: null, // File input should not be pre-filled
        });

    const submit = (e) => {
        e.preventDefault();
        console.log(data); // Log the form data
        put(route("publications.update", publication.id), {
            data, // Pass the form data
            onSuccess: () => console.log("Form submitted successfully"),
            onError: (error) => console.log("Error in form submission:", error),
        });
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
                            <header className="flex justify-between">
                                <div className="profile-heading flex flex-col">
                                    <p className="mt-1 text-sm text-blue-900">
                                        Edit the necessary fields to update the
                                        publication
                                    </p>
                                </div>
                            </header>
                            <form
                                id="form"
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
                                        htmlFor="title"
                                        value="Title"
                                        className="!text-blue-900"
                                    />
                                    <TextInput
                                        id="title"
                                        name="title"
                                        className="mt-1 block w-full !pointer-events-auto outline outline-1 outline-blue-900 h-8 bg-slate-900/20 shadow-inner"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        isFocused
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.title}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="abstract"
                                        value="Abstract"
                                        className="!text-blue-900"
                                    />
                                    <textarea
                                        cols={10}
                                        rows={6}
                                        id="abstract"
                                        className="outline outline-1 outline-blue-900 border-gray-300 bg-slate-900/20 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        value={data.abstract}
                                        onChange={(e) =>
                                            setData("abstract", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.abstract}
                                    />
                                </div>

                                <div className="document-upload">
                                    <InputLabel
                                        htmlFor="file_path"
                                        value="Upload Document"
                                        className="!text-blue-900 py-1"
                                    />
                                    <input
                                        id="file_path"
                                        type="file"
                                        className="file-input bg-slate-900/20 file-input-bordered file-input-primary outline outline-1 outline-blue-900"
                                        onChange={(e) =>
                                            setData(
                                                "file_path",
                                                e.target.files[0] // Set file object
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.file_path}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Save Changes
                                    </PrimaryButton>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
