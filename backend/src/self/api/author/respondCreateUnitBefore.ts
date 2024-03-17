import {withNewGlobalPostgresConnectionAndSingleTransaction} from "../../util/postgres/postgresPool";
import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {getNumberFromPath} from "../getNumberFromPath";
import {FinishRequest} from "../../util/rest/FinishRequest";
import {sql} from "@pgtyped/runtime";
import {ICreateUnitSqlQuery, IGetUnitSqlQuery, IMoveOtherUnitsSqlQuery} from "./respondCreateUnitBefore.pgtyped";
import {IdResponse} from "../../../common/types/IdResponse";

const getUnitSql = sql<IGetUnitSqlQuery>`
    SELECT "courseId", "index" FROM "edu2"."Unit" WHERE "id" = $unitId!
`;

const moveOtherUnitsSql = sql<IMoveOtherUnitsSqlQuery>`
    UPDATE "edu2"."Unit" SET "index" = "index" + 1 WHERE "courseId" = $courseId! AND "index" >= $index!
`;

const createUnitSql = sql<ICreateUnitSqlQuery>`
    INSERT INTO "edu2"."Unit" (
        "courseId",
        "index",
        "title",
        "description",
        "exerciseUrl",
        "exerciseDefinition",
        "exerciseScript"
    ) VALUES (
        $courseId!,
        $index!,
        $title!,
        $description!,
        $exerciseUrl,
        $exerciseDefinition!,
        $exerciseScript!
    ) RETURNING "id";
`;

export async function respondCreateUnitBefore(requestCycle: AuthorRequestCycle): Promise<IdResponse> {
    const unitId = getNumberFromPath(requestCycle.pathParameters.unitId);
    return await withNewGlobalPostgresConnectionAndSingleTransaction(async (postgresConnection) => {
        const units = await getUnitSql.run({ unitId }, postgresConnection);
        if (units.length !== 1) {
            throw FinishRequest.notFound();
        }
        const unit = units[0];
        await moveOtherUnitsSql.run({
            courseId: unit.courseId,
            index: unit.index,
        }, postgresConnection);
        const result = await createUnitSql.run({
            courseId: unit.courseId,
            index: unit.index,
            title: "New Unit",
            description: "",
            exerciseUrl: null,
            exerciseDefinition: {
                "type": "explicit",
                "exercises": []
            },
            exerciseScript: "",
        }, postgresConnection);
        return { id: result[0].id };
    });
}
