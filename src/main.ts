import {App, ref, reactive} from './mini/index'

const app = new App({
    el: '#app',// 挂载的节点
    setup(){
        const name = ref('张三')
        const list = reactive({
            name: 'Tom',
            age: 3
        })
        const btn = document.getElementById('btn')! as HTMLButtonElement
        btn.addEventListener('click', () => {
            list.name = 'Jerry'
            list.age = 6
        })

        //将响应的数据return
        return {
            name,
            list
        }
    },
})
app.render()// 将插值表达式{{ ... }}替换为对应的数据

