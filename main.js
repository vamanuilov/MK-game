const SCORPION_GIF = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif'
const KITANA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif'
const LIUKANG_GIF = 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif'
const SONYA_GIF = 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif'
const SUBZERO_GIF = 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif'

const $arenas = document.querySelector('.arenas')
const $formFight = document.querySelector('.control')
const $chat = document.querySelector('.chat')

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
const ATTACK = ['head', 'body', 'foot']

const logs = {
  start: `Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.`,
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
  ],
  draw: 'Ничья - это тоже победа!',
}

const getRandom = (number) => Math.ceil(Math.random() * number)
$arenas.classList.add(`arena${getRandom(5)}`)

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
      // item.checked = false
    }
  }

  playerAttack.value = getRandom(HIT[playerAttack.hit])

  return playerAttack
}

const generateLogs = (type, player1, player2, value) => {
  let text = ''

  switch (type) {
    case 'start':
      text = logs[type]
        .replace('[player1]', player1.name)
        .replace('[player2]', player2.name)
        .replace('[time]', `${new Date().getHours()}:${new Date().getMinutes()}`)
      break
    case 'draw':
      text = logs[type]
      break
    case 'hit':
      text =
        logs[type][getRandom(logs[type].length - 1)]
          .replace('[playerDefence]', player1.name)
          .replace('[playerKick]', player2.name) + value
      break
    case 'defence':
      text =
        logs[type][getRandom(logs[type].length - 1)]
          .replace('[playerKick]', player1.name)
          .replace('[playerDefence]', player2.name) + value
      break
    case 'end':
      text = logs[type][getRandom(logs[type].length - 1)]
        .replace('[playerWins]', player1.name)
        .replace('[playerLose]', player2.name)
      break
    default:
      text = 'Что-то пошло не так! :('
      break
  }
  
  const el = `<p>${new Date().getHours()}:${new Date().getMinutes()} ${text} </p>`
  $chat.insertAdjacentHTML('afterbegin', el)
}

const showResult = () => {
  if (player1.hp === 0 || player2.hp === 0) {
    $formFight.style.display = 'none'
    createReloadButton()
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    playerWin(player2.name)
    generateLogs('end', player1, player2)
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    playerWin(player1.name)
    generateLogs('end', player2, player1)
  } else if (player1.hp === 0 && player2.hp === 0) {
    generateLogs('draw')
  }
}

$formFight.addEventListener('submit', (e) => {
  e.preventDefault()

  const enemy = enemyAttack()
  const player = playerAttack()

  if (enemy.hit !== player.defence) {
    generateLogs('hit', player1, player2, enemy.value)
    attack(player1, enemy.value)
  } else {
    generateLogs('defence', player2, player1)
  }

  if (player.hit !== enemy.defence) {
    generateLogs('hit', player2, player1, player.value)
    attack(player2, player.value)
  } else {
    generateLogs('defence', player1, player2)
  }

  showResult()
})

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))
generateLogs('start', player1, player2)
