import React, {useRef, useEffect, CSSProperties} from 'react'

export interface StaticCanvasProps {
    width: number;
    height: number;
    draw: (context: CanvasRenderingContext2D) => void;
    style?: CSSProperties | undefined;
}

export function StaticCanvas(props: StaticCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) {
            return;
        }
        const context = canvas.getContext('2d')
        if (!context) {
            return;
        }
        props.draw(context);
    }, [])
    return <canvas ref={canvasRef} width={props.width} height={props.height} style={props.style} />
}
