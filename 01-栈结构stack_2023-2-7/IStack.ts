import IType from "../IType/IType"

interface IStack<T> extends IType<T> {
    push(element: T): void,//入栈
    pop():T | undefined,//出栈
    // peek():T | undefined,//查询栈顶
    // isEmpty():boolean,//查询是否为空栈
    // size():number//查询当前栈大小
}

export default IStack