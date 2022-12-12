let testInput = [
  '30373',
  '25512',
  '65332',
  '33549',
  '35390'
]

// 012 <-- 4 -->> 321
//we want to check if visible from the left
//take the string, splice it from the index to get our left/right
// .sort it, and if every number < current number - TRUE// add a value

const fs = require('fs/promises')

async function readInput() {
  return (await fs.readFile('day8_input.txt', { encoding: 'utf8' })).split(
    /\r\n/g
  )
}

(async function main() {
  let input = await readInput()

  let grid = []
  let totalVisibleTrees = 0
  let gridString = ''

  input.forEach((line, index) => {
    for (let i = 0; i < line.length; i++) {
      let column = input.map((line) => line[i])

      let topSide = column.slice(0,index)
      let bottomSide = column.slice(index+1, column.length)
      let leftSide = line.slice(0, i)
      let rightSide = line.slice(i + 1, line.length)

      let currentTree = line[i]

      // console.log('current tree', currentTree)
      // console.log('current column: ', column)
      // console.log('current line:', line, '\n')

      // console.log('top', topSide)
      // console.log('bottom', bottomSide)
      // console.log('left: ', leftSide)
      // console.log('right: ', rightSide, '\n')

      //<-- checks edges -- >
      // resets values every line to undefined. undefined = has an edge & is visible

      if (
        topSide == undefined ||
        bottomSide == undefined ||
        leftSide == undefined ||
        rightSide == undefined
      ) {
        totalVisibleTrees++
        gridString += 'x'
      } else if (
        currentTree > Math.max(...leftSide) ||
        currentTree > Math.max(...rightSide) ||
        currentTree > Math.max(...topSide) ||
        currentTree > Math.max(...bottomSide)
      ) {
        totalVisibleTrees++
        gridString += 'x'
      } else {
        gridString += 'o'
      }
      //< -- Done checking edges -- >

      console.log('total trees:', totalVisibleTrees)
    }
    grid.push(gridString)
    gridString = ''
  })
  // console.table(grid)
})()
