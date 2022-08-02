import {Dep, depType} from './dep'

export function ref(val:depType){
    return new Dep(val)
}