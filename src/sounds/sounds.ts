
function load(name: string): HTMLAudioElement {
    return new Audio(`/sounds/${name}`);
}

export const sounds = {
    correct: new Audio("/sounds")
};
