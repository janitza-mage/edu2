import React from "react";
import {PlainFullWidthLoadingIndicator} from "./PlainFullWidthLoadingIndicator";
import {PlainFullWidthLoadingError} from "./PlainFullWidthLoadingError";
import {Loader} from "../../uilib/util/useLoader";

export interface FullWidthLoadingIndicatorProps<T> {
    loader: Loader<T>;
    children: (result: T) => React.ReactNode;
}

export function FullWidthLoadingIndicator<T>({loader, children}: FullWidthLoadingIndicatorProps<T>): React.ReactElement {
    if (loader.status === "error") {
        return <PlainFullWidthLoadingError errorMessage={loader.error}/>;
    } else if (loader.status === "success") { // no outdated results, please
        return <>{children(loader.result)}</>
    } else {
        return <PlainFullWidthLoadingIndicator/>;
    }
}
