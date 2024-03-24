import {withNewGlobalPostgresConnection} from "../../util/postgres/postgresPool";
import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {getNumberFromPath} from "../getNumberFromPath";
import {sql} from "@pgtyped/runtime";
import {IDeleteImageSqlQuery} from "./respondDeleteImage.pgtyped";

const deleteImageSql = sql<IDeleteImageSqlQuery>`
    DELETE FROM "edu2"."Image" WHERE "id" = $imageId!;
`;

export async function respondDeleteImage(requestCycle: AuthorRequestCycle): Promise<void> {
    const imageId = getNumberFromPath(requestCycle.pathParameters.imageId);
    await withNewGlobalPostgresConnection(async (postgresConnection) => {
        await deleteImageSql.run({ imageId }, postgresConnection);
    });
}
