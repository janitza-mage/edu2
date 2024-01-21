export type CourseCompletionStatus = "new" | "active" | "completed";

// --- overview ---

export interface CourseOverviewState {
    completionStatus: CourseCompletionStatus;
}

// --- detail ---

export interface CourseDetailStateBase {
    completionStatus: CourseCompletionStatus;
}

export interface CourseDetailStateNew extends CourseDetailStateBase {
    completionStatus: "new";
}

export interface CourseDetailStateActive extends CourseDetailStateBase {
    completionStatus: "active";
    completedUnits: number;
}

export interface CourseDetailStateCompleted extends CourseDetailStateBase {
    completionStatus: "completed";
}

export type CourseDetailState = CourseDetailStateNew | CourseDetailStateActive | CourseDetailStateCompleted;

// --- state store interface ---

export interface StateStore {

    // indexed by courseId
    // entries for courses with default state may be missing from the returned map
    getCourseOverviewStates(): Promise<Map<number, CourseOverviewState>>;

    getCourseDetailState(courseId: number): Promise<CourseDetailState>;

    // Completes the current unit. This takes the unit index to make sure we don't accidentally mark the current unit
    // completed after completing _another_ unit, and this function has no effect when completing any other unit
    // than the current one.
    completeUnit(courseId: number, unitIndex: number): Promise<void>;

    completeCourse(courseId: number): Promise<void>;
}
