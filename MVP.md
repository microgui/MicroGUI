# Minimum viable product (MVP)

## The problem

The project aims to target developers of various skill-level that have the goal of creating simple GUIs for embedded devices.
Creating GUIs can be time-consuming and difficult, often requiring the developer to learn new packages and libraries. 
The goal of the MicroGUI software is to simplify the whole process of creating GUIs, by providing an editor where the user can drag and drop GUI-components into a canvas.

## Long-term goals

* Anyone who wants to make a simple GUI for an embedded device should use MicroGUI!
* The product should be well-documented so that it's easy to contribute towards it.

## Core features

### Canvas
* There should be a canvas where components can be dropped.
* The canvas should have editable features:
  * Size
  * Background color
  
### Components
* There should be four ready-made components to choose from:
  * Button
  * Switch
  * Slider
  * Textfield
* Components should be draggable but bound to the canvas area.
* Components should have editable features, for example:
  * Color
  * Size
  * Input
  * Event

### Saving and loading
* The state of the canvas should be possible to save in JSON format via a button.
* It should be possible to load a saved state of a canvas via a button.
* Saving/loading should be possible in two ways:
  * Coyping to clipboard / Pasting from clipboard
  * Saving to a file / Uploading a file

### Tools
* A tooltip should be visible when a component gets hovered.
* It should be possible to remove selected components from the canvas via a tooltip.
* It should be possible to clear the whole canvas via a button.
* It should be possible to undo/redo actions in the canvas.

### Simulator 
* There should be a simulator-mode where the user can try out their GUI.
* When in simulator mode it should <ins>not</ins> be possible to:
  * Move components
  * See the tooltip
  * Remove components
  * Edit the features of components
