import {getBackendCourseAndUnits} from "../../logic/backend/backend";
import React from "react";
import {useLoader} from "../../../uilib/util/useLoader";
import {CourseSidebarHelper} from "./CourseSidebar";
import {FullWidthLoadingIndicator} from "../../../uilib/LoadingIndicator/FullWidthLoadingIndicator";
import {CourseHeaderDataPanel} from "../panels/CourseHeaderDataPanel";

interface CourseHeaderPageProps {
    courseId: number;
}

export function CourseHeaderPage(props: CourseHeaderPageProps) {
    const loader = useLoader(() => getBackendCourseAndUnits(props.courseId));
    return <CourseSidebarHelper courseId={props.courseId} loader={loader} subpageSelector={null}>
        <FullWidthLoadingIndicator loader={loader}>
            {result => <>
                <h1>Course</h1>
                <CourseHeaderDataPanel
                    courseId={props.courseId}
                    title={result.title}
                    description={result.description}
                    scriptLibrary={result.scriptLibrary}
                    onDataUpdatedInBackend={() => loader.reload(() => getBackendCourseAndUnits(props.courseId))}
                />
            </>}
        </FullWidthLoadingIndicator>
    </CourseSidebarHelper>;
}
