function calculate() {
  let ticketsAvailable = parseInt(document.querySelector('#ticketsAvailable').value) || 0;
  let facilitatorCost = parseFloat(document.querySelector('#facilitatorCost').value) || 0;
  let venueCost = parseFloat(document.querySelector('#venueCost').value) || 0;
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
  let cateringCost = parseFloat(document.querySelector('#cateringCost').value) || 0;
  let eventManagerTime = parseFloat(document.querySelector('#eventManagerTime').value) || 0;
  let eventManagerCost = eventManagerTime * 35;
  let miscCost = parseFloat(document.querySelector('#miscCost').value) || 0;
  let sponsorAmount = parseFloat(document.querySelector('#sponsorAmount').value) || 0;
  let profitMargin = parseFloat(document.querySelector('#profitMargin').value) || 0;

  let totalCost = facilitatorCost + venueCost + marketingCost + cateringCost + eventManagerCost + miscCost;
  let netCost = totalCost - sponsorAmount;
  let ticketPrice = (netCost / ticketsAvailable) / (1 - (profitMargin / 100));
  let ticketPriceInclGST = ticketPrice * 1.15;
  let totalProfit = ticketsAvailable * ticketPrice

  document.querySelector('#result').innerHTML = `Ticket price (ex GST): $${ticketPrice.toFixed(2)}<br>Ticket price (incl GST): $${ticketPriceInclGST.toFixed(2)}<br>Total profit (excl GST): $${totalProfit.toFixed(2)}`;
}
