import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";

export const induktionUnit13x = [ 
    createSteppedUnit("mengen-reihenfolgen-1", "Anzahl der Reihenfolgen bei Mengen (1)", () => [
        createReadStep({
            content: <pre>
        Wiederholung aus dem Grundkurs: Bei einer Menge von Zahlen ist nur wichtig, welche Zahlen drin sind und welche
        nicht, aber es gibt keine Reihenfolge.
        Wenn man die Zahlen aus einer endlichen Menge hintereinanderschreibt, so dass jede Zahl genau ein mal vorkommt,
        dann schreibt man sie aber in einer Reihenfolge hin, die man in diesem Moment festlegt.
                    </pre>,
        }),
        createReadStep({
            content: <pre>
        Sei M die Menge der ersten vier natürlichen Zahlen. Man kann M z.B. schreiben als:
            M = {"{"} 1, 2, 3, 4 {"}"}
                M = {"{"} 4, 3, 2, 1 {"}"}
                M = {"{"} 1, 2, 4, 3 {"}"}
                ...
                    </pre>,
        }),
        createReadStep({
            content: <pre>
        Man kann beobachten: Für die ersten n natürlichen Zahlen gibt es n! mögliche Reihenfolgen, diese hinzuschreiben.
                    </pre>,
        }),
        createReadStep({
            content: <pre>
        Für n=1..4:
            Beispiel n=1, n!=1, Reihenfolgen auflisten
                    </pre>,
        }),
        createReadStep({
            content: <pre>
        Für die Menge der ersten drei natürlichen Zahlen gibt es 3!=6 verschiedene Reihenfolgen. Welche sind das? Start {">"}{">"}
                    </pre>,
        }),
        createReadStep({
            content: <pre>
        (((
            6 vertikal angeordnete Bereiche, jeweils die drei Zahlen, initial als 1, 2, 3; vertauschen per
            drag n drop; entweder fertig wenn fertig (zu leicht? aus versehen schaffbar?) oder mit fertig button
            (braucht vertikalen screen space)
        )))
                    </pre>,
        }),
    ]),
    createSteppedUnit("mengen-reihenfolgen-2", "Anzahl der Reihenfolgen bei Mengen (2)", () => [
        createReadStep({
            content: <pre>
    Für die ersten n natürlichen Zahlen gibt es n! mögliche Reihenfolgen, diese hinzuschreiben.
    Wir können sogar sagen:
    Für n paarweise verschiedene Zahlen gibt es n! mögliche Reihenfolgen, diese hinzuschreiben.
    ... denn für die möglichen Reihenfolgen sind die Zahlenwerte ja völlig egal, solange es keine gleichen
    Zahlenwerte gibt.
    Zur Erinnerung aus dem Grundkurs: "paarweise verschieden" heißt, dass es keine zwei gleichen Zahlen gibt.
                </pre>,
        }),
        createReadStep({
            content: <pre>
    Ü random {"{"}p{"}"}=1..5: gegeben sind {"{"}p{"}"} _paarweise verschiedene_ Zahlen. Wie viele mögliche Reihenfolgen gibt es,
    diese hinzuschreiben? (zb multiple choice, n! auswählen) 
                </pre>,
        }),
    ]),
    createSteppedUnit("mengen-reihenfolgen-3", "Anzahl der Reihenfolgen bei Mengen (3)", () => [
        createReadStep({
            content: <pre>
    "Für n paarweise verschiedene Zahlen gibt es n! mögliche Reihenfolgen, diese hinzuschreiben."
    Eigentlich muss man nicht mal voraussetzen, dass es sich um Zahlen handelt, denn auch das wurde in dem
        Beweis gar nicht gebraucht:
    Für n paarweise verschiedene Dinge gibt es n! mögliche Reihenfolgen, diese hinzuschreiben.
                </pre>,
        }),
        createReadStep({
            content: <pre>
    Etwas "mathematischer" formuliert: Für eine Menge mit n Elementen gibt es n! Möglichkeiten, diese Elemente
    anzuordnen.
    Diese Formulierung sagt das gleiche aus, weil es bei einer Menge nur darauf ankommt, was drin ist und was nicht.
    Die Elemente sind also paarweise verschieden.
                </pre>,
        }),
        createReadStep({
            content: <pre>
    Wie viele Möglichkeiten gibt es, die Namen Alice, Bob, Charlie und David hinzuschreiben?
    (4!)
                </pre>,
        }),
    ]),
];
