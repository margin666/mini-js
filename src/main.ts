import {App} from './mini/index'



interface data{
    name: string;
}



const app = new App<data>({
    el: '#app',
    data(){
        return {
            name: '张三'
        }
    },
})


app.mount()