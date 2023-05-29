import './Simulator.css'

import { Editor as CraftEditor, Frame } from '@craftjs/core'

import { Button } from '../components/user/button/Button'
import { Slider } from '../components/user/slider/Slider'
import { Switch } from '../components/user/switch/Switch'
import { Textfield } from '../components/user/textfield/Textfield'
import { CanvasArea } from '../components/user/canvas/CanvasArea'
import { Checkbox } from '../components/user/checkbox/Checkbox'
import { Divider } from '../components/user/divider/Divider'
import { CanvasObject} from '../components/user/canvasObject/CanvasObject'
import { Radiobutton } from '../components/user/radiobutton/Radiobutton'
import { Progressbar } from '../components/user/progress/Progressbar'
import { CircularProgress } from '../components/user/progress/CircularProgress'
import { Container } from '../components/user/container/Container'

import React from 'react'

export default function Simulator() {

    return (
        <div
            style={{
                minWidth: '100vw',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '250px',
                    paddingBottom: '10px'
                }}
            >
                <div
                    id='blinkingRed'
                />
                <h1>Simulating GUI</h1>
            </div>
            <div
                style={{ border: '1px solid black' }}
            >
                <CraftEditor
                    enabled={false}
                    resolver={{
                        CanvasArea,
                        Button,
                        Slider,
                        Switch,
                        Textfield,
                        Checkbox,
                        Divider,
                        CanvasObject,
                        Radiobutton,
                        Progressbar,
                        CircularProgress,
                        Container
                    }}
                    indicator={false}
                >
                    {/* get the state of the canvas from the browers local storage */}
                    <Frame data={localStorage.getItem('data')} />
                </CraftEditor>
            </div>
        </div >
    )
}
