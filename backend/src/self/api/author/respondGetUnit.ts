import {getPostgresPool} from "../../util/postgres/postgresPool";
import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {getNumberFromPath} from "../getNumberFromPath";
import {FinishRequest} from "../../util/rest/FinishRequest";
import {GetBackendUnitResponse} from "../../../common/author-api/GetBackendUnitResponse";

export async function respondGetUnit(requestCycle: AuthorRequestCycle): Promise<GetBackendUnitResponse> {
    const unitId = getNumberFromPath(requestCycle.pathParameters.unitId);
    const postgresPool = await getPostgresPool();
    const unitResult = await postgresPool.query(
        'SELECT "title", "description", "contentUrl", "exerciseDefinition", "exerciseScript" FROM "edu2"."Unit" WHERE "id" = $1 LIMIT 1',
        [unitId],
    );
    if (unitResult.rows.length !== 1) {
        throw FinishRequest.notFound();
    }
    return unitResult.rows[0];
}
