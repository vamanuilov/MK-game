const SCORPION_GIF = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
const KITANA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'
const LIUKANG_GIF = 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif'
const SONYA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif'
const SUBZERO_GIF = 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'

const $arenas = document.querySelector('.arenas')
$arenas.classList.add(`arena${Math.ceil(Math.random() * 5)}`)
const $randomButton = document.querySelector('.control .button')

function logDamage(damage) {
  document
    .querySelector(`.chat .${this.player}chat`)
    .innerHTML += `${this.name} hits with ${damage} <br /> `
}

function changeHP(damage) {
  this.hp = this.hp - damage <= 0 ? 0 : this.hp - damage
}

function elHP() {
  return document.querySelector(`.${this.player} .life`)
}

function renderHP() {
  this.elHP().style.width = `${this.hp}%`
}

const player1 = {
  player: 'player1',
  name: 'Scorpion',
  hp: 100,
  img: SCORPION_GIF,
  weapon: [],
  logDamage,
  changeHP,
  elHP,
  renderHP,
}

const player2 = {
  player: 'player2',
  name: 'Sub-Zero',
  hp: 100,
  img: SUBZERO_GIF,
  weapon: [],
  logDamage,
  changeHP,
  elHP,
  renderHP,
}

const createElement = (tag, className) => {
  const $elem = document.createElement(tag)

  className && $elem.classList.add(className)

  return $elem
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
  if (name) {
    $winTitle.innerText = `${name} wins`
  } else {
    $winTitle.innerText = 'draw'
  }
  $arenas.appendChild($winTitle)
}

const createReloadButton = () => {
  $reloadWrap = createElement('div', 'reloadWrap')
  $reloadButton = createElement('button', 'button')

  $reloadButton.innerText = 'Restart'
  $reloadButton.addEventListener('click', () => {
    window.location.reload()
  })
  $reloadWrap.appendChild($reloadButton)

  document.querySelector('.control').appendChild($reloadWrap)
}

const attack = (player) => {
  const damage = Math.ceil(Math.random() * 20)
  player.changeHP(damage)
  player.renderHP()
  player.logDamage(damage)
}

$randomButton.addEventListener('click', () => {
  attack(Math.floor(Math.random() * 2) ? player1 : player2)

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.style.display = 'none'
    createReloadButton()
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    playerWin(player2.name)
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    playerWin(player1.name)
  } else if (player1.hp === 0 && player2.hp === 0) {
    playerWin()
  }
})

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))
