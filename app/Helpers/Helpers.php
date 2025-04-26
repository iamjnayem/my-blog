<?php


if(!function_exists('getResponse')) {
    function getResponse($code, $data=[], $errors=[], $title="", $message="")
    {
        $statusCode = \App\Models\StatusCode::where('code', $code)->first();

        return [
            'code' => isset($statusCode->code) ? $statusCode->code : $code,
            'title' => isset($statusCode->title) ? $statusCode->title : $title,
            'message' => isset($statusCode->message) ? $statusCode->message : $message,
            'errors' => $errors,
            'data' => $data,
        ];
    }

}
