import { Link, Head, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import AdminLayout from "../../../Layouts/AdminLayout ";
import { useState } from "react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

export default function Show({ message, auth }) {
    const { data, setData, post, errors } = useForm({
        email: message.email,
        message: "",
    });

    const [openModal, setOpenModal] = useState(false);

    const onReply = () => {
        setOpenModal(true);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.sendmail"), {
            forceFormData: true,
            onSuccess: (page) => {
                alert("Email sent successfully");
            },
            onError: (page) => {
                alert("Fail to send email");
            },
        });
        // console.log(data);
        setOpenModal(false);
    };
    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-sm text-gray-500 leading-tight">
                    Message
                </h2>
            }
        >
            <Head title="Departments" />

            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white w-[50%] m-auto overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 text-gray-900">
                            <div className="submission-section grid lg:m-auto pt-2">
                                <h2 className="title text-black/80 text-xl font-bold">
                                    Message from : {message.name}
                                </h2>

                                <p className=" text-black/80">
                                    {message.message}
                                </p>

                                <div className="flex justify-end">
                                    <button
                                        onClick={onReply}
                                        className="bg-blue-500 rounded-md py-1 px-3 w-24 text-white"
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>

                            {openModal && (
                                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                                    <form
                                        onSubmit={submit}
                                        action=""
                                        className="bg-white w-1/2 px-4 pt-6 pb-3 rounded-md"
                                    >
                                        <TextInput
                                            id="email"
                                            name="email"
                                            className="mt-1 block w-full !pointer-events-auto outline outline-0 outline-blue-900 h-8 bg-slate-50 shadow-inner focus:outline-0 focus:border-collapse"
                                            value={data.email}
                                        />

                                        <textarea
                                            cols={5}
                                            rows={3}
                                            id="message"
                                            className="outline outline-1 outline-blue-900 border-gray-300 bg-slate-50 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                            value={data.message}
                                            onChange={(e) =>
                                                setData(
                                                    "message",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.message}
                                        />
                                        <div className="flex justify-end py-4">
                                            <button className="bg-blue-500 rounded-md py-1 px-3 w-24 text-white">
                                                Send
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
