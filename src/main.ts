import {App} from './mini/index'
import {ref} from './mini/ref'
import {reactive} from './mini/reactive'

const app = new App({
    el: '#app',
    setup(){
        const name = ref('张三')
        const list = reactive({
            name: 3
        })
        const btn = document.getElementById('btn')! as HTMLButtonElement
        btn.addEventListener('click', () => {
            list.name = 12
        })
        return {
            name,
            list
        }
    },
})
app.render()

