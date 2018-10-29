//2D array containing 8 arrays meant to represent the ids present on the board.
let spacearray = [[], [], [], [], [], [], [], []];
//array for storing the id's of the ship pieces.
let shipidarray = [];
//array for storing the id's of the non-ship pieces.
let idarray = [];

//Variables for determining the win state of the game.
let turncount = 25;
let shipsclicked = 0;
let difficulty = localStorage.difficulty;

//document.addEventListener used for building the spacearray and the h2 text.
document.addEventListener("DOMContentLoaded", event => {
    let h2 = document.getElementById("textarea");
    let newtext = document.createTextNode(`Remaining Turns: ${turncount}`)
    let board = document.getElementsByClassName("green");
    let currentid;
    let newcurrentspace;
    idarray = [board.length];
    let count = 0;

    h2.appendChild(newtext);
    for (let i = 0; i < board.length; i++) {
        currentid = board[i];
        newcurrentspace = currentid.id;
        idarray[i] = newcurrentspace;
    }
    // console.log(idarray);
    for (let i = 0; i < board.length / 8; i++) {
        for (let j = 0; j < board.length / 8; j++) {
            spacearray[i][j] = idarray[count];
            count++;
        }
    }

})

//Places the ships and non-ships on the board based on the difficulty from the setup screen.
function setupDifficulty(difficulty) {
    if (difficulty === "Easy") {
        placeShipsArray(5, "Vertical");
        placeShipsArray(5, "Horizontal");
        placeShips();
        placeNonShips();
        console.log(shipidarray);
    }

    if (difficulty === "Intermediate") {
        placeShipsArray(2, "Vertical");
        placeShipsArray(3, "Horizontal");
        placeShipsArray(4, "Vertical");
        placeShips();
        placeNonShips();
        console.log(shipidarray);
    }

    if (difficulty === "Hard") {
        placeShipsArray(2, "Vertical");
        placeShipsArray(3, "Horizontal");
        placeShipsArray(4, "Horizontal");
        placeShipsArray(5, "Vertical");
        placeShips();
        placeNonShips();
        console.log(shipidarray);
    }
}

//This function handles the changing of the h2 containing the turncount text, the win text,
//and the lose text. It also sends the user back to the setup screen once they win or lose.
function changeTurnCount(turns) {

    let table = document.getElementById("table");
    if (table.style.display == "none") {
        table.style.display = "block";
    }
    let h2 = document.getElementById("textarea");
    let h2child = h2.childNodes[0];
    let newtext = document.createTextNode(`Remaining Turns: ${turns}`)
    let losetext = document.createTextNode("You Lose");
    let wintext = document.createTextNode("You Win!");

    if (turncount > 0) {
        h2.replaceChild(newtext, h2child);
    }

    if (shipsclicked === shipidarray.length) {
        h2.replaceChild(wintext, h2child);
        table.style.display = "none";
        setTimeout(function () {
            window.location.replace("setup.html");
        }, 3000);
    }

    if (turncount === 0 && shipsclicked !== shipidarray.lenth) {
        h2.replaceChild(losetext, h2child);
        table.style.display = "none";
        setTimeout(function () {
            window.location.replace("setup.html");
        }, 3000);
    }
}


