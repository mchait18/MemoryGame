const gameContainer = document.getElementById("game");

function randomizeColorArray (numInput) {
   let colArray = [];
    for (let i = 0; i < numInput/2; i++){
    let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);
	let color = `rgb(${r}, ${g}, ${b})`;
  colArray.push(color);
  colArray.push(color);
  }
   return colArray;
}

function createDivsForColors(colorArray) {
const lowestScore = localStorage.getItem("score");
  const lowScoreHolder = document.getElementById("lowest-score");
  lowestScore ? lowScoreHolder.setAttribute("placeholder", lowestScore) : lowScoreHolder.setAttribute("placeholder", 0); 
  
   for (let i = 0; i < colorArray.length; i++) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.dataset.color = colorArray[i];
    //newDiv.classList.add(colorArray[i]);
    newDiv.setAttribute("id", i);   
   // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// TODO: Implement this function!
let count = 0;
let score = 0;
let firstClickedId = null
let secClickedId = null
let firstColor = '';
let secondColor = '';
function handleCardClick(event) {
count ++;
score ++;
let scoreBox = document.getElementById("score");
scoreBox.setAttribute("placeholder", score);
if (firstClickedId === event.target.id){return;}

if(event.target.style.backgroundColor === "white" || event.target.style.backgroundColor === ''){
  if (count === 1 ) {
      firstClickedId = event.target.id;
    firstColor = event.target.dataset.color;
    event.target.style.backgroundColor = firstColor;
  }
   else if (count === 2 ){ 
      secondColor = event.target.dataset.color;
      secClickedId = event.target.id;
      event.target.style.backgroundColor = secondColor;
      if (firstColor !== secondColor){ 
          setTimeout(clearCards, 1000, firstClickedId, secClickedId);       
        }
      else {//cards are same color
          if (checkGameOver()){
            const lowScore = localStorage.getItem('score');
             if (score < lowScore || !lowScore){
              localStorage.setItem('score', score);
              const lowScoreHolder = document.getElementById("lowest-score");
              lowScoreHolder.setAttribute("placeholder", score);
            }
         }          
        count = 0; 
        firstClickedId = null;
        secClickedId = null; 
      }
    }
    else{clearCards();}
  }
}

  function clearCards(firstClicked, secClicked){
    const cards = document.querySelectorAll("div");
     for (let card of cards){
      if (card.getAttribute('id') === firstClicked || card.getAttribute('id') === secClicked){
            card.style.backgroundColor = "white";
          }
      }
      count = 0;
    }


const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", function(){
  if (checkGameOver()){
    const cards = document.querySelectorAll('div');
     for (let card of cards){
        if(card.getAttribute("id") !== "game"){
          card.remove();
        }
      }    
      scoreBox = document.getElementById("score");
      scoreBox.setAttribute("placeholder", 0);
      score = 0;
      let numCards = document.querySelector('#num-cards').value;
      createDivsForColors(randomizeColorArray(numCards));
     }
});
function checkGameOver(){  
  const cards = document.querySelectorAll('div');
  let flag = true;   
  
    for(let card of cards){    
       if(card.getAttribute("id") !== "game") {
         if(card.style.backgroundColor === 'white' || !card.style.backgroundColor){
            flag = false;
         }   
     }
    }
    return flag;
}
// when the DOM loads

//let shuffledColors = shuffle(randomizeColorArray(numCards));
const startForm = document.querySelector('form');

startForm.addEventListener("submit", function(e){
    e.preventDefault();    
    let numCards = document.querySelector('#num-cards');
    if (numCards.value % 2 ===1 ){alert('Please enter an even number');
   startForm.reset();
    }
    else{
        if (gameContainer.childElementCount === 0){
      createDivsForColors(randomizeColorArray(numCards.value));}
    }
});
       
  

