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

// loop through array and display img
for (let i = 0; i < gameGrid.length; i++) {
  // create div assign it to card
  let card = document.createElement('div'); //create one div each time 
  // give div class of card
  card.classList.add('card');

  // create data-name attribute in div to equal cardsArray name
  card.dataset.name = gameGrid[i].name;

  // set div's background img to be cardsArray img
  card.style.backgroundImage = `url(${gameGrid[i].img})`;
  // append div to grid sectio
  grid.appendChild(card);
}

let firstGuess = '';
let secondGuess = '';

// limit user's ability to click on only two cards at a time 
let count = 0; //count needs to be outside of the eventListener or just increments to 1 no matter how many times clicked...???

let addMatchCss = function () {
  console.log(`inside of matchedCss`)
  //grab all the elems with selected class
  let selected = document.querySelectorAll('.selected');
  for(let i = 0; i < selected.length; i++) {
    selected[i].classList.add('matched')
  }
}

// add match css
let match = function (){
 firstGuess === secondGuess ? addMatchCss() : console.log(`not a match`)
  count = 0;
}

// add selected class on initial click
grid.addEventListener('click', (e) => {
  // target clicked item by using e.target
  var clicked = e.target;

  // work around adding blue border to anything else but the card - check the nodename clicked.nodeName
  if (clicked.nodeName !== 'DIV') {
    return;
  }
  // only let users choose 2 cards
  if (count < 2){
    // debugger;
    count++;
    if (count === 1) {
      // add selected class to card that was clicked
      clicked.classList.add('selected');
      firstGuess = clicked.dataset.name;
    }else if( count === 2 ){
      clicked.classList.add('selected')
      secondGuess = clicked.dataset.name;
      match();
    }
  }
});

// check to see if the two card match
// if the cards match remove image but don't remove from DOM. Need to preserve the space they occupy

