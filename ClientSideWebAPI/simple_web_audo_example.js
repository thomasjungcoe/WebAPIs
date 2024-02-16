const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const audioElement = document.getSelector("audio");
const playBtn = document.getSelector("button");
const volumeSlider = document.getSelector(".volume");

const audioSource = audioCtx.createMediaElementSource(audioElement);

// we include couple of event handlers now
// play/pause audio
playBtn.addEventListener("click", () => {
  // check if the context is in suspended state (autoplay policy)
  if (audioCtx.state == "suspended") {
    audioCtx.resume();
  }

  // if track is stopped, play it
  if (playBtn.getAttribute("class") === "pause") {
    audioElement.play();
    playBtn.setAttribute("class", "playing");
    playBtn.textContent = "Pause";
    // if track is playing, stop it
  } else if (playBtn.getAttribute("class") === "playing") {
    audioElement.pause();
    playBtn.setAttribute("class", "paused");
    playBtn.textContent = "play";
  }
});

// if track ends
audioElement.addEventListener("ended", () => {
  playBtn.setAttribute("class", "paused");
  playBtn.textContent = "Play";
});

// volume -- create volume node to adjust volume based on user adjusting volume event
const gainNode = audioCtx.createGain();

volumeSlider.addEventListener("input", () => {
  gainNode.gain.value = volumeSlider.value;
});

// connect different nodes into audio graph
audioSource.connect(gainNode).connect(audioCtx.destination);
