import {BrowserRouter} from "react-router-dom";
import {AppFrame} from "./AppFrame";
import {AppRoutes} from "./AppRoutes";

export function App() {
    return <BrowserRouter basename="/">
        <AppFrame>
            <AppRoutes/>
        </AppFrame>
    </BrowserRouter>;
}
