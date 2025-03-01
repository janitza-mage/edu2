import {BrowserRouter} from "react-router-dom";
import {AppFrame} from "./AppFrame";
import {AppRoutes} from "./AppRoutes";
import {createTheme, ThemeProvider} from "@mui/material";

const myMuiTheme = createTheme({
    typography: {
        "fontFamily": `"app-open-sans", sans-serif`,
    }
});

export function App() {
    return <ThemeProvider theme={myMuiTheme}>
        <BrowserRouter basename={(window as any).applicationBaseUrl}>
            <AppFrame>
                <AppRoutes/>
            </AppFrame>
        </BrowserRouter>
    </ThemeProvider>;
}
