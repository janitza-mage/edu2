import {UnauthenticatedRequestCycle} from "../../util/rest/unauthenticated/UnauthenticatedRequestCycle";
import {FinishRequest} from "../../util/rest/FinishRequest";
import {getNumberFromPath} from "../getNumberFromPath";
import {getPostgresPool} from "../../util/postgres/postgresPool";
import {ALREADY_RESPONDED, AlreadyResponded} from "../../util/rest/wrapAutoRespond";

export async function respondGetImage(requestCycle: UnauthenticatedRequestCycle): Promise<AlreadyResponded> {
    const courseId = getNumberFromPath(requestCycle.pathParameters.courseId);
    const imageId = getNumberFromPath(requestCycle.pathParameters.imageId);
    const postgresPool = await getPostgresPool();
    const result = await postgresPool.query(
        'SELECT "contentType", "data" FROM "edu2"."Image" WHERE "courseId" = $1 AND "id" = $2 LIMIT 1',
        [courseId, imageId],
    );
    if (result.rows.length === 0) {
        throw FinishRequest.notFound();
    }
    const row = result.rows[0];
    requestCycle.response.setHeader("Content-Type", row.contentType);
    requestCycle.response.write(row.data);
    return ALREADY_RESPONDED;
}
