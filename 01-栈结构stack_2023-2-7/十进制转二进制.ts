import arrayStack from "./ArrayStack";


function decToBin(decimal: number): string{
    const stack = new arrayStack<number>()//创建栈
    while(decimal != 0){//如果传入的十进制参数比0大就一直循环
        let result = decimal % 2//取余压入栈中
        stack.push(result)
        decimal = Math.floor(decimal / 2)//因为上面取余了所以下一次的十进制数要取现在的一半
    }
    let binStr = ""
    while(!stack.isEmpty()){//循环出栈内所有的数据，拼接到一起生成二进制
        let binWord = stack.pop()
        binStr += binWord
    }
    return binStr
}


// console.log(decToBin(35))