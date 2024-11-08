//Функция fetchData возвращает Promise, который имитирует асинхронное получение данных с задержкой 2 секунды
//после чего разрешается с примером данных { data: "Sample Data" }

async function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = { data: "Sample Data" };
            resolve(data); 
        }, 2000);
    });
}

//Функция getData использует await для вызова fetchData 
//При успешном выполнении она выводит результат в консоль, а в случае ошибки выводит сообщение об ошибке
async function getData(url) {
    try {
        const result = await fetchData(url);
        console.log(result); 
    } 
    catch (error) {
        console.log("Ошибка передачи данных", error);
    }
}

getData("https://qwerty.com");
