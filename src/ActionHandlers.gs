/*
 * ----- SECTION GUESTS -----
 */

function handleStars(e) {
  return;
}

function handleTextarea(e) {
  return;
}

/**
 * Adds rating to the end of description
 * Sends email with rating to organizer of event
 * Adds row to sheet "Meeting evaluations" with rating and additional information
 * Displays a card with thanks
 * 
 * @param {Event} e - Event from Calendar
 * @return {Card}
 */
function handleSubmit(e) {
  const calEvent = CalendarApp.getEventById(e.calendar.id),
        text = e.formInput.textareaField || "",
        rating = parseInt(e.formInput.ratingField, 10).toString();

  appendToDescription(e, calEvent, text, rating);
  sendEmailToOrganizer(e, calEvent, text, rating);
  addToSheets(e, calEvent, text, rating);

  return createThanksCard();
}

/**
 * Adds rating to the end of description
 * 
 * @param {Event} e - Event from Calendar
 * @param {Object} calEvent - Object with information about event from caledar
 * @param {String} text - Rating text
 * @param {String} rating - Number of stars
 */
function appendToDescription(e, calEvent, text, rating) {
  const desc = calEvent.getDescription();

  if (desc.includes("-----RATINGS-----")) {
    const newDesc = `${desc}\n${rating} - ${text}`;
    return calEvent.setDescription(newDesc);
  } 
  else {
    const newDesc = `${desc}\n-----RATINGS-----\n${rating} - ${text}`;
    return calEvent.setDescription(newDesc);
  }
}

/**
 * Sends email with rating to organizer of event
 * 
 * @param {Event} e - Event from Calendar
 * @param {Object} calEvent - Object with information about event from caledar
 * @param {String} text - Rating text
 * @param {String} rating - Number of stars
 */
function sendEmailToOrganizer(e, calEvent, text, rating) {
  const organizerEmail = e.calendar.organizer.email;

  const calEventName = calEvent.getTitle(),
        calEventDate = calEvent.getAllDayStartDate(),
        subject = `Rating of event: ${calEventName} ${calEventDate}`;

  const body = `${rating} - ${text}`;

  MailApp.sendEmail({
    to: organizerEmail,
    subject: subject,
    htmlBody: body
  });
}


/*
 * ----- SECTION ORGANIZER -----
 */

/**
 * Sends an email to all guests of current event by organizer of current event
 * 
 * @param {Event} e - Event from Calendar
 * @return {Card}
 */
function handleRequest(e) {
  const calEvent = CalendarApp.getEventById(e.calendar.id),
        calEventName = calEvent.getTitle();

  const subject = `Rating of event: ${calEventName}`;

  const guests = calEvent.getGuestList();

  guests.forEach((guest) => {
    let email = guest.getEmail();
    let eventUrl = "https://calendar.google.com/calendar/r/eventedit/" +
                  Utilities.base64Encode(calEvent.getId().split('@')[0] +
                  " " + 
                  email)
                  .replace(/\=/g, '');

    let body = `Please rate this event: <a href="${eventUrl}">${eventUrl}</a>`;

    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: body
    });
  });

  return createRequestDoneCard()
}
