import React, { useState } from "react";

const Create = ({ researches, users }) => {
    const [researchId, setResearchId] = useState("");
    const [collaboratorId, setCollaboratorId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/collaborations", {
            research_id: researchId,
            collaborator_id: collaboratorId,
        });
    };

    return (
        <div>
            <h1>Invite Collaborator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Research</label>
                    <select
                        value={researchId}
                        onChange={(e) => setResearchId(e.target.value)}
                    >
                        <option value="">Select Research</option>
                        {researches.map((research) => (
                            <option key={research.id} value={research.id}>
                                {research.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Collaborator</label>
                    <select
                        value={collaboratorId}
                        onChange={(e) => setCollaboratorId(e.target.value)}
                    >
                        <option value="">Select Collaborator</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Send Invitation</button>
            </form>
        </div>
    );
};

export default Create;
