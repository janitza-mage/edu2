import * as core from "express-serve-static-core";
import {respondGetCourseListPage} from "./respondGetCourseListPage";
import {
    UnauthenticatedApiHandler,
    wrapUnauthenticatedApi,
    WrapUnauthenticatedApiOptions
} from "../../util/rest/unauthenticated/wrapUnauthenticatedApi";
import {respondGetUnitPageFrame} from "./respondGetUnitPageFrame";
import {respondGetUnitListPage} from "./respondGetUnitListPage";
import {respondGetNumberOfUnitsForCourse} from "./respondGetNumberOfUnitsForCourse";
import {respondGetUnitPageContent} from "./respondGetUnitPageContent";
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
    register("getUnitPageFrame/:courseId/:unitIndex", respondGetUnitPageFrame);
    register("getUnitPageContent/:courseId/:unitIndex", respondGetUnitPageContent);
    register("getImage/:courseId/:imageId", respondGetImage);
}
