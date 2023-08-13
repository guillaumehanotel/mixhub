<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DomainOrUrl implements ValidationRule
{

    public function message(): string
    {
        return 'The :attribute must be a valid domain or URL.';
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (filter_var($value, FILTER_VALIDATE_URL)) {
            return;
        }

        // Check if it's a valid domain (simplified)
        if (preg_match('/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i', $value)) {
            return;
        }

        $fail($this->message());
    }
}
