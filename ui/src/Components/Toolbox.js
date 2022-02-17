import { useEditor } from '@craftjs/core';
import { Button as MaterialButton } from '@mui/material';

import { Button } from './Button';

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
                                            style={{
                                                position: "absolute",
                                                top: 250,
                                                left: 550,
                                            }}
                                        />)
                }
                variant="contained"
                data-cy="toolbox-button"
            >
                Button
            </MaterialButton>
            <MaterialButton
                ref={(ref) =>
                    connectors.create(ref, 
                                      <Button 
                                            text="Click me2" 
                                            size="small" 
                                            variant="contained" 
                                            onClick={() => {console.log('Im button2!')}}
                                        />)
                }
                variant="contained"
                data-cy="toolbox-button"
            >
                Button2
            </MaterialButton>
        </div>
    );
};