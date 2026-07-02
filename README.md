# Visualizations of data structures and algorithms

- **[Try out the library here!](https://chalmersgu-data-structure-courses.github.io/dsvis/)**

This library is inspired by [David Galles' Javascript visualisations](https://www.cs.usfca.edu/~galles/visualization/) from 2011, but the code base is completely new. It uses modern Javascript/HTML features such as asynchronous functions and SVG animations. This makes the code much more clean and readable, and the graphics becomes way smoother.

The only external dependency is the [SVG.js library](https://svgjs.dev/), it is included in the `lib` directory.

The code has been migrated to TypeScript, and it uses Webpack. To compile it you run `make website`, and then a website is created in the folder `public/`. To publish on Github, you run `make deploy` and push the changes.

If you do not have `make`, you first have to run `npm install` to install all dependencies, and then you can compile the code into the `public/` folder using `npx webpack --config webpack.config.js`.

## Authors

The following people have been involved in the making of this library.

- Peter Ljunglöf: core developer, project leader
- (David Galles: design and ideas for original visualisations)

Bachelor project, spring 2025:

- Justus Forsberg: sorting algorithms
- Isak Hammarlund: conversion to TypeScript
- Dennis Holmström: conversion to TypeScript, refactoring
- Josef Rasheed: linked lists
- Alireza Sharifi: linked lists
- Frida Sundelin: sorting algorithms

Bachelor project, spring 2026:

- Sondre Fransson: sorting algorithms, website design and colour scheme
- Simon Grandin: graph algorithms
- Noel Heimer: lists, arrays and hashtables
- Aron Sigfridsson: sorting algorithms, panning and zooming in the canvas
- Shawn Wang: lists, arrays and hashtables, hash functions
- Erik Zetterlund: graph algorithms, colour scheme

## References

Justus Forsberg, Isak Hammarlund, Dennis Holmström, Josef Rasheed, Alireza Sharifi, and Frida Sundelin (2025).
*Creating an Extendable and Developer-Friendly Framework for Visualizing Data Structures and Algorithms*.
BSc thesis, Department of Computer Science and Engineering, University of Gothenburg and Chalmers University.
<https://hdl.handle.net/20.500.12380/311575>

Sondre Fransson, Simon Grandin, Noel Heimer, Aron Sigfridsson, Shawn Wang, and Erik Zetterlund (2026).
*Visualisering av datastrukturer och algoritmer: Utveckling av ett visualiseringsbibliotek till stöd för studenters inlärning*.
BSc thesis, Department of Computer Science and Engineering, University of Gothenburg and Chalmers University.
<https://hdl.handle.net/20.500.12380/311725>
