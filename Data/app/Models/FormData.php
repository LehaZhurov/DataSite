<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\FormData
 *
 * @property int $id
 * @property int $form_id
 * @property mixed $data
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|FormData newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FormData newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FormData query()
 * @method static \Illuminate\Database\Eloquent\Builder|FormData whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormData whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormData whereFormId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormData whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FormData whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class FormData extends Model
{
    use HasFactory;
}
