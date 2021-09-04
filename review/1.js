Promise.resolve().then(() => {
    console.log("then1");
    Promise.resolve().then(() => {
        console.log("then1-1");
        return Promise.resolve();
        // -》PromiseA+是代表return一个普通值，然后会多一个then；但是es6规范会多延迟一次，等价于两个then
    }).then(() => {
        console.log("then1-2");
    });
})
    .then(() => {
        console.log("then2");
    })
    .then(() => {
        console.log("then3");
    })
    .then(() => {
        console.log("then4");
    })
    .then(() => {
        console.log("then5");
    })

// Promise A+
//我的猜测 then1 then1-1  then2 then3 then1-2 then4 then5

//实际： then1 then1-1 then2 then3 then4 then1-2 then5
