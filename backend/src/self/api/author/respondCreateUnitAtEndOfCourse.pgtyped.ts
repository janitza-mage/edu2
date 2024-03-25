/** Types generated for queries found in "src/self/api/author/respondCreateUnitAtEndOfCourse.ts" */
export type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

/** 'GetMaxIndexSql' parameters type */
export interface IGetMaxIndexSqlParams {
  courseId: number;
}

/** 'GetMaxIndexSql' return type */
export interface IGetMaxIndexSqlResult {
  max: number | null;
}

/** 'GetMaxIndexSql' query type */
export interface IGetMaxIndexSqlQuery {
  params: IGetMaxIndexSqlParams;
  result: IGetMaxIndexSqlResult;
}

/** 'CreateUnitSql' parameters type */
export interface ICreateUnitSqlParams {
  courseId: number;
  description: string;
  exerciseDefinition: Json;
  exerciseScript: string;
  exerciseUrl?: string | null | void;
  index: number;
  title: string;
}

/** 'CreateUnitSql' return type */
export interface ICreateUnitSqlResult {
  id: number;
}

/** 'CreateUnitSql' query type */
export interface ICreateUnitSqlQuery {
  params: ICreateUnitSqlParams;
  result: ICreateUnitSqlResult;
}

