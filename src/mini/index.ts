import {options} from 'types/mini/index'


class App<T>{
    $el: HTMLDivElement
    $data: T
    constructor(opt:options<T>){
        this.$el = document.querySelector(opt.el)! as HTMLDivElement
        this.$data = opt.data()
    }
    mount(){

    }
}


export {
    App
}