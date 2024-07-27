import React from "react";

const Index = ({ collaborations }) => {
    const handleAccept = (id) => {
        Inertia.put(`/collaborations/${id}`, { status: "accepted" });
    };

    const handleReject = (id) => {
        Inertia.put(`/collaborations/${id}`, { status: "rejected" });
    };

    return (
        <div>
            <h1>Collaborations</h1>
            <ul>
                {collaborations.map((collaboration) => (
                    <li key={collaboration.id}>
                        <p>{collaboration.research.title}</p>
                        <p>{collaboration.collaborator.name}</p>
                        <p>Status: {collaboration.status}</p>
                        {collaboration.status === "pending" && (
                            <>
                                <button
                                    onClick={() =>
                                        handleAccept(collaboration.id)
                                    }
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() =>
                                        handleReject(collaboration.id)
                                    }
                                >
                                    Reject
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Index;
