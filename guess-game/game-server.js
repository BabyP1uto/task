const zmq = require('zeromq');
const sock = new zmq.Reply();

(async function() {
    await sock.bind("tcp://127.0.0.1:3000");
    console.log("Готов к игре...");

    let min, max, secretNumber;

    while (true) {
        const [msg] = await sock.receive();
        const clientMessage = JSON.parse(msg.toString());
        console.log("Диапазон от клиента:", clientMessage.range);
        [min, max] = clientMessage.range.split('-').map(Number);
        
        secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log("Загаданное число:", secretNumber);

        while (true) {
            const guess = Math.floor((min + max) / 2);
            console.log(`Пробую: ${guess}`);
            await sock.send(JSON.stringify({ answer: guess }));

            const [response] = await sock.receive();
            const clientResponse = JSON.parse(response.toString());
            console.log("Подсказка от клиента:", clientResponse);

            if (clientResponse.hint === 'more') {
                min = guess + 1;
            } else if (clientResponse.hint === 'less') {
                max = guess - 1;
            } else {
                console.log('Ответ верный! Загаданное число:', secretNumber);
                break;  
            }
        }
    }
})();
