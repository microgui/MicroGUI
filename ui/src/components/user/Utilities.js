/* Helper function that takes a string and capitalize 
   the first letter of it. */
export function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1, str.length);
}

/* Function used by the components to save their coordinates 
   after being dragged. */
export function handleStop(actions, node) {
    // getting the bounds of the canvas
    const canvas = document.getElementById('canvasElement').getBoundingClientRect();
    // getting the bounds of the specific node(component)
    const rect = node.current.getBoundingClientRect()
    // store the components position relative to the canvas
    const relativePos = {
        left: rect.left - canvas.left,
        top: rect.top - canvas.top
    }
    // update the props of the component
    actions.setProp((props) => {
        props.pageX = relativePos.left
        props.pageY = relativePos.top
    })
}

/* get the correct x position for the component, adjusting
   to make sure the component is contained in the canvas */
export function getX(pageX, node) {
    const canvas = document.getElementById('canvasElement')?.getBoundingClientRect()
    if (pageX < 0) return 0
    // making sure there is a node
    if (node.current) {
        const element = node.current.getBoundingClientRect()
        // checks if the component is outside of the canvas, if 
        // it is then it will get a 'correct' position
        if (pageX + element.width > canvas.width) return canvas.width - element.width
    }
    return pageX
}

/* get the correct y position for the component, adjusting
   to make sure the component is contained in the canvas */
export function getY(pageY, node) {
    const canvas = document.getElementById('canvasElement')?.getBoundingClientRect()
    if (pageY < 0) return 0
    if (node.current) {
        const element = node.current.getBoundingClientRect()
        if (pageY + element.height > canvas.height) return canvas.height - element.height
    }
    return pageY
}