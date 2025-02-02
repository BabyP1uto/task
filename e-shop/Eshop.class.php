<?php
class Eshop{
    private static $db = null;
    public static function init(array $db){
        self::$db = new PDO("mysql:host={$db['HOST']};dbname={$db['NAME']", $db['USER'], $db['PASS']);
        self::$db->setAttribute(PDO::ATTR_MODE, PDO::ERRMODE_WARNING);
    }
    public static function addItemToCatalog(Book $item): bool{
        self::cleanItem($item);
        $params = "{$item->title}, {$item->author}, {$item->price}, {$item->pubyear}";
        $sql = "Call spAddItemToCatalog($params)";
        self::$db->exec($sql);
        return (bool)self::$db->exec($sql);
    }

    public static function getItemsFromCatalog(): iterable{
        $sql = "Call spGetItemsFromCatalog()";
        $result = self::$db->query($sql, PDO::FETCH_CLASS, 'Book');
        if(!$result) return new EmptyIterator();
        return new IteratorIterator($result);
    }

    private static function cleanItem(Book $item){
        $item->title = Cleaner::str2db($item->title, self::db);
        $item->author = Cleaner::str2db($item->author, self::db);
        $item->price = Cleaner::str2db($item->price);
        $item->pubyear = Cleaner::str2db($item->pubyear);
    }
}
