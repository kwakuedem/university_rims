import React from "react";

function Collaborator({}) {
    return (
        <>
            <button
                className="btn"
                onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                }
            >
                open modal
            </button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog" onSubmit={submit}>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>

                        <h2>Edit Publication - {publication.title}</h2>

                        <div>
                            <label>Collaborators:</label>
                            {data.collaborators.map((collaborator, index) => (
                                <div key={index} className="mb-2 flex">
                                    <select
                                        value={collaborator}
                                        onChange={(e) =>
                                            handleChange(index, e.target.value)
                                        }
                                        className="mr-2"
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

                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white"
                            >
                                Save
                            </button>
                        </div>

                        {errors.collaborators && (
                            <div>{errors.collaborators}</div>
                        )}
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                        Press ESC key or click on ✕ button to close
                    </p>
                </div>
            </dialog>
        </>
    );
}

export default Collaborator;
