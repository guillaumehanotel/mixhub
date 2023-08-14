import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useState} from "react";
import HobbyColumn from "@/Components/HobbyColumn.jsx";

export default function Hobby({ auth, games, gamesToPlay, gamesPlaying }) {

    const [selectedGame, setSelectedGame] = useState(null);

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Hobby" />


            <div className="grid grid-cols-4 gap-4">

                <HobbyColumn title={'Jeux Vidéos'} itemsDoing={gamesPlaying} itemsTodo={gamesToPlay} />

            </div>



            {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">*/}
            {/*    {games.map(game => (*/}
            {/*        <div key={game.id}*/}
            {/*             onClick={() => setSelectedGame(game)}*/}
            {/*             className="p-4 border rounded-md hover:bg-gray-100 cursor-pointer transition-all duration-200"*/}
            {/*        >*/}
            {/*            <div className="font-medium text-xl">{game.name}</div>*/}
            {/*            {game.background_image && <img loading={'lazy'} src={game.background_image} alt={game.name} className="mt-2 rounded-md w-full h-40 object-cover" />}*/}
            {/*            <div className="mt-2 text-gray-500">Rating: {game.rating}</div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}


            {/*{selectedGame && (*/}
            {/*    <div className="fixed z-10 inset-0 overflow-y-auto">*/}
            {/*        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">*/}
            {/*            <div className="fixed inset-0 transition-opacity">*/}
            {/*                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>*/}
            {/*            </div>*/}
            {/*            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">*/}
            {/*                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">*/}
            {/*                    <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">{selectedGame.name}</h2>*/}
            {/*                    <img src={selectedGame.background_image} alt={selectedGame.name} className="w-full mb-4" loading={'lazy'}/>*/}
            {/*                    <div className="space-y-2">*/}
            {/*                        <p className="text-sm leading-5 text-gray-600">Playtime: {selectedGame.playtime} hours</p>*/}
            {/*                        <p className="text-sm leading-5 text-gray-600">Release Date: {selectedGame.released}</p>*/}
            {/*                        <p className="text-sm leading-5 text-gray-600">Rating: {selectedGame.rating}</p>*/}
            {/*                        <p className="text-sm leading-5 text-gray-600">Ratings Count: {selectedGame.ratings_count}</p>*/}
            {/*                        <p className="text-sm leading-5 text-gray-600">Added by users: {selectedGame.added}</p>*/}
            {/*                        {selectedGame.metacritic && <p className="text-sm leading-5 text-gray-600">Metacritic Score: {selectedGame.metacritic}</p>}*/}
            {/*                        <p className="text-sm leading-5 text-gray-600">Platforms: {selectedGame.platforms.join(', ')}</p>*/}
            {/*                        <p className="text-sm leading-5 text-gray-600">Stores: {selectedGame.stores ? selectedGame.stores.join(', ') : 'N/A'}</p>*/}
            {/*                        <p className="text-sm leading-5 text-gray-600">Tags: {selectedGame.tags.join(', ')}</p>*/}
            {/*                        {selectedGame.esrb_rating && <p className="text-sm leading-5 text-gray-600">ESRB Rating: {selectedGame.esrb_rating}</p>}*/}
            {/*                        <p className="text-sm leading-5 text-gray-600">Genres: {selectedGame.genres ? selectedGame.genres.join(', ') : 'N/A'}</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">*/}
            {/*        <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">*/}
            {/*            <button onClick={() => setSelectedGame(null)} type="button" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">*/}
            {/*                Close*/}
            {/*            </button>*/}
            {/*        </span>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}


        </AuthenticatedLayout>
    );
}


