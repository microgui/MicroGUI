import './App.css'

import { Stack } from '@mui/material';
import { Editor, Frame, Element } from '@craftjs/core';

import logo from '../logo.png'

import { Toolbox } from '../components/tools/Toolbox'
import { Toolbar } from '../components/tools/Toolbar'
import { Button } from '../components/user/button/Button'
import { Slider } from '../components/user/slider/Slider'
import { Switch } from '../components/user/switch/Switch'
import { Textfield } from '../components/user/textfield/Textfield'
import { Editbox } from '../components/tools/editbox/Editbox'

/**
 * Core of the web app.
 * @returns The web app.
 */
export default function Home() {

	//const jsonstring = '{"ROOT":{"type":"div","isCanvas":true,"props":{"id":"canvasElement","style":{"width":"400px","height":"400px"},"className":"canvasElement","data-testid":"canvasElement"},"displayName":"div","custom":{},"hidden":false,"nodes":["rodKcISCDJ","DWZlX1HTUO","X-FEG-FV1Y","nZ3azHqRJd"],"linkedNodes":{}},"DWZlX1HTUO":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{"text":"Button","size":"small","variant":"contained","pageX":66,"pageY":82,"background":{"r":63,"g":81,"b":181,"a":1},"color":{"r":255,"g":255,"b":255,"a":1},"funcname":"bestFuncEvr","width":75.4453125,"height":30.75},"displayName":"Button","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"X-FEG-FV1Y":{"type":{"resolvedName":"Textfield"},"isCanvas":false,"props":{"text":"Hallå","fontSize":15,"textAlign":"left","fontWeight":"500","color":{"r":0,"g":0,"b":0,"a":1},"width":29.6015625,"height":17.5,"pageX":258,"pageY":96},"displayName":"Textfield","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"rodKcISCDJ":{"type":{"resolvedName":"Slider"},"isCanvas":false,"props":{"size":"small","width":100,"defaultValue":0,"color":{"r":63,"g":81,"b":181,"a":1},"valueLabelDisplay":"auto","height":31.5,"pageX":89,"pageY":246},"displayName":"Slider","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"nZ3azHqRJd":{"type":{"resolvedName":"Switch"},"isCanvas":false,"props":{"size":"small","color":{"r":63,"g":81,"b":181,"a":1},"width":40,"height":24,"pageX":205,"pageY":183},"displayName":"Switch","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}}}'
	/*
	const resize = () => {
		document.getElementById("canvasElement").style.width = '200px'
		document.getElementById("canvasElement").style.height = '200px'
	} */

	/** Render all components. */
	return (
		<div className='App'>
			<header className='header'>
				<img
					src={logo}
					alt='logo'
					className='logoTest'
				/>
				<h1 className='topText'>MicroGUI</h1>
			</header>
			<Editor
				enabled={true}
				resolver={{
					Button,
					Slider,
					Switch,
					Textfield
				}}
				indicator={false}
			>
				<Stack
					className='row'
					direction='row'
					spacing={0}
				>
					<div className='left'>
						<Toolbox />
					</div>
					<div className='middle'>
						<Toolbar />
						<Frame /*data={jsonstring}*/>
							<Element
								id='canvasElement'
								is='div'
								style={{
									width: '400px',
									height: '400px',
								}}
								canvas
							/>
						</Frame>
					</div>
					<div className='right'>
						<Editbox />
					</div>
				</Stack >
			</Editor>
			<footer className='footer'>
				<p>© MicroGUI 2022 |&nbsp;
					<a
						href='https://github.com/CarlClasson/MicroGUI'
						target='_blank'
						rel='noreferrer'
					>
						GitHub
					</a>
				</p>
			</footer>
		</div >
	)
}