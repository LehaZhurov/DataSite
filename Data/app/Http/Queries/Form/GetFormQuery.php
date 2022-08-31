<?php

namespace App\Http\Queries\Form;

use App\Models\Form;

class GetFormQuery
{
    //Query позволяет получить форму по его id
    public static function find($id): Form
    {
        $form = Form::query()->select('name as formName', 'formmap as items', 'id as form_uid')->findOrFail($id);
        return $form;
    }
}
