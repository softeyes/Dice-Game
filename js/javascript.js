console.log('Dice Game Commences!');

// The document.ready function was executed to use jQuery.
$(document).ready(function() {

    // Variables for function set
    var scores, collectedScore, activePlayer, gameInSession, canvas;

    // Canvas set as background
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var gradient = ctx.createLinearGradient(80, 0, 250, 0);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'silver');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1000, 700);

    // Roll dice variable set
    var dice = Math.floor(Math.random() * 6) + 1;

    // Initializes the function init() aka the game.
    init();

    // BUTTON ROLL CLICKED
    document.querySelector('.btn-roll').addEventListener('click', function() {

        //0. When game is in session, the value is TRUE.
        if (gameInSession === true) {

            //1. Random number // Explore Math ceil and Math round
            dice = Math.floor(Math.random() * 6) + 1;

            //2. Display result
            document.querySelector('.dice').style.display = 'inline';
            document.querySelector('.dice').src = 'dice-' + dice + '.png';

            //3. Update collectedScore only IF the rolled number is larger than 1.
            if (dice > 1) {

                // Add score
                collectedScore = collectedScore + dice;
                document.getElementById('collect-' + activePlayer).textContent = collectedScore;
            } else {
                nextPlayer();
            }
        }
    });

    // BUTTON HOLD CLICKED
    document.querySelector('.btn-hold').addEventListener('click', function() {

        // Hold button only works if game is in session.
        if (gameInSession === true) {

            // Add COLLECT score to GLOBAL score
            scores[activePlayer] = scores[activePlayer] + collectedScore

            // The button hold score should hold the button roll score and go into the corresponding player score
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            // Switch player - IF player 0 clicks HOLD, THEN switch to player 1
            if (scores[activePlayer] >= 50) {
                document.getElementById('name-' + activePlayer).innerHTML = document.getElementById('name-' + activePlayer).innerHTML + ' WINS!';

                // JQUERY - dice is hidden after winner is declared
                $(".dice").hide();

                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

                // Game ends and is therefore not in session.
                gameInSession = false;

                // Send this JSON to back-end when built!
                var winner = {
                    Result: document.getElementById('name-' + activePlayer).innerHTML
                }

                console.log(winner);

            } else {
                nextPlayer();
            }
        }
    });

    // NEXT PLAYER FUNCTION
    function nextPlayer() {

            // Switch player
            if (activePlayer === 1) {
            activePlayer = 2;
            collectedScore = 0;

            // document.getElementById('collect-1').textContent = '0';
            document.querySelector('#collect-1').textContent = '0';
            document.querySelector('.player-1-panel').classList.remove('active');
            document.querySelector('.player-2-panel').classList.add('active');
            document.querySelector('.dice').src = 'dice-1.png';

        } else {
            activePlayer = 1;
            collectedScore = 0;

            // document.getElementById('collect-0').textContent = '0';
            document.querySelector('#collect-2').textContent = '0';
            document.querySelector('.player-2-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.add('active');
            document.querySelector('.dice').src = 'dice-1.png';
        }
    };

    document.querySelector('.btn-new').addEventListener('click', init);

    // INITIALIZE GAME FUNCTION
    function init() {
        scores = [0, 0, 0];
        collectedScore = 0;
        activePlayer = 1;
        gameInSession = true;

        // My one bit of JQuery
        $(".dice").hide();

        document.getElementById('score-1').textContent = '0';
        document.getElementById('score-2').textContent = '0';
        document.getElementById('collect-1').textContent = '0';
        document.getElementById('collect-2').textContent = '0';

        document.getElementById('name-1').textContent = 'Player 1';
        document.getElementById('name-2').textContent = 'Player 2';

        document.querySelector('.player-1-panel').classList.remove('winner');
        document.querySelector('.player-2-panel').classList.remove('winner');

        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-2-panel').classList.remove('active');

        document.querySelector('.player-1-panel').classList.add('active');
    }
});

    // var randomizedNumber = Math.round(Math.random());
    // document.getElementById('.player-' + randomizedNumber + '-panel').classList.add('active');
    // Need to deactive the Add Points button until the dice is rolled.
    // Understand why activePlayer === 1
    // How to make edges of dice transparent but not body of dice. - alpha channel.
    // Math ceal
    // Improve HTML and CSS skills - learn how to use Flex.
