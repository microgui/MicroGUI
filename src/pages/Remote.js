import './Simulator.css'

import { Editor as CraftEditor, Frame, useEditor } from '@craftjs/core'

import { Button as MaterialButton, TextField as MaterialTextfield } from '@mui/material'

import { Button } from '../components/user/button/Button'
import { Slider } from '../components/user/slider/Slider'
import { Switch } from '../components/user/switch/Switch'
import { Textfield } from '../components/user/textfield/Textfield'
import { CanvasArea } from '../components/user/canvas/CanvasArea'
import { Checkbox } from '../components/user/checkbox/Checkbox'
import { Divider } from '../components/user/divider/Divider'
import { Progressbar } from '../components/user/progress/Progressbar'
import { CircularProgress } from '../components/user/progress/CircularProgress'
import { Radiobutton } from '../components/user/radiobutton/Radiobutton'
import { Container } from '../components/user/container/Container'

import { setWS, ws } from '../components/user/Utilities'

import { useState } from 'react';

import { Link } from 'react-router-dom'
import logo from '../logo.png'
import GitHubIcon from '@mui/icons-material/GitHub'


export default function Remote() {
    const [document, setDocument] = useState('')
    const [IP, setIP] = useState('')
    const [error, setError] = useState(false)

    let working_doc = ''
    let ws_init = false

    const RemoteConnect = () => {
        let document_received = false;

        if (ws == null || !ws_init) {
            setWS("ws://" + IP.trim() + "/ws")

            ws.addEventListener('error', function(event) {
                //console.log('WebSocket error: ', event);
                setError(true)
            });

            ws.onopen = function() {
                //alert("Connection opened");
                ws.send("documentRequest")
                ws_init = true
            };

            ws.onclose = function() {
                //alert("Connection closed");
            };

            ws.onmessage = function(event) {
                console.log(event.data)
                if (event.data === 'DOCUMENT SENT') {
                    document_received = true;
                    setDocument(JSON.parse(working_doc))
                }
                if (!document_received) {
                    working_doc += event.data.replaceAll('\\n', '<div>')
                }
            }
        }
    }


    const MyFrame = () => {
        const { actions } = useEditor()

        if (ws != null) {
            ws.onmessage = function(event) {
                const eventData = JSON.parse(event.data)
                console.log(eventData)

                actions.setProp(Object.keys(eventData)[0], (props) => {
                    props.state = Object.values(eventData)[0]
                    props.value = Object.values(eventData)[0]
                    if (eventData["type"] === "Textfield") {
                        props.text = Object.values(eventData)[0]
                    }
                })

            };
        }

        return (
            < Frame data={document} />
        )
    }

    if (document) {
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
                <p>Connected to {IP}</p>
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
                            Progressbar,
                            CircularProgress,
                            Radiobutton,
                            Container
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
        <div style={{
            minWidth: '100vw',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '10px',
            }}>
                <Link to='/'>
                    <img
                        alt='logo'
                        src={logo}
                        className='logoTest'
                    />
                </Link>
                <h1 className='topText'>MicroGUI</h1>
            </div>

            <div>
                <h2>Enter the IP of your display:</h2>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingTop: '10px',
                }}>
                    <div>
                        <MaterialTextfield
                            value={IP}
                            type="text"
                            sx={{ paddingRight: '10px', paddingLeft: '10px' }}
                            onChange={(event) => {
                                setIP(event.target.value)
                                setError(false)
                            }}
                            error={error}
                            helperText={error ?
                                'WebSocket connection failed'
                                : null
                            }
                        />
                    </div>
                    <div>
                        <MaterialButton
                            disabled={!IP}
                            sx={{ height: '56px' }}
                            onClick={RemoteConnect}
                            variant='contained'
                        >Connect</MaterialButton>
                    </div>
                </div>
            </div>

            <footer className='footer'>
                <p>© MicroGUI 2022 |&nbsp;</p>
                <a
                    href='https://github.com/microgui/MicroGUI'
                    target='_blank'
                    rel='noreferrer'
                    style={{
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    GitHub
                    <GitHubIcon xs='md' sx={{ paddingLeft: '2px' }} />
                </a>
            </footer>

        </div>
    )
}
