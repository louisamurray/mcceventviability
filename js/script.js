const Papa = require('papa parse');

function calculate() {
  let ticketsAvailable = parseInt(document.querySelector('#ticketsAvailable').value);
  let facilitatorCost = parseFloat(document.querySelector('#facilitatorCost').value);
  let venueCost = parseFloat(document.querySelector('#venueCost').value);
  let marketingCost = 0;
  if (document.querySelector('#radioCampaign').checked) {
    marketingCost += 500;
  }
  if (document.querySelector('#emailCampaign').checked) {
    marketingCost += 150;
  }
  if (document.querySelector('#socialMediaCampaign').checked) {
    marketingCost += 100;
  }
  let cateringCost = parseFloat(document.querySelector('#cateringCost').value);
  let eventManagerTime = parseFloat(document.querySelector('#eventManagerTime').value);
  let eventManagerCost = eventManagerTime * 30;
  let miscCost = parseFloat(document.querySelector('#miscCost').value);
  let profitMargin = parseFloat(document.querySelector('#profitMargin').value);

  let totalCost = facilitatorCost + venueCost + marketingCost + cateringCost + eventManagerCost + miscCost;
  let ticketPrice = (totalCost / ticketsAvailable) / (1 - (profitMargin / 100));
  let ticketPriceInclGST = ticketPrice * 1.15;

  document.querySelector('#result').innerHTML = `Ticket price (ex GST): $${ticketPrice.toFixed(2)}<br>Ticket price (incl GST): $${ticketPriceInclGST.toFixed(2)}`;
}

document.querySelector('#export-csv').addEventListener('click', function() {
  let data = [
    {
      "Cost Item": "Facilitator Cost",
      "Amount": facilitatorCost
    },
    {
      "Cost Item": "Venue Cost",
      "Amount": venueCost
    },
    {
      "Cost Item": "Marketing Cost",
      "Amount": marketingCost
    },
    {
      "Cost Item": "Catering Cost",
      "Amount": cateringCost
    },
    {
      "Cost Item": "Event Manager Cost",
      "Amount": eventManagerCost
    },
    {
      "Cost Item": "Misc Cost",
      "Amount": miscCost
    }
  ];

  let csv = Papa.unparse(data);

  let downloadLink = document.createElement("a");
  downloadLink.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
  downloadLink.download = "costs.csv";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
});
