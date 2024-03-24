import * as core from "express-serve-static-core";
import {respondGetCourseList} from "./respondGetCourseList";
import {WrapUnauthenticatedApiOptions} from "../../util/rest/unauthenticated/wrapUnauthenticatedApi";
import {AuthorApiHandler, wrapAuthorApi} from "../../util/rest/author/wrapAuthorApi";
import {respondGetCourseAndUnits} from "./respondGetCourseAndUnits";
import {respondUpdateCourseHeaderData} from "./respondUpdateCourseHeaderData";
import {respondGetUnit} from "./respondGetUnit";
import {respondUpdateUnitData} from "./respondUpdateUnitData";
import {respondUpdateImage} from "./respondUpdateImage";
import {respondCreateUnitBefore} from "./respondCreateUnitBefore";
import {respondDeleteUnit} from "./respondDeleteUnit";
import {respondCreateUnitAfter} from "./respondCreateUnitAfter";
import {respondGetImagePage} from "./respondGetImagePage";

export function registerAuthorApis(expressApp: core.Express) {
    function registerGet(
        urlSuffix: string,
        handler: AuthorApiHandler,
        options?: WrapUnauthenticatedApiOptions | undefined,
    ) {
        expressApp.get(`/author/${urlSuffix}`, wrapAuthorApi(handler, options));
    }

    function registerPost(
        urlSuffix: string,
        handler: AuthorApiHandler,
        options?: WrapUnauthenticatedApiOptions | undefined,
    ) {
        expressApp.post(`/author/${urlSuffix}`, wrapAuthorApi(handler, options));
    }

    function registerPut(
        urlSuffix: string,
        handler: AuthorApiHandler,
        options?: WrapUnauthenticatedApiOptions | undefined,
    ) {
        expressApp.put(`/author/${urlSuffix}`, wrapAuthorApi(handler, options));
    }

    function registerDelete(
        urlSuffix: string,
        handler: AuthorApiHandler,
        options?: WrapUnauthenticatedApiOptions | undefined,
    ) {
        expressApp.delete(`/author/${urlSuffix}`, wrapAuthorApi(handler, options));
    }

    registerGet("getCourseList", respondGetCourseList);
    registerGet("getCourseAndUnits/:courseId", respondGetCourseAndUnits);
    registerPost("updateCourseHeaderData/:courseId", respondUpdateCourseHeaderData);
    registerGet("getUnit/:unitId", respondGetUnit);
    registerPost("updateUnit/:unitId", respondUpdateUnitData);
    registerPut("updateImage/:imageId", respondUpdateImage);
    registerPost("createUnitBefore/:unitId", respondCreateUnitBefore);
    registerPost("createUnitAfter/:unitId", respondCreateUnitAfter);
    registerDelete("deleteUnit/:unitId", respondDeleteUnit);
    registerGet("getImagePage", respondGetImagePage);
}
