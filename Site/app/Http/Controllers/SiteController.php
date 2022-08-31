<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data\Api;

class SiteController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function getForm(int $id)
    {
        $api = new Api();
        return response()->json($api->getForm($id),200);
    }

    public function getForms()
    {
        $api = new Api();
        return response()->json($api->getForms(),200);
    }

    public function saveData(Request $request){
        $api = new Api();
        $result = $api->saveData($request->all());
        return response()->json($result, 200);
    }

    public function dataFormPage(){
        return view('formdata');
    }

    public function getFormData($id){
        $api = new Api();
        $result = $api->getData($id);
        return response()->json($result, 200);
    }
}
