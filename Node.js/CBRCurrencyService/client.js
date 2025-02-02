const soap = require('soap');
const url = 'https://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx?WSDL';

function getValutes() {
  soap.createClient(url, function(err, client) {
    if (err) {
      console.error(err);
      return;
    }

    client.EnumValutesXML({ Seld: false }, function(err, result) {
      if (err) {
        console.error(err);
      } else {
        const valutes = result.EnumValutesXMLResult.ValuteData.EnumValutes.map(valute => ({
          code: valute.Vcode,
          name: valute.Vname,
          value: valute.VunitRate
        }));

        console.log('Список валют: ', JSON.stringify(valutes, null, 2));
      }
    });
  });
}

function getValuteDynamic(code, fromDate, toDate) {
  soap.createClient(url, function(err, client) {
    if (err) {
      console.error(err);
      return;
    }

    client.GetCursDynamicXML({
      FromDate: fromDate,
      ToDate: toDate,
      ValutaCode: code
    }, function(err, result) {
      if (err) {
        console.error(err);
      } else {
        const dynamics = result.GetCursDynamicXMLResult.ValuteData.ValuteCursDynamic.map(rate => ({
          date: rate.CursDate,
          value: rate.Vcurs
        }));

        console.log(`Динамика курса для ${code}: `, JSON.stringify(dynamics, null, 2));
      }
    });
  });
}

getValutes();
getValuteDynamic('R01010', '2023-03-01', '2023-03-15');
