import {getPostgresPool} from "../../util/postgres/postgresPool";
import {AuthorRequestCycle} from "../../util/rest/author/AuthorRequestCycle";
import {GetBackendCourseListResponse} from "../../common/author-api/GetBackendCourseListResponse";

export async function respondGetCourseList(_requestCycle: AuthorRequestCycle): Promise<GetBackendCourseListResponse> {
    const postgresPool = await getPostgresPool();
    const result = await postgresPool.query('SELECT "id", "authorId", "title" FROM "edu2"."Course" ORDER BY "title"', []);
    return {
        courses: result.rows.map(({id, authorId, title}) => ({courseId: id, authorId, title})),
    };
}
