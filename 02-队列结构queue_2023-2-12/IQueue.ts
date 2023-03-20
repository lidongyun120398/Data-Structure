import IType from "../IType/IType"

interface IQueue<T> extends IType<T> {
    enqueue(element):void//向队尾添加一/多个
    dequeue():T | undefined//移除队列的第一个并返回
    // peek():T | undefined//返回队列的第一项，不改变队列
    // isEmpty():boolean//判断队列是否为空
    // size():number//返回队列长度
}


export default IQueue