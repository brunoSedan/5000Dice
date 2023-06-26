//***************-----------------VARIABLES---------------***************** */
//**---------Display************ */
const playernb = document.getElementById("player");
const counterCtn = document.getElementById("dice-counter");
const counterplayer1 = document.getElementById("counter1");
const counterplayer2 = document.getElementById("counter2");
//**---------BTN------------- */
const playBtn = document.getElementById("first");
const secondBtn = document.getElementById("second");
const passBtn = document.getElementById("pass");
const nextBtn = document.getElementById("next");

/////////////*********------Dice----*----*********/////////////
const allDice = document.querySelectorAll(".dice");
///***********--------Variable----------********** */
let diceGood = 0;
let diceSearch = 0;
let counter = 0;
let counterSave = 0;
let win;
let diceOne = 0;
let diceFive = 0;
let counterp1 = 0;
let counterp2 = 0;

playBtn.disabled = false;
secondBtn.disabled = true;
passBtn.disabled = true;
nextBtn.disabled = true;

let option1 = 0;
//***---------Bouton--------------- */
secondBtn.addEventListener("click", () => {
  secondBtn.disabled = true;
  console.log(option1);
  if (option1 == 0) {
    reset();
  }
  if (option1 > 0) {
    reset();
    counter = 0;
    counterSave = 0;
    counterCtn.textContent = "0";
    option1 == 0;
  }
});

playBtn.addEventListener("click", () => {
  playBtn.disabled = true;
  secondBtn.disabled = true;
  counterDisplay(win);
  diceDisplay();
});

passBtn.addEventListener("click", () => {
  pass();
  nextBtn.disabled = false;
  secondBtn.disabled = true;
});

nextBtn.addEventListener("click", () => {
  next(win);
  option1++;
  nextBtn.disabled = true;
  playBtn.disabled = false;
});

//*****Next */
function next(win) {
  switch (win) {
    case true:
      secondBtn.disabled = false;
      break;
    case false:
      reset();
      counter = 0;
      counterCtn.textContent = 0;
      playBtn.textContent = "play";
      break;
  }

  if (playernb.classList.contains("player1")) {
    playernb.classList.remove("player1");
    playernb.classList.add("player2");
    playernb.textContent = "player2";
  } else {
    playernb.classList.remove("player2");
    playernb.classList.add("player1");
    playernb.textContent = "player1";
  }
}

//**--------Fonction Pass-------- */
function pass() {
  playBtn.disabled = true;
  passBtn.disabled = true;
  if (playernb.classList.contains("player1")) {
    counterp1 = counterp1 + counter;
    counterplayer1.textContent = counterp1;
  }
  if (playernb.classList.contains("player2")) {
    counterp2 = counterp2 + counter;
    counterplayer2.textContent = counterp2;
  }
}

/**----------Fonction Counter-------------- */

function counterDisplay(win) {
  if ((win = true)) {
    counter = diceFive * 50 + diceOne * 100 + counterSave;
    counterCtn.textContent = counter;
  } else {
    counter = "";
    counterCtn.textContent = "";
  }
}

/**-----------Fonction Research----------------*/
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
      secondBtn.disabled = true;
      playBtn.disabled = true;
      passBtn.disabled = true;
      nextBtn.disabled = false;
      counterDisplay(win);
      counter = 0;
      counterCtn.textContent = 0;
      return (win = false);

    default:
      passBtn.disabled = false;
      secondLancer();
  }
}

/**----------Fonction Second Lancer ---------------- */
function secondLancer() {
  switch (diceGood) {
    case 0:
      nextBtn.disabled = false;
      playBtn.disabled = true;
      passBtn.disabled = true;
      counterDisplay(win);
      counter = 0;
      counterCtn.textContent = 0;
      return (win = false);

    case 5:
      secondBtn.disabled = false;
      counterDisplay(win);
      return (win = true);

    default:
      diceSearch = 0;
      playBtn.disabled = false;
      counterDisplay(win);
      playBtn.textContent = "Rejouer";
      return (win = true);
  }
}

/**-----------Function reset-------------**** */

function reset() {
  allDice.forEach((dice) => {
    dice.classList.remove("good");
    dice.value = "";
    for (i = 0; i <= 6; i++) {
      dice.classList.remove("display" + i);
    }
    dice.classList.add("display0");
  });
  counterSave = counter;
  playBtn.disabled = false;
  diceGood = 0;
  diceSearch = 0;
  diceFive = 0;
  diceOne = 0;
}

/*-----Math Random---------- */
function diceDisplay() {
  allDice.forEach((dice) => {
    if (!dice.classList.contains("good")) {
      for (i = 0; i <= 6; i++) {
        dice.classList.remove("display" + i);
      }
      dice.value = 1;
      dice.value = random(1, 6);
      dice.classList.add("display" + dice.value);
      dice.classList.remove("display0");
    }
  });
  searchResult();
}

/** Fonction Aleatoire */
function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
