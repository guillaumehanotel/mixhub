import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router} from '@inertiajs/react';
import {useEffect, useState} from "react";
import DragDropContext from "@/contexts/DragDropContext.js";


export default function Bookmark({auth, bookmarks, bookmarkCategory}) {

    const [draggedItem, setDraggedItem] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [newBookmarkTitle, setNewBookmarkTitle] = useState("");
    const [newBookmarkURL, setNewBookmarkURL] = useState("");

    const [contextMenu, setContextMenu] = useState({visible: false, x: 0, y: 0, bookmarkId: null});

    const [isEditing, setIsEditing] = useState(false);
    const [selectedBookmark, setSelectedBookmark] = useState(null);

    const handleDragStart = (e, bookmarkId) => {
        setDraggedItem(bookmarkId);
    };

    const handleDragEnd = (e) => {
        setDraggedItem(null);
    };


    const handleRightClick = (e, bookmarkId) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            bookmarkId: bookmarkId,
        });
    };

    const closeContextMenu = () => {
        setContextMenu({visible: false, x: 0, y: 0, bookmarkId: null});
    };

    useEffect(() => {
        document.addEventListener("click", closeContextMenu);
        return () => {
            document.removeEventListener("click", closeContextMenu);
        };
    }, []);

    function editBookmark(bookmarkId) {
        const bookmark = bookmarks.find(b => b.id === bookmarkId);
        setNewBookmarkTitle(bookmark.title);
        setNewBookmarkURL(bookmark.url);
        setSelectedBookmark(bookmark);
        setIsEditing(true);
        setModalOpen(true);
    }


    function deleteBookmark(bookmarkId) {
        router.delete(route('bookmarks.destroy', bookmarkId));
    }

    const handleCreateOrEditBookmark = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await router.put(route('bookmarks.update', selectedBookmark.id), {
                title: newBookmarkTitle,
                url: newBookmarkURL,
            })

            setModalOpen(false);
            setNewBookmarkTitle("");
            setNewBookmarkURL("");

        } else {
            await router.post(route('bookmarks.store'), {
                title: newBookmarkTitle,
                url: newBookmarkURL,
                bookmark_category_id: bookmarkCategory.id,
            })

            setModalOpen(false);
            setNewBookmarkTitle("");
            setNewBookmarkURL("");
        }
    };

    return (
        <DragDropContext.Provider value={{draggedItem, setDraggedItem}}>

            <AuthenticatedLayout
                user={auth.user}
            >
                <Head title="Favoris"/>


                <div className="flex flex-row flex-wrap -m-2.5 pt-12 mx-28">
                    {bookmarks.map(bookmark => (
                        <div key={bookmark.id}
                             className={`mx-4 mb-4 w-36 ${draggedItem === bookmark.id ? 'dragging' : ''}`}
                             onContextMenu={e => handleRightClick(e, bookmark.id)}
                             draggable={true}
                             onDragStart={e => handleDragStart(e, bookmark.id)}
                             onDragEnd={e => handleDragEnd(e)}

                        >

                            <div
                                className="h-36 shadow-md overflow-hidden relative bg-opacity-20 border border-opacity-30 rounded-xl backdrop-blur-md">
                                <img src={bookmark.icon} alt={`${bookmark.title} icon`}
                                     className="w-full h-full object-cover object-center"/>
                                <a href={bookmark.url} target="_blank" rel="noopener noreferrer"
                                   className="absolute top-0 left-0 w-full h-full z-10"></a>
                            </div>

                            <div className="w-full mt-1 text-center text-lg font-normal text-white bg-opacity-70">
                                <h3>{bookmark.title}</h3>
                            </div>

                        </div>
                    ))}
                    <div className="mx-4 mb-4 w-36 cursor-pointer" onClick={() => setModalOpen(true)}>
                        <div
                            className="h-36 shadow-md overflow-hidden relative bg-opacity-20 border border-opacity-30 rounded-xl backdrop-blur-md flex items-center justify-center">
                            <span className="text-4xl text-white bg-opacity-70">+</span>
                        </div>
                        <div className="w-full mt-1 text-center text-lg font-normal text-white bg-opacity-70">
                            <h3>Ajouter un favori</h3>
                        </div>
                    </div>
                </div>

                {modalOpen && (

                    <div
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 text-black">
                        <form onSubmit={handleCreateOrEditBookmark} className="bg-white p-6 rounded-lg space-y-4">
                            <input
                                value={newBookmarkTitle}
                                onChange={(e) => setNewBookmarkTitle(e.target.value)}
                                placeholder="Titre du site"
                                className="block w-full p-2 border rounded-md"
                            />
                            <input
                                value={newBookmarkURL}
                                onChange={(e) => setNewBookmarkURL(e.target.value)}
                                placeholder="URL du site"
                                className="block w-full p-2 border rounded-md"
                            />
                            <div className="flex justify-end space-x-2">
                                <button type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">{isEditing ? 'Modifier' : 'Ajouter'}</button>
                                <button type="button" className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                        onClick={() => setModalOpen(false)}>Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                )}


                {contextMenu.visible && (
                    <div
                        style={{
                            position: 'absolute',
                            top: contextMenu.y,
                            left: contextMenu.x,
                            zIndex: 100,
                            background: 'white',
                            boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
                            borderRadius: '5px',
                        }}
                        className="context-menu"
                    >
                        <button onClick={() => editBookmark(contextMenu.bookmarkId)}>Modifier</button>
                        <button onClick={() => deleteBookmark(contextMenu.bookmarkId)}>Supprimer</button>
                    </div>
                )}

            </AuthenticatedLayout>
        </DragDropContext.Provider>

    );
}
