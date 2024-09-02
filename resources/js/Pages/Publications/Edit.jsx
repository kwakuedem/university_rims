import { Head, useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import Collaborator from "./partials/Collaborator";

const Edit = ({ auth, publication, collaborators }) => {
    const { props } = usePage();
    const message = props.success;
    const error_message = props.error;
    // Initialize useForm with existing publication data
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            ...publication,
            _method: "put",
        });

    // data.collaborators.length
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (message && message) {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    }, [message]);

    useEffect(() => {
        if (error_message && error_message) {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
    }, [error_message]);

    const submit = (e) => {
        e.preventDefault();
        post(route("publications.update", publication.id), {});
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
            {showMessage && (
                <span className="bg-green-500 z-20 absolute top-6  rounded-md text-white right-10 p-3">
                    {message}
                </span>
            )}
            {showMessage && (
                <span className="bg-red-400 z-20 absolute top-6  rounded-md text-white right-10 p-3">
                    {error_message}
                </span>
            )}

            <div className="bg-gray-300 py-6">
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
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                    >
                                        Add Collaborators
                                    </button>
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
                                        htmlFor="title"
                                        value="TITLE"
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
                                        value="ABSTRACT"
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

                                <div className="document-upload flex justify-between items-center">
                                    <div className="w-full">
                                        <InputLabel
                                            htmlFor="file_path"
                                            value="UPLOAD DOCUMENT"
                                            className="!text-blue-900 py-1"
                                        />
                                        <input
                                            id="file_path"
                                            type="file"
                                            className="file-input file-input-bordered file-input-primary w-full max-w-xs !text-white"
                                            // className="file-input bg-slate-900/20 file-input-bordered file-input-primary outline outline-1 outline-blue-900"
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

                                    <div className="w-full flex flex-col justify-end items-end">
                                        <div className="flex justify-start items-start">
                                            <InputLabel
                                                value="STATUS"
                                                className="!text-blue-900 py-1"
                                            />
                                        </div>
                                        <select
                                            name="status"
                                            value={data.status}
                                            onChange={(e) =>
                                                setData(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            className={`select select-primary  select-md w-full max-w-xs !bg-orange-100 text-green-600 ${
                                                data.status === "published" &&
                                                "!bg-green-200 !text-green-600"
                                            }`}
                                        >
                                            <option
                                                disabled
                                                selected
                                                defaultValue={data.status}
                                            />
                                            <option value={"published"}>
                                                PUBLISH
                                            </option>
                                            <option value={"unpublished"}>
                                                UNPUBLISH
                                            </option>
                                        </select>
                                    </div>
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

            {isModalOpen && (
                <Collaborator
                    publication={publication}
                    collaborators={collaborators}
                    setIsModalOpen={setIsModalOpen}
                    setIsModalOpenTrue={() => setIsModalOpen(true)}
                    Error_message={error_message}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default Edit;
