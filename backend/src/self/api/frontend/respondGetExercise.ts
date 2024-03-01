import {UnauthenticatedRequestCycle} from "../../util/rest/unauthenticated/UnauthenticatedRequestCycle";
import {FinishRequest} from "../../util/rest/FinishRequest";
import {getNumberFromPath} from "../getNumberFromPath";
import {getPostgresPool} from "../../util/postgres/postgresPool";
import {promiseAll} from "../../../common/util/promiseAll";
import {GetExerciseResponse} from "../../../common/frontend-api/GetExerciseResponse";

export async function respondGetExercise(requestCycle: UnauthenticatedRequestCycle): Promise<GetExerciseResponse> {
    const courseId = getNumberFromPath(requestCycle.pathParameters.courseId);
    const unitIndex = getNumberFromPath(requestCycle.pathParameters.unitIndex);
    const postgresPool = await getPostgresPool();
    const [courseResult, unitResult] = await promiseAll(
        () => postgresPool.query(
            'SELECT "scriptLibrary" FROM "edu2"."Course" WHERE "id" = $1 LIMIT 1',
            [courseId],
        ),
        () => postgresPool.query(
            'SELECT "exerciseDefinition", "exerciseScript" FROM "edu2"."Unit" WHERE "courseId" = $1 AND "index" = $2 LIMIT 1',
            [courseId, unitIndex],
        ),
    );
    if (courseResult.rows.length === 0 || unitResult.rows.length === 0) {
        throw FinishRequest.notFound();
    }
    const courseRow = courseResult.rows[0];
    const unitRow = unitResult.rows[0];
    return {
        exerciseDefinition: unitRow.exerciseDefinition,
        exerciseScript: unitRow.exerciseScript,
        courseScriptLibrary: courseRow.scriptLibrary,
    };
}
