var start = document.querySelector('#new');
var hit = document.querySelector('#hit');
var end = document.querySelector('#stand');
var playerCards = document.querySelector('.player');
var dealerCards = document.querySelector('.dealer');
function startGame() {
}
function produceCard() {
    var num = Math.ceil(Math.random() * 13);
    var suit = Math.ceil(Math.random() * 4);
    var cardNum;
    var cardSuit;
    var arr = [];
    var card;
    switch (num) {
        case 1:
            cardNum = 'A';
            break;
        case 2:
            cardNum = '2';
            break;
        case 3:
            cardNum = '3';
            break;
        case 4:
            cardNum = '4';
            break;
        case 5:
            cardNum = '5';
            break;
        case 6:
            cardNum = '6';
            break;
        case 7:
            cardNum = '7';
            break;
        case 8:
            cardNum = '8';
            break;
        case 9:
            cardNum = '9';
            break;
        case 10:
            cardNum = '10';
            break;
        case 11:
            cardNum = 'J';
            break;
        case 12:
            cardNum = 'Q';
            break;
        case 13:
            cardNum = 'K';
            break;
    }
    switch (suit) {
        case 1:
            cardSuit = '♥';
            break;
        case 2:
            cardSuit = '♦';
            break;
        case 3:
            cardSuit = '♠';
            break;
        case 4:
            cardSuit = '♣';
            break;
    }
    arr.push(cardNum);
    arr.push(cardSuit);
    card = arr.join();
    calculate(card);
    return card;
}
function hitButton() {
    var card = produceCard();
    playerCards.innerHTML += "<h2>" + card + "</h2>";
}
function standButton() {
}
function calculate(card) {
    var decider = card[0];
    switch (decider) {
        case 'A':
            counter++;
            break;
        case '2':
            counter += 2;
            break;
        case '3':
            counter += 3;
            break;
        case '4':
            counter += 4;
            break;
        case '5':
            counter += 5;
            break;
        case '6':
            counter += 6;
            break;
        case '7':
            counter += 7;
            break;
        case '8':
            counter += 8;
            break;
        case '9':
            counter += 9;
            break;
        case '10':
            counter += 10;
            break;
        case 'J':
            counter += 10;
            break;
        case 'Q':
            counter += 10;
            break;
        case 'K':
            counter += 10;
            break;
    }
    return counter;
}
function display(counter) {
}
var counter = 0;
