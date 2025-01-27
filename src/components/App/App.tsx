import {BrowserRouter} from "react-router-dom";
import {AppFrame} from "./AppFrame";
import {AppRoutes} from "./AppRoutes";

export function App() {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AppFrame>
            <AppRoutes/>
        </AppFrame>
    </BrowserRouter>;
}
