<?php

declare(strict_types=1);

namespace App\Http\Procedures;

use Illuminate\Http\Request;
use App\Http\Requests\CreateFormRequest;
use App\Http\Requests\GetFormRequest;
use Sajya\Server\Procedure;
use App\Action\Form\CreatedFormAction;
use App\Http\Queries\Form\GetFormQuery;
class DataProcedure extends Procedure
{
    /**
     * The name of the procedure that will be
     * displayed and taken into account in the search
     *
     * @var string
     */
    public static string $name = 'data';

    /**
     * Execute the procedure.
     *
     * @param Request $request
     *
     * @return array|string|integer
     */
    public function check(Request $request)
    {
        return $request->all();
    }
    public function createForm(CreateFormRequest $request)
    {
        $form = CreatedFormAction::execute($request->all());
        return $form;
    }

    public function getForm(Request $request){
        $form = GetFormQuery::find($request->all()['id']);
        return $form;
    }

    public function getForms(Request $request){
        
    }

    public function saveDataForm(Request $request){

    }

    public function getDataForm(Request $request){

    }
}
