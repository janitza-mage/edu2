import {ContentNode} from "../../types";
import {induktionUnit1} from "./induktionUnit1-summe-n";
import {induktionUnit2} from "./induktionUnit2-summe-n-beweis";
import {induktionUnit3} from "./induktionUnit3-rekursion";
import {induktionUnit4} from "./induktionUnit4-induktion";
import {induktionUnit5} from "./induktionUnit5-uebung";
import {induktionUnit6} from "./induktionUnit6-summe-ungerade";
import {induktionUnit7} from "./induktionUnit7-summe-ungerade-beweis";
import {induktionUnit8} from "./induktionUnit8-summe-gerade";
import {induktionUnit9x} from "./induktionUnit9x-uebungen";
import {induktionUnit10x} from "./induktionUnit10x-anderer-induktionsanfang";
import {induktionUnit11x} from "./induktionUnit11x-uebungen";
import {induktionUnit12x} from "./induktionUnit12x-fakultaet";
import {induktionUnit13x} from "./induktionUnit13x-mengen-reihenfolgen";
import {induktionUnit14} from "./induktionUnit14-beweis";
import {createDummyUnit} from "../../../unit/createDummyUnit";

export const induktionSubtree: ContentNode = {
    id: "induktion",
    name: "Vollständige Induktion",
    type: "folder",
    children: [
        induktionUnit1,
        induktionUnit2,
        induktionUnit3,
        induktionUnit4,
        /*
        TODO:
        Ich bin noch nicht glücklich mit diesen Übungen. Das ist eine riesen Formelschlacht und prüft nicht das
        Verstehen. Gleich der zweite Step, "Was war für den Induktionsanfang ({mathSpan("n=1")}) zu beweisen? Wähle
        alle richtigen Antworten", da muss man genau die richtige Formel auswählen, aber eigentlich war es als
        eine Verständnis-Aufgabe gemeint. Nicht gut.
        -
        Das Sortieren und den richtigen Pfeil anklicken ist schon besser. Die können denke ich bleiben. Es sind
        diese "wie lautet diese Aussage für XXX" wo man eine von 10 Formeln aussuchen muss, die alle gleich aussehen --
        diese Aufgaben sind nicht gut.
        -
        Ideen:
        - mehrere Beweise vorstellen; jeweils einordnen: Ist das ein Induktionsbeweis oder nicht?
        - Induktionsanfang: verdeutlichen, dass ein Beweis für _ein_bestimmtes_n_ sehr einfach ist
        - 
         */
        induktionUnit5,
        induktionUnit6,
        induktionUnit7,
        createDummyUnit("--== TODO ab hier ==--"),
        induktionUnit8,
        ...induktionUnit9x,
        ...induktionUnit10x,
        ...induktionUnit11x,
        ...induktionUnit12x,
        ...induktionUnit13x,
        induktionUnit14,
    ],
};
