//part 1
/*
const fs = require('fs/promises');

async function readInput() {
  return (await fs.readFile('day3_input.txt', {encoding: 'utf8'})).split(/\r\n/g).map(sack => [sack.slice(0, sack.length/2), sack.slice(sack.length/2)])
}

(async function main() {
  const input = await readInput()
  
  const findCommonChar = (sack) => {
    const compartments = sack.map(compartment => compartment.split(''))
    return compartments[0].reduce((foundItem, item) => !foundItem ? compartments[1].includes(item) && item : foundItem
    , undefined)
  }
  
  const commonItems = input.map(findCommonChar)
  
  const lowerOffset = 96
  const upperOffset = 65 - 27

  const total = commonItems.reduce((sum, item) => {
    const code = item.charCodeAt()
    return sum + code - ( code >= 97 ? lowerOffset : upperOffset)
  }, 0)

  console.log( total )

})()
*/
//part 2

const fs = require('fs/promises');

async function readInput() {
  return (await fs.readFile('day3_input.txt', {encoding: 'utf8'})).split(/\r\n/g)
}

(async function main() {
  const input = await readInput()

  const compartments = input.map(sack => [sack.slice(0, sack.length/2).split(''), sack.slice(sack.length/2).split('')])

  const groups = []  
  input.forEach((elf,i) => {
    if (i === 0 || groups[groups.length - 1].length === 3) return groups.push([elf.split('')])
    groups[groups.length - 1].push(elf.split(''))
  })

  const findCommonChar = (first, ...rest) =>
    first.reduce((foundItem, item) =>
      rest.every( list => list.includes(item) ) ? item : foundItem
    , undefined)

  const commonItems = compartments.map(itemsList => findCommonChar(...itemsList))

  const commonBadges = groups.map(group => findCommonChar(...group))
  
  const lowerOffset = 96
  const upperOffset = 65 - 27

  const getTotal = list => list.reduce((sum, item) => {
    const code = item.charCodeAt()
    return sum + code - ( code >= 97 ? lowerOffset : upperOffset)
  }, 0)

  // part 1
  console.log( getTotal(commonItems) )
  // part 2
  console.log(getTotal(commonBadges))
  
})()