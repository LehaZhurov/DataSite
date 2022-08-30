<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Form
 *
 * @package App/Models/Group
 * @property int $form_uid - уникальный id формы
 * @property string $name - название формы
 * @property-read array $formmap - JSON объект с данными по которым можно построить форму
 * @property Carbon $created_at - дата создания
 * @property Carbon $updated_at - дата создания
 * @property int $id
 * @method static \Illuminate\Database\Eloquent\Builder|Form newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Form newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Form query()
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereFormmap($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Form whereUpdatedAt($value)
 * @mixin \Eloquent
 */

class Form extends Model
{
    use HasFactory;
}
