import "source-map-support/register";
import { createCanvas } from "canvas";
import { writeFileSync } from "fs";

const canvas = createCanvas(200, 200, "svg");
const context = canvas.getContext("2d");

// Write "Awesome!"
context.font = "30px Impact";
context.rotate(0.1);
context.fillText('Awesome!', 50, 100);

// Draw line under text
const textMetrics = context.measureText("Awesome!");
context.strokeStyle = "rgba(0,0,0,0.5)";
context.beginPath();
context.lineTo(50, 102);
context.lineTo(50 + textMetrics.width, 102);
context.stroke();

const buffer = canvas.toBuffer("image/png");
writeFileSync("test.png", buffer);
