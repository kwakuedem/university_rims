import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { MdCancel } from "react-icons/md";

const Create = ({ researches, users, auth, collaborations }) => {
    const [toogleForm, settoogleForm] = useState(false);

    const toogle = () => {
        settoogleForm(!toogleForm);
    };
    const {
        data,
        setData,
        post,
        delete: destroy,
        patch,
        processing,
        errors,
    } = useForm({
        research_id: "",
        collaborator_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("collaborations.store"));
    };

    const handleCancel = (collaborator_id) => {
        destroy(route("collaborations.cancel", collaborator_id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-800/60 leading-tight">
                    Collaborations
                </h2>
            }
        >
            <Head title="Create Collaboration" />

            <div className="py-12 max-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between">
                                {!toogleForm && (
                                    <form className="outline-none focus:outline-none w-[60%]">
                                        <div className="flex w-full gap-3">
                                            <div className="form-controls w-[80%] flex outline outline-1 rounded-lg  focus-within:outline-blue-400">
                                                <input
                                                    type="text"
                                                    placeholder="search"
                                                    name="search"
                                                    className="rounded-l-lg w-full outline-0 border-0 focus:outline-0 focus:border-0 focus:ring-0"
                                                />
                                                <button className="bg-blue-400  rounded-r-lg text-white px-1">
                                                    search
                                                </button>
                                            </div>
                                            <select
                                                name="research_id"
                                                value={""}
                                                onChange={(e) =>
                                                    setData(
                                                        "research_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="form-select block w-[20%] mt-1 rounded-lg p-1  outline outline-0 focus:outline-0 focus:border-0"
                                            >
                                                <option value={"all"}>
                                                    Search by
                                                </option>

                                                <option value={"author"}>
                                                    {"Author"}
                                                </option>
                                                <option value={"topic"}>
                                                    {"Topic"}
                                                </option>
                                            </select>
                                        </div>
                                    </form>
                                )}
                                <div
                                    className={`flex justify-end items-end ${
                                        !toogleForm ? "w-[20%]" : "w-full"
                                    }`}
                                >
                                    <button
                                        onClick={toogle}
                                        className="bg-blue-900/90 text-white/60 hover:bg-blue-900/70 rounded-md px-2"
                                    >
                                        {toogleForm
                                            ? "Hide Form"
                                            : "Invite Collaborator"}
                                    </button>
                                </div>
                            </div>
                            {toogleForm && (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">
                                            Research
                                        </label>
                                        <select
                                            name="research_id"
                                            value={data.research_id}
                                            onChange={(e) =>
                                                setData(
                                                    "research_id",
                                                    e.target.value
                                                )
                                            }
                                            className="form-select block w-full mt-1 rounded-md"
                                        >
                                            <option value="">
                                                Select Research
                                            </option>
                                            {researches.map((research) => (
                                                <option
                                                    key={research.id}
                                                    value={research.id}
                                                >
                                                    {research.title}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.research_id && (
                                            <div className="text-red-600">
                                                {errors.research_id}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block font-medium text-sm text-gray-700">
                                            Collaborator
                                        </label>
                                        <select
                                            name="collaborator_id"
                                            value={data.collaborator_id}
                                            onChange={(e) =>
                                                setData(
                                                    "collaborator_id",
                                                    e.target.value
                                                )
                                            }
                                            className="form-select block w-full mt-1 rounded-lg"
                                        >
                                            <option value="">
                                                Select Collaborator
                                            </option>
                                            {users.map((user) => (
                                                <option
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.collaborator_id && (
                                            <div className="text-red-600">
                                                {errors.collaborator_id}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-4 py-2 bg-blue-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Sending..."
                                                : "Send Invitation"}
                                        </button>
                                    </div>
                                </form>
                            )}

                            <div className="mt-8 bg-gray-50">
                                <h3 className="font-bold text-lg px-4 pt-4 text-blue-900/80">
                                    Your Invitations
                                </h3>
                                <div className="overflow-x-auto mt-4 max-h-64 overflow-y-auto px-2">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className="bg-blue-900/70 rounded-md">
                                            <tr className="text-white">
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80  uppercase tracking-wider">
                                                    Collaborator
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80  uppercase tracking-wider">
                                                    Research Topic
                                                </th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-white/80  uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {collaborations.map(
                                                (collaboration, index) =>
                                                    collaboration.user_id ===
                                                    auth.user.id ? (
                                                        <tr
                                                            key={
                                                                collaboration.id
                                                            }
                                                            className={
                                                                index % 2 === 0
                                                                    ? "bg-gray-50"
                                                                    : "bg-white"
                                                            }
                                                        >
                                                            <td className="px-4 py-2 whitespace-nowrap">
                                                                {
                                                                    collaboration
                                                                        .collaborator
                                                                        .name
                                                                }
                                                            </td>
                                                            <td className="px-4 py-2 whitespace-nowrap">
                                                                {
                                                                    collaboration
                                                                        .research
                                                                        .title
                                                                }
                                                            </td>
                                                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                                                <button
                                                                    onClick={() =>
                                                                        handleCancel(
                                                                            collaboration.id
                                                                        )
                                                                    }
                                                                >
                                                                    <MdCancel className="!text-red-600/90 text-[25px] hover:text-red-600/70" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ) : null
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {collaborations.filter(
                                    (collaboration) =>
                                        collaboration.user_id === auth.user.id
                                ).length === 0 && (
                                    <div className="p-4 text-center text-gray-500">
                                        You have not placed any invitations yet!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
