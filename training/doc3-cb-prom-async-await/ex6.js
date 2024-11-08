// Код реализует асинхронную функцию, 
// которая случайным образом получает данные или генерирует ошибку,
// демонстрируя обработку асинхронных операций с помощью async/await. 
// В случае успешного выполнения выводится сообщение о получении данных,
// а в случае ошибки — сообщение об ошибке

async function fetchDataWithError() {
    return new Promise((resolve, reject) => {
        const success = Math.random() < 0.5;

        if (success) {
            resolve("Данные успешно получены!");
        } else {
            reject(new Error("Передача данных оборвалась..."));
        }
    });
}

async function rework() {
    try {
        const result = await fetchDataWithError();
        console.log(result);
    } catch (error) {  
        console.log("Ошибка", error.message);
    }
}

rework();
