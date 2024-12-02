export function parse(input: string) {
  const lines = input.split('\n')

  const res = lines
    .map(line => {
      const nums = line.split(' ')

      return nums.map(v => Number(v))
    })
    .filter(nums => nums.length > 0)

  return res
}

export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((pv, level) => {
    let dir = ''

    let safe = true

    level.forEach((num, i) => {
      if (!safe) {
        return
      }

      if (i === level.length - 1) {
        return
      }

      const distance = num - level[i + 1]

      // figure out direction
      if (i === 0) {
        if (distance < 0) {
          dir = 'asc'
        }

        if (distance > 0) {
          dir = 'desc'
        }
      }

      // determine if we are still in right direction
      if (distance < 0 && dir !== 'asc') {
        safe = false
      }

      if (distance > 0 && dir !== 'desc') {
        safe = false
      }

      if (Math.abs(distance) > 3) {
        safe = false
      }

      if (Math.abs(distance) < 1) {
        safe = false
      }
    })

    console.log(`level ${level} is ${safe}`)

    if (safe) {
      return pv + 1
    }

    return pv
  }, 0)
}

export function partTwo(input: ReturnType<typeof parse>) {
  const isSafe = (l: number[]) => {
    let dir = ''
    let safe = true

    l.forEach((num, i) => {
      if (!safe) {
        return
      }

      if (i === l.length - 1) {
        return
      }

      const distance = num - l[i + 1]

      // figure out direction
      if (i === 0) {
        if (distance < 0) {
          dir = 'asc'
        }

        if (distance > 0) {
          dir = 'desc'
        }
      }

      // determine if we are still in right direction
      if (distance < 0 && dir !== 'asc') {
        safe = false
      }

      if (distance > 0 && dir !== 'desc') {
        safe = false
      }

      if (Math.abs(distance) > 3) {
        safe = false
      }

      if (Math.abs(distance) < 1) {
        safe = false
      }
    })

    return safe
  }

  return input.reduce((pv, level) => {
    // loop through each level but taking one away each time to see if it is safe

    // first see if it is safe originally
    if (isSafe(level)) {
      return pv + 1
    }

    for (let i = 0; i < level.length; i++) {
      const nl = noItem(level, i)

      if (isSafe(nl)) {
        return pv + 1
      }
    }

    return pv
  }, 0)
}

function noItem<T>(originalArray: T[], indexToRemove: number): T[] {
  return originalArray.filter((_, index) => index !== indexToRemove)
}
