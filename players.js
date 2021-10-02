import { createElement } from './utils.js'

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

  createPlayer = () => {
    const $player = createElement('div', this.player)
    const $progressbar = createElement('div', 'progressbar')
    const $character = createElement('div', 'character')
    const $life = createElement('div', 'life')
    const $name = createElement('div', 'name')
    const $characterImg = createElement('img')

    $life.style.width = `${this.hp}%`
    $name.innerText = this.name
    $characterImg.src = this.img
    $characterImg.alt = `${this.name} gif`

    $progressbar.append($life, $name)

    $character.appendChild($characterImg)

    $player.append($progressbar, $character)

    return $player
  }
}

export default Player
