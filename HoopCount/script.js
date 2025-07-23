// Variables to hold stats
let makes = 0;
let misses = 0;
let currentPlayer = "";

// Elements
const mainMenu = document.getElementById('main-menu');
const counterScreen = document.getElementById('counter-screen');
const playerNameInput = document.getElementById('playerName');
const startBtn = document.getElementById('startBtn');
const loadPrompt = document.getElementById('loadPrompt');
const savedPlayerNameSpan = document.getElementById('savedPlayerName');
const loadBtn = document.getElementById('loadBtn');
const newBtn = document.getElementById('newBtn');
const playerTitle = document.getElementById('playerTitle');

const makesSpan = document.getElementById('makes');
const missesSpan = document.getElementById('misses');
const attemptsSpan = document.getElementById('attempts');
const percentageSpan = document.getElementById('percentage');

// Enable start button only if input is not empty
playerNameInput.addEventListener('input', () => {
  startBtn.disabled = playerNameInput.value.trim() === "";
});

// On Start click
startBtn.addEventListener('click', () => {
  currentPlayer = playerNameInput.value.trim();
  checkSavedWorkout(currentPlayer);
});

// Check if saved workout exists for player
function checkSavedWorkout(player) {
  const saved = localStorage.getItem("hoopcount_" + player);
  if (saved) {
    savedPlayerNameSpan.textContent = player;
    loadPrompt.style.display = "block";
  } else {
    startWorkout(player, 0, 0);
  }
}

// Load saved workout button
loadBtn.addEventListener('click', () => {
  const saved = localStorage.getItem("hoopcount_" + currentPlayer);
  if (saved) {
    const data = JSON.parse(saved);
    startWorkout(currentPlayer, data.makes, data.misses);
  }
});

// New workout button
newBtn.addEventListener('click', () => {
  startWorkout(currentPlayer, 0, 0);
});

// Start the workout and show counter screen
function startWorkout(player, savedMakes, savedMisses) {
  makes = savedMakes;
  misses = savedMisses;
  mainMenu.style.display = "none";
  counterScreen.style.display = "block";
  playerTitle.textContent = `HoopCount — ${player}`;
  updateDisplay();
  loadPrompt.style.display = "none";
  startBtn.disabled = true;
  playerNameInput.value = "";
}

// Update displayed stats and FG%
function updateDisplay() {
  let attempts = makes + misses;
  makesSpan.textContent = makes;
  missesSpan.textContent = misses;
  attemptsSpan.textContent = attempts;
  let fg = attempts > 0 ? ((makes / attempts) * 100).toFixed(1) : "0.0";
  percentageSpan.textContent = fg + "%";
  saveWorkout(); // autosave on every update
}

// Add a make
function addMake() {
  makes++;
  updateDisplay();
}

// Add a miss
function addMiss() {
  misses++;
  updateDisplay();
}

// Reset stats with confirmation
function resetStats() {
  const confirmReset = confirm("Are you sure you want to reset your stats?");
  if (confirmReset) {
    makes = 0;
    misses = 0;
    updateDisplay();
  }
}

// Save current workout to localStorage
function saveWorkout() {
  if (!currentPlayer) return;
  const data = { makes, misses };
  localStorage.setItem("hoopcount_" + currentPlayer, JSON.stringify(data));
  alert("Workout saved!");
}

// Go back to main menu (with confirmation)
function backToMenu() {
  const confirmBack = confirm("Going back will reset current workout. Continue?");
  if (confirmBack) {
    makes = 0;
    misses = 0;
    updateDisplay();
    currentPlayer = "";
    counterScreen.style.display = "none";
    mainMenu.style.display = "block";
    loadPrompt.style.display = "none";
    playerNameInput.value = "";
    startBtn.disabled = true;
  }
}