//Builds the ship array using randomly generated numbers.
//If a value in one of the ships were to overlap with another,
//That ship would be regenerated.
//Places the ships based on size and orientation. 
function placeShipsArray(size, orientation) {

    if (orientation === "Horizontal") {
        //two random x and y values
        let randomx = Math.floor(Math.random() * (8 - size));
        let randomy = Math.floor(Math.random() * (8));

        //adds the ship id's to the shipidarray and checks if the current
        //ship can fit in the shipidarray. If not, it pops the current ship id's that
        //have been placed in the array and resets the loop to try again and resets the 
        //randomx and randomy values.
        document.addEventListener("DOMContentLoaded", event => {
            for (let i = 0; i < size; i++) {
                if (randomx + i <= 7) {
                    let shipid = `${randomx + i} ${randomy}`;
                    if (shipidarray.includes(shipid) == false) {
                        shipidarray.push(shipid);
                    } else {
                        shipidarray.push(shipid);
                        console.log(shipidarray);
                        for (i; i >= 0; i--) {
                            shipidarray.pop();
                        }
                        console.log(shipidarray);
                        i = -1;
                        randomx = Math.floor(Math.random() * (8 - size));
                        randomy = Math.floor(Math.random() * 8);
                        console.log("can't be placed on creep");
                    }
                } else {
                    for (i; i >= 0; i--) {
                        shipidarray.pop();
                    }
                    i = -1;
                    randomx = Math.floor(Math.random() * (8 - size));
                    randomy = Math.floor(Math.random() * 8);
                    console.log("outofbounds");
                }
            }
        })
    }

    //Same thing as the horizontal, but it increments the randomy value.
    if (orientation === "Vertical") {

        let randomx = Math.floor(Math.random() * 8);
        let randomy = Math.floor(Math.random() * (8 - size));


        document.addEventListener("DOMContentLoaded", event => {
            for (let i = 0; i < size; i++) {
                if (randomy + i <= 7 && randomy + i >= 0) {
                    let shipid = `${randomx} ${randomy + i}`;
                    if (shipidarray.includes(shipid) == false) {
                        shipidarray.push(shipid);
                    } else {
                        shipidarray.push(shipid);
                        console.log(shipidarray);
                        for (i; i >= 0; i--) {
                            shipidarray.pop();
                        }
                        console.log(shipidarray);
                        i = -1;
                        randomx = Math.floor(Math.random() * 8);
                        randomy = Math.floor(Math.random() * (8 - size));
                        console.log("can't be placed on creep");
                    }

                } else {
                    for (i; i >= 0; i--) {
                        shipidarray.pop();
                    }
                    i = -1;
                    randomx = Math.floor(Math.random() * 8);
                    randomy = Math.floor(Math.random() * (9 - size));
                    console.log("outofbounds");
                }
            }
        })
    }
}

//This function places the pictures of the ships and 
//adds a click listener to each 
function placeShips() {
    document.addEventListener("DOMContentLoaded", () => {
        for (let i = 0; i < shipidarray.length; i++) {
            let shipid = shipidarray[i];
            let cell = document.getElementById(shipid)
            let img = document.createElement('img');
            img.src = "images/WhitePawn.png";
            img.className = "shippiece"
            img.id = `${shipidarray[i]}`;
            cell.appendChild(img);
            img.addEventListener("click", event => {
                //This if statement is present to prevent multiple turns being used to click 
                //previously clicked spaces
                if (img.className != "clicked") {
                    turncount--;
                    shipsclicked++;
                    changeTurnCount(turncount);
                    console.log(turncount);
                    cell.removeChild(img);
                    img.src = "images/fire.png";
                    img.className = "clicked";
                    cell.appendChild(img);
                }

            })
        }
    })
}

//fills the board with items that look the same as ships
//and adds a click listener to each one
function placeNonShips() {
    document.addEventListener("DOMContentLoaded", () => {
        console.log(shipidarray);
        for (let i = 0; i < shipidarray.length; i++) {
            for (let j = 0; j < idarray.length; j++) {
                console.log(idarray[j] === shipidarray[i]);
                if (idarray[j] === shipidarray[i]) {
                    idarray.splice(idarray.indexOf(idarray[j]), 1);
                }
            }
        }
        console.log(idarray);
        for (let i = 0; i < idarray.length; i++) {
            let shipid = idarray[i];
            let cell = document.getElementById(shipid)
            let img = document.createElement('img');
            img.src = "images/WhitePawn.png";
            img.className = "nonshippiece";
            img.id = `${idarray[i]}`;
            cell.appendChild(img);
            img.addEventListener("click", event => {
                //This if statement is present to prevent multiple turns being used to click 
                //previously clicked spaces
                if (img.className != "clicked") {
                    turncount--;
                    console.log(turncount);
                    cell.removeChild(img);
                    changeTurnCount(turncount);
                    img.src = "images/WhiteFlag.png";
                    img.setAttribute("height", "40px");
                    img.setAttribute("width", "40px");
                    img.setAttribute("align", "middle");
                    img.className = "clicked";
                    cell.appendChild(img);
                }
            })
        }
    })
}

//calls the setupDifficulty function using the difficulty we recieved from the setup page.
setupDifficulty(difficulty);

