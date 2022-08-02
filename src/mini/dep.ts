
export type depType = number | string | boolean | bigint | symbol
type tempEffectType = null | Function

let tempEffect:tempEffectType = null
export class Dep<T>{
    private data: T
    private events: Set<Function>
    constructor(val:T){
        this.data = val
        this.events = new Set()
    }
    get value(){
        this.addEffect() // 获取值的时候收集effect
        return this.data
    }
    set value(val: T){
        this.data = val
        this.notice() // 值发生改变，触发对应的所有effect
    }

    // 添加effect
    addEffect(){
        if(tempEffect){
            this.events.add(tempEffect)
        }
    }

    // 执行所有已收集的effect
    notice(){
        for(let effect of this.events){
            effect()
        }
    }
}

export function watchEffect(fn:Function){
    tempEffect = fn
    fn()
    tempEffect = null
}

