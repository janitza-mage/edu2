import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit14 = createSteppedUnit("mengen-reihenfolgen-beweis", "Beweis", () => [
    createReadStep({
        content: <pre>
    Beweise: Für eine Menge M mit n Elementen gibt es n! Möglichkeiten, diese Elemente anzuordnen. (n€N+)
    Dazu sei M = {"{"}A1, ..., An{"}"} -- die Ai sind Namen, die wir den Elementen geben, um sie im Beweis benennen zu können.
                </pre>,
    }),
    createReadStep({
        content: <pre>
    Der Induktionsanfang ist einfach. Für n=1 ist n!=1, M={"{"}A1{"}"} und es gibt genau eine Anordnung für dieses eine Element.
                </pre>,
    }),
    createReadStep({
        content: <pre>
    Wie lautet der Induktionsschritt?
    - Für eine Menge mit n Elementen gibt es n! Möglichkeiten, diese Elemente anzuordnen.
    - Für eine Menge mit (n+1) Elementen gibt es (n+1)! Möglichkeiten, diese Elemente anzuordnen.
    + Wenn es für eine Menge mit n Elementen n! Möglichkeiten gibt, diese Anzuordnen, dann gibt es für eine Menge mit
        (n+1) Elementen (n+1)! Möglichkeiten, diese Elemente anzuordnen.
                </pre>,
    }),
    createReadStep({
        content: <pre>
    Beweise den Induktionsschritt.
    Wie viele verschiedene Elemente können an der ersten Stelle der Anordnung stehen?
        1
        n
        n+1
        A1
        An
        An+1
        n!
        (n+1)!
                </pre>,
    }),
    createReadStep({
        content: <pre>
    Beweise den Induktionsschritt.
    Wenn das erste Element festgelegt wurde, können die Restlichen Elemente unabhängig davon beliebig angeordnet werden.
    Wie viele dieser restlichen Elemente gibt es?
        (gleiche Auswahl wie vorher)
                </pre>,
    }),
    createReadStep({
        content: <pre>
    Beweise den Induktionsschritt.
    Wenn das erste Element festgelegt wurde, können die Restlichen n Elemente unabhängig davon beliebig angeordnet werden.
    Wie viele mögliche Anordnungen gibt es nach der Induktionsannahme?
        (gleiche Auswahl wie vorher)
                </pre>,
    }),
    createReadStep({
        content: <pre>
    Beweise den Induktionsschritt.
    Die Auswahl des ersten Elements (n+1 Möglichkeiten) und die Anordnung der restlichen Elemente (n! Möglichkeiten)
    können beliebig kombiniert werden. Deshalb muss man die Anzahl der Möglichkeiten multiplizieren.
    Wie viele Möglichkeiten gibt es also insgesamt?
    n
    n^2
    n+1
    (n+1)^2
    n!
    (n+1)!
    ...
    damit ist der Induktionsschritt bewiesen.
                </pre>,
    }),
    createReadStep({
        content: <pre>
                </pre>,
    }),
]);
