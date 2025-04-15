const gridSize = document.getElementById("grid-size");
const gridSizeSlider = document.getElementById("grid-size-slider");
const canvas = document.getElementById("canvas-flexbox");
const colorPicker = document.getElementById("color-picker");
const colorModeBtn = document.getElementById("color-mode");
const randomModeBtn = document.getElementById("random-mode");
const progressiveDarkeningBtn = document.getElementById(
  "progressive-darkening"
);
const eraserBtn = document.getElementById("eraser");
const clearBtn = document.getElementById("clear-canvas");

const initializeCanvas = () => {
  createCanvas(16); 
  applyTileEventListeners();
};

window.addEventListener("DOMContentLoaded", initializeCanvas);

const clearCanvas = () => {
  const tiles = document.querySelectorAll(".canvas_tile");
  tiles.forEach((tile) => {
    tile.style.backgroundColor = "#dfe3ec";
  });
};

const applyTileEventListeners = () => {
  const tiles = document.querySelectorAll(".canvas_tile");

  tiles.forEach((tile) => {
    tile.replaceWith(tile.cloneNode(true));
  });

  const updatedTiles = document.querySelectorAll(".canvas_tile");

  updatedTiles.forEach((tile) => {
    tile.addEventListener("mouseover", () => {
      if (colorModeBtn.classList.contains("active")) {
        tile.style.backgroundColor = colorPicker.value;
      }
    });

    tile.addEventListener("mouseover", () => {
      if (randomModeBtn.classList.contains("active")) {
        tile.style.backgroundColor = getRandomColor();
      }
    });

    tile.addEventListener("mouseover", () => {
      if (progressiveDarkeningBtn.classList.contains("active")) {
        if (!tile.dataset.darkness) {
          tile.dataset.darkness = 0;
        }

        let currentDarkness = parseInt(tile.dataset.darkness);

        if (currentDarkness < 10) {
          currentDarkness += 1;
          tile.dataset.darkness = currentDarkness;

          const currentColor = tile.style.backgroundColor
            .replace(/rgba?\(/, "")
            .replace(/\)/, "")
            .split(",")
            .map((value) => parseInt(value.trim()));

          const newColor = currentColor.map((color) =>
            Math.max(0, Math.floor(color * (1 - currentDarkness / 10)))
          );

          tile.style.backgroundColor = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
        }
      }
    });

    tile.addEventListener("mouseover", () => {
      if (eraserBtn.classList.contains("active")) {
        tile.style.backgroundColor = "rgba(223, 227, 236, 1)";
      }
    });
  });
};

const createCanvas = (size) => {
  clearCanvas();
  const tileSize = `${100 / size}%`;

  if (Math.pow(size, 2) > canvas.children.length) {
    for (let i = canvas.children.length; i < Math.pow(size, 2); i++) {
      const canvasTile = canvas.appendChild(document.createElement("div"));
      canvasTile.classList.add("canvas_tile");
    }
  } else {
    while (canvas.children.length > Math.pow(size, 2)) {
      canvas.removeChild(canvas.lastChild);
    }
  }

  const tiles = document.querySelectorAll(".canvas_tile");
  tiles.forEach((tile) => {
    tile.style.width = tileSize;
    tile.style.height = tileSize;
    tile.style.backgroundColor = "rgba(223, 227, 236, 1)";
    tile.dataset.darkness = 0;
  });

  applyTileEventListeners();
};

gridSizeSlider.addEventListener("input", () => {
  gridSize.innerText = `${gridSizeSlider.value} x ${gridSizeSlider.value}`;
  createCanvas(gridSizeSlider.value);
});

colorModeBtn.addEventListener("click", () => {
  eraserBtn.classList.remove("active");
  randomModeBtn.classList.remove("active");
  progressiveDarkeningBtn.classList.remove("active");
  colorModeBtn.classList.toggle("active");
});

const getRandomColor = () => {
  const randomRed = Math.floor(Math.random() * 256);
  const randomGreen = Math.floor(Math.random() * 256);
  const randomBlue = Math.floor(Math.random() * 256);
  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
};

randomModeBtn.addEventListener("click", () => {
  eraserBtn.classList.remove("active");
  colorModeBtn.classList.remove("active");
  randomModeBtn.classList.toggle("active");
  progressiveDarkeningBtn.classList.remove("active");
});

progressiveDarkeningBtn.addEventListener("click", () => {
  eraserBtn.classList.remove("active");
  colorModeBtn.classList.remove("active");
  randomModeBtn.classList.remove("active");
  progressiveDarkeningBtn.classList.toggle("active");
});

eraserBtn.addEventListener("click", () => {
  colorModeBtn.classList.remove("active");
  eraserBtn.classList.toggle("active");
  randomModeBtn.classList.remove("active");
  progressiveDarkeningBtn.classList.remove("active");
});

clearBtn.addEventListener("click", () => {
  clearCanvas();
  colorModeBtn.classList.remove("active");
  eraserBtn.classList.remove("active");
  randomModeBtn.classList.remove("active");
  progressiveDarkeningBtn.classList.remove("active");
});

applyTileEventListeners();
