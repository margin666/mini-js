import {Dep, watchEffect} from '../mini/dep';

describe('dep instance', () => {
    
    it('dep attribute and methods', () => {
        let notes:number = 0;
        const dep = new Dep<number>(2)
        watchEffect(() => {
            notes = dep.value
        })
        expect(notes).toBe(2)
        // dep修改值
        dep.value = 3
        expect(notes).toBe(3)
    })

    it('watchEffect', () => {
        // 收集依赖时，触发一次依赖
        const fn = jest.fn(() => {})
        watchEffect(fn)
        expect(fn).toHaveBeenCalledTimes(1)
    })


})

