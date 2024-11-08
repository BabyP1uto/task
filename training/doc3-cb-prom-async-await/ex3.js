// Создаёт функции, которые возвращают Promise, представляя асинхронные задачи, выполняя функции последовательно, используя цепочку Promises

function task1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Task 1 complete');
            resolve(); 
        }, 1000);
    });
}

function task2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Task 2 complete');
            resolve(); 
        }, 1000);
    });
}

function task3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Task 3 complete');
            resolve(); 
        }, 1000);
    });
}

function tasks(){
    task1()
    .then(task2)
    .then(task3)
    .catch((error) => {
        console.log('Error', error);
    })
};

tasks();