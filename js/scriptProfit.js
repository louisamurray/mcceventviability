function calculate() {
  let ticketsAvailable = parseInt(document.querySelector('#ticketsAvailable').value) || 0;
  let nonMemberTicketPrice = parseInt(document.querySelector('#nonMemberTicketPrice').value) || 0;
  let memberTicketPrice = parseInt(document.querySelector('#memberTicketPrice').value) || 0;
  let memberPercentage = parseFloat(document.querySelector('#memberPercentage').value) || 0;

  let facilitatorCost = parseInt(document.querySelector('#facilitatorCost').value) || 0;
  let venueCost = parseInt(document.querySelector('#venueCost').value) || 0;
  let cateringCost = parseInt(document.querySelector('#cateringCost').value) || 0;
  let eventManagerTime = parseInt(document.querySelector('#eventManagerTime').value) || 0;
  let miscCost = parseInt(document.querySelector('#miscCost').value) || 0;
  let sponsorAmount = parseInt(document.querySelector('#sponsorAmount').value) || 0;

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

  let eventManagerCost = eventManagerTime * 35;
  let totalCost = facilitatorCost + venueCost + marketingCost + cateringCost + eventManagerCost + miscCost;

  let nonMemberRevenue = (ticketsAvailable * (1 - memberPercentage / 100)) * nonMemberTicketPrice;
  let memberRevenue = (ticketsAvailable * (memberPercentage / 100)) * memberTicketPrice;
  let totalRevenue = nonMemberRevenue + memberRevenue + sponsorAmount;

  let netProfit = totalRevenue - totalCost;
  let profitMargin = (netProfit / totalRevenue) * 100;

  document.querySelector('#result').innerHTML = `
    Total Revenue (ex GST): $${totalRevenue.toFixed(2)}<br>
    Total Cost (ex GST): $${totalCost.toFixed(2)}<br>
    Net Profit (ex GST): $${netProfit.toFixed(2)}<br>
    Profit Margin: ${profitMargin.toFixed(2)}%
  `;
}

function downloadCSV() {
  const ticketsAvailable = document.getElementById('ticketsAvailable').value;
  const nonMemberTicketPrice = document.getElementById('nonMemberTicketPrice').value;
  const memberTicketPrice = document.getElementById('memberTicketPrice').value;
  const memberPercentage = document.getElementById('memberPercentage').value;
  const facilitatorCost = document.getElementById('facilitatorCost').value;
  const venueCost = document.getElementById('venueCost').value;
  const cateringCost = document.getElementById('cateringCost').value;
  const miscCost = document.getElementById('miscCost').value;
  const emailCampaign = document.getElementById('emailCampaign').checked;
  const radioCampaign = document.getElementById('radioCampaign').checked;
  const socialMediaCampaign = document.getElementById('socialMediaCampaign').checked;
  const eventManagerTime = document.getElementById('eventManagerTime').value;
  const sponsorAmount = document.getElementById('sponsorAmount').value;
  const resultString = document.getElementById('result').innerHTML;

  const resultRows = resultString.split('<br>');

  const data = [
    ['Tickets Available', ticketsAvailable],
    ['Non-Member Ticket Price', nonMemberTicketPrice],
    ['Member Ticket Price', memberTicketPrice],
    ['Member Percentage', memberPercentage],
    ['Facilitator Cost', facilitatorCost],
    ['Venue Cost', venueCost],
    ['Catering Cost', cateringCost],
    ['Misc Cost', miscCost],
    ['Email Campaign', emailCampaign ? 'Yes' : 'No'],
    ['Radio Campaign', radioCampaign ? 'Yes' : 'No'],
    ['Social Media Campaign', socialMediaCampaign ? 'Yes' : 'No'],
    ['Event Manager Time', eventManagerTime],
    ['Sponsor Amount', sponsorAmount]
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
  link.setAttribute('download', 'profit-data.csv');
  link.click();
}

function resetForm() {
  document.querySelector('#ticketsAvailable').value = '';
  document.querySelector('#nonMemberTicketPrice').value = '';
  document.querySelector('#memberTicketPrice').value = '';
  document.querySelector('#memberPercentage').value = '';
  document.querySelector('#facilitatorCost').value = '';
  document.querySelector('#venueCost').value = '';
  document.querySelector('#cateringCost').value = '';
  document.querySelector('#miscCost').value = '';
  document.querySelector('#emailCampaign').checked = false;
  document.querySelector('#radioCampaign').checked = false;
  document.querySelector('#socialMediaCampaign').checked = false;
  document.querySelector('#eventManagerTime').value = '';
  document.querySelector('#sponsorAmount').value = '';
  document.querySelector('#result').innerHTML = '';
}