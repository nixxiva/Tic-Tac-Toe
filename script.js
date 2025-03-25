let board = document.getElementById("board");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let reset = document.getElementById("reset");
let turn = document.getElementById("turn");

let gameBoard = [
//   0    1   2
    ['', '', ''],
//   3    4   5
    ['', '', ''],
//   6    7   8  
    ['', '', '']
]

let state = [];

let moves = 0;

let playerTurn1 = true;

let gameOver = false;

function createBoard() {
    for(let i = 0; i < 9; i++){
        let tictactoeGrid = document.createElement("div");
        tictactoeGrid.classList.add("tictactoeBox");
        let gridId = `box${i}`;
        tictactoeGrid.setAttribute("id", gridId);
        board.appendChild(tictactoeGrid);
        tictactoeGrid.addEventListener("click", () => {
            addMove(gridId, i);

        })

    }

}

function addMove(element, boxNumber){
    let specificGrid = document.getElementById(element);
    if(gameOver || specificGrid.textContent !== "") return;

    moves++;
    if(!specificGrid.textContent){
        if (playerTurn1) {
            specificGrid.innerText = "X";
            turn.innerText = "O's Turn";
            playerTurn1 = false;
        } else {
            specificGrid.innerText = "O";
            turn.innerText = "X's Turn";
            playerTurn1 = true;
        }
    }
    updateBoard(specificGrid, boxNumber);
}

function updateBoard(element, boxNumber){
    let row = Math.floor(boxNumber/3);
    let column = boxNumber%3;
    gameBoard[row][column] = element.innerText;
    // console.log(gameBoard);
    updateState(gameBoard);

}

function updateState(boardCopy){
    const newBoard = [];
    for(let i = 0; i < boardCopy.length; i++){
        const row = [];
        for(let j = 0; j < boardCopy[i].length; j++){
            row.push(boardCopy[i][j]);
        }
        newBoard.push(row);
    }
    
    state.push(newBoard);
    console.log(state);
    checkEndGame();
    checkNextButton();
}


function checkEndGame(){

winningCombination = [];

// horizontal
for(i = 0; i < 3; i++){
    if(gameBoard[i][0] === gameBoard[i][1] && gameBoard [i][1] === gameBoard [i][2] && gameBoard [i][2] !== '') {
        document.getElementById("result").innerText = `Player ${gameBoard[i][0]} wins!`;
        turn.style.display = "none";
        winningCombination = [`box${i * 3}`, `box${i * 3 + 1}`, `box${i * 3 + 2}`];
        highlightWinningBoxes(winningCombination);
        gameOver = true;
    
            }
        } 

// vertical
for(k = 0; k < 3; k++){
    if(gameBoard[0][k] === gameBoard[1][k] && gameBoard [1][k] === gameBoard [2][k] && gameBoard [2][k] !== '') {
        document.getElementById("result").innerText = `Player ${gameBoard[0][k]} wins!`;
        turn.style.display = "none";
        winningCombination = [`box${k}`, `box${k + 3}`, `box${k + 6}`];
        highlightWinningBoxes(winningCombination);
        gameOver = true;
        
            }
            
        }
        
// diagonal 1
if(gameBoard[0][0] === gameBoard[1][1] && gameBoard [1][1] === gameBoard [2][2] && gameBoard [2][2] !== '') {
        document.getElementById("result").innerText = `Player ${gameBoard[0][0]} wins!`;
        turn.style.display = "none";
        winningCombination = ["box0", "box4", "box8"];
        highlightWinningBoxes(winningCombination);
        gameOver = true;
        
}

// diagonal 2
if(gameBoard[0][2] === gameBoard[1][1] && gameBoard [1][1] === gameBoard [2][0] && gameBoard [2][0] !== '') {
        document.getElementById("result").innerText = `Player ${gameBoard[0][2]} wins!`;
        turn.style.display = "none";
        winningCombination = ["box2", "box4", "box6"];
        highlightWinningBoxes(winningCombination);
        gameOver = true;   
        
}

if (moves === 9) {
    document.getElementById("result").innerText = "It's a Draw!";
    document.getElementById("show").style.display = "block";
    turn.style.display = "none";
}

if(gameOver || moves === 9){
        document.getElementById("show").style.display = "block";
        prev.style.display = "inline-block";
}

}

function reflectBoard(index){
    clearWinningBoxes();
    
    let tempBoard = state[index];
    let moveString = [];
    
    for(let i = 0; i < tempBoard.length; i++){
        for(let j = 0; j < tempBoard[i].length; j++){
            moveString.push(tempBoard[i][j]);
        }
    }

    for(let grid = 0; grid < moveString.length; grid++){
        document.getElementById(`box${grid}`).textContent = moveString[grid];
    }

    checkNextButton();
    checkPrevButton();

}

function checkNextButton() {
    let nextButton = document.getElementById("next");
    
    if(state.length > 1 && moves < state.length - 1){
        nextButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "none";
    }
}

function highlightWinningBoxes(combination) {
combination.forEach((boxId) => {
    document.getElementById(boxId).classList.add("winning-box");
});

}

function clearWinningBoxes() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`box${i}`).classList.remove("winning-box");
    }
}   

prev.addEventListener("click", () => {
    if(moves >= 0) {
        moves--;
        reflectBoard(moves);
        checkNextButton();
        
    }
});

next.addEventListener("click", () => {
    if(moves < state.length - 1) {
        moves++;
        reflectBoard(moves);
        checkNextButton();
    }
})

reset.addEventListener("click", () => {
    for(let i = 0; i < 9; i++){
        document.getElementById(`box${i}`).innerText = "";
        let winningBox = document.getElementById(`box${i}`);
        winningBox.classList.remove("winning-box");
    };
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    state = [];
    moves = 0;
    playerTurn1 = true;
    gameOver = false;
    document.getElementById("show").style.display = "none";
    document.getElementById("result").innerText = "";
    turn.innerText = "X's Turn";
    turn.style.display = "block";
    checkNextButton();
    checkPrevButton();
});

createBoard();