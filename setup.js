
//Uses localStorage object to hold the difficulty value for use in the other javascript file
var difficulty = localStorage.difficulty;

//simple document.addEventListener that gets the difficulty value from the setup page
//and saves it in localStorage
document.addEventListener("DOMContentLoaded", () => {
    let button = document.getElementById("startbutton");
    //returns true or false if the radio button is checked or not
    let easy = document.getElementById("Easy").checked;
    let intermediate = document.getElementById("Intermediate").checked;
    let hard = document.getElementById("Hard").checked;
    
    //add a click listener to the start button that changes the difficulty value 
    //based on the radio button form.
    button.addEventListener("click", event => {
        if (easy) {
            localStorage.difficulty = "Easy";
            console.log(difficulty)
        }
        if (intermediate) {
            localStorage.difficulty = "Intermediate";
            console.log(difficulty)
        }
        if (hard) {
            localStorage.difficulty = "Hard";
            console.log(difficulty)
        }
        //changes the web page to the game screen.
        window.location.replace("index.html");
    })
})

