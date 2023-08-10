import {useState} from 'react';
import {Link} from '@inertiajs/react';

export default function Authenticated({user, header, children}) {
    const [isCollapsed, setIsCollapsed] = useState(true);  // Start with the menu collapsed
    const [isLocked, setIsLocked] = useState(false);       // Lock state for the menu

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
                        <a onClick={handleLinkClick}>
                            <i className="fa-solid fa-chart-line w-5 mr-3"></i>
                            <span
                                className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>Dashboard</span>
                        </a>
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
                        <a onClick={handleLinkClick}>
                            <i className="fa-solid fa-link w-5 mr-3"></i>
                            <span
                                className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                                Favoris</span>
                        </a>
                        <ul>
                            <li>
                                <a onClick={handleLinkClick}>
                                    <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>Administratif</span>
                                </a>
                            </li>
                            <li>
                                <a onClick={handleLinkClick}>
                                    <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>QDV</span>
                                </a>
                            </li>
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
                                className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>Logout</span>
                        </Link>
                    </li>
                </div>

            </ul>

            <main className="min-h-screen flex-grow transition-all duration-300" style={{ marginLeft: isCollapsed ? '4rem' : '14rem' }}>{children}</main>

        </div>
    );
}
