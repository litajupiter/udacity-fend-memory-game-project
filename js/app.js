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
const moveCounter = document.querySelector('.moves');
let moves = 0;
//stars
const stars = document.querySelector('.stars');
//starting with 5 stars
let numStars = 5;
//timer variables
let seconds = 0;

//win Modal
const modal = document.getElementById('winModal');
let finalMoves = document.querySelector('.num-moves');
let finalStars = document.querySelector('.num-stars');
let finalTime = document.querySelector('.modal-timer');

//timer function, stops when game is complete
function timer() {
  function countSeconds() {
    if (moves !== 0 && matched < 16) {
      seconds++
      document.querySelector('.timer').innerHTML = seconds;
    }
  } setInterval(countSeconds, 1000);
};

timer();

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
              if (openCards[0].dataset.card == openCards[1].dataset.card) {
                  //if the cards do match, lock the cards in the open position
                  cardMatch();
              } else {
                  //if the cards do not match, remove the cards from the list and hide the card's symbol
                  notAMatch();
              }
          }
      }
      //if all cards have matched, display a message with the final score
      if (matched === 16) {
        allMatched();
      }
  });
});

//if the cards do match, lock the cards in the open position
function cardMatch() {
  //add 2 to the tally of matched cards
  matched += 2;
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

//move counter and dynamic star rating
function addAMove(){
  moves++;
  moveCounter.innerHTML = moves;
  //game displays a star rating from 1 to at least 3 stars - after some number of moves, star rating lowers
  if (moves > 8 && moves < 12) {
    numStars = 4;
    stars.innerHTML = `<li class="star"><i class="fa fa-star"></i></li><li class="star"><i class="fa fa-star"></i></li><li class="star"><i class="fa fa-star"></i></li><li class="star"><i class="fa fa-star"></i></li>`;
  }
  if (moves >= 12 && moves < 20) {
    numStars = 3;
    stars.innerHTML = `<li class="star"><i class="fa fa-star"></i></li><li class="star"><i class="fa fa-star"></i></li><li class="star"><i class="fa fa-star"></i></li>`;
  }
  if (moves >= 20 && moves < 30) {
    numStars = 2;
    stars.innerHTML = `<li class="star"><i class="fa fa-star"></i></li><li class="star"><i class="fa fa-star"></i></li>`;
  }
  if (moves > 30) {
    numStars = 1;
    stars.innerHTML = `<li class="star"><i class="fa fa-star"></i></li>`;
  }
}

//if all cards have matched, display a message with the final score
function allMatched() {
  //makes modal visible
  modal.style.display = "block";
  //final number of moves
  finalMoves.innerHTML = moves;
  //final star rating
  finalStars.innerHTML = numStars;
  //final time
  finalTime.innerHTML = seconds;
}

//Get the <span> element that closes the modal
var close = document.getElementsByClassName('close')[0];

//When the user clicks on <span>(x), close the modal
close.onclick = function() {
  modal.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
