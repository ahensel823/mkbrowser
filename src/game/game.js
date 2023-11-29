export class game {
  constructor() {
    this.canvas = document.getElementById("canvas")
    this.containers = document.querySelectorAll('.container')
    this.walkElement = document.getElementById("walk")
    this.iddleElement = document.getElementById("iddle")
    this.jumpElement = document.getElementById("jump")
    this.imgElements = Array.from(this.containers).flatMap(container => Array.from(container.children))
    const containerWidth = this.canvas.clientWidth
    const contentWidth = this.canvas.scrollWidth
    const initialScrollLeft = (contentWidth - containerWidth) / 2
    this.canvas.scrollLeft = initialScrollLeft
    const initialCharacterPosition = containerWidth / 2 * 1.2
    this.targetX = initialCharacterPosition
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault()
    })
      this.targetY = 
      this.sprite = 0
      this.transitionSpeed = 2
      this.sprites = [
        {
          nombre: "iddle",
          index: [0, 13],
          time: 4,
          on: true
        },
        {
          nombre: "d",
          index: [14, 31],
          time: 4,
          on: false
        },
        {
          nombre: "a",
          index: [31, 14],
          time: 4,
          on: false
        },
        {
          nombre: "jBallF",
          index: [32, 47],
          time: 2,
          on: false
        },
        {
          nombre: "jBallB",
          index: [47, 32],
          time: 2,
          on: false
        },
        {
          nombre: "background",
          index: [0, 5],
          on: false
        }
      ]
      this.time = 0
      this.frame = 0   
          this.setupEventListeners()    
          this.bucleDeJuego()
  }

  bucleDeJuego() {
    requestAnimationFrame(this.bucleDeJuego.bind(this))
    this.getRender()
  }

  setupEventListeners() {
    document.addEventListener('keydown', (event) => {
      const key = event.key
      const spriteIddle = this.sprites.find(sprite => sprite.nombre === 'iddle')
      const sprite = this.sprites.find(sprite => sprite.nombre === key && sprite.nombre !== 'iddle')
      if (spriteIddle && sprite) {
        spriteIddle.on = false
        sprite.on = true;
      }
    })
  
    document.addEventListener('keyup', (event) => {
      const key = event.key;
      const spriteIddle = this.sprites.find(sprite => sprite.nombre === 'iddle')
      const sprite = this.sprites.find(sprite => sprite.nombre === key && sprite.nombre !== 'iddle')
      if (spriteIddle && sprite) {
        spriteIddle.on = true
        sprite.on = false
      }
      if (spriteIddle.on) {
        this.frame = spriteIddle.index[0];
      }
    })
  }  
  
  getRender() { 
  let activeSprite = this.sprites.find(sprite => sprite.on && sprite.nombre !== 'iddle')
  this.sprite = activeSprite ? this.sprites.indexOf(activeSprite) : 0
  let [A,B] = activeSprite ? activeSprite.index : [0,13]
  this.time++
    if (this.time === 4) {
      if (A < B) {
        this.frame++  
      } else {
        this.frame--
      }
      if (this.sprite === 1) {  
        if (this.targetX < 1050) {
            this.targetX += 10
            const characterRightEdge = this.walkElement.getBoundingClientRect().right
            const containerWidth = this.canvas.clientWidth;
            if (characterRightEdge > containerWidth) {
                this.canvas.scrollBy({
                    left: 20,
                    behavior: 'smooth'
                })
            }
        } 
      } 
      if (this.sprite === 2) {
        if (this.targetX > 50) {
            this.targetX -= 10
            const characterLeftEdge = this.walkElement.getBoundingClientRect().left
            const containerWidth = this.canvas.clientWidth

            if (characterLeftEdge <= containerWidth) {
                this.canvas.scrollBy({
                    left: -20,
                    behavior: 'smooth'
                })
            }
        } 
      } 
      this.jumpElement.style.transition = `transform ${this.transitionSpeed / 20}s ease-in-out`
      this.jumpElement.style.transform = `translateX(${this.targetX}px)`  
      this.walkElement.style.transition = `transform ${this.transitionSpeed / 20}s ease-in-out`
      this.walkElement.style.transform = `translateX(${this.targetX}px)`
      this.iddleElement.style.transition = `transform ${this.transitionSpeed / 20}s ease-in-out`
      this.iddleElement.style.transform = `translateX(${this.targetX}px)`
      this.time = 0
    }
    if (A < B) {
      for (let i = 0; i < this.imgElements.length; i++) {
        if (i < A || i > B) {
          this.imgElements[i].classList.remove("active")
        }
      }
      for (let i = A; i <= B; i++) {
        const isEven = i % 2 === 0 
        const nextIndex = isEven ? i + 1 : i - 1 
        if (this.frame >= B) {
          this.frame = A;
        }
        if (i === this.frame || nextIndex === this.frame) {
          this.imgElements[i].classList.add("active")
        } else {
          this.imgElements[i].classList.remove("active")
        }
      }
    } 
    if (B < A) {
      if (this.frame <= B) {
        this.frame = A
      }
      for (let i = 0; i < this.imgElements.length; i++) {
        if (i < B || i > A) {
          this.imgElements[i].classList.remove("active")
        }
      }
      for (let i = A; i >= B; i--) {
        const isEven = i % 2 === 0
        const nextIndex = isEven ? i + 1 : i - 1 
        if (i === this.frame || nextIndex === this.frame) {
          this.imgElements[i].classList.add("active")
        } else {
          this.imgElements[i].classList.remove("active")
        }
      }
    }    
  }
}
