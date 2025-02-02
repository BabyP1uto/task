const express = require('express');
const soap = require('soap');
const app = express();
const url = 'https://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL';

// Эндпоинт для получения всех валют
app.get('/getValutes', (req, res) => {
  soap.createClient(url, function(err, client) {
    if (err) {
      return res.status(500).send('Ошибка при подключении к сервису');
    }

    client.EnumValutesXML({ Seld: false }, function(err, result) {
      if (err) {
        return res.status(500).send('Ошибка при получении данных');
      } else {
        const valutes = result.EnumValutesXMLResult.ValuteData.EnumValutes.map(valute => ({
          code: valute.Vcode,
          name: valute.Vname,
          value: valute.VunitRate
        }));

        res.json(valutes);
      }
    });
  });
});

// Эндпоинт для получения динамики курса валют
app.get('/getValuteDynamic', (req, res) => {
  const { code, fromDate, toDate } = req.query;

  soap.createClient(url, function(err, client) {
    if (err) {
      return res.status(500).send('Ошибка при подключении к сервису');
    }

    client.GetCursDynamicXML({ FromDate: fromDate, ToDate: toDate, ValutaCode: code }, function(err, result) {
      if (err) {
        return res.status(500).send('Ошибка при получении данных');
      } else {
        const dynamics = result.GetCursDynamicXMLResult.ValuteData.ValuteCursDynamic.map(rate => ({
          date: rate.CursDate,
          value: rate.Vcurs
        }));

        res.json(dynamics);
      }
    });
  });
});

app.listen(3000, () => {
  console.log('SOAP-прокси-сервер запущен на порту 3000');
});
