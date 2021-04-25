'use strict';

/**
 * Builds a card that displays UI for organizer of guests
 * 
 * @param {Event} e - Event from Calendar
 * @return {Card}
 */
function eventOpenTrigger(e) {
  const organizer = e.calendar.organizer.email,
        currentUser = Session.getUser().getEmail();

  if (organizer == currentUser)
    return createOrganizerCard();
  
  return createCard(e);
}
