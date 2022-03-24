import { useEditor, Element } from '@craftjs/core'
import { useState } from 'react'
import { Grid, IconButton, Tooltip } from '@mui/material'

import { Button } from '../user/button/Button'
import { Slider } from '../user/slider/Slider'
import { Switch } from '../user/switch/Switch'
import { Textfield } from '../user/textfield/Textfield'

import TextFieldsIcon from '@mui/icons-material/TextFields'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import Crop75Icon from '@mui/icons-material/Crop75'
import TuneIcon from '@mui/icons-material/Tune'

/**
 * Creates a toolbox containing all usable objects.
 * @returns The 'Toolbox' component
 */
export const Toolbox = () => {
    const { connectors, query } = useEditor();

    /**
     * Decides where components should spawn on the page
     * TO DO: - Make it relative to the canvas, not the whole page
     *        - Make is so the the component spawns where the mouse is held
     */
    const [coordinates, setCoordinates] = useState({
        x: 0,
        y: 0
    });

    function bestFuncEvr() {
        console.log("hejjj")
    }

    /*
    ondragend = function(e){
        console.log("mouse location:", e.clientX, e.clientY)
        setCoordinates({
            x: e.clientX,
            y: e.clientY
        })
    } */

    return (
        <div
            className='toolbox'
        >
            <Grid
                container
                spacing={1}
            >
                <Grid
                    item
                    xs={6}
                >
                    <Tooltip
                        title='Button'
                    >
                        <IconButton
                            ref={(ref) => {
                                connectors.create(ref,
                                    <Element is={Button}
                                        text='Button'
                                        size='small'
                                        onClick={bestFuncEvr}
                                        variant='contained'
                                        pageX={coordinates.x}
                                        pageY={coordinates.y}
                                        background={{ r: 63, g: 81, b: 181, a: 1 }}
                                        color={{ r: 255, g: 255, b: 255, a: 1 }}
                                        funcname = {bestFuncEvr.name}
                                    />
                                )
                            }}
                            aria-label='button'
                        >
                            <Crop75Icon />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <Tooltip
                        title='Switch'
                    >
                        <IconButton
                            ref={(ref) =>
                                connectors.create(ref,
                                    <Switch
                                        size='small'
                                        
                                        color={{ r: 63, g: 81, b: 181, a: 1 }}
                                    />
                                )
                            }
                            aria-label='switch'
                        >
                            <ToggleOnIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <Tooltip
                        title='Slider'
                    >
                        <IconButton
                            ref={(ref) =>
                                connectors.create(ref,
                                    <Slider
                                        size='small'
                                        width={100}
                                        defaultValue={0}
                                        color={{ r: 63, g: 81, b: 181, a: 1 }}
                                        valueLabelDisplay='auto'
                                    />
                                )
                            }
                            aria-label='slider'
                        >
                            <TuneIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <Tooltip
                        title='Textfield'
                    >
                        <IconButton
                            ref={(ref) =>
                                connectors.create(ref,
                                    <Textfield
                                        text='Text'
                                        fontSize={15}
                                        textAlign='left'
                                        fontWeight='500'
                                        color={{ r: 0, g: 0, b: 0, a: 1 }}
                                    // pageX={0}
                                    // pageY={0}
                                    />
                                )
                            }
                            aria-label='textfield'
                        >
                            <TextFieldsIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </div>
    )
}