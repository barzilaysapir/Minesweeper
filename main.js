let board = document.querySelector(".board");
let dangerSquaresIds = [];
let boardSquares;
let progress = 0;

function createAllSquares() {

    for (let i = 0; i < 100; i++) {
        let square = document.createElement("button");
        square.setAttribute("class", "board-squares");
        square.setAttribute("id", i);
        board.append(square);

        square.addEventListener("click", (e) => {
            handleSquareClicked(e.target);
        });
    }

    boardSquares = document.querySelectorAll(".board-squares");

    markDangerSquares();
}

function markDangerSquares() {
    for (let i = 0; i < 10; i++) {
        let squareId = Math.floor(Math.random() * 100);

        while (dangerSquaresIds.includes(squareId)) {
            squareId = Math.floor(Math.random() * 100);
        }

        dangerSquaresIds.push(squareId);
        document.getElementById(squareId).classList.add("danger");
    }
}

function handleSquareClicked(clickedSquare) {
    clickedSquare = document.getElementById(clickedSquare.id);
    clickedSquare.disabled = true;

    // Failing
    if (clickedSquare.classList.contains("danger")) {
        for (let button of boardSquares) {
            button.style.backgroundColor = "brown";
            button.disabled = true;
        }

        setTimeout(() => {
            alert("Game Over");
        }, 300);
    }

    else if (progress < 89) {
        progress++;
        clickedSquare.style.backgroundColor = "lightgreen";
    }

    // Winning
    else {
        for (let button of boardSquares) {
            button.style.backgroundColor = "lightgreen";
            button.disabled = true;
        }

        setTimeout(() => {
            alert("You Won!");
        }, 300);
    }
}

function resetBoard() {
    progress = 0;

    for (let square of dangerSquaresIds) {
        let currentSquare = document.getElementById(square);
        currentSquare.classList.remove("danger");
    }

    markDangerSquares();

    for (let button of boardSquares) {
        button.style.backgroundColor = "white";
        button.disabled = false;
    }
}
