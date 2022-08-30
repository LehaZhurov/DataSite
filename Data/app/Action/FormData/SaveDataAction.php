<?php
namespace App\Action\FormData;
use App\Models\FormData;
class SaveDataAction{
        
    public static function execute(int $formId,array $data) : FormData
    {
        $form = new FormData();
        $form->form_id = $formId;
        $form->data = json_encode($data);
        $form->save();
        return $form;
    }    
        
}