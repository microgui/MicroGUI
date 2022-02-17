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
						<Frame>
							<Element 
								is='div' 
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
								<h1>Hi</h1>
								<Button text='button' variant='outlined' />
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