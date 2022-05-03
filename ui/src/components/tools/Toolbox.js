import { useEditor } from '@craftjs/core'
import React from 'react'
import { Grid, IconButton, Tooltip } from '@mui/material'

import { Button } from '../user/button/Button'
import { Slider } from '../user/slider/Slider'
import { Switch } from '../user/switch/Switch'
import { Textfield } from '../user/textfield/Textfield'
import { Checkbox } from '../user/checkbox/Checkbox'
import { Divider } from '../user/divider/Divider'

import TextFieldsIcon from '@mui/icons-material/TextFields'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import Crop75Icon from '@mui/icons-material/Crop75'
import TuneIcon from '@mui/icons-material/Tune'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import DensityLargeIcon from '@mui/icons-material/DensityLarge'

import { useDrag } from 'react-dnd'

/*
 * Creates a toolbox containing all usable components.
 */
export const Toolbox = () => {

    const { actions, query } = useEditor()

    // list of the components to be available in the toolbox
    const components = [
        Button,
        Switch,
        Slider,
        Textfield,
        Checkbox,
        Divider
    ]

    // a counter for each component, used when assigning them IDs
    const count = {
        Button: 1,
        Switch: 1,
        Slider: 1,
        Textfield: 1,
        Checkbox: 1,
        Divider: 1
    }

    // list of icons for the different components
    const icons = {
        Button: <Crop75Icon />,
        Switch: <ToggleOnIcon />,
        Slider: <TuneIcon />,
        Textfield: <TextFieldsIcon />,
        Checkbox: <CheckBoxIcon />,
        Divider: <DensityLargeIcon />
    }

    // list where we store each component to be rendered in the toolbox.
    const componentList = []

    // iterate over each component
    components.forEach((component, index) => {
        // create a node for each one
        const CreateNode = () => {
            const [, dragRef] = useDrag(() => ({
                type: 'component',
                options: {
                    dropEffect: 'copy'
                },
                end(_, monitor) {
                    // Get data from the drop-event that occurs when
                    // a user drops a component on the canvas
                    const dropResult = monitor.getDropResult()
                    // Creates a node with attributes of a specific component
                    // this is done to create a node with custom id and coords.
                    const freshNode = {
                        id: `${component.name}_${count[component.name]}`,
                        data: {
                            type: component,
                            props: {
                                pageX: dropResult.x - 20,
                                pageY: dropResult.y - 10
                            }
                        }
                    }
                    const node = query.parseFreshNode(freshNode).toNode()
                    // add the created node to the canvas.
                    actions.add(node, 'ROOT')
                    count[component.name] += 1
                }
                
            }))
            // add our components to our list
            componentList.push(
                <Grid item xs={6} key={index}>
                    <Tooltip title={component.name}>
                        <IconButton
                            style={{ transform: 'translate(0, 0)' }}
                            ref={dragRef}
                            aria-label={component.name}
                        >
                            {icons[component.name]}
                        </IconButton>
                    </Tooltip>
                </Grid>
            )
        }
        CreateNode()
    })
    // return a grid containing all of our components
    return (
        <div className='toolbox'>
            <Grid container spacing={1}>
                {componentList}
            </Grid>
        </div>
    )
}