import {getBackendCourseList} from "../../logic/backend/backend";
import {
    GetBackendCourseListResponse,
    GetBackendCourseListResponseElement
} from "../../../common/author-api/GetBackendCourseListResponse";
import React from "react";
import {useLoader} from "../../../uilib/util/useLoader";
import {InlineMarkdownButtonList} from "../../components/InlineMarkdownButtonList";
import {useNavigate} from "react-router-dom";
import {FullWidthLoadingIndicator} from "../../../uilib/LoadingIndicator/FullWidthLoadingIndicator";
import {PageFrame} from "./PageFrame";

interface CourseListPanelProps {
    response: GetBackendCourseListResponse;
}

function CourseListPanel(props: CourseListPanelProps) {
    const navigate = useNavigate();
    return <>
        <h1>Courses</h1>
        <InlineMarkdownButtonList
            elements={props.response.courses}
            courseIdForImages={null}
            keyMapper={course => course.courseId}
            labelMapper={course => course.title}
            onClick={(course: GetBackendCourseListResponseElement) => navigate(`/courses/${course.courseId}`)}
        />
    </>;
}

export function CourseListPage() {
    const courseListLoader = useLoader(getBackendCourseList);
    return <FullWidthLoadingIndicator loader={courseListLoader}>
        {response => <PageFrame sidebar={<CourseListPanel response={response} />} children={""} />}
    </FullWidthLoadingIndicator>;
}
