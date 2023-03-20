import arrayStack from "./ArrayStack";


function isValid(s: string): boolean{
    const stack = new arrayStack<string>()
    //循环获取每一个括号，如果为左括号，则将对应的右括号压入栈中，当遇到右括号，用栈顶的括号与之匹配，符合就继续匹配，不符合返回false
    //在最后判断一下栈内是否为空
    for(let i = 0; i < s.length; i++){
        const c  = s[i]
        switch(c){
            case "(":
                stack.push(")");
                break;
            case "[":  
                stack.push("]");
                break;
            case "{":  
                stack.push("}");
                break;
            default:
                if(c !== stack.pop()) return false;
                break;
        }
    }

    return stack.isEmpty()
}


// console.log(isValid("{}{}[]()"))
// console.log(isValid("{}{}[)"))