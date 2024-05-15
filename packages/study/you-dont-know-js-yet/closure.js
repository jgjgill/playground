function range(start, end) {
  if (arguments.length === range.length) {
    console.log(getRange(start, end))
  } else {
    return function inner(end) {
      console.log(getRange(start, end))
    }
  }
}

function getRange(start, end) {
  const ret = []
  for (let i = start; i <= end; i++) {
    ret.push(i)
  }

  return ret
}

range(3, 3)
range(3, 8)
range(3, 0)

var start3 = range(3)
var start4 = range(4)

start3(3)
start3(8)
start3(0)

start4(6)
