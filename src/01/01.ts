export function parse(input: string) {
  const lines = input.split(/\r\n|\r|\n/)

  let left: number[] = []
  let right: number[] = []

  lines.forEach(line => {
    const sides = line.split('   ')

    if (sides.length < 2) {
      return
    }

    left.push(Number(sides[0]))
    right.push(Number(sides[1]))
  })

  return { left, right }
}

export function partOne(input: ReturnType<typeof parse>) {
  const sortedLeft = [...input.left].sort((a, b) => a - b)
  const sortedRight = [...input.right].sort((a, b) => a - b)

  const res = sortedLeft.reduce((pv, cv, i) => {
    const distance = Math.abs(sortedLeft[i] - sortedRight[i])

    return pv + distance
  }, 0)

  return res
}

export function partTwo(input: ReturnType<typeof parse>) {
  const numTimes = (arr: number[], val: number) => {
    return arr.reduce((pv, cv) => {
      if (cv === val) {
        return pv + 1
      }

      return pv
    }, 0)
  }

  return input.left.reduce((pv, cv) => {
    return pv + numTimes(input.right, cv) * cv
  }, 0)
}
