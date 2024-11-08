//Функция randomTask возвращает Promise с 50% шансом успеха, при ошибке выполнение цепочки промисов останавливается

function randomTask() {
    return new Promise((resolve, reject) => {
        const success = Math.random() < 0.5; 

        if (success) {
            console.log("Победа!");
            resolve();
        } else {
            console.log("Поражение...");
            reject();
        }
    });
}

randomTask()
.then(() => randomTask())
.then(() => randomTask())
.catch(() => {
    console.log("Стрик прерван, остановка");
});