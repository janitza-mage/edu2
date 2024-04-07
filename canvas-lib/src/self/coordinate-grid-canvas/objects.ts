export interface PointOptions {
    size?: number;
    font?: string;
    labelX?: number;
    labelY?: number;
}

export function point(context: CanvasRenderingContext2D, x: number, y: number, label?: string, options: PointOptions = {}) {
    context.beginPath();
    context.arc(x, y, options.size ?? 0.15, 0, 2 * Math.PI);
    context.fill();
    if (label !== undefined) {
        context.save();
        context.font = options.font ?? "0.8px sans-serif";
        context.translate(x, y);
        context.scale(1, -1);
        context.fillText(label, options.labelX ?? 0.3, options.labelY ?? 1.0);
        context.restore();
    }
}

export function arrow(
    context: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    tipSize = 0.2,
) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const ndx = dx / length;
    const ndy = dy / length;

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x2 - tipSize * ndx - tipSize * ndy, y2 - tipSize * ndy + tipSize * ndx);
    context.moveTo(x2, y2);
    context.lineTo(x2 - tipSize * ndx + tipSize * ndy, y2 - tipSize * ndy - tipSize * ndx);
    context.stroke();
}

export function infiniteLine(
    context: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    extensionFactor = 1000, // this is a parameter just in case it is not enough
) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    context.beginPath();
    context.moveTo(x1 - extensionFactor * dx, y1 - extensionFactor * dy);
    context.lineTo(x2 + extensionFactor * dx, y2 + extensionFactor * dy);
    context.stroke();
}

export function showXAxisAngle(
    context: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const intersectionX = x1 - y1 * dx / dy;

    context.beginPath();
    context.arc(intersectionX, 0, 0.2, 0, 2 * Math.PI);
    context.fill();
    context.beginPath();
    context.arc(intersectionX, 0, 0.6, 0, 0.5 * Math.PI); // TODO
    context.stroke();
}

export function showText(context: CanvasRenderingContext2D, x: number, y: number, text: string) {
    context.save();
    context.translate(x, y);
    context.scale(1, -1);
    context.fillText(text, 0, 0);
    context.restore();
}
