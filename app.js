var textArea = document.querySelector('.display');
var newGameButton = document.getElementById('new');
var hitButton = document.getElementById('hit');
var stayButton = document.getElementById('stand');
var suits = ['♥', '♣', '♦', '♠'];
var values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
hitButton.style.display = 'none';
stayButton.style.display = 'none';
var gameStart = false, gameOver = false, playerWon = false, dealerCards = [], playerCards = [], dealerScore = 0, playerScore = 0, deck = [];
newGameButton.addEventListener('click', function () {
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
});
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
function shuffleDeck(deck) {
    for (var i = 0; i < deck.length; i++) {
        var swapIdx = Math.floor(Math.random() * deck.length);
        var tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}
hitButton.addEventListener('click', function () {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});
stayButton.addEventListener('click', function () {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});
function checkForEndOfGame() {
    updateScores();
    if (gameOver) {
        while (dealerScore < playerScore && playerScore <= 21 && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }
    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }
    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }
    else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
        }
        else {
            playerWon = false;
        }
    }
}
function getCardString(card) {
    return card.value + " " + card.suit;
}
function getCardNumericValue(card) {
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
function showStatus() {
    if (!gameStart) {
        textArea.innerHTML = '<h1>Welcome to Blackjack!</h1>';
        return;
    }
    var dealerCardString = '';
    for (var i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }
    var playerCardString = '';
    for (var i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
    }
    updateScores();
    textArea.innerHTML = 'Dealer has:\n' +
        dealerCardString +
        '(score: ' + dealerScore + ')\n\n' +
        'Player has:\n' +
        playerCardString +
        '(score: ' + playerScore + ')\n\n';
    if (gameOver) {
        if (playerWon) {
            textArea.innerHTML += "YOU WIN!";
        }
        else {
            textArea.innerHTML += "DEALER WINS";
        }
        newGameButton.style.display = 'inline';
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }
}
function getScore(cardArray) {
    var score = 0;
    var hasAce = false;
    for (var i = 0; i < cardArray.length; i++) {
        var card = cardArray[i];
        score += getCardNumericValue(card);
        if (card.value == 'A') {
            hasAce = true;
        }
        if (hasAce && score + 10 <= 21) {
            return score + 10;
        }
    }
    return score;
}
function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}
function getNextCard() {
    return deck.shift();
}
