# Flux TodoMVC Example

> An application architecture for React utilizing a unidirectional data flow.

This is what a running Flux TodoMVC example looks like:
<img src="screenshot.png" style="width: 100%;" />

## This project is a fork

The original repo this project was forked from can be found here: https://github.com/facebook/flux/tree/master/examples/flux-todomvc

So what is the purpose of this fork? Quite simply I couldn't find a simple, React Flux example that followed Facebook's initial examples but communicated with server side code via a RESTful API.

The Flux pattern suggests that this should be done in the Action creators, but no example showed how to do so. This repo is an example of a small client and server app that is built with React components and adheres to the Flux architecture.

## Running

The setup assumes python3 is installed. Execute the following to install the Flask web framework.

    pip3 install -r requirements.txt

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

    npm install

This will install all dependencies.

To build the project, first run this command:

    npm run build

To run the code execute:

    npm run server

and visit http://localhost:3000/ in a web browser. The web app will stay in sync with the contents of ```todos.json```.
