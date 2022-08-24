import {reactive} from '../mini/reactive';
import {watchEffect} from '../mini/dep'


describe('reactive', () => {
    // 设置值，添加依赖，修改值，触发依赖
    it('set value', () => {
        let temp:string|null = null
        const re = reactive({
            name: 'Tom'
        })
        watchEffect(() => temp = re.name)
        expect(temp).toBe('Tom')
        re.name = 'Jerry'
        expect(temp).toBe('Jerry')
    })
})
