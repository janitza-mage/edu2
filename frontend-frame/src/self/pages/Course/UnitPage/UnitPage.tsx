import {Footer} from "../Footer";
import {useBackend} from "../../../logic/content/useBackend";
import {PreLoadedUnitPage} from "./PreLoadedUnitPage";
import {CourseDetailState} from "../../../logic/state/StateStore";
import {useStateStore} from "../../../logic/state/useStateStore";
import {FinishCoursePage} from "./FinishCoursePage";
import {WithFooter} from "../../../components/Footer/WithFooter";
import {useRef} from "react";
import {GetUnitPageFrameResponse} from "../../../../common/frontend-api/GetUnitPageFrameResponse";
import {promiseAll} from "../../../../common/util/promiseAll";
import {Loader, useLoader} from "../../../../uilib/util/useLoader";
import {FullWidthLoadingIndicator} from "../../../../uilib-frontend/LoadingIndicator/FullWidthLoadingIndicator";

type Data = [GetUnitPageFrameResponse, CourseDetailState];

function useData(courseId: number, unitIndex: number): Loader<Data> {
    const backend = useBackend();
    const stateStore = useStateStore();
    return useLoader(async () => {
        return await promiseAll(
            () => backend.getUnitPageFrame(courseId, unitIndex),
            () => stateStore.getCourseDetailState(courseId),
        );
    });
}

export interface UnitPageProps {
    courseId: number;
    unitIndex: number;
}

export function UnitPage({courseId, unitIndex}: UnitPageProps) {
    const loader = useData(courseId, unitIndex);
    const scrollContainerRef = useRef<HTMLElement | undefined>();
    return <WithFooter footer={<Footer/>} scrollContainerRef={scrollContainerRef}>
        <FullWidthLoadingIndicator<Data> loader={loader}>
            {([contentResponse, courseState]) => {
                if (contentResponse === "finish") {
                    return <FinishCoursePage
                        key={courseId + "/" + unitIndex}
                        courseId={courseId}
                        unitIndex={unitIndex}
                        courseDetailState={courseState}
                    />;
                } else {
                    return <PreLoadedUnitPage
                        key={courseId + "/" + unitIndex}
                        courseId={courseId}
                        unitIndex={unitIndex}
                        contentResponse={contentResponse}
                        courseDetailState={courseState}
                        scrollContainerRef={scrollContainerRef}
                    />;
                }
            }}
        </FullWidthLoadingIndicator>
    </WithFooter>;
}
