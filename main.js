import generateLogs from './logs.js'
import { getRandom } from './utils.js'
import { player1, player2, createPlayer } from './players.js'
import './fight.js'

const $arenas = document.querySelector('.arenas')

$arenas.classList.add(`arena${getRandom(5)}`)

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))
generateLogs('start', player1, player2)
