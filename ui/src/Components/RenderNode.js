import { useNode, useEditor } from '@craftjs/core'
import { ROOT_NODE } from '@craftjs/utils'
import React, { useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom'
import './RenderNode.css'
import DeleteIcon from '@mui/icons-material/Delete'
import OpenWithIcon from '@mui/icons-material/OpenWith'

export const RenderNode = ({ render }) => {
    const { id } = useNode();
    const { actions, query, isActive } = useEditor((_, query) => ({
        isActive: query.getEvent('selected').contains(id),
    }));

    const {
        isHover,
        dom,
        name,
        moveable,
        deletable,
        connectors: { drag },
        parent,
    } = useNode((node) => ({
        isHover: node.events.hovered,
        dom: node.dom,
        name: node.data.custom.displayName || node.data.displayName,
        moveable: query.node(node.id).isDraggable(),
        deletable: query.node(node.id).isDeletable(),
        parent: node.data.parent,
        props: node.data.props,
    }));

    const currentRef = useRef()

    useEffect(() => {
        if (dom) {
            if (isActive || isHover) dom.classList.add('component-selected');
            else dom.classList.remove('component-selected');
            
        }
    }, [dom, isActive, isHover]);

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
                ? ReactDOM.createPortal(
                    <div
                        ref={currentRef}
                        className="renderNodeDiv"
                        style={{
                            left: getPos(dom).left,
                            top: getPos(dom).top,
                            zIndex: 9999,
                        }}
                    >
                        <h2 className="renderNodeDivTitle">{name}</h2>

                        {moveable ? (
                            <button className="renderNodeMoveButton" ref={drag}
                                    style={{cursor: 'move'}}>
                                <OpenWithIcon className="indicatorIcon" />
                            </button>
                        ) : null}


                        {deletable ? (
                            <button
                                className="renderNodeDeleteButton"
                                style={{cursor: 'pointer'}}
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    actions.delete(id);
                                }}
                            >
                                <DeleteIcon className="indicatorIcon" />
                            </button>
                        ) : null}
                    </div>,
                    document.querySelector('.canvasElement')
                )
                : null}
            {render}
        </>
    );
};