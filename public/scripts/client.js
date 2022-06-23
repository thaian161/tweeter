/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //---------Ajax GET request, fetch data from http://localhost:8080/tweets---------------
  const loadtweets = () => {
    $.get('http://localhost:8080/tweets').then((data) => {
      console.log(data);
      renderTweets(data);
    });
  };

  loadtweets();
  //hide the error message when page is loaded
  const formReset = function () {
    $('#too-long-error').hide();
    $('#empty-error').hide();
  };
  formReset();

  //---------Render Tweets to Main Page----
  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet

      //we have to create a constant to hold the value from createTweetElement
      const $tweet = createTweetElement(tweet);

      // takes return value and appends it to the tweets container
      //append it to the <div class ="list-of-tweet">
      $('.list-of-tweet').append($tweet);
    }
  };

  //---------MARK-UP Tweet-----------------
  const createTweetElement = function (tweet) {
    console.log(tweet);
    let $tweet = `<article class="tweet">
  <div class="pading-tweet-box">
  <div>
  <header class="display-tweet-from-user">
    <div class="mock-up-photo-username">
      <img src=${tweet.user.avatars} />
      <h2 class="profile-h2">${tweet.user.name}</h2>
    </div>
    <div>
      <h3 class="profile-h4 mock-up">${tweet.user.handle}</h3>
    </div>
  </header>
  <br>
  <section class="new-tweet">
    <form class="tweet-form" action="/tweets/" method="POST">
      <label class="tweet-label"> <b>${tweet.content.text}</b></label>
    </form>
  </section>
  <br>
  <footer class="footer-tweet">
    <div>${timeago.format(tweet.created_at)}</div>
    <div>
      <i class="fa-solid fa-comment-dots"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
      <i class="fa-solid fa-share-nodes"></i>
    </div>
  </footer>
</div>
</article>
`;
    return $tweet;
  };

  //----------CALL RENDER FUNC-------------
  //this is needed when we had the fake data objects
  //renderTweets(data);

  //Target form with class of tweet-form

  //add event listener on form that defined above
  $('.tweet-form').on('submit', function (event) {
    event.preventDefault();

    //hide the error from the start of form submition
    formReset();

    //form is the one generate this event
    //$ is a function
    //console.log(event.target.text.value); // this way does not sanitize the text, and might hack your site, database-query

    console.log(data);

    //FORM VALIDATION
    //user does not input anything
    if (event.target.text.value === '') {
      //display error
      $('#empty-error').show();
      return;
    }
    //number to number comparasing
    if (event.target.text.value.length > 140) {
      $('#too-long-error').show();
      return;
    }

    //only need to serialize data when use POST request
    const data = $(this).serialize();
    //----Ajax POST request, path with the data we got from event listener on submit----
    $.post('/tweets', data).then(() => {
      console.log('It worked!');
    });
  });
});

//Wrtie down your steps, step by step
//if error then 1.1 1.2 1.3 => use the break the code in the console
