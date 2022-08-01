import { render, fireEvent, screen, prettyDOM } from '@testing-library/react'
import App from '../../App'
import { Editor, Frame, Element } from '@craftjs/core'
import { Button } from '../user/Button'

export const customWrapper = () => {
    return (
        <Editor
            resolver={{
                Button
            }}
        >
            <Frame>
                <Element
                    is='div'
                    canvas
                />
            </Frame>
        </Editor>
    )
}

test('button component renders correctly', () => {
    render(<Button 
        text="Test button" 
        size="small" 
        variant="outlined" 
        data-testid='test-button'
     />
    , {
         wrapper: customWrapper
     }
    )

})

/*
test('button component renders without crashing', async () => {
    // render the App
    render(<App/>)
    // get "button" from components list
    const btn = screen.getByText(/button/i)
    // save canvas coordinates
    const to = screen.getByTestId('canvasElement').getBoundingClientRect()
    // drag button to the canvas
    fireEvent.drag(btn, {to:to})
    screen.debug()
    
    // wait for button to appear
    const button = await screen.findByText(/click me/i)
    // check if it is in the document
    expect(button).toBeInTheDocument()
    
});
*/
