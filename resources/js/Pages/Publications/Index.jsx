import { Head } from "@inertiajs/react";
import React from "react";

const Index = ({ auth }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500  leading-tight">
                    Publications
                </h2>
            }
        >
            <Head title="Publications" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ul></ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
