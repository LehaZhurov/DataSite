<?php

namespace App\Data;

use Exception;

class Api
{
    /**
     * Здесь указана такой хост потому как это все в одной докер сети , при выносе каждого
     * сервиса на разыне хосты нужно сменить домен
     */
    const HOST = 'http://data:80/api/v1/form';



    protected function request(string $method, array $params = [], int $id = 1):array 
    {
        $body = ["jsonrpc" => "2.0", 'method' => $method, 'params' => $params, 'id' => $id];
        $body = json_encode($body);
        $context = stream_context_create(
            array(
                'http' => array(
                    'method' => 'POST',
                    'header' => 'Content-Type: application/json',
                    'content' => $body,
                ),
            )
        );

        $result = file_get_contents($this::HOST, false, $context);
        $result = json_decode($result, true);
        if (array_key_exists('error', $result)) {
            return $result;
        }
        return $result['result'];
    }

    public function getForm(int $id):array
    {
        $result = $this->request('data@getForm', ['id' => $id]);
        return $result;
    }

    public function getForms():array
    {
        $result = $this->request('data@getForms');
        return $result;
    }

    public function saveData($data):array
    {
        $result = $this->request('data@saveDataForm', $data);
        return $result;
    }

    public function getData(int $id):array
    {
        $result = $this->request('data@getDataForm',['id' => $id]);
        return $result;
    }
}
