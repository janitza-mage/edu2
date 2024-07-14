import {Backend} from "./Backend";
import {backendGet} from "./backendGet";
import {GetCourseListPageResponse} from "../../../common/frontend-api/GetCourseListPageResponse";
import {GetUnitListPageResponse} from "../../../common/frontend-api/GetUnitListPageResponse";
import {GetUnitPageFrameResponse} from "../../../common/frontend-api/GetUnitPageFrameResponse";
import {GetCourseInfoPageResponse} from "../../../common/frontend-api/GetCourseInfoPageResponse";

export const backend: Backend = {

    async getCourseListPage(): Promise<GetCourseListPageResponse> {
        return (await backendGet("getCourseListPage")) as GetCourseListPageResponse;
    },

    async getCourseInfoPage(courseId: number): Promise<GetCourseInfoPageResponse> {
        return (await backendGet(`getCourseInfoPage/${courseId}`)) as GetCourseInfoPageResponse;
    },

    async getNumberOfUnitsForCourse(courseId: number): Promise<number> {
        return (await backendGet(`getNumberOfUnitsForCourse/${courseId}`)) as number;
    },

    async getUnitListPage(courseId: number): Promise<GetUnitListPageResponse> {
        return (await backendGet(`getUnitListPage/${courseId}`)) as GetUnitListPageResponse;
    },

    async getUnitPageFrame(courseId: number, unitIndex: number): Promise<GetUnitPageFrameResponse> {
        return (await backendGet(`getUnitPageFrame/${courseId}/${unitIndex}`)) as GetUnitPageFrameResponse;
    },

};

export function useBackend(): Backend {
    return backend;
}
