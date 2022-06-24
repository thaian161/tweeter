/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //---------Ajax GET request, fetch data from http://localhost:8080/tweets--------
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
      //use prepend to show tweet on the top of page
      $('.list-of-tweet').prepend($tweet);
    }
  };

  //----Prevent Cross-Site Scripting Attack Function------
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //---------MARK-UP Tweet-----------------
  const createTweetElement = function (tweet) {
    console.log(tweet);
    let $tweet = `
    <article class="tweet">
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
      <label class="tweet-label"> <b>${escape(tweet.content.text)}</b></label>
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

  //add event listener on form that defined above
  $('.tweet-form').on('submit', function (event) {
    event.preventDefault();

    //hide the error from the start of form submition
    formReset();

    const data = $(this).serialize();
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

    //----Ajax POST request, path with the data we got from event listener on submit----
    $.post('/tweets', data)
      //when post => load tweets to put the tweet on top of page
      .then(() => {
        loadtweets();
      })

      //clear form after user hit the tweet button
      .then(() => {
        $('input,textarea').val('');
      })

      //reset counter back to 140 after user hit the tweet button
      .then(() => {
        $('.counter').text(140);
      });
  });

  //----SCROLL UP BUTTON----
  $('#scroll-up').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1000);
  });
});

//Wrtie down your steps, step by step
//if error then 1.1 1.2 1.3 => use the break the code in the console
