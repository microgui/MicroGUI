export function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1, str.length);
}

export function handleStart(e, actions) {
    const rect = e.target.getBoundingClientRect()
    actions.setProp((props) => {
        props.width = rect.width
        props.height = rect.height
    })
}

export function handleStop(e, actions) {
    const canvas = document.getElementById('canvasElement').getBoundingClientRect();
    const rect = e.target.getBoundingClientRect();
    const relativePos = {}
    relativePos.left = rect.left - canvas.left
    relativePos.top = rect.top - canvas.top
    actions.setProp((props) => {
        props.pageX = relativePos.left;
        props.pageY = relativePos.top;
    })
}

export function getBounds(height, width) {
    const getRect = () => {
        const element = document.getElementById("canvasElement")
        if (!element) {
            return {
                bottom: 0,
                height: 0,
                left: 0,
                right: 0,
                top: 0,
                width: 0,
            }
        }
        const rect = element.getBoundingClientRect()
        return rect
    }

    return { left: 0, top: 0, bottom: getRect().height - height, right: getRect().width - width }
}