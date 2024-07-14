import {GetCourseListPageResponse} from "../../../common/frontend-api/GetCourseListPageResponse";
import {GetUnitListPageResponse} from "../../../common/frontend-api/GetUnitListPageResponse";
import {GetUnitPageResponse} from "../../../common/frontend-api/GetUnitPageResponse";
import {GetCourseInfoPageResponse} from "../../../common/frontend-api/GetCourseInfoPageResponse";

export interface Backend {
    getCourseListPage(): Promise<GetCourseListPageResponse>;
    getCourseInfoPage(courseId: number): Promise<GetCourseInfoPageResponse>;
    getNumberOfUnitsForCourse(courseId: number): Promise<number>;
    getUnitListPage(courseId: number): Promise<GetUnitListPageResponse>;
    getUnitPage(courseId: number, unitIndex: number): Promise<GetUnitPageResponse>;
}
