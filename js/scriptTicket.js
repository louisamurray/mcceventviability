function calculate() {
  let ticketsAvailable = parseInt(document.querySelector('#ticketsAvailable').value) || 0;
  let facilitatorCost = parseFloat(document.querySelector('#facilitatorCost').value) || 0;
  let venueCost = parseFloat(document.querySelector('#venueCost').value) || 0;
  let cateringCost = parseFloat(document.querySelector('#cateringCost').value) || 0;
  let eventManagerTime = parseFloat(document.querySelector('#eventManagerTime').value) || 0;
  let miscCost = parseFloat(document.querySelector('#miscCost').value) || 0;
  let sponsorAmount = parseFloat(document.querySelector('#sponsorAmount').value) || 0;
  let profitMargin = parseFloat(document.querySelector('#profitMargin').value) || 0;
  let membershipDiscount = parseFloat(document.querySelector('#membershipDiscount').value) || 0;
  let memberPercentage = parseFloat(document.querySelector('#memberPercentage').value) || 0;

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

  let eventManagerCost = eventManagerTime * 40;
  let totalCost = facilitatorCost + venueCost + marketingCost + cateringCost + eventManagerCost + miscCost;
  let netCost = totalCost - sponsorAmount;

  if (ticketsAvailable === 0) {
    document.querySelector('#result').innerHTML = 'Tickets available must be greater than 0.';
    return;
  }

  if (profitMargin >= 100) {
    document.querySelector('#result').innerHTML = 'Profit margin must be less than 100%.';
    return;
  }

  let totalRevenuePerTicket = netCost / ticketsAvailable / (1 - (profitMargin / 100));
  let nonMemberTicketPrice = totalRevenuePerTicket;
  let memberTicketPrice = nonMemberTicketPrice * (1 - (membershipDiscount / 100));

  let ticketPriceInclGST = nonMemberTicketPrice * 1.15;
  let memberTicketPriceInclGST = memberTicketPrice * 1.15;

  let totalProfit = ticketsAvailable * ((nonMemberTicketPrice * (1 - memberPercentage / 100)) + (memberTicketPrice * (memberPercentage / 100))) - netCost;

  document.querySelector('#result').innerHTML = `
    Non-Member Ticket price (ex GST): $${nonMemberTicketPrice.toFixed(2)}<br>
    Non-Member Ticket price (incl GST): $${ticketPriceInclGST.toFixed(2)}<br>
    Member Ticket price (ex GST): $${memberTicketPrice.toFixed(2)}<br>
    Member Ticket price (incl GST): $${memberTicketPriceInclGST.toFixed(2)}<br>
    Total profit (excl GST): $${totalProfit.toFixed(2)}
  `;
}

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
  const membershipDiscount = document.getElementById('membershipDiscount').value;
  const memberPercentage = document.getElementById('memberPercentage').value;
  const resultString = document.getElementById('result').innerHTML;

  const resultRows = resultString.split('<br>');

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
    ['Membership Discount', membershipDiscount],
    ['Member Percentage', memberPercentage]
  ];

  resultRows.forEach((resultRow) => {
    const [label, value] = resultRow.split(': ');
    data.push([label, value]);
  });

  let csvContent = 'data:text/csv;charset=utf-8,';
  data.forEach((row) => {
    csvContent += row.join(',') + '\r\n';
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'ticket-data.csv');
  link.click();
}

function resetForm() {
  document.querySelector('#ticketsAvailable').value = '';
  document.querySelector('#facilitatorCost').value = '';
  document.querySelector('#venueCost').value = '';
  document.querySelector('#cateringCost').value = '';
  document.querySelector('#miscCost').value = '';
  document.querySelector('#emailCampaign').checked = false;
  document.querySelector('#radioCampaign').checked = false;
  document.querySelector('#socialMediaCampaign').checked = false;
  document.querySelector('#eventManagerTime').value = '';
  document.querySelector('#sponsorAmount').value = '';
  document.querySelector('#profitMargin').value = '';
  document.querySelector('#membershipDiscount').value = '';
  document.querySelector('#memberPercentage').value = '';
  document.querySelector('#result').innerHTML = '';
}