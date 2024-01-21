import {UnauthenticatedRequestCycle} from "../../util/rest/unauthenticated/UnauthenticatedRequestCycle";
import {FinishRequest} from "../../util/rest/FinishRequest";
import {getNumberFromPath} from "../getNumberFromPath";
import {getPostgresPool} from "../../util/postgres/postgresPool";

export async function respondGetImage(requestCycle: UnauthenticatedRequestCycle): Promise<Uint8Array> {
    const authorId = getNumberFromPath(requestCycle.pathParameters.authorId);
    const imageId = getNumberFromPath(requestCycle.pathParameters.imageId);
    const postgresPool = await getPostgresPool();
    const result = await postgresPool.query(
        'SELECT "contentType", "data" FROM "edu2"."Image" WHERE "authorId" = $1 AND "id" = $2 LIMIT 1',
        [authorId, imageId],
    );
    if (result.rows.length === 0) {
        throw FinishRequest.notFound();
    }
    const row = result.rows[0];
    console.log(row);
    requestCycle.response.setHeader("Content-Type", row.contentType);
    requestCycle.response.write(row.data);
    return new Uint8Array();
}
