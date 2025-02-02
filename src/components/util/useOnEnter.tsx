import {useEffect} from "react";

/**
 * Registers a keyboard listener that only reacts to pressing the enter key.
 */
export function useOnEnter(callback: () => void) {
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Enter") {
                callback();
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [callback]);
}
