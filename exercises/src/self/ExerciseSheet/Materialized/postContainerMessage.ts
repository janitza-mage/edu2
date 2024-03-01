export function postContainerMessage(message: any) {
    window.parent.postMessage(message, "*");
}
