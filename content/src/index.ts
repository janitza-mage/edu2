import "source-map-support/register";

// @ts-ignore
import { Context } from "svgcanvas";

/*
Using svgcanvas to generate SVG images. The alternative would be canvas-to-svg, but that doesn't have a Github repo or
even source code. Both are unmaintained for 2 years.

SVG itself is preferred over generating a PNG using a canvas or offline node/canvas alternative because each canvas
implementation is slightly different, so an offline-generated PNG used in a unit description would look different than
a live-generated canvas in an exercise.
 */


const context = new Context(500, 500) as CanvasRenderingContext2D;

// draw your canvas like you would normally
context.fillStyle = "red";
context.fillRect(100, 100, 100, 100);

// serialize your SVG
const svg = (context as any).getSerializedSvg();
console.log(svg);

