import Game from './game.js'
import Player from './players.js'
import CHARACTERS from './assets/js/characters.js'

const $parent = document.querySelector('.parent')
const $player = document.querySelector('.player')

const createElement = (tag, className) => {
  const $tag = document.createElement(tag)
  if (className) {
    if (Array.isArray(className)) {
      className.forEach((item) => {
        $tag.classList.add(item)
      })
    } else {
      $tag.classList.add(className)
    }
  }

  return $tag
}

function createEmptyPlayerBlock() {
  const el = createElement('div', ['characterSelect', 'div11', 'disabled'])
  const img = createElement('img')
  img.src = 'assets/images/emptyPlayer.png'
  el.appendChild(img)
  $parent.appendChild(el)
}

async function init() {

  let imgSrc = null
  createEmptyPlayerBlock()

  CHARACTERS.forEach((item) => {
    const el = createElement('div', ['characterSelect', `div${item.id}`])
    const img = createElement('img')

    el.addEventListener('mousemove', () => {
      if (imgSrc === null) {
        imgSrc = item.img
        const $img = createElement('img')
        $img.src = imgSrc
        $player.appendChild($img)
      }
    })

    el.addEventListener('mouseout', () => {
      if (imgSrc) {
        imgSrc = null
        $player.innerHTML = ''
      }
    })

    el.addEventListener('click', () => {
      el.classList.add('active')

      setTimeout(() => {
        const player1 = new Player({ ...item, player: 'player1' })
        const game = new Game()

        game.start(player1)
      }, 1000)
    })

    img.src = item.avatar
    img.alt = item.name

    el.appendChild(img)
    $parent.appendChild(el)
  })
}

init()
