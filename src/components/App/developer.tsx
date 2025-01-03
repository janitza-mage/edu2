
let fastMode = false;
export function isFastMode() {
    return fastMode;
}

function onKeyDown(event: KeyboardEvent) {
    if (event.key === "0" && event.ctrlKey && event.altKey) {
        fastMode = !fastMode;
    }
}

export function initializeDeveloperControls() {
    window.addEventListener("keydown", onKeyDown);
}
