const videos = [
  { src: './assets/images/scan-img-1.mp4', title: '1.Discover and crawl', start: 0, end: 2 },
  { src: './assets/images/scan-img-2.mp4', title: '2.Assess', start: 0, end: 2 },
  { src: './assets/images/scan-img-5.mp4', title: '3.Detect Risk', start: 0, end: 2 },
  { src: './assets/images/scan-img-3.mp4', title: '4.Resolve', start: 0, end: 2 },
  { src: './assets/images/scan-img-4.mp4', title: '5.Continuously secure', start: 0, end: 2 }
];

const videoPlayer = document.getElementById('videoPlayer');
const scanningLine = document.querySelector('.scanning-line');
const videoTitle = document.getElementById('videoTitle');
const pulseLoaders = document.querySelectorAll('.pulse-loader');
let currentVideoIndex = 0;

// Load the initial video
loadVideo(currentVideoIndex);

function loadVideo(index) {
  const currentVideo = videos[index];
  videoPlayer.src = currentVideo.src;
  videoTitle.textContent = currentVideo.title;
  
  // Play the video and set the starting point
  videoPlayer.addEventListener('loadedmetadata', () => {
    videoPlayer.currentTime = currentVideo.start; // Set start time
    videoPlayer.play();
  });
}

// Function to change the video and control the scanning line
function changeVideo() {
  currentVideoIndex++;

  // If we have reached the end of the playlist, loop back to the first video
  if (currentVideoIndex >= videos.length) {
    currentVideoIndex = 0;
  }

  // Load the next video
  loadVideo(currentVideoIndex);

  // Control the scanning line and pulse loaders based on the video index
  if (currentVideoIndex === 3 || currentVideoIndex === 4) {
    // Hide and stop the scanning line for video 4 and 5
    scanningLine.style.display = 'none';
    scanningLine.style.animation = 'none';
    
    // Stop the pulse loaders and hide them for the last video
    pulseLoaders.forEach(loader => {
      loader.style.animation = 'none'; // Stop the pulsating animation
      loader.style.display = 'none'; // Hide the loaders
    });
  } else {
    // Show and animate the scanning line for video 1, 2, and 3
    scanningLine.style.display = 'block';
    scanningLine.style.animation = 'scan 3s linear infinite';
    
    // Start the pulse loaders for the first three videos
    pulseLoaders.forEach(loader => {
      loader.style.animation = 'pulse 1s infinite'; // Restart the pulsating animation
      loader.style.display = 'block'; // Make sure the loaders are visible
    });
  }
}

// Listen for when the video ends or exceeds its specified end time
videoPlayer.addEventListener('timeupdate', () => {
  const currentVideo = videos[currentVideoIndex];
  if (videoPlayer.currentTime >= currentVideo.end) {
    videoPlayer.pause(); // Pause when end time is reached
    changeVideo(); // Move to the next video
  }
});

// Listen for when the video actually ends (if the `end` time is not reached for some reason)
videoPlayer.addEventListener('ended', changeVideo);