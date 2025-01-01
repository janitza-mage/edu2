import {Button} from "@mui/material";
import {StartPage} from "./StartPage";

export function DebugPage() {
    return <>
        <Button variant="contained" onClick={() => localStorage.clear()}>clear storage</Button>
        <hr />
        <StartPage />
    </>;
}
