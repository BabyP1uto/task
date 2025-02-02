async function avgWeather(city, apiKey, n) {
    const params = new URLSearchParams({
        q: city,
        appid: apiKey,
        units: "metric"
    });

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params.toString()}`);
        if (!response.ok) {
            switch (response.status) {
                case 400:
                    throw new Error("Неправильный запрос. Проверьте параметры.");
                case 401:
                    throw new Error("Неверный API-ключ");
                case 404:
                    throw new Error("Ресурс не найден. Проверьте правильность запроса.");
                case 429:
                    throw new Error("Слишком много запросов. Подождите и попробуйте снова.");
                case 500:
                    throw new Error("Ошибка на сервере. Попробуйте позже.");
                case 503:
                    throw new Error("Сервер временно недоступен. Повторите попытку через некоторое время.");
                default:
                    throw new Error(`Неизвестная ошибка: ${response.status}`);
            }
        }

        const data = await response.json();

        if (!data.coord) {
            throw new Error("Город не найден");
        }

        const { lat, lon } = data.coord;

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        
        if (!forecastResponse.ok) {
            throw new Error(`Ошибка при получении прогноза погоды: ${forecastResponse.status}`);
        }

        const forecastData = await forecastResponse.json();

        if (!forecastData.daily || forecastData.daily.length === 0) {
            throw new Error("Не удалось получить прогноз погоды");
        }

        const days = forecastData.daily.slice(0, n);

        const totalTemp = days.reduce((sum, day) => sum + day.temp.day, 0);
        const avgTemp = totalTemp / days.length;

        return avgTemp;

    } catch (error) {
        console.error("Ошибка:", error.message);
    }
}

const city = "Moscow";
const apiKey = "secret";
const n = 5; 

avgWeather(city, apiKey, n)
    .then(avgTemp => console.log(`Средняя температура за следующие ${n} дней: ${avgTemp}°C`))
    .catch(error => console.error(error.message));
