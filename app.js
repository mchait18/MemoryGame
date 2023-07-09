const gameContainer = document.getElementById("game");
let cardsFlipped = 0;
let score = 0;
let noClicking = false;
let card1 = null;
let card2 = null;
let colArray = [];
let numCards;
let lowestScore = localStorage.getItem('score');
let lowScoreHolder = document.getElementById("lowest-score");
const restartButton = document.getElementById("restart");
const startForm = document.querySelector('form');

startForm.addEventListener("submit", function (e) {
  e.preventDefault();
  numCards = document.querySelector('#num-cards');
  if (gameContainer.childElementCount === 0) {
    createDivsForColors(shuffle(randomizeColorArray(numCards.value)));
  }
}
);

restartButton.addEventListener("click", function () {
  if (cardsFlipped > 0 && cardsFlipped === colArray.length) {
    const cards = document.querySelectorAll('div');
    for (let card of cards) {
      if (card.getAttribute("id") !== "game") {
        card.remove();
      }
    }
    cardsFlipped = 0;
    score = 0;
    scoreBox = document.getElementById("score");
    scoreBox.setAttribute("placeholder", score);
    createDivsForColors(shuffle(randomizeColorArray(numCards)));
  }
});

function randomizeColorArray(numInput) {
  for (let i = 0; i < numInput / 2; i++) {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let color = `rgb(${r}, ${g}, ${b})`;
    colArray.push(color);
    colArray.push(color);
  }
  return colArray;
}
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
// this function loops over the array of colors
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  lowestScore ? lowScoreHolder.setAttribute("placeholder", lowestScore) : lowScoreHolder.setAttribute("placeholder", 0);

  for (let i = 0; i < colorArray.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.dataset.color = colorArray[i];
    newDiv.setAttribute("id", i);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  score++;
  let scoreBox = document.getElementById("score");
  scoreBox.setAttribute("placeholder", score);

  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;
  e.target.style.backgroundColor = e.target.dataset.color;

  if (!card1 || !card2) {
    e.target.classList.add("flipped");
    card1 = card1 || e.target;
    card2 = e.target === card1 ? null : e.target;
  }

  if (card1 && card2) {
    noClicking = true;
    let firstColor = card1.dataset.color;
    let secondColor = card2.dataset.color;

    if (firstColor === secondColor) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function () {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped > 0 && cardsFlipped === colArray.length) {
    setTimeout(function () { alert("Game Over!"); }, 1000);
    if (score < lowestScore || !lowestScore) {
      lowScoreHolder.setAttribute("placeholder", score);
      lowestScore = score;
      localStorage.setItem('score', score);
    }
  }
}





