//***************-----------------VARIABLES---------------***************** */
//****----------VARIABLE SETTINGS-----------**********/
//*-----PLAYER NUMBER-------- *//
const allplayInp = document.querySelectorAll(".radio-number");
let numberPlayer;
let newPlayers;
let playerData = [];
//**----PLAYER NAME-------**/
const allPlayName = document.querySelectorAll(".inputname");
//**-----GAME POINT------- **/
const gameRadiobtns = document.querySelectorAll(".pointradio");
//*******-------BTN-------***** */
const submitGame = document.getElementById("submitgame");
const menuCtn = document.querySelector(".menu-ctn");
///********------END OF VARIABLE SETTINGS------ *******/

//********---------SETTING SCRIPT---------------------- */

/*** PLayer number Fonction */
allplayInp.forEach((input) => {
  input.addEventListener("click", () => {
    numberPlayer = input.value;

    for (i = 1; i <= 4; i++) {
      newPlayers = [...allPlayName][[...allPlayName].length - i];
      if (numberPlayer <= i) {
        newPlayers.classList.remove("disabled");
        newPlayers.disabled = false;
      } else {
        newPlayers.disabled = true;
        newPlayers.classList.add("disabled");
      }
    }
  });
});

/**Player Name error display***/

//**Submit save plyer name and game point */
submitGame.addEventListener("click", () => {
  let selectedGame;
  let selectedName;
  for (const gameRadioBtn of gameRadiobtns) {
    if (gameRadioBtn.checked) {
      selectedGame = gameRadioBtn.value;
      break;
    }
  }

  allPlayName.forEach((name) => {
    if (!name.classList.contains("disabled")) {
      if (name.value.length > 8) {
        console.log("probleme");
      }

      if (name.value >= -1) {
        playerData.push(name.placeholder);
      } else {
        playerData.push(name.value);
      }
    }
  });
  playerDisplay();
  playCtn.style.display = "grid";
  menuCtn.style.display = "none";
  console.log(playerData.length);
  console.log(selectedGame);
});

///*******---------END SETTING SCRIPT----------- */
//-******---------VARIABLE GAME---------*************///
//**---------Display************ */
const playernb = document.getElementById("player");
const roundSpan = document.getElementById("round");
const counterCtn = document.getElementById("dice-counter");
const counterplayer1 = document.getElementById("counter1");
const counterplayer2 = document.getElementById("counter2");
const j1Span = document.getElementById("j1");
const j2Span = document.getElementById("j2");
const playCtn = document.querySelector(".play-ctn");
const playCtnName = document.querySelector(".player-ctn");

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
let roundctn = 1;
let counterTime = 2;
///***********--------GAME SCRIPT--------*********** */
//***************--------DEPART DISPLAY-------------*********** */
// j1Span.style.color = "#f3d250";
playBtn.disabled = false;
secondBtn.disabled = true;
passBtn.disabled = true;
nextBtn.disabled = true;

let option1 = 0;
//**********----------PLayer Display----------- */

const playerDisplay = () => {
  for (i = 0; i < playerData.length; i++) {
    playCtnName.innerHTML += `
    <span >${playerData[i]}</span>
    <div id="ct${[i + 1]}" class="counter-player">000</div>
    `;
  }
  document.getElementById("ct1").classList.add("current");
};

//***---------Bouton--------------- */
secondBtn.addEventListener("click", () => {
  secondBtn.disabled = true;

  if (option1 == 0) {
    reset();
  }
  if (option1 > 0) {
    reset();
    counter = 0;
    counterSave = 0;
    counterCtn.textContent = "0";
    option1 = 0;
  }
});

playBtn.addEventListener("click", () => {
  playBtn.disabled = true;
  roundSpan.textContent = roundctn;
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
  playernb.textContent =
    document.querySelector(".current").previousElementSibling.textContent;
  option1++;
  if (counterTime >= playerData.length) {
    counterTime = 1;
    roundctn++;
  } else {
    counterTime++;
  }

  allDice.forEach((dice) => {
    dice.classList.remove("displayloose");
  });
  nextBtn.disabled = true;
  playBtn.disabled = false;
  /*change color background*/
  let currentId = document.querySelector(".current").id;
  // if (currentId === ct1) {
  //   playCtn.style.background = "#5da2d5";
  // }
  // if (currentId === ct2) {
  //   playCtn.style.background = "#5dd561";
  // }
  // if (currentId === ct3) {
  //   playCtn.style.background = "#af5dd5";
  // }
  // if (currentId === ct4) {
  //   playCtn.style.background = "#c3d55d";
  // }
  console.log(currentId);
});
//******-------Looser---------****** */
function loose() {
  allDice.forEach((dice) => {
    dice.classList.add("displayloose");
  });
  playernb.textContent = "LOOSER";
  playBtn.disabled = true;
  passBtn.disabled = true;
  nextBtn.disabled = false;
  counterDisplay(win);
  counter = 0;
  counterCtn.textContent = 0;
  /*change color*/
  playCtn.style.background = "#9d2121";
}

//*****---------Next ------------**********/
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

  const allCounter = document.querySelectorAll(".counter-player");
  allCounter.forEach((counterName) => {
    let counterNumber = counterName.id.charAt(2);
    if (counterNumber == counterTime) {
      counterName.classList.add("current");
    } else {
      counterName.classList.remove("current");
    }
  });
}

//**--------Fonction Pass-------- */
function pass() {
  playBtn.disabled = true;
  passBtn.disabled = true;

  const allCounter = document.querySelectorAll(".counter-player");
  allCounter.forEach((counterName) => {
    if (counterName.classList.contains("current")) {
      counterName.textContent = +counterName.textContent + counter;
    }
  });
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
      loose();
      secondBtn.disabled = true;
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
      loose();
      return (win = false);

    case 5:
      secondBtn.disabled = false;
      option1 = 0;
      counterDisplay(win);
      return (win = true);

    default:
      diceSearch = 0;
      playBtn.disabled = false;
      counterDisplay(win);
      playBtn.textContent = "replay";
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

      rolldice(dice);
    }
  });
  searchResult();
}
function rolldice(dice) {
  dice.value = random(1, 6);
  dice.classList.add("display" + dice.value);
  dice.classList.remove("display0");
}
function AniDice() {
  MyVar = setInterval(rolldice, 200);
}
/** Fonction Aleatoire */
function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stopDice() {
  clearInterval(MyVar), 500;
}
