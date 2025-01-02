import {Unit} from "../../../content/types";
import {useState} from "react";
import {UnitInstancePage} from "./UnitInstancePage";

export interface UnitPageProps {
    unit: Unit;
    path: string[];
}

export function UnitPage(props: UnitPageProps) {
    const [instanceCounter, setInstanceCounter] = useState(0);
    const [unitInstance, setUnitInstance] = useState(() => props.unit.instantiate());
    
    function onNewInstance() {
        setInstanceCounter(instanceCounter + 1);
        setUnitInstance(() => props.unit.instantiate());
    }
    
    return <UnitInstancePage
        key={instanceCounter}
        unit={props.unit}
        path={props.path}
        unitInstance={unitInstance}
        onNewInstance={onNewInstance}
    />;
}
