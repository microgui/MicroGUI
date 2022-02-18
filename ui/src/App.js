import './App.css'

import { Typography, Paper, Grid, Stack, Button as MaterialButton } from '@mui/material';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';

import logo from './logo.png'

import { Container } from './Components/Container'
import { Toolbox } from './Components/Toolbox'
import { Button } from './Components/Button'

/**
 * Core of the web app.
 * @returns The web app.
 */
export default function App() {
	const jsonstring = '{"ROOT":{"type":"div","isCanvas":true,"props":{"id":"canvasElement","style":{"width":"400px","height":"400px"},"className":"canvasElement"},"displayName":"div","custom":{},"hidden":false,"nodes":["UHmVvImsmE","1MkOp5R8X2","52V_pTJjuX"],"linkedNodes":{}},"52V_pTJjuX":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{"text":"Click me2","size":"small","variant":"contained","pageX":400.3999938964844,"pageY":243.7874984741211},"displayName":"Button","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"UHmVvImsmE":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{"text":"Click me2","size":"small","variant":"contained","pageX":212.39999389648438,"pageY":340.7874984741211},"displayName":"Button","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"1MkOp5R8X2":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{"text":"Click me2","size":"small","variant":"contained","pageX":267.3999938964844,"pageY":198.78750610351562},"displayName":"Button","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}}}'

	const resize = () => {
		document.getElementById("canvasElement").style.width = '200px'
		document.getElementById("canvasElement").style.height = '200px'
	}

	const SaveButton = () => {
		const { query } = useEditor()
		return (
			<MaterialButton
				size="small"
				variant="outlined"
				color="secondary"
				onClick={() => {
					console.log(query.serialize())
				}}
			>
				Serialize JSON
			</MaterialButton>
		)
	}

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
					Button
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
						<MaterialButton
							variant='outlined'
							onClick={resize}
							style={{
								margin: '20px'
							}}
						>
							Resize
						</MaterialButton>
						<SaveButton />
					</div>
					<div className='middle'>
						<Frame /*data={jsonstring}*/>
							<Element
								is='div'
								id='canvasElement'
								// style={{
								// 	background-color: '#f5f5f5',
								// 	border: '1px solid #ccc',
								// 	border-radius: '4px',
								// }}
								style={{
									// margin: '0 auto', 
									width: '400px',
									height: '400px',
									// border: '1px solid #ccc',
									// height: '100%'
								}}
								className='canvasElement'
								canvas
							>
							</Element>
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





{/* <div className='App'>
	<h1>MicroGUI</h1>
	<div className='row'>
		<div className='column side'>

		</div>
		<div className='column middle'>

		</div>
		<div className='column side'>
			<h1>Text</h1>
		</div>
	</div>
</div> */}

{/* <Stack spacing={2}>
	<h1>MicroGUI</h1>
	<Stack
		direction='row'
		spacing={4}
	>
		<h1>Left</h1>
		<h1>Middle</h1>
		<h1>Right</h1>
	</Stack>
	<h1>Footer</h1>
</Stack> */}