export{}

<<<<<<< HEAD 
======= 
let textArea = document.querySelector('.display');
let dealer = document.querySelector('.dealer');
let player = document.querySelector('.player');
let winner = document.querySelector('.winner');
let newGameButton = document.getElementById('new');
let hitButton = document.getElementById('hit');
let stayButton = document.getElementById('stand');

let suits: string[] = ['♥', '♣', '♦', '♠'];    
let values: string[] = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

hitButton.style.display = 'none';
stayButton.style.display = 'none';

let gameStart = false,
gameOver: boolean = false,
playerWon: boolean = false,
dealerWon: boolean = false,
dealerCards: {suit: string, value: string}[] = [],
playerCards: {suit: string, value: string}[] = [],
dealerScore: number = 0,
playerScore: number = 0,
deck: {suit: string, value: string}[] = [],
hiddenCardValue: string,
hiddenCardSuit: string;



newGameButton.addEventListener('click', function() {        //creates a click event for a mew game button
    gameStart = true;           //Start of the game 
    gameOver = false;
    playerWon = false;
    dealerWon = false;
    winner.innerHTML = '';

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [produceCard(), produceCard()];
    playerCards = [produceCard(), produceCard()];
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    hiddenCardValue = dealerCards[0].value;
    hiddenCardSuit = dealerCards[0].suit;
    console.log(hiddenCardValue);
    console.log(hiddenCardSuit);
    checkForEndOfGame();
    showStatus();
})


//[A]- create the card deck

function createDeck(): {suit: string, value: string}[] {
  let deck = []
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {        // for loop to iterate through the suit array index 
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {  // for loop to iterate through the values array index 
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      }
      deck.push(card);          //adds values to an empty array
    }
  }
  return deck;
}


//[B] - shuffle the deck


function shuffleDeck(deck: {suit: string, value: string}[]): void{
  for(let i = 0; i < deck.length; i++){                         //for turns less than the length of the string length
    // switch the values of two random cards
    let swapIdx = Math.floor(Math.random() *deck.length);       //random number generator of two random cards 
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp; 
  }
}



//[C] - check for end of Game and update the score 

function checkForEndOfGame(): void{
  updateScores();
   //check if there is a winner by comparing the current hand of the players and update score 
  if(gameOver){
    while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21){
        dealerCards.push(produceCard());
        updateScores();
    }
  }
//evaluate score to end game 
    if(playerScore == 21 && dealerScore < 21)
    {
      playerWon = true;
      dealerWon = false;
      gameOver = true;
    } else if(playerScore > 21) {
      playerWon = false;
      dealerWon = true;
      gameOver = true;
    } else if(dealerScore > 21) {
      playerWon = true;
      dealerWon = false;
      gameOver = true;
    } else if(gameOver) {       

      if(playerScore > dealerScore){
        playerWon = true;
        dealerWon = false;
      }
      else if(playerScore === dealerScore){
        playerWon = true;
        dealerWon = true;
      } else {
          playerWon = false;
          dealerWon = true;
      }
    }

    updateScores();
}

//[D]

// Shows hidden for the second card value of the dealer
function getCard(card: {suit: string, value: string}): string {

  if(gameOver == false){
    dealerCards[0].value = "HIDDEN";
    dealerCards[0].suit = "";
  }

  return card.value + " " + card.suit;
}

//switch statement for the weight of card values

function getCardValue(card: {suit: string, value: string}): number{
  switch(card.value){
    case 'A':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    default:
      return 10; 
  }
}

//[E]- Displays current hand of the dealer and player 

function showStatus(): void{

  let dealerCardString = '';
  for(let i = 0; i < dealerCards.length; i++){
    dealerCardString += getCard(dealerCards[i]) + ' ';
  }

  let playerCardString='';
  for(let i = 0; i < playerCards.length; i++){
    playerCardString += getCard(playerCards[i]) + ' ';
  }
  
  updateScores();

  //shows current score of the dealer and player
  dealer.innerHTML = 'DEALER: ' + dealerCardString + '(score: ' + dealerScore + ')'; //shows dealer score
                        
  player.innerHTML = 'PLAYER: ' + playerCardString + '(score: ' + playerScore + ')';//shows players score 
        
  

  //[F]- At gameOver displays winner and draw

  if(gameOver){
    if(playerWon == true && dealerWon == false){
      winner.innerHTML = "YOU WIN!";
    } else if(playerWon == true && dealerWon == true){
      winner.innerHTML = "DRAW!"
    }
    else {
      winner.innerHTML = "DEALER WINS!";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    
  }
}



//[G]-gets score of the dealer and player 

function getScore(cardArray: {suit: string, value: string}[]): number{
  let score: number = 0;
  let hasAce: boolean = false;

  for(let i = 0; i < cardArray.length; i++){
    let card: {suit: string, value: string} = cardArray[i];
    score += getCardValue(card);
    //The ace is evaluated at the end of the game to check to choose winner 
    if(card.value == 'A'){
      hasAce = true;
    }
    
    if(hasAce && score + 10 <= 21){  //if 'A'= true and value of score of the player or dealer is less than 21
      score += 10;                      // 10 is added to score i.e 'A' = 10
    }
  }
   return score; 
}


//[H] -

function updateScores(): void{              //updates the score of the game when game is over
  if(gameOver == true){
      //shows hidden card of the dealer
      dealerCards[0].value = hiddenCardValue;
      dealerCards[0].suit = hiddenCardSuit;
      dealerScore = getScore(dealerCards);
  } else {
      dealerScore = getScore([dealerCards[1]]);
  }
  playerScore = getScore(playerCards);

  console.log(dealerCards);
}


//adds a new card

function produceCard(): {suit: string, value: string} {
  return deck.shift();
}


//event listeners for the hit and stay button 

hitButton.addEventListener('click', function(){
    playerCards.push(produceCard());
    checkForEndOfGame();
    showStatus();
});
  
stayButton.addEventListener('click', function(){
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});
>>>>>>> 3c9569fc2f18d6287afc5591d2ef6e64584827f8
