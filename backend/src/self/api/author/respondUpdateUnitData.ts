import {getPostgresPool} from "../../util/postgres/postgresPool";
import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {getNumberFromPath} from "../getNumberFromPath";
import {validateRequestBodyZod} from "../../util/rest/validateRequestBodyZod";
import {EmptyObject} from "../../../common/util/EmptyObject";
import {updateBackendUnitRequestSchema} from "../../../common/author-api/UpdateBackendUnitRequest";

export async function respondUpdateUnitData(requestCycle: AuthorRequestCycle): Promise<EmptyObject> {
    const unitId = getNumberFromPath(requestCycle.pathParameters.unitId);
    const request = await validateRequestBodyZod(requestCycle, updateBackendUnitRequestSchema);
    const postgresPool = await getPostgresPool();
    const exerciseUrl = request.exerciseUrl.trim() || null;
    await postgresPool.query(
        'UPDATE "edu2"."Unit" SET "title" = $2, "description" = $3, "exerciseUrl" = $4, "exerciseDefinition" = $5, "exerciseScript" = $6 WHERE "id" = $1',
        [unitId, request.title, request.description, exerciseUrl, request.exerciseDefinition, request.exerciseScript],
    );
    return {};
}
