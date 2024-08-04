document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    desiredProfitMargin: '#desiredProfitMargin',
    nonMemberTicketPrice: '#nonMemberTicketPrice',
    memberTicketPrice: '#memberTicketPrice',
    memberPercentage: '#memberPercentage',
    facilitatorCost: '#facilitatorCost',
    venueCost: '#venueCost',
    cateringCost: '#cateringCost',
    cateringPerTicket: '#cateringPerTicket',
    miscCost: '#miscCost',
    emailCampaign: '#emailCampaign',
    radioCampaign: '#radioCampaign',
    socialMediaCampaign: '#socialMediaCampaign',
    eventManagerTime: '#eventManagerTime',
    sponsorAmount: '#sponsorAmount',
    result: '#result'
  };

  const getInputValue = id => parseFloat(document.querySelector(id).value) || 0;
  const getCheckboxValue = id => document.querySelector(id).checked ? 1 : 0;

  const calculateMinimumTickets = () => {
    const desiredProfitMargin = getInputValue(elements.desiredProfitMargin) / 100;
    const nonMemberTicketPrice = getInputValue(elements.nonMemberTicketPrice);
    const memberTicketPrice = getInputValue(elements.memberTicketPrice);
    const memberPercentage = getInputValue(elements.memberPercentage) / 100;
    const facilitatorCost = getInputValue(elements.facilitatorCost);
    const venueCost = getInputValue(elements.venueCost);
    const cateringCost = getInputValue(elements.cateringCost);
    const cateringPerTicket = getCheckboxValue(elements.cateringPerTicket);
    const eventManagerTime = getInputValue(elements.eventManagerTime);
    const miscCost = getInputValue(elements.miscCost);
    const sponsorAmount = getInputValue(elements.sponsorAmount);
    const marketingCost = 500 * getCheckboxValue(elements.radioCampaign) + 150 * getCheckboxValue(elements.emailCampaign) + 100 * getCheckboxValue(elements.socialMediaCampaign);
    const eventManagerCost = eventManagerTime * 40;
    const totalFixedCost = facilitatorCost + venueCost + marketingCost + eventManagerCost + miscCost;
    const netCost = totalFixedCost - sponsorAmount;
    const revenuePerTicket = nonMemberTicketPrice * (1 - memberPercentage) + memberTicketPrice * memberPercentage;
    const requiredRevenue = netCost / (1 - desiredProfitMargin);
    const minimumTickets = (requiredRevenue + (cateringPerTicket ? 0 : cateringCost)) / (revenuePerTicket - (cateringPerTicket ? cateringCost : 0));
    const totalRevenue = Math.ceil(minimumTickets) * revenuePerTicket;
    const totalCateringCost = cateringPerTicket ? Math.ceil(minimumTickets) * cateringCost : cateringCost;
    const totalCost = totalFixedCost + totalCateringCost;
    const totalProfit = totalRevenue - totalCost;

    if (desiredProfitMargin >= 1 || nonMemberTicketPrice <= 0 || memberTicketPrice <= 0 || memberPercentage < 0 || memberPercentage > 1 || minimumTickets < 0) {
      document.querySelector(elements.result).innerHTML = 'Invalid calculation: check input values.';
      return;
    }

    document.querySelector(elements.result).innerHTML = `
      Minimum Tickets Needed: ${Math.ceil(minimumTickets)}<br>
      Total Revenue (excl GST): $${totalRevenue.toFixed(2)}<br>
      Total Cost (excl GST): $${totalCost.toFixed(2)}<br>
      Total Profit (excl GST): $${totalProfit.toFixed(2)}
    `;
  };

  const downloadExcel = () => {
    const data = [
      ['Description', 'Value'],
      ['Desired Profit Margin (%)', getInputValue(elements.desiredProfitMargin)],
      ['Non-Member Ticket Price', getInputValue(elements.nonMemberTicketPrice)],
      ['Member Ticket Price', getInputValue(elements.memberTicketPrice)],
      ['Member Percentage (%)', getInputValue(elements.memberPercentage)],
      ['Facilitator Cost', getInputValue(elements.facilitatorCost)],
      ['Venue Cost', getInputValue(elements.venueCost)],
      ['Catering Cost', getInputValue(elements.cateringCost)],
      ['Catering Per Ticket', getCheckboxValue(elements.cateringPerTicket)],
      ['Misc Cost', getInputValue(elements.miscCost)],
      ['Marketing Cost', 500 * getCheckboxValue(elements.radioCampaign) + 150 * getCheckboxValue(elements.emailCampaign) + 100 * getCheckboxValue(elements.socialMediaCampaign)],
      ['Event Manager Cost', getInputValue(elements.eventManagerTime) * 40],
      ['Sponsor Amount', getInputValue(elements.sponsorAmount)],
      [],
      ['Minimum Tickets Needed', { f: 'ROUNDUP((B6+B7+IF(B9=1,B8*B15,B8)+B12+B10+B11-B13)/(B2*(1-B5/100)+B3*(B5/100)),0)' }],
      ['Total Revenue (excl GST)', { f: 'B15*(B2*(1-B5/100)+B3*(B5/100))' }],
      ['Total Cost (excl GST)', { f: 'B6+B7+IF(B9=1,B8*B15,B8)+B12+B10+B11-B13' }],
      ['Total Profit (excl GST)', { f: 'B16-B17' }]
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);

    ws['B2'].z = '0%';
    ws['B5'].z = '0%';
    ws['B15'].z = '0';
    for (let i = 1; i <= 17; i++) {
      if (i !== 2 && i !== 5 && ws['B' + i]) {
        ws['B' + i].z = '"$"#,##0.00';
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ticket-data.xlsx');
  };

  const resetForm = () => {
    Object.keys(elements).forEach(key => {
      if (key !== 'result') {
        document.querySelector(elements[key]).value = '';
        if (document.querySelector(elements[key]).type === 'checkbox') {
          document.querySelector(elements[key]).checked = false;
        }
      }
    });
    document.querySelector(elements.result).innerHTML = '';
  };

  const uploadExcel = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = e => {
      const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

      document.querySelector(elements.desiredProfitMargin).value = data[1][1];
      document.querySelector(elements.nonMemberTicketPrice).value = data[2][1];
      document.querySelector(elements.memberTicketPrice).value = data[3][1];
      document.querySelector(elements.memberPercentage).value = data[4][1];
      document.querySelector(elements.facilitatorCost).value = data[5][1];
      document.querySelector(elements.venueCost).value = data[6][1];
      document.querySelector(elements.cateringCost).value = data[7][1];
      document.querySelector(elements.cateringPerTicket).checked = data[8][1] === 1;
      document.querySelector(elements.miscCost).value = data[9][1];
      document.querySelector(elements.emailCampaign).checked = data[10][1] === 1;
      document.querySelector(elements.radioCampaign).checked = data[11][1] === 1;
      document.querySelector(elements.socialMediaCampaign).checked = data[12][1] === 1;
      document.querySelector(elements.eventManagerTime).value = data[13][1];
      document.querySelector(elements.sponsorAmount).value = data[14][1];

      calculateMinimumTickets();
    };

    reader.readAsArrayBuffer(file);
  };

  Object.keys(elements).forEach(key => {
    if (key !== 'result') {
      document.querySelector(elements[key]).addEventListener('input', calculateMinimumTickets);
      if (document.querySelector(elements[key]).type === 'checkbox') {
        document.querySelector(elements[key]).addEventListener('change', calculateMinimumTickets);
      }
    }
  });

  document.getElementById('calculateButton').addEventListener('click', calculateMinimumTickets);
  document.getElementById('downloadButton').addEventListener('click', downloadExcel);
  document.getElementById('resetButton').addEventListener('click', resetForm);
  document.getElementById('uploadButton').addEventListener('click', () => document.getElementById('uploadFile').click());
  document.getElementById('uploadFile').addEventListener('change', uploadExcel);
});