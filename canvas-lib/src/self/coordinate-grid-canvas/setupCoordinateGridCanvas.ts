
// TODO the canvas itself has a certain aspect ratio. By giving all four extents of the grid, the grid has its own
// aspect ratio, which must match that of the canvas, or the whole drawing will be distorted.
// Possible approach: combine setupGrid with creation of the canvas object?

export function setupCoordinateGridCanvas(
    context: CanvasRenderingContext2D,
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
) {

    // parameter normalization and computing derived values
    minX = Math.round(minX);
    maxX = Math.round(maxX);
    minY = Math.round(minY);
    maxY = Math.round(maxY);
    const startX = minX - 0.5;
    const endX = maxX + 0.5;
    const startY = minY - 0.5;
    const endY = maxY + 0.5;

    // transformation
    context.scale(1 / (maxX - minX + 1) * context.canvas.width, -1 / (maxY - minY + 1) * context.canvas.height);
    context.translate(-startX, -endY);

    // grid
    context.strokeStyle = "lightgrey";
    context.lineWidth = 0.1;
    context.beginPath();
    for (let x = minX; x <= maxX; x++) {
        context.moveTo(x, startY);
        context.lineTo(x, endY);
    }
    for (let y = minY; y <= maxY; y++) {
        context.moveTo(startX, y);
        context.lineTo(endX, y);
    }
    context.stroke();

    // main axes
    context.strokeStyle = "black";
    context.lineWidth = 0.1;
    context.beginPath();
    context.moveTo(startX, 0);
    context.lineTo(endX, 0);
    context.moveTo(0, startY);
    context.lineTo(0, endY);
    context.stroke();

    // arrows
    context.beginPath();
    context.moveTo(endX - 0.05, 0);
    context.lineTo(endX - 0.2, -0.2);
    context.moveTo(endX - 0.05, 0);
    context.lineTo(endX - 0.2, +0.2);
    context.moveTo(0, endY - 0.05);
    context.lineTo(-0.2, endY - 0.2);
    context.moveTo(0, endY - 0.05);
    context.lineTo(+0.2, endY - 0.2);
    context.stroke();

    // sane and stable defaults
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.lineWidth = 0.1;
    context.setLineDash([]);

}
