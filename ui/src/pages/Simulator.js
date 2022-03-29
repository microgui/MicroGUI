import './Simulator.css'

import { Editor, Frame, Element } from '@craftjs/core'

import { Button } from '../components/user/button/Button'
import { Slider } from '../components/user/slider/Slider'
import { Switch } from '../components/user/switch/Switch'
import { Textfield } from '../components/user/textfield/Textfield'

import React from 'react'

export default function Simulator() {

    return (
        <div className='simulatorDiv' >
            <h1 className='blinkingText'>Simulator mode</h1>
            <div className='simulatorBorder' >
                <Editor
                    enabled={false}
                    resolver={{
                        Button,
                        Slider,
                        Switch,
                        Textfield
                    }}
                    indicator={false}
                >
                    <Frame data={localStorage.getItem('data')} >
                        <Element
                            id='simulatorElement'
                            is='div'
                            style={{
                                width: '400px',
                                height: '400px',
                                backgroundColor: 'green'
                            }}
                            className='simulatorElement'
                            data-testid='simulatorElement'
                            canvas
                        />
                    </Frame>
                </Editor>
            </div>
        </div>
    )
}