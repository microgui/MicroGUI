import './Simulator.css'

import { Editor as CraftEditor, Frame, useEditor } from '@craftjs/core'

import { Button } from '../components/user/button/Button'
import { Slider } from '../components/user/slider/Slider'
import { Switch } from '../components/user/switch/Switch'
import { Textfield } from '../components/user/textfield/Textfield'
import { CanvasArea } from '../components/user/canvas/CanvasArea'
import { Checkbox } from '../components/user/checkbox/Checkbox'
import { Divider } from '../components/user/divider/Divider'

import { setWS, ws } from '../components/user/Utilities'

import {useState, useRef} from 'react';


export default function Remote() {
    const [document, setDocument] = useState('')
    const ipRef = useRef(null)
    let working_doc = '';

    const RemoteConnect = () => {
        let document_received = false;

        if (ws == null) {
            setWS("ws://" + ipRef.current.value + "/ws")

            ws.onopen = function () {
                //alert("Connection opened");
                ws.send("documentRequest")
            };

            ws.onclose = function () {
                alert("Connection closed");
            };

            ws.onmessage = function (event) {
                if (event.data === 'DOCUMENT SENT') {
                    document_received = true;
                    setDocument(JSON.parse(working_doc.replaceAll('\n', '<div>')))
                }
                if (!document_received) {
                    working_doc += event.data
                }
            }
        }

    }


    const MyFrame = () => {
        const { actions } = useEditor()

        if (ws != null) {
            ws.onmessage = function (event) {
                const eventData = JSON.parse(event.data)

                console.log(eventData)
                try {
                    actions.setProp(Object.keys(eventData)[0], (props) => {
                        try {
                            props.state = Object.values(eventData)[0]
                            props.value = Object.values(eventData)[0]
                            //props.text = Object.values(eventData)[0]
                        }
                        catch (error) {
                            console.log(error)
                        }
                    })
                }
                catch (error) {
                    console.log(error)
                }
            };
        }

        //console.log(localStorage.getItem('data'))
        return (
            < Frame data={ document } />
        )
    } 

    if (ws) {
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
                    <h1>Remote GUI</h1>
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
                            Divider
                        }}
                        indicator={false}
                    >
                        <MyFrame />
                    </CraftEditor>
                </div>
            </div >
        )
    }

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
        }}>
        Enter the IP of your display:
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <input type="text" ref={ipRef} id="ip" name="ip"/>
                <button onClick={ RemoteConnect }>Connect</button>
            </div>
        </div>
    )
}

