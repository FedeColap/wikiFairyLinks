'use strict';

const searchURL = 'https://en.wikipedia.org/w/api.php';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  console.log(typeof(responseJson));
  // console.log(responseJson.parse.externallinks);
  
  let randNum = function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(503));
  }(); 
  console.log(randNum);
  console.log(responseJson.parse.externallinks[randNum]);
  $('#results-list').empty();

    $('#results-list').append(
      `<li>
      <a href="${responseJson.parse.externallinks[randNum]}" target="_blank"> <h3>Here is your story to read!</h3></a>
      </li>`
    );
  //display the results section  
  $('#results').removeClass('hidden');

};

function getYouTubeVideos() {  
  const params = {
    action: 'parse',
    origin: '*',
    pageid: '8915322',
    prop: 'externallinks',
    format: 'json'
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();

    getYouTubeVideos();
  });
}

$(watchForm);