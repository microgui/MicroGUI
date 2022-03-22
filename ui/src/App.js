import './App.css'

import { Typography, Paper, Grid, Stack, Button as MaterialButton } from '@mui/material';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';

import logo from './logo.png'

import { Toolbox } from './components/tools/Toolbox'
import { Toolbar } from './components/tools/Toolbar'
import { Button } from './components/user/button/Button'
import { Slider } from './components/user/slider/Slider'
import { Switch } from './components/user/switch/Switch'
import { Textfield } from './components/user/textfield/Textfield'
import { Editbox } from './components/tools/editbox/Editbox'

/**
 * Core of the web app.
 * @returns The web app.
 */
export default function App() {

	const jsonstring = '{"ROOT":{"type":"div","isCanvas":true,"props":{"id":"canvasElement","style":{"width":"400px","height":"400px"},"className":"canvasElement","data-testid":"canvasElement"},"displayName":"div","custom":{},"hidden":false,"nodes":["fMAL78_Mwe","zZdhXn8OzW"],"linkedNodes":{}},"fMAL78_Mwe":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{"text":"Herro","size":"small","variant":"outlined","pageX":639,"pageY":180.15000915527344},"displayName":"Button","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"zZdhXn8OzW":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{"text":"Testing","size":"small","variant":"outlined","pageX":756,"pageY":262.1499938964844},"displayName":"Button","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}}}'
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
								data-testid='canvasElement'
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