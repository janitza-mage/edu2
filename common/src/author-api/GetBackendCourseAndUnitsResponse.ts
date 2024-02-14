import {z} from "zod";

export interface GetBackendCourseAndUnitsResponseUnit {
    unitId: number;
    title: string;
}

export interface GetBackendCourseAndUnitsResponse {
    title: string;
    description: string;
    scriptLibrary: string;
    units: GetBackendCourseAndUnitsResponseUnit[];
}
