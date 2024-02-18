export function point(context: CanvasRenderingContext2D, x: number, y: number, color = "black", size = 0.15) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, size, 0, 2 * Math.PI);
    context.fill();
}

export function arrow(
    context: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    tipSize = 0.2,
) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const ndx = dx / length;
    const ndy = dy / length;

    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x2 - tipSize * ndx - tipSize * ndy, y2 - tipSize * ndy + tipSize * ndx);
    context.moveTo(x2, y2);
    context.lineTo(x2 - tipSize * ndx + tipSize * ndy, y2 - tipSize * ndy - tipSize * ndx);
    context.stroke();
}
