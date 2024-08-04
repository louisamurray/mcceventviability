document.addEventListener("DOMContentLoaded", function () {
  function calculate() {
    let ticketsAvailable = parseInt(document.querySelector('#ticketsAvailable').value) || 0;
    let nonMemberTicketPrice = parseInt(document.querySelector('#nonMemberTicketPrice').value) || 0;
    let memberTicketPrice = parseInt(document.querySelector('#memberTicketPrice').value) || 0;
    let memberPercentage = parseFloat(document.querySelector('#memberPercentage').value) || 0;

    let facilitatorCost = parseInt(document.querySelector('#facilitatorCost').value) || 0;
    let venueCost = parseInt(document.querySelector('#venueCost').value) || 0;
    let cateringCost = parseInt(document.querySelector('#cateringCost').value) || 0;
    let cateringPerTicket = document.querySelector('#cateringPerTicket').checked;
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
    let totalCateringCost = cateringPerTicket ? cateringCost * ticketsAvailable : cateringCost;
    let totalCost = facilitatorCost + venueCost + marketingCost + totalCateringCost + eventManagerCost + miscCost;

    let result = document.querySelector('#result');

    if (ticketsAvailable <= 0) {
      result.innerHTML = 'Tickets available must be greater than 0.';
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

    let nonMemberRevenue = (ticketsAvailable * (1 - memberPercentage / 100)) * nonMemberTicketPrice;
    let memberRevenue = (ticketsAvailable * (memberPercentage / 100)) * memberTicketPrice;
    let totalRevenue = nonMemberRevenue + memberRevenue + sponsorAmount;

    let netProfit = totalRevenue - totalCost;
    let profitMargin = (netProfit / totalRevenue) * 100;

    result.innerHTML = `
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
      ['Tickets Available', ticketsAvailable],
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
    input.addEventListener('input', calculate);
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', calculate);
  });

  document.getElementById('calculateButton').addEventListener('click', calculate);
  document.getElementById('downloadButton').addEventListener('click', downloadCSV);
  document.getElementById('resetButton').addEventListener('click', resetForm);
});