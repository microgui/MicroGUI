import './App.css'

import { Stack } from '@mui/material';
import { Editor as CraftEditor, Frame, Element } from '@craftjs/core';

import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../logo.png'

import { Toolbox } from '../components/tools/Toolbox'
import { Toolbar } from '../components/tools/toolbar/Toolbar'
import { Button } from '../components/user/button/Button'
import { Slider } from '../components/user/slider/Slider'
import { Switch } from '../components/user/switch/Switch'
import { Textfield } from '../components/user/textfield/Textfield'
import { Editbox } from '../components/tools/editbox/Editbox'
import { CanvasArea } from '../components/user/canvas/CanvasArea'
import { Checkbox } from '../components/user/checkbox/Checkbox'
import { Divider } from '../components/user/divider/Divider'
import { Progressbar } from '../components/user/progress/Progressbar'
import { CircularProgress } from '../components/user/progress/CircularProgress'
import { Radiobutton } from '../components/user/radiobutton/Radiobutton'
import { Container } from '../components/user/container/Container'
import GitHubIcon from '@mui/icons-material/GitHub'

/**
 * The homepage of the web app, where the user can create their GUIs.
 */
export default function Editor() {

	return (
		<div className='App'>
			<header className='header'>
				<Link to='/'>
					<img
						src={logo}
						alt='logo'
						className='logoTest'
					/>
				</Link>

				<h1 className='topText'>MicroGUI</h1>
			</header>
			<CraftEditor
				enabled={true}
				// A map of every user component in the editor.
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
				// removes the 'drop-indicator' built into craft.js
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
						<Frame >
							{/*The canvas element where the user can drop components*/}
							<Element is={CanvasArea} canvas />
						</Frame>
					</div>
					<div className='right'>
						<Editbox />
					</div>
				</Stack >
			</CraftEditor>
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
		</div >
	)
}
