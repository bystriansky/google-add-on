/*
 * ----- SECTION GUESTS -----
 */

/**
 * Builds a card that displays UI for guests of current event
 * 
 * @param {Event} e - Event from Calendar
 * @return {Card}
 */
function createCard(e) {

  /* STARS */
  const stars = CardService.newSelectionInput()
    .setType(CardService.SelectionInputType.RADIO_BUTTON)
    .setFieldName("ratingField")
    .addItem("⭐", 1, false)
    .addItem("⭐⭐", 2, false)
    .addItem("⭐⭐⭐", 3, false)
    .addItem("⭐⭐⭐⭐", 4, false)
    .addItem("⭐⭐⭐⭐⭐", 5, true)
    .setOnChangeAction(
      CardService.newAction().setFunctionName("handleStars")
    );

  /* TEXTAREA */
  const textarea = CardService.newTextInput()
    .setTitle("Your message")
    .setFieldName("textareaField")
    .setOnChangeAction(
      CardService.newAction().setFunctionName("handleTextarea")
    );

  /* SUBMIT */
  const submit = CardService.newTextButton()
    .setText("Submit")
    .setOnClickAction(
      CardService.newAction().setFunctionName("handleSubmit").setParameters({"event": e.toString()})
    );

  /* BUILD CARD */
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Please, rate this event"))
    .addSection(CardService.newCardSection()
      .addWidget(stars)
      .addWidget(textarea)
      .addWidget(submit)
    )
    .build();
}

/**
 * Builds a card that displays announcement that rating has been sent 
 * 
 * @return {Card}
 */
function createThanksCard() {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Thank you for your rating"))
    .build();
}

/*
 * ----- SECTION ORGANIZER -----
 */

/**
 * Builds a card that displays UI for organizer of current event
 * 
 * @param {Event} e - Event from Calendar
 * @return {Card}
 */
function createOrganizerCard(e) {
  
  /* REQUEST */
  const request = CardService.newTextButton()
    .setText("Request")
    .setOnClickAction(
      CardService.newAction().setFunctionName("handleRequest")
    );
  
  /* BUILD CARD */
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Send request for rating to all guests"))
    .addSection(CardService.newCardSection()
      .addWidget(request)
    )
    .build();
}

/**
 * Builds a card that displays announcement that request has been sent 
 * 
 * @return {Card}
 */
function createRequestDoneCard() {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Request sent"))
    .build();
}
