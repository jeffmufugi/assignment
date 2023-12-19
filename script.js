let audio = new Audio();
let isPlaying = false;
let playbackPosition = 0;
let currentAudioSource = null;

// Get all play buttons
const playButtons = document.querySelectorAll('.play-button');

// Add click event listener to each play button
playButtons.forEach(button => {
  button.addEventListener('click', () => {
    const audioSrc = button.getAttribute('data-src');

    if (isPlaying && currentAudioSource === audioSrc) {
      // Pause the audio
      audio.pause();
      isPlaying = false;
      playbackPosition = audio.currentTime;

      // Update the button icon
      button.classList.remove('fa-pause');
      button.classList.add('fa-play');
    } else {
      // Set the new source and reset playback position
      audio.src = audioSrc;
      currentAudioSource = audioSrc;
      playbackPosition = 0;

      // Play the audio
      audio.currentTime = playbackPosition;
      audio.play();
      isPlaying = true;

      // Update the button icon
      button.classList.remove('fa-play');
      button.classList.add('fa-pause');

      // Pause the audio when the playback ends
      audio.addEventListener('ended', () => {
        isPlaying = false;
        playbackPosition = 0;
        currentAudioSource = null;

        // Update the button icon
        button.classList.remove('fa-pause');
        button.classList.add('fa-play');
      });
    }
  });
});

// Add your existing JavaScript code here

// Update the time display and progress bar during playback
audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  // Update the progress bar
  const progressPercentage = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  // Update the time display
  currentTimeDisplay.textContent = formatTime(currentTime);
  totalTimeDisplay.textContent = formatTime(duration);
});

// Helper function to format time in MM:SS format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
