import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import {getErrorMessage} from "../../common/util/getErrorMessage";

export type LoaderStatus = "loading" | "success" | "error";

export interface LoaderBase<T> {
    status: LoaderStatus;
    reload: (body: () => Promise<T>) => void;
}

export interface LoaderLoading<T> extends LoaderBase<T> {
    status: "loading";
}

export interface LoaderSuccess<T> extends LoaderBase<T> {
    status: "success";
    result: T;
}

export interface LoaderError<T> extends LoaderBase<T> {
    status: "error";
    error: string;
}

export type Loader<T> = LoaderLoading<T> | LoaderSuccess<T> | LoaderError<T>;

// --------------------------------------------------------------------------------------------------------------------

class InternalState<T> {

    private setLoader: Dispatch<SetStateAction<Loader<T>>> = () => {};
    private currentToken: object = {};

    initialize(setLoader: Dispatch<SetStateAction<Loader<T>>>): void {
        this.setLoader = setLoader;
    }

    reload(body: () => Promise<T>, setToLoadingState: boolean = true): void {
        if (setToLoadingState) { // avoid setState call immediately after creating the state
            this.setLoader({
                status: "loading",
                reload: this.bindReload(),
            });
        }
        const myToken = {};
        this.currentToken = myToken;
        body()
            .then((result) => {
                if (this.currentToken === myToken) {
                    this.setLoader({
                        status: "success",
                        result,
                        reload: this.bindReload(),
                    });
                }
            })
            .catch((error) => {
                if (this.currentToken === myToken) {
                    this.setLoader({
                        status: "error",
                        error: getErrorMessage(error) ?? "ERROR",
                        reload: this.bindReload(),
                    });
                }
            });
    }

    bindReload(): (body: () => Promise<T>) => void {
        return (body: () => Promise<T>) => this.reload(body);
    }

}

export function useLoader<T>(body: () => Promise<T>): Loader<T> {
    const internalStateHolder = useRef(new InternalState<T>());
    const [loader, setLoader] = useState<Loader<T>>(() => ({
        status: "loading",
        reload: internalStateHolder.current.bindReload(),
    }));
    internalStateHolder.current.initialize(setLoader);
    useEffect(() => {
        internalStateHolder.current.reload(body, false);
    }, [body]);
    return loader;
}
