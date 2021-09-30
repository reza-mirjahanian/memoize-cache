function sorting(obj) {
  let sortedKeys = Object.keys(obj).sort(function(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  })

  const clone = {}

  for (let key of sortedKeys) {
    clone[key] = obj[key]
  }

  return clone
}

export function memoize(fn) {
  // implement here
  const hashTAble = new Map();
  return (...args) => {
    let argKey = JSON.stringify(args);

    if (typeof args[0] === 'object') {
      argKey = JSON.stringify(sorting(args[0]))
    }

    if (hashTAble.has(argKey)) {
      return hashTAble.get(argKey)
    } else {
      const output = fn(...args)
      hashTAble.set(argKey, output)
      return output
    }
  }
}

export function cache(fn) {
  // implement here
  const hashTable = new Map();
  let total = 0
  return {
    hitCount: () => {
      return total
    },
    clear: () => {
      total = 0
      hashTable.clear()
    },
    fn: (...args) => {
      let argKes = JSON.stringify(args);

      if (hashTable.has(argKes)) {
        total++;
        return hashTable.get(argKes)
      } else {
        const output = fn(...args)
        hashTable.set(argKes, output)
        return output
      }
    }

  }
}
