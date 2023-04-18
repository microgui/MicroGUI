/* Helper function that takes a string and capitalize 
   the first letter of it. */
export function capitalize(str) {
    return str[0].toUpperCase() + str.substr(1, str.length);
}

/* Function used by the components to save their coordinates 
   after being dragged. */
export function handleStop(actions, node) {
    // getting the bounds of the parent
    const parent = node.current.parentNode.getBoundingClientRect();
    // getting the bounds of the specific node(component)
    const rect = node.current.getBoundingClientRect()
    // store the components position relative to the parent
    const relativePos = {
        left: rect.left - parent.left,
        top: rect.top - parent.top
    }
    // update the props of the component
    actions.setProp((props) => {
        props.pageX = Math.round(relativePos.left)
        props.pageY = Math.round(relativePos.top)
    })
}

/* get the correct x position for the component, adjusting
   to make sure the component is contained in the parent */
export function getX(pageX, node) {

    if (node.current) { // is null before first update
        const parent = node.current.parentNode.getBoundingClientRect()
        // Checks if parent is a container
        if (pageX < 0 || node.current.parentNode.id.includes('Container') ) return 0
        const element = node.current.getBoundingClientRect()
        // checks if the component is outside of the parent, if 
        // it is then it will get a 'correct' position
        if (pageX + element.width > parent.width) return parent.width - element.width
    }
    return pageX
}

/* get the correct y position for the component, adjusting
   to make sure the component is contained in the parent */
export function getY(pageY, node) {

    if (node.current) { // is null before first update
        const parent = node.current.parentNode.getBoundingClientRect()
        // Checks if parent is a container
        if (pageY < 0 || node.current.parentNode.id.includes('Container'))  return 0
        const element = node.current.getBoundingClientRect()
        if (pageY + element.height > parent.height) return parent.height - element.height
    }
    return pageY
}

export let ws;

export function getWS() {
    //console.log('get websocket')
    return ws
}

export function setWS(webSocket) {
    //console.log('set websocket')
    ws = new WebSocket(webSocket);
}
