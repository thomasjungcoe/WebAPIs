// Get references to the elements we need to manipulate
const searchTerm = document.querySelector('.search');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

const section = document.querySelector('section');

// When the window (tab) has finished loading, run onClientLoad() to get it all started
window.addEventListener('load', onClientLoad);

// Load and initialize the API, then run the onYouTubeApiLoad() function once this is done
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Attach your key to the API
function onYouTubeApiLoad() {
    // To get a key for your own application:
    // 1. Go to https://console.cloud.google.com/apis/dashboard
    // 2. Create a new project if you've not already got one
    // 3. Click the Enable API button
    // 4. Choose YouTube Data API
    // 5. Click the Enable button
    // 6. Click create credentials
    // 7. Select "Web browser (JavaScript)" from the second dropdown
    // 8. Click the "Public data" radio button
    // 9. Click the "What credentials do I need?" button
    // 10. Copy your API key and paste it in below
    gapi.client.setApiKey('Your Key Here');

    // Attach an event listener to the submit button
    // when it is submitted -- the search() function
    searchForm.addEventListener('submit', search);
}

function search(e) { 
    // use preventDefault to stop form actually submitting
    e.preventDefault();

    // create a search request using the Data API
    const request = gapi.client.youtube.search.list({
        // set what kind of data the response will include
        part: 'snippet',
        // set the number of results that will be returned
        maxResults: 10,
        // set the search query to search for
        q: searchTerm.value 
    });

    // send the request, and specify a function to run when the response returns
    request.execute(onSearchResponse);
}

// This function automatically has the response passed in as a parameter
function onSearchResponse(response) {
    // Empty the <section> element
    while(section.firstChild) {
        section.removeChild(section.firstChild);
    }

    // Store the actual results of the serach in a variable
    const results = response.result.items;

    // loop through the results and run displayVideos() for each
    for (let i = 0; i < results.length; i++) {
        displayVideo(results[i], i);
    }
}

function displayVideo(result, i) {
    // Create a new div with unique id for each video, and append it to the <section>
    // The YouTube Iframe Player API will replace each one with
    // an <iframe> containing the coresponsind video
    const vid = document.createElement('div');
    vidId = 'vid' + i;
    vid.id = vidId;
    section.appendChild(vid);

    // Use the YT.Player() constructor to create a new video player obj,
    // Specifying the ID of the lement to be replaced by it (the <div>),
    // a height and width, and an event to handle the custom onReady event
    const player = new YT.Player(vidId, {
        height: '360',
        width: '480',
        videoId: result.id.videoId,
        events: {
          'onReady': onPlayerReady
        }    
    });

    // The onPlayerReady() handler grabs the ID of each video, and checks its duration
    // If the duration is 0, the video can't be played, so we just delete it
    function onPlayerReady(event) {
        console.log(e.target.id);
        const myId = e.target.id;
        const duration = e.target.getDuration();
        if (duration === 0) {
            console.log(`Video ${myId} can't be played, so it was deleted.`);
            section.removeChild(e.target.a);
        } else {
            console.log(`Video ${myId} ready to play.`);
        }
    }
}