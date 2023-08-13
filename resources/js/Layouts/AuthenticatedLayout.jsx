import {useEffect, useRef, useState} from 'react';
import {Link, usePage} from '@inertiajs/react';
import {router} from '@inertiajs/react'


export default function Authenticated({user, children}) {
    const {bookmarkCategories} = usePage().props;
    const backgroundImage = user.background_image_url;
    const url = usePage().props.ziggy.location;

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [categoryName, setCategoryName] = useState("");

    const [isCollapsed, setIsCollapsed] = useState(() => {
        const savedState = localStorage.getItem('isCollapsed');
        return savedState !== null ? JSON.parse(savedState) : true;
    });

    const [isLocked, setIsLocked] = useState(() => {
        const savedLockState = localStorage.getItem('isLocked');
        return savedLockState !== null ? JSON.parse(savedLockState) : false;
    });

    const [editCategoryName, setEditCategoryName] = useState("");
    const [editCategoryId, setEditCategoryId] = useState(null);

    const [contextMenu, setContextMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        categoryId: null,
    });

    useEffect(() => {
        localStorage.setItem('isCollapsed', JSON.stringify(isCollapsed));
        localStorage.setItem('isLocked', JSON.stringify(isLocked));
    }, [isCollapsed, isLocked]);

    const handleLinkClick = (e) => {
        e.stopPropagation();
    };

    const handleMenuHover = () => {
        if (isCollapsed && !isLocked) {
            setIsCollapsed(false);  // Expand the menu when hovered over, only if it's collapsed and not locked
        }
    };

    const handleMenuLeave = () => {
        if (!isCollapsed && !isLocked) {
            setIsCollapsed(true);  // Collapse the menu when the mouse leaves, only if it was expanded due to hover and not locked
        }
    };

    const handleMenuClick = () => {
        if (isCollapsed) {
            setIsCollapsed(false); // If menu is collapsed, expand it on click
        } else {
            setIsLocked(!isLocked); // If menu is not collapsed, toggle the lock state
        }
    };

    const handleOpenForm = (e) => {
        e.stopPropagation();
        setIsDialogOpen(true);
    };

    const handleCloseForm = () => {
        setIsDialogOpen(false);
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        await router.post('/bookmark-categories', {
            name: categoryName,
        })
        handleCloseForm()
    };

    const renameCategory = (categoryId) => {
        const category = bookmarkCategories.find(c => c.id === categoryId);
        setEditCategoryName(category.name);
        setEditCategoryId(categoryId);
    };

    const handleUpdateCategory = async () => {
        await router.put(`/bookmark-categories/${editCategoryId}`, {
            name: editCategoryName,
        });
        setEditCategoryName("");
        setEditCategoryId(null);
    };

    const deleteCategory = async (categoryId) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie?");
        if (confirmed) {
            await router.delete(`/bookmark-categories/${categoryId}`);
        }
        handleCloseContextMenu();
    };


    const handleContextMenu = (event, categoryId) => {
        event.preventDefault();

        setContextMenu({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            categoryId: categoryId,
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu({
            visible: false,
            x: 0,
            y: 0,
            categoryId: null,
        });
    };

    useEffect(() => {
        window.addEventListener('click', handleCloseContextMenu);

        return () => {
            window.removeEventListener('click', handleCloseContextMenu);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">

            <ul className={`menu bg-base-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-60'} h-screen fixed left-0 text-lg flex flex-col justify-between`}
                onMouseEnter={handleMenuHover}
                onMouseLeave={handleMenuLeave}
                onClick={handleMenuClick}
            >
                <div>
                    <li className="h-12">
                        <Link href={route('dashboard')} onClick={handleLinkClick}>
                            <i className="fa-solid fa-chart-line w-5 mr-3"></i>
                            <span
                                className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>Dashboard</span>
                        </Link>
                    </li>
                    <li className="h-12">
                        <a onClick={handleLinkClick}>
                            <i className="fas fa-pizza-slice w-5 mr-3"></i>
                            <span
                                className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>Recettes</span>
                        </a>
                    </li>
                    <li className="h-12">
                        <a onClick={handleLinkClick}>
                            <i className="fa-solid fa-house w-5 mr-3"></i>
                            <span
                                className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>Loisirs</span>
                        </a>
                    </li>
                    <li className="h-12">
                        <a onClick={handleLinkClick}>
                            <i className="fa-solid fa-coins w-5 mr-3"></i>
                            <span
                                className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                                Finances</span>
                        </a>
                    </li>
                    <li className={isCollapsed ? 'collapsed' : ''}>
                        <Link href={route('bookmarks.index')} onClick={handleLinkClick}>
                            <i className="fa-solid fa-link w-5 mr-3"></i>
                            <span
                                className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                                Favoris</span>
                        </Link>
                        <ul>
                            <li>
                                <button className={`focus:!bg-inherit active:!bg-inherit`} onClick={handleOpenForm}>
                                    <i className={`fa-solid fa-plus transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}></i>
                                    <span
                                        className={`whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                                        Ajouter une page
                                    </span>
                                </button>
                            </li>
                            {bookmarkCategories && bookmarkCategories.map(category => (
                                <li key={category.id} onContextMenu={(e) => handleContextMenu(e, category.id)}>
                                    <Link href={route('bookmarks.show', category.slug)}
                                          className={!isCollapsed && url.includes(category.slug) ? 'active-link' : ''}
                                          onClick={handleLinkClick}>
                                    <span
                                        className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                                        {category.name}
                                    </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                </div>

                <div>
                    <li className="h-12">
                        <Link href={route('profile.edit')} onClick={handleLinkClick}>
                            <i className="fa-solid fa-user w-5 mr-3"></i>
                            <span
                                className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>Profil</span>
                        </Link>
                    </li>
                    <li className="h-12">
                        <Link href={route('logout')} onClick={handleLinkClick}>
                            <i className="fa-solid fa-sign-out w-5 mr-3"></i>
                            <span
                                className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>Déconnexion</span>
                        </Link>
                    </li>
                </div>

            </ul>

            <main
                className="min-h-screen flex-grow transition-all duration-300"
                style={{
                    marginLeft: isCollapsed ? '4rem' : '15rem',
                    backgroundImage: `url(${backgroundImage})`,
                }}
            >
                {isDialogOpen && (

                    <dialog
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 text-black rounded-lg"
                    >
                        <form method={'dialog'} className="bg-white rounded-lg shadow-md p-6 space-y-4"
                              onSubmit={handleCreateCategory}>
                            <h3 className={'font-bold text-lg'}>Ajouter une catégorie</h3>
                            <input
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Nom de la catégorie"
                                className="block w-full p-2 border rounded-md"
                            />
                            <div className="flex justify-end space-x-2">
                                <button type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Ajouter
                                </button>
                                <button type="button" className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                        onClick={handleCloseForm}>Annuler
                                </button>
                            </div>
                        </form>
                    </dialog>
                )}

                {editCategoryId && (
                    <dialog className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 text-black rounded-lg">
                        <form method={'dialog'} className="bg-white rounded-lg shadow-md p-6 space-y-4" onSubmit={handleUpdateCategory}>
                            <h3 className={'font-bold text-lg'}>Renommer la catégorie</h3>
                            <input
                                value={editCategoryName}
                                onChange={(e) => setEditCategoryName(e.target.value)}
                                placeholder="Nouveau nom de la catégorie"
                                className="block w-full p-2 border rounded-md"
                            />
                            <div className="flex justify-end space-x-2">
                                <button type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Mettre à jour
                                </button>
                                <button type="button" className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                        onClick={() => setEditCategoryId(null)}>Annuler
                                </button>
                            </div>
                        </form>
                    </dialog>
                )}

                {children}
            </main>

            {
                contextMenu.visible && (
                    <div
                        style={{
                            top: `${contextMenu.y}px`,
                            left: `${contextMenu.x}px`,
                        }}
                        className="context-menu"
                    >
                        <button onClick={() => renameCategory(contextMenu.categoryId)}>
                            Renommer
                        </button>
                        <button onClick={() => deleteCategory(contextMenu.categoryId)}>
                            Supprimer
                        </button>
                    </div>
                )
            }

        </div>
    );
}
