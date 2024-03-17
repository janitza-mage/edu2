import {getPostgresPool} from "../../util/postgres/postgresPool";
import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {getNumberFromPath} from "../getNumberFromPath";
import {FinishRequest} from "../../util/rest/FinishRequest";

export async function respondInsertUnitBefore(requestCycle: AuthorRequestCycle): Promise<void> {
    const postgresPool = await getPostgresPool();
    const unitId = getNumberFromPath(requestCycle.pathParameters.unitId);
    const unitResult = await postgresPool.query('SELECT "courseId", "index" FROM "edu2"."Unit" WHERE "id" = $1', [unitId]);
    if (unitResult.rows.length !== 1) {
        throw FinishRequest.notFound();
    }
    const unit = unitResult.rows[0];
    await postgresPool.query(
        'UPDATE "edu2"."Unit" SET "index" = "index" + 1 WHERE "courseId" = $1 AND "index" >= $2',
        [unit.courseId, unit.index],
    );
    // const newUnitResult = await postgresPool.query(
    //     'INSERT INTO "edu2"."Unit" ("courseId", "index", "title", "description", "exerciseUrl", "exerciseDefinition", "exerciseScript") VALUES ($1, $2) RETURNING "id"',
    //     [unit.courseId, unit.index],
    // );
    // TODO
}
