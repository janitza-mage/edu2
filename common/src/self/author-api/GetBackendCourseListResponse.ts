export interface GetBackendCourseListResponseElement {
    courseId: number;
    title: string;
}

export interface GetBackendCourseListResponse {
    courses: GetBackendCourseListResponseElement[];
}
