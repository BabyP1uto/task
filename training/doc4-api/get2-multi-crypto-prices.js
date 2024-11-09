const maxAttempts = 3;

async function getCryptoPrice(cryptoName, currency, attempts = 0) {
  const params = new URLSearchParams({
    ids: cryptoName,
    vs_currencies: currency
  });

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?${params.toString()}&include_last_updated_at=true`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Криптовалюта не найдена. Проверьте правильность ввода.');
      } else if (response.status === 500) {
        throw new Error('Внутренняя ошибка сервера. Повторите попытку позже.');
      } else {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
    }

    const data = await response.json();

    if (!data[cryptoName] || !data[cryptoName][currency]) {
      throw new Error('Пара не найдена. Проверьте ввод!');
    }

    const cryptoPrice = data[cryptoName][currency];

    console.log(`Цена ${cryptoName}: ${cryptoPrice} ${currency}`);
  } catch (error) {
    if (attempts < maxAttempts - 1) {
      const nextAttemptIn = Math.floor(Math.random() * 1000) + 1000;
      console.log(`Попытка ${attempts + 1} не удалась: ${error.message}. Повторная попытка через ${nextAttemptIn / 1000} секунд...`);

      await new Promise(resolve => setTimeout(resolve, nextAttemptIn));
      await getCryptoPrice(cryptoName, currency, attempts + 1);
    } else {
      console.log(`Не удалось получить данные после ${maxAttempts} попыток. Ошибка: ${error.message}`);
    }
  }
}

async function getMultipleCryptoPrices(cryptoNames, currencies) {
  try {
    for (let i = 0; i < cryptoNames.length; i++) {
      const name = cryptoNames[i];
      const currency = currencies[i] || 'usd';

      const requestTime = new Date().toLocaleString();
      console.log(`Запрос к паре ${name}/${currency}... Время запроса: ${requestTime}`);

      await getCryptoPrice(name, currency);

      if (i < cryptoNames.length - 1) {
        const nextDelay = Math.floor(Math.random() * 1000) + 1000;
        console.log(`Задержка перед следующим запросом: ${nextDelay / 1000} секунд...`);
        await new Promise(resolve => setTimeout(resolve, nextDelay));
      }
    }
  } catch (error) {
    console.error('Ошибка при получении цен:', error);
  }
}

getMultipleCryptoPrices(['bitcoin', 'ethereum', 'solana'], ['usd', 'eur', 'rub'])
  .then(() => {
    console.log('Получены данные для всех криптовалют.');
  });
