
import { App } from './index'
import { watchEffect } from './dep'
export function compiler(app: App<any>) {
    const { $el, $data } = app
    const fragment = document.createDocumentFragment()
    let child: ChildNode | null = null
    while (child = $el.firstChild) {
        fragment.append(child)
    }
    changeText(fragment as unknown as ChildNode, $data)
    $el.append(fragment)
}



function execAll(reg: RegExp, str: string) {
    str = str.replace(/\s/gm, '')
    let result = []
    let res = reg.exec(str)
    // console.log(reg)
    // console.log(str)
    while (res) {
        result.push(res)
        res = reg.exec(str)
    }
    return result
}




function changeText(node: ChildNode, $data: any) {
    const zz = /\{\{\s*([\w\.]+)\s*\}\}/g
    if (node.nodeType === 3) {
        const nodev = node.nodeValue
        if (typeof nodev !== 'string') return

        // 只能匹配一组
        // const arr = zz.exec(nodev)
        // if (arr === null) return
        // const keyArr = arr[1].split('.')
        // if (keyArr.length === 1) {
        //     watchEffect(() => {
        //         node.nodeValue = nodev.replace(zz, $data[keyArr[0]].value)
        //     })

        // } else {
        //     watchEffect(() => {
        //         const value = keyArr.reduce((total, current) => total[current], $data)
        //         node.nodeValue = nodev.replace(zz, value)
        //     })

        // }


        // 处理多个结果
        const arr = execAll(zz, nodev)

        if (arr.length === 0) return
        if (arr.length === 1) {
            const key = arr[0][1].split('.')
            watchEffect(() => {
                node.nodeValue = nodev.replace(zz, $data[key[0]].value)
            })
        }
        if (arr.length > 1) {
            
            watchEffect(() => {
                // 用来保存每一次循环替换之后的内容
                let nodevCopy = nodev
                arr.forEach(el => {
                    const key = el[1].split('.')
                    const value = key.reduce((total, current) => total[current], $data)
                    const reg = new RegExp(`\{\{\s*(${el[1]})\s*\}\}`)
                    node.nodeValue = nodevCopy.replace(reg, value)
                    nodevCopy = node.nodeValue
            })

            })
        }



        // arr.map(regexp => {
        //     const key = regexp[1].split('.')
        //     if (key.length === 1) {
        //         watchEffect(() => {
        //             node.nodeValue = nodev.replace(zz, $data[key[0]].value)
        //         })
        //     } else {

        //         watchEffect(() => {
        //             const value = key.reduce((total, current) => total[current], $data)
        //             console.log('---', key)
        //             console.log('---', value)
        //             console.log('---', nodev)
        //             node.nodeValue = nodev.replace(key.join('.'), value)
        //         })
        //     }
        // })


        return
    }
    node.childNodes.forEach(el => changeText(el, $data))
}