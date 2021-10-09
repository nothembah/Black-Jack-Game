export{}

const suits = ['spades', 'hearts', 'diamonds', 'clubs']  
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = new Array();

function stackOfCards()
{
    deck = new Array();
    for (let i: number= 0 ; i < values.length; i++)
    {    //loop to iterate through the length of the values array
        for(let x: number = 0; x < suits.length; x++)
        {  //loop to iterate through the length of the suits array

            let points = parseInt(values[i]);       // a variable that makes the value index an integer

                if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                    points = 10;
                if (values[i] == "A")
                    points = 11 || 1;
                let card = { Value: values[i], Suit: suits[x], Points: points };
                deck.push(card);            //pushes a new card to the empty array
        }
    }
}


/* shuffle the cards to allocate cards to the dealer and the player */

function shuffle()
    {
        for (var i = 0; i < 1000; i++)   // for 1000 turns
                                        // switch the values of two random cards
        {
            let location1 = Math.floor((Math.random() * deck.length)); //randomly shuffles the cards on location1
            let location2 = Math.floor((Math.random() * deck.length));  //randomly shuffles the cards on location1
            let temp = deck[location1];             //swap  
            deck[location1] = deck[location2];
            deck[location2] = temp;
        }
    }


//the cards that the players already have 

let players = new Array();
    function createPlayers(num: number)
    {
        players = new Array();

        for(let i = 1; i <= num; i++)
        {
            let hand = new Array();

            let player = { 
            Name: 'Player ' + i, 
            ID: i,
            Points: 0,
            Hand: hand };

            players.push(player);
        }
    }




//render a card that 
    function renderCard(card, player)
    {
        
    }



//Deal the current cards that the player has 

function dealHands()
    {
        // alternate handing cards to each player
        // 2 cards each
        for(var i = 0; i < 2; i++)
        {
            for (var x = 0; x < players.length; x++)
            {
                var card = deck.pop();
                players[x].Hand.push(card);
                renderCard(card, x);
                updatePoints();
            }
        }

        updateDeck();
    }



    // let gameStart = false,
//   gameOver = false,
//   playWon = false,
//   dealerCards = [],
//   playerCards = [],
//   dealerScore = 0,
//   playerScore = 0;
// //   deck = [];


// function startGame(){ 
//     start.addEventListener('click', function() {
//         gameStart = true;
//         gameOver = false;
//         playerWon = false;

// }
