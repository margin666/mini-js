import {options} from 'types/mini/index'
import {compiler} from './compiler'


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


