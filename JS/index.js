let player = {
    name: "",
    chips: 150
}
let isAlive = false;
let hasBlackJack = false;
let cards = []
let sum = 0
const messageEl = document.querySelector("#message-el");
let cardsEl = document.querySelector("#cards-el")
const sumEl = document.querySelector("#sum-el")
const startGame = document.querySelector("#startGame-btn");
const newCardEl = document.querySelector("#newCard-btn");
const playerEl = document.querySelector("#player-el")
const submitNameInput = document.querySelector("#submitName-input")

function getRandomCard() {
    let randomCard = Math.floor((Math.random()*13)+1);
    if (randomCard === 1) {
        return 11
    } else if (randomCard > 10) {
        return 10
    } else {
    return randomCard
}
}

startGame.addEventListener("click", () => {
    isAlive = true;
    hasBlackJack = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame()
})


function renderGame() {
    sumEl.textContent = `Sum: ${sum}`;
    cardsEl.textContent = `Cards:`
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += ` ${cards[i] }`
    }
    if (player.chips <=0) {
        messageEl.textContent = "Game Over! Please refresh the page.";
        startGame.disabled = true;
        newCardEl.disabled = true;
    } else if  (sum < 21) {
        messageEl.textContent = `Would you like to draw a card?`
        isAlive = true;
    } else if (sum === 21) {
        messageEl.textContent = `You got blackjack!`;
        hasBlackJack = true;
        player.chips += 50;
    } else {
        messageEl.textContent = `Bust.`
        isAlive = false;
        player.chips -= 10;
    }
    playerEl.textContent = `${player.name}: $${player.chips}`
}

function storeName() {
    var enteredName = document.getElementById("nameInput").value
    player.name = enteredName
    playerEl.textContent = `${player.name}: $${player.chips}`
}

newCardEl.addEventListener("click", () => {
    if (isAlive === true && hasBlackJack === false) {
        let newCard = getRandomCard();
        cards.push(newCard)
        sum += newCard;
        console.log("clicked the button")
        renderGame();
    } 
})

submitNameInput.addEventListener("click", () =>{
    var enteredName = document.getElementById("nameInput").value
    player.name = enteredName
    playerEl.textContent = `${player.name}: $${player.chips}`
})