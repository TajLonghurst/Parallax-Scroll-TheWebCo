const html = document.documentElement;
const canvas = document.getElementById("venue-scrolling");
const context = canvas.getContext("2d");
const canvasContainer = document.getElementById("venue-container");

const frameCount = 125; // Total amount of images

const currentFrame = (index) => {
  return `venue-images/LRT_${index.toString().padStart(4, "0")}.jpg`; ///LRT_0001
};

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
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

window.addEventListener("scroll", () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = canvasContainer.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();
