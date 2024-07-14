import {UnauthenticatedRequestCycle} from "../../util/rest/unauthenticated/UnauthenticatedRequestCycle";
import {FinishRequest} from "../../util/rest/FinishRequest";
import {GetUnitPageResponse} from "../../../common/frontend-api/GetUnitPageResponse";
import {getNumberFromPath} from "../getNumberFromPath";
import {getPostgresPool} from "../../util/postgres/postgresPool";

export async function respondGetUnitPage(requestCycle: UnauthenticatedRequestCycle): Promise<GetUnitPageResponse> {
    const courseId = getNumberFromPath(requestCycle.pathParameters.courseId);
    const unitIndex = getNumberFromPath(requestCycle.pathParameters.unitIndex);
    const postgresPool = await getPostgresPool();
    const unitResult = await postgresPool.query(
        'SELECT c."authorId", u."title", u."contentUrl" FROM "edu2"."Course" c, "edu2"."Unit" u WHERE c.id = $1 AND u."courseId" = $1 AND u."index" = $2 LIMIT 1',
        [courseId, unitIndex],
    );
    if (unitResult.rows.length === 0) {
        const unitCountResult = await postgresPool.query(
            'SELECT COUNT(*) FROM "edu2"."Unit" WHERE "courseId" = $1',
            [courseId],
        );
        const unitCount = unitCountResult.rows[0].count;
        if (unitIndex === unitCount) {
            return "finish";
        }
        throw FinishRequest.notFound();
    }
    const unitRow = unitResult.rows[0];
    return {
        authorId: unitRow.authorId,
        title: unitRow.title,
        contentUrl: unitRow.contentUrl,
    };
}
