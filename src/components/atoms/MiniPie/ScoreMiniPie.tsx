import {StaticCanvas} from "../../StaticCanvas/StaticCanvas";

const colorGreen = "#0d0";
const colorRed = "#c00";

const deg360 = 2 * Math.PI;
const deg90 = 0.5 * Math.PI;

export interface ScoreMiniPieProps {
    score: number;
    size: string;
    resolution: number;
}

export function ScoreMiniPie(props: ScoreMiniPieProps) {
    return <StaticCanvas
        width={props.resolution}
        height={props.resolution}
        draw={context => drawMiniPie(props, context, props.resolution)}
        style={{width: props.size, height: props.size}}
    />;
}

function drawMiniPie(props: ScoreMiniPieProps, context: CanvasRenderingContext2D, resolution: number) {
    const halfRes = resolution / 2;
    const angle1 = -deg90;
    const angle2 = angle1 + deg360 * props.score / 10;
    
    function drawPiece(a1: number, a2: number, color: string) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(halfRes, halfRes, halfRes, a1, a2, false);
        context.lineTo(halfRes, halfRes);
        context.fill();
    }
    
    // slightly overlap the pieces to avoid aliasing artifacts
    drawPiece(angle1, angle2 + 0.1, colorGreen);
    drawPiece(angle2, angle1 + 0.1, colorRed);
    drawPiece(angle1, angle2, colorGreen);
}
