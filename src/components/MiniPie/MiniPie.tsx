import {StaticCanvas} from "../StaticCanvas/StaticCanvas";

const colorGreen = "#0d0";
const colorRed = "#c00";
const colorGrey = "#ddd";

const deg360 = 2 * Math.PI;
const deg90 = 0.5 * Math.PI;

export interface MiniPieProps {
    green: number;
    red: number;
    grey: number;
    size: string;
    resolution: number;
}

export function MiniPie(props: MiniPieProps) {
    return <StaticCanvas
        width={props.resolution}
        height={props.resolution}
        draw={context => drawMiniPie(props, context, props.resolution)}
        style={{width: props.size, height: props.size}}
    />;
}

function drawMiniPie(props: MiniPieProps, context: CanvasRenderingContext2D, resolution: number) {
    const halfRes = resolution / 2;
    const total = props.green + props.red + props.grey;
    const angle1 = -deg90;
    const angle2 = angle1 + deg360 * props.green / total;
    const angle3 = angle2 + deg360 * props.red / total;
    
    function drawPiece(a1: number, a2: number, color: string) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(halfRes, halfRes, halfRes, a1, a2, false);
        context.lineTo(halfRes, halfRes);
        context.fill();
    }
    
    // slightly overlap the pieces to avoid aliasing artifacts
    drawPiece(angle1, angle2 + 0.1, colorGreen);
    drawPiece(angle2, angle3 + 0.1, colorRed);
    drawPiece(angle3, angle1 + 0.1, colorGrey);
    drawPiece(angle1, angle2, colorGreen);
}
