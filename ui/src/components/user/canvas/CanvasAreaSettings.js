import { EditSection } from "../../tools/editbox/EditSection"
import { EditItem } from "../../tools/editbox/EditItem"
import React from 'react'

export const CanvasAreaSettings = () => {
    return (
        <React.Fragment>
            <EditSection
                title='Size'
                props={['width', 'height']}
                summary={({ width, height }) => {
                    return `${width}x${height} px`
                }}
            >
                <EditItem propKey='width' type='text' label='Width' />
                <EditItem propKey='height' type='text' label='Height' />
            </EditSection>
            <EditSection
                title='Background'
                props={['background']}
                summary={({ background }) => {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <div
                                style={{
                                    background:
                                        background && `rgba(${Object.values(background)})`,
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    borderRadius: '50%',
                                    height: '20px',
                                    width: '20px'
                                }}
                            />
                        </div>
                    )
                }}
            >
                <EditItem
                    full={true}
                    propKey='background'
                    type='bg'
                />
            </EditSection>
        </React.Fragment>
    )
}