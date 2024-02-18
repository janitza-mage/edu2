import "source-map-support/register";
import {createCanvas} from "canvas";
import {base64Encode} from "./util/base64";
import axios, {AxiosRequestConfig} from "axios";
import {setupGrid} from "./setupGrid";

async function updateImage(imageId: number, width: number, height: number, renderer: (context: CanvasRenderingContext2D) => void) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    renderer(context as any);
    const request = {
        contentType: "image/png",
        dataBase64: base64Encode(canvas.toBuffer("image/png")),
    };
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: "Bearer 1",
        },
    };
    const response = await axios.put(`http://localhost:8080/author/updateImage/${imageId}`, request, config);
    if (response.status !== 200) {
        throw new Error(`got unexpected status code ${response.status}`);
    }
}

async function main() {
    /*
    await updateImage(1, 200, 200, (context) => {

        // Write "Awesome!"
        context.font = "30px Impact";
        context.rotate(0.1);
        context.fillText('Awesome!', 50, 100);

        // Draw line under text
        const textMetrics = context.measureText("Awesome!");
        context.strokeStyle = "rgba(0,0,0,0.5)";
        context.beginPath();
        context.lineTo(50, 102);
        context.lineTo(50 + textMetrics.width, 102);
        context.stroke();

    });
     */
    await updateImage(1, 200, 200, (context) => {
        setupGrid(context, -3, 3, -3, 3);
    });
}

main().then(() => {});
