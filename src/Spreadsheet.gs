/*
 * Cieľom bolo vytvoriť riešienie, aby užívatelia spoločného Drive mali jeden súbor v root
 */

/**
 * Adds row to sheet "Meeting evaluations" with rating and additional information
 * 
 * @param {Event} e - Event from Calendar
 * @param {Object} calEvent - Object with information about event from caledar
 * @param {String} text - Rating text
 * @param {String} rating - Number of stars
 */
function addToSheets(e, calEvent, text, rating) {
  const sheet = getSheet();

  /* find free row */
  let value = sheet.getRange(1, 1).getValue();
  let row = 1;
  do {
    value = sheet.getRange(row, 1).getValue();
    
    if (value == "" || value == null)
      break;

    row++;
  } while (true);

  /* data collection */
  const data = [
    e.calendar.id, 
    calEvent.getTitle(),
    e.calendar.organizer.email,
    getFormatedDate(),
    Session.getUser().getEmail(),
    rating,
    text
  ];

  /* insert data to sheet */
  for(let col = 1, idx = 0; col <= 7; col++) {
    sheet.getRange(row, col).setValue(data[idx]);
    idx++;
  }

  /* resize all columns */
  sheet.autoResizeColumns(1,7);
}

/**
 * Gets a sheet of meeting evaluations stored in Drive
 * 
 * @return {Sheet}
 */
function getSheet() {
  if (!DriveApp.getFilesByName("Meeting evaluations").hasNext()) {
    const spreadsheet = SpreadsheetApp.create("Meeting evaluations");

    initializeSheet(spreadsheet);
    
    return spreadsheet.getActiveSheet();
  }
  else {
    const files = DriveApp.getFilesByName("Meeting evaluations"),
          fileUrl = files.next().getUrl(),
          sheet = SpreadsheetApp.openByUrl(fileUrl).getActiveSheet();
    
    return sheet;
  }
}

/**
 * Initializes new spreadsheet - names the columns
 * 
 * @param {Spreadsheet} spreadsheet - New spreadsheet
 */
function initializeSheet(spreadsheet) {
  const sheet = spreadsheet.getActiveSheet();

  /* names of columns */
  const heading = [
    "ID event",
    "Title",
    "Organizer",
    "Date of rating",
    "Evaluator",
    "Stars",
    "Message"
  ]

  /* insert data to sheet */
  for (let col = 1, idx = 0; col <= 7; col++) {
    sheet.getRange(1,col).setValue(heading[idx]);
    idx++;
  }

  /* freeze first row */
  spreadsheet.setFrozenRows(1);
}

/**
 * Returns current date and time in DD.MM.YYYY - HH:MM format
 * 
 * @return {String}
 */
function getFormatedDate() {
  const date = new Date(),
      day = date.getDate(),
      month = date.getMonth(),
      year = date.getFullYear(),
      hour = date.getHours(),
      minute = (date.getMinutes()<10?'0':'') + date.getMinutes();
  
  return `${day}. ${month}. ${year} - ${hour}:${minute}`
}
