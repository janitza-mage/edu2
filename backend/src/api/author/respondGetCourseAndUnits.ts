import {getPostgresPool} from "../../util/postgres/postgresPool";
import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {getNumberFromPath} from "../getNumberFromPath";
import {promiseAll} from "../../common/util/promiseAll";
import {FinishRequest} from "../../util/rest/FinishRequest";
import {GetBackendCourseAndUnitsResponse} from "../../common/author-api/GetBackendCourseAndUnitsResponse";

export async function respondGetCourseAndUnits(requestCycle: AuthorRequestCycle): Promise<GetBackendCourseAndUnitsResponse> {
    const courseId = getNumberFromPath(requestCycle.pathParameters.courseId);
    const postgresPool = await getPostgresPool();
    const [courseResult, unitResult] = await promiseAll(
        () => postgresPool.query('SELECT "title", "description" FROM "edu2"."Course" LIMIT 1', []),
        () => postgresPool.query('SELECT "id", "index", "title" FROM "edu2"."Unit" WHERE "courseId" = $1 ORDER BY "index"', [courseId]),
    );
    if (courseResult.rows.length !== 1) {
        throw FinishRequest.notFound();
    }
    const courseRow = courseResult.rows[0];


    // ensure that the index field is consistent. TODO if not, auto-fix it! or build a cron job that auto-fixes it.
    unitResult.rows.forEach((row, index) => {
        if (row.index !== index) {
            throw new Error("inconsistent unit index values");
        }
    });

    return {
        title: courseRow.title,
        description: courseRow.description,
        units: unitResult.rows.map(({id, title}) => ({unitId: id, title})),
    };
}
