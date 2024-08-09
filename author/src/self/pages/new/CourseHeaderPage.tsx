import {getBackendCourseAndUnits} from "../../logic/backend/backend";
import React from "react";
import {useLoader} from "../../../uilib/util/useLoader";
import {CourseSidebarHelper} from "./CourseSidebar";

interface CourseHeaderPageProps {
    courseId: number;
}

export function CourseHeaderPage(props: CourseHeaderPageProps) {
    const loader = useLoader(() => getBackendCourseAndUnits(props.courseId));
    return <CourseSidebarHelper courseId={props.courseId} loader={loader} subpageSelector={null}>
        header
    </CourseSidebarHelper>;
}
