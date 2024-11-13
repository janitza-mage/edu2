import {Exercise} from "../database";
import {Button} from "@mui/material";

export interface MakeWhichIsCorrectElement {
    label: string;
    correct: boolean;
}

export interface MakeWhichIsCorrectParams {
    title: string;
    elements: MakeWhichIsCorrectElement[];
    fontSize: number;
    spacing: number;
}

export function makeWhichIsCorrect(params: MakeWhichIsCorrectParams): Exercise {
    return (props) => {
        return <>
            <h1>{params.title}</h1>
            {params.elements.map((element) =>
                <div style={{marginTop: params.spacing + "px", textAlign: "center"}}>
                    <Button variant={"contained"} onClick={() => props.onFinish(element.correct)}>
                        <div style={{fontSize: params.fontSize + "px"}}>
                            {element.label}
                        </div>
                    </Button>
                </div>
            )}
        </>;
    };
}
