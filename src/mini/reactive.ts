import {Dep, depType} from './dep'
type reactiveType = Record<string|symbol, depType>
export function reactive<T extends reactiveType>(obj:T){
    return new Proxy(obj, {
        get(target:T, key, receiver){
            const dep = getDep(target, key)
            dep.addEffect()
            return Reflect.get(target, key, receiver)
        },
        set(target: T, key, value, receiver){
            const dep = getDep(target, key)
            const result = Reflect.set(target, key, value, receiver)
            dep.notice()
            return result
        }
    })
}


let targetMap = new Map<reactiveType, Map<keyof reactiveType, Dep<depType>>>()
function getDep(target:reactiveType, key:keyof reactiveType){
    let deps = targetMap.get(target)
    if(!deps){
        deps = new Map<keyof reactiveType, Dep<depType>>()
        targetMap.set(target, deps)
    }
    let dep = deps.get(key)
    if(!dep){
        dep = new Dep<depType>(target[key])
        deps.set(key, dep)
    }
    return dep
}