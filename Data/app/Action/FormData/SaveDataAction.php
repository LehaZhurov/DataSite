<?php
namespace App\Action\FormData;
use App\Action\FormData\PreparingFormDataAction;
use App\Models\FormData;
class SaveDataAction{
        
    public static function execute(array $data) 
    {
        $formId = $data['form_uid'];
        array_shift($data);
        $prepareData = PreparingFormDataAction::execute($formId,$data);
        $form = new FormData();
        $form->form_id = $formId;
        $form->data = json_encode($prepareData);
        $form->save();
        return $form;
    }    
        
}