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
  let ticketPrice = (totalCost / ticketsAvailable) / (1 - (profitMargin / 100)).toFixed(2);
  let ticketPriceInclGST = (ticketPrice * 1.15).toFixed(2);

  document.querySelector('#result').innerHTML = `Ticket price (ex GST): $${ticketPrice}<br>Ticket price (incl GST): $${ticketPriceInclGST}`;
}
