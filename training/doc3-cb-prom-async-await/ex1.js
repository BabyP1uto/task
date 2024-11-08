// Умножает каждый элемент массива на 2 и передает результат в callback-функцию

function processArray(arr, callback) { 
    if (!Array.isArray(arr)) {
        callback(null, "Ошибка: входные данные не являются массивом.");
        return;
    }

    setTimeout(() => {
        callback(arr.map(number => number * 2), "Умножил каждый элемент массива на 2!");
    }, 1000);
}

const numbers = [1, 2, 3, 4, 5, 6];
processArray(numbers, (result, message) => {
    console.log(message);  
    console.log(result);   
});
