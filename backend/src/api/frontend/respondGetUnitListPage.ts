import {UnauthenticatedRequestCycle} from "../../util/rest/unauthenticated/UnauthenticatedRequestCycle";
import {GetUnitListPageResponse} from "../../common/frontend-api/GetUnitListPageResponse";
import {getNumberFromPath} from "../getNumberFromPath";
import {getPostgresPool} from "../../util/postgres/postgresPool";

export async function respondGetUnitListPage(requestCycle: UnauthenticatedRequestCycle): Promise<GetUnitListPageResponse> {
    const courseId = getNumberFromPath(requestCycle.pathParameters.courseId);
    const postgresPool = await getPostgresPool();
    const unitResult = await postgresPool.query(
        'SELECT "title" FROM "edu2"."Unit" WHERE "courseId" = $1 ORDER BY "index"',
        [courseId],
    );
    return {
        units: unitResult.rows.map(({title}) => ({title})),
    };
}
