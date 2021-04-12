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
  name: 'Scorpion',
  hp: 100,
  img: SCORPION_GIF,
  weapon: [],
  attack: function (damage) {
    return `${this.name} hits with ${damage}`
  },
}

const player2 = {
  player: 'player2',
  name: 'Sub-Zero',
  hp: 100,
  img: SUBZERO_GIF,
  weapon: [],
  attack: function (damage) {
    return `${this.name} hits with ${damage}`
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
  const damage = Math.ceil(Math.random() * 20)
  const $playerChat = document.querySelector(`.chat .${player.player}chat`)
  const oppositePlayer = player.player === 'player1' ? player2 : player1

  player.hp = player.hp - damage < 0 ? 0 : player.hp - damage
  $playerLife.style.width = `${player.hp}%`
  $playerChat.innerHTML += `${player.attack(damage)} <br /> `

  if (player.hp === 0) {
    $randomButton.style.display = 'none'
    playerWin(oppositePlayer.name)
  }
}

$randomButton.addEventListener('click', () => {
  changeHP(Math.floor(Math.random() * 2) ? player1 : player2)
})

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))
