import generateLogs from './logs.js'
import { getRandom, createReloadButton, createElement, $arenas } from './utils.js'

const $formFight = document.querySelector('.control')
setTimeout(() => $formFight.classList.remove('hide'), 2000)

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
const ATTACK = ['head', 'body', 'foot']

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
  const playerHit = {}

  for (let item of $formFight) {
    if (item.checked) {
      playerHit[item.name] = item.value
      item.checked = false
    }
  }

  playerHit.value = getRandom(HIT[playerHit.hit])

  return playerHit
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

const showResult = (player1, player2) => {
  if (player1.hp === 0 || player2.hp === 0) {
    $formFight.classList.add('hide')
    createReloadButton()
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    playerWin(player2.name)
    generateLogs('end', player2, player1)
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    playerWin(player1.name)
    generateLogs('end', player1, player2)
  } else if (player1.hp === 0 && player2.hp === 0) {
    playerWin()
    generateLogs('draw')
  }
}

export const init = (player1, player2) => {
  $formFight.addEventListener('submit', (e) => {
    e.preventDefault()

    const enemy = enemyAttack()
    const player = playerAttack()

    if (enemy.hit !== player.defence) {
      attack(player1, enemy.value)
      generateLogs('hit', player1, player2, player1.hp)
    } else {
      generateLogs('defence', player2, player1)
    }

    if (player.hit !== enemy.defence) {
      attack(player2, player.value)
      generateLogs('hit', player2, player1, player2.hp)
    } else {
      generateLogs('defence', player1, player2)
    }

    showResult(player1, player2)
  })
}
