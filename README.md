# Visualizations of data structures and algorithms

- **[Try out the library here!](https://chalmersgu-data-structure-courses.github.io/dsvis/)**

This library is inspired by [David Galles' Javascript visualisations](https://www.cs.usfca.edu/~galles/visualization/) from 2011, but the code base is completely new. It uses modern Javascript/HTML features such as asynchronous functions and SVG animations. This makes the code much more clean and readable, and the graphics becomes way smoother.

The only external dependency is the [SVG.js library](https://svgjs.dev/), it is included in the `lib` directory.

The code has been migrated to TypeScript, and it uses Webpack. To compile it you run `make website`, and then a website is created in the folder `public/`. To publish on Github, you run `make deploy` and push the changes.
