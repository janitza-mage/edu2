import {withNewGlobalPostgresConnectionAndSingleTransaction} from "../../util/postgres/postgresPool";
import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {getNumberFromPath} from "../getNumberFromPath";
import {FinishRequest} from "../../util/rest/FinishRequest";
import {sql} from "@pgtyped/runtime";
import {IDeleteUnitSqlQuery, IGetUnitSqlQuery, IMoveOtherUnitsSqlQuery} from "./respondDeleteUnit.pgtyped";

const getUnitSql = sql<IGetUnitSqlQuery>`
    SELECT "courseId", "index" FROM "edu2"."Unit" WHERE "id" = $unitId!
`;

const deleteUnitSql = sql<IDeleteUnitSqlQuery>`
    DELETE FROM "edu2"."Unit" WHERE "id" = $unitId!;
`;

const moveOtherUnitsSql = sql<IMoveOtherUnitsSqlQuery>`
    UPDATE "edu2"."Unit" SET "index" = "index" - 1 WHERE "courseId" = $courseId! AND "index" >= $index!
`;

export async function respondDeleteUnit(requestCycle: AuthorRequestCycle): Promise<void> {
    const unitId = getNumberFromPath(requestCycle.pathParameters.unitId);
    await withNewGlobalPostgresConnectionAndSingleTransaction(async (postgresConnection) => {
        const units = await getUnitSql.run({ unitId }, postgresConnection);
        if (units.length !== 1) {
            throw FinishRequest.notFound();
        }
        const unit = units[0];
        await deleteUnitSql.run({ unitId }, postgresConnection);
        await moveOtherUnitsSql.run({
            courseId: unit.courseId,
            index: unit.index,
        }, postgresConnection);
    });
}
