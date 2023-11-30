<?php

require_once('controller.php');

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

$response = ['success' => false];

switch ($method) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $response['success'] = createItem($data);
        break;

    case 'PUT':
        $id = $_GET['id'];
        $data = json_decode(file_get_contents('php://input'), true);
        $response['success'] = updateItem($id, $data);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $response['success'] = deleteItem($id);
        break;

    case 'GET':
        $response = getItems();
        break;

    default:
        http_response_code(405);
        $response = ['error' => 'Method Not Allowed'];
}

echo json_encode($response);