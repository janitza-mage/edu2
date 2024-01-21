import React from "react";
import Error from '@mui/icons-material/Error';
import {Tooltip} from "@mui/material";

export interface PlainFullWidthLoadingErrorProps {
    errorMessage?: string | null | undefined;
}

export function PlainFullWidthLoadingError({errorMessage}: PlainFullWidthLoadingErrorProps): React.ReactElement {
    return <div style={{margin: "30px", textAlign: "center"}}>
        <Tooltip title={errorMessage ? errorMessage : "ERROR"}>
            <Error/>
        </Tooltip>
    </div>;
}
