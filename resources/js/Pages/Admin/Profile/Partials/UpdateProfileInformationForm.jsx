import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import QualificationForm from "./Qualification";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,

    className = "",
}) {
    const user = usePage().props.auth.user;
    const message = usePage().props.success;
    const { props } = usePage();
    const { success } = props;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            profile_photo: user.profile_photo ?? "",
            bio: user.bio ?? "",
            title: user.title ?? "",
            research_area: user.research_area ?? "",
            whatsapp: user.whatsapp ?? "",
            linkedin: user.linkedin ?? "",
            facebook: user.facebook ?? "",
            _method: "patch",
        });
    const photoRef = useRef(data.profile_photo);

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.profile.update", user.id), {
            onSuccess: (page) => {
                alert("Profile Updated Successfully.");
            },
            onError: (page) => {
                alert("Ooops! Failed to Updated profile.");
            },
        });
    };

    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (message && message) {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    }, [message]);

    const getAssetUrl = (path) => {
        return `${window.location.origin}/storage/${path}`;
    };

    return (
        <section className={className}>
            {showMessage && (
                <span className="bg-green-500 z-20 absolute top-6  rounded-md text-white right-10 p-3">
                    {message}
                </span>
            )}

            {success && (
                <div className="bg-green-500 text-white p-4 mb-4 rounded">
                    {success}
                </div>
            )}

            <header className="flex justify-between">
                <div className="profile-heading flex flex-col">
                    <h2 className="text-lg font-medium text-gray-900">
                        Profile Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Update your account's profile information and email
                        address.
                    </p>
                </div>

                <div className="">
                    <div className="ring-primary ring-offset-base-100 w-24  rounded-full ring ring-offset-2">
                        <img
                            className="rounded-full"
                            src={getAssetUrl(user.profile_photo)}
                            alt="Profile"
                        />
                    </div>
                </div>
            </header>

            <form
                onSubmit={submit}
                className="mt-2 space-y-6"
                encType="multipart/form-data"
            >
                <div className="flex items-center gap-20">
                    <div className="image-upload w-full">
                        <InputLabel
                            htmlFor="profile_photo"
                            value="Profile Image"
                        />
                        <TextInput
                            id="profile_photo"
                            type="file"
                            ref={photoRef}
                            className="file-input !z-0 file-input-bordered file-input-primary overflow-hidden"
                            onChange={(e) =>
                                setData("profile_photo", e.target.files[0])
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.profile_photo}
                            hidden
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-full">
                        <InputLabel htmlFor="title" value="Title" />

                        <TextInput
                            id="title"
                            className="mt-1 block w-full h-8"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            autoComplete="title"
                        />

                        <InputError className="mt-2" message={errors.title} />
                    </div>
                    <div className="w-full">
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full h-8"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div className="w-full">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full h-8"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row w-full gap-3">
                    <div className="w-full">
                        <InputLabel htmlFor="bio" value="Biography" />

                        <textarea
                            cols={10}
                            rows={5}
                            id="bio"
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                            value={data.bio}
                            onChange={(e) => setData("bio", e.target.value)}
                        />

                        <InputError className="mt-2" message={errors.bio} />
                    </div>
                    <div className="w-full">
                        <InputLabel
                            htmlFor="research_area "
                            value="Research Areas (please seperate areas with comma . eg AI, Machine learning)"
                        />

                        <textarea
                            cols={10}
                            rows={5}
                            id="research_area"
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                            value={data.research_area}
                            onChange={(e) =>
                                setData("research_area", e.target.value)
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors.research_area}
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-full flex gap-3 items-center">
                        {/* <InputLabel htmlFor="What'sApp" value="What'sApp" /> */}
                        <FaWhatsapp className="text-green-600 text-2xl" />
                        <TextInput
                            id="What'sApp"
                            className="mt-1 block w-full h-8"
                            value={data.whatsapp}
                            onChange={(e) =>
                                setData("whatsapp", e.target.value)
                            }
                            autoComplete="What'sApp"
                        />

                        <InputError className="mt-2" message={errors.title} />
                    </div>
                    <div className="w-full flex gap-3 items-center">
                        {/* <InputLabel htmlFor="Face Book" value="Facebook" /> */}
                        <FaFacebook className="text-blue-600 text-2xl" />
                        <TextInput
                            id="Facebook"
                            className="mt-1 block w-full h-8"
                            value={data.facebook}
                            onChange={(e) =>
                                setData("facebook", e.target.value)
                            }
                            autoComplete="facebook"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.facebook}
                        />
                    </div>
                    <div className="w-full flex gap-3  items-center">
                        {/* <InputLabel htmlFor="Linkedin" value="Linkedin Link" /> */}
                        <FaLinkedin className="text-blue-600 text-2xl" />
                        <TextInput
                            id="linkedin"
                            className="mt-1 block w-full h-8"
                            value={data.linkedin}
                            onChange={(e) =>
                                setData("linkedin", e.target.value)
                            }
                            autoComplete="linkedin"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.linkedin}
                        />
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        disabled={processing}
                        className="!w-[20%] items-center justify-center"
                    >
                        Save Changes
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
