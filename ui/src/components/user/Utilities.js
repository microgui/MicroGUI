export function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1, str.length);
}

export function handleStop(actions, node) {
    const canvas = document.getElementById('canvasElement').getBoundingClientRect();
    const rect = node.current.getBoundingClientRect()
    const relativePos = {}
    relativePos.left = rect.left - canvas.left
    relativePos.top = rect.top - canvas.top
    actions.setProp((props) => {
        props.pageX = relativePos.left;
        props.pageY = relativePos.top;
    })
}

export function getX(pageX, node) {
    const canvas = document.getElementById('canvasElement')?.getBoundingClientRect()
    if (pageX < 0) return 0
    if (node.current) {
        const element = node.current.getBoundingClientRect()
        if (pageX + element.width > canvas.width) return canvas.width - element.width
    }
    return pageX
}

export function getY(pageY, node) {
    const canvas = document.getElementById('canvasElement')?.getBoundingClientRect()
    if (pageY < 0) return 0
    if (node.current) {
        const element = node.current.getBoundingClientRect()
        if (pageY + element.height > canvas.height) return canvas.height - element.height
    }
    return pageY
}