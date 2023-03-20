interface ILink<T> {
    append(value:T):void
    insert(position:number,value:T):boolean
    get(position:number):T | null
    indexOf(value:T):number
    update(position:number,value:T):boolean
    removeAt(position:number):T | null
    remove(value:T):T | null
    isEmpty():boolean
    get size():number
    traverse()
}

export default ILink