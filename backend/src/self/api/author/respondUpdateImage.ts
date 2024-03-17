import {getPostgresPool} from "../../util/postgres/postgresPool";
import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {getNumberFromPath} from "../getNumberFromPath";
import {validateRequestBodyZod} from "../../util/rest/validateRequestBodyZod";
import {EmptyObject} from "../../../common/util/EmptyObject";
import {updateImageRequestSchema} from "../../../common/author-api/UpdateImageRequest";
import {base64Decode} from "../../util/base64";

export async function respondUpdateImage(requestCycle: AuthorRequestCycle): Promise<EmptyObject> {
    const imageId = getNumberFromPath(requestCycle.pathParameters.imageId);
    const request = await validateRequestBodyZod(requestCycle, updateImageRequestSchema);
    const data = base64Decode(request.dataBase64);
    const postgresPool = await getPostgresPool();
    await postgresPool.query(
        'UPDATE "edu2"."Image" SET "contentType" = $2, "data" = $3 WHERE "id" = $1',
        [imageId, request.contentType, data],
    );
    return {};
}
