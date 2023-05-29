import { useNode } from '@craftjs/core'
import { EditSection } from '../../tools/editbox/EditSection'
import { EditItem } from '../../tools/editbox/EditItem'
import React, { useState } from 'react'
import { Tooltip } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

export const CanvasAreaSettings = () => {
  const { actions } = useNode()

  const [isImage, setIsImage] = useState(false)

  const loadFile = (file) => {
    const reader = new FileReader()
    reader.onload = function () {
      actions.setProp((props) => {
        props.image = reader.result
        props.background = props.background ? props.background : { r: 255, g: 255, b: 255, a: 1 }
      })
    }
    reader.readAsDataURL(file)
  }

  return (
        <React.Fragment>
            <EditSection
                title='Size'
                props={['width', 'height']}
                summary={({ width, height }) => {
                  return `${width}x${height} px`
                }}
            >
                <EditItem propKey='width' type='number' label='Width' />
                <EditItem propKey='height' type='number' label='Height' />
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
            <EditSection
                title='Image'
                props={['image']}
                summary={({ image }) => {
                  return (
                        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                            <div
                                style={{
                                  backgroundImage: `url(${image})`,
                                  backgroundPosition: '0 0',
                                  backgroundSize: '20px 20px',
                                  borderRadius: '50%',
                                  height: '20px',
                                  width: '20px'
                                }}
                            />
                        </div>
                  )
                }}
            >
                <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%'
                    }}
                >
                    < input
                        type='file'
                        onChange={(e) => {
                          loadFile(e.target.files[0])
                          setIsImage(true)
                        }}
                        id='custom-file-input'
                    />
                    { isImage
                      ? <Tooltip
                            title='Remove image'
                        >
                            <ClearIcon
                                sx={{ marginTop: '20px' }}
                                onClick={() => {
                                  document.getElementById('custom-file-input').value = null
                                  actions.setProp((props) => {
                                    props.image = null
                                  })
                                  setIsImage(false)
                                }}
                            />
                        </Tooltip>
                      : null
                    }
                </div>
            </EditSection>
        </React.Fragment>
  )
}
