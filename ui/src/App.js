import './App.css';
import Canvas from './Components/Canvas.js'
import ObjectsMenu from './Components/ObjectsMenu.js'

function App() {
	/** Holds canvas context. */
	var ctx

	/** Save canvas context to variable. */
	const saveContext = (context) => {
		ctx = context
		//ctx.canvas.width = 400
		//ctx.canvas.height = 300
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
					<ObjectsMenu 
						className='ObjectsMenu'
						testLog={drawRed} 
						other={drawOrng}
						btn={drawBtn}
					/>
				</div>
				<div className='column middle'>
					<Canvas 
						className='Canvas' 
						saveContext={saveContext}
						width='400'
						height='300'
					/>
				</div>
				<div className='column side'>
					<h1>Text</h1>
				</div>
			</div>
		</div>
	);
}

export default App;
