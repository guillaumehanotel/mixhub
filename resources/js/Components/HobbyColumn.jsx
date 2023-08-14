export default function HobbyColumn({ title, itemsDoing, itemsTodo, onSearchClicked }) {
    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <div className="mb-4">
                <button
                    onClick={onSearchClicked}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Recherche {title}
                </button>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-2">En cours</h2>
                <ul>
                    {itemsDoing.map((item, index) => (
                        <li key={index} className="p-2 hover:bg-gray-300 rounded mt-2 cursor-pointer">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-2">À faire</h2>
                <ul>
                    {itemsTodo.map((item, index) => (
                        <li key={index} className="p-2 hover:bg-gray-300 rounded mt-2 cursor-pointer">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
