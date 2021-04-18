const SCORPION_GIF = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
const KITANA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'
const LIUKANG_GIF = 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif'
const SONYA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif'
const SUBZERO_GIF = 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'

const $arenas = document.querySelector('.arenas')
$arenas.classList.add(`arena${Math.ceil(Math.random() * 5)}`)
const $formFight = document.querySelector('.control')

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
const ATTACK = ['head', 'body', 'foot']

const getRandom = (number) => Math.ceil(Math.random() * number)

function logDamage(damage) {
  document.querySelector(`.chat .${this.player}chat`).innerHTML += `${this.name} hits with ${damage} <br /> `
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

  $arenas.appendChild($reloadWrap)
}

const attack = (player, damage) => {
  player.changeHP(damage)
  player.renderHP()
}

const enemyAttack = () => {
  const hit = ATTACK[getRandom(3) - 1]
  const defence = ATTACK[getRandom(3) - 1]

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
}

const playerAttack = () => {
  const playerAttack = {}

  for (let item of $formFight) {
    if (item.checked) {
      playerAttack[item.name] = item.value
      item.checked = false
    }
  }

  playerAttack.value = getRandom(HIT[playerAttack.hit])

  return playerAttack
}

$formFight.addEventListener('submit', (e) => {
  e.preventDefault()
  const enemy = enemyAttack()
  const player = playerAttack()

  if (enemy.hit !== player.defence) {
    player2.logDamage(enemy.value)
    attack(player1, enemy.value)
  }
  if (player.hit !== enemy.defence) {
    player1.logDamage(player.value)
    attack(player2, player.value)
  }

  if (player1.hp === 0 || player2.hp === 0) {
    $formFight.style.display = 'none'
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
