import {createContext, ReactNode, useContext, useState} from "react";

// --------------------------------------------------------------------------------------------------------------------
// context
// --------------------------------------------------------------------------------------------------------------------

interface MyContextData {
    setColor: (color: string | null) => void;
}

const context = createContext<MyContextData>({
    setColor: () => {}
});

// --------------------------------------------------------------------------------------------------------------------
// context provider
// --------------------------------------------------------------------------------------------------------------------

const defaultColor = "white";

export interface FlashExerciseBackgroundProviderProps {
    children: ReactNode;
}

export function FlashExerciseBackgroundProvider(props: FlashExerciseBackgroundProviderProps) {
    const [color, setColor] = useState(defaultColor);

    function setColorOrNull(color: string | null) {
        setColor(color ?? defaultColor);
    }

    return <div style={{width: "100%", height: "100%", backgroundColor: color}}>
        <context.Provider value={{setColor: setColorOrNull}}>
            {props.children}
        </context.Provider>
    </div>;
}

// --------------------------------------------------------------------------------------------------------------------
// exercise API
// --------------------------------------------------------------------------------------------------------------------

export type FlashExerciseBackground =
    (color: string, durationMilliseconds: number, callback?: () => void) => void;

export function useFlashExerciseBackground(): FlashExerciseBackground {
    const contextData = useContext(context);
    return (color: string, durationMilliseconds: number, callback?: () => void) => {
        contextData.setColor(color);
        setTimeout(() => {
            contextData.setColor(null);
            if (callback) {
                callback();
            }
        }, durationMilliseconds);
    };
}

export type FlashExerciseBackgroundCorrectOrWrong =
    (correct: boolean, durationMilliseconds: number, callback?: () => void) => void;

export function useFlashExerciseBackgroundCorrectOrWrong(): FlashExerciseBackgroundCorrectOrWrong {
    const flashExerciseBackground = useFlashExerciseBackground();
    return (correct: boolean, durationMilliseconds: number, callback?: () => void) =>
        flashExerciseBackground(correct ? "#8f8" : "#f88", durationMilliseconds, callback);
}
