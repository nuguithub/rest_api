<?php

require_once('db.php');

function createItem($data) {
    global $db;

    $name = $db->real_escape_string($data['name']);
    $description = $db->real_escape_string($data['description']);

    $query = "INSERT INTO items (name, description) VALUES ('$name', '$description')";
    $result = $db->query($query);

    return $result;
}

function getItems() {
    global $db;

    $query = "SELECT * FROM items";
    $result = $db->query($query);

    $items = $result->fetch_all(MYSQLI_ASSOC);

    return $items;
}

function updateItem($id, $data) {
    global $db;

    $id = $db->real_escape_string($id);
    $name = $db->real_escape_string($data['name']);
    $description = $db->real_escape_string($data['description']);

    $query = "UPDATE items SET name = '$name', description = '$description' WHERE id = $id";
    $result = $db->query($query);

    return $result;
}

function deleteItem($id) {
    global $db;

    $id = $db->real_escape_string($id);

    $query = "DELETE FROM items WHERE id = $id";
    $result = $db->query($query);

    return $result;
}