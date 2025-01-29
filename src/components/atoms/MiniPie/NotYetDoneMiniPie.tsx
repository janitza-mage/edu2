import {StaticCanvas} from "../../StaticCanvas/StaticCanvas";

export interface NotYetDoneMiniPieProps {
    size: string;
    resolution: number;
}

export function NotYetDoneMiniPie(props: NotYetDoneMiniPieProps) {
    return <StaticCanvas
        width={props.resolution}
        height={props.resolution}
        draw={context => drawMiniPie(context, props.resolution)}
        style={{width: props.size, height: props.size}}
    />;
}

function drawMiniPie(context: CanvasRenderingContext2D, resolution: number) {
    const halfRes = resolution / 2;
    context.fillStyle = "#aaa";
    context.beginPath();
    context.arc(halfRes, halfRes, halfRes, 0, 2 * Math.PI, false);
    context.lineTo(halfRes, halfRes);
    context.fill();
}
