<?php
namespace App\Http\Queries\Form;
use App\Models\Form;
class GetFormDataQuery{
        
    public static function find($formId) 
    {
        $form = Form::query()->with('data')->findOrFail($formId);
        return $form;
    }    
        
}