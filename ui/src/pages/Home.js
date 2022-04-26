import './App.css'

import { Stack } from '@mui/material';
import { Editor, Frame, Element } from '@craftjs/core';

import logo from '../logo.png'

import { Toolbox } from '../components/tools/Toolbox'
import { Toolbar } from '../components/tools/toolbar/Toolbar'
import { Button } from '../components/user/button/Button'
import { Slider } from '../components/user/slider/Slider'
import { Switch } from '../components/user/switch/Switch'
import { Textfield } from '../components/user/textfield/Textfield'
import { Editbox } from '../components/tools/editbox/Editbox'
import { CanvasArea } from '../components/user/canvas/CanvasArea'

import GitHubIcon from '@mui/icons-material/GitHub'

/**
 * Core of the web app.
 * @returns The web app.
 */
export default function Home() {

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
					CanvasArea,
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
								is={CanvasArea}
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
				<p>© MicroGUI 2022 |&nbsp;</p>
				<a
					href='https://github.com/CarlClasson/MicroGUI'
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
		</div >
	)
}