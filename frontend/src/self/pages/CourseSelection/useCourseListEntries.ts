import {CourseListEntry} from "../../components/CourseList/CourseList";
import {useBackend} from "../../logic/content/useBackend";
import {useStateStore} from "../../logic/state/useStateStore";
import {Loader, useLoader} from "../../util/useLoader";

export type CourseListFilter = "all" | "active" | "completed";

export function useCourseListEntries(filter: CourseListFilter): Loader<CourseListEntry[]> {
    const backend = useBackend();
    const stateStore = useStateStore();
    return useLoader(async (): Promise<CourseListEntry[]> => {
        const contentResponse = await backend.getCourseListPage();
        const courseStates = await stateStore.getCourseOverviewStates();
        const unfiltered = contentResponse.courses.map(course => {
            const courseState = courseStates.get(course.courseId);
            return {
                course: course,
                state: courseState ?? {completionStatus: "new"},
            };
        });
        return filter === "all" ? unfiltered : unfiltered.filter(x => x.state.completionStatus === filter);
    });
}
