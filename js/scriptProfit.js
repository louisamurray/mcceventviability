function calculate() {
    let ticketsAvailable = parseInt(document.querySelector('#ticketsAvailable').value);
    let ticketsPrice = parseInt(document.querySelector('#ticketsPrice').value);
    let facilitatorCost = parseInt(document.querySelector('#facilitatorCost').value);
    let venueCost = parseInt(document.querySelector('#venueCost').value);
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
    let cateringCost = parseInt(document.querySelector('#cateringCost').value);
    let eventManagerTime = parseInt(document.querySelector('#eventManagerTime').value);
    let eventManagerCost = eventManagerTime * 35;
    let miscCost = parseInt(document.querySelector('#miscCost').value);
    let sponsorAmount = parseInt(document.querySelector('#sponsorAmount').value);
    
    let totalCost = facilitatorCost + venueCost + marketingCost + cateringCost + eventManagerCost + miscCost;
    let maxSales = ticketsAvailable * ticketsPrice;
    let totalRevenue = maxSales + sponsorAmount;
    let netProfit = totalRevenue - totalCost;
    let profitMargin = (netProfit / totalRevenue) * 100;
    

    
    document.querySelector('#totalRevenue').innerHTML = "$" + totalRevenue.toFixed(2);
    document.querySelector('#totalCost').innerHTML = "$" + totalCost.toFixed(2);
    document.querySelector('#netProfit').innerHTML = "$" + netProfit.toFixed(2);
    document.querySelector('#profitMargin').innerHTML = profitMargin.toFixed(2) + "%";
}
