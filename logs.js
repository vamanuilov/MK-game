import { getRandom, pad } from './utils.js'

const $chat = document.querySelector('.chat')

const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника. <span class="hitSpan">[HIT]</span> [damage]',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага. <span class="hitSpan">[HIT]</span> [damage]',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу. <span class="blockSpan">[BLOCK]</span>',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь. <span class="blockSpan">[BLOCK]</span>',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке. <span class="blockSpan">[BLOCK]</span>',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь. <span class="blockSpan">[BLOCK]</span>',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку. <span class="blockSpan">[BLOCK]</span>',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение. <span class="blockSpan">[BLOCK]</span>',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют. <span class="blockSpan">[BLOCK]</span>',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение. <span class="blockSpan">[BLOCK]</span>',
  ],
  draw: 'Ничья - это тоже победа!',
}

const generateLogs = (type, player1, player2, value) => {
  let text = ''

  switch (type) {
    case 'start':
      text = logs[type]
        .replace('[player1]', `<span class="log__player1">${player1.name}</span>`)
        .replace('[player2]', `<span class="log__player2">${player2.name}</span>`)
        .replace('[time]', `${pad(new Date().getHours())}:${pad(new Date().getMinutes())}`)
      break
    case 'draw':
      text = logs[type]
      break
    case 'hit':
      text = logs[type][getRandom(logs[type].length - 1)]
        .replace('[playerDefence]', `<span class="log__player1">${player1.name}</span>`)
        .replace('[playerKick]', `<span class="log__player2">${player2.name}</span>`)
        .replace('[damage]', `<span class="damageSpan">[${value}/100]</span>`)
      break
    case 'defence':
      text = logs[type][getRandom(logs[type].length - 1)]
        .replace('[playerKick]', `<span class="log__player1">${player1.name}</span>`)
        .replace('[playerDefence]', `<span class="log__player2">${player2.name}</span>`)
      break
    case 'end':
      text = logs[type][getRandom(logs[type].length - 1)]
        .replace('[playerWins]', `<span class="log__player1">${player1.name}</span>`)
        .replace('[playerLose]', `<span class="log__player2">${player2.name}</span>`)
      break
    default:
      text = 'Что-то пошло не так! :('
      break
  }

  const el = `<p>${pad(new Date().getHours())}:${pad(new Date().getMinutes())} ${text} </p>`
  $chat.insertAdjacentHTML('afterbegin', el)
}

export default generateLogs
