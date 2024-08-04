document.addEventListener("DOMContentLoaded", function () {
  function calculateMinimumTickets() {
    let desiredProfitMargin = parseFloat(document.querySelector('#desiredProfitMargin').value) || 0;
    let nonMemberTicketPrice = parseFloat(document.querySelector('#nonMemberTicketPrice').value) || 0;
    let memberTicketPrice = parseFloat(document.querySelector('#memberTicketPrice').value) || 0;
    let memberPercentage = parseFloat(document.querySelector('#memberPercentage').value) || 0;

    let facilitatorCost = parseFloat(document.querySelector('#facilitatorCost').value) || 0;
    let venueCost = parseFloat(document.querySelector('#venueCost').value) || 0;
    let cateringCost = parseFloat(document.querySelector('#cateringCost').value) || 0;
    let cateringPerTicket = document.querySelector('#cateringPerTicket').checked;
    let eventManagerTime = parseFloat(document.querySelector('#eventManagerTime').value) || 0;
    let miscCost = parseFloat(document.querySelector('#miscCost').value) || 0;
    let sponsorAmount = parseFloat(document.querySelector('#sponsorAmount').value) || 0;

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
    let totalCateringCost = cateringPerTicket ? cateringCost * ticketsAvailable : cateringCost;
    let totalCost = facilitatorCost + venueCost + marketingCost + totalCateringCost + eventManagerCost + miscCost;
    let netCost = totalCost - sponsorAmount;
    let requiredRevenue = netCost / (1 - (desiredProfitMargin / 100));

    let result = document.querySelector('#result');

    if (desiredProfitMargin >= 100) {
      result.innerHTML = 'Desired profit margin must be less than 100%.';
      return;
    }

    if (nonMemberTicketPrice <= 0 || memberTicketPrice <= 0) {
      result.innerHTML = 'Ticket prices must be greater than 0.';
      return;
    }

    if (memberPercentage < 0 || memberPercentage > 100) {
      result.innerHTML = 'Member percentage must be between 0 and 100.';
      return;
    }

    let minimumTickets = requiredRevenue / ((nonMemberTicketPrice * (1 - memberPercentage / 100)) + (memberTicketPrice * (memberPercentage / 100)));
    let totalProfit = minimumTickets * ((nonMemberTicketPrice * (1 - memberPercentage / 100)) + (memberTicketPrice * (memberPercentage / 100))) - netCost;

    result.innerHTML = `
      Minimum Tickets Needed: ${Math.ceil(minimumTickets)}<br>
      Total Profit (excl GST): $${totalProfit.toFixed(2)}
    `;
  }

  function downloadCSV() {
    const desiredProfitMargin = document.getElementById('desiredProfitMargin').value;
    const nonMemberTicketPrice = document.getElementById('nonMemberTicketPrice').value;
    const memberTicketPrice = document.getElementById('memberTicketPrice').value;
    const memberPercentage = document.getElementById('memberPercentage').value;
    const facilitatorCost = document.getElementById('facilitatorCost').value;
    const venueCost = document.getElementById('venueCost').value;
    const cateringCost = document.getElementById('cateringCost').value;
    const cateringPerTicket = document.getElementById('cateringPerTicket').checked;
    const miscCost = document.getElementById('miscCost').value;
    const emailCampaign = document.getElementById('emailCampaign').checked;
    const radioCampaign = document.getElementById('radioCampaign').checked;
    const socialMediaCampaign = document.getElementById('socialMediaCampaign').checked;
    const eventManagerTime = document.getElementById('eventManagerTime').value;
    const sponsorAmount = document.getElementById('sponsorAmount').value;
    const resultString = document.getElementById('result').innerHTML;

    const resultRows = resultString.split('<br>');

    const data = [
      ['Desired Profit Margin', desiredProfitMargin],
      ['Non-Member Ticket Price', nonMemberTicketPrice],
      ['Member Ticket Price', memberTicketPrice],
      ['Member Percentage', memberPercentage],
      ['Facilitator Cost', facilitatorCost],
      ['Venue Cost', venueCost],
      ['Catering Cost', cateringCost],
      ['Catering Per Ticket', cateringPerTicket ? 'Yes' : 'No'],
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
    link.setAttribute('download', 'ticket-data.csv');
    link.click();
  }

  function resetForm() {
    document.querySelector('#desiredProfitMargin').value = '';
    document.querySelector('#nonMemberTicketPrice').value = '';
    document.querySelector('#memberTicketPrice').value = '';
    document.querySelector('#memberPercentage').value = '';
    document.querySelector('#facilitatorCost').value = '';
    document.querySelector('#venueCost').value = '';
    document.querySelector('#cateringCost').value = '';
    document.querySelector('#cateringPerTicket').checked = false;
    document.querySelector('#miscCost').value = '';
    document.querySelector('#emailCampaign').checked = false;
    document.querySelector('#radioCampaign').checked = false;
    document.querySelector('#socialMediaCampaign').checked = false;
    document.querySelector('#eventManagerTime').value = '';
    document.querySelector('#sponsorAmount').value = '';
    document.querySelector('#result').innerHTML = '';
  }

  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateMinimumTickets);
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', calculateMinimumTickets);
  });

  document.getElementById('downloadButton').addEventListener('click', downloadCSV);
  document.getElementById('resetButton').addEventListener('click', resetForm);
});