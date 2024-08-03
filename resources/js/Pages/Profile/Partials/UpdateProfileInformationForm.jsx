import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            profile_photo: user.profile_photo,
            bio: user.bio,
            title: user.title,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
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

                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                        <img
                            className="rounded-full"
                            src={data.profile_photo}
                        />
                    </div>
                </div>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6 "
                enctype="multipart/form-data"
            >
                <div className="avatar flex justify-end">
                    <div className="image-upload">
                        <InputLabel
                            htmlFor="profile_photo"
                            value="Profile Image"
                        />
                        <TextInput
                            id="profile_photo"
                            type="file"
                            className="file-input file-input-bordered file-input-primary max-w-[100px] overflow-hidden"
                            value={data.profile_photo}
                            onChange={(e) =>
                                setData("profile_photo", e.target.value)
                            }
                            required
                            isFocused
                        />

                        <InputError
                            className="mt-2"
                            message={errors.profile_photo}
                        />
                    </div>
                </div>
                <div className="flex gap-4 ">
                    <div className="w-full">
                        <InputLabel htmlFor="title" value="Title" />

                        <TextInput
                            id="title"
                            className="mt-1 block w-full h-8"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            required
                            isFocused
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
                            isFocused
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="bio" value="Bio" />

                    <textarea
                        cols={10}
                        rows={10}
                        id="bio"
                        className=" border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                        value={data.bio}
                        onChange={(e) => setData("bio", e.target.value)}
                        required
                        isFocused
                        autoComplete="bio"
                    />

                    <InputError className="mt-2" message={errors.bio} />
                </div>

                <div>
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
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

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
