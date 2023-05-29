import { Switch as MaterialSwitch } from '@mui/material'
import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'
import Draggable from 'react-draggable'

import { Tooltip } from '../../tools/Tooltip'
import { SwitchSettings } from './SwitchSettings'

import { handleStop, getX, getY, getWS } from '../Utilities'

/**
 * Creates a switch object that can be toggled.
 * @returns The 'switch' object.
 */
export const Switch = ({
  size, color, pageX, pageY, state, event,
  defaultChecked, ...props
}) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }))

  const {
    id,
    name,
    connectors: { connect },
    actions
  } = useNode((node) => ({
    name: node.data.custom.displayName || node.data.displayName
  }))

  const nodeRef = useRef()

  return (
        <Draggable
            disabled={!enabled}
            onStop={() => handleStop(actions, nodeRef)}
            nodeRef={nodeRef}
            bounds='parent'
            position={{
              x: getX(pageX, nodeRef),
              y: getY(pageY, nodeRef)
            }}
        >
            <div
                style={{ position: 'absolute' }}
                ref={nodeRef}
            >
                <Tooltip
                    name={name}
                    id={id}
                >
                    <div>
                        <MaterialSwitch
                            ref={connect}
                            size={size}
                            disableRipple={true}
                            sx={{
                              '& .MuiSwitch-switchBase.Mui-checked': {
                                color: `rgba(${Object.values(color)})`
                              },
                              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: `rgba(${Object.values(color)})`
                              }
                            }}
                            checked={Boolean(state)}
                            onClick={() => {
                              actions.setProp((props) => { props.state = !props.state })

                              const ws = getWS()
                              if (ws != null) {
                                const message = { Parent: String(id), Event: String(event), Value: !state }
                                ws.send(JSON.stringify(message))
                              }
                            }}
                            {...props}
                        />
                    </div>
                </Tooltip>
            </div>
        </Draggable>
  )
}

Switch.craft = {
  displayName: 'Switch',
  props: {
    state: false,
    size: 'small',
    color: { r: 63, g: 81, b: 181, a: 1 },
    event: ''
  },
  related: {
    toolbar: SwitchSettings
  }
}
