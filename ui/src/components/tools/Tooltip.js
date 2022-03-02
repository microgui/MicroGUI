import { Tooltip as MaterialTooltip, tooltipClasses } from '@mui/material'
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete'
import { useEditor } from '@craftjs/core'
import { useRef } from 'react'

export const Tooltip = styled(({ className, name, id, ...props }) => {
    const { actions } = useEditor()

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
            disableTouchListener
            title={<>
                {name}
                <button
                    className="renderNodeDeleteButtonnnnn"
                    style={{ cursor: 'pointer', background: 'none', border: 'none' }}
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        actions.delete(id);
                    }}
                >
                    <DeleteIcon 
                        className="indicatorIconnnnnn"
                        style={{
                            color: '#ffffff',
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
      backgroundColor: '#1F68E6',
      color: '#ffffff',
      maxWidth: 220,
      width: 90,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
}));