import { TextField, InputAdornment } from '@mui/material'
import { useEffect, useState } from 'react'
import { SketchPicker, CirclePicker } from 'react-color'
import { useEditor } from '@craftjs/core'

export const EditTextInput = ({
  onChange, value, prefix,
  label, type, ...props
}) => {
  const { query: { getSerializedNodes } } = useEditor()

  const [internalValue, setInternalValue] = useState(value)
  const [active, setActive] = useState(false)

  // Presets for SketchPicker
  const presetColors = ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505',
    '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000',
    '#4A4A4A', '#9B9B9B', '#FFFFFF']

  // Array with recent colors for CirclePicker
  const [recentColors, setRecentColors] = useState([])

  useEffect(() => {
    let val = value
    if (type === 'color' || type === 'bg') { value ? val = `rgba(${Object.values(value)})` : val = 'rgba(255,255,255,1)' }
    setInternalValue(val)

    // Iterate over all components' colors
    // to set recently used
    const colors = []
    const nodes = getSerializedNodes()
    for (const key in nodes) {
      if (nodes[key].props.color) {
        const color = `rgba(${Object.values(nodes[key].props.color)})`
        if (!colors.includes(color)) colors.push(color)
      }
      if (nodes[key].props.background) {
        const background = `rgba(${Object.values(nodes[key].props.background)})`
        if (!colors.includes(background)) colors.push(background)
      }
    }
    setRecentColors(colors)
  }, [value, type, getSerializedNodes])

  return (
        <div
            style={{ width: '100%', position: 'relative' }}
            onClick={() => {
              setActive(true)
            }}
        >
            {(type === 'color' || type === 'bg') && active
              ? (
                <div
                    style={{
                      zIndex: 99999,
                      top: 'calc(100% + 10px)',
                      left: '-5%',
                      position: 'absolute'
                    }}
                >
                    <div
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setActive(false)
                        }}
                        style={{
                          cursor: 'pointer',
                          width: '100%',
                          height: '100%',
                          top: 0,
                          left: 0,
                          position: 'fixed'
                        }}
                    />
                    <div

                    >
                        <SketchPicker
                            color={internalValue}
                            onChange={(color) => {
                              onChange(color.rgb)
                            }}
                            presetColors={presetColors}
                        />
                        <div
                            style={{
                              marginTop: '1px',
                              width: '220px',
                              padding: '10px 10px',
                              borderRadius: '4px',
                              backgroundColor: 'rgb(250, 250, 250)',
                              boxShadow: 'rgb(0 0 0 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 15%) 0px 8px 16px'
                            }}
                        >
                            <h5 style={{ textAlign: 'left', paddingBottom: '10px' }}>Recently used</h5>
                            <CirclePicker
                                width={220}
                                onChange={(color) => {
                                  onChange(color.rgb)
                                }}
                                circleSize={16}
                                circleSpacing={10}
                                colors={recentColors}
                            />
                        </div>
                    </div>
                </div>
                )
              : null}
            <TextField
                label={label}
                style={{ margin: 0, width: '100%' }}
                value={internalValue}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onChange((e.target).value)
                  }
                }}
                onChange={(e) => {
                  setInternalValue(e.target.value)
                }}
                margin='dense'
                variant='filled'
                InputProps={{
                  disableUnderline: true,
                  startAdornment: ['color', 'bg'].includes(type)
                    ? (
                        <InputAdornment
                            position='start'
                            style={{
                              marginTop: '20px',
                              marginRight: '8px'
                            }}
                        >
                            <div
                                style={{
                                  left: '15px',
                                  background: internalValue,
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  display: 'inline-block'
                                }}
                            />
                        </InputAdornment>
                      )
                    : null
                }}
                InputLabelProps={{
                  shrink: true
                }}
                {...props}
            />
        </div>
  )
}
