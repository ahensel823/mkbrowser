/* eslint-disable prefer-const */
/* eslint-disable no-undef */
export class game {
  constructor () {
    this.canvas = document.getElementsByClassName('canvas')[0]
    this.containers = document.querySelectorAll('.container')
    this.character = document.getElementsByClassName('character')[0]
    this.cruceta = document.getElementsByClassName('cruceta')[0]
    this.right = document.getElementById('right')
    this.left = document.getElementById('left')
    this.imgElements = Array.from(this.containers).flatMap(container => Array.from(container.children))
    const containerWidth = this.canvas.clientWidth
    const contentWidth = this.canvas.scrollWidth
    const initialScrollLeft = (contentWidth - containerWidth) / 2
    this.canvas.scrollLeft = initialScrollLeft
    const initialCharacterPosition = containerWidth / 2 * 1.2
    this.targetX = initialCharacterPosition
    this.targetY = 0
    this.sprite = 0
    this.A = 0
    this.B = 13
    this.transitionSpeed = 2
    document.addEventListener('contextmenu', function (e) { e.preventDefault() })
    this.sprites = [
      {
        nombre: 'iddle',
        index: [0, 13],
        time: 4,
        on: false
      },
      {
        nombre: 'd',
        index: [14, 31],
        time: 4,
        on: false
      },
      {
        nombre: 'a',
        index: [31, 14],
        time: 4,
        on: false
      },
      {
        nombre: 'jBallF',
        index: [32, 47],
        time: 2,
        on: false
      },
      {
        nombre: 'jBallB',
        index: [47, 32],
        time: 2,
        on: false
      },
      {
        nombre: 'background',
        index: [0, 5],
        on: false
      }
    ]
    this.time = 0
    this.frame = 0
    this.setupEventListeners()
    this.bucleDeJuego()
  }

  bucleDeJuego () {
    requestAnimationFrame(this.bucleDeJuego.bind(this))
    this.getRender()
  }

  setupEventListeners () {
    this.right.addEventListener('touchstart', () => {
      const spriteIddle = this.sprites.find(sprite => sprite.nombre === 'iddle')
      this.sprite = this.sprites.find(sprite => sprite.nombre === 'd')
      if (spriteIddle && this.sprite) {
        this.A = this.sprite.index[0]
        this.B = this.sprite.index[1]
      }
    })
    this.left.addEventListener('touchstart', () => {
      const spriteIddle = this.sprites.find(sprite => sprite.nombre === 'iddle')
      this.sprite = this.sprites.find(sprite => sprite.nombre === 'a')
      if (spriteIddle && this.sprite) {
        this.A = this.sprite.index[0]
        this.B = this.sprite.index[1]
      }
    })
    this.right.addEventListener('touchend', () => {
      this.sprite = this.sprites[0]
      this.A = this.sprite.index[0]
      this.B = this.sprite.index[1]
    })
    this.left.addEventListener('touchend', () => {
      this.sprite = this.sprites[0]
      this.A = this.sprite.index[0]
      this.B = this.sprite.index[1]
    })
    document.addEventListener('keydown', (event) => {
      const key = event.key
      const spriteIddle = this.sprites.find(sprite => sprite.nombre === 'iddle')
      this.sprite = this.sprites.find(sprite => sprite.nombre === key && sprite.nombre !== 'iddle')
      if (spriteIddle && this.sprite) {
        this.A = this.sprite.index[0]
        this.B = this.sprite.index[1]
      }
    })
    document.addEventListener('keyup', () => {
      this.sprite = this.sprites[0]
      this.A = this.sprite.index[0]
      this.B = this.sprite.index[1]
    })
  }

  getRender () {
    this.time++
    if (this.time === 4) {
      if (this.A < this.B) {
        this.frame++
      } else {
        this.frame--
      }
      if (this.sprites.indexOf(this.sprite) === 1) {
        if (this.targetX < 1050) {
          this.targetX += 10
          const characterRightEdge = this.character.getBoundingClientRect().right
          const containerWidth = this.canvas.clientWidth
          if (characterRightEdge > containerWidth) {
            this.canvas.scrollBy({
              left: 20,
              behavior: 'smooth'
            })
          }
        }
      }
      if (this.sprites.indexOf(this.sprite) === 2) {
        if (this.targetX > 50) {
          this.targetX -= 10
          const characterLeftEdge = this.character.getBoundingClientRect().left
          const containerWidth = this.canvas.clientWidth
          if (characterLeftEdge <= containerWidth) {
            this.canvas.scrollBy({
              left: -20,
              behavior: 'smooth'
            })
          }
        }
      }
      this.character.style.transform = `translateX(${this.targetX}px)`
      this.character.style.transition = `transform ${this.transitionSpeed / 20}s ease-in-out`
      this.time = 0
    }
    if (this.A < this.B) {
      for (let i = 0; i < this.imgElements.length; i++) {
        if (i < this.A || i > this.B) {
          this.imgElements[i].classList.remove('active')
        }
      }
      for (let i = this.A; i <= this.B; i++) {
        const isEven = i % 2 === 0
        const nextIndex = isEven ? i + 1 : i - 1
        if (this.frame >= this.B) {
          this.frame = this.A
        }
        if (i === this.frame || nextIndex === this.frame) {
          this.imgElements[i].classList.add('active')
        } else {
          this.imgElements[i].classList.remove('active')
        }
      }
    }
    if (this.B < this.A) {
      if (this.frame <= this.B) {
        this.frame = this.A
      }
      for (let i = 0; i < this.imgElements.length; i++) {
        if (i < this.B || i > this.A) {
          this.imgElements[i].classList.remove('active')
        }
      }
      for (let i = this.A; i >= this.B; i--) {
        const isEven = i % 2 === 0
        const nextIndex = isEven ? i + 1 : i - 1
        if (i === this.frame || nextIndex === this.frame) {
          this.imgElements[i].classList.add('active')
        } else {
          this.imgElements[i].classList.remove('active')
        }
      }
    }
  }
}
