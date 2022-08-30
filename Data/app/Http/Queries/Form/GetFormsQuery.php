<?php
namespace App\Http\Queries\Form;
use App\Models\Form;
use Illuminate\Database\Eloquent\Collection;

class GetFormsQuery{
        
    public static function find() : Collection
    {
        $forms = Form::query()->select('name','id')->get();
        return $forms;
    }    
        
}