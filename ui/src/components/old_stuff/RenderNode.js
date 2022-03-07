import { useNode, useEditor } from '@craftjs/core'
import { ROOT_NODE } from '@craftjs/utils'
import React, { useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import './RenderNode.css'
import DeleteIcon from '@mui/icons-material/Delete'
import OpenWithIcon from '@mui/icons-material/OpenWith'

/**
 * Creats a menu that gets displayed whenever the user
 * hovers over, or selects, an object.
 * @returns A menu on hover or on select for all objects.
 */
export const RenderNode = (coords) => {
    const { id } = useNode();
    const { actions, query, isActive } = useEditor((_, query) => ({
        isActive: query.getEvent('selected').contains(id),
    }));

    const {
        isHover,
        dom,
        name,
        connectors: { drag },
        parent
    } = useNode((node) => ({
        isHover: node.events.hovered,
        dom: node.dom,
        name: node.data.custom.displayName || node.data.displayName,
        props: node.data.props,
        parent: node.parent
    }));

    useEffect(() => {
        if (dom) {
            if (isActive || isHover) dom.classList.add('component-selected');
            else dom.classList.remove('component-selected');

        }
    }, [dom, isActive, isHover]);

    /**
     * Helper function to get the position of the 
     * hovered/selected object.
     */
    const getPos = useCallback((dom) => {
        const { top, left, bottom } = dom
            ? dom.getBoundingClientRect()
            : { top: 0, left: 0, bottom: 0 };
        return {
            top: `${top > 0 ? top : bottom}px`,
            left: `${left}px`,
        };
    }, []);

    return (
        <>
            {(isHover || isActive) && id !== ROOT_NODE
                ?
                <div
                    className="renderNodeDiv"
                    style={{
                        left: coords.left,
                        top: coords.top,
                        zIndex: 9999,
                    }}
                >
                    <h2 className="renderNodeDivTitle">{name}</h2>

                    <button className="renderNodeMoveButton"
                        style={{ cursor: 'move' }}>
                        <OpenWithIcon className="indicatorIcon" />
                    </button>

                    <button
                        className="renderNodeDeleteButton"
                        style={{ cursor: 'pointer' }}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            actions.delete(id);
                        }}
                    >
                        <DeleteIcon className="indicatorIcon" />
                    </button>

                </div>
                : null}
        </>
    );
};