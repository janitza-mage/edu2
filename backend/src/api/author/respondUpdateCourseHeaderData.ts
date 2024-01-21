import {getPostgresPool} from "../../util/postgres/postgresPool";
import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {getNumberFromPath} from "../getNumberFromPath";
import {validateRequestBodyZod} from "../../util/rest/validateRequestBodyZod";
import {updateCourseHeaderDataRequestSchema} from "../../common/author-api/UpdateCourseHeaderDataRequest";
import {EmptyObject} from "../../common/util/EmptyObject";

export async function respondUpdateCourseHeaderData(requestCycle: AuthorRequestCycle): Promise<EmptyObject> {
    const courseId = getNumberFromPath(requestCycle.pathParameters.courseId);
    const request = await validateRequestBodyZod(requestCycle, updateCourseHeaderDataRequestSchema);

    const postgresPool = await getPostgresPool();

    const result = await postgresPool.query('UPDATE "edu2"."Course" SET "title" = $2, "description" = $3 WHERE "id" = $1',
        [courseId, request.title, request.description]);
    console.log(result);


    return {};
}
