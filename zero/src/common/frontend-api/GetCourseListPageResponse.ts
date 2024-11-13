export interface GetCourseListPageResponseElement {
    courseId: number;
    authorId: number;
    title: string;
}

export interface GetCourseListPageResponse {
    courses: GetCourseListPageResponseElement[];
}
