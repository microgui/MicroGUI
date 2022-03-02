import { useEditor } from '@craftjs/core'
import { useState, useEffect } from 'react'
import { Button as MaterialButton } from '@mui/material'

import { Button } from '../user/Button'
import { Slider } from '../user/Slider'
import { Switch } from '../user/Switch'
import { Textfield } from '../user/Textfield'

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
        x: 600,
        y: 300
    });

    return (
        <div>
            <MaterialButton
                ref={(ref) =>
                    connectors.create(ref, 
                        <Button 
                            text="Click me" 
                            size="small" 
                            variant="outlined" 
                            // onClick={() => {console.log('Im button1!')}} 
                            pageX={coordinates.x}
                            pageY={coordinates.y}
                        />
                    )
                }
                variant="contained"
                data-cy="toolbox-button"
            >
                Button
            </MaterialButton>
            <MaterialButton
                ref={(ref) =>
                    connectors.create(ref, 
                        <Switch 
                            size="small"
                            // defaultChecked={false}
                        />
                    )
                }
                variant="contained"
                data-cy="toolbox-button"
            >
                Switch
            </MaterialButton>
            <MaterialButton
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
                variant="contained"
                data-cy="toolbox-button"
            >
                Slider
            </MaterialButton>
            <MaterialButton
                ref={(ref) =>
                    connectors.create(ref, 
                        <Textfield 
                            text='wut'
                            // pageX={0}
                            // pageY={0}
                        />
                    )
                }
                variant="contained"
                data-cy="toolbox-button"
            >
                Text
            </MaterialButton>
        </div>
    );
};