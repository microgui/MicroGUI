import './App.css'

import { Typography, Paper, Grid, Stack, Button as MaterialButton } from '@mui/material';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';

import logo from './logo.png'

import { Toolbox } from './components/tools/Toolbox'
import { Toolbar } from './components/tools/Toolbar'
import { Button } from './components/user/Button'
import { Slider } from './components/user/Slider'
import { Switch } from './components/user/Switch'
import { Textfield } from './components/user/Textfield'

/**
 * Core of the web app.
 * @returns The web app.
 */
export default function App() {

	const jsonstring = '{"ROOT":{"type":"div","isCanvas":true,"props":{"id":"canvasElement","style":{"width":"400px","height":"400px"},"className":"canvasElement"},"displayName":"div","custom":{},"hidden":false,"nodes":["TOZBw9lDlX","6rdtpbSaNS","c6MLXelF55","Ak8OLajmis"],"linkedNodes":{}},"TOZBw9lDlX":{"type":{"resolvedName":"Textfield"},"isCanvas":false,"props":{"text":"wut","pageX":463.3999938964844,"pageY":228.75},"displayName":"Textfield","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"6rdtpbSaNS":{"type":{"resolvedName":"Slider"},"isCanvas":false,"props":{"size":"small","defaultValue":0,"aria-label":"Default","valueLabelDisplay":"auto","pageX":446.3999938964844,"pageY":308.75},"displayName":"Slider","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"Ak8OLajmis":{"type":{"resolvedName":"Switch"},"isCanvas":false,"props":{"size":"small","pageX":589.4000244140625,"pageY":203.75},"displayName":"Switch","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"c6MLXelF55":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{"text":"Click me","size":"small","variant":"outlined","pageX":600,"pageY":300},"displayName":"Button","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}}}'
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
				<h1 className='topText' >MicroGUI</h1>
			</header>
			<Editor
				resolver={{
					Button,
					Slider,
					Switch,
					Textfield
				}}
				indicator={false}
				// onRender={RenderNode}
			>
				<Stack
					className='row'
					direction='row'
					spacing={0}
				>
					<div className='left'>
						<Toolbox />
						{/* <MaterialButton
							variant='outlined'
							onClick={resize}
							style={{
								margin: '20px'
							}}
						>
							Resize
						</MaterialButton>
						<SaveButton /> */}
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
								className='canvasElement'
								canvas
							/>
						</Frame>
					</div>
					<div className='right'>
						<h1>Settings</h1>
					</div>
				</Stack >
			</Editor>
			<footer className='footer'>
				<a
					href='https://github.com/CarlClasson/MicroGUI'
					target='_blank'
				>
					GitHub
				</a>
			</footer>
		</div >
	);
}