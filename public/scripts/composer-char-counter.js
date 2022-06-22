/* 
<!-- FORM to submit tweet -->
      <section class="new-tweet">
        <!-- <h2>Compose Tweet</h2> -->
        <form class="tweet-form" action="/tweets/" method="POST">
          <label class="tweet-text" for="tweet-text"
            >What has been on your mind today?</label
          >
          <textarea name="text" id="tweet-text"></textarea>
          <div class="tweet-button-and-counter">
            <button class="tweet-button" role="button" type="submit">
              Tweet
            </button>
            <output name="counter" class="counter" for="tweet-text">140</output>
          </div>
        </form>
      </section>
*/
//ready mean dont executive this code until the DOM is loaded in the browser. It is safer to always wrap the code in document.ready
$(document).ready(function () {
  $('#tweet-text').on('input', function () {
    //grab the contents of textarea input field
    const $textarea = $('#tweet-text');
    const userInput = $textarea.val();
    let userInputLength = userInput.length;
    //let userInputLength = $(this).val().length
    //$(this)= $textarea. this = whichever element that caused the event to occur
    //console.log(userInput);
    //console.log(userInputLength);

    // Selects FORM the parent of the textarea. Then finds the OUTPUT of counter
    let counterValue = $(this)
      .parent()
      .find('output')
      .text(140 - userInputLength);

    //change color for the counter
    //if userInputLength is below 0 -> add class to turn counter to red
    if (counterValue.text() < 0) {
      //console.log(counterValue.text());
      counterValue.addClass('counter-red');
    } else {
      counterValue.removeClass('counter-red');
    }
  });
});

//call the counter
//.counter

//use Jquery .text to set a new value of .counter

//total minus the amount of input that user input

//turn red => look up the element .counter, addClass to make it red to the .counter
