"use strict";

class Context {
    constructor(){
        this.next = 0;
        this.done = false;
    }
    stop(){
        this.done = true;
    }
}

let regeneratorRuntime = {
    mark(generatorFn){
        return generatorFn
    },
    wrap(innerFn,outerFn){
       let it = {}
       let context = new Context();
       it.next = function(val){
           context.sent = val
           let value = innerFn(context)
           return {
               value:value,
               done:context.done,
           }
       }
       return it
    }
}

// function * read() {
//     let a =  yield 1;
//     console.log(a);
//     let b = yield 2;
//     console.log(b);
//     let c = yield 3;
//     console.log(c);
// }

var _marked = regeneratorRuntime.mark(read);
function read() {
    var a, b, c;
    return regeneratorRuntime.wrap(function read$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return 1;

                case 2:
                    a = _context.sent;
                    console.log(a);
                    _context.next = 6;
                    return 2;

                case 6:
                    b = _context.sent;
                    console.log(b);
                    _context.next = 10;
                    return 3;

                case 10:
                    c = _context.sent;
                    console.log(c);

                case 12:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked);
}


let it = read()
console.log(it.next())
console.log(it.next('a'))
console.log(it.next('b'))
console.log(it.next('c'))
