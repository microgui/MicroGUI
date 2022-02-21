import { useEditor } from '@craftjs/core'
import { Button as MaterialButton } from '@mui/material'

import { Button } from './Button'
import { Slider } from './Slider'
import { Switch } from './Switch'
import { Textfield } from './Textfield'

export const Toolbox = () => {
    const { connectors } = useEditor();

    return (
        <div>
            <MaterialButton
                ref={(ref) =>
                    connectors.create(ref, 
                        <Button 
                            text="Click me" 
                            size="small" 
                            variant="outlined" 
                            onClick={() => {console.log('Im button1!')}} 
                            // pageX={0}
                            // pageY={0}
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