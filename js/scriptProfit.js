function calculate() {
    let ticketsAvailable = parseInt(document.querySelector('#ticketsAvailable').value) || 0;
    let ticketsPrice = parseInt(document.querySelector('#ticketsPrice').value) || 0;
    let facilitatorCost = parseInt(document.querySelector('#facilitatorCost').value) || 0;
    let venueCost = parseInt(document.querySelector('#venueCost').value) || 0;
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
    let cateringCost = parseInt(document.querySelector('#cateringCost').value) || 0;
    let eventManagerTime = parseInt(document.querySelector('#eventManagerTime').value) || 0;
    let eventManagerCost = eventManagerTime * 35;
    let miscCost = parseInt(document.querySelector('#miscCost').value) || 0;
    let sponsorAmount = parseInt(document.querySelector('#sponsorAmount').value) || 0;
    
    let totalCost = facilitatorCost + venueCost + marketingCost + cateringCost + eventManagerCost + miscCost;
    let maxSales = ticketsAvailable * ticketsPrice;
    let totalRevenue = maxSales + sponsorAmount;
    let netProfit = totalRevenue - totalCost;
    let profitMargin = (netProfit / totalRevenue) * 100;

    document.querySelector('#result').innerHTML = `Total Revenue (ex GST): $${totalRevenue.toFixed(2)}<br>Total Cost (ex GST): $${totalCost.toFixed(2)}<br>Net Profit (ex GST): $${netProfit.toFixed(2)}<br>Profit Margin: ${profitMargin.toFixed(2)}%`;
}
