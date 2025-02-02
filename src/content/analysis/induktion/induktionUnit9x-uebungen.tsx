import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit9x = [
    createSteppedUnit("induktion-uebungen-1", "Übungen (1)", () => [
        createReadStep({
            content: <pre>
    In dieser Übung wird für verschiedene Formeln der Induktionsschritt geübt.
    (((
        Größere Sammlung an Formeln für solche Summen, wo immer in die richtige Reihenfolge gebracht werden muss
    ))) 
                </pre>,
        }),
    ]),
    createSteppedUnit("induktion-uebungen-2", "Übungen (2)", () => [
        createReadStep({
            content: <pre>
    Hier wird noch mal der Induktionsschritt geübt. ACHTUNG: Du hast pro Formel nur eine begrenzte Zeit!
    (((
        wie eben, aber mit Timer
    ))) 
                </pre>,
        }),
    ]),
    createSteppedUnit("induktion-uebungen-3", "Übungen (3)", () => [
        createReadStep({
            content: <pre>
    Die Formeln werden jetzt komplizierter. Dafür gibt es jetzt kein Zeitlimit.
    - Summe der ersten n Quadratzahlen
    - Summe der ersten n geraden Quadratzahlen
    - Summe der ersten n Zweierpotenzen

(neuer Block? wäre okay, wenn die beiden untersten Ebenen zusammen in einer Liste dargestellt werden)

                </pre>,
        }),
    ]),
];