export const $arenas = document.querySelector('.arenas')

export const pad = (value) => {
  return value < 10 ? `0${value}` : value
}

export const getRandom = (number) => Math.ceil(Math.random() * number)

export const createElement = (tag, className) => {
  const $elem = document.createElement(tag)

  className && $elem.classList.add(className)

  return $elem
}

export const createReloadButton = () => {
  const $reloadWrap = createElement('div', 'reloadWrap')
  const $reloadButton = createElement('button', 'button')

  $reloadButton.innerText = 'Restart'
  $reloadButton.addEventListener('click', () => {
    window.location.reload()
  })
  $reloadWrap.appendChild($reloadButton)

  $arenas.appendChild($reloadWrap)
}
