import {UnauthenticatedRequestCycle} from "../../util/rest/unauthenticated/UnauthenticatedRequestCycle";
import {GetCourseListPageResponse} from "../../../common/frontend-api/GetCourseListPageResponse";
import {getPostgresPool} from "../../util/postgres/postgresPool";

export async function respondGetCourseListPage(_requestCycle: UnauthenticatedRequestCycle): Promise<GetCourseListPageResponse> {
    const postgresPool = await getPostgresPool();
    const result = await postgresPool.query('SELECT "id", "authorId", "title" FROM "edu2"."Course"', []);
    const rows = result.rows;
    rows.sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0);
    return {
        courses: result.rows.map(({id, authorId, title}) => ({courseId: id, authorId, title})),
    };
}
