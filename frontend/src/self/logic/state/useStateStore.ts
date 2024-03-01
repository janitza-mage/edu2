import {CourseCompletionStatus, CourseDetailState, CourseOverviewState, StateStore} from "./StateStore";
import {useLearnerId} from "./useLearnerId";
import {backend} from "../content/useBackend";

// Undefined means not started, true means completed, and a number indicates the number of completed units.
//
// The state "started, but no unit completed" (indicated by numeric 0) would make the course appear in the list of
// active courses, but without any progress. We leave it to the UI whether this state can occur.
//
// The state "all units completed but the course isn't completed yet" is indicated by a number equal to the number
// of units. The unit list page lists an implicit "completion unit" for each course at the end. We use that unit
// to show a success page before marking the course as completed (no longer listed as active).
//
// We do not currently store the current progress _within_ one unit in the state store, because doing so would
// complicate both the UI and state handling: For a unit that mainly consists of a complex problem, storing progress
// would also require us to store the generated problem (in case it comes from a generator) to make that progress
// meaningful at all. We would also need a way for the user to "go back", or else display the whole previous problem,
// to make it possible to continue. Finally, the interaction with "going back to a previous unit" must be defined
// for such a case. We sidestep all these issues by not storing the progress within a unit, at the cost of having
// the user restart the problem when they reload the page. This might be changed in the future.
type InternalCourseState = undefined | number | true;

// indexed by courseId
type InternalState = Record<string, InternalCourseState>;

export function useStateStore(): StateStore {
    const learnerId = useLearnerId();

    function getInternalState(): InternalState {
        try {
            return JSON.parse(localStorage.getItem("learner." + learnerId) ?? "");
        } catch (_ignored) {
            return {};
        }
    }

    async function setInternalState(state: InternalState): Promise<void> {
        localStorage.setItem("learner." + learnerId, JSON.stringify(state));
    }

    function convertCourseDetailState(internalCourseState: InternalCourseState): CourseDetailState {
        if (internalCourseState === undefined) {
            return {completionStatus: "new"};
        }
        if (internalCourseState === true) {
            return {completionStatus: "completed"};
        }
        return {
            completionStatus: "active",
            completedUnits: internalCourseState,
        };
    }

    return {

        async getCourseOverviewStates(): Promise<Map<number, CourseOverviewState>> {
            const internalState = getInternalState();
            const result = new Map<number, CourseOverviewState>();
            for (const [courseId, courseState] of Object.entries(internalState)) {
                if (courseState !== undefined) {
                    const completionStatus: CourseCompletionStatus = courseState === true ? "completed" : "active";
                    result.set(parseInt(courseId, 10), {completionStatus});
                }
            }
            return result;
        },

        async getCourseDetailState(courseId: number): Promise<CourseDetailState> {
            const internalState = getInternalState();
            return convertCourseDetailState(internalState[courseId]);
        },

        async completeUnit(courseId: number, unitIndex: number): Promise<void> {
            const internalState = getInternalState();
            let internalCourseState = internalState[courseId];
            if (internalCourseState === true) { // course completed
                return;
            }
            internalCourseState = internalCourseState ?? 0;
            if (unitIndex !== internalCourseState) { // wrong unit was completed
                return;
            }
            internalState[courseId] = internalCourseState + 1;
            await setInternalState(internalState);
        },

        async completeCourse(courseId: number): Promise<void> {
            const numberOfUnits = await backend.getNumberOfUnitsForCourse(courseId);
            const internalState = getInternalState();
            let internalCourseState = internalState[courseId];
            if (internalCourseState && internalCourseState !== true && internalCourseState >= numberOfUnits) {
                internalState[courseId] = true;
                await setInternalState(internalState);
            }
        }

    };
}
