import {FinishRequest} from "../util/rest/FinishRequest";

export function getNumberFromPath(value: string): number {
    const result = parseInt(value, 10);
    if (isNaN(result)) {
        throw FinishRequest.notFound();
    }
    return result;
}
