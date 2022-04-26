import './Simulator.css'

import { Editor, Frame } from '@craftjs/core'

import { Button } from '../components/user/button/Button'
import { Slider } from '../components/user/slider/Slider'
import { Switch } from '../components/user/switch/Switch'
import { Textfield } from '../components/user/textfield/Textfield'
import { CanvasArea } from '../components/user/canvas/CanvasArea'

import React from 'react'

export default function Simulator() {

    return (
        <div className='simulatorDiv' >
            <h1 className='blinkingText'>Simulator mode</h1>
            <div className='simulatorBorder' >
                <Editor
                    enabled={false}
                    resolver={{
                        CanvasArea,
                        Button,
                        Slider,
                        Switch,
                        Textfield
                    }}
                    indicator={false}
                >
                    <Frame data={localStorage.getItem('data')} />
                </Editor>
            </div>
        </div>
    )
}