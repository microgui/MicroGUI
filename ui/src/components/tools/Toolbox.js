import { useEditor } from '@craftjs/core'
import React from 'react'
import { Grid, IconButton, Tooltip } from '@mui/material'

import { Button } from '../user/button/Button'
import { Slider } from '../user/slider/Slider'
import { Switch } from '../user/switch/Switch'
import { Textfield } from '../user/textfield/Textfield'

import TextFieldsIcon from '@mui/icons-material/TextFields'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import Crop75Icon from '@mui/icons-material/Crop75'
import TuneIcon from '@mui/icons-material/Tune'

import { useDrag } from 'react-dnd'

/**
 * Creates a toolbox containing all usable objects.
 * @returns The 'Toolbox' component
 */
export const Toolbox = () => {

    const { actions, query } = useEditor()

    const components = [
        Button,
        Switch,
        Slider,
        Textfield
    ]

    const count = {
        Button: 1,
        Switch: 1,
        Slider: 1,
        Textfield: 1
    }

    const icons = {
        Button: <Crop75Icon />,
        Switch: <ToggleOnIcon />,
        Slider: <TuneIcon />,
        Textfield: <TextFieldsIcon />
    }

    const itemList = []

    components.forEach((item, index) => {
        const CreateNode = () => {
            const [, dragRef] = useDrag(() => ({
                type: 'component',
                options: {
                    dropEffect: 'copy'
                },
                end(draggedItem, monitor) {
                    const dropResult = monitor.getDropResult()
                    const freshNode = {
                        id: `${item.name}_${count[item.name]}`,
                        data: {
                            type: item,
                            props: {
                                pageX: dropResult.x - 20,
                                pageY: dropResult.y - 10
                            }
                        }
                    }
                    const node = query.parseFreshNode(freshNode).toNode()
                    actions.add(node, 'ROOT')
                    count[item.name] += 1
                }
                
            }))

            itemList.push(
                <Grid item xs={6} key={index}>
                    <Tooltip title={item.name}>
                        <IconButton
                            style={{ transform: 'translate(0, 0)' }}
                            ref={dragRef}
                            aria-label={item.name}
                        >
                            {icons[item.name]}
                        </IconButton>
                    </Tooltip>
                </Grid>
            )
        }
        CreateNode()
    })

    return (
        <div className='toolbox'>
            <Grid container spacing={1}>
                {itemList}
            </Grid>
        </div>
    )
}