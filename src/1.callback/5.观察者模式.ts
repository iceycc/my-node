
// 发布订阅模式：发布--（中介）---订阅
// 发布和订阅直接没有直接的关联

// 观察者模式， 观察者和被观察者之间有直接的联系 （内部还是发布订阅）

class Subject { // 被观察者
    name: string;
    obsevers: Array<Obsever>;
    status: string;
    constructor(name:string) {
        this.name = name
        this.obsevers = []
        this.status = '我现在很开心'
    }
    attach(o:Obsever) {
        this.obsevers.push(o)
    }
    setState(newState:string) {
        this.status = newState
        this.obsevers.forEach(o => {
            o.update(this)
        })
    }
}

class Obsever { // 观察者
    name: string;
    constructor(name:string) {
        this.name = name
    }
    update(stats:Subject) {
        console.log(stats.name + '对' + this.name + '说' + stats.status)
    }
}

// 有个小宝贝，我和我媳妇需要观察小宝宝

let baby = new Subject('小宝宝')

// 
let o1 = new Obsever('爸爸')
let o2 = new Obsever('妈妈')

baby.attach(o1)
baby.attach(o2)

baby.setState('我现在不开心了')

baby.setState('我现在又开心了')