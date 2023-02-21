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


// Add ability to download as .csv

function downloadCSV() {
  const ticketsAvailable = document.getElementById('ticketsAvailable').value;
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
  const resultString = document.getElementById('result').innerHTML;

  // Split the result string on the <br> tag
  const resultRows = resultString.split('<br>');

  // Create the data in a format that can be easily converted to a CSV file
  const data = [
    ['Tickets Available', ticketsAvailable],
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
  link.setAttribute('download', 'ticket-data.csv');
  link.click();
}