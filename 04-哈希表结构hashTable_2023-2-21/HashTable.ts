class HashTable<T>{
    //定义一个数据存入,用来存放链表的地址，地址中是<key,value>
    storage: [string,T][][] = []
    //定义数组的长度
    private length: number = 7
    //记录已经存放的元素的长度
    private count: number = 0

    private hashFunc(key: string,max: number): number{
        //利用霍纳法则计算索引
        let hashCode = 0
        const length = key.length
        for(let i = 0;i < length;i++){
            //霍纳法则，取出i所对应的值，与前面计算出来的hashCode相加 cats => 60337(27为底),这里以31为底
            //这里用霍纳法则为什么这么算，不太懂，charCodeAt是取字符串i位置的unicode值
            hashCode = 31 * hashCode + key.charCodeAt(i)
        }

        //上面算出来的hashCode取余，压缩，计算出放入链表中的索引
        const index = hashCode % max

        return index
    }

    //扩容/缩容，当装填因子达到0.75时进行扩容0.25时进行缩容
    private resize(newLength: number){
        let newPrime =  this.getNextPrime(newLength)
        if(newPrime < 7) newPrime =  7

        this.length = newPrime
        //定义一个新的storage去记录原来的storage，给后续重新生成使用
        let oldStorage = this.storage
        this.storage = []
        this.count = 0
        oldStorage.forEach(bucket => {
            if(!bucket) return 

            for(let i = 0;i < bucket.length;i++){
                const tuple = bucket[i]
                this.put(tuple[0],tuple[1])
            }
        })
    }


    //判断是否为质数
    private isPrime(num:number): boolean{
        const sqrt = Math.sqrt(num)
        for(let i = 2;i < sqrt;i++){
            if(num % i === 0) return false
        }

        return true
    }
    //查找下一个质数
    private getNextPrime(num:number):number{
        let newPrime = num
        while(!this.isPrime(newPrime)){
            newPrime++
        }
        
        return newPrime
    }
    
    //插入或修改
    put(key: string,value: T){
        //根据key获取索引值
        const index = this.hashFunc(key,this.length)
        //取出索引值对应位置的数组（桶）
        let bucket = this.storage[index]
        //判断该桶内是否有值，没值给storage[index]一个空数组
        if(!bucket) {
            bucket = []
            this.storage[index] = bucket
        }
        //循环遍历桶判断内部有没有这个key，没有添加，有就修改
        let isUpdate = false
        for(let i = 0;i < bucket.length;i++){
            const tuple = bucket[i]
            //tuple是一个元组，取到其中的key和value要分别取tuple[0]和tuple[1]
            const tupleKey = tuple[0]
            if(tupleKey === key){
                tuple[1] = value
                isUpdate = true
            }
        }
        //上面代码没找到key去覆盖value值，所以这里要进行添加
        if(!isUpdate){
            bucket.push([key,value])
            this.count++

            const loadFactor = this.count / this.length
            if(loadFactor > 0.75){
                this.resize(this.length * 2)
            }
        }

        
    }

    //根据key获取值
    get(key: string): T | undefined{
        //获取索引值
        const index = this.hashFunc(key,this.length)
        const bucket = this.storage[index]
        //判断这个索引位置有没有桶，有就遍历查值，没有就直接返回undefined
        if(!bucket) return undefined
        for(let i = 0;i < bucket.length;i++){
            const tuple = bucket[i]
            const tupleKey = tuple[0]
            const tupleValue = tuple[1]
            if(tupleKey === key) return tupleValue
        }
        return undefined
    }

    //根据key删除值
    delete(key: string): T | undefined{
        // 1.获取索引值的位置
    const index = this.hashFunc(key, this.length)

    // 2.获取bucket(桶)
    const bucket = this.storage[index]
    if (!bucket) return undefined

    // 3.遍历桶数组
    for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i]
        const tupleKey = tuple[0]
        const tupleValue = tuple[1]
        if (tupleKey === key) {
            bucket.splice(i, 1)
            this.count--

            // 如果loadFactor小于0.25, 缩容操作
            const loadFactor = this.count / this.length
            if (loadFactor < 0.25 && this.length > 7) {
                this.resize(Math.floor(this.length / 2))
            }

            return tupleValue
            }
        }

        return undefined
    }
}


const hashTable = new HashTable()
hashTable.put("aaa", 100)
hashTable.put("aaa", 200)
hashTable.put("bbb", 300)
hashTable.put("ccc", 400)
hashTable.put("abc", 111)
hashTable.put("cba", 222)

console.log(hashTable.storage)

hashTable.put("nba", 333)
hashTable.put("mba", 444)
console.log(hashTable.storage)


hashTable.delete("nba")
hashTable.delete("mba")
hashTable.delete("abc")
hashTable.delete("cba")
hashTable.delete("aaa")

console.log(hashTable.storage)

export default HashTable
