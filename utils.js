function getDiceArray(count) {
    return new Array(count).fill(0).map(() => Math.floor(Math.random() * 6) + 1)
}

function getDicePlaceHolder(count) {
    return new Array(count).fill(0).map(num => `<div class="placeholder-dice"></div>`).join('')
}

function getPercentage(maxValue, currentValue) {
    return currentValue * 100 / maxValue
}

export { getDiceArray, getDicePlaceHolder, getPercentage }