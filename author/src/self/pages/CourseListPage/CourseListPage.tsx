import {getBackendCourseList} from "../../logic/backend/backend";
import {GetBackendCourseListResponse} from "../../../common/author-api/GetBackendCourseListResponse";
import React from "react";
import {useLoader} from "../../../uilib/util/useLoader";
import {FullWidthLoadingIndicator} from "../../../uilib/LoadingIndicator/FullWidthLoadingIndicator";
import {PageFrame} from "../PageFrame";
import {InlineMarkdownLinkButtonList} from "../../components/InlineMarkdownLinkButtonList";

interface CourseListPanelProps {
    response: GetBackendCourseListResponse;
}

function CourseListPanel(props: CourseListPanelProps) {
    return <>
        <h1>Courses</h1>
        <InlineMarkdownLinkButtonList
            elements={props.response.courses}
            courseIdForImages={null}
            keyMapper={course => course.courseId}
            labelMapper={course => course.title}
            buildToAttribute={course => `/courses/${course.courseId}`}
        />
    </>;
}

export function CourseListPage() {
    const courseListLoader = useLoader(getBackendCourseList);
    return <FullWidthLoadingIndicator loader={courseListLoader}>
        {response => <PageFrame sidebar={<CourseListPanel response={response} />} children={""} />}
    </FullWidthLoadingIndicator>;
}
