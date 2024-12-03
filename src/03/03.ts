export function parse(input: string) {
  return input
}

export function partOne(input: ReturnType<typeof parse>) {
  const muls = input.match(/mul\(\d+,\d+\)/g)

  return muls?.reduce((pv, cv) => {
    const res = cv.replaceAll('mul(', '').replaceAll(')', '').split(',')

    if (res.length < 2) {
      console.log('something wrong')
      return pv
    }

    return pv + Number(res[0]) * Number(res[1])
  }, 0)
}

export function partTwo(input: ReturnType<typeof parse>) {
  const muls = input.match(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g)
  console.log(muls)

  return muls?.reduce(
    (pv, cv) => {
      if (pv.do === false && cv !== 'do()') {
        return pv
      }

      if (cv === "don't()") {
        return { ...pv, do: false }
      }

      if (cv === 'do()') {
        return { ...pv, do: true }
      }

      const res = cv.replaceAll('mul(', '').replaceAll(')', '').split(',')

      if (res.length < 2) {
        console.log('something wrong')
        return pv
      }

      return { ...pv, val: pv.val + Number(res[0]) * Number(res[1]) }
    },
    { val: 0, do: true }
  ).val
}
