<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * @mixin IdeHelperBookmarkCategory
 */
class BookmarkCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id'
    ];

    // Ajoutez un écouteur pour l'événement "creating" et "updating"
    public static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {
            $model->slug = Str::slug($model->name);
        });

        static::updating(function ($model) {
            $model->slug = Str::slug($model->name);
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(Bookmark::class, 'bookmark_category_id', 'id');
    }

    public function scopeForUser($query, $user)
    {
        return $query->where('user_id', $user->id);
    }
}
