/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

console.log('Dice Game Commences!');

var scores, roundScore, activePlayer;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display result
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice').src = 'dice-' + dice + '.png';

    //3. Update roundScore only IF the rolled number is NOT a 1.
    if (dice > 1) {
        //Add score
        roundScore = roundScore + dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
        // HOW TO MAKE DEACTIVATE THE HOLD BUTTON WHEN DICE 1 IS ROLLED?
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] = scores[activePlayer] + roundScore
    // The button hold score should hold the button roll score and go into the corresponding player score
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    // Switch player - IF player 0 clicks HOLD, THEN switch to player 1

    if (scores[activePlayer] >= 10) {
        document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
        console.log('Player wins!');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    } else {
        nextPlayer();
    }

});

function nextPlayer() {
    //Switch player
    // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    if (activePlayer === 0) {
        activePlayer = 1;
        roundScore = 0;
        document.querySelector('#current-0').textContent = '0';
        // document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.dice').src = 'dice-1.png';

    } else {
        activePlayer = 0;
        roundScore = 0;
        // document.getElementById('current-0').textContent = '0';
        document.querySelector('#current-1').textContent = '0';
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.dice').src = 'dice-1.png';
    }
};

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}


// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

// function button (){

// }