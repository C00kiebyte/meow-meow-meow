let highestZ = 1;

function initPaper(paper) {
  let holdingPaper = false; // Indicates if the paper is currently being dragged
  let mouseTouchX = 0; // X coordinate where the mouse or touch started.
  let mouseTouchY = 0; // Y coordinate where the mouse or touch started.
  let prevMouseX = 0; // Previous X coordinate for velocity calculation.
  let prevMouseY = 0; // Previous Y coordinate for velocity calculation.
  let currentPaperX = 0; // Current X position of the paper.
  let currentPaperY = 0; // Current Y position of the paper.

  function updatePosition(event) {
    // Get the current mouse/touch position.
    const clientX = event.type.startsWith("touch")
      ? event.touches[0].clientX
      : event.clientX;
    const clientY = event.type.startsWith("touch")
      ? event.touches[0].clientY
      : event.clientY;

    if (holdingPaper) {
      // Calculate the change in position
      const directionX = clientX - mouseTouchX;
      const directionY = clientY - mouseTouchY;

      // Update the paper's position based on the change
      currentPaperX += directionX;
      currentPaperY += directionY;

      // Update the previous position.
      mouseTouchX = clientX;
      mouseTouchY = clientY;

      paper.style.transform = `translateX(${currentPaperX}px) translateY(${currentPaperY}px)`;
    }
  }

  function handleMove(event) {
    event.preventDefault();
    updatePosition(event);
  }

  function handleDown(event) {
    if (holdingPaper) {
      return;
    }

    holdingPaper = true;
    paper.style.zIndex = highestZ; // Bring the paper to the front.
    highestZ += 1; // Add 1 to the z-index for the next paper.

    mouseTouchX = event.type.startsWith("touch")
      ? event.touches[0].clientX
      : event.clientX;

    mouseTouchY = event.type.startsWith("touch")
      ? event.touches[0].clientY
      : event.clientY;

    prevMouseX = mouseTouchX;
    prevMouseY = mouseTouchY;
  }

  function handleUp() {
    holdingPaper = false;
  }

  document.addEventListener("mousemove", handleMove);
  document.addEventListener("touchmove", handleMove);

  document.addEventListener("mouseup", handleUp);
  document.addEventListener("touchend", handleUp);

  paper.addEventListener("mousedown", handleDown);
  paper.addEventListener("touchstart", handleDown);
}

// Get the list of papers from our HTML.
const papers = Array.from(document.querySelectorAll(".paper"));

// Go through each paper.
papers.forEach((paper) => {
  initPaper(paper);
});
