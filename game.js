import Player from './players.js'
import CHARACTERS from './assets/js/characters.js'
import generateLogs from './logs.js'
import { init } from './fight.js'
import { getRandom, $arenas } from './utils.js'

class Game {
  constructor() {}

  start = (player1) => {
    // const character1 = CHARACTERS[getRandom(CHARACTERS.length - 1)]
    const character2 = CHARACTERS[getRandom(CHARACTERS.length - 1)]
    // const player1 = new Player({ ...character1, player: 'player1' })
    const player2 = new Player({ ...character2, player: 'player2' })
    document.querySelector('.fighterSelect').classList.add('hidden')
    document.querySelector('.root').classList.remove('hidden')
    $arenas.classList.add(`arena${getRandom(5)}`)
    $arenas.appendChild(player1.createPlayer())
    $arenas.appendChild(player2.createPlayer())
    generateLogs('start', player1, player2)
    init(player1, player2)
  }
}

export default Game
