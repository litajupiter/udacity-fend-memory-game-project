//list of all cards
const allCards = ['fa-diamond', 'fa-diamond',
               'fa-paper-plane-o', 'fa-paper-plane-o',
               'fa-anchor', 'fa-anchor',
               'fa-bolt', 'fa-bolt',
               'fa-cube', 'fa-cube',
               'fa-leaf', 'fa-leaf',
               'fa-bicycle', 'fa-bicycle',
               'fa-bomb', 'fa-bomb'
              ];
//track cards that have been flipped open
let openCards = [];
//track number of cards that have been matched
let matched = 0;
//moves variables
let moveCounter = document.querySelector('.moves');
let moves = 0;
//stars
let allStars = document.querySelectorAll('ul.stars li');
//timer variables
const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
let totalSeconds = 0;

setInterval(setTime, 1000);

// count up timer modified from https://stackoverflow.com/a/5517836/9613093
function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//loop through each card and create its HTML
 function makeCard(card) {
     return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
 }

//shuffles and generates cards
function newGame() {
    let deck = document.querySelector('.deck');
    //shuffle the list of cards using the provided "shuffle" method
    let cardGrid = shuffle(allCards).map(function(card) {
        //loop through each card and create its HTML
        return makeCard(card);
    });
    //add each card's HTML to the page
    deck.innerHTML = cardGrid.join('');
}

//starts new game and shuffles cards
newGame();

//set up the event listener for a card. If a card is clicked:
const cards = document.querySelectorAll('.card');

cards.forEach(function(card) {
  card.addEventListener('click', function(event) {
      //display the card's symbol
      if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
          //add the card to a *list* of "open" cards
          openCards.push(card);
          card.classList.add('open', 'show');
          //if the list already has another card, check to see if the two cards match
          if (openCards.length == 2) {
              //increment the move counter and display it on the page
              addAMove();
              //moves++;//works in console.log, need to populate .moves span
              console.log(moves);
              //if the cards do match, lock the cards in the open position
              if (openCards[0].dataset.card == openCards[1].dataset.card) {
                  //if the cards do match, lock the cards in the open position
                  cardMatch();
              } else {
                  //if the cards do not match, remove the cards from the list and hide the card's symbol
                  notAMatch();
              }
          }
      }
  });
});

//if the cards do match, lock the cards in the open position
function cardMatch() {
  //add 2 to the tally of matched cards
  matched += 2;
  console.log(`you have matched ${matched} cards`);
  openCards[0].classList.add('match');
  openCards[0].classList.add('open');
  openCards[0].classList.add('show');

  openCards[1].classList.add('match');
  openCards[1].classList.add('open');
  openCards[1].classList.add('show');
  //empty array
  openCards = [];
}

//if the cards do not match, remove the cards from the list and hide the card's symbol
function notAMatch() {
  //flip back over after half a second
  setTimeout(function() {
    openCards.forEach(function(card) {
      card.classList.remove('open', 'show');
    });
    //empty array
    openCards = [];
  }, 500);
}

//move counter
function addAMove(){
  moves++;
  moveCounter.innerHTML = moves;
}


//if all cards have matched, display a message with the final score



//game displays a star rating from 1 to at least 3 stars - after some number of moves, star rating lowers
function

//code below from w3schools how to make a modal box -- needs edited
//Get the modal
var modal = document.getElementById('winModal');

//Get the button that opens the modal
var btn = document.getElementById('myBtn');

//Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

//When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

//When the user clicks on <span>(x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
