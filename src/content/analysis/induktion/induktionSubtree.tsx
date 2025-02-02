import {ContentNode} from "../../types";
import {createSteppedUnit} from "../../../unit/step/createSteppedUnit";
import {createReadStep} from "../../../unit/read/createReadStep";
import {induktionUnit1} from "./induktionUnit1-summe-n";
import {induktionUnit2} from "./induktionUnit2-summe-n-beweis";
import {induktionUnit3} from "./induktionUnit3-rekursion";
import {induktionUnit4} from "./induktionUnit4-induktion";
import {induktionUnit5} from "./induktionUnit5-uebung";

export const induktionSubtree: ContentNode = {
    id: "induktion",
    name: "Vollständige Induktion",
    type: "folder",
    children: [
        induktionUnit1,
        induktionUnit2,
        induktionUnit3,
        induktionUnit4,
        induktionUnit5,
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    Es soll gezeigt werden:
    Die Summe der ersten n ungeraden Zahlen ist n^2
        1             = 1
        1 + 3         = 4
        1 + 3 + 5     = 9
        1 + 3 + 5 + 7 = 16
        Summe(i=1..n)(2i-1) = n^2
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Die Summe der ersten n ungeraden Zahlen ist n^2
    Ü Was ist die Summe der ersten 100 ungeraden Zahlen?
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Summe(i=1..n)(2i-1) = n^2
    Zur Erinnerung aus dem Grundkurs: Die Indizes i und n sind _nicht_ die ungeraden Zahlen selbst, sondern nummerieren
    diese durch. Die i-te ungerade Zahl hat den Wert (2i-1):
    (tabelle)
        i       2i-1
        1       1
        2       3
        3       5
        4       7
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Die i-te ungerade Zahl hat den Wert (2i-1).
    Ü Was ist der Wert der 100. ungeraden Zahl?
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Es soll gezeigt werden:
        Summe(i=1..n)(2i-1) = n^2
    Ü Wie lautet diese Aussage für n=100?
        folgt Summe(i=1..100)(2i-1) = 100^2
        (statt multiple choice mal aus Bausteinen zusammenpuzzeln?)
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    Es soll gezeigt werden:
        Summe(i=1..n)(2i-1) = n^2
    Der Induktionsanfang ist, diese Aussage für n=1 zu zeigen.
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Summe(i=1..n)(2i-1) = n^2
    Wie lautet die Aussage für n=1?
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Summe(i=1..n)(2i-1) = n^2
    Der Induktionsschritt ist: Aus der Aussage für n folgt die Aussage für n+1
    (Auswahl wie beim ersten Beweis)
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Induktionsschritt:
    Summe(i=1..n)(2i-1) = n^2 ={">"} Summe(i=1..n+1)(2i-1) = (n+1)^2
    Bringe die Beweisschritte in die richtige Reihenfolge:
      Summe(i=1..n+1)(2i-1)
    = (Summe(i=1..n)(2i-1)) + 2(n+1)-1
    = n^2 + 2n + 2 - 1
    = n^2 + 2n + 1
    = (n+1)^2
                </pre>,
            }),
            createReadStep({
                content: <pre>
    An welcher Stelle im Induktionsschritt wurde die schon bewiesene Aussage für n benutzt? Klicke auf den richtigen Pfeil.
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    Es soll gezeigt werden: Die Summe der ersten n geraden Zahlen ist (n^2+n)
    Summe(i=1..n)(2i) = (n^2+n)
    n=1: 2             = 2
    n=2: 2 + 4         = 6
    n=3: 2 + 4 + 6     = 12
    n=4: 2 + 4 + 6 + 8 = 20
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Summe(i=1..n)(2i) = (n^2+n)
    Ü Was ist die Summe der ersten 100 geraden Zahlen?
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Summe(i=1..n)(2i) = (n^2+n)
    Ü 5x mit verschiedenen n's
        Wie lautet diese Aussage für n={"{"}a{"}"}?
        -{">"} Summe(i=1..{"{"}a{"}"})(2i) = {"{"}a{"}"}^2+{"{"}a{"}"}
                    (statt multiple choice mal aus Bausteinen zusammenpuzzeln?)
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Summe(i=1..n)(2i) = (n^2+n)
    Was ist der Induktionsanfang (n=1)?
        ... multiple choice
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Summe(i=1..n)(2i) = (n^2+n)
    Was ist der Induktionsschrtt?
        ... multiple choice
        Summe(i=1..n)(2i) = (n^2+n) ={">"} Summe(i=1..n+1)(2i) = ((n+1)^2+(n+1))
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Beweise den Induktionsschritt, indem du die Einzelschritte in die richtige Reihenfolge bringst
          Summe(i=1..n+1)(2i)
        = Summe(i=1..n)(2i) + 2(n+1)
        = (n^2 + n) + 2(n+1)
        = (n^2 + n) + (2n + 2)
        = (n^2 + 2n + 1) + (n + 1)
        = (n+1)^2 + (n+1)
                </pre>,
            }),
            createReadStep({
                content: <pre>
    An welcher Stelle im Induktionsschritt wurde die schon bewiesene Aussage für n benutzt? Klicke auf den richtigen Pfeil.
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    In dieser Übung wird für verschiedene Formeln der Induktionsschritt geübt.
    (((
        Größere Sammlung an Formeln für solche Summen, wo immer in die richtige Reihenfolge gebracht werden muss
    ))) 
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    Hier wird noch mal der Induktionsschritt geübt. ACHTUNG: Du hast pro Formel nur eine begrenzte Zeit!
    (((
        wie eben, aber mit Timer
    ))) 
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
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
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    Der Induktionsanfang war immer bei n=1.
    Man kann jede Zahl als Induktionsanfang nehmen, aber dann beweist man die ursprüngliche Aussage nur
    für alle n _ab dieser Zahl_.
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Summe(i=1..n)=n(n+1)/2
    Wenn man als Induktionsanfang n=3 setzt, dann beweist man:
    ---1         = 1--- (durchgestrichen)
    ---1+2       = 3--- (durchgestrichen)
    1+2+3     = 6
    1+2+3+4   = 10
    1+2+3+4+5 = 15
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Achtung: Wir haben _nicht_ die Aussage verändert, dass die Summe der ersten n Zahlen gleich n(n+1)/2 ist.
    also _nicht_ etwa: Summe(i=3..n)=n(n+1)/2
    Das wäre eine andere Aussage, die auch nicht stimmt.
    Was wir stattdessen gemacht haben, ist, diese Aussage nicht mehr für alle n, sondern nur noch für "fast alle n"
        zu beweisen.
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Wie lautet der Induktionsanfang ab 3?
        Summe(i=1..3)=3(3+1)/2
        Summe(i=3..n)=n(n+1)/2
        Summe(i=3..3)=3(3+1)/2
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    Ein Induktionsanfang ab einer anderen Zahl als 1 ist sinnvoll, wenn die Aussage gar nicht für die ersten n gilt,
    sondern nur noch für die restlichen n.
    Beispiel:
    Für alle n ab n=5 ist die Summe der ersten n Zahlen größer als 12.
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Für alle n ab n=5 ist die Summe der ersten n Zahlen größer als 12.
    Tabelle mit n = 1..6
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Wie lautet der Induktionsanfang?
    ...
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Wie lautet der Induktionsschritt?
    ...
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Beweise den Induktionsschritt, indem du die Einzelschritte in die richtige Reihenfolge bringst.
    ...
                </pre>,
            }),
            createReadStep({
                content: <pre>
    An welcher Stelle im Induktionsschritt wurde die schon bewiesene Aussage für n verwendet? Klicke auf den passenden Pfeil.
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    Beweise:
        Für alle n ab n=3 ist n^2{">"}2n
    Wie lautet der Induktionsanfang?
    ...
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Wie lautet der Induktionsschritt?
    ...
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Beweise den Induktionsschritt, indem du die Einzelschritte in die richtige Reihenfolge bringst.
    ...
                </pre>,
            }),
            createReadStep({
                content: <pre>
    An welcher Stelle im Induktionsschritt wurde die schon bewiesene Aussage für n verwendet? Klicke auf den passenden Pfeil.
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    Achtung Fallstrick: Wenn wir den Induktionsanfang festlegen, dann besagt das, dass die Aussage für alle n ab
    diesem Anfang gilt.
    Damit ist aber _offen_, ob die Aussage für kleinere n gilt oder nicht. Es gibt keine Verpflichtung, dass die
    Aussage für kleinere n falsch ist.
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Für alle n ab n=10 ist n^2{">"}2n
    Beweis: Wie für die Aussage ab n=3, nur mit anderem Induktionsanfang.
    Wir haben die Aussage dann ab n=10 bewiesen.
    Wir haben offen gelassen, für welche n im Bereich 1..9 die Aussage gilt.
    Sie gilt z.B. f+r n=5, aber nicht für n=1.
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    (random formeln -{">"} Induktionsanfang wählen, Induktionsschritt wählen, Induktionsschritt beweisen)
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    (das gleiche mit Timer)
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    Die _Fakultät_, geschrieben n!, ist definiert als
        n! = 1*2*...*n
    Beispiele
        (Tabelle: n, 1*2*...*n ausgeschrieben, n! berechnet)
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Berechne
    n! für n=1...5
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
            createReadStep({
                content: <pre>
    Beweise:
        Für alle n ab n=4 ist n!{">"}2^n
    Beispiele:
        Tabelle mit n, n!, 2^n
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Wie lautet der Induktionsanfang?
    ...
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Wie lautet der Induktionsschritt?
        n! {">"} 2^n ={">"} (n+1)! {">"} 2^(n+1)
    ...
                </pre>,
            }),
            createReadStep({
                content: <pre>
    Beweise den Induktionsschritt, indem du die Einzelschritte in die richtige Reihenfolge bringst.
        (n+1)! = n!*(n+1) {">"} 2^n*(n+1) {">"} 2^n*2 = 2^(n+1)
    ...
                </pre>,
            }),
            createReadStep({
                content: <pre>
    An welcher Stelle im Induktionsschritt wurde die schon bewiesene Aussage für n verwendet? Klicke auf den passenden Pfeil.
                </pre>,
            }),
        ]),
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
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
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
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
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
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
        createSteppedUnit("xxxxxxxx", "xxxxxxxxxxx", () => [
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
        ]),
    ],
};
