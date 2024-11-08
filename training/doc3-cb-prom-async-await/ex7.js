// Параллельно выполняет три асинхронные функции с помощью Promise.all. 
// Каждая функция завершается через случайную задержку, после чего все результаты выводятся в консоль. 
// Если любой промис завершится с ошибкой, сработает catch. 

function loadData1(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Первый Promise выполнен успешно!");
            resolve("Результат 1")
        }, Math.floor(Math.random() * 2000) + 1000);
    })
};

function loadData2(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Второй Promise выполнен успешно!");
            resolve("Результат 2");
        }, Math.floor(Math.random() * 2000) + 1000);
    })
};

function loadData3(){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Третий Promise выполнен успешно!");
            resolve("Результат 3");
        }, Math.floor(Math.random() * 2000) + 1000);
    })
};

Promise.all([loadData1(), loadData2(), loadData3()])
    .then((values) => {
        console.log("Все промисы завершены:", values);
    })
    .catch((error) => {
        console.log("Ошибка в одном из промисов:", error);
    });