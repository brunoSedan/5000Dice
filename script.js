//***************-----------------VARIABLES---------------***************** */
//**---------Display************ */
const throwResult = document.getElementById("dice-throw");
const AnalyseCtn = document.getElementById("dice-result");
const nextCtn = document.getElementById("dice-continuer");
const handData = [];
const counterCtn = document.getElementById("dice-counter");
//**---------BTN------------- */
const playBtn = document.getElementById("first");
const secondBtn = document.getElementById("second");
const passBtn = document.getElementById("pass");
const replayBtn = document.getElementById("replay");

/////////////*********------Dice----*----*********/////////////
const dice1 = document.getElementById("dice1");
const dice2 = document.getElementById("dice2");
const dice3 = document.getElementById("dice3");
const dice4 = document.getElementById("dice4");
const dice5 = document.getElementById("dice5");
const allDice = document.querySelectorAll(".dice");
///***********--------Variable----------********** */
let diceGood = 0;
let diceSearch = 0;
let counter = 0;
let counterSave = 0;
playBtn.disabled = false;
let diceOne = 0;
let diceFive = 0;

/*
1 er creer fonction aleatoire.
bouton play joue la fonction sur les dés pas good.


*/
play();
function play() {
  playBtn.addEventListener("click", () => {
    diceDisplay();
    searchResult();
  });
}

function counterDisplay() {
  counter = diceFive * 50 + diceOne * 100 + counterSave;
  counterCtn.textContent = counter;
  console.log(diceFive);
}

function searchResult() {
  allDice.forEach((dice) => {
    if (!dice.classList.contains("good") && dice.value == 1) {
      dice.classList.add("good");
      diceGood++;
      diceOne++;
      diceSearch++;
    }
    if (!dice.classList.contains("good") && dice.value == 5) {
      dice.classList.add("good");
      diceGood++;
      diceSearch++;
      diceFive++;
    }
  });
  switch (diceSearch) {
    case 0:
      console.log("vous avez perdu");
      playBtn.disabled = true;
      break;
    default:
      counterDisplay();
      secondLancer();
  }
}

function secondLancer() {
  switch (diceGood) {
    case 0:
      console.log("vous avez perdu");
      playBtn.disabled = true;
      break;
    case 5:
      console.log("vous pouvez tout remettre en jeu");
      playBtn.textContent = "All Again";
      allAgain();
      break;
    default:
      diceSearch = 0;
      console.log("vous pouvez rejouer");
      playBtn.disabled = false;
      playBtn.textContent = "Rejouer";
      break;
  }
}
function allAgain() {
  playBtn.addEventListener("click", () => {
    allDice.forEach((dice) => {
      dice.classList.remove("good");
      dice.value = "";
    });
    play();
  });
}

/*-----Math Random---------- */
function diceDisplay() {
  allDice.forEach((dice) => {
    if (!dice.classList.contains("good")) {
      for (i = 0; i <= 6; i++) {
        dice.classList.remove("display" + i);
      }
      dice.value = 5;
      // dice.value = random(1, 6);
      dice.classList.add("display" + dice.value);
      dice.classList.remove("display0");
    }
  });
}

/** Fonction Aleatoire */
function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//The maximum is inclusive and the minimum is inclusive
