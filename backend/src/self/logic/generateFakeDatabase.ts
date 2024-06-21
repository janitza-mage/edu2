import {getPostgresPool} from "../util/postgres/postgresPool";
import {writeFile} from "fs/promises";
import {Pool} from "pg";

async function tableToString(pool: Pool, name: string, fields: string[]): Promise<string> {
    const sql = `SELECT ${fields.map(x => `"${x}"`).join(", ")} FROM "edu2"."${name}" ORDER BY "id"`;
    const rows = (await pool.query(sql, [] as unknown[])).rows;
    return `${name}: ${JSON.stringify(rows, null, 2)},\n\n`;
}

export async function generateFakeDatabase(): Promise<void> {
    const postgresPool = await getPostgresPool();
    let fileContents = "export const databaseContents = {\n\n";
    fileContents += await tableToString(postgresPool, "Author", ["id", "name"]);
    fileContents += await tableToString(postgresPool, "Course", ["id", "authorId", "title", "description", "scriptLibrary"]);
    fileContents += "}\n";
    await writeFile("../common/src/self/fake-database/fake-database-contents.ts", fileContents);
}
