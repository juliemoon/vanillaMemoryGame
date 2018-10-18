const cardsArray = [
  { 'name': 'CSS', 'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true', },
  { 'name': 'HTML', 'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true', },
  { 'name': 'jQuery', 'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true', },
  { 'name': 'JS', 'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true', },
  { 'name': 'Node', 'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true', },
  { 'name': 'Photo Shop', 'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true', },
  { 'name': 'PHP', 'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true', },
  { 'name': 'Python', 'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true', },
  { 'name': 'Ruby', 'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true', },
  { 'name': 'Sass', 'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true', },
  { 'name': 'Sublime', 'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true', },
  { 'name': 'Wordpress', 'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true', },
];

// duplicate cardsArr and replace all instances of cardsArray with gameGrid
let gameGrid = cardsArray.concat(cardsArray);

// randomize population of cards on the board;
gameGrid.sort(() => 0.5 - Math.random())

// grab div gameboard and assign it to variable game
let game = document.getElementById('gameboard');

// create section element and assign it to varaible grid
let grid = document.createElement('section');

// give section element class of grid
grid.setAttribute('class', 'grid');

// append grid to game(gameboard div)
game.appendChild(grid);

// loop through each item in our cards array and display img
for (let i = 0; i < gameGrid.length; i++) {
  // create div assign it to card
  let card = document.createElement('div'); //create one div each time 
  // give div class of card
  card.classList.add('card');

  // create data-name attribute in div to equal cardsArray name
  card.dataset.name = gameGrid[i].name;

  // create front-view user will see
  let front = document.createElement('div');
  front.classList.add('front'); 

  // create back of the card with images
  let back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${gameGrid[i].img})`;

  // append grid (section elem)'s child card to section
  grid.appendChild(card);
  // append front and back to card
  card.appendChild(front);
  card.appendChild(back);
}

let firstGuess = '';
let secondGuess = '';

// limit user's ability to click on only two cards at a time 
let count = 0; //count needs to be outside of the eventListener or just increments to 1 no matter how many times clicked...???
let previousTarget = null;

// add Match CSS
let match = function () {
  // take all of the elements with the selected class
  let selected = document.querySelectorAll('.selected');
  for( let i = 0; i < selected.length; i++) {
    selected[i].classList.add('matched');
  }
}
// reset game function - set count, previousTarget, first/second Guess to initial state
let resetGame = function () {
  firstGuess = '';
  secondGuess = '';
  previousTarget = null;
  count = 0;

  let selected = document.querySelectorAll('.selected');
  for(let i = 0; i < selected.length; i++) {
    selected[i].classList.remove('selected');
  }
}

// add selected class on initial click
grid.addEventListener('click', (e) => {
  // target clicked item by using e.target
  let clicked = e.target;
  // work around adding blue border to anything else but the card - check the nodename clicked.nodeName
  if (clicked.nodeName !== 'DIV' || clicked === previousTarget || clicked.parentNode.classList.contains('matched') || clicked.parentNode.classList.contains('selected')) {
    return;
  }
  // only let users choose 2 cards
  if (count < 2){
    count++;
    if (count === 1) {
      // add selected class to card that was clicked
      firstGuess = clicked.dataset.name;
      clicked.classList.add('selected');
    } else {
      secondGuess = clicked.dataset.name;
      clicked.classList.add('selected')
    }
    // make sure both guesses are not empty
    if(firstGuess !== '' && secondGuess !=='') {
      if (firstGuess === secondGuess) {
        // Run the match function
        setTimeout(match,1000);
        setTimeout(resetGame,1000);
      } else {
        setTimeout(resetGame,1000);
      }
    }
    // prevent same element from being clicked twice
    // previousTarget will have selected class on it and the new clicked won't have a selected until the end. That's why previous!==clicked
    previousTarget = clicked;
  }
  // after count is 2 reset the game
});
// check to see if the two card match
// if the cards match remove image but don't remove from DOM. Need to preserve the space they occupy
// show the back of the card initially and if the guesses are correct then flip the card
