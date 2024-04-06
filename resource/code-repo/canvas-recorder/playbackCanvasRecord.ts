export function playbackCanvasRecord(record: string, contextFactory: (width: number, height: number) => CanvasRenderingContext2D): void {
    const elements: string[] = record.split(/,/);
    if (elements.pop() !== "") {
        throw new Error("record did not end with a comma");
    }

    function read(): string {
        const result = elements.shift();
        if (result === undefined) {
            throw new Error("unexpected end of record");
        }
        return result;
    }

    function readNumber(): number {
        const text = read();
        const result = parseInt(text, 10);
        if (isNaN(result)) {
            throw new Error("expected number, found: " + text);
        }
        return result;
    }

    const width = readNumber();
    const height = readNumber();
    const context = contextFactory(width, height);
    while (elements.length > 0) {
        const command = read();
        switch (command) {
            default:
                throw new Error("unknown command: " + command);
        }
    }




}
