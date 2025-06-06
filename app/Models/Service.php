<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
        public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }
}
