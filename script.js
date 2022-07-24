const replay = document.getElementById('newGame')
//let score;
let scoreBoard = document.querySelector('.scoreBoard');
const colors = ['green', 'blue', 'pink', 'purple', 'red', 'orange', 'black', 'teal']

//trevor 
const doublecolors = colors.concat(colors)

let clear = document.querySelectorAll('.card');

//color randomizer, help was acquired from friend currently working as fullstack dev
function newGame() {
    const cards = [...document.querySelectorAll('.card')];
    // console.log(cards)
    for (let color of doublecolors) {
        const cardAIndex = parseInt(Math.random() * cards.length);
        const cardA = cards[cardAIndex];
        cards.splice(cardAIndex, 1);
        cardA.className += `${color}`;
        cardA.setAttribute('data-color', color);
        scoreBoard.innerHTML = 0;
        score = 0; 
    };

};
document.addEventListener("onload", newGame());

function clearBoard() {
    clear.forEach((el) =>
        el.className = "card hiding");
    console.log(clear);
};

replay.addEventListener("click", function () { console.log('clicked'); clearBoard(); newGame() });
// console.log(replay)



let clickedCard = null;

//card click = flip card/remove hidden
function cardClicked(e) {
    const target = e.currentTarget;
    // console.log(e.target)
    if (target === clickedCard ||
        target.className.includes('clicked')) {
        return;
    }
    target.className = target.className.replace('hiding', '').trim();
    target.className += ' clicked';

    if (!clickedCard) {
        //if a card hasnt been clicked track card
        target.className = target.className.replace('hiding', '').trim();
        clickedCard = target;
    }
    else if (clickedCard) {
        //if a card HAS BEEN CLICKED check to see if next card matches
        //if card DOES match, prevent cards from being clicked/hidden again
        if (clickedCard.getAttribute('data-color') === target.getAttribute('data-color')) {
            // console.log('card ARE equal');
            score++;
            scoreBoard.innerHTML = `${score}`;
            clickedCard = null;
            if (score === 8 || score === 16 || score === 24 || score === 32) {
                alert('YOU MATCHED EVERYTHING, PLAY AGAIN?')
            }
            if (score === 40) {
                alert(`YOU WON 5 TIMES!, TAKE A BREAK`)
            }

        }
        else {
            //if next card DOES NOT match, make both cards hidden again
            // console.log('cards are NOT equal')
            setTimeout(() => {
                clickedCard.className = clickedCard.className.replace('clicked', '').trim() + 'hiding';
                target.className = target.className.replace('clicked', '').trim() + 'hiding';
                clickedCard = null;
            }
                , 500)
        }
    }
}