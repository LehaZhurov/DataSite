<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @package App/Models/Group
 * @property int $form_uid - уникальный id формы
 * @property string $name - название формы
 * @property-read array $formmap - JSON объект с данными по которым можно построить форму
 * @property Carbon $created_at - дата создания 
 * @property Carbon $updated_at - дата создания
 * 
 */

class Form extends Model
{
    use HasFactory;
}
