interface IType<T>{
    peek():T | undefined
    isEmpty():boolean
    size():number
}

export default IType

