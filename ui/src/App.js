import './App.css'
import Canvas from './Components/Canvas.js'
import CanvasButtons from './Components/CanvasButtons.js'
import CanvasSize from './Components/CanvasSize';
import ObjectsMenu from './Components/ObjectsMenu.js'
import ClearCanvasButton from './Components/ClearCanvasButton.js'

import { Stack } from '@mui/material';

/**
 * Core of the web app.
 * @returns The web app.
 */
function App() {
	/** Holds canvas context. */
	var ctx

	/** Save canvas context to variable ctx. */
	const saveContext = (context) => {
		ctx = context
	}

	/** Resize canvas size (width, height). */
	const resizeCanvas = (width, height) => {
		ctx.canvas.width = width
		ctx.canvas.height = height
	}

	const clearCanvas = () => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}

	/** Draw on canvas. */
	const drawSmth = () => {
		//context.fillStyle = '#000000'
    	//context.fillRect(0, 0, context.canvas.width, context.canvas.height)
		ctx.fillStyle = '#ff8844'
		ctx.fillRect(5, 5, 50, 50)
		ctx.fillStyle = '#db5bb0'
		ctx.fillRect(75, 50, 50, 50)
		ctx.fillStyle = '#cc0000'
		ctx.fillRect(150, 75, 50, 50)
	}

	const drawRed = () => {
		ctx.fillStyle = '#cc0000'
		ctx.fillRect(150, 75, 50, 50)
	}

	const drawOrng = () => {
		ctx.fillStyle = '#ff8844'
		ctx.fillRect(5, 5, 50, 50)
	}

	const drawBtn = () => {
		ctx.translate(1, 1)
		ctx.strokeStyle = "#000000"
		ctx.lineWidth = 1.5;
		
		ctx.strokeRect(150, 70, 50, 50)
		
	}

	/** Render all components. */
	return (
		<div className='App'>
			<h1>MicroGUI</h1>
			<div className='row'>
				<div className='column side'>
					<Stack 
						spacing={2}
						justifyContent='center'
  						alignItems='center'
					>
						<ObjectsMenu 
							className='ObjectsMenu'
							testLog={drawRed} 
							other={drawOrng}
							btn={drawBtn}
						/>
						<ClearCanvasButton
							clear={clearCanvas}
						/>
					</Stack>
				</div>
				<div className='column middle'>
					<div className='canvasSize'>
						<CanvasSize 
							resize = {resizeCanvas}	
						/>
					</div>
					<Canvas 
						className='Canvas' 
						saveContext={saveContext}
						width='400'
						height='300'
					/>
					<div className='buttons'>
						<CanvasButtons />
					</div>
				</div>
				<div className='column side'>
					<h1>Text</h1>
				</div>
			</div>
		</div>
	);
}

export default App;
