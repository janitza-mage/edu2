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
import {induktionUnit11} from "./induktionUnit11-uebung";
import {induktionUnit12x} from "./induktionUnit12x";
import {induktionUnit13x} from "./induktionUnit13x-fakultaet";
import {induktionUnit14x} from "./induktionUnit14-mengen-reihenfolgen";
import {induktionUnit15} from "./induktionUnit15-beweis";

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
        induktionUnit6,
        induktionUnit7,
        induktionUnit8,
        ...induktionUnit9x,
        ...induktionUnit10x,
        induktionUnit11,
        ...induktionUnit12x,
        ...induktionUnit13x,
        ...induktionUnit14x,
        induktionUnit15,
    ],
};
