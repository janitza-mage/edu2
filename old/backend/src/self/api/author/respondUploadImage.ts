import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {getNumberFromPath} from "../getNumberFromPath";
import {validateRequestBodyZod} from "../../util/rest/validateRequestBodyZod";
import {updateImageRequestSchema} from "../../../common/author-api/UpdateImageRequest";
import {base64Decode} from "../../util/base64";
import {getPostgresPool} from "../../util/postgres/postgresPool";
import {IdResponse} from "../../../common/types/IdResponse";

export async function respondUploadImage(requestCycle: AuthorRequestCycle): Promise<IdResponse> {
    const courseId = getNumberFromPath(requestCycle.pathParameters.courseId);
    const request = await validateRequestBodyZod(requestCycle, updateImageRequestSchema);
    const data = base64Decode(request.dataBase64);
    const postgresPool = await getPostgresPool();
    const result = await postgresPool.query(
        'INSERT INTO "edu2"."Image" ("courseId", "contentType", "data") VALUES ($1, $2, $3) RETURNING "id"',
        [courseId, request.contentType, data] as unknown[],
    );
    return {
        id: result.rows[0].id,
    };
}
