import * as core from "express-serve-static-core";
import {respondGetCourseListPage} from "./respondGetCourseListPage";
import {
    UnauthenticatedApiHandler,
    wrapUnauthenticatedApi,
    WrapUnauthenticatedApiOptions
} from "../../util/rest/unauthenticated/wrapUnauthenticatedApi";
import {respondGetUnitPage} from "./respondGetUnitPage";
import {respondGetUnitListPage} from "./respondGetUnitListPage";
import {respondGetNumberOfUnitsForCourse} from "./respondGetNumberOfUnitsForCourse";
import {respondGetExercise} from "./respondGetExercise";
import {respondGetImage} from "./respondGetImage";
import {respondGetCourseInfoPage} from "./respondGetCourseInfoPage";

export function registerFrontendApis(expressApp: core.Express) {
    function register(
        urlSuffix: string,
        handler: UnauthenticatedApiHandler,
        options?: WrapUnauthenticatedApiOptions | undefined,
    ) {
        expressApp.get(`/frontend/${urlSuffix}`, wrapUnauthenticatedApi(handler, options));
    }

    register("getCourseListPage", respondGetCourseListPage);
    register("getCourseInfoPage/:courseId", respondGetCourseInfoPage);
    register("getNumberOfUnitsForCourse/:courseId", respondGetNumberOfUnitsForCourse);
    register("getUnitListPage/:courseId", respondGetUnitListPage);
    register("getUnitPage/:courseId/:unitIndex", respondGetUnitPage);
    register("getExercise/:courseId/:unitIndex", respondGetExercise);
    register("getImage/:authorId/:imageId", respondGetImage);
}
