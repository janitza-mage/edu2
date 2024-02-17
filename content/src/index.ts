import "source-map-support/register";


/*
Using svgcanvas to generate SVG images. The alternative would be canvas-to-svg, but that doesn't have a Github repo or
even source code. Both are unmaintained for 2 years.

SVG itself is preferred over generating a PNG using a canvas or offline node/canvas alternative because each canvas
implementation is slightly different, so an offline-generated PNG used in a unit description would look different than
a live-generated canvas in an exercise.

-->

svgcanvas is buggy, it just throws "ReferenceError: document is not defined". Probably never tested in node, only
in the browser.

trying canvas-to-svg --> same bug. probably only ever tried in the browser too.

->
node-canvas can render to SVG instead of pixels!

DOES NOT WORK the way it should. Renders only a path, not a high-level SVG, so doing this on the server will yield
a result different from an equivalent canvas on the client.

Difference in output seems to be mostly fonts, so let's accept that for now.



 */


const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200, "svg");
const context = canvas.getContext('2d')
const fs = require('fs');

// Write "Awesome!"
context.font = '30px Impact'
context.rotate(0.1)
context.fillText('Awesome!', 50, 100)

// Draw line under text
const textMetrics = context.measureText('Awesome!')
context.strokeStyle = 'rgba(0,0,0,0.5)'
context.beginPath()
context.lineTo(50, 102)
context.lineTo(50 + textMetrics.width, 102)
context.stroke()

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("test.png", buffer);
