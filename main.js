const SCORPION_GIF = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
const KITANA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'
const LIUKANG_GIF = 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif'
const SONYA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif'
const SUBZERO_GIF = 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'

const $arenas = document.querySelector('.arenas')
$arenas.classList.add(`arena${Math.ceil(Math.random() * 5)}`)
const $randomButton = document.querySelector('.control .button')

const player1 = {
  player: 'player1',
  name: 'SCORPION',
  hp: 100,
  img: SCORPION_GIF,
  weapon: [],
  attack: function () {
    console.log(`${this.name} Fight`)
  },
}

const player2 = {
  player: 'player2',
  name: 'SUB-ZERO',
  hp: 100,
  img: SUBZERO_GIF,
  weapon: [],
  attack: function () {
    console.log(`${this.name} Fight`)
  },
}

const createElement = (tag, className) => {
  const $elem = document.createElement(tag)

  className && $elem.classList.add(className)

  return $elem
}

const setLifeWidth = (lifeWidth) => {
  const $life = document.querySelector('.life')
  $life.style.width = `${lifeWidth}%`
}

const createPlayer = ({ player, name, hp, img }) => {
  const $player = createElement('div', player)
  const $progressbar = createElement('div', 'progressbar')
  const $character = createElement('div', 'character')
  const $life = createElement('div', 'life')
  const $name = createElement('div', 'name')
  const $characterImg = createElement('img')

  $life.style.width = `${hp}%`
  $name.innerText = name
  $characterImg.src = img
  $characterImg.alt = `${name} gif`

  $progressbar.append($life, $name)

  $character.appendChild($characterImg)

  $player.append($progressbar, $character)

  return $player
}

const playerWin = (name) => {
  const $winTitle = createElement('div', 'winTitle')
  $winTitle.innerText = `${name} wins`
  $arenas.appendChild($winTitle)
}

const changeHP = (player) => {
  const $playerLife = document.querySelector(`.${player.player} .life`)
  const hitPower = Math.ceil(Math.random() * 20)

  player.hp = player.hp - hitPower < 0 ? 0 : player.hp - hitPower
  $playerLife.style.width = `${player.hp}%`

  if (player.hp === 0) {
    $randomButton.style.display = 'none'
    playerWin(player.player === 'player1' ? player2.name : player1.name)
  }
}

$randomButton.addEventListener('click', () => {
  changeHP(Math.floor(Math.random() * 2) ? player1 : player2)
})

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))
