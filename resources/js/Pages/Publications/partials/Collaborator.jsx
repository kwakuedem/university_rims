import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";

function Collaborator({
    collaborators,
    setIsModalOpen,
    publication,
    setIsModalOpenTrue,
}) {
    const { data, setData, post, processing, errors } = useForm({
        collaborators: publication?.collaborators?.map((c) => c.id) || [],
    });

    const addCollaborator = () => {
        setData("collaborators", [...data.collaborators, ""]);
        setCollaboratorCount(collaboratorCount + 1);
    };

    const removeCollaborator = (index) => {
        const newCollaborators = data.collaborators.filter(
            (_, i) => i !== index
        );
        setData("collaborators", newCollaborators);
        setCollaboratorCount(collaboratorCount - 1);
    };

    const handleChange = (index, value) => {
        const newCollaborators = data.collaborators.map((c, i) =>
            i === index ? value : c
        );
        setData("collaborators", newCollaborators);
    };

    const [collaboratorCount, setCollaboratorCount] = useState();

    const submitCollaborator = (e) => {
        e.preventDefault();
        post(route("collaborations.store", publication.id));
        setIsModalOpen(false);
    };

    return (
        <>
            {" "}
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h3 className="text-lg font-semibold mb-4">
                        Add Collaborators
                    </h3>

                    <form onSubmit={submitCollaborator}>
                        <div>
                            <label>Collaborators:</label>
                            {data.collaborators.map((collaborator, index) => (
                                <div key={index} className="mb-2 flex">
                                    <select
                                        value={collaborator}
                                        onChange={(e) =>
                                            handleChange(index, e.target.value)
                                        }
                                        className="mr-2 p-2 border rounded-md w-full"
                                    >
                                        <option value="">
                                            Select Collaborator
                                        </option>
                                        {collaborators.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeCollaborator(index)
                                        }
                                        className="text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addCollaborator}
                                className="text-blue-500"
                            >
                                Add Collaborator
                            </button>
                        </div>

                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Collaborator;
