const words = ["Cybersecurity...", "Scanning...", "Vulnerabilities..."];
const imgWords = ["Analyzing", "Scanning", "Vulnerabilities Detected"];
const images = ["anm-scan-1.gif", "anm-scan-2.gif", "anm-scan-3.gif"];

let currentIndex = 0;
let currentWordIndex = 0;
let displayedText = "";
let isDeleting = false;
let typingSpeed = 150;
let scanningLine = true;
let progressLoader = true;

// Typing animation
function handleTyping() {
  const currentWord = words[currentWordIndex];
  const textLength = displayedText.length;

  if (!isDeleting && textLength === currentWord.length) {
    setTimeout(() => {
      isDeleting = true;
    }, 1000);
    return;
  }

  if (isDeleting && textLength === 0) {
    isDeleting = false;
    currentWordIndex = (currentWordIndex + 1) % words.length;
    return;
  }

  displayedText = isDeleting
    ? currentWord.slice(0, textLength - 1)
    : currentWord.slice(0, textLength + 1);

  document.getElementById("displayedText").innerText = displayedText;
  typingSpeed = isDeleting ? 100 : 150;

  setTimeout(handleTyping, typingSpeed);
}

// Image and progress animation
function handleImageChange() {
  currentIndex = (currentIndex + 1) % imgWords.length;

  document.getElementById("scanImg").src = images[currentIndex];
  document.getElementById("imgWord").innerText = imgWords[currentIndex];

  if (currentIndex === 2) {
    document.getElementById("scanningLine").style.display = "none";
    document.getElementById("progressLoader").style.display = "none";
  } else {
    document.getElementById("scanningLine").style.display = "block";
    document.getElementById("progressLoader").style.display = "flex";
  }
}

setInterval(handleImageChange, 4000);
handleTyping();
