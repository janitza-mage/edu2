import {GetCourseListPageResponse} from "../../../common/frontend-api/GetCourseListPageResponse";
import {GetUnitListPageResponse} from "../../../common/frontend-api/GetUnitListPageResponse";
import {GetUnitPageResponse} from "../../../common/frontend-api/GetUnitPageResponse";
import {ExerciseSheet} from "../../../common/types/Exercise";
import {GetCourseInfoPageResponse} from "../../../common/frontend-api/GetCourseInfoPageResponse";

// --------------------------------------------------------------------------------------------------------------------

export interface RegularUnitPageContent {
    title: string;
    description: string;
    exerciseSheet: ExerciseSheet;
}

export type UnitPageContent = RegularUnitPageContent | "finish";

// --------------------------------------------------------------------------------------------------------------------

export interface Backend {
    getCourseListPage(): Promise<GetCourseListPageResponse>;
    getCourseInfoPage(courseId: number): Promise<GetCourseInfoPageResponse>;
    getNumberOfUnitsForCourse(courseId: number): Promise<number>;
    getUnitListPage(courseId: number): Promise<GetUnitListPageResponse>;
    getUnitPage(courseId: number, unitIndex: number): Promise<GetUnitPageResponse>;
}
