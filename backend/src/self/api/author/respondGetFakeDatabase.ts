import {getPostgresPool} from "../../util/postgres/postgresPool";
import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {Pool} from "pg";
import {ALREADY_RESPONDED, AlreadyResponded} from "../../util/rest/wrapAutoRespond";


async function tableToString(
    pool: Pool,
    name: string,
    fields: string[],
    rowMutator?: (row: any) => void,
): Promise<string> {
    const sql = `SELECT ${fields.map(x => `"${x}"`).join(", ")} FROM "edu2"."${name}" ORDER BY "id"`;
    const rows = (await pool.query(sql, [] as unknown[])).rows;
    if (rowMutator) {
        for (const row of rows) {
            rowMutator(row);
        }
    }
    return `export const fakeDatabaseTable_${name}: FakeDatabase${name}Record[] = ${JSON.stringify(rows, null, 2)};\n\n`;
}

export async function generateFakeDatabase(): Promise<string> {
    const postgresPool = await getPostgresPool();
    let fileContents = `import {
    FakeDatabaseAuthorRecord,
    FakeDatabaseCourseRecord,
    FakeDatabaseUnitRecord,
    FakeDatabaseImageRecord,    
} from \"./fake-database-types\";\n\n`;
    fileContents += "/* eslint-disable no-template-curly-in-string */\n\n";
    fileContents += await tableToString(postgresPool, "Author",
        ["id", "name"]
    );
    fileContents += await tableToString(postgresPool, "Course",
        ["id", "authorId", "title", "description", "scriptLibrary"]
    );
    fileContents += await tableToString(postgresPool, "Unit",
        ["id", "courseId", "index", "title", "description", "contentUrl", "exerciseDefinition", "exerciseScript"]
    );
    fileContents += await tableToString(postgresPool, "Image",
        ["id", "courseId", "contentType", "data"],
        (row) => {
            row.data = row.data.toString("base64");
        },
    );
    return fileContents;
}

export async function respondGetFakeDatabase(requestCycle: AuthorRequestCycle): Promise<AlreadyResponded> {
    requestCycle.response.setHeader("Content-Type", "text/plain; charset=utf-8");
    requestCycle.response.end(await generateFakeDatabase());
    return ALREADY_RESPONDED;
}
