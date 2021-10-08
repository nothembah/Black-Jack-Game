let textArea = document.querySelector('.display');
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
  dealerCards: {suit: string, value: string}[] = [],
  playerCards: {suit: string, value: string}[] = [],
  dealerScore: number = 0,
  playerScore: number = 0,
  deck: {suit: string, value: string}[] = [];

newGameButton.addEventListener('click', function() {
  gameStart = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
})

function createDeck(): {suit: string, value: string}[] {
  let deck = []
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      }
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck: {suit: string, value: string}[]): void{
  for(let i = 0; i < deck.length; i++){
    let swapIdx = Math.floor(Math.random() *deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp; 
  }
}

hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function checkForEndOfGame(): void{
  updateScores();
  
  if(gameOver){
    while(dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21){
        dealerCards.push(getNextCard());
        updateScores();
    }
  }
    
    if(playerScore>21){
      playerWon=false;
      gameOver = true;
    }
    
    else if(dealerScore>21){
      playerWon = true;
      gameOver = true;
    }
    
    else if(gameOver){
      if(playerScore>dealerScore){
        playerWon = true;
      }
      else{
        playerWon = false;
      }
    }
}

function getCardString(card: {suit: string, value: string}): string {
  return card.value + " " + card.suit;
}

function getCardNumericValue(card: {suit: string, value: string}): number{
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

function showStatus(): void{
  if(!gameStart){
    textArea.innerHTML = '<h1>Welcome to Blackjack!</h1>';
    return; 
  }
  
  let dealerCardString = '';
  for(let i = 0; i < dealerCards.length; i++){
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }

  let playerCardString='';
  for(let i = 0; i < playerCards.length; i++){
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();
  
  textArea.innerHTML = 'Dealer has:\n' +
                        dealerCardString + 
                        '(score: ' + dealerScore + ')\n\n' +
                        
                        'Player has:\n' +
                        playerCardString + 
                        '(score: ' + playerScore + ')\n\n';
                        
  if(gameOver){
    if(playerWon)
    {
      textArea.innerHTML += "YOU WIN!";
    }
    else{
      textArea.innerHTML += "DEALER WINS";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    
  }
}

function getScore(cardArray: {suit: string, value: string}[]): number{
  let score: number = 0;
  let hasAce: boolean = false;

  for(let i = 0; i < cardArray.length; i++){
    let card: {suit: string, value: string} = cardArray[i];
    score += getCardNumericValue(card);
    if(card.value == 'A'){
      hasAce = true;
    }
    
    if(hasAce && score + 10 <= 21){
      return score + 10;
    }
  }
   return score; 
}

function updateScores(): void{
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards); 
}


function getNextCard(): {suit: string, value: string} {
  return deck.shift();
}