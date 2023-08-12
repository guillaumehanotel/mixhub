import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileBackground({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        background: null,
    });

    const handleImageChange = (e) => {
        setData('background', e.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        post(route('profile.upload-background'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Image de fond</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Mettez à jour l'image de fond de votre profil.
                </p>
            </header>

            <form onSubmit={handleUpload} className="mt-6 space-y-6">
                <div className="flex flex-col items-center">
                    <img
                        src={user.background_image_url || '/storage/default-images/default-bg.png'}
                        alt="Profile background preview"
                        className="w-72 border rounded-md mb-4"
                    />

                    <InputLabel value="Choisir une image" />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="p-2 border rounded-md focus:border-blue-400 w-full"
                    />
                    <InputError className="mt-2" message={errors.background} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Upload</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Image mise à jour.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
