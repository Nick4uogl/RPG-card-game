import { getDiceArray, getDicePlaceHolder, getPercentage } from "./utils.js";
class Character {
    constructor(data) {
        Object.assign(this, data)
        this.diceArray = getDicePlaceHolder(this.diceCount)
        this.maxHealth = this.health
    }

    setDiceHtml() {
        this.currentDiceScore = getDiceArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map((num) => `<div class="dice">${num}</div>`).join("")
    }

    takeDamage(array) {
        const totalDamage = array.reduce((total, current) => total + current)
        this.health -= totalDamage
        if (this.health <= 0) {
            this.health = 0
            this.dead = true
        }
    }

    getHealthBar() {
        const percent = getPercentage(this.maxHealth, this.health)
        return `
        <div class="health-bar-outer">
            <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
                    style="width:${percent}%;">
            </div>
        </div>
        `
    }

    getCharacterHtml() {
        const { name, img, health } = this
        const healthBar = this.getHealthBar()
        return `
        <div class="character-card">
            <h4 class="name"> ${name} </h4>
            <img class="avatar" src="${img}" />
            <div class="health">health: <b> ${health} </b></div>
            ${healthBar}
            <div class="dice-container">
                ${this.diceArray}
            </div>
        </div>
        `
    }

}

export default Character