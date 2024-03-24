import {UnauthenticatedRequestCycle} from "../../util/rest/unauthenticated/UnauthenticatedRequestCycle";
import {FinishRequest} from "../../util/rest/FinishRequest";
import {getNumberFromPath} from "../getNumberFromPath";
import {getPostgresPool} from "../../util/postgres/postgresPool";
import {GetImagePageResponse} from "../../../common/author-api/GetImagePageResponse";
import {promiseAll} from "../../../common/util/promiseAll";

export async function respondGetImagePage(requestCycle: UnauthenticatedRequestCycle): Promise<GetImagePageResponse> {
    const courseId = getNumberFromPath(requestCycle.pathParameters.courseId);
    const postgresPool = await getPostgresPool();
    const [courseResult, imagesResult] = await promiseAll(
        () => postgresPool.query(
            'SELECT "name" FROM "edu2"."Course" WHERE "id" = $1',
            [courseId],
        ),
        () => postgresPool.query(
            'SELECT "id", "contentType", "data" FROM "edu2"."Image" WHERE "courseId" = $1',
            [courseId],
        ),
    );
    if (courseResult.rows.length === 0) {
        throw FinishRequest.notFound();
    }
    return {
        courseName: courseResult.rows[0].name,
        imageIds: imagesResult.rows.map(row => row.id),
    };
}
