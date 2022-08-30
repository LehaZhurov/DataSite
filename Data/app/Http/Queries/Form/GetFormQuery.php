<?php
namespace App\Http\Queries\Form;
use App\Models\Form;
class GetFormQuery{
        
    public static function find($id) : Form
    {
        $form = Form::select('name as formName','formmap as items','id as form_uid')->find($id);
        return $form;
    }    
        
}