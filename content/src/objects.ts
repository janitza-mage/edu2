export function point(context: CanvasRenderingContext2D, x: number, y: number) {
    context.fillStyle = "black";
    context.beginPath();
    context.arc(x, y, 0.15, 0, 2 * Math.PI);
    context.fill();
}
