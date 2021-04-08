const SCORPION_GIF = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
const KITANA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'
const LIUKANG_GIF = 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif'
const SONYA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif'
const SUBZERO_GIF = 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'

const player1 = {
  name: '',
  hp: null,
  img: '',
  weapon: [],
  attack: () => console.log(`${this.name} Fight`),
}

const player2 = {
  name: '',
  hp: null,
  img: '',
  weapon: [],
  attack: () => console.log(`${this.name} Fight`),
}

const createElement = (elementName) => {
  const $elem = document.createElement('div')
  $elem.className = elementName
  return $elem
}

const createPlayer = (player, charaacterName, hp, imgSrc) => {
  const $player = createElement(player)
  const $progressbar = createElement('progressbar')
  const $character = createElement('character')
  const $life = createElement('life')
  $life.style.width = `${hp}%`
  
  const $name = createElement('name')
  $name.innerText = charaacterName

  const $characterImg = document.createElement('img')
  $characterImg.src = imgSrc

  $character.appendChild($characterImg)
  $progressbar.append($life, $name)
  $player.append($progressbar, $character)

  document.querySelector('.arenas').appendChild($player)
}

createPlayer('player1', 'SCORPION', 50, SCORPION_GIF)
createPlayer('player2', 'SUB-ZERO', 80, SUBZERO_GIF)


