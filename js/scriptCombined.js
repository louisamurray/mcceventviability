function calculate() {
    // Get common inputs
    let ticketsAvailable = parseInt(document.querySelector('#ticketsAvailable').value) || 0;
    let facilitatorCost = parseFloat(document.querySelector('#facilitatorCost').value) || 0;
    let venueCost = parseFloat(document.querySelector('#venueCost').value) || 0;
    let cateringCost = parseFloat(document.querySelector('#cateringCost').value) || 0;
    let eventManagerTime = parseFloat(document.querySelector('#eventManagerTime').value) || 0;
    let miscCost = parseFloat(document.querySelector('#miscCost').value) || 0;
    let sponsorAmount = parseFloat(document.querySelector('#sponsorAmount').value) || 0;
    let emailCampaign = document.querySelector('#emailCampaign').checked;
    let radioCampaign = document.querySelector('#radioCampaign').checked;
    let socialMediaCampaign = document.querySelector('#socialMediaCampaign').checked;

    // Calculate marketing cost
    let marketingCost = 0;
    if (radioCampaign) marketingCost += 500;
    if (emailCampaign) marketingCost += 150;
    if (socialMediaCampaign) marketingCost += 100;

    // Calculate event manager cost
    let eventManagerCost = eventManagerTime * 40;  // Assuming a fixed rate of $40/hour

    // Calculate total cost
    let totalCost = facilitatorCost + venueCost + marketingCost + cateringCost + eventManagerCost + miscCost;

    // Calculate net cost after sponsor amount
    let netCost = totalCost - sponsorAmount;

    // Calculate ticket prices and profits
    let profitMargin = parseFloat(document.querySelector('#profitMargin').value) || 0;
    let membershipDiscount = parseFloat(document.querySelector('#membershipDiscount').value) || 0;
    let ticketPrice = (netCost / ticketsAvailable) / (1 - (profitMargin / 100));
    let memberTicketPrice = ticketPrice * (1 - (membershipDiscount / 100));

    // Calculate ticket prices including GST
    let ticketPriceInclGST = ticketPrice * 1.15;
    let memberTicketPriceInclGST = memberTicketPrice * 1.15;

    // Calculate total profit
    let totalProfit = ticketsAvailable * ticketPrice;

    // Calculate total revenue for profit script
    let ticketsPrice = parseFloat(document.querySelector('#ticketsPrice').value) || 0;
    let maxSales = ticketsAvailable * ticketsPrice;
    let totalRevenue = maxSales + sponsorAmount;
    let netProfit = totalRevenue - totalCost;
    let profitMarginCalculated = (netProfit / totalRevenue) * 100;

    // Update the result in the HTML page
    document.querySelector('#result').innerHTML = `
        Non-Member Ticket price (ex GST): $${ticketPrice.toFixed(2)}<br>
        Non-Member Ticket price (incl GST): $${ticketPriceInclGST.toFixed(2)}<br>
        Member Ticket price (ex GST): $${memberTicketPrice.toFixed(2)}<br>
        Member Ticket price (incl GST): $${memberTicketPriceInclGST.toFixed(2)}<br>
        Total profit (excl GST): $${totalProfit.toFixed(2)}<br>
        Total Revenue (ex GST): $${totalRevenue.toFixed(2)}<br>
        Total Cost (ex GST): $${totalCost.toFixed(2)}<br>
        Net Profit (ex GST): $${netProfit.toFixed(2)}<br>
        Profit Margin: ${profitMarginCalculated.toFixed(2)}%
    `;
}

// Add ability to download as .csv
function downloadCSV() {
    const ticketsAvailable = document.getElementById('ticketsAvailable').value;
    const ticketsPrice = document.getElementById('ticketsPrice').value;
    const facilitatorCost = document.getElementById('facilitatorCost').value;
    const venueCost = document.getElementById('venueCost').value;
    const cateringCost = document.getElementById('cateringCost').value;
    const miscCost = document.getElementById('miscCost').value;
    const emailCampaign = document.getElementById('emailCampaign').checked;
    const radioCampaign = document.getElementById('radioCampaign').checked;
    const socialMediaCampaign = document.getElementById('socialMediaCampaign').checked;
    const eventManagerTime = document.getElementById('eventManagerTime').value;
    const sponsorAmount = document.getElementById('sponsorAmount').value;
    const profitMargin = document.getElementById('profitMargin').value;
    const membershipDiscount = document.getElementById('membershipDiscount').value;
    const resultString = document.getElementById('result').innerHTML;

    // Split the result string on the <br> tag
    const resultRows = resultString.split('<br>');

    // Create the data in a format that can be easily converted to a CSV file
    const data = [
        ['Tickets Available', ticketsAvailable],
        ['Ticket Price', ticketsPrice],
        ['Facilitator Cost', facilitatorCost],
        ['Venue Cost', venueCost],
        ['Catering Cost', cateringCost],
        ['Misc Cost', miscCost],
        ['Email Campaign', emailCampaign ? 'Yes' : 'No'],
        ['Radio Campaign', radioCampaign ? 'Yes' : 'No'],
        ['Social Media Campaign', socialMediaCampaign ? 'Yes' : 'No'],
        ['Event Manager Time', eventManagerTime],
        ['Sponsor Amount', sponsorAmount],
        ['Desired Profit Margin', profitMargin],
        ['Membership Discount', membershipDiscount]
    ];

    // Add each result row to the data array
    resultRows.forEach((resultRow) => {
        const [label, value] = resultRow.split(': ');
        data.push([label, value]);
    });

    // Create the CSV string
    let csvContent = 'data:text/csv;charset=utf-8,';
    data.forEach((row) => {
        csvContent += row.join(',') + '\r\n';
    });

    // Encode the CSV string as a URI and create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'event-data.csv');
    link.click();
}