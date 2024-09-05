import { useForm } from "@inertiajs/react";
import React from "react";

function Collaborator({
    collaborators,
    setIsModalOpen,
    publication,
    Error_message,
}) {
    const { data, setData, post, processing } = useForm({
        collaborators:
            publication?.collaborators?.map((c) => ({
                id: c.id || "",
                name: c.name || "",
            })) || [],
        publication_id: publication.id, // Add publication_id to the form data
        method: "_post",
    });

    const addCollaborator = () => {
        setData("collaborators", [...data.collaborators, { id: "", name: "" }]);
    };

    const removeCollaborator = (index) => {
        const newCollaborators = data.collaborators.filter(
            (_, i) => i !== index
        );
        setData("collaborators", newCollaborators);
    };

    const handleChange = (index, value, field) => {
        const newCollaborators = data.collaborators.map((collaborator, i) =>
            i === index ? { ...collaborator, [field]: value } : collaborator
        );
        setData("collaborators", newCollaborators);
    };

    const submitCollaborator = (e) => {
        e.preventDefault();
        post(route("collaborations.store", publication.id), {
            onSuccess: () => {
                alert("Collaborator(s) Added Successfully.");
            },
            onError: () => {
                alert("Ooops! Failed to Add Collaborator(s).");
            },
        });

        if (Error_message) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">
                    Add Collaborators
                </h3>

                <form onSubmit={submitCollaborator}>
                    <div>
                        <label>Collaborators:</label>
                        {data.collaborators.map((collaborator, index) => (
                            <div key={index} className="mb-2 flex flex-col">
                                <div className="flex">
                                    <select
                                        value={collaborator.id}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                e.target.value,
                                                "id"
                                            )
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
                                        className="text-red-500 ml-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                                {!collaborator.id && (
                                    <input
                                        type="text"
                                        placeholder="Enter collaborator name"
                                        value={collaborator.name}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                e.target.value,
                                                "name"
                                            )
                                        }
                                        className="mt-2 p-2 border rounded-md w-full"
                                    />
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addCollaborator}
                            className="text-blue-500 mt-2"
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
    );
}

export default Collaborator;
