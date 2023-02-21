function calculate() {
    // Get the number of tickets available and the ticket price, and convert them to numbers
    let ticketsAvailable = parseInt(document.querySelector('#ticketsAvailable').value) || 0;
    let ticketsPrice = parseInt(document.querySelector('#ticketsPrice').value) || 0;
  
    // Get the facilitator cost, venue cost, catering cost, event manager time, and miscellaneous cost, and convert them to numbers
    let facilitatorCost = parseInt(document.querySelector('#facilitatorCost').value) || 0;
    let venueCost = parseInt(document.querySelector('#venueCost').value) || 0;
    let cateringCost = parseInt(document.querySelector('#cateringCost').value) || 0;
    let eventManagerTime = parseInt(document.querySelector('#eventManagerTime').value) || 0;
    let miscCost = parseInt(document.querySelector('#miscCost').value) || 0;
    let sponsorAmount = parseInt(document.querySelector('#sponsorAmount').value) || 0;
  
    // Calculate the total marketing cost
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
  
    // Calculate the event manager cost
    let eventManagerCost = eventManagerTime * 35;
  
    // Calculate the total cost
    let totalCost = facilitatorCost + venueCost + marketingCost + cateringCost + eventManagerCost + miscCost;
  
    // Calculate the maximum sales
    let maxSales = ticketsAvailable * ticketsPrice;
  
    // Calculate the total revenue
    let totalRevenue = maxSales + sponsorAmount;
  
    // Calculate the net profit
    let netProfit = totalRevenue - totalCost;
  
    // Calculate the profit margin
    let profitMargin = (netProfit / totalRevenue) * 100;
  
    // Update the result in the HTML page
    document.querySelector('#result').innerHTML = `Total Revenue (ex GST): $${totalRevenue.toFixed(2)}<br>Total Cost (ex GST): $${totalCost.toFixed(2)}<br>Net Profit (ex GST): $${netProfit.toFixed(2)}<br>Profit Margin: ${profitMargin.toFixed(2)}%`;
  }
  

// Add ability to download as .csv
function downloadCSV() {
    const ticketsAvailable = document.getElementById('ticketsAvailable').value;
    const ticketsPrice = document.getElementById('ticketsPrice').value;
    const facilitatorCost = document.getElementById('facilitatorCost').value;
    const venueCost = document.getElementById('venueCost').value;
    const emailCampaign = document.getElementById('emailCampaign').checked;
    const radioCampaign = document.getElementById('radioCampaign').checked;
    const socialMediaCampaign = document.getElementById('socialMediaCampaign').checked;
    const cateringCost = document.getElementById('cateringCost').value;
    const eventManagerTime = document.getElementById('eventManagerTime').value;
    const miscCost = document.getElementById('miscCost').value;
    const sponsorAmount = document.getElementById('sponsorAmount').value;
    const resultString = document.getElementById('result').innerHTML;

   // Split the result string on the <br> tag
   const resultRows = resultString.split('<br>');   
  
    // Create the data in a format that can be easily converted to a CSV file
    const data = [
      ['Tickets Available', ticketsAvailable],
      ['Ticket Price', ticketsPrice],
      ['Facilitator Cost', facilitatorCost],
      ['Venue Cost', venueCost],
      ['Email Campaign', emailCampaign ? 'Yes' : 'No'],
      ['Radio Campaign', radioCampaign ? 'Yes' : 'No'],
      ['Social Media Campaign', socialMediaCampaign ? 'Yes' : 'No'],
      ['Catering Cost', cateringCost],
      ['Event Manager Time', eventManagerTime],
      ['Misc Cost', miscCost],
      ['Sponsor Amount', sponsorAmount],
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
    link.setAttribute('download', 'profit-data.csv');
    link.click();
  }
  