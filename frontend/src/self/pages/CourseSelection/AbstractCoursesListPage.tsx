import {Footer} from "./Footer";
import {FullWidthLoadingIndicator} from "../../components/LoadingIndicator/FullWidthLoadingIndicator";
import {CourseList, CourseListEntry} from "../../components/CourseList/CourseList";
import {CourseListFilter, useCourseListEntries} from "./useCourseListEntries";
import {useNavigate} from "react-router-dom";
import {WithFooter} from "../../components/Footer/WithFooter";

export interface AbstractCoursesListPageProps {
    title: string;
    filter: CourseListFilter;
}

export function AbstractCoursesListPage(props: AbstractCoursesListPageProps) {
    const navigate = useNavigate();
    const entriesLoader = useCourseListEntries(props.filter);
    return <WithFooter footer={<Footer/>}>
        <h1>{props.title}</h1>
        <FullWidthLoadingIndicator<CourseListEntry[]> loader={entriesLoader}>
            {entries => <CourseList
                entries={entries}
                onClickEntry={(entry) => navigate(`/courses/${entry.course.courseId}/units/current`)}
            />}
        </FullWidthLoadingIndicator>
    </WithFooter>;
}
