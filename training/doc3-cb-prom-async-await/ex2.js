// Фильтрует массив, оставляя только чётные числа, а затем передаёт результат в callback с небольшой задержкой

function filterArray(arr, callback) { 
    if (!Array.isArray(arr)) {
        callback(null, "Ошибка: входные данные не являются массивом.");
        return;
    }

    setTimeout(() => {
        callback(arr.filter(number => number % 2 === 0), "Оставил только четные числа массива!");
    }, 1000); 
} 

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
filterArray(numbers, (result, message) => {
    if (result === null) {
        console.error(message);
    } else {
        console.log(message);   
        console.log(result);    
    }
});
