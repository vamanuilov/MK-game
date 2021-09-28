import { player1, player2, createPlayer } from './players.js'
import generateLogs from './logs.js'
import { init } from './fight.js'

import { getRandom, $arenas } from './utils.js'

class Game {
  constructor() {}
  start() {
    $arenas.classList.add(`arena${getRandom(5)}`)
    $arenas.appendChild(createPlayer(player1))
    $arenas.appendChild(createPlayer(player2))
    generateLogs('start', player1, player2)
    init(player1, player2)
  }
}

export default Game
