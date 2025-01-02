import {StaticCanvas} from "../StaticCanvas/StaticCanvas";

const halfSize = 50;
const fullSize = 2 * halfSize;
const colorGreen = "#0d0";
const colorRed = "#c00";
const colorGrey = "#ddd";

const deg360 = 2 * Math.PI;
const deg90 = 0.5 * Math.PI;

export interface MiniPieProps {
    green: number;
    red: number;
    grey: number;
}

export function MiniPie(props: MiniPieProps) {
    return <StaticCanvas
        width={fullSize}
        height={fullSize}
        draw={context => drawMiniPie(props, context)}
        style={{width: "2em", height: "2em"}}
    />;
}

function drawMiniPie(props: MiniPieProps, context: CanvasRenderingContext2D) {
    const total = props.green + props.red + props.grey;
    const angle1 = -deg90;
    const angle2 = angle1 + deg360 * props.green / total;
    const angle3 = angle2 + deg360 * props.red / total;
    
    function drawPiece(a1: number, a2: number, color: string) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(halfSize, halfSize, halfSize, a1, a2, false);
        context.lineTo(halfSize, halfSize);
        context.fill();
    }
    
    // slightly overlap the pieces to avoid aliasing artifacts
    drawPiece(angle1, angle2 + 0.1, colorGreen);
    drawPiece(angle2, angle3 + 0.1, colorRed);
    drawPiece(angle3, angle1 + 0.1, colorGrey);
    drawPiece(angle1, angle2, colorGreen);
}
