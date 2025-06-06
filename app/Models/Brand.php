<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brand extends Model
{
        public function eqmodels(): HasMany
    {
        return $this->hasMany(EQModel::class);
    }

}
