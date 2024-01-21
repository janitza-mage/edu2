import {UnauthenticatedRequestCycle} from "../../util/rest/unauthenticated/UnauthenticatedRequestCycle";
import {getPostgresPool} from "../../util/postgres/postgresPool";
import {GetCourseInfoPageResponse} from "../../common/frontend-api/GetCourseInfoPageResponse";
import {getNumberFromPath} from "../getNumberFromPath";
import {FinishRequest} from "../../util/rest/FinishRequest";

export async function respondGetCourseInfoPage(requestCycle: UnauthenticatedRequestCycle): Promise<GetCourseInfoPageResponse> {
    const courseId = getNumberFromPath(requestCycle.pathParameters.courseId);
    const postgresPool = await getPostgresPool();
    const result = await postgresPool.query(
        'SELECT "authorId", "title", "description" FROM "edu2"."Course" WHERE "id" = $1 LIMIT 1',
        [courseId],
    );
    if (result.rowCount === 0) {
        throw FinishRequest.notFound();
    }
    const row = result.rows[0];
    return {
        authorId: row.authorId,
        title: row.title,
        description: row.description,
    };
}
