export function parse(input: string) {
  return input.split('\n').map(line => line.split(''))
}

const directions = [
  { x: 1, y: 0 }, // straight right
  { x: 1, y: 1 }, // diagnal
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: -1, y: -1 },
  { x: 1, y: -1 }
]

export function partOne(input: ReturnType<typeof parse>) {
  const width = input[0].length
  const height = input.length

  let found = 0

  // brute force y'all because we in bun and bun is fast!
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const l = input[y][x]

      if (l === 'X') {
        // if X, let's see if ANY direction has xmas
        for (let i = 0; i < directions.length; i++) {
          const dir = directions[i]

          if (
            y + 3 * dir.y >= 0 &&
            y + 3 * dir.y < height &&
            x + 3 * dir.x >= 0 &&
            x + 3 * dir.x < width &&
            input[y + dir.y][x + dir.x] === 'M' &&
            input[y + 2 * dir.y][x + 2 * dir.x] === 'A' &&
            input[y + 3 * dir.y][x + 3 * dir.x] === 'S'
          ) {
            found++
          }
        }
      }
    }
  }

  return found
}

export function partTwo(input: ReturnType<typeof parse>) {
  const width = input[0].length
  const height = input.length

  let found = 0

  // brute force y'all because we in bun and bun is fast!
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const l = input[y][x]

      if (l === 'A') {
        // create a box around the A (if possible)
        if (x < 1 || y < 1 || y + 1 >= height || x + 1 >= width) {
          continue
        }

        let bx = x - 1
        let by = y - 1

        let ex = x + 1
        let ey = y + 1

        let mas = 0

        // determine if we have M and S in opposite corners
        if (
          (input[by][bx] === 'M' && input[ey][ex] === 'S') ||
          (input[ey][ex] === 'M' && input[by][bx] === 'S')
        ) {
          mas++
        }

        if (
          (input[by][ex] === 'M' && input[ey][bx] === 'S') ||
          (input[ey][bx] === 'M' && input[by][ex] === 'S')
        ) {
          mas++
        }

        // get letters at the corners
        if (mas === 2) {
          found++
        }
      }
    }
  }

  return found
}
