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
        return json_encode($api->getForm($id));
    }

    public function getForms()
    {
        $api = new Api();
        return json_encode($api->getForms());
    }
}
