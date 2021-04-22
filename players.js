import { createElement } from './utils.js'

const SCORPION_GIF = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
const KITANA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'
const LIUKANG_GIF = 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif'
const SONYA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif'
const SUBZERO_GIF = 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'

class Player {
  constructor({ name, player, hp, img }) {
    this.name = name
    this.player = player
    this.hp = hp
    this.img = img
  }

  changeHP = (damage) => {
    this.hp = this.hp - damage <= 0 ? 0 : this.hp - damage
  }

  elHP = () => {
    return document.querySelector(`.${this.player} .life`)
  }

  renderHP = () => {
    this.elHP().style.width = `${this.hp}%`
  }
}

export const player1 = new Player({
  player: 'player1',
  name: 'Scorpion',
  hp: 100,
  img: SCORPION_GIF,
})

export const player2 = new Player({
  player: 'player2',
  name: 'Sub-Zero',
  hp: 100,
  img: SUBZERO_GIF,
})

export const createPlayer = ({ player, name, hp, img }) => {
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
