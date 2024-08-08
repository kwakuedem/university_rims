import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { IoMdSend } from "react-icons/io";

const Chat = ({ auth, chats }) => {
    const { data, setData, post, processing, errors } = useForm({
        status: "", // To determine whether the action is 'accept' or 'reject'
    });

    const submit = (e) => {
        e.preventDefault();
    };
    console.log(chats);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Collaborations
                </h2>
            }
        >
            <Head title="Chat" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 h-full overflow-hidden">
                            <div className="modal w-[40%] m-auto overflow-hidden h-[80%]  bg-slate-800">
                                <h3 className="font-bold text-lg text-white/80 w-full bg-blue-900 p-2">
                                    Chat Collaborator
                                </h3>

                                <div className="h-80 overflow-auto px-5 pt-3">
                                    {chats.map((chat) => (
                                        <div
                                            key={chat.id}
                                            className={`flex mt-2 ${
                                                chat.user_id === auth.user.id
                                                    ? "justify-start"
                                                    : "justify-end"
                                            }`}
                                        >
                                            <div
                                                className={`p-2 rounded-lg ${
                                                    chat.user_id ===
                                                    auth.user.id
                                                        ? "bg-blue-500 text-white self-start"
                                                        : "bg-gray-300 text-black self-end"
                                                }`}
                                            >
                                                <p>{chat.message}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={submit} className="bottom-0">
                                    <div className="flex justify-center outline outline-1 bg-slate-900 rounded-md">
                                        <input
                                            type="text"
                                            placeholder="message"
                                            className="rounded-md w-[80%] text-sm bg-slate-900  text-white-/60 outline-none border-0 focus:ring-0 focus:outline-0"
                                        />

                                        <span className="flex justify-center items-center">
                                            <IoMdSend className="text-white/80 text-xl flex item-center" />
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Chat;
