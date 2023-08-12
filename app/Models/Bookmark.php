<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperBookmark
 */
class Bookmark extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'url',
        'icon',
        'bookmark_category_id',
        'user_id'
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::saving(function ($category) {
            if (filter_var($category->url, FILTER_VALIDATE_URL)) {
                $faviconURL = 'https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=' . $category->url . '&size=256';
                $category->icon = $faviconURL;
            }
        });
    }

    public function bookmarkCategory(): BelongsTo
    {
        return $this->belongsTo(BookmarkCategory::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
