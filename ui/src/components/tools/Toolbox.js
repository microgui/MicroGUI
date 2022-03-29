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
    const { connectors } = useEditor();

    /**
     * Decides where components should spawn on the page
     * TO DO: - Make it relative to the canvas, not the whole page
     *        - Make is so the the component spawns where the mouse is held
     */
    const [coordinates] = useState({
        x: 0,
        y: 0
    });

    function bestFuncEvr() {
        console.log("hejjj")
    }

    // const getPos = () => {
    //     ondragend = function (e) {
    //         console.log("mouse location:", e.clientX, e.clientY)
    //     }
    //     return {
    //         x: coordinates.x,
    //         y: coordinates.y
    //     }
    // }

    return (
        <div className='toolbox'>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Tooltip title='Button'>
                        <IconButton
                            ref={(ref) => {
                                connectors.create(ref,
                                    <Element
                                        is={Button}
                                        onClick={bestFuncEvr}
                                        pageX={coordinates.x}
                                        pageY={coordinates.y}
                                        funcname={bestFuncEvr.name}
                                    />
                                )
                            }}
                            aria-label='button'
                        >
                            <Crop75Icon />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={6}>
                    <Tooltip title='Switch'>
                        <IconButton
                            ref={(ref) =>
                                connectors.create(ref,
                                    <Element is={Switch} />
                                )
                            }
                            aria-label='switch'
                        >
                            <ToggleOnIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={6}>
                    <Tooltip title='Slider'>
                        <IconButton
                            ref={(ref) =>
                                connectors.create(ref,
                                    <Element is={Slider} />
                                )
                            }
                            aria-label='slider'
                        >
                            <TuneIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item xs={6}>
                    <Tooltip title='Textfield'>
                        <IconButton
                            ref={(ref) =>
                                connectors.create(ref,
                                    <Element is={Textfield} />
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