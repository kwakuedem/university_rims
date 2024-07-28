import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Create = ({ researches, users, auth, research_count }) => {
    const [researchId, setResearchId] = useState("");
    const [collaboratorId, setCollaboratorId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/collaborations", {
            research_id: researchId,
            collaborator_id: collaboratorId,
        });
    };

    console.log(research_count);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500  leading-tight">
                    Collaborations
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Research</label>
                                    <select
                                        value={researchId}
                                        onChange={(e) =>
                                            setResearchId(e.target.value)
                                        }
                                    >
                                        <option value="">
                                            Select Research
                                        </option>
                                        {count(researches) > 0 ? (
                                            researches.map((research) => (
                                                <option
                                                    key={research.id}
                                                    value={research.id}
                                                >
                                                    {research.title}
                                                </option>
                                            ))
                                        ) : (
                                            <p>No Research available</p>
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label>Collaborator</label>
                                    <select
                                        value={collaboratorId}
                                        onChange={(e) =>
                                            setCollaboratorId(e.target.value)
                                        }
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
                                </div>
                                <button type="submit">Send Invitation</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
        // <div>
        //     <h1>Invite Collaborator</h1>

        // </div>
    );
};

export default Create;
