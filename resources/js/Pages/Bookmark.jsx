import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Bookmark({ auth, bookmarks }) {


    function handleDrop(event) {
        event.preventDefault();

        const url = event.dataTransfer.getData('URL');
        const title = event.dataTransfer.getData('Text');

        console.log(url, title)
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Favoris" />


            <div className="flex flex-row flex-wrap -m-2.5 pt-12 mx-28"
                 onDrop={handleDrop}
                 onDragOver={handleDragOver}
                 onDragEnter={handleDragEnter}
            >
                {bookmarks.map(bookmark => (
                    <div key={bookmark.id} className="mx-4 w-36">

                        <div className="h-36 shadow-md overflow-hidden relative bg-opacity-20 border border-opacity-30 rounded-xl backdrop-blur-md">
                            <img src={bookmark.icon} alt={`${bookmark.title} icon`} className="w-full h-full object-cover object-center" />
                            <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="absolute top-0 left-0 w-full h-full z-10"></a>
                        </div>

                        <div className="w-full mt-1 text-center text-lg font-normal text-white bg-opacity-70">
                            <h3>{bookmark.title}</h3>
                        </div>

                    </div>
                ))}
            </div>


        </AuthenticatedLayout>
    );
}
