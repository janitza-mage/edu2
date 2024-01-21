export interface GetBackendCourseAndUnitsResponseUnit {
    unitId: number;
    title: string;
}

export interface GetBackendCourseAndUnitsResponse {
    title: string;
    description: string;
    units: GetBackendCourseAndUnitsResponseUnit[];
}
