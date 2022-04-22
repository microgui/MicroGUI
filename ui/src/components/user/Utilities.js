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