/* eslint-disable prefer-const */
/* eslint-disable no-undef */

export class Game {
  constructor () {
    this.canvas = document.querySelector('.canvas')
    this.containers = document.querySelectorAll('.container')
    this.character = document.querySelector('.character')
    this.cruceta = document.querySelector('.cruceta')
    this.imgElements = Array.from(this.containers).flatMap(container => Array.from(container.children))
    const containerWidth = this.canvas.clientWidth
    const contentWidth = this.canvas.scrollWidth
    const initialScrollLeft = (contentWidth - containerWidth) / 2
    this.canvas.scrollLeft = initialScrollLeft
    const initialCharacterPosition = containerWidth / 2 * 1.2
    this.targetX = initialCharacterPosition
    this.targetY = 0
    this.transitionSpeed = 2
    this.isTrue = false
    this.sprites = [
      { nombre: 'iddle', index: [0, 13] },
      { nombre: 'd', index: [14, 31] },
      { nombre: 'a', index: [31, 14] },
      { nombre: 'jBallF', index: [32, 47] },
      { nombre: 'jBallB', index: [47, 32] },
      { nombre: 'background', index: [0, 5] }
    ]
    this.A = 0
    this.B = 13
    this.key = 'iddle'
    this.time = 0
    this.frame = 0
    this.setupEventListeners()
    this.gameLoop()
  }

  gameLoop () {
    requestAnimationFrame(this.gameLoop.bind(this))
    this.getRender()
  }

  setupEventListeners () {
    document.getElementById('right').addEventListener('touchstart', () => this.handleTouchStart('d'))
    document.getElementById('left').addEventListener('touchstart', () => this.handleTouchStart('a'))
    document.getElementById('right').addEventListener('touchend', () => this.handleTouchEnd())
    document.getElementById('left').addEventListener('touchend', () => this.handleTouchEnd())
    document.addEventListener('keydown', (event) => this.handleKeyDown(event))
    document.addEventListener('keyup', () => this.handleKeyUp())
  }

  handleTouchStart (direction) {
    this.sprite = this.sprites.find(sprite => sprite.nombre === direction)
    this.A = this.sprite.index[0]
    this.B = this.sprite.index[1]
  }

  handleTouchEnd () {
    this.sprite = this.sprites[0]
    this.A = this.sprite.index[0]
    this.B = this.sprite.index[1]
  }

  handleKeyDown (event) {
    if (!this.isTrue) {
      this.isTrue = true
      this.sprite = this.sprites.find(sprite => sprite.nombre === event.key)
      this.key = event.key
      this.A = this.sprite.index[0]
      this.B = this.sprite.index[1]
    }
  }

  handleKeyUp () {
    this.isTrue = false
    this.key = 'iddle'
    this.sprite = this.sprites[0]
    this.A = this.sprite.index[0]
    this.B = this.sprite.index[1]
  }

  getRender () {
    this.time++
    if (this.time === 4) {
      this.A += (this.A < this.B) ? 1 : -1
      this.updateActiveImages()
      this.handleSpriteMovement()
      this.handleCanvasScroll()
      this.time = 0
    }
  }

  updateActiveImages () {
    if (this.A === this.B) {
      this.A = this.sprites.find(sprite => sprite.nombre === this.key).index[0]
    }
    const isEven = this.A % 2 === 0
    const nextIndex = isEven ? this.A + 1 : this.A - 1
    for (let i = 0; i < this.imgElements.length; i++) {
      const isActive = i === this.A || i === nextIndex
      this.imgElements[i].classList.toggle('active', isActive)
    }
  }

  handleSpriteMovement () {
    const spriteIndex = this.sprites.indexOf(this.sprite)
    if (spriteIndex === 1 && this.isCharacterNearRightEdge()) {
      this.targetX += 7
    } else if (spriteIndex === 2 && this.isCharacterNearLeftEdge()) {
      this.targetX -= 7
    }
    this.character.style.transform = `translateX(${this.targetX}px)`
    this.character.style.transition = `transform ${this.transitionSpeed / 20}s ease-in-out`
  }

  handleCanvasScroll () {
    const characterEdge = (this.A < this.B) ? this.character.getBoundingClientRect().right : this.character.getBoundingClientRect().left
    const scrollDirection = (this.A < this.B) ? 50 : -50
    const containerWidth = this.canvas.clientWidth

    if (this.shouldScroll(characterEdge, containerWidth)) {
      this.canvas.scrollBy({
        left: scrollDirection,
        behavior: 'smooth'
      })
    }
  }

  isCharacterNearRightEdge () {
    return this.targetX < 1050 && (this.character.getBoundingClientRect().right) < this.canvas.clientWidth
  }

  isCharacterNearLeftEdge () {
    return this.targetX > 50 && (this.character.getBoundingClientRect().left) > 0
  }

  shouldScroll (characterEdge, containerWidth) {
    return characterEdge > containerWidth || characterEdge < 0
  }
}
