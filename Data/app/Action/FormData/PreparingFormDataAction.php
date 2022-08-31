<?php
namespace App\Action\FormData;
use App\Models\FormData;
use App\Models\Form;
class PreparingFormDataAction{
        
    public static function execute(int $formId,array $formData)
    {
        $form = Form::findOrFail($formId);
        $formItems = json_decode($form->formmap);
        $prepareData = [];
        foreach($formItems as $item){
            $prepareData[] = [$item->placeholder => $formData[$item->name]];
        }
        return $prepareData;
    }    
        
}