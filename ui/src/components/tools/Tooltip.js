import { Tooltip as MaterialTooltip, tooltipClasses } from '@mui/material'
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete'
import { useEditor, useNode } from '@craftjs/core'
import { useRef } from 'react'

/**
   A tooltip that can be applied to any component created by a user. 
   The tooltip shows the name of the selected component, aswell as
   allowing the user to delete it.
 */
export const Tooltip = styled(({ className, name, id, ...props }) => {
    const { actions, enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }))

    /* checks if the component related to the tooltip 
       is hovered or selected, this is used when determining
       whether the tooltip should be shown or not. */
    const { isHovered, isSelected } = useNode((node) => ({
        isHovered: node.events.hovered,
        isSelected: node.events.selected
    }))

    const areaRef = useRef(null)

    return (
        <MaterialTooltip
            {...props}
            ref={areaRef}
            PopperProps={{
                anchorEl: {
                    getBoundingClientRect: () => {
                        return new DOMRect(
                            areaRef.current.getBoundingClientRect().x,
                            areaRef.current.getBoundingClientRect().y + 10
                        )
                    }
                }
            }}
            open={(isHovered || isSelected) && enabled}
            title={<>
                {name}
                <button
                    style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                    onMouseDown={(e) => {
                        e.stopPropagation()
                        actions.delete(id)
                    }}
                >
                    <DeleteIcon 
                        style={{
                            color: 'white',
                        }}
                    />
                </button>
            </>
            }
            classes={{ popper: className }}
            placement="top-start"
        />
    )
})(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'grey',
      color: 'white',
      maxWidth: 220,
      width: 90,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
}))