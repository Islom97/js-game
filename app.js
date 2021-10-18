const startGame = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const elTime = document.querySelector("#time");
const board = document.querySelector("#board")
let time = 20
let score = 0

startGame.addEventListener("click", (evn) => {
   evn.preventDefault()
   screens[0].classList.add("up")
})

timeList.addEventListener("click", (evn) => {
   time = parseInt(evn.target.getAttribute('data-time'));
   screens[1].classList.add("up");
   nextGame();
})

board.addEventListener("click", (evn) => {
   if (evn.target.classList.contains('circle')) {
      score++
      evn.target.remove()
      createRandomCircule()
   }
})

function nextGame(){
   setInterval( decreaseTime, 1000)
   createRandomCircule()
   setTime(time)
}

function decreaseTime() {
   if (time === 0) {
      finishGame()
   }else{
      let current = --time;
      if (current < 10) {
         current = `0${current}`
      }
      setTime( current )
   }
}
function setTime(value) {
   elTime.innerHTML = `00:${value }`;
}

function finishGame() {
   elTime.parentNode.classList.add("hide")
   board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`
}

function createRandomCircule() {
   const circle = document.createElement("div");
   const sizeCircle = getRandomNumber(5 , 60)
   circle.classList.add('circle');

   const {width, height} = board.getBoundingClientRect()
   const x = getRandomNumber(0, width - sizeCircle)
   const y = getRandomNumber(0, height - sizeCircle)

   circle.style.width = `${sizeCircle}px`
   circle.style.height = `${sizeCircle}px`
   circle.style.top = `${y}px`
   circle.style.left = `${x}px`

   board.append(circle);
}

function getRandomNumber(min, max) {
   return Math.round(Math.random() * (max - min) + min)
}