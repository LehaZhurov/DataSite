<?php

namespace App\Action\Form;

use App\Models\Form;

class CreatedFormAction
{
    //Action создает новую форму 
    public static function execute(array $data): Form
    {
        $form = new Form();
        $form->name = $data['formName'];
        $form->formmap = json_encode($data['items']);
        $form->save();
        return $form;
    }
}
