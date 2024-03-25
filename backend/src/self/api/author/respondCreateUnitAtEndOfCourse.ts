import {withNewGlobalPostgresConnectionAndSingleTransaction} from "../../util/postgres/postgresPool";
import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {sql} from "@pgtyped/runtime";
import {IdResponse} from "../../../common/types/IdResponse";
import {getNumberFromPath} from "../getNumberFromPath";
import {ICreateUnitSqlQuery, IGetMaxIndexSqlQuery} from "./respondCreateUnitAtEndOfCourse.pgtyped";

const getMaxIndexSql = sql<IGetMaxIndexSqlQuery>`
    SELECT MAX("index") FROM "edu2"."Unit" WHERE "courseId" = $courseId!
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

export async function respondCreateUnitAtEndOfCourse(requestCycle: AuthorRequestCycle): Promise<IdResponse> {
    const courseId = getNumberFromPath(requestCycle.pathParameters.courseId);
    return await withNewGlobalPostgresConnectionAndSingleTransaction(async (postgresConnection) => {
        const maxIndexResult = await getMaxIndexSql.run({ courseId }, postgresConnection);
        const index = (maxIndexResult[0].max ?? -1) + 1;
        const result = await createUnitSql.run({
            courseId,
            index,
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
