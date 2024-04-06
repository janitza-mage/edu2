export interface CanvasRecorderOptions {
    decimalSeparator?: string;
}

export interface FakeCanvas {
    width: number;
    height: number;
}

const INVALID_RECORD = "THIS RECORD IS NOW INVALID";

export class CanvasRecorder {

    // records the drawing commands
    record: string = "";

    // for compatibility with canvas context
    readonly canvas: Readonly<FakeCanvas>;

    // to implement property getters
    private _strokeStyle: string = "black";
    private _fillStyle: string = "black";
    private _lineWidth: number = 1;

    constructor(width: number, height: number, options: CanvasRecorderOptions = {}) {
        this.appendToRecord(width);
        this.appendToRecord(height);
        this.appendToRecord(JSON.stringify(options));
        this.canvas = {width, height};
    }

    private appendToRecord(...elements: (string|number)[]): void {
        for (const element of elements) {
            this.record += element + ",";
        }
    }

    finishRecord(): string {
        const result = this.record;
        this.record = INVALID_RECORD;
        return result;
    }

    get strokeStyle(): string {
        return this._strokeStyle;
    }

    set strokeStyle(value: string) {
        this._strokeStyle = value;
        this.appendToRecord("strokeStyle", value);
    }

    get fillStyle(): string {
        return this._fillStyle;
    }

    set fillStyle(value: string) {
        this._fillStyle = value;
        this.appendToRecord("fillStyle", value);
    }

    get lineWidth(): number {
        return this._lineWidth;
    }

    set lineWidth(value: number) {
        this._lineWidth = value;
        this.appendToRecord("lineWidth", value);
    }

    beginPath(): void {
        this.appendToRecord("beginPath");
    }

    closePath(): void {
        this.appendToRecord("closePath");
    }

    moveTo(x: number, y: number): void {
        this.appendToRecord("moveTo", x, y);
    }

    lineTo(x: number, y: number): void {
        this.appendToRecord("lineTo", x, y);
    }

    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number): void {
        this.appendToRecord("arc", x, y, radius, startAngle, endAngle);
    }

    fill(): void {
        this.appendToRecord("fill");
    }

    stroke(): void {
        this.appendToRecord("stroke");
    }

    resetTransform(): void {
        this.appendToRecord("resetTransform");
    }

    translate(x: number, y: number): void {
        this.appendToRecord("translate", x, y);
    }

    scale(x: number, y: number): void {
        this.appendToRecord("scale", x, y);
    }

    save(): void {
        this.appendToRecord("save");
    }

    restore(): void {
        this.appendToRecord("restore");
    }

}
