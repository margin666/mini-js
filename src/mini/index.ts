import {options} from 'types/index'
import {compiler} from './compiler'
export * from './reactive'
export * from './ref'
export {watchEffect} from './dep'


export class App<T>{
    $el: HTMLDivElement
    $data: T
    constructor(opt:options<T>){
        this.$el = document.querySelector(opt.el)! as HTMLDivElement
        this.$data = opt.setup()
    }
    render(){
        compiler(this)
    }
}


