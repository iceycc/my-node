## 可读流
```js
const fs = require("fs");
let rs = fs.createReadStream(path,{
    flags:"r",
    mode:"0o666",
    enconding:"utf8",
    start:0,
    end:100,
    highWaterMark:10,
    autoClose:true
})
rs.on("open",fd=>{
    console.log(fd)
})
rs.on("data",chunk=>{
    rs.pause()
})
rs.on("end",()=>{

})
rs.on("close",()=>{

})
rs.on("error",()=>{

})
setInterval(()=>{
    rs.resume()
},1000)
```
## 可写流
```js
let ws = fs.createWriteStream(path,{
    flags:"w",
    mode:"0o666",
    enconding:"utf8",
    start:0,
    highWaterMark:2,
    autoClose:true
})

let index = 10
function write(){
    while(--index>0){
        let w = ws.write("ok1","utf8")
        if(!w){
            break
        }
    }
    if(index===0){
        ws.end()
    }
}
ws.on("drain",()=>{
    console.log("drain")
    write() 
})
ws.on("close",()=>{})
ws.on("error",()=>{})
write()
```
