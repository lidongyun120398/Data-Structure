class Person {
    name:string
    age:number

    constructor(name,age){
        this.name = name
        this.age = age
    }
    //通过建立该方法来进行比较
    //但是当两个对象的valueOf返回的age值是相同的，去判断p1 === p2结果也是false
    valueOf(){
        return this.age
    }
}

//正常情况下对象的大小是不能比较的
const p1 = new Person('ldy',18)
const p2 = new Person('james',30)