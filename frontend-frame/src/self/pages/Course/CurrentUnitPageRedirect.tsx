import {useStateStore} from "../../logic/state/useStateStore";
import {Navigate} from "react-router-dom";
import {useBackend} from "../../logic/content/useBackend";
import {Loader, useLoader} from "../../../uilib/util/useLoader";
import {PlainFullWidthLoadingIndicator} from "../../../uilib/LoadingIndicator/PlainFullWidthLoadingIndicator";

function useCurrentUnitIndex(courseId: number): Loader<number | "new" | "completed"> {
    const backend = useBackend();
    const stateStore = useStateStore();
    return useLoader(async (): Promise<number | "new" | "completed"> => {
        const numberOfUnits = await backend.getNumberOfUnitsForCourse(courseId);
        const courseState = await stateStore.getCourseDetailState(courseId);
        if (courseState.completionStatus === "active") {
            return Math.max(0, Math.min(courseState.completedUnits, numberOfUnits));
        } else {
            return courseState.completionStatus;
        }
    });
}

export interface CurrentUnitPageRedirectProps {
    courseId: number;
}

export function CurrentUnitPageRedirect({ courseId }: CurrentUnitPageRedirectProps) {
    const currentUnitIndexLoader = useCurrentUnitIndex(courseId);
    if (currentUnitIndexLoader.status !== "success") {
        return <PlainFullWidthLoadingIndicator />;
    } else if (currentUnitIndexLoader.result === "new") {
        return <Navigate to={`/courses/${courseId}/info`} replace />;
    } else if (currentUnitIndexLoader.result === "completed") {
        return <Navigate to={`/courses/${courseId}/units`} replace />;
    } else {
        return <Navigate to={`/courses/${courseId}/units/${currentUnitIndexLoader.result}`} replace />;
    }
}
