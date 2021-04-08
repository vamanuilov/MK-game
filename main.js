const SCORPION_GIF = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
const KITANA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'
const LIUKANG_GIF = 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif'
const SONYA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif'
const SUBZERO_GIF = 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'

const player1 = {
  name: 'SCORPION',
  hp: 85,
  img: SCORPION_GIF,
  weapon: [],
  attack: function () {
    console.log(`${this.name} Fight`)
  },
}

const player2 = {
  name: 'SUB-ZERO',
  hp: 85,
  img: SUBZERO_GIF,
  weapon: [],
  attack: function () {
    console.log(`${this.name} Fight`)
  },
}

const createElement = (elementName) => {
  const $elem = document.createElement('div')
  $elem.className = elementName
  return $elem
}

const createPlayer = (player, { name, hp, img }) => {
  const $player = createElement(player)
  const $progressbar = createElement('progressbar')
  const $character = createElement('character')
  const $life = createElement('life')
  $life.style.width = `${hp}%`

  const $name = createElement('name')
  $name.innerText = name

  const $characterImg = document.createElement('img')
  $characterImg.src = img

  $character.appendChild($characterImg)
  $progressbar.append($life, $name)
  $player.append($progressbar, $character)

  document.querySelector('.arenas').appendChild($player)
}

createPlayer('player1', player1)
createPlayer('player2', player2)
