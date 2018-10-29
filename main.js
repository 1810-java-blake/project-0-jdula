let spacearray = [[], [], [], [], [], [], [], []];
let shipidarray = [];
let idarray = [];
let turncount = 20;
let shipsclicked = 0;

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


class Ship {
    constructor(size, orientation) {
        this.size = size;
        this.orientation
    }

    getSize() {
        return this.size;
    }
    setSize(size) {
        this.size = size;
    }

    getOrientation() {
        return this.orientation;
    }
    setOrientation(orientation) {
        this.orientation = orientation;
    }
}

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

    if (turncount === 0 && shipsclicked === shipidarray.length) {
        h2.replaceChild(wintext, h2child);
        table.style.display = "none";
    }

    if (turncount === 0 && shipsclicked !== shipidarray.lenth) {
        h2.replaceChild(losetext, h2child);
        table.style.display = "none";
    }
}


//randomly builds the ship array 
function placeShipsArray(size, orientation) {

    if (orientation === "Horizontal") {
        let randomx = Math.floor(Math.random() * (9 - size));
        let randomy = Math.floor(Math.random() * (8));

        document.addEventListener("DOMContentLoaded", event => {
            for (let i = 0; i < size; i++) {
                if (randomx + i <= 7) {
                    let shipid = `${randomx + i} ${randomy}`;
                    if (shipidarray.includes(shipid) === false) {
                        shipidarray.push(shipid);
                    } else {
                        for (i; i >= 0; i--) {
                            shipidarray.pop();
                        }
                        i = -1;
                        randomx = Math.floor(Math.random() * 8);
                        randomy = Math.floor(Math.random() * 8);
                        console.log("can't be placed on creep");
                    }
                } else {
                    for (i; i >= 0; i--) {
                        shipidarray.pop();
                    }
                    i = -1;
                    randomx = Math.floor(Math.random() * 8);
                    randomy = Math.floor(Math.random() * 8);
                    console.log("outofbounds");
                }
            }
        })
    }

    if (orientation === "Vertical") {
        let randomx = Math.floor(Math.random() * 8);
        let randomy = Math.floor(Math.random() * 8);

        document.addEventListener("DOMContentLoaded", event => {
            for (let i = 0; i < size; i++) {
                if (randomy + i <= 7 && randomy + i >= 0) {
                    let shipid = `${randomx} ${randomy + i}`;
                    if (shipidarray.includes(shipid) === false) {
                        shipidarray.push(shipid);
                    } else {
                        for (i; i > 0; i--) {
                            shipidarray.pop();
                        }
                        i = -1;
                        randomx = Math.floor(Math.random() * 8);
                        randomy = Math.floor(Math.random() * 8);
                        console.log("can't be placed on creep");
                    }

                } else {
                    for (i; i > 0; i--) {
                        shipidarray.pop();
                    }
                    i = -1;
                    randomx = Math.floor(Math.random() * 8);
                    randomy = Math.floor(Math.random() * 8);
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

//places 3 ships, 2 vertical and 1 horizontal.
placeShipsArray(2, "Vertical");
placeShipsArray(3, "Horizontal");
placeShipsArray(4, "Vertical");
placeShips();
placeNonShips();
console.log(shipidarray);

