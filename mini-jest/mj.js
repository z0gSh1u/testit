

export function test(description, body) {
  console.log('===== ' + description + ' =====')
  body()
}
export function expect(what) {
  let ret
  ret.toBe = (val) => {
    if (val !== what) {

    }
  }
}

