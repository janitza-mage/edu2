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
        createDummyUnit("--== TODO ab hier ==--"),
        induktionUnit4,
        induktionUnit5,
        induktionUnit6,
        induktionUnit7,
        induktionUnit8,
        ...induktionUnit9x,
        ...induktionUnit10x,
        ...induktionUnit11x,
        ...induktionUnit12x,
        ...induktionUnit13x,
        induktionUnit14,
    ],
};
