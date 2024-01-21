import React from "react";
import {CircularProgress} from "@mui/material";

export function PlainFullWidthLoadingIndicator(): React.ReactElement {
    return <div style={{margin: "30px", textAlign: "center"}}><CircularProgress/></div>;
}
