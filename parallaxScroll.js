const html = document.documentElement;
const canvas = document.getElementById("venue-scrolling");
const context = canvas.getContext("2d");
const canvasContainer = document.getElementById("venue-container");

const frameCount = 113; // Total amount of images

const currentFrame = (index) =>
  `venue-images/LRT_${index.toString().padStart(4, "0")}.jpg`;

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);

canvas.width = 1920;
canvas.height = 1080;

img.onload = function () {
  context.drawImage(img, 0, 0);
};

const updateImage = (index) => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
};

this.addEventListener("DOMContentLoaded", preloadImages, true);

window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = canvasContainer.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  if (true) {
    requestAnimationFrame(() => updateImage(frameIndex + 1));
  }
});
