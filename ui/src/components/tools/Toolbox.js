import { useEditor } from '@craftjs/core'
import { useState, useEffect } from 'react'
import { Grid, IconButton, Tooltip, Divider } from '@mui/material'

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
    const [coordinates, setCoordinates] = useState({
        x: 0,
        y: 0
    });

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
                            ref={(ref) =>
                                connectors.create(ref,
                                    <Button
                                        text="Click me"
                                        size="small"
                                        variant="outlined"
                                        pageX={coordinates.x}
                                        pageY={coordinates.y}
                                    />
                                )
                            }
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
                                        size="small"
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
                                        size="small"
                                        defaultValue={0}
                                        aria-label="Default"
                                        valueLabelDisplay="auto"
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
                                        text='wut'
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