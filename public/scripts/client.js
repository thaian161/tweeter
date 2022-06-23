/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  },
];

const renderTweets = function (tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet

    //we have to create a constant to hold the value from createTweetElement
    const $tweet = createTweetElement(tweet);

    //append it to the <div class ="list-of-tweet">
    $('.list-of-tweet').append($tweet);
  }
  // takes return value and appends it to the tweets container
};

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
    <div>${tweet.created_at}</div>
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

renderTweets(data);
