<?php
$book = new Book($_POST);
$result = Eshop::addItemToCatalog($book);
if($result){
    echo CATALOG_ITEM_ADD_OK;
    header('Refresh: 3, url=add_item_to_catalog');
} else{
    echo CATALOG_ITEM_ADD_ERROR;
    exit;
}