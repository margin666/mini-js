
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

const zz = /\{\{\s*(\S+)\s*\}\}/
function changeText(node: ChildNode, $data: any) {
    if (node.nodeType === 3) {
        const nodev = node.nodeValue
        if (typeof nodev !== 'string') return
        const arr = zz.exec(nodev)
        if (arr === null) return
        const keyArr = arr[1].split('.')
        if (keyArr.length === 1) {
            watchEffect(() => {
                node.nodeValue = nodev.replace(zz, $data[keyArr[0]].value)
            })

        } else {
            watchEffect(() => {
                const value = keyArr.reduce((total, current) => total[current], $data)
                node.nodeValue = nodev.replace(zz, value)
            })

        }

        return
    }
    node.childNodes.forEach(el => changeText(el, $data))
}