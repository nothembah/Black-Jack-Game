//selects html attributes
var dealer = document.querySelector('.dealer');
var player = document.querySelector('.player');
var winner = document.querySelector('.winner');
var newGameButton = document.getElementById('new');
var hitButton = document.getElementById('hit');
var standButton = document.getElementById('stand');
var dealerCardImg = document.querySelector('.dealerImg');
var playerCardImg = document.querySelector('.playerImg');
//define posible card suits and values
var suits = ['♥', '♣', '♦', '♠'];
var values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
//hides hit and stand button
hitButton.style.display = 'none';
standButton.style.display = 'none';
//declare global variables
var gameStart = false, gameOver = false, playerWon = false, dealerWon = false, dealerCards = [], playerCards = [], dealerScore = 0, playerScore = 0, deck = [], hiddenCardValue, hiddenCardSuit;
//creates array of all cards
function createDeck() {
    var deck = [];
    for (var suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (var valueIdx = 0; valueIdx < values.length; valueIdx++) {
            var card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
            deck.push(card);
        }
    }
    return deck;
}
//swaps card array index for random shuffle
function shuffleDeck(deck) {
    for (var i = 0; i < deck.length; i++) {
        var swapIdx = Math.floor(Math.random() * deck.length); //random index
        var tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}
//checks if game has reached its end
function checkForEndOfGame() {
    updateScores();
    if (gameOver) {
        while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(produceCard());
            updateScores();
        }
    }
    if (playerScore == 21 && dealerScore < 21) {
        playerWon = true;
        dealerWon = false;
        gameOver = true;
    }
    else if (playerScore > 21) {
        playerWon = false;
        dealerWon = true;
        gameOver = true;
    }
    else if (dealerScore > 21) {
        playerWon = true;
        dealerWon = false;
        gameOver = true;
    }
    else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
            dealerWon = false;
        }
        else if (playerScore === dealerScore) {
            playerWon = true;
            dealerWon = true;
        }
        else {
            playerWon = false;
            dealerWon = true;
        }
    }
    updateScores();
}
//gets card string for display
function getCard(card) {
    if (gameOver == false) {
        dealerCards[0].value = "HIDDEN";
        dealerCards[0].suit = "";
    }
    return card.value + " " + card.suit;
}
//Gets weight of card
function getCardValue(card) {
    switch (card.value) {
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
//displays current cards, score and game result
function showStatus() {
    var dealerCardString = '';
    for (var i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCard(dealerCards[i]) + ' ';
    }
    var playerCardString = '';
    for (var i = 0; i < playerCards.length; i++) {
        playerCardString += getCard(playerCards[i]) + ' ';
    }
    dealerCardImg.innerHTML = '';
    playerCardImg.innerHTML = '';
    updateScores();
    //shows current score of the dealer and player and displays cards
    dealer.innerHTML = 'DEALER: ' + dealerCardString + '(score: ' + dealerScore + ')';
    for (var j = 0; j < dealerCards.length; j++) {
        if (gameOver == false && j == 0) {
            dealerCardImg.innerHTML += "<img src='images/" + dealerCards[j].value + ".png'>";
            continue;
        }
        dealerCardImg.innerHTML += "<img src='images/" + dealerCards[j].value + " " + dealerCards[j].suit + ".png'>";
    }
    player.innerHTML = 'PLAYER: ' + playerCardString + '(score: ' + playerScore + ')';
    for (var j = 0; j < playerCards.length; j++) {
        playerCardImg.innerHTML += "<img src='images/" + playerCards[j].value + " " + playerCards[j].suit + ".png'>";
    }
    //At gameOver displays winner and draw
    if (gameOver) {
        if (playerWon == true && dealerWon == false) {
            winner.innerHTML = "YOU WIN!";
        }
        else if (playerWon == true && dealerWon == true) {
            winner.innerHTML = "DRAW!";
        }
        else {
            winner.innerHTML = "DEALER WINS!";
        }
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        standButton.style.display = 'none';
    }
}
//calculate score of respective card array
function getScore(cardArray) {
    var score = 0;
    var hasAce = false;
    for (var i = 0; i < cardArray.length; i++) {
        var card = cardArray[i];
        score += getCardValue(card);
        if (card.value == 'A') {
            hasAce = true;
        }
        if (hasAce && score + 10 <= 21) {
            score += 10;
        }
    }
    return score;
}
//gets score of the dealer and player 
function updateScores() {
    if (gameOver == true) {
        dealerCards[0].value = hiddenCardValue;
        dealerCards[0].suit = hiddenCardSuit;
        dealerScore = getScore(dealerCards);
    }
    else {
        dealerScore = getScore([dealerCards[1]]);
    }
    playerScore = getScore(playerCards);
}
//adds a new card
function produceCard() {
    return deck.shift();
}
//event listeners for buttons 
newGameButton.addEventListener('click', function () {
    gameStart = true; //Start of the game 
    gameOver = false;
    playerWon = false;
    dealerWon = false;
    winner.innerHTML = '';
    dealerCardImg.innerHTML = '';
    playerCardImg.innerHTML = '';
    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [produceCard(), produceCard()];
    playerCards = [produceCard(), produceCard()];
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    standButton.style.display = 'inline';
    hiddenCardValue = dealerCards[0].value;
    hiddenCardSuit = dealerCards[0].suit;
    checkForEndOfGame();
    showStatus();
});
hitButton.addEventListener('click', function () {
    playerCards.push(produceCard());
    checkForEndOfGame();
    showStatus();
});
standButton.addEventListener('click', function () {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});
