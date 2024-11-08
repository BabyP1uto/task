// Последовательно загружает данные о категории товаров и соответствующий список товаров с имитацией задержки, 
// используя async/await для упорядоченной обработки данных перед их выводом в консоль.

async function fetchCategoryInfo() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return { name: "Электроника", description: "Все о современной электронике", image: "electronics.jpg" };
}

async function fetchProducts() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return [
        { id: 1, name: "Смартфон", price: 50000 },
        { id: 2, name: "Ноутбук", price: 100000 },
    ];
}

async function getCategoryAndProducts(){
    const category = await fetchCategoryInfo();
    console.log("Информация о категории:", category);

    const items = await fetchProducts();
    console.log("Список товаров в категории:", items);
};

getCategoryAndProducts();
