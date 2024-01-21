import {UnauthenticatedRequestCycle} from "../../util/rest/unauthenticated/UnauthenticatedRequestCycle";
import {getNumberFromPath} from "../getNumberFromPath";
import {getPostgresPool} from "../../util/postgres/postgresPool";

export async function respondGetNumberOfUnitsForCourse(requestCycle: UnauthenticatedRequestCycle): Promise<number> {
    const courseId = getNumberFromPath(requestCycle.pathParameters.courseId);
    const postgresPool = await getPostgresPool();
    const unitResult = await postgresPool.query(
        'SELECT COUNT(*) as "unitCount" FROM "edu2"."Unit" WHERE "courseId" = $1',
        [courseId],
    );
    return unitResult.rows[0].unitCount;
}
