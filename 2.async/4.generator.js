
function * read(){
    let y1 = yield 111
    console.log(y1)
    yield 555
}

let it = read()
console.log(it.next())
console.log(it.next(1))
console.log(it.next(2))

