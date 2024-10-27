const zmq = require('zeromq');
const sock = new zmq.Request();

const [minRange, maxRange] = process.argv.slice(2).map(Number); 
const secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange; 

(async function() {
    await sock.connect("tcp://127.0.0.1:3000");
    console.log("Загадано число:", secretNumber);

    await sock.send(JSON.stringify({ range: `${minRange}-${maxRange}` }));

    while (true) {
        const [response] = await sock.receive();
        const serverResponse = JSON.parse(response.toString());
        console.log("Ответ от сервера:", serverResponse);

        if (serverResponse.answer === secretNumber) {
            await sock.send(JSON.stringify({ hint: 'equal' }));
            break; 
        } else if (serverResponse.answer < secretNumber) {
            await sock.send(JSON.stringify({ hint: 'more' }));
        } else {
            await sock.send(JSON.stringify({ hint: 'less' }));
        }
    }

    console.log("Сервер угадал число:", secretNumber);
})();
