export function setupGrid(
    context: CanvasRenderingContext2D,
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
) {
    minX = Math.round(minX);
    maxX = Math.round(maxX);
    minY = Math.round(minY);
    maxY = Math.round(maxY);
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(50, 20);
    context.lineTo(50, 40);
    context.stroke();
}