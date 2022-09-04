import cards from "./data.js"
import Character from "./Character.js"

const monsters = ["orc", "demon", "goblin"]

const wizard = new Character(cards.hero)
let monster = getNextMonster()

let isWaiting = false

document.getElementById('attack-button').addEventListener('click', attack)

function getNextMonster() {
    return new Character(cards[monsters.shift()])
}

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

function attack() {
    if (!isWaiting) {
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
        if (monster.dead && monsters.length > 0) {
            isWaiting = true
            if (monsters.length > 0) {
                setTimeout(() => {
                    monster = getNextMonster()
                    render()
                    isWaiting = false
                }, 1000)
            } else {
                endGame()
            }
        }
        if (wizard.dead) {
            endGame()
        }
    }
}

function endGame() {
    isWaiting = true
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        wizard.health > 0 ? "The Wizard Wins" :
            "The monsters are Victorious"

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
    setTimeout(() => {
        document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `
    }, 1000)
}

render()
