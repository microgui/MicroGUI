import { useEditor } from '@craftjs/core';
import { Button as MaterialButton } from '@mui/material';

import { Button } from './Button';

export const Toolbox = () => {
    const { connectors } = useEditor();

    return (
        <MaterialButton
            ref={(ref) =>
                connectors.create(ref, <Button text="Click me" size="small" />)
            }
            // onClick={() => {
            //     console.log('testar')
            //     connectors.create(ref, <Button text="Click me" size="small" />)
            // }}
            variant="contained"
            data-cy="toolbox-button"
        >
            Button
        </MaterialButton>
    );
};