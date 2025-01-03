
export interface Sound {
    play: () => void;
}

function load(name: string): Sound {
    const audio = new Audio(`/sounds/${name}`);
    return {
        play: () => audio.play().then(() => {}),
    };
}

export const sounds = {
    correct: load("correct.wav"),
    wrong: load("wrong.wav"),
};
