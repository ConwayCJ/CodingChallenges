const prompt = require('prompt-sync')({ sigint: true })

const hat = '^'
const hole = 'O'
const fieldCharacter = '░'
const pathCharacter = '*'
const playerCharacter = 'シ'

class Field {
  constructor(height,width) {
    this.field = this.generateField(height, width)
    this.height = height
    this.width = width
    this.posX = 0
    this.posY = 0
    this.hatPosition = this.findHat()
    this.run = true
  }

  generateField(height, width) {
    let returnedArray = Array(height)
    let randomXpos = Math.floor(Math.random() * width)
    let randomYpos = Math.floor(Math.random() * height)
    for (let i = 0; i < returnedArray.length; i++) {
      returnedArray[i] = new Array(width)
    }

    for (let row = 0; row < returnedArray.length; row++) {
      for (let col = 0; col < returnedArray[row].length; col++) {
        if (Math.floor(Math.random() * 5 + 1) == 1) {
          returnedArray[row][col] = hole
        } else returnedArray[row][col] = fieldCharacter
      }
    }
    returnedArray[0][0] = pathCharacter
    returnedArray[randomYpos][randomXpos] = hat
    return returnedArray
  }

  findHat() {
    return this.field.reduce((hatPos, fieldRow, index) => {
      if (fieldRow.indexOf(hat) > -1) {
        hatPos[0] = fieldRow.indexOf(hat)
        hatPos[1] = index
      }
      return hatPos
    }, Array(2))
  }

  moveRight() {
    if( this.posX < this.width -1) {
      this.posX += 1
    }
  }
  moveLeft() {
    if (this.posX !== 0 || this.posX > 0) {
      this.posX -= 1
    }
  }
  moveUp() {
    if (this.posY > -1) {
      this.posY -= 1
      if (this.posY < 0) {
        this.posY = 0
      }
    }
  }
  moveDown() {
    if (this.posY < this.height -1){ 
      this.posY += 1
    }
  }

  queryPlayerMove() {
    let isValidMove = false

    while (!isValidMove) {
      const queryDirection = prompt(
        'Choose a Move: Up, Down, Left, Right, Quit: '
      ).toLowerCase()
      console.log(queryDirection)
      switch (true) {
        case queryDirection.startsWith('u'):
          this.moveUp()
          isValidMove = true
          break
        case queryDirection.startsWith('d'):
          this.moveDown()
          isValidMove = true
          break
        case queryDirection.startsWith('l'):
          this.moveLeft()
          isValidMove = true
          break
        case queryDirection.startsWith('r'):
          this.moveRight()
          isValidMove = true
          break;
        case queryDirection.startsWith('q'):
          console.log('Goodbye!')
          this.run = false
          isValidMove = true
          break;
        default:
          console.log('Please enter a valid move.')
      }
    }
  }

  checkWin() {
    if (this.hatPosition[0] == this.posX && this.hatPosition[1] == this.posY) {
      console.log('Congratulations, you found your hat!')
      this.run = false
    }
  }

  checkLoss() {
    if (this.field[this.posY][this.posX] === hole) {
      console.log('You fell in a hole! Try again')
      this.run = false
    }
  }

  print() {
    this.field.forEach((row) => console.log(row.join(' ')))
  }

  start() {
    while (this.run) {
      this.print()
      this.queryPlayerMove()
      this.checkLoss()
      this.field[this.posY][this.posX] = pathCharacter
      this.checkWin()
    }
  }
}

//constructor takes height & width of the play field.
const myField = new Field(8,5)
myField.start()
