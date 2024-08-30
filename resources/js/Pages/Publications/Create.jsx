import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";

const Create = ({ auth }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            title: "",
            abstract: "",
            file_path: null,
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("publications.store"), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    Create Publications
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
                                        Fill in the necessary fields to create a
                                        publication
                                    </p>
                                </div>
                            </header>
                            <form
                                onSubmit={submit}
                                className="mt-4 space-y-6"
                                encType="multipart/form-data"
                            >
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="title"
                                        value="Title"
                                        className="!text-blue-900"
                                    />
                                    <TextInput
                                        id="title"
                                        name="title"
                                        className="mt-1 block w-full !pointer-events-auto outline outline-1 outline-blue-900 h-8 bg-slate-50 shadow-inner"
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
                                        className="outline outline-1 outline-blue-900 border-gray-300 bg-slate-50 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
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
                                    <TextInput
                                        id="file_path"
                                        type="file"
                                        className="file-input bg-slate-50 file-input-bordered file-input-primary outline outline-1 outline-blue-900"
                                        onChange={(e) =>
                                            setData(
                                                "file_path",
                                                e.target.files[0]
                                            )
                                        }
                                        isFocused
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.file_path}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Save Publication
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
