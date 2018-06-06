//global variables
const cards = ['fa-diamond', 'fa-diamond',
               'fa-paper-plane-o', 'fa-paper-plane-o',
               'fa-anchor', 'fa-anchor',
               'fa-bolt', 'fa-bolt',
               'fa-cube', 'fa-cube',
               'fa-leaf', 'fa-leaf',
               'fa-bicycle', 'fa-bicycle',
               'fa-bomb', 'fa-bomb'
              ];

let openCards = [];
let matchedCards = [];
let movesCounter = 0;

// count up timer modified from https://stackoverflow.com/a/5517836/9613093
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

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

//Dynamically generates cards
 function generateCard(card) {
     return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
 }

//shuffles and generates cards
function startGame() {
    let deck = document.querySelector('.deck');
    //shuffle the list of cards using the provided "shuffle" method
    let cardHTML = shuffle(cards).map(function(card) {
        //loop through each card and create its HTML
        return generateCard(card);
    });
    //add each card's HTML to the page
    deck.innerHTML = cardHTML.join('');
}

//starts game
startGame();

const allCards = document.querySelectorAll('.card');

allCards.forEach(function(card) {
  card.addEventListener('click', function(event) {
      //display the card's symbol
      if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
          //add the card to a *list* of "open" cards
          openCards.push(card);
          card.classList.add('open', 'show');
          //if the list already has another card, check to see if the two cards match
          if (openCards.length == 2) {
              //increment the move counter and display it on the page
              movesCounter++;//works in console.log, need to populate .moves span
              console.log(movesCounter);
              //if the cards do match, lock the cards in the open position
              if (openCards[0].dataset.card == openCards[1].dataset.card) {
                  console.log('This is a match!');
                  openCards[0].classList.add('match');
                  openCards[0].classList.add('open');
                  openCards[0].classList.add('show');

                  openCards[1].classList.add('match');
                  openCards[1].classList.add('open');
                  openCards[1].classList.add('show');

                  openCards = [];
              } else {
                  //if the cards do not match, remove the cards from the list and hide the card's symbol
                  setTimeout(function() {
                    openCards.forEach(function(card) {
                        card.classList.remove('open', 'show');
                    });
                    openCards = [];
                  }, 500);
              }
          }
      }
  });
});
//if all cards have matched, display a message with the final score
