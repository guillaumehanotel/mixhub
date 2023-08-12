import {useEffect, useState} from 'react';
import {Link, usePage} from '@inertiajs/react';

export default function Authenticated({user, children}) {
    const {bookmarkCategories} = usePage().props;
    const backgroundImage = user.background_image_url;

    const [isCollapsed, setIsCollapsed] = useState(() => {
        const savedState = localStorage.getItem('isCollapsed');
        return savedState !== null ? JSON.parse(savedState) : true;
    });

    const [isLocked, setIsLocked] = useState(() => {
        const savedLockState = localStorage.getItem('isLocked');
        return savedLockState !== null ? JSON.parse(savedLockState) : false;
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
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">

            <ul className={`menu bg-base-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-56'} h-screen fixed left-0 text-lg flex flex-col justify-between`}
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
                            {bookmarkCategories && bookmarkCategories.map(category => (
                                <li key={category.id}>
                                    <Link href={route('bookmarks.show', category.slug)} onClick={handleLinkClick}>
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
                    marginLeft: isCollapsed ? '4rem' : '14rem',
                    backgroundImage: `url(${backgroundImage})`,
            }}
            >
                {children}
            </main>

        </div>
    );
}
