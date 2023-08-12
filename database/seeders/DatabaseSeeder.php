<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Bookmark;
use App\Models\BookmarkCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $guigui = User::create([
            'name' => 'Guigui',
            'email' => 'gha@qdv.fr',
            'password' => Hash::make('ertyerty'),
        ]);


        $sites = [
            'Administratif' => [
                ['title' => 'Service Public', 'url' => 'https://www.service-public.fr/'],
                ['title' => 'Impots.gouv', 'url' => 'https://www.impots.gouv.fr/'],
                ['title' => 'Sécurité Sociale', 'url' => 'https://www.ameli.fr/'],
                ['title' => 'Pôle Emploi', 'url' => 'https://www.pole-emploi.fr/'],
                ['title' => 'CAF', 'url' => 'https://www.caf.fr/'],
                ['title' => 'Carte Grise', 'url' => 'https://www.immatriculation.ants.gouv.fr/'],
                ['title' => 'Ministère de l\'Intérieur', 'url' => 'https://www.interieur.gouv.fr/'],
                ['title' => 'CNIL', 'url' => 'https://www.cnil.fr/'],
                ['title' => 'Education Nationale', 'url' => 'https://www.education.gouv.fr/'],
                ['title' => 'Santé Publique France', 'url' => 'https://www.santepubliquefrance.fr/'],
            ],
            'E-Commerce' => [
                ['title' => 'Amazon', 'url' => 'https://www.amazon.fr/'],
                ['title' => 'Fnac', 'url' => 'https://www.fnac.com/'],
                ['title' => 'Cdiscount', 'url' => 'https://www.cdiscount.com/'],
                ['title' => 'Leroy Merlin', 'url' => 'https://www.leroymerlin.fr/'],
                ['title' => 'Darty', 'url' => 'https://www.darty.com/'],
                ['title' => 'Boulanger', 'url' => 'https://www.boulanger.com/'],
                ['title' => 'Zalando', 'url' => 'https://www.zalando.fr/'],
                ['title' => 'ASOS', 'url' => 'https://www.asos.fr/'],
                ['title' => 'Vinted', 'url' => 'https://www.vinted.fr/'],
                ['title' => 'Rakuten', 'url' => 'https://fr.shopping.rakuten.com/'],
            ],
            'IT' => [
                ['title' => 'GitHub', 'url' => 'https://github.com/'],
                ['title' => 'Stack Overflow', 'url' => 'https://stackoverflow.com/'],
                ['title' => 'GitLab', 'url' => 'https://gitlab.com/'],
                ['title' => 'Bitbucket', 'url' => 'https://bitbucket.org/'],
                ['title' => 'MDN Web Docs', 'url' => 'https://developer.mozilla.org/'],
                ['title' => 'W3Schools', 'url' => 'https://www.w3schools.com/'],
                ['title' => 'DigitalOcean', 'url' => 'https://www.digitalocean.com/'],
                ['title' => 'Docker', 'url' => 'https://www.docker.com/'],
                ['title' => 'Visual Studio Code', 'url' => 'https://code.visualstudio.com/'],
                ['title' => 'TechCrunch', 'url' => 'https://techcrunch.com/'],
            ],
            'Dofus' => [
                ['title' => 'Site officiel de Dofus', 'url' => 'https://www.dofus.com/fr'],
                ['title' => 'Dofus Wiki', 'url' => 'https://dofuswiki.fandom.com/fr/wiki/Dofuspourlesnoobs_Wiki'],
                ['title' => 'Dofus Book', 'url' => 'https://www.dofusbook.net/fr/'],
                ['title' => 'Dofus Touch', 'url' => 'https://www.dofus-touch.com/fr/'],
                ['title' => 'Forum officiel de Dofus', 'url' => 'https://www.dofus.com/fr/forum'],
                ['title' => 'Encyclopédie Dofus', 'url' => 'https://www.dofus.com/fr/mmorpg/encyclopedie'],
                ['title' => 'Krosmaga', 'url' => 'https://www.krosmaga.com/fr'],
                ['title' => 'Wakfu', 'url' => 'https://www.wakfu.com/fr/mmorpg'],
                ['title' => 'Krosmoz', 'url' => 'https://www.krosmoz.com/fr'],
                ['title' => 'Dofuspourlesnoobs', 'url' => 'https://www.dofuspourlesnoobs.com/'],
            ],

            // Ajoutez d'autres catégories et leurs sites ici...
        ];

        foreach ($sites as $category => $bookmarks) {
            $bookmarkCategory = BookmarkCategory::firstOrCreate([
                'name' => $category,
                'user_id' => $guigui->id,
            ]);

            foreach ($bookmarks as $bookmark) {
                Bookmark::firstOrCreate(
                    ['url' => $bookmark['url']],
                    [
                        'title' => $bookmark['title'],
                        'bookmark_category_id' => $bookmarkCategory->id,
                        'user_id' => $guigui->id,
                    ]
                );
            }
        }


//
//
//        // Créer 10 autres utilisateurs et obtenir leurs IDs
//        $userIds = User::factory(10)->create()->pluck('id')->toArray();
//        array_unshift($userIds, $guigui->id);
//
//
//        // Créer 50 catégories et obtenir leurs IDs
//        $categoryIds = BookmarkCategory::factory(20)->create(['user_id' => function() use ($userIds) {
//            return fake()->randomElement($userIds);
//        }])->pluck('id')->toArray();
//
//
//        // Créer 200 signets en utilisant les IDs de catégories et d'utilisateurs existants
//        Bookmark::factory(400)->create([
//            'bookmark_category_id' => function() use ($categoryIds) {
//                return fake()->randomElement($categoryIds);
//            },
//            'user_id' => function() use ($userIds) {
//                return fake()->randomElement($userIds);
//            }
//        ]);
    }
}
