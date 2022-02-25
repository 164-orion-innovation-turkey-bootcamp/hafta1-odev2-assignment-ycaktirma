let turn='X';
//Tile elements
let gameTiles=[
    [],
    [],
    []
];
let winText;
let winConditions = [
    //Horizontal
    [ 0,1,2 ],
    [ 3,4,5 ],
    [ 6,7,8 ],

    //Vertical
    [ 0,3,6 ],
    [ 1,4,7 ],
    [ 2,5,8 ],

    //Diagonal
    [ 0,4,8 ],
    [ 2,4,6 ],
];

//Initialize move history.
let moveHistory = new Map();
moveHistory.set('X',[])
moveHistory.set('O',[]);
const config={
    size:9
};
let winner = '';
let gameOver = false;
let infoText;

function init(){
    //Get the tile elements
    gameTiles = Array.from(document.querySelectorAll('.game-container .game-tile'));
    winText = document.getElementById('winner-text');

    //Assign this function to tiles' click event.
    for(let i=0; i<config.size; i++){
        gameTiles[i].addEventListener('click',()=>{
            moveHistory.get(turn).push(i);
            move(gameTiles[i]);
            
        });
    }

    //Restart button click event
    document.getElementById('restart-button').addEventListener('click',reset);

    //Information text
    document.getElementById('info-text-element').innerHTML = `Player ${turn} is playing...`;

}

function reset(){
    gameOver = false;

    //Empty the tiles.
    gameTiles.forEach(tile=>{
        tile.querySelector('.x-o').innerHTML = '';
    });
    //Reset winner
    winner = '';

    //Reset win text
    winText.innerHTML = '-';
    //Turn is x's when the game begins.
    turn = 'X';

    //Reset Move History
    moveHistory.set('X',[])
    moveHistory.set('O',[]);

    //Reset information text
    document.getElementById('info-text-element').innerHTML = `Player ${turn} is playing...`;
}
function move(tile){

    let content = tile.querySelector('.x-o').innerHTML;

    //Check if the player can make a move here.
    if(content != '' || winner !='' ){
        return;
    }
    tile.querySelector('.x-o').innerHTML = turn;
    checkWinner(turn);
    changeTurn();
}

function changeTurn(){
    turn = (turn ==='X' ) ? 'O':'X';
    document.getElementById('info-text-element').innerHTML = `Player ${turn} is playing...`;
}

function checkWinner(turn){
    let moveHistoryForCurrentPlayer =  moveHistory.get(turn);

    //There should be minimum of three moves to win.
    if(moveHistoryForCurrentPlayer.length < 3){
        return;
    }    

    //Check if players movement history has a win condition.
    winConditions.forEach(condition=>{
        if( condition.every(element => moveHistoryForCurrentPlayer.includes(element)) ){ //https://www.designcise.com/web/tutorial/how-to-check-if-an-array-contains-all-elements-of-another-array-in-javascript
            win(turn);
            return;
        }
    });

    //Draw
    if(moveHistory.get('X').length + moveHistory.get('O').length  == 9){
        winText.innerHTML = 'DRAW!';
        
        return;
    }   
}
function win(turn){
    winner = turn;
    winText.innerHTML = winner + ', won !';
    gameOver = true;
}

//Run
window.addEventListener('DOMContentLoaded',()=>{
    init();
})
