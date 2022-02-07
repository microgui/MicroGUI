import './App.css';
import Canvas from './Components/Canvas.js'

function App() {
	/** Draw objects on canvas. */
	const draw = (context) => {
		//context.fillStyle = '#000000'
    	//context.fillRect(0, 0, context.canvas.width, context.canvas.height)
		context.fillStyle = '#ff8844'
		context.fillRect(5, 5, 50, 50)
		context.fillStyle = '#db5bb0'
		context.fillRect(75, 50, 50, 50)
		context.fillStyle = '#cc0000'
		context.fillRect(150, 75, 50, 50)
	}

	/** Render all components. */
	return (
		<div className="App">
			<h1>MicroGUI</h1>
			<Canvas draw={draw} />
		</div>
	);
}

export default App;
