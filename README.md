# Flux TodoMVC Example

> An application architecture for React utilizing a unidirectional data flow.

This is what a running Flux TodoMVC example looks like:
<img src="screenshot.png" style="width: 100%;" />

## React, Flux, and server side code other than Node.js

The original repo this project was forked from can be found here: https://github.com/facebook/flux/tree/master/examples/flux-todomvc

So what is the purpose of this fork? Quite simply I couldn't find a simple, React Flux example that followed Facebook's initial examples but communicated with server side code via a RESTful API (for those of us out there who want, say, some static typing). In this case I'm using Python, but the code in `server.py` could be translated to another language like Go, Java or C#.

This repo is a teaching aid containing a small client and server app that is built with React components and adheres to the [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) architecture - all efforts have been taken to minimise the dependencies and simplify the build process. For a real project, however, I recommend using the [Redux](http://redux.js.org/) library which builds upon Facebook's Flux pattern, and writing ES6 compliant JavaScript using the [Babel](https://babeljs.io/) transpiler.

## Running

You must have [npm](https://www.npmjs.org/) installed on your computer. From the root project directory run these commands from the command line:

    npm install

This will install all dependencies. To build the project, install webpack globally if you haven't already done so:

    sudo npm install webpack -g

Create the minified JavaScript bundle.min.js file which includes the React framework and Flux library:

    webpack

The server uses python3 with the Flask web framework, however, any RESTful server could be substituted. Install Flask first with.

    pip3 install -r requirements.txt

Finally to run the server:

    python3 server.py

and visit http://localhost:3000/ in a web browser. The web app will stay in sync with the contents of ```todos.json```.
